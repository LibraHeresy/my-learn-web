# {{term:CORS}} 与 REST — 理解浏览器和服务器如何对话

:::analogy
CORS 就像门禁系统——不是你认识的人不让进。浏览器会用"预检"问服务器"我可以进去吗？"，服务器回答"可以"之后，真正的请求才会发出去。REST 则是双方约定好的"对话格式"——用 URL 指代资源，用 HTTP 方法表达意图。
:::

:::prerequisite
**本节你需要知道这些词：**

- **fetch()**：浏览器向服务器发送 HTTP 请求的函数
- **HTTP 方法**：请求的操作类型，如 GET（获取）、POST（提交）、PUT（更新）、DELETE（删除）
- **API**：应用程序接口，让不同软件之间进行数据交换的约定
:::

:::explain{title="这一节你会学到什么"}
前面你已经学会了用 fetch() 发请求、用 async/await 处理异步。这一节我们要回答两个关键问题：

1. **为什么有时候 fetch 会报 CORS 错误？** 浏览器的安全机制是怎么工作的？
2. **API 的 URL 应该怎么设计？** 为什么有的 API 一看就知道怎么用，有的却让人摸不着头脑？

学完这一节，你不仅知道"怎么发请求"，还知道"为什么有时候发不出去"以及"好的 API 长什么样"。
:::

---

## Part 1: CORS（跨域资源共享）

:::explain{title="同源策略 — 浏览器的安全底线"}
**同源策略（Same-Origin Policy）** 是浏览器最核心的安全机制：一个网页只能读取来自**同源**的响应数据。

什么叫"同源"？三个条件必须**完全一致**：

| 条件 | 示例 |
|------|------|
| 协议相同 | `https://` vs `http://` —— 不同源！ |
| 域名相同 | `api.example.com` vs `www.example.com` —— 不同源！ |
| 端口相同 | `localhost:3000` vs `localhost:8080` —— 不同源！ |

举个例子：你在 `https://mysite.com` 打开了一个网页，这个网页里的 JS 尝试去读 `https://api.othersite.com/data` 的返回数据——浏览器会拦住，因为两个域名不同。

**为什么要有这个限制？** 想象你登录了网上银行，然后打开了另一个标签页。如果没有同源策略，那个标签页的 JS 就能以你的身份向银行发请求并读取你的账户余额——这太危险了。
:::

:::explain{title="关键认知：浏览器不是阻止请求发出！"}
这是很多人对 CORS 最大的误解。事实是：

- **浏览器不会阻止请求发出去** —— 请求照样到达服务器，服务器也照样处理并返回了响应
- **浏览器阻止的是 JS 读取响应** —— 响应到了浏览器，但浏览器检查了 CORS 头，发现不允许，于是**不把数据交给你的 JS 代码**

就像一封信：
- 寄信（发请求）—— 邮局照样送，对方照样收
- 收信（读响应）—— 但收发室大爷看了一眼寄件人，说"这个不是咱们楼的，不能给你"

你在 Network 面板里能看到请求（状态码 200、有返回数据），但 Console 里却是 CORS 错误——这就是原因。
:::

:::example{title="CORS 错误长什么样——学会读懂它"}
在浏览器控制台，CORS 错误通常长这样：

```
Access to fetch at 'https://api.othersite.com/data' from origin
'https://mysite.com' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**逐句翻译：**
1. "从 `mysite.com` 去拿 `api.othersite.com` 的数据" —— 跨域了
2. "被 CORS 策略阻止" —— 浏览器的安全检查生效了
3. "响应里没有 `Access-Control-Allow-Origin` 头" —— 服务器没同意让你读

**类似的其他 CORS 错误信息：**
- `...has been blocked by CORS policy: Response to preflight request doesn't pass...` —— 预检请求没通过（后面会讲）
- `...The 'Access-Control-Allow-Origin' header has a value 'xxx' that is not equal to the supplied origin...` —— 服务器只允许特定域名，你的不在白名单里

