import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Относительные пути для работы на GitHub Pages и в iframe Яндекс Игр
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});