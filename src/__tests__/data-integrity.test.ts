import { describe, it, expect } from 'vitest'
import { getAllLessons, getLesson } from '../content-loaders/lessons'
import { getAllProjects, getProject } from '../content-loaders/projects'
import { chapters, tracks } from '../content-loaders/taxonomy'
import { prologueCards } from '../content-loaders/prologues'
import { getGlossaryTuples } from '../content-loaders/glossary'
const glossary = getGlossaryTuples()

// ============================================================
// 第一层：数据完整性测试
// ============================================================

describe('数据完整性', () => {
  const lessons = getAllLessons()
  const projects = getAllProjects()
  const prologueLessons = lessons.filter((l) => l.meta.track === 'prologue')

  // ---- Lessons ----
  describe('lessons', () => {
    it('所有 lesson.id 唯一', () => {
      const ids = lessons.map(l => l.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('所有 lesson.meta.chapter 指向存在的章节', () => {
      const chapterIds = new Set(chapters.map(c => c.id))
      for (const l of lessons) {
        expect(chapterIds.has(l.meta.chapter), `lesson "${l.id}" 的 chapter "${l.meta.chapter}" 不存在`).toBe(true)
      }
    })

    it('所有 lesson.meta.order 在同一 track+chapter 内为正整数且不重复', () => {
      const byGroup = new Map<string, number[]>()
      for (const l of lessons) {
        const key = `${l.meta.track}::${l.meta.chapter}`
        const orders = byGroup.get(key) || []
        orders.push(l.meta.order)
        byGroup.set(key, orders)
      }
      for (const [key, orders] of byGroup) {
        for (const o of orders) {
          expect(Number.isInteger(o), `group "${key}" 的 order 必须是整数`).toBe(true)
          expect(o, `group "${key}" 的 order 必须大于 0`).toBeGreaterThan(0)
        }
        expect(new Set(orders).size, `group "${key}" order 重复: ${orders}`).toBe(orders.length)
      }
    })

    it('所有 lesson 有必填字段', async () => {
      for (const l of lessons) {
        expect(l.id, 'id 缺失').toBeTruthy()
        expect(l.meta.title, `"${l.id}" meta.title 缺失`).toBeTruthy()
        expect(l.meta.track, `"${l.id}" meta.track 缺失`).toBeTruthy()
        expect(l.meta.chapter, `"${l.id}" meta.chapter 缺失`).toBeTruthy()
        expect(l.meta.mode, `"${l.id}" meta.mode 缺失`).toBeTruthy()
        expect(l.meta.analogy, `"${l.id}" meta.analogy 缺失`).toBeTruthy()
        const full = await getLesson(l.id)
        expect(full, `"${l.id}" 无法加载`).not.toBeNull()
        expect(full!.body.length, `"${l.id}" body 为空`).toBeGreaterThan(0)
        expect(full!.starter, `"${l.id}" starter 缺失`).toBeDefined()
      }
    })

    it('所有 lesson.meta.track 指向存在的 track', () => {
      const trackIds = new Set(tracks.map(t => t.id))
      for (const l of lessons) {
        expect(trackIds.has(l.meta.track), `lesson "${l.id}" track "${l.meta.track}" 不存在`).toBe(true)
      }
    })
  })

  // ---- Chapters ----
  describe('chapters', () => {
    it('所有 chapter.id 唯一', () => {
      const ids = chapters.map(c => c.id)
      expect(new Set(ids).size).toBe(ids.length)
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

    it('所有 prologue 有必填字段', async () => {
      for (const l of prologueLessons) {
        expect(l.id).toBeTruthy()
        expect(l.meta.title).toBeTruthy()
        const full = await getLesson(l.id)
        expect(full, `"${l.id}" 无法加载`).not.toBeNull()
        expect(full!.body.length).toBeGreaterThan(0)
      }
    })
  })

  // ---- Projects ----
  describe('projects', () => {
    it('所有 project.id 唯一', () => {
      const ids = projects.map(p => p.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('所有 project 至少有一个 step', async () => {
      for (const p of projects) {
        const full = await getProject(p.id)
        expect(full, `project "${p.id}" 无法加载`).not.toBeNull()
        expect(full!.steps.length, `project "${p.id}" 没有步骤`).toBeGreaterThan(0)
        expect(full!.meta.analogyBody?.length, `project "${p.id}" meta.analogyBody 缺失`).toBeGreaterThan(0)
      }
    })

    it('所有项目步骤都生成结构化正文字段', async () => {
      for (const p of projects) {
        const full = await getProject(p.id)
        expect(full, `project "${p.id}" 无法加载`).not.toBeNull()
        for (const s of full!.steps) {
          expect(s.contentBody.length, `project "${p.id}" step "${s.title}" contentBody 缺失`).toBeGreaterThan(0)
          expect(s.taskBody.length, `project "${p.id}" step "${s.title}" taskBody 缺失`).toBeGreaterThan(0)
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

    it('所有 track.order 不重复', () => {
      const orders = tracks.map(t => t.order)
      expect(new Set(orders).size).toBe(orders.length)
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
