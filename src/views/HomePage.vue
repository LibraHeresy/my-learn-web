<script setup lang="ts">
import { useRouter } from 'vue-router'
import { chapters, lessons } from '../data/lessons'

const router = useRouter()

function startLearning() {
  const firstLesson = lessons[0]
  router.push(`/lesson/${firstLesson.id}`)
}

function goToLesson(lessonId: string) {
  router.push(`/lesson/${lessonId}`)
}
</script>

<template>
  <div class="home">
    <!-- Hero 区 -->
    <section class="hero">
      <div class="hero-staff">
        <svg class="staff-svg" viewBox="0 0 600 80" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="var(--color-border)" stroke-width="1">
            <line x1="0" y1="10" x2="600" y2="10"/>
            <line x1="0" y1="20" x2="600" y2="20"/>
            <line x1="0" y1="30" x2="600" y2="30"/>
            <line x1="0" y1="40" x2="600" y2="40"/>
            <line x1="0" y1="50" x2="600" y2="50"/>
          </g>
        </svg>
      </div>
      <div class="hero-content">
        <p class="hero-greeting">欢迎来到</p>
        <h1 class="hero-title">代码谱</h1>
        <p class="hero-desc">从五线谱到代码编辑器，从音符到标签，<br>用你熟悉的音乐语言，学会前端开发。</p>
        <button class="btn-start" @click="startLearning">
          <span class="btn-icon">♪</span>
          开始学习
        </button>
      </div>
    </section>

    <!-- 课程介绍 -->
    <section class="course-section">
      <h2 class="section-title">课程大纲</h2>
      <hr class="staff-divider">

      <div
        v-for="chapter in chapters"
        :key="chapter.id"
        class="chapter-card"
      >
        <div class="chapter-header">
          <span class="chapter-icon">{{ chapter.icon }}</span>
          <div>
            <h3 class="chapter-title">{{ chapter.title }}</h3>
            <p class="chapter-subtitle">{{ chapter.subtitle }}</p>
          </div>
        </div>

        <div class="lesson-list">
          <button
            v-for="lesson in lessons.filter(l => l.chapterId === chapter.id)"
            :key="lesson.id"
            class="lesson-item"
            @click="goToLesson(lesson.id)"
          >
            <span class="lesson-order">{{ lesson.order }}</span>
            <div class="lesson-info">
              <span class="lesson-title">{{ lesson.title }}</span>
              <span class="lesson-analogy">{{ lesson.musicAnalogy }}</span>
            </div>
            <span class="lesson-arrow">→</span>
          </button>
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
  max-width: 800px;
  margin: 0 auto;
  padding: var(--sp-8) var(--sp-6);
  overflow-y: auto;
  height: 100%;
}

/* ===== Hero ===== */
.hero {
  text-align: center;
  padding: var(--sp-10) 0 var(--sp-8);
  position: relative;
}

.hero-staff {
  margin-bottom: var(--sp-6);
}

.staff-svg {
  max-width: 400px;
  width: 100%;
  height: 50px;
  animation: staffFadeIn 1.2s ease-out;
}

@keyframes staffFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-greeting {
  font-family: var(--font-heading);
  color: var(--color-text-light);
  font-size: var(--fs-md);
  margin-bottom: var(--sp-2);
}

.hero-title {
  font-size: 3.5rem;
  color: var(--color-accent);
  margin-bottom: var(--sp-4);
  letter-spacing: 0.05em;
  animation: heroReveal 1s ease-out 0.3s both;
}

@keyframes heroReveal {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.hero-desc {
  color: var(--color-text-light);
  font-size: var(--fs-md);
  line-height: 1.8;
  margin-bottom: var(--sp-8);
}

.btn-start {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-8);
  background: var(--color-accent);
  color: #fff;
  font-size: var(--fs-lg);
  font-family: var(--font-heading);
  font-weight: 600;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.btn-start:hover {
  background: var(--color-accent-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.btn-icon {
  font-size: 1.3em;
}

/* ===== 课程大纲 ===== */
.course-section {
  padding: var(--sp-8) 0;
}

.section-title {
  text-align: center;
  margin-bottom: var(--sp-2);
}

.chapter-card {
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--sp-6);
  margin-bottom: var(--sp-6);
}

.chapter-header {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  margin-bottom: var(--sp-4);
  padding-bottom: var(--sp-4);
  border-bottom: 3px double var(--color-border);
}

.chapter-icon {
  font-size: 2rem;
}

.chapter-title {
  margin: 0;
}

.chapter-subtitle {
  color: var(--color-text-light);
  font-size: var(--fs-sm);
  margin-top: var(--sp-1);
}

/* ===== 课程列表 ===== */
.lesson-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.lesson-item {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  width: 100%;
  padding: var(--sp-3) var(--sp-4);
  background: transparent;
  border-radius: var(--radius-sm);
  text-align: left;
}

.lesson-item:hover {
  background: var(--color-bg-warm);
}

.lesson-order {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-bg-warm);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: var(--fs-sm);
  color: var(--color-accent);
  flex-shrink: 0;
}

.lesson-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.lesson-title {
  font-weight: 600;
  color: var(--color-text);
}

.lesson-analogy {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  margin-top: var(--sp-1);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.lesson-arrow {
  color: var(--color-gold);
  font-weight: 700;
  flex-shrink: 0;
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
  .hero {
    padding: var(--sp-6) 0 var(--sp-4);
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-desc {
    font-size: var(--fs-base);
  }

  .btn-start {
    padding: var(--sp-3) var(--sp-6);
    font-size: var(--fs-base);
  }

  .chapter-card {
    padding: var(--sp-4);
  }

  .lesson-analogy {
    display: none;
  }
}
</style>
