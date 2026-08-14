<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { getAllLessons } from '../content-loaders/lessons'
import { getAllProjects } from '../content-loaders/projects'
import { useProgressStore } from '../stores/progress'
import { getChapter } from '../content-loaders/taxonomy'
import { prologueCards } from '../content-loaders/prologues'
import type { HomeProjectCardItem } from '../content-runtime/types'
import HomeJourneySection from '../components/home/HomeJourneySection.vue'
import HomeProjectsSection from '../components/home/HomeProjectsSection.vue'
import HomePrologueSection from '../components/home/HomePrologueSection.vue'
import { getGlossaryTuples } from '../content-loaders/glossary'
import { useQuizStore } from '../stores/quiz'
import { getQuestionsByIds } from '../content-loaders/quiz'

const router = useRouter()
const progressStore = useProgressStore()
const quizStore = useQuizStore()

const showStickyNav = ref(false)
const homeRef = ref<HTMLElement | null>(null)

const lessons = computed(() => getAllLessons())

const projects = computed(() =>
  getAllProjects()
    .slice()
    .sort((a, b) => a.meta.order - b.meta.order),
)

const projectsForSection = computed<HomeProjectCardItem[]>(() =>
  projects.value.map((p) => ({
    id: p.id,
    title: p.meta.title,
    subtitle: p.meta.subtitle,
    icon: p.meta.icon,
    analogyBody: p.meta.analogyBody,
    stepCount: p.stepCount,
  })),
)

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

// 最近访问的课程
const resumeLesson = computed(() => {
  const entries = Object.values(progressStore.lessonProgress)
    .filter((p) => p.lastVisited)
    .sort((a, b) => (b.lastVisited || 0) - (a.lastVisited || 0))
  if (entries.length === 0) return null
  const lastId = entries[0].lessonId
  return lessons.value.find((l) => l.id === lastId) || null
})

const resumeChapter = computed(() => {
  if (!resumeLesson.value) return null
  return getChapter(resumeLesson.value.meta.chapter)
})

function jumpToSection(targetId: string) {
  const sectionMap: Record<string, string> = {
    hero: 'hero-section',
    tracks: 'tracks-section',
    projects: 'projects-section',
    prologue: 'prologue-section',
  }
  const sectionId = sectionMap[targetId] || `track-${targetId}`
  nextTick(() => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  })
}

// 每日 5 词：以日期为随机种子，保证同一天内稳定、隔天更换
const dailyTerms = computed(() => {
  const tuples = getGlossaryTuples()
  if (!tuples.length) return []
  const d = new Date()
  let seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  const shuffled = [...tuples].sort(() => rand() - 0.5)
  return shuffled.slice(0, 5).map(([key, rest]) => ({ key, ...rest }))
})

// ─── 学习数据反馈 ─────────────────────────────────────────────────────────
const completedLessonCount = computed(
  () => Object.values(progressStore.lessonProgress).filter((p) => p.completed).length,
)
const totalLessonCount = computed(() => lessons.value.length)
const lessonProgressPct = computed(() =>
  totalLessonCount.value
    ? Math.round((completedLessonCount.value / totalLessonCount.value) * 100)
    : 0,
)

