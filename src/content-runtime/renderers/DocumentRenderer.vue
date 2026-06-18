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
    <header class="doc-header">
      <p class="doc-meta">
        <span>{{ lesson.meta.track }}</span>
        <span class="doc-meta-sep">/</span>
        <span>{{ lesson.meta.chapter }}</span>
        <span class="doc-meta-sep">/</span>
        <span>{{ lesson.meta.mode }}</span>
      </p>
      <h1 class="doc-title">{{ lesson.meta.title }}</h1>
      <p class="doc-subtitle">{{ lesson.meta.estimatedMinutes }} 分钟</p>
    </header>

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

.doc-header {
  padding-bottom: var(--sp-5);
  border-bottom: 1px solid var(--color-border-light);
}

.doc-meta {
  display: flex;
  gap: var(--sp-2);
  color: var(--color-text-light);
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.doc-meta-sep {
  color: var(--color-border);
}

.doc-title {
  margin-top: var(--sp-2);
  font-size: var(--fs-2xl);
}

.doc-subtitle {
  margin-top: var(--sp-2);
  color: var(--color-text-light);
  font-size: var(--fs-sm);
}

.doc-body {
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
  padding-top: var(--sp-5);
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
</style>

