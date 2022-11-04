<template>
  <div>
    <div>home page</div>

    <router-link to="/about">about</router-link>
    <Icon name='add' />
    <br>
    <CountDown />
    <MenuButton v-model:collapse='menuStatus' />
    <ImgLoop />

    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ImgLoop from '../components/ImgLoop.vue';
import MenuButton from '../components/MenuButton.vue';
import CountDown from '../demos/CountDown.vue';


const menuStatus = ref(true)


</script>


<style lang="scss" scoped>

</style>
