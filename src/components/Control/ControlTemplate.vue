<!--
 * @Author: M.H
 * @Date: 2022-11-07 15:46:08
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-07 18:46:34
 * @Description: 物料面板
-->
<template>
  <!-- <component :is="McContainer"></component> -->
  <draggable :list="list" group="group" item-key="id" :sort="false" ghost-class="ghost" chosen-class="chosen" :animation="300" :class="[isWidget ? 'nest-child' : 'nest-area']">
    <template #item="{ element }">
      <component :is="GLOBAL_COMPONENTS[element.component]" v-bind="element">
        <ControlTemplate v-model:widgets="element.childrens" :isWidget="true"></ControlTemplate>
      </component>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { watchEffect, watch } from 'vue';
import { inject } from 'vue';
const GLOBAL_COMPONENTS: any = inject('GLOBAL_COMPONENTS');

interface Props {
  isWidget: Boolean;
  widgets: any[];
}
const { isWidget = false, widgets = [] } = defineProps<Props>();
const $myemit = defineEmits(['update:widgets']);

let list = $ref(widgets);
watch(list, (newVal) => {
  console.log(list);
  console.log(widgets);
  $myemit('update:widgets', newVal);
});

// const updataWidgets = (widget: any[]) => {
//   emit('updataWidgets', widget);
// };
</script>

<style lang="scss" scoped>
.nest-child {
  min-height: 80px;
  background: #f7f8fa80;
}

.nest-area {
  min-height: 600px;
}

.nest-none {
  background: url('https://file.qingflow.com/assets/empty-content/applying-editorial-tips.png');
  background-size: 100% 100%;
}
</style>
