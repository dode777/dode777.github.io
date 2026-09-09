import settings from '../config/settings.js';

export const languages = {
	ko: '한국어',
	en: 'English',
};

export const defaultLang = settings.defaultLocale;

export const ui = {
	ko: {
		'site.title': 'ISO Company',
		'site.description':
			'ISO Company가 만드는 서비스 모음. Bible On Air 성경 프롬프터와 PressFilter 뉴스 언론사 표시·필터 확장 프로그램을 한자리에서 확인하세요.',

		'a11y.skipToContent': '본문으로 건너뛰기',
		'a11y.openMenu': '메뉴 열기',
		'a11y.closeMenu': '메뉴 닫기',
		'a11y.toggleTheme': '밝은 화면과 어두운 화면 전환',
		'a11y.switchLanguage': '언어 전환',

		'nav.home': '홈',
		'nav.services': '서비스',
		'nav.contact': '문의',

		'home.eyebrow': 'ISO Company 서비스',
		'home.title': '만든 것들을\n한자리에.',
		'home.lede':
			'ISO Company가 개발하고 배포하는 서비스를 모아둔 페이지입니다. 각 서비스의 소개와 내려받기, 버전 기록을 여기서 확인할 수 있습니다.',
		'home.ctaPrimary': '서비스 보기',
		'home.ctaSecondary': '문의하기',
		'home.servicesTitle': '서비스',
		'home.servicesLede': '현재 두 개의 서비스를 준비하고 있습니다.',

		'card.detail': '자세히 보기',
		'card.download': '내려받기',
		'card.comingSoon': '준비 중',

		'status.live': '배포 중',
		'status.beta': '배포 준비 중',
		'status.dev': '개발 중',

		'detail.backToHome': '전체 서비스',
		'detail.overview': '소개',
		'detail.features': '주요 기능',
		'detail.featuresPlanned': '개발 예정',
		'detail.guide': '설치 및 사용 가이드',
		'detail.requirements': '시스템 요구사항',
		'detail.releases': '버전 및 변경 내역',
		'detail.releasesEmpty': '아직 공개된 릴리스가 없습니다.',
		'detail.faq': '자주 묻는 질문',
		'detail.contact': '문의',
		'detail.currentVersion': '현재 버전',
		'detail.viewRepo': 'GitHub 저장소',
		'detail.viewReleases': '전체 릴리스 보기',
		'detail.downloadWindows': 'Windows용 내려받기',
		'detail.downloadStore': '크롬 웹스토어에서 설치',
		'detail.downloadPendingRelease': '첫 정식 릴리스를 준비하고 있습니다.',
		'detail.downloadPendingStore': '크롬 웹스토어 등록을 준비하고 있습니다.',

		'contact.title': '문의',
		'contact.lede':
			'서비스 사용 중 생긴 문제, 기능 제안, 그 밖의 문의는 아래 채널로 보내주세요.',
		'contact.emailLabel': '이메일',
		'contact.cta': '메일 보내기',
		'contact.englishNotice':
			'각 서비스의 영어 버전은 현재 개발 검토 중입니다. 자세한 내용은 문의 채널로 연락 주세요.',

		'footer.services': '서비스',
		'footer.links': '링크',
		'footer.contact': '문의',
		'footer.github': 'GitHub',
		'footer.copyright': 'ISO Company',
		'footer.builtWith': 'Odyssey Theme 기반 · Astro로 제작',

		'404.title': '페이지를 찾을 수 없습니다',
		'404.lede': '주소가 바뀌었거나 아직 없는 페이지입니다.',
		'404.cta': '홈으로 돌아가기',
	},
	en: {
		'site.title': 'ISO Company',
		'site.description':
			'Services built by ISO Company — Bible On Air, a scripture prompter, and PressFilter, a news outlet labelling and filtering extension.',

		'a11y.skipToContent': 'Skip to content',
		'a11y.openMenu': 'Open main menu',
		'a11y.closeMenu': 'Close main menu',
		'a11y.toggleTheme': 'Toggle light and dark appearance',
		'a11y.switchLanguage': 'Switch language',

		'nav.home': 'Home',
		'nav.services': 'Services',
		'nav.contact': 'Contact',

		'home.eyebrow': 'ISO Company services',
		'home.title': 'Everything we build,\nin one place.',
		'home.lede':
			'A directory of the services ISO Company develops and ships. Read what each one does, download it, and check its version history here.',
		'home.ctaPrimary': 'Browse services',
		'home.ctaSecondary': 'Get in touch',
		'home.servicesTitle': 'Services',
		'home.servicesLede': 'Two services are in the works right now.',

		'card.detail': 'Read more',
		'card.download': 'Download',
		'card.comingSoon': 'Coming soon',

		'status.live': 'Available',
		'status.beta': 'Release pending',
		'status.dev': 'In development',

		'detail.backToHome': 'All services',
		'detail.overview': 'Overview',
		'detail.features': 'Features',
		'detail.featuresPlanned': 'Planned',
		'detail.guide': 'Install and usage guide',
		'detail.requirements': 'System requirements',
		'detail.releases': 'Versions and change notes',
		'detail.releasesEmpty': 'No public releases yet.',
		'detail.faq': 'Frequently asked questions',
		'detail.contact': 'Contact',
		'detail.currentVersion': 'Current version',
		'detail.viewRepo': 'GitHub repository',
		'detail.viewReleases': 'View all releases',
		'detail.downloadWindows': 'Download for Windows',
		'detail.downloadStore': 'Install from the Chrome Web Store',
		'detail.downloadPendingRelease': 'The first public release is being prepared.',
		'detail.downloadPendingStore': 'The Chrome Web Store listing is being prepared.',

		'contact.title': 'Contact',
		'contact.lede':
			'Problems, feature requests, or anything else — send it to the channel below.',
		'contact.emailLabel': 'Email',
		'contact.cta': 'Send an email',
		'contact.englishNotice':
			'English versions of these services are currently under review. Please reach out through the contact channel for details.',

		'footer.services': 'Services',
		'footer.links': 'Links',
		'footer.contact': 'Contact',
		'footer.github': 'GitHub',
		'footer.copyright': 'ISO Company',
		'footer.builtWith': 'Based on the Odyssey Theme · Built with Astro',

		'404.title': 'Page not found',
		'404.lede': 'The address may have changed, or this page does not exist yet.',
		'404.cta': 'Back to home',
	},
};

