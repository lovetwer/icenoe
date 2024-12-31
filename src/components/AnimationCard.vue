<template>
  <div class="animation-card">
    <!-- 预览区域 -->
    <div class="preview-wrapper" @click="$emit('preview', animation)">
      <div class="preview-area" v-html="animation.preview"></div>
      <div class="preview-overlay">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="preview-icon">
          <path d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6z" stroke="currentColor" stroke-width="2"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
    </div>
    
    <!-- 信息区域 -->
    <div class="info-area">
      <div class="header">
        <h3 class="title">{{ animation.title }}</h3>
        <button class="more-btn" @click.stop>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 13a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2zM5 13a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" stroke="currentColor" stroke-width="1"/>
          </svg>
        </button>
      </div>
      
      <!-- 标签 -->
      <div class="tags" v-if="parsedTags.length">
        <span 
          v-for="tag in parsedTags" 
          :key="tag" 
          class="tag"
        >
          {{ tag }}
        </span>
      </div>

      <p class="description">{{ animation.description }}</p>
      
      <!-- 统计信息 -->
      <div class="footer">
        <div class="stats">
          <div class="stat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>{{ animation.likes || 0 }}</span>
          </div>
          <div class="stat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ animation.downloads || 0 }}</span>
          </div>
          <div class="stat" v-if="animation.durations">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ animation.durations }}s</span>
          </div>
        </div>

        <button class="edit-btn" @click.stop="handleEdit">
          编辑
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  animation: {
    type: Object,
    required: true
  }
})

const parsedTags = computed(() => {
  try {
    return props.animation.tags ? JSON.parse(props.animation.tags) : []
  } catch (e) {
    return []
  }
})

const handleEdit = () => {
  const preview = props.animation.preview || ''
  
  // 提取HTML代码 - 获取 style 标签之前的内容
  const htmlCode = preview.split('<style>')[0].trim()
  
  // 提取CSS代码 - 获取 style 标签中的内容
  const cssMatch = preview.match(/<style>([\s\S]*?)<\/style>/)
  const cssCode = cssMatch ? cssMatch[1].trim() : ''
  
  // 跳转到编辑器页面
  router.push({
    path: `/editor/${props.animation.id}`,
    query: {
      htmlCode: encodeURIComponent(htmlCode),
      cssCode: encodeURIComponent(cssCode),
      jsCode: encodeURIComponent(props.animation.jsCode || '')
    }
  })
}

defineEmits(['preview', 'download'])
</script>

<style scoped>
.animation-card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}

.animation-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.preview-wrapper {
  position: relative;
  background: var(--background);
}

.preview-area {
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.preview-wrapper:hover .preview-overlay {
  opacity: 1;
}

.preview-icon {
  color: white;
  transform: translateY(10px);
  transition: all 0.2s ease;
}

.preview-wrapper:hover .preview-icon {
  transform: translateY(0);
}

.info-area {
  padding: 20px;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  line-height: 1.4;
}

.more-btn {
  padding: 4px;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.more-btn:hover {
  background: var(--card-hover);
  color: var(--text);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.tag {
  padding: 4px 12px;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
}

.description {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.stats {
  display: flex;
  gap: 16px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--primary-light);
  border: none;
  border-radius: 10px;
  color: var(--primary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background: var(--primary);
  color: white;
}

.edit-btn:hover svg {
  stroke: white;
}
</style> 