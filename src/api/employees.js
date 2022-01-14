import request from '@/utils/request'
/**
 * @description: 获取下拉员工数据
 * @param {*}
 * @return {*}
 */
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * @description: 获取员工列表
 * @param {*} params {page:当前页,size：每页条数}
 * @return {*}
 */
export function getEmployeeList(page, size) {
  return request({
    methods: 'get',
    url: '/sys/user',
    params: { page, size }
  })
}

