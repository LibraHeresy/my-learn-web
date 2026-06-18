<script setup lang="ts">
import type { BlockNode } from '../types'
import InlineText from './InlineText.vue'

defineProps<{
  node: BlockNode
}>()
</script>

<template>
  <section class="explain-block">
    <h3 v-if="typeof node.attrs?.title === 'string'" class="block-title">{{ node.attrs.title }}</h3>
    <p class="block-text">
      <InlineText :text="node.content || ''" />
    </p>
  </section>
</template>

<style scoped>
.explain-block {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.block-title {
  font-size: var(--fs-base);
  color: var(--color-accent);
  padding-bottom: var(--sp-1);
  border-bottom: 1px solid var(--color-border-light);
}

.block-text {
  font-size: var(--fs-sm);
  line-height: 1.8;
  color: var(--color-text);
}
</style>

