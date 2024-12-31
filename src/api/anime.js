import request from '@/utils/request'

// 获取动画列表
export function getAnimeList(params) {
  return request({
    url: '/api/anime/list',
    method: 'get',
    params
  })
}

// 获取动画详情
export function getAnimeDetail(id) {
  return request({
    url: `/api/anime/detail/${id}`,
    method: 'get'
  })
}

// 添加动画
export function addAnime(data) {
  return request({
    url: '/api/anime/add',
    method: 'post',
    data
  })
}

// 更新动画
export function updateAnime(data) {
  return request({
    url: '/api/anime/update',
    method: 'put',
    data
  })
}

// 删除动画
export function deleteAnime(id) {
  return request({
    url: `/api/anime/delete/${id}`,
    method: 'delete'
  })
} 