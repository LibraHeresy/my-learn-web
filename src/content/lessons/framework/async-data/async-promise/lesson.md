# {{term:Promise}} — 给异步操作一个"承诺"

:::analogy
Promise 就像点了一份外卖——下单后拿到一个订单号（Promise）。外卖可能送到（resolve），也可能被取消（reject）。在结果出来前，你可以继续做其他事，不用一直在门口等。
:::

:::prerequisite
**本节你需要知道这些词：**

- **函数**：一段可以重复调用的代码块，接收输入、执行逻辑、返回结果
- **回调函数**：作为参数传给另一个函数的函数，等时机到了被调用
- **回调地狱**：多层嵌套的回调函数形成的"金字塔"代码，难以阅读和维护
- **事件循环**：JavaScript 调度异步任务的运行机制
:::

:::explain{title="回调地狱 → Promise"}
如果用传统的回调嵌套处理多个异步操作，代码会变成"金字塔"：
```js
// 回调地狱 💀
getUser(id, (user) => {
  getOrders(user.id, (orders) => {
    getDetails(orders[0].id, (details) => {
      console.log(details)
    })
  })
})
```
Promise 用链式调用拉平了结构：
```js
// Promise 链式调用 ✨
getUser(id)
  .then(user => getOrders(user.id))
  .then(orders => getDetails(orders[0].id))
  .then(details => console.log(details))
  .catch(err => console.log('出错了：', err))
```
就像从一团乱麻变成了清晰的一步接一步。
:::

:::example{title="Promise 的三种状态"}
一个 Promise 有三种状态：
| 状态 | 含义 | 通俗理解 |
|------|------|----------|
| pending | 等待结果 | 订单已提交，厨房正在做 |
| fulfilled | 成功完成 | 外卖已送达，顺利开饭 |
| rejected | 失败了 | 订单取消，需要重试 |
```js
const ticket = new Promise((resolve, reject) => {
  const available = Math.random() > 0.3  // 70% 概率有票
  setTimeout(() => {
    if (available) {
      resolve('🎫 订票成功！座位号：A-12')
    } else {
      reject('😞 抱歉，已售罄')
    }
  }, 1000)
})
ticket
  .then(msg => console.log(msg))   // 成功走这里
  .catch(err => console.log(err))  // 失败走这里
```
:::

:::example{title=".then() 的链式传递"}
`.then()` 每次都返回一个新的 Promise，所以可以一直 `.then()` 下去——就像多米诺骨牌。
```js
fetchUserId('小明')
  .then(id => fetchUserInfo(id))      // 返回新 Promise
  .then(info => fetchFavorites(info))  // 再返回新 Promise
  .then(favs => console.log('喜欢的曲子：', favs))
  .catch(err => console.log('某一步失败了：', err))
```
关键点：`.catch()` 会捕获链上**任何一步**的错误。就像一张安全网——不管哪个环节出问题，都能兜住。
:::

:::explain{title="Promise 组合器 — 同时处理多个 Promise"}
现实开发中，你经常需要同时发起多个请求。JS 提供了四个组合器：

**1. Promise.all — "全部完成才算完"**
```js
// 同时请求三个 API，等全部返回后一起处理
const [user, posts, comments] = await Promise.all([
  fetch('/api/user').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
])
console.log('全部加载完成！')
```
⚠️ 只要有一个失败，整个 `Promise.all` 就 reject。适合：页面初始化时需要多组数据。

**2. Promise.race — "谁先到算谁的"**
```js
// 实现请求超时：如果 3 秒内 API 没回应就用默认数据
const data = await Promise.race([
  fetch('/api/slow-endpoint').then(r => r.json()),
  new Promise((_, reject) => setTimeout(() => reject('请求超时！'), 3000))
])
```
适合：给网络请求加超时控制。

**3. Promise.allSettled — "全部有结果，不管成败"**
```js
const results = await Promise.allSettled([
  fetch('/api/user'),
  fetch('/api/broken-endpoint'),  // 这个可能 404
  fetch('/api/posts')
])
// results = [
//   { status: "fulfilled", value: {...} },
//   { status: "rejected", reason: "404 Not Found" },
//   { status: "fulfilled", value: {...} }
// ]
```
适合：批量操作，需要知道每个请求的结果（成功还是失败），不因一个失败而丢弃其他数据。

