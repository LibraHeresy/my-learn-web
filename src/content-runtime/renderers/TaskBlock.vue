<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BlockNode, TaskStep } from '../types'
import { useProgressStore } from '../../stores/progress'
import InlineText from './InlineText.vue'

const props = defineProps<{
  node: BlockNode
}>()

const progressStore = useProgressStore()
// 当前课程 id 由 LessonPlayer 在加载课程时写入 progress store（避免渲染器依赖 router）
const lessonId = computed(() => progressStore.currentLessonId)

const steps = computed<TaskStep[]>(() => (props.node as { steps?: TaskStep[] }).steps ?? [])

function stepKey(index: number): string {
  return `manual:${index}`
}

function isDone(index: number): boolean {
  return progressStore.isTaskStepDone(lessonId.value, stepKey(index))
}

function toggleStep(index: number) {
  const key = stepKey(index)
  progressStore.markTaskStep(lessonId.value, key, !progressStore.isTaskStepDone(lessonId.value, key))
}

const helpOpen = ref(false)
</script>

<template>
  <section class="task-block">
    <h3 v-if="node.attrs?.title" class="block-title">✏️ {{ node.attrs.title }}</h3>
    <div v-if="steps.length" class="steps-list">
      <article v-for="(step, index) in steps" :key="index" :class="['step-card', { 'step-card--done': isDone(index) }]">
        <div class="step-header">
          <button
            :class="['step-number', { 'step-number--done': isDone(index) }]"
            :title="isDone(index) ? '已完成' : '点击标记完成'"
            @click="toggleStep(index)"
          >
            {{ isDone(index) ? '✓' : index + 1 }}
          </button>
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
    <div v-if="steps.length" class="task-help">
      <button class="help-toggle" @click="helpOpen = !helpOpen">
        {{ helpOpen ? '▾' : '▸' }} 🔧 卡住了？点这里看看
      </button>
      <div v-if="helpOpen" class="help-body">
        <ol>
          <li><strong>检查大小写和拼写</strong> — 一个字母不对都会报错</li>
          <li><strong>和上面的示例对比</strong> — 看看代码哪里不一样</li>
          <li><strong>看预览区下方的红色错误</strong> — 点击展开会显示修改建议</li>
          <li><strong>每次只改一小部分</strong> 就点运行 — 逐步排查哪一步出的问题</li>
          <li><strong>检查中文标点</strong> —，。；："" 代码只能用英文标点 ,.;:""</li>
        </ol>
      </div>
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
  background: var(--color-task-bg);
  border: 1px solid var(--color-gold-light);
  border-radius: var(--radius-md);
}

.block-title {
  font-size: var(--fs-base);
  color: var(--color-accent);
  margin-top: 0;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.step-card {
  background: var(--color-task-card-bg);
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
  color: var(--color-text-inverse);
  font-size: var(--fs-xs);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-code);
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
}
.step-number:hover {
  transform: scale(1.1);
}
.step-number--done {
  background: var(--color-success);
}
.step-number--done:hover {
  transform: scale(0.95);
}

.step-card--done .step-content {
  opacity: 0.5;
  text-decoration: line-through;
}
.step-card--done {
  opacity: 0.7;
  transition: opacity var(--transition);
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
  background: var(--color-purpose-bg);
  border-left-color: var(--color-purpose-border);
}

.expected-box {
  background: var(--color-expected-bg);
  border-left-color: var(--color-expected-border);
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
  color: var(--color-purpose-text);
}

.expected-label {
  color: var(--color-expected-text);
}

/* ─── 帮助区 ─── */
.task-help {
  border-top: 1px solid var(--color-gold-light);
  padding-top: var(--sp-2);
}

.help-toggle {
  width: 100%;
  padding: var(--sp-1) 0;
  font-size: var(--fs-sm);
  color: var(--color-accent);
  background: none;
  text-align: left;
  transition: color var(--transition);
}
.help-toggle:hover {
  color: var(--color-accent-light);
}

.help-body {
  padding: var(--sp-3);
  background: rgba(201, 169, 110, 0.08);
  border-radius: var(--radius-sm);
  font-size: var(--fs-sm);
  line-height: 1.8;
  color: var(--color-text-light);
}

.help-body ol {
  padding-left: var(--sp-4);
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.help-body li {
  font-size: var(--fs-xs);
  line-height: 1.7;
}

.help-body strong {
  color: var(--color-accent);
}

@media (max-width: 640px) {
  .task-block {
    padding: var(--sp-3) var(--sp-2);
  }
  .step-header {
    padding: var(--sp-2);
    gap: var(--sp-2);
  }
  .step-number {
    width: 20px;
    height: 20px;
    font-size: var(--fs-xs);
  }
  .purpose-box,
  .expected-box {
    margin: 0 var(--sp-2) var(--sp-2) var(--sp-2);
    padding: var(--sp-1) var(--sp-3);
  }
}
</style>

