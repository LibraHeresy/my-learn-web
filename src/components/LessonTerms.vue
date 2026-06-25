<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import type { CompiledLesson, ContentBodyNode, TaskStep } from '../content-runtime/types'
import { getGlossaryEntry } from '../content-loaders/glossary'

const props = defineProps<{
  lesson: CompiledLesson
}>()

const expanded = ref(false)
const activeKey = ref<string | null>(null)

function extractTerms(nodes: ContentBodyNode[]): string[] {
  const keys = new Set<string>()
  const re = /\{\{term:([^}]+)\}\}/g

  function scan(text: string | undefined) {
    if (!text) return
    for (const m of text.matchAll(re)) {
      keys.add(m[1].trim())
    }
  }

  for (const node of nodes) {
    if ('text' in node && node.text) {
      scan(node.text)
    }
    if ('content' in node && node.content) {
      scan(node.content)
    }
    if ('steps' in node && node.steps) {
      for (const step of (node as { steps: TaskStep[] }).steps) {
        scan(step.content)
        scan(step.purpose)
        scan(step.expected)
      }
    }
  }

  return [...keys]
}

const termKeys = computed(() => extractTerms(props.lesson.body))

const terms = computed(() =>
  termKeys.value
    .map((key) => {
      const entry = getGlossaryEntry(key)
      return { key, explanation: entry?.explanation, analogy: entry?.analogy }
    })
    .filter((t) => t.explanation)
)

const activeTerm = computed(() => {
  if (!activeKey.value) return null
  return terms.value.find((t) => t.key === activeKey.value) || null
})

const termsBodyRef = ref<HTMLDivElement>()

watch(expanded, async (v) => {
  if (v) {
    await nextTick()
    termsBodyRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
})
</script>

<template>
  <div v-if="terms.length" :class="['lesson-terms', { expanded }]">
    <button class="terms-toggle" @click="expanded = !expanded">
      📖 本节术语 ({{ terms.length }})
    </button>
    <Transition name="terms-fade">
      <div ref="termsBodyRef" v-if="expanded" class="terms-body">
        <button
          v-for="t in terms"
          :key="t.key"
          :class="['term-chip', { 'term-chip--active': activeKey === t.key }]"
          @click="activeKey = activeKey === t.key ? null : t.key"
        >
          {{ t.key }}
        </button>
        <Transition name="terms-detail">
          <div v-if="activeTerm" class="term-detail">
            <p class="term-detail-explain">{{ activeTerm.explanation }}</p>
            <p v-if="activeTerm.analogy" class="term-detail-analogy">🎵 {{ activeTerm.analogy }}</p>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lesson-terms {
  border-top: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.terms-toggle {
  width: 100%;
  padding: var(--sp-2) var(--sp-4);
  text-align: left;
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-text-light);
  background: var(--color-panel);
  transition: color var(--transition);
}
.terms-toggle:hover {
  color: var(--color-gold);
}

.terms-body {
  padding: var(--sp-2) var(--sp-4) var(--sp-3);
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
}

.term-chip {
  padding: 2px 10px;
  font-size: var(--fs-xs);
  font-weight: 500;
  color: var(--color-accent);
  background: var(--color-accent-bg);
  border: 1px solid var(--color-accent-border);
  border-radius: var(--radius-pill);
  transition: all var(--transition);
}
.term-chip:hover,
.term-chip--active {
  color: var(--color-text-inverse);
  background: var(--color-accent);
  border-color: var(--color-accent);
}

.term-detail {
  width: 100%;
  padding: var(--sp-2) var(--sp-3);
  margin-top: 4px;
  background: var(--color-bg-warm);
  border-radius: var(--radius-sm);
  font-size: var(--fs-xs);
  line-height: 1.6;
  color: var(--color-text-light);
}

.term-detail-analogy {
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px solid var(--color-border-light);
  color: var(--color-gold);
  font-style: italic;
}

.terms-fade-enter-active,
.terms-fade-leave-active {
  transition: all var(--dur-fast) var(--ease-out);
}
.terms-fade-enter-from,
.terms-fade-leave-to {
  opacity: 0;
}

.terms-detail-enter-active,
.terms-detail-leave-active {
  transition: all 0.15s var(--ease-out);
}
.terms-detail-enter-from,
.terms-detail-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
