<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  term: string
  explanation: string
  analogy?: string
}>()

const termRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const popX = ref(0)
const popY = ref(0)

const POPOVER_WIDTH = 260
const GAP = 10

function onMouseEnter() {
  if (!termRef.value) return
  const rect = termRef.value.getBoundingClientRect()
  // 水平居中对齐术语，clamp 防止超出视口
  const raw = rect.left + rect.width / 2
  popX.value = Math.max(POPOVER_WIDTH / 2 + 8, Math.min(window.innerWidth - POPOVER_WIDTH / 2 - 8, raw))
  popY.value = rect.bottom + GAP
  visible.value = true
}

function onMouseLeave() {
  visible.value = false
}
</script>

<template>
  <span
    ref="termRef"
    class="term-tip"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot />
    <Teleport to="body">
      <Transition name="term-pop">
        <span
          v-if="visible"
          class="term-popover"
          :style="{ top: popY + 'px', left: popX + 'px' }"
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
  cursor: help;
}
</style>

<!-- 非 scoped：teleport 后的元素挂载在 body，需全局样式 -->
<style>
.term-popover {
  position: fixed;
  transform: translateX(-50%);
  width: 260px;
  background: var(--color-editor-bg);
  color: var(--color-editor-text);
  border: 1px solid var(--color-gold);
  border-radius: 8px;
  padding: 12px 14px;
  box-shadow: var(--shadow-lg);
  pointer-events: none;
  z-index: 9999;
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
  transform: translateX(-50%) translateY(-4px);
}

.term-pop-enter-to,
.term-pop-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(-2px);
}

.term-pop-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}
</style>
