import { describe, it, expect } from 'vitest'
import { lessons } from '../configs/lessons'
import { prologueLessons } from '../configs/prologues'

// ============================================================
// 导航标签集成测试（使用真实课程数据）
// ============================================================

/** 模拟 LessonPlayer 的导航标签逻辑 */
function computeLabels(
  navList: { id: string; chapterId: string; title: string }[],
  currentId: string,
  isPrologue: boolean
) {
  const idx = navList.findIndex(l => l.id === currentId)
  const prev = idx > 0 ? navList[idx - 1] : null
  const next = idx < navList.length - 1 ? navList[idx + 1] : null
  const current = navList[idx]

  const prevLabel = isPrologue
    ? (prev ? '上一篇' : '')
    : (prev
        ? (prev.chapterId !== current?.chapterId ? '上一章' : '上一课')
        : '')

  const nextLabel = isPrologue
    ? (next ? '下一篇' : '')
    : (next
        ? (next.chapterId !== current?.chapterId ? '下一章' : '下一课')
        : '')

  const prevTitle = isPrologue ? '' : (prev?.title ?? '')
  const nextTitle = isPrologue ? '' : (next?.title ?? '')

  return { prevLabel, nextLabel, prevTitle, nextTitle }
}

describe('导航标签集成测试', () => {
  // ---- 普通课程 ----
  describe('普通课程导航', () => {
    const navList = lessons

    it('第一章第一课：无上一课，有下一课', () => {
      const r = computeLabels(navList, 'html-intro', false)
      expect(r.prevLabel).toBe('')
      expect(r.prevTitle).toBe('')
      expect(r.nextLabel).toBe('下一课')
      expect(r.nextTitle).toBeTruthy()
    })

    it('第一章中间课程：上/下都是同一章', () => {
      const r = computeLabels(navList, 'html-images-links', false)
      expect(r.prevLabel).toBe('上一课')
      expect(r.nextLabel).toBe('下一课')
      expect(r.prevTitle).toBeTruthy()
      expect(r.nextTitle).toBeTruthy()
    })

    it('第一章最后一课跳到第二章第一课：跨章导航', () => {
      const r = computeLabels(navList, 'html-capstone', false)
      expect(r.nextLabel).toBe('下一章')
      expect(r.nextTitle).toBeTruthy()
    })

    it('第二章第一课：从第一章来，上一章', () => {
      const r = computeLabels(navList, 'css-intro', false)
      expect(r.prevLabel).toBe('上一章')
      expect(r.prevTitle).toBeTruthy()
    })

    it('最后一课：无下一课', () => {
      const lastLesson = navList[navList.length - 1]
      const r = computeLabels(navList, lastLesson.id, false)
      expect(r.nextLabel).toBe('')
      expect(r.nextTitle).toBe('')
    })

    it('所有课程的 title 都不为空', () => {
      for (const l of navList) {
        expect(l.title).toBeTruthy()
      }
    })
  })

  // ---- 序言 ----
  describe('序言导航', () => {
    const navList = prologueLessons

    it('第一篇序言：只有下一篇', () => {
      const r = computeLabels(navList, navList[0].id, true)
      expect(r.prevLabel).toBe('')
      expect(r.nextLabel).toBe('下一篇')
    })

    it('中间序言：上一篇 + 下一篇', () => {
      const r = computeLabels(navList, navList[1].id, true)
      expect(r.prevLabel).toBe('上一篇')
      expect(r.nextLabel).toBe('下一篇')
    })

    it('最后一篇序言：只有上一篇', () => {
      const r = computeLabels(navList, navList[navList.length - 1].id, true)
      expect(r.prevLabel).toBe('上一篇')
      expect(r.nextLabel).toBe('')
    })

    it('序言篇不显示标题', () => {
      const r = computeLabels(navList, navList[1].id, true)
      expect(r.prevTitle).toBe('')
      expect(r.nextTitle).toBe('')
    })
  })
})
