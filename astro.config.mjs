// Astro settings. You rarely need to touch this file.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config.ts';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Keep the "thank you" pages out of search results.
      filter: (page) => !page.includes('/thanks/') && !page.includes('/subscribed/'),
    }),
  ],
});
