// 拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = store.getters.token
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // const res = response.data
    // if (res.success) {
    //   Message({
    //     message: res.message || 'Success',
    //     type: 'success',
    //     duration: 5 * 1000
    //   })
    //   return res
    // } else {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject(new Error(res.message || 'Error'))
    // }
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }

    // 后端和前端的约定：success=true表示请求成功
    if (response.data.success) {
      return response.data
    } else {
      // 如果success为false 业务出错,直接触发reject
      // 被catch分支捕获
      return Promise.reject(new Error(response.data.message))
    }
  },
  async error => {
    console.log('请求出错啦', error)
    if (error.response.data.code === 10002) {
      console.log('token失效')
      await store.dispatch('user/logout')
      // router.push('/login?return_url=' + encodeURIComponent(router.currentRoute.fullPath))
    }
    console.dir(error)
    return Promise.reject(error)
  }
)

export default service
