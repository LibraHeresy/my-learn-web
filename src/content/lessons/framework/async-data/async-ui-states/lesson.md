# 异步 UI 的三种状态 — loading、error、empty

:::analogy
每个异步操作就像在餐厅点菜——点完菜（触发请求）、等上菜（loading）、菜上桌（success）、服务员说"卖完了"（error）、菜单上没这道菜（empty）。用户在每一步都应该看到对应的提示。一个专业的页面会处理好这三种状态。
:::

:::prerequisite
**本节你需要知道这些词：**

- **fetch()**：浏览器向服务器发送 HTTP 请求的函数
- **Promise**：表示一个异步操作的结果——可能成功也可能失败
- **DOM 操作**：用 JavaScript 增删改 HTML 元素和内容的编程方式
:::

:::explain{title="问题：你的页面在等待数据时显示什么？"}
看一段最常见的"新手代码"：

```js
async function loadPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()

  // 直接渲染
  const container = document.querySelector('#post-list')
  container.innerHTML = posts.map(p => `<li>${p.title}</li>`).join('')
}

loadPosts()
```

这段代码有什么问题？

1. **网络慢的时候**——页面一片空白，用户不知道是在加载还是坏了
2. **请求失败的时候**——页面仍然一片空白，用户不知道出了什么事
3. **返回空数据的时候**——页面是空白，用户以为功能坏了

**一个好的页面，在数据到达之前、请求失败之后、数据为空的时候，用户都能看到对应的提示。** 这就是"异步 UI 的三种状态"要解决的问题。
:::

:::explain{title="核心概念：每个异步操作都有三种状态"}
任何一个需要从服务器获取数据的 UI，都应该处理这三种状态：

```
触发请求
    │
    ▼
┌─────────────┐
│  Loading    │  ← 请求进行中，显示加载动画
│  加载中...  │
└──────┬──────┘
       │
       ▼
  响应回来了
       │
   ┌───┴───┐
   │       │
 成功    失败
   │       │
   ▼       ▼
┌──────┐ ┌──────┐
│ 有数据│ │  Error│ ← 请求失败，显示错误+重试
│ 渲染  │ │ 出错! │
└──┬───┘ └──────┘
   │
   ▼
  数据是空数组？
   │
┌──┴───┐
│ Empty │  ← 请求成功但没数据，显示空状态
│ 暂无  │
└──────┘
```

**三种状态的定义：**

| 状态 | 含义 | 用户看到什么 |
|------|------|-------------|
| **Loading** | 请求还在路上 | 加载动画、骨架屏、按钮禁用 |
| **Error** | 请求失败了 | 错误信息、重试按钮 |
| **Empty** | 请求成功但没数据 | "暂无数据"、引导操作 |
:::

:::example{title="状态管理模式——用三个变量控制 UI"}
用一个简单的状态对象统一管理三种状态：

```js
// 状态定义
let state = {
  loading: true,    // 初始状态：正在加载
  error: null,       // 错误信息（null = 无错误）
  data: []           // 数据（初始为空数组）
}

// 渲染函数：根据状态决定显示什么
function render() {
  const container = document.querySelector('#app')

  if (state.loading) {
    // 状态 1：加载中
    container.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>正在加载数据...</p>
      </div>`
  } else if (state.error) {
    // 状态 2：出错了
    container.innerHTML = `
      <div class="error">
        <p>加载失败：${state.error}</p>
        <button onclick="loadData()">重试</button>
      </div>`
  } else if (state.data.length === 0) {
    // 状态 3：没数据
    container.innerHTML = `
      <div class="empty">
        <p>暂无数据</p>
        <p>请稍后再来查看</p>
      </div>`
  } else {
    // 正常渲染数据
    container.innerHTML = `
      <ul>
        ${state.data.map(item => `<li>${item.title}</li>`).join('')}
      </ul>`
  }
}
```

**判断顺序很重要：** 先判断 `loading`，再判断 `error`，最后判断 `empty`。这个顺序保证每次只显示一种状态，不会出现"又是加载中又是错误提示"的混乱情况。
:::

:::explain{title="完整的数据加载流程"}
把 fetch、状态更新、渲染串联起来：

```js
async function loadData() {
  const container = document.querySelector('#app')

  // 第 1 步：重置状态——开始加载
  state.loading = true
  state.error = null
  state.data = []
  render()  // 立即渲染——显示 loading

  try {
    // 第 2 步：发请求
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    // 第 3 步：检查响应状态
    if (!response.ok) {
      throw new Error(`请求失败（状态码：${response.status}）`)
    }

    const data = await response.json()

    // 第 4 步：请求成功——更新状态
    state.loading = false
    state.data = data
    render()  // 再次渲染——显示数据（或空状态）

  } catch (err) {
    // 第 5 步：请求失败——更新状态
    state.loading = false
    state.error = err.message
    render()  // 再次渲染——显示错误信息
  }
}

