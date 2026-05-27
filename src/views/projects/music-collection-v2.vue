<script setup lang="ts">
import type { Project } from '../../types'
import { parseContent, parseInline } from '../../utils/markdown'
import { ref, watch } from 'vue'

const props = defineProps<{ projectMeta: Project; currentStep: number }>()

const hintExpanded = ref(false)
watch(() => props.currentStep, () => { hintExpanded.value = false })
</script>

<template>
  <div class="step-panel">
    <div class="step-body">
      <h3 class="step-title">{{ projectMeta.steps[currentStep]?.title }}</h3>
      <div class="step-content" v-html="parseContent(projectMeta.steps[currentStep]?.content || '')" />
      <div class="step-task">
        <span class="step-task-label">你的任务</span>
        <p v-html="parseInline(projectMeta.steps[currentStep]?.task || '')" />
      </div>
      <div v-if="projectMeta.steps[currentStep]?.hint" class="step-hint-wrap">
        <button class="step-hint-toggle" @click="hintExpanded = !hintExpanded">
          💡 {{ hintExpanded ? '收起提示' : '需要提示？' }}
        </button>
        <p v-if="hintExpanded" class="step-hint" v-html="parseInline(projectMeta.steps[currentStep]?.hint || '')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-panel);
}

.step-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--sp-4);
}

.step-title {
  font-size: var(--fs-base);
  color: var(--color-accent);
  margin: 0 0 var(--sp-3) 0;
  padding-bottom: var(--sp-2);
  border-bottom: 2px solid var(--color-bg-warm);
}

.step-content {
  font-size: var(--fs-sm);
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: var(--sp-4);
}

.step-content :deep(strong) {
  color: var(--color-accent);
}

.step-content :deep(p) {
  margin: 0 0 var(--sp-2) 0;
}

.step-content :deep(p:last-child) {
  margin-bottom: 0;
}

.step-task {
  background: #FFF8F0;
  border: 1px solid var(--color-gold-light);
  border-radius: var(--radius-sm);
  padding: var(--sp-3) var(--sp-4);
  margin-bottom: var(--sp-3);
}

.step-task-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.step-task p {
  margin: var(--sp-1) 0 0 0;
  font-size: var(--fs-sm);
  line-height: 1.6;
}

.step-hint-wrap {
  margin-bottom: var(--sp-3);
}

.step-hint-toggle {
  background: none;
  color: var(--color-text-light);
  font-size: var(--fs-xs);
  padding: var(--sp-1) 0;
}

.step-hint-toggle:hover {
  color: var(--color-gold);
}

.step-hint {
  margin: var(--sp-2) 0 0 0;
  padding: var(--sp-3);
  background: #F5F0FF;
  border-radius: var(--radius-sm);
  font-size: var(--fs-xs);
  line-height: 1.6;
  color: #6B5A4E;
}
</style>
