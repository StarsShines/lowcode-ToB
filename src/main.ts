/*
 * @Author: M.H
 * @Date: 2022-10-31 15:39:05
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-07 11:31:29
 * @Description: 请填写简介
 */
import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router/index';
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const app: any = createApp(App);
//全局注册图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router).mount('#app');
