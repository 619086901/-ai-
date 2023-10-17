import request from '../tool/request.js'

/**
 * 推荐位列表
 * @param params
 * @returns
 */
export function getRecommendsList(params) {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/client/promotions`,
    method: 'GET',
    params
  })
}

/**
 * 推荐位详情
 * @param id 推荐位id
 * @returns
 */
export function getPromotionsInfo(id) {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/client/promotions/${id}`,
    method: 'GET'
  })
}
