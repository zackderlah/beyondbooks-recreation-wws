import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  site: 'https://www.beyondbooks.net.au',
  output: 'static',
  build: { assets: 'assets' },
  trailingSlash: 'never',
  vite: { plugins: [tailwindcss()] },
});
