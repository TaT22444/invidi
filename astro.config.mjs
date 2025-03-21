// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      // ここにオプションを指定可能。通常は空でOK
    }),
  ],
  output: 'server',   // ここが重要 (デフォルトは 'static')
  adapter: node({
    // どの形式で出力するか: 'standalone' や 'server', 'edge' など
    // （例）以下はNodeのポータブルなサーバーをビルド出力
    mode: 'standalone',
  }),
});
