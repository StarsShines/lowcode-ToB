<!--
 * @Author: M.H
 * @Date: 2022-11-04 11:23:52
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-04 18:27:57
 * @Description: 控制器
-->
<template>
  <div class="control">
    <!-- 物料列表 -->
    <div class="control-models">
      <div>基础组件</div>
      <draggable :list="$initializing" :group="{ name: 'itxst', pull: 'clone' }" :sort="false" :clone="handleClone" animation="300">
        <template #item="{ element }">
          <div class="control-models-item">
            <span class="iconify-inline" data-icon="IEpBox"></span>

            <el-icon :size="20" color="#000000"> <component is="i-ep-box"></component></el-icon>
            <el-icon :size="20" color="#000000"> <i-ep-box></i-ep-box></el-icon>
            <span class="f13">{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </div>

    <!-- 页面面板 -->
    <div class="control-page">
      <div class="panel">
        <div class="panel-content">
          <!-- 可根据实际需求选择是否需要物料组件 -->

          <!-- 不可嵌套物料 -->
          <!-- <control-widget :widgets.sync="widgets" /> -->

          <!-- 递归可嵌套物料 -->
          <!-- <control-nest-widget :widgets.sync="widgets" /> -->
        </div>
      </div>
    </div>

    <!-- 物料配置 -->
    <div class="control-config">
      <!-- <template v-if="curComponent"> -->
      <!-- <custom-schema-template :schema="curSchema" v-model="curComponent"></custom-schema-template> -->

      <div>
        <h4 class="f-theme mt10 mb10">当前物料数据</h4>
        {{ curComponent }}
      </div>
      <!-- </template> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { inject } from 'vue';
import { deepClone, getRandomCode } from '@/utils/utils';

const $initializing: any = inject('$initializing');
const $fields: any = inject('$fields');
const curComponent: any = $ref(null);
console.log($initializing);
//可嵌套物料
const widgets: any = $ref([]);

const curSchema = $computed(() => {
  return $fields[curComponent.component];
});
// 复制物料
const handleClone = (original: any) => {
  return {
    ...deepClone(original),
    id: getRandomCode(8),
  };
};
</script>

<style lang="scss" scoped>
.control {
  display: flex;
  height: calc(100vh - 60px);

  .control-models {
    width: 236px;
    height: calc(100vh - 60px);
    padding: 10px 20px;
    background: #fff;

    .control-models-item {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 90px; /*no*/
      padding: 15px 0; /*no*/
      font-size: 12px; /*no*/
      color: #666;
      cursor: pointer;

      i {
        font-size: 29px; /*no*/
        margin-top: 5px; /*no*/
        margin-bottom: 10px; /*no*/
      }

      &:hover {
        color: #fff !important;
        background: $color-theme;
        .canvas-left-item-type {
          color: #fff;
        }
      }
    }
  }

  .control-page {
    display: flex;
    justify-content: center;
    flex: 1;
    height: 100%;
    overflow: auto;

    .panel {
      width: 100%;
      max-width: 900px;

      .panel-content {
        width: 375px;
        margin: 50px auto;
        background: #fff;
        box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .control-config {
    width: 360px;
    height: calc(100vh - 60px);
    overflow: auto;
    animation-duration: 0.2s;
    padding: 10px;
    background: #fff;
  }
}
</style>
