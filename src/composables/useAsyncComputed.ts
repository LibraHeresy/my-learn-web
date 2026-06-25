import { ref, computed, watchEffect } from 'vue'

export function useAsyncComputed<T>(factory: () => T | Promise<T>) {
  const state = ref<T | null>(null)
  const loading = ref(true)
  const error = ref<unknown>(null)
  let version = 0

  watchEffect(async () => {
    const v = ++version
    loading.value = true
    error.value = null
    try {
      const result = await factory()
      if (v !== version) return
      state.value = result
    } catch (e) {
      if (v !== version) return
      error.value = e
    } finally {
      if (v === version) loading.value = false
    }
  })

  return computed(() => ({
    value: state.value,
    loading: loading.value,
    error: error.value,
  }))
}
