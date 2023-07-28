import { Toast } from 'vant'
import wx from '@/utils/wxSDK'
import hsb from '@/utils/hsbSDK'
import { apiHost } from '@/config'
import { useBaseStore } from '@/store'
import { useUserStore } from '@/store/user'

/**
 * 聚合登录
 */
export async function dispatchLogin () {}

/**
 * web登录
 */
export async function webLogin () {
  const userStore = useUserStore()
  userStore.loginPopup = true
}

/**
 * APP登录（回收宝APP）
 */
export async function appLogin () {
  window.hsbAppLoginCallback = function (result) {
    const baseStore =  useBaseStore()
    const res = typeof result === 'object' ? result : JSON.parse(result || '{}')
    if (res._data?.token) {
      baseStore.setLoginState(true)
      baseStore.setUserInfo()
    } else {
      if (!['登录取消', '用户取消登录'].includes(res._errStr)) {
        Toast(res._errStr || '登录失败')
      }
    }
    delete window.hsbAppLoginCallback
  }
  try {
    hsb.hsbAppLogin({ callback: 'hsbAppLoginCallback' })
  } catch (error) {
    Toast(error.message || '登录失败')
  }
}

/**
 * 小程序登录（回收宝手机回收小程序）
 */
export async function miniLogin () {
  wx.navigateTo({
    url: '/page/pages/login/index'
  })
}

/**
 * 外部OAuth登录（华为/荣耀/联想/微博/viov）
 */
export async function oAuthLogin () {
  const baseStore =  useBaseStore()
  const redirectUri = `${window.location.href}${location.search ? '&' : '?'}login_source=${baseStore.channelInfo.name}`
  const querys = [
    `${apiHost}/api/user/oauthLogin?`,
    `redirectUri=${encodeURIComponent(redirectUri)}`,
    `pid=${baseStore.pid}`,
    `oauthSite=${baseStore.channelInfo.auth}`
  ]
  window.location.href = querys.join('&')
}
