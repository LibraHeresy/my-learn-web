<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "ref — 响应式数据的起点", content: "在 `<script setup>` 中，用 `ref()` 创建响应式数据：\n\n```vue\n<script setup>\nimport { ref } from 'vue'\n\nconst count = ref(0)\nconst composer = ref(\"贝多芬\")\nconst pieces = ref([\"夜曲\", \"月光\", \"春\"])\n\nfunction addOne() {\n  count.value++  // JS 中读写用 .value\n}\n<\/script>\n\n<template>\n  <p>计数：{{ count }}</p>        <!-- 模板中不需要 .value！ -->\n  <p>作曲家：{{ composer }}</p>\n  <button @click=\"addOne\">+1</button>\n</template>\n```\n\n**规则不变：JS 中用 `.value`，模板中不用。**\n\n但是写法更简洁了：在 `<script setup>` 中，变量和函数**自动暴露给模板**——不需要像 CDN 方式那样 `return { count, addOne }`！" },
  { type: 'explain', title: "computed — 自动计算的派生数据", content: "`computed` 从其他数据自动推算出一个新值。依赖的数据变了，computed 自动重算。\n\n```vue\n<script setup>\nimport { ref, computed } from 'vue'\n\nconst pieces = ref([\n  { name: \"夜曲\", period: \"浪漫主义\" },\n  { name: \"布兰登堡\", period: \"巴洛克\" },\n  { name: \"月光\", period: \"印象派\" }\n])\n\nconst selectedPeriod = ref(\"全部\")\n\n// 自动筛选\nconst filteredPieces = computed(() => {\n  if (selectedPeriod.value === \"全部\") return pieces.value\n  return pieces.value.filter(p => p.period === selectedPeriod.value)\n})\n\n// 自动计数\nconst count = computed(() => filteredPieces.value.length)\n<\/script>\n\n<template>\n  <button @click=\"selectedPeriod = '巴洛克'\">巴洛克</button>\n  <p>共 {{ count }} 首</p>\n  <div v-for=\"p in filteredPieces\" :key=\"p.name\">\n    {{ p.name }} — {{ p.period }}\n  </div>\n</template>\n```\n\n点击\"巴洛克\"按钮 → `selectedPeriod` 变了 → `filteredPieces` 自动重算 → `count` 自动重算 → 页面自动更新。三行 computed，替代了原来的手动 `render()` 函数！" },
  { type: 'task', title: "🎯 你的任务 ✨", content: "在你的 `music-collection` 项目中：\n\n1. 在 `App.vue` 中创建一个曲目数组 `pieces`（ref）\n\n2. 用 `v-for` 在页面上渲染所有曲目\n\n3. 添加时期筛选按钮（\"全部\"、\"巴洛克\"、\"浪漫主义\"等）\n\n4. 用 `computed` 实现自动筛选\n\n5. 显示 \"筛选出 X 首中的 Y 首\"\n\n> 对比你在合奏篇手动 `render()` 的方案——是不是简单了很多？" },
  { type: 'hint', title: "💡 <script setup> 的优势", content: "`<script setup>` 是 Vue 3 推荐的写法，相比 CDN 方式：\n- **不需要 `return`** — 顶层变量和函数自动暴露\n- **不需要 `.value`** — 在模板中自动解包\n- **import 自动可用** — 你 import 的组件在模板中直接使用\n\n就像从\"手动挡\"换成了\"自动挡\"——做的事一样，但省了很多操作。" }
]

const analogy = "在乐理篇和合奏篇，你每次修改数据后都要手动调用 `render()` 更新页面——就像每次排练后手动重新整理乐谱。Vue 的 `ref` 和 `computed` 让这一切自动化：数据就像被施了魔法，你改一个值，所有用到它的地方自动更新。**你只需要关注数据本身，不用管 DOM。**"

const listen = "肖邦《即兴幻想曲》Op.66 — 左右手的节奏是 4 对 3，但听起来天衣无缝。ref 和 computed 的配合也是如此：ref 是右手的旋律（数据源），computed 是左手的琶音（自动派生的和声），Vue 让你不用手动协调它们。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第八章：Vue 实战 · 第 4 课</span>
      <h2 class="lesson-title">响应式数据 — ref 与 computed 的真实写法</h2>
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
