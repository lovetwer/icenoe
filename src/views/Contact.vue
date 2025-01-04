<template>
  <div class="contact-page">
    <div class="contact-container">
      <h1 class="page-title">联系我们</h1>
      
      <div class="contact-content">
        <div class="contact-info">
          <div class="info-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>客服电话</h3>
            <p>400-123-4567</p>
            <p>周一至周五 9:00-18:00</p>
          </div>

          <div class="info-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 6l-10 7L2 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>电子邮件</h3>
            <p>support@icenoe.com</p>
            <p>24小时内回复</p>
          </div>

          <div class="info-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>公司地址</h3>
            <p>北京市朝阳区</p>
            <p>科技园区888号</p>
          </div>
        </div>

        <div class="contact-form">
          <h2>发送消息</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label>姓名</label>
              <input 
                type="text" 
                v-model="form.name"
                placeholder="请输入您的姓名"
                :class="{ error: errors.name }"
              >
              <span class="error-text" v-if="errors.name">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label>邮箱</label>
              <input 
                type="email" 
                v-model="form.email"
                placeholder="请输入您的邮箱"
                :class="{ error: errors.email }"
              >
              <span class="error-text" v-if="errors.email">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label>主题</label>
              <input 
                type="text" 
                v-model="form.subject"
                placeholder="请输入消息主题"
                :class="{ error: errors.subject }"
              >
              <span class="error-text" v-if="errors.subject">{{ errors.subject }}</span>
            </div>

            <div class="form-group">
              <label>消息内容</label>
              <textarea 
                v-model="form.message"
                placeholder="请输入您的消息内容"
                rows="5"
                :class="{ error: errors.message }"
              ></textarea>
              <span class="error-text" v-if="errors.message">{{ errors.message }}</span>
            </div>

            <button type="submit" class="submit-btn" :disabled="loading">
              <span class="btn-text">{{ loading ? '发送中...' : '发送消息' }}</span>
              <div class="btn-icon" v-if="!loading">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { submitContactForm } from '@/api/contact'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''

  if (!form.name) {
    errors.name = '请输入姓名'
    isValid = false
  }

  if (!form.email) {
    errors.email = '请输入邮箱'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = '请输入有效的邮箱地址'
    isValid = false
  }

  if (!form.subject) {
    errors.subject = '请输入主题'
    isValid = false
  }

  if (!form.message) {
    errors.message = '请输入消息内容'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    await submitContactForm(form)
    ElMessage.success('消息已发送，我们会尽快回复您')
    // 清空表单
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '发送失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: var(--background);
  color: var(--text);
  padding: 4rem 2rem;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(var(--card-bg-rgb), 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(var(--primary-rgb), 0.1);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
}

/* 联系信息卡片样式 */
.contact-info {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.info-card {
  padding: 2rem;
  background: rgba(var(--card-bg-rgb), 0.1);
  border-radius: 16px;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
  box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.1);
}

.card-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1.5rem;
  color: var(--primary);
}

.info-card h3 {
  font-size: 1.25rem;
  color: var(--text);
  margin-bottom: 1rem;
}

.info-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

/* 联系表单样式 */
.contact-form {
  padding: 2rem;
  background: rgba(var(--card-bg-rgb), 0.1);
  border-radius: 16px;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
}

.contact-form h2 {
  font-size: 1.75rem;
  color: var(--text);
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  background: var(--background);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.2s;
}

input:focus,
textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  outline: none;
}

input.error,
textarea.error {
  border-color: #ff4d4f;
}

.error-text {
  color: #ff4d4f;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: block;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .contact-page {
    padding: 2rem 1rem;
  }

  .contact-container {
    padding: 2rem 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style> 