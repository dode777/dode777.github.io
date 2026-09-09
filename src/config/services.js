import settings from './settings.js';

/**
 * 서비스 카탈로그.
 * 각 서비스는 dode777.github.io/<slug> 경로의 상세 페이지로 렌더링되고,
 * 영문 페이지는 /en/<slug> 로 생성됩니다.
 *
 * status: 'beta'    — 배포 준비 완료 단계, 다운로드 임박
 *         'dev'     — 개발 진행 중, 아직 배포 파일 없음
 */
export const services = [
	{
		slug: 'bible-onair',
		status: 'beta',
		downloadKind: 'windows',
		accent: 'var(--theme-surface-2)',
		repo: 'https://github.com/dode777/Bible-Viewer',
		releasesUrl: 'https://github.com/dode777/Bible-Viewer/releases',
		downloadUrl: 'https://github.com/dode777/Bible-Viewer/releases/latest',
		/** 첫 정식 릴리스가 올라가기 전까지 false 로 두면 버튼이 '준비 중'으로 표시됩니다. */
		downloadReady: false,
		currentVersion: '2.3.2',
		ko: {
			name: 'Bible On Air',
			subName: '바이블온에어',
			tagline: '예배와 모임을 위한 성경 프롬프터',
			summary:
				'성경 구절을 골라 두 번째 화면에 큰 글씨로 띄우는 윈도우용 프롬프터입니다. 설치 없이 실행 파일 하나로 씁니다.',
			description: [
				'예배, 소그룹, 수련회처럼 앞 화면에 성경 본문을 띄워야 하는 자리를 위해 만들었습니다. 노트북에서 책·장·절만 고르면 빔프로젝터나 보조 모니터에 본문이 전체 화면으로 나갑니다.',
				'성경 본문은 프로그램 안에 들어 있어서 인터넷 연결 없이도 동작합니다. 진행 중에는 방향키만으로 다음 절, 이전 절을 넘길 수 있어 조작할 사람이 따로 필요하지 않습니다.',
			],
			features: [
				{
					title: '듀얼 모니터 송출',
					body: '연결된 모니터 목록에서 출력 화면을 고르면, 조작 화면은 노트북에 두고 본문만 앞 화면에 전체 화면으로 띄웁니다.',
				},
				{
					title: '세 가지 표시 모드',
					body: '연속 스크롤, 한 절씩 슬라이드, 슬라이드+스크롤 중에서 진행 방식에 맞는 모드를 고를 수 있습니다.',
				},
				{
					title: '빠른 책 검색',
					body: '“디모”, “데살”처럼 앞 글자 몇 개만 쳐도 해당 성경책이 바로 잡힙니다. 방향키와 Enter로 선택합니다.',
				},
				{
					title: '방향키 진행',
					body: '↑ ↓ 로 스크롤, ← → 로 절 이동. Shift를 함께 누르면 페이지 단위로 크게 넘어갑니다.',
				},
				{
					title: '글자 크기 조절',
					body: '30px에서 200px까지 폰트 크기를 바꿀 수 있어 화면 크기와 자리 배치에 맞게 조절됩니다.',
				},
				{
					title: '설정 자동 저장',
					body: '모니터, 폰트, 모드, 장/절 표시 여부 등 마지막 설정을 기억했다가 다음 실행 때 그대로 불러옵니다.',
				},
			],
			steps: [
				{
					title: '실행 파일 내려받기',
					body: '아래 다운로드 버튼으로 GitHub 릴리스 페이지에서 Bible Viewer 실행 파일을 받습니다.',
				},
				{
					title: '바로 실행',
					body: '설치 과정이 없는 포터블 방식입니다. 내려받은 exe 파일을 두 번 눌러 바로 실행하세요. USB에 넣어 다른 PC에서 쓸 수도 있습니다.',
				},
				{
					title: '출력 모니터 선택',
					body: '빔프로젝터나 보조 모니터를 먼저 연결한 뒤, 상단의 “모니터” 항목에서 본문을 띄울 화면을 고릅니다.',
				},
				{
					title: '구절 범위 지정',
					body: '책을 고르고 시작 장/절과 끝 장/절을 지정합니다. 슬라이드 모드에서는 시작 지점만 정하면 됩니다.',
				},
				{
					title: '스크린 켜기',
					body: '오른쪽 아래 “스크린 켜기”를 누르면 선택한 화면에 본문이 뜹니다. 이후에는 방향키로 진행하세요.',
				},
			],
			requirements: [
				{ label: '운영체제', value: 'Windows 10 이상 (64비트)' },
				{ label: '설치', value: '설치 불필요 · 포터블 실행 파일' },
				{ label: '권장 구성', value: '보조 모니터 또는 빔프로젝터 연결' },
				{ label: '인터넷', value: '불필요 · 성경 본문 내장' },
				{ label: '가격', value: '무료' },
			],
			faq: [
				{
					q: 'macOS나 리눅스에서도 쓸 수 있나요?',
					a: '현재는 Windows용 실행 파일만 제공합니다. 다른 운영체제 지원은 검토 중이며, 필요하시면 문의 채널로 알려주세요.',
				},
				{
					q: '설치했는데 “알 수 없는 앱” 경고가 뜹니다.',
					a: '코드 서명 인증서를 아직 적용하지 않아 Windows SmartScreen이 경고를 표시할 수 있습니다. “추가 정보 → 실행”을 눌러 진행하시면 됩니다.',
				},
				{
					q: '인터넷이 안 되는 곳에서도 되나요?',
					a: '됩니다. 성경 본문이 프로그램에 함께 들어 있어 네트워크 없이 동작합니다.',
				},
				{
					q: '모니터 목록에 빔프로젝터가 안 보입니다.',
					a: '프로그램을 켜기 전에 먼저 케이블을 연결하고 Windows 디스플레이 설정에서 “확장” 모드인지 확인해 주세요. 복제(미러링) 상태에서는 하나의 화면으로만 인식됩니다.',
				},
				{
					q: '다른 성경 역본을 넣을 수 있나요?',
					a: '현재는 내장된 본문 한 종류로 동작합니다. 역본 추가는 검토 중인 항목입니다.',
				},
			],
			releases: [
				{
					version: '2.3.2',
					date: '2025-09-16',
					notes: ['화면 디자인 정리 및 표시 요소 다듬기'],
				},
				{
					version: '2.3.1',
					date: '2025-09-16',
					notes: ['진행 편의 기능 보강'],
				},
				{
					version: '2.2.1',
					date: '2025-09-14',
					notes: ['슬라이드+스크롤 모드 및 표시 절 수 설정 정리'],
				},
				{
					version: '2.1.1',
					date: '2025-09-07',
					notes: ['기능 추가 및 동작 오류 수정'],
				},
				{
					version: '2.1.0',
					date: '2025-09-07',
					notes: ['표시 모드 확장'],
				},
				{
					version: '1.2.0',
					date: '2025-09-07',
					notes: ['초기 기능 세트 구성'],
				},
			],
			releaseNote:
				'아래는 개발 저장소의 버전 기록입니다. 항목별 상세 변경 내역은 GitHub 저장소에서 확인할 수 있습니다.',
		},
		en: {
			name: 'Bible On Air',
			subName: 'Bible On Air',
			tagline: 'A scripture prompter for services and gatherings',
			summary:
				'A Windows prompter that puts the passage you pick on a second screen in large type. One portable file, no installation.',
			description: [
				'Built for services, small groups, and retreats — anywhere a passage needs to go up on the front screen. Pick a book, chapter, and verse on your laptop, and the text goes full screen on the projector or second monitor.',
				'The scripture text ships inside the app, so it works without an internet connection. During a service you move through verses with the arrow keys alone.',
			],
			features: [
				{
					title: 'Dual-screen output',
					body: 'Choose an output display from the list of connected monitors. Controls stay on your laptop while only the passage goes full screen up front.',
				},
				{
					title: 'Three display modes',
					body: 'Continuous scroll, one verse at a time, or slide-plus-scroll — pick whichever matches how the session runs.',
				},
				{
					title: 'Fast book search',
					body: 'Type a few characters and the matching book is selected. Navigate results with the arrow keys and confirm with Enter.',
				},
				{
					title: 'Arrow-key control',
					body: '↑ ↓ to scroll, ← → to move between verses. Hold Shift to jump a full page at a time.',
				},
				{
					title: 'Adjustable type size',
					body: 'Font size runs from 30px to 200px so the text fits the room and the screen you are using.',
				},
				{
					title: 'Settings remembered',
					body: 'Display, font size, mode, and reference visibility are saved and restored the next time you open the app.',
				},
			],
			steps: [
				{
					title: 'Download the executable',
					body: 'Use the download button below to get the Bible Viewer executable from the GitHub releases page.',
				},
				{
					title: 'Run it directly',
					body: 'It is portable — there is no installer. Double-click the .exe to start. You can carry it on a USB drive and run it on another PC.',
				},
				{
					title: 'Pick the output display',
					body: 'Connect the projector or second monitor first, then choose the target screen under “모니터” at the top of the window.',
				},
				{
					title: 'Set the passage range',
					body: 'Choose a book and set the start and end chapter/verse. In slide mode you only need the starting point.',
				},
				{
					title: 'Turn the screen on',
					body: 'Press the button at the bottom right to send the passage to the selected display, then drive it with the arrow keys.',
				},
			],
			requirements: [
				{ label: 'Operating system', value: 'Windows 10 or later (64-bit)' },
				{ label: 'Installation', value: 'None — portable executable' },
				{ label: 'Recommended setup', value: 'A second monitor or projector' },
				{ label: 'Internet', value: 'Not required — scripture text is bundled' },
				{ label: 'Price', value: 'Free' },
			],
			faq: [
				{
					q: 'Is there a macOS or Linux build?',
					a: 'Only a Windows executable is available right now. Other platforms are under review — let us know through the contact channel if you need one.',
				},
				{
					q: 'Windows shows an “unrecognised app” warning.',
					a: 'The build is not code-signed yet, so SmartScreen may warn you. Choose “More info → Run anyway” to continue.',
				},
				{
					q: 'Does it work offline?',
					a: 'Yes. The scripture text is bundled with the app, so no network connection is needed.',
				},
				{
					q: 'My projector is not in the monitor list.',
					a: 'Connect the cable before launching the app and make sure Windows display settings are set to “Extend”. In mirrored mode only one screen is detected.',
				},
				{
					q: 'Can I add another translation?',
					a: 'The app currently ships with a single bundled Korean text. Additional translations are under consideration.',
				},
			],
			releases: [
				{
					version: '2.3.2',
					date: '2025-09-16',
					notes: ['Interface cleanup and display refinements'],
				},
				{
					version: '2.3.1',
					date: '2025-09-16',
					notes: ['Improvements to live navigation'],
				},
				{
					version: '2.2.1',
					date: '2025-09-14',
					notes: ['Slide-plus-scroll mode and verses-per-screen setting'],
				},
				{
					version: '2.1.1',
					date: '2025-09-07',
					notes: ['Added features and bug fixes'],
				},
				{ version: '2.1.0', date: '2025-09-07', notes: ['Additional display modes'] },
				{ version: '1.2.0', date: '2025-09-07', notes: ['Initial feature set'] },
			],
			releaseNote:
				'Version history from the development repository. Full per-change detail is available on GitHub.',
		},
	},
	{
		slug: 'pressfilter',
		status: 'dev',
		downloadKind: 'chrome-store',
		accent: 'var(--theme-surface-1)',
		repo: 'https://github.com/dode777/pressfilter',
		releasesUrl: 'https://github.com/dode777/pressfilter/releases',
		downloadUrl: null,
		downloadReady: false,
		currentVersion: null,
		ko: {
			name: 'PressFilter',
			subName: '프레스필터 (가칭)',
			tagline: '뉴스 목록에서 언론사를 한눈에, 원치 않는 곳은 가려서',
			summary:
				'네이버·다음 뉴스에서 기사마다 언론사를 눈에 띄게 표시하고, 보고 싶지 않은 언론사의 기사는 가려주는 크롬 확장 프로그램입니다.',
			description: [
				'포털 뉴스 목록에서는 어느 언론사가 쓴 기사인지 작게 적혀 있거나 아예 보이지 않는 경우가 많습니다. PressFilter는 기사마다 언론사를 분명하게 붙여 보여주고, 사용자가 지정한 언론사의 기사는 가려서 목록을 정리합니다.',
				'차단이 아니라 정리에 가깝습니다. 가려진 기사도 원하면 그 자리에서 펼쳐 볼 수 있도록 만드는 것을 목표로 하고 있습니다.',
				'현재 개발 단계이며, 크롬 웹스토어 등록을 준비하고 있습니다. 공개 시점과 기능은 개발 진행에 따라 달라질 수 있습니다.',
			],
			features: [
				{
					title: '언론사 표시',
					body: '뉴스 목록과 검색 결과에서 각 기사의 언론사를 읽기 쉽게 표시합니다.',
					planned: true,
				},
				{
					title: '언론사별 가리기',
					body: '보고 싶지 않은 언론사를 지정해 두면 해당 기사를 목록에서 접어 둡니다.',
					planned: true,
				},
				{
					title: '필터 목록 관리',
					body: '가릴 언론사 목록을 직접 추가하고 지울 수 있습니다.',
					planned: true,
				},
				{
					title: '사이트별 켜고 끄기',
					body: '네이버, 다음 등 사이트마다 확장 프로그램 동작 여부를 따로 정합니다.',
					planned: true,
				},
			],
			steps: [
				{
					title: '크롬 웹스토어 등록 준비 중',
					body: '정식 공개 전이라 아직 설치할 수 있는 배포본이 없습니다. 등록이 끝나면 이 페이지의 버튼에서 바로 설치할 수 있게 됩니다.',
				},
				{
					title: '공개되면 클릭 한 번으로 설치',
					body: '웹스토어에 올라간 뒤에는 “Chrome에 추가”만 누르면 설치가 끝납니다. 별도 설정 없이 포털 뉴스 페이지에서 바로 동작하도록 만들고 있습니다.',
				},
				{
					title: '가릴 언론사 지정',
					body: '확장 프로그램 아이콘에서 언론사 목록을 열고, 가리고 싶은 곳을 골라 두면 다음 방문부터 적용됩니다.',
				},
			],
			requirements: [
				{ label: '브라우저', value: 'Chrome 등 Chromium 기반 브라우저' },
				{ label: '지원 사이트', value: '네이버 뉴스, 다음 뉴스 (확대 예정)' },
				{ label: '배포 상태', value: '개발 중 · 크롬 웹스토어 등록 준비' },
				{ label: '가격', value: '무료' },
			],
			faq: [
				{
					q: '언제 사용할 수 있나요?',
					a: '현재 개발 단계이며 크롬 웹스토어 등록을 준비하고 있습니다. 공개 일정이 확정되면 이 페이지에 먼저 반영됩니다.',
				},
				{
					q: '기사를 완전히 없애나요?',
					a: '아닙니다. 목록에서 눈에 덜 띄게 접어 두는 방식을 기본으로 잡고 있습니다. 원하면 그 자리에서 다시 펼쳐 볼 수 있게 만들 계획입니다.',
				},
				{
					q: '네이버, 다음 말고 다른 사이트도 되나요?',
					a: '먼저 네이버와 다음을 대상으로 만들고 있습니다. 이후 지원 사이트를 넓히는 것을 검토하고 있습니다.',
				},
				{
					q: '이름이 바뀔 수도 있나요?',
					a: 'PressFilter는 현재 가칭입니다. 웹스토어 등록 과정에서 이름이 달라질 수 있습니다.',
				},
				{
					q: '제 브라우저 사용 기록을 수집하나요?',
					a: '수집하지 않는 방향으로 설계하고 있습니다. 확정된 개인정보 처리 방침은 웹스토어 등록 시점에 함께 공개할 예정입니다.',
				},
			],
			releases: [],
			releaseNote:
				'아직 공개된 릴리스가 없습니다. 첫 배포가 준비되면 이 자리에 버전과 변경 내역을 정리해 올립니다.',
		},
		en: {
			name: 'PressFilter',
			subName: 'PressFilter (working title)',
			tagline: 'See who wrote it — and hide the outlets you would rather skip',
			summary:
				'A Chrome extension that labels the news outlet on every article in Korean portal news feeds and folds away articles from outlets you choose.',
			description: [
				'In portal news listings the publishing outlet is often printed small or left out entirely. PressFilter attaches a clear outlet label to each article and tidies the list by folding away articles from outlets you have chosen to skip.',
				'The aim is tidying rather than blocking: folded articles are meant to stay one click away if you want to read them anyway.',
				'The extension is still in development and is being prepared for the Chrome Web Store. Timing and feature set may change as work continues.',
			],
			features: [
				{
					title: 'Outlet labels',
					body: 'Shows the publishing outlet clearly on each article in news feeds and search results.',
					planned: true,
				},
				{
					title: 'Hide by outlet',
					body: 'Nominate outlets you would rather not see and their articles are folded away in the list.',
					planned: true,
				},
				{
					title: 'Manage your filter list',
					body: 'Add and remove outlets from your hidden list at any time.',
					planned: true,
				},
				{
					title: 'Per-site toggle',
					body: 'Turn the extension on or off separately for each supported portal.',
					planned: true,
				},
			],
			steps: [
				{
					title: 'Chrome Web Store listing in preparation',
					body: 'There is no installable build yet. Once the listing is live, you will be able to install it straight from the button on this page.',
				},
				{
					title: 'One-click install at launch',
					body: 'After publication, “Add to Chrome” is all it takes. It is being built to start working on portal news pages with no further setup.',
				},
				{
					title: 'Choose outlets to hide',
					body: 'Open the outlet list from the extension icon and pick the ones to fold away; the setting applies from your next visit.',
				},
			],
			requirements: [
				{ label: 'Browser', value: 'Chrome and other Chromium-based browsers' },
				{ label: 'Supported sites', value: 'Naver News, Daum News (more planned)' },
				{ label: 'Status', value: 'In development · Chrome Web Store listing in preparation' },
				{ label: 'Price', value: 'Free' },
			],
			faq: [
				{
					q: 'When can I use it?',
					a: 'It is in development and being prepared for the Chrome Web Store. This page will be updated first once a release date is set.',
				},
				{
					q: 'Does it delete articles?',
					a: 'No. The plan is to fold them out of the way rather than remove them, so you can still open one if you want to.',
				},
				{
					q: 'Will other sites be supported?',
					a: 'Naver and Daum come first. Broader site support is under consideration.',
				},
				{
					q: 'Could the name change?',
					a: 'PressFilter is a working title and may change during the Chrome Web Store submission.',
				},
				{
					q: 'Does it collect my browsing history?',
					a: 'It is being designed not to. A finalised privacy policy will be published alongside the Web Store listing.',
				},
			],
			releases: [],
			releaseNote:
				'No public releases yet. Versions and change notes will appear here once the first build ships.',
		},
	},
];

export function getService(slug) {
	return services.find((service) => service.slug === slug);
}

export function serviceUrl(slug, lang = settings.defaultLocale) {
	return lang === settings.defaultLocale ? `/${slug}` : `/${lang}/${slug}`;
}
