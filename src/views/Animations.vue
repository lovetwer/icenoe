<template>
  <div class="animations-page">
    <!-- 顶部搜索区 -->
    <div class="search-section">
      <div class="search-container">
        <div class="search-box">
          <i class="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索动画..."
            @input="handleSearch"
          >
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 侧边栏过滤器 -->
      <aside class="filters-sidebar">
        <div class="filter-section">
          <h3>分类</h3>
          <div class="filter-options">
            <button 
              v-for="category in categories" 
              :key="category.id"
              class="category-btn"
              :class="{ active: selectedCategories.includes(category.id) }"
              @click="toggleCategory(category.id)"
            >
              <span class="category-icon">{{ category.icon }}</span>
              <span class="category-name">{{ category.name }}</span>
              <span class="category-count">{{ category.count }}</span>
            </button>
          </div>
        </div>

        <div class="filter-section">
          <h3>动画时长</h3>
          <div class="duration-slider">
            <input 
              type="range" 
              v-model="duration" 
              min="0" 
              max="10" 
              step="0.5"
              class="slider"
            >
            <div class="duration-value">{{ duration }}s</div>
          </div>
        </div>

        <div class="filter-section">
          <h3>颜色</h3>
          <div class="color-filters">
            <button 
              v-for="color in colors" 
              :key="color.value"
              class="color-btn"
              :style="{ 
                backgroundColor: color.value,
                boxShadow: selectedColors.includes(color.value) ? 
                  `0 0 0 2px white, 0 0 0 4px ${color.value}` : 'none'
              }"
              @click="toggleColor(color.value)"
            >
              <span v-if="selectedColors.includes(color.value)" class="check-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div class="filter-section">
          <div class="sort-header">
            <h3>排序</h3>
            <button 
              class="sort-direction"
              @click="toggleSortDirection"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" :class="{ 'desc': sortDirection === 'desc' }">
                <path d="M12 5L12 19M12 5L7 10M12 5L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="sort-options">
            <button 
              v-for="option in sortOptions" 
              :key="option.value"
              class="sort-btn"
              :class="{ active: sortBy === option.value }"
              @click="sortBy = option.value"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </aside>

      <!-- 动画网格 -->
      <div class="animations-content">
        <!-- 活跃过滤器标签 -->
        <div class="active-filters" v-if="hasActiveFilters">
          <div class="filter-tags">
            <div 
              v-for="(category, index) in selectedCategoryNames" 
              :key="'cat-' + index"
              class="filter-tag"
            >
              <span class="tag-text">{{ category }}</span>
              <button @click="removeCategory(category)" class="remove-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
          <button @click="clearFilters" class="clear-filters">
            清除全部
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- 动画卡片网格 -->
        <div class="animations-grid">
          <div 
            v-for="animation in filteredAnimations" 
            :key="animation.id"
            class="animation-card-wrapper"
          >
            <animation-card
              :animation="animation"
              @preview="previewAnimation"
              @download="downloadAnimation"
            />
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <circle class="spinner-head" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="62.83" stroke-dashoffset="62.83"/>
            </svg>
          </div>
          <p>加载中...</p>
        </div>

        <!-- 空状态 -->
        <div v-else-if="filteredAnimations.length === 0" class="empty-state">
          <div class="empty-illustration">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <!-- 添加一个简单的空状态插图 -->
              <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <h3>未找到相关动画</h3>
          <p>试试其他搜索条件</p>
          <button @click="clearFilters" class="retry-btn">
            清除过滤器
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 8L16 12M16 12L12 16M16 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- 加载更多 -->
        <div v-if="hasMore && !loading" class="load-more">
          <button @click="loadMore" class="load-more-btn">
            <span>加载更多</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5L12 19M12 19L7 14M12 19L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 预览弹窗 -->
    <animation-preview
      v-if="currentAnimation"
      v-model="showPreview"
      :animation="currentAnimation"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AnimationCard from '@/components/AnimationCard.vue'
import AnimationPreview from '@/components/AnimationPreview.vue'

const route = useRoute()
const router = useRouter()

// 状态
const searchQuery = ref('')
const selectedCategories = ref([])
const duration = ref('any')
const selectedColors = ref([])
const sortBy = ref('popular')
const page = ref(1)
const loading = ref(false)
const hasMore = ref(true)

// 模拟数据
const popularTags = ['加载', '按钮', '图标', '转场', 'Logo']

