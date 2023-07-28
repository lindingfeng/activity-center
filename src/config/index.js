const isDev =  ['localhost'].includes(window.location.hostname);

export const defaultPid = '1004'
export const defaultPlatform = '5'
export const apiHost = isDev ? 'https://api.huishoubao.com' : 'https://api.huishoubao.com'
export const appSecret = 'b7cab12b2b81385dd2cccb8ce67e4998'

export const channelTypes = [
  { name: 'ziyou', title: '自有', auth: '' },
  { name: 'cps', title: 'CPS', auth: '' },
  { name: 'vivo', title: 'VIVO', auth: 'vivo' },
  { name: 'weibo', title: '微博', auth: 'weibo' },
  { name: 'huawei', title: '华为', auth: 'hw' },
  { name: 'honor', title: '荣耀', auth: 'honor' },
  { name: 'lenovo', title: '联想', auth: '' }
]