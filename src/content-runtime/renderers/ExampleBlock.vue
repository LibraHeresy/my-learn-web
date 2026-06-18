<script setup lang="ts">
import { computed } from 'vue'
import type { BlockNode } from '../types'
import { parseCodeFence } from './text'

const props = defineProps<{
  node: BlockNode
}>()

const codeFence = computed(() => parseCodeFence(props.node.content || ''))
</script>

<template>
  <section class="example-block">
    <h3 v-if="typeof node.attrs?.title === 'string'" class="block-title">{{ node.attrs.title }}</h3>
    <div class="code-shell">
      <div class="code-meta">{{ codeFence?.language || 'text' }}</div>
      <pre class="code-block"><code>{{ codeFence?.code || node.content }}</code></pre>
    </div>
  </section>
</template>

<style scoped>
.example-block {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  padding: var(--sp-3);
  background: var(--color-bg-warm);
  border-radius: var(--radius-sm);
}

.block-title {
  font-size: var(--fs-base);
  color: var(--color-accent);
}

.code-shell {
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: var(--color-editor-bg);
}

.code-meta {
  padding: var(--sp-2) var(--sp-3);
  font-size: var(--fs-xs);
  color: var(--color-gold);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-transform: uppercase;
}

.code-block {
  margin: 0;
  padding: var(--sp-3) var(--sp-4);
  overflow-x: auto;
  font-family: var(--font-code);
  font-size: var(--fs-xs);
  line-height: 1.7;
  color: var(--color-editor-text);
}
</style>

