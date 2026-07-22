# 异步 UI 的三种状态 — loading、error、empty

:::analogy
每个异步操作就像去餐厅点菜——点完菜在等（loading）、菜上桌了开吃（success）、服务员说"卖完了"（error）、菜单上有但厨房没备货（empty）。一个专业的页面，用户在每一步都应该看到对应的提示，而不是盯着空白屏幕怀疑人生。
:::

:::prerequisite
**本节你需要知道这些词：**

- **fetch()**：浏览器向服务器发送 HTTP 请求的函数
- **async/await**：让异步代码像同步代码一样读
- **DOM 操作**：用 JavaScript 增删改 HTML 元素和内容
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 说出一个异步页面必须处理的四种状态：Loading、Error、Empty、Success
- 用"状态对象 + render 函数"模式统一管理 UI 状态
- 区分 Empty（请求成功但无数据）和 Error（请求失败），并给用户不同的反馈
- 用递增序号解决竞态条件——快速操作时旧结果覆盖新结果的问题
:::

:::explain{title="一、先看问题：没有状态管理的页面长什么样？"}
看这段最常见的"功能写了，但不可用"的代码：

```js
// ❌ 只处理了"成功拿到数据"这一种情况
async function loadPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()

  const container = document.querySelector('#post-list')
  container.innerHTML = posts.map(function(p) {
    return '<li>' + p.title + '</li>'
  }).join('')
}

loadPosts()
```

**这段代码在 3 种情况下会出问题：**

| 场景 | 用户看到什么 | 用户体验 |
|------|-------------|----------|
| 网络正常、有数据 | 帖子列表 | 不错 |
| 网络慢（慢速 3G） | **白屏** —— 页面一片空白，直到数据到达 | 用户以为页面坏了，关掉走人 |
| 请求失败（断网/500） | **白屏** —— 没有错误提示 | 用户不知道发生了什么，刷新也没用 |
| 数据是空数组 | **白屏** —— 虽然请求成功了 | 用户以为功能坏了，实际只是数据库里没数据 |

**一个专业页面必须处理的状态：**
1. **Loading** —— 正在加载，显示加载动画，按钮禁用防止重复点击
2. **Error** —— 加载失败，显示具体错误信息 + 重试按钮
3. **Empty** —— 加载成功但没有数据，显示空状态提示 + 引导操作
4. **Success** —— 加载成功有数据，正常渲染
:::

:::explain{title="二、解决方案：状态对象 + 渲染函数"}
用一个状态对象统一管理，用一个渲染函数根据状态显示不同内容：

```js
// ① 状态对象——页面状态的"唯一真相来源"
var state = {
  loading: false,   // 是否正在加载
  error: null,      // 错误信息（null = 无错误）
  data: []          // 数据（初始为空数组）
}

// ② 渲染函数——根据状态决定显示什么
function render() {
  var app = document.querySelector('#app')

  // 判断顺序很重要：loading → error → empty → 正常渲染
  if (state.loading) {
    app.innerHTML = '<div class="loading"><div class="spinner"></div><p>正在加载数据...</p></div>'
    return
  }

  if (state.error) {
    app.innerHTML = '<div class="error"><p>加载失败：' + state.error + '</p><button onclick="loadData()">点击重试</button></div>'
    return
  }

  if (state.data.length === 0) {
    app.innerHTML = '<div class="empty"><p>暂无数据</p><p>还没有任何帖子，快去创建第一个吧！</p></div>'
    return
  }

  // 正常渲染数据
  var html = '<ul class="post-list">'
  html += state.data.map(function(post) {
    return '<li class="post-item"><h3>' + post.title + '</h3><p>' + post.body.slice(0, 80) + '...</p></li>'
  }).join('')
  html += '</ul>'
  app.innerHTML = html
}

// ③ 数据加载函数——串联 fetch + 状态更新 + 渲染
async function loadData() {
  state.loading = true; state.error = null; state.data = []
  render()                                 // 立即渲染 loading

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) throw new Error('服务器返回 ' + response.status)
    const data = await response.json()
    state.loading = false
    state.data = data.slice(0, 10)
    render()
  } catch (err) {
    state.loading = false
    state.error = err.message
    render()
  }
}

loadData()
```

**这个模式的核心：每改一次 state，立即调一次 render()，UI 始终反映最新状态。**
:::

:::explain{title="三、Loading、Error、Empty 三种状态详解"}
**Loading 状态——让用户知道"正在进行中"**

Loading 的核心是**防止用户焦虑**和**防止重复操作**：

```js
async function handleSubmit() {
  var btn = document.querySelector('#submit-btn')
  btn.disabled = true                      // ① 禁用按钮——防重复提交
  btn.textContent = '提交中...'            // ② 改变按钮文字——给用户反馈
  try {
    await api.post('/submit', formData)
    btn.textContent = '提交成功！'
  } catch (err) {
    btn.textContent = '提交失败，点击重试'
    btn.disabled = false
  }
}
```

**Error 状态——出错了也要给用户一条出路**

```js
catch (err) {
  // 根据错误类型给不同的用户提示
  if (err.message.includes('NetworkError') || err.message.includes('fetch')) {
    state.error = '网络连接失败，请检查网络后重试'
  } else if (err.message.includes('404')) {
    state.error = '请求的内容不存在（404）'
  } else if (err.message.includes('500')) {
    state.error = '服务器繁忙，请稍后重试'
  } else {
    state.error = '未知错误：' + err.message
  }
  console.error('[loadData]', err)        // 开发者也需要完整错误信息
  render()
}
```

