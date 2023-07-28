const ua = window.navigator.userAgent

export const isIOS = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua)

export const isAndroid = /(android)|(Android)|(Adr)/i.test(ua)

export const isWechat = /MicroMessenger/i.test(ua)

export const isAlipay = /AlipayClient/i.test(ua)

export const isWechatMini = /(?=[\W\w]*MicroMessenger)(?=[\W\w]*MiniProgram)/i.test(ua)

export const isAlipayMini = /(?=[\W\w]*AlipayClient)(?=[\W\w]*MiniProgram)/i.test(ua)

export const isHsbApp = /defineInhsbApp/i.test(ua)

export function getClient () {
  if (isHsbApp) {
    return 'hsbApp'
  }
  if (isWechat) {
    if (isWechatMini) {
      return 'wechatMini'
    }
    return 'wechatH5'
  }
  if (isAlipay) {
    if (isAlipayMini) {
      return 'alipayMini'
    }
    return 'alipayH5'
  }
  return 'browserH5'
}