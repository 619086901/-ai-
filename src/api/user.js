import axios from 'axios'
import request from '../tool/request.js'
import { contentType, Authorization } from '../config/index.js'
import { getToken } from '../tool/android.js'

export function login(params) {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/auth/login`,
    method: 'POST',
    params
  })
}

export function getUserInfo() {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/auth/me`,
    method: 'GET'
  })
}

export function logout() {
  return request({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/auth/logout`,
    method: 'POST'
  })
}

export function refresh() {
  return axios({
    url: `${process.env.VUE_APP_DATA_URL_PXWH}/api/auth/refresh`,
    method: 'POST',
    headers: {
      [Authorization]: getToken(),
      'Content-Type': contentType
    }
  })
}
