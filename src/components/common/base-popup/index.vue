<template>
  <Popup
    class="base-popup-component"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </Popup>
</template>

<script setup>
import { Popup } from 'vant'

defineOptions({
  name: 'BasePopup'
})

</script>

<style lang="scss" scoped>
.base-popup-component {
  background-color: transparent;
}
</style>