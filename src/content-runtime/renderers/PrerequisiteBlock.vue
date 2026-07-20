<script setup lang="ts">
import type { BlockNode } from '../types'
import InlineText from './InlineText.vue'

defineProps<{
  node: BlockNode
}>()
</script>

<template>
  <section class="prerequisite-box">
    <span class="prerequisite-icon">📋</span>
    <div class="prerequisite-text">
      <InlineText :text="node.content || ''" />
    </div>
  </section>
</template>

<style scoped>
.prerequisite-box {
  display: flex;
  gap: var(--sp-3);
  padding: var(--sp-3);
  background: var(--color-accent-bg);
  border-left: 3px solid var(--color-accent-light);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: var(--fs-sm);
  line-height: 1.7;
}

.prerequisite-icon {
  font-size: var(--fs-lg);
  flex-shrink: 0;
}

.prerequisite-text {
  color: var(--color-text);
}
</style>
