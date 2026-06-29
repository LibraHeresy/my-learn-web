import { nextTick, onBeforeUnmount, watch, type Ref } from 'vue'

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const nodes = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])',
    ),
  )
  return nodes.filter((el) => el.getClientRects().length > 0)
}

export function useFocusTrap(
  enabled: Ref<boolean>,
  containerRef: Ref<HTMLElement | null>,
  initialFocusRef?: Ref<HTMLElement | null>,
) {
  let previousActive: HTMLElement | null = null

  function focusInitial() {
    const container = containerRef.value
    if (!container) return
    const initial = initialFocusRef?.value
    if (initial) {
      initial.focus()
      return
    }
    const focusables = getFocusableElements(container)
    if (focusables.length) {
      focusables[0].focus()
      return
    }
    if (container.tabIndex < 0) container.tabIndex = -1
    container.focus()
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return
    const container = containerRef.value
    if (!container) return

    const focusables = getFocusableElements(container)
    if (focusables.length === 0) {
      event.preventDefault()
      container.focus()
      return
    }

    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement

    if (event.shiftKey) {
      if (active === first || !container.contains(active)) {
        event.preventDefault()
        last.focus()
      }
      return
    }

    if (active === last) {
      event.preventDefault()
      first.focus()
    }
  }

  watch(
    () => enabled.value,
    async (active, previous) => {
      if (active === previous) return

      if (active) {
        previousActive = document.activeElement instanceof HTMLElement ? document.activeElement : null
        document.addEventListener('keydown', onKeydown, true)
        await nextTick()
        focusInitial()
        return
      }

      document.removeEventListener('keydown', onKeydown, true)
      const restore = previousActive
      previousActive = null
      if (restore && document.contains(restore)) {
        await nextTick()
        restore.focus()
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown, true)
  })
}

