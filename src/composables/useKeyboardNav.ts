import { onMounted, onBeforeUnmount } from 'vue'

export function useKeyboardNav(options: {
  canPrev: () => boolean
  canNext: () => boolean
  onPrev: () => void
  onNext: () => void
}) {
  function onKeydown(e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
    if (e.key === 'ArrowLeft' && options.canPrev()) {
      e.preventDefault()
      options.onPrev()
    } else if (e.key === 'ArrowRight' && options.canNext()) {
      e.preventDefault()
      options.onNext()
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
}
