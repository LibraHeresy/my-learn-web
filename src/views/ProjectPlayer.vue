<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projects } from '../data/projects'
import { useCodePreview } from '../composables/useCodePreview'
import { usePanelResize } from '../composables/usePanelResize'
import { parseInline } from '../utils/markdown'
import type { UserCode } from '../types'
import CodeEditor from '../components/CodeEditor.vue'
import LivePreview from '../components/LivePreview.vue'
import PlayerFooter from '../components/PlayerFooter.vue'

const route = useRoute()
const router = useRouter()

const projectId = computed(() => route.params.projectId as string)
const project = computed(() => projects.find(p => p.id === projectId.value))

const currentStep = ref(0)

const emptyCode: UserCode = { html: '', css: '', js: '' }
const userCode = ref<UserCode>({ ...emptyCode })
const hintExpanded = ref(false)

const { previewSrc, triggerPreview } = useCodePreview(userCode)

function loadStepCode(stepIndex: number) {
  const p = project.value
  if (!p || !p.steps[stepIndex]) return
  const code = p.steps[stepIndex].starterCode
  userCode.value = code ? { ...code } : { ...emptyCode }
  hintExpanded.value = false
  triggerPreview()
}

watch(projectId, (id) => {
  const p = projects.find(p => p.id === id)
  if (p) {
    currentStep.value = 0
    loadStepCode(0)
  }
}, { immediate: true })

function onCodeChange(code: UserCode) {
  userCode.value = code
}

const totalSteps = computed(() => project.value?.steps.length || 0)

const currentStepData = computed(() => {
  const p = project.value
  if (!p) return null
  return p.steps[currentStep.value] || null
})

const hasCode = computed(() => {
  const code = currentStepData.value?.starterCode
  if (!code) return false
  return code.html !== '' || code.css !== '' || code.js !== ''
})

function goToStep(index: number) {
  if (index < 0 || index >= totalSteps.value) return
  currentStep.value = index
  loadStepCode(index)
}

function goHome() {
  router.push('/')
}

// 项目间导航
const currentProjectIndex = computed(() =>
  projects.findIndex(p => p.id === projectId.value)
)
const prevProject = computed(() =>
  currentProjectIndex.value > 0 ? projects[currentProjectIndex.value - 1] : null
)
const nextProject = computed(() =>
  currentProjectIndex.value < projects.length - 1 ? projects[currentProjectIndex.value + 1] : null
)

const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => currentStep.value >= totalSteps.value - 1)

const prevLabel = computed(() => {
  if (isFirstStep.value && prevProject.value) return '上个项目'
  return '上一步'
})

const nextLabel = computed(() => {
  if (isLastStep.value && nextProject.value) return '下个项目'
  return '下一步'
})

function goFooterPrev() {
  if (!isFirstStep.value) {
    goToStep(currentStep.value - 1)
  } else if (prevProject.value) {
    router.push(`/project/${prevProject.value.id}`)
  }
}

function goFooterNext() {
  if (!isLastStep.value) {
    goToStep(currentStep.value + 1)
  } else if (nextProject.value) {
    router.push(`/project/${nextProject.value.id}`)
  }
}

// ===== 面板拖动缩放 =====
const { panelWidths, dragging, playerMainRef, startDrag } = usePanelResize('code-score-project-panel-widths', 1)
</script>

