<!--
 * @Author: M.H
 * @Date: 2022-11-07 15:46:08
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-08 17:29:41
 * @Description: 物料面板
-->
<template>
  <draggable :list="list" group="group" item-key="id" :sort="false" ghost-class="ghost" chosen-class="chosen" :animation="300" :class="[isWidget ? 'nest-child' : 'nest-area']">
    <template #item="{ element }">
      <ControlShape :list="list" :modules="element">
        <component :is="GLOBAL_COMPONENTS[element.component]" v-bind="element">
          <control-template :modules="element.childrens" :isWidget="true"></control-template>
        </component>
      </ControlShape>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import ControlShape from './ControlShape.vue';
import { watch } from 'vue';
import { inject } from 'vue';
import { ControlModules } from '@/vuex/controlModule';
const GLOBAL_COMPONENTS: any = inject('GLOBAL_COMPONENTS');

interface Props {
  isWidget: Boolean;
  modules: any[];
}
const { isWidget = false, modules = [] } = defineProps<Props>();
// const props = defineProps<Props>();
// const $myemit = defineEmits(['update:modules']);

let list: any[] = $ref(modules);

watch(list, (newVal) => {
  console.log(123123, newVal);
  ControlModules.mutations.CHANGE_MODULES(newVal);
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
