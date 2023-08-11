<!--
 * @Description: 请填写简介
-->
<!--
 * @Author: M.H
 * @Date: 2023-06-27 12:27:52
 * @LastEditTime: 2023-07-22 16:51:47
 * @Description: 字符配置器
-->
<template>
  <control-config-warp :label="props.label">
    <div v-for="(item, index) in props.modelValue" :key="index">
      <component :key="index" :is="GLOBAL_Schema_COMPONENTS[item.type]" v-model="item.label" v-bind="item" :schema="item"></component>
    </div>
    <div class="positionRelative h35">
      <el-button type="primary" class="btn-position" @click="addFn">
        添加
        <el-icon><Plus /> </el-icon
      ></el-button>
    </div>
  </control-config-warp>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import ControlConfigWarp from '../ControlConfigWarp.vue';
import { ControlModules } from '@/vuex/controlModule';
import { addTypeListFn } from '@/utils/addTypeList';
const GLOBAL_Schema_COMPONENTS: any = inject('GLOBAL_Schema_COMPONENTS');

interface Props {
  id?: any;
  modelValue: any;
  label: string;
  options?: any;
  schema?: any;
}
const props = defineProps<Props>();
console.log(props, 'ppp');
const emit = defineEmits(['update:modelValue']);

// let { mOptions } = useSchema({ placeholder: '请输入' }, props);
const mValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const curComponent: any = $computed(() => {
  return ControlModules.getters.getCurComponent;
});
const componentName = $ref(curComponent.component);

const addFn = () => {
  let obj = addTypeListFn(componentName, props.modelValue);
  props.modelValue.push(obj);
};
</script>
<style lang="scss" scoped>
.h35 {
  height: 35px;
  .btn-position {
    margin-top: 10px;
    position: absolute;
    right: 10px;
  }
}
</style>
