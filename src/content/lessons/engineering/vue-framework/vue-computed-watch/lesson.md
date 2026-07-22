# computed 与 watch — 自动跟进的"伴奏"

:::analogy
`computed` 就像超市收银机的自动计价 -- 扫描商品（输入数据），自动算出总价（输出结果），相同商品不会重复算（有缓存）。`watch` 就像保安巡逻 -- 看到异常情况（数据变化），采取行动（保存、报警、发请求）。两个工具各有用武之地。
:::

:::explain{title="问题：派生数据容易过时，副作用无处安放"}
在开发中你经常会遇到两种需求：

**场景 A：** 你有商品列表和筛选条件，需要显示"筛选后的商品"和"筛选结果数量"。如果手动维护这些派生数据：
```js
// 原生 JS：每次修改筛选条件都要手动重算
let products = [...]
let filter = 'all'
let filteredProducts = products              // 初始值
let count = filteredProducts.length          // 初始值

function changeFilter(newFilter) {
  filter = newFilter

  // 手动重新计算筛选结果
  if (filter === 'all') {
    filteredProducts = products
  } else {
    filteredProducts = products.filter(p => p.type === filter)
  }

  // 还要手动更新计数 -- 忘掉就数据不一致
  count = filteredProducts.length
}
```
每次改动筛选条件，你都要**记住**去重算 `filteredProducts` 和 `count`。忘掉一个，数据就不一致。

**场景 B：** 用户修改了数据，你想要自动保存到 localStorage。应该在哪写保存逻辑？
```js
// 原生 JS：在每个修改数据的地方重复写保存逻辑
function addProduct(p) {
  products.push(p)
  localStorage.setItem('products', JSON.stringify(products))   // 重复
}
function deleteProduct(id) {
  products = products.filter(p => p.id !== id)
  localStorage.setItem('products', JSON.stringify(products))   // 重复
}
function toggleLike(id) {
  // ...修改逻辑
  localStorage.setItem('products', JSON.stringify(products))   // 重复
}
```
"保存"的代码分散在各处，容易遗漏。

这两个场景正是 `computed` 和 `watch` 要解决的问题。
:::

:::explain{title="方案：computed -- 自动计算，自带缓存"}
`computed` 从已有数据**派生**出新值。你定义好计算规则后，依赖数据一变，computed 自动重新计算。

```vue
<script setup>
import { ref, computed } from 'vue'

const pieces = ref([
  { name: '月光', period: 'classical', liked: true },
  { name: '四季', period: 'baroque', liked: false },
  { name: '夜曲', period: 'romantic', liked: true },
  { name: '春之歌', period: 'romantic', liked: false },
  { name: '牧神午后', period: 'classical', liked: true },
])

const selectedPeriod = ref('all')       // 当前筛选的时期

// computed：定义筛选规则
const filteredPieces = computed(() => {
  // computed 自动追踪内部用到的响应式数据
  // selectedPeriod.value 或 pieces.value 变了就重新算
  if (selectedPeriod.value === 'all') {
    return pieces.value                 // 选"全部"，返回所有
  }
  return pieces.value.filter(p => p.period === selectedPeriod.value)  // 按时期筛选
})

// computed 可以依赖另一个 computed
const stats = computed(() => {
  const total = filteredPieces.value.length           // 筛选后总数
  const liked = filteredPieces.value.filter(p => p.liked).length  // 收藏数
  return \`共 \${total} 首，其中 \${liked} 首已收藏\`
})
</script>

<template>
  <button @click="selectedPeriod = 'classical'">古典</button>
  <button @click="selectedPeriod = 'romantic'">浪漫</button>
  <button @click="selectedPeriod = 'all'">全部</button>

  <p>{{ stats }}</p>

  <div v-for="p in filteredPieces" :key="p.name">
    {{ p.name }} -- {{ p.period }} {{ p.liked ? '❤️' : '' }}
  </div>
</template>
```