const wrongReviewItems = ref<Array<{ id: number; question: string }>>([])
async function loadWrongReview() {
  const pool = quizStore.data.wrongPool
  if (!pool.length) return
  const ids = pool.slice(0, 3)
  try {
    const questions = await getQuestionsByIds(ids)
    wrongReviewItems.value = questions
      .map((q) => ({ id: q.id, question: q.question }))
      .slice(0, 3)
  } catch {
    wrongReviewItems.value = []
  }
}
onMounted(loadWrongReview)

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
        <p class="hero-desc">
          从五线谱到代码编辑器，从音符到标签，<br />用你熟悉的音乐语言，一步步成为创作者。
        </p>
      </div>
    </section>

    <!-- 继续学习 -->
    <div v-if="resumeLesson" class="resume-bar">
      <div class="resume-info">
        <span class="resume-icon">📍</span>
        <span class="resume-label">继续学习</span>
        <span v-if="resumeChapter" class="resume-chapter">{{ resumeChapter.icon }} {{ resumeChapter.title }}</span>
      </div>
      <button class="resume-btn" @click="goToLesson(resumeLesson.id)">
        {{ resumeLesson.meta.title }} →
      </button>
    </div>

    <!-- 学习数据反馈 -->
    <section class="stats-panel" id="stats-section">
      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-value">{{ completedLessonCount }}<span class="stat-unit">/{{ totalLessonCount }}</span></span>
          <span class="stat-label">已完成课程</span>
          <div class="stat-bar"><div class="stat-bar-fill" :style="{ width: lessonProgressPct + '%' }" /></div>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ quizStore.overallAccuracy }}<span class="stat-unit">%</span></span>
          <span class="stat-label">测验正确率</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ quizStore.wrongCount }}</span>
          <span class="stat-label">错题待复习</span>
        </div>
      </div>
      <div v-if="wrongReviewItems.length" class="review-list">
        <span class="review-title">📌 建议复习（来自你的错题池）：</span>
        <button
          v-for="item in wrongReviewItems"
          :key="item.id"
          class="review-item"
          @click="router.push('/quiz')"
        >
          {{ item.question }}
        </button>
      </div>
    </section>

    <!-- 粘性迷你导航 -->
    <nav :class="['sticky-nav', { visible: showStickyNav }]">
      <button class="sticky-nav-item" @click="jumpToSection('hero')">
        <span class="sticky-nav-icon">🎵</span>
        <span class="sticky-nav-label">首页</span>
      </button>
      <button class="sticky-nav-item" @click="jumpToSection('tracks')">
        <span class="sticky-nav-icon">🎼</span>
        <span class="sticky-nav-label">成长路径</span>
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
    <HomeJourneySection
      :lessons="lessons"
      :projects="projects"
      @go-to-lesson="goToLesson"
      @go-to-project="goToProject"
    />

    <!-- 作品集 -->
    <HomeProjectsSection
      :projects="projectsForSection"
      @go-to-project="goToProject"
    />

    <!-- 筚路蓝缕 -->
    <HomePrologueSection
      :cards="prologueCards"
      @go-to-lesson="goToLesson"
    />

    <!-- 每日 5 词 -->
    <section v-if="dailyTerms.length" class="daily-terms" id="daily-terms-section">
      <h2 class="daily-terms-title">📅 每日 5 词</h2>
      <p class="daily-terms-sub">每天 5 个前端术语，扫一眼就多记住一点</p>
      <div class="daily-terms-grid">
        <div v-for="t in dailyTerms" :key="t.key" class="term-card">
          <span class="term-card-key">{{ t.key }}</span>
          <span class="term-card-explain">{{ t.explanation }}</span>
          <span v-if="t.analogy" class="term-card-analogy">🎵 {{ t.analogy }}</span>
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

/* ===== 继续学习 ===== */
.resume-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-4);
  padding: var(--sp-4) var(--sp-5);
  margin: var(--sp-2) auto 0;
  background: linear-gradient(135deg, var(--color-gold-bg), var(--color-accent-bg));
  border: 1px solid var(--color-gold-light);
  border-radius: var(--radius-md);
  max-width: 600px;
}

.resume-info {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  min-width: 0;
}

.resume-icon { font-size: 1.1rem; flex-shrink: 0; }

.resume-label {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--color-accent);
  flex-shrink: 0;
}

