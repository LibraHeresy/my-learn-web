<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "radio — 单选按钮", content: "当用户只能**选一个**时用 radio。同一组 radio 的 `name` 属性必须相同：\n\n```html\n<fieldset>\n  <legend>你最喜欢的时期：</legend>\n\n  <input type=\"radio\" id=\"baroque\" name=\"period\" value=\"baroque\">\n  <label for=\"baroque\">巴洛克时期</label>\n\n  <input type=\"radio\" id=\"classical\" name=\"period\" value=\"classical\">\n  <label for=\"classical\">古典主义时期</label>\n\n  <input type=\"radio\" id=\"romantic\" name=\"period\" value=\"romantic\">\n  <label for=\"romantic\">浪漫主义时期</label>\n</fieldset>\n```\n\n`name` 相同的 radio 互斥——就像单选题，只能圈一个答案。" },
  { type: 'explain', title: "checkbox — 多选按钮", content: "当用户可以**选多个**时用 checkbox：\n\n```html\n<fieldset>\n  <legend>你喜欢的乐器（可多选）：</legend>\n\n  <input type=\"checkbox\" id=\"piano\" name=\"instrument\" value=\"piano\">\n  <label for=\"piano\">🎹 钢琴</label>\n\n  <input type=\"checkbox\" id=\"violin\" name=\"instrument\" value=\"violin\">\n  <label for=\"violin\">🎻 小提琴</label>\n\n  <input type=\"checkbox\" id=\"cello\" name=\"instrument\" value=\"cello\">\n  <label for=\"cello\">🎻 大提琴</label>\n</fieldset>\n```\n\n每个 checkbox 独立开/关——就像配器时选择用哪些乐器。" },
  { type: 'explain', title: "更多实用 input 类型", content: "HTML 提供丰富的输入类型，浏览器会自动优化交互方式：\n\n- `<input type=\"range\" min=\"0\" max=\"100\">` — 滑块，适合选音量、评分\n- `<input type=\"number\" min=\"1\" max=\"10\">` — 数字输入，带增减箭头\n- `<input type=\"color\">` — 颜色选择器\n- `<input type=\"date\">` — 日期选择器\n- `<input type=\"time\">` — 时间选择器\n- `<input type=\"file\">` — 文件上传\n- `<input type=\"search\">` — 搜索框（带清除按钮）\n\n`<fieldset>` + `<legend>` 用来分组：\n```html\n<fieldset>\n  <legend>个人信息</legend>\n  <!-- 相关字段放一起 -->\n</fieldset>\n```" },
  { type: 'example', title: "📝 看例子", content: "下面的表单综合使用了 radio、checkbox 和 range：\n\n```html\n<form>\n  <fieldset>\n    <legend>基础信息</legend>\n    <label>姓名：<input type=\"text\" name=\"name\"></label>\n    <label>练琴时长：<input type=\"range\" min=\"0\" max=\"120\" value=\"30\"> 分钟/天</label>\n  </fieldset>\n\n  <fieldset>\n    <legend>偏好设置</legend>\n    <p>演奏水平：</p>\n    <label><input type=\"radio\" name=\"level\" value=\"beginner\"> 入门</label>\n    <label><input type=\"radio\" name=\"level\" value=\"intermediate\"> 进阶</label>\n    <label><input type=\"radio\" name=\"level\" value=\"advanced\"> 专业</label>\n  </fieldset>\n\n  <fieldset>\n    <legend>擅长乐器</legend>\n    <label><input type=\"checkbox\" name=\"inst\" value=\"piano\"> 钢琴</label>\n    <label><input type=\"checkbox\" name=\"inst\" value=\"violin\"> 小提琴</label>\n    <label><input type=\"checkbox\" name=\"inst\" value=\"voice\"> 声乐</label>\n  </fieldset>\n</form>\n```" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 HTML 标签页，试着：\n\n1. 给\"演奏水平\"增加第 4 个选项\"大师级\"\n2. 给\"擅长乐器\"增加两个选项（如中提琴、长笛）\n3. 添加一个 `<input type=\"color\">` 选择\"最喜欢的音乐色彩\"\n4. 挑战：用 JS 监听 range 滑块的 `input` 事件，实时显示练琴时长数值" }
]

const analogy = "`<input>` 不止能输入文字——就像乐团不只是弦乐。`type=\"radio\"` 像**单选问答**（只有一个正确答案），`type=\"checkbox\"` 像**多选编配**（可以同时选弦乐和管乐），`type=\"range\"` 像**滑音控制**（连续变化的数值）。每个 input 类型都是乐队中的一种\"声部\"，组合使用才能构成完整的音乐表单。"

const listen = "拉威尔《波莱罗》配器分析 — 整部作品用不同乐器依次演奏同一旋律（每种乐器就是一种 input 类型），从长笛到单簧管到巴松管到萨克斯，每一种\"输入方式\"都给主题带来新的色彩。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第一章：HTML 基础 · 第 11 课</span>
      <h2 class="lesson-title">更多输入类型 — 表单的"乐器编配"</h2>
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
