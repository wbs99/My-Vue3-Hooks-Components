<template>
  <LongList :data="data" :prepare-top-count="10" :prepare-bottom-count="10" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import LongList from '../components/LongList.vue';

const data = reactive(
  Array(10000).fill(0).map((_, i) => `item-${i}`)
)
</script>

<style lang="scss" scoped></style>
