<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePlanStore } from '../stores/plan'
import type { PlanTask, PlanWeek } from '../features/plan/types'

const router = useRouter()
const store = usePlanStore()

const taskTypeIcon: Record<string, string> = {
  lesson: '📖',
  project: '🛠️',
  quiz: '📝',
  review: '🔄',
}

const statusLabel: Record<string, string> = {
  '已点亮': '已完成',
  '进行中': '进行中',
  '推荐下一步': '推荐',
  '可回补': '可回补',
  '未开始': '未开始',
}

const phaseStatusText: Record<string, string> = {
  '未开始': '未开始',
  '进行中': '进行中',
  '已完成': '已完成',
  '推荐下一步': '即将开始',
}

function isWeekCompleted(week: PlanWeek): boolean {
  return week.days.every(d => d.tasks.every(t => store.isTaskCompleted(t)))
}

function weekDotClass(week: PlanWeek): string {
  if (week.weekNumber === store.currentWeek.weekNumber) return 'week-dot--active'
  if (isWeekCompleted(week)) return 'week-dot--done'
  return ''
}

function selectPhase(startWeek: number) {
  store.setWeek(startWeek)
}

function prevWeek() {
  if (store.currentWeek.weekNumber > 1) {
    store.setWeek(store.currentWeek.weekNumber - 1)
  }
}

function nextWeek() {
  if (store.currentWeek.weekNumber < 12) {
    store.setWeek(store.currentWeek.weekNumber + 1)
  }
}

function selectWeek(weekNumber: number) {
  store.setWeek(weekNumber)
}

function selectDay(dayOrder: number) {
  store.setDay(dayOrder)
}

function selectBackfillDay(dayOrder: number) {
  store.setDay(dayOrder)
}

function navigateToTask(task: PlanTask) {
  if (task.type === 'review') {
    store.toggleManualTask(task.id)
    return
  }
  if (task.type === 'lesson' && task.targetId) {
    router.push(`/lesson/${task.targetId}`)
  } else if (task.type === 'project' && task.targetId) {
    router.push(`/project/${task.targetId}`)
  } else if (task.type === 'quiz') {
    router.push('/quiz')
  }
}
</script>

