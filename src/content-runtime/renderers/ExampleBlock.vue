<script setup lang="ts">
import { computed } from 'vue'
import type { BlockNode } from '../types'
import { splitFencedCodeBlocks } from './text'
import InlineText from './InlineText.vue'
import CodeBlock from './CodeBlock.vue'

const props = defineProps<{
  node: BlockNode
}>()

const segments = computed(() => splitFencedCodeBlocks(props.node.content || ''))
</script>

<template>
  <section class="example-block">
    <h3 v-if="node.attrs?.title" class="block-title">🔍 {{ node.attrs.title }}</h3>
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
  gap: var(--sp-3);
  padding: var(--sp-3);
  background: var(--color-bg-warm);
  border-radius: var(--radius-sm);
}

.block-title {
  font-size: var(--fs-base);
  color: var(--color-accent);
  margin-top: 0;
}

.block-text {
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text);
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
  margin: var(--sp-1) 0;
}
</style>
