<!--
 * @Author: M.H
 * @Date: 2022-11-07 15:46:08
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-11 17:21:40
 * @Description: 物料面板
-->
<template>
  <draggable :list="list" group="group" item-key="id" :sort="false" ghost-class="ghost" chosen-class="chosen" :animation="300" handle=".mover" :class="[isWidget ? 'nest-child' : 'nest-area']">
    <template #item="{ element }">
      <ControlShape :modules="element">
        <component :is="GLOBAL_MATERIAL_COMPONENTS[element.component]" v-bind="element">
          <control-template :modules="element.childrens" :isWidget="true"></control-template>
        </component>
      </ControlShape>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import ControlShape from './ControlShape.vue';
import { inject } from 'vue';

const GLOBAL_MATERIAL_COMPONENTS: any = inject('GLOBAL_MATERIAL_COMPONENTS');

interface Props {
  isWidget: Boolean;
  modules: any[];
}
// const { isWidget = false, modules } = defineProps<Props>();
const props = defineProps<Props>();
// const $myemit = defineEmits(['update:modules']);

// let list: any[] = $ref(props.modules);
//conmputed实时获取入参
let list: any[] = $computed(() => {
  // console.log('computed');
  return props.modules;
});
</script>

<style lang="scss" scoped>
.nest-child {
  min-height: 80px;
  background: #f7f8fa80;
}

.nest-area {
  min-height: 600px;
  height: calc(100vh - 85px);
}

.nest-none {
  background: url('https://file.qingflow.com/assets/empty-content/applying-editorial-tips.png');
  background-size: 100% 100%;
}
</style>
