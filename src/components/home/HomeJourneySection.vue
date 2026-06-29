<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { LessonMetaItem } from '../../content-loaders/lessons'
import type { ProjectListItem } from '../../content-runtime/types'
import { useProgressStore } from '../../stores/progress'
import { tracks, chapters } from '../../content-loaders/taxonomy'

const props = defineProps<{
  lessons: LessonMetaItem[]
  projects: ProjectListItem[]
}>()

const emit = defineEmits<{
  'go-to-lesson': [id: string]
  'go-to-project': [id: string]
}>()

const progressStore = useProgressStore()
const expandedTracks = ref<string[]>([])

const journeyTracks = tracks
  .filter((t) => ['fundamentals', 'framework', 'engineering', 'ai-collaboration'].includes(t.id))
  .slice()
  .sort((a, b) => a.order - b.order)

function getTrackLessonCount(trackId: string): number {
  if (trackId === 'projects') return props.projects.length
  return props.lessons.filter((l) => l.meta.track === trackId).length
}

function getTrackCompletedCount(trackId: string): number {
  if (trackId === 'projects') return 0
  return props.lessons
    .filter((l) => l.meta.track === trackId)
    .filter((l) => progressStore.isCompleted(l.id)).length
}

function getTrackChapters(trackId: string) {
  return chapters.filter((ch) =>
    props.lessons.some((l) => l.meta.chapter === ch.id && l.meta.track === trackId),
  )
}

function isTrackExpanded(trackId: string) {
  return expandedTracks.value.includes(trackId)
}

function toggleTrack(trackId: string) {
  const isExpanding = !isTrackExpanded(trackId)
  expandedTracks.value = isExpanding
    ? [...expandedTracks.value, trackId]
    : expandedTracks.value.filter((id) => id !== trackId)
  if (isExpanding) {
    nextTick(() => {
      const el = document.getElementById(`track-${trackId}`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
}
</script>

<template>
  <section id="tracks-section" class="journey-section">
    <h2 class="section-title">🎼 成长路径</h2>
    <hr class="staff-divider" />
    <p class="section-intro">
      四条路径，四重境界——从识谱到演奏，从独奏到指挥，一步步成为现代前端开发者。
    </p>

    <div class="track-cards">
      <div
        v-for="track in journeyTracks"
        :key="track.id"
        :id="`track-${track.id}`"
        :class="[
          'track-card',
          {
            expanded: isTrackExpanded(track.id),
            draft: getTrackLessonCount(track.id) === 0,
          },
        ]"
        @click="getTrackLessonCount(track.id) > 0 && toggleTrack(track.id)"
      >
        <div class="track-card-header">
          <span class="track-icon">{{ track.icon }}</span>
          <div class="track-info">
            <h3 class="track-title">
              {{ track.title }}
              <span v-if="getTrackLessonCount(track.id) === 0" class="track-soon-tag">即将推出</span>
            </h3>
            <p class="track-subtitle">{{ track.subtitle }}</p>
          </div>
          <div class="track-status">
            <template v-if="getTrackLessonCount(track.id) > 0">
              <span class="track-count">
                <template v-if="track.id === 'projects'">
                  {{ getTrackLessonCount(track.id) }} 个项目
                </template>
                <template v-else>
                  已探索 {{ getTrackCompletedCount(track.id) }} 个乐章
                </template>
              </span>
              <span class="track-arrow" :class="{ open: isTrackExpanded(track.id) }">▾</span>
            </template>
          </div>
        </div>

        <!-- 进度条 -->
        <div v-if="getTrackLessonCount(track.id) > 0" class="track-progress-bar">
          <div
            class="track-progress-fill"
            :style="{
              width: getTrackLessonCount(track.id)
                ? (getTrackCompletedCount(track.id) / getTrackLessonCount(track.id)) * 100 + '%'
                : '0%',
            }"
          />
        </div>

        <p v-if="getTrackLessonCount(track.id) === 0" class="track-draft-text">
          内容制作中，敬请期待
        </p>

        <!-- 展开的课程列表 -->
        <div
          :class="[
            'track-lessons',
            {
              'track-lessons--open':
                isTrackExpanded(track.id) && getTrackLessonCount(track.id) > 0,
            },
          ]"
        >
          <div class="track-lessons-inner">
            <template v-if="track.id !== 'projects'">
              <div
                v-for="chapter in getTrackChapters(track.id)"
                :key="chapter.id"
                class="track-chapter"
              >
                <div class="track-chapter-head">
                  <span>{{ chapter.icon }}</span>
                  <span>{{ chapter.title }}</span>
                </div>
                <button
                  v-for="lesson in lessons.filter(
                    (l) => l.meta.chapter === chapter.id && l.meta.track === track.id,
                  )"
                  :key="lesson.id"
                  :class="['track-lesson-item', { completed: progressStore.isCompleted(lesson.id) }]"
                  @click.stop="emit('go-to-lesson', lesson.id)"
                >
                  <span class="track-lesson-dot">{{ progressStore.isCompleted(lesson.id) ? '✓' : '·' }}</span>
                  <span class="track-lesson-title">{{ lesson.meta.title }}</span>
                  <span class="track-lesson-arrow">→</span>
                </button>
              </div>
            </template>
            <template v-if="track.id === 'projects'">
              <button
                v-for="project in projects"
                :key="project.id"
                class="track-lesson-item"
                @click.stop="emit('go-to-project', project.id)"
              >
                <span class="track-lesson-dot">·</span>
                <span class="track-lesson-title">{{ project.meta.icon }} {{ project.meta.title }}</span>
                <span class="track-lesson-arrow">→</span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.journey-section {
  padding: var(--sp-6) 0;
  scroll-margin-top: 28px;
}

