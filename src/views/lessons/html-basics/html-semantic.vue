<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么需要语义化？", content: "之前我们一直用 `<div>` 来分组内容。但 `<div>` 本身没有\"含义\"——浏览器不知道一个 `<div>` 是导航栏还是文章正文。\n\n语义化标签用**有名字的标签**来标记不同区域：\n\n- `<header>` — 页头（Logo + 导航）\n- `<nav>` — 导航菜单\n- `<main>` — 页面主要内容\n- `<section>` — 一个内容区块\n- `<article>` — 一篇独立的文章\n- `<footer>` — 页脚（版权、链接）\n\n就像总谱中每个声部都有明确的名字，而不是全部标\"乐器1、乐器2\"。" },
  { type: 'explain', title: "一个典型的页面结构", content: "```html\n<body>\n  <header>\n    <h1>网站标题</h1>\n    <nav>导航链接</nav>\n  </header>\n\n  <main>\n    <section>\n      <h2>第一块内容</h2>\n      <article>一篇文章</article>\n    </section>\n  </main>\n\n  <footer>\n    <p>版权信息</p>\n  </footer>\n</body>\n```\n\n浏览器和搜索引擎看到这个结构，就像指挥看到总谱——一眼就知道每个部分的作用。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码用语义化标签构建了一个音乐网站页面。注意看 `<header>`、`<main>`、`<section>`、`<footer>` 是如何组织的：\n\n```html\n<header>\n  <h1>古典音乐鉴赏</h1>\n  <nav>首页 | 作曲家 | 曲目</nav>\n</header>\n<main>\n  <section>今日推荐</section>\n  <section>本周精选</section>\n</main>\n<footer>© 2026 代码乐章</footer>\n```\n虽然看起来和用 `<div>` 差不多，但这些标签自带\"身份信息\"。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "请在编辑器中：\n\n1. 在 `<main>` 中再添加一个 `<section>`，里面写\"最新评论\"\n2. 在 `<nav>` 中添加一个链接（用 `<a>` 标签）\n3. 试着把某个 `<section>` 换成 `<article>`，思考一下：什么情况下用 article 更合适？" }
]

const analogy = "语义化标签就像**总谱上的声部标注**——第一小提琴、第二小提琴、中提琴、大提琴……每个乐器组有自己的位置和身份。同样，`<header>`、`<main>`、`<footer>` 等标签告诉浏览器和搜索引擎\"这是什么部分\"。"

const listen = "拉威尔《波莱罗》配器总谱 — 每一行谱表标注了乐器名称，清晰的声部结构就像语义化的 HTML。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第一章：HTML 基础 · 第 7 课</span>
      <h2 class="lesson-title">语义化标签 — 给页面一个清晰的结构</h2>
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
