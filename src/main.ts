/*
 * @Author: M.H
 * @Date: 2022-10-31 15:39:05
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-04 18:18:07
 * @Description: 请填写简介
 */
import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router/index';


const app: any = createApp(App).use(router).mount('#app');
