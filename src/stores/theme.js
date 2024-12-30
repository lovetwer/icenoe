import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),
  
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      // 更新 HTML 根元素的 class
      document.documentElement.classList.toggle('dark', this.isDark)
      // 保存到 localStorage
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    
    initTheme() {
      // 从 localStorage 或系统偏好获取主题
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      this.isDark = savedTheme ? savedTheme === 'dark' : prefersDark
      document.documentElement.classList.toggle('dark', this.isDark)
    }
  }
}) 