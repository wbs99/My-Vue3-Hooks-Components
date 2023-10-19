<template>
  <div>
    <MenuButton v-model:collapse="menuStatus" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MenuButton from '../components/MenuButton.vue';

const menuStatus = ref(true)
</script>

<style lang="scss" scoped>

</style>
