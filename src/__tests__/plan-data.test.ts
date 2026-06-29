import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { validateStudyPlan } from '../features/plan/validators'

describe('Study Plan Data', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('12 周计划数据完整且引用有效', () => {
    expect(validateStudyPlan()).toEqual([])
  })

  it('plan store 能切换周与天，并记录手动任务状态', async () => {
    const { usePlanStore } = await import('../stores/plan')
    const store = usePlanStore()

    expect(store.currentWeek.weekNumber).toBe(1)
    expect(store.currentDay.order).toBe(1)

    store.setWeek(3)
    store.setDay(4)

    expect(store.currentWeek.weekNumber).toBe(3)
    expect(store.currentDay.order).toBe(4)

    const reviewTask = store.currentDay.tasks.find((task) => task.completionMode === 'manual')
    expect(reviewTask).toBeTruthy()

    store.toggleManualTask(reviewTask!.id)
    expect(store.isTaskCompleted(reviewTask!)).toBe(true)
  })
})
