/**
 * 사이트 전체를 가리키는 문구를 서비스 목록에서 만들어 냅니다.
 *
 * 서비스가 하나였을 때는 문구를 손으로 적어 두어도 됐지만, 목록이 늘어나면
 * 메타 설명과 푸터가 조용히 옛날 내용으로 남습니다. services.js 를 유일한
 * 출처로 삼아 그런 어긋남을 없앱니다.
 */
import { services } from '../config/services.js';
import { useTranslations } from '../i18n/ui.js';

/** 검색 결과와 푸터에 함께 쓰이는 한 줄. 예: "Bible OnAir — 예배용 성경 구절 프롬프터, Do-It — …. 무료로 쓸 수 있습니다." */
export function siteDescription(lang) {
	const t = useTranslations(lang);

	const items = services
		.map((service) => service[lang])
		.filter(Boolean)
		.map((content) =>
			t('site.descriptionItem')
				.replace('{name}', content.name)
				.replace('{tagline}', content.metaTagline ?? content.tagline)
		);

	if (items.length === 0) return t('site.descriptionTail');
	return `${items.join(t('site.descriptionJoin'))}. ${t('site.descriptionTail')}`;
}
