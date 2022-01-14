import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

export function tranListToTreeData(data, val) {
  var arr = []
  data.forEach(item => {
    if (item.pid === val) {
      var children = tranListToTreeData(data, item.id)
      if (children) {
        item.children = children
      }
      arr.push(item)
    }
  })
  return arr
}

/**
 * @description: 新增子部门
 * @param {*}
        data {
            name: '', // 部门名称
            code: '', // 部门编码
            manager: '', // 部门管理者
            introduce: '', // 部门介绍
            pid: '' // 新增的这个子部门的上级部门
        }
 * @return {*}
 */
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
 * @description: 获取部门详情
 * @param {*} id 表示当前要编辑项的id值
 * @return {*}
 */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * @description: 删除部门
 * @param {*} id 当前点击的操作按钮 所在的项的id
 * @return {*}
 */
export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/**
  * @description: 更新部门数据
  * @param {*} data:form表单数据 但是要有id值
  * @return {*}
  */
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
