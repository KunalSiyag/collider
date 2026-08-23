// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://collider.dev',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
    },
  },
});
