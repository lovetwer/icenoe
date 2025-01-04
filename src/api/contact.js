import request from '@/utils/request'

/**
 * 提交联系表单
 * @param {Object} data 表单数据
 * @returns {Promise} 请求结果
 */
export function submitContactForm(data) {
  return request({
    url: '/api/contact/submit',
    method: 'post',
    data
  })
} 