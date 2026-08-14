# 响应式数据 — ref 与 computed 的真实写法

:::analogy
Vue 的响应式系统就像 Excel 表格 -- `ref` 是你手动填入的原始数值，`computed` 是写好的公式（如 =SUM(A1:A10)）。原始数值一改，所有依赖它的公式自动重新计算，所有显示这些结果的单元格自动刷新。你不用手动点"重新计算"按钮。
:::

:::explain{title="问题：原生 JS 的数据变了，页面是死的"}
先看原生 JS 的痛点。假设你要做一个计数器，数据显示在页面上：

```js
// 原生 JS：每改一次数据，就要手动更新一次 DOM
let count = 0

function increment() {
  count++                         // 1. 改数据
  document.getElementById('display').textContent = count  // 2. 手动更新 DOM
}

function decrement() {
  count--                         // 1. 改数据
  document.getElementById('display').textContent = count  // 2. 又手动更新 DOM
}

// 如果有三个地方显示 count？
function updateAllDisplays() {
  // 每个显示点都要手动更新 -- 漏掉一个就显示不一致！
  document.getElementById('display1').textContent = count
  document.getElementById('display2').textContent = count
  document.getElementById('display3').textContent = count
}
```

核心痛点：**数据和 DOM 是分离的**。数据变了，DOM 不会自己动。你必须手动追踪所有显示这个数据的地方，一个个更新。随着页面变复杂，漏掉某个更新点是必然的 -- 然后你看到的就是"数据明明改了但页面没变"的幽灵 bug。

这就是为什么前端领域花了十几年研究"响应式" -- 让数据变化**自动**同步到 UI。
:::

:::explain{title="方案：ref() -- 把数据变成"活"的"}
Vue 的 `ref()` 把你的数据包装成响应式引用。数据一旦被 `ref()` 包裹，Vue 就会追踪谁在用这个数据。数据变了，所有用到它的地方自动更新。

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)          // ref() 把 0 变成响应式数据
const name = ref('德彪西')
const tracks = ref([          // 数组也可以是响应式的
  { id: 1, title: '月光', composer: '德彪西' },
  { id: 2, title: '四季', composer: '维瓦尔第' },
])

function increment() {
  count.value++               // JS 中读写用 .value
  // 不需要任何 DOM 操作！页面自动更新！
}

function addTrack(title, composer) {
  tracks.value.push({ id: Date.now(), title, composer })
  // 数组变了，v-for 自动重新渲染 -- 不需要手动 createElement + appendChild
}
</script>

<template>
  <!-- 模板中自动解包，不需要 .value -->
  <p>计数：{{ count }}</p>
  <p>欢迎，{{ name }}</p>
  <button @click="increment">+1</button>

  <div v-for="track in tracks" :key="track.id">
    <h3>{{ track.title }}</h3>
    <p>{{ track.composer }}</p>
  </div>
</template>
```

逐行解读：
- 第 4 行 `ref(0)` -- 把普通数字 0 变成响应式的，Vue 开始追踪它的读写
- 第 10 行 `count.value++` -- 在 JS 代码中修改变量时**必须**用 `.value`，这是 Vue 3 响应式系统的核心约定
- 第 17 行 `{{ count }}` -- 在 `<template>` 中**不需要** `.value`，Vue 自动帮你解包
- 第 21 行 `v-for="track in tracks"` -- 当 `tracks.value` 数组被 `push` 新元素时，这个列表自动重新渲染

**核心规则：JS 中用 .value，模板中不用 .value。**

**和原生 JS 的本质区别：**
```js
// 原生 JS：数据 → 手动更新 DOM（一步都不能少）
count = 5
document.querySelector('#display').textContent = count

// Vue：数据 → 自动更新 DOM（你只改数据，Vue 负责剩下的）
count.value = 5
// 页面上的 {{ count }} 立刻显示 5，你什么都不用管
```
:::

:::explain{title="computed -- 自动计算的派生数据"}
`computed` 从已有数据派生出新数据。它像 Excel 的公式 -- 你定义了计算规则，依赖的数据一旦变化，结果自动更新。

```vue
<script setup>
import { ref, computed } from 'vue'

const pieces = ref([
  { name: '月光', period: 'classical', liked: true },
  { name: '四季', period: 'baroque', liked: false },
  { name: '夜曲', period: 'romantic', liked: true },
  { name: '春之歌', period: 'romantic', liked: false },
])

const selectedPeriod = ref('all')         // 用户选择的时期

// computed：自动计算筛选结果
const filteredPieces = computed(() => {
  if (selectedPeriod.value === 'all') {
    return pieces.value                   // 选"全部"就返回全部
  }
  return pieces.value.filter(p => p.period === selectedPeriod.value)  // 按时期筛选
})

