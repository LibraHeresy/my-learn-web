<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么要把大函数拆小？", content: "看看这个\"做了一切\"的函数：\n\n```js\nfunction handleEverything() {\n  // 获取数据\n  // 验证数据\n  // 渲染页面\n  // 绑定事件\n  // 处理点击\n  // 更新显示\n  // 保存记录\n  // …… 100 行代码\n}\n```\n\n问题：\n1. **难读懂** — 你需要从头到尾理解才能修改其中一步\n2. **难调试** — 出错时不知道是哪一步的问题\n3. **难复用** — 如果另一个地方也需要\"渲染页面\"，你没法单独调用\n\n**好代码的样子：**\n```js\nfunction initPage() {\n  let data = loadData();\n  renderCards(data);\n  bindEvents();\n}\n\nfunction loadData() { /* 只负责获取数据 */ }\nfunction renderCards(list) { /* 只负责渲染 */ }\nfunction bindEvents() { /* 只负责绑定事件 */ }\n```\n\n每个函数**只做一件事**，函数名准确描述它做什么。这就是\"单一职责\"——编程最重要的组织原则之一。" },
  { type: 'explain', title: "什么时候该拆分？", content: "三个信号告诉你\"该拆了\"：\n\n**信号 1：代码块有明确的注释分区**\n如果你的代码里出现了 `// ===== 第一部分 =====` 这样的注释，说明这里应该是一个独立函数。函数名就是最好的\"注释\"。\n\n**信号 2：你复制粘贴了一段代码**\n如果你发现自己复制了某段代码只改了一两个地方——立刻把它提取成一个函数！这叫做 DRY 原则（Don't Repeat Yourself）。\n\n**信号 3：函数超过 20 行**\n这不是死规矩，但如果你写了一个超过 20 行的函数，问问自己：这个函数有没有在做两件事？如果函数名里出现了\"和\"字（\"获取数据并渲染\"），它就该拆成两个。" },
  { type: 'example', title: "📝 拆分前 vs 拆分后", content: "**拆分前（一个函数做三件事）：**\n```js\nfunction setupMusicPage() {\n  // 渲染卡片 — 15 行\n  let cardHTML = \"\";\n  for (let i = 0; i < pieces.length; i++) {\n    cardHTML += `<div class=\"card\"><h3>${pieces[i].name}</h3></div>`;\n  }\n  gallery.innerHTML = cardHTML;\n\n  // 绑定筛选 — 10 行\n  filterBtn.addEventListener(\"click\", function() {\n    let filtered = pieces.filter(/* ... */);\n    // 重新渲染...\n  });\n\n  // 显示统计 — 8 行\n  let total = pieces.length;\n  statsEl.textContent = \"共 \" + total + \" 首曲目\";\n}\n```\n\n**拆分后（三个函数各司其职）：**\n```js\nfunction initPage() {\n  renderCards(pieces);\n  bindFilter();\n  showStats(pieces);\n}\n\nfunction renderCards(list) { /* 只负责渲染 */ }\nfunction bindFilter() { /* 只负责筛选逻辑 */ }\nfunction showStats(list) { /* 只负责显示统计 */ }\n```\n\n现在你可以单独调用 `renderCards(filteredPieces)` 在筛选后重新渲染——这就是拆分的威力！" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器里有一个\"音乐会节目单\"页面，但所有代码都塞在 `setupPage()` 这一个函数里，足足 40 多行！\n\n**你的任务：** 把 `setupPage()` 拆分成几个小函数：\n\n1. **`renderProgram(list)`** — 负责渲染节目单（接收数组参数，方便筛选后重新渲染）\n2. **`bindFilterButtons()`** — 负责给筛选按钮绑定事件\n3. **`updateCount(count)`** — 负责更新底部统计数字\n4. **`initPage()`** — 只负责调用上面三个函数\n\n拆分后，当你点击筛选按钮时，可以直接调用 `renderProgram(filtered)` 来刷新显示——代码逻辑清晰了 10 倍！" }
]

const analogy = "一首 40 分钟的交响曲会分成几个乐章，每个乐章又有自己的主题和发展。如果全部堆在一起，演奏者和听众都会迷失。同样，**当你的函数超过 20 行，就该考虑拆分了**。每个函数只做一件事，就像每个乐章有一个主题。"

const listen = "贝多芬《第五交响曲》— 四个乐章各有独立的性格和主题，但合在一起又是一个完整的作品。好的代码也是如此：每个函数独立清晰，合在一起完成复杂任务。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第五章：JavaScript 进阶 · 第 7 课</span>
      <h2 class="lesson-title">拆分函数 — 把大段乐谱分成清晰的乐章</h2>
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
