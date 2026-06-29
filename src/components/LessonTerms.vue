<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CompiledLesson, ContentBodyNode, TaskStep } from '../content-runtime/types'
import { getGlossaryEntry, type GlossaryEntry } from '../content-loaders/glossary'

const props = defineProps<{
  lesson: CompiledLesson
}>()

const activeKey = ref<string | null>(null)

const priorityLabelMap: Record<NonNullable<GlossaryEntry['priority']>, string> = {
  core: '核心',
  important: '重要',
  extended: '延伸',
}

const priorityOrder: Record<NonNullable<GlossaryEntry['priority']>, number> = {
  core: 0,
  important: 1,
  extended: 2,
}

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

type DisplayTermEntry = GlossaryEntry & { inLesson: boolean }
type InLessonTermEntry = GlossaryEntry & { inLesson: true }

function toInLessonTermEntry(key: string): InLessonTermEntry | null {
  const entry = getGlossaryEntry(key)
  if (!entry) return null
  return {
    ...entry,
    inLesson: true,
  }
}

function toDisplayTermEntry(key: string): DisplayTermEntry | null {
  const entry = getGlossaryEntry(key)
  if (!entry) return null
  return {
    ...entry,
    inLesson: termKeys.value.includes(key),
  }
}

const terms = computed(() =>
  termKeys.value
    .map((key) => toInLessonTermEntry(key))
    .filter((t): t is InLessonTermEntry => t !== null)
    .sort((a, b) => {
      const rankA = a.priority ? priorityOrder[a.priority] : 99
      const rankB = b.priority ? priorityOrder[b.priority] : 99
      if (rankA !== rankB) return rankA - rankB
      return a.key.localeCompare(b.key, 'zh-CN')
    })
)

const activeTerm = computed(() => {
  if (!activeKey.value) return null
  return toDisplayTermEntry(activeKey.value)
})

const activeRelatedTerms = computed(() => {
  if (!activeTerm.value?.related?.length) return []

  return activeTerm.value.related
    .map((key) => toDisplayTermEntry(key))
    .filter((item): item is DisplayTermEntry => item !== null)
})

</script>

<template>
  <div v-if="terms.length" class="lesson-terms">
    <div class="terms-title">
      📖 本节术语 ({{ terms.length }})
    </div>
    <div class="terms-body">
      <button
        v-for="t in terms"
        :key="t.key"
        :class="['term-chip', `term-chip--${t.priority ?? 'default'}`, { 'term-chip--active': activeKey === t.key }]"
        @click="activeKey = activeKey === t.key ? null : t.key"
      >
        {{ t.key }}
        <span v-if="t.priority" class="term-chip__badge">{{ priorityLabelMap[t.priority] }}</span>
      </button>
      <Transition name="terms-detail">
        <div v-if="activeTerm" class="term-detail">
          <div class="term-detail__header">
            <strong>{{ activeTerm.key }}</strong>
            <span v-if="activeTerm.priority" class="term-detail__badge">{{ priorityLabelMap[activeTerm.priority] }}术语</span>
          </div>
          <p class="term-detail-explain">{{ activeTerm.explanation }}</p>
          <p v-if="activeTerm.analogy" class="term-detail-analogy">🎵 {{ activeTerm.analogy }}</p>
          <div v-if="activeRelatedTerms.length" class="term-detail__related">
            <span class="term-detail__related-label">相关术语</span>
            <button
              v-for="related in activeRelatedTerms"
              :key="related.key"
              class="term-related-chip"
              type="button"
              :disabled="!related.inLesson"
              :title="related.inLesson ? `查看 ${related.key}` : '当前课程未直接出现该术语'"
              @click="activeKey = related.key"
            >
              {{ related.key }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.lesson-terms {
  border-top: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.terms-title {
  width: 100%;
  padding: var(--sp-2) var(--sp-4);
  text-align: left;
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-text-light);
  background: var(--color-panel);
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

.term-chip__badge {
  margin-left: 6px;
  opacity: 0.72;
}

.term-chip--core {
  border-color: color-mix(in srgb, var(--color-accent) 45%, white);
  background: color-mix(in srgb, var(--color-accent-bg) 75%, white);
}

.term-chip--important {
  border-color: color-mix(in srgb, var(--color-gold) 45%, white);
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

.term-detail__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-2);
  margin-bottom: 6px;
  color: var(--color-text);
}

.term-detail__badge {
  padding: 1px 8px;
  border-radius: var(--radius-pill);
  background: var(--color-accent-bg);
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent);
  font-size: 11px;
  white-space: nowrap;
}

.term-detail-analogy {
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px solid var(--color-border-light);
  color: var(--color-gold);
  font-style: italic;
}

.term-detail__related {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--color-border-light);
}

.term-detail__related-label {
  margin-right: 2px;
  font-size: 11px;
  color: var(--color-text-light);
}

.term-related-chip {
  padding: 2px 8px;
  font-size: 11px;
  color: var(--color-accent);
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-pill);
}

.term-related-chip:disabled {
  opacity: 0.55;
  cursor: not-allowed;
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