// 启动
loadData()
```

**关键细节：**
- 请求前重置状态（`loading: true, error: null`）防止上一次的错误信息残留
- 每改一次状态就调一次 `render()`，让 UI 始终反映最新状态
- `try/catch` 包裹整个异步流程，错误统一处理
:::

:::explain{title="Loading 状态——让用户知道'正在进行中'"}
Loading 状态的核心目的：**告诉用户"系统收到了你的操作，正在处理"。**

**好的 Loading 设计：**

```js
// 1. 按钮加 loading 状态——防止重复点击
async function handleSubmit() {
  const btn = document.querySelector('#submit-btn')

  // 进入 loading 状态
  btn.disabled = true
  btn.textContent = '提交中...'

  try {
    await fetch('/api/submit', { method: 'POST', body: JSON.stringify(data) })
    btn.textContent = '提交成功！'
  } catch (err) {
    btn.textContent = '提交失败，点击重试'
    btn.disabled = false  // 恢复按钮
  }
}
```

**Loading 最佳实践：**

| 做法 | 为什么 |
|------|--------|
| 禁用操作按钮 | 防止用户重复点击导致重复提交 |
| 显示加载动画或文字 | 让用户知道不是卡死了 |
| 使用骨架屏代替转圈 | 骨架屏让用户"预见到"内容的位置，体感更快 |
| 不要让 loading 一闪而过 | 如果请求太快（<200ms），可以不显示 loading——闪烁反而让人不舒服 |

**骨架屏（Skeleton Screen）** 是比转圈更好的 loading 体验——用灰色占位块模拟将要出现的内容布局：

```js
function renderLoading() {
  container.innerHTML = `
    <div class="skeleton">
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
      <div class="skeleton-line medium"></div>
    </div>`
}
```
:::

:::explain{title="Error 状态——出错了也要优雅"}
Error 状态的核心目的：**告诉用户出了什么问题，并给一条出路。**

```js
function renderError(message) {
  container.innerHTML = `
    <div class="error-container">
      <p>加载失败：${message}</p>
      <button onclick="loadData()">点击重试</button>
    </div>`
}
```

**Error 设计要点：**

1. **具体错误信息**——不要只说"出错了"，说出是什么错
   ```js
   // ❌ 差
   state.error = '出错了'

   // ✅ 好
   if (err.message.includes('NetworkError')) {
     state.error = '网络连接失败，请检查网络后重试'
   } else if (response.status === 404) {
     state.error = '请求的内容不存在（404）'
   } else if (response.status === 500) {
     state.error = '服务器内部错误，请稍后重试'
   } else {
     state.error = `未知错误：${err.message}`
   }
   ```

2. **重试按钮**——给用户立刻解决问题的途径
   ```html
   <button onclick="loadData()">重试</button>
   ```

3. **不要把错误"吞掉"**——`catch` 里至少要 `console.error(err)`，方便排查问题
   ```js
   catch (err) {
     console.error('加载数据失败：', err)  // 开发者需要看到
     state.error = err.message             // 用户需要看到
   }
   ```

**常见错误类型及对应提示：**

| 错误类型 | 提示文案 |
|----------|----------|
| 网络断开 | "网络连接失败，请检查网络" |
| 超时 | "请求超时，请稍后重试" |
| 404 | "请求的内容不存在" |
| 500 | "服务器繁忙，请稍后重试" |
| CORS 错误 | "跨域请求被拦截"（开发的锅，不是用户的） |
:::

:::explain{title="Empty 状态——'没有数据'不等于'出错了'"}
Empty 状态的核心目的：**让用户知道功能是正常的，只是目前没有数据。**

```js
function renderEmpty() {
  container.innerHTML = `
    <div class="empty-container">
      <p>暂无数据</p>
      <p>还没有任何内容，快去创建第一个吧！</p>
    </div>`
}
```

**Empty 和 Error 的区别：**

| | Empty（空状态） | Error（错误） |
|------|-----------|---------|
| 原因 | 请求成功，但数据库里确实没有数据 | 请求失败，根本没拿到数据 |
| 用户看到的 | "暂无内容" | "加载失败" |
| 有重试按钮吗？ | 通常没有（重试也没用） | 有 |
| 有引导吗？ | 有——引导用户去创建数据 | 没有——先解决错误 |

**好的 Empty 设计会引导用户行动：**
- 搜索无结果 → "换个关键词试试？"
- 购物车为空 → "去看看大家都在买什么"
- 通知列表为空 → "暂无新通知"（这种情况很正常，不需要引导）
:::

:::example{title="完整示例——一个带重试功能的数据加载器"}
把三种状态整合到一个完整的功能中：

```html
<!-- HTML 结构 -->
<div id="app">
  <div class="loading">正在加载...</div>
