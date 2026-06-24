<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllLessons, getLesson } from '../content-loaders/lessons'
import { useProgressStore } from '../stores/progress'
import { useCodePreview } from '../composables/useCodePreview'
import { usePanelResize } from '../composables/usePanelResize'
import { useAsyncComputed } from '../composables/useAsyncComputed'
import { useLessonNavigation } from '../composables/useLessonNavigation'
import { useNotes } from '../composables/useNotes'
import { encodeCode, decodeCode } from '../utils/shareCode'
import type { UserCode } from '../types'
// CodeEditor 按需加载：只在 sandbox 模式课程中使用，
// 延迟加载可将 @codemirror/* 从主 bundle 拆分为独立 chunk（约 -500KB gzip）
const CodeEditor = defineAsyncComponent(() => import('../components/CodeEditor.vue'))
import LivePreview from '../components/LivePreview.vue'
import PlayerFooter from '../components/PlayerFooter.vue'
import Resizer from '../components/Resizer.vue'
import LessonSidebar from '../components/LessonSidebar.vue'
import DocumentRenderer from '../content-runtime/renderers/DocumentRenderer.vue'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()

// 存储错误提示
watch(() => progressStore.lastError, (err) => {
  if (err && typeof window !== 'undefined') {
    window.alert(err)
  }
})

const lessonId = computed(() => route.params.lessonId as string)
const lessonState = useAsyncComputed(() => getLesson(lessonId.value))
const all = computed(() => getAllLessons())
const userCode = ref<UserCode>({ html: '', css: '', js: '' })
const { previewSrc, triggerPreview, livePreviewMode } = useCodePreview(userCode)

const lesson = computed(() => lessonState.value.value)
const isSandboxMode = computed(() => lesson.value?.meta.mode === 'sandbox')
const isLocalMode = computed(() => lesson.value?.meta.mode === 'local')

// ─── 响应式宽度 ───────────────────────────────────────────────────────────
const windowWidth = ref(window.innerWidth)
function onResize() { windowWidth.value = window.innerWidth }
onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

// ─── 侧边栏 ───────────────────────────────────────────────────────────────
const sidebarExpanded = ref(false)
const isMobile = computed(() => windowWidth.value < 901)
const sidebarVariant = computed(() => {
  if (isMobile.value) return 'mobile'
  return sidebarExpanded.value ? 'expanded' : 'collapsed'
})
function toggleSidebar() {
  sidebarExpanded.value = !sidebarExpanded.value
}

// ─── 导航与面包屑 ─────────────────────────────────────────────────────────
const {
  isPrologue,
  currentTrackId,
  currentTrack,
  currentChapter,
  positionInChapter,
  totalInChapter,
  centerLabel,
  prevLabel,
  nextLabel,
  prevNavTitle,
  nextNavTitle,
  prevDisabled,
  nextDisabled,
  goPrev,
  goNext,
} = useLessonNavigation(lessonId, lesson, all)

// 同步当前课程 ID（独立 watcher，不影响代码初始化）
watch(lesson, (l) => {
  if (l) progressStore.currentLessonId = l.id
})

// 仅在课程切换时初始化代码（显式 watch，编辑操作不会触发）
watch(lesson, (l) => {
  if (!l) return
  if (l.meta.mode === 'sandbox') {
    const saved = progressStore.getUserCode(l.id)
    userCode.value = saved ? { ...saved } : { ...l.starter }
    triggerPreview()
  }
})

function onCodeChange(code: UserCode) {
  userCode.value = code
  if (lesson.value) {
    progressStore.saveUserCode(lesson.value.id, code)
  }
}

function resetCode() {
  const l = lesson.value
  if (!l) return
  userCode.value = { ...l.starter }
  progressStore.resetUserCode(l.id)
  triggerPreview()
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

// ─── Wave 1.4: 面板全屏 ───────────────────────────────────────────────────
const maximized = ref<'none' | 'editor' | 'preview'>('none')

function setMaximized(panel: 'editor' | 'preview') {
  maximized.value = maximized.value === panel ? 'none' : panel
}

// Esc 退出全屏
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && maximized.value !== 'none') {
    maximized.value = 'none'
  }
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))

