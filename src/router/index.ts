import * as VueRouter from 'vue-router';
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/schema',
    name: 'schema',
    component: () => import('@/views/schema/index.vue'),
  },
];
const router: any = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export { router };
