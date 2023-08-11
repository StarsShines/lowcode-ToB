<!--
 * @Author: M.H
 * @Date: 2023-06-27 12:27:52
 * @LastEditTime: 2023-06-27 18:24:47
 * @Description: 数字配置器
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
// console.log(props, 'peo');
const emit = defineEmits(['update:modelValue']);

let { mOptions } = useSchema({ max: 1000 }, props);
const mValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
