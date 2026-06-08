<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { chapters, lessons } from '../configs/lessons'
import { useProgressStore } from '../stores/progress'

const props = withDefaults(defineProps<{
  currentLessonId: string
  trackId?: string
  variant?: 'mobile' | 'expanded' | 'collapsed'
  currentPosition?: { lessonIndex: number; totalLessons: number }
}>(), {
  trackId: 'fundamentals',
  variant: 'mobile',
  currentPosition: () => ({ lessonIndex: 0, totalLessons: 0 })
})

const emit = defineEmits<{
  select: [lessonId: string]
  close: []
  toggle: []
}>()

const progressStore = useProgressStore()

// 仅显示当前轨道的章节
const visibleChapters = computed(() =>
  chapters.filter(ch =>
    lessons.some(l => l.chapterId === ch.id && (l.trackId || 'fundamentals') === props.trackId)
  )
)

// 当前所属章节
const currentChapter = computed(() => {
  const lesson = lessons.find(l => l.id === props.currentLessonId)
  if (!lesson) return null
  return chapters.find(ch => ch.id === lesson.chapterId) || null
})

// 章节完成数
function chapterCompletedCount(chapterId: string): number {
  return progressStore.getChapterCompletedCount(chapterId)
}

function chapterTotalCount(chapterId: string): number {
  return progressStore.getChapterLessonCount(chapterId)
}

// 自动滚动
const bodyRef = ref<HTMLDivElement>()
const activeLessonRef = ref<HTMLButtonElement>()
const chapterEls: Record<string, HTMLElement> = {}

watch(() => props.currentLessonId, () => {
  nextTick(() => {
    activeLessonRef.value?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  })
}, { immediate: true })

function setChapterRef(chapterId: string) {
  return (el: unknown) => {
    if (el) chapterEls[chapterId] = el as HTMLElement
  }
}

// 收起模式点击图标时：展开并滚动到对应章节
function expandToChapter(chapterId: string) {
  emit('toggle')
  setTimeout(() => {
    chapterEls[chapterId]?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, 300)
}

// 底部按钮展开时：滚动到当前课程
function expandToCurrent() {
  emit('toggle')
  setTimeout(() => {
    activeLessonRef.value?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, 300)
}
</script>

<template>
  <aside :class="['sidebar', `sidebar-${variant}`]">
    <!-- 收起模式：只显示章节图标 -->
    <template v-if="variant === 'collapsed'">
      <div class="collapsed-icons">
        <button
          v-for="chapter in visibleChapters"
          :key="chapter.id"
          :class="[
            'collapsed-chapter-btn',
            { active: chapter.id === currentChapter?.id }
          ]"
          :title="chapter.title"
          @click="expandToChapter(chapter.id)"
        >
          {{ chapter.icon }}
        </button>
        <button class="collapsed-expand-btn" @click="expandToCurrent" title="展开目录">☰</button>
      </div>
    </template>

    <!-- 展开 / mobile 模式 -->
    <template v-else>
      <!-- mobile 模式顶部关闭按钮 -->
      <div v-if="variant === 'mobile'" class="sidebar-close-bar">
        <span class="sidebar-close-title">导航</span>
        <button class="sidebar-header-btn" @click="emit('close')">✕</button>
      </div>

      <div ref="bodyRef" class="sidebar-body">
        <div
          v-for="chapter in visibleChapters"
          :key="chapter.id"
          :ref="setChapterRef(chapter.id)"
          class="sidebar-chapter"
        >
          <div class="chapter-label">
            <span class="chapter-icon">{{ chapter.icon }}</span>
            <span>{{ chapter.title }}</span>
            <span class="chapter-count">
              {{ chapterCompletedCount(chapter.id) }}/{{ chapterTotalCount(chapter.id) }}
            </span>
          </div>

          <button
            v-for="lesson in lessons.filter(l => l.chapterId === chapter.id)"
            :key="lesson.id"
            :ref="lesson.id === currentLessonId ? (el) => { activeLessonRef = el as HTMLButtonElement | undefined } : undefined"
            :class="[
              'sidebar-lesson',
              { active: lesson.id === currentLessonId }
            ]"
            @click="emit('select', lesson.id)"
          >
            <span class="lesson-dot">
              <span v-if="progressStore.isCompleted(lesson.id)" class="dot-done">✓</span>
              <span v-else-if="lesson.id === currentLessonId" class="dot-current" />
              <span v-else class="dot-pending" />
            </span>
            <span class="lesson-label">{{ lesson.title }}</span>
          </button>
        </div>
      </div>

      <!-- 桌面端底部收起按钮 -->
      <div v-if="variant === 'expanded'" class="sidebar-footer">
        <button class="sidebar-footer-btn" @click="emit('toggle')" title="收起侧栏">
          ◀ 收起目录
        </button>
      </div>
    </template>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  background: var(--color-panel);
  border-right: 1px solid var(--color-border-light);
  flex-shrink: 0;
  height: 100%;
  overflow: hidden;
  transition: width var(--dur-normal) var(--ease-out);
  max-width: 300px;
}

