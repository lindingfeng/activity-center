import { isIOS, isAndroid } from '@/utils/ua'

function hsb (interfaceName, e) {
  if (isIOS) {
    return window.webkit.messageHandlers[interfaceName].postMessage(JSON.stringify(e))
  }
  if (isAndroid) {
    return window.hsbApp[interfaceName](JSON.stringify(e))
  }
}

export default {
  hsbAppLogin: function (e) {
    return hsb('hsbAppLogin', e)
  },
  hsbAppShare: function (e) {
    return hsb('hsbAppShare', e)
  },
  hsbAppShareAction: function (e) {
    return hsb('hsbAppShareAction', e)
  },
  hideTitle: function (e) {
    return hsb('hideTitle', e)
  },
  needIntercept: function (e) {
    return hsb('needIntercept', e)
  },
}
