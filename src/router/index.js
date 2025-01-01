import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Terms from '@/views/Terms.vue'
import Privacy from '@/views/Privacy.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
    meta: {
      title: '服务条款'
    }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
    meta: {
      title: '隐私政策'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 