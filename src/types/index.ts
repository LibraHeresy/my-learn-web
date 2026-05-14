// 教学内容段落类型
export interface LessonSection {
  type: 'explain' | 'task' | 'hint' | 'example'
  title?: string
  content: string
}

// 单节课程
export interface Lesson {
  id: string
  chapterId: string
  order: number
  title: string
  musicAnalogy: string
  sections: LessonSection[]
  starterCode: { html: string; css: string; js: string }
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
