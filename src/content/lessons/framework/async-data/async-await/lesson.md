# async/await — 让异步代码"看起来同步"

:::music-analogy
Promise 的 `.then()` 链条就像看乐谱上的分谱——你要顺着每个声部找下去。而 async/await 就像看总谱——所有声部一目了然，从上到下顺序阅读，但实际演奏是同时发生的。
:::

:::explain{title="async/await 是什么？"}
async/await 让异步代码看起来像同步代码——async 声明异步函数，await 等待 Promise 完成再继续。就像指挥等待独奏家完成华彩乐段再继续指挥——表面是同步的等待，实际是异步的完成。
```js
// Promise 写法
function getMusicInfo() {
  return fetchUser('小明')
    .then(user => fetchFavorites(user.id))
    .then(favs => console.log(favs))
}
// async/await 写法
async function getMusicInfo() {
  const user = await fetchUser('小明')
  const favs = await fetchFavorites(user.id)
  console.log(favs)
}
```
:::

:::example{title="错误处理：try/catch 回归"}
用 async/await 时，错误处理回到了熟悉的 try/catch：
```js
async function loadMusicData() {
  try {
    const user = await fetchUser('小明')
    const favs = await fetchFavorites(user.id)
    const details = await fetchDetails(favs[0].id)
    console.log('加载成功：', details)
  } catch (error) {
    console.log('加载失败：', error.message)
    // 可以在这里显示友好的错误提示
  }
}
```
这就是为什么学错误处理（上一章）很重要——async/await 中 try/catch 是最佳实践。
:::

:::example{title="并行 vs 串行"}
注意：`await` 是**串行**的（一个接一个等）。如果两个请求互不依赖，应该**并行**：
```js
// ❌ 串行：总要 2000ms（每个 1000ms）
const result1 = await fetchOne()   // 等 1000ms
const result2 = await fetchTwo()   // 再等 1000ms
// ✅ 并行：只要 1000ms（同时进行）
const [result1, result2] = await Promise.all([
  fetchOne(),
  fetchTwo()
])
```
Promise.all()` 就像指挥同时给弦乐和管乐起拍——一起开始，一起等。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="async/await 让异步代码读起来像同步代码——从上到下、从左到右。await 会暂停当前函数的执行等待 Promise 完成，但不阻塞主线程。就像指挥等独奏家完成华彩乐段——整个乐团在等，但不是僵住，而是准备好了随时接上。" expected="concert 变量得到 { id: \"c001\", title: \"维也纳新年音乐会\", place: \"金色大厅\" } 对象。"}
用 async function 声明 loadConcert，内部用 const concert = await fetchConcert() 获取演出信息
::::

::::step{purpose="await 返回的是 Promise 的\"兑现值\"——不需要 .then() 回调了。这里你会直观地感受到 async/await 相比 Promise 链的优势：数据直接赋值给变量，下一行就能用，逻辑流线性的。" expected="program 变量得到 { concertId: \"c001\", pieces: [\"蓝色多瑙河\", \"拉德茨基进行曲\"] } 对象。"}
用 const program = await fetchProgram(concert.id) 获取曲目单
::::

::::step{purpose="async/await 让 try/catch 回归——不需要 .catch() 了。try 块里写正常流程，catch 块里处理异常，和同步代码的错误处理方式完全一致。之前学的错误处理知识在此无缝衔接。" expected="loadConcert() 调用后返回完整的演出+曲目信息对象，或出错时返回 null，程序不会崩溃。"}
用 try/catch 包裹 await 调用，出错时返回 null；成功时 return { concert, program }
::::

:::

:::hint{title="提示"}
```js
async function loadConcert() {
  try {
    const concert = await fetchConcert()
    const program = await fetchProgram(concert.id)
    return { concert, program }
  } catch (e) {
    console.log('加载出错：', e.message)
    return null
  }
}
```
:::

:::listen-to
莫扎特《费加罗的婚礼》序曲 — 短短 4 分钟，多个主题自然流畅地衔接，听感上浑然一体。async/await 让异步代码也有这种"行云流水"的阅读体验。
:::

