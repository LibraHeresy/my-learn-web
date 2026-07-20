# 环境变量：同一套代码，不同环境不同行为

:::analogy
剧院里有两种灯光：工作灯（后台排练时用的白炽灯，照亮所有角落）和舞台灯（观众入场后用的聚光灯，只照亮舞台）。同一座剧院，不同场合用不同的灯。环境变量就是你的灯光控制器——开发时指向本地测试 API，上线后自动切换到生产 API。代码不用改，切换环境自动变。
:::

:::explain{title="问题：把配置写死在代码里，每次部署都要手动改"}
看这段代码——你能找到问题吗？

```js
// src/api.js — 音乐搜索的数据请求模块

// API 地址写死在代码里
const API_BASE = 'http://localhost:3000/api'

async function searchTracks(keyword) {
  const url = API_BASE + '/search?q=' + keyword
  const response = await fetch(url)
  return response.json()
}
```

这段代码在**你的电脑上**运行完美——`localhost:3000` 指向你本地启动的后端服务。

但部署到 GitHub Pages 后呢？用户访问 `https://你的用户名.github.io/music-collection/`，浏览器试图请求 `http://localhost:3000/api/search?q=...`。用户电脑上没有 `localhost:3000` 这个服务——请求失败，你的应用变成了一具空壳。

**你需要在部署前手动改成真实 API 地址：**
```js
const API_BASE = 'https://api.my-music-app.com'  // 部署前手动改掉
```

然后部署完了，想在本地继续开发——又要手动改回 `localhost:3000`。忘了改回来？本地开发也开始访问生产 API，可能不小心污染了真实数据。

**这还不止一个变量：**
- API 地址（开发 vs 生产）
- 调试模式（开发时开，生产时关——不能让用户看到 `console.log` 满天飞）
- 第三方服务的 Key（开发用测试 Key，生产用正式 Key）
- 网站标题（开发版显示"（测试中）"，生产版不显示）

如果每个变量都要在部署前手动改、部署后改回来——你的工作效率和犯错率都会失控。
:::

:::explain{title="解决方案：.env 文件 + import.meta.env"}
环境变量让你把"和环境有关的配置"从"业务逻辑代码"中分离出来。配置文件根据当前环境自动切换，代码本身不需要任何改动。

**Vite 项目中的环境变量文件：**
```
music-collection/
├── .env                      ← 所有环境都加载的公共变量
├── .env.development          ← 开发时加载（npm run dev）
├── .env.production           ← 构建时加载（npm run build）
└── .env.local                ← 本地私密变量（不提交到 Git）
```

**规则：**
- `.env` 文件中的变量必须以 `VITE_` 开头才会暴露给客户端代码（安全机制）
- 代码中通过 `import.meta.env.VITE_变量名` 读取
- `.env` 文件应该加入 `.gitignore`（防止敏感信息泄露）

**工作原理：**

```bash
# 开发时
npm run dev          → Vite 自动加载 .env.development
                     → import.meta.env.VITE_API_BASE = 'http://localhost:3000/api'

# 构建时
npm run build        → Vite 自动加载 .env.production
                     → import.meta.env.VITE_API_BASE = 'https://api.my-music-app.com'
                     → 构建产物中，API 地址直接写死为生产地址
```

**你不需要任何 `if` 判断环境**——Vite 在构建时就把环境变量的值内联到代码里了。开发时用开发值，构建时用生产值，零运行时开销。
:::

:::example{title="逐行实操：创建、配置、使用环境变量"}
以下在 `music-collection` 项目中操作。

**第一步：创建两个环境配置文件**

`.env.development`（项目根目录，和 `package.json` 同级）：
```bash
# .env.development — 开发环境配置
# 注释以 # 开头

# 变量名必须以 VITE_ 开头（Vite 的安全约定）
VITE_API_BASE=http://localhost:3000/api
VITE_APP_TITLE=音乐收藏（开发中）
VITE_ENABLE_DEBUG=true
```

逐行解读：
- `VITE_API_BASE` — API 服务器地址。开发时后端跑在本地 3000 端口
- `VITE_APP_TITLE` — 页面标题。加了"（开发中）"提醒自己这是开发环境
- `VITE_ENABLE_DEBUG` — 调试开关。开发时开启详细的 console.log

`.env.production`（项目根目录）：
```bash
# .env.production — 生产环境配置

VITE_API_BASE=https://api.my-music-app.com
VITE_APP_TITLE=音乐收藏
VITE_ENABLE_DEBUG=false
```

