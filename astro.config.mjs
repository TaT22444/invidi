// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      // ここにオプションを指定可能。通常は空でOK
    }),
  ],
  output: 'server',   // SSRモードは維持
  adapter: netlify(),  // Netlify用アダプターに変更
});
