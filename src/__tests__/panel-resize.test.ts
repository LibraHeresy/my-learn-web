import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { usePanelResize } from '../composables/usePanelResize'

const STORAGE_KEY = 'test-panel-widths'

type ResizeApi = ReturnType<typeof usePanelResize>

function createHarness(): { wrapper: ReturnType<typeof mount>; api: ResizeApi } {
  let api!: ResizeApi
  const Comp = defineComponent({
    setup() {
      api = usePanelResize(STORAGE_KEY, 1)
      return () => h('div', { ref: api.playerMainRef, style: 'width:1000px' })
    },
  })
  const wrapper = mount(Comp)
  return { wrapper, api }
}

function drag(api: ResizeApi, which: 'content-editor' | 'editor-preview', clientX: number) {
  api.startDrag(which, { preventDefault: vi.fn() } as unknown as MouseEvent)
  window.dispatchEvent(new MouseEvent('mousemove', { clientX }))
  window.dispatchEvent(new MouseEvent('mouseup'))
}

describe('usePanelResize', () => {
  beforeEach(() => {
    localStorage.clear()
    // jsdom 的 getBoundingClientRect 返回全 0，mock 成 1000px 宽以驱动百分比计算
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 1000,
      height: 100,
      top: 0,
      left: 0,
      right: 1000,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('默认宽度为 42/30/28', () => {
    const { api } = createHarness()
    expect(api.panelWidths.value).toEqual({ content: 42, editor: 30, preview: 28 })
    expect(api.dragging.value).toBeNull()
  })

  it('从 localStorage 恢复合法宽度', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ _version: 1, widths: { content: 50, editor: 25, preview: 25 } }),
    )
    const { api } = createHarness()
    expect(api.panelWidths.value).toEqual({ content: 50, editor: 25, preview: 25 })
  })

  it('版本不匹配时重置为默认', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ _version: 999, widths: { content: 50, editor: 25, preview: 25 } }),
    )
    const { api } = createHarness()
    expect(api.panelWidths.value).toEqual({ content: 42, editor: 30, preview: 28 })
  })

  it('非法宽度数据（含小于 15 的列）回退默认', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ _version: 1, widths: { content: 10, editor: 90, preview: 0 } }),
    )
    const { api } = createHarness()
    expect(api.panelWidths.value).toEqual({ content: 42, editor: 30, preview: 28 })
  })

  it('拖拽 content-editor 按比例调整并保存到 localStorage', () => {
    const { api } = createHarness()
    drag(api, 'content-editor', 600) // 600/1000 = 60%
    const w = api.panelWidths.value
    expect(w.content).toBeCloseTo(60)
    expect(w.editor + w.preview).toBeCloseTo(40)

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(saved._version).toBe(1)
    expect(saved.widths).toEqual(w)
  })

  it('拖拽夹取到最小宽度 15%', () => {
    const { api } = createHarness()
    drag(api, 'content-editor', 5) // 0.5% → 夹取到 15
    expect(api.panelWidths.value.content).toBe(15)
  })

  it('editor-preview 拖拽不会改变 content 列，且 editor/preview 有最小宽度', () => {
    const { api } = createHarness()
    drag(api, 'editor-preview', 700)
    const w = api.panelWidths.value
    expect(w.content).toBe(42)
    expect(w.editor + w.preview).toBeCloseTo(58)
    expect(w.editor).toBeGreaterThanOrEqual(15)
    expect(w.preview).toBeGreaterThanOrEqual(15)
  })

  it('未拖拽时不写 localStorage', () => {
    createHarness()
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })
})
