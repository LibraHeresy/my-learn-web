<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "好名字 vs 坏名字", content: "来看一组对比：\n\n**❌ 坏命名（你一个月后根本看不懂）：**\n```js\nlet a = [\"巴赫\", \"莫扎特\", \"贝多芬\"];\nlet b = document.querySelector(\"#c\");\nlet d = document.querySelector(\"#e\");\nd.addEventListener(\"click\", function() {\n  let f = Math.floor(Math.random() * a.length);\n  b.textContent = a[f];\n});\n```\n\n**✅ 好命名（任何人都看得懂）：**\n```js\nlet composers = [\"巴赫\", \"莫扎特\", \"贝多芬\"];\nlet displayEl = document.querySelector(\"#composerDisplay\");\nlet shuffleBtn = document.querySelector(\"#shuffleBtn\");\nshuffleBtn.addEventListener(\"click\", function() {\n  let randomIndex = Math.floor(Math.random() * composers.length);\n  displayEl.textContent = composers[randomIndex];\n});\n```\n\n两者功能完全一样，但可读性天差地别。**好名字让代码自己说话，不需要额外解释。**" },
  { type: 'explain', title: "命名规则速查表", content: "**CSS 类名：** 用小写字母 + 连字符（kebab-case）\n- ✅ `card-title` `music-list` `play-btn`\n- ❌ `CardTitle` `music_list` `a` `b` `c`\n\n**JS 变量名：** 用驼峰命名（camelCase）\n- ✅ `composerName` `totalCount` `likeBtn` `musicList`\n- ❌ `composer_name` `totalcount` `btn` `x`\n\n**JS 函数名：** 用动词开头，描述做什么\n- ✅ `playMusic()` `addCard()` `showMessage()` `calculateTotal()`\n- ❌ `music()` `card()` `message()` `total()`\n\n**常用前缀约定：**\n- 存储 DOM 元素的变量后加 `El`：`titleEl`、`cardEl`、`msgEl`\n- 存储按钮的变量后加 `Btn`：`likeBtn`、`closeBtn`、`submitBtn`\n- 布尔值用 `is` / `has` 开头：`isPlaying`、`hasLiked`" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器里有一个功能完整的页面，但所有的命名都非常糟糕——全是用 `a`、`b`、`c`、`x`、`y` 这样的单字母！\n\n**你的任务：** 不改动任何功能逻辑，只把所有变量名和函数名换成有意义的名字。\n\n重命名清单：\n- `a` → 存放作曲家名字的数组\n- `b` → 显示作曲家名字的 `<p>` 元素\n- `c` → \"换一首\"按钮\n- `d` → 显示添加状态的消息区\n- `e` → \"添加\"按钮\n- `f` → 随机索引\n- `x()` → 随机换一首曲子的函数\n- `y()` → 添加作曲家的函数\n\n换个好名字后，再读一遍你的代码——是不是清晰了很多？" }
]

const analogy = "乐谱上标注的指法标记让演奏者一眼就知道用哪个手指。同样，**好的变量名和类名让阅读代码的人（包括一个月后的你自己）一眼就知道这段代码在做什么**。命名是程序员最被低估的技能——它不改变功能，但能让你写代码的速度快 10 倍。"

const listen = "肖邦《练习曲》Op.10 No.1 — 每一组琶音的指法都经过精心设计，让演奏如流水般自然。好的命名就像好的指法——\"好的命名\"让你读代码时如行云流水。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第五章：JavaScript 进阶 · 第 6 课</span>
      <h2 class="lesson-title">命名就像给音符标注指法 — 让代码自己说话</h2>
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
