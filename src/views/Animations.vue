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
            v-for="animation in animations" 
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
        <div v-else-if="animations.length === 0" class="empty-state">
          <div class="empty-illustration">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
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

        <!-- 分页器 -->
        <div v-if="total > 0" class="pagination">
          <button 
            class="page-btn" 
            :disabled="pageNum === 1"
            @click="handlePageChange(pageNum - 1)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <button 
            v-for="page in displayPages" 
            :key="page"
            class="page-btn"
            :class="{ active: page === pageNum }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>
          
          <button 
            class="page-btn" 
            :disabled="pageNum === totalPages"
            @click="handlePageChange(pageNum + 1)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
import { getAnimeList, deleteAnime } from '@/api/anime'
import { getAllTypes } from '@/api/type'

const route = useRoute()
const router = useRouter()

// 状态
const searchQuery = ref('')
const selectedCategories = ref([])
const duration = ref('any')
const selectedColors = ref([])
const sortBy = ref('likes')
const pageNum = ref(1)
const pageSize = ref(10)
const loading = ref(false)
const hasMore = ref(true)
const animations = ref([])
const total = ref(0)

// 分类数据
const categories = ref([])

// 获取分类列表
const fetchCategories = async () => {
  try {
    const res = await getAllTypes()
    categories.value = res.data.map(type => ({
      id: type.id,
      name: type.name,
      count: type.count || 0
    }))
  } catch (error) {
    console.error('获取分类列表失败:', error)
    categories.value = []
  }
}

// 获取动画列表
const fetchAnimations = async (isLoadMore = false) => {
  try {
    loading.value = true
    const params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      keyword: searchQuery.value || undefined,
      categoryId: selectedCategories.value[0] || undefined,
      sortBy: sortBy.value
    }
    
    const res = await getAnimeList(params)
    const list = res?.data?.records || []
    const totalCount = res?.data?.total || 0
    
    if (isLoadMore) {
      animations.value = [...(animations.value || []), ...list]
    } else {
      animations.value = list
    }
    total.value = totalCount
    hasMore.value = animations.value.length < totalCount
  } catch (error) {
    console.error('获取动画列表失败:', error)
    animations.value = []
    total.value = 0
    hasMore.value = false
  } finally {
    loading.value = false
  }
}

// 加载更多
const loadMore = () => {
  if (loading.value || !hasMore.value) return
  pageNum.value++
  fetchAnimations(true)
}

// 删除动画
const handleDelete = async (id) => {
  try {
    await deleteAnime(id)
    // 重新加载列表
    pageNum.value = 1
    fetchAnimations()
  } catch (error) {
    console.error('删除动画失败:', error)
  }
}

// 监听搜索和筛选条件变化
watch([searchQuery, selectedCategories, sortBy], () => {
  pageNum.value = 1
  fetchAnimations()
})

// 初始化加载
onMounted(async () => {
  const { q, categories, sort, page } = route.query
  if (q) searchQuery.value = q
  if (categories) selectedCategories.value = categories.split(',').map(Number)
  if (sort) sortBy.value = sort
  if (page) pageNum.value = parseInt(page)
  
  await fetchCategories()
  fetchAnimations()
})

// 监听路由参数变化
watch(
  () => route.query,
  (query) => {
    const { q, categories, sort } = query
    searchQuery.value = q || ''
    selectedCategories.value = categories ? categories.split(',').map(Number) : []
    sortBy.value = sort || 'likes'
  }
)

// 模拟数据
const popularTags = ['加载', '按钮', '图标', '转场', 'Logo']


const sortOptions = [
  { label: '最受欢迎', value: 'likes' },
  { label: '最新上传', value: 'createTime' },
  { label: '下载最多', value: 'downloads' },
  { label: '名称', value: 'name' }
]

// 计算属性
const hasActiveFilters = computed(() => {
  return selectedCategories.value.length > 0 || 
         searchQuery.value
})

const selectedCategoryNames = computed(() => {
  return selectedCategories.value.map(id => 
    categories.value.find(c => c.id === id)?.name
  )
})

const filteredAnimations = computed(() => {
  let result = animations.value || []

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(animation => 
      (animation.title || '').toLowerCase().includes(query) ||
      (animation.description || '').toLowerCase().includes(query) ||
      (animation.tags ? JSON.parse(animation.tags).some(tag => tag.toLowerCase().includes(query)) : false)
    )
  }

  // 分类过滤
  if (selectedCategories.value.length) {
    result = result.filter(animation => 
      animation && animation.categoryId && selectedCategories.value.includes(animation.categoryId)
    )
  }



const direction = sortDirection.value === 'desc' ? -1 : 1
  switch (sortBy.value) {
    case 'likes':
      result = [...result].sort((a, b) => direction * (b.likes - a.likes))
      break
    case 'createTime':
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
  pageNum.value = 1
  fetchAnimations()
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
  sortBy.value = 'likes'
  updateQueryParams()
}

const handleSort = () => {
  pageNum.value = 1
  fetchAnimations()
}

const updateQueryParams = () => {
  router.push({
    query: {
      ...(searchQuery.value && { q: searchQuery.value }),
      ...(selectedCategories.value.length && { categories: selectedCategories.value.join(',') }),
      ...(selectedColors.value.length && { colors: selectedColors.value.join(',') }),
      ...(duration.value !== 'any' && { duration: duration.value }),
      ...(sortBy.value !== 'likes' && { sort: sortBy.value }),
      ...(pageNum.value > 1 && { page: pageNum.value.toString() })
    }
  })
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

const sortDirection = ref('desc')

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  handleSort()
}

// 切换分类选择
const toggleCategory = (categoryId) => {
  const index = selectedCategories.value.indexOf(categoryId)
  if (index === -1) {
    // 单选模式：清空之前的选择
    selectedCategories.value = [categoryId]
  } else {
    // 再次点击取消选择
    selectedCategories.value.splice(index, 1)
  }
  // 更新路由参数并重新获取数据
  updateQueryParams()
}

// 计算总页数
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

// 计算要显示的页码
const displayPages = computed(() => {
  const pages = []
  const maxPages = 5 // 最多显示5个页码
  const currentPage = pageNum.value
  const total = totalPages.value

  if (total <= maxPages) {
    // 如果总页数小于等于最大显示页数，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 否则，显示当前页附近的页码
    let start = Math.max(currentPage - 2, 1)
    let end = Math.min(start + maxPages - 1, total)
    
    // 调整start，确保显示maxPages个页码
    if (end - start + 1 < maxPages) {
      start = Math.max(end - maxPages + 1, 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  return pages
})

// 处理页码变化
const handlePageChange = (page) => {
  if (page === pageNum.value) return
  pageNum.value = page
  fetchAnimations()
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 2rem;
}

.page-btn {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  background: var(--card-bg);
  color: var(--text);
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
}

.page-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 