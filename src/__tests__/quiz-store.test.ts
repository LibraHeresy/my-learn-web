import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import type { GemDef, QuizQuestion } from '../content-loaders/quiz'

// ---------- Mock quiz loader ----------
// vi.mock 会被提升到文件顶部，在模块加载前执行
const mockGems: GemDef[] = [
  {
    id: 'html-tags',
    name: 'HTML 标签',
    icon: '🏷️',
    achievement: 'junior',
    order: 1,
    levels: [
      { level: 1, type: 'normal', threshold: 60, name: '第一关', count: 3 },
      { level: 2, type: 'normal', threshold: 70, name: '第二关', count: 3 },
    ],
  },
  {
    id: 'css-style',
    name: 'CSS 样式',
    icon: '🎨',
    achievement: 'junior',
    order: 2,
    levels: [
      { level: 1, type: 'normal', threshold: 60, name: '第一关', count: 3 },
    ],
  },
  {
    id: 'js-syntax',
    name: 'JS 语法',
    icon: '⚡',
    achievement: 'mid',
    order: 3,  // mid 层次宝石全局序号不为 1，避免触发“第一宝石始终解锁”逻辑
    levels: [
      { level: 1, type: 'normal', threshold: 60, name: '第一关', count: 3 },
    ],
  },
]

const mockQuestions: QuizQuestion[] = [
  { id: 1, gem: 'html-tags', level: 1, difficulty: 1, question: 'Q1', options: ['A', 'B', 'C', 'D'], answer: 0, explanation: 'E1' },
  { id: 2, gem: 'html-tags', level: 1, difficulty: 1, question: 'Q2', options: ['A', 'B', 'C', 'D'], answer: 1, explanation: 'E2' },
  { id: 3, gem: 'css-style', level: 1, difficulty: 1, question: 'Q3', options: ['A', 'B', 'C', 'D'], answer: 0, explanation: 'E3' },
]

vi.mock('../content-loaders/quiz', () => ({
  getGems: () => mockGems,
  getGemQuestions: async (gemId: string) =>
    mockQuestions.filter((q) => q.gem === gemId),
  getQuestionsByIds: async (ids: number[]) =>
    mockQuestions.filter((q) => ids.includes(q.id)),
}))

// ---------- Tests ----------

