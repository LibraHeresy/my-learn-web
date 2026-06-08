<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { lessons, chapters } from '../configs/lessons'
import { tracks } from '../configs/tracks'
import { prologueLessons } from '../configs/prologues'
import { useProgressStore } from '../stores/progress'
import { useCodePreview } from '../composables/useCodePreview'
import { usePanelResize } from '../composables/usePanelResize'
import { useKeyboardNav } from '../composables/useKeyboardNav'
import type { UserCode } from '../types'
import LessonContent from '../components/LessonContent.vue'
import CodeEditor from '../components/CodeEditor.vue'
import LivePreview from '../components/LivePreview.vue'
import LessonSidebar from '../components/LessonSidebar.vue'
import PlayerFooter from '../components/PlayerFooter.vue'
import Resizer from '../components/Resizer.vue'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()

const allLessons = computed(() => [...lessons, ...prologueLessons])

const lessonId = computed(() => route.params.lessonId as string)
const lesson = computed(() => allLessons.value.find(l => l.id === lessonId.value))

// 登台篇课程使用 local 模式——不显示编辑器/预览，引导学习者在本地 IDE 操作
const isLocalMode = computed(() => lesson.value?.mode === 'local')

// ===== 当前位置信息 =====
const currentTrackId = computed(() => lesson.value?.trackId || 'fundamentals')
const currentChapterId = computed(() => lesson.value?.chapterId)
const currentChapter = computed(() => chapters.find(ch => ch.id === currentChapterId.value))
const currentTrack = computed(() => tracks.find(t => t.id === currentTrackId.value))
const currentChapterLessons = computed(() =>
  lessons.filter(l => l.chapterId === currentChapterId.value)
)
const positionInChapter = computed(() =>
  currentChapterLessons.value.findIndex(l => l.id === lessonId.value) + 1
)
const totalInChapter = computed(() => currentChapterLessons.value.length)

const centerLabel = computed(() => {
  if (isPrologue.value) return `第 ${currentIndex.value + 1}/${prologueLessons.length} 篇`
  if (positionInChapter.value > 0) return `第 ${positionInChapter.value}/${totalInChapter.value} 课`
  return ''
})

// ===== 侧边栏状态 =====
const windowWidth = ref(window.innerWidth)
function onResize() { windowWidth.value = window.innerWidth }
onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

const sidebarCollapsed = ref(true)

function toggleSidebarCollapse() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const sidebarVariant = computed(() => {
  if (windowWidth.value < 901) return 'overlay'
  return sidebarCollapsed.value ? 'collapsed' : 'expanded'
})

const isOverlay = computed(() => windowWidth.value < 901)

// 用户代码不持久化，每次刷新/切换课程均从 starterCode 开始
const userCode = ref<UserCode>({ html: '', css: '', js: '' })

// ===== 面板拖动缩放 =====
const { panelWidths, dragging, playerMainRef, startDrag } = usePanelResize('code-score-panel-widths', 2)

// 手动预览
const { previewSrc, triggerPreview } = useCodePreview(userCode)

