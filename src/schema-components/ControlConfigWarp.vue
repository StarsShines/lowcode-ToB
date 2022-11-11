<!--
 * @Author: M.H
 * @Date: 2022-11-11 16:06:06
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-11 16:07:17
 * @Description: 请填写简介
-->
<template>
  <div class="wrap">
    <div v-show="title" class="wrap-title">
      <span>{{ title }}</span>
    </div>

    <div class="wrap-body">
      <slot></slot>

      <div v-show="line" class="wrap-line"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  title?: string;
  line?: boolean;
}
const { title = '', line = false } = defineProps<Props>();
</script>

<style lang="scss" scoped>
.wrap {
  .wrap-title {
    padding: 10px 12px; /*no*/
    background: #e8f0fb40;
    font-size: 14px; /*no*/
    color: #323233;

    span {
      &::before {
        content: '.';
        width: 3px; /*no*/
        height: 10px; /*no*/
        margin-right: 8px; /*no*/
        background: $color-theme;
      }
    }
  }

  .wrap-body {
    padding: 20px 20px 10px 20px; /*no*/

    .wrap-line {
      margin-top: 30px;
      height: 1px;
      background: #ebedf0;
    }
  }
}
</style>
