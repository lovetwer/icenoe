<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="logo">
            <div class="logo-icon">
              <div class="ice-crystal">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <span class="logo-text">Icenoe</span>
          </div>
          <p class="description">
            探索动画的无限可能，让创意自由绽放
          </p>
        </div>

        <div class="footer-section">
          <h3>快速链接</h3>
          <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/animations">动画库</router-link></li>
            <li><router-link to="/editor">编辑器</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>帮助与支持</h3>
          <ul>
            <li><router-link to="/about">关于我们</router-link></li>
            <li><router-link to="/contact">联系我们</router-link></li>
            <li><router-link to="/privacy">隐私政策</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>关注我们</h3>
          <SocialLinks />
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">
          © 2024 Icenoe. All rights reserved.
        </div>
        <div class="footer-links">
          <router-link to="/terms">服务条款</router-link>
          <router-link to="/privacy">隐私政策</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
.footer {
  background: var(--card-bg);
  border-top: 1px solid var(--border);
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.logo-icon {
  position: relative;
  width: 32px;
  height: 32px;
}

.ice-crystal {
  position: absolute;
  inset: 0;
  transform: rotate(45deg);
}

.ice-crystal span {
  position: absolute;
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  border-radius: 2px;
}

.ice-crystal span:nth-child(1) {
  top: 0;
  left: 8px;
}

.ice-crystal span:nth-child(2) {
  top: 8px;
  right: 0;
}

.ice-crystal span:nth-child(3) {
  bottom: 0;
  left: 8px;
}

.ice-crystal span:nth-child(4) {
  top: 8px;
  left: 0;
}

.logo-text {
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  font-weight: bold;
}

.description {
  color: var(--text-secondary);
  line-height: 1.6;
}

h3 {
  color: var(--text);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

ul a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

ul a:hover {
  color: var(--primary);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.social-link:hover {
  color: var(--primary);
}

.icon {
  width: 20px;
  height: 20px;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--primary);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }
}
</style> 