/**
 * 릴리스 노트를 Bible-OnAir-Releases 저장소의 마크다운에서 읽어옵니다.
 *
 * 형식 (앱과 공유):
 *   ## <버전>            버전 뒤에 무엇이 붙어도 무시합니다 (`## 1.1.1 — 2026-09-20` 가능)
 *   <첫 블록>            대표 설명. 문단이든 ### 소제목이든 첫 블록을 대표 설명으로 봅니다.
 *   <나머지 블록>        상세. 문단 · 목록 · ### 소제목을 지원합니다.
 *
 * 지원 인라인 문법은 **굵게** 와 [글자](주소) 뿐입니다. 그 밖의 표기는 글자 그대로 둡니다.
 * 마크다운을 HTML 문자열로 바꾸지 않고 조각으로 쪼개 컴포넌트가 직접 그리므로,
 * 파일 내용이 HTML 로 해석될 여지가 없습니다.
 */

/** `## 1.1.1` · `##1.1.1` · `## 1.1.1 — 2026-09-20` 에서 버전만 뽑습니다. */
const SECTION = /^##(?!#)[ \t]*(\d+(?:\.\d+)*)(?=[ \t]|$|[^\d.])/;
/** `### 제목` · `###제목` 모두 소제목으로 봅니다. */
const SUBHEADING = /^###[ \t]*(.*)$/;
const LIST_ITEM = /^[-*][ \t]+(.*)$/;

/** 버전을 숫자 단위로 비교합니다. 1.1.10 이 1.1.1 보다 뒤에 오도록. */
export function compareVersions(a, b) {
	const pa = String(a).split('.').map(Number);
	const pb = String(b).split('.').map(Number);
	for (let i = 0; i < Math.max(pa.length, pb.length); i += 1) {
		const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
		if (diff !== 0) return diff;
	}
	return 0;
}

/** **굵게** 와 [글자](주소) 를 조각으로 쪼갭니다. */
export function inlineSegments(text) {
	const segments = [];
	const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
	let last = 0;
	let match;
	while ((match = pattern.exec(text)) !== null) {
		if (match.index > last) segments.push({ text: text.slice(last, match.index) });
		if (match[1] !== undefined) segments.push({ bold: match[1] });
		else segments.push({ link: match[2], href: match[3] });
		last = pattern.lastIndex;
	}
	if (last < text.length) segments.push({ text: text.slice(last) });
	return segments.length > 0 ? segments : [{ text }];
}

/** 한 절의 본문을 블록(소제목·목록·문단) 목록으로 나눕니다. */
function parseBlocks(lines) {
	const blocks = [];
	let paragraph = [];

	const flushParagraph = () => {
		if (paragraph.length > 0) {
			blocks.push({ type: 'paragraph', text: paragraph.join('\n') });
			paragraph = [];
		}
	};

	for (const line of lines) {
		if (line.trim() === '') {
			flushParagraph();
			continue;
		}

		const heading = line.match(SUBHEADING);
		if (heading) {
			flushParagraph();
			blocks.push({ type: 'heading', text: heading[1].trim() });
			continue;
		}

		const item = line.match(LIST_ITEM);
		if (item) {
			flushParagraph();
			const previous = blocks[blocks.length - 1];
			if (previous?.type === 'list') previous.items.push(item[1].trim());
			else blocks.push({ type: 'list', items: [item[1].trim()] });
			continue;
		}

		// 목록 항목 다음에 오는 들여쓰기 없는 줄은 그 항목의 이어지는 문장입니다.
		const previous = blocks[blocks.length - 1];
		if (paragraph.length === 0 && previous?.type === 'list') {
			previous.items[previous.items.length - 1] += `\n${line.trim()}`;
			continue;
		}
		paragraph.push(line.trim());
	}
	flushParagraph();
	return blocks;
}

/**
 * 마크다운 전체를 파싱합니다.
 * 반환값은 버전 내림차순이며, 파일에 적힌 순서에 의존하지 않습니다.
 */
export function parseUpdateNotes(markdown) {
	if (typeof markdown !== 'string' || markdown.trim() === '') return [];

	const sections = [];
	let current = null;
	for (const line of markdown.split(/\r?\n/)) {
		const start = line.match(SECTION);
		if (start) {
			current = { version: start[1], lines: [] };
			sections.push(current);
			continue;
		}
		if (current) current.lines.push(line);
	}

	return sections
		.map(({ version, lines }) => {
			const blocks = parseBlocks(lines);
			const [first, ...rest] = blocks;
			// 첫 블록이 소제목이든 문단이든 대표 설명으로 씁니다. 목록이면 대표 설명 없이 전부 상세로.
			const leadIsText = first && (first.type === 'heading' || first.type === 'paragraph');
			return {
				version,
				lead: leadIsText ? first.text : '',
				blocks: leadIsText ? rest : blocks,
			};
		})
		.sort((a, b) => compareVersions(b.version, a.version));
}

async function fetchText(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) return null;
		return await response.text();
	} catch {
		return null;
	}
}

/** 릴리스 노트 마크다운을 받아 파싱합니다. 실패하면 null 을 돌려줍니다. */
export async function loadUpdateNotes(url) {
	const markdown = await fetchText(url);
	if (markdown === null) return null;
	const sections = parseUpdateNotes(markdown);
	return sections.length > 0 ? sections : null;
}

/**
 * 버전별 latest.yml 에서 게시 시각과 설치 파일 크기를 읽습니다.
 * 이 파일이 없으면 그 버전은 아직 배포되지 않은 것으로 봅니다.
 */
export async function loadReleaseMeta(url) {
	const yaml = await fetchText(url);
	if (yaml === null) return null;
	const date = yaml.match(/^releaseDate:\s*'?([0-9]{4}-[0-9]{2}-[0-9]{2})/m)?.[1] ?? null;
	const size = Number(yaml.match(/^\s+size:\s*(\d+)/m)?.[1] ?? 0) || null;
	return { date, size };
}

/** 88814104 → "84.7 MB" */
export function formatSize(bytes) {
	if (!bytes) return null;
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
