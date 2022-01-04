/* eslint-disable no-async-promise-executor */
import { loginApi, getInfoApi, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    // token: '',
    name: '',
    avatar: '',
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    console.log(token, 22)
    state.token = token
    setToken(token)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 省略其他...
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi(userInfo).then(response => {
        const { data } = response
        console.log(data, 111)
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise(async(resolve, reject) => {
      const { data: res } = await getInfoApi()
      // console.log(data)
      console.log(res)
      const { data: Info } = await getUserDetailById(res.userId)
      console.log(Info)
      commit('setUserInfo', res)
      commit('SET_NAME', res.username)
      commit('SET_AVATAR', Info.staffPhoto)
      commit('setUserInfo', { ...res, ...Info })
      resolve(res)
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

