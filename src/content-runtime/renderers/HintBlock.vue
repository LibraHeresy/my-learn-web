<script setup lang="ts">
import { computed } from 'vue'
import type { BlockNode } from '../types'
import InlineText from './InlineText.vue'
import { splitFencedCodeBlocks } from './text'

const props = defineProps<{
  node: BlockNode
}>()

const segments = computed(() => splitFencedCodeBlocks(props.node.content || ''))
</script>

<template>
  <section class="hint-block">
    <h4 v-if="node.attrs?.title" class="hint-title">💡 {{ node.attrs.title }}</h4>
    <template v-for="(seg, i) in segments" :key="i">
      <pre v-if="seg.type === 'code'" class="code-block"><code :class="`language-${seg.language}`" v-text="seg.code" /></pre>
      <hr v-else-if="seg.type === 'hr'" class="block-hr" />
      <p v-else class="hint-text">
        <InlineText :text="seg.text" />
      </p>
    </template>
  </section>
</template>

<style scoped>
.hint-block {
  padding: var(--sp-3) var(--sp-4);
  background: #fef9e7;
  border: 1px solid #f0d77b;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
}

.hint-title {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: #8b7d3c;
  margin: 0;
}

.hint-text {
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text-light);
}

.code-block {
  margin: 0;
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.04);
  overflow-x: auto;
}

.code-block code {
  font-family: var(--font-code);
  font-size: 0.9em;
  color: var(--color-text);
  white-space: pre;
.block-hr {
  border: none;
  border-top: 1px solid var(--color-gold-light);
  margin: 0;
}
}
</style>
