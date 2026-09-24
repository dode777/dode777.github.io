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
src/
  config/
    settings.js     브랜드명, 도메인, 문의 이메일, 폼 전송 주소
    services.js     ★ 프로그램 카탈로그 (한/영 문구가 모두 여기 있습니다)
  i18n/ui.js        UI 문구 사전 + 로케일 경로 헬퍼
  styles/           Odyssey 기반 디자인 토큰 / 타이포 / 리셋
  components/       Header, Footer, 버튼, 카드, 상세 페이지 섹션, 문의 폼
  layouts/          Base(문서 뼈대), Page(헤더+푸터 포함)
  pages/            라우트 (en/ 하위가 영문)
public/
  CNAME               커스텀 도메인 (isocompany.co.kr)
  robots.txt          크롤러 안내 + 사이트맵 위치
  assets/fonts/       Lato, Roboto Serif (라틴)
  assets/screenshots/ 프로그램 화면 이미지
  assets/og/          링크 공유 미리보기 이미지 (1200x630)
docs/                 ★ 빌드 산출물 = 배포본 (커밋 대상)
scripts/
  track-downloads.mjs 릴리스 다운로드 수 수집 (Actions 에서 실행)
  og-image.html       위 미리보기 이미지의 원본 (브라우저로 캡처해 교체)
  alias-sitemap.mjs   빌드 후 sitemap-index.xml 을 sitemap.xml 로 한 벌 더 복사
data/
  download-stats.csv  다운로드 수 기록 (사이트 빌드에는 쓰이지 않습니다)
```

## 자주 하는 작업

### 문구 수정

프로그램 관련 문구는 `src/config/services.js`에 있습니다.
헤더·푸터·버튼·문의 양식 같은 공통 UI 문구는 `src/i18n/ui.js`에 있습니다.

### 프로그램 추가

`src/config/services.js`의 `services` 배열에 항목을 넣으면 목록 카드,
상세 페이지(`/<slug>`, `/en/<slug>`), 헤더/푸터 링크, 사이트맵이 함께 생성됩니다.
`ko`, `en` 두 언어 블록을 모두 채워야 합니다.

### 버전 올릴 때

`Bible-OnAir-Releases`에 새 릴리스를 올린 뒤 `src/config/services.js`의
`currentVersion` · `installerName` · `releases` 를 갱신하고 `npm run build` 후 `docs/`까지 커밋합니다.
`downloadUrl`은 `releases/latest`를 가리키므로 링크 자체는 고칠 필요가 없습니다.
릴리스 항목의 `date` 는 `null` 이면 화면에 날짜가 표시되지 않습니다. `'2026-09-11'` 형식으로 채워 넣으면 됩니다.

### Do-It (웹앱) 버전

Do-It 은 설치 파일이 아니라 웹앱이라 `downloadKind: 'web'` 입니다. 버전·릴리스 목록은
Bible OnAir 와 같은 방식으로 **자동으로** 읽습니다 — `services.js` 의 `releaseSource` 가 가리키는
`Do-It-Releases` 의 `UPDATE-NOTES(.en).md` 와 Release 별 `latest.yml`(`version` · `releaseDate`).

- 릴리스는 `Do-It` 저장소의 Release 워크플로가 올립니다. 이 저장소에서 버전을 손으로 적을 곳은 없습니다.
- 게시된 버전이 하나라도 있으면 "웹에서 열기"·"열기" 버튼과 버전 표시가 저절로 켜집니다.
  첫 릴리스 뒤에는 `status` 를 `'dev'` 에서 `'live'` 로만 바꿔 주세요.
- 버전별 설치 파일 링크는 없습니다(웹앱은 항상 최신).

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
| `metaTagline` | `src/config/services.js` | 상세 페이지의 `<title>` |

`canonical` · `hreflang` · 사이트맵은 모두 끝에 슬래시가 붙은 주소를 씁니다
(`BaseHead.astro` 의 `withSlash`). 한 글자라도 다르면 검색엔진이 다른 페이지로 봅니다.

사이트맵은 두 주소에서 열립니다. Astro 가 만드는 것은 `/sitemap-index.xml` 이고,
빌드 끝에 `scripts/alias-sitemap.mjs` 가 같은 내용을 `/sitemap.xml` 로 한 벌 더 둡니다.
등록 창에 습관적으로 `/sitemap.xml` 을 적어도 404 페이지(HTML)가 나오지 않게 하려는 것입니다.

링크 공유 미리보기 이미지는 `settings.js` 의 `ogImage` 가 가리킵니다. 교체할 때는
1200x630 을 지키세요. `scripts/og-image.html` 을 브라우저로 열어 그 크기로 캡처하면
같은 모양으로 다시 만들 수 있습니다.

구조화 데이터는 모든 페이지에 `WebSite`, 프로그램 상세 페이지에 `SoftwareApplication`
이 들어갑니다. 버전과 내려받기 주소는 릴리스 목록과 같은 출처를 쓰므로 따로 손댈
필요가 없습니다.

## 다운로드 수 기록

GitHub 는 릴리스 파일마다 누적 다운로드 수를 세지만 기간별 추이는 주지 않고, 웹 화면에도
그 숫자가 나오지 않습니다. 그래서 `Track download counts` 워크플로가 하루 한 번
API 를 읽어 `data/download-stats.csv` 에 한 줄씩 쌓습니다.

```
recorded_at,tag,asset,download_count
2026-09-19T13:14:57Z,v1.1.1,Bible-OnAir-Setup-1.1.1.exe,7
```

두 날짜의 같은 항목을 빼면 그 사이의 증가분이 나옵니다. 값이 하나도 바뀌지 않은 날에는
기록하지 않으므로, 빈 날은 '변화 없음' 으로 읽으면 됩니다.

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
