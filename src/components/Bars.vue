<!-- 条形图组件 -->

<template>
  <div class="bar">
    <div class="bar_inner" />
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.bar {
  height: 8px;
  border-radius: 4px;
  background: #CCCCCC;
  position: relative;
  overflow: hidden;
  margin-top: 4px;
  >.bar_inner {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 42px;
    background: #eba953;
  }
}
</style>
