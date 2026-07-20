# CORS 与 REST API — 理解浏览器和服务器如何对话

:::analogy
CORS 就像小区门禁系统——你（浏览器里的 JS）想去隔壁小区（另一个域名）拿快递，门卫（浏览器安全机制）拦住你说"你不住这，不能拿"，除非那栋楼的主人（服务器）明确说了"这个人可以来"（加了 CORS 头）。REST 则是你和快递点的"约定格式"——用 URL 指代物品，用 HTTP 方法表达意图。
:::

:::prerequisite
**本节你需要知道这些词：**

- **fetch()**：浏览器向服务器发送 HTTP 请求的函数
- **HTTP 方法**：请求的操作类型，如 GET（获取）、POST（提交）、PUT（更新）、DELETE（删除）
- **Promise**：表示一个异步操作的结果
:::

---

## Part 1: CORS（跨域资源共享）

## 1. 先看问题：为什么你的 fetch 莫名其妙失败了？

开发时最常见的心碎时刻——你写好 fetch，打开页面，控制台一片红：

```
Access to fetch at 'https://api.othersite.com/data' from origin
'https://mysite.com' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**这在说什么？逐句翻译：**
1. "从 mysite.com 去拿 api.othersite.com 的数据" —— 跨域了（两个域名不一样）
2. "被 CORS 策略阻止" —— 浏览器的安全检查生效了
3. "响应里没有 Access-Control-Allow-Origin 头" —— 服务器没同意让你读响应

**不理解 CORS 的后果：**
- 你在本地开发好好的，部署到线上后接口全挂
- 你打开 Network 面板看到请求返回了 200 和数据，但 JS 拿不到——你以为是代码写错了
- 你花半天排查"为什么 axios/fetch 报错"——其实是后端没配 CORS

**实际工作中你会用这个来：**
- 前后端分离开发时，前端在 `localhost:3000`，后端在 `localhost:8080`——不同端口 = 跨域
- 排查"为什么上线后接口调不通"——99% 是 CORS 没配
- 配置开发代理（Vite proxy）绕过本地开发时的 CORS 问题

:::explain{title="同源策略——浏览器的安全底线"}
**同源策略（Same-Origin Policy）** 是浏览器最核心的安全机制：一个网页只能读取来自**同源**的响应。

"同源"需要三个条件**完全一致**：

| 条件 | 同源示例 | 不同源示例 |
|------|----------|------------|
| 协议相同 | `https://` | `http://` vs `https://` |
| 域名相同 | `api.example.com` | `api.example.com` vs `www.example.com` |
| 端口相同 | `:443`（默认） | `localhost:3000` vs `localhost:8080` |

**为什么要有这个限制？** 假设你登录了网上银行，然后打开了另一个标签页。如果没有同源策略，那个标签页的 JS 就能以你的登录状态向银行发请求，读取你的账户余额——这就是 CSRF 攻击。

**但注意：同源策略只阻止 JS 读取跨域响应，不阻止以下场景：**
- `<img>` 标签加载跨域图片（所以网页能显示外链图片）
- `<script>` 标签加载跨域 JS（所以能用 CDN 的库）
- `<form>` 表单直接提交到跨域地址
- 服务器到服务器的通信（同源策略只存在于浏览器中）
:::

:::explain{title="关键误解：浏览器不是阻止请求发出！"}
这是 CORS 最大的误区。事实是：

- **请求照样到达服务器**，服务器也处理并返回了响应
- **浏览器阻止的是 JS 读取响应**——响应在浏览器手里，但不交给你的 JS

你在 Network 面板能看到请求（状态码 200、有完整返回数据），但 Console 报 CORS 错误——这就是原因。

就像一封信：邮局照样送，对方照样收，但收发室大爷看了一眼寄件人，说"你不是这栋楼的，信不能给你"。
:::

:::explain{title="CORS 怎么解决——服务器加 HTTP 头"}
CORS 是**服务器端**的配置，不是你前端能"绕过"的。最简单的配置——服务器在响应里加：

