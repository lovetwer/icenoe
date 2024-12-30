<template>
  <div class="upload-container">
    <h1 class="title">上传动画</h1>
    
    <div class="upload-form">
      <div class="form-group">
        <label for="title">标题</label>
        <input 
          type="text" 
          id="title" 
          v-model="formData.title" 
          class="form-input"
          placeholder="请输入动画标题"
        >
      </div>
      
      <div class="form-group">
        <label for="description">描述</label>
        <textarea 
          id="description" 
          v-model="formData.description" 
          class="form-input"
          rows="4"
          placeholder="请输入动画描述"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label>动画文件</label>
        <div 
          class="upload-area"
          @dragover.prevent
          @drop.prevent="handleFileDrop"
          @click="triggerFileInput"
        >
          <div v-if="!formData.file" class="upload-placeholder">
            <i class="upload-icon">📁</i>
            <p>点击或拖拽文件到此处上传</p>
            <p class="upload-hint">支持 .json 格式的 Lottie 动画文件</p>
          </div>
          <div v-else class="file-info">
            <p>{{ formData.file.name }}</p>
            <button @click.stop="removeFile" class="remove-btn">移除</button>
          </div>
        </div>
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleFileSelect" 
          accept=".json"
          class="hidden"
        >
      </div>
      
      <div class="form-group">
        <label>标签</label>
        <div class="tags-input">
          <div v-for="tag in formData.tags" :key="tag" class="tag">
            {{ tag }}
            <span @click="removeTag(tag)" class="tag-remove">×</span>
          </div>
          <input 
            type="text" 
            v-model="tagInput"
            @keydown.enter.prevent="addTag"
            placeholder="输入标签后按回车"
            class="tag-input"
          >
        </div>
      </div>
      
      <button 
        @click="handleSubmit" 
        :disabled="isSubmitting || !isFormValid" 
        class="submit-btn"
      >
        {{ isSubmitting ? '上传中...' : '提交' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const fileInput = ref(null)
const tagInput = ref('')
const isSubmitting = ref(false)

const formData = reactive({
  title: '',
  description: '',
  file: null,
  tags: []
})

const isFormValid = computed(() => {
  return formData.title && formData.description && formData.file
})

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'application/json') {
    formData.file = file
  } else {
    alert('请上传 .json 格式的文件')
  }
}

const handleFileDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file && file.type === 'application/json') {
    formData.file = file
  } else {
    alert('请上传 .json 格式的文件')
  }
}

const removeFile = () => {
  formData.file = null
  fileInput.value.value = ''
}

const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !formData.tags.includes(tag)) {
    formData.tags.push(tag)
  }
  tagInput.value = ''
}

const removeTag = (tag) => {
  const index = formData.tags.indexOf(tag)
  if (index > -1) {
    formData.tags.splice(index, 1)
  }
}

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  try {
    // TODO: 实现文件上传逻辑
    const formDataToSend = new FormData()
    formDataToSend.append('title', formData.title)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('file', formData.file)
    formDataToSend.append('tags', JSON.stringify(formData.tags))
    
    // 这里添加实际的上传 API 调用
    
    router.push('/animations')
  } catch (error) {
    console.error('上传失败:', error)
    alert('上传失败，请重试')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.upload-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.upload-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.upload-area {
  border: 2px dashed #ddd;
  border-radius: 4px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.upload-area:hover {
  border-color: #42b883;
}

.upload-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.upload-hint {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.remove-btn {
  background: #ff4757;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.hidden {
  display: none;
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.tag {
  background: #42b883;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.tag-remove {
  cursor: pointer;
  font-weight: bold;
}

.tag-input {
  border: none;
  outline: none;
  flex: 1;
  min-width: 100px;
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