**诊断技巧：** 打开 Network 面板，找到被拦的请求，看 Response Headers 里有没有 `Access-Control-Allow-Origin`。
:::

:::explain{title="CORS 是服务器端的设置"}
CORS 不是你能从前端代码里"绕过"的东西——它是**服务器在响应里加的 HTTP 头**。

最简单的 CORS 配置——服务器在响应里加上这个头：

```
Access-Control-Allow-Origin: *
```

意思是"任何网站都可以读我的数据"（`*` 是通配符）。

如果要限制特定域名：

```
Access-Control-Allow-Origin: https://mysite.com
```

**常见的 CORS 响应头一览：**

| 响应头 | 含义 |
|--------|------|
| `Access-Control-Allow-Origin` | 允许哪些域名读取（必配） |
| `Access-Control-Allow-Methods` | 允许哪些 HTTP 方法（GET, POST 等） |
| `Access-Control-Allow-Headers` | 允许哪些自定义请求头 |
| `Access-Control-Allow-Credentials` | 是否允许携带 Cookie |
| `Access-Control-Max-Age` | 预检结果缓存多久（秒） |

**重点：** 后端不设置这些头，前端怎么写代码都没用——浏览器只认服务器返回的 CORS 头。
:::

:::explain{title="简单请求 vs 预检请求（Preflight）"}
浏览器把跨域请求分为两类，处理方式不同：

**1. 简单请求（Simple Request）**

满足以下**全部**条件的请求，浏览器直接发，不发预检：
- 方法是 GET、HEAD 或 POST
- 只使用"简单头"：`Accept`、`Accept-Language`、`Content-Language`、`Content-Type`（且值只能是 `text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`）
- 没有自定义请求头

流程：**请求 → 响应 → 检查 CORS 头 → 决定要不要给 JS**

**2. 预检请求（Preflight Request）**

不满足上述任何一条，浏览器先发一个 OPTIONS 请求去"探路"：

```
OPTIONS /api/data HTTP/1.1
Host: api.othersite.com
Origin: https://mysite.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type, X-Custom-Header
```

服务器必须返回允许的 CORS 头，浏览器看"批准了"才发真正的请求。

流程：**OPTIONS 预检 → 服务器回复"可以" → 真正的请求 → 响应 → 交给 JS**

**什么情况会触发预检？**
- 用了 PUT、DELETE、PATCH 等方法
- Content-Type 是 `application/json`（注意！用 fetch 发 JSON 数据就会触发）
- 加了自定义请求头（如 `Authorization`）

**这就是为什么你发 JSON 的 POST 请求时，Network 面板里会看到两条请求——第一条 OPTIONS，第二条才是真正的 POST。**
:::

:::example{title="亲手触发一次 CORS 错误"}
打开浏览器控制台，在任意网页上运行这段代码：

```js
// 从当前页面去请求一个不同域名的 API
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(data => console.log('成功：', data))
  .catch(err => console.log('失败：', err))
```

**如果成功**——说明 `jsonplaceholder.typicode.com` 的服务器设置了 `Access-Control-Allow-Origin: *`，允许任何人访问。这是一个公开 API，专门开放给前端开发者练习。

**如果想看 CORS 错误**——找一个不开放 CORS 的网站试试（大部分商业网站都不开放）：

```js
// 大概率会报 CORS 错误
fetch('https://www.baidu.com')
  .then(res => res.text())
  .then(data => console.log(data))
  .catch(err => console.log('CORS 错误：', err))
```

你会看到熟悉的红色报错：`has been blocked by CORS policy`。
:::

:::explain{title="常见的 CORS 解决方案"}
实际开发中遇到 CORS 问题，有几种解决方式：

**方案 1：后端配置 CORS（正确做法）**

让后端同事在服务器上加 CORS 头。Node.js (Express) 示例：

```js
// Express 后端配置 CORS
const cors = require('cors')
app.use(cors({
  origin: 'https://mysite.com',  // 允许的前端域名
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
```

**方案 2：开发环境用代理（前端自己解决）**

