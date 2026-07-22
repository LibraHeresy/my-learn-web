# "Promise — 给异步操作一个\"承诺\""

:::analogy
Promise 就像点外卖——下单后拿到一个订单号（Promise）。外卖可能送到（resolve），也可能被取消（reject）。在结果出来前，你可以继续做其他事，不用一直在门口等。订单号就是你对"结果"的引用。
:::

:::prerequisite
**本节你需要知道这些词：**

- **函数**：一段可以重复调用的代码块，接收输入、执行逻辑、返回结果
- **回调函数**：作为参数传给另一个函数的函数，等时机到了被调用
- **Event Loop**：JavaScript 调度异步任务的运行机制
:::

## 1. 先看问题：没有 Promise 时，代码有多痛苦？

假设你要做一个用户数据页面：先查用户信息，再根据用户 ID 查订单，再根据第一个订单查详情。用传统回调：

```js
// ❌ 回调地狱（Callback Hell）——三个嵌套就让人头晕
getUser(userId, function(user) {            // 第1步：查用户
  getOrders(user.id, function(orders) {     // 第2步：拿到用户后查订单
    getDetail(orders[0].id, function(detail) { // 第3步：查第一个订单的详情
      showDetail(detail)                       // 第4步：终于可以显示了
    }, function(err) {                         // 第3步的错误处理
      console.log('查详情失败', err)
    })
  }, function(err) {                           // 第2步的错误处理
    console.log('查订单失败', err)
  })
}, function(err) {                             // 第1步的错误处理
  console.log('查用户失败', err)
})
```

**回调地狱的问题：**
1. 代码向右层层缩进，像金字塔——3层就这样，实际项目可能5层以上
2. 每个步骤都要单独处理错误——错误处理代码占了一半
3. 想在两个异步操作之间加一个步骤？要重构整个嵌套结构
4. 两个不依赖的异步操作想同时执行？回调做不到

**实际工作中你会用这个来：**
- 页面加载时依次获取"用户信息 → 权限 → 菜单列表"
- 表单提交（校验 → 上传图片 → 提交表单），每一步依赖前一步的结果
- 处理任何"先做 A，拿到结果后再做 B"的场景——这几乎每天都在发生

## 2. 解决方案：Promise 拉平异步流程

```js
// ✅ Promise 链式调用——代码从上往下读，逻辑清晰
getUser(userId)                              // 第1步：返回一个 Promise
  .then(function(user) {                     // 第2步：.then() 接收 user
    return getOrders(user.id)                // 第3步：返回新的 Promise
  })
  .then(function(orders) {                   // 第4步：.then() 接收 orders
    return getDetail(orders[0].id)           // 第5步：返回新的 Promise
  })
  .then(function(detail) {                   // 第6步：.then() 接收 detail
    showDetail(detail)                       // 第7步：终于可以显示
  })
  .catch(function(err) {                     // 第8步：任何一步出错都来这里
    console.log('出错了：', err)             // 一个 catch 替代四个错误回调！
  })
```

**为什么 Promise 更好：**
- 代码是平的，不是金字塔——再长的链也不会向右缩进
- 一个 `.catch()` 统一处理所有错误，不用每个步骤写一遍
- 想在中间加一步？在链上插入一个 `.then()` 就行，不影响其他代码

:::explain{title="resolve 和 reject 到底是什么？"}
很多新手不理解 `new Promise((resolve, reject) => { ... })` 里的 `resolve` 和 `reject` 是什么。

**它们就是 Promise 构造函数传给你的两个函数：**

```js
const promise = new Promise(function(resolve, reject) {
  // resolve 和 reject 是两个函数，由 Promise 构造函数自动传进来
  // resolve：调用它就表示"成功了"，把结果传出去
  // reject：调用它就表示"失败了"，把错误传出去

  // 模拟异步操作
  setTimeout(function() {
    const success = Math.random() > 0.3     // 70% 概率成功
    if (success) {
      resolve('订票成功！座位号：A-12')     // 调用 resolve → Promise 变成 fulfilled
    } else {
      reject('抱歉，已售罄')                // 调用 reject → Promise 变成 rejected
    }
  }, 1000)
})

// .then() 的第一个参数 = resolve 时调用
// .then() 的第二个参数（或 .catch()）= reject 时调用
promise.then(
  function(msg) { console.log('成功：', msg) },   // resolve 走这里
  function(err) { console.log('失败：', err) }    // reject 走这里
)
```

**一句话总结：** `resolve` 和 `reject` 是你决定 Promise 最终状态的开关——成功就调 `resolve(结果)`，失败就调 `reject(错误)`。
:::

:::example{title="Promise 的三种状态——外卖订单类比"}
一个 Promise 只有三种互斥的状态，一旦确定就不可改变：

