import settings from './settings.js';
import { readServiceContent } from '../content/load.js';

/* 서비스 문구는 content/services/<이름>.yml 에 있습니다. 여기에는 연결 설정만 둡니다. */
const bibleOnAir = readServiceContent('bible-onair', settings.locales);
const doIt = readServiceContent('do-it', settings.locales);

/**
 * 프로그램 카탈로그.
 * 각 항목은 <도메인>/<slug> 상세 페이지로 렌더링되고, 영문은 /en/<slug> 로 생성됩니다.
 * 문구의 줄바꿈(\n)은 화면에 그대로 반영되고, `백틱`으로 감싼 부분은 키 표기로 렌더링됩니다.
 *
 * status: 'live' — 정식 버전  |  'beta' — 출시 준비 중  |  'dev' — 개발 중
 */

const RELEASES_REPO = 'https://github.com/dode777/Bible-OnAir-Releases';
const RELEASES_RAW = 'https://raw.githubusercontent.com/dode777/Bible-OnAir-Releases/main';

/** 릴리스 노트 원본. 앱과 같은 파일을 읽습니다. */
export const UPDATE_NOTES_URL = {
	ko: `${RELEASES_RAW}/UPDATE-NOTES.md`,
	en: `${RELEASES_RAW}/UPDATE-NOTES.en.md`,
};

/** 버전별 게시 시각·설치 파일 크기가 담긴 파일. 없으면 아직 배포 전으로 봅니다. */
export function releaseMetaUrl(version) {
	return `${RELEASES_REPO}/releases/download/v${version}/latest.yml`;
}

/**
 * 릴리스 노트에는 적혀 있지만 설치 파일이 아직 올라오지 않은 버전을 보여줄지 여부.
 * 기본은 감춥니다. 보여주면 받을 수 없는 버전이 최신으로 올라오고, 같은 계열의
 * 받을 수 있는 버전이 대신 가려집니다.
 */
export const SHOW_UNRELEASED_NOTES = false;

/** 내려받기를 제공하는 계열 수 — 최신 계열을 포함해 3개. */
export const DOWNLOADABLE_RELEASES = 3;

/**
 * 내려받기를 제공할 버전을 고릅니다. releases 는 최신이 맨 앞인 순서여야 합니다.
 *
 * 같은 마이너 계열(1.1.x)에서는 마지막 패치만 남깁니다. 1.1.1 이 1.1.0 의 버그를
 * 고친 버전이라면 1.1.0 을 내려받게 둘 이유가 없기 때문입니다. 그렇게 추린 계열
 * 중 최신 DOWNLOADABLE_RELEASES 개만 제공합니다.
 *
 * 특정 버전을 내려받기에서 빼야 할 때는 그 릴리스에 hideDownload: true 를 답니다.
 * (변경 내역에는 그대로 남고 버튼만 사라집니다.)
 */
export function downloadableVersions(releases = []) {
	const lines = new Set();
	const picked = [];
	for (const release of releases) {
		if (release.hideDownload) continue;
		const line = String(release.version).split('.').slice(0, 2).join('.');
		if (lines.has(line)) continue;
		lines.add(line);
		picked.push(release.version);
		if (picked.length === DOWNLOADABLE_RELEASES) break;
	}
	return new Set(picked);
}

/** 설치 파일 이름과 주소는 버전 번호에서 그대로 만들어집니다. */
export function installerFileName(version) {
	return `Bible-OnAir-Setup-${version}.exe`;
}
export function installerDownloadUrl(version) {
	return `${RELEASES_REPO}/releases/download/v${version}/${installerFileName(version)}`;
}

/**
 * 새 버전을 낼 때는 이 값을 올리고, 아래 releases 배열 맨 앞에 같은 버전의
 * 설명을 추가하면 됩니다. 설치 파일 주소는 자동으로 따라갑니다.
 */
const BIBLE_ONAIR_VERSION = '1.1.0';


