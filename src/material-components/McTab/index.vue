<!--
 * @Author: M.H
 * @Date: 2023-06-27 12:27:52
 * @LastEditTime: 2023-07-22 17:30:47
 * @Description: 请填写简介
-->
<template>
  <el-tabs
    :style="getMarginStyle()"
    :tab-position="options.tabPosition"
    :closable="options.closable"
    v-model="currentName"
    class="demo-tabs"
    :type="options.card"
    @tab-change="tabChangeFn"
  >
    <!-- <slot class="nest-nones"></slot> -->
    <el-tab-pane :style="getPaddingStyle()" :label="item.label" :name="item.value" v-for="(item, index) in options.list" :key="index">
      <slot class="nest-none" :name="currentName + 'group'"></slot>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { watch } from 'vue';
import { ControlModules } from '@/vuex/controlModule';
import { getRandomCode } from '@/utils/utils';

interface Props {
  styles?: any;
  options?: any;
  id?: string;
}

const { options = {}, styles = {}, id = '' } = defineProps<Props>();

const currentName: number = $ref(0);

let modules: any[] = $computed(() => {
  return ControlModules.getters.getModules;
});

watch(
  () => options.list,
  () => {
    modules.forEach((e) => {
      if (e.id === id) {
        e.childrens.push({
          component: 'McContainer',
          name: '容器',
          icon: 'DocumentAdd',
          model: 'single',
          childrens: [],
          styles: {
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
          },
          id: getRandomCode(8),
        });
      }
    });
  },
  { deep: true },
);

const getMarginStyle = () => {
  return {
    marginTop: styles.marginTop + 'px',
    marginBottom: styles.marginBottom + 'px',
    marginLeft: styles.marginLeft + 'px',
    marginRight: styles.marginRight + 'px',
  };
};
const getPaddingStyle = () => {
  return {
    paddingTop: styles.paddingTop + 'px',
    paddingBottom: styles.paddingBottom + 'px',
    paddingLeft: styles.paddingLeft + 'px',
    paddingRight: styles.paddingRight + 'px',
  };
};

const tabChangeFn = (val: any) => {
  modules.forEach((e) => {
    if (e.id === id) {
      e.curSlot = val + 'group';
    }
  });
};
</script>
