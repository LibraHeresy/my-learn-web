<script setup lang="ts">
import { computed, defineComponent, h, type VNode } from 'vue'
import { parseInlineTokens, type InlineToken as InlineTokenType } from './text'
import { getGlossaryEntry } from '../../content-loaders/glossary'
import TermTip from './TermTip.vue'

const props = defineProps<{
  text: string
}>()

const tokens = computed(() => parseInlineTokens(props.text))
</script>

<script lang="ts">
const InlineToken = defineComponent({
  name: 'InlineToken',
  props: {
    token: { type: Object as () => InlineTokenType, required: true },
  },
  setup(p) {
    return (): VNode | null => {
      const t = p.token

      if (t.type === 'br') return h('br')
      if (t.type === 'code') return h('code', { class: 'inline-code' }, t.value)

      if (t.type === 'term') {
        const entry = getGlossaryEntry(t.key)
        if (entry) {
          return h(
            TermTip,
            { term: t.key, explanation: entry.explanation, analogy: entry.analogy },
            { default: () => t.value },
          )
        }
        return h('span', t.value)
      }

      if (t.type === 'strong') {
        return h('strong', t.children.map((child, i) => h(InlineToken, { token: child, key: i })))
      }

      if (t.type === 'em') {
        return h('em', t.children.map((child, i) => h(InlineToken, { token: child, key: i })))
      }

      return h('span', t.value)
    }
  },
})
</script>

<template>
  <InlineToken v-for="(token, index) in tokens" :key="index" :token="token" />
</template>

<style scoped>
.inline-code {
  background: var(--color-bg-warm);
  padding: 1px 6px;
  border-radius: var(--radius-xs);
  font-family: var(--font-code);
  font-size: var(--fs-xs);
  color: var(--color-accent);
}
</style>
