<template>
  <base-page-load
    :loading="loading"
    class="home-page"
  >
    <div class="home-content">
      <activity-center
        :list="list"
      />
      <div class="button" @click="userStore.webLogin()">web登录</div>
      <div class="button" @click="userStore.appLogin()">app登录</div>
      <div class="button" @click="userStore.miniLogin()">mini登录</div>
      <div class="button" @click="userStore.oAuthLogin()">oAuth登录</div>
    </div>
  </base-page-load>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBaseStore } from '@/store'
import { useUserStore } from '@/store/user'
import { useRoute } from 'vue-router/composables'
import ActivityCenter from '@/core/activity-center/index.vue'
import BasePageLoad from '@/components/common/base-page-load/index.vue'
import { channelTypes } from '@/config'

const baseStore = useBaseStore()

const userStore = useUserStore()

const route = useRoute()

const list = ref([])

const loading = ref(false)

/**
 * 获取活动信息
 */
async function getActivityData () {
  await initLoginData()
  list.value = tempInfo.list
  baseStore.channelInfo = channelTypes.find(e => e.name === tempInfo.info.channelType) || {}
}

/**
 * 初始化登录信息
 */
async function initLoginData () {
  console.log(route.query)
  const { token, login_source } = route.query
  if (token) {
    // OAuth登录
    if (['vivo', 'weibo', 'huawei', 'honor'].includes(login_source)) {
      userStore.setUserInfo({ token })
    }
  }
}

const tempInfo = {
  info: {
    channelType: 'vivo'
  },
  list: [
    // {
    //   type: 'SECKILL_COUPON',
    //   image: 'https://s1.huishoubao.com/static/activities/honor202307/top-coupon-get.png',
    //   loginType: '1'
    // },
    {
      type: 'RECEIVE_COUPON',
      loginType: '1',
      compAttrs: {
        couponId: '123',
        couponType: '1',
        unreceive: 'https://s1.huishoubao.com/static/activities/hw202307/center-coupon-get.png',
        received: 'https://s1.huishoubao.com/static/activities/hw202307/center-coupon-hs.png',
        jump: {
          hsbWeb: 'https://ka.huishoubao.com/hsbh5',
          hsbApp: 'goto://model.hsb2c.com',
          wechatMini: '/page/pages/products/index',
          alipayMini: '/pages/brand/brand'
        }
      },
      compEvents: {}
    }
    // {
    //   type: 'SECKILL_COUPON',
    //   loginType: '1',
    //   compAttrs: {
    //     couponId: '123',
    //     couponType: '1',
    //     couponImage: 'https://s1.huishoubao.com/static/activities/honor202307/center-coupon-get.png',
    //     couponOutImage: 'https://s1.huishoubao.com/static/activities/honor202307/center-coupon-hs.png',
    //     couponLink: 'https://ka.huishoubao.com/cpsh5'
    //   }
    // }
    // {
    //   type: 'TEST_COUPON',
    //   image: 'https://s1.huishoubao.com/static/activities/honor202307/center-coupon-out.png',
    //   loginType: '1'
    // }
  ]
}

// function toLogin () {
//   userStore.login()
// }

onMounted(() => {
  getActivityData()
})

</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

