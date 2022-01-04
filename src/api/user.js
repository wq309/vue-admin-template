import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

/**
 * @description: 登录
 * @param {*} data {modile, password}
 * @return {*}
 */
export function loginApi(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: data
  })
}

/**
 * @description: 获取用户资料
 * @param {*}
 * @return {*}
 */
export function getInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * @description: 获取用户头像
 * @param {*} id 用户id
 * @return {*}
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
