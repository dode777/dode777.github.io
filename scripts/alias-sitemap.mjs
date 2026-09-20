// Astro 는 사이트맵을 sitemap-index.xml 로 내보내지만, 검색엔진 등록 창에
// 습관적으로 적게 되는 주소는 /sitemap.xml 입니다. 없는 주소를 넣으면
// GitHub Pages 가 404 페이지(HTML)를 돌려주고, 검색엔진은 "사이트맵이 HTML"
// 이라는 오류로 읽습니다. 같은 내용을 두 주소에 두어 그 혼선을 없앱니다.
//
// 사이트맵 색인은 하위 사이트맵을 절대 주소로 가리키므로 그대로 복사해도 됩니다.
import { copyFile } from 'node:fs/promises';

const FROM = 'docs/sitemap-index.xml';
const TO = 'docs/sitemap.xml';

await copyFile(FROM, TO);
console.log(`${FROM} -> ${TO}`);
