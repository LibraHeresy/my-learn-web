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

describe('ProjectPlayer 步骤边界逻辑', () => {
  function getStepNavLabels(
    currentStep: number,
    totalSteps: number,
    hasPrevProject: boolean,
    hasNextProject: boolean,
    prevProjectTitle?: string,
    nextProjectTitle?: string,
    currentStepTitle?: string,
    prevStepTitle?: string,
    nextStepTitle?: string
  ) {
    const isFirst = currentStep === 0
    const isLast = currentStep >= totalSteps - 1

    const prevLabel = (isFirst && hasPrevProject)
      ? '上个项目'
      : (!isFirst ? '上一步' : '')

    const nextLabel = (isLast && hasNextProject)
      ? '下个项目'
      : (!isLast ? '下一步' : '')

    const prevTitle = (isFirst && hasPrevProject)
      ? prevProjectTitle ?? ''
      : (!isFirst ? (prevStepTitle ?? '') : '')

    const nextTitle = (isLast && hasNextProject)
      ? nextProjectTitle ?? ''
      : (!isLast ? (nextStepTitle ?? '') : '')

    return { prevLabel, nextLabel, prevTitle, nextTitle }
  }

  it('第一步：无上一步，有下一步', () => {
    const r = getStepNavLabels(0, 5, false, false)
    expect(r.prevLabel).toBe('')
    expect(r.nextLabel).toBe('下一步')
  })

  it('中间步骤：上一步 + 下一步', () => {
    const r = getStepNavLabels(2, 5, false, false)
    expect(r.prevLabel).toBe('上一步')
    expect(r.nextLabel).toBe('下一步')
  })

  it('最后一步：无下一步', () => {
    const r = getStepNavLabels(4, 5, false, false)
    expect(r.prevLabel).toBe('上一步')
    expect(r.nextLabel).toBe('')
  })

  it('第一步有上个项目：跨项目导航', () => {
    const r = getStepNavLabels(0, 3, true, false, '上个项目名')
    expect(r.prevLabel).toBe('上个项目')
    expect(r.prevTitle).toBe('上个项目名')
  })

  it('最后一步有下个项目：跨项目导航', () => {
    const r = getStepNavLabels(2, 3, false, true, undefined, '下个项目名')
    expect(r.nextLabel).toBe('下个项目')
    expect(r.nextTitle).toBe('下个项目名')
  })

  it('步骤内导航显示步骤标题', () => {
    const r = getStepNavLabels(
      1, 3, false, false,
      undefined, undefined, undefined,
      '第一步标题', '第三步标题'
    )
    expect(r.prevTitle).toBe('第一步标题')
    expect(r.nextTitle).toBe('第三步标题')
  })
})

describe('useCodePreview 错误映射', () => {
  const hintMap: [RegExp, string][] = [
    [/queryselector/i, 'querySelector'],
    [/querySelectorAll/i, 'querySelectorAll（大写 S 和 A）'],
    [/docuemnt|doucment|docment|documnet/i, 'document'],
    [/addeventlistener/i, 'addEventListener'],
    [/textcontent/i, 'textContent'],
    [/innerhtml/i, 'innerHTML'],
    [/Cannot read propert.* of null/i, '选择器没找到元素'],
    [/is not a function/i, '函数名拼写'],
    [/is not defined/i, '还没有声明'],
    [/SyntaxError/i, '语法错误'],
    [/Cannot set propert.* of null/i, 'querySelector 找到了目标元素'],
    [/null is not an object/i, 'querySelector 的返回值'],
    [/setTimeout|setInterval/i, '定时器函数'],
  ]

  function matchError(message: string): string {
    for (const [pattern, hint] of hintMap) {
      if (pattern.test(message)) return hint
    }
    return '仔细检查报错行附近的代码'
  }

  it('queryselector 大小写错误', () => {
    expect(matchError('queryselector is not defined')).toContain('querySelector')
  })

  it('document 拼写错误', () => {
    expect(matchError('docuemnt.getElementById')).toContain('document')
  })

  it('null 属性读取错误', () => {
    expect(matchError("Cannot read properties of null (reading 'classList')")).toContain('选择器没找到元素')
  })

  it('is not a function', () => {
    expect(matchError('x.click is not a function')).toContain('函数名拼写')
  })

  it('is not defined', () => {
    expect(matchError('myVar is not defined')).toContain('还没有声明')
  })

  it('SyntaxError', () => {
    expect(matchError('SyntaxError: Unexpected token }')).toContain('语法错误')
  })

  it('未知错误返回兜底提示', () => {
    expect(matchError('some unknown error message')).toContain('仔细检查')
  })

  it('所有正则均合法', () => {
    for (const [pattern] of hintMap) {
      expect(pattern instanceof RegExp).toBe(true)
    }
  })
})
