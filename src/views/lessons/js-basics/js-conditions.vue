<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "if 语句 — 代码的\"如果\"", content: "`if` 后面跟一个**条件**（真或假），条件为真时执行花括号里的代码：\n\n```js\nlet score = 85;\n\nif (score >= 80) {\n  console.log(\"优秀！\");\n}\n```\n\n比较运算符：\n- `===` — 等于（推荐）\n- `!==` — 不等于\n- `>` / `<` — 大于/小于\n- `>=` / `<=` — 大于等于/小于等于\n\n就像评委打分：分数 ≥ 80 才算优秀。" },
  { type: 'explain', title: "else 与 else if — 多分岔路", content: "`else` 处理\"否则\"的情况，`else if` 添加更多分岔：\n\n```js\nlet score = 75;\n\nif (score >= 90) {\n  console.log(\"金奖！🥇\");\n} else if (score >= 80) {\n  console.log(\"银奖！🥈\");\n} else if (score >= 60) {\n  console.log(\"铜奖🥉\");\n} else {\n  console.log(\"继续努力！\");\n}\n```\n\n逻辑运算符：\n- `&&` — 并且（两个条件都成立）\n- `||` — 或者（任意一个成立）\n\n```js\nif (score >= 80 && score < 90) {\n  console.log(\"优秀但未达金奖\");\n}\n```" },
  { type: 'example', title: "📝 看例子", content: "下面的代码是一个作曲家答题器。输入答案后点击提交，JS 判断你的答案是否正确：\n\n```js\nlet answer = document.querySelector(\"#answer\").value;\n\nif (answer === \"肖邦\") {\n  display.textContent = \"✓ 回答正确！\";\n} else {\n  display.textContent = \"✗ 再想想？提示：他是波兰人\";\n}\n```\n切换到 JS 标签页，看 submit 按钮的点击事件中完整的 if/else 逻辑。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 标签页，试试：\n\n1. 在预览区输入\"肖邦\"点击提交，看正确反馈\n2. 输入别的名字点击提交，看 else 分支的反馈\n3. 在 if 中增加一个条件：用 `&&` 同时判断两个输入框\n4. 挑战：增加一个 `else if` 分支，判断是否为空（`=== \"\"`）" }
]

const analogy = "`if/else` 就像乐谱中的**反复记号**——满足条件就跳转，不满足就继续。也像**评委打分**：如果音准正确就给通过，否则请再练一遍。条件判断让代码有了\"决策能力\"。"

const listen = "巴赫《赋格的艺术》— 主题在每次出现时根据对位规则做出不同选择（进入、等待、转调），就像 if/else 根据条件执行不同的代码分支。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 7 课</span>
      <h2 class="lesson-title">条件判断 — 代码的分岔路口</h2>
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
