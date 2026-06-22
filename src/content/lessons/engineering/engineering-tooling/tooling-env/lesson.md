# 环境变量 — 给不同的舞台不同的配置

::music-analogy
同一首曲子，在排练室演奏和在金色大厅演奏，需要的配置不同——排练室用小型 PA 系统，音乐厅有专业的声学设计和混音台。开发环境和生产环境也是两个不同的舞台：开发时 API 指向本地服务器，上线后指向真实 API。环境变量让你在每个舞台上自动切换正确的配置，不需要手动改代码。
::

::explain{title="为什么需要环境变量？"}
在真实项目中，你经常会遇到不同环境用不同值的场景：
| 场景 | 开发环境 | 生产环境 |
|------|----------|----------|
| API 地址 | http://localhost:3000/api | https://api.myapp.com |
| 调试模式 | 开启（显示 log、调试面板） | 关闭 |
| 分析工具 | 禁用 | 启用 |
如果没有环境变量，你需要**每次部署前手动改代码**——繁琐且容易出错。环境变量让这些值外置到配置文件中，根据运行环境自动切换。
::

::explain{title=".env 文件 — 你的后台配置单"}
Vite 项目默认支持 .env 文件（通过 dotenv）：
```bash
# .env.development  — 开发时自动加载
VITE_API_BASE=http://localhost:3000/api
VITE_DEBUG=true
VITE_APP_TITLE=音乐收藏（开发版）
# .env.production  — 构建时自动加载
VITE_API_BASE=https://api.myapp.com
VITE_DEBUG=false
VITE_APP_TITLE=音乐收藏
```
**命名规则：** 只有以 VITE_ 开头的变量才会暴露给客户端代码。这是 Vite 的安全措施——防止意外的敏感信息泄露。
**注意：** .env 文件**不应该提交到 Git**（把 .env 加入 .gitignore）。敏感信息如 API 密钥永远不要放在前端环境变量中——它们会被打包进 JS 文件，任何人都能看到。
::

::explain{title="在代码中使用环境变量"}
在 Vue 组件或 JS 文件中通过 import.meta.env 访问：
```js
// 在任何 .vue 或 .js 文件中
const API_BASE = import.meta.env.VITE_API_BASE
const isDebug = import.meta.env.VITE_DEBUG === 'true'
// 使用
async function searchMusic(keyword) {
  const res = await fetch(
    import.meta.env.VITE_API_BASE + '/search?q=' + keyword
  )
  return res.json()
}
// 条件逻辑
if (import.meta.env.DEV) {
  console.log('当前是开发环境')
}
if (import.meta.env.PROD) {
  // 生产环境特有的逻辑
}
```
**Vite 内置的环境变量：**
- import.meta.env.MODE — 当前模式（development / production）
- import.meta.env.DEV — 是否开发模式（boolean）
- import.meta.env.PROD — 是否生产模式（boolean）
- import.meta.env.BASE_URL — 部署的基础路径（来自 vite.config.js 的 base）
> 🎭 环境变量就像演出前的后台配置——灯光师根据场地调试灯光，音响师根据厅堂调 EQ。开发和生产是两种完全不同的演出，需要不同的配置。
::

::example{title="看例子"}
以下是一个使用环境变量的实际例子：
```js
// src/config.js — 集中管理所有环境配置
export const config = {
  apiBase: import.meta.env.VITE_API_BASE || 'http://localhost:3000/api',
  debug: import.meta.env.VITE_DEBUG === 'true',
  appTitle: import.meta.env.VITE_APP_TITLE || '音乐收藏',
  enableAnalytics: import.meta.env.PROD  // 只在生产环境开启统计
}
// 在组件中使用
import { config } from './config.js'
console.log('当前环境：', import.meta.env.MODE)
console.log('API 地址：', config.apiBase)
console.log('调试模式：', config.debug ? '开启' : '关闭')
```
开发时运行 npm run dev，自动读取 .env.development。
构建时运行 npm run build，自动读取 .env.production。
::

::task{title="动手试试 ✨"}
在你的 music-collection-vue 项目中：
1. 创建 .env.development 和 .env.production 文件
2. 在两个文件中定义不同的 VITE_API_BASE 和 VITE_APP_TITLE
3. 在项目中用 import.meta.env 读取这些变量，并在页面标题或 console.log 中显示
4. 分别运行 npm run dev 和 npm run build && npm run preview，观察变量值的变化
5. 确认 .gitignore 中包含 .env（避免提交到 Git）
6. 挑战：在 vite.config.js 中用 define 选项定义自定义的全局常量
[[html]]<details class=challenge-answer><summary>💡 查看答案</summary><div class=answer-content><p>在 <code>vite.config.js</code> 中添加 <code>define</code> 配置：</p><pre><code>import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [vue()],
  define: {
    __APP_VERSION__: JSON.stringify("1.0.0"),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __AUTHOR__: JSON.stringify("你的名字"),
  },
});</code></pre><p>在代码中直接使用：<code>console.log("版本：", __APP_VERSION__);</code></p><p><code>define</code> 在编译时替换，适合版本号等固定值；<code>import.meta.env.VITE_*</code> 运行时读取，适合环境相关值。</p></div></details>[[/html]]
::

::listen-to
马勒《第八交响曲》千人交响曲 — 这部作品需要极大规模的编制，每次演出前必须根据演出场地的声学特性（就像环境变量）调整乐队的摆位和动态平衡。同一个总谱，不同的场地需要不同的配置。
::

