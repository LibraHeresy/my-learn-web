# 封装 API 客户端 — 打造你的"专属乐务"

:::analogy
把 fetch 逻辑封装到 API 模块里，就像公司有统一的前台接待——所有访客走同一个入口，登记、引导全由前台负责。各业务部门不需要自己下楼接人，也绝不会有人从后门溜进来。
:::

:::prerequisite
**本节你需要知道这些词：**

- **fetch()**：浏览器向服务器发送 HTTP 请求的函数
- **async/await**：让异步代码像同步代码一样读
- **模块**：把相关功能封装在独立文件里，通过 export/import 共享
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 把散落在各处的 fetch 请求封装到统一的 API 模块中
- 实现 `api.get()` / `api.post()` / `api.put()` / `api.delete()` 四个语义化方法
- 在 `request()` 函数中统一处理 BASE_URL、headers、错误检查、JSON 解析
- 理解"改一处全局生效"的价值——加 token、加超时、加日志只需改一个函数
:::

:::explain{title="一、先看问题：每个页面都直接写 fetch，项目大了会怎样？"}
想象一个中型项目，有 10 个页面，每个页面都调 API：

```js
// 页面 A：用户列表
const res1 = await fetch('https://api.example.com/users', {
  headers: { 'Content-Type': 'application/json' }
})
if (!res1.ok) throw new Error('失败')
const users = await res1.json()

// 页面 B：帖子列表——完全复制了上面的模板
const res2 = await fetch('https://api.example.com/posts', {
  headers: { 'Content-Type': 'application/json' }
})
if (!res2.ok) throw new Error('失败')
const posts = await res2.json()
```

**这样写的问题：**
1. `BASE_URL` 重复了 30 次——如果 API 地址变了，要改 30 处
2. `headers` 和错误检查逻辑重复 30 次——大量复制粘贴
3. 某天产品说"所有请求要加 token"——你要翻遍所有页面，逐一添加
4. 某天要加统一的日志或错误上报——又是全项目地毯式搜索
:::

:::explain{title="二、解决方案：一个统一的 api 模块"}
```js
// api.js —— 项目中所有 HTTP 请求的唯一入口
const BASE_URL = 'https://jsonplaceholder.typicode.com'  // ① 基础地址只写一次

// 核心：统一的请求函数——所有请求都经过这里
async function request(path, options) {
  if (!options) options = {}                // ② 合并默认配置

  const url = BASE_URL + path              // ③ 拼接完整 URL
  const config = {
    headers: {
      'Content-Type': 'application/json'   // ④ 默认 JSON 格式
    },
    ...options                              // ⑤ 允许调用方覆盖配置
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {                    // ⑥ 统一错误检查
      const error = new Error('请求失败：' + response.status)
      error.status = response.status
      throw error
    }

    return await response.json()           // ⑦ 统一 JSON 解析
  } catch (err) {
    console.error('[API]', path, err)      // ⑧ 统一错误日志
    throw err                              // 重新抛出让调用方也能处理
  }
}

// 语义化方法——比直接调 request() 更直观
export const api = {
  get: function(path) { return request(path) },
  post: function(path, body) {
    return request(path, { method: 'POST', body: JSON.stringify(body) })
  },
  put: function(path, body) {
    return request(path, { method: 'PUT', body: JSON.stringify(body) })
  },
  delete: function(path) {
    return request(path, { method: 'DELETE' })
  }
}
```

**封装前后对比：**

```js
// ❌ 封装前：每次请求都要写 6 行
const res = await fetch(BASE_URL + '/posts')
if (!res.ok) throw new Error('失败')
const posts = await res.json()

// ✅ 封装后：1 行搞定
const posts = await api.get('/posts')
```
:::

:::explain{title="三、需要扩展时——加 token、加超时、加日志"}
API 客户端是"活"的——随着项目发展，你会逐步给它加功能。因为所有请求都经过 `request()`，改一处就全局生效：

```js
// 扩展版 api.js —— 加入了 token 和业务错误处理
async function request(path, options) {
  if (!options) options = {}

  const url = BASE_URL + path
  const token = localStorage.getItem('token')

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': 'Bearer ' + token } : {})
    },
    ...options
  }

  try {
    const response = await fetch(url, config)

    if (response.status === 401) {
      window.location.href = '/login'       // token 过期 → 跳登录
      return
    }

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null)
      const msg = errorBody && errorBody.message
        ? errorBody.message
        : '请求失败（' + response.status + '）'
      throw new Error(msg)
    }

    return await response.json()
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('网络连接失败，请检查网络')
    }
    throw err
  }
}
```

