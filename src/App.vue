<!--
 * @Author: M.H
 * @Date: 2022-10-31 15:39:05
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-04 18:27:08
 * @Description: 请填写简介
-->

<template>
  <router-view />
</template>
<script setup lang="ts">
import { provide } from 'vue';
import { registerComponentsSchema } from '@/utils/registerSchema';

const { initializing, fields } = registerComponentsSchema();
console.log(initializing);

provide('$initializing', initializing);
provide('$fields', fields);
</script>
<style scoped></style>
