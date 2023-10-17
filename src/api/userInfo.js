import request from '../tool/request.js'

/**
 * 获取用户信息
 * @param {*} params
 * @returns
 */
export function getUserClientInfo(params) {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/client/userInfo/me`,
    method: 'GET',
    params
  })
}

/**
 * 回答正确 增加豆子
 * @param {*} params {question_id : 1, answer_id : 1}
 * @returns
 */
export function addBeans(data) {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/client/userInfo/questions`,
    method: 'POST',
    data
  })
}
