<template>
  <div class="w-600px h-100px overflow-hidden relative b-1 b-solid b-red m-y-0 m-x-auto">
    <div class="slider flex absolute top-0 left-0 bottom-0" :style="{ animationDuration: duration }">
      <div v-for="image in doubleImages" :key="image.id" class="w-20% flex-shrink-0">
        <img :src="image.src" alt="slide" class="block w-100% h-auto p-r-12px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';

const images = reactive([
  { id: 1, src: 'https://via.placeholder.com/150x150?text=Image+1' },
  { id: 2, src: 'https://via.placeholder.com/150x150?text=Image+2' },
  { id: 3, src: 'https://via.placeholder.com/150x150?text=Image+3' },
  { id: 4, src: 'https://via.placeholder.com/150x150?text=Image+4' },
  { id: 5, src: 'https://via.placeholder.com/150x150?text=Image+5' }
])
const duration = ref('15s')
const doubleImages = computed(() => [...images, ...images])
</script>

<style lang="scss" scoped>
.slider {
  animation: scroll infinite linear;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}
</style>