逐行解读：
- `VITE_API_BASE` — 生产环境的真实 API 地址
- `VITE_APP_TITLE` — 去掉"（开发中）"后缀，干净地展示给用户
- `VITE_ENABLE_DEBUG` — 生产环境关闭调试，用户控制台干干净净

**第二步：在代码中使用环境变量**

创建 `src/config.js`（集中管理所有环境配置）：
```js
// src/config.js — 所有环境相关的配置集中在这里

// import.meta.env 是 Vite 提供的全局对象，存放所有 VITE_ 开头的环境变量
export const config = {
  // 读取 .env 中定义的 VITE_API_BASE，如果没定义则使用默认值（防御性编程）
  apiBase: import.meta.env.VITE_API_BASE || 'http://localhost:3000/api',

  // 环境变量都是字符串！"true" 是字符串，不是布尔值
  // 所以需要手动转换：=== 'true'
  debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',

  // 页面标题
  appTitle: import.meta.env.VITE_APP_TITLE || '音乐收藏',

  // Vite 内置的环境变量（不需要自己定义）
  isDev: import.meta.env.DEV,       // 布尔值——当前是否是开发模式
  isProd: import.meta.env.PROD,     // 布尔值——当前是否是生产模式
  mode: import.meta.env.MODE        // 字符串——'development' 或 'production'
}
```

在 `src/App.vue` 中使用：
```vue
<script setup>
import { config } from './config.js'

// 开发环境才打印——生产环境这个 if 永远不会进入
if (config.debug) {
  console.log('当前环境：', config.mode)
  console.log('API 地址：', config.apiBase)
  console.log('应用标题：', config.appTitle)
}
</script>

<template>
  <h1>{{ config.appTitle }}</h1>
</template>
```

在 `src/api.js` 中使用（改造之前的硬编码）：
```js
// src/api.js — 数据请求模块（重构版）
import { config } from './config.js'   // 导入统一的环境配置

async function searchTracks(keyword) {
  // 不再硬编码 localhost——从配置中读取
  const url = config.apiBase + '/search?q=' + keyword
  const response = await fetch(url)
  return response.json()
}
```

**关键理解：环境变量的值在构建时就被"焊死"进代码里了**

运行 `npm run build` 后，打开 `dist/assets/index-xxxxx.js`（格式化后查看），你会看到：
```js
// 构建后的代码中，VITE_API_BASE 已经变成了字符串常量
const config = {
  apiBase: "https://api.my-music-app.com",  // ← 直接内联了生产地址
  debug: false,                               // ← 直接内联了 false
  appTitle: "音乐收藏"                         // ← 直接内联了标题
}
```

这就是环境变量的本质：**它不是"运行时读取的变量"，而是"构建时的文本替换"。** 好处是零性能开销；坏处是构建后就不能再改了。
:::

:::hint{title="环境变量最危险的 3 个错误"}
**错误 1（危险！）：在前端环境变量中存放密钥**

```bash
# 千万不要这样做！！！
VITE_API_SECRET=sk_live_abc123xyz
VITE_DATABASE_PASSWORD=mypassword
```

所有以 `VITE_` 开头的变量都会被**打包进最终的 JS 文件**。任何人打开浏览器 DevTools → Sources，搜索 `VITE_`，就能看到你的密钥。前端没有秘密——敏感密钥只能放在后端服务器上。

**错误 2：变量命名忘了 VITE_ 前缀**

```bash
# .env.development
API_BASE=http://localhost:3000/api    # 错误！没有 VITE_ 前缀
```
```js
// 代码中
console.log(import.meta.env.VITE_API_BASE)  // undefined
```

没有 `VITE_` 前缀的变量不会暴露给客户端代码。这是故意设计的安全机制——防止你不小心把敏感变量泄漏出去。

**错误 3：把 .env 文件提交到 Git**

`.env` 文件（尤其是 `.env.local`）可能包含你个人的 API Key、测试账号密码等。提交到 Git 后，所有人（包括互联网上的陌生人，如果你的仓库是公开的）都能看到。

正确做法：在 `.gitignore` 中添加 `.env.local` 和 `.env`（如果 .env 有敏感信息）。但 `.env.development` 和 `.env.production` 如果只包含非敏感的配置（如 API 地址），可以提交到 Git——团队成员需要它们。
:::