/** URL 경로에서 로케일을 읽습니다. (예: /en/pressfilter -> 'en') */
export function getLangFromUrl(url) {
	const [, maybeLang] = url.pathname.split('/');
	if (maybeLang in ui && maybeLang !== defaultLang) return maybeLang;
	return defaultLang;
}

/** 해당 로케일의 번역 함수를 돌려줍니다. */
export function useTranslations(lang) {
	const dict = ui[lang] ?? ui[defaultLang];
	return function t(key) {
		return dict[key] ?? ui[defaultLang][key] ?? key;
	};
}

/**
 * 기본 로케일 기준 경로를 해당 로케일 경로로 바꿉니다.
 * localizePath('/pressfilter', 'en') -> '/en/pressfilter'
 */
export function localizePath(path, lang) {
	const clean = path === '/' ? '' : path.replace(/\/$/, '');
	if (lang === defaultLang) return clean === '' ? '/' : clean;
	return `/${lang}${clean}` || `/${lang}`;
}

/** 현재 경로에서 로케일 접두사를 떼어낸 기본 경로를 돌려줍니다. */
export function stripLangFromPath(pathname) {
	const stripped = pathname.replace(/^\/(en)(?=\/|$)/, '');
	const trimmed = stripped.replace(/\/$/, '');
	return trimmed === '' ? '/' : trimmed;
}
