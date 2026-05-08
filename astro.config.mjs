import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://alejandro290513.github.io/zazasmokeshop.github.io/',
  base: '/zazasmokeshop.github.io/',
});
