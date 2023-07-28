<template>
  <div id="root-app">
    <router-view
      :key="baseStore.timestamp"
      :data-timestamp="baseStore.timestamp"
      class="app-page"
    />
    <base-login v-model="userStore.loginPopup" />
  </div>
</template>

<script setup>
import { useBaseStore } from '@/store'
import { useUserStore } from '@/store/user'
import BaseLogin from '@/components/common/base-login/index.vue'

const baseStore = useBaseStore()

const userStore = useUserStore()

// setTimeout(() => {
//   userStore.loginPopup = true
// }, 2000);

</script>

<style lang="less">
@import '@/common/style/index.scss';
#root-app, .app-page {
  height: 100%;
}
// @media screen and (min-width: 650px) {
//   body {
//     max-width: 650px;
//     margin: 0 auto !important;
//   }
// }
</style>
