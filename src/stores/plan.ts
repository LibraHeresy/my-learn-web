import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { studyPlanPhases, studyPlanWeeks } from '../features/plan/studyPlan'
import type { PlanDay, PlanPhase, PlanStoreState, PlanTask, PlanTaskStatus, PlanWeek } from '../features/plan/types'
import { safeGetItem, safeSetItem } from '../utils/storage'
import { useProgressStore } from './progress'
import { useProjectProgressStore } from './projectProgress'
import { useQuizStore } from './quiz'

const STORAGE_KEY = 'code-score-plan-v2'

function loadState(): PlanStoreState {
  const result = safeGetItem(STORAGE_KEY)
  if (!result.value) {
    return {
      selectedWeek: 1,
      selectedDayByWeek: {},
      manualCompleted: {},
    }
  }

  try {
    const parsed = JSON.parse(result.value) as Partial<PlanStoreState>
    return {
      selectedWeek: parsed.selectedWeek ?? 1,
      selectedDayByWeek: parsed.selectedDayByWeek ?? {},
      manualCompleted: parsed.manualCompleted ?? {},
    }
  } catch {
    return {
      selectedWeek: 1,
      selectedDayByWeek: {},
      manualCompleted: {},
    }
  }
}

export const usePlanStore = defineStore('plan', () => {
  const progressStore = useProgressStore()
  const projectProgressStore = useProjectProgressStore()
  const quizStore = useQuizStore()

  const state = ref<PlanStoreState>(loadState())
  const lastError = ref<string | null>(null)

  watch(
    state,
    () => {
      const result = safeSetItem(STORAGE_KEY, JSON.stringify(state.value))
      if (!result.success) {
        lastError.value = result.error ?? '保存失败'
        setTimeout(() => {
          lastError.value = null
        }, 5000)
      }
    },
    { deep: true },
  )

  const weeks = computed(() => studyPlanWeeks)
  const phases = computed(() => studyPlanPhases)

  const currentWeek = computed<PlanWeek>(() =>
    weeks.value.find((week) => week.weekNumber === state.value.selectedWeek) ?? weeks.value[0],
  )

  const currentPhase = computed<PlanPhase>(() =>
    phases.value.find((phase) => phase.id === currentWeek.value.phaseId) ?? phases.value[0],
  )

  const currentDayOrder = computed(() => state.value.selectedDayByWeek[currentWeek.value.id] ?? 1)
  const currentDay = computed<PlanDay>(() =>
    currentWeek.value.days.find((day) => day.order === currentDayOrder.value) ?? currentWeek.value.days[0],
  )

  const todayCompletedCount = computed(() => currentDay.value.tasks.filter((task) => isTaskCompleted(task)).length)
  const weekCompletedDays = computed(() => currentWeek.value.days.filter((day) => day.tasks.every((task) => isTaskCompleted(task))).length)
  const currentWeekTotalMinutes = computed(() => currentWeek.value.days.reduce((sum, day) => sum + day.estimatedMinutes, 0))
  const firstIncompleteTask = computed(() => currentDay.value.tasks.find((task) => !isTaskCompleted(task)) ?? null)

  const backfillDays = computed(() =>
    currentWeek.value.days
      .filter((day) => day.order < currentDay.value.order)
      .map((day) => ({
        ...day,
        remainingTasks: day.tasks.filter((task) => !isTaskCompleted(task)),
      }))
      .filter((day) => day.remainingTasks.length > 0),
  )

  function setWeek(weekNumber: number) {
    state.value.selectedWeek = weekNumber
  }

  function setDay(dayOrder: number) {
    state.value.selectedDayByWeek = {
      ...state.value.selectedDayByWeek,
      [currentWeek.value.id]: dayOrder,
    }
  }

  function resetWeekStart(weekId = currentWeek.value.id) {
    const targetWeek = weeks.value.find((week) => week.id === weekId)
    if (!targetWeek) return
    state.value.selectedDayByWeek = {
      ...state.value.selectedDayByWeek,
      [weekId]: 1,
    }
  }

  function toggleManualTask(taskId: string) {
    state.value.manualCompleted = {
      ...state.value.manualCompleted,
      [taskId]: !state.value.manualCompleted[taskId],
    }
  }

  function isTaskCompleted(task: PlanTask): boolean {
    if (task.completionMode === 'auto-progress' && task.targetType === 'lesson' && task.targetId) {
      return progressStore.isCompleted(task.targetId)
    }

    if (task.completionMode === 'auto-progress' && task.targetType === 'project' && task.targetId) {
      return projectProgressStore.isCompleted(task.targetId)
    }

    if (task.completionMode === 'auto-quiz' && task.quizGoal) {
      if (task.quizGoal.type === 'overall-accuracy') {
        return quizStore.data.totalAnswered > 0 && quizStore.overallAccuracy >= task.quizGoal.value
      }
      if (task.quizGoal.type === 'wrong-count-at-most') {
        return quizStore.data.totalAnswered > 0 && quizStore.wrongCount <= task.quizGoal.value
      }
    }

    return Boolean(state.value.manualCompleted[task.id])
  }

  function isTaskStarted(task: PlanTask): boolean {
    if (task.targetType === 'lesson' && task.targetId) {
      return Boolean(progressStore.lessonProgress[task.targetId])
    }
    if (task.targetType === 'project' && task.targetId) {
      return Boolean(projectProgressStore.projectProgress[task.targetId])
    }
    return false
  }

  function getTaskStatus(task: PlanTask, day = currentDay.value): PlanTaskStatus {
    if (isTaskCompleted(task)) return '已点亮'
    if (day.id === currentDay.value.id && task.id === firstIncompleteTask.value?.id) {
      return isTaskStarted(task) ? '进行中' : '推荐下一步'
    }
    if (isTaskStarted(task)) return '进行中'
    if (day.order < currentDay.value.order) return '可回补'
    return '未开始'
  }

  const phaseCards = computed(() =>
    phases.value.map((phase) => {
      let status: '未开始' | '进行中' | '已完成' | '推荐下一步' = '未开始'
      if (phase.id === currentPhase.value.id) status = '进行中'
      if (phase.endWeek < currentWeek.value.weekNumber) status = '已完成'
      if (phase.startWeek === currentWeek.value.weekNumber + 1) status = '推荐下一步'
      return { ...phase, status }
    }),
  )

  return {
    state,
    lastError,
    weeks,
    phases,
    currentWeek,
    currentPhase,
    currentDay,
    todayCompletedCount,
    weekCompletedDays,
    currentWeekTotalMinutes,
    firstIncompleteTask,
    backfillDays,
    phaseCards,
    setWeek,
    setDay,
    resetWeekStart,
    toggleManualTask,
    isTaskCompleted,
    isTaskStarted,
    getTaskStatus,
  }
})