开发时后端还没配 CORS？用前端开发服务器做代理转发——请求发给同源的开发服务器，服务器帮你转发到真正的 API。

```js
// Vite 配置 (vite.config.js)
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://api.othersite.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
```

这样你的 `fetch('/api/data')` 实际请求的是 `https://api.othersite.com/data`，但对浏览器来说请求是同源的——代理在中间帮你"洗白"了。

**方案 3：CORS 代理服务（临时方案，仅开发测试）**

用公开的 CORS 代理服务绕过限制：

```js
const corsProxy = 'https://cors-anywhere.herokuapp.com/'
const targetUrl = 'https://api.example.com/data'
fetch(corsProxy + targetUrl)
  .then(res => res.json())
  .then(data => console.log(data))
```

**注意：** CORS 代理仅适合开发测试，生产环境绝对不要用——数据会经过第三方服务器，不安全。
:::

:::explain{title="什么时候不需要 CORS？"}
并不是所有跨域请求都需要 CORS 配置：

| 场景 | 需要 CORS？ | 说明 |
|------|------------|------|
| 同源请求 | 不需要 | 协议+域名+端口都一样，没有跨域问题 |
| `<script>` 标签加载 JS | 不需要 | `<script>` 不受同源策略限制 |
| `<img>` 标签加载图片 | 不需要 | 图片加载不受限制（所以能显示外链图片） |
| `<link>` 加载 CSS | 不需要 | CSS 加载不受限制 |
| JSONP（传统方案） | 不需要 | 利用 `<script>` 标签绕过，但只支持 GET，已过时 |
| 服务器到服务器 | 不需要 | 同源策略只存在于浏览器，两个服务器之间随意通信 |
| `<form>` 直接提交 | 不需要 | 表单可以提交到任何域名（但页面会跳转） |

**关键理解：** 同源策略只限制**浏览器中 JS 读取跨域响应**。服务器之间通信、HTML 标签加载资源、表单直接提交——这些都不受 CORS 限制。
:::

---

## Part 2: {{term:REST API}} 概念

:::explain{title="REST 是什么——约定，不是技术"}
**REST（Representational State Transfer）** 是一种 API 设计风格，不是一门技术或协议。它是一套"大家约定俗成"的设计规范，让 API 使用者一看 URL 就知道怎么用。

**REST 的核心思想：**
- 用 URL 标识**资源**（Resource）
- 用 HTTP 方法表达**操作**（Action）
- 服务器**无状态**（每个请求独立，不依赖之前的请求）

**好处：** 你和另一个团队可以各自独立开发——只要约好了 API 的"样子"，前端按约定发请求，后端按约定处理——不需要天天开会同步。
:::

:::example{title="资源即名词——URL 设计的第一原则"}
一个好的 RESTful URL 像这样：

```
GET    /users        → 获取所有用户
GET    /users/42     → 获取 ID 为 42 的用户
GET    /users/42/posts → 获取用户 42 的所有帖子
POST   /users        → 创建一个新用户
PUT    /users/42     → 更新用户 42 的全部信息
DELETE /users/42     → 删除用户 42
```

**RESTful 设计原则：**
- URL 只用**名词复数**，不用动词
- 用 HTTP 方法表达动作，不在 URL 里写动词

**对比——好的设计 vs 差的设计：**

```js
// ✅ RESTful：名词做资源，HTTP 方法做操作
GET    /posts          // 获取帖子列表
GET    /posts/1        // 获取帖子 1
POST   /posts          // 创建帖子
PUT    /posts/1        // 更新帖子 1
DELETE /posts/1        // 删除帖子 1

// ❌ 非 RESTful：动词塞进 URL，乱成一团
GET    /getAllPosts      // 不要写 getAll
GET    /getPostById/1    // 不要写 get...ById
POST   /createPost       // 不要写 create
POST   /deletePost/1     // 不要用 POST 做删除
```
:::

:::explain{title="CRUD 与 HTTP 方法的映射表"}
几乎所有的数据操作都可以归为 CRUD 四种：

