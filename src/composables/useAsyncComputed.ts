import { ref, computed, watchEffect } from 'vue'

export function useAsyncComputed<T>(factory: () => T | Promise<T>) {
  const state = ref<T | null>(null)
  const loading = ref(true)
  const error = ref<unknown>(null)

  watchEffect(async () => {
    loading.value = true
    error.value = null
    try {
      state.value = await factory()
    } catch (e) {
      error.value = e
      state.value = null
    } finally {
      loading.value = false
    }
  })

  return computed(() => ({
    value: state.value,
    loading: loading.value,
    error: error.value,
  }))
}
