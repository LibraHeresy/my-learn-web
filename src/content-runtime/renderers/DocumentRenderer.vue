<script setup lang="ts">
import { resolveBlockComponent } from '../block-registry'
import type { CompiledLesson, ContentBodyNode } from '../types'
import InlineText from './InlineText.vue'

defineProps<{
  lesson: CompiledLesson
}>()

function headingTag(node: ContentBodyNode): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' {
  if (node.type !== 'heading') return 'h2'
  return `h${Math.min(node.depth, 6)}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
</script>

<template>
  <article class="content-doc">
    <div class="doc-body">
      <template v-for="(node, index) in lesson.body" :key="`${node.type}-${index}`">
        <component
          :is="headingTag(node)"
          v-if="node.type === 'heading'"
          class="doc-heading"
        >
          {{ node.text }}
        </component>

        <p v-else-if="node.type === 'paragraph'" class="doc-paragraph">
          <InlineText :text="node.text" />
        </p>

        <p v-else-if="node.type === 'term'" class="doc-term">
          {{ node.text }}
        </p>

        <pre v-else-if="node.type === 'code'" class="code-block"><code :class="`language-${node.language}`" v-text="node.code" /></pre>

        <component
          :is="resolveBlockComponent(node.name)"
          v-else
          :node="node"
        />
      </template>
    </div>
  </article>
</template>

<style scoped>
.content-doc {
  max-width: 860px;
  margin: 0 auto;
  padding: var(--sp-6);
}

.doc-body {
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
}

.doc-heading {
  font-size: var(--fs-xl);
  color: var(--color-text);
}

.doc-paragraph,
.doc-term {
  font-size: var(--fs-sm);
  line-height: 1.8;
  color: var(--color-text);
}

.code-block {
  padding: var(--sp-3);
  border-radius: var(--radius-md);
  background: var(--color-editor-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow-x: auto;
}

.code-block code {
  font-family: var(--font-code);
  font-size: 0.95em;
  color: var(--color-editor-text);
  white-space: pre;
}
</style>
