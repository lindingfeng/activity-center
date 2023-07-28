import Vue from 'vue'
import queryString from 'query-string'
import { defaultPid } from '@/config'

const { pid = defaultPid } = queryString.parse(location.search);

const setReporter = (reporter) => {
  Vue.$reporter = Vue.prototype.$reporter = reporter;
}

// 上报事件映射
const eventMap = {
  'click': 'point_click',
  'enter': 'point_pe',
  'immediately': 'report'
}

// 所有事件通用属性
const commonParams = {
  pagegroup: '',
  pageId: '',
  pageTitle: ''
}

// 对应事件默认参数
const defaultParams = {
  'click': {
    eventClickmark: '',
    ...commonParams
  },
  'enter': {
    eventId: 'page_entrance',
    eventPagemark: '',
    ...commonParams
  },
  'immediately': {}
}

// 避免sdk加载失败，应用调用异常报错
const reporter = Object.keys(eventMap).reduce((pre, eventName) => {
  pre[eventName] = () => {}
  return pre
}, {})

setReporter(reporter)

// 资源加载成功，覆盖reporter
const initReporter = (getter) => {

  let instance = null
  return Object.entries(eventMap).reduce((pre, [eventName, sdkName]) => {
    pre[eventName] = (...args) => {

      if (instance == null) { // 兼容sdk异步初始化
        instance = getter()
      }

      if (typeof args[0] === 'string') { // 第一个参数使用默认值
        const eventId = args.shift()
        args[0].eventId = eventId
      }

      const {
        [eventName]: params = {}
      } = defaultParams
      const res = Object.assign({}, params, args[0])
      const { eventId, ...other } = res
      instance[sdkName](eventId, other)
    };
    return pre
  }, {})
}

if (window._probing && process.env.NODE_ENV !== 'development') {
  _probing({
    appid: 'huaweivmallmobile8cdbHbB7',
    // v2
    api: 'https://bi-sdk.huishoubao.com/report_api/v2/report_list',
    // v1
    // api: 'https://bi-sdk.huishoubao.com/zheying/v1/report_list',
    accessEnv: 'h5',
    user_id: '',
    openid: '',
    appkey: 'hw_h5_jWRMFfrjVO86k7iu7tdK',
    user_version: '',
    sdk_version: 'v3.1.4',
    spa: true,
    plugins: [
      [probingTrackingPlugin, {
        pid,                 // pid
        adid: '',               // 广告id
        channel_id: '',      // app下载来源
        campaign_id: '',    // 推广活动ID
        campaign_name: '', // 活动名称
      }]
    ]
  }).install()
  setReporter(initReporter(_probing))
}
