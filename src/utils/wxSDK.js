import { isWechat } from '@/utils/ua'

function wx (interfaceName, args = {}) {
  if (!isWechat) return

  function ready () {
    if (window.__wxjs_environment === 'miniprogram') {
      window.WeixinJSBridge.invoke(interfaceName, args, function (result) {
        console.log('invoke result', result)
      })
    }
  }

  if (!window.WeixinJSBridge || !window.WeixinJSBridge.invoke) {
    document.addEventListener('WeixinJSBridgeReady', ready, false)
  } else {
    ready()
  }
}

export default {
  navigateTo: function (e) {
    wx('invokeMiniProgramAPI', {
      name: 'navigateTo',
      arg: {
        url: e.url
      }
    })
  },
  navigateBack: function (e = {}) {
    wx('invokeMiniProgramAPI', {
      name: 'navigateBack',
      arg: {
        delta: e.delta || 1
      }
    })
  },
  switchTab: function (e) {
    wx('invokeMiniProgramAPI', {
      name: 'switchTab',
      arg: {
        url: e.url
      }
    })
  },
  reLaunch: function (e) {
    wx('invokeMiniProgramAPI', {
      name: 'reLaunch',
      arg: {
        url: e.url
      }
    })
  },
  redirectTo: function (e) {
    wx('invokeMiniProgramAPI', {
      name: 'redirectTo',
      arg: {
        url: e.url
      }
    })
  },
  postMessage: function (e) {
    wx('invokeMiniProgramAPI', {
      name: 'postMessage',
      arg: {
        name: 'postMessage',
        arg: e.data || {}
      }
    })
  }
}