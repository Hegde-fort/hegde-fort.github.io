// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://hegde-fort.github.io',
  integrations: [
    mdx(),
    sitemap(),
    icon({
      include: {
        'simple-icons': ['x', 'linkedin', 'googlescholar', 'github'],
      },
    }),
  ],
});