**4. Promise.any — "有一个成功就行"**
```js
// 从多个 CDN 镜像中找最快的那个
const data = await Promise.any([
  fetch('https://cdn1.example.com/data.json'),
  fetch('https://cdn2.example.com/data.json'),
  fetch('https://cdn3.example.com/data.json')
]).then(r => r.json())
```
适合：有多个备用源，只要有一个成功就行。
:::

:::task{title="动手试试 ✨"}
::::step{purpose=".then() 是 Promise 的核心消费方式——在 fetch 请求成功后用 .then() 接收数据并渲染到页面。你将看到用户卡片从 API 获取并显示在页面上，而不是打印到控制台。" expected="输入 1，点击查询，加载动画后页面出现一张用户卡片，显示该用户的姓名、邮箱、电话和公司信息。"}
实现 `searchUser()` 函数，用 fetch 请求 API 并将结果渲染到页面

打开 `script.js`，完成两个地方的代码：

**1. `searchUser()` 函数：**
```js
function searchUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json());
}
```

**2. 按钮点击事件中的 Promise 调用：**
```js
btnEl.addEventListener('click', function () {
  const userId = inputEl.value.trim();
  showLoading();
  searchUser(userId)
    .then(user => {
      hideLoading();
      resultsEl.appendChild(renderCard(user));
    });
});
```

刷新页面，输入用户 ID（1-10），点击「查询」按钮，观察用户卡片出现在页面上。
::::

::::step{purpose=".catch() 是 Promise 错误处理的标准方式——网络请求可能失败，用 .catch() 在页面上显示错误信息，而不是让程序静默崩溃。用户能看到友好的错误提示。" expected="输入无效 ID（如 999），页面显示错误信息而不是空白。输入字母，同样显示错误提示，页面不会崩溃。"}
添加 .catch() 错误处理，在页面上显示错误信息

在按钮点击事件中的 Promise 链末尾添加 `.catch()`：
```js
.catch(err => {
  showError('查询失败：' + err.message);
});
```

分别测试：
- 有效 ID（1）：用户卡片正常显示
- 无效 ID（999）：页面显示错误提示
- 空输入：API 返回 404，页面显示错误信息
::::

::::step{purpose="Promise 链通过 return 传递数据——查询完一个用户后，自动再查第二个用户，两张卡片依次出现在页面上。这展示了 .then() 链式调用的威力：数据在链上流动，无需嵌套。" expected="点击查询后，页面依次出现两张用户卡片——第一张是用户 1 的信息，短暂加载后出现第二张用户 2 的信息。链式调用串行完成。"}
链式调用：查询完一个用户后自动查询第二个用户

修改按钮点击事件，在第一个 `.then()` 中 `return searchUser(另一个ID)`，第二个 `.then()` 中渲染第二张卡片：
```js
searchUser(userId)
  .then(user => {
    hideLoading();
    resultsEl.appendChild(renderCard(user));
    return searchUser(Number(userId) + 1);  // 自动查询下一个用户
  })
  .then(user2 => {
    resultsEl.appendChild(renderCard(user2));
  })
  .catch(err => showError('查询失败：' + err.message));
```

输入 1，点击查询——先出现用户 1 的卡片，再出现用户 2 的卡片。
::::

:::

:::hint{title="提示"}
```js
searchUser(1)
  .then(user => {
    renderCard(user);           // 渲染第一个用户
    return searchUser(2);       // 返回新的 Promise
  })
  .then(user2 => renderCard(user2))  // 渲染第二个用户
  .catch(err => showError('查询失败：' + err.message))
```
:::

:::recap
你学会了用 Promise 处理异步操作——它有三种状态：等待中、成功、失败。用 .then() 链式调用替代层层嵌套的回调，用 .catch() 统一捕获错误，代码清晰多了。
:::


