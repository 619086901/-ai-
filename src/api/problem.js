import axios from 'axios'
import request from '../tool/request.js'
/**
 * 资产下的题目
 * @param {*} id
 * @param {*} params
 * @returns
 */
export function getProgramsIdQuestions(id, params) {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/client/programs/${id}/questions`,
    method: 'GET',
    params: {
      ...params
    }
  })
}
/**
 * 栏目下的问题
 * @param {*} id
 * @returns
 */
export function getCategoriesIdQuestions(id, params) {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/client/categories/${id}/questions`,
    method: 'GET',
    params: {
      ...params
    }
  })
}

/**
 * 所有题库下的问题
 * @param {*} params
 * @returns
 */
export function getQuestions(params) {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/client/questions`,
    method: 'GET',
    params: {
      ...params
    }
  })
}
