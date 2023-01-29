<template>
  <div>
    <Icon name='mangosteen' class="icon" />
    <CountDown />
    <MenuButton v-model:collapse='menuStatus' />
    <Bars />
    <LineChart />
    <PieChart />

    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Bars from '../components/Bars.vue';
import MenuButton from '../components/MenuButton.vue';
import CountDown from '../demos/CountDown.vue';
import LineChart from '../components/LineChart.vue'
import PieChart from '../components/PieChart.vue'



const menuStatus = ref(true)


</script>


<style lang="scss" scoped>

</style>
