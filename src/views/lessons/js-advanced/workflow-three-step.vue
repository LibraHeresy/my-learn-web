<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么顺序很重要？", content: "在乐理篇中，你已经学会了三门\"乐器\"：\n- **HTML**（HyperText Markup Language，超文本标记语言）— 页面的骨架\n- **CSS**（Cascading Style Sheets，层叠样式表）— 页面的外观\n- **JS / JavaScript** — 页面的\"大脑\"，让它能听你的指令做出反应\n\n但从零开始构建一个页面时，**按什么顺序写**比写什么更重要。\n\n标准的三段工作流：\n\n**第一步：HTML 结构** — 把页面上所有内容先用标签写出来\n- 标题、段落、图片、按钮……先全部摆上去\n- 不关心颜色、大小、位置\n- 就像先把音符写在五线谱上\n\n**第二步：CSS 样式** — 给每个元素穿上合适的\"衣服\"\n- 颜色、字体、间距、背景……\n- 从外到内，从大到小\n- 就像给旋律配上和声与音色\n\n**第三步：JS（JavaScript）交互** — 让页面\"动起来\"\n- 点击按钮会发生什么？\n- 用户输入后如何响应？\n- 就像指挥标注演奏法：这里渐强，那里渐慢\n\n> 💡 **关于 JS 和 JavaScript**：JS 是 JavaScript 的缩写，它们是同一个东西。就像\"贝多芬\"有时被简称为\"贝爷\"——JS 就是 JavaScript 的昵称。" },
  { type: 'explain', title: "倒过来写会怎样？", content: "新手常犯的错误是：一上来就写 CSS 或 JS，结果 HTML 结构老在变，前面写的样式和逻辑全乱了。\n\n就像一个作曲家先写好配器再改旋律——每次改旋律都得重新配器，浪费时间。\n\n**正确做法：先让 HTML 稳定下来，确认结构是对的，再动手写 CSS 和 JS。** 这就是乐理篇把三门语言分开教的原因——先熟悉每件\"乐器\"，现在合奏篇教你如何一起演奏它们。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器里有一个空的起始模板。请按照三段工作流，从零构建一个 **\"作曲家名言\"卡片**：\n\n**第一步（HTML）：** 写一个 `<div>`，里面包含一个标题 `<h2>`、一句名言 `<p>`、一个 `<button>`\n\n**第二步（CSS）：** 给卡片加背景色、圆角、内边距；给按钮加样式让它好看\n\n**第三步（JS）：** 准备一个名言数组，让按钮点击后随机换一句名言\n\n记住：一步一步来！先确保 HTML 在预览中能看到，再写 CSS，最后写 JS。" }
]

const analogy = "作曲家从不一开始就写满整份总谱。通常先写旋律线（HTML），再配和声与配器（CSS），最后标注强弱与速度变化（JS）。写网页也一样——**永远先写结构，再写样式，最后写交互**。跳过任何一步都会让后面的工作变得混乱。"

const listen = "拉威尔《波莱罗》— 从一支长笛的简单旋律开始，逐步加入更多乐器，最后整个乐团爆发出磅礴的声响。这就是\"先骨架、再装饰、后互动\"的完美音乐示范。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第五章：JavaScript 进阶 · 第 1 课</span>
      <h2 class="lesson-title">三段工作流 — HTML → CSS → JS 的正确顺序</h2>
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
