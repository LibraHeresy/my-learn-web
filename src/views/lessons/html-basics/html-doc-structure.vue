<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "每个网页都有一副\"骨架\"", content: "你之前写的 `<h1>` 和 `<p>` 代码，实际上运行在一个看不见的文档结构里。完整的 HTML 页面长这样：\n\n```html\n<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>我的页面标题</title>\n</head>\n<body>\n  <h1>你好，音乐世界！</h1>\n  <p>这是页面上可见的内容。</p>\n</body>\n</html>\n```\n\n这就是一份\"标准乐谱\"——每一部分都有固定的位置和意义。" },
  { type: 'explain', title: "逐行读懂这个结构", content: "**`<!DOCTYPE html>`** — 声明\"这是 HTML5 文档\"。就像乐谱封面上写着\"钢琴独奏谱\"，浏览器看到这行就知道用什么规则来解析页面。\n\n**`<html lang=\"zh-CN\">`** — 整个文档的根元素，`lang` 属性告诉浏览器页面是什么语言。\n\n**`<head>` — 页面\"元信息\"区**，不显示在页面上：\n- `<meta charset=\"UTF-8\">` — 声明字符编码（**必须写！**不然中文会乱码）\n- `<meta name=\"viewport\" ...>` — 告诉手机浏览器正确缩放（响应式必备）\n- `<title>` — 浏览器标签页上显示的文字\n\n**`<body>` — 页面\"正文\"**，你之前写的所有内容都放在这里面。" },
  { type: 'explain', title: "head 中的其他重要元素", content: "`<head>` 区还可以包含：\n\n```html\n<head>\n  <!-- 链接 CSS 样式文件 -->\n  <link rel=\"stylesheet\" href=\"style.css\">\n\n  <!-- 网站的图标（favicon） -->\n  <link rel=\"icon\" href=\"favicon.ico\">\n\n  <!-- SEO 描述 -->\n  <meta name=\"description\" content=\"一个学习编程的音乐主题网站\">\n</head>\n```\n\n虽然 `<head>` 里的内容不直接显示在页面上，但它像乐谱上的速度标记 Andante 一样——决定了页面如何被理解和渲染。" },
  { type: 'example', title: "📝 看例子", content: "现在你右侧编辑器中看到的代码，就是放在 `<body>` 里面的。但这个教学平台已经帮你写好了 `<head>` 和 `<body>` 的框架——这就是为什么你只需要写内容部分的代码。\n\n当你未来自己创建一个 `.html` 文件时，记得要先写完整的文档结构！\n\n```html\n<!-- 你将来会这样开始一个网页 -->\n<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>我的音乐博客</title>\n</head>\n<body>\n  <!-- 你的内容写在这里 -->\n</body>\n</html>\n```" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "目前编辑器里只显示 body 内容。试试：\n\n1. 打开浏览器开发者工具（F12），在 Elements/元素 面板中查看页面完整结构——你能找到 `<head>` 和 `<body>` 标签吗？\n2. 修改 `<h1>` 标签中的标题\n3. 挑战：在 HTML 中写两组内容——用 `<!-- -->` 注释掉其中一组，看效果" }
]

const analogy = "每份乐谱都有固定的格式：左上角写曲名、右上角标速度、第一行是谱号调号、最后画终止线。HTML 文档也有标准结构——`<!DOCTYPE>` 是\"这是乐谱\"的声明、`<head>` 是页面的\"调号信息\"、`<body>` 是\"乐谱正文\"。了解这个结构，你才算真正看懂了一份网页\"乐谱\"。"

const listen = "巴赫《哥德堡变奏曲》咏叹调 — 开篇的 Aria 像 `<head>` 宣布主题框架，随后的 30 段变奏像 `<body>` 承载着丰富变化的内容，最终回到 Aria 就像 `</html>` 的闭环。每一份乐谱都有开端和终结——歌德堡的结构严谨清晰，正如一份标准的 HTML 文档。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第一章：HTML 基础 · 第 2 课</span>
      <h2 class="lesson-title">HTML 文档结构 — 了解网页的"乐谱格式"</h2>
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
