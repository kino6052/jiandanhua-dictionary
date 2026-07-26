import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import markdownPlugin from './vite-plugin-markdown.js';

export default defineConfig({
  base: './',
  server: {
    host: '127.0.0.1',
  },
  preview: {
    host: '127.0.0.1',
  },
  plugins: [
    markdownPlugin(),
    preact(),
  ],
});