<template>
  <div class="project-player">
    <!-- 顶栏：步骤指示器 -->
    <div class="project-header">
      <button class="back-btn" @click="goHome" title="返回首页">← 返回</button>
      <div class="project-header-center">
        <span class="project-header-title">{{ project?.title }}</span>
        <span class="project-header-step">第 {{ currentStep + 1 }}/{{ totalSteps }} 步</span>
      </div>
      <div class="step-dots">
        <button
          v-for="(_, i) in totalSteps"
          :key="i"
          :class="['step-dot', {
            active: i === currentStep,
            done: i < currentStep
          }]"
          @click="goToStep(i)"
          :title="project?.steps[i]?.title"
        >
          {{ i < currentStep ? '✓' : i + 1 }}
        </button>
      </div>
    </div>

    <!-- 主面板 -->
    <div
      v-if="project && currentStepData"
      ref="playerMainRef"
      :class="['player-main', { 'is-dragging': dragging, 'no-code': !hasCode }]"
    >
      <!-- 左面板：步骤指引 -->
      <div
        class="panel-content"
        :style="{ width: hasCode ? 'calc(' + panelWidths.content + '% - 4px)' : '100%' }"
      >
        <div class="step-panel">
          <div class="step-body">
            <h3 class="step-title">{{ currentStepData.title }}</h3>
            <div class="step-content" v-html="parseInline(currentStepData.content)" />
            <div class="step-task">
              <span class="step-task-label">你的任务</span>
              <p v-html="parseInline(currentStepData.task)" />
            </div>
            <div v-if="currentStepData.hint" class="step-hint-wrap">
              <button class="step-hint-toggle" @click="hintExpanded = !hintExpanded">
                💡 {{ hintExpanded ? '收起提示' : '需要提示？' }}
              </button>
              <p v-if="hintExpanded" class="step-hint" v-html="parseInline(currentStepData.hint)" />
            </div>
          </div>

        </div>
      </div>

      <template v-if="hasCode">
        <!-- 分隔线 1：内容 ↔ 编辑器 -->
        <div class="resizer" @mousedown="startDrag('content-editor', $event)">
          <div class="resizer-handle" />
        </div>

        <!-- 中面板：代码编辑器 -->
        <div
          class="panel-editor"
          :style="{ width: 'calc(' + panelWidths.editor + '% - 4px)' }"
        >
          <CodeEditor
            :key="projectId + '-' + currentStep"
            :model-value="userCode"
            @update:model-value="onCodeChange"
            @run="triggerPreview"
          />
        </div>

        <!-- 分隔线 2：编辑器 ↔ 预览 -->
        <div class="resizer" @mousedown="startDrag('editor-preview', $event)">
          <div class="resizer-handle" />
        </div>

        <!-- 右面板：实时预览 -->
        <div
          class="panel-preview"
          :style="{ width: 'calc(' + panelWidths.preview + '% - 4px)' }"
        >
          <LivePreview :srcdoc="previewSrc" />
        </div>
      </template>
    </div>

    <!-- 项目未找到 -->
    <div v-else class="project-not-found">
      <p>项目未找到</p>
      <button @click="goHome">返回首页</button>
    </div>

    <!-- 底部导航 -->
    <PlayerFooter
      v-if="project"
      :prev-label="prevLabel"
      :next-label="nextLabel"
      :prev-disabled="isFirstStep && !prevProject"
      :next-disabled="isLastStep && !nextProject"
      :center-label="'步骤 ' + (currentStep + 1) + ' / ' + totalSteps"
      @prev="goFooterPrev"
      @next="goFooterNext"
    />
  </div>
</template>

<style scoped>
.project-player {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* ===== 顶栏 ===== */
.project-header {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  padding: var(--sp-2) var(--sp-4);
  background: var(--color-panel);
  border-bottom: 1px solid var(--color-border-light);
  flex-shrink: 0;
  min-height: 44px;
}

.back-btn {
  background: none;
  color: var(--color-text-light);
  font-size: var(--fs-sm);
  padding: var(--sp-1) var(--sp-2);
}

.back-btn:hover {
  color: var(--color-accent);
}

.project-header-center {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.project-header-title {
  font-weight: 600;
  font-size: var(--fs-sm);
  color: var(--color-text);
}

.project-header-step {
  font-size: var(--fs-xs);
  color: var(--color-gold);
  font-family: var(--font-code);
}

.step-dots {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.step-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid var(--color-border);
  background: transparent;
  color: var(--color-text-light);
  font-size: 12px;
  font-family: var(--font-code);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.step-dot.active {
  border-color: var(--color-gold);
  background: var(--color-gold);
  color: #fff;
  font-weight: 700;
}

.step-dot.done {
  border-color: var(--color-success);
  background: var(--color-success);
  color: #fff;
}

.step-dot:hover:not(.active):not(.done) {
  border-color: var(--color-gold-light);
}

/* ===== 主面板布局 ===== */
.player-main {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.player-main.is-dragging * {
  pointer-events: none;
}

.panel-content,
.panel-editor,
.panel-preview {
  overflow: hidden;
  flex-shrink: 0;
}

.panel-editor {
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.player-main.no-code {
  display: block;
  overflow-y: auto;
}

.player-main.no-code .panel-content {
  max-width: 860px;
  margin: 0 auto;
}

/* ===== 步骤面板 ===== */
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

:deep(.step-content strong) {
  color: var(--color-accent);
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

/* ===== 拖动分隔线 ===== */
.resizer {
  width: 6px;
  flex-shrink: 0;
  cursor: col-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  position: relative;
  z-index: 10;
  transition: background 0.15s;
}

.resizer:hover,
.player-main.is-dragging .resizer {
  background: var(--color-gold);
}

.resizer-handle {
  width: 2px;
  height: 40px;
  border-radius: 1px;
  background: var(--color-border);
  transition: background 0.15s, height 0.15s;
}

.resizer:hover .resizer-handle,
.player-main.is-dragging .resizer .resizer-handle {
  background: #fff;
  height: 60px;
}

/* ===== 项目未找到 ===== */
.project-not-found {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-4);
}

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .player-main {
    flex-direction: column;
    overflow-y: auto;
  }

  .panel-content,
  .panel-preview,
  .panel-editor {
    width: 100% !important;
    flex: none;
    flex-shrink: 0;
  }

  .panel-content {
    border-bottom: 1px solid var(--color-border-light);
    max-height: 35%;
  }

  .panel-preview {
    height: 360px;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .panel-editor {
    height: 320px;
  }

  .resizer {
    display: none;
  }

  .step-dots {
    gap: 4px;
  }

  .step-dot {
    width: 24px;
    height: 24px;
    font-size: 10px;
  }

  .project-header-title {
    display: none;
  }
}
</style>
