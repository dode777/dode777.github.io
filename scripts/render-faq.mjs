/**
 * 자주 묻는 질문에 넣는 SmartScreen 경고창 그림 네 장을 다시 만듭니다.
 *
 *   scripts/faq-smartscreen.html#ko-1 -> public/assets/faq/smartscreen-1.png
 *   scripts/faq-smartscreen.html#ko-2 -> public/assets/faq/smartscreen-2.png
 *   scripts/faq-smartscreen.html#en-1 -> public/assets/faq/smartscreen-1-en.png
 *   scripts/faq-smartscreen.html#en-2 -> public/assets/faq/smartscreen-2-en.png
 *
 * 그림의 글자는 content/ 가 아니라 원본 HTML 안에 있습니다(Windows 화면의 문구라 고칠 일이 드뭅니다).
 * 그래서 Rebuild site 워크플로는 이 그림을 다시 만들지 않습니다. 원본을 고쳤을 때 손으로 실행하세요.
 *
 *   npm run faq-images                              # 크롬이 설치돼 있으면 그대로
 *   CHROME_PATH=/path/to/chrome npm run faq-images  # 경로를 직접 줄 때
 */
import { chromium } from 'playwright-core';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const SOURCE = 'scripts/faq-smartscreen.html';
const OUT_DIR = 'public/assets/faq';
const SIZE = { width: 600, height: 420 };

const launch = process.env.CHROME_PATH
	? { executablePath: process.env.CHROME_PATH }
	: { channel: 'chrome' };

mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch(launch);
const context = await browser.newContext({ viewport: SIZE, deviceScaleFactor: 2 });

for (const lang of ['ko', 'en']) {
	for (const step of [1, 2]) {
		const page = await context.newPage();
		await page.goto(`${pathToFileURL(resolve(SOURCE)).href}#${lang}-${step}`, { waitUntil: 'networkidle' });
		// 웹폰트가 준비된 뒤 표시를 그리므로, 그 표시가 생긴 다음에 찍습니다.
		await page.evaluate(() => document.fonts.ready);
		await page.waitForSelector('.mark');
		const out = `${OUT_DIR}/smartscreen-${step}${lang === 'en' ? '-en' : ''}.png`;
		await page.screenshot({ path: out });
		console.log(`${out} 생성`);
		await page.close();
	}
}

await browser.close();
