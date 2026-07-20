# localStorage — 给数据一个"永久的家"

:::analogy
localStorage 就像浏览器的抽屉——你把数据存进去，关掉网页、甚至重启电脑后，数据还在里面等你。适合保存用户设置、草稿、主题偏好这类不需要服务器但需要持久化的数据。
:::

:::prerequisite
**本节你需要知道这些词：**

- **JSON**：一种轻量级的数据格式，用来表示结构化数据
- **JSON.stringify**：把 JS 对象/数组转成 JSON 字符串
- **JSON.parse**：把 JSON 字符串还原成 JS 对象/数组
:::

## 1. 先看问题：刷新页面，数据全没了

你写了一个简单的待办列表，用户添加了几条任务：

```js
// ❌ 问题：数据只存在 JS 变量里——刷新页面全部归零
var todos = ['买牛奶', '写周报']           // 初始数据

function addTodo(text) {
  todos.push(text)                         // 添加——只在内存中
  render()                                 // 重新渲染页面
}

// 用户添加了 5 条任务，很满意
// 然后不小心刷新了页面——todos 变回初始的 2 条
// 用户辛辛苦苦添加的任务全丢了！
```

**为什么数据会丢？** JS 变量只存在于当前页面会话。刷新页面 = 重新加载 JS = 所有变量重新初始化。

**实际工作中你会用这个来：**
- 保存用户偏好：主题颜色（浅色/深色）、语言选择、字体大小
- 保存草稿：用户在表单里填了一半，刷新后数据还在——用户体验大幅提升
- 缓存数据：上次请求的列表数据存下来，下次打开页面先显示缓存，再更新
- 记录状态：用户是否看过引导页、是否关闭了某个公告

## 2. localStorage 基础操作

```js
// 四个核心 API——增、查、删、清
localStorage.setItem('userName', '小明')        // 存：键值对，都是字符串
var name = localStorage.getItem('userName')     // 取：返回字符串或 null
console.log(name)                               // "小明"

localStorage.removeItem('userName')             // 删：只删指定的 key
localStorage.clear()                            // 清：删掉所有数据——慎用！
```

**关键限制：localStorage 只能存字符串。** 存数字、对象、数组都需要转换：

```js
// ❌ 直接存对象——不行
var user = { name: '小明', age: 25 }
localStorage.setItem('user', user)              // 存进去的是 "[object Object]" ——没用！

// ✅ 用 JSON.stringify 转成字符串再存
localStorage.setItem('user', JSON.stringify(user))
// 存进去的是：'{"name":"小明","age":25}' ← 合法的 JSON 字符串

// ✅ 取的时候用 JSON.parse 还原
var saved = JSON.parse(localStorage.getItem('user'))
console.log(saved.name)                         // "小明"——正常的 JS 对象！
```
:::

:::explain{title="最常用的模式：加载时读取 + 修改后保存"}
几乎所有使用 localStorage 的场景都遵循这个模式：

```js
// ① 页面启动时：尝试从 localStorage 加载数据
//    JSON.parse(null) 返回 null，所以用 || [] 给默认值
var todos = JSON.parse(localStorage.getItem('myTodos')) || []

// ② 每次修改数据后：保存到 localStorage
function saveTodos() {
  localStorage.setItem('myTodos', JSON.stringify(todos))
}

// ③ 所有修改数据的地方都要调用 saveTodos()
function addTodo(text) {
  todos.push({ id: Date.now(), text: text, done: false })
  saveTodos()                                // ← 关键！别忘记
  render()
}

function deleteTodo(id) {
  todos = todos.filter(function(t) { return t.id !== id })
  saveTodos()                                // ← 每次修改都要保存
  render()
}

function toggleTodo(id) {
  var todo = todos.find(function(t) { return t.id === id })
  if (todo) {
    todo.done = !todo.done
    saveTodos()                              // ← 状态变化也要保存
    render()
  }
}

// ④ 页面初次渲染：用加载的数据
render()
```

**为什么 `|| []` 很重要？**

```js
// 第一次打开页面时，localStorage 里什么都没有
// getItem('myTodos') 返回 null
// JSON.parse(null) 返回 null
// null || [] → [] → 得到一个空数组，后续代码不会崩溃
```
:::

:::explain{title="sessionStorage —— localStorage 的\"孪生兄弟\""}
用法一模一样，差别只在生命周期：

| 对比 | localStorage | sessionStorage |
|------|-------------|----------------|
| API | `setItem/getItem/removeItem/clear` | **完全一样** |
| 生命周期 | 永久（除非用户清除） | 关闭标签页就没了 |
| 作用域 | 同域名下所有标签页共享 | 只在当前标签页有效 |
| 典型用途 | 主题偏好、草稿、缓存 | 表单多步骤向导、临时筛选条件 |

```js
// sessionStorage 用法和 localStorage 完全相同
sessionStorage.setItem('tempForm', JSON.stringify(formData))
var saved = JSON.parse(sessionStorage.getItem('tempForm'))
// 区别：用户关闭标签页后，tempForm 就没了——这正是想要的
```
:::

:::explain{title="5MB 容量限制和注意事项"}
localStorage 每个域名约 **5MB** 存储空间。超出会抛出 `QuotaExceededError`：

