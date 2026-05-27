<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "两种操作 DOM 的思维方式", content: "你在前面几节课中接触过两种操作页面的方式：\n\n**方式一：命令式（Imperative）—— 直接告诉 DOM \"做什么\"**\n```js\n// 添加一项：创建元素、设置内容、挂载到页面\nlet card = document.createElement(\"div\");\ncard.textContent = \"肖邦夜曲\";\nlistEl.appendChild(card);\n\n// 删除一项：找到元素、调用 remove()\ndocument.querySelector(\"#card-3\").remove();\n\n// 修改一项：找到元素、修改内容\ndocument.querySelector(\"#card-2 h3\").textContent = \"新曲名\";\n```\n每一步都要精确操作 DOM。简单直接，但程序复杂时很容易混乱——你需要同时记住\"数据在哪\"和\"DOM 在哪\"。\n\n**方式二：声明式（Declarative）—— 告诉程序 \"我想要什么\"，然后调用渲染函数**\n```js\nlet pieces = [{ name: \"肖邦夜曲\" }, { name: \"布兰登堡\" }];\n\nfunction render(list) {\n  // 清空容器\n  listEl.innerHTML = \"\";\n  // 根据数据重新生成全部 DOM\n  list.forEach(function(p) {\n    let card = document.createElement(\"div\");\n    card.textContent = p.name;\n    listEl.appendChild(card);\n  });\n}\n\nrender(pieces);  // 初始渲染\n\n// 需要添加时：只修改数据，然后重新渲染\npieces.push({ name: \"月光奏鸣曲\" });\nrender(pieces);\n\n// 删除、修改——全部一样：先改数据，再 render()\n```\n\n这就是**数据驱动**——数据是\"唯一的真相来源\"，页面只是数据的反映。" },
  { type: 'explain', title: "为什么框架都用这个模式？", content: "Vue、React、Angular——所有现代前端框架的核心思想都是**数据驱动视图**。\n\n```\n数据 (Data)  ──→  渲染函数 (Render)  ──→  页面 (DOM)\n    ↑                                         │\n    └────── 用户操作 (Events) ──────────────────┘\n```\n\n流程：\n1. **数据变了** → 用户点击、输入、或定时器触发\n2. **重新渲染** → 根据最新数据重新生成 DOM\n3. **页面更新** → 用户看到新内容\n\n框架帮我们做了\"自动检测数据变化 + 高效更新 DOM\"。但在纯 JS 中，你需要手动调用 `render()`。\n\n理解了这个模式，以后学 Vue 时你会发现：它做的事情一模一样，只是把\"手动调 render()\"变成了**自动**——你改数据，它自动帮你重新渲染。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器里有一个\"待听列表\"页面，用命令式直接操作 DOM。\n\n**你的任务：**\n\n1. 把数据提取成一个 `pieces` 数组\n2. 写一个 `render()` 函数，每次调用时清空容器、重新根据 `pieces` 生成 DOM\n3. \"添加\"按钮改为：push 到 `pieces`，然后调用 `render()`\n4. \"清空\"按钮改为：`pieces = []`，然后调用 `render()`\n5. 确认添加和清空功能都正常\n\n完成后你会体会到：修改数据的代码变得非常简洁——所有 DOM 操作都在 `render()` 里，业务逻辑只需要改数据。" }
]

const analogy = "总谱是\"数据\"，演奏是\"渲染\"。指挥在总谱上改一个音符，所有乐手下一遍就按新谱子演奏——不需要每个人单独通知。这就是**数据驱动**：你只需要修改数据，然后调用一次渲染函数，页面自动跟上。"

const listen = "菲利普·格拉斯《玻璃工厂》— 极简主义音乐的核心是\"重复的动机在缓慢变化中演化\"。每次迭代基于同样的模式（同一个渲染函数），但数据在变——就像渲染循环不断根据新数据刷新页面。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第五章：JavaScript 进阶 · 第 10 课</span>
      <h2 class="lesson-title">数据驱动思维 — 改数据就是改页面</h2>
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
