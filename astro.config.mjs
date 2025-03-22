// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify/functions';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [react()],
  output: 'server',
  outDir: './dist', // 出力ディレクトリを明示的に指定
  adapter: netlify({
    mode: 'directory'
  }),
});