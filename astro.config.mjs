// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://skiathos-atletico.gr',
  integrations: [
    sitemap({
      serialize(item) {
        const url = item.url;
        // Homepage — highest priority
        if (url === 'https://skiathos-atletico.gr/' || url === 'https://skiathos-atletico.gr') {
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
