// import axios from 'axios'
// import $ from 'jquery'
import { log } from './index'

/**
 *
 * @param {*} str url地址 text.html?a=cc&b=kk
 * @param {*} sep '&'
 * @param {*} eq '='
 * @returns {a:"cc",b:"kk"}
 */
export function queryToJson(str, sep, eq) {
  var obj = {}
  str = str.replace(/^[^\?]*\?/, '')
  sep = sep || '&'
  eq = eq || '='
  var arr,
    reg = new RegExp(
      //(?:^|\&)([^\=\&]+)(?:\=([^\&]*))?
      '(?:^|\\' +
        sep +
        ')([^\\' +
        eq +
        '\\' +
        sep +
        ']+)(?:\\' +
        eq +
        '([^\\' +
        sep +
        ']*))?',
      'g'
    )
  while ((arr = reg.exec(str)) !== null) {
    if (arr[1] !== str) {
      obj[decodeURIComponent(arr[1])] = decodeURIComponent(arr[2] || '')
    }
  }

  return obj
}

export function getURLParameter(param, url) {
  /*获取URL里面的参数*/
  var params = url.substr(url.indexOf('?') + 1).split('&')
  if (params != null) {
    for (var i = 0; i < params.length; i++) {
      var strs = params[i].split('=')
      if (strs[0] == param) {
        return strs[1]
      }
    }
  }
  return null
}
0
export function formatTime(timestamp) {
  var date = new Date(timestamp)
  var YY = date.getFullYear() + '-'
  var MM =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hh =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var mm =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return YY + MM + DD + ' ' + hh + mm + ss
}

/**
 * @getNowPageInfo 获取当前页面的名称
 */
export function getNowPageInfo(url) {
  var str = url.split('?')[0].split('/').pop()
  return PAGE_NAME[str]
}

/**
 * @getReturnPageInfo 获取来源页面信息
 */
export function getReturnPageInfo(URL) {
  let returnPageInfo = {
    page: '',
    position: '无',
    url: ''
  }
  let str = URL.split('?')[0]
  returnPageInfo.url = str
  returnPageInfo.page = PAGE_NAME[str.split('/').pop()]
  let wk = queryToJson(URL) || {}
  let areaid = !wk.areaid ? '无' : wk.areaid
  let indexid = !wk.indexid ? '0' : wk.indexid
  returnPageInfo.position = 'area' + areaid + '_' + indexid
  return returnPageInfo
}

/**
 * @addUserBrowseInfo 浏览行为
 */
export function addUserBrowseInfo(URL) {
  var time = formatTime(new Date().getTime())
  let wk = queryToJson(URL) || {}
  let returnurl = !wk.returnurl ? '' : wk.returnurl

  var returnPageInfo = getReturnPageInfo(returnurl)
  var nowPageName = getNowPageInfo(URL)

  // 各页面详细信息不同处理不同
  var pageDescribe = '无'
  switch (nowPageName) {
    case '详情页':
      let mediaId = !wk.assetId ? '' : wk.assetId
      return getProgram(mediaId).then(function (resp) {
        addWebLogs(
          `${demoName}|${getUserName()}|${nowPageName}|${
            resp.data.data['name']
          }|${returnPageInfo.page}|${returnPageInfo.position}|${
            returnPageInfo.url
          }|${time}`
        )
      })
      break
    case '列表页':
      let darkId = !wk.darkId ? 0 : parseInt(wk.darkId)
      pageDescribe = CATEGORYS_ID.find((item) => darkId == item.darkId).name
      break
    case '历史收藏页':
      let area2DrakIndex = !wk.area2DrakIndex ? 0 : parseInt(wk.area2DrakIndex)
      switch (area2DrakIndex) {
        case 0:
          pageDescribe = '历史'
          break
        case 1:
          pageDescribe = '收藏'
          break
        default:
          break
      }
      break
    default:
      break
  }

  // 发送浏览记录信息
  addWebLogs(
    `${demoName}|${getUserName()}|${nowPageName}|${pageDescribe}|${
      returnPageInfo.page
    }|${returnPageInfo.position}|${returnPageInfo.url}|${time}`
  )
}

export function setCookie(key, val, days) {
  /*保存7天*/
  var Days = days || 7
  var exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = key + '=' + escape(val) + ';expires=' + exp.toGMTString()
}

export function getCookie(key) {
  var arr = null
  if (document.cookie != null && document.cookie.length > 0)
    arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'))
  if (arr != null) return unescape(arr[2])
  return null
}
export function replaceUrlParams(url, key, value) {
  var index = url.indexOf(key + '=')
  if (index > -1) {
    var before = url.substring(0, index)
    var after = url.substring(index)
    index = after.indexOf('&')
    after = index > -1 ? after.substring(index) : ''
    url = before + key + '=' + value + after
  } else {
    url += url.indexOf('?') > -1 ? '&' : '?'
    url += key + '=' + value
  }
  return url
}

export function ajaxGet(url, callBack) {
  var xmlhttp
  var responseText = ''
  /*code for IE7+, Firefox, Chrome, Opera, Safari*/
  if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest()
  /*code for IE6, IE5*/ else xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
  xmlhttp.onreadystatechange = function () {
    if (
      xmlhttp.readyState === 4 &&
      xmlhttp.status === 200 &&
      typeof callBack === 'function'
    )
      /*兼容低级盒子，不能扩展string*/
      callBack(jsonTrim(xmlhttp.responseText))
  }
  if (typeof callBack === 'function') xmlhttp.open('GET', url, true)
  else xmlhttp.open('GET', url, false)
  xmlhttp.send()
  return jsonTrim(xmlhttp.responseText)
}
export function jsonTrim(str) {
  /*清除字符串里的换行与回车*/
  return str.replace(/\r/g, ' ').replace(/\n/g, ' ')
}
