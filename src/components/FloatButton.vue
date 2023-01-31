<template>
  <div class='floatButton'>
    <Icon :name="props.iconName" />
  </div>
</template>

<script lang="ts" setup>
import Icon from './Icon.vue'
const props = defineProps({
  iconName: {
    type: String,
    required: true,
  }
})
</script>


<style lang="scss" scoped>
.floatButton {
  background: var(--float-button-bg);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 16px;
  right: 16px;
  .icon {
    width: 24px;
    height: 24px;
    fill: var(--float-button-text);
  }
}
</style>
