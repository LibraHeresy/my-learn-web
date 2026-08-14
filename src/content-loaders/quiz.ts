import gemsJson from '../generated/quiz-gems.json' with { type: 'json' }

export type LevelType = 'normal' | 'elite' | 'boss' | 'achievement-boss'
export type GemId = 'html-tags' | 'html-ability' | 'css-style' | 'css-layout' | 'js-syntax' | 'js-practice' | 'web-foundation' | 'js-async' | 'engineering' | 'vue-basic' | 'vue-advanced' | 'ai-collab' | 'principles' | 'performance' | 'security' | 'testing' | 'architecture' | 'a11y'

export interface QuizQuestion {
  id: number
  gem: string
  level: number
  difficulty: number
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface GemLevel {
  level: number
  type: LevelType
  threshold: number
  name: string
  count: number
}

export interface GemDef {
  id: GemId
  name: string
  icon: string
  achievement: 'junior' | 'mid' | 'senior'
  order: number
  questionIds?: number[]
  levels: GemLevel[]
}

const data = gemsJson as { gems: GemDef[] }

export function getGems(): GemDef[] {
  return data.gems
}

// 按需加载单个 gem 的题目（quiz-questions/{gemId}.json 由 build-content.ts 生成）
export async function getGemQuestions(gemId: string): Promise<QuizQuestion[]> {
  const mod = await import(`../generated/quiz-questions/${gemId}.json`)
  return ((mod as { default?: QuizQuestion[] }).default ?? mod) as QuizQuestion[]
}

// 按 id 集合按需加载题目（跨 gem 错题回顾用，只加载涉及到的 gem 文件）
export async function getQuestionsByIds(ids: number[]): Promise<QuizQuestion[]> {
  const idSet = new Set(ids)
  const neededGems = data.gems.filter((g) => g.questionIds?.some((id) => idSet.has(id)))
  const results: QuizQuestion[] = []
  for (const gem of neededGems) {
    const questions = await getGemQuestions(gem.id)
    for (const q of questions) {
      if (idSet.has(q.id)) results.push(q)
    }
  }
  return results
}
