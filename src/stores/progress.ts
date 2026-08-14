import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LessonProgress, UserCode } from '../types'
import { safeSetItem, safeGetItem } from '../utils/storage'

const STORAGE_KEY = 'code-score-progress'
// 课程数据版本号，修改 lessons.ts 后递增此值，即可自动清空用户旧代码
const DATA_VERSION = 5

let saveTimer: ReturnType<typeof setTimeout> | null = null

export const useProgressStore = defineStore('progress', () => {
  const lessonProgress = ref<Record<string, LessonProgress>>({})
  const currentLessonId = ref('')

  // 从 localStorage 加载
  function loadProgress() {
    try {
      const result = safeGetItem(STORAGE_KEY)
      const raw = result.value
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

  const lastError = ref<string | null>(null)

  // 持久化
  function persistProgress() {
    const result = safeSetItem(STORAGE_KEY, JSON.stringify({
      _version: DATA_VERSION,
      progress: lessonProgress.value
    }))
    if (!result.success) {
      lastError.value = result.error ?? '保存失败'
      setTimeout(() => { lastError.value = null }, 5000)
    }
  }

  // 标记完成
  function markComplete(lessonId: string) {
    // 若有待执行的防抖保存，立即持久化
    if (saveTimer) {
      clearTimeout(saveTimer)
      saveTimer = null
      persistProgress()
    }
    const entry = ensureProgress(lessonId)
    entry.completed = true
    entry.lastVisited = Date.now()
    persistProgress()
  }

  // 是否已完成
  function isCompleted(lessonId: string): boolean {
    return lessonProgress.value[lessonId]?.completed ?? false
  }

  // 确保进度条目存在（仅首次创建时赋值到 record，触发 watchEffect）
  function ensureProgress(lessonId: string): LessonProgress {
    if (!lessonProgress.value[lessonId]) {
      lessonProgress.value[lessonId] = {
        lessonId,
        completed: false,
        userCode: { html: '', css: '', js: '' },
        lastVisited: Date.now(),
      }
    }
    return lessonProgress.value[lessonId]
  }

  // 保存用户代码（800ms 防抖）
  // 注意：使用属性赋值而非替换整个对象，避免触发 watchEffect 重新执行
  function saveUserCode(lessonId: string, code: UserCode) {
    const entry = ensureProgress(lessonId)

    entry.userCode = { ...code }
    entry.lastVisited = Date.now()

    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      persistProgress()
    }, 800)
  }

  // 获取用户已保存的代码
  function getUserCode(lessonId: string): UserCode | null {
    const entry = lessonProgress.value[lessonId]
    if (!entry) return null
    const code = entry.userCode
    // 只有当用户实际修改过（非全空）时才返回
    if (!code.html && !code.css && !code.js) return null
    return { ...code }
  }

  // 重置用户代码（取消防抖并立即持久化）
  function resetUserCode(lessonId: string) {
    if (saveTimer) {
      clearTimeout(saveTimer)
      saveTimer = null
    }
    if (lessonProgress.value[lessonId]) {
      lessonProgress.value[lessonId].userCode = { html: '', css: '', js: '' }
      persistProgress()
    }
  }

  // 任务步骤完成状态（自动验收 + 手动勾选共用）
  function markTaskStep(lessonId: string, key: string, done: boolean) {
    const entry = ensureProgress(lessonId)
    if (!entry.taskSteps) entry.taskSteps = {}
    entry.taskSteps[key] = done
    persistProgress()
  }

  function isTaskStepDone(lessonId: string, key: string): boolean {
    return lessonProgress.value[lessonId]?.taskSteps?.[key] ?? false
  }

  // 批量标记自动验收通过的断言
  function markAssertPassed(lessonId: string, passedKeys: string[]) {
    if (!passedKeys.length) return
    const entry = ensureProgress(lessonId)
    if (!entry.taskSteps) entry.taskSteps = {}
    let changed = false
    for (const key of passedKeys) {
      if (!entry.taskSteps[key]) {
        entry.taskSteps[key] = true
        changed = true
      }
    }
    if (changed) persistProgress()
  }

  // 初始化加载
  loadProgress()

  return {
    lessonProgress,
    currentLessonId,
    markComplete,
    isCompleted,
    saveUserCode,
    getUserCode,
    resetUserCode,
    markTaskStep,
    isTaskStepDone,
    markAssertPassed,
    lastError,
  }
})
