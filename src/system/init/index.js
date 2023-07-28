import Base from '@/system/init/base'
// import queryString from 'query-string'
// import { useBaseStore } from '@/store'
// import { useUserStore } from '@/store/user'

export default class App extends Base {
  init (params) {
    super.init(params)
    this.initStore()
    this.initRouter()
    this.initLocale()
    this.mountApp()
  }

  /**
   * @function 解析url参数
   */
  // _parseQueryString (data) {
  //   const params = {}
  //   for (const key in data) {
  //     if (Object.hasOwnProperty.call(data, key)) {
  //       if (typeof data[key] === 'object') {
  //         params[key] = data[key][0] || ''
  //       } else {
  //         params[key] = data[key] || ''
  //       }
  //     }
  //   }
  //   return params
  // }

  /**
   * @function 子应用初始化store
   */
  initStore () {}

  /**
   * @function 子应用初始化router
   */
  initRouter () {
    // this.router.beforeResolve(async (to, from, next) => {
    //   if (!from.name && from.matched.length === 0) {
    //     const baseStore = useBaseStore()
    //     const userStore = useUserStore()
    //     const userToken = to.query.token || userStore.userInfo?.token || ''

    //     if (to.query.pid || to.query.platform) {
    //       const data = this._parseQueryString({
    //         pid: to.query.pid,
    //         platform: to.query.platform
    //       })
    //       data.pid && (baseStore.pid = data.pid)
    //       data.platform && (baseStore.platform = data.platform)
    //     }
        
    //     if (userToken) {
    //       await userStore.checkLoginToken(userToken)
    //     }
    //   }
    //   next()
    // })
  }

  /**
   * @function 子应用初始化locale
   */
  initLocale () {}
}