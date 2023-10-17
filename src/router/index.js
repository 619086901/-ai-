import Vue from 'vue' //引入vue js是一个vue的配置文件 vue版本是2.6
import Router from 'vue-router' //vue-router 安装的对象 npm install vue-router@"3.0.1"
import VueRouter from 'vue-router'

//vue中使用Router
Vue.use(Router)
const routers = [
  {
    path: '/',
    redirect: '/index.html',
    component: () => import('../view/Index'),
    name: 'root',
    children: [
      {
        path: 'index.html',
        name: 'Index'
      }
    ]
  },
  {
    path: '/answer.html',
    component: () => import('../view/answer'),
    name: 'Answer'
  },
  {
    path: '/answerpro.html',
    component: () => import('../view/answerpro'),
    name: 'Answerpro'
  },
  {
    path: '/answerall.html',
    component: () => import('../view/answerall'),
    name: 'Answerall'
  },
  {
    path: '/column.html',
    component: () => import('../view/column'),
    name: 'Column'
  },
  {
    path: '/item.html',
    component: () => import('../view/item'),
    name: 'Item'
  },
  {
    path: '/success.html',
    component: () => import('../view/success'),
    name: 'Success'
  },
  {
    path: '/successpro.html',
    component: () => import('../view/successpro'),
    name: 'Successpro'
  },
  {
    path: '/order.html',
    component: () => import('../view/order'),
    name: 'Order'
  }
]
//创建一个vue-router实例对象
const router = new VueRouter({
  mode: 'history', //history 不带#号 hash 带#号
  routes: routers //所有的路由数组
})
//导出路由对象  使用路由的地方引入即可  一般在入口main.js中使用
export default router
