<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAiAssistant } from '../../composables/useAiAssistant'
import { useFocusTrap } from '../../composables/useFocusTrap'
import { useScrollLock } from '../../composables/useScrollLock'
import AiAssistantPanel from './AiAssistantPanel.vue'

const route = useRoute()
const buttonRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)

const {
  buttonVisible,
  buttonTop,
  buttonLeft,
  sidebarOpen,
  isMobileSidebar,
  overlayDragX,
  overlayDragY,
  refreshSelectionState,
  handleRouteChange,
  handleGlobalPointerDown,
  setViewportSize,
  setOverlayPosition,
  persistOverlayPosition,
  explainCurrentSelection,
  toggleAiSidebar,
  closeSidebar,
} = useAiAssistant()

const drawerOpen = computed(() => sidebarOpen.value && isMobileSidebar.value)
const overlayOpen = computed(() => sidebarOpen.value && !isMobileSidebar.value)

useScrollLock(drawerOpen)
useFocusTrap(drawerOpen, panelRef)

let refreshRaf = 0
let dragHandle: HTMLElement | null = null
let dragging = false
let pending = false
let pendingPointerId = 0
let pendingStartX = 0
let dragStartX = 0
let dragStartOffsetX = 0
let dragStartOffsetY = 0
let dragStartRect: DOMRect | null = null
let bodyUserSelect = ''
let bodyCursor = ''
let activeHandle: HTMLElement | null = null

function requestRefresh() {
  if (refreshRaf) return
  refreshRaf = window.requestAnimationFrame(() => {
    refreshRaf = 0
    refreshSelectionState()
  })
}

function onPointerDown(event: PointerEvent) {
  const target = event.target
  if (!(target instanceof Node)) return

  const isToggle = target instanceof HTMLElement
    && !!target.closest('[data-ai-assistant-toggle="true"]')

  handleGlobalPointerDown(
    target,
    !!buttonRef.value?.contains(target)
      || !!panelRef.value?.contains(target)
      || isToggle,
  )
}

function onResize() {
  setViewportSize(window.innerWidth, window.innerHeight)
  if (buttonVisible.value) requestRefresh()
  if (overlayOpen.value) clampOverlayToViewport()
}

function onScroll() {
  if (buttonVisible.value) requestRefresh()
}

function clampOverlayToViewport() {
  if (!overlayOpen.value || !panelRef.value) return
  const rect = panelRef.value.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  const padding = 12
  let deltaX = 0
  let deltaY = 0

  if (rect.left < padding) deltaX = padding - rect.left
  else if (rect.right > vw - padding) deltaX = (vw - padding) - rect.right

  if (rect.top < padding) deltaY = padding - rect.top
  else if (rect.bottom > vh - padding) deltaY = (vh - padding) - rect.bottom

  if (deltaX !== 0 || deltaY !== 0) {
    setOverlayPosition(overlayDragX.value + deltaX, overlayDragY.value + deltaY)
    persistOverlayPosition()
  }
}

function applyOverlaySnap() {
  if (!overlayOpen.value || !panelRef.value) return
  const rect = panelRef.value.getBoundingClientRect()
  const vw = window.innerWidth
  const padding = 12
  const snapThreshold = 28
  let deltaX = 0

  if (rect.left <= padding + snapThreshold) deltaX = padding - rect.left
  else if (rect.right >= vw - padding - snapThreshold) deltaX = (vw - padding) - rect.right

  if (deltaX !== 0) {
    setOverlayPosition(overlayDragX.value + deltaX, overlayDragY.value)
  }
}

function clearPendingDrag() {
  if (!pending) return
  pending = false
  window.removeEventListener('pointermove', onPendingPointerMove)
  window.removeEventListener('pointerup', onPendingPointerUp)
  window.removeEventListener('pointercancel', onPendingPointerUp)
}

function onPendingPointerMove(event: PointerEvent) {
  if (!pending) return
  const dx = event.clientX - pendingStartX
  if (Math.abs(dx) < 4) return
  startDragging(event.currentTarget instanceof HTMLElement ? event.currentTarget : dragHandle, pendingPointerId, pendingStartX)
}

function onPendingPointerUp() {
  clearPendingDrag()
}

