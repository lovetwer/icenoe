<template>
  <div class="about-page">
    <div class="about-container">
      <h1 class="page-title">关于我们</h1>
      
      <div class="about-content">
        <section class="about-section">
          <h2>我们的使命</h2>
          <p>icenoe 致力于为开发者和设计师提供优雅、高效的动画解决方案。我们相信，精心设计的动画效果能够提升用户体验，让产品更具生命力。</p>
        </section>

        <section class="about-section">
          <h2>团队介绍</h2>
          <div class="team-grid">
            <div class="team-member">
              <div class="member-avatar">
                <div class="avatar-glow"></div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3>张三</h3>
              <p>创始人 & 技术总监</p>
            </div>
            <div class="team-member">
              <div class="member-avatar">
                <div class="avatar-glow"></div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3>李四</h3>
              <p>设计总监</p>
            </div>
            <div class="team-member">
              <div class="member-avatar">
                <div class="avatar-glow"></div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3>王五</h3>
              <p>产品经理</p>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h2>发展历程</h2>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3>2024年1月</h3>
                <p>icenoe 正式上线</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3>2023年10月</h3>
                <p>完成产品研发</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3>2023年6月</h3>
                <p>团队组建完成</p>
              </div>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h2>我们的愿景</h2>
          <div class="vision-cards">
            <div class="vision-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3>创新</h3>
              <p>持续探索动画技术的前沿，引领行业发展</p>
            </div>
            <div class="vision-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3>品质</h3>
              <p>提供高质量的动画效果和优质的用户体验</p>
            </div>
            <div class="vision-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3>共创</h3>
              <p>与用户共同成长，打造活跃的创作者社区</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background: var(--background);
  color: var(--text);
  padding: 4rem 2rem;
}

.about-container {
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(var(--card-bg-rgb), 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(var(--primary-rgb), 0.1);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.about-section {
  margin-bottom: 4rem;
}

.about-section h2 {
  font-size: 1.75rem;
  color: var(--text);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.about-section h2::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right,
    var(--primary),
    transparent
  );
}

.about-section p {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.1rem;
}

/* 团队样式 */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.team-member {
  text-align: center;
  padding: 2rem;
  background: rgba(var(--card-bg-rgb), 0.1);
  border-radius: 16px;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
  box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.1);
}

.member-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  position: relative;
}

.avatar-glow {
  position: absolute;
  inset: -10px;
  background: radial-gradient(
    circle at center,
    rgba(var(--primary-rgb), 0.2),
    transparent 70%
  );
  border-radius: 50%;
  animation: avatarGlow 3s ease-in-out infinite;
}

.member-avatar svg {
  width: 100%;
  height: 100%;
  color: var(--primary);
  position: relative;
  z-index: 1;
}

.team-member h3 {
  font-size: 1.25rem;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.team-member p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

/* 时间线样式 */
.timeline {
  position: relative;
  padding-left: 2rem;
  margin-top: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--primary),
    transparent
  );
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-dot {
  position: absolute;
  left: -2.5rem;
  width: 12px;
  height: 12px;
  background: var(--primary);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary);
}

.timeline-content h3 {
  font-size: 1.1rem;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

/* 愿景卡片样式 */
.vision-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.vision-card {
  padding: 2rem;
  background: rgba(var(--card-bg-rgb), 0.1);
  border-radius: 16px;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  transition: all 0.3s ease;
}

.vision-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
  box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.1);
}

.card-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

.vision-card h3 {
  font-size: 1.25rem;
  color: var(--text);
  margin-bottom: 1rem;
}

@keyframes avatarGlow {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.2); opacity: 0.4; }
}

@media (max-width: 768px) {
  .about-page {
    padding: 2rem 1rem;
  }

  .about-container {
    padding: 2rem 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .about-section h2 {
    font-size: 1.5rem;
  }

  .team-grid,
  .vision-cards {
    grid-template-columns: 1fr;
  }
}
</style> 