<template>
  <div class="base-page-load-component">
    <div v-if="loading" class="page-loading">
      <Loading type="spinner" size="36px" color="#ffda05" />
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup>
import { Loading } from 'vant'

defineOptions({
  name: 'BasePageLoad'
})

defineProps({
  loading: {
    type: Boolean,
    default: true
  }
})

</script>

<style lang="scss" scoped>
.base-page-load-component {
  width: 100%;
  height: 100%;
  .page-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>