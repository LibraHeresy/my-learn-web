<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { lessons } from '../data/lessons'
import { useProgressStore } from '../stores/progress'
import { useCodePreview } from '../composables/useCodePreview'
import type { UserCode } from '../types'
import LessonContent from '../components/LessonContent.vue'
import CodeEditor from '../components/CodeEditor.vue'
import LivePreview from '../components/LivePreview.vue'
import LessonSidebar from '../components/LessonSidebar.vue'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()

const lessonId = computed(() => route.params.lessonId as string)
const lesson = computed(() => lessons.find(l => l.id === lessonId.value))

// 用户代码不持久化，每次刷新/切换课程均从 starterCode 开始
const userCode = ref<UserCode>({ html: '', css: '', js: '' })

watch(lessonId, (id) => {
  const l = lessons.find(l => l.id === id)
  if (l) {
    progressStore.currentLessonId = id
    userCode.value = { ...l.starterCode }
  }
}, { immediate: true })

// 手动预览
const { previewSrc, triggerPreview } = useCodePreview(userCode)

function onCodeChange(code: UserCode) {
  userCode.value = code
}

// ===== 面板拖动缩放 =====
const PANEL_STORAGE_KEY = 'code-score-panel-widths'
const PANEL_WIDTHS_VERSION = 2

interface PanelWidths {
  content: number
  editor: number
  preview: number
}

const defaultWidths: PanelWidths = {
  content: 40,
  editor: 30,
  preview: 30
}

const panelWidths = ref<PanelWidths>({ ...defaultWidths })

function loadPanelWidths() {
  try {
    const raw = localStorage.getItem(PANEL_STORAGE_KEY)
    if (raw) {
      const data = JSON.parse(raw)
      // 版本控制：版本不匹配则使用默认值
      if (data._version !== PANEL_WIDTHS_VERSION) {
        panelWidths.value = { ...defaultWidths }
        savePanelWidths()
        return
      }
      const parsed = data.widths as PanelWidths
      if (parsed.content && parsed.editor && parsed.preview) {
        panelWidths.value = parsed
      }
    }
  } catch { /* use defaults */ }
}

function savePanelWidths() {
  localStorage.setItem(PANEL_STORAGE_KEY, JSON.stringify({
    _version: PANEL_WIDTHS_VERSION,
    widths: panelWidths.value
  }))
}

const MIN_PANEL_PCT = 15

// 拖动状态
const dragging = ref<'content-editor' | 'editor-preview' | null>(null)
const playerMainRef = ref<HTMLDivElement>()

function startDrag(which: 'content-editor' | 'editor-preview', e: MouseEvent) {
  e.preventDefault()
  dragging.value = which
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

function onMouseMove(e: MouseEvent) {
  if (!dragging.value || !playerMainRef.value) return

  const rect = playerMainRef.value.getBoundingClientRect()
  const totalWidth = rect.width
  if (totalWidth <= 0) return

  const x = e.clientX - rect.left
  const pct = (x / totalWidth) * 100

  if (dragging.value === 'content-editor') {
    // content 和 editor 之间的分隔线
    const newContent = Math.max(MIN_PANEL_PCT, Math.min(pct, 100 - MIN_PANEL_PCT * 2))
    const remaining = 100 - newContent
    // editor 和 preview 平分剩余空间，保持比例
    const editorRatio = panelWidths.value.editor / (panelWidths.value.editor + panelWidths.value.preview)
    const newEditor = Math.max(MIN_PANEL_PCT, remaining * editorRatio)
    const newPreview = Math.max(MIN_PANEL_PCT, remaining - newEditor)
    panelWidths.value = { content: newContent, editor: newEditor, preview: newPreview }
  } else {
    // editor 和 preview 之间的分隔线
    const newContent = Math.max(MIN_PANEL_PCT, panelWidths.value.content)
    const rightBoundary = 100 - MIN_PANEL_PCT
    const adjustedPct = Math.max(newContent + MIN_PANEL_PCT, Math.min(pct, rightBoundary))
    const newEditor = Math.max(MIN_PANEL_PCT, adjustedPct - newContent)
    const newPreview = Math.max(MIN_PANEL_PCT, 100 - newContent - newEditor)
    panelWidths.value = { content: newContent, editor: newEditor, preview: newPreview }
  }
}

function stopDrag() {
  if (dragging.value) {
    dragging.value = null
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    savePanelWidths()
  }
}

onMounted(() => {
  loadPanelWidths()
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', stopDrag)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', stopDrag)
})

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

