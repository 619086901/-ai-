export function setTxt(text, length) {
  if (text?.length > length) {
    return `${text.substring(0, length)}...`
  }
  return text
}

/**
 * @author
 * @description 判断是否为数字
 * @param value
 * @returns {boolean}
 */
export function isNumber(value) {
  const reg = /^[0-9]*$/
  return reg.test(value)
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 机顶盒打印
 */
var maindiv = null,
  e = null
export function log(error) {
  if (maindiv === null) {
    maindiv = document.body
    if (maindiv === null) return
    e = document.createElement('div')
    e.id = 'debug'
    maindiv.appendChild(e)
    e.style.cssText =
      'z-index:9999; font-size: 18px; position:absolute; top:13px; left:13px; width:1800px; height:auto; overflow:hidden; padding:13px; background:#14affa; color: red;word-break:break-all; display:block; filter:alpha(opacity=0.8);-moz-opacity: 0.8;-khtml-opacity: 0.8;opacity: 0.8;'
  }
  var obj_type = typeof error
  switch (obj_type) {
    default:
      break
    case 'undefined':
      fill('undefined')
      break
    case 'boolean':
      fill('(boolean):' + error)
      break
    case 'number':
      fill('(number):' + error)
      break
    case 'string':
      fill('(string):' + error)
      break
    case 'object':
      if (error === null) {
        fill('(object):null')
        break
      }
      var text = []
      for (var ierror in error) {
        if (error.hasOwnProperty(ierror)) {
          var value = error[ierror]
          text.push(String(ierror + ':' + '(' + typeof value + ')' + value))
        }
      }
      fill('(object) => {' + text.join(', ') + '}')
      break
  }

  function fill(content) {
    var target = document.getElementById('debug')
    var tempContent = target.innerHTML
    var date = new Date()
    target.innerHTML =
      "<div id = 'copyright' style = 'font-size: 12px;color:#FFF;font-weight: bolder;'><strong>" +
      'debug   @' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds() +
      '</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
      window.navigator.userAgent +
      "</div><div id ='debug_box'></div>"
    var targetContent = document.getElementById('debug_box')
    targetContent.innerHTML = content + '<br/>' + tempContent
  }
}

/**
 *
 * @param {*} fn 执行的函数
 * @param {*} delay 延迟时间
 * @returns
 */
export function debounce(fn, delay) {
  var timer
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay || 500)
  }
}

// 延迟执行函数
export function delayedAction(callback, delay) {
  return setTimeout(callback, delay)
}
