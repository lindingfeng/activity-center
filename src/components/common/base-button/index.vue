<template>
  <Button
    block
    color="#ffda05"
    class="base-button-component"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </Button>
</template>

<script setup>
import { Button } from 'vant'

defineOptions({
  name: 'BaseButton'
})

</script>

<style lang="scss" scoped>
.base-button-component {
  border: 0;
  font-size: 16px;
  color: #2c2c2c !important;
}
</style>