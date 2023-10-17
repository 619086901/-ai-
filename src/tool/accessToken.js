import { storage, tokenTableName } from '../config/index.js'
import cookie from 'js-cookie'

/**
 * @author
 * @description 获取accessToken
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getAccessToken() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(tokenTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(tokenTableName)
    } else if ('cookie' === storage) {
      return cookie.get(tokenTableName)
    }
    return localStorage.getItem(tokenTableName)
  }
  return localStorage.getItem(tokenTableName)
}

/**
 * @author
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(tokenTableName, accessToken)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem(tokenTableName, accessToken)
    } else if ('cookie' === storage) {
      return cookie.set(tokenTableName, accessToken)
    }
    return localStorage.setItem(tokenTableName, accessToken)
  }
  return localStorage.setItem(tokenTableName, accessToken)
}

/**
 * @author
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem(tokenTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove(tokenTableName)
    }
    return localStorage.removeItem(tokenTableName)
  }
  return localStorage.removeItem(tokenTableName)
}