function startDragging(handle: HTMLElement | null, pointerId: number, startX: number) {
  if (!overlayOpen.value) return
  if (!panelRef.value) return
  if (!(handle instanceof HTMLElement)) return

  clearPendingDrag()

  dragging = true
  activeHandle = handle
  pendingPointerId = pointerId
  dragStartX = startX
  dragStartOffsetX = overlayDragX.value
  dragStartOffsetY = overlayDragY.value
  dragStartRect = panelRef.value.getBoundingClientRect()

  bodyUserSelect = document.body.style.userSelect
  bodyCursor = document.body.style.cursor
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'grabbing'

  try {
    handle.setPointerCapture(pointerId)
  } catch {
    // ignore
  }

  window.addEventListener('pointermove', onDragPointerMove)
  window.addEventListener('pointerup', onDragPointerUp)
  window.addEventListener('pointercancel', onDragPointerUp)
}

function onDragPointerDown(event: PointerEvent) {
  if (!overlayOpen.value) return
  if (event.button !== 0) return
  if (!(event.currentTarget instanceof HTMLElement)) return

  clearPendingDrag()
  pending = true
  pendingPointerId = event.pointerId
  pendingStartX = event.clientX

  window.addEventListener('pointermove', onPendingPointerMove)
  window.addEventListener('pointerup', onPendingPointerUp)
  window.addEventListener('pointercancel', onPendingPointerUp)
}

function onDragPointerMove(event: PointerEvent) {
  if (!dragging || !dragStartRect) return

  const dx = event.clientX - dragStartX

  const vw = window.innerWidth
  const padding = 12

  const left = dragStartRect.left + dx

  const clampedLeft = Math.min(Math.max(left, padding), vw - padding - dragStartRect.width)

  setOverlayPosition(
    dragStartOffsetX + (clampedLeft - dragStartRect.left),
    dragStartOffsetY,
  )
}

function onDragPointerUp() {
  if (!dragging) return
  dragging = false
  dragStartRect = null

  if (activeHandle) {
    try {
      activeHandle.releasePointerCapture(pendingPointerId)
    } catch {
      // ignore
    }
  }

  window.removeEventListener('pointermove', onDragPointerMove)
  window.removeEventListener('pointerup', onDragPointerUp)
  window.removeEventListener('pointercancel', onDragPointerUp)

  applyOverlaySnap()
  persistOverlayPosition()

  document.body.style.userSelect = bodyUserSelect
  document.body.style.cursor = bodyCursor
  activeHandle = null
}

async function attachDragHandle() {
  if (!overlayOpen.value) return
  await nextTick()
  if (!panelRef.value) return
  const handle = panelRef.value.querySelector('[data-ai-drag-handle="true"]')
  if (!(handle instanceof HTMLElement)) return
  dragHandle = handle
  dragHandle.addEventListener('pointerdown', onDragPointerDown)
}

function detachDragHandle() {
  if (dragHandle) dragHandle.removeEventListener('pointerdown', onDragPointerDown)
  dragHandle = null
  clearPendingDrag()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  if (sidebarOpen.value) closeSidebar()
}

watch(
  () => route.fullPath,
  () => {
    handleRouteChange()
  },
)

watch(
  () => [sidebarOpen.value, isMobileSidebar.value],
  async () => {
    detachDragHandle()
    if (overlayOpen.value) await attachDragHandle()
  },
  { immediate: true },
)

