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
      component: () => import('../views/LessonV2Player.vue')
    },
    {
      path: '/lesson-v2/:lessonId',
      name: 'lesson-v2',
      redirect: (to) => ({ name: 'lesson', params: { lessonId: to.params.lessonId } }),
    },
    {
      path: '/project/:projectId',
      name: 'project',
      component: () => import('../views/ProjectV2Player.vue')
    },
    {
      path: '/project-v2/:projectId',
      name: 'project-v2',
      redirect: (to) => ({ name: 'project', params: { projectId: to.params.projectId } }),
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizPage.vue')
    },
  ]
})

export default router
