import { defineStore } from 'pinia'
import { webLogin, appLogin, miniLogin, oAuthLogin } from '@/common/login'
import { setUserInfo, clearUserInfo } from '@/helper/loginManage'
import apis from '@/apis'

export const useUserStore = defineStore('user', {
  state: () => ({
    loginPopup: false,
    isValidloginState: false,
    userInfo: {}
  }),
  actions: {
    /**
     * 用户登录
     */
    async login () {},
    async webLogin () {
      webLogin()
    },
    async appLogin () {
      appLogin()
    },
    async miniLogin () {
      miniLogin()
    },
    async oAuthLogin () {
      oAuthLogin()
    },
    /**
     * 校验登录态
     * 一般用户检验外部带过来的token是否有效
     */
    async checkLoginToken (token) {
      const [res] = await apis.checkLoginStatus({ token })
      console.log(res)
      if (res._data?.status !== 1) {
        return this.logout()
      }
      this.setLoginState(true)
      this.setUserInfo({ token })
    },
    /**
     * 获取用户信息
     */
    async getUserInfo () {
      const [res] = await apis.getUserInfo()
      if (res._errCode === '0') {
        this.setLoginState(true)
        this.setUserInfo({
          ...this.userInfo,
          ...res.data
        })
      }
    },
    /**
     * 更新用户信息
     */
    setUserInfo (userInfo) {
      this.userInfo = userInfo
      setUserInfo(userInfo)
    },
    /**
     * 更新登录状态
     */
    setLoginState (status) {
      this.isValidloginState = status
    },
    /**
     * 退出登录
     */
    logout () {
      this.setLoginState(false)
      this.setUserInfo({})
      clearUserInfo()
    }
  }
})
