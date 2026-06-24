<script setup lang="ts">
import type { BlockNode } from '../types'
import InlineText from './InlineText.vue'

defineProps<{
  node: BlockNode
}>()
</script>

<template>
  <section class="task-block">
    <h3 v-if="node.attrs?.title" class="block-title">{{ node.attrs.title }}</h3>
    <div v-if="node.steps?.length" class="steps-list">
      <article v-for="(step, index) in node.steps" :key="index" class="step-card">
        <div class="step-header">
          <span class="step-number">{{ index + 1 }}</span>
          <div class="step-main">
            <p class="step-content">
              <InlineText :text="step.content" />
            </p>
          </div>
        </div>
        <div v-if="step.purpose" class="purpose-box">
          <span class="purpose-label">这一步的目的</span>
          <p class="purpose-text">
            <InlineText :text="step.purpose" />
          </p>
        </div>
        <div v-if="step.expected" class="expected-box">
          <span class="expected-label">完成后你应该看到</span>
          <p class="expected-text">
            <InlineText :text="step.expected" />
          </p>
        </div>
      </article>
    </div>
    <p v-else class="task-fallback">
      <InlineText :text="node.content || ''" />
    </p>
  </section>
</template>

<style scoped>
.task-block {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background: #fff8f0;
  border: 1px solid var(--color-gold-light);
  border-radius: var(--radius-md);
}

.block-title {
  font-size: var(--fs-base);
  color: var(--color-accent);
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.step-card {
  background: #fffdf9;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.step-header {
  display: flex;
  gap: var(--sp-3);
  padding: var(--sp-3);
  align-items: flex-start;
}

.step-number {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-gold);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-code);
}

.step-main {
  flex: 1;
}

.step-content,
.purpose-text,
.expected-text,
.task-fallback {
  font-size: var(--fs-sm);
  line-height: 1.8;
  color: var(--color-text);
}

.purpose-box,
.expected-box {
  margin: 0 var(--sp-3) var(--sp-3) var(--sp-3);
  padding: var(--sp-2) var(--sp-4);
  border-left: 3px solid;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.purpose-box {
  background: #f4f8fc;
  border-left-color: #8ba4b8;
}

.expected-box {
  background: #f4f8f0;
  border-left-color: #8ba87d;
}

.purpose-label,
.expected-label {
  display: block;
  margin-bottom: var(--sp-1);
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.purpose-label {
  color: #6b8a9e;
}

.expected-label {
  color: #6b8a5e;
}
</style>

