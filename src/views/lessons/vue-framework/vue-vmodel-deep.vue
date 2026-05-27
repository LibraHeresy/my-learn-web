<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "v-model 的本质", content: "`v-model` 是 Vue 中最常用的指令之一。它实际是 `v-bind:value` + `v-on:input` 的语法糖：\n\n```vue\n<!-- 这两行等价 -->\n<input v-model=\"name\">\n<input :value=\"name\" @input=\"name = $event.target.value\">\n```\n\n它做了什么？\n1. 把 `name` 的值绑定到 input 的 value（数据 → 视图）\n2. 当用户输入时，自动更新 `name`（视图 → 数据）\n\n这就是**双向绑定**——数据和视图始终保持同步。" },
  { type: 'example', title: "📝 不同表单元素的 v-model", content: "```vue\n<script setup>\nimport { ref } from 'vue'\n\nconst text = ref('')          // 文本输入\nconst checked = ref(false)     // 复选框\nconst selected = ref('')      // 单选/下拉\nconst options = ref([])        // 多选\n<\/script>\n\n<template>\n  <!-- 文本 -->\n  <input v-model=\"text\" placeholder=\"输入曲名\">\n  <p>你输入了：{{ text }}</p>\n\n  <!-- 复选框 -->\n  <label><input type=\"checkbox\" v-model=\"checked\"> 已收藏</label>\n\n  <!-- 下拉选择 -->\n  <select v-model=\"selected\">\n    <option value=\"\">选择时期</option>\n    <option>巴洛克</option>\n    <option>古典主义</option>\n    <option>浪漫主义</option>\n  </select>\n  <p>选中：{{ selected }}</p>\n</template>\n```\n\n每种表单元素都能用 `v-model`，Vue 自动处理不同类型的事件。" },
  { type: 'example', title: "📝 v-model 修饰符", content: "修饰符让你精确控制 v-model 的行为：\n\n```vue\n<!-- .lazy：不在 input 时更新，在 change 时更新 -->\n<input v-model.lazy=\"name\">\n\n<!-- .number：自动转为数字 -->\n<input v-model.number=\"age\" type=\"text\">\n\n<!-- .trim：自动去除首尾空格 -->\n<input v-model.trim=\"title\">\n```\n\n这些修饰符就像音符上的标记——`.lazy` 是延音记号，`.number` 是指法标注，`.trim` 是休止符前的渐弱。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "在你的 `music-collection` 项目中，用 `v-model` 实现：\n\n1. **添加曲目表单：** 曲名、作曲家、时期——三个输入框都用 v-model\n2. **筛选下拉框：** 用 v-model 绑定选中的时期，配合 computed 筛选列表\n3. **收藏开关：** 用 checkbox + v-model 实现收藏/取消收藏\n\n完成后，你会发现：没有一行 `addEventListener`、没有一行 `.value = ...`——这就是 Vue 的优雅。" }
]

const analogy = "在四手联弹中，两位演奏者需要完美默契：一个人弹主旋律，另一个人同时配合，两人互相倾听、即时响应。`v-model` 就是数据和表单之间的\"四手联弹\"——用户输入，数据更新；数据变化，表单自动显示。"

const listen = "勃拉姆斯《匈牙利舞曲第一号》— 钢琴四手联弹的经典曲目。两个声部你来我往、相互呼应，正如 v-model 在前端数据和用户输入之间的\"双向默契\"。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第八章：Vue 实战 · 第 8 课</span>
      <h2 class="lesson-title">v-model 深入 — 双向绑定的"默契"</h2>
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
