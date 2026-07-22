# "fetch — 与\"外面的世界\"对话"

:::analogy
`fetch()` 就像你拿起电话打给客服——你拨号（发请求），客服接通后回复你（返回响应），你拿到信息（解析 JSON）去做后续处理。HTTP 方法就是你对客服说的话："我想查订单"（GET）、"我要下单"（POST）、"我要改地址"（PUT）、"我要取消"（DELETE）。
:::

:::prerequisite
**本节你需要知道这些词：**

- **Promise**：表示一个异步操作的结果——fetch 返回的就是 Promise
- **async/await**：让异步代码像同步代码一样读，配合 fetch 使用
- **JSON**：浏览器和服务器之间最常用的数据格式
:::

## 1. 先看问题：没有 fetch 时，数据和页面是割裂的

前面你学的所有东西——变量、函数、DOM 操作——数据都在你的代码里写死了：

```js
// ❌ 静态数据：每次都要手动改代码
const posts = [
  { id: 1, title: '写死的标题1' },
  { id: 2, title: '写死的标题2' }
]
// 问题：真实数据在服务器上，不在你的 JS 文件里
// 你需要一个方法，让页面"活"起来——从服务器动态获取数据
```

**不理解 fetch 的后果：**
- 你的页面只能展示写死的数据，刷新一万遍也是一样的内容
- 用户搜索、提交表单、翻页——全是假的，数据根本没离开过浏览器
- 你写的所有"功能"都是模拟的，不是真正的应用

**实际工作中你会用这个来：**
- 页面加载时从后端 API 拉取数据并渲染到页面上
- 用户提交登录表单，把用户名密码 POST 到后端验证
- 搜索框输入关键词，实时请求搜索结果
- 上传文件、提交订单、更新个人信息——全部走 fetch

:::explain{title="fetch 的基本结构——四个关键部分"}
```js
// fetch 请求的完整结构
async function fetchData() {
  // 1. 发请求（GET 是默认方法）
  const response = await fetch('https://api.example.com/data')
  // response 是"响应对象"，不是数据本身——就像收到一个包裹，还没拆开

  // 2. 检查请求是否成功
  if (!response.ok) {
    // response.ok 在状态码 200-299 时为 true
    // 如果不是 2xx，说明服务器返回了错误状态
    throw new Error('请求失败，状态码：' + response.status)
  }

  // 3. 解析响应体——第二个 await！
  const data = await response.json()  // 把 JSON 字符串转成 JS 对象
  // .json() 也是异步的，所以需要 await——很多人忘记这个

  // 4. 使用数据
  console.log('获取到的数据：', data)
  return data
}
```

**为什么需要两个 await？**
- 第一个 `await fetch()`：等网络传输完成，拿到响应"包裹"
- 第二个 `await response.json()`：拆开包裹，把 JSON 字符串转成 JS 对象
- 忘记第二个 await 的话，`data` 是一个 Promise 对象，不是真正的数据
:::

:::example{title="GET 请求——获取数据（最常用）"}
```js
// GET：从服务器取数据——相当于"请给我这份文件"
async function getPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // 先检查响应状态
    if (!response.ok) {
      throw new Error('服务器返回 ' + response.status)  // 不是 2xx 就抛错
    }
    const posts = await response.json()   // 解析 JSON
    console.log('获取到 ' + posts.length + ' 条帖子')
    return posts                           // 返回数组供页面渲染
  } catch (err) {
    console.error('获取帖子失败：', err)   // 网络断开、URL 写错、服务器宕机...
    return []                               // 返回空数组，不破坏页面
  }
}
```
:::

:::example{title="POST 请求——提交数据"}
```js
// POST：向服务器提交数据——相当于"请帮我保存这份表单"
async function createPost(title, body) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',                      // 指定请求方法
      headers: {                           // 请求头：告诉服务器数据格式
        'Content-Type': 'application/json' // 表示 body 是 JSON
      },
      body: JSON.stringify({              // 把 JS 对象转成 JSON 字符串发送
        title: title,                      // 帖子标题
        body: body,                        // 帖子内容
        userId: 1                          // 用户 ID
      })
    })
    if (!response.ok) {
      throw new Error('创建失败：' + response.status)
    }
    const newPost = await response.json()   // 服务器返回刚创建的数据（含 id）
    console.log('创建成功，ID：', newPost.id)
    return newPost
  } catch (err) {
    console.error('创建帖子失败：', err)
    return null
  }
}
```
:::

