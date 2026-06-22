# computed 与 watch — 自动跟进的"伴奏"

::music-analogy
乐队中有两种伴奏方式：一种是钢琴跟着主旋律自动配和声（computed——自动计算，有缓存）；一种是鼓手听到变换后才改变节奏型（watch——观察变化，执行副作用）。两者各有用途，选对工具让你的"演奏"更流畅。
::

::explain{title="computed — 自动计算的属性"}
当某个值可以由其他数据**推导**出来时，用 `computed`：
```vue
<script setup>
import { ref, computed } from 'vue'
const pieces = ref([
  { name: '月光', period: '古典主义' },
  { name: '夜曲', period: '浪漫主义' },
  { name: '春', period: '巴洛克' },
  { name: '致爱丽丝', period: '古典主义' },
])
// computed：自动计算，有缓存
const classicalPieces = computed(() => {
  return pieces.value.filter(p => p.period === '古典主义')
})
</script>
<template>
  <p>古典主义曲目：{{ classicalPieces.length }} 首</p>
  <ul>
    <li v-for="p in classicalPieces" :key="p.name">{{ p.name }}</li>
  </ul>
</template>
```
classicalPieces` 会自动跟随 `pieces` 的变化重新计算。而且有**缓存**——不依赖的值没变，不会重复计算。
::

::example{title="computed vs 普通函数"}
为什么不用普通函数？
```js
// ❌ 普通函数：每次模板重渲染都重新计算
function getClassical() {
  return pieces.value.filter(p => p.period === '古典主义')
}
// ✅ computed：只在 pieces 变化时才重新计算
const classicalPieces = computed(() => {
  return pieces.value.filter(p => p.period === '古典主义')
})
```
就像乐谱翻页：函数式每次都从头到尾唱一遍来找古典曲目；computed 像在谱子上贴了标签——曲目单不变就不用重新翻。
::

::example{title="watch — 观察变化，执行操作"}
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
::

::example{title="computed vs watch：选哪个？"}
| 场景 | 用什么 | 为什么 |
|------|--------|--------|
| 筛选/排序列表 | computed | 纯计算，需要缓存 |
| 格式化显示 | computed | 依赖数据 → 派生值 |
| 数据变了要发请求 | watch | 有副作用 |
| 数据变了要存 localStorage | watch | 有副作用 |
| 多个依赖组合判断 | computed | 自动追踪依赖 |
**口诀：** 需要**返回值**用 computed，需要**做事情**用 watch。
::

::task{title="动手试试 ✨"}
:::step{purpose="computed 从已有数据自动派生出新值并自带缓存。你只需要声明筛选逻辑（filter），Vue 在依赖（曲目列表或选中时期）变化时自动重新计算。这在合奏篇中需要你手动写筛选逻辑 + 手动调用 render——现在一行 computed 搞定。" expected="选择不同时期，曲目列表自动过滤，只显示匹配的曲目。"}
添加 computed：根据用户选择的时期（period）筛选曲目列表
:::

:::step{purpose="watch 用于在数据变化时执行副作用（如保存、发请求、操作 DOM）。这里用它监听曲目列表，自动将数据序列化到 localStorage——用户刷新页面后数据不会丢失。在合奏篇中你需要手动在每个修改点调用保存函数，现在只需一个 watch。" expected="添加/删除曲目后刷新页面，数据仍然存在（自动从 localStorage 恢复）。"}
添加 watch：当曲目列表变化时，自动保存到 localStorage
:::

::

::listen-to
舒伯特《鳟鱼五重奏》— 五个乐器各有角色：钢琴提供和声基础（computed），低音提琴时而拨弦时而拉弓（watch 到主旋律变化时改变奏法）。听这首歌时想一下：谁在"计算"，谁在"观察"？
::

