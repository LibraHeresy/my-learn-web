<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  term: string
  explanation: string
  analogy?: string
}>()

const termRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const clicked = ref(false)
const popLeft = ref(0)
const popTop = ref(0)

const POPOVER_WIDTH = 260
const GAP = 10

// ─── 共享全局 click-outside 管理器（单例，所有 TermTip 实例共用） ───
interface TipState { el: HTMLElement | null; c: typeof clicked; v: typeof visible }
const tipStates: TipState[] = []
let globalOn = false

function ensureGlobalListener() {
  if (globalOn) return
  globalOn = true
  document.addEventListener('click', onGlobalClick, true)
}

function onGlobalClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  const pop = document.querySelector('.term-popover')
  for (const s of tipStates) {
    if (!s.c.value) continue
    if (s.el && !s.el.contains(target) && pop && !pop.contains(target)) {
      s.c.value = false
      s.v.value = false
    }
  }
}

const self: TipState = { el: null, c: clicked, v: visible }
onMounted(() => {
  self.el = termRef.value
  tipStates.push(self)
  ensureGlobalListener()
})
onBeforeUnmount(() => {
  const idx = tipStates.indexOf(self)
  if (idx >= 0) tipStates.splice(idx, 1)
})
// ───

function updatePosition() {
  if (!termRef.value) return
  const rect = termRef.value.getBoundingClientRect()
  const rawLeft = rect.left + rect.width / 2 - POPOVER_WIDTH / 2
  popLeft.value = Math.max(8, Math.min(window.innerWidth - POPOVER_WIDTH - 8, rawLeft))
  popTop.value = rect.bottom + GAP
}

function show() {
  updatePosition()
  visible.value = true
}

function hide() {
  if (clicked.value) return
  visible.value = false
}

function onClick() {
  updatePosition()
  if (clicked.value) {
    clicked.value = false
    visible.value = false
  } else {
    clicked.value = true
    visible.value = true
  }
}
</script>

<template>
  <span
    ref="termRef"
    :class="['term-tip', { 'term-tip--active': clicked }]"
    @mouseenter="show"
    @mouseleave="hide"
    @click.prevent="onClick"
  >
    <slot />
    <Teleport to="body">
      <Transition name="term-pop">
        <span v-if="visible"
          class="term-popover"
          :style="{ top: popTop + 'px', left: popLeft + 'px' }"
        >
          <span class="term-title">🎼 {{ term }}</span>
          <span class="term-explain">{{ explanation }}</span>
          <span v-if="analogy" class="term-analogy">{{ analogy }}</span>
        </span>
      </Transition>
    </Teleport>
  </span>
</template>

<style scoped>
.term-tip {
  position: relative;
  border-bottom: 1.5px dashed var(--color-gold);
  color: var(--color-accent);
  cursor: pointer;
}

.term-tip:hover::after,
.term-tip--active::after {
  opacity: 1;
}
</style>

<!-- 非 scoped：teleport 后的元素挂载在 body，需全局样式 -->
<style>
.term-popover {
  position: fixed;
  width: 260px;
  background: var(--color-editor-bg);
  color: var(--color-editor-text);
  border: 1px solid var(--color-gold);
  border-radius: var(--radius-md);
  padding: var(--sp-3) 14px;
  box-shadow: var(--shadow-lg);
  pointer-events: auto;
  z-index: 9999;
  will-change: transform, opacity;
}

.term-title {
  display: block;
  font-size: var(--fs-xs);
  font-weight: 700;
  color: var(--color-gold);
  margin-bottom: 6px;
  letter-spacing: 0.03em;
}

.term-explain {
  display: block;
  font-size: 13px;
  line-height: 1.6;
  color: #fffaf2;
}

.term-analogy {
  display: block;
  margin-top: 8px;
  padding-top: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 12px;
  line-height: 1.5;
  color: var(--color-gold);
  font-style: italic;
}

.term-pop-enter-active,
.term-pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.term-pop-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.term-pop-enter-to,
.term-pop-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.term-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
