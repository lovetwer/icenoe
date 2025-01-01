import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login, register, logout, getUserInfo } from '@/api/user'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'))

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => user.value.username || '')
  // 登录
  async function loginAction(loginForm) {
    try {
      const res = await login(loginForm)
      if (res.data) {
        // 保存token和用户信息
        token.value = res.data.token
        user.value = {
          username: loginForm.username,
          ...res.data
        }
        
        // 保存到本地存储
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userInfo', JSON.stringify(user.value))
        
        ElMessage.success('登录成功')
        return true
      }
      return false
    } catch (error) {
      console.error('登录失败:', error)
      ElMessage.error(error.response?.data?.message || '登录失败，请重试')
      return false
    }
  }

  // 注册
  async function registerAction(registerForm) {
    try {
      const res = await register(registerForm)
      if (res.data) {
        ElMessage.success('注册成功')
        return true
      }
      return false
    } catch (error) {
      console.error('注册失败:', error)
      ElMessage.error(error.response?.data?.message || '注册失败，请重试')
      return false
    }
  }

  // 登出
  async function logoutAction() {
    try {
      if (user.value.username) {
        await logout(user.value.username)
      }
      // 无论接口是否成功，都清除本地存储
      token.value = ''
      user.value = {}
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      ElMessage.success('已退出登录')
      return true
    } catch (error) {
      console.error('登出失败:', error)
      return false
    }
  }

  // 获取用户信息
  async function getUserInfoAction() {
    try {
      const res = await getUserInfo()
      if (res.data) {
        // 更新用户信息，保留原有信息
        user.value = {
          ...user.value,
          ...res.data
        }
        localStorage.setItem('userInfo', JSON.stringify(user.value))
        return true
      }
      return false
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return false
    }
  }

  return {
    token,
    user,
    isLoggedIn,
    username,
    loginAction,
    registerAction,
    logoutAction,
    getUserInfoAction
  }
}) 