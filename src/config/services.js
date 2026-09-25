import settings from './settings.js';

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
		ko: {
			name: 'Bible OnAir',
			subName: '바이블온에어',
			tagline: '성경 구절 프롬프터',
			/* 검색 결과 제목에만 쓰는 한 줄. 화면의 tagline 과 달리 무엇을 위한
			   프로그램인지까지 담아, 제품명을 모르는 사람도 찾을 수 있게 합니다. */
			metaTagline: '예배용 성경 구절 프롬프터',
			summary: '찾는 순간 바로 화면으로, 예배의 몰입을 돕는 가장 빠른 성경 프롬프터',
			summaryDetail:
				'제어 화면과 송출 화면의 이원화로, 성경 구절을 실시간으로 안전하고 빠르게 제공할 수 있습니다.',
			description: [
				'예배 중 성경 구절을 빠르게 찾아 띄워야 했던 적 있으신가요?',
				'갑작스러운 성경 인용에도 당황하지 마세요.\nBible OnAir는 간단한 조작으로 신속한 구절 송출을 지원합니다.',
			],
			screenshotCaptions: [
				'조작 화면 — 왼쪽에서 구절을 선택하고 오른쪽에서 송출 화면을 미리 봅니다.',
				'송출 화면 — 선택한 구절이 출력 화면에 표시됩니다.',
			],
			features: [
				{
					title: '손쉬운 송출 화면 설정',
					body: '듀얼모니터나 빔프로젝터 등 구절을 송출할 화면을 쉽고 빠르게 설정할 수 있습니다.',
				},
				{
					title: '신속한 구절 선택',
					body: '책, 장, 절을 차례로 선택하여 송출 범위를 신속하게 지정합니다.\n단축키(`Ctrl + F`) 검색 기능도 지원합니다.',
				},
				{
					title: '다양한 송출 모드',
					body: '한 절씩, 여러 절씩 보기, 연속 스크롤 등 다양한 출력 방식을 제공하여 예배 상황에 맞춰 자유롭게 활용할 수 있습니다.',
				},
				{
					title: '송출 대기 및 전환',
					body: '단축키 하나로 송출 상태와 대기 상태를 빠르게 전환할 수 있습니다.',
				},
				{
					title: '즐겨찾기 및 백업',
					body: '자주 사용하는 구절을 즐겨찾기에 등록해 빠르게 꺼내 쓸 수 있습니다.\nJSON 파일 형식의 가져오기/내보내기 기능을 통해 목록을 편리하게 백업하고 공유해 보세요.',
				},
				{
					title: '자동 업데이트',
					body: '새로운 기능과 최신 버전을 빠르게 안내하고 자동으로 업데이트합니다.',
				},
			],
			requirements: {
				columns: ['무료', '유료 (준비 중)'],
				rows: [
					{ label: '운영체제', shared: 'Windows 10 이상' },
					{ label: '출력 화면', shared: '빔프로젝터 또는 보조 모니터' },
					{ label: '인터넷', values: ['연결 불필요', '연결 필요'] },
					{ label: '번역본', values: ['개역한글', '개역개정'] },
				],
			},
			faq: [
				{
					q: 'macOS나 리눅스에서도 쓸 수 있나요?',
					a: '현재 Bible OnAir는 Windows 운영체제만 지원하고 있습니다.\n더 많은 환경에서 편리하게 사용하실 수 있도록, 추후 지원 플랫폼 확장을 검토할 예정입니다.',
				},
				{
					q: '설치하려는데 "알 수 없는 앱" 경고가 뜹니다.',
					a: '안전한 프로그램이니 안심하고 진행하셔도 됩니다.\n초기 배포 버전으로 아직 코드 서명(디지털 인증서) 등록 단계에 있어 Windows가 일시적으로 차단하는 현상입니다.\n\n[설치 방법]\n경고창 화면에서 [추가 정보]를 클릭한 후, 활성화되는 [실행] 버튼을 누르면 정상적으로 설치가 진행됩니다.',
				},
				{
					q: '모니터 목록에 빔프로젝터가 안 보입니다.',
					a: '현재 PC의 디스플레이 설정이 \'화면 복제\' 상태인지 확인해 주세요.\n화면 복제 모드에서는 Windows가 하나의 모니터로만 인식하기 때문에 목록에 나타나지 않습니다.\n바탕화면 우클릭 ➔ [디스플레이 설정] 또는 단축키(Win + P)를 통해 디스플레이 모드를 [확장]으로 변경하시면 정상적으로 인식됩니다.',
				},
			],
			releases: [
				{
					version: '1.1.0',
					date: '2026-09-15',
					summary: '사용자의 개선 요청사항을 반영했습니다.',
					details: [
						'설정 탭 동작 방식을 수정하였습니다.',
						'구절 선택 관련 버그를 수정하였습니다.',
						'송출 모드(두세절씩)를 자연스럽게 다듬었습니다. 폰트 크기에 따라서 출력되는 구절 수가 더 자연스럽게 조정됩니다.',
						'창 크기에 따른 UI를 개선하여 더 이상 미리보기 창이 과도하게 작게 출력되지 않습니다.',
						'폰트 크기 종류가 추가되었습니다. \'작게\'부터 \'아주 크게\' 까지 총 5단계로 설정할 수 있습니다.',
					],
				},
				{
					version: '1.0.0',
					date: '2026-09-11',
					summary: 'Bible OnAir가 출시되었습니다.',
					details: [
						'무료 버전에 개역한글 번역본을 기본 내장하여,\n인터넷 연결이 불가능한 환경에서도 끊김 없이 안정적으로 동작하도록 했습니다.',
					],
				},
			],
			releaseNote:
				'향후 추가되는 새 버전은 홈페이지를 확인할 필요 없이,\n프로그램 내에서 자동으로 안내받고 편리하게 업데이트하실 수 있습니다.',
		},
		en: {
			name: 'Bible OnAir',
			subName: 'Bible OnAir',
			tagline: 'A scripture prompter',
			metaTagline: 'A scripture prompter for worship',
			summary:
				'Found and on screen in an instant — the fastest scripture prompter for worship',
			summaryDetail:
				'A separate control window and output screen put verses up quickly and safely, live.',
			description: [
				'Ever had to find and put a verse on screen in the middle of a service?',
				'An unexpected reading need not throw you.\nBible OnAir sends the passage out in a few keystrokes.',
			],
			screenshotCaptions: [
				'Control window — select a passage on the left, preview the output on the right.',
				'Output screen — the selected passage as displayed up front.',
			],
			features: [
				{
					title: 'Simple output setup',
					body: 'Choose the display the passage goes to — a second monitor or a projector — in a couple of clicks.',
				},
				{
					title: 'Fast passage selection',
					body: 'Select book, chapter and verse in turn to set the range.\nA search shortcut (`Ctrl + F`) is available as well.',
				},
				{
					title: 'Several display modes',
					body: 'One verse, several verses, or continuous scroll — pick whichever suits the moment in the service.',
				},
				{
					title: 'Stage and switch',
					body: 'A single key switches between sending the passage out and holding it back.',
				},
				{
					title: 'Favourites and backup',
					body: 'Register the passages you use often and recall them instantly.\nImport and export the list as JSON to back it up or share it.',
				},
				{
					title: 'Automatic updates',
					body: 'New features and releases are announced and installed automatically.',
				},
			],
			requirements: {
				columns: ['Free', 'Paid (in preparation)'],
				rows: [
					{ label: 'Operating system', shared: 'Windows 10 or later' },
					{ label: 'Output display', shared: 'A projector or second monitor' },
					{ label: 'Internet', values: ['Not required', 'Required'] },
					{ label: 'Translation', values: ['개역한글', '개역개정'] },
				],
			},
			faq: [
				{
					q: 'Is there a macOS or Linux build?',
					a: 'Bible OnAir currently supports Windows only.\nSupport for further platforms is under review.',
				},
				{
					q: 'Windows shows an "unrecognised app" warning.',
					a: 'The program is safe to install.\nThis is an early release and code signing is still being registered, so Windows blocks it temporarily.\n\n[How to install]\nClick [More info] in the warning dialog, then press the [Run anyway] button that appears.',
				},
				{
					q: 'My projector is not in the monitor list.',
					a: 'Check whether the display setting is set to "Duplicate".\nIn duplicate mode Windows sees a single monitor, so the projector does not appear in the list.\nRight-click the desktop ➔ [Display settings], or press Win + P, and switch the mode to [Extend].',
				},
			],
			releases: [
				{
					version: '1.1.0',
					date: '2026-09-15',
					summary: 'Changes requested by people using the app.',
					details: [
						'Reworked how the settings tab behaves.',
						'Fixed bugs in passage selection.',
						'Smoothed out the multi-verse display mode — the number of verses shown now follows the type size more sensibly.',
						'Improved the layout at smaller window sizes, so the preview pane is no longer squeezed.',
						'Added more type sizes — five steps, from the smallest to the largest.',
					],
				},
				{
					version: '1.0.0',
					date: '2026-09-11',
					summary: 'Bible OnAir has been released.',
					details: [
						'The free version bundles the 개역한글 translation,\nso it runs reliably even where no internet connection is available.',
					],
				},
			],
			releaseNote:
				'Later versions need no visit to this page —\nthe program announces and installs them for you.',
		},
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
		ko: {
			name: 'Do-It',
			subName: '두잇',
			tagline: '손짓으로 챙기는 하루',
			metaTagline: '할 일·복약·고정비 체크 앱',
			summary: '꾹 누르면 끝. 약, 루틴, 고정비를 한 장씩 넘기며 챙기는 앱',
			summaryDetail: '설치 없이 휴대폰 브라우저에서 열고, 홈 화면에 추가하면 앱처럼 쓸 수 있습니다.',
			description: [
				'매일 먹는 약, 잊기 쉬운 루틴, 달마다 빠져나가는 고정비. 챙길 것은 많은데 체크리스트는 금방 길어집니다.',
				'Do-It은 한 화면에 한 가지만 보여줍니다.\n꾹 눌러 완료하고, 위로 넘겨 다음 것을 챙기면 됩니다. 놓친 것을 빨갛게 쌓아 재촉하지 않습니다.',
			],
			screenshotCaptions: [
				'한 화면에 하나 — 지금 챙길 것만 크게 보입니다.',
				'꾹 누르면 완료 — 다시 꾹 누르면 되돌립니다.',
				'두 번 탭해서 한 줄로 추가 — "저녁 루테인 1알"처럼 적으면 알아서 나눕니다.',
				'끌어내리면 오늘 요약 — 주제별 남은 것과 고정비 합계를 한눈에.',
			],
			features: [
				{ title: '꾹 눌러 완료', body: '버튼을 찾을 필요 없이 화면을 꾹 누르면 완료됩니다.\n다시 꾹 누르면 되돌리고, 횟수 목표는 누를 때마다 하나씩 올라갑니다.' },
				{ title: '한 줄로 추가', body: '두 번 탭하고 "스쿼트 주 3회", "넷플릭스 매월 25일 17000원"처럼 적으면 시간대·횟수·금액을 알아서 나눠 넣습니다.' },
				{ title: '주제별로 넘겨보기', body: '약·영양제, 루틴, 집안일처럼 주제를 나눠 옆으로 넘깁니다.\n같은 주제 안에서는 위아래로 한 장씩 챙깁니다.' },
				{ title: '간격과 기한', body: '칫솔 교체처럼 며칠마다 하는 일, 자동차 검사처럼 날짜가 정해진 일도 때가 되면 나타납니다.' },
				{ title: '고정비 한눈에', body: '구독·보험·통신비를 분류별로 모아 한 달 합계와 다가오는 결제일을 보여줍니다.\n해지하기로 한 것은 따로 표시합니다.' },
				{ title: '설치 없이 앱처럼', body: '앱스토어를 거치지 않고 브라우저에서 바로 엽니다.\n홈 화면에 추가하면 전체 화면으로 열리고, 한 번 연 뒤에는 인터넷 없이도 열립니다.' },
			],
			installTitle: '홈 화면에 추가하기',
			installSteps: [
				{ title: '휴대폰에서 열기', body: '위의 "웹에서 열기"를 누르거나 doit.isocompany.co.kr 로 들어갑니다. 카카오톡·인스타그램 안에서 열렸다면 오른쪽 아래 메뉴에서 기본 브라우저로 열어주세요.' },
				{ title: '아이폰 (Safari)', body: '아래쪽 공유 버튼을 누르고 [홈 화면에 추가]를 고릅니다.' },
				{ title: '안드로이드 (Chrome · 삼성 인터넷)', body: '오른쪽 위 메뉴(⋮)에서 [홈 화면에 추가] 또는 [앱 설치]를 고릅니다.' },
			],
			requirements: {
				columns: ['무료'],
				rows: [
					{ label: '기기', shared: '휴대폰 · 태블릿 (데스크톱 미지원)' },
					{ label: '브라우저', shared: 'iOS Safari · Android Chrome · 삼성 인터넷' },
					{ label: '설치', shared: '필요 없음 (홈 화면에 추가 권장)' },
					{ label: '인터넷', shared: '처음 열 때만 필요' },
				],
			},
			faq: [
				{
					q: '앱스토어에서 받을 수 있나요?',
					a: '지금은 웹앱으로만 제공합니다.\n브라우저에서 열고 홈 화면에 추가하면 앱 아이콘이 생기고, 주소창 없이 앱처럼 열립니다.',
				},
				{
					q: '컴퓨터에서도 쓸 수 있나요?',
					a: 'Do-It은 꾹 누르기, 두 번 탭, 밀기 같은 손짓으로 쓰는 앱이라 휴대폰과 태블릿만 지원합니다.\n컴퓨터에서 열면 휴대폰으로 옮겨 열 수 있는 QR 코드가 나옵니다.',
				},
				{
					q: '홈 화면에 추가 메뉴가 보이지 않습니다.',
					a: '카카오톡이나 인스타그램 같은 앱 안의 브라우저에서는 이 메뉴가 없습니다.\n아이폰은 Safari, 안드로이드는 Chrome 이나 삼성 인터넷으로 다시 열어주세요.',
				},
			],
			releases: [
				{
					version: '0.1.2',
					date: '2026-09-24',
					summary: '더 앱처럼 동작하도록 다듬었습니다.',
					details: [
						'설정 같은 창이 떠 있을 때 화면이 옆으로 끌려 밀리던 문제를 고쳤습니다.',
						'두 번 탭하거나 두 손가락으로 벌려도 화면이 확대되지 않습니다.',
						'안내 문구를 길게 눌러도 글자가 선택되지 않습니다. 입력창에서는 그대로 쓸 수 있습니다.',
					],
				},
				{
					version: '0.1.1',
					date: '2026-09-24',
					summary: '시작 화면을 다듬었습니다.',
					details: [
						'앱을 열 때 나오는 시작 화면을 조금 더 여유 있게 보여줍니다. 탭하면 바로 넘어갑니다.',
						'시작 화면이 사라진 뒤 화면 아래쪽에 색이 남던 문제를 고쳤습니다.',
					],
				},
				{
					version: '0.1.0',
					date: '2026-09-24',
					summary: 'Do-It이 출시되었습니다.',
					details: [
						'한 화면에 할 일 하나씩 보여줍니다. 꾹 눌러 완료하고, 다시 꾹 누르면 되돌립니다.',
						'두 번 탭해서 한 줄로 추가합니다. 시간대·횟수·금액을 알아서 나눠 넣습니다.',
						'구독·보험·통신비 같은 고정비를 분류별로 모아 한 달 합계와 다가오는 결제일을 보여줍니다.',
						'설치 없이 휴대폰 브라우저에서 열고, 홈 화면에 추가하면 앱처럼 쓸 수 있습니다.',
					],
				},
			],
			releaseNote: '새 버전은 따로 설치할 필요 없이, 앱을 다시 열면 자동으로 적용됩니다.',
		},
		en: {
			name: 'Do-It',
			subName: 'Do-It',
			tagline: 'Your day, one gesture at a time',
			metaTagline: 'A checklist for tasks, pills and bills',
			summary: 'Press and hold to finish. Swipe through pills, routines and bills one card at a time',
			summaryDetail: 'Open it in your phone browser — no install — and add it to the home screen to use it like an app.',
			description: [
				'Daily pills, easy-to-forget routines, monthly bills. There is a lot to keep track of, and checklists grow long fast.',
				'Do-It shows one thing per screen.\nPress and hold to finish it, then swipe up to the next. Missed items are never piled up in red.',
			],
			screenshotCaptions: [
				'One thing per screen — only what needs doing now, in large type.',
				'Press and hold to finish — hold again to undo.',
				'Double-tap to add in one line — it splits time, dose and amount for you.',
				'Pull down for today’s summary — what is left per topic and your monthly bills.',
			],
			features: [
				{ title: 'Press and hold to finish', body: 'No buttons to hunt for: hold anywhere on the card.\nHold again to undo; count goals go up by one each time.' },
				{ title: 'Add in one line', body: 'Double-tap and type a line — the time, count and amount are filled in for you.' },
				{ title: 'Swipe by topic', body: 'Split things into topics such as pills, routines and chores and swipe sideways between them.\nWithin a topic, swipe up card by card.' },
				{ title: 'Intervals and deadlines', body: 'Things you do every few days, or by a set date, show up when they are due.' },
				{ title: 'Bills at a glance', body: 'Subscriptions, insurance and utilities grouped by category, with the monthly total and upcoming payment dates.' },
				{ title: 'An app without installing', body: 'Opens straight in the browser.\nAdd it to the home screen to open it full screen, and offline after the first visit.' },
			],
			installTitle: 'Add to the home screen',
			installSteps: [
				{ title: 'Open it on your phone', body: 'Tap "Open in browser" above, or go to doit.isocompany.co.kr. If it opened inside a messenger app, switch to the default browser first.' },
				{ title: 'iPhone (Safari)', body: 'Tap the Share button at the bottom and choose [Add to Home Screen].' },
				{ title: 'Android (Chrome · Samsung Internet)', body: 'Open the menu (⋮) at the top right and choose [Add to Home screen] or [Install app].' },
			],
			requirements: {
				columns: ['Free'],
				rows: [
					{ label: 'Device', shared: 'Phone · tablet (no desktop)' },
					{ label: 'Browser', shared: 'iOS Safari · Android Chrome · Samsung Internet' },
					{ label: 'Install', shared: 'Not needed (adding to the home screen is recommended)' },
					{ label: 'Internet', shared: 'Only on first open' },
				],
			},
			faq: [
				{
					q: 'Is it on the App Store?',
					a: 'For now it is a web app only.\nOpen it in the browser and add it to the home screen to get an icon that opens without the address bar.',
				},
				{
					q: 'Can I use it on a computer?',
					a: 'Do-It is driven by gestures — hold, double-tap, swipe — so it supports phones and tablets only.\nOn a computer it shows a QR code to open it on your phone.',
				},
				{
					q: 'I cannot find "Add to Home Screen".',
					a: 'Browsers inside apps such as KakaoTalk or Instagram do not offer it.\nReopen the page in Safari on iPhone, or Chrome / Samsung Internet on Android.',
				},
			],
			releases: [
				{
					version: '0.1.2',
					date: '2026-09-24',
					summary: 'Feels more like an app.',
					details: [
						'Fixed panels such as Settings sliding sideways off the screen when dragged.',
						'The screen no longer zooms in when you double-tap or pinch.',
						'Long-pressing labels no longer selects text. Input fields work as before.',
					],
				},
				{
					version: '0.1.1',
					date: '2026-09-24',
					summary: 'Polished the opening screen.',
					details: [
						'The opening screen now stays a little longer. Tap to skip it.',
						'Fixed a strip of color that could stay at the bottom of the screen after the opening screen.',
					],
				},
				{
					version: '0.1.0',
					date: '2026-09-24',
					summary: 'Do-It is out.',
					details: [
						'One thing on screen at a time. Press and hold to finish it, press again to undo.',
						'Double-tap and add in one line — the time of day, the count and the amount are split out for you.',
						'Subscriptions, insurance and phone bills are grouped so you see the monthly total and what is due next.',
						'No install: open it in a phone browser, add it to the home screen and it behaves like an app.',
					],
				},
			],
			releaseNote: 'New versions need no install — they apply the next time you open the app.',
		},
	},
];

export function getService(slug) {
	return services.find((service) => service.slug === slug);
}

export function serviceUrl(slug, lang = settings.defaultLocale) {
	return lang === settings.defaultLocale ? `/${slug}` : `/${lang}/${slug}`;
}