:::example{title="PUT 和 DELETE——更新和删除数据"}
```js
// PUT：更新整条数据——传完整的更新后对象
async function updatePost(id, newTitle, newBody) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,                              // 必须传 id
      title: newTitle,                     // 更新后的标题
      body: newBody,                       // 更新后的内容
      userId: 1                            // 保持其他字段不变
    })
  })
  if (!response.ok) throw new Error('更新失败')
  return await response.json()             // 服务器返回更新后的数据
}

// DELETE：删除数据——通常不需要 body
async function deletePost(id) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
    method: 'DELETE'                       // DELETE 请求通常没有 body 和特别的 headers
  })
  if (!response.ok) throw new Error('删除失败')
  return true                              // 删除成功，返回 true
}
```

**CRUD 速查：**
| 操作 | HTTP 方法 | 有 body？ | 典型场景 |
|------|-----------|----------|----------|
| Create | POST | 有（新数据） | 注册账号、提交订单 |
| Read | GET | 无 | 加载列表、查看详情 |
| Update | PUT/PATCH | 有（新数据） | 修改昵称、编辑文章 |
| Delete | DELETE | 通常无 | 删除评论、取消订单 |
:::

:::explain{title="HTTP 状态码——服务器给你\"打个分\""}
每次请求，服务器都会返回一个三位数字的状态码，告诉你结果：

| 状态码 | 含义 | 通俗解释 | response.ok |
|--------|------|----------|-------------|
| **200** | OK | 请求成功，数据在 body 里 | `true` |
| **201** | Created | POST 成功，新资源已创建 | `true` |
| **204** | No Content | 成功但没返回内容（DELETE 常见） | `true` |
| **301/302** | Redirect | 资源换地址了，自动跳转 | `false` |
| **400** | Bad Request | 你发的请求格式不对（前端锅） | `false` |
| **401** | Unauthorized | 没登录或 token 过期 | `false` |
| **403** | Forbidden | 已登录但没权限（后端锅） | `false` |
| **404** | Not Found | 你要的资源不存在 | `false` |
| **500** | Internal Server Error | 服务器代码崩了（后端锅） | `false` |
| **502/503** | Bad Gateway / Unavailable | 服务器挂了或正在重启 | `false` |

**口诀：** 2xx 成功，4xx 你的问题（前端），5xx 服务器的问题。`response.ok` 只在 200-299 时为 `true`。
:::

:::explain{title="URLSearchParams —— 安全构建查询参数"}
API 请求经常带参数（搜索关键词、分页页码）。**不要手动拼字符串**——遇到中文、空格、特殊字符会出问题：

```js
// ❌ 手动拼接：中文和特殊字符会导致 URL 不合法
const keyword = '春天'
const url = 'https://api.example.com/search?q=' + keyword
// URL 中的中文不规范，某些服务器会拒绝

// ✅ URLSearchParams：自动处理编码
const params = new URLSearchParams({
  q: '春天',         // 自动编码为 %E6%98%A5%E5%A4%A9
  page: 1,
  limit: 10
})
const url = 'https://api.example.com/search?' + params
// → https://api.example.com/search?q=%E6%98%A5%E5%A4%A9&page=1&limit=10
```
:::

:::explain{title="AbortController —— 取消过时的请求"}
用户快速输入搜索词时，上一次的请求还没返回——与其收到过时结果，不如直接取消：

```js
let controller = null                     // 保存当前的 AbortController

async function search(keyword) {
  if (controller) {
    controller.abort()                    // 取消上一次还在飞行中的请求
  }
  controller = new AbortController()      // 创建新的控制器

  try {
    const response = await fetch('/api/search?q=' + keyword, {
      signal: controller.signal           // 把 signal 传给 fetch——关键！
    })
    const data = await response.json()
    renderResults(data)
  } catch (err) {
    if (err.name === 'AbortError') {
      return                              // 请求被取消是正常的，不处理
    }
    console.error('搜索失败：', err)      // 真正的错误才需要处理
  }
}
// 结合防抖使用——用户在搜索框快速输入时，旧的请求被 abort 掉
// 始终只渲染最新的搜索结果
```
:::

:::explain{title="FormData —— 用 fetch 上传文件"}
提交包含文件的表单时，用 `FormData` 替代 JSON：

```js
// 从 HTML 表单创建 FormData
const form = document.querySelector('#upload-form')
form.addEventListener('submit', async function(e) {
  e.preventDefault()                       // 阻止页面刷新

  const formData = new FormData(form)      // 自动收集所有表单字段
  // 也可以手动追加文件
  formData.append('avatar', fileInput.files[0])

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData                         // 不要设置 Content-Type！
  })                                       // 浏览器会自动设为 multipart/form-data+boundary
  const result = await response.json()
  console.log('上传结果：', result)
})
// 关键：用 FormData 时不要手动设置 Content-Type header
// 浏览器需要自动添加 boundary 参数，手动设置会破坏它
```
:::

