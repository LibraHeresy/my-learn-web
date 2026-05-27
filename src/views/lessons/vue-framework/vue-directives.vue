<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "v-bind — 动态绑定属性", content: "`v-bind` 把 JS 表达式的值绑定到 HTML 属性上。简写是 `:`：\n\n```html\n<!-- 完整写法 -->\n<img v-bind:src=\"imageUrl\">\n<a v-bind:href=\"'/user/' + userId\">用户</a>\n<div v-bind:class=\"{ active: isActive }\">...</div>\n\n<!-- 简写（最常用） -->\n<img :src=\"imageUrl\">\n<a :href=\"'/user/' + userId\">用户</a>\n<div :class=\"{ active: isActive }\">...</div>\n<div :style=\"{ color: textColor, fontSize: size + 'px' }\">...</div>\n```\n\n**和 {{ }} 文本插值的区别：**\n- `{{ expression }}` — 把值插入到**文本内容**中\n- `v-bind:attr=\"expression\"` — 把值绑定到**HTML 属性**上\n\n```html\n<!-- 文本插值：显示在标签内容中 -->\n<p>{{ message }}</p>\n\n<!-- 属性绑定：绑定到 HTML 属性 -->\n<img :src=\"imageUrl\" :alt=\"imageDesc\">\n<button :disabled=\"isLoading\">提交</button>\n```\n\n就像连音线把两个音符连起来——v-bind 把 JS 数据和 DOM 属性连起来。" },
  { type: 'explain', title: "v-if / v-show — 条件渲染", content: "**v-if / v-else-if / v-else：** 根据条件决定是否**创建/销毁** DOM 元素\n\n```html\n<div v-if=\"status === 'loading'\">加载中...</div>\n<div v-else-if=\"status === 'error'\">出错了！</div>\n<div v-else-if=\"status === 'empty'\">没有数据</div>\n<div v-else>\n  <p>{{ result }}</p>\n</div>\n```\n\n**v-show：** 根据条件决定是否**显示**元素（元素始终存在，只是切换 display:none）\n\n```html\n<div v-show=\"isVisible\">这段文字可以快速切换显示/隐藏</div>\n```\n\n**v-if vs v-show 的选择：**\n\n| | v-if | v-show |\n|------|------|--------|\n| 机制 | 移除/创建 DOM | display: none 切换 |\n| 初始渲染 | 条件为 false 时不渲染 | 始终渲染 |\n| 切换开销 | 大（销毁+重建） | 小（只改 CSS） |\n| 适用场景 | 条件很少改变 | 频繁切换 |\n\n> 🎼 v-if 是这个乐手这场不参加（人根本不在舞台上），v-show 是这个乐手在场但保持沉默（人在但不出声）。" },
  { type: 'explain', title: "v-for — 列表渲染", content: "`v-for` 遍历数组或对象，为每个元素渲染一段模板：\n\n```html\n<!-- 遍历数组：item in items -->\n<ul>\n  <li v-for=\"item in items\" :key=\"item.id\">\n    {{ item.name }} — {{ item.price }} 元\n  </li>\n</ul>\n\n<!-- 带索引： (item, index) in items -->\n<li v-for=\"(item, index) in items\" :key=\"item.id\">\n  {{ index + 1 }}. {{ item.name }}\n</li>\n\n<!-- 遍历对象： (value, key, index) in obj -->\n<li v-for=\"(value, key) in composer\" :key=\"key\">\n  {{ key }}: {{ value }}\n</li>\n\n<!-- 遍历数字范围 -->\n<span v-for=\"n in 5\" :key=\"n\">{{ n }}</span>\n```\n\n**`:key` 为什么重要：**\n\nkey 是 Vue 识别每个节点的唯一标识。没有 key 或 key 不唯一会导致：\n- 列表更新时出现错误的 DOM 复用\n- 组件状态错乱\n- 过渡动画失效\n\n始终给 v-for 一个唯一且稳定的 key（通常是 id，**永远不要用 index 作为 key** ——除非列表是静态的且不会重新排序）。" },
  { type: 'explain', title: "v-html / v-text 与其他常用指令", content: "**v-html：** 把字符串当作 HTML 渲染（⚠️ 有 XSS 安全风险！）\n\n```html\n<div v-html=\"rawHtml\"></div>\n<!-- 仅在信任内容来源时使用！用户输入绝不能直接用 v-html -->\n```\n\n**v-text：** 等价于 {{ }}，设置元素的文本内容\n\n```html\n<span v-text=\"message\"></span>\n<!-- 等价于 <span>{{ message }}</span> -->\n```\n\n**v-once：** 只渲染一次，后续不再响应数据变化（静态内容优化）\n\n```html\n<div v-once>这个标题永远不会变：{{ title }}</div>\n```\n\n**v-pre：** 跳过这个元素及其子元素的编译（显示原始 Mustache 语法）\n\n```html\n<pre v-pre>{{ 这里不会编译，直接显示 {{ message }} 原文 }}</pre>\n```" },
  { type: 'example', title: "📝 看例子：一个完整的指令演示", content: "下面的代码综合展示了所有主要指令。切换到预览区，实际操作感受：\n\n```html\n<!-- 条件渲染：切换 tab -->\n<div :class=\"['tab', { active: activeTab === 'all' }]\" @click=\"activeTab = 'all'\">全部</div>\n\n<!-- 列表渲染：遍历曲目 -->\n<div v-for=\"track in filteredTracks\" :key=\"track.id\" class=\"track-card\">\n  <img :src=\"track.cover\" :alt=\"track.title\">\n  <h3>{{ track.title }}</h3>\n  <p v-if=\"track.artist\">{{ track.artist }}</p>\n  <span :class=\"['tag', 'tag-' + track.genre]\">{{ track.genre }}</span>\n</div>\n\n<!-- v-show 切换 -->\n<div v-show=\"showPlayer\" class=\"player\">播放器控件</div>\n```\n\n注意：:class 可以接收对象（{ active: isActive }）或数组（['base', dynamicClass]）。:style 同样支持对象语法。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "请在编辑器中：\n\n1. 修改 filterButtons 数组——添加一个印象派筛选选项\n2. 在 tracks 数组中添加两首你自己喜欢的曲目\n3. 用 v-if 添加暂无匹配曲目的空状态提示\n4. 把 v-show 切换按钮改成正在播放的动态显示\n5. 挑战：用 v-for 的索引给每张卡片前加上序号（1. 2. 3. ...），观察为每个 `<li>` 添加唯一的 :key" }
]

const analogy = "乐谱上有各种演奏记号——f 代表强奏、p 代表弱奏、tr 是颤音、反复记号指定哪些小节要重复。Vue 指令就是模板中的演奏记号：v-if 是此处休止（这个声部不奏）、v-show 是加弱音器（还在但静默）、v-for 是反复记号（同一乐句重复多次）、v-bind 是连音线（把数据和 DOM 属性连起来）、v-html 是即兴华彩段（直接插入内容，但需谨慎）。"

const listen = "帕格尼尼《24 首随想曲》— 每一首都是对一种特定演奏技巧（泛音、双音、拨弦、跳弓）的极致发挥。Vue 的每个指令就像一种特定的演奏技巧——各司其职，组合起来就是一场华丽的演出。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第八章：Vue 实战 · 第 2 课</span>
      <h2 class="lesson-title">Vue 指令 — 模板的演奏记号</h2>
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
