import settings from './settings.js';

/**
 * 프로그램 카탈로그.
 * 각 항목은 <도메인>/<slug> 상세 페이지로 렌더링되고, 영문은 /en/<slug> 로 생성됩니다.
 * 문구의 줄바꿈(\n)은 화면에 그대로 반영되고, `백틱`으로 감싼 부분은 키 표기로 렌더링됩니다.
 *
 * status: 'live' — 정식 버전  |  'beta' — 출시 준비 중  |  'dev' — 개발 중
 */

/** 버전을 올릴 때는 이 두 값만 고치면 설치 파일 주소까지 함께 바뀝니다. */
const BIBLE_ONAIR_VERSION = '1.0.0';
const BIBLE_ONAIR_INSTALLER = `Bible-OnAir-Setup-${BIBLE_ONAIR_VERSION}.exe`;

export const services = [
	{
		slug: 'bible-onair',
		status: 'live',
		downloadKind: 'windows',
		/** 릴리스 목록이 아니라 설치 파일을 바로 내려받도록 연결합니다. */
		downloadUrl: `https://github.com/dode777/Bible-OnAir-Releases/releases/download/v${BIBLE_ONAIR_VERSION}/${BIBLE_ONAIR_INSTALLER}`,
		downloadReady: true,
		currentVersion: BIBLE_ONAIR_VERSION,
		installerName: BIBLE_ONAIR_INSTALLER,
		screenshots: [
			{ src: '/assets/screenshots/bible-onair-control.png', width: 1100, height: 720 },
			{ src: '/assets/screenshots/bible-onair-screen.png', width: 1599, height: 999 },
		],
		ko: {
			name: 'Bible OnAir',
			subName: '바이블온에어',
			tagline: '성경 구절 프롬프터',
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
					version: BIBLE_ONAIR_VERSION,
					date: '2026-09-11',
					notes: [
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
					version: BIBLE_ONAIR_VERSION,
					date: '2026-09-11',
					notes: [
						'The free version bundles the 개역한글 translation,\nso it runs reliably even where no internet connection is available.',
					],
				},
			],
			releaseNote:
				'Later versions need no visit to this page —\nthe program announces and installs them for you.',
		},
	},
];

export function getService(slug) {
	return services.find((service) => service.slug === slug);
}

export function serviceUrl(slug, lang = settings.defaultLocale) {
	return lang === settings.defaultLocale ? `/${slug}` : `/${lang}/${slug}`;
}