## 3. 常见错误

**错误 1：忘记检查 response.ok**

```js
// ❌ 错误：404 也当成功处理，后续代码拿到空数据崩溃
const response = await fetch('/api/user/999')
const user = await response.json()         // 404 时返回的不是 JSON，解析失败
console.log(user.name)                     // 报错：Cannot read property 'name'

// ✅ 正确：先检查 ok
const response = await fetch('/api/user/999')
if (!response.ok) {
  throw new Error('用户不存在（' + response.status + '）')
}
const user = await response.json()         // 只有 2xx 才会走到这里
```

**错误 2：忘记第二个 await**

```js
// ❌ 错误：data 是 Promise 对象，不是数据
async function getData() {
  const response = await fetch('/api/data')
  const data = response.json()             // 忘了 await！data 是 Promise
  console.log(data)                        // Promise {<pending>}
  console.log(data.length)                 // undefined —— 不是数组
}

// ✅ 正确：.json() 也需要 await
async function getData() {
  const response = await fetch('/api/data')
  const data = await response.json()       // 两个 await
  console.log(data.length)                 // 正确：拿到了真正的数组
}
```

**错误 3：POST 时 body 忘记 JSON.stringify**

```js
// ❌ 错误：直接把 JS 对象放进 body
fetch('/api/posts', {
  method: 'POST',
  body: { title: 'hello' }                // 对象会被转成 "[object Object]" 字符串！
})

// ✅ 正确：JSON.stringify 转成 JSON 字符串
fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'hello' }) // 变成 '{"title":"hello"}'
})
```

**错误 4：catch 里没有区分错误类型**

```js
// ❌ 错误：凡是出错都显示"网络错误"
catch (err) {
  showError('网络错误')                    // 可能是 404、500、CORS、断网——信息丢失了
}

// ✅ 正确：根据错误类型给出不同提示
catch (err) {
  if (err.name === 'TypeError' && err.message.includes('fetch')) {
    showError('网络连接失败，请检查网络')   // 断网
  } else if (err.message.includes('404')) {
    showError('请求的内容不存在')
  } else if (err.message.includes('500')) {
    showError('服务器繁忙，请稍后重试')
  } else {
    showError('请求失败：' + err.message)
  }
}
```

:::task{title="动手试试"}
::::step{purpose="第一次让代码和真实的外部世界对话——fetch 返回的 Response 对象包含了状态码、请求头等完整信息，你需要拆两步才能拿到数据。" expected="response.status 为 200，response.ok 为 true。解析后的 data 是一个包含 100 条帖子的数组。"}
打开 `script.js`，用 `async/await` 发一个 GET 请求到 `https://jsonplaceholder.typicode.com/posts`，打印 `response.status`、`response.ok` 和解析后的数据长度
::::

::::step{purpose="POST 需要指定 method、headers、body 三个配置项。先检查 ok 再解析，是防御性编程的基本功——不要在失败的响应上调用 .json()。" expected="控制台输出'创建成功'和服务器返回的 id。运行两次，得到两个不同的 id。"}
在 `script.js` 中发一个 POST 请求创建一个新帖子（title 和 body 自定义），检查 `response.ok`，解析返回的 JSON 看看服务器分配了什么 `id`
::::

::::step{purpose="把请求函数化是对 fetch 的第一次封装——抽成可复用的函数后，其他代码直接调用 getPosts() 就行，不用每次写 fetch + 检查 + 解析。" expected="控制台输出一个 HTTP 错误：'请求失败，状态码：404'。程序不崩溃，继续执行后面的代码。"}
把前面的 GET 请求抽取成 `getPosts()` 函数，包含完整的 try/catch、ok 检查、JSON 解析。然后故意把 URL 改成不存在的地址，观察错误处理的效果
::::

:::

:::hint{title="fetch 三步口诀"}
```js
// 1. 发请求
const response = await fetch(url, options)

// 2. 检查响应
if (!response.ok) { throw new Error('失败：' + response.status) }

// 3. 解析数据
const data = await response.json()  // 或 .text() / .blob() / .formData()

// 别忘了 try/catch 保护
```
:::

:::recap
你学会了 `fetch()`——浏览器和服务器通信的核心 API。发请求两次 `await`（第一次等网络，第二次等 JSON 解析），务必先检查 `response.ok`。GET 取数据，POST 提交数据（body 用 `JSON.stringify`），PUT 更新，DELETE 删除。用 `URLSearchParams` 安全构建查询参数，用 `AbortController` 取消过时请求，用 `FormData` 上传文件。实际工作中，fetch 几乎出现在每一个页面——加载列表、提交表单、搜索内容、上传文件，全部靠它。
:::
