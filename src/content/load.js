/**
 * content/ 의 YAML 을 읽어 옵니다.
 *
 * 문구는 코드가 아니라 데이터입니다. content/ 아래 YAML 에만 두고, 화면 코드는
 * 그 값을 받아 쓰기만 합니다. 따옴표·쉼표·역슬래시를 지킬 일이 없고, 한 항목
 * 아래에 ko 와 en 이 나란히 있어 한쪽만 고치고 잊는 일이 줄어듭니다.
 *
 * 정적 빌드에서만 돌아가므로 파일을 그냥 읽습니다(브라우저로 나가지 않습니다).
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { load as parseYaml } from 'js-yaml';

/*
 * 저장소 뿌리의 content/ 를 가리킵니다.
 * import.meta.url 은 빌드 과정에서 묶인 파일의 위치가 되어 버리므로,
 * 명령을 실행한 위치(= 저장소 뿌리)를 기준으로 잡습니다.
 */
const CONTENT_ROOT = resolve(process.cwd(), 'content');

/** content/ 기준 상대 경로를 받아 파싱된 값을 돌려줍니다. */
export function readContent(relativePath) {
	const path = resolve(CONTENT_ROOT, relativePath);
	let text;
	try {
		text = readFileSync(path, 'utf8');
	} catch (error) {
		throw new Error(
			`[content] content/${relativePath} 을 읽지 못했습니다: ${error.message}\n` +
				`(저장소 뿌리에서 실행해야 합니다. 지금 위치: ${process.cwd()})`
		);
	}
	try {
		return parseYaml(text) ?? {};
	} catch (error) {
		// js-yaml 은 몇 번째 줄 몇 번째 칸인지 알려줍니다. 그대로 보여 줍니다.
		throw new Error(`[content] content/${relativePath} 의 형식이 잘못되었습니다.\n${error.message}`);
	}
}

/**
 * { ko, en } 묶음이 잎으로 달린 나무를 로케일별 평면 사전으로 폅니다.
 *
 *   site: { title: { ko: '가', en: 'A' } }
 *     -> ko: { 'site.title': '가' },  en: { 'site.title': 'A' }
 *
 * 화면 코드가 지금도 쓰고 있는 'site.title' 형태를 그대로 유지하기 위한 것입니다.
 */
export function flattenByLocale(tree, locales) {
	const out = Object.fromEntries(locales.map((lang) => [lang, {}]));

	function walk(node, path) {
		if (node === null || typeof node !== 'object' || Array.isArray(node)) {
			throw new Error(`[content] ${path || '(뿌리)'} — ko / en 묶음이 있어야 하는 자리입니다.`);
		}
		const isLeaf = locales.some((lang) => lang in node);
		if (isLeaf) {
			for (const lang of locales) out[lang][path] = node[lang];
			return;
		}
		for (const [key, child] of Object.entries(node)) {
			walk(child, path ? `${path}.${key}` : key);
		}
	}

	walk(tree, '');
	return out;
}

/**
 * { ko, en } 묶음을 한 로케일의 값으로 바꿔 내려갑니다(배열·중첩 포함).
 * 서비스 문구처럼 구조가 있는 내용에 씁니다.
 */
export function pickLocale(node, lang) {
	if (Array.isArray(node)) return node.map((item) => pickLocale(item, lang));
	if (node === null || typeof node !== 'object') return node;
	if (lang in node) return pickLocale(node[lang], lang);
	return Object.fromEntries(
		Object.entries(node).map(([key, value]) => [key, pickLocale(value, lang)])
	);
}
