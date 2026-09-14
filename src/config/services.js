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
			summary: '노트북에서 구절을 고르면 빔프로젝터 화면에 바로 뜹니다.',
			description: [
				'예배나 모임에서 앞 화면에 성경 본문을 띄울 때 씁니다.\n조작 창은 노트북에 두고 고른 구절만 앞으로 내보냅니다.',
				'인터넷이 없어도 돌아갑니다. 새 버전이 나오면 프로그램이 알려줍니다.',
			],
			screenshotCaptions: [
				'조작 창. 왼쪽에서 구절을 고르고 오른쪽에서 미리 봅니다.',
				'송출 화면. 고른 구절이 앞 화면에 뜹니다.',
			],
			features: [
				{
					title: '듀얼 모니터 송출',
					body: '연결된 모니터 중에서 출력 화면을 고릅니다.\n모니터를 꽂거나 빼면 목록이 바로 바뀝니다.',
				},
				{
					title: '책 → 장 → 절 선택',
					body: '세 단계로 고릅니다. Ctrl+F를 누르면 66권을 한 번에 찾습니다.',
				},
				{
					title: '표시 모드 3종',
					body: '한 절씩 · 두세 절씩 · 연속 스크롤 중에 고릅니다.\n글자 크기는 네 단계입니다.',
				},
				{
					title: '송출 대기',
					body: '다음 구절을 미리 골라 뒀다가 O로 내보내고 Q로 가립니다.',
				},
				{
					title: '즐겨찾기',
					body: '자주 쓰는 구절을 저장해 두고 다른 컴퓨터로 옮겨 씁니다.',
				},
				{
					title: '자동 업데이트',
					body: '새 버전이 나오면 프로그램 안에서 알리고 바로 설치합니다.',
				},
			],
			requirements: [
				{ label: '운영체제', value: 'Windows 10 이상' },
				{ label: '관리자 권한', value: '필요 없습니다' },
				{ label: '출력 화면', value: '빔프로젝터 또는 보조 모니터' },
				{ label: '인터넷', value: '없어도 됩니다' },
				{ label: '무료 버전', value: '개역한글' },
				{ label: '유료 버전 (준비 중)', value: '개역개정' },
			],
			faq: [
				{
					q: 'macOS나 리눅스에서도 쓸 수 있나요?',
					a: 'Windows에서만 됩니다.',
				},
				{
					q: '설치하려는데 "알 수 없는 앱" 경고가 뜹니다.',
					a: '「추가 정보」 → 「실행」 순서로 누르면 설치가 이어집니다.\n코드 서명을 아직 붙이지 않아 뜨는 경고입니다.',
				},
				{
					q: '모니터 목록에 빔프로젝터가 안 보입니다.',
					a: 'Windows 디스플레이 설정을 「확장」으로 바꿔 주세요.\n복제로 되어 있으면 화면 하나로만 잡힙니다.',
				},
			],
			releases: [
				{
					version: '1.0.0',
					date: '2026-09-11',
					notes: [
						'첫 공개 버전입니다.',
						'한 번 설치하면 다음 버전부터는 프로그램이 알려줍니다.',
						'개역한글 본문이 들어 있어 인터넷 없이 돌아갑니다.',
					],
				},
			],
			releaseNote: '모든 버전은 GitHub Releases에 있습니다.',
		},
		en: {
			name: 'Bible OnAir',
			subName: 'Bible OnAir',
			tagline: 'A scripture prompter',
			summary: 'Pick a passage on your laptop; it lands on the projector.',
			description: [
				'For putting scripture on the front screen during a service or meeting.\nThe control window stays on your laptop; only the passage goes out.',
				'It works without an internet connection, and tells you when a new version is out.',
			],
			screenshotCaptions: [
				'Control window. Pick a passage on the left, preview it on the right.',
				'Output screen. The passage as it appears up front.',
			],
			features: [
				{
					title: 'Dual-screen output',
					body: 'Pick which connected display to send to.\nThe list updates as monitors come and go.',
				},
				{
					title: 'Book → chapter → verse',
					body: 'Pick in three steps, or press Ctrl+F to search all 66 books.',
				},
				{
					title: 'Three display modes',
					body: 'One verse, a few verses, or continuous scroll.\nFour type sizes.',
				},
				{
					title: 'Staged output',
					body: 'Queue the next passage, send it with O, blank the screen with Q.',
				},
				{
					title: 'Favourites',
					body: 'Save the passages you use often and move them between computers.',
				},
				{
					title: 'Automatic updates',
					body: 'New versions are announced and installed inside the app.',
				},
			],
			requirements: [
				{ label: 'Operating system', value: 'Windows 10 or later' },
				{ label: 'Admin rights', value: 'Not needed' },
				{ label: 'Second screen', value: 'A projector or second monitor' },
				{ label: 'Internet', value: 'Not needed' },
				{ label: 'Free version', value: '개역한글 (Korean Revised Version)' },
				{ label: 'Paid version (in preparation)', value: '개역개정 (Revised New Korean Standard)' },
			],
			faq: [
				{
					q: 'Is there a macOS or Linux build?',
					a: 'Windows only, for now.',
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
						'Once installed, the app tells you when a new version is out.',
						'The 개역한글 text is bundled, so it works offline.',
					],
				},
			],
			releaseNote: 'Every version lives on GitHub Releases.',
		},
	},
];

export function getService(slug) {
	return services.find((service) => service.slug === slug);
}

export function serviceUrl(slug, lang = settings.defaultLocale) {
	return lang === settings.defaultLocale ? `/${slug}` : `/${lang}/${slug}`;
}