const categories = ref([
  { id: 1, name: '加载动画', count: 128 },
  { id: 2, name: '按钮动画', count: 86 },
  { id: 3, name: '图标动画', count: 245 },
  { id: 4, name: '转场动画', count: 94 },
  { id: 5, name: '背景动画', count: 67 }
])

const colors = [
  { name: '蓝色', value: '#2196F3' },
  { name: '红色', value: '#F44336' },
  { name: '绿色', value: '#4CAF50' },
  { name: '黄色', value: '#FFC107' },
  { name: '紫色', value: '#9C27B0' },
  { name: '粉色', value: '#E91E63' }
]

const animations = ref([
  {
    id: 1,
    title: '加载动画1',
    description: '简洁的圆形加载动画',
    categoryId: 1,
    author: 'Animation Hub',
    likes: 128,
    downloads: 1200,
    createdAt: '2024-01-15',
    duration: 2,
    colors: ['#2196F3'],
    tags: ['加载', '圆形', '简约'],
    preview: `
      <div class="loading-animation">
        <div class="circle"></div>
      </div>
      <style>
        .loading-animation {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .circle {
          width: 40px;
          height: 40px;
          border: 3px solid var(--primary);
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `
  },
  {
    id: 2,
    title: '按钮悬浮效果',
    description: '渐变背景的按钮悬浮动画',
    categoryId: 2,
    author: 'Animation Hub',
    likes: 256,
    downloads: 1800,
    createdAt: '2024-01-16',
    duration: 0.3,
    colors: ['#F44336', '#FF9800'],
    tags: ['按钮', '悬浮', '渐变'],
    preview: `
      <button class="hover-btn">悬浮效果</button>
      <style>
        .hover-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(45deg, #F44336, #FF9800);
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .hover-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
      </style>
    `
  },
  {
    id: 3,
    title: '页面切换效果',
    description: '平滑的页面过渡动画',
    categoryId: 3,
    author: 'Animation Hub',
    likes: 189,
    downloads: 950,
    createdAt: '2024-01-17',
    duration: 0.5,
    colors: ['#4CAF50'],
    tags: ['过渡', '切换', '平滑'],
    preview: `
      <div class="page-transition">
        <div class="page"></div>
      </div>
      <style>
        .page-transition {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }
        .page {
          position: absolute;
          inset: 0;
          background: var(--primary);
          animation: slide-in 2s infinite;
        }
        @keyframes slide-in {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      </style>
    `
  },
  {
    id: 4,
    title: '图标动效',
    description: '生动的SVG图标动画',
    categoryId: 4,
    author: 'Animation Hub',
    likes: 167,
    downloads: 780,
    createdAt: '2024-01-18',
    duration: 1,
    colors: ['#9C27B0'],
    tags: ['图标', 'SVG', '动效'],
    preview: `
      <div class="icon-animation">
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path class="heart" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <style>
        .icon-animation {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .heart {
          fill: var(--primary);
          animation: pulse 1s ease infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      </style>
    `
  },
  {
    id: 5,
    title: '波浪加载',
    description: '流畅的波浪形加载动画',
    categoryId: 1,
    author: 'Animation Hub',
    likes: 324,
    downloads: 1560,
    createdAt: '2024-01-19',
    duration: 1.5,
    colors: ['#2196F3'],
    tags: ['加载', '波浪', '流畅'],
    preview: `
      <div class="wave-loading">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
      <style>
        .wave-loading {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 100%;
        }
        .wave {
          width: 4px;
          height: 32px;
          background: var(--primary);
          animation: wave 1s ease-in-out infinite;
        }
        .wave:nth-child(2) { animation-delay: 0.1s; }
        .wave:nth-child(3) { animation-delay: 0.2s; }
        .wave:nth-child(4) { animation-delay: 0.3s; }
        .wave:nth-child(5) { animation-delay: 0.4s; }
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2); }
        }
      </style>
    `
  },
  {
    id: 6,
    title: '霓虹按钮',
    description: '炫酷的霓虹灯效果按钮',
    categoryId: 2,
    author: 'Animation Hub',
    likes: 428,
    downloads: 2100,
    createdAt: '2024-01-20',
    duration: 0.8,
    colors: ['#FF1CF7', '#00F0FF'],
    tags: ['按钮', '霓虹', '发光'],
    preview: `
      <button class="neon-btn">霓虹按钮</button>
      <style>
        .neon-btn {
          padding: 12px 24px;
          font-size: 16px;
          color: #FF1CF7;
          background: transparent;
          border: 2px solid #FF1CF7;
          border-radius: 8px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          text-shadow: 0 0 8px #FF1CF7;
          box-shadow: 0 0 16px rgba(255,28,247,0.3);
        }
        .neon-btn:hover {
          background: #FF1CF7;
          color: white;
          box-shadow: 0 0 24px #FF1CF7;
        }
        .neon-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,28,247,0.4),
            transparent
          );
          transition: 0.5s;
        }
        .neon-btn:hover::before {
          left: 100%;
        }
      </style>
    `
  },
  {
    id: 7,
    title: '3D卡片翻转',
    description: '平滑的3D卡片翻转效果',
    categoryId: 3,
    author: 'Animation Hub',
    likes: 356,
    downloads: 1680,
    createdAt: '2024-01-21',
    duration: 0.6,
    colors: ['#4CAF50', '#8BC34A'],
    tags: ['卡片', '3D', '翻转'],
    preview: `
      <div class="flip-card-container">
        <div class="flip-card">
          <div class="flip-card-front">正面</div>
          <div class="flip-card-back">背面</div>
        </div>
      </div>
      <style>
        .flip-card-container {
          perspective: 1000px;
          width: 200px;
          height: 120px;
        }
        .flip-card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: flip 3s infinite;
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          border-radius: 8px;
        }
        .flip-card-front {
          background: var(--primary);
          color: white;
        }
        .flip-card-back {
          background: var(--primary-light);
          color: var(--primary);
          transform: rotateY(180deg);
        }
        @keyframes flip {
          0%, 45% { transform: rotateY(0); }
          50%, 95% { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }
      </style>
    `
  },
  {
    id: 8,
    title: '脉冲图标',
    description: '带有脉冲效果的图标动画',
    categoryId: 4,
    author: 'Animation Hub',
    likes: 289,
    downloads: 1420,
    createdAt: '2024-01-22',
    duration: 1.5,
    colors: ['#FF5722'],
    tags: ['图标', '脉冲', '闪烁'],
    preview: `
      <div class="pulse-icon">
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path class="bell" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <div class="pulse"></div>
      </div>
      <style>
        .pulse-icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .bell {
          fill: none;
          stroke: var(--primary);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          animation: shake 1.5s ease-in-out infinite;
        }
        .pulse {
          position: absolute;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--primary);
          opacity: 0;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes shake {
          0%, 100% { transform: rotate(0); }
          20%, 60% { transform: rotate(8deg); }
          40%, 80% { transform: rotate(-8deg); }
        }
        @keyframes pulse {
          0% { transform: scale(0.5); opacity: 0.4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      </style>
    `
  },
  {
    id: 9,
    title: '粒子文字',
    description: '炫酷的粒子文字动画效果',
    categoryId: 5,
    author: 'Animation Hub',
    likes: 512,
    downloads: 2400,
    createdAt: '2024-01-23',
    duration: 2,
    colors: ['#9C27B0', '#E91E63'],
    tags: ['文字', '粒子', '特效'],
    preview: `
      <div class="particle-text">
        <span>H</span>
        <span>E</span>
        <span>L</span>
        <span>L</span>
        <span>O</span>
      </div>
      <style>
        .particle-text {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 4px;
        }
        .particle-text span {
          font-size: 32px;
          font-weight: bold;
          color: var(--primary);
          animation: float 2s ease-in-out infinite;
          text-shadow: 0 0 8px var(--primary);
        }
        .particle-text span:nth-child(2) { animation-delay: 0.2s; }
        .particle-text span:nth-child(3) { animation-delay: 0.4s; }
        .particle-text span:nth-child(4) { animation-delay: 0.6s; }
        .particle-text span:nth-child(5) { animation-delay: 0.8s; }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
      </style>
    `
  },
  {
    id: 10,
    title: '动态边框',
    description: '流动的渐变边框效果',
    categoryId: 2,
    author: 'Animation Hub',
    likes: 378,
    downloads: 1840,
    createdAt: '2024-01-24',
    duration: 2,
    colors: ['#FF9800', '#F44336', '#2196F3'],
    tags: ['边框', '渐变', '流动'],
    preview: `
      <div class="gradient-border">
        <div class="content">动态边框</div>
      </div>
      <style>
        .gradient-border {
          position: relative;
          width: 200px;
          height: 100px;
          border-radius: 10px;
          overflow: hidden;
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: -5px;
          background: linear-gradient(90deg, #FF9800, #F44336, #2196F3, #FF9800);
          background-size: 400% 400%;
          animation: gradient 2s linear infinite;
        }
        .content {
          position: absolute;
          inset: 2px;
          background: var(--card-bg);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text);
          font-weight: 500;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 400% 50%; }
        }
      </style>
    `
  }
])

