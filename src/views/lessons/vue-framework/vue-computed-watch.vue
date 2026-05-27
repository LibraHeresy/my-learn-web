<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "computed — 自动计算的属性", content: "当某个值可以由其他数据**推导**出来时，用 `computed`：\n\n```vue\n<script setup>\nimport { ref, computed } from 'vue'\n\nconst pieces = ref([\n  { name: '月光', period: '古典主义' },\n  { name: '夜曲', period: '浪漫主义' },\n  { name: '春', period: '巴洛克' },\n  { name: '致爱丽丝', period: '古典主义' },\n])\n\n// computed：自动计算，有缓存\nconst classicalPieces = computed(() => {\n  return pieces.value.filter(p => p.period === '古典主义')\n})\n<\/script>\n\n<template>\n  <p>古典主义曲目：{{ classicalPieces.length }} 首</p>\n  <ul>\n    <li v-for=\"p in classicalPieces\" :key=\"p.name\">{{ p.name }}</li>\n  </ul>\n</template>\n```\n\n`classicalPieces` 会自动跟随 `pieces` 的变化重新计算。而且有**缓存**——不依赖的值没变，不会重复计算。" },
  { type: 'example', title: "📝 computed vs 普通函数", content: "为什么不用普通函数？\n\n```js\n// ❌ 普通函数：每次模板重渲染都重新计算\nfunction getClassical() {\n  return pieces.value.filter(p => p.period === '古典主义')\n}\n\n// ✅ computed：只在 pieces 变化时才重新计算\nconst classicalPieces = computed(() => {\n  return pieces.value.filter(p => p.period === '古典主义')\n})\n```\n\n就像乐谱翻页：函数式每次都从头到尾唱一遍来找古典曲目；computed 像在谱子上贴了标签——曲目单不变就不用重新翻。" },
  { type: 'example', title: "📝 watch — 观察变化，执行操作", content: "`watch` 用于\"当某个值变了，我要做点什么\"——比如保存到 localStorage、发请求：\n\n```vue\n<script setup>\nimport { ref, watch } from 'vue'\n\nconst searchKeyword = ref('')\nconst results = ref([])\n\n// watch：监测 keyword 变化，执行副作用\nwatch(searchKeyword, async (newVal, oldVal) => {\n  if (newVal.length === 0) {\n    results.value = []\n    return\n  }\n  console.log(\\`搜索：\\${oldVal} → \\${newVal}\\`)\n  results.value = await searchAPI(newVal)\n})\n<\/script>\n```\n\n`watch` 适合：\n- 保存数据到 localStorage\n- 搜索/筛选触发 API 请求\n- 某个值变化时更新页面标题\n- 数据变化时触发动画" },
  { type: 'example', title: "📝 computed vs watch：选哪个？", content: "| 场景 | 用什么 | 为什么 |\n|------|--------|--------|\n| 筛选/排序列表 | computed | 纯计算，需要缓存 |\n| 格式化显示 | computed | 依赖数据 → 派生值 |\n| 数据变了要发请求 | watch | 有副作用 |\n| 数据变了要存 localStorage | watch | 有副作用 |\n| 多个依赖组合判断 | computed | 自动追踪依赖 |\n\n**口诀：** 需要**返回值**用 computed，需要**做事情**用 watch。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "在你的 `music-collection` 项目中：\n\n1. 添加 `computed`：根据用户选择的时期（period）筛选曲目列表\n2. 添加 `watch`：当曲目列表变化时，自动保存到 `localStorage`\n\n> 这两个功能你在\"合奏篇\"中用纯 JS 手动实现过。现在用 Vue 的 computed/watch，体会一下代码量的差异。" }
]

const analogy = "乐队中有两种伴奏方式：一种是钢琴跟着主旋律自动配和声（computed——自动计算，有缓存）；一种是鼓手听到变换后才改变节奏型（watch——观察变化，执行副作用）。两者各有用途，选对工具让你的\"演奏\"更流畅。"