```
Access-Control-Allow-Origin: *
```
意思是"任何网站都可以读我的数据"（`*` 是通配符）。

如果要限定特定域名：
```
Access-Control-Allow-Origin: https://mysite.com
```

**常见 CORS 响应头一览：**

| 响应头 | 含义 | 示例值 |
|--------|------|--------|
| `Access-Control-Allow-Origin` | 允许哪些域名读取 | `*` 或 `https://mysite.com` |
| `Access-Control-Allow-Methods` | 允许哪些 HTTP 方法 | `GET, POST, PUT, DELETE` |
| `Access-Control-Allow-Headers` | 允许哪些自定义请求头 | `Content-Type, Authorization` |
| `Access-Control-Allow-Credentials` | 是否允许携带 Cookie | `true` |
| `Access-Control-Max-Age` | 预检结果缓存多久（秒） | `3600` |
:::

:::explain{title="简单请求 vs 预检请求（Preflight）"}
浏览器把跨域请求分为两类：

**1. 简单请求（不发预检）**
满足**全部**条件才算简单请求：
- 方法必须是 GET、HEAD 或 POST
- 只使用这些请求头：`Accept`、`Accept-Language`、`Content-Language`、`Content-Type`（且值只能是 `text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`）
- 没有自定义请求头

流程：**发请求 → 服务器返回 → 浏览器检查 CORS 头 → 决定给不给 JS**

**2. 预检请求（先发 OPTIONS 探路）**
只要不满足上面任何一条，浏览器先发一个 `OPTIONS` 请求：

```
OPTIONS /api/data HTTP/1.1
Host: api.othersite.com
Origin: https://mysite.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization
```

服务器返回允许的 CORS 头，浏览器看"批准了"才发真正的请求。

流程：**发 OPTIONS 预检 → 服务器回复"可以" → 发真正请求 → 服务器返回 → 交给 JS**

**什么会触发预检？**
- 用了 PUT、DELETE、PATCH 方法
- `Content-Type` 设为 `application/json`（所以绝大多数 fetch JSON 请求都会触发预检！）
- 加了自定义请求头（如 `Authorization: Bearer xxx`）

这就是为什么你发 JSON POST 请求时，Network 面板里能看到**两条请求**——第一条是 OPTIONS，第二条才是真正的 POST。
:::

:::example{title="开发环境解决 CORS——Vite 代理"}
实际项目中，开发时后端可能还没配 CORS。前端用开发服务器的代理转发来绕过去：

```js
// vite.config.js —— 开发环境的代理配置
export default {
  server: {
    proxy: {
      '/api': {                              // 所有以 /api 开头的请求
        target: 'https://api.realserver.com', // 转发到这个服务器
        changeOrigin: true,                   // 修改请求头中的 origin
        rewrite: function(path) {
          return path.replace(/^\/api/, '')   // 去掉 /api 前缀
        }
      }
    }
  }
}
// 你的代码里写：fetch('/api/users')
// 实际请求：https://api.realserver.com/users
// 对浏览器来说，请求是同源的（都发到 localhost），没有跨域问题！
```

**生产环境怎么做？** 让后端正确配置 CORS 响应头，或者用 Nginx 做反向代理统一转发。
:::

## 3. 常见错误

**错误 1：以为前端能绕过 CORS**

```js
// ❌ 错误想法：加个 header 就能绕过
fetch('https://api.othersite.com/data', {
  headers: { 'Access-Control-Allow-Origin': '*' }  // 这是响应头，不是请求头！
})
// 加了也没用——CORS 头必须是服务器在响应里返回的，请求里写不管用

// ✅ 正确做法：让后端配，或者开发环境用代理
```

**错误 2：把 CORS 错误当成网络错误**

