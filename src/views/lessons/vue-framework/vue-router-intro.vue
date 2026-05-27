<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么需要 Router？", content: "至此你的 Vue 应用只有一个页面。但实际上，一个完整的应用通常有：\n\n- 首页（作品列表）\n- 详情页（单个作品详情）\n- 关于页\n- 404 页面\n\nVue Router 让你在不刷新页面的情况下切换\"页面\"——URL 变了，内容变了，但页面没有白屏刷新。这就是**单页应用（SPA）**。" },
  { type: 'example', title: "📝 基础路由设置", content: "```js\n// src/router/index.js\nimport { createRouter, createWebHistory } from 'vue-router'\nimport Home from '../views/Home.vue'\nimport Detail from '../views/Detail.vue'\n\nconst router = createRouter({\n  history: createWebHistory(),\n  routes: [\n    { path: '/', component: Home },\n    { path: '/piece/:id', component: Detail }  // 动态路由\n  ]\n})\n\nexport default router\n```\n\n在 `main.js` 中注册：\n```js\nimport { createApp } from 'vue'\nimport router from './router'\nimport App from './App.vue'\n\ncreateApp(App).use(router).mount('#app')\n```" },
  { type: 'example', title: "📝 <router-link> 和 <router-view>", content: "```vue\n<!-- App.vue — 布局 -->\n<template>\n  <nav>\n    <!-- 导航链接：to 是目标路径 -->\n    <router-link to=\"/\">🏠 首页</router-link>\n    <router-link to=\"/about\">ℹ️ 关于</router-link>\n  </nav>\n\n  <!-- 路由出口：匹配的组件渲染在这里 -->\n  <router-view />\n</template>\n```\n\n```vue\n<!-- Detail.vue — 获取路由参数 -->\n<script setup>\nimport { useRoute } from 'vue-router'\nconst route = useRoute()\nconst pieceId = route.params.id  // 来自 /piece/:id\n<\/script>\n\n<template>\n  <p>正在查看作品：{{ pieceId }}</p>\n</template>\n```\n\n`<router-link>` 替代 `<a href>`。`<router-view>` 是页面内容的\"插座\"。" },
  { type: 'example', title: "📝 编程式导航", content: "有时候不能只用 `<router-link>`，需要在 JS 中跳转：\n\n```vue\n<script setup>\nimport { useRouter } from 'vue-router'\nconst router = useRouter()\n\nfunction goToDetail(id) {\n  router.push(\\`/piece/\\${id}\\`)  // 跳转到详情页\n}\n\nfunction goBack() {\n  router.back()  // 返回上一页\n}\n<\/script>\n```\n\n`router.push()` 就像点击链接，`router.back()` 就像按浏览器的后退键。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "在你的 `music-collection` 项目中添加路由：\n\n1. **首页 `/`：** 展示所有曲目（列表 + 筛选）\n2. **详情页 `/piece/:id`：** 展示单个曲目的详细信息\n3. **关于页 `/about`：** 介绍你自己和这个项目\n\n从列表点击一首曲子 → 跳转到详情页 → 点击返回 → 回到列表。整个流程不刷新页面，体验流畅。" },
  { type: 'hint', title: "💡 实现步骤", content: "1. `npm install vue-router`\n2. 创建 `src/router/index.js`\n3. 创建 `src/views/Home.vue`、`Detail.vue`、`About.vue`\n4. 在 `main.js` 中 `app.use(router)`\n5. 在 `App.vue` 中添加 `<router-view />` 和导航\n6. 把原来的内容移到 `Home.vue` 中" }
]

const analogy = "一本乐谱有目录，你可以翻到任何一页。交响乐有四个乐章，听众知道\"现在在第几乐章\"。单页应用（SPA）的多页面体验就靠 **Vue Router** ——它让 URL 变化时页面切换，就像翻乐谱一样自然。"

const listen = "穆索尔斯基《图画展览会》— 这部作品用\"漫步\"主题连接十幅音乐画卷。URL 就像\"漫步\"：在不同页面间导航，每个页面是一幅独立的\"音乐画作\"。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第八章：Vue 实战 · 第 10 课</span>
      <h2 class="lesson-title">Vue Router — 给你的应用"翻页"</h2>
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
