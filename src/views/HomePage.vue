<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { chapters, lessons } from '../data/lessons'
import { tracks } from '../data/tracks'
import { projects } from '../data/projects'
import { useProgressStore } from '../stores/progress'
import { parseInline } from '../utils/markdown'
import { prologueCards } from '../data/prologues'

const router = useRouter()
const progressStore = useProgressStore()

const expandedTrack = ref<string | null>(null)
const showStickyNav = ref(false)
const homeRef = ref<HTMLElement | null>(null)

function onScroll() {
  const el = homeRef.value
  if (!el) return
  const hero = document.getElementById('hero-section')
  showStickyNav.value = hero ? el.scrollTop > hero.offsetHeight * 0.6 : el.scrollTop > 300
}

onMounted(() => {
  if (homeRef.value) homeRef.value.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  if (homeRef.value) homeRef.value.removeEventListener('scroll', onScroll)
})

function getTrackLessonCount(trackId: string): number {
  if (trackId === 'projects') return projects.length
  return lessons.filter(l => (l.trackId || 'fundamentals') === trackId).length
}

function getTrackCompletedCount(trackId: string): number {
  if (trackId === 'projects') return 0
  return lessons
    .filter(l => (l.trackId || 'fundamentals') === trackId)
    .filter(l => progressStore.isCompleted(l.id)).length
}

function getTrackChapters(trackId: string) {
  return chapters.filter(ch =>
    lessons.some(l => l.chapterId === ch.id && (l.trackId || 'fundamentals') === trackId)
  )
}

