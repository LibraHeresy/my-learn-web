<script setup lang="ts">
import { resolveBlockComponent } from '../block-registry'
import type { CompiledLesson, ContentBodyNode } from '../types'
import InlineText from './InlineText.vue'
import CodeBlock from './CodeBlock.vue'

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
          v-if="node.type === 'heading'"
          :is="headingTag(node)"
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

        <CodeBlock v-else-if="node.type === 'code'" :language="node.language" :code="node.code" />

        <component
          v-else
          :is="resolveBlockComponent(node.name)"
          :node="node"
        />

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