// computed 可以链式依赖
const stats = computed(() => {
  return `筛选出 ${filteredPieces.value.length} 首中的 ${filteredPieces.value.filter(p => p.liked).length} 首收藏`
})
</script>

<template>
  <button @click="selectedPeriod = 'romantic'">浪漫主义</button>
  <p>{{ stats }}</p>
  <div v-for="p in filteredPieces" :key="p.name">
    <span>{{ p.name }} -- {{ p.period }}</span>
  </div>
</template>
```

逐行解读：
- 第 14 行 `computed(() => { ... })` -- 传一个函数，函数里用到了哪些响应式数据，这些数据变化时就自动重新执行
- 第 15-17 行 -- 计算逻辑：根据 `selectedPeriod` 的值决定返回全部还是筛选后的列表
- 第 20-22 行 -- `computed` 可以嵌套依赖：`stats` 依赖 `filteredPieces`，`filteredPieces` 依赖 `pieces` 和 `selectedPeriod`，任意一个变化都会级联更新

**computed vs 普通函数 -- 为什么不用普通函数？**
```js
// ❌ 普通函数：每次模板重新渲染都执行一次（频繁无意义计算）
function getFiltered() {
  return pieces.value.filter(p => p.period === selectedPeriod.value)
}

// ✅ computed：只有依赖数据变了才重新计算（缓存），否则返回上次结果
const filteredPieces = computed(() => {
  return pieces.value.filter(p => p.period === selectedPeriod.value)
})
```

`computed` 有**缓存**。依赖没变时，你访问 100 次它也只算一次（第一次算完记下来，后面直接返回缓存）。普通函数每次调用都重新算。当筛选逻辑复杂、数据量大时，这个缓存就是性能关键。
:::

:::example{title="实战对比：原生 JS vs Vue 响应式 -- 同样的功能，代码量差多少？"}
**功能：** 一个搜索框，一个列表，输入关键词即时筛选。

**原生 JS 实现（40+ 行）：**
```js
// HTML: <input id="search"> <ul id="list"></ul>
const data = [
  { name: '月光', composer: '德彪西' },
  { name: '四季', composer: '维瓦尔第' },
  // ...更多数据
]

const input = document.getElementById('search')
const list = document.getElementById('list')

// 渲染函数 -- 每次数据变化都要手动调用
function render(filtered) {
  list.innerHTML = ''                      // 清空
  filtered.forEach(item => {
    const li = document.createElement('li')
    li.textContent = `${item.name} - ${item.composer}`
    list.appendChild(li)
  })
}

// 初始渲染
render(data)

// 监听输入 -- 手动绑定事件，手动触发渲染
input.addEventListener('input', () => {
  const keyword = input.value.toLowerCase()
  const filtered = data.filter(item =>
    item.name.includes(keyword) || item.composer.includes(keyword)
  )
  render(filtered)                         // 手动调用渲染
})

// 问题：如果别的地方也要修改 data（如添加、删除），需要在每个修改点都调用 render()
// 漏掉一个，页面就显示过时数据
```

**Vue 实现（15 行）：**
```vue
<script setup>
import { ref, computed } from 'vue'

const data = ref([
  { name: '月光', composer: '德彪西' },
  { name: '四季', composer: '维瓦尔第' },
])

const keyword = ref('')

const filtered = computed(() => {
  if (!keyword.value) return data.value
  return data.value.filter(item =>
    item.name.includes(keyword.value) || item.composer.includes(keyword.value)
  )
})
</script>

<template>
  <input v-model="keyword" placeholder="搜索...">
  <ul>
    <li v-for="item in filtered" :key="item.name">
      {{ item.name }} - {{ item.composer }}
    </li>
  </ul>
</template>
```

**核心差距：** Vue 版本里你只需要定义数据和计算规则，页面自动跟随数据变化。原生 JS 版本里你必须记住在**所有**修改数据的地方调用 `render()`。数据越复杂，修改点越多，漏调 `render()` 的概率就越高。
:::

:::explain{title="常见错误"}
**错误 1：在 JS 中忘了 .value**
```js
const count = ref(0)

// ❌ 直接赋值 -- count 变成了普通数字 5，不再是响应式的
count = 5

// ❌ 没有 .value -- 修改的是 ref 对象本身，不是里面的值
count++

// ✅ 正确：通过 .value 访问和修改
count.value = 5
count.value++
```

**错误 2：解构时丢失响应式**
```js
const state = ref({ name: '张三', age: 25 })

// ❌ 解构后 name 是普通字符串，不再响应式
const { name, age } = state.value

