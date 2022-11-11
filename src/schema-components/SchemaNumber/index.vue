<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 09:11:38
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-11 17:41:56
-->
<template>
  <control-config-warp :label="props.label">
    <el-slider v-model="mValue" v-bind="mOptions" show-input />
  </control-config-warp>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import ControlConfigWarp from '../ControlConfigWarp.vue';
import useSchema from '@/hooks/useSchema';

interface Props {
  id?: any;
  modelValue: any;
  label: string;
  options?: any;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

let { mOptions } = useSchema({ max: 100 }, props);
const mValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
