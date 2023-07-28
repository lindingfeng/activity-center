<template>
  <div class="activity-center-component">
    <div class="activity-center-body">
      <template
        v-for="(item, index) in componentList"
      >
        <component
          :is="item.activityComp"
          :key="index"
          v-bind="item.compAttrs || {}"
          v-on="item.compEvents || {}"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const componentTypes = {
  'RECEIVE_COUPON': () => import('@/components/business/coupons/receive.vue'),
  'SECKILL_COUPON': () => import('@/components/business/coupons/seckill.vue')
}

defineOptions({
  name: 'ActivityCenter'
})

const props = defineProps({
  list: Array
})

const componentList = computed(() => {
  return props.list.filter(item => componentTypes[item.type]).map(child => {
    return {
      ...child,
      activityComp: componentTypes[child.type]
    }
  })
})

</script>

<style lang="scss" scoped></style>
