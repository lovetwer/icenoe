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
          <router-link to="/upload" class="secondary-btn">
            上传动画
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
      </div>

      <!-- 动画展示区 -->
      <div class="hero-animations">
        <!-- 加载动画 -->
        <div class="animation-item loading-animation">
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>

        <!-- 波浪动画 -->
        <div class="animation-item wave-animation">
          <div class="waves">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
          </div>
        </div>

        <!-- 脉冲动画 -->
        <div class="animation-item pulse-animation">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>

        <!-- 渐变边框 -->
        <div class="animation-item border-animation">
          <div class="gradient-border">
            <div class="content">动态边框</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 特性介绍 -->
    <div class="features-section">
      <h2>为什么选择 icenoe？</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M15 6v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2zM21 8h-4M21 12h-4M21 16h-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3>丰富的动画库</h3>
          <p>提供大量精选的动画效果，涵盖加载、按钮、图标等多个类别</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 15l-3-3m0 0l3-3m-3 3h12M4 4v16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3>一键复制使用</h3>
          <p>支持一键复制代码，快速集成到您的项目中</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3>实时预览</h3>
          <p>支持动画实时预览和参数调整，所见即所得</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无需额外的逻辑
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
</style> 