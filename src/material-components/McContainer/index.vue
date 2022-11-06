<!--
 * @Author: M.H
 * @Date: 2022-11-04 11:36:10
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-04 18:20:12
 * @Description: 请填写简介
-->

<template>
  <div class="cnt">
    <div class="cnt-head h5-underline"></div>
    <div class="cnt-body" :style="{ padding: `${padding}px 0` }">
      <slot class="nest-none"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  padding?: Number;
}
const { padding = 0 } = defineProps<Props>();
</script>

<style lang="scss" scoped>
.cnt {
  border-radius: 10px;
  box-shadow: 0 4px 6px 0 rgba(12, 31, 80, 0.14);
  margin-top: 5px;

  .cnt-head {
    height: 30px;
    background: url('https://file.qingflow.com/assets/widget/theme/header0.png');
    background-size: 100% 100%;
    font-size: 14px;
    color: #fff;
    letter-spacing: 1px;
  }
  .cnt-body {
    padding: 10px;
    background: #fff;
  }
}
</style>
