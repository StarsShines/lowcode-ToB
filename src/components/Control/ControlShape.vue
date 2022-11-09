<!--
 * @Author: M.H
 * @Date: 2022-11-08 09:56:24
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-09 17:00:25
 * @Description: 面板控制器
-->
<template>
  <div class="shape" @click.stop="setcurComponent(modules)" ref="shape">
    <!-- 选中组件高亮 -->
    <div v-if="isCurComponent(modules.id)" class="shape-solid event-none"></div>

    <div class="shape-dashed event-none"></div>

    <!-- 组件工具栏 -->
    <div v-if="isShow" class="shape-tab">
      <template v-if="isCurComponent(modules.id)">
        <el-icon class="iconfont icon-shanchu tab-icon f16" @click.stop="commitOldData(deepClone($modules), curComponent.id)"><DeleteFilled /></el-icon>
      </template>

      <span v-else>{{ modules.name }}</span>
    </div>

    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { useControlModules } from '@/vuex/useControlModule';
import { onMounted } from 'vue';
import { deepClone } from '@/utils/utils';
import { state } from '@/vuex/useCommandModule';

interface Props {
  modules?: any;
}
const { modules = {} } = defineProps<Props>();

let $modules: any[] = $computed(() => {
  // console.log('updata1', useControlModules.getters.getModules);
  return useControlModules.getters.getModules;
});

// let $modules = $ref(list);
let shape: any = $ref(null);
let isShow: boolean = $ref(false);

onMounted(() => {
  isShow = true;
});
//获取当前选中物料数据
const curComponent: any = $computed(() => {
  return useControlModules.getters.getCurComponent;
});
//物料id是否匹配
const isCurComponent = (id: any) => {
  return curComponent?.id == id;
};
//实时获取指针队列历史数据
let oldModules: any[] = $computed(() => {
  return useControlModules.getters.getOldModules;
});

// 选中物料
const setcurComponent = (modules: any) => {
  console.log('lists', $modules);
  useControlModules.mutations.CHANGE_CURCOMPONENT(modules);
};
//上报历史数据
const commitOldData = (list: any, id: string) => {
  useControlModules.mutations.CHANGE_OLDMODULES(list);
  let _list = deepClone(list);

  //递归删除物料
  let newList = delComponent(_list, id);
  //上报并更新数据
  useControlModules.mutations.CHANGE_MODULES(newList);
  useControlModules.mutations.CHANGE_CURCOMPONENT('');
  state.commands.updateData(oldModules, newList);
};
//删除物料模块
const delComponent = (list: any, id: string) => {
  // 遍历查找目标下标
  let index = list.reduce((pre: any, cur: any, i: any) => {
    return cur.id == id ? i : pre;
  }, -1);

  // 找到目标，删除无名
  if (index >= 0) {
    list.splice(index, 1);
  } else {
    // 递归子物料
    list
      .filter((c: any) => c.childrens)
      .forEach((c: any) => {
        delComponent(c.childrens, id);
      });
  }
  return list;
};
</script>

<style lang="scss" scoped>
.shape {
  position: relative;

  &:hover > .shape-dashed {
    display: block;
  }

  .shape-dashed {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: dashed 1px $color-theme;
    z-index: 100;
  }

  .shape-solid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: solid 1px $color-theme;
    z-index: 100;
  }

  .shape-tab {
    position: absolute;
    top: 0; /*no*/
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px; /*no*/
    height: 24px; /*no*/
    font-size: 12px; /*no*/
    color: #333;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    right: -86px;
    &::after {
      content: '';
      position: absolute;
      right: 100%; /*no*/
      top: 7px; /*no*/
      width: 0; /*no*/
      height: 0; /*no*/
      border-width: 5px; /*no*/
      border-style: solid;
      border-color: transparent;
      margin-bottom: -1px; /*no*/
      border-right-width: 5px; /*no*/
      border-right-color: currentColor;
      color: #fff;
    }
  }

  .event-none {
    pointer-events: none;
  }

  .tab-icon {
    color: #969799;
    cursor: pointer;
    width: 100%;
    &:hover {
      color: #87888a;
    }
  }
}
</style>
