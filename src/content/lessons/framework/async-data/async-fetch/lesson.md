# fetch — 与"外面的世界"对话

:::music-analogy
至此你的音乐都在自己的琴房里。现在，打开窗户——听听外面的音乐，或者把你的琴声传出去。**fetch()** 就是这扇窗户：让 JavaScript 能和互联网上的服务器"对话"。
:::

:::explain{title="什么是 HTTP 请求？"}
每次你打开网页，浏览器都在发 HTTP 请求：
- **GET**：获取数据（"请给我这份乐谱"）
- **POST**：提交数据（"这是我新写的曲子，请保存"）
- **PUT/PATCH**：更新数据（"修改第三小节的音符"）
- **DELETE**：删除数据（"删掉这首练习曲"）
`fetch()` 是浏览器内置的函数，用来发送这些请求。它返回一个 Promise，所以可以和 async/await 配合使用。
:::

:::example{title="你的第一个 fetch"}
```js
// GET 请求：获取数据
async function getPieces() {
  const response = await fetch('https://api.example.com/pieces')
  if (!response.ok) {
    throw new Error('请求失败：' + response.status)
  }
  const data = await response.json()  // 把 JSON 转成 JS 对象
  console.log('获取到的曲目：', data)
  return data
}
```**两个 await：** 第一个等网络响应，第二个等 JSON 解析。
就像你先收到一个包裹（response），然后拆开包裹看里面的内容（.json()）。
:::

:::example{title="POST 请求：发送数据"}
```js
async function addPiece(piece) {
  const response = await fetch('https://api.example.com/pieces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(piece)  // JS 对象 → JSON 字符串
  })
  if (!response.ok) throw new Error('添加失败')
  const newPiece = await response.json()
  console.log('新增成功：', newPiece)
}
// 使用
addPiece({ name: '雨滴', composer: '肖邦', period: '浪漫主义' })
```POST 类似寄信——你需要写地址（URL）、贴邮票（headers）、装信封（body）。
:::

:::example{title="HTTP 状态码 — 服务器的\"回应\""}
服务器会返回一个状态码，告诉请求的结果：
| 状态码 | 含义 | 比喻 |
|--------|------|------|
| 200 | OK | 演奏完美落幕 |
| 201 | Created | 新曲子诞生 |
| 404 | Not Found | 乐谱找不到了 |
| 500 | Server Error | 乐团出状况了 |
`response.ok` 在状态码 200-299 时为 true，否则为 false。拿到 response 后应该先检查 `ok`。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="fetch() 是浏览器内置的网络请求函数——这是你第一次让代码和\"外面的世界\"对话。它返回一个 Promise，所以需要 await。就像拨通一个电话——你发送请求（拨号），等待服务器响应（对方接听）。" expected="response 是一个 Response 对象，包含 status、ok、headers 等属性。如果网络正常，response.ok 为 true。"}
用 const response = await fetch(url) 发送 GET 请求到 jsonplaceholder.typicode.com/posts
::::

::::step{purpose="两个 await 各有职责：第一个等网络传输完成（拿到回应信封），第二个等 JSON 解析完成（拆信封读内容）。先检查 ok 再解析是防御性编程的好习惯——不要解析一个失败的回应。" expected="data 是一个包含 100 条帖子的数组，每条有 userId、id、title、body 属性。"}
检查 response.ok——如果为 false，throw new Error 抛出错误；对成功的响应调用 response.json() 解析 JSON
::::

::::step{purpose="网络请求可能失败（断网、服务器宕机、URL 写错），所以必须用 try/catch 保护。这是\"与外部世界对话\"的基本礼仪——你不知道对方会不会回应，但你要确保自己不崩溃。" expected="控制台输出前 3 条帖子数据，每条包含 id、title 等信息——这是真实的网络数据！"}
用 .slice(0, 3) 取前 3 条数据返回，用 try/catch 包裹整个函数
::::

:::

:::hint{title="提示"}
记得：`fetch` 需要 await，`response.json()` 也需要 await。别忘了用 try/catch 包裹。
:::

:::listen-to
贝多芬《第五交响曲》第一乐章 — 那著名的"命运敲门声"，短短四个音就传递了强大的信息。fetch 请求也如此：一个简单的 GET 请求，就能带回丰富的数据。
:::