describe('Quiz Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // 清空 localStorage，防止测试间状态泄漏
    localStorage.clear()
  })

  async function getStore() {
    const { useQuizStore } = await import('../stores/quiz')
    return useQuizStore()
  }

  // ===== 错题池 =====
  describe('错题池（wrongPool）', () => {
    it('答错题目后加入错题池', async () => {
      const store = await getStore()
      store.recordAnswer(1, false)
      expect(store.data.wrongPool).toContain(1)
    })

    it('答错同一题多次不重复添加', async () => {
      const store = await getStore()
      store.recordAnswer(1, false)
      store.recordAnswer(1, false)
      const count = store.data.wrongPool.filter((id) => id === 1).length
      expect(count).toBe(1)
    })

    it('答对题目不加入错题池', async () => {
      const store = await getStore()
      store.recordAnswer(1, true)
      expect(store.data.wrongPool).not.toContain(1)
    })

    it('答错后加入错题池，连续答对 3 次后移出', async () => {
      const store = await getStore()
      // 先答错，加入错题池
      store.recordAnswer(1, false)
      expect(store.data.wrongPool).toContain(1)

      // 连续答对 2 次，还不够移出
      store.recordAnswer(1, true)
      store.recordAnswer(1, true)
      expect(store.data.wrongPool).toContain(1)

      // 第 3 次答对，移出错题池
      store.recordAnswer(1, true)
      expect(store.data.wrongPool).not.toContain(1)
    })

    it('答对中途答错，连击重置，重新开始计数', async () => {
      const store = await getStore()
      store.recordAnswer(1, false) // 加入错题池
      store.recordAnswer(1, true)  // streak = 1
      store.recordAnswer(1, true)  // streak = 2
      store.recordAnswer(1, false) // 答错，streak = 0，仍在错题池
      store.recordAnswer(1, true)  // streak = 1
      store.recordAnswer(1, true)  // streak = 2
      // 还不到 3，仍在错题池
      expect(store.data.wrongPool).toContain(1)
      store.recordAnswer(1, true)  // streak = 3，移出
      expect(store.data.wrongPool).not.toContain(1)
    })
  })

  // ===== 关卡推进 =====
  describe('关卡推进（recordLevelResult）', () => {
    it('达到阈值时标记关卡通过', async () => {
      const store = await getStore()
      // html-tags 关卡1 threshold=60，答对 3/3 = 100%
      store.recordLevelResult('html-tags', 1, 3, 3, [])
      expect(store.getLevelProgress('html-tags', 1).passed).toBe(true)
    })

    it('未达到阈值不标记通过', async () => {
      const store = await getStore()
      // threshold=60，答对 1/3 = 33%
      store.recordLevelResult('html-tags', 1, 1, 3, [])
      expect(store.getLevelProgress('html-tags', 1).passed).toBe(false)
    })

    it('记录最佳成绩（百分比）', async () => {
      const store = await getStore()
      store.recordLevelResult('html-tags', 1, 2, 3, [])  // 67%
      expect(store.getLevelProgress('html-tags', 1).bestScore).toBe(67)
    })

    it('成绩更高时更新最佳成绩', async () => {
      const store = await getStore()
      store.recordLevelResult('html-tags', 1, 1, 3, [])  // 33%
      store.recordLevelResult('html-tags', 1, 3, 3, [])  // 100%
      expect(store.getLevelProgress('html-tags', 1).bestScore).toBe(100)
    })

    it('成绩更低时不更新最佳成绩', async () => {
      const store = await getStore()
      store.recordLevelResult('html-tags', 1, 3, 3, [])  // 100%
      store.recordLevelResult('html-tags', 1, 1, 3, [])  // 33%
      expect(store.getLevelProgress('html-tags', 1).bestScore).toBe(100)
    })

    it('关卡1 通过后，关卡2 解锁', async () => {
      const store = await getStore()
      expect(store.isLevelUnlocked('html-tags', 2)).toBe(false)
      store.recordLevelResult('html-tags', 1, 3, 3, [])  // 通过关卡1
      expect(store.isLevelUnlocked('html-tags', 2)).toBe(true)
    })

    it('错题从 wrongQuestionIds 加入错题池', async () => {
      const store = await getStore()
      store.recordLevelResult('html-tags', 1, 1, 3, [1, 2])
      expect(store.data.wrongPool).toContain(1)
      expect(store.data.wrongPool).toContain(2)
    })

    it('更新总答题数和总正确数', async () => {
      const store = await getStore()
      store.recordLevelResult('html-tags', 1, 2, 3, [])
      expect(store.data.totalAnswered).toBe(3)
      expect(store.data.totalCorrect).toBe(2)
    })
  })

  // ===== 成就解锁 =====
  describe('成就解锁', () => {
    it('第一个宝石（order=1）始终解锁', async () => {
      const store = await getStore()
      const firstGem = mockGems[0]
      expect(store.isGemUnlocked(firstGem)).toBe(true)
    })

    it('第二个 junior 宝石需要第一个宝石最后一关通过', async () => {
      const store = await getStore()
      const cssGem = mockGems[1] // css-style, order=2
      expect(store.isGemUnlocked(cssGem)).toBe(false)

      // 通过 html-tags 的最后一关（关卡2）
      store.recordLevelResult('html-tags', 2, 3, 3, [])
      expect(store.isGemUnlocked(cssGem)).toBe(true)
    })

    it('mid 宝石需要 juniorAchievement', async () => {
      const store = await getStore()
      const jsGem = mockGems[2] // js-syntax, achievement=mid
      expect(store.isGemUnlocked(jsGem)).toBe(false)

      // juniorAchievement = 所有 junior 宝石通过
      // html-tags: 通过关卡1和关卡2
      store.recordLevelResult('html-tags', 1, 3, 3, [])
      store.recordLevelResult('html-tags', 2, 3, 3, [])
      // css-style: 通过关卡1
      store.recordLevelResult('css-style', 1, 3, 3, [])

      expect(store.juniorAchievement).toBe(true)
      expect(store.isGemUnlocked(jsGem)).toBe(true)
    })

    it('部分 junior 宝石完成，midAchievement 不解锁', async () => {
      const store = await getStore()
      // 只通过 html-tags，不通过 css-style
      store.recordLevelResult('html-tags', 1, 3, 3, [])
      store.recordLevelResult('html-tags', 2, 3, 3, [])
      expect(store.juniorAchievement).toBe(false)
    })

    it('isGemComplete：所有关卡通过时返回 true', async () => {
      const store = await getStore()
      expect(store.isGemComplete('html-tags')).toBe(false)
      store.recordLevelResult('html-tags', 1, 3, 3, [])
      expect(store.isGemComplete('html-tags')).toBe(false) // 还有关卡2
      store.recordLevelResult('html-tags', 2, 3, 3, [])
      expect(store.isGemComplete('html-tags')).toBe(true)
    })
  })

  // ===== 整体正确率 =====
  describe('整体正确率（overallAccuracy）', () => {
    it('初始正确率为 0', async () => {
      const store = await getStore()
      expect(store.overallAccuracy).toBe(0)
    })

    it('正确率计算正确', async () => {
      const store = await getStore()
      store.recordLevelResult('html-tags', 1, 2, 4, [])  // 2/4
      store.recordLevelResult('html-tags', 2, 3, 4, [])  // 3/4
      // total: 5/8 = 62.5 → 63
      expect(store.overallAccuracy).toBe(63)
    })
  })

  // ===== pickWrongQuestions =====
  describe('pickWrongQuestions', () => {
    it('从错题池选取题目', async () => {
      const store = await getStore()
      store.recordAnswer(1, false)
      store.recordAnswer(3, false)
      const result = await store.pickWrongQuestions(10)
      expect(result.length).toBe(2)
      const ids = result.map((q) => q.id)
      expect(ids).toContain(1)
      expect(ids).toContain(3)
    })

    it('错题池为空时返回空数组', async () => {
      const store = await getStore()
      expect(await store.pickWrongQuestions()).toHaveLength(0)
    })
  })
})
