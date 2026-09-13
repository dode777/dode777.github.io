export default {
	/** 헤더 로고 및 저작권 표기 */
	brand: 'ISO Project',
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
	/** GitHub 프로필 */
	github: 'https://github.com/dode777',
	/** 지원 로케일 (첫 번째가 기본값) */
	locales: ['ko', 'en'],
	defaultLocale: 'ko',
};
