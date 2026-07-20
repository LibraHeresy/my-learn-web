# async/await — 让异步代码"看起来同步"

:::analogy
async/await 就像把"点外卖"写成了"先下单、等送到、然后吃"——读起来像一步接一步，但实际上等外卖的时候你并没有原地发呆（没有阻塞线程），只是这段函数"暂停"了，别的代码照样跑。
:::

:::prerequisite
**本节你需要知道这些词：**

- **Promise**：表示一个异步操作的结果——可能成功也可能失败
- **.then()**：Promise 的方法，注册异步操作成功后要执行的回调
- **Event Loop**：JavaScript 调度异步任务的运行机制
:::

## 1. 先看问题：Promise 链很长时，代码仍然不够直观

你已经学会了 Promise 链，它能拉平回调。但看一个真实场景——页面加载时依次获取数据：

```js
// 虽然比回调地狱好多了，但 .then() 链还是有点绕
function loadPage() {
  return fetchUser('小明')                      // .then() 里套 .then()
    .then(function(user) {
      return fetchPosts(user.id)
    })
    .then(function(posts) {
      return fetchComments(posts[0].id)         // 取第一个帖子的评论
    })
    .then(function(comments) {
      // 问题：这里能用 user.name 吗？不能——user 在上面的作用域里丢了
      console.log('评论数：', comments.length)
      return renderPage(comments)               // 需要渲染的数据分散在不同 .then() 里
    })
    .catch(function(err) {
      console.log('加载失败', err)
    })
}
// 三个问题：
// 1. 每步都要 return，漏了就链断了
// 2. 前一步的数据（如 user）在后面 .then() 里拿不到——数据在链上丢失了
// 3. 逻辑是"把一个大任务切成多个 .then()"，不太直觉
```

**实际工作中你会用这个来：**
- 页面初始化：依次加载用户信息 → 根据角色加载菜单 → 根据菜单加载数据
- 表单提交流程：校验 → 上传文件 → 提交 → 跳转
- 任何"先 A 后 B，B 依赖 A 的结果"的场景

## 2. 解决方案：async/await 让异步代码像同步代码一样读

```js
// ✅ async/await：从上往下读，和同步代码一模一样
async function loadPage() {                      // async 声明这是一个异步函数
  try {
    const user = await fetchUser('小明')          // await：等 Promise 完成，拿到结果
    const posts = await fetchPosts(user.id)       // 直接用 user.id，没有作用域问题
    const comments = await fetchComments(posts[0].id)
    // 在这里，user、posts、comments 三个变量都能用！
    console.log(user.name + '的第一篇帖子有 ' + comments.length + ' 条评论')
    return renderPage(comments)
  } catch (err) {                                 // try/catch 回归——和同步代码一样
    console.log('加载失败', err)
    return null
  }
}
```

**async/await 解决了 Promise 链的三大痛点：**
1. 不需要 `return` 来传数据——`await` 直接把 Promise 的结果赋给变量
2. 所有变量都在同一个作用域——`user`、`posts`、`comments` 都能互访
3. 错误处理用 `try/catch`——和同步代码的习惯完全一致

:::explain{title="关键认知：await 暂停执行，但不阻塞线程"}
这是新手最容易搞混的一点：

```js
async function demo() {
  console.log('① 函数开始')
  const result = await fetch('/api/data')   // "暂停"，等网络请求完成
  console.log('③ 数据到了：', result)       // 请求完成后继续
}

console.log('② 主线程继续')
demo()
// 输出顺序：① → ② → ③
// await 只暂停 demo 函数内部，不阻塞主线程！
// 就像你等外卖时没有原地发呆，而是去刷了会儿手机（主线程继续运行）
```

**`await` 做了什么？**
- 如果 Promise 是 fulfilled → 返回结果值（就像 `.then(value => value)`）
- 如果 Promise 是 rejected → 抛出异常（可以用 `try/catch` 捕获）
- 函数内的代码暂停，但主线程继续——如果你同时启动了另一个 `async` 函数，它照样跑
:::

:::example{title="串行 vs 并行——到底用哪个？"}
`await` 默认是**串行**的（一个接一个等）。但如果两个请求互不依赖，应该**并行**：

```js
// ❌ 串行——没有依赖关系却一个接一个等，浪费时间
async function loadDashboard_SLOW() {
  const user = await fetchUser()       // 等 800ms
  const posts = await fetchPosts()     // 再等 600ms —— 但这两步没关系！
  const weather = await fetchWeather() // 再等 400ms
  // 总计：1800ms，花了三倍时间
}

// ✅ 并行——三个没有依赖的请求同时发出
async function loadDashboard_FAST() {
  const [user, posts, weather] = await Promise.all([
    fetchUser(),       // 同时发出
    fetchPosts(),      // 同时发出
    fetchWeather()     // 同时发出
  ])
  // 总计：800ms（取最慢的那个），快了 2 倍多！
}

// 🟡 混合——先串行再并行，实际项目中最常见
async function loadPage() {
  const user = await fetchUser()                     // 先拿用户（依赖用户 ID 才能查别的）
  const [posts, favorites, notifications] = await Promise.all([
    fetchPosts(user.id),                             // 这些都用 user.id，但彼此不依赖
    fetchFavorites(user.id),                         // 所以并行
    fetchNotifications(user.id)
  ])
  // 总计：800ms + max(600, 400, 300)ms = 1400ms
  // 如果全部串行：800+600+400+300 = 2100ms，慢了 50%
}
```

