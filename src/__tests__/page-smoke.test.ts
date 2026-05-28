import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { lessons } from '../data/lessons'
import { prologueLessons } from '../data/prologues'
import { projects } from '../data/projects'

// ============================================================
// 第三层：页面冒烟测试
// ============================================================

// 创建最小路由实例
function makeRouter(initialRoute: string) {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/lesson/:lessonId', component: { template: '<div>Lesson</div>' }, name: 'lesson' },
      { path: '/project/:projectId', component: { template: '<div>Project</div>' }, name: 'project' },
    ],
  })
}

async function setupRoute(path: string) {
  const router = makeRouter(path)
  router.push(path)
  await router.isReady()
  setActivePinia(createPinia())
  return router
}

describe('页面冒烟测试', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  // ---- HomePage ----
  describe('HomePage', () => {
    it('首页渲染不崩溃', async () => {
      const router = await setupRoute('/')
      const { default: HomePage } = await import('../views/HomePage.vue')
      const wrapper = mount(HomePage, {
        global: { plugins: [router, createPinia()] },
      })
      expect(wrapper.find('.home').exists()).toBe(true)
    })
  })

  // ---- LessonPlayer：遍历所有课程 ----
  describe('LessonPlayer', () => {
    it.each(lessons.map(l => ({ id: l.id, title: l.title })))(
      '课程 "$title" 页面渲染不崩溃',
      { timeout: 10000 },
      async ({ id }) => {
        const router = await setupRoute(`/lesson/${id}`)
        const { default: LessonPlayer } = await import('../views/LessonPlayer.vue')
        const wrapper = mount(LessonPlayer, {
          global: { plugins: [router, createPinia()] },
        })
        expect(wrapper.find('.lesson-player').exists()).toBe(true)
      }
    )

    it.each(prologueLessons.map(l => ({ id: l.id, title: l.title })))(
      '序言 "$title" 页面渲染不崩溃',
      { timeout: 10000 },
      async ({ id }) => {
        const router = await setupRoute(`/lesson/${id}`)
        const { default: LessonPlayer } = await import('../views/LessonPlayer.vue')
        const wrapper = mount(LessonPlayer, {
          global: { plugins: [router, createPinia()] },
        })
        expect(wrapper.find('.lesson-player').exists()).toBe(true)
      }
    )
  })

  // ---- ProjectPlayer：遍历所有项目 ----
  describe('ProjectPlayer', () => {
    it.each(projects.map(p => ({ id: p.id, title: p.title })))(
      '项目 "$title" 页面渲染不崩溃',
      { timeout: 10000 },
      async ({ id }) => {
        const router = await setupRoute(`/project/${id}`)
        const { default: ProjectPlayer } = await import('../views/ProjectPlayer.vue')
        const wrapper = mount(ProjectPlayer, {
          global: { plugins: [router, createPinia()] },
        })
        expect(wrapper.find('.project-player').exists()).toBe(true)
      }
    )
  })

  // ---- 关键组件 ----
  describe('关键组件', () => {
    it('LessonContent 渲染', async () => {
      const lesson = lessons[0]
      const { default: LessonContent } = await import('../components/LessonContent.vue')
      const wrapper = mount(LessonContent, {
        props: { lesson },
      })
      expect(wrapper.find('.content-panel').exists()).toBe(true)
    })

    it('PlayerFooter 渲染', async () => {
      const { default: PlayerFooter } = await import('../components/PlayerFooter.vue')
      const wrapper = mount(PlayerFooter, {
        props: {
          prevLabel: '上一课',
          nextLabel: '下一课',
          prevNavTitle: '测试课程',
          nextNavTitle: '下一课标题',
          prevDisabled: false,
          nextDisabled: false,
          showComplete: true,
          isCompleted: false,
        },
      })
      expect(wrapper.find('.player-footer').exists()).toBe(true)
      expect(wrapper.text()).toContain('测试课程')
      expect(wrapper.text()).toContain('下一课标题')
    })
  })
})
