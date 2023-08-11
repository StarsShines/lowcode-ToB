<template>
  <div class="input-box" :style="getMarginStyle()">
    <div class="b-flex">
      <!-- 主标题 -->
      <div class="input-title" :style="getTitleStyle()" v-if="options.isLabel">{{ options.labelTitle }}:</div>
      <div :style="getInputStyle()">
        <el-input
          v-model="options.value"
          :placeholder="options.placeholder"
          :maxlength="options.maxlength"
          :clearable="options.clearable"
          :disabled="options.disabled"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  styles?: any;
  options?: any;
}
const { options = {}, styles = {} } = defineProps<Props>();
const getMarginStyle = () => {
  return {
    marginTop: styles.marginTop + 'px',
    marginBottom: styles.marginBottom + 'px',
    marginLeft: styles.marginLeft + 'px',
    marginRight: styles.marginRight + 'px',
  };
};
const getTitleStyle = () => {
  return {
    flex: '0 0 ' + styles.labelWidth + 'px',
  };
};
const getInputStyle = () => {
  return {
    flex: styles.inputWidth,
  };
};
</script>

<style lang="scss" scoped>
.b-flex {
  display: flex;
  .input-title {
    line-height: 35px;
    text-align: right;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
</style>
