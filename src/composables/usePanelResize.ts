import { ref, onMounted, onBeforeUnmount } from 'vue'

interface PanelWidths {
  content: number
  editor: number
  preview: number
}

const MIN_PANEL_PCT = 15

export function usePanelResize(storageKey: string, version: number = 1) {
  const panelWidths = ref<PanelWidths>({ content: 40, editor: 30, preview: 30 })
  const dragging = ref<'content-editor' | 'editor-preview' | null>(null)
  const playerMainRef = ref<HTMLDivElement>()

  function loadPanelWidths() {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const data = JSON.parse(raw)
        if (data._version !== version) {
          panelWidths.value = { content: 40, editor: 30, preview: 30 }
          savePanelWidths()
          return
        }
        const parsed = data.widths as PanelWidths
        if (parsed.content && parsed.editor && parsed.preview) {
          panelWidths.value = parsed
        }
      }
    } catch { /* use defaults */ }
  }

  function savePanelWidths() {
    localStorage.setItem(storageKey, JSON.stringify({
      _version: version,
      widths: panelWidths.value
    }))
  }

  function startDrag(which: 'content-editor' | 'editor-preview', e: MouseEvent) {
    e.preventDefault()
    dragging.value = which
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging.value || !playerMainRef.value) return
    const rect = playerMainRef.value.getBoundingClientRect()
    const totalWidth = rect.width
    if (totalWidth <= 0) return
    const x = e.clientX - rect.left
    const pct = (x / totalWidth) * 100

    if (dragging.value === 'content-editor') {
      const newContent = Math.max(MIN_PANEL_PCT, Math.min(pct, 100 - MIN_PANEL_PCT * 2))
      const remaining = 100 - newContent
      const editorRatio = panelWidths.value.editor / (panelWidths.value.editor + panelWidths.value.preview)
      const newEditor = Math.max(MIN_PANEL_PCT, remaining * editorRatio)
      const newPreview = Math.max(MIN_PANEL_PCT, remaining - newEditor)
      panelWidths.value = { content: newContent, editor: newEditor, preview: newPreview }
    } else {
      const newContent = Math.max(MIN_PANEL_PCT, panelWidths.value.content)
      const rightBoundary = 100 - MIN_PANEL_PCT
      const adjustedPct = Math.max(newContent + MIN_PANEL_PCT, Math.min(pct, rightBoundary))
      const newEditor = Math.max(MIN_PANEL_PCT, adjustedPct - newContent)
      const newPreview = Math.max(MIN_PANEL_PCT, 100 - newContent - newEditor)
      panelWidths.value = { content: newContent, editor: newEditor, preview: newPreview }
    }
  }

  function stopDrag() {
    if (dragging.value) {
      dragging.value = null
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      savePanelWidths()
    }
  }

  onMounted(() => {
    loadPanelWidths()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopDrag)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', stopDrag)
  })

  return { panelWidths, dragging, playerMainRef, startDrag }
}
