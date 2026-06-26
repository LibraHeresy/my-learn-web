<script setup lang="ts">
import { computed } from 'vue'
import CodeBlock from '../../content-runtime/renderers/CodeBlock.vue'
import InlineText from '../../content-runtime/renderers/InlineText.vue'
import { isBlockquoteText, splitFencedCodeBlocks, stripBlockquoteMarkers } from '../../content-runtime/renderers/text'

const props = defineProps<{
  text: string
}>()

const segments = computed(() => splitFencedCodeBlocks(props.text || ''))
</script>

<template>
  <div class="ai-markdown-content">
    <template v-for="(seg, index) in segments" :key="index">
      <CodeBlock v-if="seg.type === 'code'" :language="seg.language" :code="seg.code" />
      <hr v-else-if="seg.type === 'hr'" class="ai-markdown-content__hr" />

      <ul v-else-if="seg.type === 'list' && !seg.ordered" class="ai-markdown-content__list">
        <template v-for="(item, itemIndex) in seg.items" :key="itemIndex">
          <li>
            <InlineText :text="item.text" />
            <ul v-if="item.children?.length" class="ai-markdown-content__nested-list">
              <li v-for="(child, childIndex) in item.children" :key="childIndex">
                <InlineText :text="child.text" />
              </li>
            </ul>
          </li>
        </template>
      </ul>

      <ol v-else-if="seg.type === 'list' && seg.ordered" class="ai-markdown-content__list">
        <li v-for="(item, itemIndex) in seg.items" :key="itemIndex">
          <InlineText :text="item.text" />
        </li>
      </ol>

      <table v-else-if="seg.type === 'table'" class="ai-markdown-content__table">
        <thead>
          <tr>
            <th v-for="(header, headerIndex) in seg.headers" :key="headerIndex">
              <InlineText :text="header" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in seg.rows" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              <InlineText :text="cell" />
            </td>
          </tr>
        </tbody>
      </table>

      <blockquote v-else-if="isBlockquoteText(seg.text)" class="ai-markdown-content__blockquote">
        <p class="ai-markdown-content__paragraph">
          <InlineText :text="stripBlockquoteMarkers(seg.text)" />
        </p>
      </blockquote>

      <p v-else class="ai-markdown-content__paragraph">
        <InlineText :text="seg.text" />
      </p>
    </template>
  </div>
</template>

<style scoped>
.ai-markdown-content {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.ai-markdown-content__paragraph {
  font-size: var(--fs-xs);
  line-height: 1.8;
  color: var(--color-text);
  word-break: break-word;
}

.ai-markdown-content__list {
  padding-left: 1.4em;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: var(--fs-xs);
  line-height: 1.8;
  color: var(--color-text);
}

.ai-markdown-content__nested-list {
  margin-top: 6px;
  padding-left: 1.4em;
}

.ai-markdown-content__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--fs-xs);
  line-height: 1.7;
}

.ai-markdown-content__table th,
.ai-markdown-content__table td {
  padding: 8px 10px;
  border: 1px solid var(--color-border-light);
  text-align: left;
  vertical-align: top;
}

.ai-markdown-content__table th {
  background: var(--color-bg-warm);
  color: var(--color-accent);
  font-weight: 600;
}

.ai-markdown-content__blockquote {
  margin: 0;
  padding-left: var(--sp-3);
  border-left: 3px solid var(--color-accent-border);
}

.ai-markdown-content__hr {
  border: none;
  border-top: 1px solid var(--color-border-light);
  margin: 2px 0;
}
</style>