const sortOptions = [
  { label: '最受欢迎', value: 'popular' },
  { label: '最新上传', value: 'newest' },
  { label: '下载最多', value: 'downloads' },
  { label: '名称', value: 'name' }
]

// 计算属性
const hasActiveFilters = computed(() => {
  return selectedCategories.value.length > 0 || 
         selectedColors.value.length > 0 || 
         duration.value !== 'any' ||
         searchQuery.value
})

const selectedCategoryNames = computed(() => {
  return selectedCategories.value.map(id => 
    categories.value.find(c => c.id === id)?.name
  )
})

const filteredAnimations = computed(() => {
  let result = animations.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(animation => 
      animation.title.toLowerCase().includes(query) ||
      animation.description.toLowerCase().includes(query) ||
      animation.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 分类过滤
  if (selectedCategories.value.length) {
    result = result.filter(animation => 
      selectedCategories.value.includes(animation.categoryId)
    )
  }

  // 时长过滤
  if (duration.value !== 'any') {
    result = result.filter(animation => 
      animation.duration <= Number(duration.value)
    )
  }

  // 颜色过滤
  if (selectedColors.value.length) {
    result = result.filter(animation => 
      animation.colors.some(color => 
        selectedColors.value.includes(color)
      )
    )
  }

  // 排序
  const direction = sortDirection.value === 'desc' ? -1 : 1
  switch (sortBy.value) {
    case 'popular':
      result = [...result].sort((a, b) => direction * (b.likes - a.likes))
      break
    case 'newest':
      result = [...result].sort((a, b) => direction * (new Date(b.createdAt) - new Date(a.createdAt)))
      break
    case 'downloads':
      result = [...result].sort((a, b) => direction * (b.downloads - a.downloads))
      break
    case 'name':
      result = [...result].sort((a, b) => direction * a.title.localeCompare(b.title))
      break
  }

  return result
})

// 方法
const handleSearch = () => {
  page.value = 1
  updateQueryParams()
}

const addSearchTag = (tag) => {
  searchQuery.value = tag
  handleSearch()
}

const toggleColor = (color) => {
  const index = selectedColors.value.indexOf(color)
  if (index === -1) {
    selectedColors.value.push(color)
  } else {
    selectedColors.value.splice(index, 1)
  }
  updateQueryParams()
}

const removeCategory = (categoryName) => {
  const category = categories.value.find(c => c.name === categoryName)
  if (category) {
    const index = selectedCategories.value.indexOf(category.id)
    if (index !== -1) {
      selectedCategories.value.splice(index, 1)
      updateQueryParams()
    }
  }
}

const removeColor = (color) => {
  const index = selectedColors.value.indexOf(color)
  if (index !== -1) {
    selectedColors.value.splice(index, 1)
    updateQueryParams()
  }
}

const getColorName = (colorValue) => {
  return colors.find(c => c.value === colorValue)?.name || colorValue
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedColors.value = []
  duration.value = 'any'
  sortBy.value = 'popular'
  updateQueryParams()
}

const handleSort = () => {
  page.value = 1
  updateQueryParams()
}

const updateQueryParams = () => {
  router.push({
    query: {
      ...(searchQuery.value && { q: searchQuery.value }),
      ...(selectedCategories.value.length && { categories: selectedCategories.value.join(',') }),
      ...(selectedColors.value.length && { colors: selectedColors.value.join(',') }),
      ...(duration.value !== 'any' && { duration: duration.value }),
      ...(sortBy.value !== 'popular' && { sort: sortBy.value })
    }
  })
}

const loadMore = async () => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  try {
    page.value++
    // TODO: 从 API 加载更多动画
    // const newAnimations = await loadAnimations(page.value)
    // animations.value.push(...newAnimations)
    // hasMore.value = newAnimations.length === pageSize
  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    loading.value = false
  }
}

