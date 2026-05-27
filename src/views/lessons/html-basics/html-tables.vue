<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "表格的基本结构", content: "表格由外到内有三层标签：\n\n- `<table>` — 整个表格的容器\n- `<tr>` — **表行**（table row），一行\n- `<td>` — **表单元格**（table data），一个格子\n\n```html\n<table>\n  <tr>\n    <td>巴赫</td>\n    <td>巴洛克</td>\n    <td>德国</td>\n  </tr>\n  <tr>\n    <td>肖邦</td>\n    <td>浪漫主义</td>\n    <td>波兰</td>\n  </tr>\n</table>\n```\n\n每一对 `<tr></tr>` 是一行，里面每个 `<td></td>` 是一个格子。" },
  { type: 'explain', title: "表头与分区", content: "`<th>` 代替 `<td>` 可以做**表头**（加粗居中）：\n\n```html\n<tr>\n  <th>作曲家</th>\n  <th>时期</th>\n  <th>国家</th>\n</tr>\n```\n\n`<thead>`、`<tbody>` 把表头和表体分开，方便分别设置样式：\n\n```html\n<table>\n  <thead>\n    <tr><th>列1</th><th>列2</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>数据1</td><td>数据2</td></tr>\n  </tbody>\n</table>\n```" },
  { type: 'explain', title: "合并单元格", content: "有时候一个格子需要跨越多列或多行，用 `colspan` 和 `rowspan`：\n\n- `colspan=\"2\"` — 跨 2 列（水平合并）\n- `rowspan=\"3\"` — 跨 3 行（垂直合并）\n\n```html\n<td colspan=\"2\">这格占了两个列的宽度</td>\n```\n\n就像节目单中的\"中场休息\"横跨整页！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码创建了一张作曲家信息表，有表头和两行数据：\n\n```html\n<table>\n  <thead>\n    <tr>\n      <th>作曲家</th>\n      <th>时期</th>\n      <th>代表作</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>巴赫</td>\n      <td>巴洛克</td>\n      <td>赋格的艺术</td>\n    </tr>\n  </tbody>\n</table>\n```" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "请在编辑器中：\n\n1. 在表格中添加一行新数据，写你喜欢的作曲家\n2. 在表头再加一列（比如\"国家\"），每行也加对应的 `<td>`\n3. 试试在表格下方加一行 `<tr><td colspan=\"3\">更多作曲家敬请期待</td></tr>` 感受合并效果\n4. 挑战：创建一个新的表格，列出你的\"每周练琴计划\"（日期、曲目、时长）" }
]

const analogy = "表格就像一张**曲目单**或**节目表**——用行列分明的结构组织信息。每一行是一个条目，每一列是一种属性，就像节目中第一列是作曲家、第二列是曲目、第三列是时长。"

const listen = "莫扎特歌剧《费加罗的婚礼》— 歌剧中复杂的人物关系和章节结构，就像表格中纵横交错的行与列。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第一章：HTML 基础 · 第 9 课</span>
      <h2 class="lesson-title">表格 — 整理你的音乐数据</h2>
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
