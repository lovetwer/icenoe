<template>
  <div class="modal" v-if="modelValue">
    <div class="modal-mask" @click="$emit('update:modelValue', false)"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h3>保存动画</h3>
        <button class="close-btn" @click="$emit('update:modelValue', false)">×</button>
      </div>
      
      <div class="modal-body">
        <div class="form-item">
          <input 
            type="text" 
            v-model="form.title" 
            placeholder="标题"
            class="input"
          >
        </div>

        <div class="form-item">
          <textarea 
            v-model="form.description" 
            placeholder="描述"
            class="input"
            rows="3"
          ></textarea>
        </div>

        <div class="form-item">
          <select v-model="form.categoryId" class="input">
            <option value="">选择分类</option>
            <option 
              v-for="category in categories" 
              :key="category.id" 
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="form-item">
          <input 
            type="text" 
            v-model="form.tags" 
            placeholder="标签（用逗号分隔）"
            class="input"
          >
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-text" @click="$emit('update:modelValue', false)">取消</button>
        <button 
          class="btn btn-primary" 
          @click="handleSave" 
          :disabled="saving || !form.title || !form.categoryId"
        >
          {{ saving ? '保存中...' : '保存' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getAllTypes } from '@/api/type'

const props = defineProps({
  modelValue: Boolean,
  htmlCode: String,
  cssCode: String,
  jsCode: String
})

const emit = defineEmits(['update:modelValue', 'save'])

const categories = ref([])
const saving = ref(false)

const form = reactive({
  title: '',
  description: '',
  categoryId: '',
  tags: ''
})

// 获取分类列表
const fetchCategories = async () => {
  try {
    const res = await getAllTypes()
    categories.value = res.data
  } catch (error) {
    console.error('获取分类列表失败:', error)
  }
}

// 处理保存
const handleSave = async () => {
  if (!form.title || !form.categoryId) return
  
  saving.value = true
  try {
    const data = {
      ...form,
      tags: form.tags ? JSON.stringify(form.tags.split(',').map(tag => tag.trim())) : '[]',
      preview: `<div class="animation-preview">
      ${props.htmlCode}
      <style>
        ${props.cssCode}
      </style>
    </div>`
    }
    
    emit('save', data)
    emit('update:modelValue', false)
  } finally {
    saving.value = false
  }
}

// 初始化时获取分类列表
fetchCategories()
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}

.modal-container {
  position: relative;
  width: 400px;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  animation: modal-show 0.2s ease-out;
}

@keyframes modal-show {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.close-btn {
  border: none;
  background: none;
  color: var(--text-secondary);
  font-size: 24px;
  line-height: 1;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  color: var(--text);
}

.modal-body {
  padding: 20px;
}

.form-item {
  margin-bottom: 16px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--background);
  color: var(--text);
  font-size: 14px;
  line-height: 1.5;
  transition: all 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px var(--primary-light);
}

.input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-text {
  background: none;
  border: none;
  color: var(--text-secondary);
}

.btn-text:hover {
  background: var(--card-hover);
  color: var(--text);
}

.btn-primary {
  background: var(--primary);
  border: 1px solid var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-hover);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 