const viewAnimation = (animation) => {
  // TODO: 实现动画详情查看功能
  console.log('查看动画:', animation)
}

// 预览状态
const showPreview = ref(false)
const currentAnimation = ref(null)

// 预览动画
const previewAnimation = (animation) => {
  currentAnimation.value = animation
  showPreview.value = true
}

// 下载动画
const downloadAnimation = (animation) => {
  const { title } = animation
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
  ${animation.preview}
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

// 初始化：从 URL 参数恢复状态
onMounted(() => {
  const { q, categories, colors, duration: d, sort } = route.query
  if (q) searchQuery.value = q
  if (categories) selectedCategories.value = categories.split(',').map(Number)
  if (colors) selectedColors.value = colors.split(',')
  if (d) duration.value = d
  if (sort) sortBy.value = sort
})

// 监听路由参数变化
watch(
  () => route.query,
  (query) => {
    const { q, categories, colors, duration: d, sort } = query
    searchQuery.value = q || ''
    selectedCategories.value = categories ? categories.split(',').map(Number) : []
    selectedColors.value = colors ? colors.split(',') : []
    duration.value = d || 'any'
    sortBy.value = sort || 'popular'
  }
)

const sortDirection = ref('desc')

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  handleSort()
}
</script>

<style scoped>
.animations-page {
  min-height: 100vh;
  background: var(--background);
  padding-top: 64px;
}

