// 릴리스 에셋의 누적 다운로드 수를 기록합니다.
//
// GitHub 는 "지금까지 몇 번" 만 알려주고 기간별 추이는 주지 않습니다.
// 그래서 주기적으로 찍어 두어야 나중에 "이번 주에 몇 건" 을 셀 수 있습니다.
//
// 값이 하나도 바뀌지 않은 날에는 아무것도 적지 않습니다.
// 두 기록 사이의 빈 날은 '변화 없음' 으로 읽으면 됩니다.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const RELEASES_API =
	'https://api.github.com/repos/dode777/Bible-OnAir-Releases/releases?per_page=100';
const CSV_PATH = 'data/download-stats.csv';
const HEADER = 'recorded_at,tag,asset,download_count';

/** 쉼표가 들어오면 CSV 가 깨지므로 미리 막습니다. 실제로는 들어올 일이 없습니다. */
function cell(value) {
	return String(value).replace(/[,\r\n]/g, ' ').trim();
}

async function fetchReleases() {
	const headers = {
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
	};
	// Actions 에서는 토큰을 붙여 시간당 한도를 늘립니다. 없으면 익명으로도 됩니다.
	if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

	const res = await fetch(RELEASES_API, { headers });
	if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText}`);
	return res.json();
}

/** 태그·파일 이름 순으로 정렬해, 같은 상태면 같은 줄이 나오게 합니다. */
export function toRows(releases) {
	const rows = [];
	for (const release of releases) {
		if (release.draft) continue;
		for (const asset of release.assets ?? []) {
			rows.push({
				tag: cell(release.tag_name),
				asset: cell(asset.name),
				count: Number(asset.download_count) || 0,
			});
		}
	}
	rows.sort((a, b) => a.tag.localeCompare(b.tag) || a.asset.localeCompare(b.asset));
	return rows;
}

/** 파일에 쌓인 기록에서 항목별 마지막 값만 추립니다. */
export function lastSnapshot(csv) {
	const seen = new Map();
	for (const line of csv.split('\n')) {
		const text = line.trim();
		if (!text || text === HEADER) continue;
		const [, tag, asset, count] = text.split(',');
		if (asset === undefined) continue;
		seen.set(`${tag}\t${asset}`, Number(count) || 0);
	}
	return seen;
}

export function hasChanged(rows, snapshot) {
	if (rows.length !== snapshot.size) return true;
	return rows.some((row) => snapshot.get(`${row.tag}\t${row.asset}`) !== row.count);
}

async function main() {
	const rows = toRows(await fetchReleases());
	if (rows.length === 0) {
		console.log('릴리스 에셋이 없습니다. 기록하지 않습니다.');
		return;
	}

	let csv = '';
	try {
		csv = await readFile(CSV_PATH, 'utf8');
	} catch (error) {
		if (error.code !== 'ENOENT') throw error;
	}

	if (csv && !hasChanged(rows, lastSnapshot(csv))) {
		console.log('다운로드 수가 이전 기록과 같습니다. 기록하지 않습니다.');
		return;
	}

	const recordedAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
	const appended = rows.map((row) => `${recordedAt},${row.tag},${row.asset},${row.count}`);

	const body = csv.trim() ? `${csv.trimEnd()}\n` : `${HEADER}\n`;
	await mkdir(dirname(CSV_PATH), { recursive: true });
	await writeFile(CSV_PATH, `${body}${appended.join('\n')}\n`, 'utf8');

	console.log(`${recordedAt} 기준 ${appended.length}줄을 기록했습니다.`);
}

// 테스트에서 불러 쓸 때는 실행하지 않습니다.
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
	await main();
}
