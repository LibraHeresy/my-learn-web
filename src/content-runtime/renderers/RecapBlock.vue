<script setup lang="ts">
import type { BlockNode } from '../types'
import InlineText from './InlineText.vue'

defineProps<{
  node: BlockNode
}>()
</script>

<template>
  <section class="recap-block">
    <h3 class="recap-title">🎯 本节回顾</h3>
    <p class="recap-text">
      <InlineText :text="node.content || ''" />
    </p>
  </section>
</template>

<style scoped>
.recap-block {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  padding: var(--sp-4);
  background: var(--color-gold-bg);
  border: 1px solid var(--color-gold-light);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-gold);
}

.recap-title {
  font-size: var(--fs-base);
  color: var(--color-gold);
  margin-top: 0;
}

.recap-text {
  font-size: var(--fs-sm);
  line-height: 1.8;
  color: var(--color-text);
}
</style>
