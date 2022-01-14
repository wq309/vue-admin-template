// 导入axios实例
import request from '@/utils/request'

// 根据业务要求- 查接口文档-封装api
/**
 * 获取所有角色信息
 * @param {*} params  {page, pagesize}
 * @returns
 */
export function getRoles(params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    'params': params
  })
}
