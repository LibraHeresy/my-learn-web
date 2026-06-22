<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllProjects, getProject } from '../content-loaders/projects'
import { useCodePreview } from '../composables/useCodePreview'
import { usePanelResize } from '../composables/usePanelResize'
import { parseInline, parseContent } from '../utils/markdown'
import type { UserCode } from '../types'
import type { CompiledProject } from '../content-runtime/types'
import CodeEditor from '../components/CodeEditor.vue'
import LivePreview from '../components/LivePreview.vue'
import PlayerFooter from '../components/PlayerFooter.vue'
import Resizer from '../components/Resizer.vue'

const route = useRoute()
const router = useRouter()

const projectId = computed(() => route.params.projectId as string)
const project = ref<CompiledProject | null>(null)
const projectLoading = ref(true)
const projectError = ref<unknown>(null)
const allProjects = computed(() => getAllProjects())

const currentStep = ref(0)
watch(currentStep, () => {
  nextTick(() => {
    if (!playerMainRef.value) return
    const scrollEl = playerMainRef.value.querySelector('.step-body') || playerMainRef.value.querySelector('.panel-content')
    if (scrollEl) (scrollEl as HTMLElement).scrollTop = 0
  })
})

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

watch(
  projectId,
  async (id) => {
    projectLoading.value = true
    projectError.value = null
    project.value = null
    currentStep.value = 0

    try {
      project.value = await getProject(id)
    } catch (e) {
      projectError.value = e
      project.value = null
    } finally {
      projectLoading.value = false
    }

    if (project.value?.steps?.length) {
      loadStepCode(0)
    } else {
      userCode.value = { ...emptyCode }
    }
  },
  { immediate: true },
)

function onCodeChange(code: UserCode) {
  userCode.value = code
}

const totalSteps = computed(() => project.value?.steps.length || 0)
const currentStepData = computed(() => project.value?.steps[currentStep.value] || null)

const isLocalMode = computed(() => project.value?.meta.mode === 'local')
const hasCode = computed(() => {
  const code = currentStepData.value?.starterCode
  if (!code) return false
  return code.html !== '' || code.css !== '' || code.js !== ''
})
const showEditor = computed(() => !isLocalMode.value && hasCode.value)

function goToStep(index: number) {
  if (index < 0 || index >= totalSteps.value) return
  currentStep.value = index
  loadStepCode(index)
}

function goHome() {
  router.push('/')
}

const orderedProjects = computed(() => allProjects.value.slice().sort((a, b) => a.meta.order - b.meta.order))
const currentProjectIndex = computed(() => orderedProjects.value.findIndex((p) => p.id === projectId.value))
const prevProject = computed(() => currentProjectIndex.value > 0 ? orderedProjects.value[currentProjectIndex.value - 1] : null)
const nextProject = computed(() => currentProjectIndex.value >= 0 && currentProjectIndex.value < orderedProjects.value.length - 1 ? orderedProjects.value[currentProjectIndex.value + 1] : null)

const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => currentStep.value >= totalSteps.value - 1)

const prevLabel = computed(() => (isFirstStep.value && prevProject.value) ? '上个项目' : '上一步')
const nextLabel = computed(() => (isLastStep.value && nextProject.value) ? '下个项目' : '下一步')

const prevNavTitle = computed(() => {
  if (isFirstStep.value && prevProject.value) return prevProject.value.meta.title
  if (!isFirstStep.value) return project.value?.steps[currentStep.value - 1]?.title ?? ''
  return ''
})

