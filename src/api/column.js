import request from '../tool/request.js'

/**
 * 栏目列表
 * @param {*} params
 * @returns
 */
export function getCategories(params) {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/client/categories`,
    method: 'GET',
    params: {
      ...params
    }
  })
}

/**
 * 单个栏目信息
 * @param {*} id
 * @param {*} params
 * @returns
 */
export function getCategoriesId(id, params) {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/client/categories/${id}`,
    method: 'GET',
    params: {
      ...params
    }
  })
}

/**
 * 栏目下的节目
 * @param {*} id
 * @param {*} params
 * @returns
 */
export function getCategoriesIdPrograms(id, params) {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/client/categories/${id}/programs`,
    method: 'GET',
    params: {
      ...params
    }
  })
}

/**
 * 获取短链
 * @param {*} data
 * @returns 短链
 */
export function getShortChain(data) {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/client/tinyUrls`,
    method: 'POST',
    data
  })
}
