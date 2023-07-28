import { apiHost as baseURL, appSecret } from '@/config'
import HttpService from '@/apis/creator'

const http = new HttpService({
  appSecret,
  config: {
    baseURL
  }
})

export { http }

export default {
  // 登录
  login (body) {
    return http.service.post(`/api/user/login`, body);
  },
  // cps登录
  cpsLogin (body) {
    return http.service.post(`/v1/user/cpsLogin`, body);
  },
  // 获取短信验证码
  getVerifyCode (body) {
    return http.service.post(`/api/user/getCode`, body);
  },
  // 检查登录态
  checkLoginStatus (body) {
    return http.service.post(`/api/user/checkLoginStatus`, body);
  },
  // 查询优惠券状态
  queryCouponStatus (body) {
    return http.service.post(`/v5/coupon/checkStatus`, body);
  },
  // 领取优惠券
  receiveCoupon (body) {
    return http.service.post(`/v5/coupon/addByUser`, body);
  }
}