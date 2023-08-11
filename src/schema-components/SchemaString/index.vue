<!--
 * @Author: M.H
 * @Date: 2023-06-27 12:27:52
 * @LastEditTime: 2023-06-29 18:57:10
 * @Description: 字符配置器
-->
<template>
  <control-config-warp :label="props.label">
    <el-input v-model="mValue" v-bind="mOptions" :placeholder="mOptions.placeholder" size="default"></el-input>
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
// console.log(props, 'ppp');
const emit = defineEmits(['update:modelValue']);

let { mOptions } = useSchema({ placeholder: '请输入' }, props);
const mValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
