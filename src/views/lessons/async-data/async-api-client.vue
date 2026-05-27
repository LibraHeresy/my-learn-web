<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么需要封装？", content: "之前我们把 fetch 直接写在业务逻辑里。随着项目变大，问题来了：\n\n- 每个接口都要重复写 `fetch(BASE_URL + '/...')`\n- 每个请求都要重复检查 `response.ok`\n- 基础 URL 改了要改几十处\n- 没有统一的错误处理\n\n**解决方式：** 创建一个 `apiClient` 模块，统一管理所有请求。" },
  { type: 'example', title: "📝 基础 API 客户端", content: "```js\n// api.js — 你的\"乐务\"\nconst BASE_URL = 'https://api.example.com'\n\nasync function request(path, options = {}) {\n  const url = BASE_URL + path\n  const response = await fetch(url, {\n    headers: {\n      'Content-Type': 'application/json',\n      ...options.headers  // 合并自定义 headers\n    },\n    ...options\n  })\n  if (!response.ok) {\n    throw new Error(\\`请求失败：\\${response.status}\\`)\n  }\n  return response.json()\n}\n\n// 语义化方法\nexport const api = {\n  get: (path) => request(path),\n  post: (path, body) => request(path, {\n    method: 'POST',\n    body: JSON.stringify(body)\n  }),\n  delete: (path) => request(path, { method: 'DELETE' })\n}\n```" },
  { type: 'example', title: "📝 使用封装后的 API", content: "对比前后的代码：\n\n```js\n// ❌ 未封装：每个地方都要写完整 fetch\nconst res = await fetch(BASE_URL + '/pieces', {\n  headers: { 'Content-Type': 'application/json' }\n})\nif (!res.ok) throw new Error('请求失败')\nconst data = await res.json()\n\n// ✅ 封装后：一行搞定\nconst data = await api.get('/pieces')\n```\n\n封装的好处：\n- 代码量减少 80%\n- 修改 BASE_URL 只改一处\n- 错误处理统一，不会遗漏\n- 可以方便地添加日志、token 等功能" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器中有一个不完整的 `api` 对象。请完成：\n\n1. 实现 `api.get(path)` 方法\n2. 请求 `jsonplaceholder.typicode.com/posts`\n3. 返回解析后的 JSON 数据\n4. 用你封装好的 `api.get()` 获取数据，取前 2 条显示" },
  { type: 'hint', title: "💡 提示", content: "```js\nconst BASE_URL = 'https://jsonplaceholder.typicode.com'\n\nconst api = {\n  get: async (path) => {\n    const res = await fetch(BASE_URL + path)\n    if (!res.ok) throw new Error('请求失败')\n    return res.json()\n  }\n}\n```" }
]

const analogy = "专业乐团有乐务（stage manager），负责处理所有后勤——联系场地、安排排练、协调乐器。你不会让指挥跑去订盒饭。同样，把所有的 fetch 逻辑封装到专门的 API 模块中，让代码各司其职。"

const listen = "柴可夫斯基《胡桃夹子》— 每个角色（糖梅仙子、花之圆舞曲、俄罗斯舞曲）都有明确的\"职责\"，合在一起却有统一的风格。好的 API 模块设计也是如此。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第六章：异步与数据 · 第 6 课</span>
      <h2 class="lesson-title">封装 API 客户端 — 打造你的"专属乐务"</h2>
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
