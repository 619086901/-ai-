import Vuex from 'vuex'
import Vue from 'vue'
import { getToken } from '../../tool/android.js'
import { login, logout, refresh } from '../../api/user.js'
import { getAccessToken, setAccessToken } from '../../tool/accessToken.js'
import { log } from '../../tool/index.js'

Vue.use(Vuex)

// 消息提示
import Message from '../../components/Message/message'

const store = new Vuex.Store({
  state: () => ({
    accessToken: getAccessToken()
  }),
  getters: {
    accessToken: (state) => state.accessToken
  },
  mutations: {
    /**
     * @author
     * @description 设置accessToken
     * @param {*} state
     * @param {*} accessToken
     */
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken
    }
  },
  actions: {
    /**
     * @author
     * @description 登录
     * @param {*} { commit }
     */
    async login({ commit }) {
      if (process.env.VUE_APP_VERSION == 'PC') {
        return new Promise(async (resolve, reject) => {
          const {
            data: { access_token }
          } = await login({
            username: 'admin',
            password: 'admin'
          })
          const accessToken = `bearer ${access_token}`
          setAccessToken(accessToken)
          commit('setAccessToken', getAccessToken())
          resolve(accessToken)
        })
      } else {
        try {
          return new Promise((resolve, reject) => {
            if (
              window.android.getToken() &&
              window.android.getToken() != '-1'
            ) {
              const accessToken = `bearer ${window.android.getToken()}`
              setAccessToken(accessToken)
              commit('setAccessToken', getAccessToken())
              resolve(accessToken)
            } else {
              reject()
            }
          })
        } catch (error) {
          return token
        }
      }
    },
    async refreshLogin({ commit, dispatch }) {
      console.log('执行refresh')
      try {
        const {
          data: {
            code,
            data: { access_token }
          }
        } = await refresh()
        switch (code) {
          case 200:
            Message({
              type: 'success',
              message: '刷新鉴权'
            })
            {
              const accessToken = `bearer ${access_token}`
              commit('setAccessToken', accessToken)
            }
            break
          default:
            Message({
              type: 'error',
              message: '登录失效'
            })
            dispatch('resetAll').catch(() => {})
            break
        }
      } catch (error) {
        Message({
          type: 'error',
          message: '登录失效'
        })
        dispatch('resetAll').catch(() => {})
      }
    },

    /**
     * @author
     * @description 退出登录
     * @param {*} { dispatch }
     */
    async logout({ dispatch, state }) {
      await logout(state.accessToken)
      await dispatch('resetAll')
    },
    /**
     * @author
     * @description 重置accessToken
     * @param {*} { commit, dispatch }
     */
    async resetAll({ dispatch }) {
      await dispatch('setAccessToken', '')
    },
    /**
     * @author
     * @description 设置token
     */
    setAccessToken({ commit }, accessToken) {
      commit('setAccessToken', accessToken)
    }
  }
})

export default store
