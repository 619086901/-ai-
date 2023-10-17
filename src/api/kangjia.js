import axios from 'axios'
import request from '../tool/request.js'
import { contentType } from '../config/index.js'

/**
 * 康佳
 * 用户会员状态查询
 * @param {*} params
 * @returns
 */
export function getVipStatus(params) {
  return request({
    url: `${process.env.VUE_APP_KANGJIA_TEST}/biz/1.0/vipstatus`,
    method: 'GET',
    params
  })
}

/**
 * 易学
 * 获取商品id
 * @param {*} data
 * @param {*} headers
 * @returns
 */
export function updateGetGoodsId(data, headers) {
  return axios({
    url: `${process.env.VUE_APP_YIXUE_TEST}/kknewyixueserver/v1/vipBigBag/getGoodsId/third`,
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      ...headers
    },
    data
  })
}

/**
 * 康佳
 * 用户支付成功状态轮询查询
 * @param {*} params
 * @returns
 */
export function getRollingPayStatus(params) {
  return axios({
    url: `${process.env.VUE_APP_KANGJIA_TEST}/biz/1.0/rollingpaystatus`,
    method: 'GET',
    params
  })
}
