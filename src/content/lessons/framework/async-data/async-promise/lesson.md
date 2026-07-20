# Promise — 给异步操作一个"承诺"

:::analogy
Promise 就像点了一份外卖——下单后拿到一个订单号（Promise）。外卖可能送到（resolve），也可能被取消（reject）。在结果出来前，你可以继续做其他事，不用一直在门口等。
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
::::step{purpose=".then() 是 Promise 的核心消费方式——它注册一个回调，在异步操作成功后执行。就像你预订了一张活动门票后，不需要一直盯着售票窗口，.then() 相当于\"有票了通知我\"。" expected="约 800ms 后控制台输出搜索成功的结果对象 { keyword: \"春天\", results: [\"项目A\", \"项目B\", \"项目C\"] }。"}
调用 searchMusic("春天")，用 .then(result => console.log(result)) 处理成功返回的数据
::::

::::step{purpose=".catch() 是 Promise 错误处理的标准方式——链上任何一步失败都会被它捕获。对比回调地狱中每个回调都需要单独处理错误，.catch() 一个地方搞定全链错误，代码简洁十倍。" expected="传入空字符串时，.catch() 捕获到 Error(\"搜索关键词不能为空\")，而不是程序崩溃。"}
在 .then() 后面加 .catch(err => console.log(err))，然后分别测试有效关键词和空字符串
::::

::::step{purpose="Promise 链通过 return 传递数据——每个 .then() 返回一个新的 Promise，数据在链上流动。这就像多米诺骨牌：第一张牌推倒第二张，数据从一步传递到下一步，中间无需嵌套。" expected="控制台先输出第一次搜索\"春天\"的结果，再输出第二次搜索\"春天\"的结果，两次调用串行完成。"}
链式调用：searchMusic("春天").then(...) 中 return searchMusic("春天")，然后在下一个 .then() 中打印第二次搜索结果
::::

:::

:::hint{title="提示"}
```js
searchMusic('春天')
  .then(result => {
    console.log('第一次搜索：', result)
    return searchMusic('春天')  // 返回新的 Promise
  })
  .then(result => console.log('第二次搜索：', result))
  .catch(err => console.log('搜索失败：', err))
```
:::

:::recap
你学会了用 Promise 处理异步操作——它有三种状态：等待中、成功、失败。用 .then() 链式调用替代层层嵌套的回调，用 .catch() 统一捕获错误，代码清晰多了。
:::


