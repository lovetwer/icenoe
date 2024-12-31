<template>
  <nav class="navbar">
    <div class="nav-bg"></div>
    <div class="container">
      <router-link to="/" class="logo">
        <div class="logo-icon">
          <div class="ice-crystal">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <span class="logo-text">Icenoe</span>
      </router-link>
      
      <div class="nav-links">
        <router-link 
          to="/" 
          class="nav-link"
          :class="{ active: $route.path === '/' }"
        >
          <i class="icon-home"></i>
          <span>首页</span>
        </router-link>
        <router-link 
          to="/animations" 
          class="nav-link"
          :class="{ active: $route.path.startsWith('/animations') }"
        >
          <i class="icon-gallery">🎨</i>
          <span>动画库</span>
        </router-link>
        <router-link 
          to="/editor" 
          class="nav-link"
          :class="{ active: $route.path.startsWith('/editor') }"
        >
          <i class="icon-editor">✨</i>
          <span>编辑器</span>
        </router-link>
      </div>

      <div class="nav-right">
        <button class="theme-toggle" @click="toggleTheme" :class="{ 'is-dark': themeStore.isDark }">
          <div class="toggle-thumb">
            <svg v-if="themeStore.isDark" class="icon-moon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22z"/>
            </svg>
            <svg v-else class="icon-sun" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"/>
              <path fill="currentColor" d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"/>
              <path fill="currentColor" d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"/>
            </svg>
          </div>
        </button>

        <template v-if="userStore.isLoggedIn">
          <div class="user-menu" @click="showDropdown = !showDropdown" v-click-outside="closeDropdown">
            <div class="user-avatar">
              <span class="avatar-text">{{ userStore.user.username.charAt(0).toUpperCase() }}</span>
            </div>
            <span class="username">{{ userStore.user.username }}</span>
            <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
            <div class="dropdown-menu" v-show="showDropdown">
              <router-link to="/profile" class="dropdown-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="12" cy="7" r="4" stroke-width="2" stroke-linecap="round"/>
                </svg>
                个人资料
              </router-link>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" @click="handleLogout">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke-width="2" stroke-linecap="round"/>
                  <path d="M16 17l5-5-5-5" stroke-width="2" stroke-linecap="round"/>
                  <path d="M21 12H9" stroke-width="2" stroke-linecap="round"/>
                </svg>
                退出登录
              </button>
            </div>
          </div>
        </template>
        
        <template v-else>
          <router-link to="/login" class="login-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke-width="2" stroke-linecap="round"/>
              <path d="M10 17l5-5-5-5" stroke-width="2" stroke-linecap="round"/>
              <path d="M15 12H3" stroke-width="2" stroke-linecap="round"/>
            </svg>
            登录
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'
import { vClickOutside } from '@/directives/click-outside'

const router = useRouter()
const themeStore = useThemeStore()
const userStore = useUserStore()
const showDropdown = ref(false)

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const closeDropdown = () => {
  showDropdown.value = false
}

const handleLogout = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  display: flex;
  align-items: center;
  background: transparent;
}

.nav-bg {
  position: absolute;
  inset: 0;
 background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark) .nav-bg {
  background: rgba(0, 0, 0, 0.1);
  border-bottom-color: rgba(255, 255, 255, 0.05);
}

.container {
  position: relative;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-icon {
  position: relative;
  width: 32px;
  height: 32px;
  margin-right: 8px;
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
  animation: crystal1 2s ease-in-out infinite;
}

.ice-crystal span:nth-child(2) {
  top: 8px;
  right: 0;
  animation: crystal2 2s ease-in-out infinite;
}

.ice-crystal span:nth-child(3) {
  bottom: 0;
  left: 8px;
  animation: crystal3 2s ease-in-out infinite;
}

.ice-crystal span:nth-child(4) {
  top: 8px;
  left: 0;
  animation: crystal4 2s ease-in-out infinite;
}

@keyframes crystal1 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

@keyframes crystal2 {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(2px); }
}

@keyframes crystal3 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(2px); }
}

@keyframes crystal4 {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-2px); }
}

.logo-text {
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: all 0.3s;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--primary-hover));
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary);
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.theme-toggle {
  background: rgba(0, 0, 0, 0.05);
  border: none;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  padding: 2px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.theme-toggle.is-dark {
  background: rgba(255, 255, 255, 0.1);
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(0);
  transition: transform 0.3s;
}

.is-dark .toggle-thumb {
  transform: translateX(24px);
  background: #333;
}

.icon-sun,
.icon-moon {
  width: 14px;
  height: 14px;
  color: #FF9800;
}

.is-dark .icon-moon {
  color: #90CAF9;
}

/* Dark mode styles */
:global(.dark) .nav-bg {
  background: transparent;
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

:global(.dark) .nav-link {
  color: var(--text-secondary);
}

:global(.dark) .nav-link:hover,
:global(.dark) .nav-link.active {
  color: var(--primary);
}

/* Icons */
[class^="icon-"] {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  font-style: normal;
  font-size: 16px;
}

.icon-home::before {
  content: '🏠';
}

.icon-gallery,
.icon-editor {
  font-size: 16px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.user-menu:hover {
  background: var(--card-hover);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.username {
  color: var(--text);
  font-weight: 500;
}

.dropdown-arrow {
  color: var(--text-secondary);
  transition: transform 0.2s;
}

.user-menu:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 180px;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border);
  padding: 0.5rem;
  z-index: 100;
  animation: dropdown-show 0.2s ease-out;
}

@keyframes dropdown-show {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text);
  font-size: 0.9rem;
  border-radius: 8px;
  transition: all 0.2s;
  text-decoration: none;
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
}

.dropdown-item:hover {
  background: var(--card-hover);
  color: var(--primary);
}

.dropdown-item:hover svg {
  stroke: var(--primary);
}

.dropdown-divider {
  height: 1px;
  background: var(--border);
  margin: 0.5rem 0;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--primary);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.login-btn:hover {
  background: var(--primary-hover);
}

.login-btn svg {
  stroke: white;
}
</style>  