<!--
 * @Author: M.H
 * @Date: 2022-11-10 11:44:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-29 20:15:27
 * @Description: 物料配置台
-->
<template>
  <ul>
    <li v-for="(items,keys, index) in schema" :key="index">
      <h2 class="mb-20">{{ items.label }}</h2>
      <li v-for="(item, key, childIndex) in items.child" :key="childIndex">
        <component :key="index" :is="GLOBAL_Schema_COMPONENTS[item.type]" v-model="value[keys][key]" v-bind="item" :schema="item">
        <!-- <ControlConfig v-if="item.childrens" :schema="item.childrens" v-model="value[key]" /> -->
      </component>
      </li>
     
    </li>
  </ul>
</template>

<script setup lang="ts">
import { inject } from 'vue';

const GLOBAL_Schema_COMPONENTS: any = inject('GLOBAL_Schema_COMPONENTS');

interface Props {
  schema: any;
  modelValue: any;
}
const props = defineProps<Props>();
// console.log(props,'ss')
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    // console.log('ssss')
    emit('update:modelValue', value);

  },
});
</script>
