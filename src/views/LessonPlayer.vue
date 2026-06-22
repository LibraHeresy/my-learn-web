<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllLessons, getLesson } from '../content-loaders/lessons'
import { useProgressStore } from '../stores/progress'
import { useCodePreview } from '../composables/useCodePreview'
import { usePanelResize } from '../composables/usePanelResize'
import { useAsyncComputed } from '../composables/useAsyncComputed'
import type { UserCode } from '../types'
import CodeEditor from '../components/CodeEditor.vue'
import LivePreview from '../components/LivePreview.vue'
import PlayerFooter from '../components/PlayerFooter.vue'
import Resizer from '../components/Resizer.vue'
import LessonSidebar from '../components/LessonSidebar.vue'
import { getChapterOrder, getTrack, getChapter } from '../content-loaders/taxonomy'
import DocumentRenderer from '../content-runtime/renderers/DocumentRenderer.vue'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()

const lessonId = computed(() => route.params.lessonId as string)
const lessonState = useAsyncComputed(() => getLesson(lessonId.value))
const all = computed(() => getAllLessons())
const userCode = ref<UserCode>({ html: '', css: '', js: '' })
const { previewSrc, triggerPreview } = useCodePreview(userCode)

const lesson = computed(() => lessonState.value.value)
const isSandboxMode = computed(() => lesson.value?.meta.mode === 'sandbox')
const isLocalMode = computed(() => lesson.value?.meta.mode === 'local')
const isPrologue = computed(() => lesson.value?.meta.track === 'prologue')

const windowWidth = ref(window.innerWidth)
function onResize() { windowWidth.value = window.innerWidth }
onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

const sidebarExpanded = ref(false)
const isMobile = computed(() => windowWidth.value < 901)
const sidebarVariant = computed(() => {
  if (isMobile.value) return 'mobile'
  return sidebarExpanded.value ? 'expanded' : 'collapsed'
})

function toggleSidebar() {
  sidebarExpanded.value = !sidebarExpanded.value
}

watchEffect(() => {
  const l = lesson.value
  if (!l) return
  progressStore.currentLessonId = l.id
  if (l.meta.mode === 'sandbox') {
    userCode.value = { ...l.starter }
    triggerPreview()
  }
})

function onCodeChange(code: UserCode) {
  userCode.value = code
}

const currentTrackId = computed(() => lesson.value?.meta.track || 'fundamentals')
const currentChapterId = computed(() => lesson.value?.meta.chapter)

const orderedLessons = computed(() => {
  return all.value
    .filter((l) => l.meta.track === currentTrackId.value)
    .slice()
    .sort((a, b) => {
      const ai = getChapterOrder(a.meta.chapter)
      const bi = getChapterOrder(b.meta.chapter)
      if (ai !== bi) return ai - bi
      return a.meta.order - b.meta.order
    })
})

const currentIndex = computed(() => orderedLessons.value.findIndex((l) => l.id === lessonId.value))
const prevLesson = computed(() => (currentIndex.value > 0 ? orderedLessons.value[currentIndex.value - 1] : null))
const nextLesson = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < orderedLessons.value.length - 1 ? orderedLessons.value[currentIndex.value + 1] : null,
)

const currentChapterLessons = computed(() => {
  if (!currentChapterId.value) return []
  return orderedLessons.value.filter((l) => l.meta.chapter === currentChapterId.value)
})

const positionInChapter = computed(() => currentChapterLessons.value.findIndex((l) => l.id === lessonId.value) + 1)
const totalInChapter = computed(() => currentChapterLessons.value.length)

const centerLabel = computed(() => {
  if (positionInChapter.value <= 0) return ''
  if (isPrologue.value) return `第 ${positionInChapter.value}/${totalInChapter.value} 篇`
  return `第 ${positionInChapter.value}/${totalInChapter.value} 课`
})

const currentTrack = computed(() => getTrack(currentTrackId.value))
const currentChapter = computed(() => getChapter(currentChapterId.value))

const prevLabel = computed(() => {
  if (isPrologue.value) return prevLesson.value ? '上一篇' : ''
  if (!prevLesson.value) return '上一课'
  return prevLesson.value.meta.chapter !== currentChapterId.value ? '上一章' : '上一课'
})

const nextLabel = computed(() => {
  if (isPrologue.value) return nextLesson.value ? '下一篇' : ''
  if (!nextLesson.value) return '下一课'
  return nextLesson.value.meta.chapter !== currentChapterId.value ? '下一章' : '下一课'
})

