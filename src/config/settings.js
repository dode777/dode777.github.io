export default {
	/** 헤더 로고 및 저작권 표기 */
	brand: 'ISO Service',
	/** 배포 도메인 (뒤에 슬래시 없음) */
	url: 'https://isocompany.co.kr',
	/** 문의 이메일 */
	contactEmail: 'hello@isocompany.co.kr',
	/**
	 * 문의 폼 전송 주소.
	 * GitHub Pages는 정적 호스팅이라 서버가 없으므로 외부 폼 릴레이(FormSubmit)를 씁니다.
	 * 이 주소로 처음 한 번 전송하면 위 이메일로 활성화 확인 메일이 오고,
	 * 그 링크를 누른 뒤부터 실제 문의가 메일로 전달됩니다.
	 * null 로 두면 폼 대신 메일 링크만 표시됩니다.
	 */
	contactFormEndpoint: 'https://formsubmit.co/hello@isocompany.co.kr',
	/**
	 * 링크 공유 미리보기 이미지. 카카오톡·페이스북 등이 이 파일을 카드로 띄웁니다.
	 * 교체할 때는 1200x630 을 지키세요. 비율이 어긋나면 잘려 나갑니다.
	 */
	ogImage: {
		src: { ko: '/assets/og/og-default.png', en: '/assets/og/og-default-en.png' },
		width: 1200,
		height: 630,
	},
	/** GitHub 프로필 */
	github: 'https://github.com/dode777',
	/** 지원 로케일 (첫 번째가 기본값) */
	locales: ['ko', 'en'],
	defaultLocale: 'ko',
};
