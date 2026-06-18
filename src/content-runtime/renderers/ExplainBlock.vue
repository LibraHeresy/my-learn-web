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
  <section class="explain-block">
    <h3 v-if="typeof node.attrs?.title === 'string'" class="block-title">{{ node.attrs.title }}</h3>
    <template v-for="(seg, i) in segments" :key="i">
      <pre v-if="seg.type === 'code'" class="code-block"><code :class="`language-${seg.language}`" v-text="seg.code" /></pre>
      <p v-else class="block-text">
        <InlineText :text="seg.text" />
      </p>
    </template>
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
</style>
