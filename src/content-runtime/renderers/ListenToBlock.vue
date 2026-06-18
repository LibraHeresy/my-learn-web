<script setup lang="ts">
import type { BlockNode } from '../types'
import InlineText from './InlineText.vue'

defineProps<{
  node: BlockNode
}>()
</script>

<template>
  <section class="listen-box">
    <span class="listen-icon">🎧</span>
    <div>
      <p class="listen-label">推荐聆听</p>
      <p class="listen-text">
        <InlineText :text="node.content || ''" />
      </p>
    </div>
  </section>
</template>

<style scoped>
.listen-box {
  display: flex;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background: #f5f9f0;
  border-radius: var(--radius-md);
}

.listen-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.listen-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-success);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.listen-text {
  margin-top: var(--sp-1);
  font-size: var(--fs-sm);
  color: var(--color-text-light);
}
</style>

