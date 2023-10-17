import axios from 'axios'

/**
 * 资产播放地址
 * @param {*} id
 * @param {*} params
 * @returns
 */
export function getCategories(id, params) {
  return axios({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/client/programs/${id}/play`,
    method: 'GET',
    params: {
      ...params
    }
  })
}