| 状态 | 含义 | 外卖类比 | 触发条件 |
|------|------|----------|----------|
| **pending** | 等待结果 | 订单已提交，厨房正在做 | Promise 刚创建，还没调 resolve/reject |
| **fulfilled** | 成功完成 | 外卖送到了 | 调了 resolve(value) |
| **rejected** | 失败了 | 订单被取消 | 调了 reject(reason) 或抛出异常 |

```js
// 三种状态的完整演示
const ticket = new Promise(function(resolve, reject) {
  const available = Math.random() > 0.3       // 70% 概率有票
  setTimeout(function() {                     // 模拟网络延迟
    if (available) {
      resolve('订票成功！座位号：A-12')       // → fulfilled
    } else {
      reject('抱歉，已售罄')                 // → rejected
    }
  }, 1000)
})

// 当前状态：pending（等 1 秒后才变）
// 1 秒后：要么 fulfilled（输出 "订票成功！"），要么 rejected（输出 "抱歉"）
ticket
  .then(function(msg) { console.log(msg) })    // fulfilled 时执行
  .catch(function(err) { console.log(err) })   // rejected 时执行
```
:::

:::explain{title=".then() 链的关键规则——每一步都返回新 Promise"}
`.then()` 每次都返回一个**全新的 Promise**，所以你可以在后面继续 `.then()`：

```js
fetchUserId('小明')                          // 返回 Promise<id>
  .then(function(id) {                       // 接收 id
    return fetchUserInfo(id)                 // 返回 Promise<userInfo>
  })                                         //   这个返回值被包装成新 Promise
  .then(function(info) {                     // 接收 info（不是 id！）
    return fetchFavorites(info.id)           // 返回 Promise<favorites>
  })
  .then(function(favs) {                     // 接收 favs
    console.log('喜欢的曲子：', favs)         // 最终拿到数据
  })
  .catch(function(err) {                     // 链上任何一步出错都来这里
    console.log('某一步失败了：', err)
  })
```

**两个核心规则：**
1. `.then()` 里 `return` 一个值 → 下一个 `.then()` 收到这个值
2. `.then()` 里 `return` 一个 Promise → 下一个 `.then()` 等它完成后收到结果
3. `.then()` 里抛异常 → 跳到最近的 `.catch()`
:::

:::explain{title="四个 Promise 组合器——同时处理多个异步操作"}
实际项目中，你经常需要同时发起多个请求。JS 提供了四个组合器：

**1. Promise.all — "全部完成才算完"**
```js
// 场景：页面初始化，需要用户信息、帖子列表、通知数量——三者同时请求
const [user, posts, notifications] = await Promise.all([
  fetch('/api/user').then(function(r) { return r.json() }),
  fetch('/api/posts').then(function(r) { return r.json() }),
  fetch('/api/notifications').then(function(r) { return r.json() })
])
// 全部成功 → 拿到三个结果。任意一个失败 → 整个 all 失败
// 使用场景：页面初始化、批量校验、需要全部数据才能渲染的页面
```

**2. Promise.race — "谁先到算谁的"**
```js
// 场景：给请求加超时——3 秒没响应就报错
const data = await Promise.race([
  fetch('/api/slow-endpoint').then(function(r) { return r.json() }),
  new Promise(function(_, reject) {
    setTimeout(function() { reject('请求超时！') }, 3000)
  })
])
// 使用场景：网络请求超时控制、从多个 CDN 选最快的
```

**3. Promise.allSettled — "全部有结果，不管成败"**
```js
// 场景：批量上传文件，需要知道每个文件的上传结果（成功 or 失败）
const results = await Promise.allSettled([
  uploadFile('a.pdf'),    // 可能成功
  uploadFile('b.pdf'),    // 可能失败
  uploadFile('c.pdf')     // 可能成功
])
// results = [
//   { status: "fulfilled", value: { url: "..." } },
//   { status: "rejected", reason: "文件过大" },
//   { status: "fulfilled", value: { url: "..." } }
// ]
// 使用场景：批量操作、需要完整报告的场景
```

**4. Promise.any — "有一个成功就行"**
```js
// 场景：从多个 CDN 镜像加载同一份数据，谁快用谁
const data = await Promise.any([
  fetch('https://cdn1.example.com/data.json'),
  fetch('https://cdn2.example.com/data.json'),
  fetch('https://cdn3.example.com/data.json')
]).then(function(r) { return r.json() })
// 使用场景：多 CDN 容灾、多个备用数据源
```
:::

## 3. 常见错误

**错误 1：忘记 return——链断了**

