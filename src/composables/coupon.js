import { reactive } from 'vue'
import apis from '@/apis'

/**
 * 优惠券组合api
 */
export default function couponComposables () {
  const couponInfo = reactive({
    status: '0'
  })

  /**
   * 查询优惠券状态
   * @param {Object} body 优惠券信息
   * @param {String} body.id 优惠券ID
   * @param {String} body.isCouponParcel 优惠券类型 0 券 | 1 券包
   */
  async function getCouponStatus ({ id = '', isCouponParcel = '0' }) {
    const [res] = await apis.queryCouponStatus({ id, isCouponParcel })
    if (res._errCode === '0') {
      // status: 0 未领取 | 1 已领取 | 2 已抢光 | 3 未通过活动规则（未到领取时间、今日已抢光...）
      couponInfo.status = res._data?.status || '0'
    }
  }

  /**
   * 领取优惠券
   * @param {Object} body 优惠券信息
   * @param {String} body.id 优惠券ID
   * @param {String} body.isCouponParcel 优惠券类型 0 券 | 1 券包
   */
  async function addCoupon ({ id = '', isCouponParcel = '0' }) {
    const [res] = await apis.receiveCoupon({ id, isCouponParcel })
    if (res._errCode === '0') {
      couponInfo.status = '0'
    }
    return [res]
  }

  return {
    couponInfo,
    getCouponStatus,
    addCoupon
  }
}
