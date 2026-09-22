import { defineConfig } from 'vite';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from 'path';
import glob from 'fast-glob';
import { fileURLToPath } from 'url';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import injectHTMLPlugin from 'vite-plugin-html-inject';
import eslintPlugin from 'vite-plugin-eslint';
import stylelintPlugin from 'vite-plugin-stylelint';
import { createHtmlPlugin } from 'vite-plugin-html';

// Адрес для проксирования запросов
const origin = 'https://your-game-origin.ru';


export default defineConfig({
  base: './',
  plugins: [
    injectHTMLPlugin(),
    eslintPlugin({
      cache: false,
      fix: true,
    }),
    stylelintPlugin({
      cache: false,
      fix: true,
      lintDirtyOnly: false,
    }),
    ViteImageOptimizer({
      svg: {
        plugins: [
          'removeDoctype',
          'removeXMLProcInst',
          'minifyStyles',
          'sortAttrs',
          'sortDefsChildren',
        ],
      },
      png: {
        quality: 85,
      },
      jpeg: {
        quality: 85,
      },
      jpg: {
        quality: 85,
      },
    }),
    createHtmlPlugin({
      minify: true
    }),
    {
      ...imagemin(['./src/img/**/*.{jpg,png,jpeg}'], {
        destination: './src/img/webp/',
        plugins: [imageminWebp({ quality: 85 })],
      }),
      apply: 'serve',
    },
  ],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync(['./*.html', './pages/**/*.html'])
          .map((file) => [
            path.relative(__dirname, file.slice(0, file.length - path.extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
    },
  },
  css: {
    devSourcemap: true,
  },
  server: {
		cors: false,
		proxy: {
      '/api': {
        target: origin,
        changeOrigin: true,
      }
    }
	}
});
