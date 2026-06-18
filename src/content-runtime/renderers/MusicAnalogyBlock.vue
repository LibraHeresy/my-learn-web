<script setup lang="ts">
import type { BlockNode } from '../types'
import InlineText from './InlineText.vue'

defineProps<{
  node: BlockNode
}>()
</script>

<template>
  <section class="analogy-box">
    <span class="analogy-icon">🎵</span>
    <p class="analogy-text">
      <InlineText :text="node.content || ''" />
    </p>
  </section>
</template>

<style scoped>
.analogy-box {
  display: flex;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background: var(--color-bg-warm);
  border-left: 3px solid var(--color-gold);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.analogy-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.analogy-text {
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text-light);
}
</style>

