<!--
 * @Author: M.H
 * @Date: 2022-11-10 11:44:18
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-10 11:51:00
 * @Description: 物料配置台
-->
<template>
  <ul>
    <li v-for="(item, key, index) in schema" :key="index">
      <component :key="index" :is="getComponents(item.type)" v-model="value[key]" v-bind="item" :schema="item">
        <custom-schema-template v-if="item.childrens" :schema="item.childrens" :value="value[key]"></custom-schema-template>
      </component>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  schema: any[];
  value: any;
}
const props = defineProps<Props>();

const getComponents = (type: string) => {
  return `schema-${type}`;
};
</script>
