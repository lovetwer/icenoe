import request from '@/utils/request'

/**
 * 用户登录
 * @param {Object} data - 登录信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise} 返回登录结果
 */
export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    params: {
      username: data.username,
      password: data.password
    }
  })
}

/**
 * 用户注册
 * @param {Object} data - 注册信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise} 返回注册结果
 */
export function register(data) {
  return request({
    url: '/api/auth/register',
    method: 'post',
    data: {
      username: data.username,
      password: data.password
    }
  })
}

/**
 * 用户登出
 * @param {string} username - 用户名
 * @returns {Promise} 返回登出结果
 */
export function logout(username) {
  return request({
    url: '/api/auth/logout',
    method: 'post',
    params: {
      username
    }
  })
}

/**
 * 获取当前用户信息
 * @returns {Promise} 返回用户信息
 */
export function getUserInfo() {
  return request({
    url: '/api/auth/info',
    method: 'get'
  })
} 