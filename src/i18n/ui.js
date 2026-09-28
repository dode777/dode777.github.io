import settings from '../config/settings.js';
import { readContent, flattenByLocale } from '../content/load.js';

export const languages = {
	ko: '한국어',
	en: 'English',
};

export const defaultLang = settings.defaultLocale;

/**
 * 화면 문구는 content/ui.yml 에 있습니다.
 * 항목마다 ko 와 en 이 나란히 있고, 여기서 로케일별 사전으로 펴서 넘깁니다.
 */
export const ui = flattenByLocale(readContent('ui.yml'), settings.locales);

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
