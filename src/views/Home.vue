<template>
  <div class="home-page">
    <!-- 背景特效 -->
    <div class="background-effects">
      <div class="gradient-bg"></div>
      <div class="particles">
        <div v-for="n in 20" :key="n" 
          class="particle"
          :style="{
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`,
            '--duration': `${10 + Math.random() * 20}s`,
            '--delay': `${Math.random() * -20}s`,
            '--size': `${4 + Math.random() * 6}px`,
            '--rotation': `${Math.random() * 360}deg`
          }"
        ></div>
      </div>
    </div>

    <!-- 顶部横幅 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="title">
          <span class="gradient-text">ice</span>
          <span class="highlight">noe</span>
        </h1>
        <p class="subtitle">优雅的界面动效解决方案</p>
        <div class="hero-buttons">
          <router-link to="/animations" class="primary-btn">
            浏览动画库
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <router-link to="/editor" class="secondary-btn">
            上传动画
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
      </div>

      <!-- 动画展示区 -->
      <div class="hero-animations">
        <!-- DNA螺旋动画 -->
        <div class="animation-item dna-animation">
          <div class="dna-helix">
            <div v-for="n in 10" :key="n" class="dna-pair">
              <div class="dna-dot left"></div>
              <div class="dna-line"></div>
              <div class="dna-dot right"></div>
            </div>
          </div>
        </div>

        <!-- 神经网络动画 -->
        <div class="animation-item neural-animation">
          <div class="neural-network">
            <div v-for="n in 15" :key="n" 
              class="neuron"
              :style="{
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--delay': `${Math.random() * 2}s`
              }"
            >
              <div class="neuron-core"></div>
              <div class="neuron-pulse"></div>
            </div>
            <div v-for="n in 20" :key="`line-${n}`" 
              class="neural-line"
              :style="{
                '--rotation': `${Math.random() * 360}deg`,
                '--delay': `${Math.random() * 2}s`
              }"
            ></div>
          </div>
        </div>

        <!-- 魔法水晶动画 -->
        <div class="animation-item crystal-animation">
          <div class="crystal-container">
            <div class="crystal-core">
              <div class="core-glow"></div>
              <div v-for="n in 6" :key="n" 
                class="crystal-face"
                :style="{
                  '--rotation': `${n * 60}deg`,
                  '--delay': `${n * 0.2}s`
                }"
              >
                <div class="crystal-edge"></div>
              </div>
            </div>
            <div class="crystal-aura">
              <div v-for="n in 3" :key="n" 
                class="aura-ring"
                :style="{
                  '--scale': `${1 + n * 0.2}`,
                  '--rotation': `${n * 120}deg`
                }"
              ></div>
            </div>
            <div class="crystal-particles">
              <div v-for="n in 12" :key="n"
                class="crystal-spark"
                :style="{
                  '--angle': `${n * 30}deg`,
                  '--delay': `${n * 0.1}s`,
                  '--distance': `${40 + Math.random() * 20}px`
                }"
              ></div>
            </div>
          </div>
        </div>

        <!-- 等离子体动画 -->
        <div class="animation-item plasma-animation">
          <div class="plasma-container">
            <div class="plasma-core">
              <div class="core-sphere"></div>
              <div v-for="n in 4" :key="n" 
                class="plasma-arc"
                :style="{
                  '--rotation': `${n * 90}deg`,
                  '--delay': `${n * 0.25}s`
                }"
              >
                <div class="arc-path"></div>
              </div>
            </div>
            <div class="plasma-field">
              <div v-for="n in 3" :key="n" 
                class="field-layer"
                :style="{
                  '--scale': `${1 + n * 0.3}`,
                  '--opacity': `${0.8 - n * 0.2}`
                }"
              ></div>
            </div>
            <div class="plasma-particles">
              <div v-for="n in 20" :key="n"
                class="plasma-particle"
                :style="{
                  '--size': `${2 + Math.random() * 3}px`,
                  '--distance': `${30 + Math.random() * 40}px`,
                  '--angle': `${Math.random() * 360}deg`,
                  '--delay': `${Math.random() * 2}s`
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 特性介绍 -->
    <div class="features-section">
      <h2 class="section-title">
        <span class="title-decoration"></span>
        为什么选择 icenoe？
        <span class="title-decoration"></span>
      </h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-content">
            <div class="feature-icon">
              <div class="icon-bg"></div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M15 6v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2zM21 8h-4M21 12h-4M21 16h-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>丰富的动画库</h3>
            <p>提供大量精选的动画效果，涵盖加载、按钮、图标等多个类别</p>
            <div class="feature-stats">
              <div class="stat">
                <span class="stat-value">1000+</span>
                <span class="stat-label">动画模板</span>
              </div>
              <div class="stat">
                <span class="stat-value">20+</span>
                <span class="stat-label">分类</span>
              </div>
            </div>
          </div>
          <div class="feature-decoration">
            <div class="decoration-line"></div>
            <div class="decoration-dot"></div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-content">
            <div class="feature-icon">
              <div class="icon-bg"></div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 15l-3-3m0 0l3-3m-3 3h12M4 4v16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>一键复制使用</h3>
            <p>支持一键复制代码，快速集成到您的项目中</p>
            <div class="feature-demo">
              <div class="code-block">
                <span class="code-line">animation: bounce 1s;</span>
                <button class="copy-btn">复制</button>
              </div>
            </div>
          </div>
          <div class="feature-decoration">
            <div class="decoration-line"></div>
            <div class="decoration-dot"></div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-content">
            <div class="feature-icon">
              <div class="icon-bg"></div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>实时预览</h3>
            <p>支持动画实时预览和参数调整，所见即所得</p>
            <div class="feature-preview">
              <div class="preview-slider">
                <input type="range" min="0" max="100" value="50" class="slider">
                <div class="preview-animation"></div>
              </div>
            </div>
          </div>
          <div class="feature-decoration">
            <div class="decoration-line"></div>
            <div class="decoration-dot"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3D展示区 -->
    <div class="perspective-section">
      <div class="perspective-container">
        <h2 class="section-title">
          <span class="title-glow">探索</span>
          无限可能
        </h2>
        <div class="cube-container">
          <div class="cube">
            <div class="cube-face front">
              <div class="cube-content">
                <div class="animation-preview">
                  <div class="ripple-effect"></div>
                </div>
              </div>
            </div>
            <div class="cube-face back">
              <div class="cube-content">
                <div class="animation-preview">
                  <div class="pulse-rings"></div>
                </div>
              </div>
            </div>
            <div class="cube-face right">
              <div class="cube-content">
                <div class="animation-preview">
                  <div class="floating-particles"></div>
                </div>
              </div>
            </div>
            <div class="cube-face left">
              <div class="cube-content">
                <div class="animation-preview">
                  <div class="morphing-shape"></div>
                </div>
              </div>
            </div>
            <div class="cube-face top">
              <div class="cube-content">
                <div class="animation-preview">
                  <div class="glowing-lines"></div>
                </div>
              </div>
            </div>
            <div class="cube-face bottom">
              <div class="cube-content">
                <div class="animation-preview">
                  <div class="energy-field"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="perspective-controls">
          <button class="control-btn" @click="rotateCube('left')">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="control-btn" @click="rotateCube('right')">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 交互式动画墙 -->
    <div class="interactive-wall">
      <div class="wall-grid">
        <div v-for="n in 16" :key="n" 
          class="wall-cell"
          :style="{
            '--delay': `${Math.random() * 2}s`,
            '--duration': `${2 + Math.random() * 2}s`
          }"
          @mouseover="activateCell"
          @mouseleave="deactivateCell"
        >
          <div class="cell-content">
            <div class="cell-effect"></div>
          </div>
        </div>
      </div>
      <div class="wall-overlay">
        <h2>动画交互体验</h2>
        <p>探索鼠标悬停效果</p>
      </div>
    </div>

    <!-- 使用统计 -->
    <div class="stats-section">
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">1000+</div>
            <div class="stat-label">动画模板</div>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">5000+</div>
            <div class="stat-label">活跃用户</div>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">98%</div>
            <div class="stat-label">好评率</div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Footer from '@/components/Footer.vue'

const cubeRotation = ref({ x: -20, y: 45 })

const rotateCube = (direction) => {
  if (direction === 'left') {
    cubeRotation.value.y -= 90
  } else {
    cubeRotation.value.y += 90
  }
  document.querySelector('.cube').style.transform = 
    `rotateX(${cubeRotation.value.x}deg) rotateY(${cubeRotation.value.y}deg)`
}

const activateCell = (event) => {
  const cell = event.currentTarget
  const rect = cell.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  cell.style.setProperty('--mouse-x', `${x}%`)
  cell.style.setProperty('--mouse-y', `${y}%`)
}

const deactivateCell = (event) => {
  const cell = event.currentTarget
  cell.style.setProperty('--mouse-x', '50%')
  cell.style.setProperty('--mouse-y', '50%')
}
</script>

<style scoped>
.home-page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  background: var(--background);
  color: var(--text);
}

/* 背景特效 */
.background-effects {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.gradient-bg {
  position: absolute;
  inset: -50%;
  background: linear-gradient(
    45deg,
    rgba(var(--primary-rgb), 0.1) 0%,
    rgba(0, 242, 254, 0.05) 30%,
    rgba(var(--primary-rgb), 0.1) 60%,
    rgba(0, 242, 254, 0.05) 100%
  );
  opacity: 0.6;
  filter: blur(60px);
  animation: gradientMove 15s linear infinite;
}

.particles {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.particle {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: linear-gradient(135deg, var(--primary), rgba(0, 242, 254, 0.3));
  border-radius: 50%;
  opacity: 0.2;
  transform: rotate(var(--rotation));
  animation: float var(--duration) linear infinite;
  animation-delay: var(--delay);
}

@keyframes gradientMove {
  0% {
    transform: translate(-25%, -25%) rotate(0deg);
  }
  100% {
    transform: translate(25%, 25%) rotate(360deg);
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(var(--rotation));
    opacity: 0;
  }
  25% {
    opacity: 0.8;
  }
  50% {
    transform: translate(100px, -100px) rotate(calc(var(--rotation) + 180deg));
    opacity: 0.3;
  }
  75% {
    opacity: 0.8;
  }
  100% {
    transform: translate(200px, 0) rotate(calc(var(--rotation) + 360deg));
    opacity: 0;
  }
}

/* 顶部横幅 */
.hero-section {
  position: relative;
  z-index: 2;
  padding: 6rem 2rem;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.title {
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary) 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 300;
}

.highlight {
  color: var(--text);
  font-weight: 600;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.primary-btn,
.secondary-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s;
}

.primary-btn {
  background: var(--primary);
  color: white;
  border: none;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.secondary-btn {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.secondary-btn:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

/* 动画展示区 */
.hero-animations {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 2rem;
  pointer-events: none;
}

.animation-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(var(--card-bg-rgb), 0.1);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  opacity: 0.6;
  border: 1px solid rgba(var(--border-rgb), 0.1);
}

/* 加载动画 */
.loading-animation .dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  background: var(--primary);
  border-radius: 50%;
  animation: bounce 0.5s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.1s; }
.dot:nth-child(3) { animation-delay: 0.2s; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* 波浪动画 */
.wave-animation .waves {
  display: flex;
  align-items: center;
  gap: 4px;
}

.wave {
  width: 4px;
  height: 32px;
  background: var(--primary);
  animation: wave 1s ease-in-out infinite;
}

.wave:nth-child(2) { animation-delay: 0.1s; }
.wave:nth-child(3) { animation-delay: 0.2s; }

@keyframes wave {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(2); }
}

/* 脉冲动画 */
.pulse-animation {
  position: relative;
}

.circle {
  position: absolute;
  width: 48px;
  height: 48px;
  border: 2px solid var(--primary);
  border-radius: 50%;
  animation: pulse 2s ease-out infinite;
}

.circle:nth-child(2) { animation-delay: 0.5s; }
.circle:nth-child(3) { animation-delay: 1s; }

@keyframes pulse {
  0% { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

/* 渐变边框 */
.border-animation .gradient-border {
  position: relative;
  width: 160px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: -5px;
  background: linear-gradient(90deg, var(--primary), #00f2fe, var(--primary));
  background-size: 400% 400%;
  animation: border-gradient 3s linear infinite;
}

.gradient-border .content {
  position: absolute;
  inset: 2px;
  background: rgba(var(--card-bg-rgb), 0.1);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-weight: 500;
}

@keyframes border-gradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 400% 50%; }
}

/* 特性介绍 */
.features-section {
  position: relative;
  z-index: 2;
  padding: 6rem 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
}

.features-section h2 {
  font-size: 2.5rem;
  color: var(--text);
  margin-bottom: 4rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  padding: 2rem;
  background: rgba(var(--card-bg-rgb), 0.1);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  border: 1px solid rgba(var(--border-rgb), 0.1);
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(var(--primary-rgb), 0.15);
  border-color: var(--primary);
  background: rgba(var(--card-bg-rgb), 0.2);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  background: rgba(var(--primary-rgb), 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.feature-card h3 {
  font-size: 1.25rem;
  color: var(--text);
  margin-bottom: 1rem;
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1rem;
  }

  .title {
    font-size: 3.5rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .hero-animations {
    display: none;
  }

  .features-section {
    padding: 4rem 1rem;
  }

  .features-section h2 {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
}

/* 使用统计样式 */
.stats-section {
  padding: 6rem 2rem;
  background: linear-gradient(180deg, 
    rgba(var(--background-rgb), 0.8),
    rgba(var(--primary-rgb), 0.05)
  );
  position: relative;
  backdrop-filter: blur(10px);
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(var(--card-bg-rgb), 0.1);
  border-radius: 16px;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
  box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--primary-rgb), 0.1);
  border-radius: 12px;
  color: var(--primary);
  transition: all 0.3s ease;
}

.stat-item:hover .stat-icon {
  background: var(--primary);
  color: white;
  transform: scale(1.1) rotate(-10deg);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.stat-label {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .stats-section {
    padding: 4rem 1rem;
  }

  .stats-container {
    gap: 1.5rem;
  }

  .stat-item {
    padding: 1.5rem;
  }

  .stat-value {
    font-size: 2rem;
  }
}

/* 特性介绍新样式 */
.section-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;
}

.title-decoration {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  position: relative;
  padding: 2rem;
  background: rgba(var(--card-bg-rgb), 0.1);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  border: 1px solid rgba(var(--border-rgb), 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(var(--primary-rgb), 0.15);
  border-color: var(--primary);
  background: rgba(var(--card-bg-rgb), 0.2);
}

.feature-content {
  position: relative;
  z-index: 1;
}

.feature-icon {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 2rem;
}

.icon-bg {
  position: absolute;
  inset: 0;
  background: rgba(var(--primary-rgb), 0.1);
  border-radius: 20px;
  transform: rotate(-5deg);
  transition: transform 0.3s;
}

.feature-card:hover .icon-bg {
  transform: rotate(5deg) scale(1.1);
}

.feature-icon svg {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  color: var(--primary);
}

.feature-stats {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(var(--border-rgb), 0.1);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.feature-demo {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
}

.code-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: monospace;
  color: var(--primary);
}

.copy-btn {
  padding: 0.25rem 0.75rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.feature-preview {
  margin-top: 1.5rem;
}

.preview-slider {
  position: relative;
}

.slider {
  width: 100%;
  height: 4px;
  background: rgba(var(--primary-rgb), 0.2);
  border-radius: 2px;
  appearance: none;
  outline: none;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--primary);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.preview-animation {
  margin-top: 1rem;
  height: 40px;
  background: linear-gradient(90deg, var(--primary), var(--primary-hover));
  border-radius: 8px;
  animation: pulse 2s ease-in-out infinite;
}

.feature-decoration {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40px;
  pointer-events: none;
}

.decoration-line {
  position: absolute;
  top: 40px;
  bottom: 40px;
  left: 50%;
  width: 1px;
  background: linear-gradient(to bottom, 
    transparent,
    var(--primary),
    transparent
  );
}

.decoration-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px var(--primary);
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .feature-card {
    padding: 1.5rem;
  }

  .feature-stats {
    flex-direction: column;
    gap: 1rem;
  }
}

/* 3D展示区样式 */
.perspective-section {
  padding: 8rem 2rem;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(var(--primary-rgb), 0.05) 50%,
    transparent
  );
  overflow: hidden;
}

.perspective-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  perspective: 1000px;
}

.title-glow {
  color: var(--primary);
  text-shadow: 0 0 10px var(--primary);
}

.cube-container {
  margin: 4rem auto;
  width: 300px;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  animation: float 6s ease-in-out infinite;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-20deg) rotateY(45deg);
  transition: transform 0.5s ease-out;
}

.cube-face {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(var(--card-bg-rgb), 0.1);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cube-face.front { transform: translateZ(150px); }
.cube-face.back { transform: translateZ(-150px) rotateY(180deg); }
.cube-face.right { transform: translateX(150px) rotateY(90deg); }
.cube-face.left { transform: translateX(-150px) rotateY(-90deg); }
.cube-face.top { transform: translateY(-150px) rotateX(90deg); }
.cube-face.bottom { transform: translateY(150px) rotateX(-90deg); }

.cube-content {
  width: 80%;
  height: 80%;
  background: rgba(var(--primary-rgb), 0.1);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.animation-preview {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 各种动画效果 */
.ripple-effect {
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
  border-radius: 50%;
  animation: ripple 2s ease-out infinite;
}

.pulse-rings div {
  position: absolute;
  border: 2px solid var(--primary);
  border-radius: 50%;
  animation: pulse-ring 2s ease-out infinite;
}

.floating-particles div {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--primary);
  border-radius: 50%;
  animation: float-particle 3s ease-in-out infinite;
}

.morphing-shape {
  width: 60px;
  height: 60px;
  background: var(--primary);
  animation: morph 4s ease-in-out infinite;
}

.glowing-lines {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    transparent 0%,
    var(--primary) 50%,
    transparent 100%
  );
  animation: glow-line 2s ease-in-out infinite;
}

.energy-field {
  width: 100%;
  height: 100%;
  background: conic-gradient(
    from 0deg,
    var(--primary),
    var(--primary-hover),
    var(--primary)
  );
  animation: energy-rotate 4s linear infinite;
}

.perspective-controls {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
}

.control-btn {
  background: none;
  border: 1px solid rgba(var(--primary-rgb), 0.3);
  color: var(--primary);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.control-btn:hover {
  background: rgba(var(--primary-rgb), 0.1);
  border-color: var(--primary);
  transform: scale(1.1);
}

/* 交互式动画墙样式 */
.interactive-wall {
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
}

.wall-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.wall-cell {
  aspect-ratio: 1;
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.cell-content {
  position: absolute;
  inset: 0;
  background: rgba(var(--card-bg-rgb), 0.1);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  border-radius: 16px;
  transition: all 0.3s;
  transform: translateZ(0);
}

.wall-cell:hover .cell-content {
  transform: translateZ(20px);
  border-color: var(--primary);
  box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.3);
}

.cell-effect {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(var(--primary-rgb), 0.2) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.wall-cell:hover .cell-effect {
  opacity: 1;
}

.wall-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(var(--background-rgb), 0.8)
  );
  pointer-events: none;
}

.wall-overlay h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.wall-overlay p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

/* 动画关键帧 */
@keyframes ripple {
  0% { transform: scale(0.3); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes pulse-ring {
  0% { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes float-particle {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}

@keyframes morph {
  0%, 100% { border-radius: 0%; }
  50% { border-radius: 50%; }
}

@keyframes glow-line {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes energy-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .cube-container {
    width: 200px;
    height: 200px;
  }

  .wall-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* DNA螺旋动画样式 */
.dna-animation {
  perspective: 1000px;
}

.dna-helix {
  position: relative;
  height: 200px;
  transform-style: preserve-3d;
  animation: rotateHelix 8s linear infinite;
}

.dna-pair {
  position: absolute;
  width: 100%;
  height: 20px;
  transform-style: preserve-3d;
}

.dna-pair:nth-child(even) {
  transform: rotateY(180deg);
}

.dna-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--primary);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.dna-dot.left {
  left: 30%;
  animation: glowPulse 2s ease-in-out infinite;
}

.dna-dot.right {
  right: 30%;
  animation: glowPulse 2s ease-in-out infinite;
  animation-delay: 1s;
}

.dna-line {
  position: absolute;
  height: 2px;
  width: 40%;
  background: linear-gradient(90deg, 
    transparent,
    var(--primary),
    transparent
  );
  left: 30%;
  top: 50%;
  transform: translateY(-50%);
}

@keyframes rotateHelix {
  0% { transform: rotateX(0deg); }
  100% { transform: rotateX(360deg); }
}

/* 神经网络动画样式 */
.neural-animation {
  perspective: 800px;
}

.neural-network {
  position: relative;
  width: 100%;
  height: 100%;
}

.neuron {
  position: absolute;
  left: var(--x);
  top: var(--y);
  transform-style: preserve-3d;
}

.neuron-core {
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
  animation: neuronPulse 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

.neuron-pulse {
  position: absolute;
  inset: -4px;
  border: 1px solid var(--primary);
  border-radius: 50%;
  animation: neuronRing 3s ease-out infinite;
  animation-delay: var(--delay);
}

.neural-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    var(--primary),
    transparent
  );
  transform-origin: left center;
  transform: rotate(var(--rotation));
  opacity: 0.3;
  animation: lineGlow 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes neuronPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}

@keyframes neuronRing {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(3); opacity: 0; }
}

@keyframes lineGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

/* 魔法水晶动画样式 */
.crystal-animation {
  perspective: 1000px;
}

.crystal-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
}

.crystal-core {
  position: relative;
  width: 60px;
  height: 60px;
  transform-style: preserve-3d;
  animation: crystalRotate 8s linear infinite;
}

.core-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    var(--primary) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: coreGlow 2s ease-in-out infinite;
  filter: blur(4px);
}

.crystal-face {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: center;
  transform: rotateY(var(--rotation)) translateZ(30px);
}

.crystal-edge {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(var(--primary-rgb), 0.3),
    transparent
  );
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  animation: edgeGlow 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

.crystal-aura {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.aura-ring {
  position: absolute;
  inset: -20%;
  border: 2px solid rgba(var(--primary-rgb), 0.2);
  border-radius: 50%;
  transform: scale(var(--scale)) rotateX(60deg) rotateZ(var(--rotation));
  animation: auraRotate 10s linear infinite;
}

.crystal-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.crystal-spark {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--primary);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform-origin: center;
  animation: sparkOrbit 4s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes crystalRotate {
  0% { transform: rotateY(0deg) rotateX(20deg); }
  100% { transform: rotateY(360deg) rotateX(20deg); }
}

@keyframes edgeGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

@keyframes auraRotate {
  0% { transform: scale(var(--scale)) rotateX(60deg) rotateZ(var(--rotation)); }
  100% { transform: scale(var(--scale)) rotateX(60deg) rotateZ(calc(var(--rotation) + 360deg)); }
}

@keyframes sparkOrbit {
  0% {
    transform: rotate(var(--angle)) translateX(var(--distance)) scale(0);
    opacity: 0;
  }
  20% {
    transform: rotate(var(--angle)) translateX(var(--distance)) scale(1);
    opacity: 1;
  }
  80% {
    transform: rotate(calc(var(--angle) + 180deg)) translateX(calc(var(--distance) * 1.5)) scale(1);
    opacity: 1;
  }
  100% {
    transform: rotate(calc(var(--angle) + 360deg)) translateX(var(--distance)) scale(0);
    opacity: 0;
  }
}

/* 等离子体动画样式 */
.plasma-animation {
  perspective: 1000px;
}

.plasma-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
}

.plasma-core {
  position: relative;
  width: 50px;
  height: 50px;
  transform-style: preserve-3d;
}

.core-sphere {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    var(--primary) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: corePulse 2s ease-in-out infinite;
  filter: blur(2px);
}

.plasma-arc {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: center;
  transform: rotateZ(var(--rotation));
}

.arc-path {
  position: absolute;
  width: 100%;
  height: 200%;
  top: -50%;
  background: linear-gradient(
    to top,
    transparent,
    var(--primary),
    transparent
  );
  clip-path: path('M 50,0 Q 100,100 50,200 Q 0,100 50,0');
  animation: arcFlash 3s ease-in-out infinite;
  animation-delay: var(--delay);
  opacity: 0.3;
  filter: blur(1px);
}

.plasma-field {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.field-layer {
  position: absolute;
  inset: -10%;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  border-radius: 50%;
  transform: scale(var(--scale)) rotateX(60deg);
  opacity: var(--opacity);
  animation: fieldRotate 8s linear infinite;
}

.plasma-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.plasma-particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: var(--primary);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform-origin: center;
  animation: particleFloat 3s ease-in-out infinite;
  animation-delay: var(--delay);
  filter: blur(1px);
}

@keyframes corePulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.3); opacity: 1; }
}

@keyframes arcFlash {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50% { opacity: 0.6; transform: scaleY(1.2); }
}

@keyframes fieldRotate {
  0% { transform: scale(var(--scale)) rotateX(60deg) rotateZ(0deg); }
  100% { transform: scale(var(--scale)) rotateX(60deg) rotateZ(360deg); }
}

@keyframes particleFloat {
  0% {
    transform: rotate(var(--angle)) translateX(var(--distance)) scale(0);
    opacity: 0;
  }
  20% {
    transform: rotate(var(--angle)) translateX(var(--distance)) scale(1);
    opacity: 1;
  }
  80% {
    transform: rotate(calc(var(--angle) + 180deg)) translateX(var(--distance)) scale(1);
    opacity: 1;
  }
  100% {
    transform: rotate(calc(var(--angle) + 360deg)) translateX(var(--distance)) scale(0);
    opacity: 0;
  }
}
</style> 