```js
// ❌ 错误：.then() 里没有 return，下一个 .then() 收到 undefined
getUser(1)
  .then(function(user) {
    getOrders(user.id)        // 没有 return！下一个 .then() 等不到结果
  })
  .then(function(orders) {
    console.log(orders)       // undefined —— 因为上一步没有 return
  })

// ✅ 正确：必须 return
getUser(1)
  .then(function(user) {
    return getOrders(user.id) // 有 return，链正常传递
  })
  .then(function(orders) {
    console.log(orders)       // 正确拿到 orders
  })
```

**错误 2：在 Promise 链外使用链的结果**

```js
// ❌ 错误：以为 .then() 后变量就赋值了
let result
getUser(1).then(function(user) {
  result = user               // 异步的，这行还没执行
})
console.log(result)           // undefined —— .then() 还没跑！

// ✅ 正确：在 .then() 里面使用结果
getUser(1).then(function(user) {
  console.log(user)           // 在回调里使用，确保数据已经到了
  // 后续逻辑全写在这里
})
```

**错误 3：Promise.all 中一个失败就放弃全部**

```js
// ❌ 错误：用 Promise.all 做批量操作，一个 404 就全没了
const results = await Promise.all([
  fetch('/api/user/1'),
  fetch('/api/user/999'),   // 这个返回 404，整个 all 就 reject 了
  fetch('/api/user/3')      // 这个明明能成功，也被放弃了
])

// ✅ 正确：批量操作应该用 Promise.allSettled，每个结果都能看到
const results = await Promise.allSettled([
  fetch('/api/user/1'),
  fetch('/api/user/999'),
  fetch('/api/user/3')
])
// results 里每个都有 status，成功失败都清清楚楚
```

:::task{title="动手试试"}
::::step{purpose="亲手创建 Promise 并经历 pending → fulfilled/rejected 的状态变化，这是理解 resolve/reject 本质的最佳方式。" expected="运行代码后 1 秒输出'订票成功！'或'已售罄'。多次运行以看到两种结果。"}
打开 `script.js`，用 `new Promise((resolve, reject) => { ... })` 模拟一个订票功能：70% 概率成功，延迟 1 秒返回结果。用 `.then()` 和 `.catch()` 接收结果并输出
::::

::::step{purpose="Promise 链通过 return 传递数据——每个 .then() 里 return 一个 Promise，下一个 .then() 自动接收到其结果。链式调用把嵌套拉平。" expected="输入用户 ID 后，页面依次出现两张卡片——用户 N 和用户 N+1。第二个 .then() 里的 user2 是第二个 searchUser() 的结果。"}
修改 `script.js` 中的搜索函数，用 Promise 链实现：查询用户 N → 拿到结果后自动查询用户 N+1 → 两张卡片都显示在页面上
```js
searchUser(userId)
  .then(function(user) {                     // 收到第一个用户
    showCard(user)                            // 显示第一张卡片
    return searchUser(Number(userId) + 1)     // 返回新 Promise，链继续
  })
  .then(function(user2) {                    // 收到第二个用户
    showCard(user2)                           // 显示第二张卡片
  })
  .catch(function(err) {                     // 统一错误处理
    showError('查询失败：' + err.message)
  })
```
::::

::::step{purpose="Promise.all 是页面初始化的标配——多个不依赖的请求同时发出，等全部返回后一起渲染，比串行快得多。" expected="控制台输出用户、帖子、相册三组数据，耗时约为最慢那个请求的时间（而不是三者之和）。"}
在 `script.js` 中用 `Promise.all` 同时请求三个不同的 API 端点，全部完成后输出结果，对比串行（一个一个 await）的执行时间
::::

:::

:::hint{title="Promise 三个核心规则"}
```js
// 规则1：.then() 默认返回新 Promise，里面的 return 值传给下一个 .then()
Promise.resolve(1)
  .then(function(v) { return v + 1 })   // 返回 2
  .then(function(v) { console.log(v) }) // 输出 2

// 规则2：.then() 里 return 一个 Promise，下一个 .then() 等它完成
Promise.resolve(1)
  .then(function(v) { return fetchUser(v) })  // 返回 Promise
  .then(function(user) { console.log(user) }) // 等 fetchUser 完成后拿到 user

// 规则3：.catch() 捕获链上任何一步的错误
Promise.resolve(1)
  .then(function() { throw new Error('出错了') })  // 抛出错误
  .then(function() { console.log('不会执行') })    // 跳过
  .catch(function(err) { console.log(err) })        // 捕获错误
```
:::

:::recap
你学会了用 Promise 取代回调地狱——`.then()` 链让异步代码变平，`.catch()` 统一处理错误。`resolve` 和 `reject` 是 Promise 构造函数给你的两个函数，分别表示成功和失败。四种组合器对应不同场景：`Promise.all`（全部成功）、`Promise.race`（竞速）、`Promise.allSettled`（全部有结果）、`Promise.any`（一个成功就行）。实际工作中，Promise 是 fetch、定时器、事件监听等一切异步操作的基石。
:::
