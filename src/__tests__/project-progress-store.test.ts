import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

describe('Project Progress Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  async function getStore() {
    const { useProjectProgressStore } = await import('../stores/projectProgress')
    return useProjectProgressStore()
  }

  it('首次记录步骤时会创建项目进度', async () => {
    const store = await getStore()
    store.setCurrentStep('music-showcase', 2)

    expect(store.projectProgress['music-showcase']).toBeDefined()
    expect(store.getCurrentStep('music-showcase')).toBe(2)
    expect(store.getVisitedStepCount('music-showcase')).toBe(2)
  })

  it('重复进入同一步不会重复累计 visitedSteps', async () => {
    const store = await getStore()
    store.setCurrentStep('music-showcase', 1)
    store.setCurrentStep('music-showcase', 1)

    expect(store.getVisitedStepCount('music-showcase')).toBe(2)
  })

  it('支持标记项目完成', async () => {
    const store = await getStore()
    store.markComplete('music-showcase')

    expect(store.isCompleted('music-showcase')).toBe(true)
  })

  it('支持重置项目进度', async () => {
    const store = await getStore()
    store.setCurrentStep('music-showcase', 3)
    store.markComplete('music-showcase')
    store.resetProject('music-showcase')

    expect(store.isCompleted('music-showcase')).toBe(false)
    expect(store.getCurrentStep('music-showcase')).toBe(0)
    expect(store.getVisitedStepCount('music-showcase')).toBe(1)
  })
})