```js
// ❌ 错误：看到 Console 报错，以为网络出了问题
fetch('https://api.othersite.com/data')
  .catch(function(err) {
    console.log('网络断了？', err)  // 不是网络问题，是 CORS 问题！
  })

// ✅ 正确：打开 Network 面板看状态码——如果返回 200 但 Console 报 CORS，
//    说明请求成功到达服务器了，只是浏览器不把响应交给 JS
```

**错误 3：忘记 Content-Type: application/json 会触发预检**

```js
// 这个 POST 请求会触发 OPTIONS 预检——因为 Content-Type 是 application/json
fetch('/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },  // 这行触发预检
  body: JSON.stringify({ name: 'test' })
})
// 如果你在 Network 里看到两条请求（OPTIONS + POST），不要惊讶，这是正常的
```

---

## Part 2: REST API 概念

## 1. 先看问题：没有规范的 API 长什么样？

```js
// ❌ 非 RESTful：每个人凭感觉设计 URL，毫无规律
GET    /getAllPosts           // 动词在 URL 里
GET    /getPostById?id=1      // 又是动词又是参数
POST   /createPost            // 动词
POST   /deletePostById/1      // 用 POST 做删除
GET    /fetchUserWithOrders   // 完全自定义的名字
// 问题：新人接手项目，不看文档根本不知道有哪些接口、怎么用
```

```js
// ✅ RESTful：有统一的命名规范，看到 URL 就知道功能
GET    /posts          // 帖子列表
GET    /posts/1        // ID 为 1 的帖子
POST   /posts          // 创建帖子
PUT    /posts/1        // 更新帖子 1
DELETE /posts/1        // 删除帖子 1
GET    /users/1/posts  // 用户 1 的帖子（嵌套关系）
// 好处：URL 结构本身就在说明"这是谁的数据、做什么操作"
```

:::explain{title="REST 核心原则——URL 是名词，HTTP 方法是动词"}
REST 不是一门技术，而是一套**设计规范**。核心就两条：

1. **URL 只用名词复数**，代表"资源"（Resource）
2. **HTTP 方法表达操作**（Action），不在 URL 里写动词

| 操作 | HTTP 方法 | URL 示例 | 有请求体？ | 含义 |
|------|-----------|----------|-----------|------|
| **C**reate | POST | `/products` | 有（新数据） | 新建 |
| **R**ead | GET | `/products` 或 `/products/5` | 无 | 查询 |
| **U**pdate | PUT/PATCH | `/products/5` | 有（新数据） | 更新 |
| **D**elete | DELETE | `/products/5` | 通常无 | 删除 |

**PUT vs PATCH：**
- **PUT**：替换整个资源（你没传的字段可能被清空）
- **PATCH**：只更新你传的字段（其他字段保持不变）
- 实际项目里 PATCH 更常用——"只改手机号"比"把全部信息再发一遍"合理
:::

:::example{title="查询参数——分页、搜索、排序、筛选"}
列表接口用查询参数控制返回数据：

```js
// 分页：第 2 页，每页 10 条
GET /posts?page=2&limit=10

// 搜索：标题包含"JavaScript"
GET /posts?q=JavaScript

// 排序：按创建时间倒序
GET /posts?sort=createdAt&order=desc

// 组合使用（常见）
GET /posts?page=1&limit=20&status=published&sort=createdAt&order=desc

// 用 URLSearchParams 安全构建（前面学过）
const params = new URLSearchParams({           // 自动处理特殊字符编码
  page: 1,
  limit: 20,
  status: 'published'
})
const url = 'https://api.example.com/posts?' + params
// → https://api.example.com/posts?page=1&limit=20&status=published
```
:::

