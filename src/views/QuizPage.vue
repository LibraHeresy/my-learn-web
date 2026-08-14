<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuizStore } from '../stores/quiz'
import { getGems, type QuizQuestion, type GemDef } from '../content-loaders/quiz'
const gems = getGems()

const store = useQuizStore()

const lastError = computed(() => store.lastError)
function dismissLastError() {
  store.lastError = null
}

type Page = 'home' | 'level' | 'result'
const page = ref<Page>('home')
const activeGem = ref<GemDef | null>(null)
const activeLevel = ref(1)
const questions = ref<QuizQuestion[]>([])
const currentIdx = ref(0)
const selected = ref<number | null>(null)
const score = ref(0)
const history = ref<{ q: QuizQuestion; a: number | null; ok: boolean }[]>([])
const wrongIds = ref<number[]>([])

const gemOrdered = computed(() => {
  const jr = gems.filter(g => g.achievement === 'junior').sort((a, b) => a.order - b.order)
  const mid = gems.filter(g => g.achievement === 'mid').sort((a, b) => a.order - b.order)
  const sr = gems.filter(g => g.achievement === 'senior').sort((a, b) => a.order - b.order)
  return { junior: jr, mid, senior: sr }
})

const tiers = computed(() => [
  { key: 'junior', title: '🏅 初级前端工程师', gems: gemOrdered.value.junior, requiredAchievement: null as null | boolean },
  { key: 'mid', title: '🏅 中级前端工程师', gems: gemOrdered.value.mid, requiredAchievement: store.juniorAchievement },
  { key: 'senior', title: '🏅 高级前端工程师', gems: gemOrdered.value.senior, requiredAchievement: store.midAchievement },
])

const curQ = computed(() => questions.value[currentIdx.value] || null)
const progress = computed(() => questions.value.length ? (currentIdx.value / questions.value.length * 100) : 0)
const isLast = computed(() => currentIdx.value >= questions.value.length - 1)
const resultPct = computed(() => questions.value.length ? Math.round(score.value / questions.value.length * 100) : 0)
const resultPassed = computed(() => {
  if (!activeGem.value) return false
  const ld = activeGem.value.levels.find(l => l.level === activeLevel.value)
  return ld ? resultPct.value >= ld.threshold : false
})
const levelDef = computed(() => activeGem.value?.levels.find(l => l.level === activeLevel.value))

function selectGem(gem: GemDef) {
  activeGem.value = gem
  activeLevel.value = gem.levels[0].level
}

async function startLevel(gemId: string, level: number) {
  questions.value = await store.pickLevelQuestions(gemId, level)
  if (!questions.value.length) return
  currentIdx.value = 0; selected.value = null; score.value = 0; history.value = []; wrongIds.value = []
  page.value = 'level'
}

function selectOption(i: number) {
  if (selected.value !== null || !curQ.value) return
  selected.value = i
  const ok = i === curQ.value.answer
  if (ok) score.value++
  else wrongIds.value.push(curQ.value.id)
  store.recordAnswer(curQ.value.id, ok)
  history.value.push({ q: curQ.value, a: i, ok })
}

function nextQ() {
  if (isLast.value) {
    if (activeGem.value) {
      store.recordLevelResult(activeGem.value.id, activeLevel.value, score.value, questions.value.length, wrongIds.value)
    }
    page.value = 'result'
    return
  }
  currentIdx.value++; selected.value = null
}

function retry() {
  if (activeGem.value) startLevel(activeGem.value.id, activeLevel.value)
  else startWrongReview()
}
function nextLevel() {
  const gem = activeGem.value!
  const levels = gem.levels
  const curIdx = levels.findIndex(l => l.level === activeLevel.value)
  if (curIdx < levels.length - 1) {
    activeLevel.value = levels[curIdx + 1].level
    startLevel(gem.id, activeLevel.value)
  }
}
function backToHome() { page.value = 'home'; activeGem.value = null }

