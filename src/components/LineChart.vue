<!-- 折线图组件 -->
<template>
  <div ref="lineChartDivRef" class="line-chart">
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const lineChartDivRef = ref<HTMLElement>()
onMounted(() => {
  if (lineChartDivRef.value === undefined) { return }
  const myChart = echarts.init(lineChartDivRef.value)
  myChart.setOption({
    grid: [
      { left: 0, top: 0, right: 0, bottom: 20 }
    ],
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  })
})
</script>


<style lang="scss" scoped>
.line-chart{
  width: 100%;
  height: 128px;
}
</style>
