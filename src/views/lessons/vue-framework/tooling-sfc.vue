<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: ".vue 文件的三段结构", content: "打开 `src/App.vue`，你会看到：\n\n```vue\n<script setup>\n// 1. 逻辑区 — 数据和函数\nimport { ref } from 'vue'\n\nconst message = ref(\"你好，Vue！\")\n<\/script>\n\n<template>\n  <!-- 2. 模板区 — HTML 结构 -->\n  <h1>{{ message }}</h1>\n</template>\n\n<style scoped>\n/* 3. 样式区 — CSS */\nh1 {\n  color: #8B2E2E;\n}\n</style>\n```\n\n**三段各司其职：**\n- `<script setup>` — JavaScript 逻辑（数据、函数、计算属性等）。`setup` 关键词表示使用 Vue 3 的组合式 API 语法\n- `<template>` — HTML 模板（你在之前课程学的所有标签和指令都在这里：`{{ }}`、`v-if`、`v-for`、`@click` 等）\n- `<style scoped>` — CSS 样式。`scoped` 关键词让这些样式只作用于当前组件，不会影响其他组件\n\n和之前 CDN 方式对比：\n\n**CDN 方式（浏览器内）：**\n- JS、HTML、CSS 分在三个独立的编辑区\n- HTML 需要一个 `<div id=\"app\">` 作为挂载点\n- `createApp({...}).mount(\"#app\")` 手动挂载\n\n**.vue 文件方式（工程化）：**\n- 三段写在一个 `.vue` 文件里，一个组件一个文件\n- 不需要 `createApp` 和 `mount`——Vite 自动处理\n- 组件之间通过 `import` 引入" },
  { type: 'explain', title: "组件的引入和使用", content: "在工程化项目中，组件就是 `.vue` 文件：\n\n**定义一个组件 `MusicCard.vue`：**\n```vue\n<script setup>\ndefineProps([\"name\", \"composer\"])\n<\/script>\n\n<template>\n  <div class=\"card\">\n    <h3>{{ name }}</h3>\n    <p>{{ composer }}</p>\n  </div>\n</template>\n\n<style scoped>\n.card {\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 16px;\n}\n</style>\n```\n\n**在 `App.vue` 中使用：**\n```vue\n<script setup>\nimport MusicCard from './components/MusicCard.vue'\n<\/script>\n\n<template>\n  <MusicCard name=\"夜曲 Op.9 No.2\" composer=\"肖邦\" />\n  <MusicCard name=\"月光\" composer=\"德彪西\" />\n</template>\n```\n\n注意：组件名在模板中写成 PascalCase（`<MusicCard>`），Vue 会自动识别。" },
  { type: 'task', title: "🎯 你的任务 ✨", content: "1. 在 `src/components/` 下新建 `HelloMusic.vue`\n\n2. 写一个简单的组件：显示一句你最喜欢的音乐名言\n\n3. 在 `App.vue` 中 import 并使用这个组件\n\n4. 给组件添加 scoped 样式（字体、颜色、边框）\n\n5. 把 `<style scoped>` 改成 `<style>`（去掉 scoped），观察和之前有什么不同？\n\n> 💡 scoped 的作用：每个组件的样式只影响自己的模板，不会\"泄漏\"到其他组件。这是工程化的一大优势。" },
  { type: 'hint', title: "💡 文件命名约定", content: "组件文件通常使用 PascalCase 命名（首字母大写）：\n- ✅ `MusicCard.vue`\n- ✅ `HelloMusic.vue`\n- ❌ `musicCard.vue`（虽然也能用，但不推荐）\n- ❌ `music-card.vue`（同上）\n\n这就像音乐术语用意大利语标记——不是强制规定，但全世界通用的约定。" }
]

const analogy = "一份完整的乐器分谱包含三个部分：**乐谱内容**（template，演奏什么）、**演奏标记**（script，怎么演奏——强弱、速度）、**声部说明**（style，这个声部的音色特征）。Vue 的单文件组件（`.vue` 文件）恰好也是三段：`<template>`、`<script setup>`、`<style scoped>`——合在一起，就是一个独立的、可复用的组件。"

const listen = "维瓦尔第《四季·春》第一乐章 — 弦乐齐奏（template，主体旋律）、独奏小提琴的华彩（script，动态逻辑）、通奏低音的持续伴奏（style，底色与氛围）。三段各司其职，合在一起是一首完美的协奏曲。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第八章：Vue 实战 · 第 1 课</span>
      <h2 class="lesson-title">单文件组件 — .vue 文件的三段式</h2>
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
