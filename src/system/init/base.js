import Vue from 'vue'

export default class Base {
  constructor (params) {
    this.init(params)
  }

  init (params) {
    const { App, router, store } = params
    this.app = App
    this.router = router
    this.store = store
    this.initBaseStore()
    this.initBaseRouter()
  }

  /**
   * @function 初始化store
   */
  initBaseStore () {}

  /**
   * @function 初始化router
   */
  initBaseRouter () {
    /*
    * 拼接下个页面公共参数
    */
    // const keepQuerys = this.router.options.keepQuerys || []
    // this.router.beforeEach((to, from, next) => {
    //   const fQuery = from.query
    //   let { query, params, path } = to
    //   const isReplace = query.replace === '1'
    //   let needPaddingFlag = isReplace
    //   if (query.replace) {
    //     delete query.replace
    //   }
    //   keepQuerys.forEach(key => {
    //     // to页面没有该参数 && from页面有该参数
    //     if (!query[key] && fQuery[key] && from.name !== 'Login') {
    //       query[key] = fQuery[key]
    //       needPaddingFlag = true
    //     }
    //   })
    //   if (needPaddingFlag) {
    //     return next({ query, params, path, replace: isReplace })
    //   }
    //   next()
    // })
  }

  /**
   * @function 挂载Vue应用
   */
  mountApp () {
    new Vue({
      router: this.router,
      pinia: this.store,
      render: (h) => h(this.app),
    }).$mount('#app')
  }
}