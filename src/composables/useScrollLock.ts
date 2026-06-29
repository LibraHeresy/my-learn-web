import { onBeforeUnmount, watch, type Ref } from 'vue'

let lockCount = 0
let restoreOverflow = ''
let restorePaddingRight = ''

function getScrollbarCompensation(): number {
  return Math.max(0, window.innerWidth - document.documentElement.clientWidth)
}

function lockBody() {
  if (lockCount === 0) {
    restoreOverflow = document.body.style.overflow
    restorePaddingRight = document.body.style.paddingRight
    const compensation = getScrollbarCompensation()
    document.body.style.overflow = 'hidden'
    if (compensation > 0) {
      document.body.style.paddingRight = `${compensation}px`
    }
  }
  lockCount += 1
}

function unlockBody() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount !== 0) return
  document.body.style.overflow = restoreOverflow
  document.body.style.paddingRight = restorePaddingRight
}

export function useScrollLock(enabled: Ref<boolean>) {
  watch(
    () => enabled.value,
    (active, previous) => {
      if (active === previous) return
      if (active) lockBody()
      else unlockBody()
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    if (enabled.value) unlockBody()
  })
}