**判断规则：** B 需要 A 的结果 → 串行。B 和 C 互不依赖 → 并行。
:::

## 3. 常见错误

**错误 1：忘记 await——拿到 Promise 对象而不是数据**

```js
// ❌ 错误：user 是一个 Promise 对象，不是用户数据
async function getUser() {
  const user = fetch('/api/user')       // 忘写 await！user 是 Promise，不是数据
  console.log(user.name)                // undefined —— Promise 对象没有 .name 属性
}

// ✅ 正确：加上 await
async function getUser() {
  const user = await fetch('/api/user')
  console.log(user.name)                // 正确：拿到了用户数据
}
```

**错误 2：不相关的请求却串行 await——白等**

```js
// ❌ 错误：帖子列表和通知列表没有依赖关系，却串行等
async function loadPage() {
  const posts = await fetchPosts()         // 等 500ms
  const notifications = await fetchNoti()  // 再等 500ms = 总共 1000ms
}
// ✅ 正确：并行请求，只要 ~500ms
async function loadPage() {
  const [posts, notifications] = await Promise.all([
    fetchPosts(),
    fetchNoti()
  ])
}
```

**错误 3：循环里用 await 导致串行——该并行时没并行**

```js
// ❌ 错误：循环里 await，串行执行——10 个请求逐个等
async function loadUsers(ids) {
  const users = []
  for (const id of ids) {
    users.push(await fetchUser(id))    // 每个 await 都等前一个完成
  }
  return users                          // 10 个请求 → 10 倍时间
}

// ✅ 正确：map + Promise.all，并行执行
async function loadUsers(ids) {
  const promises = ids.map(function(id) { return fetchUser(id) })  // 全部发出
  const users = await Promise.all(promises)                        // 一起等
  return users                                                      // 10 个请求 → 1 倍时间
}
```

**错误 4：async 函数里没写 try/catch——错误静默消失**

```js
// ❌ 错误：没有 try/catch，Promise reject 了也没人管
async function loadUser() {
  const user = await fetch('/api/user/999')  // 如果 404，这里抛异常
  console.log(user.name)                     // 永远不会执行
  // 错误没人处理，用户看到白屏——不知道发生了什么
}

// ✅ 正确：try/catch 包裹
async function loadUser() {
  try {
    const user = await fetch('/api/user/999')
    console.log(user.name)
  } catch (err) {
    console.error('加载用户失败：', err)       // 记录到控制台（开发调试）
    showErrorMessage('用户加载失败，请重试')    // 告诉用户（用户体验）
  }
}
```

:::task{title="动手试试"}
::::step{purpose="亲手对比 Promise 链和 async/await 两种写法，感受代码可读性的差异。同一个逻辑，async/await 把嵌套拉成了直线。" expected="两种写法得到完全相同的 concert 对象，但 async/await 版本不用嵌套 .then()。"}
打开 `script.js`，先写一个 Promise 链版的 `loadConcert()`，再写一个 async/await 版。对比两段代码的行数和可读性
::::

::::step{purpose="真实的顺序数据加载——先查活动、再查节目单、再查场地。每一步依赖前一步的结果，用 await 最自然。同时也练习 Promise.all 并行。" expected="loadConcert() 返回 { concert, program, venue }，程序不崩溃。故意把 concert ID 写错，catch 分支正确执行。"}
在 `script.js` 中实现 `loadConcert()`：
- 用 `await fetchConcert()` 获取活动信息
- 用 `Promise.all` 并行获取 `fetchProgram(concert.id)` 和 `fetchVenue(concert.venueId)`
- 用 `try/catch` 包裹全部 await，失败返回 null
::::

::::step{purpose="循环中用 await 是常见坑——需要并行时误写成串行。这个练习让你亲身体验差异。" expected="并行版比串行版快 5 倍以上。Console 输出两组耗时。"}
在 `script.js` 中实现两个版本的 `loadUsers(ids)`：串行版（for 循环里 await）和并行版（map + Promise.all）。用 `console.time` 分别计时，体会性能差异
::::

:::

:::hint{title="async/await 速查"}
```js
// async 函数自动返回 Promise
async function getData() {
  return 'hello'                    // 等价于 return Promise.resolve('hello')
}
getData().then(function(v) { console.log(v) }) // 'hello'

// await 只能用在 async 函数里
const data = await getData()        // data = 'hello'

// 错误处理：try/catch
try {
  const data = await fetchData()
} catch (err) {
  // fetchData 失败时来这里
}

// 并行多个请求
const [a, b, c] = await Promise.all([getA(), getB(), getC()])

// 给单个请求加超时
const result = await Promise.race([
  fetchData(),
  new Promise(function(_, reject) {
    setTimeout(function() { reject('超时') }, 5000)
  })
])
```
:::

:::recap
你学会了 async/await——用 `async` 声明异步函数，用 `await` 等待 Promise 完成并把结果赋给变量。`await` 只暂停当前函数，不阻塞主线程。相比 Promise 链，async/await 让代码像同步代码一样读，所有变量在同一个作用域。串行还是并行：有依赖关系就串行，独立请求用 `Promise.all` 并行。错误处理回归 `try/catch`。实际工作中，async/await 是现代前端处理异步的标准写法，几乎所有 API 调用都用它。
:::
