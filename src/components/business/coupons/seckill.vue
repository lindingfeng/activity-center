<template>
  <div class="seckill-coupon-component">
    <div class="coupon-image">
      <img v-if="couponInfo.status === '1'" class="icon-coupon" :src="$attrs.couponOutImage">
      <img v-else class="icon-coupon" :src="$attrs.couponImage">
    </div>
  </div>
</template>

<script setup>
// import { getCurrentInstance } from 'vue'

// const { proxy } = getCurrentInstance()

defineOptions({
  name: 'SeckillCoupons'
})

defineProps({
  couponId: String,
  couponType: String
})

// const emits = defineEmits(['update'])

</script>

<style lang="scss" scoped>
.coupon-image {
  .icon-coupon {
    width: 100%;
  }
}
</style>
