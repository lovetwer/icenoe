<template>
  <div class="editor-page">
    <div class="editor-main">
      <div class="code-editor">
        <div class="editor-tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            class="tab-btn"
            :class="{ active: currentTab === tab.id }"
            @click="currentTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
        
        <div class="editor-content">
          <textarea
            v-if="currentTab === 'html'"
            v-model="htmlCode"
            class="code-textarea"
            placeholder="输入 HTML 代码..."
            @input="updatePreview"
          ></textarea>
          
          <textarea
            v-if="currentTab === 'css'"
            v-model="cssCode"
            class="code-textarea"
            placeholder="输入 CSS 代码..."
            @input="updatePreview"
          ></textarea>
          
          <textarea
            v-if="currentTab === 'js'"
            v-model="jsCode"
            class="code-textarea"
            placeholder="输入 JavaScript 代码..."
            @input="updatePreview"
          ></textarea>
        </div>
      </div>

      <div class="preview-panel">
        <div class="preview-header">
          <h3>预览效果</h3>
          <button class="run-btn" @click="updatePreview">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 3l14 9-14 9V3z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            运行
          </button>
        </div>
        <div class="preview-container">
          <iframe
            ref="previewFrame"
            class="preview-frame"
            sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms"
            allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentTab = ref('html')
const previewFrame = ref(null)

const htmlCode = ref('')
const cssCode = ref('')
const jsCode = ref('')

const tabs = [
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'js', name: 'JavaScript' }
]

const updatePreview = () => {
  if (!previewFrame.value) return

  const html = htmlCode.value || ''
  const css = cssCode.value || ''
  const js = jsCode.value || ''

  const content = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>:root{--primary:#42b883;--primary-hover:#3aa876}body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:transparent}' + css + '</style></head><body>' + html + '<script>' + js + '</body></html>'

  previewFrame.value.srcdoc = content
}

const loadAnimation = async (id) => {
  if (!id) return
  
  try {
    const animations = {
      '1': {
        html: '<div class="loading"></div>',
        css: `.loading {
  width: 40px;
  height: 40px;
  border: 3px solid var(--primary);
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}`,
        js: '// Loading animation'
      },
      '2': {
        html: '<button class="neon-btn">Hover Me</button>',
        css: `.neon-btn {
  padding: 1rem 3rem;
  border: none;
  border-radius: 8px;
  background: var(--primary);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.neon-btn::after {
  content: '';
  position: absolute;
  inset: -5px;
  background: var(--primary);
  filter: blur(20px);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s;
}

.neon-btn:hover::after {
  opacity: 0.7;
}`,
        js: '// Neon button effect'
      }
    }
    
    const animation = animations[id]
    if (animation) {
      htmlCode.value = animation.html
      cssCode.value = animation.css
      jsCode.value = animation.js
      updatePreview()
    }
  } catch (error) {
    console.error('Failed to load animation:', error)
  }
}

onMounted(() => {
  const animationId = route.query.id
  if (animationId) {
    loadAnimation(animationId)
  } else {
    // 设置默认动画
    htmlCode.value = '<div class="pulse-circle"></div>'
    cssCode.value = `.pulse-circle {
  width: 60px;
  height: 60px;
  background: var(--primary);
  border-radius: 50%;
  position: relative;
}

.pulse-circle::before,
.pulse-circle::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--primary);
  opacity: 0.7;
  animation: pulse 2s ease-out infinite;
}

.pulse-circle::after {
  animation-delay: 1s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}`
    jsCode.value = '// 脉冲动画效果'
    updatePreview()
  }
})
</script>

<style scoped>
.editor-page {
  height: calc(100vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  background: var(--background);
  padding: 1.5rem;
}

.editor-main {
  flex: 1;
  display: flex;
  overflow: hidden;
  background: var(--card-bg);
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.code-editor {
  width: 50%;
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  border-right: 1px solid var(--border);
}

.editor-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: var(--background);
  border-bottom: 1px solid var(--border);
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: var(--card-hover);
  color: var(--text);
}

.tab-btn.active {
  background: var(--primary-light);
  color: var(--primary);
  border-color: var(--primary);
}

.editor-content {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.code-textarea {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  border: none;
  background: var(--card-bg);
  color: var(--text);
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  tab-size: 2;
  letter-spacing: 0.3px;
}

.code-textarea:focus {
  outline: none;
}

.code-textarea::placeholder {
  color: var(--text-secondary);
  opacity: 0.5;
}

.preview-panel {
  width: 50%;
  background: var(--card-bg);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border);
  background: var(--background);
  position: relative;
  z-index: 1;
}

.preview-header h3 {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text);
  margin: 0;
}

.run-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary);
  border-radius: 6px;
  background: var(--primary);
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.run-btn:hover {
  background: var(--primary-hover);
}

.run-btn svg {
  width: 14px;
  height: 14px;
}

.preview-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  background: repeating-linear-gradient(
    45deg,
    var(--background) 0px,
    var(--background) 10px,
    var(--card-bg) 10px,
    var(--card-bg) 20px
  );
}

.preview-frame {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .editor-page {
    padding: 1rem;
  }

  .editor-main {
    flex-direction: column;
    border-radius: 12px;
  }
  
  .code-editor {
    width: 100%;
    border-right: none;
  }

  .preview-panel {
    width: 100%;
    height: 40%;
    border-top: 1px solid var(--border);
  }

  .preview-container {
    padding: 1rem;
  }
}
</style> 