逐行解读：
- 第 17 行 `computed(() => { ... })` -- 传入一个返回计算结果的函数
- 第 19-22 行 -- 计算逻辑本身：根据 `selectedPeriod` 决定是返回全部还是筛选结果
- 第 25-28 行 -- `stats` 依赖 `filteredPieces`，`filteredPieces` 依赖 `pieces` 和 `selectedPeriod`。任意一环变了，整条链自动更新
- `computed` 有**缓存**：依赖没变时，你访问 100 次也只算一次（返回缓存结果）

**computed vs 普通函数 -- 缓存是关键：**
```js
// ❌ 普通函数：每次模板重渲染都执行一次（可能一帧执行 10 次无意义的重复计算）
function getFiltered() {
  console.log('普通函数被调用了')    // 会看到大量无意义调用
  return pieces.value.filter(...)
}

// ✅ computed：只在依赖变化时才执行（哪怕模板渲染 100 次，没变化就不重算）
const filteredPieces = computed(() => {
  console.log('computed 被调用了')    // 只在实际需要时打印
  return pieces.value.filter(...)
})
```
:::

:::explain{title="方案：watch -- 观察变化，执行副作用"}
`watch` 用于当某个数据变了，你要**做一件和渲染无关的事**（术语叫"副作用"）。和 computed 不同，watch 不返回值，它执行操作。

```vue
<script setup>
import { ref, watch } from 'vue'

const pieces = ref([])               // 曲目列表
const keyword = ref('')              // 搜索关键词

// watch 用法 1：保存到 localStorage（副作用）
watch(pieces, (newPieces) => {
  // 每次 pieces 变化，自动存到 localStorage
  // 你不需要在每个增删改的地方重复写这段代码
  localStorage.setItem('my-pieces', JSON.stringify(newPieces))
  console.log('数据已保存，共', newPieces.length, '首')
}, { deep: true })                  // deep:true 深度监听数组内部元素的变化

// watch 用法 2：搜索（副作用 -- 发 API 请求）
watch(keyword, async (newKeyword, oldKeyword) => {
  // newKeyword：变化后的值；oldKeyword：变化前的值
  if (!newKeyword.trim()) {
    return                          // 空输入不搜索
  }
  console.log(\`搜索: "\${oldKeyword}" → "\${newKeyword}"\`)

  // 发请求搜索 -- 这是副作用，和渲染无直接关系
  const response = await fetch(\`/api/search?q=\${newKeyword}\`)
  const data = await response.json()
  results.value = data
})

// watch 用法 3：监听多个数据源
watch([keyword, selectedPeriod], ([newKw, newPeriod]) => {
  // 任一变化都触发，拿到所有新值
  console.log('搜索条件变化:', newKw, newPeriod)
})
</script>
```

逐行解读：
- 第 9 行 `watch(pieces, ...)` -- 第一个参数是要监听的数据源（ref 变量）
- 第 10-12 行 -- 回调函数在数据变化时执行，这里做的是"把数据存到 localStorage"
- 第 13 行 `{ deep: true }` -- 深度监听。没有这个，修改 `pieces.value[0].name` 不会触发 watch
- 第 17 行 `watch(keyword, async (newKeyword, oldKeyword) => { ... })` -- 监听搜索关键词变化，获取新旧值，发 API 请求
- 第 16 行 -- 回调可以拿到 `newVal` 和 `oldVal`，用于对比变化前后的值
:::

:::example{title="computed vs watch：怎么选？"}
| 场景 | 用什么 | 为什么 |
|---|---|---|
| 筛选/排序/格式化列表 | `computed` | 纯计算，需要返回一个值给模板用 |
| 计算总价、统计数量 | `computed` | 从数据派生新数据，需要缓存 |
| 数据变了要保存到 localStorage | `watch` | 这是副作用（和渲染无关的操作） |
| 数据变了要发 API 请求 | `watch` | 这是副作用 |
| 多个条件组合判断 | `computed` | 返回判断结果 |
| 翻页后滚动到顶部 | `watch` | 操作 DOM，不是返回值 |

**口诀：需要返回值用 computed，需要做事情用 watch。**

