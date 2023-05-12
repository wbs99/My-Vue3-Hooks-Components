<template>
  <div class="wrapper">
    <ul>
      <li v-for="demo in demoList" :key="demo.path">
        <router-link :to="demo.path">{{ demo.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const demoList = reactive([
  { path: '/useLongPress', name: '长按' },
  { path: '/CountDownButton', name: '倒计时按钮' },
  { path: '/SwiperDemo', name: '移动端手势滑动' },
  { path: '/BackTop', name: 'BackTop 返回顶部按钮' },
  { path: '/bars', name: 'Bars 条形图组件' },
  { path: '/floatButton', name: 'FloatButton 悬浮按钮' },
  { path: '/menuButton', name: 'MenuButton 菜单切换按钮' },
  { path: '/infiniteImage', name: '图片循环移动' },
  { path: '/longList', name: '虚拟长列表' }

])

</script>


<style lang="scss" scoped>
.wrapper {
  padding-left: 128px;

  ul {
    max-height: 80vh;
    display: inline-flex;
    flex-direction: column;
    flex-wrap: wrap;

    li {
      padding: 6px;

      &:hover {
        color: #6135c0;
      }
    }
  }
}
</style>
