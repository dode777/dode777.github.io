/**
 * 릴리스 목록을 한 곳에서 만들어 페이지 전체가 같은 값을 쓰게 합니다.
 *
 * 출처는 릴리스 저장소의 마크다운이고, 버전별 게시 시각·설치 파일 크기는
 * 같은 저장소의 latest.yml 에서 읽습니다. 둘 다 못 읽으면 services.js 에
 * 적어 둔 내용으로 돌아갑니다.
 */
import {
	SHOW_UNRELEASED_NOTES,
	UPDATE_NOTES_URL,
	releaseMetaUrl,
} from '../config/services.js';
import { compareVersions, loadReleaseMeta, loadUpdateNotes } from './update-notes.js';

/** 한 번의 빌드 안에서 같은 요청을 반복하지 않도록 기억해 둡니다. */
const cache = new Map();

async function build(service, lang) {
	const content = service[lang];

	/** services.js 에 적어 둔 대비책. 손으로 검증한 내용이라 배포된 것으로 봅니다. */
	const fallback = (content.releases ?? []).map((release) => ({
		version: release.version,
		lead: release.summary ?? '',
		blocks: release.details?.length ? [{ type: 'list', items: release.details }] : [],
		date: release.date ?? null,
		assumeReleased: true,
	}));

	// 출처가 서비스에 적혀 있으면 그것을, 없으면 Bible OnAir 릴리스 저장소를 씁니다.
	const notesUrl = service.releaseSource?.notes?.[lang] ?? UPDATE_NOTES_URL[lang];
	const metaUrl = service.releaseSource?.metaUrl ?? releaseMetaUrl;
	const parsed = await loadUpdateNotes(notesUrl);
	const sections = parsed ?? fallback;

	let entries = await Promise.all(
		sections.map(async (section) => {
			const meta = await loadReleaseMeta(metaUrl(section.version));
			return {
				...section,
				date: meta?.date ?? section.date ?? null,
				size: meta?.size ?? null,
				released: Boolean(meta) || Boolean(section.assumeReleased),
			};
		})
	);

	// 마크다운은 읽혔는데 latest.yml 을 하나도 못 읽었다면 일시적인 장애로 보고 대비책으로 돌아갑니다.
	if (parsed && entries.every((entry) => !entry.released)) {
		entries = fallback.map((entry) => ({ ...entry, size: null, released: true }));
	}

	if (!SHOW_UNRELEASED_NOTES) entries = entries.filter((entry) => entry.released);
	entries.sort((a, b) => compareVersions(b.version, a.version));

	/*
	 * 출시된 서비스인데 버전이 하나도 남지 않았다면 빌드를 멈춥니다.
	 *
	 * 이 값이 비면 화면에서 버전 표시와 내려받기·열기 버튼이 통째로 사라지고
	 * "첫 정식 릴리스를 준비하고 있습니다" 가 대신 나옵니다. 재빌드는 사람 손을
	 * 거치지 않고 결과를 바로 커밋하므로, 네트워크가 한 번 흔들린 것만으로
	 * 출시된 서비스가 준비 중인 것처럼 배포될 수 있습니다.
	 * 그런 페이지를 내보내느니 빌드가 실패하는 편이 낫습니다.
	 */
	if (service.status === 'live' && entries.length === 0) {
		throw new Error(
			`[releases] ${service.slug}(${lang}): 릴리스 정보를 얻지 못했습니다. ` +
				`릴리스 노트(${notesUrl})를 읽지 못했고 services.js 의 대비 목록도 비어 있습니다. ` +
				`버튼과 버전이 사라진 페이지가 배포되지 않도록 빌드를 멈춥니다.`
		);
	}

	return { entries, latest: entries[0] ?? null };
}

export function resolveReleases(service, lang) {
	const key = `${service.slug}:${lang}`;
	if (!cache.has(key)) cache.set(key, build(service, lang));
	return cache.get(key);
}
