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
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      //axisTick: { show: false }, //坐标轴刻度
    },
    yAxis: {
      type: 'value',
      axisLine: { show: true }, //是否显示 y 轴
      splitLine: { show: false },
      // splitLine: { lineStyle: { color: '#073E78' } },
      axisLabel: {
        formatter(value: number) {
          return `${value * 100}%`
        }
      }
    },
    series: [{
      name: '故意伤人',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      symbol: 'circle',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#414a9f'
        }, {
          offset: 1,
          color: '#1b1d52'
        }]),
      }
    }]
  })
})
</script>


<style lang="scss" scoped>
.line-chart{
  width: 100%;
  height: 128px;
}
</style>