/* ── Do-It ─────────────────────────────────────────────────────────────────
 * 설치 파일이 아니라 웹앱이라 downloadKind 가 'web' 입니다. 흐름은 Bible OnAir 와 같습니다:
 *   Do-It(비공개 소스) ─ Release 워크플로 ─▶ Do-It-Releases
 *     · Release v<버전> 에 latest.yml(version · releaseDate) — Bible OnAir 와 같은 형식
 *     · main 의 UPDATE-NOTES(.en).md — 직접 쓰는 릴리스 노트
 *     · gh-pages 브랜치 = 웹앱 본체 → DO_IT_APP_URL
 * 버전은 위 두 파일에서 자동으로 읽습니다. 게시된 버전이 없으면 "웹에서 열기" 버튼이 꺼집니다.
 */
const DO_IT_RELEASES_REPO = 'https://github.com/dode777/Do-It-Releases';
const DO_IT_RELEASES_RAW = 'https://raw.githubusercontent.com/dode777/Do-It-Releases/main';
export const DO_IT_APP_URL = 'https://doit.isocompany.co.kr/';

export const services = [
	{
		slug: 'bible-onair',
		status: 'live',
		downloadKind: 'windows',
		/** 릴리스 목록이 아니라 설치 파일을 바로 내려받도록 연결합니다. */
		downloadUrl: installerDownloadUrl(BIBLE_ONAIR_VERSION),
		downloadReady: true,
		currentVersion: BIBLE_ONAIR_VERSION,
		installerName: installerFileName(BIBLE_ONAIR_VERSION),
		/* 링크 공유 미리보기 그림(1200x630). 원본: scripts/og-bible-onair.html */
		ogImage: { ko: '/assets/og/og-bible-onair.png', en: '/assets/og/og-bible-onair-en.png' },
		screenshots: [
			{ src: '/assets/screenshots/bible-onair-control.png', width: 1100, height: 720 },
			{ src: '/assets/screenshots/bible-onair-screen.png', width: 1599, height: 999 },
		],
		ko: bibleOnAir.ko,
		en: bibleOnAir.en,
	},
	{
		slug: 'do-it',
		status: 'live',
		downloadKind: 'web',
		downloadUrl: DO_IT_APP_URL,
		/* 웹앱은 게시된 버전이 있을 때 자동으로 켜집니다 (DownloadButton). */
		downloadReady: false,
		releaseSource: {
			notes: {
				ko: `${DO_IT_RELEASES_RAW}/UPDATE-NOTES.md`,
				en: `${DO_IT_RELEASES_RAW}/UPDATE-NOTES.en.md`,
			},
			metaUrl: (version) => `${DO_IT_RELEASES_REPO}/releases/download/v${version}/latest.yml`,
		},
		schema: {
			type: 'WebApplication',
			category: 'LifestyleApplication',
			operatingSystem: 'iOS, Android',
		},
		/* 휴대폰 세로 화면 (390x844 @2x) — 두 장씩 나란히 놓습니다. */
		screenshotLayout: 'phone',
		/* 링크 공유 미리보기 그림(1200x630). 없으면 사이트 기본 그림(Bible OnAir)이 나간다. 원본: scripts/og-do-it.html */
		ogImage: { ko: '/assets/og/og-do-it.png', en: '/assets/og/og-do-it-en.png' },
		screenshots: [
			{ src: '/assets/screenshots/do-it-feed.png', width: 780, height: 1688 },
			{ src: '/assets/screenshots/do-it-done.png', width: 780, height: 1688 },
			{ src: '/assets/screenshots/do-it-add.png', width: 780, height: 1688 },
			{ src: '/assets/screenshots/do-it-summary.png', width: 780, height: 1688 },
		],
		ko: doIt.ko,
		en: doIt.en,
	},
];

export function getService(slug) {
	return services.find((service) => service.slug === slug);
}

export function serviceUrl(slug, lang = settings.defaultLocale) {
	return lang === settings.defaultLocale ? `/${slug}` : `/${lang}/${slug}`;
}