</div>
```

```js
// 状态管理
const state = {
  loading: false,
  error: null,
  data: []
}

// 渲染函数
function render() {
  const app = document.querySelector('#app')

  if (state.loading) {
    app.innerHTML = `
      <div class="state-loading">
        <div class="spinner"></div>
        <p>正在加载数据...</p>
      </div>`
    return
  }

  if (state.error) {
    app.innerHTML = `
      <div class="state-error">
        <p>出错了：${state.error}</p>
        <button onclick="loadPosts()">点击重试</button>
      </div>`
    return
  }

  if (state.data.length === 0) {
    app.innerHTML = `
      <div class="state-empty">
        <p>暂无数据</p>
        <p>还没有任何帖子</p>
      </div>`
    return
  }

  // 正常渲染
  app.innerHTML = `
    <ul class="post-list">
      ${state.data.map(post => `
        <li class="post-item">
          <h3>${post.title}</h3>
          <p>${post.body.slice(0, 80)}...</p>
        </li>
      `).join('')}
    </ul>`
}

// 数据加载函数
async function loadPosts() {
  // 重置状态
  state.loading = true
  state.error = null
  state.data = []
  render()

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    if (!response.ok) {
      throw new Error(`服务器返回 ${response.status}`)
    }

    const data = await response.json()

    state.loading = false
    state.data = data.slice(0, 10)  // 只取前 10 条
    render()

  } catch (err) {
    state.loading = false
    state.error = err.message
    render()
  }
}

// 启动
loadPosts()
```

**测试不同状态——手动触发：**

```js
// 测试 loading 状态：把 fetch URL 改成一个慢速地址
// 或者用 setTimeout 延迟

// 测试 error 状态：把 URL 改成不存在的地址
// fetch('https://this-does-not-exist.example.com/posts')

// 测试 empty 状态：请求成功后手动清空数据
// state.data = []; render()
```
:::

:::explain{title="竞态条件（Race Condition）——快速切换时的陷阱"}
如果你做了一个搜索框，用户快速输入时可能会遇到一个 bug：旧请求的结果覆盖了新请求的结果。

```js
// ❌ 潜在问题：用户输入"A" → 输入"AB" → 输入"ABC"
// 如果"A"的请求最慢，最后到达，就会覆盖"ABC"的结果！
async function search(keyword) {
  state.loading = true
  render()

  const data = await fetch(`/api/search?q=${keyword}`).then(r => r.json())

  state.loading = false
  state.data = data
  render()
  // ⚠️ 这里没检查 keyword 是不是最新的！
}
```

**解决方案：记录请求序号或使用 AbortController**

```js
let requestId = 0  // 递增的请求序号

