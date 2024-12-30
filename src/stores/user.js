import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null
  }),
  
  actions: {
    setUser(userData) {
      this.user = userData
      this.isAuthenticated = !!userData
    },
    
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    
    clearUser() {
      this.user = null
      this.isAuthenticated = false
      this.token = null
      localStorage.removeItem('token')
    },

    initializeFromStorage() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        this.isAuthenticated = true
      }
    }
  },
  
  getters: {
    getUserInfo: (state) => state.user,
    getAuthStatus: (state) => state.isAuthenticated,
    getToken: (state) => state.token
  }
}) 