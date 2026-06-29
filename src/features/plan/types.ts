export type PlanTaskType = 'lesson' | 'project' | 'quiz' | 'review'

export type PlanTargetType = 'lesson' | 'project' | 'quiz' | 'review'

export type PlanCompletionMode = 'auto-progress' | 'auto-quiz' | 'manual'

export type PlanTaskStatus =
  | '未开始'
  | '进行中'
  | '已点亮'
  | '推荐下一步'
  | '可回补'

export type PlanQuizGoal =
  | { type: 'overall-accuracy'; value: number }
  | { type: 'wrong-count-at-most'; value: number }

export type PlanTask = {
  id: string
  title: string
  type: PlanTaskType
  targetType: PlanTargetType
  targetId: string | null
  estimatedMinutes: number
  completionMode: PlanCompletionMode
  summary: string
  reward: string
  helperTips?: string[]
  quizGoal?: PlanQuizGoal
}

export type PlanDay = {
  id: string
  order: number
  title: string
  theme: string
  estimatedMinutes: number
  canStartFreely: true
  tasks: PlanTask[]
}

export type PlanWeek = {
  id: string
  weekNumber: number
  phaseId: string
  phaseTitle: string
  title: string
  summary: string
  milestone: string
  days: PlanDay[]
}

export type PlanPhase = {
  id: string
  title: string
  startWeek: number
  endWeek: number
  summary: string
  milestone: string
}

export type PlanStoreState = {
  selectedWeek: number
  selectedDayByWeek: Record<string, number>
  manualCompleted: Record<string, boolean>
}
