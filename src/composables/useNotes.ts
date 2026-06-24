import { ref, watch } from 'vue'
import { safeGetItem, safeSetItem } from '../utils/storage'

const OPEN_KEY = 'notes-panel-open'

/**
 * 课程笔记 composable：按 lessonId 隔离，防抖 500ms 持久化到 localStorage。
 */
export function useNotes(lessonId: { value: string }) {
  const notes = ref('')
  const notesOpen = ref(safeGetItem(OPEN_KEY).value === '1')

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  function loadNotes(id: string) {
    const saved = safeGetItem(`lesson-notes-${id}`)
    notes.value = saved.value ?? ''
  }

  function saveNote(text: string) {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      safeSetItem(`lesson-notes-${lessonId.value}`, text)
    }, 500)
  }

  function toggleNotes() {
    notesOpen.value = !notesOpen.value
    safeSetItem(OPEN_KEY, notesOpen.value ? '1' : '0')
  }

  // 切换课程时加载对应笔记
  watch(() => lessonId.value, (id) => {
    loadNotes(id)
  }, { immediate: true })

  // 笔记变化时自动防抖保存
  watch(notes, (text) => {
    saveNote(text)
  })

  return { notes, notesOpen, toggleNotes }
}
