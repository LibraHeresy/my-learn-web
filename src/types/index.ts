export interface LessonProgress {
  lessonId: string
  completed: boolean
  userCode: { html: string; css: string; js: string }
  lastVisited: number
  /** 任务步骤完成状态：key = 断言字符串（自动验收）或 "manual:{stepIndex}"（手动勾选） */
  taskSteps?: Record<string, boolean>
}

export interface UserCode {
  html: string
  css: string
  js: string
}

export interface ProjectProgress {
  projectId: string
  completed: boolean
  currentStep: number
  visitedSteps: number[]
  lastVisited: number
}
