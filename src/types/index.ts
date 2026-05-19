// 教学内容段落类型
export interface LessonSection {
  type: 'explain' | 'task' | 'hint' | 'example'
  title?: string
  content: string
}

// 学习轨道
export interface Track {
  id: string
  title: string
  subtitle: string
  icon: string
  order: number
}

// 学习模式：sandbox = 浏览器内编辑器+预览 | local = 引导在本地 IDE 操作
export type LessonMode = 'sandbox' | 'local'

// 单节课程
export interface Lesson {
  id: string
  chapterId: string
  trackId?: string
  order: number
  title: string
  musicAnalogy: string
  sections: LessonSection[]
  starterCode: { html: string; css: string; js: string }
  listenTo?: string
  mode?: LessonMode  // 默认 'sandbox'
}

// 项目步骤
export interface ProjectStep {
  title: string
  content: string
  task: string
  hint?: string
  starterCode?: { html: string; css: string; js: string }
}

// 学习模式：sandbox = 浏览器内编辑器+预览 | local = 引导在本地 IDE 操作
export type ProjectMode = 'sandbox' | 'local'

// 实践项目
export interface Project {
  id: string
  trackId: string
  order: number
  title: string
  subtitle: string
  icon: string
  musicAnalogy: string
  prerequisiteTrackIds: string[]
  mode: ProjectMode
  steps: ProjectStep[]
  listenTo?: string
}

// 课程章节
export interface Chapter {
  id: string
  title: string
  subtitle: string
  icon: string
}

// 学习进度
export interface LessonProgress {
  lessonId: string
  completed: boolean
  userCode: { html: string; css: string; js: string }
  lastVisited: number
}

// 用户代码（编辑器中的三部分）
export interface UserCode {
  html: string
  css: string
  js: string
}
