import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/my-learn-web/'),
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
    },
    {
      path: '/project/:projectId',
      name: 'project',
      component: () => import('../views/ProjectPlayer.vue')
    }
  ]
})

export default router
