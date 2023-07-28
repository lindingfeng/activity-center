<template>
  <div class="receive-coupons-component">
    <!-- <div v-lazy:background-image="$attrs.imageUrl" class="coupon-image"></div> -->
    <!-- <div
      v-lazy-container="{
        selector: 'img'
      }"
      class="coupon-image"
    >
      <img class="icon-coupon" :data-src="$attrs.imageUrl">
    </div> -->
    <div class="coupon-image">
      <img v-if="couponInfo.status === '1'" class="icon-coupon" :src="$attrs.received" @click="useCoupon">
      <img v-else class="icon-coupon" :src="$attrs.unreceive" @click="receiveCoupon">
    </div>
  </div>
</template>

<script setup>
import { useAttrs, onMounted } from 'vue'
// import { useRouter } from 'vue-router/composables'
import couponComposables from '@/composables/coupon'

const { couponInfo, getCouponStatus, addCoupon } = couponComposables()

// const router = useRouter()

const attrs = useAttrs()

defineOptions({
  name: 'ReceiveCoupons'
})

const props = defineProps({
  couponId: String,
  couponType: String
})

// const emits = defineEmits(['update'])

/**
 * 查询优惠券/券包状态
 */
async function queryCouponStatus () {
  if (!props.couponId) return
  await getCouponStatus({
    id: props.couponId || '',
    isCouponParcel: props.couponType || '0'
  })
}

/**
 * 领取优惠券/券包
 */
async function receiveCoupon () {
  if (!props.couponId) return
  await addCoupon({
    id: props.couponId || '',
    isCouponParcel: props.couponType || '0'
  })
}

function useCoupon () {
  if (attrs.couponLink) {
    window.location.href = attrs.couponLink
  }
}

onMounted(() => {
  queryCouponStatus()
})

</script>

<style lang="scss" scoped>
.coupon-image {
  .icon-coupon {
    width: 100%;
    // &[lazy="loading"], &[lazy="error"] {
    //   height: 100px;
    // }
    // &[lazy="loaded"] {
    //   opacity: 1;
    // }
  }
}
</style>
