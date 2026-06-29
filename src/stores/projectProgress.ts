import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProjectProgress } from '../types'
import { safeGetItem, safeSetItem } from '../utils/storage'

const STORAGE_KEY = 'code-score-project-progress'
const DATA_VERSION = 1

type PersistedProjectProgress = {
  _version: number
  progress: Record<string, ProjectProgress>
}

export const useProjectProgressStore = defineStore('projectProgress', () => {
  const projectProgress = ref<Record<string, ProjectProgress>>({})
  const lastError = ref<string | null>(null)

  function loadProgress() {
    try {
      const result = safeGetItem(STORAGE_KEY)
      const raw = result.value
      if (!raw) return
      const parsed = JSON.parse(raw) as PersistedProjectProgress | Record<string, ProjectProgress>
      if (
        typeof parsed === 'object'
        && parsed !== null
        && '_version' in parsed
        && parsed._version === DATA_VERSION
      ) {
        projectProgress.value = (parsed as PersistedProjectProgress).progress || {}
      } else if (typeof parsed === 'object' && parsed !== null && !('_version' in parsed)) {
        projectProgress.value = parsed as Record<string, ProjectProgress>
      }
    } catch {
      projectProgress.value = {}
    }
  }

  function persistProgress() {
    const result = safeSetItem(
      STORAGE_KEY,
      JSON.stringify({
        _version: DATA_VERSION,
        progress: projectProgress.value,
      }),
    )

    if (!result.success) {
      lastError.value = result.error ?? '保存失败'
      setTimeout(() => {
        lastError.value = null
      }, 5000)
    }
  }

  function ensureProgress(projectId: string): ProjectProgress {
    if (!projectProgress.value[projectId]) {
      projectProgress.value[projectId] = {
        projectId,
        completed: false,
        currentStep: 0,
        visitedSteps: [0],
        lastVisited: Date.now(),
      }
    }
    return projectProgress.value[projectId]
  }

  function setCurrentStep(projectId: string, stepIndex: number) {
    const entry = ensureProgress(projectId)
    entry.currentStep = stepIndex
    entry.lastVisited = Date.now()
    if (!entry.visitedSteps.includes(stepIndex)) {
      entry.visitedSteps = [...entry.visitedSteps, stepIndex].sort((a, b) => a - b)
    }
    persistProgress()
  }

  function markComplete(projectId: string) {
    const entry = ensureProgress(projectId)
    entry.completed = true
    entry.lastVisited = Date.now()
    persistProgress()
  }

  function resetProject(projectId: string) {
    if (!projectProgress.value[projectId]) return
    projectProgress.value[projectId] = {
      projectId,
      completed: false,
      currentStep: 0,
      visitedSteps: [0],
      lastVisited: Date.now(),
    }
    persistProgress()
  }

  function isCompleted(projectId: string): boolean {
    return projectProgress.value[projectId]?.completed ?? false
  }

  function getCurrentStep(projectId: string): number {
    return projectProgress.value[projectId]?.currentStep ?? 0
  }

  function getVisitedStepCount(projectId: string): number {
    return projectProgress.value[projectId]?.visitedSteps.length ?? 0
  }

  loadProgress()

  return {
    projectProgress,
    lastError,
    ensureProgress,
    setCurrentStep,
    markComplete,
    resetProject,
    isCompleted,
    getCurrentStep,
    getVisitedStepCount,
  }
})
