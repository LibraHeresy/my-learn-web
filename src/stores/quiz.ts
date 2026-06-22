import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAllQuestions, getGems, type QuizQuestion, type GemDef } from '../content-loaders/quiz'
const gems = getGems()
const quizQuestions = getAllQuestions()

const STORAGE_KEY = 'code-score-quiz-v2'

interface LevelProgress { passed: boolean; bestScore: number; bestTotal: number }
interface GemProgress { levels: Record<number, LevelProgress> }
interface QuizData { gems: Record<string, GemProgress>; wrongPool: number[]; questionStreaks: Record<number, number>; totalAnswered: number; totalCorrect: number; version: number }

function load(): QuizData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) { const d = JSON.parse(raw); if (d.version === 1) { d.questionStreaks = d.questionStreaks || {}; d.version = 2; return d } }
  } catch { /* ignore */ }
  return { gems: {}, wrongPool: [], questionStreaks: {}, totalAnswered: 0, totalCorrect: 0, version: 2 }
}

function save(data: QuizData) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }

export const useQuizStore = defineStore('quiz', () => {
  const data = ref<QuizData>(load())

  function getGemProgress(gemId: string): GemProgress {
    if (!data.value.gems[gemId]) data.value.gems[gemId] = { levels: {} }
    return data.value.gems[gemId]
  }

  function getLevelProgress(gemId: string, level: number): LevelProgress {
    const g = getGemProgress(gemId)
    if (!g.levels[level]) g.levels[level] = { passed: false, bestScore: 0, bestTotal: 0 }
    return g.levels[level]
  }

  function isGemUnlocked(gem: GemDef): boolean {
    if (gem.order === 1) return true // first gem always unlocked
    if (gem.achievement === 'mid') return juniorAchievement.value
    if (gem.achievement === 'senior') return midAchievement.value
    // junior gem: previous gem's last level passed
    const prev = gems.find(g => g.achievement === gem.achievement && g.order === gem.order - 1)
    if (!prev) return true
    const prevLastLevel = prev.levels[prev.levels.length - 1]
    return getLevelProgress(prev.id, prevLastLevel.level).passed
  }

  function isLevelUnlocked(gemId: string, level: number): boolean {
    if (level === 1) return true
    return getLevelProgress(gemId, level - 1).passed
  }

  function recordLevelResult(gemId: string, level: number, score: number, total: number, wrongQuestionIds: number[]) {
    const lp = getLevelProgress(gemId, level)
    const pct = total > 0 ? Math.round(score / total * 100) : 0
    if (pct > lp.bestScore || (pct === lp.bestScore && total > lp.bestTotal)) {
      lp.bestScore = pct; lp.bestTotal = total
    }
    const gemDef = gems.find(g => g.id === gemId)
    const levelDef = gemDef?.levels.find(l => l.level === level)
    if (levelDef && pct >= levelDef.threshold) lp.passed = true

    data.value.totalAnswered += total
    data.value.totalCorrect += score

    // Update wrong pool + streaks
    for (const qid of wrongQuestionIds) {
      if (!data.value.wrongPool.includes(qid)) data.value.wrongPool.push(qid)
      data.value.questionStreaks[qid] = 0
    }
    save(data.value)
  }

  function recordAnswer(questionId: number, correct: boolean) {
    if (correct) {
      const s = (data.value.questionStreaks[questionId] || 0) + 1
      data.value.questionStreaks[questionId] = s
      // 3 consecutive correct → remove from wrong pool
      if (s >= 3 && data.value.wrongPool.includes(questionId)) {
        data.value.wrongPool = data.value.wrongPool.filter(id => id !== questionId)
      }
    } else {
      data.value.questionStreaks[questionId] = 0
      if (!data.value.wrongPool.includes(questionId)) data.value.wrongPool.push(questionId)
    }
    save(data.value)
  }

  function getQuestionStreak(questionId: number): number { return data.value.questionStreaks[questionId] || 0 }

  function pickLevelQuestions(gemId: string, level: number): QuizQuestion[] {
    const pool = quizQuestions.filter(q => q.gem === gemId && q.level === level)
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    return shuffled
  }

  function pickWrongQuestions(count = 10): QuizQuestion[] {
    const pool = data.value.wrongPool
      .map(id => quizQuestions.find(q => q.id === id))
      .filter(Boolean) as QuizQuestion[]
    return [...pool].sort(() => Math.random() - 0.5).slice(0, count)
  }

  // Gem completion
  function isGemComplete(gemId: string): boolean {
    const gemDef = gems.find(g => g.id === gemId)
    if (!gemDef) return false
    return gemDef.levels.every(l => getLevelProgress(gemId, l.level).passed)
  }

  // Achievements
  const juniorGemIds = gems.filter(g => g.achievement === 'junior').map(g => g.id)
  const midGemIds = gems.filter(g => g.achievement === 'mid').map(g => g.id)
  const seniorGemIds = gems.filter(g => g.achievement === 'senior').map(g => g.id)

  const juniorProgress = computed(() => juniorGemIds.filter(id => isGemComplete(id)).length)
  const juniorTotal = juniorGemIds.length
  const juniorAchievement = computed(() => juniorProgress.value >= juniorTotal)
  const midProgress = computed(() => midGemIds.filter(id => isGemComplete(id)).length)
  const midTotal = midGemIds.length
  const midAchievement = computed(() => midProgress.value >= midTotal)
  const seniorProgress = computed(() => seniorGemIds.filter(id => isGemComplete(id)).length)
  const seniorTotal = seniorGemIds.length
  const seniorAchievement = computed(() => seniorProgress.value >= seniorTotal)

  const wrongCount = computed(() => data.value.wrongPool.length)
  const overallAccuracy = computed(() => {
    const t = data.value.totalAnswered
    return t > 0 ? Math.round(data.value.totalCorrect / t * 100) : 0
  })

  return {
    data, gems, quizQuestions, wrongCount, overallAccuracy,
    juniorProgress, juniorTotal, juniorAchievement,
    midProgress, midTotal, midAchievement,
    seniorProgress, seniorTotal, seniorAchievement,
    getGemProgress, getLevelProgress, isGemUnlocked, isLevelUnlocked, isGemComplete,
    recordLevelResult, recordAnswer, getQuestionStreak, pickLevelQuestions, pickWrongQuestions
  }
})
