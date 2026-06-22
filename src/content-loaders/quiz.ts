import quizJson from '../generated/quiz.json' with { type: 'json' }

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
  levels: GemLevel[]
}

const data = quizJson as { gems: GemDef[]; questions: QuizQuestion[] }

export function getAllQuestions(): QuizQuestion[] {
  return data.questions
}

export function getGems(): GemDef[] {
  return data.gems
}
