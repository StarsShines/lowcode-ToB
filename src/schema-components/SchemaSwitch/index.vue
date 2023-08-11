<!--
 * @Author: M.H
 * @Date: 2022-06-27 12:27:52
 * @LastEditTime: 2023-06-29 19:35:12
 * @Description: 选择器
-->
<template>
  <control-config-warp :label="props.label">
    <el-switch v-model="mValue" active-text="是" inactive-text="否" />
    <!-- <el-select v-model="mValue" class="w_100" placeholder="请选择">
      <el-option v-for="(item, index) in props.options" :key="index" :label="item.label" :value="item.value" />
    </el-select> -->
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
// console.log(props);
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
