<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "选中一组元素", content: "`querySelectorAll` 返回所有匹配的元素列表（NodeList）：\n\n```js\nlet cards = document.querySelectorAll(\".card\");\n```\n\nNodeList 可以和数组一样用 `forEach` 遍历：\n\n```js\ncards.forEach(function(card) {\n  card.style.border = \"2px solid gold\";\n});\n```\n\n也支持索引：\n```js\ncards[0].style.background = \"#FFFAF2\";  // 第一张\ncards[1].style.background = \"#F0F8FF\";  // 第二张\n```" },
  { type: 'explain', title: "classList — 批量切换样式类", content: "`classList` 比直接操作 `style` 更优雅，配合 CSS 类使用：\n\n- `.classList.add(\"active\")` — 添加类\n- `.classList.remove(\"active\")` — 移除类\n- `.classList.toggle(\"active\")` — 切换（有则删，无则加）\n- `.classList.contains(\"active\")` — 判断是否包含\n\n```js\nlet cards = document.querySelectorAll(\".card\");\n\ncards.forEach(function(card) {\n  card.classList.add(\"highlighted\");\n});\n```\n\n然后 CSS 中定义 `.highlighted` 的样式即可——JS 负责逻辑，CSS 负责外观，各司其职。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码有 5 张乐器卡片。三个按钮分别实现\"全选高亮\"\"取消高亮\"\"切换 '弦乐' 类\"：\n\n```js\n// 高亮全部\nlet cards = document.querySelectorAll(\".card\");\ncards.forEach(function(card) {\n  card.classList.add(\"highlighted\");\n});\n\n// 只看弦乐\ncards.forEach(function(card) {\n  card.classList.toggle(\"hidden\", !card.classList.contains(\"strings\"));\n});\n```\n切换到 JS 标签页查看完整代码，预览区点击按钮试试批量效果。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 和预览区，试试：\n\n1. 点击\"高亮全部\"看效果\n2. 点击\"只看弦乐\"看过滤效果\n3. 修改 `#showAllBtn` 的逻辑，把 `card.classList.remove(\"hidden\")` 改成移除高亮\n4. 挑战：新增一个按钮\"高亮管乐\"，只高亮 class 包含 `winds` 的卡片" }
]

const analogy = "`querySelector` 指一个元素就像指挥指向**一位独奏者**，而 `querySelectorAll` 就像指挥同时对**整个弦乐声部**做统一手势——用一条指令同时操作一群元素。"

const listen = "斯特拉文斯基《春之祭》— 弦乐组全员同时奏响的强力和弦，一声令下全声部同步发力，就像 `querySelectorAll` 批量修改所有匹配元素的样式。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 11 课</span>
      <h2 class="lesson-title">批量 DOM 操作 — 指挥整个声部</h2>
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
