import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://enriquessosa.github.io',
  output: 'static',
  // Preserve the HTML whitespace behavior used before Astro 7.
  compressHTML: true,
  trailingSlash: 'always',
});
