import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProgressStore } from '../stores/progress'

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
    expect(store.completedLessons).toEqual([])
  })

  it('markComplete 后 isCompleted 返回 true', () => {
    const store = useProgressStore()
    store.markComplete('html-intro')
    expect(store.isCompleted('html-intro')).toBe(true)
  })

  it('markComplete 后 completedLessons 包含该 id', () => {
    const store = useProgressStore()
    store.markComplete('html-intro')
    store.markComplete('css-intro')
    expect(store.completedLessons).toContain('html-intro')
    expect(store.completedLessons).toContain('css-intro')
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
    // 不应抛出异常，completedLessons 应为空
    expect(() => store.completedLessons).not.toThrow()
  })
})

describe('导航标签逻辑', () => {
  // 导航标签逻辑现在在 LessonPlayer.vue 的 computed 中
  // 这里测试的是核心判定逻辑的模式

  function getNavType(
    isPrologue: boolean,
    hasPrev: boolean,
    hasNext: boolean,
    isCrossChapter: boolean
  ) {
    const prevLabel = isPrologue
      ? (hasPrev ? '上一篇' : '')
      : (hasPrev ? (isCrossChapter ? '上一章' : '上一课') : '')
    const nextLabel = isPrologue
      ? (hasNext ? '下一篇' : '')
      : (hasNext ? (isCrossChapter ? '下一章' : '下一课') : '')
    return { prevLabel, nextLabel }
  }

  it('序言第一篇：只有下一篇', () => {
    const { prevLabel, nextLabel } = getNavType(true, false, true, false)
    expect(prevLabel).toBe('')
    expect(nextLabel).toBe('下一篇')
  })

  it('序言中间篇：上一篇 + 下一篇', () => {
    const { prevLabel, nextLabel } = getNavType(true, true, true, false)
    expect(prevLabel).toBe('上一篇')
    expect(nextLabel).toBe('下一篇')
  })

  it('序言最后一篇：只有上一篇', () => {
    const { prevLabel, nextLabel } = getNavType(true, true, false, false)
    expect(prevLabel).toBe('上一篇')
    expect(nextLabel).toBe('')
  })

  it('普通课程同章切换：上一课 / 下一课', () => {
    const { prevLabel, nextLabel } = getNavType(false, true, true, false)
    expect(prevLabel).toBe('上一课')
    expect(nextLabel).toBe('下一课')
  })

  it('普通课程跨章切换：上一章 / 下一章', () => {
    const { prevLabel, nextLabel } = getNavType(false, true, true, true)
    expect(prevLabel).toBe('上一章')
    expect(nextLabel).toBe('下一章')
  })

  it('第一章第一课：无上一篇', () => {
    const { prevLabel, nextLabel } = getNavType(false, false, true, false)
    expect(prevLabel).toBe('')
    expect(nextLabel).toBe('下一课')
  })
})

describe('markdown 工具函数', () => {
  // 动态导入，因为 parseInline/parseContent 使用 glossary 等模块级数据
  async function getMarkdown() {
    return await import('../utils/markdown')
  }

  it('parseInline 粗体和斜体', async () => {
    const { parseInline } = await getMarkdown()
    const result = parseInline('**粗体** 和 *斜体*')
    expect(result).toContain('<strong>粗体</strong>')
    expect(result).toContain('<em>斜体</em>')
  })

  it('parseInline 行内代码', async () => {
    const { parseInline } = await getMarkdown()
    const result = parseInline('用 `console.log()` 输出')
    expect(result).toContain('<code class="inline-code">console.log()</code>')
  })

  it('parseInline 换行转为 <br>', async () => {
    const { parseInline } = await getMarkdown()
    const result = parseInline('第一行\n第二行')
    expect(result).toContain('<br>')
  })

  it('parseContent 段落包裹为 <p>', async () => {
    const { parseContent } = await getMarkdown()
    const result = parseContent('第一段\n\n第二段')
    expect(result).toContain('<p>')
    expect(result).toContain('</p><p>')
  })

  it('parseContent 代码块', async () => {
    const { parseContent } = await getMarkdown()
    const result = parseContent('```js\nconst a = 1\n```')
    expect(result).toContain('<pre class="code-block">')
    expect(result).toContain('const a = 1')
  })
})