// ─── Wave 2.1: 课程笔记 ───────────────────────────────────────────────────
const { notes, notesOpen, toggleNotes } = useNotes(lessonId)

// ─── Wave 2.2: 分享代码 ───────────────────────────────────────────────────
const shareCopied = ref(false)

function shareCode() {
  const encoded = encodeCode(userCode.value)
  const url = `${window.location.origin}${window.location.pathname}?code=${encoded}`
  navigator.clipboard.writeText(url).then(() => {
    shareCopied.value = true
    setTimeout(() => { shareCopied.value = false }, 2500)
  })
}

// 页面加载时检测 URL 中的 code 参数
onMounted(() => {
  const code = route.query.code as string | undefined
  if (code) {
    const decoded = decodeCode(code)
    if (decoded) {
      userCode.value = decoded
      triggerPreview()
    }
    // 清除 URL 中的 code 参数，避免刷新后重复注入
    router.replace({ query: {} })
  }
})

// ─── Wave 2.3: 错误行高亮 ─────────────────────────────────────────────────
const previewErrorLine = ref(0)

function onPreviewError(info: { lineno: number; message: string }) {
  previewErrorLine.value = info.lineno
}

// 运行新代码时清除上次错误
watch(previewSrc, () => {
  previewErrorLine.value = 0
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

      <!-- Wave 2.2: 分享按钮（仅 sandbox 模式） -->
      <button
        v-if="isSandboxMode"
        class="topbar-share-btn"
        :class="{ copied: shareCopied }"
        @click="shareCode"
      >
        {{ shareCopied ? '✓ 已复制' : '🔗 分享代码' }}
      </button>
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
        <!-- 内容面板 + 笔记 -->
        <div
          class="panel-content"
          :style="{ width: isLocalMode ? '100%' : 'calc(' + panelWidths.content + '% - 5.33px)' }"
        >
          <Transition name="slide-fade" mode="out-in">
            <DocumentRenderer :key="lessonId" :lesson="lesson" />
          </Transition>

          <!-- Wave 2.1: 课程笔记面板 -->
          <div class="notes-section">
            <button class="notes-toggle" @click="toggleNotes">
              {{ notesOpen ? '▾' : '▸' }} 笔记
            </button>
            <Transition name="notes-slide">
              <div v-if="notesOpen" class="notes-panel">
                <textarea
                  v-model="notes"
                  class="notes-textarea"
                  placeholder="在这里记录你的学习笔记…（自动保存）"
                />
              </div>
            </Transition>
          </div>
        </div>

        <template v-if="!isLocalMode && isSandboxMode">
          <Resizer boundary="content-editor" @drag-start="startDrag('content-editor', $event)" />
          <div
            :class="['panel-editor', { 'is-maximized': maximized === 'editor' }]"
            :style="maximized === 'editor' ? {} : { width: 'calc(' + panelWidths.editor + '% - 5.33px)' }"
          >
            <CodeEditor
              :key="lessonId"
              :model-value="userCode"
              :show-reset="true"
              :live-preview="livePreviewMode"
              :error-line="previewErrorLine"
              :is-maximized="maximized === 'editor'"
              @update:model-value="onCodeChange"
              @update:live-preview="livePreviewMode = $event"
              @run="triggerPreview"
              @reset="resetCode"
              @maximize="setMaximized('editor')"
            />
          </div>

          <Resizer boundary="editor-preview" @drag-start="startDrag('editor-preview', $event)" />
          <div
            :class="['panel-preview', { 'is-maximized': maximized === 'preview' }]"
            :style="maximized === 'preview' ? {} : { width: 'calc(' + panelWidths.preview + '% - 5.33px)' }"
          >
            <LivePreview
              :srcdoc="previewSrc"
              :is-maximized="maximized === 'preview'"
              @maximize="setMaximized('preview')"
              @preview-error="onPreviewError"
            />
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
  padding: 0 var(--sp-3);
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
.topbar-home:hover { color: var(--color-accent); }

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

.breadcrumb-sep { color: var(--color-border); flex-shrink: 0; font-size: var(--fs-xs); }
.breadcrumb-position { color: var(--color-text-light); }

/* Wave 2.2: 分享按钮 */
.topbar-share-btn {
  padding: 2px var(--sp-3);
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  white-space: nowrap;
  transition: all var(--transition);
  flex-shrink: 0;
}
.topbar-share-btn:hover { color: var(--color-accent); border-color: var(--color-accent-border); }
.topbar-share-btn.copied { color: var(--color-success); border-color: var(--color-success); }

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
.mobile-menu-btn { background: none; font-size: 1.2rem; color: var(--color-text); padding: var(--sp-1); }
.mobile-lesson-title {
  flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-size: var(--fs-sm); font-weight: 500; color: var(--color-text);
}

.sidebar-wrapper { display: none; }
.sidebar-overlay {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 199;
}

.sidebar-slide-enter-active, .sidebar-slide-leave-active {
  transition: transform var(--dur-normal) var(--ease-out);
}
.sidebar-slide-enter-from, .sidebar-slide-leave-to { transform: translateX(-100%); }

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
  min-height: 0;
}
.player-main.is-dragging * { pointer-events: none; }
.player-main.is-local { display: block; overflow-y: auto; }
.player-main.is-local .panel-content { max-width: 860px; margin: 0 auto; overflow: visible; }

.panel-content {
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.panel-editor, .panel-preview {
  overflow: hidden;
  flex-shrink: 0;
}
.panel-editor {
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

/* Wave 1.4: 全屏面板 */
.panel-editor.is-maximized,
.panel-preview.is-maximized {
  position: fixed;
  inset: 0;
  z-index: 300;
  width: 100% !important;
  height: 100% !important;
}

.lesson-not-found {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-4);
}

/* ─── Wave 2.1: 笔记区 ─── */
.notes-section {
  flex-shrink: 0;
  border-top: 1px solid var(--color-border-light);
}
.notes-toggle {
  width: 100%;
  padding: var(--sp-2) var(--sp-4);
  text-align: left;
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  background: var(--color-panel);
  transition: background var(--dur-fast);
}
.notes-toggle:hover { background: var(--color-bg-warm); color: var(--color-accent); }

.notes-panel {
  padding: 0 var(--sp-4) var(--sp-3);
  background: var(--color-panel);
}
.notes-textarea {
  width: 100%;
  min-height: 100px;
  max-height: 240px;
  padding: var(--sp-2) var(--sp-3);
  font-size: var(--fs-sm);
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  resize: vertical;
  line-height: 1.6;
  transition: border-color var(--transition);
}
.notes-textarea:focus { outline: none; border-color: var(--color-gold); }

.notes-slide-enter-active { transition: all 0.2s var(--ease-out); }
.notes-slide-leave-active { transition: all 0.15s var(--ease-in); }
.notes-slide-enter-from, .notes-slide-leave-to { opacity: 0; transform: translateY(-8px); }

/* ─── 响应式 ─── */
@media (max-width: 900px) {
  .mobile-bar { display: flex; }

  .sidebar-wrapper {
    position: fixed; inset: 0;
    width: var(--sidebar-width);
    z-index: 200; display: block;
    background: var(--color-panel);
  }

  .player-layout { width: 100vw; }

  :deep(.resizer) { display: none; }

  .player-main {
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    width: 100vw;
  }

  .panel-content, .panel-editor, .panel-preview {
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
    border-left: none; border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .panel-preview { min-height: 360px; }

  .topbar-share-btn { display: none; }
}

@media (min-width: 901px) {
  .sidebar-wrapper.visible {
    display: block;
    height: 100%;
  }
}
</style>
