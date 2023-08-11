<!--
 * @Author: M.H
 * @Date: 2022-11-04 11:36:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-27 18:11:25
 * @Description: 标题组件
-->
<template>
  <div class="title">
    <div :class="[`title-${options.position}-model`]">
      <!-- 主标题 -->
      <div class="title" :style="getTitleStyle()">
        {{ options.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  styles?: any;
  options?: any;
}
const { options = {}, styles = {} } = defineProps<Props>();
const getTitleStyle = () => {
  return {
    color: styles.titleColor,
    fontSize: styles.titleSize + 'px',
    height: styles.height + 'px',
    lineHeight: styles.lineHeight + 'px',
  };
};
</script>

<style lang="scss" scoped>
.title {
  .title-left-model {
    display: flex;
    align-items: flex-end;
    padding-left: 10px;
    padding-right: 10px;
  }

  .title-center-model {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title-right-model {
    display: flex;
    align-items: flex-start;
    padding-left: 10px;
    padding-right: 10px;
  }
}

// .content{
//   display:flex;
//   align-items:center;
//   // flex-direction: ;
//   .content-box1{
//     width: 80px;
//     height: 60px;
//   }
//   .content-box2{
//     width: 80px;
//     height: 60px;
//   }
//   .content-box3{
//     width: 80px;
//     height: 60px;
//   }
// }
</style>
