<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "什么是表单？", content: "表单（`<form>`）用来收集用户输入的信息。你在网上填过的所有东西——注册、搜索、评论——都是表单。\n\n表单的核心标签：\n\n- `<form>` — 整个表单的容器\n- `<input>` — 输入框，最常用的表单元素\n- `<label>` — 标签，描述输入框的用途\n- `<textarea>` — 多行文本输入框\n- `<select>` + `<option>` — 下拉选择框\n- `<button>` — 提交按钮" },
  { type: 'explain', title: "各种输入类型", content: "`<input>` 标签通过 `type` 属性可以变成不同类型的输入框：\n\n- `type=\"text\"` — 普通文本输入\n- `type=\"email\"` — 邮箱地址输入\n- `type=\"password\"` — 密码输入（显示为圆点）\n- `type=\"date\"` — 日期选择器\n- `placeholder=\"...\"` — 输入框中的提示文字\n\n```html\n<input type=\"text\" placeholder=\"请输入你的名字\">\n<input type=\"email\" placeholder=\"请输入邮箱\">\n<input type=\"date\">\n```\n\n不同的 type 就像不同的乐器，各有各的用途！" },
  { type: 'explain', title: "下拉框与多行文本", content: "`<select>` 创建下拉选择框，`<option>` 是其中的选项：\n\n```html\n<select>\n  <option>巴赫</option>\n  <option>莫扎特</option>\n  <option>肖邦</option>\n</select>\n```\n\n`<textarea>` 创建多行文本输入框，用 `rows` 设置行数：\n\n```html\n<textarea rows=\"3\" placeholder=\"请写下你的感想...\"></textarea>\n```\n\n`<label>` 的 `for` 属性对应 `<input>` 的 `id`，点击标签文字时输入框会自动获得焦点——就像节目单上\"独奏者：\"后面跟着一条填空线。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码创建了一张音乐偏好调查表。包含了文本输入、下拉选择和多行文本框：\n\n```html\n<form>\n  <label for=\"name\">你的名字：</label>\n  <input type=\"text\" id=\"name\" placeholder=\"请输入你的名字\">\n\n  <label for=\"composer\">最喜欢的作曲家：</label>\n  <select id=\"composer\">\n    <option>请选择...</option>\n    <option>巴赫</option>\n    <option>肖邦</option>\n  </select>\n\n  <label for=\"comment\">想说的话：</label>\n  <textarea id=\"comment\" rows=\"3\"></textarea>\n\n  <button type=\"submit\">提交</button>\n</form>\n```\n切换到预览区，可以和这个表单互动！" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "请在编辑器中：\n\n1. 在 `<select>` 中添加两个你喜欢的作曲家选项\n2. 给表单增加一个 `<input type=\"date\">`，让用户选择\"最早接触音乐的日期\"\n3. 增加一个 `<input type=\"email\">`，让用户填写邮箱\n4. 试试修改 `<textarea>` 的 `rows` 从 `3` 改成 `5`，看看输入框变大\n5. 在预览区中实际填写表单，感受交互体验" }
]

const analogy = "表单就像**报名表**或**节目征集单**——听众填写他们的音乐偏好，就像演奏者在报名表上写下自己的声部。`<input>` 是填空格，`<label>` 是问题，`<button>` 是\"提交\"按钮。"

const listen = "小约翰·施特劳斯《蓝色多瑙河》— 圆舞曲的互动性就像表单与用户的对话，你来我往，优雅流畅。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第一章：HTML 基础 · 第 10 课</span>
      <h2 class="lesson-title">表单 — 收集你的音乐信息</h2>
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
