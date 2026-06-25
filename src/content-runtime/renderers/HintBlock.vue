<script setup lang="ts">
import { computed } from 'vue'
import type { BlockNode } from '../types'
import InlineText from './InlineText.vue'
import CodeBlock from './CodeBlock.vue'
import { isBlockquoteText, splitFencedCodeBlocks, stripBlockquoteMarkers } from './text'

const props = defineProps<{
  node: BlockNode
}>()

const segments = computed(() => splitFencedCodeBlocks(props.node.content || ''))
</script>

<template>
  <section class="hint-block">
    <h4 v-if="node.attrs?.title" class="hint-title">{{ node.attrs?.emoji || '💡' }} {{ node.attrs.title }}</h4>
    <template v-for="(seg, i) in segments" :key="i">
      <CodeBlock v-if="seg.type === 'code'" :language="seg.language" :code="seg.code" />
      <hr v-else-if="seg.type === 'hr'" class="block-hr" />
      <ul v-else-if="seg.type === 'list' && !seg.ordered" class="block-list">
        <template v-for="(item, idx) in seg.items" :key="idx">
          <li><InlineText :text="item.text" />
            <ul v-if="item.children"><li v-for="(c,ci) in item.children" :key="ci"><InlineText :text="c.text" /></li></ul>
          </li>
        </template>
      </ul>
      <ol v-else-if="seg.type === 'list' && seg.ordered" class="block-list">
        <li v-for="(item, idx) in seg.items" :key="idx"><InlineText :text="item.text" /></li>
      </ol>
      <table v-else-if="seg.type === 'table'" class="block-table">
        <thead><tr><th v-for="(h,j) in seg.headers" :key="j"><InlineText :text="h" /></th></tr></thead>
        <tbody><tr v-for="(row,ri) in seg.rows" :key="ri"><td v-for="(cell,ci) in row" :key="ci"><InlineText :text="cell" /></td></tr></tbody>
      </table>
      <blockquote v-else-if="isBlockquoteText(seg.text)" class="md-blockquote">
        <p class="hint-text">
          <InlineText :text="stripBlockquoteMarkers(seg.text)" />
        </p>
      </blockquote>
      <p v-else class="hint-text">
        <InlineText :text="seg.text" />
      </p>
    </template>
  </section>
</template>

<style scoped>
.hint-block {
  padding: var(--sp-3) var(--sp-4);
  background: var(--color-hint-bg);
  border: 1px solid var(--color-hint-border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
}

.hint-title {
  font-size: var(--fs-base);
  font-weight: 600;
  color: var(--color-hint-title);
  margin: 0;
}

.hint-text {
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text-light);
}

.block-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--fs-sm);
}
.block-table th,
.block-table td {
  border: 1px solid var(--color-border-light);
  padding: var(--sp-2) var(--sp-3);
  text-align: left;
}
.block-table th {
  background: var(--color-border-light);
  font-weight: 600;
  color: var(--color-accent);
}
.block-table tbody tr:nth-child(even) {
  background: var(--color-panel);
}

.block-list {
  padding-left: 1.5em;
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text);
}
.block-list ul { padding-left: 1.5em; margin-top: var(--sp-1); }

.block-hr {
  border: none;
  border-top: 1px solid var(--color-gold-light);
  margin: 0;
}
</style>
