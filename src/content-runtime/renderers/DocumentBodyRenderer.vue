<script setup lang="ts">
import { resolveBlockComponent } from '../block-registry'
import type { BlockNode, ContentBodyNode } from '../types'
import InlineText from './InlineText.vue'
import { isBlockquoteText, stripBlockquoteMarkers } from './text'
import CodeBlock from './CodeBlock.vue'

withDefaults(defineProps<{
  nodes: ContentBodyNode[]
}>(), {})

function headingTag(node: ContentBodyNode): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' {
  if (node.type !== 'heading') return 'h2'
  return `h${Math.min(node.depth, 6)}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

function isBlockNode(node: ContentBodyNode): node is BlockNode {
  return node.type.startsWith('block:')
}
</script>

<template>
  <article class="content-doc">
    <div class="doc-body">
      <template v-for="(node, index) in nodes" :key="`${node.type}-${index}`">
        <component
          v-if="node.type === 'heading'"
          :is="headingTag(node)"
          class="doc-heading"
        >
          {{ node.text }}
        </component>

        <blockquote v-else-if="node.type === 'paragraph' && isBlockquoteText(node.text)" class="md-blockquote">
          <p class="doc-paragraph">
            <InlineText :text="stripBlockquoteMarkers(node.text)" />
          </p>
        </blockquote>

        <p v-else-if="node.type === 'paragraph'" class="doc-paragraph">
          <InlineText :text="node.text" />
        </p>

        <ul v-else-if="node.type === 'list' && !node.ordered" class="doc-list">
          <template v-for="(item, idx) in node.items" :key="idx">
            <li>
              <InlineText :text="item.text" />
              <ul v-if="item.children" class="doc-list">
                <li v-for="(c, ci) in item.children" :key="ci">
                  <InlineText :text="c.text" />
                </li>
              </ul>
            </li>
          </template>
        </ul>

        <ol v-else-if="node.type === 'list' && node.ordered" class="doc-list">
          <li v-for="(item, idx) in node.items" :key="idx">
            <InlineText :text="item.text" />
          </li>
        </ol>

        <table v-else-if="node.type === 'table'" class="doc-table">
          <thead>
            <tr>
              <th v-for="(h, hi) in node.headers" :key="hi">
                <InlineText :text="h" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in node.rows" :key="ri">
              <td v-for="(cell, ci) in row" :key="ci">
                <InlineText :text="cell" />
              </td>
            </tr>
          </tbody>
        </table>

        <p v-else-if="node.type === 'term'" class="doc-term">
          {{ node.text }}
        </p>

        <CodeBlock v-else-if="node.type === 'code'" :language="node.language" :code="node.code" />

        <component v-else-if="isBlockNode(node)" :is="resolveBlockComponent(node.name)" :node="node" />
        <template v-else />
      </template>
    </div>
  </article>
</template>

<style scoped>
.content-doc {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--sp-6);
}

.doc-body {
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
}

.doc-heading {
  font-size: var(--fs-xl);
  color: var(--color-text);
}

.doc-paragraph,
.doc-term {
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text);
}

.doc-list {
  padding-left: 1.5em;
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text);
  margin: 0;
}

.doc-list .doc-list {
  margin-top: var(--sp-1);
}

.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--fs-sm);
}

.doc-table th,
.doc-table td {
  border: 1px solid var(--color-border-light);
  padding: var(--sp-2) var(--sp-3);
  text-align: left;
  vertical-align: top;
}

.doc-table th {
  background: var(--color-border-light);
  font-weight: 600;
  color: var(--color-accent);
}

.doc-table tbody tr:nth-child(even) {
  background: var(--color-panel);
}

@media (max-width: 900px) {
  .content-doc {
    padding: var(--sp-4);
  }
}

@media (max-width: 640px) {
  .content-doc {
    padding: var(--sp-3);
  }
}
</style>
