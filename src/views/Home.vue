<template>
  <div>
    <Icon name='mangosteen' class="icon" />
    <CountDown />
    <MenuButton v-model:collapse='menuStatus' />
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MenuButton from '../components/MenuButton.vue';
import CountDown from '../demos/CountDown.vue';



const menuStatus = ref(true)


</script>


<style lang="scss" scoped>

</style>
