<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { chaptersV2 } from '../content-loaders/taxonomy'
import { useProgressStore } from '../stores/progress'
import type { CompiledLesson } from '../content-runtime/types'

const props = withDefaults(defineProps<{
  currentLessonId: string
  trackId?: string
  variant?: 'mobile' | 'expanded' | 'collapsed'
  currentPosition?: { lessonIndex: number; totalLessons: number }
  lessons: CompiledLesson[]
}>(), {
  trackId: 'fundamentals',
  variant: 'mobile',
  currentPosition: () => ({ lessonIndex: 0, totalLessons: 0 }),
})

const emit = defineEmits<{
  select: [lessonId: string]
  close: []
  toggle: []
}>()

const progressStore = useProgressStore()
const chapterMap = computed(() => new Map(chaptersV2.map((c) => [c.id, c])))

const filteredLessons = computed(() =>
  props.lessons
    .filter((l) => l.meta.track === props.trackId)
    .slice()
    .sort((a, b) => a.meta.order - b.meta.order),
)

const visibleChapters = computed(() => {
  const chapterIds = Array.from(new Set(filteredLessons.value.map((l) => l.meta.chapter)))
  const ordered = chapterIds
    .slice()
    .sort((a, b) => {
      const ai = chaptersV2.findIndex((c) => c.id === a)
      const bi = chaptersV2.findIndex((c) => c.id === b)
      return (ai === -1 ? Number.MAX_SAFE_INTEGER : ai) - (bi === -1 ? Number.MAX_SAFE_INTEGER : bi)
    })
  return ordered.map((id) => {
    const def = chapterMap.value.get(id)
    return {
      id,
      title: def?.title ?? id,
      icon: def?.icon ?? '📖',
    }
  })
})

const currentChapterId = computed(() => {
  const l = props.lessons.find((x) => x.id === props.currentLessonId)
  return l?.meta.chapter ?? null
})

function chapterLessons(chapterId: string) {
  return filteredLessons.value.filter((l) => l.meta.chapter === chapterId).slice().sort((a, b) => a.meta.order - b.meta.order)
}

function chapterCompletedCount(chapterId: string): number {
  return chapterLessons(chapterId).filter((l) => progressStore.isCompleted(l.id)).length
}

function chapterTotalCount(chapterId: string): number {
  return chapterLessons(chapterId).length
}

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

function expandToChapter(chapterId: string) {
  emit('toggle')
  setTimeout(() => {
    chapterEls[chapterId]?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, 300)
}

function expandToCurrent() {
  emit('toggle')
  setTimeout(() => {
    activeLessonRef.value?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, 300)
}
</script>

<template>
  <aside :class="['sidebar', `sidebar-${variant}`]">
    <template v-if="variant === 'collapsed'">
      <div class="collapsed-icons">
        <button
          v-for="chapter in visibleChapters"
          :key="chapter.id"
          :class="[
            'collapsed-chapter-btn',
            { active: chapter.id === currentChapterId }
          ]"
          :title="chapter.title"
          @click="expandToChapter(chapter.id)"
        >
          {{ chapter.icon }}
        </button>
        <button class="collapsed-expand-btn" @click="expandToCurrent" title="展开目录">☰</button>
      </div>
    </template>

    <template v-else>
      <div v-if="variant === 'mobile'" class="sidebar-close-bar">
        <span class="sidebar-close-title">导航</span>
        <button class="sidebar-header-btn" @click="emit('close')">✕</button>
      </div>

      <div class="sidebar-body">
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
            v-for="lesson in chapterLessons(chapter.id)"
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
            <span class="lesson-label">{{ lesson.meta.title }}</span>
          </button>
        </div>
      </div>

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

.sidebar-expanded,
.sidebar-mobile {
  width: var(--sidebar-width);
}

.sidebar-collapsed {
  width: var(--sidebar-collapsed-width);
}

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

.sidebar-close-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--sp-2) var(--sp-3);
  flex-shrink: 0;
  border-bottom: 1px solid var(--color-border-light);
}

.sidebar-close-title {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  font-weight: 600;
  letter-spacing: 0.05em;
}

.sidebar-header-btn {
  background: transparent;
  color: var(--color-text-light);
  font-size: 1rem;
}

.sidebar-body {
  overflow-y: auto;
  padding: var(--sp-3);
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.sidebar-chapter {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.chapter-label {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.chapter-icon {
  font-size: 1rem;
}

.chapter-count {
  margin-left: auto;
  font-family: var(--font-code);
  color: var(--color-gold);
}

.sidebar-lesson {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-2);
  text-align: left;
  padding: var(--sp-2) var(--sp-2);
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid transparent;
  transition: all var(--transition);
}

.sidebar-lesson:hover {
  background: var(--color-bg-warm);
  border-color: var(--color-border-light);
}

.sidebar-lesson.active {
  background: var(--color-accent-bg);
  border-color: var(--color-accent-border);
}

.lesson-dot {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.dot-done {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-success);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}

.dot-current {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-gold);
}

.dot-pending {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border);
}

.lesson-label {
  font-size: var(--fs-xs);
  color: var(--color-text);
  line-height: 1.45;
}

.sidebar-footer {
  padding: var(--sp-2) var(--sp-3);
  border-top: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.sidebar-footer-btn {
  width: 100%;
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-light);
  font-size: var(--fs-xs);
}

.sidebar-footer-btn:hover {
  background: var(--color-bg-warm);
  color: var(--color-text);
}
</style>

