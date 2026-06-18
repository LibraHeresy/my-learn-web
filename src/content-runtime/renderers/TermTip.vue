<script setup lang="ts">
defineProps<{
  term: string
  explanation: string
  analogy?: string
}>()
</script>

<template>
  <span class="term-tip">
    <slot />
    <span class="term-popover">
      <span class="term-title">🎼 {{ term }}</span>
      <span class="term-explain">{{ explanation }}</span>
      <span v-if="analogy" class="term-analogy">{{ analogy }}</span>
    </span>
  </span>
</template>

<style scoped>
.term-tip {
  position: relative;
  border-bottom: 1.5px dashed var(--color-gold);
  color: var(--color-accent);
  cursor: help;
}

.term-popover {
  position: absolute;
  left: 50%;
  top: calc(100% + 10px);
  transform: translateX(-50%);
  width: 260px;
  background: var(--color-editor-bg);
  color: var(--color-editor-text);
  border: 1px solid var(--color-gold);
  border-radius: 8px;
  padding: 12px 14px;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-fast) ease, transform var(--dur-fast) ease;
  z-index: 50;
}

.term-tip:hover .term-popover {
  opacity: 1;
  transform: translateX(-50%) translateY(-2px);
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
</style>