<template>
  <div class="plan-page">
    <!-- 阶段总览 -->
    <section class="phase-section">
      <h2 class="section-title">学习阶段</h2>
      <div class="phase-cards">
        <button
          v-for="(phase, idx) in store.phaseCards"
          :key="phase.id"
          :class="['phase-card', `phase-card--${phase.status}`]"
          :style="{ animationDelay: `${idx * 0.08}s` }"
          @click="selectPhase(phase.startWeek)"
        >
          <span class="phase-dot">
            <template v-if="phase.status === '已完成'">✓</template>
            <template v-else-if="phase.status === '进行中'">●</template>
            <template v-else>○</template>
          </span>
          <span class="phase-title">{{ phase.title }}</span>
          <span class="phase-weeks">第{{ phase.startWeek }}-{{ phase.endWeek }}周</span>
          <span class="phase-status">{{ phaseStatusText[phase.status] }}</span>
        </button>
      </div>
    </section>

    <!-- 周选择器 -->
    <section class="week-section">
      <div class="week-nav">
        <button
          class="week-arrow"
          :disabled="store.currentWeek.weekNumber <= 1"
          @click="prevWeek"
          aria-label="上一周"
        >◀</button>
        <div class="week-dots">
          <button
            v-for="week in store.weeks"
            :key="week.id"
            :class="['week-dot', weekDotClass(week)]"
            :title="`第${week.weekNumber}周：${week.title}`"
            @click="selectWeek(week.weekNumber)"
          >{{ week.weekNumber }}</button>
        </div>
        <button
          class="week-arrow"
          :disabled="store.currentWeek.weekNumber >= 12"
          @click="nextWeek"
          aria-label="下一周"
        >▶</button>
      </div>

      <div class="week-info">
        <span class="week-phase-tag">{{ store.currentPhase.title }}</span>
        <h2 class="week-title">第{{ store.currentWeek.weekNumber }}周：{{ store.currentWeek.title }}</h2>
        <p class="week-summary">{{ store.currentWeek.summary }}</p>
        <div class="week-meta">
          <span class="week-meta-item">
            <span class="week-meta-value">{{ store.weekCompletedDays }}</span>
            <span class="week-meta-label">/{{ store.currentWeek.days.length }} 天完成</span>
          </span>
          <span class="meta-divider"></span>
          <span class="week-meta-item">
            <span class="week-meta-label">预计 </span>
            <span class="week-meta-value">{{ store.currentWeekTotalMinutes }}</span>
            <span class="week-meta-label"> 分钟</span>
          </span>
          <template v-if="store.currentWeek.milestone">
            <span class="meta-divider"></span>
            <span class="week-meta-item week-milestone">🎯 {{ store.currentWeek.milestone }}</span>
          </template>
        </div>
      </div>
    </section>

    <!-- 日标签 -->
    <nav class="day-tabs">
      <button
        v-for="day in store.currentWeek.days"
        :key="day.id"
        :class="['day-tab', {
          'day-tab--active': day.order === store.currentDay.order,
          'day-tab--done': day.tasks.every(t => store.isTaskCompleted(t)),
          'day-tab--backfill': day.order < store.currentDay.order && !day.tasks.every(t => store.isTaskCompleted(t))
        }]"
        @click="selectDay(day.order)"
      >
        <span class="day-label">Day {{ day.order }}</span>
        <span class="day-name">{{ day.title }}</span>
        <span class="day-indicator">
          <span v-if="day.tasks.every(t => store.isTaskCompleted(t))" class="day-check">✓</span>
          <span v-else-if="day.order < store.currentDay.order && !day.tasks.every(t => store.isTaskCompleted(t))" class="day-warn-dot"></span>
        </span>
      </button>
    </nav>

    <!-- 任务列表 -->
    <section class="task-section">
      <div class="day-header">
        <span class="day-theme">{{ store.currentDay.theme }}</span>
        <span class="day-time">⏱ {{ store.currentDay.estimatedMinutes }} 分钟</span>
      </div>
      <ul class="task-list">
        <li v-for="(task, idx) in store.currentDay.tasks" :key="task.id">
          <button
            :class="['task-card', `task-card--${store.getTaskStatus(task)}`]"
            :style="{ animationDelay: `${idx * 0.06}s` }"
            @click="navigateToTask(task)"
          >
            <div class="task-top">
              <span class="task-type-icon">{{ taskTypeIcon[task.type] }}</span>
              <div class="task-main">
                <div class="task-title-row">
                  <span class="task-title">{{ task.title }}</span>
                  <span :class="['task-badge', `task-badge--${store.getTaskStatus(task)}`]">
                    {{ statusLabel[store.getTaskStatus(task)] }}
                  </span>
                </div>
                <p class="task-summary">{{ task.summary }}</p>
              </div>
            </div>
            <div class="task-meta">
              <span class="task-time">⏱ {{ task.estimatedMinutes }} 分钟</span>
              <span class="task-reward">🏆 {{ task.reward }}</span>
            </div>
          </button>
        </li>
      </ul>
    </section>

    <!-- 待回补 -->
    <section v-if="store.backfillDays.length" class="backfill-section">
      <h3 class="backfill-heading">待回补</h3>
      <p class="backfill-hint">本周较早的天数中还有未完成的任务，点击跳转查看</p>
      <div class="backfill-list">
        <button
          v-for="day in store.backfillDays"
          :key="day.id"
          class="backfill-card"
          @click="selectBackfillDay(day.order)"
        >
          <span class="backfill-label">Day {{ day.order }}：{{ day.title }}</span>
          <span class="backfill-badge">{{ day.remainingTasks.length }} 项</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.plan-page {
  height: 100%;
  overflow-y: auto;
  max-width: 860px;
  margin: 0 auto;
  padding: var(--sp-8) var(--sp-4) var(--sp-12);
}

/* ===== 阶段总览 ===== */
.phase-section {
  margin-bottom: var(--sp-8);
}

.section-title {
  font-family: var(--font-heading);
  font-size: var(--fs-xl);
  color: var(--color-text);
  margin: 0 0 var(--sp-4);
}

.phase-cards {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--sp-3);
}

.phase-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-1);
  padding: var(--sp-4) var(--sp-2);
  background: var(--color-panel);
  border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
  animation: reveal-up var(--dur-reveal) var(--ease-out) both;
  font-family: inherit;
  color: inherit;
  text-align: center;
  -webkit-appearance: none;
}

.phase-card:hover {
  transform: translateY(var(--lift-md));
  border-color: var(--color-gold);
  box-shadow: var(--shadow-gold);
}

.phase-card:active {
  transform: scale(0.97);
}

.phase-card--已完成 {
  background: var(--color-success-light);
  border-color: var(--color-success);
}

.phase-card--进行中 {
  border-color: var(--color-gold);
  box-shadow: var(--shadow-gold);
}

.phase-dot {
  font-size: var(--fs-lg);
  line-height: 1;
}

.phase-card--已完成 .phase-dot {
  color: var(--color-success);
}

.phase-card--进行中 .phase-dot {
  color: var(--color-gold);
}

.phase-title {
  font-size: var(--fs-sm);
  font-weight: 600;
  line-height: 1.3;
}

.phase-weeks {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
}

.phase-status {
  font-size: var(--fs-xs);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  background: var(--color-bg-warm);
}

