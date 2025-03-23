import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// import node from '@astrojs/node';
import netlify from '@astrojs/netlify';
// import netlify from '@astrojs/netlify/functions'; // 使わないのでコメントアウト

export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: netlify()
});
