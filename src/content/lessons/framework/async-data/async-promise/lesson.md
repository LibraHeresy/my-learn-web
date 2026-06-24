# Promise — 给异步操作一个"承诺"

:::music-analogy
你预订了一张音乐会门票——你拿到了一个"承诺"（Promise）。这个承诺可能兑现（拿到票），也可能落空（售罄）。在结果出来之前，你可以继续做其他事。Promise 就是 JavaScript 给异步操作的结果打的"包票"。
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
就像从复杂的多声部对位变成了清晰的主旋律加伴奏。
:::

:::example{title="Promise 的三种状态"}
一个 Promise 有三种状态：
| 状态 | 含义 | 音乐比喻 |
|------|------|----------|
| pending | 等待结果 | 乐团正在调音，还没开始 |
| fulfilled | 成功完成 | 演奏完美落幕，掌声响起 |
| rejected | 失败了 | 小提琴断弦，需要调整 |
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

:::task{title="动手试试 ✨"}
::::step{purpose=".then() 是 Promise 的核心消费方式——它注册一个回调，在异步操作成功后执行。就像你预订了一张音乐会门票后，不需要一直盯着售票窗口，.then() 相当于\"有票了通知我\"。" expected="约 800ms 后控制台输出搜索成功的结果对象 { keyword: \"月光\", results: [\"曲目A\", \"曲目B\", \"曲目C\"] }。"}
调用 searchMusic("月光")，用 .then(result => console.log(result)) 处理成功返回的数据
::::

::::step{purpose=".catch() 是 Promise 错误处理的标准方式——链上任何一步失败都会被它捕获。对比回调地狱中每个回调都需要单独处理错误，.catch() 一个地方搞定全链错误，代码简洁十倍。" expected="传入空字符串时，.catch() 捕获到 Error(\"搜索关键词不能为空\")，而不是程序崩溃。"}
在 .then() 后面加 .catch(err => console.log(err))，然后分别测试有效关键词和空字符串
::::

::::step{purpose="Promise 链通过 return 传递数据——每个 .then() 返回一个新的 Promise，数据在链上流动。这就像多米诺骨牌：第一张牌推倒第二张，数据从一步传递到下一步，中间无需嵌套。" expected="控制台先输出第一次搜索\"月光\"的结果，再输出第二次搜索\"贝多芬\"的结果，两次调用串行完成。"}
链式调用：searchMusic("月光").then(...) 中 return searchMusic("贝多芬")，然后在下一个 .then() 中打印第二次搜索结果
::::

:::

:::hint{title="提示"}
```js
searchMusic('月光')
  .then(result => {
    console.log('第一次搜索：', result)
    return searchMusic('贝多芬')  // 返回新的 Promise
  })
  .then(result => console.log('第二次搜索：', result))
  .catch(err => console.log('搜索失败：', err))
```
:::

:::listen-to
舒伯特《未完成交响曲》— 这部作品只有两个乐章，却"完成"了震撼人心的表达。Promise 也有三种状态——进行中（pending）、兑现（fulfilled）、拒绝（rejected），每一种都是合理的。
:::

