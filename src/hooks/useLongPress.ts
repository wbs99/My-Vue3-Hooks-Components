import { ref } from 'vue'

export const useOnLongPress = (onLongPress: () => void) => {
  const timer = ref<number>()
  const currentTag = ref<HTMLDivElement>()
  const onTouchStart = (e: TouchEvent) => {
    currentTag.value = e.currentTarget as HTMLDivElement
    timer.value = setTimeout(() => {
      onLongPress()
    }, 500)
  }
  const onTouchEnd = () => {
    clearTimeout(timer.value)
  }

  const onTouchMove = (e: TouchEvent) => {
    const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
    if (currentTag.value !== pointedElement
      && currentTag.value?.contains(pointedElement) === false) {
      clearTimeout(timer.value)
    }
  }
  return { onTouchStart, onTouchMove, onTouchEnd }
}
