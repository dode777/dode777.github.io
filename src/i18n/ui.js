import settings from '../config/settings.js';

export const languages = {
	ko: '한국어',
	en: 'English',
};

export const defaultLang = settings.defaultLocale;

export const ui = {
	ko: {
		'site.title': 'ISO Service',
		'site.description':
			'성경 구절 프롬프터 Bible OnAir 를 내려받고 문의할 수 있습니다.',

		'a11y.skipToContent': '본문으로 건너뛰기',
		'a11y.openMenu': '메뉴 열기',
		'a11y.closeMenu': '메뉴 닫기',
		'a11y.toggleTheme': '밝은 화면과 어두운 화면 전환',
		'a11y.switchLanguage': '언어 전환',

		'nav.home': '홈',
		'nav.contact': '문의',

		'home.title': 'ISO Service',
		'home.lede':
			'배포 중인 프로그램을 확인하고 내려받으세요.',

		'card.detail': '자세히 보기',
		'card.download': '내려받기',
		'card.comingSoon': '준비 중',

		'status.live': '배포 중',
		'status.beta': '배포 준비 중',
		'status.dev': '개발 중',

		'detail.backToHome': '전체 프로그램',
		'detail.overview': '소개',
		'detail.features': '핵심 기능',
		'detail.screenshots': '화면 예시',
		'detail.screenshotsPending': '화면 이미지는 준비 중입니다.',
		'detail.releases': '릴리스 노트',
		'detail.releasesEmpty': '아직 공개된 릴리스가 없습니다.',
		'detail.requirements': '시스템 요구사항',
		'detail.faq': '자주 묻는 질문',
		'detail.currentVersion': '현재 버전',
		'detail.viewReleases': '전체 릴리스 보기',
		'detail.downloadWindows': 'Windows용 내려받기',
		'detail.downloadStore': '크롬 웹스토어에서 설치',
		'detail.downloadPendingRelease': '첫 정식 릴리스를 준비하고 있습니다.',
		'detail.downloadPendingStore': '크롬 웹스토어 등록을 준비하고 있습니다.',

		'contact.title': '문의',
		'contact.lede':
			'문제가 생겼거나 제안할 내용이 있으면 보내주세요.\n적어주신 주소로 답변드립니다.',
		'contact.nameLabel': '성명',
		'contact.namePlaceholder': '홍길동',
		'contact.emailLabel': '답변 받을 이메일',
		'contact.emailPlaceholder': 'name@example.com',
		'contact.topicLabel': '문의 유형',
		'contact.topicUsage': '사용 문의',
		'contact.topicBug': '오류 신고',
		'contact.topicFeature': '기능 제안',
		'contact.topicEtc': '그 밖의 문의',
		'contact.messageLabel': '문의 내용',
		'contact.messagePlaceholder': '어떤 상황에서 무엇이 안 되는지 적어주세요.',
		'contact.consentLabel':
			'성명과 이메일 주소를 답변 목적으로만 수집하는 데 동의합니다.',
		'contact.submit': '문의 보내기',
		'contact.required': '필수',
		'contact.mailFallbackLead': '메일로 보내셔도 됩니다.',
		'contact.mailFallbackCta': '메일 앱으로 보내기',

		'thanks.title': '문의가 접수되었습니다',
		'thanks.lede': '적어주신 주소로 답변드리겠습니다.',
		'thanks.cta': '홈으로 돌아가기',

		'footer.services': '프로그램',
		'footer.links': '링크',
		'footer.contact': '문의',
		'footer.github': 'GitHub',
		'footer.builtWith': 'Odyssey Theme 기반 · Astro로 제작',

		'404.title': '페이지를 찾을 수 없습니다',
		'404.lede': '주소가 바뀌었거나 아직 없는 페이지입니다.',
		'404.cta': '홈으로 돌아가기',
	},
	en: {
		'site.title': 'ISO Service',
		'site.description':
			'Bible OnAir — a scripture prompter for Windows. Download it and get in touch here.',

		'a11y.skipToContent': 'Skip to content',
		'a11y.openMenu': 'Open main menu',
		'a11y.closeMenu': 'Close main menu',
		'a11y.toggleTheme': 'Toggle light and dark appearance',
		'a11y.switchLanguage': 'Switch language',

		'nav.home': 'Home',
		'nav.contact': 'Contact',

		'home.title': 'ISO Service',
		'home.lede':
			'Take a look at what is available and download it.',

		'card.detail': 'Read more',
		'card.download': 'Download',
		'card.comingSoon': 'Coming soon',

		'status.live': 'Available',
		'status.beta': 'Release pending',
		'status.dev': 'In development',

		'detail.backToHome': 'All programs',
		'detail.overview': 'Overview',
		'detail.features': 'Key features',
		'detail.screenshots': 'Screenshots',
		'detail.screenshotsPending': 'Screenshots are on the way.',
		'detail.releases': 'Release notes',
		'detail.releasesEmpty': 'No public releases yet.',
		'detail.requirements': 'System requirements',
		'detail.faq': 'Frequently asked questions',
		'detail.currentVersion': 'Current version',
		'detail.viewReleases': 'View all releases',
		'detail.downloadWindows': 'Download for Windows',
		'detail.downloadStore': 'Install from the Chrome Web Store',
		'detail.downloadPendingRelease': 'The first public release is being prepared.',
		'detail.downloadPendingStore': 'The Chrome Web Store listing is being prepared.',

		'contact.title': 'Contact',
		'contact.lede':
			'Run into a problem, or have something to suggest? Send it over.\nA reply goes to the address you enter.',
		'contact.nameLabel': 'Name',
		'contact.namePlaceholder': 'Your name',
		'contact.emailLabel': 'Email for the reply',
		'contact.emailPlaceholder': 'name@example.com',
		'contact.topicLabel': 'Topic',
		'contact.topicUsage': 'Using the app',
		'contact.topicBug': 'Bug report',
		'contact.topicFeature': 'Feature request',
		'contact.topicEtc': 'Something else',
		'contact.messageLabel': 'Message',
		'contact.messagePlaceholder': 'What were you doing, and what went wrong?',
		'contact.consentLabel':
			'I agree to my name and email address being collected for the sole purpose of replying.',
		'contact.submit': 'Send message',
		'contact.required': 'Required',
		'contact.mailFallbackLead': 'An email works too.',
		'contact.mailFallbackCta': 'Open your mail app',

		'thanks.title': 'Your message has been sent',
		'thanks.lede': 'A reply will go to the address you entered.',
		'thanks.cta': 'Back to home',

		'footer.services': 'Programs',
		'footer.links': 'Links',
		'footer.contact': 'Contact',
		'footer.github': 'GitHub',
		'footer.builtWith': 'Based on the Odyssey Theme · Built with Astro',

		'404.title': 'Page not found',
		'404.lede': 'The address may have changed, or this page does not exist yet.',
		'404.cta': 'Back to home',
	},
};

/** URL 경로에서 로케일을 읽습니다. (예: /en/bible-onair -> 'en') */
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
 * localizePath('/bible-onair', 'en') -> '/en/bible-onair'
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

/** 문의 섹션은 홈에만 있습니다. 현재 위치에 따라 앵커 또는 홈 경로+앵커를 돌려줍니다. */
export function contactHref(pathname, lang) {
	return stripLangFromPath(pathname) === '/'
		? '#contact'
		: `${localizePath('/', lang)}#contact`;
}
