import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './dev', //開発ディレクトリ設定
  build: {
    outDir: '../public', //出力場所の指定
    rollupOptions: {
      input: {//htmlファイルを増やす場合
        contact: resolve(__dirname, './dev/contact/index.html'),
      },
      output: {//ファイル出力設定
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `${extType}/[name][extname]`;
        },
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',
      },
    },
    minify: 'false', //デフォルト: 'esbuild'
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, './dev/components'),
    }),
  ],
});