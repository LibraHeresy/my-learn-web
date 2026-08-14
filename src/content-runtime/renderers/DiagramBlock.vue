<script setup lang="ts">
import type { BlockNode } from '../types'

defineProps<{
  node: BlockNode
}>()
</script>

<template>
  <figure class="diagram-block">
    <figcaption v-if="node.attrs?.title" class="diagram-caption">
      {{ node.attrs.title }}
    </figcaption>
    <!-- content 为仓库内受控的 SVG 源码（构建期跳过术语注入），直接渲染 -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="diagram-body" v-html="node.content" />
  </figure>
</template>

<style scoped>
.diagram-block {
  margin: var(--sp-4) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-2);
}

.diagram-caption {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-text-light);
  letter-spacing: 0.04em;
}

.diagram-body {
  width: 100%;
  max-width: 560px;
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--sp-3);
  overflow-x: auto;
}

.diagram-body :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}

.diagram-body :deep(text) {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
}
</style>
