/**
 * 사이트 전체를 가리키는 문구를 서비스 목록에서 만들어 냅니다.
 *
 * 서비스가 하나였을 때는 문구를 손으로 적어 두어도 됐지만, 목록이 늘어나면
 * 메타 설명과 푸터가 조용히 옛날 내용으로 남습니다. 서비스 목록을 유일한
 * 출처로 삼아 그런 어긋남을 없앱니다.
 */
import { services } from '../config/services.js';
import { ui } from '../i18n/ui.js';

/**
 * content/ui.yml 에서 값을 꺼냅니다. 비어 있거나 지워져 있으면 빈 문자열입니다.
 *
 * 번역 함수 t() 는 값이 없을 때 열쇠말을 그대로 돌려줍니다. 어디가 비었는지
 * 화면에서 바로 보이라는 뜻인데, 일부러 비워 두는 자리에서는 그 열쇠말이
 * 그대로 문구가 되어 버립니다. 그래서 여기서는 원본을 직접 봅니다.
 */
function text(lang, key) {
	const value = ui[lang]?.[key];
	// 잇는 문자(', ')처럼 앞뒤 공백이 뜻을 가지는 값이 있어 다듬지 않습니다.
	return typeof value === 'string' ? value : '';
}

/** 검색 결과와 푸터에 함께 쓰이는 한 줄. 예: "Bible OnAir — 예배용 성경 구절 프롬프터, 두잇! — …" */
export function siteDescription(lang) {
	const template = text(lang, 'site.descriptionItem') || '{name} — {tagline}';
	const join = text(lang, 'site.descriptionJoin') || ', ';
	// 꼬리말은 선택입니다. content/ui.yml 에서 비우거나 지우면 서비스 나열로 끝납니다.
	const tail = text(lang, 'site.descriptionTail').trim();

	const items = services
		.map((service) => service[lang])
		.filter(Boolean)
		.map((content) =>
			template
				.replace('{name}', content.name)
				.replace('{tagline}', content.metaTagline ?? content.tagline)
		);

	if (items.length === 0) return tail;

	const sentence = `${items.join(join)}.`;
	return tail ? `${sentence} ${tail}` : sentence;
}
