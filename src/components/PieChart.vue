<!-- 饼图组件 -->
<template>
  <div ref="pieChartDivRef" class="pie-chart">
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const pieChartDivRef = ref<HTMLElement>()
onMounted(() => {
  if (pieChartDivRef.value === undefined) { return }
  const myChart2 = echarts.init(pieChartDivRef.value)
  myChart2.setOption({
    grid: [
      { left: 0, top: 0, right: 0, bottom: 20 }
    ],
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
})
</script>


<style lang="scss" scoped>
.pie-chart{
  width: 100%;
  height: 50vh;
}
</style>