| 操作 | HTTP 方法 | 含义 | URL 示例 | 有请求体？ |
|------|-----------|------|----------|-----------|
| **C**reate | POST | 新建一条数据 | `POST /products` | 有（新数据） |
| **R**ead | GET | 读取数据 | `GET /products` 或 `GET /products/5` | 无 |
| **U**pdate | PUT/PATCH | 更新数据 | `PUT /products/5` | 有（完整数据） |
| **D**elete | DELETE | 删除数据 | `DELETE /products/5` | 通常无 |

**PUT vs PATCH 的区别：**
- **PUT**：替换整个资源（你传什么，服务器就存什么——没传的字段可能被清空）
- **PATCH**：部分更新（只修改你传的字段，其他字段保持不变）

大部分项目里用 PATCH 更多——"只改手机号"比"把所有信息再发一遍"更合理。
:::

:::explain{title="查询参数 —— 过滤、分页、排序"}
对于列表类接口，常用查询参数（Query Parameters）来控制返回数据：

```js
// 分页：第 2 页，每页 10 条
GET /posts?page=2&limit=10

// 搜索：标题包含"JavaScript"
GET /posts?q=JavaScript

// 排序：按创建时间倒序
GET /posts?sort=createdAt&order=desc

// 筛选：只看已发布的
GET /posts?status=published

// 组合使用
GET /posts?page=1&limit=20&status=published&sort=createdAt&order=desc
```

**查询参数用 `?` 开头，多个参数用 `&` 连接。** 这是 HTTP 协议本身的规定，不是 REST 特有的，但 RESTful API 几乎都这么用。

配合 `URLSearchParams` 使用（前面学过）：

```js
const params = new URLSearchParams({
  page: 1,
  limit: 20,
  status: 'published'
})
const url = `https://api.example.com/posts?${params}`
// → https://api.example.com/posts?page=1&limit=20&status=published
```
:::

:::example{title="实战：JSONPlaceholder——一个标准的 RESTful API"}
[JSONPlaceholder](https://jsonplaceholder.typicode.com) 是一个免费的假数据 API，结构是标准的 REST 设计。来看看它的资源设计：

```
资源       URL                             方法     说明
─────────────────────────────────────────────────────────────
帖子       /posts                          GET      获取 100 条帖子
           /posts/1                        GET      获取帖子 1
           /posts/1/comments               GET      获取帖子 1 的所有评论
           /posts?userId=1                 GET      获取用户 1 的帖子
           /posts                          POST     创建帖子（模拟）
           /posts/1                        PUT      更新帖子 1（模拟）
           /posts/1                        DELETE   删除帖子 1（模拟）

评论       /comments                       GET      获取 500 条评论
           /comments?postId=1              GET      获取帖子 1 的评论

用户       /users                          GET      获取 10 个用户
           /users/1                        GET      获取用户 1
           /users/1/albums                 GET      获取用户 1 的相册
```

**嵌套资源设计：** `/users/1/posts` 这种写法表示"用户 1 的帖子"——URL 结构本身就在表达数据之间的关系。这种层次化设计是 RESTful API 的一大特点。

```js
// 试试：在浏览器控制台跑这段代码
async function exploreAPI() {
  // 1. 获取所有帖子——一个包含 100 个对象的数组
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(r => r.json())
  console.log('帖子总数：', posts.length)  // 100

  // 2. 获取单个帖子
  const post1 = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(r => r.json())
  console.log('帖子 1：', post1)
  // { userId: 1, id: 1, title: "...", body: "..." }

  // 3. 嵌套关系——用户 1 的帖子
  const userPosts = await fetch('https://jsonplaceholder.typicode.com/users/1/posts')
    .then(r => r.json())
  console.log('用户 1 的帖子数：', userPosts.length)

  // 4. 查询参数——筛选 userId=2 的帖子
  const user2Posts = await fetch('https://jsonplaceholder.typicode.com/posts?userId=2')
    .then(r => r.json())
  console.log('用户 2 的帖子数：', user2Posts.length)
}

