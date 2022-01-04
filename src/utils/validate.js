/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @description: 手机号校验  description-描述
 * @param {*} str  param-参数
 * @return {Boolean}
 */
export function validMobile(str) {
  return /^1[3-9]\d{9}$/.test(str) // 校验手机号
}
