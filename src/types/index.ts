export interface LessonProgress {
  lessonId: string
  completed: boolean
  userCode: { html: string; css: string; js: string }
  lastVisited: number
}

export interface UserCode {
  html: string
  css: string
  js: string
}
