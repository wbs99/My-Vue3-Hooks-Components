<template>
  <div>
    <Icon name='mangosteen' class="icon" />
    <CountDownButton />

    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import CountDownButton from '../demos/CountDownButton.vue';

</script>


<style lang="scss" scoped>
</style>
