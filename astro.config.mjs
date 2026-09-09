import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages: main 브랜치의 /docs 디렉토리를 배포 소스로 사용합니다.
// `npm run build` 결과가 곧바로 ./docs 로 떨어지므로, 빌드 후 커밋하면 배포됩니다.
export default defineConfig({
  site: 'https://dode777.github.io',
  outDir: './docs',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
});