**对比代码：**
```js
// ✅ computed -- 返回筛选结果给模板用
const filtered = computed(() => pieces.value.filter(...))

// ❌ 用 watch 实现同样的筛选 -- 多此一举！
const filtered = ref([])
watch(pieces, (newVal) => {
  filtered.value = newVal.filter(...)    // 手动赋值，绕了一圈
})

// ✅ watch -- 数据变了自动保存（副作用）
watch(pieces, (newVal) => {
  localStorage.setItem('data', JSON.stringify(newVal))
}, { deep: true })

// ❌ 用 computed 做保存 -- computed 不应该有副作用！
const save = computed(() => {
  localStorage.setItem('data', ...)      // computed 里不应该做这种事！
  return ...                             // 而且 computed 必须返回值
})
```
:::

:::example{title="实战：一个搜索 + 持久化的完整示例"}
```vue
<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// 数据源
const pieces = ref([])
const keyword = ref('')
const selectedPeriod = ref('all')

// onMounted：从 localStorage 恢复数据
onMounted(() => {
  const saved = localStorage.getItem('my-pieces')
  if (saved) {
    pieces.value = JSON.parse(saved)
    console.log('✅ 数据已恢复')
  }
})

// computed：自动筛选
const filteredPieces = computed(() => {
  let result = pieces.value
  // 按时期筛选
  if (selectedPeriod.value !== 'all') {
    result = result.filter(p => p.period === selectedPeriod.value)
  }
  // 按关键词搜索
  if (keyword.value.trim()) {
    const kw = keyword.value.toLowerCase()
    result = result.filter(p => p.name.toLowerCase().includes(kw))
  }
  return result
})

// computed：统计（链式依赖）
const stats = computed(() => \`共 \${filteredPieces.value.length} 首\`)

// watch：自动持久化（副作用）
watch(pieces, (newPieces) => {
  localStorage.setItem('my-pieces', JSON.stringify(newPieces))
}, { deep: true })

// 添加曲目的函数
function addPiece(name, period) {
  pieces.value.push({
    id: Date.now(),
    name,
    period,
    liked: false,
  })
  // 不需要手动调 save！watch 自动触发 localStorage 保存
}
</script>

<template>
  <input v-model="keyword" placeholder="搜索曲名...">

  <select v-model="selectedPeriod">
    <option value="all">全部时期</option>
    <option value="classical">古典</option>
    <option value="baroque">巴洛克</option>
    <option value="romantic">浪漫</option>
  </select>

  <p>{{ stats }}</p>

  <div v-for="p in filteredPieces" :key="p.id">
    {{ p.name }} - {{ p.period }}
  </div>
</template>
```

逐行解读：
- 第 9-12 行 `onMounted` -- 组件初始化时从 localStorage 读取之前保存的数据
- 第 16-25 行 `computed` -- 筛选逻辑在这里，同时按时期和关键词过滤。依赖变化自动重算
- 第 28 行 `computed` -- 统计文字依赖筛选结果，形成两级 computed 链
- 第 31-33 行 `watch` -- 监听 `pieces` 数组，变化时自动存到 localStorage。`{ deep: true }` 确保数组中元素的属性变化也能检测到
- 第 41 行 -- 添加曲目后不需要手动保存，watch 会自动触发
:::

:::explain{title="常见错误"}
**错误 1：用 watch 实现可以用 computed 的场景**
```js
// ❌ computed 不做的事用 watch 来做 -- 绕弯路
const filtered = ref([])
watch([pieces, selectedPeriod], () => {
  filtered.value = pieces.value.filter(...)    // 手动赋值，还要处理各种边界
})                                              // 而且没有缓存

// ✅ 用 computed -- 简洁且有缓存
const filtered = computed(() => pieces.value.filter(...))
```

**错误 2：在 computed 里做副作用**
```js
// ❌ computed 应该只做计算，不应该改别的东西
const result = computed(() => {
  localStorage.setItem('last', Date.now())    // 副作用！不应该在 computed 里
  fetch('/api/log')                            // 副作用！
  return data.value.filter(...)
})
```
computed 的执行时机是不确定的（依赖懒计算），在里面做副作用会有不可预测的行为。

