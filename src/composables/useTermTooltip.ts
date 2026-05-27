import { ref, onMounted, onBeforeUnmount } from 'vue'
import { glossary } from '../data/glossary'

/**
 * 术语 Tooltip 系统
 * 在包含 .term-tip 元素的内容区域使用
 */
export function useTermTooltip() {
  const tooltipVisible = ref(false)
  const tooltipContent = ref({ term: '', explanation: '', analogy: '' })
  const tooltipStyle = ref<{ top?: string; bottom?: string; left: string }>({ top: '0px', left: '0px' })

  let activeTermEl: HTMLElement | null = null

  function getTermDef(termKey: string) {
    const def = glossary.find(([k]) => k === termKey)
    if (!def) return null
    return { term: termKey, explanation: def[1].explanation, analogy: def[1].analogy || '' }
  }

  function updateTooltipPosition(el: HTMLElement) {
    const rect = el.getBoundingClientRect()
    const tooltipWidth = 260
    const gap = 8
    const vw = window.innerWidth
    const vh = window.innerHeight

    let left = rect.left + rect.width / 2 - tooltipWidth / 2
    left = Math.max(gap, Math.min(left, vw - tooltipWidth - gap))

    if (rect.top > 130) {
      tooltipStyle.value = {
        top: 'auto',
        bottom: (vh - rect.top + gap) + 'px',
        left: left + 'px'
      }
    } else {
      tooltipStyle.value = {
        top: (rect.bottom + gap) + 'px',
        bottom: 'auto',
        left: left + 'px'
      }
    }
  }

  function showTooltip(el: HTMLElement, termKey: string) {
    const def = getTermDef(termKey)
    if (!def) return
    activeTermEl = el
    tooltipContent.value = def
    tooltipVisible.value = true
    updateTooltipPosition(el)
  }

  function hideTooltip() {
    tooltipVisible.value = false
    activeTermEl = null
  }

  function onContentClick(e: MouseEvent) {
    const target = e.target as HTMLElement
    const termEl = target.closest('.term-tip') as HTMLElement | null
    if (termEl) {
      const termKey = termEl.dataset.term || ''
      showTooltip(termEl, termKey)
      e.stopPropagation()
      return
    }
    hideTooltip()
  }

  function onContentMouseover(e: MouseEvent) {
    const target = e.target as HTMLElement
    const termEl = target.closest('.term-tip') as HTMLElement | null
    if (termEl) {
      const termKey = termEl.dataset.term || ''
      showTooltip(termEl, termKey)
    } else if (activeTermEl) {
      hideTooltip()
    }
  }

  function onScroll() {
    if (activeTermEl) updateTooltipPosition(activeTermEl)
  }

  onMounted(() => {
    document.addEventListener('scroll', onScroll, true)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('scroll', onScroll, true)
  })

  return {
    tooltipVisible,
    tooltipContent,
    tooltipStyle,
    onContentClick,
    onContentMouseover,
    hideTooltip
  }
}
