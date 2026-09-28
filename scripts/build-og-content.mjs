/**
 * 공유 카드가 읽을 문구 파일(scripts/og-content.js)을 만듭니다.
 *
 * 카드에만 쓰는 글자는 content/og.yml 에, 페이지와 겹치는 글자(서비스 한 줄
 * 소개 등)는 content/services/*.yml 에 있습니다. 여기서 둘을 합쳐 한 벌로
 * 만들어 두면, 문구를 한 곳에서만 고쳐도 카드가 따라옵니다.
 *
 * npm run build 가 자동으로 실행합니다.
 */
import { writeFileSync } from 'node:fs';
import { readContent, pickLocale } from '../src/content/load.js';
import settings from '../src/config/settings.js';
import { services } from '../src/config/services.js';

const og = readContent('og.yml');
const LOCALES = settings.locales;


const content = {};
for (const lang of LOCALES) {
	const service = (slug) => services.find((s) => s.slug === slug)[lang];

	content[lang] = {
		eyebrow: og.eyebrow,
		home: {
			headline: pickLocale(og.home.headline, lang),
			foot: pickLocale(og.home.foot, lang),
			// 카드 안 상자는 서비스 목록 순서를 따릅니다.
			cards: services.map((s) => ({
				name: service(s.slug).name,
				tagline: service(s.slug).metaTagline ?? service(s.slug).tagline,
				note: pickLocale(og.home.notes[s.slug], lang),
			})),
		},
		services: Object.fromEntries(
			Object.entries(og.services).map(([slug, card]) => [
				slug,
				{
					headline: pickLocale(card.headline, lang),
					pillName: pickLocale(card.pillName, lang),
					pillTagline: pickLocale(card.pillTagline, lang),
					foot: pickLocale(card.foot, lang),
				},
			])
		),
	};
}

const banner = `/* 자동 생성 파일입니다. 고치지 마세요.
   문구는 content/og.yml 과 content/services/*.yml 에 있고,
   npm run build 가 이 파일을 다시 만듭니다. */\n`;

writeFileSync('scripts/og-content.js', `${banner}window.OG = ${JSON.stringify(content, null, '\t')};\n`, 'utf8');
console.log('scripts/og-content.js 생성');
