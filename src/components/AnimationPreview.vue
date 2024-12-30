<template>
  <div 
    class="preview-modal"
    :class="{ active: modelValue }"
    @click.self="$emit('update:modelValue', false)"
  >
    <div class="preview-content">
      <!-- 顶部栏 -->
      <div class="preview-header">
        <h2>{{ animation.title }}</h2>
        <button class="close-btn" @click="$emit('update:modelValue', false)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- 预览区域 -->
      <div class="preview-area">
        <!-- 动画展示 -->
        <div 
          class="animation-display" 
          :style="{ background: currentBg }"
          v-html="animation.preview"
        ></div>
        
        <!-- 控制面板 -->
        <div class="control-panel">
          <div class="control-group">
            <label>背景色</label>
            <div class="bg-options">
              <button 
                v-for="bg in backgrounds" 
                :key="bg.value"
                class="bg-btn"
                :class="{ active: currentBg === bg.value }"
                :style="{ background: bg.value }"
                @click="currentBg = bg.value"
              ></button>
            </div>
          </div>
        </div>
      </div>

      <!-- 代码展示 -->
      <div class="code-section">
        <div class="code-header">
          <h3>动画代码</h3>
          <div class="code-actions">
            <button class="copy-btn" @click="copyCode">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              复制代码
            </button>
            <button class="download-btn" @click="downloadCode">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              下载文件
            </button>
          </div>
        </div>
        <pre class="code-block"><code>{{ formattedCode }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  animation: {
    type: Object,
    required: true
  }
})

defineEmits(['update:modelValue'])

// 背景色控制
const currentBg = ref('#ffffff')
const backgrounds = [
  { label: '白色', value: '#ffffff' },
  { label: '黑色', value: '#000000' },
  { label: '透明', value: 'transparent' }
]

// 格式化代码
const formattedCode = computed(() => {
  const { preview } = props.animation
  // 移除多余的空白行和缩进
  return preview
    .trim()
    .split('\n')
    .map(line => line.trim())
    .join('\n')
})

// 复制代码
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(formattedCode.value)
    // TODO: 显示成功提示
  } catch (err) {
    console.error('复制失败:', err)
    // TODO: 显示错误提示
  }
}

// 下载代码
const downloadCode = () => {
  const { title } = props.animation
  const fileName = `${title.toLowerCase().replace(/\s+/g, '-')}.html`
  
  // 创建完整的 HTML 文件内容
  const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body>
  ${props.animation.preview}
</body>
</html>`.trim()

  // 创建下载链接
  const blob = new Blob([htmlContent], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.preview-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}

.preview-modal.active {
  opacity: 1;
  visibility: visible;
}

.preview-content {
  background: var(--card-bg);
  border-radius: 16px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transform: translateY(20px);
  transition: transform 0.3s;
}

.preview-modal.active .preview-content {
  transform: translateY(0);
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.preview-header h2 {
  font-size: 1.5rem;
  color: var(--text);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: var(--card-hover);
  color: var(--text);
}

.preview-area {
  padding: 2rem;
  border-bottom: 1px solid var(--border);
}

.animation-display {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.control-panel {
  display: grid;
  gap: 1.5rem;
}

.control-group {
  display: grid;
  gap: 0.75rem;
}

.control-group label {
  color: var(--text);
  font-weight: 500;
}

.bg-options {
  display: flex;
  gap: 1rem;
}

.bg-btn {
  width: 32px;
  height: 32px;
  border: 2px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.bg-btn:hover,
.bg-btn.active {
  border-color: var(--primary);
  transform: scale(1.1);
}

.code-section {
  padding: 1.5rem;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.code-header h3 {
  font-size: 1.1rem;
  color: var(--text);
  margin: 0;
}

.code-actions {
  display: flex;
  gap: 1rem;
}

.copy-btn,
.download-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text);
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover,
.download-btn:hover {
  border-color: var(--primary);
  background: var(--card-hover);
}

.code-block {
  background: var(--code-bg);
  border-radius: 8px;
  padding: 1rem;
  margin: 0;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--code-text);
}

@media (max-width: 768px) {
  .preview-content {
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    border-radius: 0;
  }

  .preview-area {
    padding: 1rem;
  }

  .control-panel {
    gap: 1rem;
  }

  .code-actions {
    flex-direction: column;
  }
}
</style> 