function markComplete() {
  progressStore.markComplete(lessonId.value)
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
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

    <!-- 侧边栏（移动端抽屉） -->
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
      :class="['player-main', { 'is-dragging': dragging }]"
    >
      <!-- 左面板：教学内容 -->
      <div
        class="panel-content"
        :style="{ width: panelWidths.content + '%' }"
      >
        <LessonContent :key="lessonId" :lesson="lesson" @complete="markComplete" />
      </div>

      <!-- 分隔线 1：内容 ↔ 编辑器 -->
      <div
        class="resizer"
        @mousedown="startDrag('content-editor', $event)"
      >
        <div class="resizer-handle" />
      </div>

      <!-- 中面板：代码编辑器 -->
      <div
        class="panel-editor"
        :style="{ width: panelWidths.editor + '%' }"
      >
        <CodeEditor
          :model-value="userCode"
          @update:model-value="onCodeChange"
          @run="triggerPreview"
        />
      </div>

      <!-- 分隔线 2：编辑器 ↔ 预览 -->
      <div
        class="resizer"
        @mousedown="startDrag('editor-preview', $event)"
      >
        <div class="resizer-handle" />
      </div>

      <!-- 右面板：实时预览 -->
      <div
        class="panel-preview"
        :style="{ width: panelWidths.preview + '%' }"
      >
        <LivePreview :srcdoc="previewSrc" />
      </div>
    </div>

    <!-- 未找到课程 -->
    <div v-else class="lesson-not-found">
      <p>课程未找到</p>
      <button @click="router.push('/')">返回首页</button>
    </div>

    <!-- 底部导航 -->
    <div v-if="lesson" class="player-footer">
      <button
        :class="['footer-btn', { disabled: !prevLesson }]"
        :disabled="!prevLesson"
        @click="goPrev"
      >
        ← 上一课
      </button>

      <button class="footer-btn complete-btn" @click="markComplete">
        <span v-if="progressStore.isCompleted(lessonId)">✓ 已完成</span>
        <span v-else>标记完成</span>
      </button>

      <button
        :class="['footer-btn', { disabled: !nextLesson }]"
        :disabled="!nextLesson"
        @click="goNext"
      >
        下一课 →
      </button>
    </div>
  </div>
</template>

<style scoped>
.lesson-player {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* ===== 移动端顶栏 ===== */
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

/* ===== 侧边栏 ===== */
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

/* ===== 底部导航 ===== */
.player-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-2) var(--sp-4);
  background: var(--color-panel);
  border-top: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.footer-btn {
  padding: var(--sp-2) var(--sp-4);
  background: transparent;
  color: var(--color-text);
  font-size: var(--fs-sm);
  border-radius: var(--radius-sm);
}

.footer-btn:hover:not(.disabled) {
  background: var(--color-bg-warm);
}

.footer-btn.disabled {
  opacity: 0.3;
  cursor: default;
}

.complete-btn {
  color: var(--color-success);
  font-weight: 600;
}

.complete-btn:hover {
  background: var(--color-success-bg);
}

/* ===== 课程未找到 ===== */
.lesson-not-found {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-4);
}

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .mobile-bar {
    display: flex;
  }

  .player-main {
    flex-direction: column;
    overflow-y: auto;
    flex: 1;
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
    height: 320px;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .panel-preview {
    height: 360px;
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
