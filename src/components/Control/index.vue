<!--
 * @Author: M.H
 * @Date: 2022-11-04 11:23:52
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-09 17:25:24
 * @Description: 控制器
-->
<template>
  <div class="control">
    <!-- 物料列表 -->
    <el-scrollbar style="height: calc(100vh - 60px); box-shadow: 2px 0px 20px #ddd">
      <div class="control-models">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="基础组件" name="basic">
            <draggable
              :list="$material.basic.$initializing"
              :group="{ name: 'group', pull: 'clone', put: false }"
              item-key="id"
              :sort="false"
              :clone="handleClone"
              :animation="300"
              @start="onStart"
              @end="onEnd"
            >
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
            <draggable
              :list="$material.search.$initializing"
              :group="{ name: 'group', pull: 'clone', put: false }"
              item-key="id"
              :sort="false"
              :clone="handleClone"
              :animation="300"
              @start="onStart"
              @end="onEnd"
            >
              <template #item="{ element }">
                <div class="control-models-item">
                  <el-icon :size="13"><component :is="element.icon"></component></el-icon>
                  <span class="title-text">{{ element.name }}</span>
                </div>
              </template>
            </draggable>
          </el-collapse-item>
          <el-collapse-item title="视图大纲" name="views">
            <el-tree
              :allow-drop="allowDrop"
              :data="treeData"
              :props="{ label: 'name', children: 'childrens' }"
              draggable
              default-expand-all
              node-key="id"
              @node-drag-end="handleDragEnd"
              @node-drop="handleDrop"
            />
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-scrollbar>
    <!-- 页面面板 -->
    <div class="control-page">
      <div class="panel">
        <div class="panel-content">
          <!-- 递归物料组件 -->
          <ControlTemplate :modules="modules" :isWidget="false" />
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
import type Node from 'element-plus/es/components/tree/src/model/node';
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode';

import draggable from 'vuedraggable';
import { inject, computed } from 'vue';
import { deepClone, getRandomCode } from '@/utils/utils';
import ControlTemplate from './ControlTemplate.vue';
import { useControlModules } from '@/vuex/useControlModule';
import { state } from '@/vuex/useCommandModule';

const $material: any = inject('$material');
const $fields: any = inject('$fields');

const curComponent: any = $computed(() => {
  console.log('curComponent');
  return useControlModules.getters.getCurComponent;
});

const activeNames = $ref(['basic', 'views']);

//可嵌套物料
let modules: any[] = $computed(() => {
  return useControlModules.getters.getModules;
});
//实时获取指针队列历史数据
let oldModules: any[] = $computed(() => {
  return useControlModules.getters.getOldModules;
});
//配置器
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

let treeData = computed(() => {
  return useControlModules.getters.getModules;
});

//拖拽开始记录历史数据
const onStart = () => {
  console.log('start', modules);
  useControlModules.mutations.CHANGE_OLDMODULES(deepClone(modules));
};
//拖拽结束更新物料模块数据，同时更新指针队列
const onEnd = () => {
  console.log('end', modules);
  useControlModules.mutations.CHANGE_MODULES(modules);
  // console.log('updata3', useControlModules.getters.getModules);
  state.commands.updateData(oldModules, modules);
};

//树形事件
//判断是否能成为拖动位置
const allowDrop = (draggingNode: Node, dropNode: Node, type: any) => {
  if (dropNode.data.label === 'Level two 3-1') {
    return type !== 'inner';
  } else {
    return true;
  }
};

//拖拽结束
const handleDragEnd = (draggingNode: Node, dropNode: Node, dropType: any, ev: DragEvents) => {
  console.log('tree drag end:', dropNode && dropNode.label, dropType);
};
//拖拽完成
const handleDrop = (draggingNode: Node, dropNode: Node, dropType: any, ev: DragEvents) => {
  console.log('tree drop:', dropNode.label, dropType);
};
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
      .panel-content {
        width: calc(100% - 180px);
        margin: 12px auto;
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
