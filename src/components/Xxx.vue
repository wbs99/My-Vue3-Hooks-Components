<!-- 折线图组件 -->
<template>
  <div ref="lineChartDivRef" class="line-chart" />
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import china from './zhejiang.json';

const lineChartDivRef = ref<HTMLElement>()
onMounted(() => {
  if (lineChartDivRef.value === undefined) { return }
  const geoCoordMap: any = {
    和平: [117.2, 39.12],
    河东: [117.22, 39.12],
    河西: [117.22, 39.12],
    南开: [117.15, 39.13],
    河北: [117.18, 39.15],
    红桥: [117.15, 39.17],
    塘沽: [117.65, 39.02],
    汉沽: [117.8, 39.25],
    大港: [117.45, 38.83],
    东丽: [117.3, 39.08],
    西青: [117, 39.13],
    津南: [117.38, 38.98],
    北辰: [117.13, 39.22],
    武清: [117.03, 39.38],
    宝坻: [117.3, 39.72],
    宁河: [117.82, 39.33],
    静海: [116.92, 38.93],
    蓟县: [117.4, 40.05],
  }
  const data = [
    { name: '和平', value: 199 },
    { name: '河东', value: 39 },
    { name: '河西', value: 152 },
    { name: '南开', value: 299 },
    { name: '河北', value: 89 },
    { name: '红桥', value: 52 },
    { name: '塘沽', value: 9 },
    { name: '汉沽', value: 352 },
    { name: '大港', value: 99 },
    { name: '东丽', value: 39 },
    { name: '西青', value: 480 },
    { name: '津南', value: 481 },
    { name: '北辰', value: 482 },
    { name: '武清', value: 483 },
    { name: '宝坻', value: 484 },
    { name: '宁河', value: 485 },
    { name: '静海', value: 486 },
    { name: '蓟县', value: 487 },
  ]
  const max = 480; const min = 9 // todo
  const maxSize4Pin = 100; const minSize4Pin = 20

  const convertData = function (data: any) {
    const res = []
    for (let i = 0; i < data.length; i++) {
      const geoCoord = geoCoordMap[data[i].name]
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        })
      }
    }
    return res
  }
  // @ts-expect-error
  echarts.registerMap('CN', china)
  const myChart = echarts.init(lineChartDivRef.value)
  myChart.setOption({
    visualMap: {
      show: false,
      min: 0,
      max: 500,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true,
      seriesIndex: [1],
      inRange: {
        color: ['#0f0c29', '#302b63', '#24243e']

      }
    },
    geo: {
      show: true,
      map: 'tianjin',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false,
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#031525',
          borderColor: '#3B5077',
        },
        emphasis: {
          areaColor: '#2B91B7',
        }
      }
    },
    series: [
      {
        name: 'credit_pm2.5',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data),
        symbolSize(val: any) {
          return val[2] / 10
        },
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#05C3F9'
          }
        }
      },
      {
        type: 'map',
        map: 'tianjin',
        geoIndex: 0,
        aspectScale: 0.75, // 长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#3B5077',
          },
          emphasis: {
            areaColor: '#2B91B7'
          }
        },
        animation: false,
        data
      },
      {
        name: '点',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize(val: any) {
          const a = (maxSize4Pin - minSize4Pin) / (max - min)
          let b = minSize4Pin - a * min
          b = maxSize4Pin - a * max
          return a * val[2] + b
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 9,
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#F62157', // 标志颜色
          }
        },
        zlevel: 6,
        data: convertData(data),
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertData(data.sort((a, b) => {
          return b.value - a.value
        }).slice(0, 5)),
        symbolSize(val: any) {
          return val[2] / 10
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#05C3F9',
            shadowBlur: 10,
            shadowColor: '#05C3F9'
          }
        },
        zlevel: 1
      },

    ]
  })
})
</script>

<style lang="scss" scoped>
.line-chart{
  width: 100%;
  height: 100vh;
}
</style>
