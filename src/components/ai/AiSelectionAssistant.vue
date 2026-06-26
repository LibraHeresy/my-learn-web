<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAiAssistant } from '../../composables/useAiAssistant'
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
  refreshSelectionState,
  handleRouteChange,
  handleGlobalPointerDown,
  setViewportSize,
  explainCurrentSelection,
  closeSidebar,
} = useAiAssistant()

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
  if (buttonVisible.value) refreshSelectionState()
}

function onScroll() {
  if (buttonVisible.value) refreshSelectionState()
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

onMounted(() => {
  refreshSelectionState()
  document.addEventListener('selectionchange', refreshSelectionState)
  document.addEventListener('pointerdown', onPointerDown, true)
  document.addEventListener('scroll', onScroll, true)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('selectionchange', refreshSelectionState)
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

    <div v-if="sidebarOpen && isMobileSidebar" class="ai-drawer-overlay" @click="closeSidebar" />

    <Transition :name="isMobileSidebar ? 'ai-drawer-slide' : 'ai-overlay-slide'" mode="out-in">
      <aside
        v-if="sidebarOpen"
        :key="isMobileSidebar ? 'drawer' : 'overlay'"
        ref="panelRef"
        :class="isMobileSidebar ? 'ai-drawer' : 'ai-overlay'"
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
  z-index: 1100;
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
  bottom: 12px;
  z-index: 250;
  width: min(460px, 40vw);
  min-width: 320px;
  height: auto;
  border: 1px solid var(--color-accent-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 18px 48px rgba(36, 25, 20, 0.18);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
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
  transform: translateX(12px);
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
