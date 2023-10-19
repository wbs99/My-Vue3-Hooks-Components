<template>
  <div ref="wrapperRef" class="wrapper" @scroll="onScroll">
    <div ref="containerRef" :style="{ paddingTop: `${paddingTop}px` }">
      <div v-for="(item, index) in visibleList" :key="index" class="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  data: Array,
  prepareTopCount: {
    type: Number,
    default: 10
  },
  prepareBottomCount: {
    type: Number,
    default: 10
  }
})

const wrapperRef = ref<any>(null)
const containerRef = ref<any>(null)
const count = ref(0)
const start = ref(0)
const end = ref(1)
const itemHeight = ref(0)
const paddingTop = ref(0)
const visibleList = computed(() => props.data?.slice(start.value, end.value))

onMounted(() => {
  itemHeight.value = containerRef.value.firstElementChild.offsetHeight
  containerRef.value.style.height = props.data?.length && `${props.data?.length * itemHeight.value}px`
  count.value = Math.floor(wrapperRef.value.offsetHeight / itemHeight.value)
  end.value = count.value + props.prepareBottomCount
})

let timer = 0
const onScroll = function (e: any) {
  if (timer)
    clearTimeout(timer)
  timer = setTimeout(() => {
    const startValue = Math.floor(e.target.scrollTop / itemHeight.value)
    const buff = startValue > props.prepareTopCount ? props.prepareTopCount : startValue
    start.value = startValue - buff
    end.value = startValue + count.value + props.prepareBottomCount
    paddingTop.value = start.value * itemHeight.value
  }, 200)
}
</script>

<style>
.wrapper {
  height: 100%;
  overflow: scroll;
}

.item {
  border: 1px solid #eee;
  padding: 10px;
}
</style>
