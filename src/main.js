import Vue from 'vue'
import App from './App.vue'
import store from './store' // 引入 store 文件
//路由
import Router from './router/index'
// 引入tv焦点处理框架
import focusable from 'vue-tv-focusable'
// 消息提示
import Message from './components/Message/message'
require('es6-promise').polyfill()
Vue.use(focusable)
Vue.config.productionTip = false
Vue.prototype.$Message = Message

if (!Array.prototype.find) {
  Array.prototype.find = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError('Cannot read property "find" of null or undefined')
    }

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function')
    }

    var arrayObject = Object(this)
    var length = arrayObject.length >>> 0
    var thisArgValue = arguments.length >= 2 ? thisArg : undefined

    for (var i = 0; i < length; i++) {
      if (i in arrayObject) {
        var element = arrayObject[i]
        if (callback.call(thisArgValue, element, i, arrayObject)) {
          return element
        }
      }
    }

    return undefined
  }
}

new Vue({
  render: (h) => h(App),
  router: Router,
  store // 注册 store
}).$mount('#app')
