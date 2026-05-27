<script setup lang="ts">
import { ref, computed, watch, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { lessons } from '../data/lessons'
import { starterCodes } from '../config/starter-codes'
import { useProgressStore } from '../stores/progress'
import { useCodePreview } from '../composables/useCodePreview'
import { usePanelResize } from '../composables/usePanelResize'
import { useTermTooltip } from '../composables/useTermTooltip'
import { hasLessonComponent, getLessonComponent } from './lessons/registry'
import type { UserCode } from '../types'
import CodeEditor from '../components/CodeEditor.vue'
import LivePreview from '../components/LivePreview.vue'
import LessonSidebar from '../components/LessonSidebar.vue'
import PlayerFooter from '../components/PlayerFooter.vue'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()

const lessonId = computed(() => route.params.lessonId as string)
const lesson = computed(() => lessons.find(l => l.id === lessonId.value))

// 检查该课程是否已有独立组件实现
const hasComponent = computed(() => lesson.value ? hasLessonComponent(lesson.value.id) : false)
const lessonComponent = shallowRef<any>(null)

// 监听 lessonId 变化，加载对应组件
watch(lessonId, (id) => {
  const l = lessons.find(l => l.id === id)
  if (l && hasLessonComponent(l.id)) {
    lessonComponent.value = getLessonComponent(l.id)
  } else {
    lessonComponent.value = null
  }
}, { immediate: true })

// 登台篇课程使用 local 模式
const isLocalMode = computed(() => lesson.value?.mode === 'local')

// 从 config 加载预置代码
function getStarterCode(lessonId: string): UserCode {
  return starterCodes[lessonId] || { html: '', css: '', js: '' }
}

// 用户代码
const userCode = ref<UserCode>({ html: '', css: '', js: '' })

const { panelWidths, dragging, playerMainRef, startDrag } = usePanelResize('code-score-panel-widths', 2)
const { previewSrc, triggerPreview } = useCodePreview(userCode)

watch(lessonId, (id) => {
  const l = lessons.find(l => l.id === id)
  if (l) {
    progressStore.currentLessonId = id
    userCode.value = getStarterCode(id)
    triggerPreview()
    if (playerMainRef.value) {
      playerMainRef.value.scrollTop = 0
    }
  }
}, { immediate: true })

function onCodeChange(code: UserCode) {
  userCode.value = code
}

// ===== 侧边栏 =====
const sidebarOpen = ref(false)

function selectLesson(id: string) {
  sidebarOpen.value = false
  router.push(`/lesson/${id}`)
}

// 上一课 / 下一课
const currentIndex = computed(() =>
  lessons.findIndex(l => l.id === lessonId.value)
)

const prevLesson = computed(() =>
  currentIndex.value > 0 ? lessons[currentIndex.value - 1] : null
)

const nextLesson = computed(() =>
  currentIndex.value < lessons.length - 1 ? lessons[currentIndex.value + 1] : null
)

function goPrev() {
  if (prevLesson.value) {
    router.push(`/lesson/${prevLesson.value.id}`)
  }
}

function goNext() {
  if (nextLesson.value) {
    router.push(`/lesson/${nextLesson.value.id}`)
  }
}

const prevLabel = computed(() => {
  if (prevLesson.value && prevLesson.value.chapterId !== lesson.value?.chapterId) return '上一章'
  return '上一课'
})

const nextLabel = computed(() => {
  if (nextLesson.value && nextLesson.value.chapterId !== lesson.value?.chapterId) return '下一章'
  return '下一课'
})

const prevDisabled = computed(() => !prevLesson.value)
const nextDisabled = computed(() => !nextLesson.value)

function markComplete() {
  progressStore.markComplete(lessonId.value)
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

// 键盘导航
function onKeydown(e: KeyboardEvent) {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
  if (e.key === 'ArrowLeft' && !prevDisabled.value) {
    e.preventDefault()
    goPrev()
  } else if (e.key === 'ArrowRight' && !nextDisabled.value) {
    e.preventDefault()
    goNext()
  }
}

import { onMounted, onBeforeUnmount } from 'vue'
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

// 术语 Tooltip
const {
  tooltipVisible,
  tooltipContent,
  tooltipStyle,
  onContentClick,
  onContentMouseover,
} = useTermTooltip()

// 课程组件完成事件
function onComponentComplete() {
  markComplete()
}
</script>

<template>
  <div class="lesson-player">
    <!-- 移动端顶部条 -->
    <div class="mobile-bar">
      <button class="mobile-menu-btn" @click="toggleSidebar">☰</button>
      <span class="mobile-lesson-title">{{ lesson?.title }}</span>
    </div>

    <!-- 侧边栏遮罩 -->
    <Transition name="fade">
      <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false" />
    </Transition>

    <!-- 侧边栏 -->
    <div :class="['sidebar-wrapper', { open: sidebarOpen }]">
      <LessonSidebar
        :current-lesson-id="lessonId"
        @select="selectLesson"
        @close="sidebarOpen = false"
      />
    </div>

    <!-- 主内容区 -->
    <div
      v-if="lesson"
      ref="playerMainRef"
      :class="['player-main', { 'is-dragging': dragging, 'is-local': isLocalMode }]"
    >
      <!-- 左面板：课程内容 -->
      <div
        class="panel-content"
        :style="{ width: isLocalMode ? '100%' : 'calc(' + panelWidths.content + '% - 4px)' }"
      >
        <!-- 使用组件渲染（新方案） -->
        <div
          v-if="hasComponent && lessonComponent"
          class="content-wrapper"
          @click="onContentClick"
          @mouseover="onContentMouseover"
        >
          <component
            :is="lessonComponent"
            :lesson-meta="lesson"
            @complete="onComponentComplete"
          />
        </div>

        <!-- 使用 JSON 渲染（旧方案，已废弃） -->
        <div
          v-else
          class="content-wrapper"
        >
          <p style="padding: var(--sp-4); color: var(--color-text-light);">该课程暂无内容</p>
        </div>
      </div>

      <template v-if="!isLocalMode">
        <!-- 分隔线 -->
        <div class="resizer" @mousedown="startDrag('content-editor', $event)">
          <div class="resizer-handle" />
        </div>

        <div class="panel-editor" :style="{ width: 'calc(' + panelWidths.editor + '% - 4px)' }">
          <CodeEditor
            :model-value="userCode"
            @update:model-value="onCodeChange"
            @run="triggerPreview"
          />
        </div>

        <div class="resizer" @mousedown="startDrag('editor-preview', $event)">
          <div class="resizer-handle" />
        </div>

        <div class="panel-preview" :style="{ width: 'calc(' + panelWidths.preview + '% - 4px)' }">
          <LivePreview :srcdoc="previewSrc" />
        </div>
      </template>
    </div>

    <div v-else class="lesson-not-found">
      <p>课程未找到</p>
      <button @click="router.push('/')">返回首页</button>
    </div>

    <!-- 底部导航 -->
    <PlayerFooter
      v-if="lesson"
      :prev-label="prevLabel"
      :next-label="nextLabel"
      :prev-disabled="prevDisabled"
      :next-disabled="nextDisabled"
      :show-complete="true"
      :is-completed="progressStore.isCompleted(lessonId)"
      @prev="goPrev"
      @next="goNext"
      @complete="markComplete"
    />

    <!-- 术语 Tooltip -->
    <Transition name="tooltip-fade">
      <div
        v-if="tooltipVisible"
        class="term-tooltip"
        :style="tooltipStyle"
      >
        <div class="tooltip-term">🎼 {{ tooltipContent.term }}</div>
        <p class="tooltip-explanation">{{ tooltipContent.explanation }}</p>
        <p v-if="tooltipContent.analogy" class="tooltip-analogy">{{ tooltipContent.analogy }}</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lesson-player {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mobile-bar {
  display: none;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-2) var(--sp-4);
  background: var(--color-panel);
  border-bottom: 1px solid var(--color-border-light);
  height: 44px;
  flex-shrink: 0;
}

.mobile-menu-btn {
  background: none;
  font-size: 1.2rem;
  color: var(--color-text);
  padding: var(--sp-1);
}

.mobile-lesson-title {
  font-size: var(--fs-sm);
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar-wrapper {
  position: fixed;
  top: var(--header-height);
  left: 0;
  bottom: 0;
  z-index: 200;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
}

.sidebar-wrapper.open {
  transform: translateX(0);
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  top: var(--header-height);
  background: rgba(0, 0, 0, 0.3);
  z-index: 199;
}

.player-main {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.player-main.is-dragging * {
  pointer-events: none;
}

.player-main.is-local {
  display: block;
  overflow-y: auto;
}

.player-main.is-local .panel-content {
  max-width: 860px;
  margin: 0 auto;
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

.content-wrapper {
  height: 100%;
  overflow-y: auto;
}

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

.lesson-not-found {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-4);
}

/* ===== 术语 Tooltip ===== */
.term-tooltip {
  position: fixed;
  z-index: 300;
  max-width: 260px;
  background: #2D2520;
  color: #E8DCC8;
  border: 1px solid var(--color-gold);
  border-radius: 8px;
  padding: 14px 16px;
  pointer-events: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.tooltip-term {
  font-size: var(--fs-xs);
  font-weight: 700;
  color: var(--color-gold);
  margin-bottom: 6px;
  letter-spacing: 0.03em;
}

.tooltip-explanation {
  font-size: 13px;
  line-height: 1.6;
  margin: 0 0 4px 0;
  color: #FFFAF2;
}

.tooltip-analogy {
  font-size: 12px;
  line-height: 1.5;
  margin: 6px 0 0 0;
  color: #C9A96E;
  font-style: italic;
  padding-top: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .lesson-player {
    width: 100vw;
  }

  .mobile-bar {
    display: flex;
  }

  .player-main {
    flex-direction: column;
    overflow-y: auto;
    flex: 1;
    width: 100vw;
  }

  .panel-content,
  .panel-editor,
  .panel-preview {
    width: 100% !important;
    flex: none;
    flex-shrink: 0;
  }

  .panel-content {
    border-bottom: 1px solid var(--color-border-light);
  }

  .panel-editor {
    min-height: 320px;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .panel-preview {
    min-height: 360px;
  }

  .resizer {
    display: none;
  }
}

@media (min-width: 901px) {
  .sidebar-wrapper {
    position: relative;
    top: auto;
    left: auto;
    bottom: auto;
    transform: none;
    z-index: auto;
    display: none;
  }
}
</style>
