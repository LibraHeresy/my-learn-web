import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, enableAutoUnmount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { getAllLessons, getLesson } from '../content-loaders/lessons'
import { getAllProjects } from '../content-loaders/projects'

// 每个测试后自动 unmount，避免 TermTip 等组件的模块级全局状态（tipStates）跨测试累积
enableAutoUnmount(afterEach)

// ============================================================
// 第三层：页面冒烟测试
// ============================================================

// 创建最小路由实例
function makeRouter(_initialRoute: string) {
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
    const lessons = getAllLessons()
    it.each(lessons.map(l => ({ id: l.id, title: l.meta.title })))(
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
  })

  // ---- ProjectPlayer：遍历所有项目 ----
  describe('ProjectPlayer', () => {
    const projects = getAllProjects()
    it.each(projects.map(p => ({ id: p.id, title: p.meta.title })))(
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
    it('DocumentRenderer 渲染', async () => {
      const lesson = await getLesson(getAllLessons()[0].id)
      expect(lesson).not.toBeNull()
      const { default: DocumentRenderer } = await import('../content-runtime/renderers/DocumentRenderer.vue')
      const wrapper = mount(DocumentRenderer, {
        props: { lesson: lesson! },
      })
      expect(wrapper.find('.content-doc').exists()).toBe(true)
    })

    it('DocumentBodyRenderer 渲染', async () => {
      const lesson = await getLesson(getAllLessons()[0].id)
      expect(lesson).not.toBeNull()
      const { default: DocumentBodyRenderer } = await import('../content-runtime/renderers/DocumentBodyRenderer.vue')
      const wrapper = mount(DocumentBodyRenderer, {
        props: { nodes: lesson!.body },
      })
      expect(wrapper.find('.content-doc').exists()).toBe(true)
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
