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
  assets/fonts/       Lato, Roboto Serif (라틴)
  assets/screenshots/ 프로그램 화면 이미지
docs/                 ★ 빌드 산출물 = 배포본 (커밋 대상)
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

### 화면 예시 이미지 교체

`public/assets/screenshots/` 의 파일을 바꾸고, 크기가 달라졌다면
`src/config/services.js`의 `screenshots[].width` / `height` 도 함께 맞춰주세요.
설명 문구는 같은 파일의 `screenshotCaptions` 에 있습니다.

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
