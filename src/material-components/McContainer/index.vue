<!--
 * @Author: M.H
 * @Date: 2022-11-04 11:36:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-29 18:39:10
 * @Description: 容器组件
-->

<template>
  <div class="cnt">
    <div class="cnt-head h5-underline"></div>
    <div class="cnt-body" :style="getContainertyle()">
      <slot class="nest-none"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PaddingEntity {
  paddingTop?: Number;
  paddingBottom?: Number;
  paddingLeft?: Number;
  paddingRight?: Number;
}
interface Props {
  styles?: PaddingEntity;
  options?: any;
}

const { styles = { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 } } = defineProps<Props>();
const getContainertyle = () => {
  return {
    paddingTop: styles.paddingTop + 'px',
    paddingBottom: styles.paddingBottom + 'px',
    paddingLeft: styles.paddingLeft + 'px',
    paddingRight: styles.paddingRight + 'px',
  };
};
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
