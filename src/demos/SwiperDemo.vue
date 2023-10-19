<template>
  <h4>观察控制台 console 即可</h4>
  <div ref="divRef" class="wrapper" />
</template>

<script lang="ts" setup>
import { throttle } from 'echarts';
import { ref, watchEffect } from 'vue';
import { useSwiper } from '../hooks/useSwiper';

const divRef = ref<HTMLElement>()
const { direction, swiping } = useSwiper(divRef, { beforeStart: e => e.preventDefault() })
const throttleSwiper = throttle(() => {
  console.log('向左滑动')
}, 500)

watchEffect(() => {
  if (swiping.value && direction.value === 'left') {
    throttleSwiper()
  }
})
</script>

<style lang="scss" scoped>
.wrapper{
  border:1px solid red;
  height: 100vh;
  width: 100%;
}
</style>