.resume-chapter {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.resume-btn {
  padding: var(--sp-2) var(--sp-4);
  background: var(--color-accent);
  color: #fff;
  font-size: var(--fs-sm);
  font-weight: 600;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  transition: background var(--dur-fast), transform var(--dur-fast);
}

.resume-btn:hover {
  background: var(--color-accent-light);
  transform: translateY(-1px);
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
  box-shadow: 0 0 0 rgba(61, 43, 31, 0);
  transform: translateY(-100%);
  opacity: 0;
  transition:
    transform 0.3s var(--ease-out),
    opacity 0.3s var(--ease-out),
    box-shadow 0.3s var(--ease-out);
  pointer-events: none;
}

.sticky-nav.visible {
  transform: translateY(0);
  opacity: 1;
  box-shadow: 0 2px 16px rgba(61, 43, 31, 0.08);
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
  transition: background var(--dur-fast), color var(--dur-fast);
}

.sticky-nav-item:hover {
  background: var(--color-bg-warm);
  color: var(--color-accent);
}

/* ===== Footer ===== */
.home-footer {
  text-align: center;
  padding: var(--sp-8) 0;
  color: var(--color-text-light);
  font-size: var(--fs-sm);
}

/* ===== 响应式 ===== */
@media (max-width: 640px) {
  .home { padding: var(--sp-4) var(--sp-4); }

  .hero { padding: var(--sp-4) 0 var(--sp-2); }
  .hero-title { font-size: 2.5rem; }
  .hero-desc { font-size: var(--fs-base); padding: 0 var(--sp-2); }

  .sticky-nav {
    gap: 2px;
    padding: var(--sp-1) var(--sp-2);
    justify-content: center;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .sticky-nav::-webkit-scrollbar { display: none; }

  .sticky-nav-item {
    padding: 6px 8px;
    font-size: 0.7rem;
    flex-shrink: 0;
  }

  .sticky-nav-label { display: none; }
  .sticky-nav-icon { font-size: 1.2em; }

  .resume-bar {
    flex-direction: column;
    align-items: stretch;
    gap: var(--sp-3);
    padding: var(--sp-3) var(--sp-4);
  }

  .resume-info {
    flex-wrap: wrap;
  }

  .resume-btn {
    width: 100%;
    text-align: center;
    white-space: normal;
    line-height: 1.5;
  }
}

/* ─── 学习数据反馈 ─── */
.stats-panel {
  margin: var(--sp-4) 0;
  padding: var(--sp-4);
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
}

.stats-row {
  display: flex;
  gap: var(--sp-4);
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 110px;
}

.stat-value {
  font-size: var(--fs-lg);
  font-weight: 700;
  color: var(--color-accent);
}

.stat-unit {
  font-size: var(--fs-xs);
  font-weight: 400;
  color: var(--color-text-light);
}

.stat-label {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
}

.stat-bar {
  margin-top: 4px;
  height: 6px;
  width: 100%;
  max-width: 220px;
  background: var(--color-border-light);
  border-radius: 3px;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  background: var(--color-gold);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.review-list {
  margin-top: var(--sp-3);
  padding-top: var(--sp-3);
  border-top: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.review-title {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-text-light);
}

.review-item {
  text-align: left;
  font-size: var(--fs-xs);
  line-height: 1.5;
  color: var(--color-accent);
  background: rgba(201, 169, 110, 0.06);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  padding: var(--sp-2) var(--sp-3);
  cursor: pointer;
  transition: background var(--transition);
}

.review-item:hover {
  background: rgba(201, 169, 110, 0.14);
}

/* ─── 每日 5 词 ─── */
.daily-terms {
  padding: var(--sp-5) var(--sp-4);
}

.daily-terms-title {
  font-size: var(--fs-lg);
  color: var(--color-text);
  margin: 0 0 var(--sp-1);
}

.daily-terms-sub {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  margin: 0 0 var(--sp-4);
}

.daily-terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--sp-3);
}

.term-card {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  padding: var(--sp-3);
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
}

.term-card-key {
  font-size: var(--fs-sm);
  font-weight: 700;
  color: var(--color-accent);
  font-family: var(--font-code);
}

.term-card-explain {
  font-size: var(--fs-xs);
  line-height: 1.6;
  color: var(--color-text-light);
}

.term-card-analogy {
  font-size: var(--fs-xs);
  line-height: 1.5;
  color: var(--color-gold);
  font-style: italic;
}

@media (max-width: 640px) {
  .daily-terms-grid {
    grid-template-columns: 1fr;
  }
}
</style>