const listen = "舒伯特《鳟鱼五重奏》— 五个乐器各有角色：钢琴提供和声基础（computed），低音提琴时而拨弦时而拉弓（watch 到主旋律变化时改变奏法）。听这首歌时想一下：谁在\"计算\"，谁在\"观察\"？"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第八章：Vue 实战 · 第 7 课</span>
      <h2 class="lesson-title">computed 与 watch — 自动跟进的"伴奏"</h2>
    </div>

    <div class="content-body">
      <div v-if="analogy" class="analogy-box">
        <span class="analogy-icon">🎵</span>
        <p class="analogy-text" v-html="parseInline(analogy)"></p>
      </div>

      <section
        v-for="(sec, i) in sections" :key="i"
        :class="['content-section', 'section-' + sec.type]"
      >
        <h3 v-if="sec.title" class="section-title" v-html="parseInline(sec.title)"></h3>
        <div class="section-content" v-html="parseContent(sec.content)"></div>
      </section>

      <div v-if="listen" class="listen-box">
        <span class="listen-icon">🎧</span>
        <div>
          <p class="listen-label">推荐聆听</p>
          <p class="listen-text" v-html="parseInline(listen)"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-panel);
}

.content-header {
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.lesson-number {
  font-size: var(--fs-xs);
  color: var(--color-gold);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.lesson-title {
  margin-top: var(--sp-1);
  font-size: var(--fs-xl);
}

.content-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--sp-4) var(--sp-5);
}

.analogy-box {
  display: flex;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background: var(--color-bg-warm);
  border-left: 3px solid var(--color-gold);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin-bottom: var(--sp-6);
}

.analogy-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.analogy-text {
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text-light);
}

.content-section {
  margin-bottom: var(--sp-5);
}

.section-title {
  font-size: var(--fs-base);
  color: var(--color-accent);
  margin-bottom: var(--sp-2);
  padding-bottom: var(--sp-1);
  border-bottom: 1px solid var(--color-border-light);
}

.section-content {
  font-size: var(--fs-sm);
  line-height: 1.8;
  color: var(--color-text);
}

.section-task {
  padding: var(--sp-4);
  background: #FFF8F0;
  border: 1px solid var(--color-gold-light);
  border-radius: var(--radius-md);
}

.section-hint {
  padding: var(--sp-3) var(--sp-4);
  background: #F5F0FF;
  border-radius: var(--radius-sm);
  font-size: var(--fs-sm);
}

.section-example {
  padding: var(--sp-3);
  background: var(--color-bg-warm);
  border-radius: var(--radius-sm);
}

:deep(.code-block) {
  background: #2D2520;
  color: #E8DCC8;
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--radius-sm);
  overflow-x: auto;
  font-family: var(--font-code);
  font-size: var(--fs-xs);
  line-height: 1.6;
  margin: var(--sp-2) 0;
}

:deep(.inline-code) {
  background: var(--color-bg-warm);
  padding: 1px 6px;
  border-radius: 3px;
  font-family: var(--font-code);
  font-size: 0.9em;
  color: var(--color-accent);
}

:deep(p) {
  margin-bottom: var(--sp-2);
}

.listen-box {
  display: flex;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background: #F5F9F0;
  border-radius: var(--radius-md);
  margin-top: var(--sp-6);
}

.listen-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.listen-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-success);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.listen-text {
  font-size: var(--fs-sm);
  color: var(--color-text-light);
  margin-top: var(--sp-1);
}

:deep(.term-tip) {
  border-bottom: 1.5px dashed var(--color-gold);
  color: var(--color-accent);
  cursor: help;
  transition: all 0.15s;
  position: relative;
}

:deep(.term-tip:hover) {
  background: rgba(201, 169, 110, 0.12);
  border-bottom-color: var(--color-gold-light);
}
</style>
