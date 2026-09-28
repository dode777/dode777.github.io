import { readContent } from '../content/load.js';

/* 브랜드 표기·도메인·문의 주소는 content/site.yml 에 있습니다. */
const site = readContent('site.yml');

export default {
	...site,
	/**
	 * 링크 공유 미리보기 이미지. 카카오톡·페이스북 등이 이 파일을 카드로 띄웁니다.
	 * 교체할 때는 1200x630 을 지키세요. 비율이 어긋나면 잘려 나갑니다.
	 */
	ogImage: {
		src: { ko: '/assets/og/og-default.png', en: '/assets/og/og-default-en.png' },
		width: 1200,
		height: 630,
	},
	/** 지원 로케일 (첫 번째가 기본값) */
	locales: ['ko', 'en'],
	defaultLocale: 'ko',
};
