<!--
 * @Author: M.H
 * @Date: 2022-10-31 16:49:32
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-07 11:44:42
 * @Description: 请填写简介
-->

<template>
  <div class="page">
    <pageHeader />
    <div class="page-body">
      <control />
    </div>
  </div>
</template>

<script setup lang="ts">
import pageHeader from '@/components/PageHeader/index.vue';
import control from '@/components/Control/index.vue';
</script>

<style lang="scss" scoped>
.page {
  .page-body {
    height: calc(100vh - 60px);
    width: 100%;
    margin-top: 60px;
    overflow: auto;
  }
}
</style>
