<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "命令式 vs 声明式", content: "**命令式（Imperative）：** 一步步告诉计算机怎么做。\n```js\n// 纯 JS：操作 DOM\nconst title = document.createElement('h1')\ntitle.textContent = '你好，音乐世界'\ndocument.getElementById('app').appendChild(title)\n```\n\n**声明式（Declarative）：** 描述你想要什么结果。\n```vue\n<!-- Vue：声明结果 -->\n<template>\n  <h1>{{ message }}</h1>\n</template>\n<script setup>\nconst message = '你好，音乐世界'\n<\/script>\n```\n\n命令式像给乐手发微信：\"左手按G弦第二品，右手拨弦\"——高效但不优雅。声明式像给乐手一份乐谱——他知道该做什么，你只管结果。" },
  { type: 'explain', title: "Vue 的核心思想", content: "Vue 的三个核心理念：\n\n1. **响应式数据：** 数据变了，页面自动更新。你不需要手动 `document.querySelector().textContent = ...`\n\n2. **组件化：** 把页面拆成独立、可复用的组件，像乐团中的不同声部（弦乐组、管乐组、打击乐组）\n\n3. **声明式渲染：** 在模板中描述 UI 应该长什么样，Vue 负责把数据渲染到 DOM\n\n> 💡 你不是在\"操作 DOM\"，你是在\"描述 UI\"。Vue 负责中间的一切。" },
  { type: 'example', title: "📝 reactivity 的本质", content: "Vue 的响应式系统让你专注于数据：\n\n```vue\n<script setup>\nimport { ref } from 'vue'\n\nconst count = ref(0)  // 响应式数据\n\nfunction increment() {\n  count.value++  // 修改数据\n  // 无需操作 DOM！页面自动更新\n}\n<\/script>\n\n<template>\n  <p>已点赞 {{ count }} 次</p>\n  <button @click=\"increment\">👍 点赞</button>\n</template>\n```\n\n就像 MIDI 键盘：你按键，声音自动发出。你不用管\"怎么发声\"——那已经被系统处理好了。你只管演奏。" },
  { type: 'task', title: "🎯 反思题 🤔", content: "回顾你在乐理篇和合奏篇中用纯 JS 写的代码（querySelector、innerHTML、appendChild）。现在闭上眼睛想象：如果数据变了页面自动更新，你能省去多少代码？\n\n这就是 Vue 的价值。接下来的课程会逐步展开这个\"魔法\"背后的原理，以及如何在实际项目中使用它。" }
]

const analogy = "在此之前，你写 JS 操作 DOM 就像逐音给乐手指令：\"第一小提琴第二拍拉G\"。而 Vue 像指挥给总谱——你描述\"这里要有弦乐主题\"，Vue 负责让弦乐在正确的时间出声。这是从**命令式**到**声明式**的思维转变。"

const listen = "巴赫《赋格的艺术》— 赋格是一种\"声明式\"作曲法：你声明一个主题，对位规则自动生成各声部的进入与呼应。Vue 的响应式系统也是如此——声明数据与模板的关系，框架自动处理同步。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第八章：Vue 实战 · 第 6 课</span>
      <h2 class="lesson-title">Vue 的思维方式 — 从"操作 DOM"到"声明结果"</h2>
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