.section-title {
  text-align: center;
  margin-bottom: var(--sp-2);
  font-size: var(--fs-xl);
}

.staff-divider {
  border: none;
  height: 3px;
  background: repeating-linear-gradient(
    90deg,
    var(--color-border) 0px,
    var(--color-border) 20px,
    transparent 20px,
    transparent 30px
  );
  margin: 0 auto var(--sp-6) auto;
  max-width: 200px;
}

.section-intro {
  text-align: center;
  color: var(--color-text-light);
  font-size: var(--fs-sm);
  margin-bottom: var(--sp-5);
  line-height: 1.6;
}

.track-cards {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.track-card {
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--sp-5);
  transition:
    border-color var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-fast) var(--ease-out),
    transform var(--dur-slow) var(--ease-out),
    margin var(--dur-slow) var(--ease-out);
  cursor: pointer;
  scroll-margin-top: var(--header-height);
  animation: reveal-up var(--dur-reveal) var(--ease-out) backwards;
}

.track-card:nth-child(1) { animation-delay: 0.1s; }
.track-card:nth-child(2) { animation-delay: 0.2s; }
.track-card:nth-child(3) { animation-delay: 0.3s; }
.track-card:nth-child(4) { animation-delay: 0.4s; }

.track-card.draft {
  cursor: default;
  opacity: 0.6;
}

.track-card:not(.draft):hover {
  border-color: var(--color-gold);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(201, 169, 110, 0.14);
}

.track-card:not(.draft).expanded {
  transform: scale(1.012);
  margin-top: 4px;
  margin-bottom: 4px;
}

.track-card-header {
  display: flex;
  align-items: flex-end;
  gap: var(--sp-4);
}

.track-icon {
  font-size: 2.2rem;
  flex-shrink: 0;
}

.track-info { flex: 1; }

.track-title {
  margin: 0;
  font-size: var(--fs-lg);
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

.track-subtitle {
  color: var(--color-text-light);
  font-size: var(--fs-sm);
  margin: var(--sp-1) 0 0 0;
}

.track-soon-tag {
  font-size: var(--fs-xs);
  font-weight: 400;
  color: var(--color-gold);
  background: var(--color-gold-bg);
  border: 1px solid var(--color-gold-light);
  padding: 1px 8px;
  border-radius: 10px;
}

.track-draft-text {
  margin: var(--sp-2) 0 0 0;
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  font-style: italic;
  text-align: right;
}

.track-status {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  flex-shrink: 0;
}

.track-count {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
}

.track-arrow {
  color: var(--color-text-light);
  transition: transform var(--dur-fast);
  font-size: var(--fs-sm);
}

.track-arrow.open { transform: rotate(180deg); }

.track-progress-bar {
  margin-top: var(--sp-3);
  height: 4px;
  background: var(--color-bg-warm);
  border-radius: 2px;
  overflow: hidden;
}

.track-progress-fill {
  height: 100%;
  background: var(--color-gold);
  border-radius: 2px;
  transition: width 0.5s ease;
}

.track-lessons {
  overflow: hidden;
  margin-top: var(--sp-4);
  max-height: 0;
  transition: max-height var(--dur-slow) var(--ease-in-out);
}

.track-lessons--open {
  max-height: 4000px;
  margin-top: var(--sp-4);
}

.track-chapter { margin-bottom: var(--sp-3); }

.track-chapter-head {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--sp-1);
  padding-left: var(--sp-1);
}

.track-lesson-item {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  width: 100%;
  padding: var(--sp-2) var(--sp-4);
  background: transparent;
  border-radius: var(--radius-sm);
  text-align: left;
  font-size: var(--fs-sm);
}

.track-lesson-item:hover { background: var(--color-bg-warm); }
.track-lesson-item:active { transform: none; }

.track-lesson-dot {
  width: 20px;
  text-align: center;
  flex-shrink: 0;
  color: var(--color-gold);
  font-weight: 700;
}

.track-lesson-item.completed .track-lesson-dot { color: var(--color-success); }
.track-lesson-title { flex: 1; }
.track-lesson-arrow { color: var(--color-gold); flex-shrink: 0; }

@media (max-width: 640px) {
  .track-card { padding: var(--sp-4); }

  .track-card-header {
    flex-wrap: wrap;
    row-gap: var(--sp-2);
  }

  .track-info { flex: 1; min-width: 0; }

  .track-status {
    flex-basis: 100%;
    margin-left: calc(2.2rem + var(--sp-4));
  }

  .track-icon { font-size: 1.6rem; }
  .track-lesson-item { padding: var(--sp-2) var(--sp-2); }
}
</style>
