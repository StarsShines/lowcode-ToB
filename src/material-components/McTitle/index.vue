<!--
 * @Description: 标题组件
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:37:07
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-08 10:25:35
-->
<template>
  <div class="title">
    <div :class="[position == 'center' ? 'title-mid-model' : 'title-left-model']">
      <!-- 主标题 -->
      <div class="title" :style="getTitleStyle()">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: String;
  position?: String;
  styles?: any;
}
const { title = '', position = '', styles = {} } = defineProps<Props>();
const getTitleStyle = () => {
  return {
    color: styles.titleColor,
    fontSize: styles.titleSize + 'px',
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

  .title-mid-model {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
