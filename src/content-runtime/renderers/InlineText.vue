<script setup lang="ts">
import { computed } from 'vue'
import { splitInlineCode } from './text'
import { getGlossaryEntry } from '../../content-v2/glossary'
import TermTip from './TermTip.vue'

const props = defineProps<{
  text: string
}>()

type Segment =
  | { type: 'text'; value: string }
  | { type: 'code'; value: string }
  | { type: 'term'; key: string; value: string }

function splitTermMarkers(text: string): Segment[] {
  const result: Segment[] = []
  const regex = /\{\{term:([^}]+)\}\}/g
  let lastIndex = 0

  for (const match of text.matchAll(regex)) {
    const index = match.index ?? 0
    if (index > lastIndex) result.push({ type: 'text', value: text.slice(lastIndex, index) })
    const key = match[1]
    result.push({ type: 'term', key, value: key })
    lastIndex = index + match[0].length
  }

  if (lastIndex < text.length) result.push({ type: 'text', value: text.slice(lastIndex) })
  return result.length ? result : [{ type: 'text', value: text }]
}

const segments = computed<Segment[]>(() => {
  const base = splitInlineCode(props.text)
  const out: Segment[] = []
  for (const seg of base) {
    if (seg.type === 'code') {
      out.push({ type: 'code', value: seg.value })
      continue
    }
    out.push(...splitTermMarkers(seg.value))
  }
  return out
})
</script>

<template>
  <template v-for="(segment, index) in segments" :key="index">
    <code v-if="segment.type === 'code'" class="inline-code">{{ segment.value }}</code>
    <TermTip
      v-else-if="segment.type === 'term' && getGlossaryEntry(segment.key)"
      :term="segment.key"
      :explanation="getGlossaryEntry(segment.key)!.explanation"
      :analogy="getGlossaryEntry(segment.key)!.analogy"
    >
      {{ segment.value }}
    </TermTip>
    <span v-else>{{ segment.value }}</span>
  </template>
</template>

<style scoped>
.inline-code {
  background: var(--color-bg-warm);
  padding: 1px 6px;
  border-radius: 3px;
  font-family: var(--font-code);
  font-size: 0.9em;
  color: var(--color-accent);
}
</style>
