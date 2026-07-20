import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProgressStore } from '../stores/progress'
import { isBlockquoteText, stripBlockquoteMarkers } from '../content-runtime/renderers/text'
import { mount } from '@vue/test-utils'
import { computed, defineComponent, ref } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { useLessonNavigation } from '../composables/useLessonNavigation'
import { errorGuardScript } from '../utils/errorGuard'

// ============================================================
// 第二层：核心逻辑单元测试
// ============================================================

describe('Progress Store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('初始状态无任何完成记录', () => {
    const store = useProgressStore()
    expect(store.isCompleted('html-intro')).toBe(false)
  })

  it('markComplete 后 isCompleted 返回 true', () => {
    const store = useProgressStore()
    store.markComplete('html-intro')
    expect(store.isCompleted('html-intro')).toBe(true)
  })

  it('markComplete 后 isCompleted 对该 id 返回 true', () => {
    const store = useProgressStore()
    store.markComplete('html-intro')
    store.markComplete('css-intro')
    expect(store.isCompleted('html-intro')).toBe(true)
    expect(store.isCompleted('css-intro')).toBe(true)
  })

  it('未标记的课程 isCompleted 返回 false', () => {
    const store = useProgressStore()
    expect(store.isCompleted('non-existent')).toBe(false)
  })

  it('进度持久化到 localStorage', () => {
    const store = useProgressStore()
    store.markComplete('html-intro')

    // 重新创建 store 模拟页面刷新
    const store2 = useProgressStore()
    expect(store2.isCompleted('html-intro')).toBe(true)
  })

  it('localStorage 数据损坏时能容错', () => {
    localStorage.setItem('code-score-progress', '{invalid json')
    const store = useProgressStore()
    // 不应抛出异常
    expect(() => store.isCompleted('any-id')).not.toThrow()
  })
})

describe('useLessonNavigation', () => {
  async function mountHarness(options: {
    lessonId: string
    lesson: { id: string; meta: { title: string; track: string; chapter: string; order: number; mode: 'sandbox' | 'local'; analogy: string } }
    all: Array<{ id: string; meta: { title: string; track: string; chapter: string; order: number; mode: 'sandbox' | 'local'; analogy: string } }>
  }) {
    const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/lesson/:lessonId', name: 'lesson', component: { template: '<div />' } }] })
    router.push(`/lesson/${options.lessonId}`)
    await router.isReady()

    const lessonIdRef = ref(options.lessonId)
    const lessonRef = ref(options.lesson)
    const allRef = ref(options.all)

    const Harness = defineComponent({
      setup() {
        const nav = useLessonNavigation(
          computed(() => lessonIdRef.value),
          computed(() => lessonRef.value as any),
          computed(() => allRef.value as any),
        )
        return { ...nav, lessonIdRef, lessonRef, allRef }
      },
      template: '<div class="h">{{ prevLabel }}|{{ nextLabel }}|{{ prevNavTitle }}|{{ nextNavTitle }}|{{ centerLabel }}|{{ prevDisabled ? "1" : "0" }}|{{ nextDisabled ? "1" : "0" }}</div>',
    })

    const wrapper = mount(Harness, { global: { plugins: [router] } })
    return { wrapper, router, lessonIdRef, lessonRef, allRef }
  }

  it('普通课程：首课 prevDisabled=true，prevLabel=上一课；nextLabel=下一课', async () => {
    const { wrapper } = await mountHarness({
      lessonId: 'l1',
      lesson: { id: 'l1', meta: { title: 'T1', track: 'fundamentals', chapter: 'c1', order: 1, mode: 'sandbox', analogy: 'm' } },
      all: [
        { id: 'l1', meta: { title: 'T1', track: 'fundamentals', chapter: 'c1', order: 1, mode: 'sandbox', analogy: 'm' } },
        { id: 'l2', meta: { title: 'T2', track: 'fundamentals', chapter: 'c1', order: 2, mode: 'sandbox', analogy: 'm' } },
      ],
    })

    const vm = wrapper.vm as any
    expect(vm.prevDisabled).toBe(true)
    expect(vm.nextDisabled).toBe(false)
    expect(vm.prevLabel).toBe('上一课')
    expect(vm.nextLabel).toBe('下一课')
  })

  it('普通课程：跨章时 nextLabel=下一章', async () => {
    const { wrapper } = await mountHarness({
      lessonId: 'l1',
      lesson: { id: 'l1', meta: { title: 'T1', track: 'fundamentals', chapter: 'c1', order: 1, mode: 'sandbox', analogy: 'm' } },
      all: [
        { id: 'l1', meta: { title: 'T1', track: 'fundamentals', chapter: 'c1', order: 1, mode: 'sandbox', analogy: 'm' } },
        { id: 'l2', meta: { title: 'T2', track: 'fundamentals', chapter: 'c2', order: 1, mode: 'sandbox', analogy: 'm' } },
      ],
    })

    const vm = wrapper.vm as any
    expect(vm.nextLabel).toBe('下一章')
  })

  it('序言：不显示 prev/next 标题，centerLabel 为 “第 x/y 篇”', async () => {
    const { wrapper } = await mountHarness({
      lessonId: 'p1',
      lesson: { id: 'p1', meta: { title: 'P1', track: 'prologue', chapter: 'c-any', order: 1, mode: 'local', analogy: 'm' } },
      all: [
        { id: 'p1', meta: { title: 'P1', track: 'prologue', chapter: 'c-any', order: 1, mode: 'local', analogy: 'm' } },
        { id: 'p2', meta: { title: 'P2', track: 'prologue', chapter: 'c-any', order: 2, mode: 'local', analogy: 'm' } },
      ],
    })

    const vm = wrapper.vm as any
    expect(vm.prevLabel).toBe('')
    expect(vm.nextLabel).toBe('下一篇')
    expect(vm.prevNavTitle).toBe('')
    expect(vm.nextNavTitle).toBe('')
    expect(vm.centerLabel).toBe('第 1/2 篇')
  })

  it('goPrev/goNext：仅在存在上一课/下一课时触发 router.push', async () => {
    const { wrapper, router } = await mountHarness({
      lessonId: 'l2',
      lesson: { id: 'l2', meta: { title: 'T2', track: 'fundamentals', chapter: 'c1', order: 2, mode: 'sandbox', analogy: 'm' } },
      all: [
        { id: 'l1', meta: { title: 'T1', track: 'fundamentals', chapter: 'c1', order: 1, mode: 'sandbox', analogy: 'm' } },
        { id: 'l2', meta: { title: 'T2', track: 'fundamentals', chapter: 'c1', order: 2, mode: 'sandbox', analogy: 'm' } },
        { id: 'l3', meta: { title: 'T3', track: 'fundamentals', chapter: 'c1', order: 3, mode: 'sandbox', analogy: 'm' } },
      ],
    })

    const pushSpy = vi.spyOn(router, 'push')
    pushSpy.mockClear()
    const vm = wrapper.vm as any
    vm.goPrev()
    vm.goNext()
    expect(pushSpy).toHaveBeenCalledTimes(2)
    expect(pushSpy).toHaveBeenNthCalledWith(1, '/lesson/l1')
    expect(pushSpy).toHaveBeenNthCalledWith(2, '/lesson/l3')
  })
})

