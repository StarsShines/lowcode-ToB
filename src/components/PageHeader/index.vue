<!--
 * @Author: M.H
 * @Date: 2022-11-01 16:30:34
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-04 11:18:37
 * @Description: 头部文件
-->
<template>
  <div class="page-head">
    <span>可视化搭建平台</span>
    <div class="config-group">
      <el-button size="small" @click="toSchema">撤销</el-button>
      <el-button size="small" @click="toSchema">重做</el-button>
      <el-button size="small" @click="toEdit">{{ isEdit ? '预览' : '编辑' }}</el-button>
    </div>
    <el-button size="small" @click="toSchema">schema 生成器</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

let isEdit = $ref(true);

const router = useRouter();

const toEdit = () => {
  isEdit = !isEdit;
};

const toSchema = () => {
  let { href } = router.resolve({
    path: '/schema',
  });
  window.open(href);
};
</script>

<style>
.page-head {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 4px 6px 0 rgba(12, 31, 80, 0.04);
}
</style>
