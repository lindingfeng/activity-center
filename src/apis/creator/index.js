import axios from 'axios'
import BaseService from '@/apis/creator/base'
import { useUserStore } from '@/store/user'
import { getUserInfo } from '@/helper/loginManage'
import { createApiSign } from '@/utils'

/**
 * @function http子类
 * @param {Object} config Axios配置项
 * @param {Object} hooks 各节点hooks
 * @param {String} appSecret 接口验签key
 * @param {Function} userRequeset 自定义请求
 * @param {Function} userResponse 自定义响应
 * @param {Function} userUploadRequest 文件上传自定义响应
 * @param {Function} userUploadResponse 文件上传自定义响应
 */
export default class HttpService extends BaseService {
  constructor (params) {
    super(params)
    this.userUploadRequest = params.userUploadRequest
    this.userUploadResponse = params.userUploadResponse
    this.uploader = null
    this.init()
  }
  /**
   * 创建文件上传实例
   */
  init () {
    this.uploader = axios.create({
      timeout: 60000,
      ...this.config,
      // 防止content-type被配置覆盖
      headers: {
        'content-type': 'multipart/form-data',
      }
    })
    // Request拦截器
    this.uploader.interceptors.request.use(
      this.userUploadRequest || this.defaultUploadRequest.bind(this),
      this.defaultRequestError.bind(this)
    )
    // Response拦截器
    this.uploader.interceptors.response.use(
      this.userUploadResponse || this.defaultResponse.bind(this),
      this.defaultResponseError.bind(this)
    )
  }
  /**
   * 默认UploadRequest处理
   */
  defaultUploadRequest (config) {
    const userStore = useUserStore()

    const formData = new FormData()
    
    config.data = config.data || {}
    
    config.headers['Access-Token'] = userStore.userInfo?.token || getUserInfo('token')

    const signData = this._getSignData()

    signData.sign = createApiSign(this.appSecret, Object.assign({}, signData))

    formData.append('filename', config.data.filename)
    formData.append('token', config.data.token)
    formData.append('app_id', signData.app_id)
    formData.append('timestamp', signData.timestamp)
    formData.append('nonce_str', signData.nonce_str)
    formData.append('sign', signData.sign)
    
    config.data = formData

    this.hooks.onBeforeRequest && this.hooks.onBeforeRequest(config)

    return config
  }
}