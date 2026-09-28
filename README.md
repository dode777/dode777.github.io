# dode777.github.io

개인이 만들어 배포하는 프로그램을 안내하는 페이지. [Astro](https://astro.build)로 만들고
[Odyssey Theme](https://github.com/treefarmstudio/odyssey-theme)(MIT)의 디자인을 기반으로 했습니다.

**https://isocompany.co.kr** (`dode777.github.io` 로 접속하면 이 주소로 넘어갑니다)

## 배포 구조

GitHub Pages는 `main` 브랜치의 `/docs` 디렉토리를 배포 소스로 사용합니다.
`npm run build` 결과가 곧바로 `./docs`로 떨어지므로, **빌드 결과물을 함께 커밋해야 배포됩니다.**

```
npm install
npm run dev      # 로컬 개발 서버 (http://localhost:4321)
npm run build    # ./docs 로 정적 사이트 생성
npm run preview  # 빌드 결과 미리보기
```

> `public/.nojekyll` 과 `public/CNAME` 은 빌드할 때 `docs/` 로 그대로 복사됩니다.
> `.nojekyll` 은 GitHub Pages의 Jekyll 처리가 Astro 번들 디렉토리(`_astro/`)를 걸러내지 않게 하고,
> `CNAME` 은 커스텀 도메인 설정을 유지합니다. **둘 다 지우지 마세요.**
> `docs/` 는 빌드할 때마다 통째로 다시 만들어지므로, `docs/` 안에만 파일을 두면 다음 빌드에서 사라집니다.
> 커스텀 도메인을 바꾸거나 떼려면 `public/CNAME` 과 함께 `astro.config.mjs` 의 `site`,
> `src/config/settings.js` 의 `url` 도 같이 고쳐야 정규 URL·사이트맵이 맞습니다.

## 페이지 구성

| 경로 | 내용 |
| --- | --- |
| `/` | 프로그램 목록 · 문의 양식 |
| `/bible-onair` | Bible OnAir 상세 |
| `/do-it` | Do-It 상세 (웹앱 — "웹에서 열기"는 `doit.isocompany.co.kr`) |
| `/contact/thanks` | 문의 전송 완료 안내 |
| `/en`, `/en/...` | 영문 페이지 |
| `/404` | 없는 주소 |

상세 페이지는 소개 · 핵심 기능 · 화면 예시 · 릴리스 노트 · 시스템 요구사항 · 자주 묻는 질문 순서입니다.

## 디렉토리

```
content/              ★ 화면에 보이는 글자는 전부 여기 (YAML)
  site.yml            브랜드 · 도메인 · 문의 메일
  ui.yml              첫 화면 · 버튼 · 문의 양식 · 푸터
  og.yml              링크 공유 사진의 글자
  services/
    bible-onair.yml   서비스별 소개 · 기능 · 사용 환경 · FAQ
    do-it.yml
src/
  content/load.js   content/ 를 읽어 화면 코드가 쓰는 모양으로 넘겨줍니다
  config/
    settings.js     공유 그림 경로 · 지원 언어 (문구는 content/site.yml)
    services.js     프로그램 연결 설정 (문구는 content/services/*.yml)
  i18n/ui.js        content/ui.yml 을 읽어 주는 얇은 층 + 로케일 경로 헬퍼
  lib/site-meta.js  서비스 목록에서 사이트 설명 한 줄을 만듭니다
  styles/           Odyssey 기반 디자인 토큰 / 타이포 / 리셋
  components/       Header, Footer, 버튼, 카드, 상세 페이지 섹션, 문의 폼
  layouts/          Base(문서 뼈대), Page(헤더+푸터 포함)
  pages/            라우트 (en/ 하위가 영문)
public/
  CNAME               커스텀 도메인 (isocompany.co.kr)
  robots.txt          크롤러 안내 + 사이트맵 위치
  assets/fonts/       Lato, Roboto Serif (라틴)
  assets/screenshots/ 프로그램 화면 이미지
  assets/og/          링크 공유 사진 (1200x630)
docs/                 ★ 빌드 산출물 = 배포본 (커밋 대상)
scripts/
  track-downloads.mjs 릴리스 다운로드 수 수집 (Actions 에서 실행)
  og-home.html        사이트 기본 미리보기 이미지의 원본 (문구는 content/ 에서 읽습니다)
  og-bible-onair.html Bible OnAir 미리보기 이미지의 원본
  og-do-it.html       Do-It 미리보기 이미지의 원본
  og-content.js       위 세 원본이 읽는 문구 (자동 생성 · 고치지 마세요)
  render-og.mjs       링크 공유 사진 여섯 장을 다시 만듭니다 (npm run og)
  build-og-content.mjs  og-content.js 를 만듭니다 (npm run build 가 실행)
  check-content.mjs   content/ 검사 (npm run build 가 실행)
  alias-sitemap.mjs   빌드 후 sitemap-index.xml 을 sitemap.xml 로 한 벌 더 복사
data/
  download-stats.csv  다운로드 수 기록 (사이트 빌드에는 쓰이지 않습니다)
```

## 자주 하는 작업

### 문구 수정

**화면에 보이는 글자는 전부 `content/` 안에 있습니다.** 코드를 열 일이 없습니다.

| 고치고 싶은 것 | 파일 |
| --- | --- |
| 첫 화면 · 버튼 · 문의 양식 · 푸터 | `content/ui.yml` |
| 서비스 소개 · 기능 · 화면 설명 · 사용 환경 · FAQ | `content/services/<이름>.yml` |
| 브랜드 표기 · 도메인 · 문의 메일 | `content/site.yml` |
| 링크 공유 사진의 글자 | `content/og.yml` |

항목마다 `ko`(한국어)와 `en`(영어)이 나란히 있습니다. 둘 다 채워야 합니다.

```yaml
title:
  ko: 북적이는 1인 스튜디오
  en: A crowded one-person studio

lede:
  ko: |-
    혼자 만드는 프로그램을 모아둔 곳입니다.
    아래에서 확인해보세요.
  en: |-
    Everything here is made by one person.
    Take a look below.
```

따옴표도 쉼표도 필요 없습니다. 줄을 바꾸고 싶으면 `|-` 아래에서 그냥 줄을 바꿉니다.
왼쪽 이름(`title`, `lede` 같은 것)은 화면 코드가 찾는 이름이라 바꾸면 안 됩니다.

**GitHub 웹에서 바로 고쳐도 됩니다.** 저장소에서 파일을 열고 연필 아이콘을 누른 뒤
커밋하면 `Rebuild site` 워크플로가 받아서 배포합니다. 휴대폰에서도 됩니다.

한쪽 언어를 빠뜨리거나 필요한 항목을 지우면 **빌드가 멈추고** 어느 파일 어느 자리인지
알려줍니다(`npm run check:content` 로 따로 확인할 수도 있습니다).

```
✗ content/services/do-it.yml
  features[0].title — en 이 비어 있습니다
  faq — 항목이 없습니다

배포되지 않았습니다. 위 내용을 채우고 다시 실행하세요.
```

문구가 아닌 **연결 설정**(내려받기 주소·화면 그림 경로·릴리스 저장소 위치)은
`src/config/services.js` 와 `src/config/settings.js` 에 남아 있습니다.

### 프로그램 추가

1. `content/services/<이름>.yml` 을 만듭니다. 기존 파일을 복사해 고치는 편이 빠릅니다.
2. `src/config/services.js` 의 `services` 배열에 연결 설정을 넣습니다
   (`slug` · `status` · 내려받기 방식 · 화면 그림 · 공유 그림 경로).
3. `content/og.yml` 의 `home.notes` 와 `services` 에 링크 공유 사진 문구를 더합니다.
4. `scripts/og-home.html` 의 상자를 한 칸 늘립니다. 그림은 저절로 다시 만들어집니다.

목록 카드, 상세 페이지(`/<slug>`, `/en/<slug>`), 헤더·푸터 링크, 사이트맵, 사이트 설명은
저절로 따라옵니다.

### 버전 올릴 때

버전과 변경 내용은 릴리스 저장소의 `UPDATE-NOTES(.en).md` 와 `latest.yml` 에서 **자동으로** 읽습니다.
이 저장소에서 손으로 적을 것은 없습니다. 릴리스를 올리면 `Rebuild site` 워크플로가 받아서 배포합니다.

### Do-It (웹앱) 버전

Do-It 은 설치 파일이 아니라 웹앱이라 `downloadKind: 'web'` 입니다. 버전·릴리스 목록은
Bible OnAir 와 같은 방식으로 **자동으로** 읽습니다 — `services.js` 의 `releaseSource` 가 가리키는
`Do-It-Releases` 의 `UPDATE-NOTES(.en).md` 와 Release 별 `latest.yml`(`version` · `releaseDate`).

- 릴리스는 `Do-It` 저장소의 Release 워크플로가 올립니다. 이 저장소에서 버전을 손으로 적을 곳은 없습니다.
- 릴리스 게시·노트 변경 시 **릴리스 저장소의 Notify homepage 워크플로**가 이 저장소의 Rebuild site 를 부릅니다
  (Bible-OnAir-Releases · Do-It-Releases 둘 다. 각 저장소에 시크릿 `HOMEPAGE_DISPATCH_TOKEN` 필요).
- 게시된 버전이 하나라도 있으면 "웹에서 열기"·"열기" 버튼과 버전 표시가 저절로 켜집니다.
  첫 릴리스 뒤에는 `status` 를 `'dev'` 에서 `'live'` 로만 바꿔 주세요.
- 버전별 설치 파일 링크는 없습니다(웹앱은 항상 최신).

`content/services/<이름>.yml` 의 `releases` 는 릴리스 저장소를 못 읽었을 때 쓰는 **대비 목록**입니다.
이 값이 비어 있고 노트도 못 읽으면 버전 표시와 버튼이 통째로 사라진 페이지가 만들어지는데,
재빌드는 사람 손을 거치지 않고 결과를 커밋하므로 그대로 배포됩니다. 그래서 `status: 'live'`
인 서비스에서 릴리스가 하나도 남지 않으면 **빌드를 멈춥니다**(`src/lib/releases.js`).
새 서비스를 올릴 때는 대비 목록도 함께 채워 두세요.

### 화면 예시 이미지 교체

`public/assets/screenshots/` 의 파일을 바꾸고, 크기가 달라졌다면
`src/config/services.js`의 `screenshots[].width` / `height` 도 함께 맞춰주세요.
설명 문구는 같은 파일의 `screenshotCaptions` 에 있습니다.

## 검색 노출

검색 결과에 뜨는 제목은 화면에 보이는 제목과 따로 관리합니다. 브랜드명만 적으면
제품을 이미 아는 사람만 찾을 수 있기 때문입니다.

| 값 | 위치 | 쓰이는 곳 |
| --- | --- | --- |
| `site.title` | `src/i18n/ui.js` | 헤더 로고, 제목 접미사 |
| `site.metaTitle` | `src/i18n/ui.js` | 홈의 `<title>` |
| `metaTagline` | `src/config/services.js` | 상세 페이지의 `<title>`, 사이트 설명 |

**사이트 설명은 손으로 적지 않습니다.** `src/lib/site-meta.js` 가 `services.js` 의 목록에서
`{name} — {metaTagline}` 을 이어 붙여 만들고, 메타 설명과 푸터 문구가 함께 그 값을 씁니다.
서비스를 넣거나 빼면 저절로 따라오므로, 문구가 옛날 목록으로 남는 일이 없습니다.
잇는 방식만 바꾸고 싶으면 `ui.js` 의 `site.descriptionItem` · `descriptionJoin` · `descriptionTail`
세 값을 고치면 됩니다.

홈의 `<title>` 과 첫 화면 문구(`home.title` · `home.lede`)는 서비스 이름을 담지 않습니다.
만드는 곳이 어떤 성격인지만 밝히므로, 서비스가 늘어도 고칠 필요가 없습니다.

`canonical` · `hreflang` · 사이트맵은 모두 끝에 슬래시가 붙은 주소를 씁니다
(`BaseHead.astro` 의 `withSlash`). 한 글자라도 다르면 검색엔진이 다른 페이지로 봅니다.

사이트맵은 두 주소에서 열립니다. Astro 가 만드는 것은 `/sitemap-index.xml` 이고,
빌드 끝에 `scripts/alias-sitemap.mjs` 가 같은 내용을 `/sitemap.xml` 로 한 벌 더 둡니다.
등록 창에 습관적으로 `/sitemap.xml` 을 적어도 404 페이지(HTML)가 나오지 않게 하려는 것입니다.

링크 공유 사진(주소를 카카오톡·문자로 보냈을 때 뜨는 미리보기 그림)은 페이지마다 다릅니다. 서비스 상세 페이지는 `services.js` 의
`ogImage`(로케일별)를, 그 밖의 화면은 `settings.js` 의 `ogImage.src` 를 씁니다.

| 화면 | 그림 | 원본 |
| --- | --- | --- |
| 홈 · 404 · 문의 완료 | `og-default(-en).png` | `scripts/og-home.html` |
| Bible OnAir | `og-bible-onair(-en).png` | `scripts/og-bible-onair.html` |
| Do-It | `og-do-it(-en).png` | `scripts/og-do-it.html` |

그림의 글자는 `content/og.yml` 에 있고, 서비스 한 줄 소개처럼 페이지와 겹치는 문구는
`content/services/*.yml` 에서 가져옵니다.

**문구를 고치면 그림은 저절로 다시 만들어집니다.** `Render share images` 워크플로가
`content/` 변경을 보고 돌아, 새 그림을 `public/assets/og/` 에 커밋합니다. 이어서
`Rebuild site` 가 `docs/` 까지 반영합니다. 터미널을 열 일이 없습니다.

직접 돌리고 싶으면 저장소의 **Actions 탭 → Render share images → Run workflow** 를
누르면 됩니다.

내 컴퓨터에서 만들려면 (선택):

```
npm run og                                  # 크롬이 설치돼 있으면 그대로
CHROME_PATH=/path/to/chrome npm run og      # 경로를 직접 줄 때
```

원본 HTML 을 브라우저로 열어 **1200x630** 으로 직접 캡처해도 됩니다. 주소 끝에 `#en` 을
붙이면 영문판이 나옵니다.

서비스를 추가하면 `scripts/og-home.html` 의 상자도 한 칸 늘려 주세요. 배치만은
자동으로 따라오지 않습니다.

구조화 데이터는 모든 페이지에 `WebSite`, 프로그램 상세 페이지에 `SoftwareApplication`
이 들어갑니다. 버전과 내려받기 주소는 릴리스 목록과 같은 출처를 쓰므로 따로 손댈
필요가 없습니다.

## 다운로드 수 기록

GitHub 는 릴리스 파일마다 누적 다운로드 수를 세지만 기간별 추이는 주지 않고, 웹 화면에도
그 숫자가 나오지 않습니다. 그래서 `Track download counts` 워크플로가 주 한 번(월요일 새벽)
API 를 읽어 `data/download-stats.csv` 에 한 줄씩 쌓습니다.

```
recorded_at,tag,asset,download_count
2026-09-19T13:14:57Z,v1.1.1,Bible-OnAir-Setup-1.1.1.exe,7
```

두 날짜의 같은 항목을 빼면 그 사이의 증가분이 나옵니다. 값이 하나도 바뀌지 않은 주에는
기록하지 않으므로, 빈 주는 '변화 없음' 으로 읽으면 됩니다. 지금 값이 필요하면 Actions 에서 수동 실행하세요.

숫자를 읽을 때 유의할 점이 있습니다.

- **횟수이지 사람 수가 아닙니다.** 같은 사람이 여러 번 받으면 그만큼 올라갑니다.
- **자동 업데이트가 섞입니다.** electron-updater 가 새 버전을 받을 때도 `.exe` 가 함께 잡힙니다.
- **`latest.yml` 은 업데이트 확인 횟수에 가깝습니다.** 실행 중인 앱이 최신 릴리스의 이 파일을
  읽어 버전을 확인하므로, 설치본 규모를 가늠하는 쪽은 `.exe` 보다 이 값입니다.
- 크롤러가 받아간 것도 포함됩니다.

지금 값을 바로 보려면 아래 주소를 열면 됩니다 (토큰 없이도 조회됩니다).

```
https://api.github.com/repos/dode777/Bible-OnAir-Releases/releases
```

## 문의 양식

GitHub Pages는 정적 호스팅이라 서버가 없어서, 문의 양식은 외부 폼 릴레이
[FormSubmit](https://formsubmit.co)을 거쳐 `settings.js`의 `contactEmail` 로 전달됩니다.

**첫 사용 전에 한 번 활성화가 필요합니다.** 배포된 페이지에서 문의를 한 번 보내면
해당 메일 주소로 확인 메일이 오고, 그 링크를 누른 뒤부터 실제 문의가 전달됩니다.
활성화 전에는 전송 시 FormSubmit의 확인 안내 화면이 대신 나옵니다.

폼을 쓰지 않으려면 `settings.js`의 `contactFormEndpoint` 를 `null` 로 두면 됩니다.
그러면 양식이 사라지고 메일 링크만 표시됩니다.

## 라이선스 고지

[THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md)를 참고하세요.
