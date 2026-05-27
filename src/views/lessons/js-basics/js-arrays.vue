<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "创建和访问数组", content: "数组用 `[]` 创建，每个值用逗号分隔：\n\n```js\nlet composers = [\"巴赫\", \"莫扎特\", \"贝多芬\", \"肖邦\"];\n```\n\n- `composers[0]` — 第 1 项（\"巴赫\"），索引从 0 开始\n- `composers[2]` — 第 3 项（\"贝多芬\"）\n- `composers.length` — 数组长度（4）\n\n就像曲目单上第一首是 0 号，不是 1 号——这是编程的习惯。" },
  { type: 'explain', title: "数组常用方法", content: "数组有一套强大的操作方法：\n\n- `.push(\"德彪西\")` — 在末尾添加一项\n- `.pop()` — 移除末尾一项\n- `.join(\"、\")` — 用指定分隔符拼接为字符串\n\n```js\nlet composers = [\"巴赫\", \"莫扎特\"];\ncomposers.push(\"肖邦\");  // 末尾追加\n// composers 现在是 [\"巴赫\", \"莫扎特\", \"肖邦\"]\n\nlet text = composers.join(\" | \");\n// text 是 \"巴赫 | 莫扎特 | 肖邦\"\n```\n\n`.join()` 特别实用——把一个数组变成页面上的文字！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码维护了一个作曲家数组，用 `.push()` 添加新名字，用 `.join()` 显示到页面上：\n\n```js\nlet composers = [\"巴赫\", \"莫扎特\", \"贝多芬\"];\n\n// 显示列表\nlet text = composers.join(\" · \");\ndisplay.textContent = text;\n\n// 添加新作曲家\ncomposers.push(\"肖邦\");\ntext = composers.join(\" · \");\ndisplay.textContent = text;\n```\n切换到 JS 标签页，输入一个名字点击添加，看列表实时更新。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 标签页，试试：\n\n1. 在预览区输入框输入\"德彪西\"点添加，看列表变化\n2. 修改 `.join()` 的分隔符，从 `\" · \"` 改成 `\" | \"` 或 `\", \"`\n3. 修改数组初始值，换成你自己喜欢的作曲家\n4. 挑战：添加一个\"删除最后一位\"按钮（用 `.pop()` 方法）" }
]

const analogy = "数组就像一张**歌单/曲目列表**——把多个相关的值按顺序组织在一起。`[\"巴赫\", \"莫扎特\", \"贝多芬\"]` 就像写在纸上的三首曲目，用 `[0]` 可以取第一首，用 `.push()` 可以在末尾添加新曲目。"

const listen = "柴可夫斯基《胡桃夹子》组曲 — 舞剧中包含\"进行曲\"\"糖果仙子之舞\"\"花之圆舞曲\"等多段舞曲，就像数组中的不同条目，每段有独立的索引和性格。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 8 课</span>
      <h2 class="lesson-title">数组 — 存储你的曲目列表</h2>
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
