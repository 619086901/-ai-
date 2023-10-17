import { login } from '../api/user.js'
import store from '../store'
import { setAccessToken } from './accessToken.js'
import { log } from './index.js'
import { token } from '../config'

/**
 *
 * @param {Object} json
 * @returns
 */
export function openPlugPlayerActivity(json) {
  try {
    window.android.openPlugPlayerActivity(JSON.stringify(json))
  } catch (error) {
    return false
  }
}

/**
 * @模拟单击
 * @returns
 */
export function handleAndroidvClick() {
  try {
    return window.android.vClick()
  } catch (error) {
    return false
  }
}

/**
 * @模拟返回
 * @returns
 */
export function handleAndroidvBack() {
  try {
    return window.android.vBack()
  } catch (error) {
    return false
  }
}

/**
 * @获取接口鉴权token
 * @returns
 */
export async function getToken() {
  // if (process.env.VUE_APP_VERSION == 'PC') {
  //   return new Promise(async (resolve, reject) => {
  //     const {
  //       data: { access_token }
  //     } = await login({
  //       username: 'admin',
  //       password: 'admin'
  //     })
  //     const accessToken = `bearer ${access_token}`
  //     setAccessToken(accessToken)
  //     store.user.dispatch('setAccessToken', accessToken)
  //     resolve(accessToken)
  //   })
  // } else {
  //   try {
  //     return new Promise((resolve, reject) => {
  //       setInterval(() => {
  //         if (window.android.getToken() && window.android.getToken() != '-1') {
  //           const accessToken = `bearer ${window.android.getToken()}`
  //           setAccessToken(accessToken)
  //           store.user.dispatch('setAccessToken', accessToken)
  //           resolve(accessToken)
  //         }
  //       }, 100)
  //     })
  //   } catch (error) {
  //     return token
  //   }
  // }
}

/**
 * @主动请求token
 */
export function AndroidRequestToken() {
  try {
    window.android.requestToken()
  } catch (error) {}
}

/**
 * @存储参数
 * @param {*} key 键
 * @param {*} value 值
 * @returns
 */
export function AndroidLocal(key, value) {
  try {
    if (value) {
      return window.android.setLocalCache(String(key), String(value))
    }
    return window.android.getLocalCache(String(key))
  } catch (error) {
    return false
  }
}

/**
 *
 * @param {*} key
 */
export function AndroidClearLocal(key) {
  try {
    window.android.clearLocalCache(String(key))
  } catch (error) {}
}

/**
 * @登录
 */
export function AndroidLogin() {
  try {
    window.android.login()
  } catch (error) {}
}

/**
 * @退出登录
 */
export function AndroidLogout() {
  try {
    window.android.logout()
  } catch (error) {}
}

/**
 * @用户是否登录
 */
export function AndroidIsUserLogin() {
  try {
    return window.android.isUserLogin()
  } catch (error) {
    return false
  }
}

/**
 * @获取用户信息
 */
export function AndroidGetUserInfo() {
  try {
    window.android.getUserInfo()
  } catch (error) {}
}

export function AndroidGetUserAvatar() {
  try {
    return window.android.getUserAvatar()
  } catch (error) {
    return ''
  }
}
export function AndroidGetUserNickname() {
  try {
    return window.android.getUserNickname()
  } catch (error) {
    return ''
  }
}
export function AndroidGetUserOpenId() {
  try {
    return window.android.getUserOpenId()
  } catch (error) {
    return ''
  }
}
export function AndroidGetUserUserName() {
  try {
    return window.android.getUserUserName()
  } catch (error) {
    return ''
  }
}
export function AndroidGetUserEmail() {
  try {
    return window.android.getUserEmail()
  } catch (error) {
    return ''
  }
}

/**
 * @设备序列号
 * @returns
 */
export function AndroidGetSn() {
  try {
    return window.android.getSn()
  } catch (error) {
    return 'NRT2246W30255495YXX8'
  }
}

/**
 * @会话加密串
 * @returns
 */
export function AndroidGetmToken() {
  try {
    return window.android.getmToken()
  } catch (error) {
    return ''
  }
}

/**
 * @应用账号
 * @returns
 */
export function AndroidGetmUid() {
  try {
    return window.android.getmUid()
  } catch (error) {
    return '11101346'
  }
}

/**
 * @用户id的MD5加密,大写
 * @returns
 */
export function AndroidGetAccessToken() {
  try {
    return window.android.getAccessToken()
  } catch (error) {
    return ''
  }
}

/**
 * @APP_KEY
 * @returns
 */
export function AndroidGetAppKey() {
  try {
    return window.android.getAppKey()
  } catch (error) {
    return ''
  }
}
/**
 * @时间戳
 * @returns
 */
export function AndroidGetTimestamp() {
  try {
    return window.android.getTimestamp()
  } catch (error) {
    return ''
  }
}

/**
 * @签名
 * @returns
 */
export function AndroidGetSign() {
  try {
    return window.android.getSign()
  } catch (error) {
    return ''
  }
}

/**
 * @数据采集dataSent
 * @param {String} logName
 * @param {Object} json
 * @returns
 */
export function AndroidDataSent(logName, json) {
  try {
    return window.android.sent(logName, JSON.stringify(json))
  } catch (error) {
    return ''
  }
}
