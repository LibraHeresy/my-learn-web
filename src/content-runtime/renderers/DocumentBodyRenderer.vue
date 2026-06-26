<script setup lang="ts">
import { resolveBlockComponent } from '../block-registry'
import type { ContentBodyNode } from '../types'
import InlineText from './InlineText.vue'
import { isBlockquoteText, stripBlockquoteMarkers } from './text'
import CodeBlock from './CodeBlock.vue'

withDefaults(defineProps<{
  nodes: ContentBodyNode[]
  aiSelectable?: boolean
  aiContextTitle?: string
  aiContextDetail?: string
  aiContextKind?: string
}>(), {
  aiSelectable: false,
  aiContextTitle: '',
  aiContextDetail: '',
  aiContextKind: 'lesson',
})

function headingTag(node: ContentBodyNode): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' {
  if (node.type !== 'heading') return 'h2'
  return `h${Math.min(node.depth, 6)}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
</script>

<template>
  <article
    class="content-doc"
    :data-ai-selectable="aiSelectable ? 'true' : undefined"
    :data-ai-context-title="aiSelectable ? aiContextTitle : undefined"
    :data-ai-context-detail="aiSelectable ? aiContextDetail : undefined"
    :data-ai-context-kind="aiSelectable ? aiContextKind : undefined"
  >
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
