<template>
  <div class="register-page">
    <!-- 背景动画 -->
    <div class="animated-bg">
      <div class="gradient-circle"></div>
      <div class="floating-shapes">
        <div class="shape" v-for="n in 6" :key="n"></div>
      </div>
    </div>

    <div class="register-container">
      <!-- 装饰动画 -->
      <div class="decoration">
        <div class="animation-grid">
          <div class="grid-item" v-for="n in 9" :key="n">
            <div class="item-content"></div>
          </div>
        </div>
        <div class="floating-dots">
          <div class="dot" v-for="n in 12" :key="n"></div>
        </div>
      </div>

      <!-- 注册表单 -->
      <div class="form-container">
        <h2 class="title">
          <span class="welcome">创建账号</span>
          <span class="brand">Icenoe</span>
        </h2>
        <p class="subtitle">加入我们，开始你的动画创作之旅</p>

        <form @submit.prevent="handleSubmit" class="register-form">
          <div class="form-group" :class="{ 'focused': focused === 'username' }">
            <label>用户名</label>
            <div class="input-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-width="2"/>
                <circle cx="12" cy="7" r="4" stroke-width="2"/>
              </svg>
              <input 
                type="text" 
                v-model="form.username"
                placeholder="输入用户名"
                :class="{ error: errors.username }"
                @focus="focused = 'username'"
                @blur="focused = null"
              >
              <div class="input-border"></div>
            </div>
            <span class="error-text" v-if="errors.username">{{ errors.username }}</span>
          </div>

          <div class="form-group" :class="{ 'focused': focused === 'password' }">
            <label>密码</label>
            <div class="input-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-width="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-width="2"/>
              </svg>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="form.password"
                placeholder="输入密码"
                :class="{ error: errors.password }"
                @focus="focused = 'password'"
                @blur="focused = null"
              >
              <div class="input-border"></div>
              <button 
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                <svg v-if="showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke-width="2" stroke-linecap="round"/>
                  <line x1="1" y1="1" x2="23" y2="23" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" stroke-width="2"/>
                </svg>
              </button>
            </div>
            <span class="error-text" v-if="errors.password">{{ errors.password }}</span>
          </div>

          <div class="form-group" :class="{ 'focused': focused === 'confirmPassword' }">
            <label>确认密码</label>
            <div class="input-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-width="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-width="2"/>
              </svg>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="form.confirmPassword"
                placeholder="再次输入密码"
                :class="{ error: errors.confirmPassword }"
                @focus="focused = 'confirmPassword'"
                @blur="focused = null"
              >
              <div class="input-border"></div>
            </div>
            <span class="error-text" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
          </div>

          <div class="form-agreement">
            <label class="checkbox">
              <input type="checkbox" v-model="form.agreement">
              <span class="checkbox-custom"></span>
              <span>我已阅读并同意</span>
            </label>
            <a href="#" class="agreement-link">服务条款</a>
            <span>和</span>
            <a href="#" class="agreement-link">隐私政策</a>
          </div>

          <button type="submit" class="submit-btn" :disabled="loading || !form.agreement">
            <span class="btn-text">{{ loading ? '注册中...' : '注册' }}</span>
            <div class="btn-animation">
              <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>
        </form>

        <div class="login-link">
          已有账号？
          <router-link to="/login" class="link">立即登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

const errors = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const showPassword = ref(false)
const focused = ref(null)

