# dode777.github.io

ISO Company 서비스 링크 페이지. [Astro](https://astro.build)로 만들고
[Odyssey Theme](https://github.com/treefarmstudio/odyssey-theme)(MIT)의 디자인을 기반으로 했습니다.

**https://dode777.github.io**

## 배포 구조

GitHub Pages는 `main` 브랜치의 `/docs` 디렉토리를 배포 소스로 사용합니다.
`npm run build` 결과가 곧바로 `./docs`로 떨어지므로, **빌드 결과물을 함께 커밋해야 배포됩니다.**

```
npm install
npm run dev      # 로컬 개발 서버 (http://localhost:4321)
npm run build    # ./docs 로 정적 사이트 생성
npm run preview  # 빌드 결과 미리보기
```

> `docs/.nojekyll`은 GitHub Pages의 Jekyll 처리가 Astro 번들 디렉토리(`_astro/`)를
> 걸러내지 않도록 하기 위한 파일입니다. 지우지 마세요.

## 페이지 구성

| 경로 | 내용 |
| --- | --- |
| `/` | 서비스 목록 · 간단 설명 · 다운로드 버튼 |
| `/bible-onair` | Bible On Air 상세 |
| `/pressfilter` | PressFilter 상세 |
| `/en`, `/en/<서비스>` | 영문 페이지 |
| `/404` | 없는 주소 |

상세 페이지는 소개 · 주요 기능 · 설치 및 사용 가이드 · 시스템 요구사항 ·
버전 및 변경 내역 · FAQ · 문의 순서로 구성됩니다.

## 디렉토리

```
src/
  config/
    settings.js     브랜드명, 도메인, 문의 이메일, GitHub 주소
    services.js     ★ 서비스 카탈로그 (한/영 문구가 모두 여기 있습니다)
  i18n/ui.js        UI 문구 사전 + 로케일 경로 헬퍼
  styles/           Odyssey 기반 디자인 토큰 / 타이포 / 리셋
  components/       Header, Footer, 버튼, 카드, 상세 페이지 섹션
  layouts/          Base(문서 뼈대), Page(헤더+푸터 포함)
  pages/            라우트 (en/ 하위가 영문)
public/
  assets/fonts/     Lato, Roboto Serif (라틴)
docs/               ★ 빌드 산출물 = 배포본 (커밋 대상)
```

## 자주 하는 작업

### 문구 수정

거의 모든 서비스 문구는 `src/config/services.js`에 있습니다.
헤더·푸터·버튼 같은 공통 UI 문구는 `src/i18n/ui.js`에 있습니다.

### 서비스 추가

`src/config/services.js`의 `services` 배열에 항목을 하나 더 넣으면
목록 카드, 상세 페이지(`/<slug>`, `/en/<slug>`), 헤더/푸터 링크, 사이트맵이 함께 생성됩니다.
`ko`, `en` 두 언어 블록을 모두 채워야 합니다.

### Bible On Air 다운로드 버튼 활성화

현재는 GitHub Releases에 릴리스가 없어 버튼이 "준비 중"으로 표시됩니다.
첫 배포 후 아래 순서로 켜면 됩니다.

1. `Bible-Viewer` 저장소에서 `npm run build` (electron-builder, Windows portable exe)
2. 생성된 exe를 GitHub Releases에 태그와 함께 업로드
3. 이 저장소 `src/config/services.js`의 `bible-onair` 항목에서
   `downloadReady: true`로 변경하고 `currentVersion` 갱신
4. `npm run build` 후 `docs/`까지 커밋

`downloadUrl`은 `releases/latest`를 가리키므로 최신 릴리스로 자동 연결됩니다.

### PressFilter 웹스토어 링크 연결

크롬 웹스토어 등록이 끝나면 `pressfilter` 항목의
`downloadUrl`에 웹스토어 주소를 넣고 `downloadReady: true`, `status: 'live'`로 바꾸면
버튼이 "크롬 웹스토어에서 설치"로 바뀝니다.

## 라이선스 고지

[THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md)를 참고하세요.
