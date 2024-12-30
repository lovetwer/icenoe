<template>
  <div class="animation-card">
    <!-- 预览区域 -->
    <div class="preview-area" v-html="animation.preview"></div>
    
    <!-- 信息区域 -->
    <div class="info-area">
      <h3 class="title">{{ animation.title }}</h3>
      <p class="description">{{ animation.description }}</p>
      
      <!-- 标签 -->
      <div class="tags">
        <span 
          v-for="tag in animation.tags" 
          :key="tag" 
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
      
      <!-- 统计信息 -->
      <div class="stats">
        <div class="stat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>{{ animation.likes }}</span>
        </div>
        <div class="stat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ animation.downloads }}</span>
        </div>
        <div class="stat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ animation.duration }}s</span>
        </div>
      </div>

      <!-- 作者信息 -->
      <div class="author">
        <div class="author-avatar">
          {{ animation.author.charAt(0) }}
        </div>
        <span class="author-name">{{ animation.author }}</span>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="actions">
      <button class="preview-btn" @click="$emit('preview', animation)">
        预览
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M15 12H3M15 12L11 16M15 12L11 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="edit-btn" @click="$router.push(`/editor?id=${animation.id}`)">
        编辑
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  animation: {
    type: Object,
    required: true
  }
})

defineEmits(['preview', 'download'])
</script>

<style scoped>
.animation-card {
  background: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border);
  transition: all 0.3s;
}

.animation-card:hover {
  border-color: var(--primary);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.preview-area {
  aspect-ratio: 16/9;
  background: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
}

.info-area {
  padding: 1.5rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 6px;
  font-size: 0.8rem;
}

.stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.stat svg {
  opacity: 0.7;
}

.author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.author-name {
  color: var(--text);
  font-size: 0.9rem;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
}

.preview-btn,
.edit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border: none;
  background: var(--card-bg);
  color: var(--text);
  cursor: pointer;
  transition: all 0.2s;
}

.preview-btn:hover,
.edit-btn:hover {
  background: var(--card-hover);
}

.edit-btn {
  color: var(--primary);
}

.edit-btn svg {
  stroke: var(--primary);
}
</style> 