**这个扩展一次性解决了：**
- 每个请求自动带 token（不用在每个页面手动加）
- 401 自动跳登录（不用每个页面判断）
- 网络错误 vs 业务错误区分处理
- 改一处，所有接口自动生效
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：在业务代码里直接写 fetch，不用封装**

```js
// ❌ 项目里到处散落着 fetch，URL 硬编码
const res = await fetch('https://api.com/users')

// ✅ 统一用 api 模块
import { api } from './api.js'
const users = await api.get('/users')
```

**错误 2：封装了但只封装了 get，post/put/delete 还是直接写 fetch**

```js
// ❌ 半吊子封装：get 用了封装，POST 还是裸写
const users = await api.get('/users')
const res = await fetch(BASE_URL + '/users', { method: 'POST', body: ... })

// ✅ 所有请求方法都通过 api 模块
const created = await api.post('/users', newUser)
```

**错误 3：request() 里 catch 了但没 throw——错误被吞**

```js
// ❌ catch 里没 throw，调用方不知道出错了
async function request(path, options) {
  try { ... }
  catch (err) { console.error(err) }  // 忘记 throw！
}
// 调用方收到 undefined，以为请求成功了

// ✅ catch 后重新抛出
async function request(path, options) {
  try { ... }
  catch (err) { console.error(err); throw err }
}
```
:::

:::explain{title="四、实际工作中你会怎么用？"}
封装 API 客户端是每个前端项目的**基建第一步**——在搭建项目的第一天就会创建它：

- **统一管理 BASE_URL**：开发/测试/生产环境自动切换
- **统一注入 token**：用户登录后自动加到每个请求头里
- **统一错误处理**：401 自动跳登录、网络错误全局提示
- **渐进扩展**：加超时控制、请求日志、失败重试——改 `request()` 一处即可

**API 客户端扩展检查清单：**
```
基础功能：
- BASE_URL 统一管理
- response.ok 统一检查
- JSON 解析统一处理

进阶功能：
- token 自动注入 + 过期处理（401 跳登录）
- 网络错误 vs 业务错误分类处理
- 请求超时控制（AbortController + setTimeout）
- 请求/响应日志（调试用）
- 失败重试（网络抖动时自动重试 1-2 次）
```
:::

:::task{title="动手试试 ✨"}
::::step{purpose="封装的核心价值是'写一次，到处用'。所有请求共用一个 BASE_URL、一个错误处理、一个 JSON 解析。" expected="api.get('/posts') 返回帖子数组，数据与直接 fetch 一致，但代码只有一行。"}
打开 `script.js`，实现 API 客户端：
1. 定义 `BASE_URL = 'https://jsonplaceholder.typicode.com'`
2. 实现 `request(path, options)`：拼接 URL、合并 headers、检查 response.ok、返回 response.json()
3. 暴露 `api = { get, post, put, delete }` 四个方法
::::

::::step{purpose="封装好的 api 模块替代了裸 fetch——代码量减 80%。同时验证 get 和 post 都能正常工作。" expected="控制台依次输出：帖子列表、新建帖子（含 id）、更新结果、删除状态。全部通过 api 模块完成。"}
在同一文件中使用封装好的 `api` 对象：get 获取帖子列表、post 创建帖子、put 更新、delete 删除
::::

::::step{purpose="token 是真实项目中 API 客户端最重要的扩展功能——一键让所有请求自动携带登录凭证。" expected="运行后，所有 fetch 请求的 Request Headers 都会带上 Authorization: Bearer test-token-123。"}
给 `request()` 函数加上 token 自动注入：从变量中读取 token，自动加到请求头的 `Authorization` 字段
::::

:::

:::recap
你学会了把散落在各处的 fetch 请求封装到统一的 API 模块中。核心是 `request()` 函数——所有请求都经过它，在这里统一处理 BASE_URL、headers、错误检查、JSON 解析。暴露 `api.get/post/put/delete` 四个语义化方法，调用时一行代码搞定。扩展也很方便——加 token、加超时、加日志，改 `request()` 一处，全局生效。实际工作中，API 客户端是每个前端项目的基建——项目搭建的第一天就会创建它。
:::
