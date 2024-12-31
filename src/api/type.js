import request from '@/utils/request'

// 获取所有分类
export function getAllTypes() {
  return request({
    url: '/api/type/list',
    method: 'get'
  })
}

// 获取分类详情
export function getTypeById(id) {
  return request({
    url: `/api/type/${id}`,
    method: 'get'
  })
}

// 添加分类
export function addType(data) {
  return request({
    url: '/api/type/add',
    method: 'post',
    data
  })
}

// 更新分类
export function updateType(data) {
  return request({
    url: '/api/type/update',
    method: 'put',
    data
  })
}

// 删除分类
export function deleteType(id) {
  return request({
    url: `/api/type/delete/${id}`,
    method: 'delete'
  })
} 