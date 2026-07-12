// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE, BASE } from './site.config.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [
    sitemap({
      // @ts-ignore — EnumChangefreq type narrowing quirk in @astrojs/sitemap@3.x
      serialize(item) {
        const url = item.url;
        // Homepage — highest priority
        if (url === `${SITE}/` || url === `${SITE}`) {
          item.priority = 1.0;
          item.changefreq = 'weekly';
          item.lastmod = new Date().toISOString().split('T')[0];
        }
        // Business detail pages — high priority
        else if (/\/[a-z0-9-]+\/$/.test(url) && !url.includes('/category/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
          item.lastmod = new Date().toISOString().split('T')[0];
        }
        // Category pages — medium priority
        else if (url.includes('/category/')) {
          item.priority = 0.6;
          item.changefreq = 'weekly';
          item.lastmod = new Date().toISOString().split('T')[0];
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