.search-section {
  position: sticky;
  top: 64px;
  z-index: 90;
  padding: 1rem 2rem;
  background: var(--background);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.search-container {
  max-width: 800px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  align-items: center;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  transition: all 0.3s;
}

.search-box:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-shadow);
}

.search-icon {
  color: var(--text-secondary);
  margin-right: 0.75rem;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--text);
  background: transparent;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
}

.filters-sidebar {
  position: sticky;
  top: calc(64px + 80px);
  height: calc(100vh - 64px - 80px);
  overflow-y: auto;
  padding-right: 1rem;
}

.filter-section {
  margin-bottom: 2.5rem;
}

.filter-section h3 {
  font-size: 1.1rem;
  color: var(--text);
  margin-bottom: 1rem;
  font-weight: 600;
}

.filter-options {
  display: grid;
  gap: 0.75rem;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  cursor: pointer;
  transition: all 0.3s;
}

.category-btn:hover {
  border-color: var(--primary);
  background: var(--card-hover);
}

.category-btn.active {
  background: var(--primary-light);
  border-color: var(--primary);
  color: var(--primary);
}

.category-icon {
  font-size: 1.25rem;
}

.category-name {
  flex: 1;
  text-align: left;
}

.category-count {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.duration-slider {
  padding: 0 0.5rem;
}

.slider {
  width: 100%;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: var(--primary);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.duration-value {
  text-align: center;
  margin-top: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.color-filters {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.color-btn {
  aspect-ratio: 1;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.color-btn:hover {
  transform: scale(1.1);
}

.check-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sort-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.sort-direction {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s;
}

.sort-direction:hover {
  background: var(--card-hover);
  color: var(--text);
}

.sort-direction svg.desc {
  transform: rotate(180deg);
}

.sort-options {
  display: grid;
  gap: 0.75rem;
}

.sort-btn {
  padding: 0.75rem 1rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.sort-btn:hover {
  border-color: var(--primary);
  background: var(--card-hover);
}

.sort-btn.active {
  background: var(--primary-light);
  border-color: var(--primary);
  color: var(--primary);
}

.active-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--card-bg);
  border-radius: 10px;
  color: var(--text);
  font-size: 0.9rem;
  border: 1px solid var(--border);
}

.remove-tag {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
}

.remove-tag:hover {
  background: var(--card-hover);
  color: var(--text);
}

.clear-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.clear-filters:hover {
  background: var(--primary-light);
}

.animations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.animation-card-wrapper {
  transition: all 0.3s;
}

.animation-card-wrapper:hover {
  transform: translateY(-4px);
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.loading-spinner {
  margin: 0 auto 1rem;
}

.spinner-track {
  opacity: 0.2;
}

.spinner-head {
  animation: spin 1s linear infinite;
  transform-origin: center;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-illustration {
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
}

.empty-state h3 {
  color: var(--text);
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.empty-state p {
  margin-bottom: 1.5rem;
}

.retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
}

.retry-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.load-more {
  text-align: center;
  margin-top: 4rem;
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
}

.load-more-btn:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 240px 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .search-section {
    padding: 1rem;
  }

  .main-content {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .filters-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: var(--background);
    z-index: 100;
    padding: 1rem;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .filters-sidebar.active {
    transform: translateX(0);
  }

  .animations-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style> 