const nextNavTitle = computed(() => {
  if (isLastStep.value && nextProject.value) return nextProject.value.meta.title
  if (!isLastStep.value) return project.value?.steps[currentStep.value + 1]?.title ?? ''
  return ''
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

const { panelWidths, dragging, playerMainRef, startDrag } = usePanelResize('code-score-project-panel-widths', 2)
</script>

<template>
  <div class="project-player">
    <div class="project-header">
      <button class="back-btn" @click="goHome" title="返回首页">← 返回</button>
      <div class="project-header-center">
        <span class="project-header-title">{{ project?.meta.title }}</span>
        <span class="project-header-step">第 {{ currentStep + 1 }}/{{ totalSteps }} 步</span>
      </div>
      <div class="step-dots">
        <button
          v-for="stepNumber in totalSteps"
          :key="stepNumber"
          :class="[
            'step-dot',
            {
              active: stepNumber - 1 === currentStep,
              done: stepNumber - 1 < currentStep,
            },
          ]"
          @click="goToStep(stepNumber - 1)"
          :title="project?.steps[stepNumber - 1]?.title"
        >
          {{ stepNumber - 1 < currentStep ? '✓' : stepNumber }}
        </button>
      </div>
    </div>

    <div v-if="projectLoading" class="project-not-found">
      <p>加载中…</p>
    </div>
    <div v-else-if="projectError" class="project-not-found">
      <p>加载失败</p>
      <button @click="router.push('/')">返回首页</button>
    </div>

    <div
      v-else-if="project && currentStepData"
      ref="playerMainRef"
      :class="['player-main', { 'is-dragging': dragging, 'is-local': isLocalMode, 'no-code': !hasCode }]"
    >
      <div
        class="panel-content"
        :style="{ width: showEditor ? 'calc(' + panelWidths.content + '% - 4px)' : '100%' }"
      >
        <Transition name="slide-fade" mode="out-in">
          <div :key="currentStep" class="step-panel">
            <div class="step-body">
              <h3 class="step-title">{{ currentStepData.title }}</h3>
              <div class="step-content" v-html="parseContent(currentStepData.content)" />
              <div class="step-task">
                <span class="step-task-label">你的任务</span>
                <p v-html="parseInline(currentStepData.task)" />
              </div>
              <div v-if="currentStepData.purpose" class="purpose-box">
                <span class="purpose-label">这一步的目的</span>
                <div class="purpose-content" v-html="parseContent(currentStepData.purpose)" />
              </div>
              <div v-if="currentStepData.expectedResult" class="expected-box">
                <span class="expected-label">完成后你应该看到</span>
                <div class="expected-content" v-html="parseContent(currentStepData.expectedResult)" />
              </div>
              <div v-if="currentStepData.hint" class="step-hint-wrap">
                <button class="step-hint-toggle" @click="hintExpanded = !hintExpanded">
                  💡 {{ hintExpanded ? '收起提示' : '需要提示？' }}
                </button>
                <p v-if="hintExpanded" class="step-hint" v-html="parseInline(currentStepData.hint)" />
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <template v-if="showEditor">
        <Resizer boundary="content-editor" @drag-start="startDrag('content-editor', $event)" />

        <div class="panel-editor" :style="{ width: 'calc(' + panelWidths.editor + '% - 4px)' }">
          <CodeEditor
            :key="projectId + '-' + currentStep"
            :model-value="userCode"
            @update:model-value="onCodeChange"
            @run="triggerPreview"
          />
        </div>

        <Resizer boundary="editor-preview" @drag-start="startDrag('editor-preview', $event)" />

        <div class="panel-preview" :style="{ width: 'calc(' + panelWidths.preview + '% - 4px)' }">
          <LivePreview :srcdoc="previewSrc" />
        </div>
      </template>
    </div>

    <div v-else class="project-not-found">
      <p>项目未找到</p>
      <button @click="router.push('/')">返回首页</button>
    </div>

    <PlayerFooter
      v-if="project"
      :prev-label="prevLabel"
      :next-label="nextLabel"
      :prev-nav-title="prevNavTitle"
      :next-nav-title="nextNavTitle"
      :prev-disabled="!prevProject && isFirstStep"
      :next-disabled="!nextProject && isLastStep"
      :center-label="`第 ${currentStep + 1}/${totalSteps} 步`"
      :show-complete="false"
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
  transition: background var(--dur-fast), border-color var(--dur-fast), color var(--dur-fast);
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

@keyframes step-complete {
  0%   { transform: scale(1); }
  30%  { transform: scale(1.25); }
  100% { transform: scale(1); }
}

.step-dot.done {
  border-color: var(--color-success);
  background: var(--color-success);
  color: #fff;
  animation: step-complete 0.45s var(--ease-spring) both;
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

.player-main.no-code,
.player-main.is-local {
  display: block;
  overflow-y: auto;
}

.player-main.is-local .panel-content,
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
  overflow-x: hidden;
  min-width: 0;
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
  overflow-wrap: break-word;
}

:deep(.step-content pre) {
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

:deep(.step-content strong) {
  color: var(--color-accent);
}

:deep(.step-content p) {
  margin: 0 0 var(--sp-2) 0;
}

:deep(.step-content p:last-child) {
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

/* ===== 目的说明 ===== */
.purpose-box {
  padding: var(--sp-2) var(--sp-4);
  margin-bottom: var(--sp-3);
  background: #F4F8FC;
  border-left: 3px solid #8BA4B8;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.purpose-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: #6B8A9E;
  letter-spacing: 0.04em;
  display: block;
  margin-bottom: var(--sp-1);
}

.purpose-content {
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text);
}

.purpose-content :deep(p) {
  margin: 0 0 var(--sp-1) 0;
}

.purpose-content :deep(p:last-child) {
  margin-bottom: 0;
}

/* ===== 预期结果 ===== */
.expected-box {
  padding: var(--sp-2) var(--sp-4);
  margin-bottom: var(--sp-3);
  background: #F4F8F0;
  border-left: 3px solid #8BA87D;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.expected-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: #6B8A5E;
  letter-spacing: 0.04em;
  display: block;
  margin-bottom: var(--sp-1);
}

.expected-content {
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text);
}

.expected-content :deep(p) {
  margin: 0 0 var(--sp-1) 0;
}

.expected-content :deep(p:last-child) {
  margin-bottom: 0;
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
  .project-player {
    width: 100vw;
  }

  :deep(.resizer) {
    display: none;
  }

  .project-header {
    padding: var(--sp-2) var(--sp-3);
  }

  .player-main {
    flex-direction: column;
    overflow-y: auto;
    width: 100vw;
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
  }

  .step-body {
    padding: var(--sp-3);
  }

  .panel-preview {
    min-height: 360px;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .panel-editor {
    min-height: 320px;
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
