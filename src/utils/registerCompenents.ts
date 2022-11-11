/*
 * @Author: M.H
 * @Date: 2022-11-07 17:08:29
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-11 18:14:04
 * @Description: 组件引入
 */
import McContainer from '@material/McContainer/index.vue';
import McTitle from '@material/McTitle/index.vue';

import SchemaNumber from '@schema/SchemaNumber/index.vue';

export const GLOBAL_MATERIAL_COMPONENTS: any = {
  McContainer,
  McTitle,
};

export const GLOBAL_Schema_COMPONENTS: any = {
  number: SchemaNumber,
  // string: SchemaString,
  // select: SchemaSelect,
  // switch: SchemaSwitch,
  // color: SchemaColor,
  // upload: SchemaUpload,
  // jump: SchemaJump,
  // time: SchemaTime,
  // cube: SchemaCapCube,
  // goods: SchemaGoods,
  // object: SchemaObject,
  // array: SchemaArray,
};
