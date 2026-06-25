# 响应式数据 — ref 与 computed 的真实写法

:::music-analogy
在乐理篇和合奏篇，你每次修改数据后都要手动调用 `render()` 更新页面——就像每次排练后手动重新整理乐谱。Vue 的 `ref` 和 `computed` 让这一切自动化：数据就像被施了魔法，你改一个值，所有用到它的地方自动更新。**你只需要关注数据本身，不用管 DOM。**
:::

:::explain{title="ref — 响应式数据的起点"}
在 `<script setup>` 中，用 `ref()` 创建响应式数据：
```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
const composer = ref("贝多芬")
const pieces = ref(["夜曲", "月光", "春"])
function addOne() {
  count.value++  // JS 中读写用 .value
}
</script>
<template>
  <p>计数：{{ count }}</p>        <!-- 模板中不需要 .value！ -->
  <p>作曲家：{{ composer }}</p>
  <button @click="addOne">+1</button>
</template>
```
**规则不变：JS 中用 `.value`，模板中不用。**
但是写法更简洁了：在 `<script setup>` 中，变量和函数**自动暴露给模板**——不需要像 CDN 方式那样 `return { count, addOne }`！
:::

:::explain{title="computed — 自动计算的派生数据"}
`computed` 从其他数据自动推算出一个新值。依赖的数据变了，computed 自动重算。
```vue
<script setup>
import { ref, computed } from 'vue'
const pieces = ref([
  { name: "夜曲", period: "浪漫主义" },
  { name: "布兰登堡", period: "巴洛克" },
  { name: "月光", period: "印象派" }
])
const selectedPeriod = ref("全部")
// 自动筛选
const filteredPieces = computed(() => {
  if (selectedPeriod.value === "全部") return pieces.value
  return pieces.value.filter(p => p.period === selectedPeriod.value)
})
// 自动计数
const count = computed(() => filteredPieces.value.length)
</script>
<template>
  <button @click="selectedPeriod = '巴洛克'">巴洛克</button>
  <p>共 {{ count }} 首</p>
  <div v-for="p in filteredPieces" :key="p.name">
    {{ p.name }} — {{ p.period }}
  </div>
</template>
```
点击`巴洛克`按钮 → `selectedPeriod` 变了 → `filteredPieces` 自动重算 → `count` 自动重算 → 页面自动更新。三行 computed，替代了原来的手动 `render()` 函数！
:::

:::task{title="你的任务 ✨"}
::::step{purpose="ref() 是 Vue 响应式系统的基础。通过 ref 包裹数据，Vue 会追踪所有对该数据的读取和修改，并在数据变化时自动更新 DOM。在组合式 API 中，ref 是你创建响应式数据的第一选择。" expected="在 <script setup> 中定义了一个响应式的 pieces 数组。"}
在 App.vue 中创建一个曲目数组 pieces（ref）
::::

::::step{purpose="将数据绑定到模板，验证响应式渲染。与你在合奏篇中手动调用 render() 函数不同，Vue 的 v-for 在数据变化时自动重新渲染列表——你修改数据，页面自己更新。" expected="页面上显示了所有曲目的名称、作曲家和时期信息。"}
用 v-for 在页面上渲染所有曲目
::::

::::step{purpose="用户交互需要改变数据来驱动 UI 变化。点击按钮修改一个响应式变量（如 selectedPeriod），这个变化会传播到所有依赖它的地方。这是 Vue 单向数据流的起点。" expected="页面上出现筛选按钮，点击后按钮视觉上有选中状态。"}
添加时期筛选按钮（全部、巴洛克、浪漫主义等）
::::

::::step{purpose="computed 是 Vue 最强大的工具之一：它从现有数据自动派生出新值，且带有缓存。当 selectedPeriod 改变时，computed 重新计算筛选结果；依赖没变时不重复计算。这替代了你在合奏篇中手动调用的筛选+渲染两步操作。" expected="点击不同时期按钮，列表自动过滤，只显示对应时期的曲目。"}
用 computed 实现自动筛选
::::

::::step{purpose="computed 可以链式依赖：一个 computed 计算筛选后的列表，另一个 computed 基于筛选结果计算数量。这展示了声明式编程的优雅——你只需要描述数据之间的关系，Vue 负责在依赖变化时自动更新所有相关值。" expected="页面上显示类似「筛选出 12 首中的 3 首」的统计信息，切换筛选时数字自动变化。"}
显示「筛选出 X 首中的 Y 首」统计文字
::::

:::

:::hint{title="<script setup> 的优势"}
`<script setup>` 是 Vue 3 推荐的写法，相比 CDN 方式：
- **不需要 `return`** — 顶层变量和函数自动暴露
- **不需要 `.value`** — 在模板中自动解包
- **import 自动可用** — 你 import 的组件在模板中直接使用
就像从"手动挡"换成了"自动挡"——做的事一样，但省了很多操作。
:::

:::recap
你学会了用 ref 创建响应式数据，用 computed 自动派生新值。数据变了，所有用到它的地方自动更新——在 <script setup> 里变量自动暴露给模板，你不再需要手动调用 render() 去更新 DOM。
:::

:::listen-to
肖邦《即兴幻想曲》Op.66 — 左右手的节奏是 4 对 3，但听起来天衣无缝。ref 和 computed 的配合也是如此：ref 是右手的旋律（数据源），computed 是左手的琶音（自动派生的和声），Vue 让你不用手动协调它们。
:::