:::example{title="实战：JSONPlaceholder — 一个标准的 RESTful API"}
[JSONPlaceholder](https://jsonplaceholder.typicode.com) 是免费的练习 API，结构是标准 REST 设计：

```
资源       URL                              方法        说明
─────────────────────────────────────────────────────────────
帖子       /posts                           GET         获取 100 条帖子
           /posts/1                         GET         获取帖子 1
           /posts/1/comments                GET         帖子 1 的所有评论
           /posts?userId=1                  GET         用户 1 的帖子（查询参数筛选）
           /posts                           POST        创建帖子（模拟）
           /posts/1                         PUT         更新帖子 1（模拟）
           /posts/1                         DELETE      删除帖子 1（模拟）

评论       /comments                        GET         获取 500 条评论
           /comments?postId=1               GET         帖子 1 的评论

用户       /users                           GET         获取 10 个用户
           /users/1                         GET         获取用户 1
           /users/1/albums                  GET         用户 1 的相册（嵌套资源）
```

**设计亮点：**
- `/users/1/posts` 和 `/posts?userId=1` 都可以获取用户 1 的帖子——前者体现层级关系，后者更灵活
- 所有资源名都是复数名词，没有动词
- 嵌套资源表达了数据之间的关系
:::

:::task{title="动手试试"}
::::step{purpose="亲手触发 CORS 成功和失败，直观理解'CORS 是服务器决定的'。jsonplaceholder 开放 CORS，所以成功；大多数商业网站不开放，所以被拦。" expected="jsonplaceholder 返回数据；另一个未开放 CORS 的网站报 CORS 错误。"}
打开浏览器控制台，分别运行：
```js
// 这个能成功——jsonplaceholder 开放了 CORS
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(function(r) { return r.json() })
  .then(function(d) { console.log('成功：', d.title) })
  .catch(function(e) { console.log('失败：', e.message) })

// 这个大概率 CORS 错误——商业网站不开放跨域读取
fetch('https://www.baidu.com')
  .then(function(r) { return r.text() })
  .then(function(d) { console.log(d) })
  .catch(function(e) { console.log('CORS 错误：', e.message) })
```
::::

::::step{purpose="培养识别 RESTful API 的能力。好的 API 设计让你不看文档也能猜出接口功能。" expected="能正确说出 GET /posts、GET /posts/1、POST /posts、DELETE /posts/1 各自的功能，以及 GET /posts/1/comments 和 GET /comments?postId=1 的关系。"}
打开浏览器的 Network 面板，访问 `https://jsonplaceholder.typicode.com/posts/1`，观察请求的 Request Headers 和 Response Headers。然后不看文档，仅通过 URL 推测以下接口的功能：
- `GET /posts`
- `GET /posts/1`
- `GET /posts/1/comments`
- `GET /comments?postId=1`
- `POST /posts`
- `DELETE /posts/1`
::::

::::step{purpose="用 URLSearchParams 安全构建 URL，而不是手动拼接字符串——后者遇到中文、空格、特殊字符会出问题。" expected="构建的 URL 正确：https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5。fetch 请求后返回恰好 5 条数据且 userId 都是 1。"}
在控制台中用 `URLSearchParams` 构建带参数的 URL，请求 userId=1 且只取 5 条的帖子，用 fetch 验证返回结果
::::

:::

:::hint{title="CORS + REST 记忆口诀"}
**CORS 三句话：**
1. 浏览器不拦请求，拦的是 JS 读响应
2. CORS 是服务器在响应里加 HTTP 头，前端改不了
3. 开发时用 Vite 代理，生产环境后端配 CORS

**REST 三句话：**
1. URL 里只放名词复数，动词用 HTTP 方法
2. CRUD 映射：POST / GET / PUT或PATCH / DELETE
3. 查询参数用 `?key=value&key2=value2`
:::

:::recap
你学会了两块关键知识。CORS：浏览器的安全机制限制 JS 跨域读响应，解决方式是服务器加 `Access-Control-Allow-Origin` 响应头。开发时用 Vite 代理转发绕过，生产环境后端正确配置。REST：一套 API 设计规范，URL 中只用名词标识资源，HTTP 方法（GET/POST/PUT/DELETE）表达操作。好的 RESTful API 让人不看文档也能猜到接口功能。实际工作中，你每天都要和 CORS 打交道（前后端分离必然跨域），也每天都要设计或调用 RESTful API。
:::
