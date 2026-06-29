import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('../content-loaders/projects', () => {
  const emptyBody: any[] = []

  const makeMeta = (id: string, title: string, order: number) => ({
    id,
    title,
    subtitle: '',
    icon: '',
    track: 'fundamentals',
    order,
    mode: 'local' as const,
    musicAnalogy: '',
    musicAnalogyBody: emptyBody,
  })

  const items = [
    { id: 'p1', meta: makeMeta('p1', '项目1', 1), stepCount: 2 },
    { id: 'p2', meta: makeMeta('p2', '项目2', 2), stepCount: 2 },
    { id: 'p3', meta: makeMeta('p3', '项目3', 3), stepCount: 2 },
  ]

  return {
    getAllProjects: () => items,
    getProject: async (projectId: string) => {
      const base = items.find((x) => x.id === projectId)
      if (!base) return null
      return {
        id: base.id,
        meta: base.meta,
        steps: [
          { title: 'S1', contentBody: emptyBody, taskBody: emptyBody },
          { title: 'S2', contentBody: emptyBody, taskBody: emptyBody },
        ],
      }
    },
  }
})

vi.mock('../composables/useCodePreview', async () => {
  const vue = await import('vue')
  return {
    useCodePreview: () => ({ previewSrc: vue.ref(''), triggerPreview: vi.fn(), livePreviewMode: vue.ref(false) }),
  }
})

vi.mock('../composables/usePanelResize', async () => {
  const vue = await import('vue')
  return {
    usePanelResize: () => ({
      panelWidths: vue.ref({ content: 40, editor: 30, preview: 30 }),
      dragging: vue.ref(null),
      playerMainRef: vue.ref(),
      startDrag: vi.fn(),
    }),
  }
})

async function flush() {
  await new Promise((r) => setTimeout(r, 0))
}

describe('ProjectPlayer 导航', () => {
  it('第一步：prev 为上个项目；next 为下一步（显示下一步标题）', async () => {
    setActivePinia(createPinia())
    const { default: ProjectPlayer } = await import('../views/ProjectPlayer.vue')
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/project/:projectId', name: 'project', component: ProjectPlayer }],
    })
    await router.push('/project/p2')
    await router.isReady()

    const pushSpy = vi.spyOn(router, 'push')
    pushSpy.mockClear()

    const wrapper = mount(ProjectPlayer, { global: { plugins: [router, createPinia()] } })
    await flush()

    const prevBtn = wrapper.find('.footer-side .footer-btn')
    const nextBtn = wrapper.find('.footer-side-right .footer-btn')

    expect(prevBtn.exists()).toBe(true)
    expect(prevBtn.text()).toContain('上个项目')
    expect(prevBtn.text()).toContain('项目1')

    expect(nextBtn.exists()).toBe(true)
    expect(nextBtn.text()).toContain('S2')
    expect(nextBtn.text()).toContain('下一步')

    await prevBtn.trigger('click')
    expect(pushSpy).toHaveBeenCalledTimes(1)
    expect(pushSpy).toHaveBeenCalledWith('/project/p1')
  })

  it('最后一步：next 为下个项目（显示下个项目标题），点击进入下个项目', async () => {
    setActivePinia(createPinia())
    const { default: ProjectPlayer } = await import('../views/ProjectPlayer.vue')
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/project/:projectId', name: 'project', component: ProjectPlayer }],
    })
    await router.push('/project/p2')
    await router.isReady()

    const pushSpy = vi.spyOn(router, 'push')
    pushSpy.mockClear()

    const wrapper = mount(ProjectPlayer, { global: { plugins: [router, createPinia()] } })
    await flush()

    const nextBtn = wrapper.find('.footer-side-right .footer-btn')
    await nextBtn.trigger('click')
    await flush()
    pushSpy.mockClear()

    const prevBtn2 = wrapper.find('.footer-side .footer-btn')
    const nextBtn2 = wrapper.find('.footer-side-right .footer-btn')

    expect(prevBtn2.text()).toContain('上一步')
    expect(prevBtn2.text()).toContain('S1')

    expect(nextBtn2.text()).toContain('项目3')
    expect(nextBtn2.text()).toContain('下个项目')

    await nextBtn2.trigger('click')
    expect(pushSpy).toHaveBeenCalledTimes(1)
    expect(pushSpy).toHaveBeenCalledWith('/project/p3')
  })
})

