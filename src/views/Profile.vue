<template>
  <div class="profile-container">
    <h1 class="title">个人中心</h1>
    
    <div class="profile-content">
      <div class="profile-section">
        <h2 class="section-title">基本信息</h2>
        <div class="info-group">
          <label>用户名</label>
          <div class="info-value">{{ userStore.user?.username || '未设置' }}</div>
        </div>
        <div class="info-group">
          <label>邮箱</label>
          <div class="info-value">{{ userStore.user?.email || '未设置' }}</div>
        </div>
        <div class="info-group">
          <label>注册时间</label>
          <div class="info-value">{{ formatDate(userStore.user?.createdAt) }}</div>
        </div>
      </div>

      <div class="profile-section">
        <h2 class="section-title">我的动画</h2>
        <div v-if="userAnimations.length" class="animations-grid">
          <div v-for="animation in userAnimations" :key="animation.id" class="animation-card">
            <div class="animation-preview">
              <!-- TODO: 添加动画预览 -->
              <div class="preview-placeholder">预览图</div>
            </div>
            <div class="animation-info">
              <h3>{{ animation.title }}</h3>
              <p class="animation-stats">
                <span>浏览: {{ animation.views }}</span>
                <span>下载: {{ animation.downloads }}</span>
              </p>
              <div class="animation-actions">
                <button @click="editAnimation(animation)" class="action-btn edit">编辑</button>
                <button @click="deleteAnimation(animation.id)" class="action-btn delete">删除</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>还没有上传过动画</p>
          <router-link to="/upload" class="upload-btn">上传动画</router-link>
        </div>
      </div>

      <div class="profile-section">
        <h2 class="section-title">账号设置</h2>
        <div class="settings-form">
          <div class="form-group">
            <label for="newUsername">新用户名</label>
            <input 
              type="text" 
              id="newUsername" 
              v-model="settingsForm.username" 
              class="form-input"
              placeholder="输入新用户名"
            >
          </div>
          
          <div class="form-group">
            <label for="newPassword">新密码</label>
            <input 
              type="password" 
              id="newPassword" 
              v-model="settingsForm.password" 
              class="form-input"
              placeholder="输入新密码"
            >
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">确认密码</label>
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="settingsForm.confirmPassword" 
              class="form-input"
              placeholder="再次输入新密码"
            >
          </div>
          
          <button 
            @click="updateSettings" 
            :disabled="isUpdating || !isSettingsValid" 
            class="submit-btn"
          >
            {{ isUpdating ? '更新中...' : '更新设置' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const isUpdating = ref(false)

// 模拟用户动画数据
const userAnimations = ref([
  // TODO: 从 API 获取用户动画列表
])

const settingsForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const isSettingsValid = computed(() => {
  if (!settingsForm.username && !settingsForm.password) return false
  if (settingsForm.password && settingsForm.password !== settingsForm.confirmPassword) return false
  return true
})

const formatDate = (dateString) => {
  if (!dateString) return '未知'
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const editAnimation = (animation) => {
  // TODO: 实现编辑动画功能
  console.log('编辑动画:', animation)
}

const deleteAnimation = async (id) => {
  if (!confirm('确定要删除这个动画吗？')) return
  
  try {
    // TODO: 调用删除动画 API
    console.log('删除动画:', id)
    userAnimations.value = userAnimations.value.filter(a => a.id !== id)
  } catch (error) {
    console.error('删除失败:', error)
    alert('删除失败，请重试')
  }
}

const updateSettings = async () => {
  if (!isSettingsValid.value) return
  
  isUpdating.value = true
  try {
    // TODO: 调用更新设置 API
    const updateData = {
      ...(settingsForm.username && { username: settingsForm.username }),
      ...(settingsForm.password && { password: settingsForm.password })
    }
    
    // 这里添加实际的 API 调用
    
    // 清空表单
    settingsForm.username = ''
    settingsForm.password = ''
    settingsForm.confirmPassword = ''
    
    alert('设置更新成功')
  } catch (error) {
    console.error('更新失败:', error)
    alert('更新失败，请重试')
  } finally {
    isUpdating.value = false
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.profile-content {
  display: grid;
  gap: 2rem;
}

.profile-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #42b883;
}

.info-group {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
}

.info-group label {
  color: #666;
  font-weight: 500;
}

.info-value {
  color: #2c3e50;
}

.animations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.animation-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.animation-card:hover {
  transform: translateY(-2px);
}

.animation-preview {
  aspect-ratio: 16/9;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-placeholder {
  color: #adb5bd;
}

.animation-info {
  padding: 1rem;
}

.animation-info h3 {
  margin: 0 0 0.5rem;
  color: #2c3e50;
  font-size: 1.1rem;
}

.animation-stats {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.animation-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.action-btn.edit {
  background: #42b883;
  color: white;
}

.action-btn.edit:hover {
  background: #3aa876;
}

.action-btn.delete {
  background: #ff4757;
  color: white;
}

.action-btn.delete:hover {
  background: #ff6b81;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.upload-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.upload-btn:hover {
  background: #3aa876;
}

.settings-form {
  max-width: 500px;
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

.submit-btn {
  width: 100%;
  padding: 1rem;
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
</style> 