watch(lessonId, (id) => {
  const l = allLessons.value.find(l => l.id === id)
  if (l) {
    progressStore.currentLessonId = id
    userCode.value = { ...l.starterCode }
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

const isPrologue = computed(() => lesson.value?.chapterId === 'web-history')

const navList = computed(() => isPrologue.value ? prologueLessons : lessons)

const currentIndex = computed(() =>
  navList.value.findIndex(l => l.id === lessonId.value)
)

const prevLesson = computed(() =>
  currentIndex.value > 0 ? navList.value[currentIndex.value - 1] : null
)

const nextLesson = computed(() =>
  currentIndex.value < navList.value.length - 1 ? navList.value[currentIndex.value + 1] : null
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
  if (isPrologue.value) return '上一篇'
  return (prevLesson.value && prevLesson.value.chapterId !== lesson.value?.chapterId) ? '上一章' : '上一课'
})

const nextLabel = computed(() => {
  if (isPrologue.value) return '下一篇'
  return (nextLesson.value && nextLesson.value.chapterId !== lesson.value?.chapterId) ? '下一章' : '下一课'
})

const prevNavTitle = computed(() => prevLesson.value?.title ?? '')
const nextNavTitle = computed(() => nextLesson.value?.title ?? '')

const prevDisabled = computed(() => !prevLesson.value)
const nextDisabled = computed(() => !nextLesson.value)

function markComplete() {
  progressStore.markComplete(lessonId.value)
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

useKeyboardNav({
  canPrev: () => !prevDisabled.value,
  canNext: () => !nextDisabled.value,
  onPrev: goPrev,
  onNext: goNext,
})
</script>

<template>
  <div class="lesson-player">
    <!-- 桌面端顶部面包屑导航 -->
    <div v-if="lesson && !isOverlay" class="lesson-topbar">
      <div class="topbar-breadcrumb">
        <button class="topbar-home" @click="router.push('/')">🏠首页</button>
        <span class="breadcrumb-sep">›</span>
        <template v-if="isPrologue">
          <span>📜 筚路蓝缕</span>
          <span class="breadcrumb-sep">·</span>
          <span class="breadcrumb-position">{{ centerLabel }}</span>
        </template>
        <template v-else>
          <span>{{ currentTrack?.icon }} {{ currentTrack?.title }}</span>
          <span class="breadcrumb-sep">›</span>
          <span>{{ currentChapter?.title }}</span>
          <span class="breadcrumb-position">{{ centerLabel }}</span>
        </template>
      </div>
    </div>

    <!-- 移动端顶部条 -->
    <div class="mobile-bar">
      <button class="mobile-menu-btn" @click="sidebarOpen = true">☰</button>
      <span class="mobile-lesson-title">{{ lesson?.title }}</span>
    </div>

    <!-- 侧边栏遮罩（仅移动端） -->
    <Transition name="fade">
      <div v-if="isOverlay && sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false" />
    </Transition>

    <!-- 主内容区（侧栏 + 内容并排） -->
    <div class="player-layout">
      <!-- 侧边栏（筚路蓝缕课程不展示） -->
      <div
        v-if="!isPrologue"
        :class="['sidebar-wrapper', {
          open: sidebarOpen,
          visible: !isOverlay,
          collapsed: sidebarVariant === 'collapsed'
        }]"
      >
        <LessonSidebar
          :variant="sidebarVariant"
          :current-lesson-id="lessonId"
          :track-id="currentTrackId"
          :current-position="{ lessonIndex: positionInChapter, totalLessons: totalInChapter }"
          @select="selectLesson"
          @close="sidebarOpen = false"
          @toggle="toggleSidebarCollapse"
        />
      </div>

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
          <Transition name="slide-fade" mode="out-in">
            <LessonContent :key="lessonId" :lesson="lesson" @complete="markComplete" />
          </Transition>
        </div>

        <template v-if="!isLocalMode">
          <!-- 分隔线 1：内容 ↔ 编辑器 -->
          <Resizer boundary="content-editor" @drag-start="startDrag('content-editor', $event)" />

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
          <Resizer boundary="editor-preview" @drag-start="startDrag('editor-preview', $event)" />

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
    </div>

    <!-- 底部导航 -->
    <PlayerFooter
      v-if="lesson"
      :prev-label="prevLabel"
      :next-label="nextLabel"
      :prev-nav-title="prevNavTitle"
      :next-nav-title="nextNavTitle"
      :prev-disabled="prevDisabled"
      :next-disabled="nextDisabled"
      :show-complete="!isPrologue"
      :is-completed="progressStore.isCompleted(lessonId)"
      :center-label="centerLabel"
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

/* ===== 桌面端顶部面包屑 ===== */
.lesson-topbar {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: 0 var(--sp-4);
  background: var(--color-panel);
  border-bottom: 1px solid var(--color-border-light);
  flex-shrink: 0;
  min-height: 36px;
  font-size: var(--fs-xs);
  color: var(--color-text-light);
}

.topbar-home {
  background: none;
  color: var(--color-text-light);
  font-size: var(--fs-xs);
  padding: 2px 0;
  flex-shrink: 0;
}

.topbar-home:hover {
  color: var(--color-accent);
}

.topbar-breadcrumb {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  overflow: hidden;
  white-space: nowrap;
  font-size: var(--fs-xs);
  color: var(--color-text-light);
}

.breadcrumb-sep {
  color: var(--color-border);
  flex-shrink: 0;
  font-size: var(--fs-xs);
}

.breadcrumb-position {
  color: var(--color-text-light);
}

.topbar-toggle {
  background: none;
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  padding: var(--sp-1);
  flex-shrink: 0;
}

.topbar-toggle:hover {
  color: var(--color-accent);
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

/* ===== 侧边栏容器 ===== */
.sidebar-wrapper {
  display: none;
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  top: var(--header-height);
  background: rgba(0, 0, 0, 0.3);
  z-index: 199;
}

/* ===== 主布局：侧栏 + 内容并排 ===== */
.player-layout {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
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
  .lesson-player {
    width: 100vw;
  }

  .lesson-topbar {
    display: none;
  }

  .mobile-bar {
    display: flex;
  }

  .sidebar-wrapper {
    position: fixed;
    top: var(--header-height);
    left: 0;
    bottom: 0;
    z-index: 200;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    display: block;
  }

  .sidebar-wrapper.open {
    transform: translateX(0);
  }

  .player-layout {
    width: 100vw;
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
}

@media (min-width: 901px) {
  .sidebar-wrapper.visible {
    display: block;
    height: 100%;
  }
}
</style>
