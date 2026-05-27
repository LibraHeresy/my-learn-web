<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "什么是生命周期？", content: "每个 Vue 组件从创建到销毁，会经历一系列阶段。Vue 在每个阶段提供了**钩子函数（hooks）**，让你在特定时机执行代码：\n\n```\nsetup() → 创建响应式状态\n  ↓\nonBeforeMount() → 即将挂载（很少用）\n  ↓\nonMounted() → 已挂载到 DOM ✅ 常用\n  ↓\nonBeforeUpdate() → 数据变了，DOM 即将更新\n  ↓\nonUpdated() → DOM 已更新\n  ↓\nonBeforeUnmount() → 组件即将销毁 ✅ 常用\n  ↓\nonUnmounted() → 组件已销毁\n```\n\n**你只需要了解最常用的三个就够了：**\n- onMounted — 组件挂载完成后（操作 DOM、发请求、启定时器）\n- onBeforeUnmount — 组件销毁前（清理定时器、取消请求、移除事件监听）\n- watch / watchEffect — 响应式数据变化时自动执行\n\n> 🎼 就像在奏鸣曲的呈示部结束时要做转调，在再现部开始前要回到原调——生命周期的每个节点都有它特定的音乐任务。" },
  { type: 'explain', title: "onMounted — 登台时刻", content: "`onMounted` 是使用最频繁的钩子。在 `<script setup>` 中，**顶层的代码在组件创建时执行**，但此时 DOM 还不存在。任何需要操作 DOM 的代码必须放在 onMounted 中：\n\n```vue\n<script setup>\nimport { ref, onMounted } from 'vue'\n\nconst inputRef = ref(null)  // template ref\n\n// ❌ 错误：此时 DOM 还没渲染，inputRef.value 是 null\n// inputRef.value.focus()\n\n// ✅ 正确：onMounted 中 DOM 已就绪\nonMounted(() => {\n  inputRef.value?.focus()    // 自动聚焦输入框\n  fetchUserData()            // 发初始请求\n  startTimer()               // 启动定时器\n  window.addEventListener('scroll', handleScroll)  // 绑定全局事件\n})\n<\/script>\n```\n\n**onMounted 的常见用途：**\n- 获取初始数据（调用 API）\n- 操作 DOM 元素（聚焦、滚动、初始化第三方库）\n- 启动定时器 / 订阅事件\n- 添加全局事件监听（scroll、resize、keydown）" },
  { type: 'explain', title: "onBeforeUnmount — 谢幕前的清理", content: "组件销毁前，必须清理你在 onMounted 中创建的东西——否则会导致内存泄露或意外行为：\n\n```vue\n<script setup>\nimport { ref, onMounted, onBeforeUnmount } from 'vue'\n\nlet timer = null\n\nonMounted(() => {\n  timer = setInterval(() => {\n    console.log('tick')\n  }, 1000)\n  window.addEventListener('resize', handleResize)\n})\n\nonBeforeUnmount(() => {\n  clearInterval(timer)  // 清理定时器——不然组件销毁后还在 tick！\n  window.removeEventListener('resize', handleResize)  // 移除事件监听——不然会内存泄露\n})\n<\/script>\n```\n\n**清理清单：**\n- clearInterval / clearTimeout — 清除定时器\n- removeEventListener — 移除全局事件监听\n- 取消未完成的 fetch 请求（用 AbortController）\n- 销毁第三方库实例（如图表、地图）\n\n> 🎭 演出结束后的收琴——提琴手松弓毛、管乐手清理乐器、钢琴家合上琴盖。不清理的话，乐器会受损（内存泄露），下次演出也会出问题。" },
  { type: 'explain', title: "watch 与 watchEffect — 自动跟进的伴奏", content: "虽然 watch 不是严格的生命周期钩子，但它和生命周期密切相关——它监听数据变化并在正确的时机执行。\n\n**watch：** 明确指定要监听的数据源\n\n```vue\n<script setup>\nimport { ref, watch } from 'vue'\n\nconst keyword = ref('')\nconst results = ref([])\n\n// 监听 keyword 变化，自动搜索\nwatch(keyword, async (newVal, oldVal) => {\n  console.log('搜索词从', oldVal, '变为', newVal)\n  if (newVal.trim()) {\n    results.value = await searchAPI(newVal)\n  }\n})\n\n// 监听多个数据源\nwatch([keyword, category], ([newKw, newCat]) => {\n  // keyword 或 category 任一变化都会触发\n})\n\n// 深度监听对象\nwatch(user, (newUser) => {\n  console.log('用户信息变化了', newUser)\n}, { deep: true })\n<\/script>\n```\n\n**watchEffect：** 自动追踪内部用到的响应式数据，任意一个变化就重新执行\n\n```js\nwatchEffect(() => {\n  console.log(keyword.value, category.value)\n  document.title = keyword.value || '音乐收藏'\n})\n```\n\n**watch vs watchEffect：**\n- watch — 明确知道要监听什么，可以获取旧值\n- watchEffect — 不需要指定依赖，自动追踪，更简洁" },
  { type: 'example', title: "📝 看例子：生命周期实战", content: "下面的代码是一个时钟组件，完整展示了生命周期钩子的使用：\n\n```vue\n<script setup>\nimport { ref, onMounted, onBeforeUnmount, watch } from 'vue'\n\nconst time = ref(new Date().toLocaleTimeString())\nconst isRunning = ref(true)\nlet timer = null\n\nfunction tick() {\n  time.value = new Date().toLocaleTimeString()\n}\n\nfunction startClock() {\n  isRunning.value = true\n  timer = setInterval(tick, 1000)\n}\n\nfunction stopClock() {\n  isRunning.value = false\n  clearInterval(timer)\n  timer = null\n}\n\nonMounted(() => {\n  startClock()\n  console.log('🕐 时钟组件已挂载')\n})\n\nonBeforeUnmount(() => {\n  clearInterval(timer)\n  console.log('🕐 时钟组件已卸载，定时器已清理')\n})\n\nwatch(isRunning, (running) => {\n  console.log('时钟状态：', running ? '运行中' : '已暂停')\n})\n<\/script>\n```\n\n注意：如果不清除定时器，组件销毁后 setInterval 仍在运行——这就是内存泄露。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "请在编辑器中：\n\n1. 观察时钟组件——打开/关闭它，看控制台的生命周期日志\n2. 修改 onMounted 中的 startClock——让时钟初始显示为 1.5 倍速\n3. 用 watch 监听 time 的变化，在整分钟时打印 🎵\n4. 添加一个计数器（ref），在 onMounted 中启动自增，onBeforeUnmount 中清除\n5. 挑战：用 watchEffect 替代 watch，观察两者的区别" }
]

const analogy = "每首乐曲都有固定的结构——序奏呈示主题、展开部发展变化、再现部回归、尾声收束。Vue 组件也有自己的乐章结构（生命周期）：创建（setup）→ 挂载到 DOM（onMounted）→ 数据更新（onUpdated）→ 即将销毁（onBeforeUnmount）→ 已销毁（onUnmounted）。每个阶段都有对应的钩子函数，让你在正确的时间点执行正确的代码。"

const listen = "贝多芬《第五交响曲》全四个乐章 — 第一乐章：命运的动机登场（setup/onMounted），第二乐章：变奏展开（响应式更新），第三乐章：谐谑曲的神秘过渡（onBeforeUnmount），第四乐章：辉煌的凯旋（组件完成使命）。一部交响曲的生命周期，和 Vue 组件的生命周期如出一辙。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第八章：Vue 实战 · 第 3 课</span>
      <h2 class="lesson-title">Vue 生命周期 — 组件的乐章结构</h2>
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
