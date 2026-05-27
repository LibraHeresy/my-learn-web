<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么需要 localStorage？", content: "目前你写的所有页面都有一个共同的问题：**刷新页面后，所有数据都丢失了**。\n\n收藏的曲目？没了。输入的列表？清空了。计数器？归零了。\n\n这是因为 JavaScript 变量只存在于**当前页面会话**中。刷新页面等于重新开始——所有变量重新初始化。\n\n`localStorage` 解决的就是这个问题：它把数据存在浏览器里，和页面会话无关。\n\n```js\n// 存数据\nlocalStorage.setItem(\"userName\", \"小雅\");\n\n// 取数据（刷新页面后依然能读到！）\nlet name = localStorage.getItem(\"userName\");  // \"小雅\"\n\n// 删数据\nlocalStorage.removeItem(\"userName\");\n\n// 清空全部\nlocalStorage.clear();\n```" },
  { type: 'explain', title: "存储复杂数据：JSON.stringify 和 JSON.parse", content: "localStorage 只能存储**字符串**。如果你要存数组或对象，需要用 JSON 转换：\n\n```js\n// 存对象/数组：先用 JSON.stringify 转成字符串\nlet pieces = [\n  { name: \"布兰登堡协奏曲\", period: \"巴洛克\" },\n  { name: \"夜曲 Op.9 No.2\", period: \"浪漫主义\" }\n];\nlocalStorage.setItem(\"myPieces\", JSON.stringify(pieces));\n\n// 取对象/数组：先用 JSON.parse 转回对象\nlet saved = JSON.parse(localStorage.getItem(\"myPieces\"));\n// saved 现在是真正的数组，可以正常使用！\nconsole.log(saved[0].name);  // \"布兰登堡协奏曲\"\n```\n\n**常用模式：加载 + 保存**\n```js\n// 页面启动时：尝试从 localStorage 加载数据\nlet pieces = JSON.parse(localStorage.getItem(\"myPieces\")) || [];\n\nfunction saveData() {\n  localStorage.setItem(\"myPieces\", JSON.stringify(pieces));\n}\n\n// 每次修改数据后调用 saveData()\npieces.push(newPiece);\nsaveData();\nrender(pieces);\n```\n\n> 💡 提示：`localStorage.getItem` 返回 `null` 如果 key 不存在，所以用 `|| []` 给一个默认值。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器里有一个收藏列表页面。和以前一样——刷新后数据就没了。\n\n**你的任务：给它加上持久化**\n\n1. 页面启动时，从 localStorage 加载数据（用 `JSON.parse`）\n2. 写一个 `saveData()` 函数，把 `pieces` 数组存入 localStorage（用 `JSON.stringify`）\n3. 每次添加或删除曲目后，调用 `saveData()`\n4. 刷新页面——你的收藏还在！\n\n验证：添加几首曲目 → 刷新浏览器 → 数据还在。这感觉就像第一次\"拥有了\"自己写的页面。" }
]

const analogy = "每次排练结束后，乐谱不会消失——它被归档保存，下次排练时翻出来继续用。**localStorage** 就是浏览器的\"归档柜\"：你把数据存进去，刷新页面、关闭浏览器、甚至重启电脑后，数据还在那里等你。"

const listen = "舒伯特《冬之旅》— 这部声乐套曲讲述一个流浪者的旅程，每首歌都是旅途的一段记忆。localStorage 就像主人公的日记——旅程中的每一个足迹都被保存下来，刷新页面就像翻开新的一页，但记忆永远保留。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第六章：异步与数据 · 第 1 课</span>
      <h2 class="lesson-title">localStorage — 给数据一个"永久的家"</h2>
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
