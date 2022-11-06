/*
 * @Author: M.H
 * @Date: 2022-10-31 15:39:05
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-04 11:29:08
 * @Description: 请填写简介
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
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
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      dts: resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
      dts: resolve(pathSrc, 'components.d.ts'),
    }),
    Icons({
      autoInstall: true,
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
