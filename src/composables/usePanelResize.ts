import { ref, onMounted, onBeforeUnmount } from 'vue'
import { safeSetItem, safeGetItem } from '../utils/storage'

interface PanelWidths {
  content: number
  editor: number
  preview: number
}

const MIN_PANEL_PCT = 15
const DEFAULT_PANEL_WIDTHS: PanelWidths = { content: 42, editor: 30, preview: 28 }
const TOTAL_PCT = 100
const TOTAL_EPSILON = 0.5

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isValidPanelWidths(value: unknown): value is PanelWidths {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  const content = v.content
  const editor = v.editor
  const preview = v.preview
  if (!isFiniteNumber(content) || !isFiniteNumber(editor) || !isFiniteNumber(preview)) return false
  if (content < MIN_PANEL_PCT || editor < MIN_PANEL_PCT || preview < MIN_PANEL_PCT) return false
  if (content > TOTAL_PCT || editor > TOTAL_PCT || preview > TOTAL_PCT) return false
  return Math.abs((content + editor + preview) - TOTAL_PCT) <= TOTAL_EPSILON
}

export function usePanelResize(
  storageKey: string,
  version: number = 1,
  defaultWidths: PanelWidths = DEFAULT_PANEL_WIDTHS,
) {
  const panelWidths = ref<PanelWidths>({ ...defaultWidths })
  const dragging = ref<'content-editor' | 'editor-preview' | null>(null)
  const playerMainRef = ref<HTMLDivElement>()

  function loadPanelWidths() {
    try {
      const result = safeGetItem(storageKey)
      if (result.value) {
        const data = JSON.parse(result.value)
        if (data._version !== version) {
          panelWidths.value = { ...defaultWidths }
          savePanelWidths()
          return
        }
        const parsed = data.widths
        if (isValidPanelWidths(parsed)) {
          panelWidths.value = parsed
        }
      }
    } catch {
      panelWidths.value = { ...defaultWidths }
    }
  }

  function savePanelWidths() {
    safeSetItem(storageKey, JSON.stringify({
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
