/*
 * @Author: M.H
 * @Date: 2022-10-31 15:39:05
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-07 16:45:09
 * @Description: 请填写简介
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const pathSrc = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      dirs: ['src/material-components'],
      resolvers: [ElementPlusResolver()],

      dts: resolve(pathSrc, 'components.d.ts'),
    }),
  ],
  resolve: {
    // ++ 配置resolve.alias
    alias: {
      '@': pathSrc,
      '@api': resolve(__dirname, 'src/service/api'),
      '@material': resolve(__dirname, 'src/material-components'),
      '@materialTemplate': resolve(__dirname, 'src/material-template'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        /**如果引入多个文件，可以使用
         * '@import "@/assets/scss/globalVariable1.scss";
         * @import"@/assets/scss/globalVariable2.scss";'
         **/
        additionalData: '@import "@/style/globalVar.scss";',
      },
    },
  },
});
