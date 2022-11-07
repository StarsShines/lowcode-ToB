<!--
 * @Author: M.H
 * @Date: 2022-11-04 11:23:52
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-07 18:25:40
 * @Description: 控制器
-->
<template>
  <div class="control">
    <!-- 物料列表 -->
    <el-scrollbar style="height: calc(100vh - 60px)">
      <div class="control-models">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="基础组件" name="basic">
            <draggable :list="$material.basic.$initializing" :group="{ name: 'group', pull: 'clone', put: false }" item-key="id" :sort="false" :clone="handleClone" :animation="300">
              <template #item="{ element }">
                <div class="control-models-item">
                  <!-- <el-icon><Plus /></el-icon> -->
                  <el-icon :size="13"><component :is="element.icon"></component></el-icon>
                  <span class="title-text">{{ element.name }}</span>
                </div>
              </template>
            </draggable>
          </el-collapse-item>
          <el-collapse-item title="搜索组件" name="search">
            <draggable :list="$material.search.$initializing" :group="{ name: 'group', pull: 'clone', put: false }" item-key="id" :sort="false" :clone="handleClone" :animation="300">
              <template #item="{ element }">
                <div class="control-models-item">
                  <!-- <el-icon><Plus /></el-icon> -->
                  <el-icon :size="13"><component :is="element.icon"></component></el-icon>
                  <span class="title-text">{{ element.name }}</span>
                </div>
              </template>
            </draggable>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-scrollbar>
    <!-- 页面面板 -->
    <div class="control-page">
      <div class="panel">
        <div class="panel-content">
          <!-- 可根据实际需求选择是否需要物料组件 -->

          <!-- 不可嵌套物料 -->
          <!-- <control-widget :widgets.sync="widgets" /> -->

          <!-- 递归可嵌套物料 -->
          <ControlTemplate v-model:widgets="widgets" :isWidget="false" />
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
import ControlTemplate from './ControlTemplate.vue';
import { watch } from 'vue';

const $material: any = inject('$material');
const $fields: any = inject('$fields');
const curComponent: any = $ref(null);

const activeNames = $ref(['basic']);

//可嵌套物料
let widgets = $ref<any[]>([]);
const curSchema = $computed(() => {
  return $fields[curComponent.component];
});

//面板展开
const handleChange = (val: string[]) => {
  console.log(val);
};

// 复制物料
const handleClone = (original: any) => {
  return {
    ...deepClone(original),
    id: getRandomCode(8),
  };
};

const onEnd = () => {};
</script>

<style lang="scss" scoped>
.control {
  display: flex;
  height: calc(100vh - 60px);
  box-sizing: border-box;

  .control-models {
    width: 236px;
    height: auto;
    padding: 10px 20px;
    background: #fff;
    box-sizing: border-box;
    .control-models-item {
      display: inline-flex;
      width: 100%; /*no*/
      padding: 5px 12px; /*no*/
      font-size: 14px; /*no*/
      color: #666;
      height: 30px;
      line-height: 30px;
      cursor: pointer;

      &:hover {
        color: #fff !important;
        background: $color-theme;
        .canvas-left-item-type,
        .el-icon {
          color: #fff;
        }
      }
      .el-icon {
        margin-top: 8px;
      }
      .title-text {
        margin-left: 5px;
      }
    }
  }

  .control-page {
    display: flex;
    justify-content: center;
    flex: 1;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;

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
    box-sizing: border-box;
  }
}
</style>