:::explain{title="现实工作连接：环境变量是部署流程的核心"}
- 典型公司的环境划分：`development`（本地开发）→ `staging`（测试环境）→ `production`（生产环境），每套环境有对应的 `.env` 文件
- CI/CD 流水线在执行 `npm run build` 之前，会从 GitHub Secrets 或环境变量存储中注入 `VITE_API_BASE` 等值——敏感值永远不会出现在代码仓库里
- Docker 容器部署时，环境变量通过 `docker run -e VITE_XXX=yyy` 传入
- 面试常考题："如何管理不同环境的配置？" 标准答案：环境变量 + `.env` 文件 + CI/CD 注入

记住一个铁律：**前端环境变量只放非敏感的配置（API 地址、标题、功能开关）。密钥、密码、Token 永远属于后端。**
:::

:::task{title="为你自己的项目配置环境变量"}
::::step{purpose=".env.development 和 .env.production 分别定义开发和生产环境的配置。同一套代码，启动时自动读取对应的配置文件。" expected="music-collection 根目录下存在 .env.development 和 .env.production 两个文件，变量以 VITE_ 开头。"}
创建环境变量文件

1. 在 `music-collection` 项目根目录（和 `package.json` 同级）创建 `.env.development`，写入：
   ```bash
   VITE_API_BASE=http://localhost:3000/api
   VITE_APP_TITLE=音乐收藏（开发中）
   VITE_ENABLE_DEBUG=true
   ```

2. 创建 `.env.production`，写入：
   ```bash
   VITE_API_BASE=https://api.my-music-app.com
   VITE_APP_TITLE=音乐收藏
   VITE_ENABLE_DEBUG=false
   ```

3. 确保 `.gitignore` 中包含 `.env.local`（如果 `.env.development` 没有敏感信息，可以提交）：
   ```
   .env.local
   .env.*.local
   ```
::::

::::step{purpose="集中管理配置是工程化的好习惯。所有环境变量在一个 config.js 中读取，其他模块从 config.js 获取——修改环境配置时只需要改一个文件。" expected="src/config.js 文件创建完毕，导出 config 对象。在 App.vue 中能打印出正确的环境信息。"}
创建统一配置文件 `src/config.js`

在 `src/` 下新建 `config.js`：
```js
// src/config.js
export const config = {
  apiBase: import.meta.env.VITE_API_BASE || 'http://localhost:3000/api',
  debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  appTitle: import.meta.env.VITE_APP_TITLE || '音乐收藏',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE
}
```

在 `src/main.js` 或 `src/App.vue` 中测试：
```js
import { config } from './config.js'
console.log('运行模式：', config.mode)
console.log('API 地址：', config.apiBase)
console.log('调试模式：', config.debug)
```
::::

::::step{purpose="开发时读取 .env.development，构建时读取 .env.production。这是环境变量的核心机制——切换环境时不需要改任何代码。" expected="npm run dev 时控制台输出'运行模式：development'；npm run preview 时控制台输出'运行模式：production'。"}
验证开发环境 vs 生产环境的变量差异

**验证开发环境：**
```bash
npm run dev
```
打开浏览器，打开控制台（F12 → Console）。应该看到：
- `运行模式：development`
- `API 地址：http://localhost:3000/api`
- `调试模式：true`

**验证生产环境：**
```bash
npm run build && npm run preview
```
打开 `npm run preview` 显示的地址（通常 `http://localhost:4173`），打开控制台：
- `运行模式：production`
- `API 地址：https://api.my-music-app.com`
- `调试模式：false`
- 注意：`console.log('调试模式：', config.debug)` 这行在开发环境输出 `true`，在生产环境输出 `false`

**进阶：条件渲染**
在 `src/App.vue` 的 `<template>` 中添加：
```html
<div v-if="config.debug" class="debug-banner">
  当前处于开发模式 — API: {{ config.apiBase }}
</div>
```
开发时看到这个横幅，构建部署后自动消失——用户从来看不到。
::::
:::

:::recap
环境变量让同一套代码在不同环境自动使用不同配置。创建 `.env.development`（开发）和 `.env.production`（生产），变量以 `VITE_` 开头。代码中通过 `import.meta.env.VITE_变量名` 读取。构建时环境变量的值被内联进代码——开发时用开发值，部署后用生产值。绝对不要把密钥放在前端环境变量中——它们会被打包进 JS 文件。
:::
