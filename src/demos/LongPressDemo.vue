<template>
  <div class="wrapper" @touchmove="onTouchMove">
    <div class="radius" @touchstart="onTouchStart" @touchend="onTouchEnd">
    </div>
  </div>
</template>

<script lang="ts" setup>import { useOnLongPress } from '../hooks/useLongPress';
const onLongPress = () => {
  console.log('这是长按')
}
const { onTouchStart, onTouchMove, onTouchEnd } = useOnLongPress(onLongPress)
</script>


<style lang="scss" scoped>
.wrapper{
  border:1px solid blue;
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
  .radius{
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: pink;
  }
}
</style>