.phase-card--已完成 .phase-status {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.phase-card--进行中 .phase-status {
  background: var(--color-gold-bg);
  color: var(--color-gold);
}

/* ===== 周选择器 ===== */
.week-section {
  margin-bottom: var(--sp-6);
  padding: var(--sp-6);
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
}

.week-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-4);
  margin-bottom: var(--sp-5);
}

.week-arrow {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-bg);
  cursor: pointer;
  font-size: var(--fs-sm);
  color: var(--color-text);
  transition: all var(--dur-fast) var(--ease-out);
  font-family: inherit;
  -webkit-appearance: none;
}

.week-arrow:hover:not(:disabled) {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.week-arrow:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

.week-dots {
  display: flex;
  gap: var(--sp-2);
}

.week-dot {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-full);
  background: var(--color-bg);
  cursor: pointer;
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-text-light);
  transition: all var(--dur-fast) var(--ease-out);
  font-family: inherit;
  -webkit-appearance: none;
}

.week-dot:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.week-dot--active {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: #fff;
}

.week-dot--done {
  background: var(--color-success);
  border-color: var(--color-success);
  color: #fff;
}

.week-info {
  text-align: center;
}

.week-phase-tag {
  display: inline-block;
  font-size: var(--fs-xs);
  color: var(--color-gold);
  background: var(--color-gold-bg);
  padding: 2px 10px;
  border-radius: var(--radius-pill);
  margin-bottom: var(--sp-2);
}

.week-title {
  font-family: var(--font-heading);
  font-size: var(--fs-lg);
  color: var(--color-text);
  margin: 0 0 var(--sp-2);
}

.week-summary {
  font-size: var(--fs-sm);
  color: var(--color-text-light);
  margin: 0 0 var(--sp-3);
  line-height: 1.6;
}

.week-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-3);
  font-size: var(--fs-sm);
  color: var(--color-text-light);
}

.week-meta-value {
  font-weight: 600;
  color: var(--color-text);
}

.meta-divider {
  width: 4px;
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--color-border);
}

.week-milestone {
  color: var(--color-accent);
}

/* ===== 日标签 ===== */
.day-tabs {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--sp-2);
  margin-bottom: var(--sp-6);
}

.day-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: var(--sp-3) var(--sp-2);
  background: var(--color-panel);
  border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--dur-fast) var(--ease-out);
  font-family: inherit;
  color: inherit;
  -webkit-appearance: none;
}

.day-tab:hover {
  border-color: var(--color-gold);
}

.day-tab--active {
  background: var(--color-gold-bg);
  border-color: var(--color-gold);
}

.day-tab--done {
  background: var(--color-success-light);
  border-color: var(--color-success);
}

.day-tab--backfill {
  border-color: #e6a817;
}

.day-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-text-light);
}

.day-tab--active .day-label {
  color: var(--color-gold);
}

.day-name {
  font-size: var(--fs-sm);
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
}

.day-indicator {
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.day-check {
  color: var(--color-success);
  font-size: var(--fs-xs);
  font-weight: 700;
}

.day-warn-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: #e6a817;
}

/* ===== 任务列表 ===== */
.task-section {
  margin-bottom: var(--sp-8);
}

.day-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sp-4);
}

.day-theme {
  font-family: var(--font-heading);
  font-size: var(--fs-md);
  color: var(--color-text);
}

.day-time {
  font-size: var(--fs-sm);
  color: var(--color-text-light);
}

.task-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.task-card {
  width: 100%;
  padding: var(--sp-4) var(--sp-5);
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-left: 4px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
  animation: reveal-up var(--dur-reveal) var(--ease-out) both;
  text-align: left;
  font-family: inherit;
  color: inherit;
  -webkit-appearance: none;
}

.task-card:hover {
  transform: translateY(var(--lift-sm));
  box-shadow: var(--shadow-md);
}

.task-card:active {
  transform: scale(0.99);
}

/* 已点亮 */
.task-card--已点亮 {
  border-left-color: var(--color-success);
  background: var(--color-success-light);
}

.task-card--已点亮 .task-title {
  color: var(--color-text-light);
}

/* 推荐下一步 */
.task-card--推荐下一步 {
  border-left-color: var(--color-gold);
  box-shadow: var(--shadow-gold);
}

.task-card--推荐下一步 .task-badge {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* 进行中 */
.task-card--进行中 {
  border-left-color: #5b9ecf;
}

/* 可回补 */
.task-card--可回补 {
  border-left-color: #e6a817;
}

/* 未开始 */
.task-card--未开始 {
  opacity: 0.75;
}

.task-top {
  display: flex;
  gap: var(--sp-3);
}

.task-type-icon {
  font-size: var(--fs-lg);
  flex-shrink: 0;
  margin-top: 2px;
}

.task-main {
  flex: 1;
  min-width: 0;
}

.task-title-row {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-1);
}

