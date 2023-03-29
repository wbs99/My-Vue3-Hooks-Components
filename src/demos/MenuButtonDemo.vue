<template>
  <div>
    <MenuButton v-model:collapse='menuStatus' />
  </div>
</template>

<script lang="ts" setup>
import MenuButton from '../components/MenuButton.vue';
import { ref } from 'vue';

const menuStatus = ref(true)

</script>


<style lang="scss" scoped>

</style>
