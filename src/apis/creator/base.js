import axios from 'axios'
// import { Toast } from 'vant'
import { useBaseStore } from '@/store'
import { useUserStore } from '@/store/user'
import { getUserInfo } from '@/helper/loginManage'
import { createApiSign, randomWord } from '@/utils'

/**
 * @function http基类
 * @param {Object} config Axios配置项
 * @param {Object} hooks 各节点hooks
 * @param {String} appSecret 接口验签key
 * @param {Function} userRequeset 自定义请求
 * @param {Function} userResponse 自定义响应
 */
export default class BaseService {
  constructor ({
    config = {},
    hooks = {},
    appSecret = '',
    userRequeset,
    userResponse
  }) {
    this.userRequeset = userRequeset
    this.userResponse = userResponse
    this.config = config
    this.hooks = hooks
    this.appSecret = appSecret
    this.service = null
    this.initBase()
  }
  /**
   * 创建http实例
   */
  initBase () {
    this.service = axios.create({
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      timeout: 60000,
      ...this.config
    })
    // Request拦截器
    this.service.interceptors.request.use(
      this.userRequeset || this.defaultRequest.bind(this),
      this.defaultRequestError.bind(this)
    )
    // Response拦截器
    this.service.interceptors.response.use(
      this.userResponse || this.defaultResponse.bind(this),
      this.defaultResponseError.bind(this)
    )
  }
  /**
   * 配置hooks
   */
  setHooks (hooks = {}) {
    Object.assign(this.hooks, hooks)
  }
  /**
   * 签名数据
   */
  _getSignData () {
    return {
      timestamp: parseInt(new Date() / 1000, 10),
      nonce_str: randomWord(false, 6)
    }
  }
  /**
   * 默认Request处理
   */
  defaultRequest (config) {
    const baseStore = useBaseStore()
    const userStore = useUserStore()

    // const signData = this._getSignData()

    config.params = {
      pid: baseStore.pid,
      platform: baseStore.platform,
      timestamp: +new Date(),
      ...config.params
    };

    config.data = config.data || {}

    if (!config.data.token) {
      config.data.token = userStore.userInfo?.token || getUserInfo('token');
    }

    config.data.sign = createApiSign(this.appSecret, Object.assign({}, config.params, config.data))

    this.hooks.onBeforeRequest && this.hooks.onBeforeRequest(config)
    
    return config
  }
  /**
   * 默认Request Error处理
   */
  defaultRequestError (error) {
    this.hooks.onRequestError && this.hooks.onRequestError(error)
  }
  /**
   * 默认Response处理
   */
  defaultResponse (response) {
    return [response.data, null]
  }
  /**
   * 默认Response Error处理
   */
  defaultResponseError (error) {
    this.hooks.onResponseError && this.hooks.onResponseError(error)
    // switch (error.response.status) {
    //   case 400:
    //     Toast('缺失参数')
    //     break;
    //   case 401: {
    //     const userStore = useUserStore()
    //     userStore.logout()
    //     window.location.href = `${this.config.baseURL}/user/oauth?access_client=${getClient()}&source_url=${window.location.origin || this.config.baseURL}/view/index`
    //     break;
    //   }
    //   case 403:
    //     Toast('签名认证失败')
    //     break;
    //   case 500:
    //     Toast('服务端错误')
    //     break;
    // }
    return Promise.resolve([{}, error])
  }
}