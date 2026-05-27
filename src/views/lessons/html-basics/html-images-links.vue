<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "添加图片", content: "纯文字太单调了！用 `<img>` 标签可以插入图片：\n\n```html\n<img src=\"图片地址\" alt=\"图片描述\">\n```\n\n- `src` — 图片的地址（可以是网上链接）\n- `alt` — 图片加载不出来时显示的文字\n\n注意：`<img>` 是**单标签**，不需要写 `</img>`，就像休止符不需要配对！" },
  { type: 'explain', title: "添加链接", content: "用 `<a>` 标签可以创建超链接，点击后跳转到其他页面：\n\n```html\n<a href=\"网址\">点击这里</a>\n```\n\n- `href` — 要跳转的网址\n- 标签中间的文字是显示给用户看的" },
  { type: 'example', title: "📝 完整示例", content: "下面就是编辑器中的代码。结合了图片和链接的个人音乐卡片：\n\n```html\n<h1>肖邦</h1>\n<img src=\"https://oss.tan8.com/yuepuku/155/77798/77798_prev.jpg\" alt=\"作曲家肖像\">\n<p>\n  了解更多，请访问\n  <a href=\"https://zh.wikipedia.org/wiki/肖邦\">肖邦的维基百科</a>\n</p>\n```" },
  { type: 'task', title: "🎯 综合挑战 ✨", content: "这是本章的最后一节课！请在编辑器中修改代码，制作一张属于你自己的\"个人音乐卡片\"：\n\n1. 把 `<h1>` 中的\"肖邦\"改成你喜欢的音乐家\n2. 把 `<img>` 的 `src` 换成你想展示的图片链接\n3. 把 `<a>` 的 `href` 换成你想推荐的网页链接\n4. 试着再加上一个列表，列出这位音乐家的代表作\n\n完成之后，第一章就毕业了！🎉" }
]

const analogy = "`<img>` 像**乐谱中的插图**，为页面增添视觉元素；`<a>` 链接像**反复记号**，指向另一个地方。"

const listen = "德彪西《月光》— 闭上眼睛，让音乐在脑海中描绘画面，就像图片为网页增添色彩。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第一章：HTML 基础 · 第 5 课</span>
      <h2 class="lesson-title">图片与链接 — 丰富你的音乐卡片</h2>
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
