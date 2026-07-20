# 封装 API 客户端 — 打造你的"专属接口总管"

:::analogy
把所有的 fetch 逻辑封装到一个专门的 API 模块中，就像公司有专门的前台接待——所有请求走同一个入口，统一登记、统一转发，而不是每个人各接各的客人。
:::

:::prerequisite
**本节你需要知道这些词：**

- **fetch()**：浏览器向服务器发送 HTTP 请求的函数
- **Promise**：表示一个异步操作的结果——可能成功也可能失败
- **async/await**：让异步代码读起来像同步代码的语法，用 await 等待 Promise 完成
:::

:::explain{title="为什么需要封装？"}
之前我们把 fetch 直接写在业务逻辑里。随着项目变大，问题来了：
- 每个接口都要重复写 `fetch(BASE_URL + '/...')`
- 每个请求都要重复检查 `response.ok`
- 基础 URL 改了要改几十处
- 没有统一的错误处理
**解决方式：** 创建一个 `apiClient` 模块，统一管理所有请求。
:::

:::example{title="基础 API 客户端"}
```js
// api.js — 你的"接口总管"
const BASE_URL = 'https://api.example.com'
async function request(path, options = {}) {
  const url = BASE_URL + path
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers  // 合并自定义 headers
    },
    ...options
  })
  if (!response.ok) {
    throw new Error(\`请求失败：\${response.status}\`)
  }
  return response.json()
}
// 语义化方法
export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, {
    method: 'POST',
    body: JSON.stringify(body)
  }),
  delete: (path) => request(path, { method: 'DELETE' })
}
```
:::

:::example{title="使用封装后的 API"}
对比前后的代码：
```js
// ❌ 未封装：每个地方都要写完整 fetch
const res = await fetch(BASE_URL + '/pieces', {
  headers: { 'Content-Type': 'application/json' }
})
if (!res.ok) throw new Error('请求失败')
const data = await res.json()
// ✅ 封装后：一行搞定
const data = await api.get('/pieces')
```
封装的好处：
- 代码量减少 80%
- 修改 BASE_URL 只改一处
- 错误处理统一，不会遗漏
- 可以方便地添加日志、token 等功能
:::

:::task{title="动手试试 ✨"}
::::step{purpose="封装的核心价值是\"写一次，到处用\"——所有请求共用一个 BASE_URL、一个错误处理逻辑、一个响应解析流程。就像公司的前台统一负责接待来访——登记、引导全由前台处理，各个部门不需要每次都自己下楼接人。" expected="api.get(\"/posts\") 返回一个 {{term:Promise}}，解析后得到帖子数组。"}
实现 api.get(path)：内部用 fetch(BASE_URL + path) 发送请求，检查 response.ok，返回 response.json()
::::

::::step{purpose="封装后的调用只一行代码——对比未封装时需要写 fetch+检查 ok+解析 json 三步，代码量减少 80%。修改 BASE_URL 也只需改一处，所有 api.get() 调用自动生效。" expected="控制台输出前 2 条帖子数据，与直接用 fetch 的结果完全一致，但代码简洁得多。"}
用封装好的 api.get("/posts") 获取数据，调用 .slice(0, 2) 取前 2 条显示
::::

:::

:::hint{title="提示"}
```js
const BASE_URL = 'https://jsonplaceholder.typicode.com'
const api = {
  get: async (path) => {
    const res = await fetch(BASE_URL + path)
    if (!res.ok) throw new Error('请求失败')
    return res.json()
  }
}
```
:::

:::recap
你学会了把 fetch 请求逻辑封装到一个 API 模块里，统一管理 BASE_URL、错误处理和 JSON 解析。封装后，调用接口只需要一行代码，修改基础地址也只改一处，代码量少 80%。
:::