**Empty 状态——"没有数据"不等于"出错了"**

| 对比维度 | Empty（空状态） | Error（错误） |
|----------|----------------|--------------|
| 原因 | 请求成功，数据库里确实没数据 | 请求失败，根本没拿到数据 |
| 用户看到的 | "暂无内容，去创建第一个吧" | "加载失败，点击重试" |
| 有重试按钮？ | 没有（重试也没用） | 必须要有 |
| 有引导操作？ | 有——引导用户去创建/添加 | 没有——先解决错误才能继续 |
:::

:::explain{title="四、竞态条件——快速操作时的隐藏 bug"}
搜索框场景：用户快速输入"A" → "AB" → "ABC"，三个请求同时发出：

```js
// ❌ 有问题：旧请求可能覆盖新请求的结果
async function search(keyword) {
  state.loading = true; render()
  const data = await fetch('/api/search?q=' + keyword)
  state.data = data; render()              // 没检查 keyword 是不是最新的！
}

// ✅ 用递增序号解决——只处理最新请求的结果
var requestId = 0
async function search(keyword) {
  var currentId = ++requestId              // 每次请求分配一个新序号
  state.loading = true; render()

  try {
    const data = await fetch('/api/search?q=' + keyword)
    if (currentId !== requestId) {         // 不是最新的请求了
      console.log('丢弃过时请求的结果')
      return                               // 丢弃！
    }
    state.data = data; render()
  } catch (err) {
    if (currentId !== requestId) return    // 旧请求的错误也丢弃
    state.error = err.message; render()
  }
}
```
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：只处理成功状态——loading 和 error 都不管**

```js
// ❌ 最典型的新手代码——只有一条执行路径
async function loadData() {
  const data = await fetch('/api/data').then(r => r.json())
  renderList(data)                         // 失败时这里静默崩溃
}

// ✅ 最少要处理三种状态
async function loadData() {
  showLoading()
  try {
    const data = await fetch('/api/data').then(r => r.json())
    if (data.length === 0) { showEmpty() }
    else { renderList(data) }
  } catch (err) {
    showError(err.message)
  }
}
```

**错误 2：loading 设为 false 后忘记调用 render**

```js
// ❌ 状态改了，但界面没更新
state.loading = false
state.data = data
// 忘记 render()！页面一直显示 loading 动画，用户永远等不到结果

// ✅ 每次改状态都调用 render
state.loading = false; state.data = data; render()
```

**错误 3：错误信息太笼统**

```js
// ❌ 不管什么错都只说"出错了"
catch (err) { state.error = '出错了' }

// ✅ 区分错误类型
catch (err) {
  if (err.message.includes('fetch')) state.error = '网络连接失败'
  else if (err.message.includes('404')) state.error = '内容不存在'
  else state.error = err.message
}
```
:::

:::explain{title="五、实际工作中你会怎么用？"}
异步 UI 状态管理是**每个页面的骨架**——不管你做什么业务，加载数据的逻辑都遵循这个模式：

- **任何从后端加载数据的页面**——几乎就是所有页面
- **表单提交**——提交中禁用按钮，成功后提示，失败后允许重试
- **列表页、详情页、搜索结果页**——都需要处理 loading/error/empty/success

**状态管理口诀：**
```
loading? → 显示加载动画
error?   → 显示错误+重试
empty?   → 显示空状态+引导
else     → 正常渲染数据
```
**核心规则：每改一次 state，调一次 render()。** 忘了调 render，状态改了但界面不变。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="亲手实现完整的三态数据加载器——这是异步 UI 的标配模式，每个需要加载数据的页面都遵循这个模式。" expected="页面依次显示：loading 动画 → 数据列表（10条帖子）。把 URL 改错后显示 error 状态+重试按钮。手动设置 data=[] 后显示 empty 状态。"}
打开 `script.js`，实现完整的数据加载器：
1. 定义 `state = { loading: false, error: null, data: [] }`
2. 实现 `render()`：按 loading → error → empty → 正常渲染的分支判断
3. 实现 `loadData()`：重置状态 → render → fetch → 更新状态 → render
4. 分别测试：正常 URL、错误 URL、手动清空 data
::::

::::step{purpose="重试按钮是底线——用户遇到错误时不应该只有'刷新整个页面'这一个选项。" expected="点击重试按钮后，页面重新显示 loading，然后根据网络情况显示成功或再次失败。"}
在 `render()` 的 error 分支中加入重试按钮：`<button onclick="loadData()">点击重试</button>`。验证点击后确实重新发起请求
::::

::::step{purpose="竞态条件是异步 UI 最常见但也最隐蔽的 bug——快速操作时旧结果覆盖新结果。用递增序号解决是中级前端的分水岭。" expected="快速连续输入 3 个不同的搜索词，只有最后一次的结果被渲染到页面。"}
实现搜索功能并处理竞态条件：每次搜索用递增的 `requestId` 标记，响应回来后检查是否最新
::::

:::

:::recap
你学会了异步 UI 的状态管理——任何从服务器加载数据的页面都需要处理四种状态：Loading（加载中，显示动画+禁用按钮）、Error（请求失败，具体错误信息+重试按钮）、Empty（请求成功但无数据，空状态提示+引导操作）、Success（正常渲染数据）。核心模式是"状态对象 + render 函数 + 分支判断"，每改一次 state 就调一次 render 让 UI 同步。还要处理竞态条件——用递增序号确保只渲染最新请求的结果。实际工作中，这就是每个页面的骨架。
:::