exploreAPI()
```
:::

:::explain{title="餐厅类比——帮你记住 REST 的核心概念"}
把 REST API 想象成一家餐厅的运营流程：

| 餐厅场景 | REST 对应 |
|----------|-----------|
| 菜单上的菜名 | URL（`/dishes`）——资源名称 |
| 点菜 | POST —— 创建一份订单 |
| 问服务员"5 号桌有什么菜" | GET —— 查询数据 |
| 说"把这道菜换成另一道" | PUT/PATCH —— 更新订单 |
| 说"退掉这道菜" | DELETE —— 删除订单 |
| "第 3 页菜单" | 查询参数（`?page=3`） |
| 菜单本身的格式（图文排版） | JSON/XML —— 数据格式 |

你不需要知道后厨是怎么做菜的（后端实现细节），只需要按菜单点菜（调用 API），菜就会端上来（返回数据）。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="亲手体验 fetch 跨域成功和失败的区别——jsonplaceholder 开放 CORS 所以能成功，而大多数商业网站不开放所以会被拦。这个对比让你直观理解'CORS 是服务器决定的'。" expected="jsonplaceholder 请求成功返回数据；百度请求在 Console 报 CORS 错误。"}
在浏览器控制台中，分别 fetch jsonplaceholder 和另一个未开放 CORS 的网站，对比结果
```js
// 能成功的
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(r => r.json())
  .then(d => console.log('成功：', d.title))
  .catch(e => console.log('失败：', e.message))

// 大概率 CORS 错误
fetch('https://www.zhihu.com')
  .then(r => r.text())
  .then(d => console.log(d))
  .catch(e => console.log('CORS 报错：', e.message))
```
::::

::::step{purpose="RESTful URL 设计的核心直觉是'看到 URL 就知道它能干什么'。通过分析 jsonplaceholder 的 URL 结构，培养识别好 API 设计的能力。" expected="能正确回答：获取全部帖子用 /posts，获取单个帖子用 /posts/1，获取帖子的评论用 /posts/1/comments。"}
分析 jsonplaceholder 的 URL 结构——不看文档，仅通过 URL 推测每个接口的功能：
- GET /posts
- GET /posts/1
- GET /posts/1/comments
- GET /comments?postId=1
- POST /posts
- DELETE /posts/1

思考：后两个和前四个有什么不同？
::::

::::step{purpose="学会用 URLSearchParams 构建查询参数，而不是手动拼接字符串——后者遇到特殊字符会出问题。这是专业前端的基本素养。" expected="控制台输出正确的 URL，如 https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5"}
用 URLSearchParams 构建一个带查询参数的 URL，请求 userId=1 且只取 5 条的帖子
```js
const params = new URLSearchParams({ userId: 1, _limit: 5 })
const url = `https://jsonplaceholder.typicode.com/posts?${params}`
console.log('构造的 URL：', url)
// 用这个 URL 发 fetch 请求，验证返回了 5 条数据
```
::::

:::

:::hint{title="记忆口诀"}
**CORS 三句话：**
1. 浏览器不拦请求，拦的是 JS 读响应
2. CORS 是服务器在响应里加 HTTP 头，前端改不了
3. 开发时用代理，生产环境后端配 CORS

**REST 三句话：**
1. URL 里只放名词，动词用 HTTP 方法
2. CRUD → POST / GET / PUT或PATCH / DELETE
3. 查询参数用 `?key=value&key2=value2`
:::

:::recap
你学会了两个关键概念：CORS（浏览器安全机制）和 REST（API 设计规范）。CORS 的核心是服务器设置 `Access-Control-Allow-Origin` 头来允许跨域读取；简单请求直接发，复杂请求先发 OPTIONS 预检。REST 的核心是用 URL 标识资源、HTTP 方法表达操作——POST 创建、GET 读取、PUT/PATCH 更新、DELETE 删除。一个好的 RESTful URL 一看就知道怎么用。
:::
