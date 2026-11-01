import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getRandomQuestionId } from '@/stores/questions.ts'
import { useAuthStore } from '@/stores/auth'
import { pinia } from '@/stores/pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AuthView.vue'),
      meta: { public: true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../components/SettingPage.vue'),
    },
    {
      path: '/question/:id',
      name: 'questionById',
      component: () => import('../views/QuestionView.vue'),
    },
    {
      path: '/random',
      name: 'randomQuestion',
      redirect: () => `/question/${getRandomQuestionId([])}`,
    },
    {
      path: '/report',
      name: 'ReportCard',
      component: () => import('../views/ReportCardView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore(pinia)
  await auth.initialize()

  if (!to.meta.public && !auth.session) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'login' && auth.session) {
    return { name: 'home' }
  }
})

export default router
