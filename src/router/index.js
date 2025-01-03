import { createRouter, createWebHistory } from 'vue-router'
import Contact from '@/views/Contact.vue'
import About from '@/views/About.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home.vue')
        },
        {
          path: 'animations',
          name: 'Animations',
          component: () => import('@/views/Animations.vue')
        },
        {
          path: 'editor/:id?',
          name: 'Editor',
          component: () => import('@/views/Editor.vue')
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/Profile.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'about',
          name: 'About',
          component: About,
          meta: {
            title: '关于我们'
          }
        },
        {
          path: 'privacy',
          name: 'Privacy',
          component: () => import('@/views/Privacy.vue'),
          meta: {
            title: '隐私政策'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: {
        title: '联系我们'
      }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const publicPages = ['/login', '/register','/animations','/about','/privacy','/contact','/']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router 