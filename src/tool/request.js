import axios from 'axios'
import {
  baseURL,
  contentType,
  requestTimeout,
  successCode,
  Authorization
} from '../config/index.js'
import store from '../store'
import router from '../router'
import qs from 'qs'
// 消息提示
import Message from '../components/Message/message'
import { isArray } from '../tool/validate.js'

import { getAccessToken } from './accessToken.js'
import { log } from './index.js'
import { getToken, AndroidRequestToken } from './android.js'

function handleLogin() {
  store.user
    .dispatch('login')
    .then(() => {
      console.log(router)
      setTimeout(() => {
        router.go(0)
      })
    })
    .catch(() => {
      handleLogin()
    })
}
/**
 * @author
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case 401:
      // AndroidRequestToken()
      handleLogin()

      break
    default:
      Message({
        type: 'error',
        message: msg
      })
      break
  }
}

/**
 * @author
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType
  }
})

/**
 * @author
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    console.log(store)
    config.headers[Authorization] = store['user'].getters['accessToken']
    if (
      config.data &&
      config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @author
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    const { data, config } = response
    const { code, message = '异常', status } = data
    // 操作正常Code数组
    const codeVerificationArray = isArray(successCode)
      ? [...successCode]
      : [...[successCode]]
    // 是否操作正常
    if (
      codeVerificationArray.includes(code) ||
      codeVerificationArray.includes(status)
    ) {
      return data
    }
    handleCode(code, message)
    return Promise.reject(
      'vue-admin-beautiful请求异常拦截:' +
        JSON.stringify({ url: config.url, code, message }) || 'Error'
    )
  },
  (error) => {
    const { response } = error
    if (error?.response?.data) {
      const { status, data } = response
      handleCode(status, data.message)
      return Promise.reject(error)
    }
    let { message } = error
    Message({
      type: 'error',
      message
    })
    return Promise.reject(error)
  }
)

export default instance
