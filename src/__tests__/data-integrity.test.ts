import { describe, it, expect } from 'vitest'
import { chapters, lessons } from '../configs/lessons'
import { prologueLessons, prologueCards } from '../configs/prologues'
import { projects } from '../configs/projects'
import { tracks } from '../configs/tracks'
import { glossary } from '../configs/glossary'

// ============================================================
// 第一层：数据完整性测试
// ============================================================

describe('数据完整性', () => {
  // ---- Lessons ----
  describe('lessons', () => {
    it('所有 lesson.id 唯一', () => {
      const ids = lessons.map(l => l.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('所有 lesson.chapterId 指向存在的章节', () => {
      const chapterIds = new Set(chapters.map(c => c.id))
      for (const l of lessons) {
        expect(chapterIds.has(l.chapterId), `lesson "${l.id}" 的 chapterId "${l.chapterId}" 不存在`).toBe(true)
      }
    })

    it('所有 lesson.order 在同一 chapter 内连续不重复', () => {
      const byChapter = new Map<string, number[]>()
      for (const l of lessons) {
        const orders = byChapter.get(l.chapterId) || []
        orders.push(l.order)
        byChapter.set(l.chapterId, orders)
      }
      for (const [cid, orders] of byChapter) {
        const sorted = [...orders].sort((a, b) => a - b)
        expect(sorted, `chapter "${cid}" order 重复或跳号: ${orders}`).toEqual(
          Array.from({ length: sorted.length }, (_, i) => i + 1)
        )
      }
    })

    it('所有 lesson 有必填字段', () => {
      for (const l of lessons) {
        expect(l.id, 'id 缺失').toBeTruthy()
        expect(l.title, `"${l.id}" title 缺失`).toBeTruthy()
        expect(l.musicAnalogy, `"${l.id}" musicAnalogy 缺失`).toBeTruthy()
        expect(l.sections.length, `"${l.id}" sections 为空`).toBeGreaterThan(0)
        expect(l.starterCode, `"${l.id}" starterCode 缺失`).toBeDefined()
      }
    })

    it('所有 lesson.sections 的 content 非空', () => {
      for (const l of lessons) {
        for (const s of l.sections) {
          expect(s.content.trim(), `"${l.id}" section "${s.title}" content 为空`).not.toBe('')
        }
      }
    })

    it('所有 lesson.trackId 指向存在的 track（或默认 fundamentals）', () => {
      const trackIds = new Set(tracks.map(t => t.id))
      for (const l of lessons) {
        const tid = l.trackId || 'fundamentals'
        expect(trackIds.has(tid), `lesson "${l.id}" trackId "${tid}" 不存在`).toBe(true)
      }
    })
  })

  // ---- Chapters ----
  describe('chapters', () => {
    it('所有 chapter.id 唯一', () => {
      const ids = chapters.map(c => c.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('每个 chapter 至少有一课', () => {
      for (const c of chapters) {
        const count = lessons.filter(l => l.chapterId === c.id).length
        expect(count, `chapter "${c.id}" 没有课程`).toBeGreaterThan(0)
      }
    })
  })

  // ---- Prologues ----
  describe('prologues', () => {
    it('所有 prologue.id 唯一', () => {
      const ids = prologueLessons.map(l => l.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('prologueLessons 和 prologueCards id 一一对应', () => {
      const lessonIds = new Set(prologueLessons.map(l => l.id))
      const cardLessonIds = new Set(prologueCards.map(c => c.lessonId))
      expect(lessonIds).toEqual(cardLessonIds)
    })

    it('所有 prologue 有必填字段', () => {
      for (const l of prologueLessons) {
        expect(l.id).toBeTruthy()
        expect(l.title).toBeTruthy()
        expect(l.sections.length).toBeGreaterThan(0)
      }
    })
  })

  // ---- Projects ----
  describe('projects', () => {
    it('所有 project.id 唯一', () => {
      const ids = projects.map(p => p.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('所有 project 至少有一个 step', () => {
      for (const p of projects) {
        expect(p.steps.length, `project "${p.id}" 没有步骤`).toBeGreaterThan(0)
      }
    })

    it('所有 step 的 task 非空', () => {
      for (const p of projects) {
        for (const s of p.steps) {
          expect(s.task.trim(), `project "${p.id}" step "${s.title}" task 为空`).not.toBe('')
        }
      }
    })
  })

  // ---- Glossary ----
  describe('glossary', () => {
    it('术语 key 无重复', () => {
      const keys = glossary.map(([k]) => k)
      expect(new Set(keys).size).toBe(keys.length)
    })

    it('所有术语有 explanation', () => {
      for (const [key, def] of glossary) {
        expect(def.explanation, `术语 "${key}" 缺少 explanation`).toBeTruthy()
      }
    })

    it('长术语排在短术语前面（同前缀检查）', () => {
      // 只检查共享前缀的术语对——短术语不应排在长术语前面
      for (let i = 0; i < glossary.length; i++) {
        const [keyA] = glossary[i]
        for (let j = i + 1; j < glossary.length; j++) {
          const [keyB] = glossary[j]
          if (keyA.startsWith(keyB) && keyA.length > keyB.length) {
            // keyA 更长且包含 keyB 作为前缀，keyA 应该排在前面 ✓
            break
          }
          if (keyB.startsWith(keyA) && keyB.length > keyA.length) {
            // keyB 更长但排在后面——这是错误
            expect.fail(
              `术语顺序错误: 更长的 "${keyB}" 排在更短的 "${keyA}" 后面，短术语会先匹配导致长术语永不生效`
            )
          }
        }
      }
    })
  })

  // ---- Tracks ----
  describe('tracks', () => {
    it('所有 track.id 唯一', () => {
      const ids = tracks.map(t => t.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('所有 track.order 连续不重复', () => {
      const orders = tracks.map(t => t.order).sort((a, b) => a - b)
      expect(orders).toEqual([1, 2, 3, 4])
    })

    it('所有 track 有必填字段', () => {
      for (const t of tracks) {
        expect(t.id).toBeTruthy()
        expect(t.title).toBeTruthy()
        expect(t.subtitle).toBeTruthy()
      }
    })
  })
})