/* ===== 展开 / mobile 模式 ===== */
.sidebar-expanded,
.sidebar-mobile {
  width: var(--sidebar-width);
}

.sidebar-collapsed {
  width: var(--sidebar-collapsed-width);
}

/* ===== 收起模式 ===== */
.collapsed-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-1);
  padding: var(--sp-2) var(--sp-1);
  height: 100%;
}

.collapsed-chapter-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition);
  flex-shrink: 0;
}

.collapsed-chapter-btn:hover {
  background: var(--color-bg-warm);
  border-color: var(--color-border-light);
}

.collapsed-chapter-btn.active {
  background: var(--color-accent-bg);
  border-color: var(--color-accent-border);
}

.collapsed-expand-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--color-text-light);
  transition: all var(--transition);
  margin-top: auto;
}

.collapsed-expand-btn:hover {
  background: var(--color-bg-warm);
  color: var(--color-text);
}

/* ===== mobile 关闭按钮 ===== */
.sidebar-close-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--sp-2) var(--sp-3);
  flex-shrink: 0;
}

.sidebar-close-title {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--color-text);
  margin-left: 8px;
} 

.sidebar-header-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-light);
  font-size: var(--fs-sm);
  flex-shrink: 0;
}

.sidebar-header-btn:hover {
  background: var(--color-bg-warm);
}

/* ===== 底部收起按钮 ===== */
.sidebar-footer {
  padding: var(--sp-1) var(--sp-3);
  border-top: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.sidebar-footer-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-1);
  width: 100%;
  padding: var(--sp-2) var(--sp-3);
  background: transparent;
  border-radius: var(--radius-sm);
  color: var(--color-text-light);
  font-size: var(--fs-xs);
}

.sidebar-footer-btn:hover {
  background: var(--color-bg-warm);
  color: var(--color-text);
}

/* ===== 内容区 ===== */
.sidebar-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--sp-3);
}

.sidebar-chapter {
  margin-bottom: var(--sp-4);
}

.chapter-label {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--sp-2) var(--sp-2);
}

.chapter-icon {
  font-size: 0.9rem;
}

.chapter-count {
  margin-left: auto;
  font-family: var(--font-code);
  color: var(--color-gold);
  letter-spacing: 0;
  text-transform: none;
}

.sidebar-lesson {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  width: 100%;
  padding: var(--sp-2) var(--sp-2) var(--sp-2) var(--sp-5);
  background: transparent;
  text-align: left;
  border-radius: var(--radius-sm);
  font-size: var(--fs-xs);
  color: var(--color-text);
  transition: background var(--dur-fast) ease,
              color var(--dur-fast) ease,
              padding-left var(--dur-normal) var(--ease-out);
}

.sidebar-lesson:hover {
  background: var(--color-bg-warm);
}

.sidebar-lesson.active {
  background: var(--color-accent-bg);
  color: var(--color-accent);
  font-weight: 600;
  padding-left: calc(var(--sp-5) + 4px);
}

.lesson-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.dot-done {
  color: var(--color-success);
  font-size: 12px;
  font-weight: 700;
}

.dot-current {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 0 rgba(139, 46, 46, 0.4);
  animation: pulse-glow 2s ease-in-out infinite;
}

.dot-pending {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid var(--color-border);
}
</style>