.task-title {
  font-size: var(--fs-base);
  font-weight: 600;
  color: var(--color-text);
}

.task-badge {
  flex-shrink: 0;
  font-size: var(--fs-xs);
  padding: 1px 8px;
  border-radius: var(--radius-pill);
  font-weight: 500;
}

.task-badge--已点亮 {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.task-badge--推荐下一步 {
  background: var(--color-gold-bg);
  color: var(--color-gold);
  font-weight: 600;
}

.task-badge--进行中 {
  background: #e8f0f8;
  color: #5b9ecf;
}

.task-badge--可回补 {
  background: #fef5e0;
  color: #b8860b;
}

.task-badge--未开始 {
  background: var(--color-bg-warm);
  color: var(--color-text-light);
}

.task-summary {
  font-size: var(--fs-sm);
  color: var(--color-text-light);
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-meta {
  display: flex;
  gap: var(--sp-4);
  margin-top: var(--sp-3);
  padding-top: var(--sp-3);
  border-top: 1px solid var(--color-border-light);
}

.task-time,
.task-reward {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
}

.task-reward {
  color: var(--color-gold);
}

/* ===== 待回补 ===== */
.backfill-section {
  padding: var(--sp-5) var(--sp-6);
  background: #fef9f0;
  border: 1px solid #f0d77b;
  border-radius: var(--radius-lg);
}

.backfill-heading {
  font-family: var(--font-heading);
  font-size: var(--fs-md);
  color: var(--color-text);
  margin: 0 0 var(--sp-1);
}

.backfill-hint {
  font-size: var(--fs-sm);
  color: var(--color-text-light);
  margin: 0 0 var(--sp-4);
}

.backfill-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
}

.backfill-card {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-2) var(--sp-3);
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--dur-fast) var(--ease-out);
  font-family: inherit;
  font-size: var(--fs-sm);
  color: var(--color-text);
  -webkit-appearance: none;
}

.backfill-card:hover {
  border-color: var(--color-gold);
}

.backfill-label {
  font-weight: 500;
}

.backfill-badge {
  font-size: var(--fs-xs);
  padding: 1px 6px;
  border-radius: var(--radius-pill);
  background: #fef5e0;
  color: #b8860b;
}

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .plan-page {
    padding: var(--sp-4) var(--sp-4) var(--sp-10);
  }

  .phase-cards {
    display: flex;
    overflow-x: auto;
    gap: var(--sp-3);
    padding-bottom: var(--sp-2);
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .phase-cards::-webkit-scrollbar {
    display: none;
  }

  .phase-card {
    flex-shrink: 0;
    min-width: 130px;
  }

  .week-section {
    padding: var(--sp-4);
  }

  .week-dots {
    overflow-x: auto;
    padding-bottom: var(--sp-1);
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .week-dots::-webkit-scrollbar {
    display: none;
  }

  .week-dot {
    flex-shrink: 0;
  }

  .day-tabs {
    display: flex;
    overflow-x: auto;
    gap: var(--sp-2);
    padding-bottom: var(--sp-2);
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .day-tabs::-webkit-scrollbar {
    display: none;
  }

  .day-tab {
    flex-shrink: 0;
    min-width: 88px;
  }

  .task-title-row {
    flex-wrap: wrap;
  }
}

@media (max-width: 640px) {
  .plan-page {
    padding: var(--sp-3) var(--sp-3) var(--sp-8);
  }

  .section-title {
    font-size: var(--fs-lg);
    margin-bottom: var(--sp-3);
  }

  .phase-card {
    min-width: 110px;
    padding: var(--sp-3) var(--sp-2);
  }

  .week-section {
    padding: var(--sp-3);
    border-radius: var(--radius-md);
  }

  .week-nav {
    gap: var(--sp-2);
  }

  .week-arrow {
    width: 30px;
    height: 30px;
    font-size: var(--fs-xs);
  }

  .week-dots {
    gap: 4px;
  }

  .week-dot {
    width: 28px;
    height: 28px;
    font-size: 11px;
  }

  .week-title {
    font-size: var(--fs-md);
  }

  .week-meta {
    flex-wrap: wrap;
    gap: var(--sp-1);
    font-size: var(--fs-xs);
  }

  .week-meta .meta-divider {
    display: none;
  }

  .day-tab {
    min-width: 78px;
    padding: var(--sp-2);
  }

  .day-name {
    font-size: var(--fs-xs);
  }

  .task-card {
    padding: var(--sp-3);
  }

  .task-title {
    font-size: var(--fs-sm);
  }

  .backfill-section {
    padding: var(--sp-3) var(--sp-4);
  }

  .backfill-list {
    flex-direction: column;
  }

  .backfill-card {
    width: 100%;
  }
}
</style>