**错误 3：watch 对象但忘了 deep: true**
```js
const user = ref({ name: '张三', settings: { theme: 'dark' } })

// ❌ 只监听 user 引用的变化（比如 user.value = {...}），不监听内部属性的修改
watch(user, (newVal) => { ... })

// ✅ deep: true 递归监听所有嵌套属性的变化
watch(user, (newVal) => {
  console.log('用户数据变化')
}, { deep: true })    // 不过 deep:true 有性能开销，用的时候注意
```

**错误 4：watch 忘了处理初始值**
```js
// ❌ watch 默认不立即执行，只有数据变化时才触发
watch(keyword, search)    // 初始 keyword='' 时不会触发 search

// ✅ 如果需要立即执行，加 { immediate: true }
watch(keyword, search, { immediate: true })    // 初始时就执行一次 search
```
:::

:::explain{title="实际工作连接"}
在实际 Vue 项目中：
- **computed** 用来管理所有"这个数据由哪些数据决定"的场景：购物车总价、列表筛选、权限判断、格式化显示。它是 Vue 项目中最常用的 API 之一
- **watch** 用来处理"数据变了要做什么"的场景：自动保存草稿、搜索防抖、翻页后滚动到顶部、数据变化时触发埋点
- **组合使用**：`computed` 处理数据流（数据怎么变），`watch` 处理副作用（变了之后做什么）。两者配合，覆盖了几乎所有数据变化的响应需求

关于性能：`computed` 的缓存机制在数据量大、计算复杂时是重要的性能优化手段。一个遍历 1000 条数据的筛选，用 computed 只在依赖变化时算一次；用普通函数可能在一次渲染中算 5 次。这就是为什么要在正确的地方用正确的工具。
:::

:::task{title="动手试试"}
::::step{purpose="computed 从已有数据自动派生新值。你只管声明筛选逻辑，Vue 在依赖变化时自动重新计算。以前需要你手动写筛选逻辑 + 手动调 render，现在一个 computed 搞定。" expected="选择不同时期，项目列表自动过滤，只显示匹配的项目。"}
用 computed 根据 selectedPeriod 筛选项目列表
::::

::::step{purpose="watch 用于在数据变化时执行副作用。这里用它监听项目列表，自动保存到 localStorage -- 用户刷新页面后数据不丢失。以前你需要在每个修改点手动调用保存函数，现在只需一个 watch。" expected="添加/删除项目后刷新页面，数据仍然存在。"}
用 watch 监听 pieces 数组，变化时自动保存到 localStorage（记得 deep: true）
::::

::::step{purpose="computed 链式依赖展示了声明式数据流的优雅。一个 computed 依赖另一个 computed，形成数据流水线。任意环节变化，下游全部自动更新。" expected="统计文字实时显示筛选后的总数和收藏数，切换筛选时数字自动变化。"}
再加一个 computed 显示统计信息：筛选后共 X 首，其中 Y 首已收藏
::::

::::step{purpose="watch 可以拿到新旧值，用于需要对比变化前后的场景。这展示了 watch 的核心能力 -- 不仅可以执行副作用，还能知道'从哪变到哪'。" expected="控制台输出类似「时期改变: baroque → classical」的日志。"}
用 watch 监听 selectedPeriod，在时期改变时打印新旧值
::::
:::

:::hint{title="computed 和 watch 的速查"}
| 我要... | 用哪个 | 写法 |
|---|---|---|
| 根据数据算出新值（筛选、格式化） | `computed` | `const x = computed(() => ...)` |
| 数据变了自动保存/发请求 | `watch` | `watch(source, (new, old) => { ... })` |
| 深度监听对象内部变化 | `watch` | `watch(obj, fn, { deep: true })` |
| 一上来就执行一次 | `watch` | `watch(obj, fn, { immediate: true })` |
| 自动追踪，不需指定依赖 | `watchEffect` | `watchEffect(() => { ... })` |
:::

:::recap
你学会了 `computed` 和 `watch` 的区别和用法 -- `computed` 用于自动计算派生值（如筛选列表、统计），自带缓存，依赖不变不重算。`watch` 用于监听数据变化后执行副作用（如保存 localStorage、发 API 请求），可以拿到新旧值。简单记：需要返回值用 `computed`，需要做事情用 `watch`。
:::
