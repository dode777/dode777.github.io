import settings from './settings.js';

/**
 * 서비스 카탈로그.
 * 각 서비스는 <도메인>/<slug> 경로의 상세 페이지로 렌더링되고,
 * 영문 페이지는 /en/<slug> 로 생성됩니다.
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
			tagline: '예배 화면에 성경 구절을 띄우는 Windows 프로그램',
			summary:
				'노트북에서 구절을 고르면 빔프로젝터나 보조 모니터에 전체 화면으로 나갑니다. 성경 본문이 프로그램에 들어 있어 인터넷 없이 동작합니다.',
			description: [
				'교회 예배와 모임에서 앞 화면에 성경 본문을 띄우기 위해 만든 프로그램입니다. 조작 창은 노트북에 두고, 고른 구절만 빔프로젝터나 보조 모니터로 내보냅니다.',
				'본문은 저작권이 소멸된 「성경전서 개역한글판」(1961)을 쓰며 프로그램에 함께 들어 있습니다. 개역개정은 대한성서공회의 저작권물이라, 사용 허락을 확보한 뒤 유료 기능으로 따로 제공할 예정입니다.',
				'설치는 한 번만 하면 되고, 이후 새 버전은 프로그램이 스스로 확인해 안내합니다.',
			],
			screenshotCaptions: [
				'조작 창 — 왼쪽에서 책·장·절을 고르고 오른쪽에서 송출될 화면을 미리 봅니다.',
				'송출 화면 — 선택한 구절이 앞 화면에 전체 화면으로 나갑니다.',
			],
			features: [
				{
					title: '듀얼 모니터 송출',
					body: '연결된 모니터 중 출력 화면을 고르면 조작 창은 노트북에, 본문은 앞 화면에 전체 화면으로 나갑니다. 모니터를 꽂거나 빼면 목록이 바로 갱신됩니다.',
				},
				{
					title: '책 → 장 → 절 3단 선택',
					body: '세 단계로 구절 범위를 고릅니다. Ctrl+F 로 66권 전체에서 구절을 찾을 수도 있습니다.',
				},
				{
					title: '표시 모드 3종과 글자 크기',
					body: '한 절씩 · 두세 절씩 · 연속 스크롤 중에서 고르고, 글자 크기는 4단계로 조절합니다. 긴 절은 화면에 맞게 자동으로 줄어듭니다.',
				},
				{
					title: '송출 대기',
					body: '다음 구절을 미리 골라 두었다가 O 로 내보내고, Q 로 화면을 가립니다. 찬양이나 기도 중에 다음 구절을 준비해 둘 수 있습니다.',
				},
				{
					title: '즐겨찾기',
					body: '자주 쓰는 구절을 등록하고 순서를 바꿉니다. JSON 파일로 내보내 다른 컴퓨터로 옮길 수 있습니다.',
				},
				{
					title: '자동 업데이트',
					body: '새 버전이 나오면 프로그램 안에서 안내하고 설치합니다. 이 페이지를 다시 찾아올 필요가 없습니다.',
				},
			],
			requirements: [
				{ label: '운영체제', value: 'Windows 10 이상 (64비트)' },
				{ label: '설치', value: '설치 파일 실행 · 관리자 권한 불필요' },
				{ label: '설치 파일', value: 'Bible-OnAir-Setup-1.0.0.exe' },
				{ label: '권장 구성', value: '빔프로젝터 또는 보조 모니터 연결' },
				{ label: '인터넷', value: '불필요 · 업데이트 확인에만 사용' },
				{ label: '성경 본문', value: '성경전서 개역한글판 (1961) 내장' },
				{ label: '가격', value: '무료 · 개역개정 유료 기능은 준비 중' },
			],
			faq: [
				{
					q: 'macOS나 리눅스에서도 쓸 수 있나요?',
					a: 'Windows 전용입니다. 다른 운영체제 지원은 아직 계획에 없습니다.',
				},
				{
					q: '설치했는데 "알 수 없는 앱" 경고가 뜹니다.',
					a: '파란색 "Windows의 PC 보호"(SmartScreen) 창입니다. 창 안의 「추가 정보」를 누르고 아래에 나타나는 「실행」을 누르면 설치가 진행됩니다. 프로그램에 문제가 있어서가 아니라 코드 서명 인증서를 아직 붙이지 않아 나오는 안내이며, 서명은 적용할 예정입니다.',
				},
				{
					q: '모니터 목록에 빔프로젝터가 안 보입니다.',
					a: 'Windows 디스플레이 설정이 「확장」인지 확인해 주세요. 복제(미러링) 상태에서는 화면 하나로만 인식됩니다. 케이블을 다시 꽂으면 모니터 목록은 자동으로 갱신됩니다.',
				},
			],
			releases: [
				{
					version: '1.0.0',
					date: null,
					notes: [
						'서비스명을 Bible OnAir 로 확정하고 버전을 1.0.0 부터 다시 시작합니다.',
						'본문을 「성경전서 개역한글판」(1961)으로 전환했습니다. 개역개정은 사용 허락을 확보한 뒤 유료 기능으로 제공할 예정입니다.',
						'설치 방식을 설치 파일(NSIS)로 바꾸고 프로그램 안에서 도는 자동 업데이트를 도입했습니다.',
						'책 → 장 → 절 3단 선택과 전권 검색, 송출 대기, 즐겨찾기, 연속 스크롤 정속 이송을 넣었습니다.',
						'이전 Bible Viewer 를 쓰던 경우 설정은 처음 한 번 다시 맞춰야 하며, 즐겨찾기는 JSON 파일로 옮길 수 있습니다.',
					],
				},
			],
			releaseNote: '설치 파일과 전체 버전 기록은 GitHub Releases 에 있습니다.',
		},
		en: {
			name: 'Bible OnAir',
			subName: 'Bible OnAir',
			tagline: 'A Windows app that puts scripture on the service screen',
			summary:
				'Pick a passage on your laptop and it goes full screen on the projector or second monitor. The scripture text ships inside the app, so it works offline.',
			description: [
				'Built to put scripture on the front screen during church services and gatherings. The control window stays on your laptop while only the selected passage goes out to the projector or second monitor.',
				'The bundled text is the Korean Revised Version of 1961 (성경전서 개역한글판), which is in the public domain. The 개역개정 revision is under copyright by the Korean Bible Society and will be offered as a separate paid feature once permission is secured.',
				'You install once; after that the app checks for new versions on its own.',
			],
			screenshotCaptions: [
				'Control window — choose book, chapter and verse on the left, preview the output on the right.',
				'Output screen — the selected passage, full screen on the front display.',
			],
			features: [
				{
					title: 'Dual-screen output',
					body: 'Choose an output display from the connected monitors. Controls stay on your laptop while the passage goes full screen up front, and the list refreshes as monitors are plugged in or removed.',
				},
				{
					title: 'Book → chapter → verse',
					body: 'Pick a passage range in three steps, or press Ctrl+F to search across all 66 books.',
				},
				{
					title: 'Three display modes and type sizes',
					body: 'One verse, a few verses, or continuous scroll — with four type sizes. Long verses shrink to fit the screen automatically.',
				},
				{
					title: 'Staged output',
					body: 'Queue the next passage in advance, send it with O, and blank the screen with Q — so you can prepare during a song or prayer.',
				},
				{
					title: 'Favourites',
					body: 'Save and reorder passages you use often, and export them as JSON to move to another computer.',
				},
				{
					title: 'Automatic updates',
					body: 'New versions are announced and installed from inside the app — no need to come back to this page.',
				},
			],
			requirements: [
				{ label: 'Operating system', value: 'Windows 10 or later (64-bit)' },
				{ label: 'Installation', value: 'Run the installer — no administrator rights needed' },
				{ label: 'Installer', value: 'Bible-OnAir-Setup-1.0.0.exe' },
				{ label: 'Recommended setup', value: 'A projector or second monitor' },
				{ label: 'Internet', value: 'Not required — used only to check for updates' },
				{ label: 'Scripture text', value: 'Korean Revised Version, 1961 (bundled)' },
				{ label: 'Price', value: 'Free — a paid 개역개정 option is in preparation' },
			],
			faq: [
				{
					q: 'Is there a macOS or Linux build?',
					a: 'Windows only. Support for other platforms is not planned at the moment.',
				},
				{
					q: 'Windows shows an "unrecognised app" warning.',
					a: 'That is the blue "Windows protected your PC" (SmartScreen) dialog. Choose "More info", then "Run anyway". The build is not code-signed yet — signing is planned.',
				},
				{
					q: 'My projector is not in the monitor list.',
					a: 'Check that Windows display settings are set to "Extend". In mirrored mode only one screen is detected. Reconnecting the cable refreshes the list automatically.',
				},
			],
			releases: [
				{
					version: '1.0.0',
					date: null,
					notes: [
						'The app is now called Bible OnAir, and versioning restarts at 1.0.0.',
						'The bundled text moved to the public-domain Korean Revised Version of 1961; 개역개정 will follow as a paid feature once permission is secured.',
						'Distribution moved to a Windows installer (NSIS) with in-app automatic updates.',
						'Added book → chapter → verse selection, full-Bible search, staged output, favourites, and steady continuous scrolling.',
					],
				},
			],
			releaseNote: 'Installers and the full version history live on GitHub Releases.',
		},
	},
];

export function getService(slug) {
	return services.find((service) => service.slug === slug);
}

export function serviceUrl(slug, lang = settings.defaultLocale) {
	return lang === settings.defaultLocale ? `/${slug}` : `/${lang}/${slug}`;
}
