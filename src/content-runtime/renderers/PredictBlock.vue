<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BlockNode } from '../types'
import InlineText from './InlineText.vue'
import CodeBlock from './CodeBlock.vue'
import { splitFencedCodeBlocks, isTextContentSegment } from './text'

const props = defineProps<{
  node: BlockNode
}>()

const segments = computed(() => splitFencedCodeBlocks(props.node.content || ''))
const revealed = ref(false)
</script>

<template>
  <section class="predict-block">
    <h3 v-if="node.attrs?.title" class="block-title">🤔 {{ node.attrs.title }}</h3>
    <template v-for="(seg, i) in segments" :key="i">
      <CodeBlock v-if="seg.type === 'code'" :language="seg.language" :code="seg.code" />
      <p v-else-if="isTextContentSegment(seg)" class="block-text">
        <InlineText :text="seg.text" />
      </p>
    </template>
    <div v-if="node.attrs?.answer" class="predict-answer">
      <button
        :class="['reveal-btn', { revealed }]"
        @click="revealed = !revealed"
      >
        {{ revealed ? '▲ 收起答案' : '▼ 先自己想一想，再点开答案' }}
      </button>
      <Transition name="reveal-fade">
        <div v-if="revealed" class="answer-body">
          <span class="answer-label">答案与解析</span>
          <p class="block-text">
            <InlineText :text="node.attrs.answer" />
          </p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.predict-block {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  padding: var(--sp-4);
  background: var(--color-panel);
  border: 1px dashed var(--color-gold);
  border-radius: var(--radius-md);
}

.block-title {
  font-size: var(--fs-base);
  color: var(--color-accent);
  margin-top: 0;
}

.block-text {
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text);
  margin: 0;
}

.predict-answer {
  border-top: 1px solid var(--color-border-light);
  padding-top: var(--sp-2);
}

.reveal-btn {
  width: 100%;
  padding: var(--sp-2);
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--color-accent);
  background: rgba(201, 169, 110, 0.08);
  border: 1px solid var(--color-gold-light);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition);
}

.reveal-btn:hover,
.reveal-btn.revealed {
  background: rgba(201, 169, 110, 0.18);
}

.answer-body {
  margin-top: var(--sp-2);
  padding: var(--sp-3);
  background: rgba(201, 169, 110, 0.06);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
}

.answer-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-accent);
}

.reveal-fade-enter-active,
.reveal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.reveal-fade-enter-from,
.reveal-fade-leave-to {
  opacity: 0;
}
</style>
