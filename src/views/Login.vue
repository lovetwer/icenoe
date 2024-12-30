<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">登录</h1>
      
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="email">邮箱</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
            class="form-input"
            placeholder="请输入邮箱"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="formData.password"
            class="form-input"
            placeholder="请输入密码"
            required
          >
        </div>
        
        <div class="form-options">
          <label class="remember-me">
            <input 
              type="checkbox" 
              v-model="formData.remember"
            > 记住我
          </label>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>
        
        <button 
          type="submit" 
          class="submit-btn"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? '登录中...' : '登录' }}
        </button>
      </form>
      
      <div class="divider">
        <span>或</span>
      </div>
      
      <div class="social-login">
        <button class="social-btn github">
          <i class="fab fa-github"></i>
          使用 GitHub 登录
        </button>
        <button class="social-btn google">
          <i class="fab fa-google"></i>
          使用 Google 登录
        </button>
      </div>
      
      <p class="register-hint">
        还没有账号？
        <a href="#" @click.prevent="goToRegister">立即注册</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const isSubmitting = ref(false)

const formData = reactive({
  email: '',
  password: '',
  remember: false
})

const handleSubmit = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  try {
    // TODO: 实现登录 API 调用
    const response = await login(formData)
    
    // 存储用户信息和 token
    userStore.setUser(response.user)
    userStore.setToken(response.token)
    
    // 重定向到之前的页面或首页
    const redirect = router.currentRoute.value.query.redirect || '/'
    router.push(redirect)
  } catch (error) {
    console.error('登录失败:', error)
    alert('登录失败，请检查邮箱和密码')
  } finally {
    isSubmitting.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}

// TODO: 实现第三方登录功能
const login = async (credentials) => {
  // 模拟 API 调用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          username: 'test_user',
          email: credentials.email,
          createdAt: new Date().toISOString()
        },
        token: 'mock_token_' + Date.now()
      })
    }, 1000)
  })
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #42b983 0%, #2c3e50 100%);
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.title {
  font-size: 2rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #42b883;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.forgot-password {
  color: #42b883;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #3aa876;
}

.submit-btn:disabled {
  background: #a8e0c9;
  cursor: not-allowed;
}

.divider {
  text-align: center;
  margin: 2rem 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background: #ddd;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background: white;
  padding: 0 1rem;
  color: #666;
}

.social-login {
  display: grid;
  gap: 1rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.social-btn i {
  font-size: 1.25rem;
}

.social-btn.github {
  background: #24292e;
  color: white;
  border-color: #24292e;
}

.social-btn.github:hover {
  background: #1b1f23;
}

.social-btn.google {
  background: white;
  color: #757575;
}

.social-btn.google:hover {
  background: #f5f5f5;
}

.register-hint {
  text-align: center;
  margin-top: 2rem;
  color: #666;
}

.register-hint a {
  color: #42b883;
  text-decoration: none;
}

.register-hint a:hover {
  text-decoration: underline;
}
</style> 