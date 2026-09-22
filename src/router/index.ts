import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getRandomQuestionId } from '@/stores/questions.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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

export default router
