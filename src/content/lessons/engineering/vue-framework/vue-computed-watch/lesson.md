# computed 与 watch — 自动计算的帮手与自动执行的哨兵

:::analogy
computed 就像收银机自动算总价——输入商品价格，自动得出总额，有缓存不重复算；watch 就像保安巡逻——看到异常情况才采取行动。各有用处。
:::

:::explain{title="computed — 自动计算的属性"}
当某个值可以由其他数据**推导**出来时，用 `computed`：
```vue
<script setup>
import { ref, computed } from 'vue'
const pieces = ref([
  { name: '春天', period: '类型C' },
  { name: '报表', period: '类型A' },
  { name: '春', period: '类型B' },
  { name: '文档D', period: '类型C' },
])
// computed：自动计算，有缓存
const classicalPieces = computed(() => {
  return pieces.value.filter(p => p.period === '类型C')
})
</script>
<template>
  <p>类型C项目：{{ classicalPieces.length }} 首</p>
  <ul>
    <li v-for="p in classicalPieces" :key="p.name">{{ p.name }}</li>
  </ul>
</template>
```
classicalPieces` 会自动跟随 `pieces` 的变化重新计算。而且有**缓存**——不依赖的值没变，不会重复计算。
:::

:::example{title="computed vs 普通函数"}
为什么不用普通函数？
```js
// ❌ 普通函数：每次模板重渲染都重新计算
function getClassical() {
  return pieces.value.filter(p => p.period === '类型C')
}
// ✅ computed：只在 pieces 变化时才重新计算
const classicalPieces = computed(() => {
  return pieces.value.filter(p => p.period === '类型C')
})
```
就像翻说明书找内容：函数式每次都从头到尾翻一遍来找古典项目；computed 像在说明书上贴了标签——项目单不变就不用重新翻。
:::

:::example{title="watch — 观察变化，执行操作"}
`watch` 用于"当某个值变了，我要做点什么"——比如保存到 localStorage、发请求：
```vue
<script setup>
import { ref, watch } from 'vue'
const searchKeyword = ref('')
const results = ref([])
// watch：监测 keyword 变化，执行副作用
watch(searchKeyword, async (newVal, oldVal) => {
  if (newVal.length === 0) {
    results.value = []
    return
  }
  console.log(\`搜索：\${oldVal} → \${newVal}\`)
  results.value = await searchAPI(newVal)
})
</script>
```
watch` 适合：
- 保存数据到 localStorage
- 搜索/筛选触发 API 请求
- 某个值变化时更新页面标题
- 数据变化时触发动画
:::

:::example{title="computed vs watch：选哪个？"}
| 场景 | 用什么 | 为什么 |
|------|--------|--------|
| 筛选/排序列表 | computed | 纯计算，需要缓存 |
| 格式化显示 | computed | 依赖数据 → 派生值 |
| 数据变了要发请求 | watch | 有副作用 |
| 数据变了要存 localStorage | watch | 有副作用 |
| 多个依赖组合判断 | computed | 自动追踪依赖 |
**口诀：** 需要**返回值**用 computed，需要**做事情**用 watch。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="computed 从已有数据自动派生出新值并自带缓存。你只需要声明筛选逻辑（filter），Vue 在依赖（项目列表或选中时期）变化时自动重新计算。这在协作篇中需要你手动写筛选逻辑 + 手动调用 render——现在一行 computed 搞定。" expected="选择不同时期，项目列表自动过滤，只显示匹配的项目。"}
添加 computed：根据用户选择的时期（period）筛选项目列表
::::

::::step{purpose="watch 用于在数据变化时执行副作用（如保存、发请求、操作 DOM）。这里用它监听项目列表，自动将数据序列化到 localStorage——用户刷新页面后数据不会丢失。在协作篇中你需要手动在每个修改点调用保存函数，现在只需一个 watch。" expected="添加/删除项目后刷新页面，数据仍然存在（自动从 localStorage 恢复）。"}
添加 watch：当项目列表变化时，自动保存到 localStorage
::::

:::

:::recap
你学会了 computed 和 watch 的区别——computed 用于自动计算派生值（如筛选列表），有缓存，依赖不变不重算。watch 用于监听数据变化后执行副作用（如保存到 localStorage、发 API 请求）。
:::


