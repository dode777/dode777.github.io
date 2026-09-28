/**
 * content/ 의 문구를 검사합니다.
 *
 * 한쪽 언어가 비었거나 꼭 있어야 할 항목이 없으면, 배포되기 전에 여기서 멈춥니다.
 * 지금까지는 영어를 빠뜨려도 조용히 배포되고 나중에 화면에서 발견했습니다.
 *
 * npm run build 가 자동으로 실행합니다.
 */
import { readContent } from '../src/content/load.js';
import settings from '../src/config/settings.js';

const LOCALES = settings.locales;
const problems = [];

function report(file, where, message) {
	problems.push({ file, where, message });
}

/** { ko, en } 묶음을 만나면 두 언어가 다 찼는지 봅니다. */
function walk(node, file, path) {
	if (Array.isArray(node)) {
		node.forEach((item, i) => walk(item, file, `${path}[${i}]`));
		return;
	}
	if (node === null || typeof node !== 'object') return;

	const present = LOCALES.filter((lang) => lang in node);
	if (present.length > 0) {
		for (const lang of LOCALES) {
			const value = node[lang];
			if (!(lang in node)) report(file, path, `${lang} 이 없습니다 (${present.join('·')} 만 있습니다)`);
			else if (typeof value === 'string' && value.trim() === '') report(file, path, `${lang} 이 비어 있습니다`);
		}
		return;
	}
	for (const [key, child] of Object.entries(node)) {
		walk(child, file, path ? `${path}.${key}` : key);
	}
}

/** 서비스마다 반드시 있어야 하는 항목 */
const SERVICE_REQUIRED = [
	'name',
	'tagline',
	'metaTagline',
	'summary',
	'description',
	'features',
	'requirements',
	'faq',
];

const SITE_REQUIRED = ['brand', 'url', 'contactEmail'];

// ── 사이트 값
const site = readContent('site.yml');
for (const key of SITE_REQUIRED) {
	if (!site[key] || String(site[key]).trim() === '') report('site.yml', key, '값이 없습니다');
}
if (site.url && site.url.endsWith('/')) report('site.yml', 'url', '끝에 슬래시를 빼 주세요');

// ── 화면 공통 문구
walk(readContent('ui.yml'), 'ui.yml', '');

// ── 공유 카드
walk(readContent('og.yml'), 'og.yml', '');

// ── 서비스
const { services } = await import('../src/config/services.js');
for (const service of services) {
	const file = `services/${service.slug}.yml`;
	const tree = readContent(file);
	walk(tree, file, '');
	for (const key of SERVICE_REQUIRED) {
		if (!(key in tree)) report(file, key, '항목이 없습니다');
	}
	// 화면에 그림이 있으면 설명도 같은 수만큼 있어야 합니다.
	const shots = service.screenshots?.length ?? 0;
	for (const lang of LOCALES) {
		const captions = service[lang]?.screenshotCaptions?.length ?? 0;
		if (shots !== captions) {
			report(file, 'screenshotCaptions', `그림은 ${shots}장인데 설명은 ${captions}개입니다 (${lang})`);
		}
	}
}

if (problems.length === 0) {
	console.log('content 검사 통과');
} else {
	const byFile = new Map();
	for (const p of problems) {
		if (!byFile.has(p.file)) byFile.set(p.file, []);
		byFile.get(p.file).push(p);
	}
	console.error('');
	for (const [file, list] of byFile) {
		console.error(`✗ content/${file}`);
		for (const p of list) console.error(`  ${p.where || '(뿌리)'} — ${p.message}`);
	}
	console.error('\n배포되지 않았습니다. 위 내용을 채우고 다시 실행하세요.\n');
	process.exit(1);
}
