<script setup lang="ts">
import type { BlockNode } from '../types'

defineProps<{
  node: BlockNode
}>()
</script>

<template>
  <section class="unsupported-block">
    <p class="unsupported-title">暂未支持的内容块</p>
    <p class="unsupported-name">{{ node.name }}</p>
  </section>
</template>

<style scoped>
.unsupported-block {
  padding: var(--sp-4);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-panel);
}

.unsupported-title {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.unsupported-name {
  margin-top: var(--sp-1);
  font-size: var(--fs-sm);
  color: var(--color-accent);
  font-family: var(--font-code);
}
</style>