function toggleTrack(trackId: string) {
  const isExpanding = expandedTrack.value !== trackId
  expandedTrack.value = isExpanding ? trackId : null
  if (isExpanding) {
    nextTick(() => {
      const el = document.getElementById(`track-${trackId}`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
}

function jumpToSection(targetId: string) {
  expandedTrack.value = null
  if (targetId === 'hero') {
    nextTick(() => {
      document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' })
    })
    return
  }
  if (targetId === 'projects') {
    nextTick(() => {
      document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })
    })
    return
  }
  if (targetId === 'prologue') {
    nextTick(() => {
      document.getElementById('prologue-section')?.scrollIntoView({ behavior: 'smooth' })
    })
    return
  }
  // 轨道卡片：展开 + 滚动
  expandedTrack.value = targetId
  nextTick(() => {
    document.getElementById(`track-${targetId}`)?.scrollIntoView({ behavior: 'smooth' })
  })
}

function goToLesson(lessonId: string) {
  router.push(`/lesson/${lessonId}`)
}

function goToProject(projectId: string) {
  router.push(`/project/${projectId}`)
}
</script>

<template>
  <div ref="homeRef" class="home">
    <!-- Hero 区 -->
    <section id="hero-section" class="hero">
      <div class="hero-content">
        <p class="hero-greeting">你的学习之旅</p>
        <h1 class="hero-title">代码乐章</h1>
        <p class="hero-desc">从五线谱到代码编辑器，从音符到标签，<br>用你熟悉的音乐语言，一步步成为创作者。</p>
      </div>
    </section>

    <!-- 粘性迷你导航 -->
    <nav :class="['sticky-nav', { visible: showStickyNav }]">
      <button class="sticky-nav-item" @click="jumpToSection('hero')">
        <span class="sticky-nav-icon">🎵</span>
        <span class="sticky-nav-label">首页</span>
      </button>
      <button
        v-for="track in tracks"
        :key="track.id"
        class="sticky-nav-item"
        @click="jumpToSection(track.id)"
      >
        <span class="sticky-nav-icon">{{ track.icon }}</span>
        <span class="sticky-nav-label">{{ track.title }}</span>
      </button>
      <button class="sticky-nav-item" @click="jumpToSection('projects')">
        <span class="sticky-nav-icon">🎁</span>
        <span class="sticky-nav-label">作品集</span>
      </button>
      <button class="sticky-nav-item" @click="jumpToSection('prologue')">
        <span class="sticky-nav-icon">🏮</span>
        <span class="sticky-nav-label">筚路蓝缕</span>
      </button>
    </nav>

    <!-- 四轨旅程 -->
    <section class="journey-section">
      <h2 class="section-title">🎼 成长路径</h2>
      <hr class="staff-divider">
      <p class="section-intro">四条路径，四重境界——从识谱到演奏，从独奏到指挥，一步步成为现代前端开发者。</p>

      <div class="track-cards">
        <div
          v-for="track in tracks"
          :key="track.id"
          :id="`track-${track.id}`"
          :class="['track-card', {
            expanded: expandedTrack === track.id,
            draft: getTrackLessonCount(track.id) === 0
          }]"
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
                <span
                  class="track-arrow"
                  :class="{ open: expandedTrack === track.id }"
                >▾</span>
              </template>
            </div>
          </div>

          <!-- 进度条 -->
          <div v-if="getTrackLessonCount(track.id) > 0" class="track-progress-bar">
            <div
              class="track-progress-fill"
              :style="{
                width: getTrackLessonCount(track.id)
                  ? (getTrackCompletedCount(track.id) / getTrackLessonCount(track.id) * 100) + '%'
                  : '0%'
              }"
            />
          </div>

          <p v-if="getTrackLessonCount(track.id) === 0" class="track-draft-text">内容制作中，敬请期待</p>

          <!-- 展开的课程列表 -->
          <div v-if="expandedTrack === track.id && track.id !== 'projects'" class="track-lessons">
            <div v-for="chapter in getTrackChapters(track.id)" :key="chapter.id" class="track-chapter">
              <div class="track-chapter-head">
                <span>{{ chapter.icon }}</span>
                <span>{{ chapter.title }}</span>
              </div>
              <button
                v-for="lesson in lessons.filter(l => l.chapterId === chapter.id && (l.trackId || 'fundamentals') === track.id)"
                :key="lesson.id"
                :class="['track-lesson-item', { completed: progressStore.isCompleted(lesson.id) }]"
                @click.stop="goToLesson(lesson.id)"
              >
                <span class="track-lesson-dot">{{ progressStore.isCompleted(lesson.id) ? '✓' : '·' }}</span>
                <span class="track-lesson-title">{{ lesson.title }}</span>
                <span class="track-lesson-arrow">→</span>
              </button>
            </div>
          </div>

          <!-- 作品集轨道展开：显示项目列表 -->
          <div v-if="expandedTrack === track.id && track.id === 'projects'" class="track-lessons">
            <button
              v-for="project in projects"
              :key="project.id"
              class="track-lesson-item"
              @click.stop="goToProject(project.id)"
            >
              <span class="track-lesson-dot">·</span>
              <span class="track-lesson-title">{{ project.icon }} {{ project.title }}</span>
              <span class="track-lesson-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 作品集 -->
    <section id="projects-section" class="projects-section">
      <h2 class="section-title">🎁 作品集</h2>
      <hr class="staff-divider">
      <p class="projects-intro">每个阶段结束，你都会完成一个音乐收藏库的新版本——从手稿到乐团，一步步见证成长。</p>

      <div class="project-cards">
        <div
          v-for="project in projects"
          :key="project.id"
          :class="['project-card', { draft: project.steps.length === 0 }]"
        >
          <div class="project-card-header">
            <span class="project-icon">{{ project.icon }}</span>
            <div class="project-info">
              <h3 class="project-title">
                {{ project.title }}
                <span v-if="project.steps.length === 0" class="project-soon-tag">即将推出</span>
              </h3>
              <p class="project-subtitle">{{ project.subtitle }}</p>
            </div>
          </div>

          <p class="project-analogy" v-html="parseInline(project.musicAnalogy)"></p>

          <div class="project-meta">
            <span v-if="project.steps.length > 0" class="project-steps">{{ project.steps.length }} 个步骤</span>
            <span v-if="project.listenTo" class="project-listen">🎧 {{ project.listenTo }}</span>
          </div>

          <div class="project-actions">
            <button
              v-if="project.steps.length > 0"
              class="btn-project-start"
              @click="goToProject(project.id)"
            >
              开始项目
            </button>
            <span v-else class="project-soon-text">内容制作中，敬请期待</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 📜 筚路蓝缕 -->
    <section id="prologue-section" class="prologue-section">
      <h2 class="section-title">🏮 筚路蓝缕</h2>
      <hr class="staff-divider">
      <p class="section-intro">从 1989 年日内瓦的一间办公室，到 2026 年的 AI 协作——回望 Web 三十六年筚路蓝缕。</p>
      <div class="prologue-grid">
        <div
          v-for="card in prologueCards"
          :key="card.id"
          class="prologue-card"
          @click="goToLesson(card.lessonId)"
        >
          <div class="prologue-card-thumb" v-html="card.thumbnailSvg"></div>
          <div class="prologue-card-body">
            <h3 class="prologue-card-title">{{ card.title }}</h3>
            <p class="prologue-card-subtitle">{{ card.subtitle }}</p>
            <p class="prologue-card-tagline">{{ card.tagline }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="home-footer">
      <p>用音乐的思维学代码，你会发现它们其实很像。</p>
    </footer>
  </div>
</template>

<style scoped>
.home {
  max-width: 860px;
  margin: 0 auto;
  padding: var(--sp-8) var(--sp-6);
  overflow-y: auto;
  height: 100%;
}

/* ===== Hero ===== */
.hero {
  text-align: center;
  padding: var(--sp-6) 0 var(--sp-4);
  position: relative;
}

@keyframes staffFadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-greeting {
  font-family: var(--font-heading);
  color: var(--color-text-light);
  font-size: var(--fs-md);
  margin-bottom: var(--sp-1);
}

.hero-title {
  font-size: 3.2rem;
  color: var(--color-accent);
  margin-bottom: var(--sp-3);
  letter-spacing: 0.05em;
  animation: heroReveal 1s ease-out 0.3s both;
}

@keyframes heroReveal {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.hero-desc {
  color: var(--color-text-light);
  font-size: var(--fs-md);
  line-height: 1.8;
}

/* ===== 粘性迷你导航 ===== */
.sticky-nav {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  gap: var(--sp-1);
  padding: var(--sp-1) var(--sp-4);
  background: var(--color-panel);
  border-bottom: 1px solid var(--color-border-light);
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.06);
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  pointer-events: none;
}

.sticky-nav.visible {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.sticky-nav-item {
  padding: var(--sp-1) var(--sp-3);
  background: transparent;
  font-size: var(--fs-xs);
  font-weight: 500;
  color: var(--color-text-light);
  border-radius: var(--radius-sm);
  white-space: nowrap;
  transition: all 0.15s;
}

.sticky-nav-item:hover {
  background: var(--color-bg-warm);
  color: var(--color-accent);
}

/* ===== 分段标题 ===== */
.journey-section,
.projects-section {
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

/* ===== 轨道卡片 ===== */
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
  transition: all 0.2s;
  cursor: pointer;
  scroll-margin-top: var(--header-height);
}

.track-card.draft {
  cursor: default;
  opacity: 0.6;
}

.track-card:not(.draft):hover {
  border-color: var(--color-gold);
  box-shadow: 0 2px 12px rgba(201, 169, 110, 0.12);
}

.track-card-header {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
}

.track-icon {
  font-size: 2.2rem;
  flex-shrink: 0;
}

.track-info {
  flex: 1;
}

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
  background: #FFF8EC;
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
  transition: transform 0.2s;
  font-size: var(--fs-sm);
}

.track-arrow.open {
  transform: rotate(180deg);
}

/* 进度条 */
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

/* ===== 展开的课程列表 ===== */
.track-lessons {
  margin-top: var(--sp-4);
  border-top: 1px solid var(--color-border-light);
  padding-top: var(--sp-4);
}

.track-chapter {
  margin-bottom: var(--sp-3);
}

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

.track-lesson-item:hover {
  background: var(--color-bg-warm);
}

.track-lesson-dot {
  width: 20px;
  text-align: center;
  flex-shrink: 0;
  color: var(--color-gold);
  font-weight: 700;
}

.track-lesson-item.completed .track-lesson-dot {
  color: var(--color-success);
}

.track-lesson-title {
  flex: 1;
}

.track-lesson-arrow {
  color: var(--color-gold);
  flex-shrink: 0;
}

/* ===== 作品集 ===== */
.section-intro,
.projects-intro {
  text-align: center;
  color: var(--color-text-light);
  font-size: var(--fs-sm);
  margin-bottom: var(--sp-5);
  line-height: 1.6;
}

.project-cards {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.project-card {
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-left: 3px solid var(--color-gold);
  border-radius: var(--radius-lg);
  padding: var(--sp-5);
  transition: all 0.2s;
}

.project-card.draft {
  border-left-color: var(--color-border);
  opacity: 0.7;
}

.project-card-header {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  margin-bottom: var(--sp-2);
}

.project-icon {
  font-size: 1.6rem;
  flex-shrink: 0;
}

.project-info {
  flex: 1;
}

.project-title {
  margin: 0;
  font-size: var(--fs-base);
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

.project-subtitle {
  color: var(--color-text-light);
  font-size: var(--fs-sm);
  margin: var(--sp-1) 0 0 0;
}

.project-soon-tag {
  font-size: var(--fs-xs);
  font-weight: 400;
  color: var(--color-gold);
  background: #FFF8EC;
  border: 1px solid var(--color-gold-light);
  padding: 1px 8px;
  border-radius: 10px;
}

.project-analogy {
  font-size: var(--fs-sm);
  color: var(--color-text-light);
  line-height: 1.6;
  margin: var(--sp-3) 0;
}

.project-meta {
  display: flex;
  gap: var(--sp-4);
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  margin-bottom: var(--sp-3);
}

.project-steps {
  background: var(--color-bg-warm);
  padding: 2px 10px;
  border-radius: 12px;
  flex-shrink: 0;
  height: min-content;
  width: max-content;
}

.project-listen {
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-project-start {
  padding: var(--sp-2) var(--sp-6);
  background: var(--color-accent);
  color: #fff;
  font-size: var(--fs-sm);
  font-weight: 600;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.btn-project-start:hover {
  background: var(--color-accent-light);
  transform: translateY(-1px);
}

.project-soon-text {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  font-style: italic;
}

/* ===== Footer ===== */
.home-footer {
  text-align: center;
  padding: var(--sp-8) 0;
  color: var(--color-text-light);
  font-size: var(--fs-sm);
}

/* ===== 筚路蓝缕 ===== */
.prologue-section {
  padding: var(--sp-8) 0 var(--sp-6);
  scroll-margin-top: 28px;
}

.prologue-title {
  font-size: var(--fs-xl);
  color: var(--color-accent);
  text-align: center;
  margin-bottom: var(--sp-1);
  font-family: var(--font-heading);
}

.prologue-meta {
  text-align: center;
  color: var(--color-text-light);
  font-size: var(--fs-xs);
  margin-bottom: var(--sp-6);
  letter-spacing: 0.05em;
}

.prologue-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sp-4);
  margin-bottom: var(--sp-6);
}

.prologue-card {
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.prologue-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(139, 46, 46, 0.12);
}

.prologue-card-thumb {
  line-height: 0;
}

.prologue-card-thumb :deep(svg) {
  display: block;
  width: 100%;
}

.prologue-card-body {
  padding: var(--sp-4) var(--sp-4) var(--sp-4);
}

.prologue-card-title {
  font-size: var(--fs-base);
  color: var(--color-accent);
  margin-bottom: var(--sp-1);
  font-family: var(--font-heading);
}

.prologue-card-subtitle {
  font-size: var(--fs-xs);
  color: #A0522D;
  margin-bottom: var(--sp-2);
}

.prologue-card-tagline {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  line-height: 1.5;
  font-style: italic;
}

.prologue-credit {
  text-align: center;
  font-size: var(--fs-sm);
  color: #C9A96E;
  font-family: var(--font-heading);
  padding: var(--sp-6) 0 0;
  border-top: 1px solid #E8DDCC;
  opacity: 0.7;
}

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .prologue-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .home {
    padding: var(--sp-4) var(--sp-4);
  }

  .hero {
    padding: var(--sp-4) 0 var(--sp-2);
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-desc {
    font-size: var(--fs-base);
    padding: 0 var(--sp-2);
  }

  .track-card {
    padding: var(--sp-4);
  }

  .track-icon {
    font-size: 1.6rem;
  }

  .track-lesson-item {
    padding: var(--sp-2) var(--sp-2);
  }

  .project-card {
    padding: var(--sp-4);
  }

  .project-meta {
    flex-direction: column;
    gap: var(--sp-1);
  }

  .sticky-nav {
    gap: 2px;
    padding: var(--sp-1) var(--sp-2);
    justify-content: center;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .sticky-nav::-webkit-scrollbar {
    display: none;
  }

  .sticky-nav-item {
    padding: 6px 8px;
    font-size: 0.7rem;
    flex-shrink: 0;
  }

  .sticky-nav-label {
    display: none;
  }

  .sticky-nav-icon {
    font-size: 1.2em;
  }

  .prologue-grid {
    grid-template-columns: 1fr;
  }
}
</style>
