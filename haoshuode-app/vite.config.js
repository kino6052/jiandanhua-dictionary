import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import markdownPlugin from './vite-plugin-markdown.js';

export default defineConfig({
  base: './',
  plugins: [
    markdownPlugin(),
    preact(),
  ],
});
