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
			'성경 구절 프롬프터 Bible OnAir를 무료로 받아 쓰세요.',

		'a11y.skipToContent': '본문으로 건너뛰기',
		'a11y.openMenu': '메뉴 열기',
		'a11y.closeMenu': '메뉴 닫기',
		'a11y.toggleTheme': '밝은 화면과 어두운 화면 전환',
		'a11y.switchLanguage': '언어 전환',

		'nav.home': '홈',
		'nav.contact': '문의',

		'home.title': 'ISO Service',
		'home.lede':
			'직접 만들어 올려둔 프로그램입니다. 받아서 바로 쓰시면 됩니다.',

		'card.detail': '자세히 보기',
		'card.download': '다운로드',
		'card.comingSoon': '준비 중',

		'status.live': '정식 버전',
		'status.beta': '출시 준비 중',
		'status.dev': '개발 중',

		'detail.backToHome': '목록으로',
		'detail.overview': '소개',
		'detail.features': '주요 기능',
		'detail.screenshots': '화면',
		'detail.screenshotsPending': '화면 이미지는 준비 중입니다.',
		'detail.releases': '업데이트 내역',
		'detail.releasesEmpty': '아직 공개된 릴리스가 없습니다.',
		'detail.requirements': '사용 환경',
		'detail.faq': '자주 묻는 질문',
		'detail.currentVersion': '최신 버전',
		'detail.viewReleases': '모든 버전 보기',
		'detail.downloadWindows': 'Windows용 다운로드',
		'detail.downloadStore': '크롬 웹스토어에서 설치',
		'detail.downloadPendingRelease': '첫 정식 릴리스를 준비하고 있습니다.',
		'detail.downloadPendingStore': '크롬 웹스토어 등록을 준비하고 있습니다.',

		'contact.title': '문의',
		'contact.lede':
			'쓰다가 막히는 곳이나 더 필요한 기능이 있으면 남겨주세요.\n적어주신 메일로 답을 드립니다.',
		'contact.nameLabel': '이름',
		'contact.namePlaceholder': '홍길동',
		'contact.emailLabel': '이메일',
		'contact.emailPlaceholder': 'name@example.com',
		'contact.topicLabel': '문의 유형',
		'contact.topicUsage': '사용 방법',
		'contact.topicBug': '오류 신고',
		'contact.topicFeature': '기능 제안',
		'contact.topicEtc': '기타',
		'contact.messageLabel': '내용',
		'contact.messagePlaceholder': '어떤 상황에서 무엇이 안 되는지 적어주세요.',
		'contact.consentLabel':
			'답변을 위해 이름과 이메일을 수집하는 데 동의합니다.',
		'contact.submit': '보내기',
		'contact.required': '필수',
		'contact.mailFallbackLead': '메일이 편하시면 이쪽으로 보내주세요.',
		'contact.mailFallbackCta': '메일 앱으로 보내기',

		'thanks.title': '문의를 받았습니다',
		'thanks.lede': '적어주신 메일로 답을 드리겠습니다.',
		'thanks.cta': '홈으로',

		'footer.services': '프로그램',
		'footer.links': '링크',
		'footer.contact': '문의',
		'footer.github': 'GitHub',
		'footer.builtWith': 'Odyssey Theme 기반 · Astro로 제작',

		'404.title': '페이지를 찾을 수 없습니다',
		'404.lede': '주소가 바뀌었거나 아직 없는 페이지입니다.',
		'404.cta': '홈으로',
	},
	en: {
		'site.title': 'ISO Service',
		'site.description':
			'Bible OnAir — a free scripture prompter for Windows.',

		'a11y.skipToContent': 'Skip to content',
		'a11y.openMenu': 'Open main menu',
		'a11y.closeMenu': 'Close main menu',
		'a11y.toggleTheme': 'Toggle light and dark appearance',
		'a11y.switchLanguage': 'Switch language',

		'nav.home': 'Home',
		'nav.contact': 'Contact',

		'home.title': 'ISO Service',
		'home.lede':
			'Programs I build and put up here. Take what you need.',

		'card.detail': 'Read more',
		'card.download': 'Download',
		'card.comingSoon': 'Coming soon',

		'status.live': 'Stable',
		'status.beta': 'Release pending',
		'status.dev': 'In development',

		'detail.backToHome': 'All programs',
		'detail.overview': 'Overview',
		'detail.features': 'Main features',
		'detail.screenshots': 'Screens',
		'detail.screenshotsPending': 'Screenshots are on the way.',
		'detail.releases': 'What changed',
		'detail.releasesEmpty': 'No public releases yet.',
		'detail.requirements': 'What you need',
		'detail.faq': 'Frequently asked questions',
		'detail.currentVersion': 'Latest',
		'detail.viewReleases': 'See every version',
		'detail.downloadWindows': 'Download for Windows',
		'detail.downloadStore': 'Install from the Chrome Web Store',
		'detail.downloadPendingRelease': 'The first public release is being prepared.',
		'detail.downloadPendingStore': 'The Chrome Web Store listing is being prepared.',

		'contact.title': 'Contact',
		'contact.lede':
			'Stuck on something, or missing a feature? Leave a note.\nI will reply to the address you give.',
		'contact.nameLabel': 'Name',
		'contact.namePlaceholder': 'Your name',
		'contact.emailLabel': 'Email',
		'contact.emailPlaceholder': 'name@example.com',
		'contact.topicLabel': 'Topic',
		'contact.topicUsage': 'How to use it',
		'contact.topicBug': 'Bug report',
		'contact.topicFeature': 'Feature request',
		'contact.topicEtc': 'Something else',
		'contact.messageLabel': 'Message',
		'contact.messagePlaceholder': 'What were you doing, and what went wrong?',
		'contact.consentLabel':
			'I agree to my name and email being collected so I can be replied to.',
		'contact.submit': 'Send',
		'contact.required': 'Required',
		'contact.mailFallbackLead': 'Prefer email? Write to this address.',
		'contact.mailFallbackCta': 'Open your mail app',

		'thanks.title': 'Got it',
		'thanks.lede': 'I will reply to the address you gave.',
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