async function search(keyword) {
  const currentId = ++requestId  // 记录本次请求的序号

  state.loading = true
  render()

  try {
    const data = await fetch(`/api/search?q=${keyword}`).then(r => r.json())

    // 只有最新请求的结果才更新状态
    if (currentId !== requestId) {
      console.log('忽略过时请求的结果')
      return
    }

    state.loading = false
    state.data = data
    render()

  } catch (err) {
    if (currentId !== requestId) return  // 旧请求的错误也忽略
    state.loading = false
    state.error = err.message
    render()
  }
}
```

**核心思路：** 每次发请求时分配一个递增的 ID，响应回来后检查 ID 是不是最新的——如果不是，说明有更新的请求发出去了，直接丢弃这个结果。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="亲手从头实现一个完整的三态数据加载器。从'状态对象 → render 分支逻辑 → fetch 流程'一气呵成，这是异步 UI 的核心能力——几乎每个需要加载数据的页面都遵循这个模式。" expected="页面依次显示：loading → 数据列表（10条帖子）。把 URL 改错后显示 error 状态和重试按钮。手动清空 data 数组后显示 empty 状态。"}
实现一个完整的异步数据加载器，包含 loading、error、empty 三种状态
```js
const state = { loading: false, error: null, data: [] }

function render() {
  // 根据 state 的三种状态，分别渲染不同内容
}

async function loadData() {
  // 重置状态 → 渲染 loading → fetch → 更新状态 → 渲染结果
}

loadData()
```
::::

::::step{purpose="重试按钮是'最基本的用户体验底线'——用户遇到错误时不应该只有'刷新整个页面'这一个选择。重试逻辑本质就是重新调用一次 loadData，状态重置后走一遍完整流程。" expected="点击重试按钮后重新发起请求，loading → 成功渲染或再次失败。"}
给 error 状态添加重试按钮，点击后重新调用加载函数
```js
// 在 render() 的 error 分支里：
`<button onclick="loadData()">点击重试</button>`
```
::::

::::step{purpose="竞态条件是异步 UI 最常见的隐性 bug——测试时不一定会出现，但用户快速操作时就会暴露。用递增序号或 {{term:AbortController}} 处理它，是中级前端的分水岭。" expected="快速连续搜索 3 次（如依次输入'a'、'ab'、'abc'），只有最后一次的结果被渲染。"}
用请求序号解决竞态条件——实现一个搜索功能，确保只显示最新结果
```js
let requestId = 0

async function search(keyword) {
  const id = ++requestId
  // 发请求...
  // 响应回来后检查 id === requestId，不相等就丢弃
}
```
::::

:::

:::hint{title="三种状态记忆诀窍"}
记住餐厅类比就够了：
- **Loading** = 服务员说"正在做，请稍等"
- **Error** = 服务员说"不好意思这道菜卖完了" + 给你菜单让你重新选（重试按钮）
- **Empty** = 菜单上有这道菜，但厨房冰箱里没有——功能正常，只是现在没货

判断顺序：先 loading → 再 error → 最后 empty → 否则正常渲染。每改一次 state 就调一次 render()。
:::

:::recap
你学会了异步 UI 的三种核心状态：Loading（请求进行中，禁用按钮、显示加载动画）、Error（请求失败，显示具体错误+重试按钮）、Empty（请求成功但无数据，显示空状态提示）。核心模式是"状态对象 + render 函数 + 状态判断分支"。每个请求前重置状态，每改一次状态就重新渲染。还要注意竞态条件——用请求序号确保只处理最新请求的结果。
:::
