<script setup lang="ts">
import { chapters, lessons } from '../configs/lessons'
import { useProgressStore } from '../stores/progress'

const props = defineProps<{
  currentLessonId: string
}>()

const emit = defineEmits<{
  select: [lessonId: string]
  close: []
}>()

const progressStore = useProgressStore()
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h3 class="sidebar-title">课程目录</h3>
      <button class="sidebar-close" @click="emit('close')">✕</button>
    </div>

    <div class="sidebar-body">
      <div
        v-for="chapter in chapters"
        :key="chapter.id"
        class="sidebar-chapter"
      >
        <div class="chapter-label">
          <span class="chapter-icon">{{ chapter.icon }}</span>
          <span>{{ chapter.title }}</span>
        </div>

        <button
          v-for="lesson in lessons.filter(l => l.chapterId === chapter.id)"
          :key="lesson.id"
          :class="[
            'sidebar-lesson',
            { active: lesson.id === props.currentLessonId }
          ]"
          @click="emit('select', lesson.id)"
        >
          <span class="lesson-dot">
            <span v-if="progressStore.isCompleted(lesson.id)" class="dot-done">✓</span>
            <span v-else-if="lesson.id === props.currentLessonId" class="dot-current" />
            <span v-else class="dot-pending" />
          </span>
          <span class="lesson-label">{{ lesson.title }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  height: 100%;
  background: var(--color-panel);
  border-right: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--color-border-light);
}

.sidebar-title {
  font-size: var(--fs-sm);
  font-weight: 600;
}

.sidebar-close {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-light);
  font-size: var(--fs-sm);
}

.sidebar-close:hover {
  background: var(--color-bg-warm);
}

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

.sidebar-lesson {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  width: 100%;
  padding: var(--sp-2) var(--sp-2) var(--sp-2) var(--sp-5);
  background: transparent;
  text-align: left;
  border-radius: var(--radius-sm);
  font-size: var(--fs-sm);
  color: var(--color-text);
}

.sidebar-lesson:hover {
  background: var(--color-bg-warm);
}

.sidebar-lesson.active {
  background: #FDF0F0;
  color: var(--color-accent);
  font-weight: 600;
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
}

.dot-pending {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid var(--color-border);
}

.lesson-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