describe('blockquote 辅助函数', () => {
  it('isBlockquoteText：只要存在非空行且所有非空行都以 > 开头，则视为引用块', () => {
    expect(isBlockquoteText('> 单行')).toBe(true)
    expect(isBlockquoteText('> 第一行\n> 第二行')).toBe(true)
    expect(isBlockquoteText('\n> 第一行\n')).toBe(true)
    expect(isBlockquoteText('普通文本\n> 引用')).toBe(false)
  })

  it('stripBlockquoteMarkers：移除每行开头的 > 与可选空格', () => {
    expect(stripBlockquoteMarkers('> a')).toBe('a')
    expect(stripBlockquoteMarkers('> a\n> b')).toBe('a\nb')
    expect(stripBlockquoteMarkers('  > a\n> b')).toBe('a\nb')
  })
})

describe('errorGuardScript', () => {
  it('包含关键结构（hintMap + postMessage + window.onerror）', () => {
    expect(typeof errorGuardScript).toBe('string')
    expect(errorGuardScript).toContain('hintMap')
    expect(errorGuardScript).toContain('parent.postMessage')
    expect(errorGuardScript).toContain('window.onerror')
  })

  it('包含常见错误提示规则片段', () => {
    expect(errorGuardScript).toContain('querySelector')
    expect(errorGuardScript).toContain('document')
    expect(errorGuardScript).toContain('addEventListener')
    expect(errorGuardScript).toContain('SyntaxError')
    expect(errorGuardScript).toContain('TypeError')
  })
})

// ============================================================
// splitFencedCodeBlocks — 分隔线解析
// ============================================================
import { splitFencedCodeBlocks } from '../content-runtime/renderers/text'

describe('splitFencedCodeBlocks', () => {
  it('普通文本不产生 hr', () => {
    const result = splitFencedCodeBlocks('这是普通文本')
    expect(result).toEqual([{ type: 'text', text: '这是普通文本' }])
  })

  it('单独的 --- 产生 hr 段', () => {
    const result = splitFencedCodeBlocks('上面\n---\n下面')
    expect(result).toHaveLength(3)
    expect(result[0]).toEqual({ type: 'text', text: '上面' })
    expect(result[1]).toEqual({ type: 'hr' })
    expect(result[2]).toEqual({ type: 'text', text: '下面' })
  })

  it('连续多个 hr', () => {
    const result = splitFencedCodeBlocks('A\n---\nB\n---\nC')
    expect(result).toHaveLength(5)
    expect(result.filter(r => r.type === 'hr')).toHaveLength(2)
  })

  it('代码块内的 --- 不被识别为 hr', () => {
    const result = splitFencedCodeBlocks('```html\n<h1>---</h1>\n```\n下面')
    expect(result).toHaveLength(2)
    expect(result[0]).toMatchObject({ type: 'code', language: 'html' })
    expect(result[1]).toEqual({ type: 'text', text: '下面' })
  })
})

// ============================================================
// useAsyncComputed — 同步/异步工厂
// ============================================================
import { useAsyncComputed } from '../composables/useAsyncComputed'

describe('useAsyncComputed', () => {
  it('同步工厂返回的值正确', async () => {
    const dep = ref(1)
    const state = useAsyncComputed(() => dep.value * 2)
    // wait for watchEffect
    await new Promise(r => setTimeout(r, 10))
    expect(state.value.value).toBe(2)
    expect(state.value.loading).toBe(false)
    expect(state.value.error).toBeNull()
  })

  it('异步工厂返回的值正确', async () => {
    const state = useAsyncComputed(() => Promise.resolve('hello'))
    await new Promise(r => setTimeout(r, 10))
    expect(state.value.value).toBe('hello')
  })

  it('工厂抛错时 error 非 null', async () => {
    const state = useAsyncComputed(() => { throw new Error('fail') })
    await new Promise(r => setTimeout(r, 10))
    expect(state.value.value).toBeNull()
    expect(state.value.error).toBeInstanceOf(Error)
  })
})
