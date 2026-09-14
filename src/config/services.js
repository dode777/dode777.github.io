import settings from './settings.js';

/**
 * 프로그램 카탈로그.
 * 각 항목은 <도메인>/<slug> 상세 페이지로 렌더링되고, 영문은 /en/<slug> 로 생성됩니다.
 * 본문 문구의 줄바꿈(\n)은 화면에 그대로 반영됩니다.
 *
 * status: 'live' — 배포 중  |  'beta' — 배포 준비 중  |  'dev' — 개발 중
 */
export const services = [
	{
		slug: 'bible-onair',
		status: 'live',
		downloadKind: 'windows',
		releasesUrl: 'https://github.com/dode777/Bible-OnAir-Releases/releases',
		downloadUrl: 'https://github.com/dode777/Bible-OnAir-Releases/releases/latest',
		downloadReady: true,
		currentVersion: '1.0.0',
		installerName: 'Bible-OnAir-Setup-1.0.0.exe',
		screenshots: [
			{ src: '/assets/screenshots/bible-onair-control.png', width: 1100, height: 720 },
			{ src: '/assets/screenshots/bible-onair-screen.png', width: 1599, height: 999 },
		],
		ko: {
			name: 'Bible OnAir',
			subName: '바이블온에어',
			tagline: '성경 구절 프롬프터',
			summary: '노트북에서 장·절을 선택하면 빔프로젝터 화면에 즉시 출력됩니다.',
			description: [
				'예배와 모임에서 성경 본문을 앞 화면에 송출하는 무료 프로그램입니다.\n조작 창은 노트북에 두고 선택한 구절만 출력 화면으로 내보냅니다.',
				'성경 본문을 프로그램에 내장해 인터넷 연결 없이 동작합니다.',
			],
			screenshotCaptions: [
				'조작 창 — 왼쪽에서 구절을 선택하고 오른쪽에서 송출 화면을 미리 봅니다.',
				'송출 화면 — 선택한 구절이 출력 화면에 표시됩니다.',
			],
			features: [
				{
					title: '듀얼 모니터 송출',
					body: '빔프로젝터를 연결한 뒤 출력 화면을 지정합니다.\n모니터를 연결하거나 분리하면 목록이 자동으로 갱신됩니다.',
				},
				{
					title: '책 → 장 → 절 선택',
					body: '책·장·절을 차례로 선택해 범위를 지정합니다.\nCtrl+F로 66권 전체를 검색합니다.',
				},
				{
					title: '표시 모드 3종',
					body: '한 절씩 · 두세 절씩 · 연속 스크롤 중에서 선택합니다.\n긴 절은 화면 크기에 맞춰 글자 크기를 자동 조정합니다.',
				},
				{
					title: '송출 대기',
					body: '다음 구절을 미리 지정해 두고 O 키로 송출합니다.\nQ 키를 누르면 출력 화면을 가립니다.',
				},
				{
					title: '즐겨찾기',
					body: '자주 사용하는 구절을 등록해 두고 바로 불러옵니다.\nJSON 파일로 내보내 다른 PC로 옮길 수 있습니다.',
				},
				{
					title: '자동 업데이트',
					body: '새 버전이 배포되면 프로그램에서 안내하고 설치합니다.',
				},
			],
			requirements: [
				{ label: '운영체제', value: 'Windows 10 이상' },
				{ label: '관리자 권한', value: '불필요' },
				{ label: '출력 화면', value: '빔프로젝터 또는 보조 모니터' },
				{ label: '인터넷', value: '연결 불필요' },
				{ label: '무료 버전', value: '개역한글' },
				{ label: '유료 버전 (준비 중)', value: '개역개정' },
			],
			faq: [
				{
					q: 'macOS나 리눅스에서도 쓸 수 있나요?',
					a: '현재 Windows만 지원합니다.',
				},
				{
					q: '설치하려는데 "알 수 없는 앱" 경고가 뜹니다.',
					a: '「추가 정보」를 선택한 뒤 「실행」을 누르면 설치가 진행됩니다.\n코드 서명 인증서를 아직 적용하지 않아 표시되는 경고입니다.',
				},
				{
					q: '모니터 목록에 빔프로젝터가 안 보입니다.',
					a: 'Windows 디스플레이 설정을 「확장」으로 변경해 주세요.\n복제 모드에서는 화면이 하나로 인식됩니다.',
				},
			],
			releases: [
				{
					version: '1.0.0',
					date: '2026-09-11',
					notes: [
						'첫 공개 버전입니다.',
						'설치 후 새 버전은 프로그램에서 자동으로 안내합니다.',
						'개역한글 본문을 내장해 인터넷 연결 없이 동작합니다.',
					],
				},
			],
			releaseNote: '전체 버전 목록은 GitHub Releases에서 확인하실 수 있습니다.',
		},
		en: {
			name: 'Bible OnAir',
			subName: 'Bible OnAir',
			tagline: 'A scripture prompter',
			summary: 'Select a book, chapter and verse on your laptop and it is displayed on the projector.',
			description: [
				'For putting scripture on the front screen during a service or meeting.\nThe control window stays on your laptop; only the passage goes out.',
				'It works without an internet connection, and tells you when a new version is out.',
			],
			screenshotCaptions: [
				'Control window — select a passage on the left, preview the output on the right.',
				'Output screen — the selected passage as displayed up front.',
			],
			features: [
				{
					title: 'Dual-screen output',
					body: 'Connect the projector, then designate the output display.\nThe list refreshes when monitors are connected or removed.',
				},
				{
					title: 'Book → chapter → verse',
					body: 'Select book, chapter and verse in turn to set the range.\nCtrl+F searches all 66 books.',
				},
				{
					title: 'Three display modes',
					body: 'One verse, a few verses, or continuous scroll.\nLong verses are scaled automatically to fit the screen.',
				},
				{
					title: 'Staged output',
					body: 'Stage the next passage in advance and send it with the O key.\nThe Q key blanks the output screen.',
				},
				{
					title: 'Favourites',
					body: 'Register frequently used passages for immediate recall.\nExport them as JSON to transfer to another PC.',
				},
				{
					title: 'Automatic updates',
					body: 'New releases are announced and installed from within the app.',
				},
			],
			requirements: [
				{ label: 'Operating system', value: 'Windows 10 or later' },
				{ label: 'Admin rights', value: 'Not required' },
				{ label: 'Second screen', value: 'A projector or second monitor' },
				{ label: 'Internet', value: 'No connection required' },
				{ label: 'Free version', value: '개역한글 (Korean Revised Version)' },
				{ label: 'Paid version (in preparation)', value: '개역개정 (Revised New Korean Standard)' },
			],
			faq: [
				{
					q: 'Is there a macOS or Linux build?',
					a: 'Windows only at present.',
				},
				{
					q: 'Windows shows an "unrecognised app" warning.',
					a: 'Choose "More info", then "Run anyway".\nThe build is not code-signed yet.',
				},
				{
					q: 'My projector is not in the monitor list.',
					a: 'Set Windows display settings to "Extend".\nIn mirrored mode only one screen is detected.',
				},
			],
			releases: [
				{
					version: '1.0.0',
					date: '2026-09-11',
					notes: [
						'First public release.',
						'After installation, new versions are announced within the app.',
						'The 개역한글 text is bundled, so no connection is required.',
					],
				},
			],
			releaseNote: 'The full version history is available on GitHub Releases.',
		},
	},
];

export function getService(slug) {
	return services.find((service) => service.slug === slug);
}

export function serviceUrl(slug, lang = settings.defaultLocale) {
	return lang === settings.defaultLocale ? `/${slug}` : `/${lang}/${slug}`;
}