const showFab = ref(false)
function toggleFab() { showFab.value = !showFab.value }
async function startWrongReview() {
  const qs = await store.pickWrongQuestions(10)
  if (!qs.length) return
  questions.value = qs; currentIdx.value = 0; selected.value = null; score.value = 0; history.value = []; wrongIds.value = []
  activeGem.value = null; activeLevel.value = 0; page.value = 'level'
  showFab.value = false
}

const typeLabel = (t: string) => ({ 'normal': '🟢 普通关', 'elite': '🔵 精英关', 'boss': '🟣 Boss 关', 'achievement-boss': '🔴 成就 Boss' }[t] || t)
const typeColor = (t: string) => ({ 'normal': 'var(--color-success)', 'elite': '#2196F3', 'boss': '#9C27B0', 'achievement-boss': 'var(--color-error)' }[t] || '#999')
</script>

<template>
  <div class="quiz-page">
    <Transition name="fade">
      <div v-if="lastError" class="app-error-toast" role="alert">
        <span class="app-error-toast__text">{{ lastError }}</span>
        <button class="app-error-toast__close" @click="dismissLastError" title="关闭">✕</button>
      </div>
    </Transition>

    <!-- ===== HOME: 成就 + 宝石路径 ===== -->
    <template v-if="page === 'home'">
      <!-- 成就栏 -->
      <div class="achievements">
        <div :class="['ach-badge', { unlocked: store.juniorAchievement }]">
          <span class="ach-icon">🏅</span>
          <span class="ach-name">初级前端</span>
          <span class="ach-progress">{{ store.juniorProgress }}/{{ store.juniorTotal }}</span>
        </div>
        <div :class="['ach-badge', { unlocked: store.midAchievement }]">
          <span class="ach-icon">🏅</span>
          <span class="ach-name">中级前端</span>
          <span class="ach-progress">{{ store.midProgress }}/{{ store.midTotal }}</span>
        </div>
        <div :class="['ach-badge', { unlocked: store.seniorAchievement }]">
          <span class="ach-icon">🏅</span>
          <span class="ach-name">高级前端</span>
          <span class="ach-progress">{{ store.seniorProgress }}/{{ store.seniorTotal }}</span>
        </div>
      </div>

      <div v-for="tier in tiers" :key="tier.key" class="tier-section">
        <h3 class="tier-title">
          {{ tier.title }}
        </h3>
        <div class="gem-path">
          <template v-for="(g, i) in tier.gems" :key="g.id">
            <span v-if="i > 0" class="path-line">━</span>
            <button
              :class="['gem-node', {
                complete: store.isGemComplete(g.id),
                active: activeGem?.id === g.id
              }]"
              @click="selectGem(g)"
            >
              <span class="gem-icon">{{ g.icon }}</span>
              <span class="gem-label">{{ g.name.replace('宝石','') }}</span>
            </button>
          </template>
        </div>
      </div>

      <!-- 宝石详情面板 -->
      <div v-if="activeGem" class="gem-detail">
        <h4>{{ activeGem.icon }} {{ activeGem.name }}</h4>
        <div class="level-list">
          <div
            v-for="l in activeGem.levels"
            :key="l.level"
            :class="['level-card', {
              passed: store.getLevelProgress(activeGem.id, l.level).passed
            }]"
          >
            <div class="level-info">
              <span class="level-badge" :style="{ background: typeColor(l.type) }">{{ typeLabel(l.type) }}</span>
              <span class="level-name">{{ l.name }}</span>
              <span class="level-meta">{{ l.count }} 题 · 门槛 {{ l.threshold }}%</span>
            </div>
            <button
              class="level-btn"
              @click="startLevel(activeGem!.id, l.level)"
            >
              {{ store.getLevelProgress(activeGem.id, l.level).passed ? '🔄 重玩' : '⚔️ 挑战' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 底部统计 -->
      <div class="quiz-stats">
        📊 {{ store.overallAccuracy }}% 正确率 · 🔄 {{ store.wrongCount }} 错题待复习
      </div>
    </template>

    <!-- ===== 答题页 ===== -->
    <template v-if="page === 'level' && curQ">
      <div class="quiz-top">
        <button class="back-btn" @click="backToHome">← 退出</button>
        <span class="q-counter">{{ currentIdx + 1 }}/{{ questions.length }}</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" :style="{ width: progress + '%' }" /></div>

      <div class="question-card">
        <div class="q-meta">
          <span v-if="levelDef" class="q-type" :style="{ color: typeColor(levelDef.type) }">{{ typeLabel(levelDef.type) }}</span>
          <span class="q-diff">{{ '★'.repeat(curQ.difficulty) }}</span>
          <span class="q-streak" v-if="store.getQuestionStreak(curQ.id) > 0" :title="'连续正确 ' + store.getQuestionStreak(curQ.id) + ' 次'">
            <span v-for="n in 3" :key="n" :class="['streak-dot', { filled: n <= store.getQuestionStreak(curQ.id) }]">●</span>
          </span>
        </div>
        <h3 class="q-text">{{ curQ.question }}</h3>

        <div class="q-options">
          <button
            v-for="(opt, i) in curQ.options" :key="i"
            :class="['opt-btn', {
              selected: selected === i,
              correct: selected !== null && i === curQ.answer,
              wrong: selected === i && i !== curQ.answer
            }]"
            :disabled="selected !== null" @click="selectOption(i)"
          >
            <span class="opt-letter">{{ ['A','B','C','D'][i] }}</span>
            <span class="opt-text">{{ opt }}</span>
          </button>
        </div>

        <div
          v-if="selected !== null"
          class="explain-box"
        >
          <div class="explain-icon">{{ history[history.length-1]?.ok ? '✓' : '✗' }}</div>
          <div class="explain-text">{{ curQ.explanation }}</div>
        </div>

        <button v-if="selected !== null" class="next-btn" @click="nextQ">
          {{ isLast ? '🏆 结算' : '下一题 →' }}
        </button>
      </div>
    </template>

    <!-- ===== 结果页 ===== -->
    <template v-if="page === 'result'">
      <div class="result-page">
        <div class="result-icon">{{ resultPassed ? '🎉' : '💪' }}</div>
        <h2>{{ activeGem ? (resultPassed ? '关卡通过！' : '还差一点！') : '错题复习完成！' }}</h2>
        <p class="result-score"><strong>{{ score }}</strong> / {{ questions.length }} · {{ resultPct }}%</p>
        <div class="result-bar"><div class="result-fill" :style="{ width: resultPct + '%' }" /></div>
        <p class="result-threshold" v-if="activeGem">门槛 {{ levelDef?.threshold }}% {{ resultPassed ? '✓ 达标' : '✗ 未达标' }}</p>

        <div
          class="result-review"
          v-if="history.filter(h=>!h.ok).length"
        >
          <h4>📋 错题回顾</h4>
          <div v-for="(h, i) in history.filter(h=>!h.ok)" :key="i" class="review-item">
            <div class="review-q"><span class="review-badge">✗</span>{{ h.q.question }}</div>
            <div class="review-explain">{{ h.q.explanation }}</div>
          </div>
        </div>

        <div class="result-actions">
          <button class="act-btn primary" @click="retry">🔄 再试一次</button>
          <button v-if="resultPassed && activeGem && activeLevel < activeGem.levels.length" class="act-btn" @click="nextLevel">下一关 →</button>
          <button class="act-btn" @click="backToHome">📚 返回</button>
        </div>
      </div>
    </template>

    <!-- 悬浮按钮 -->
    <div class="fab-container" :class="{ open: showFab }">
      <button class="fab-menu-item" v-if="showFab" @click="startWrongReview">
        <span class="fab-item-icon">🔄</span>
        <span class="fab-item-label">错题本</span>
        <span v-if="store.wrongCount" class="fab-badge">{{ store.wrongCount }}</span>
      </button>
      <button class="fab-main" @click="toggleFab">
        <span class="fab-main-icon">{{ showFab ? '✕' : '📋' }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.quiz-page { height: 100%; overflow-y: auto; padding: var(--sp-6); max-width: 860px; margin: 0 auto; position: relative; }

/* Achievements */
.achievements { display: flex; gap: var(--sp-3); margin-bottom: var(--sp-6); justify-content: center; }
.ach-badge { display: flex; align-items: center; gap: var(--sp-2); padding: var(--sp-3) var(--sp-5); background: var(--color-panel); border: 2px solid var(--color-border-light); border-radius: var(--radius-md); opacity: 0.5; transition: all var(--dur-fast); }
.ach-badge.unlocked { opacity: 1; border-color: var(--color-gold); background: linear-gradient(135deg, rgba(201,169,110,0.1), rgba(201,169,110,0.02)); }
.ach-icon { font-size: 1.4rem; }
.ach-name { font-weight: 600; font-size: var(--fs-sm); }
.ach-progress { font-size: var(--fs-xs); color: var(--color-text-light); }

/* Tier sections */
.tier-section { margin-bottom: var(--sp-5); }
.tier-title { font-size: var(--fs-md); margin-bottom: var(--sp-3); display: flex; align-items: center; gap: var(--sp-2); }
.tier-lock { font-size: var(--fs-xs); color: var(--color-text-light); }

/* Gem path */
.gem-path { display: flex; align-items: center; gap: var(--sp-1); flex-wrap: wrap; padding: var(--sp-3); background: var(--color-panel); border-radius: var(--radius-md); }
.path-line { color: var(--color-border); font-weight: 700; }
.gem-node { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: var(--sp-3) var(--sp-3); border: 2px solid var(--color-border-light); border-radius: var(--radius-sm); background: var(--color-bg); cursor: pointer; transition: all var(--dur-fast); width: 64px; overflow: visible; }
.gem-node .gem-icon { font-size: 1.5rem; line-height: 1.2; }
.gem-node:hover:not(:disabled) { border-color: var(--color-gold); transform: translateY(-2px); }
.gem-node.active { border-color: var(--color-gold); box-shadow: 0 0 8px rgba(201,169,110,0.3); }
.gem-node.complete { border-color: var(--color-gold); background: rgba(201,169,110,0.08); }
.gem-node.locked { opacity: 0.35; cursor: not-allowed; }
.gem-icon { font-size: 1.5rem; }
.gem-label { font-size: 10px; color: var(--color-text-light); white-space: nowrap; }

/* Gem detail */
.gem-detail { margin-top: var(--sp-4); padding: var(--sp-5); background: var(--color-panel); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); }
.gem-detail h4 { margin: 0 0 var(--sp-3); }
.level-list { display: flex; flex-direction: column; gap: var(--sp-2); }
.level-card { display: flex; align-items: center; justify-content: space-between; padding: var(--sp-3); border-radius: var(--radius-sm); background: var(--color-bg); }
.level-card.locked { opacity: 0.4; }
.level-card.passed { border-left: 3px solid var(--color-success); }
.level-info { display: flex; align-items: center; gap: var(--sp-3); }
.level-badge { padding: 2px 10px; border-radius: 10px; font-size: 11px; color: #fff; white-space: nowrap; }
.level-name { font-weight: 600; font-size: var(--fs-sm); }
.level-meta { font-size: var(--fs-xs); color: var(--color-text-light); }
.level-btn { padding: var(--sp-1) var(--sp-4); font-size: var(--fs-xs); font-weight: 600; color: #fff; background: var(--color-gold); border: none; border-radius: var(--radius-sm); cursor: pointer; }
.level-lock { font-size: 1.2rem; }
.quiz-stats { text-align: center; margin-top: var(--sp-6); font-size: var(--fs-xs); color: var(--color-text-light); }

/* Quiz taking (reuse existing styles + add) */
.quiz-top { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
.back-btn { background: none; border: none; color: var(--color-text-light); cursor: pointer; font-size: var(--fs-sm); }
.q-gem { font-weight: 600; font-size: var(--fs-sm); flex: 1; }
.q-counter { font-size: var(--fs-xs); color: var(--color-text-light); }
.progress-bar { height: 4px; background: var(--color-border-light); border-radius: 2px; margin-bottom: var(--sp-5); overflow: hidden; }
.progress-fill { height: 100%; background: var(--color-gold); border-radius: 2px; transition: width var(--dur-normal); }
.question-card { background: var(--color-panel); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); padding: var(--sp-6); }
.q-meta { display: flex; gap: var(--sp-2); margin-bottom: var(--sp-3); }
.q-type { font-size: var(--fs-xs); font-weight: 600; }
.q-diff { color: var(--color-gold); font-size: var(--fs-xs); }
.q-streak { display: inline-flex; gap: 3px; margin-left: auto; font-size: 11px; }
.streak-dot { color: var(--color-border-light); transition: color var(--dur-fast); }
.streak-dot.filled { color: var(--color-success); }
.q-text { font-size: var(--fs-md); font-weight: 600; margin: 0 0 var(--sp-5); line-height: 1.6; }
.q-options { display: flex; flex-direction: column; gap: var(--sp-2); }
.opt-btn { display: flex; align-items: flex-start; gap: var(--sp-3); padding: var(--sp-3) var(--sp-4); text-align: left; font-size: var(--fs-sm); color: var(--color-text); background: var(--color-bg); border: 2px solid var(--color-border-light); border-radius: var(--radius-sm); cursor: pointer; transition: all var(--dur-fast); }
.opt-btn:hover:not(:disabled) { border-color: var(--color-gold); }
.opt-btn.selected { border-color: var(--color-gold); }
.opt-btn.correct { border-color: var(--color-success); background: var(--color-success-light); }
.opt-btn.wrong { border-color: var(--color-error); background: var(--color-error-bg); }
.opt-letter { width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-full); font-weight: 700; font-size: var(--fs-xs); background: var(--color-border-light); color: var(--color-text-light); flex-shrink: 0; }
.opt-btn.correct .opt-letter { background: var(--color-success); color: #fff; }
.opt-btn.wrong .opt-letter { background: var(--color-error); color: #fff; }
.opt-text { padding-top: 3px; }
.explain-box { display: flex; gap: var(--sp-3); margin-top: var(--sp-4); padding: var(--sp-4); background: rgba(201,169,110,0.06); border-left: 3px solid var(--color-gold); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: var(--fs-sm); color: var(--color-text-light); line-height: 1.6; align-items: flex-start; }
.explain-icon { font-weight: 700; font-size: 1.2em; flex-shrink: 0; }
.next-btn { display: block; width: 100%; margin-top: var(--sp-5); padding: var(--sp-4); font-size: var(--fs-sm); font-weight: 600; color: #fff; background: var(--color-gold); border: none; border-radius: var(--radius-sm); cursor: pointer; }
.next-btn:hover { background: var(--color-gold-light); }

/* Result */
.result-page { text-align: center; }
.result-icon { font-size: 4rem; margin-bottom: var(--sp-3); }
.result-page h2 { margin-bottom: var(--sp-1); }
.result-score { font-size: var(--fs-md); color: var(--color-text-light); margin-bottom: var(--sp-2); }
.result-score strong { color: var(--color-accent); font-size: 1.3em; }
.result-bar { height: 10px; background: var(--color-border-light); border-radius: 5px; overflow: hidden; max-width: 300px; margin: 0 auto var(--sp-2); }
.result-fill { height: 100%; background: var(--color-gold); border-radius: 5px; transition: width 0.6s ease; }
.result-threshold { font-size: var(--fs-xs); color: var(--color-text-light); margin-bottom: var(--sp-4); }
.result-review { text-align: left; max-width: 500px; margin: 0 auto var(--sp-5); }
.result-review h4 { margin-bottom: var(--sp-3); }
.review-item { padding: var(--sp-3); border-radius: var(--radius-sm); margin-bottom: var(--sp-2); background: var(--color-error-bg); }
.review-q { font-size: var(--fs-sm); display: flex; gap: var(--sp-2); margin-bottom: var(--sp-1); }
.review-badge { color: var(--color-error); font-weight: 700; flex-shrink: 0; }
.review-explain { font-size: var(--fs-xs); color: var(--color-text-light); margin-left: 22px; line-height: 1.5; }
.result-actions { display: flex; gap: var(--sp-3); justify-content: center; margin-top: var(--sp-4); }
.act-btn { padding: var(--sp-3) var(--sp-6); font-size: var(--fs-sm); font-weight: 600; border: none; border-radius: var(--radius-sm); cursor: pointer; color: var(--color-text); background: var(--color-bg); border: 1px solid var(--color-border); }
.act-btn.primary { color: #fff; background: var(--color-gold); border: none; }

/* Floating action button */
.fab-container { position: absolute; bottom: 24px; right: 24px; z-index: 10; display: flex; flex-direction: column-reverse; align-items: flex-end; gap: 12px; }
.fab-main { width: 52px; height: 52px; border-radius: 50%; background: var(--color-gold); color: #fff; border: none; font-size: 1.4rem; cursor: pointer; box-shadow: 0 4px 16px rgba(0,0,0,0.2); transition: all var(--dur-fast); display: flex; align-items: center; justify-content: center; }
.fab-main:hover { background: var(--color-gold-light); transform: scale(1.08); }
.fab-menu-item { display: flex; align-items: center; gap: 8px; padding: 10px 18px; background: var(--color-panel); border: 1px solid var(--color-border-light); border-radius: 24px; cursor: pointer; font-size: var(--fs-sm); color: var(--color-text); box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all var(--dur-fast); white-space: nowrap; }
.fab-menu-item:hover { border-color: var(--color-gold); transform: translateX(-4px); }
.fab-item-icon { font-size: 1.1rem; }
.fab-item-label { font-weight: 500; }
.fab-badge { padding: 1px 7px; font-size: 11px; font-weight: 700; background: var(--color-gold); color: #fff; border-radius: var(--radius-pill); }

/* ===== 移动端适配 ===== */
@media (max-width: 640px) {
  .quiz-page { padding: var(--sp-3); }
  .achievements { gap: var(--sp-1); }
  .ach-badge { padding: var(--sp-2) var(--sp-3); }
  .ach-icon { font-size: 1.1rem; }
  .ach-name { font-size: var(--fs-xs); }
  .ach-progress { font-size: 10px; }

  .tier-title { font-size: var(--fs-sm); }
  .gem-path { gap: 2px; padding: var(--sp-2); overflow-x: auto; flex-wrap: nowrap; }
  .gem-icon { font-size: 1.1rem; }
  .gem-label { font-size: 8px; }
  .path-line { font-size: 10px; }

  .gem-detail { padding: var(--sp-3); }
  .level-info { gap: var(--sp-2); }
  .level-badge { font-size: 10px; padding: 1px 6px; }
  .level-name { font-size: var(--fs-xs); }
  .level-meta { display: none; }
  .level-btn { font-size: 10px; padding: var(--sp-1) var(--sp-3); }

  .question-card { padding: var(--sp-4); }
  .q-text { font-size: var(--fs-sm); }
  .opt-btn { padding: var(--sp-2) var(--sp-3); font-size: var(--fs-xs); }
  .opt-letter { width: 22px; height: 22px; font-size: 10px; }

  .result-page { padding: var(--sp-3); }
  .result-icon { font-size: 3rem; }
  .result-actions { flex-direction: column; }
  .act-btn { width: 100%; }

  .fab-container { bottom: 16px; right: 16px; }
  .fab-main { width: 44px; height: 44px; font-size: 1.2rem; }
}
</style>
