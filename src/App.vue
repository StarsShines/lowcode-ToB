<!--
 * @Author: M.H
 * @Date: 2022-10-31 15:39:05
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-11 17:20:40
 * @Description: 请填写简介
-->

<template>
  <router-view />
</template>
<script setup lang="ts">
import { provide } from 'vue';
import { registerComponentsSchema } from '@/utils/registerSchema';
import { GLOBAL_MATERIAL_COMPONENTS, GLOBAL_Schema_COMPONENTS } from '@/utils/registerCompenents';

const { material, fields } = registerComponentsSchema();

provide('$material', material);
provide('$fields', fields);
provide('GLOBAL_MATERIAL_COMPONENTS', GLOBAL_MATERIAL_COMPONENTS);
provide('GLOBAL_Schema_COMPONENTS', GLOBAL_Schema_COMPONENTS);
</script>
<style lang="scss">
html,
body {
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
/* element滚动条组件 隐藏水平滚动条 */
.sidebar-wrapper .el-scrollbar__wrap {
  overflow-x: hidden;
}
.is-horizontal {
  display: none;
}
</style>
