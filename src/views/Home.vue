<template>
  <div>
    <Icon name='mangosteen' class="icon" />
    <CountDownButton />
    <LongPress />

    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import CountDownButton from '../demos/CountDownButton.vue';
import LongPress from '../demos/LongPressDemo.vue'
import Swiper from '../demos/SwiperDemo.vue'

</script>


<style lang="scss" scoped>
</style>
