# fetch — 与"外面的世界"对话

:::analogy
fetch() 就像浏览器伸出去的一只手——向互联网上的服务器要数据。你发一个请求（"给我这个API的数据"），服务器返回结果，你拿着数据更新页面。
:::

:::explain{title="什么是 HTTP 请求？"}
每次你打开网页，浏览器都在发 HTTP 请求：
- **GET**：获取数据（"请给我这份设计图"）
- **POST**：提交数据（"这是我刚填的表单，请保存"）
- **PUT/PATCH**：更新数据（"修改第三行的内容"）
- **DELETE**：删除数据（"删掉这首晚间笔记"）
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
  console.log('获取到的项目：', data)
  return data
}
```
**两个 await：** 第一个等网络响应，第二个等 JSON 解析。
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
addPiece({ name: '文档X', composer: '张三', period: '类型A' })
```
POST 类似寄信——你需要写地址（URL）、贴邮票（headers）、装信封（body）。
:::

:::explain{title="PUT 和 DELETE — 更新和删除数据"}
除了 GET 和 POST，实际项目中最常用的是 PUT（更新）和 DELETE（删除）：

```js
// PUT：更新整条数据（传完整的更新后对象）
async function updatePiece(id, updatedData) {
  const response = await fetch(`https://api.example.com/pieces/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  })
  if (!response.ok) throw new Error('更新失败')
  return await response.json()
}

// DELETE：删除数据（通常不需要 body）
async function deletePiece(id) {
  const response = await fetch(`https://api.example.com/pieces/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('删除失败')
  return true
}
```
**CRUD 口诀：**
| 操作 | HTTP方法 | 口诀 |
|------|----------|------|
| Create | POST | 新建数据 |
| Read | GET | 读取数据 |
| Update | PUT/PATCH | 更新数据 |
| Delete | DELETE | 删除数据 |
:::

:::explain{title="URLSearchParams — 安全地构建查询参数"}
API 请求经常需要传查询参数（如搜索关键词、分页页码）。不要手动拼字符串——用 `URLSearchParams`：
```js
// ❌ 手动拼接：特殊字符会出问题
const url = `https://api.example.com/search?q=${keyword}&page=${page}`

// ✅ URLSearchParams：自动处理编码
const params = new URLSearchParams({
  q: keyword,    // 自动编码中文和特殊字符
  page: 1,
  limit: 10
})
const url = `https://api.example.com/search?${params}`
// → https://api.example.com/search?q=%E6%98%A5%E5%A4%A9&page=1&limit=10
```
:::

:::explain{title="AbortController — 取消正在进行的请求"}
用户快速输入搜索词时，上一次的请求还没返回——与其收到过时的结果，不如直接取消：
```js
let controller = null  // 保存当前的 controller

async function search(keyword) {
  if (controller) controller.abort()  // 取消上一次请求
  controller = new AbortController()

  try {
    const response = await fetch(`/api/search?q=${keyword}`, {
      signal: controller.signal  // 把 signal 传给 fetch
    })
    const data = await response.json()
    render(data)
  } catch (err) {
    if (err.name === 'AbortError') return  // 被取消是正常的，忽略
    console.error(err)  // 真正的错误才需要处理
  }
}
```
这就是"竞态条件"的解决方案——始终只关注最新一次请求的结果。
:::

:::explain{title="FormData — 用 fetch 提交表单"}
如果要上传文件或提交 HTML 表单，使用 `FormData`：
```js
// 从 HTML 表单创建 FormData
const form = document.querySelector('form')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(form)  // 自动收集所有表单字段
  // 也可以手动添加
  formData.append('avatar', fileInput.files[0])  // 文件上传

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData  // 不要设置 Content-Type！浏览器自动处理
  })
  const result = await response.json()
})
```
:::

:::example{title="HTTP 状态码 — 服务器的\"回应\""}
服务器会返回一个状态码，告诉请求的结果：
| 状态码 | 含义 | 比喻 |
|--------|------|------|
| 200 | OK | 快递签收——顺利到手 |
| 201 | Created | 新账户注册成功——数据已创建 |
| 404 | Not Found | 走错门牌号——你要的内容不存在 |
| 500 | Server Error | 餐厅后厨停电了——服务器出错了 |
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

:::recap
你学会了用 fetch() 让 JavaScript 和互联网上的服务器"对话"——发 GET 请求获取数据，发 POST 请求提交数据。请求需要两次 await（一次等网络响应，一次等 JSON 解析），还要用 try/catch 保护，防止网络出问题时程序崩溃。
:::


