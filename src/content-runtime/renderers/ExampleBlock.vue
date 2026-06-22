<script setup lang="ts">
import { computed } from 'vue'
import type { BlockNode } from '../types'
import { splitFencedCodeBlocks } from './text'
import InlineText from './InlineText.vue'

const props = defineProps<{
  node: BlockNode
}>()

const segments = computed(() => splitFencedCodeBlocks(props.node.content || ''))
</script>

<template>
  <section class="example-block">
    <h3 v-if="typeof node.attrs?.title === 'string'" class="block-title">{{ node.attrs.title }}</h3>
    <template v-for="(seg, i) in segments" :key="i">
      <pre v-if="seg.type === 'code'" class="code-block"><code :class="`language-${seg.language}`" v-text="seg.code" /></pre>
      <hr v-else-if="seg.type === 'hr'" class="block-hr" />
      <p v-else class="block-text">
        <InlineText :text="seg.text" />
      </p>
    </template>
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

.block-text {
  font-size: var(--fs-sm);
  line-height: 1.8;
  color: var(--color-text);
}

.code-block {
  margin: 0;
  padding: var(--sp-3);
  border-radius: var(--radius-md);
  background: var(--color-editor-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow-x: auto;
}

.code-block code {
  font-family: var(--font-code);
  font-size: var(--fs-xs);
  color: var(--color-editor-text);
  white-space: pre;
}

.block-hr {
  border: none;
  border-top: 1px solid var(--color-gold-light);
  margin: var(--sp-1) 0;
}
</style>