```js
// 安全写入：捕获容量溢出
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (err) {
    if (err.name === 'QuotaExceededError') {
      console.warn('localStorage 已满！', err)
      return false                        // 写入失败，让调用方处理
    }
    throw err                            // 其他错误还是抛出去
  }
}
```

**使用 localStorage 的注意事项：**

| 注意点 | 说明 |
|--------|------|
| 只能存字符串 | 对象/数组必须 JSON.stringify |
| 5MB 限制 | 不要存大文件（图片、视频） |
| 同步操作 | 读写是同步的，大量数据会阻塞页面 |
| 不要存敏感信息 | token、密码存 localStorage 不安全（XSS 攻击可读取） |
| 用户可清除 | 不要存"唯一"的关键数据，用户清除浏览器数据就没了 |
:::

## 3. 常见错误

**错误 1：忘记 JSON.parse —— 拿到字符串而不是对象**

```js
// ❌ 错误：取出来是字符串，不是数组
localStorage.setItem('list', JSON.stringify([1, 2, 3]))
var list = localStorage.getItem('list')    // list 是 '"[1,2,3]"' 字符串！
console.log(list.length)                   // 11（字符串长度），不是 3！

// ✅ 正确：用 JSON.parse 还原
var list = JSON.parse(localStorage.getItem('list'))
console.log(list.length)                   // 3——正确
```

**错误 2：第一次读取时没处理 null**

```js
// ❌ 错误：第一次打开页面，getItem 返回 null，JSON.parse(null) 返回 null
var todos = JSON.parse(localStorage.getItem('myTodos'))
todos.push('新任务')                        // TypeError: Cannot read property 'push' of null

// ✅ 正确：给默认值
var todos = JSON.parse(localStorage.getItem('myTodos')) || []
todos.push('新任务')                        // 正常——todos 至少是空数组
```

**错误 3：只在一个地方调了 save，其他地方忘了**

```js
// ❌ 错误：addTodo 里调了 save，deleteTodo 里忘了
function addTodo(text) {
  todos.push(text)
  saveTodos()                               // 保存了 ✓
  render()
}
function deleteTodo(id) {
  todos = todos.filter(function(t) { return t.id !== id })
  // 忘记 saveTodos()！刷新后删除的数据又回来了 ✗
  render()
}

// ✅ 正确：每个修改数据的地方都调用 saveTodos()
```

:::

:::task{title="动手试试"}
::::step{purpose="localStorage 让页面数据跨越会话——刷新、关闭浏览器再打开，数据都还在。这是让页面'有记忆'的第一步。" expected="首次打开显示默认 2 条数据。刷新页面，仍然是 2 条。"}
打开 `script.js`，实现数据持久化：
1. 页面启动时从 localStorage 读取 `myTodos`，用 `JSON.parse` 还原，`|| []` 兜底
2. 用读取到的数据渲染列表
3. 验证刷新页面后数据不变（目前还是初始数据，因为还没写保存逻辑）
::::

::::step{purpose="JSON.stringify 把对象'打包'成字符串存进 localStorage。为什么需要这步？因为 localStorage 只认字符串，不认 JS 对象。" expected="添加一条任务后，打开 DevTools → Application → Local Storage，看到 myTodos 键对应的值是 JSON 字符串。"}
实现 `saveTodos()` 函数：`localStorage.setItem('myTodos', JSON.stringify(todos))`。在添加任务后调用它。打开浏览器 DevTools 的 Application → Local Storage 面板验证数据已写入
::::

::::step{purpose="关键的纪律：在所有修改数据的地方都调用 saveTodos()。新增后、删除后、修改后——漏掉任何一处，刷新时数据就丢了。" expected="添加 3 条任务、删除 1 条、标记 1 条完成。刷新页面后，数据原封不动——你的页面真正'拥有了记忆'。"}
在删除任务、修改任务状态的所有位置都加上 `saveTodos()`。验证刷新后所有增减改操作结果都被保留
::::

:::

:::hint{title="localStorage 最佳实践"}
```js
// 1. 读取：始终带默认值
var data = JSON.parse(localStorage.getItem('key')) || []

// 2. 写入：包装 try/catch（防止容量溢出）
function saveData(value) {
  try {
    localStorage.setItem('key', JSON.stringify(value))
  } catch (err) {
    console.warn('保存失败：', err)
  }
}

// 3. 删除：可以清理过期数据（配合时间戳）
function saveWithTimestamp(key, value) {
  var data = { value: value, timestamp: Date.now() }
  localStorage.setItem(key, JSON.stringify(data))
}
```
:::

:::recap
你学会了 localStorage——浏览器提供的本地存储，数据在页面刷新、浏览器关闭后依然存在。四个核心 API：`setItem`（存）、`getItem`（取）、`removeItem`（删）、`clear`（清）。因为 localStorage 只能存字符串，存对象要先用 `JSON.stringify` 转 JSON，取出来用 `JSON.parse` 还原。标准模式是"启动时读取 + 修改后保存"，所有增删改操作后都要调用保存函数。注意事项：5MB 限制、同步操作可能阻塞、不要存敏感信息。sessionStorage 用法一样但关闭标签页数据就没了。实际工作中，localStorage 用于保存用户偏好、表单草稿、缓存数据等需要"持久化但不需要服务器"的场景。
:::
