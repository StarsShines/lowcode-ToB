/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />
declare module '*.css'; // ++
declare module '*.less'; // ++ 若使用scss可以写 declare module '*.scss'
declare module '*.png'; // ++
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
