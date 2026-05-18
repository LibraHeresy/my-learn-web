<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { lessons } from '../data/lessons'
import { useProgressStore } from '../stores/progress'
import { useCodePreview } from '../composables/useCodePreview'
import { usePanelResize } from '../composables/usePanelResize'
import type { UserCode } from '../types'
import LessonContent from '../components/LessonContent.vue'
import CodeEditor from '../components/CodeEditor.vue'
import LivePreview from '../components/LivePreview.vue'
import LessonSidebar from '../components/LessonSidebar.vue'
import PlayerFooter from '../components/PlayerFooter.vue'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()

const lessonId = computed(() => route.params.lessonId as string)
const lesson = computed(() => lessons.find(l => l.id === lessonId.value))

// 登台篇课程使用 local 模式——不显示编辑器/预览，引导学习者在本地 IDE 操作
const isLocalMode = computed(() => lesson.value?.mode === 'local')

// 用户代码不持久化，每次刷新/切换课程均从 starterCode 开始
const userCode = ref<UserCode>({ html: '', css: '', js: '' })

// ===== 面板拖动缩放 =====
const { panelWidths, dragging, playerMainRef, startDrag } = usePanelResize('code-score-panel-widths', 2)

// 手动预览
const { previewSrc, triggerPreview } = useCodePreview(userCode)

watch(lessonId, (id) => {
  const l = lessons.find(l => l.id === id)
  if (l) {
    progressStore.currentLessonId = id
    userCode.value = { ...l.starterCode }
    // 切换课程时预览页面也初始化
    triggerPreview()
    // 移动端切换课程时滚动到顶端
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

// 跨章节导航标签：检查实际跳转目标是否跨章
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
      :class="['player-main', { 'is-dragging': dragging, 'is-local': isLocalMode }]"
    >
      <!-- 左面板：教学内容 -->
      <div
        class="panel-content"
        :style="{ width: isLocalMode ? '100%' : 'calc(' + panelWidths.content + '% - 4px)' }"
      >
        <LessonContent :key="lessonId" :lesson="lesson" @complete="markComplete" />
      </div>

      <template v-if="!isLocalMode">
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
          :style="{ width: 'calc(' + panelWidths.editor + '% - 4px)' }"
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
          :style="{ width: 'calc(' + panelWidths.preview + '% - 4px)' }"
        >
          <LivePreview :srcdoc="previewSrc" />
        </div>
      </template>
    </div>

    <!-- 未找到课程 -->
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

/* local 模式：纯教程内容，全宽滚动 */
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