onMounted(() => {
  refreshSelectionState()
  document.addEventListener('selectionchange', requestRefresh)
  document.addEventListener('pointerdown', onPointerDown, true)
  document.addEventListener('scroll', onScroll, true)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (refreshRaf) window.cancelAnimationFrame(refreshRaf)
  detachDragHandle()
  if (dragging) {
    window.removeEventListener('pointermove', onDragPointerMove)
    window.removeEventListener('pointerup', onDragPointerUp)
    window.removeEventListener('pointercancel', onDragPointerUp)
  }
  document.removeEventListener('selectionchange', requestRefresh)
  document.removeEventListener('pointerdown', onPointerDown, true)
  document.removeEventListener('scroll', onScroll, true)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <Teleport to="body">
    <button
      v-if="buttonVisible"
      ref="buttonRef"
      class="ai-selection-trigger"
      :style="{ top: `${buttonTop}px`, left: `${buttonLeft}px` }"
      type="button"
      title="解释这段话"
      @pointerdown.prevent.stop="explainCurrentSelection"
      @click.prevent.stop
    >
      AI 解释
    </button>

    <button
      v-if="!sidebarOpen"
      class="ai-global-toggle"
      type="button"
      data-ai-assistant-toggle="true"
      title="打开 AI 助手"
      aria-label="打开 AI 助手"
      @click="toggleAiSidebar"
    >
      AI
    </button>

    <div
      v-if="sidebarOpen && isMobileSidebar"
      class="ai-drawer-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    />

    <Transition :name="isMobileSidebar ? 'ai-drawer-slide' : 'ai-overlay-slide'" mode="out-in">
      <aside
        v-if="sidebarOpen"
        :key="isMobileSidebar ? 'drawer' : 'overlay'"
        ref="panelRef"
        :class="isMobileSidebar ? 'ai-drawer' : 'ai-overlay'"
        :style="!isMobileSidebar ? ({ '--ai-drag-x': `${overlayDragX}px`, '--ai-drag-y': `${overlayDragY}px` } as Record<string, string>) : undefined"
        :role="isMobileSidebar ? 'dialog' : 'complementary'"
        :aria-modal="isMobileSidebar ? 'true' : undefined"
        aria-label="AI 助手"
        tabindex="-1"
        @mousedown.stop
      >
        <AiAssistantPanel :mode="isMobileSidebar ? 'drawer' : 'overlay'" />
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ai-selection-trigger {
  position: fixed;
  z-index: 1200;
  transform: translateX(-50%);
  padding: 6px 10px;
  border: 1px solid var(--color-accent-border);
  border-radius: 999px;
  background: var(--color-accent);
  color: #fff;
  font-size: var(--fs-xs);
  line-height: 1;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
}

.ai-global-toggle {
  position: fixed;
  right: 16px;
  bottom: 60px;
  z-index: 1150;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid var(--color-accent-border);
  background: rgba(255, 250, 242, 0.92);
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(8px);
  transition: background var(--dur-fast), transform var(--dur-fast);
}

.ai-global-toggle:hover {
  background: var(--color-accent-bg);
}

.ai-selection-trigger:hover {
  background: var(--color-accent-light);
}

.ai-selection-trigger:active {
  transform: translateX(-50%) scale(0.97);
}

.ai-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(36, 25, 20, 0.18);
  z-index: 1090;
}

.ai-drawer {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  top: auto;
  z-index: 1100;
  height: min(83vh, 820px);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  touch-action: pan-y;
  overscroll-behavior: contain;
}

.ai-drawer > * {
  flex: 1;
  min-height: 0;
}

.ai-overlay {
  position: fixed;
  top: calc(var(--header-height) + 12px);
  right: 12px;
  z-index: 1100;
  width: min(460px, 40vw);
  min-width: 320px;
  height: min(770px, calc(100vh - var(--header-height) - 24px));
  max-height: calc(100vh - 24px);
  border: 1px solid var(--color-accent-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 18px 48px rgba(36, 25, 20, 0.18);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  transform: translate3d(var(--ai-drag-x, 0px), var(--ai-drag-y, 0px), 0);
}

.ai-overlay > * {
  flex: 1;
  min-height: 0;
}

.ai-overlay-slide-enter-active,
.ai-overlay-slide-leave-active {
  transition: transform var(--dur-normal) var(--ease-out), opacity var(--dur-normal) var(--ease-out);
}
.ai-overlay-slide-enter-from,
.ai-overlay-slide-leave-to {
  transform: translate3d(calc(var(--ai-drag-x, 0px) + 12px), var(--ai-drag-y, 0px), 0);
  opacity: 0;
}

.ai-drawer-slide-enter-active,
.ai-drawer-slide-leave-active {
  transition: transform var(--dur-normal) var(--ease-out), opacity var(--dur-normal) var(--ease-out);
}
.ai-drawer-slide-enter-from,
.ai-drawer-slide-leave-to {
  transform: translateY(12px);
  opacity: 0;
}
</style>