const validateForm = () => {
  let isValid = true
  errors.username = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!form.username) {
    errors.username = '请输入用户名'
    isValid = false
  } else if (form.username.length < 3) {
    errors.username = '用户名至少3个字符'
    isValid = false
  }

  if (!form.password) {
    errors.password = '请输入密码'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = '密码至少6个字符'
    isValid = false
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = '请确认密码'
    isValid = false
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = '两次输入的密码不一致'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return
  if (!form.agreement) return

  loading.value = true
  try {
    const success = await userStore.registerAction(form)
    if (success) {
      router.push('/login')
    }
  } catch (error) {
    errors.username = '注册失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.register-container {
  width: 100%;
  max-width: 420px;
  background: var(--card-bg);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.decoration {
  height: 180px;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  position: relative;
  overflow: hidden;
}

.animation-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.grid-item {
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
}

.item-content {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
  transform-origin: center;
  animation: rotate 8s linear infinite;
}

.grid-item:nth-child(2n) .item-content {
  animation-direction: reverse;
  animation-duration: 12s;
}

.grid-item:nth-child(3n) .item-content {
  animation-duration: 10s;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.floating-dots {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  animation: float-up 4s ease-in-out infinite;
}

.dot:nth-child(1) { left: 10%; animation-delay: 0s; }
.dot:nth-child(2) { left: 20%; animation-delay: 0.5s; }
.dot:nth-child(3) { left: 30%; animation-delay: 1s; }
.dot:nth-child(4) { left: 40%; animation-delay: 1.5s; }
.dot:nth-child(5) { left: 50%; animation-delay: 2s; }
.dot:nth-child(6) { left: 60%; animation-delay: 2.5s; }
.dot:nth-child(7) { left: 70%; animation-delay: 3s; }
.dot:nth-child(8) { left: 80%; animation-delay: 3.5s; }
.dot:nth-child(9) { left: 90%; animation-delay: 4s; }
.dot:nth-child(10) { left: 25%; animation-delay: 4.5s; }
.dot:nth-child(11) { left: 45%; animation-delay: 5s; }
.dot:nth-child(12) { left: 65%; animation-delay: 5.5s; }

@keyframes float-up {
  0% {
    transform: translateY(160px) scale(0);
    opacity: 0;
  }
  50% {
    transform: translateY(80px) scale(1);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
}

.form-container {
  padding: 2rem;
}

.title {
  margin: 0;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.welcome {
  color: var(--text);
}

.brand {
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  margin: 0.5rem 0 2rem;
  color: var(--text-secondary);
  text-align: center;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group.focused label {
  color: var(--primary);
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper svg {
  position: absolute;
  left: 1rem;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.form-group.focused .input-wrapper svg {
  color: var(--primary);
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  background: var(--background);
  color: var(--text);
  font-size: 0.95rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s;
}

.input-border {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 12px;
  border: 2px solid var(--primary);
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.2s;
}

.form-group.focused .input-border {
  opacity: 1;
  transform: scale(1);
}

input.error {
  border-color: #ff4d4f;
}

input.error:focus {
  box-shadow: 0 0 0 3px rgba(255, 77, 79, 0.2);
}

.error-text {
  color: #ff4d4f;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: block;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: var(--text);
}

.form-agreement {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.checkbox input {
  display: none;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border);
  border-radius: 4px;
  position: relative;
  transition: all 0.2s;
}

.checkbox-custom::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0);
  opacity: 0;
  transition: all 0.2s;
}

.checkbox input:checked + .checkbox-custom {
  background: var(--primary);
  border-color: var(--primary);
}

.checkbox input:checked + .checkbox-custom::after {
  transform: rotate(45deg) scale(1);
  opacity: 1;
}

.agreement-link {
  color: var(--primary);
  text-decoration: none;
  transition: opacity 0.2s;
}

.agreement-link:hover {
  opacity: 0.8;
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  background: var(--primary);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-text {
  position: relative;
  z-index: 1;
}

.btn-animation {
  position: absolute;
  top: 0;
  right: -40px;
  bottom: 0;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}

.btn-arrow {
  width: 20px;
  height: 20px;
  transform: translateX(-10px);
  transition: transform 0.3s;
}

.submit-btn:hover .btn-animation {
  right: 0;
}

.submit-btn:hover .btn-arrow {
  transform: translateX(0);
}

.login-link {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.login-link .link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.25rem;
  position: relative;
}

.login-link .link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s;
}

.login-link .link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.animated-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.gradient-circle {
  position: absolute;
  width: 150vmax;
  height: 150vmax;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    var(--primary-light) 0%,
    transparent 70%
  );
  opacity: 0.15;
  animation: pulse 8s ease-in-out infinite;
}

.floating-shapes {
  position: absolute;
  inset: 0;
  filter: blur(2px);
}

.shape {
  position: absolute;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  opacity: 0.1;
  animation: float 10s linear infinite;
}

.shape:nth-child(1) {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 20%;
  animation-duration: 15s;
}

.shape:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 60%;
  left: 70%;
  animation-duration: 25s;
  animation-delay: -2s;
}

.shape:nth-child(3) {
  width: 80px;
  height: 80px;
  top: 30%;
  left: 80%;
  animation-duration: 20s;
  animation-delay: -5s;
}

.shape:nth-child(4) {
  width: 120px;
  height: 120px;
  top: 70%;
  left: 30%;
  animation-duration: 18s;
  animation-delay: -8s;
}

.shape:nth-child(5) {
  width: 90px;
  height: 90px;
  top: 40%;
  left: 40%;
  animation-duration: 22s;
  animation-delay: -3s;
}

.shape:nth-child(6) {
  width: 130px;
  height: 130px;
  top: 80%;
  left: 60%;
  animation-duration: 28s;
  animation-delay: -7s;
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@keyframes float {
  0% {
    transform: rotate(0deg) translate(0, 0) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translate(100px, 100px) rotate(-360deg);
  }
}
</style> 