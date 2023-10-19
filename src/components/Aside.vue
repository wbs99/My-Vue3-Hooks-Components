<template>
  <aside
    ref="sidebarRef" class="bg-#1f1f1f overflow-y-auto relative flex w-60 flex-col group"
    :class="[
      isResetting && 'transition-all-300 ease-in-out',
      isMobile && 'w-0',
    ]"
  >
    <div class="absolute top-3 right-2 transition opacity-0 group-hover:opacity-100" @click="collapse">
      <Icon name="mangosteen" class="cursor-pointer" />
    </div>
    <div
      class="absolute right-0 top-0 cursor-ew-resize h-full w-1 bg-#3a3a3a transition opacity-0 group-hover:opacity-100"
      @mousedown="onMouseDown" @click="resetWidth"
    />
    <div>
      <p>Aside</p>
    </div>
  </aside>
  <div
    ref="navbarRef" class="absolute top-0 left-60 w-[calc(100%-240px)]"
    :class="[
      isResetting && 'transition-all-300 ease-in-out',
      isMobile && 'left-0 w-full',
    ]"
  >
    <nav class="bg-transparent px-3 py-2 w-full" @click="resetWidth">
      <Icon v-show="isCollapsed" name="mangosteen" class="cursor-pointer" />
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const minWidth = 240
const isMobile = useMediaQuery('(max-width: 768px)')
const isResetting = ref(false)
const isCollapsed = ref(isMobile.value)
const isResizingRef = ref(false)

const sidebarRef = ref<HTMLElement | null>(null)
const navbarRef = ref<HTMLElement | null>(null)

const collapse = () => {
  if (sidebarRef.value && navbarRef.value) {
    isCollapsed.value = true
    isResetting.value = true

    sidebarRef.value.style.width = '0'
    navbarRef.value.style.setProperty('width', '100%')
    navbarRef.value.style.setProperty('left', '0')
    setTimeout(() => isResetting.value = false, 300)
  }
}
const resetWidth = () => {
  if (sidebarRef.value && navbarRef.value) {
    isCollapsed.value = false
    isResetting.value = true
    sidebarRef.value.style.width = isMobile.value ? '100%' : `${minWidth}px`
    navbarRef.value.style.setProperty(
      'width',
      isMobile.value ? '0' : `calc(100% - ${minWidth}px)`
    )
    navbarRef.value.style.setProperty(
      'left',
      isMobile.value ? '100%' : `${minWidth}px`
    )
    setTimeout(() => isResetting.value = false, 300)
  }
}

const onMouseDown = (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()
  isResizingRef.value = true
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (event: MouseEvent) => {
  if (!isResizingRef.value) {
    return
  }

  let newWidth = event.clientX

  if (newWidth < minWidth) {
    newWidth = minWidth
  }
  if (newWidth > 480) {
    newWidth = 480
  }

  if (sidebarRef.value && navbarRef.value) {
    sidebarRef.value.style.width = `${newWidth}px`
    navbarRef.value.style.setProperty('left', `${newWidth}px`)
    navbarRef.value.style.setProperty('width', `calc(100% - ${newWidth}px)`)
  }
}

const onMouseUp = () => {
  isResizingRef.value = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}

watchEffect(() => {
  isMobile.value ? collapse() : resetWidth()
})
</script>
