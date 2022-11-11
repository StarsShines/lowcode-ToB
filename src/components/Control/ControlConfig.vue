<!--
 * @Author: M.H
 * @Date: 2022-11-10 11:44:18
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-11 17:11:22
 * @Description: 物料配置台
-->
<template>
  <ul>
    <li v-for="(item, key, index) in schema" :key="index">
      <component :key="index" :is="typeToComponent[item.type]" v-model="value[key]" v-bind="item" :schema="item">
        <ControlConfig v-if="item.childrens" :schema="item.childrens" v-model="value[key]" />
      </component>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
interface Props {
  schema: any;
  modelValue: any;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
//组件type

const typeToComponent = $ref<any>({
  number: 'SchemaNumber',
  string: 'SchemaString',
  select: 'SchemaSelect',
  switch: 'SchemaSwitch',
  color: 'SchemaColor',
  upload: 'SchemaUpload',
  jump: 'SchemaJump',
  time: 'SchemaTime',
  cube: 'SchemaCapCube',
  goods: 'SchemaGoods',
  object: 'SchemaObject',
  array: 'SchemaArray',
});
</script>
