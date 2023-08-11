/*
 * @Author: M.H
 * @Date: 2022-11-07 17:08:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-10 15:57:24
 * @Description: 组件引入
 */
// import McContainer from '@material/McContainer/index.vue';
// import McTab from '@material/McTab/index.vue';
// import McInput from '@material/McInput/index.vue';
// import McTitle from '@material/McTitle/index.vue';

import SchemaNumber from '@schema/SchemaNumber/index.vue';
import SchemaString from '@schema/SchemaString/index.vue';
import SchemaSelect from '@schema/SchemaSelect/index.vue';
import SchemaSwitch from '@schema/SchemaSwitch/index.vue';
import SchemaColor from '@schema/SchemaColor/index.vue';
import SchemaArray from '@schema/SchemaArray/index.vue';

async function loadModules() {
  const modules = import.meta.glob('@material/*/index.vue');
  let result: any = {};
  for (let i in modules) {
    const name = i.split('/')[3];
    result[name] = await defineAsyncComponent(modules[i] as any);
  }
  return result;
}

export const GLOBAL_MATERIAL_COMPONENTS: any = await loadModules();

// export const GLOBAL_MATERIAL_COMPONENTS: any = {
//   McContainer,
//   McTab,
//   McInput,
//   McTitle,
// };

export const GLOBAL_Schema_COMPONENTS: any = {
  number: SchemaNumber,
  string: SchemaString,
  select: SchemaSelect,
  switch: SchemaSwitch,
  color: SchemaColor,
  // upload: SchemaUpload,
  // jump: SchemaJump,
  // time: SchemaTime,
  // cube: SchemaCapCube,
  // goods: SchemaGoods,
  // object: SchemaObject,
  array: SchemaArray,
};
