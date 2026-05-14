import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/lesson/:lessonId',
      name: 'lesson',
      component: () => import('../views/LessonPlayer.vue')
    }
  ]
})

export default router
