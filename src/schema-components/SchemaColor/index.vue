<!--
 * @Author: M.H
 * @Date: 2023-06-27 12:27:52
 * @LastEditTime: 2023-06-27 18:41:11
 * @Description: 请填写简介
-->
<template>
  <control-config-warp :label="props.label">
    <el-color-picker v-model="mValue" :predefine="predefineColors" show-alpha></el-color-picker>
  </control-config-warp>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ControlConfigWarp from '../ControlConfigWarp.vue';
// import useSchema from '@/hooks/useSchema';

interface Props {
  id?: any;
  modelValue: any;
  label: string;
  options?: any;
}
const props = defineProps<Props>();
const predefineColors: any = ['#ffffff', '#f5f5f5f5', '#F2F2F2', '#FF4444', '#FFCD00', '#3FBC87', '#5197FF', '#BADCFF', '#000000'];

const emit = defineEmits(['update:modelValue']);

// let { mOptions } = useSchema({}, props);
const mValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss" scoped></style>
