<template>
  <div class="menu-button" :class="{ collapse: !props.collapse }" @click="buttonStatusToggle">
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  collapse: {
    type: Boolean,
    required: true,
    default: true
  },
});
const emits = defineEmits(["update:collapse"]);
const buttonStatusToggle = () => {
  emits('update:collapse', !props.collapse)
}
</script>

<style lang="scss" scoped>
$menu-button-color: #686870;
.menu-button {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.5s;
  position: relative;
  &:before {
    position: absolute;
    width: 70%;
    height: 2px;
    background-color: $menu-button-color;
    content: "";
    transform: translateY(-7px);
    transition: 0.5s;
  }
  &:after {
    position: absolute;
    width: 70%;
    height: 2px;
    box-shadow: 0 -7px 0 $menu-button-color;
    background-color: $menu-button-color;
    content: "";
    transform: translateY(7px);
    transition: 0.5s;
  }
  &.collapse {
    &:before {
      transform: translateY(0px) rotate(45deg);
    }
    &:after {
      transform: translateY(0px) rotate(-45deg);
      box-shadow: 0 0 0 $menu-button-color;
    }
  }
}
</style>
