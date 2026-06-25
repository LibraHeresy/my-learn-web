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

const router = useRouter()
const progressStore = useProgressStore()

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
    musicAnalogyBody: p.meta.musicAnalogyBody,
    listenTo: p.meta.listenTo,
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
    
    <!-- 词汇复习 -->
    <HomeVocabSection />
    
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
}
</style>