const prevNavTitle = computed(() => isPrologue.value ? '' : (prevLesson.value?.meta.title ?? ''))
const nextNavTitle = computed(() => isPrologue.value ? '' : (nextLesson.value?.meta.title ?? ''))
const prevDisabled = computed(() => !prevLesson.value)
const nextDisabled = computed(() => !nextLesson.value)

function goPrev() {
  if (prevLesson.value) router.push(`/lesson/${prevLesson.value.id}`)
}

function goNext() {
  if (nextLesson.value) router.push(`/lesson/${nextLesson.value.id}`)
}

function markComplete() {
  progressStore.markComplete(lessonId.value)
}

function selectLesson(id: string) {
  if (isMobile.value) sidebarExpanded.value = false
  router.push(`/lesson/${id}`)
}

const { panelWidths, dragging, playerMainRef, startDrag } = usePanelResize('code-score-panel-widths', 1)

watch(lessonId, () => {
  if (playerMainRef.value) {
    playerMainRef.value.scrollTop = 0
  }
})
</script>

<template>
  <div class="lesson-player">
    <div v-if="lesson && isMobile" class="mobile-bar">
      <button v-if="!isPrologue" class="mobile-menu-btn" @click="sidebarExpanded = true">☰</button>
      <span class="mobile-lesson-title">{{ lesson.meta.title }}</span>
    </div>

    <!-- 桌面端顶部面包屑导航 -->
    <div v-if="lesson && !isMobile" class="lesson-topbar">
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

    <Transition name="fade">
      <div v-if="isMobile && sidebarExpanded" class="sidebar-overlay" @click="sidebarExpanded = false" />
    </Transition>

    <div class="player-layout">
      <Transition name="sidebar-slide">
        <div
          v-if="lesson && !isPrologue && (!isMobile || sidebarExpanded)"
          :class="['sidebar-wrapper', {
            visible: !isMobile,
            collapsed: sidebarVariant === 'collapsed'
          }]"
        >
          <LessonSidebar
            :variant="sidebarVariant"
            :current-lesson-id="lessonId"
            :track-id="currentTrackId"
            :lessons="all"
            :current-position="{ lessonIndex: positionInChapter, totalLessons: totalInChapter }"
            @select="selectLesson"
            @close="sidebarExpanded = false"
            @toggle="toggleSidebar"
          />
        </div>
      </Transition>

      <div
        v-if="lesson"
        ref="playerMainRef"
        :class="['player-main', { 'is-dragging': dragging, 'is-local': isLocalMode }]"
      >
        <div
          class="panel-content"
          :style="{ width: isLocalMode ? '100%' : 'calc(' + panelWidths.content + '% - 4px)' }"
        >
          <Transition name="slide-fade" mode="out-in">
            <DocumentRenderer :key="lessonId" :lesson="lesson" />
          </Transition>
        </div>

        <template v-if="!isLocalMode && isSandboxMode">
          <Resizer boundary="content-editor" @drag-start="startDrag('content-editor', $event)" />
          <div
            class="panel-editor"
            :style="{ width: 'calc(' + panelWidths.editor + '% - 4px)' }"
          >
            <CodeEditor
              :key="lessonId"
              :model-value="userCode"
              @update:model-value="onCodeChange"
              @run="triggerPreview"
            />
          </div>

          <Resizer boundary="editor-preview" @drag-start="startDrag('editor-preview', $event)" />
          <div
            class="panel-preview"
            :style="{ width: 'calc(' + panelWidths.preview + '% - 4px)' }"
          >
            <LivePreview :srcdoc="previewSrc" />
          </div>
        </template>
      </div>

      <div v-else class="lesson-not-found">
        <p>课程未找到</p>
        <button @click="router.push('/')">返回首页</button>
      </div>
    </div>

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
  height: 100%;
  display: flex;
  flex-direction: column;
}

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
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--color-text);
}

.sidebar-wrapper {
  display: none;
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 199;
}

.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform var(--dur-normal) var(--ease-out);
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(-100%);
}

.player-layout {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
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
  overflow: visible;
}

.panel-content {
  overflow-y: auto;
  overflow-x: hidden;
}

.panel-editor,
.panel-preview {
  overflow: hidden;
  flex-shrink: 0;
}

.panel-editor {
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.lesson-not-found {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-4);
}

@media (max-width: 900px) {
  .mobile-bar {
    display: flex;
  }

  .sidebar-wrapper {
    position: fixed;
    inset: 0;
    width: var(--sidebar-width);
    z-index: 200;
    display: block;
    background: var(--color-panel);
  }

  .player-layout {
    width: 100vw;
  }

  :deep(.resizer) {
    display: none;
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
    overflow: visible;
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