// ✅ 不解构，直接通过 state.value.name 访问
console.log(state.value.name)
// ✅ 或用 toRefs 保持响应式
const { name, age } = toRefs(state)
```

**错误 3：computed 里忘了用 .value**
```js
const keyword = ref('')

// ❌ computed 里访问 ref 变量，忘记 .value
const filtered = computed(() => {
  return data.filter(item => item.includes(keyword))  // keyword 是 ref 对象，不是字符串！
})

// ✅ computed 里用 .value
const filtered = computed(() => {
  return data.filter(item => item.includes(keyword.value))
})
```

**错误 4：把 Vue 2 的数组局限当成 Vue 3 的限制**
```js
const list = ref(['a', 'b', 'c'])

// ✅ Vue 3 基于 Proxy，下标赋值是响应式的，能正常触发更新
list.value[0] = 'x'

// ✅ 数组方法（push, splice, filter 等）同样响应式
list.value.splice(0, 1, 'x')

// ✅ 整体替换数组也完全没问题
list.value = ['x', 'b', 'c']
// （以上三种写法在 Vue 3 中都合法且常用；Vue 2 时代的下标赋值/直接替换局限已不存在）
```
:::

:::explain{title="实际工作连接"}
响应式是 Vue 存在的根本理由。在实际项目中：

- **搜索+筛选页面**：`ref` 存关键词和筛选项，`computed` 自动计算筛选结果 -- 你永远不用手动调 `render()`
- **购物车总价**：`computed` 自动计算总价 = 单价 x 数量 x 折扣 -- 任意一项变化，总价自动更新
- **表单草稿保存**：`watch` 监听表单数据，自动存 localStorage -- 用户刷新后数据还在

在 Vue 项目中，业务逻辑的流向永远是：用户操作 → 修改 `ref` 数据 → `computed` 自动重算 → 页面自动刷新。你只需要关心"数据应该变成什么"，不需要关心"怎么更新 DOM"。这就是 Vue 让你写更少代码还能更少 bug 的原因。
:::

:::task{title="你的任务"}
::::step{purpose="ref() 是响应式系统的入口。通过 ref 包裹数据，Vue 开始追踪所有读写。在组合式 API 中，ref 是你创建响应式数据的第一选择。" expected="在 <script setup> 中定义了一个响应式的 pieces 数组和 selectedPeriod。"}
在 App.vue 中用 ref 创建项目数组 pieces 和当前选中的时期 selectedPeriod
::::

::::step{purpose="v-for 渲染列表，数据变化自动更新 DOM。和你之前手动调用 render() 函数不同，Vue 的响应式系统在数据变化时自动触发了重新渲染。" expected="页面上显示所有项目的名称、设计师和时期信息。"}
用 v-for 在页面上渲染所有项目
::::

::::step{purpose="用户通过按钮选择时期，修改 selectedPeriod。这个变化会传播到所有依赖它的地方 -- 这是响应式系统的核心行为。" expected="页面上出现筛选按钮，点击后按钮视觉上有选中状态。"}
添加时期筛选按钮（全部、古典、巴洛克、浪漫等）
::::

::::step{purpose="computed 从已有数据自动派生新值，自带缓存。selectedPeriod 改变时，computed 自动重新筛选 -- 你不需要手动调用任何更新函数。" expected="点击不同时期按钮，列表自动过滤。"}
用 computed 实现自动筛选 filteredPieces
::::

::::step{purpose="computed 可以链式依赖。一个 computed 依赖另一个 computed 的结果，形成数据流水线。任意环节变化，下游全部自动更新。" expected="页面上显示类似「共 X 首，其中 Y 首已收藏」的统计信息，切换筛选时数字自动变化。"}
基于 filteredPieces 再加一个 computed 显示统计信息（总数、已收藏数）
::::
:::

:::hint{title="<script setup> 的便利"}
`<script setup>` 是 Vue 3 推荐的写法。相比 Options API：
- **不需要 return** -- 顶层变量和函数自动暴露给模板
- **不需要 .value** -- 在 `<template>` 中 ref 自动解包
- **import 的组件直接可用** -- 不需要 `components` 注册步骤

就像从手动挡换成了自动挡 -- 做的事一样，但省了很多重复操作。
:::

:::recap
你学会了 Vue 响应式系统的核心 -- `ref()` 把普通数据变成响应式的（JS 中读写用 `.value`，模板中自动解包），`computed()` 从已有数据自动派生新值（自带缓存，依赖不变不重算）。数据变了，所有用到它的地方自动更新 -- 你永远不用像原生 JS 那样手动调用 `render()` 去更新 DOM。这就是 Vue 的魔法。
:::
