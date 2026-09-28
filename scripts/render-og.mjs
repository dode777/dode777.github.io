/**
 * 링크 공유 카드 여섯 장을 다시 만듭니다.
 *
 *   scripts/og-home.html        -> public/assets/og/og-default(-en).png
 *   scripts/og-bible-onair.html -> public/assets/og/og-bible-onair(-en).png
 *   scripts/og-do-it.html       -> public/assets/og/og-do-it(-en).png
 *
 * 문구는 content/ 에서 옵니다. 먼저 `npm run build` 로 scripts/og-content.js 를
 * 갱신한 뒤 실행하세요. `npm run og` 가 두 가지를 순서대로 합니다.
 *
 * 크롬이 필요합니다. 설치된 크롬을 쓰고, 경로를 직접 주려면 CHROME_PATH 를 씁니다.
 */
import { chromium } from 'playwright-core';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const CARDS = [
	['scripts/og-home.html', 'og-default'],
	['scripts/og-bible-onair.html', 'og-bible-onair'],
	['scripts/og-do-it.html', 'og-do-it'],
];
const SIZE = { width: 1200, height: 630 };

const launch = process.env.CHROME_PATH
	? { executablePath: process.env.CHROME_PATH }
	: { channel: 'chrome' };

const browser = await chromium.launch(launch);
const context = await browser.newContext({ viewport: SIZE, deviceScaleFactor: 1 });

for (const [source, name] of CARDS) {
	for (const lang of ['ko', 'en']) {
		const page = await context.newPage();
		const url = pathToFileURL(resolve(source)).href + (lang === 'en' ? '#en' : '');
		await page.goto(url, { waitUntil: 'networkidle' });
		// 웹폰트가 준비된 뒤에 찍어야 글꼴이 바뀌지 않습니다.
		await page.evaluate(() => document.fonts.ready);
		const out = `public/assets/og/${name}${lang === 'en' ? '-en' : ''}.png`;
		await page.screenshot({ path: out });
		console.log(`${out} 생성`);
		await page.close();
	}
}

await browser.close();
