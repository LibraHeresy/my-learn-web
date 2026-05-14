import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { LessonProgress, UserCode } from '../types'

const STORAGE_KEY = 'code-score-progress'
// 课程数据版本号，修改 lessons.ts 后递增此值，即可自动清空用户旧代码
const DATA_VERSION = 3

export const useProgressStore = defineStore('progress', () => {
  const lessonProgress = ref<Record<string, LessonProgress>>({})
  const currentLessonId = ref('')

  // 已完成课程列表
  const completedLessons = computed(() =>
    Object.values(lessonProgress.value)
      .filter(p => p.completed)
      .map(p => p.lessonId)
  )

  // 从 localStorage 加载
  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        // 版本不匹配时，保留完成状态但清空旧代码
        if (data._version !== DATA_VERSION) {
          const oldProgress = data.progress || data
          lessonProgress.value = {}
          if (oldProgress && typeof oldProgress === 'object') {
            for (const [id, p] of Object.entries(oldProgress)) {
              if ((p as LessonProgress).completed) {
                lessonProgress.value[id] = {
                  lessonId: id,
                  completed: true,
                  userCode: { html: '', css: '', js: '' },
                  lastVisited: Date.now()
                }
              }
            }
          }
          persistProgress()
        } else {
          lessonProgress.value = data.progress || {}
        }
      }
    } catch {
      lessonProgress.value = {}
    }
  }

  // 持久化
  function persistProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      _version: DATA_VERSION,
      progress: lessonProgress.value
    }))
  }

  // 保存用户代码
  function saveUserCode(lessonId: string, code: UserCode) {
    if (!lessonProgress.value[lessonId]) {
      lessonProgress.value[lessonId] = {
        lessonId,
        completed: false,
        userCode: code,
        lastVisited: Date.now()
      }
    } else {
      lessonProgress.value[lessonId].userCode = code
      lessonProgress.value[lessonId].lastVisited = Date.now()
    }
    persistProgress()
  }

  // 获取用户代码（如果有保存则返回，否则返回 starterCode）
  function getUserCode(lessonId: string, starterCode: UserCode): UserCode {
    const saved = lessonProgress.value[lessonId]
    if (saved && saved.userCode) {
      return saved.userCode
    }
    return starterCode
  }

  // 标记完成
  function markComplete(lessonId: string) {
    if (!lessonProgress.value[lessonId]) {
      lessonProgress.value[lessonId] = {
        lessonId,
        completed: true,
        userCode: { html: '', css: '', js: '' },
        lastVisited: Date.now()
      }
    } else {
      lessonProgress.value[lessonId].completed = true
      lessonProgress.value[lessonId].lastVisited = Date.now()
    }
    persistProgress()
  }

  // 是否已完成
  function isCompleted(lessonId: string): boolean {
    return lessonProgress.value[lessonId]?.completed ?? false
  }

  // 初始化加载
  loadProgress()

  return {
    lessonProgress,
    currentLessonId,
    completedLessons,
    saveUserCode,
    getUserCode,
    markComplete,
    isCompleted,
    loadProgress
  }
})
