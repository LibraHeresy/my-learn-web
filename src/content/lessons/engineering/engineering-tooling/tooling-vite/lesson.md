# Vite：一键生成整个项目骨架

:::analogy
Vite 就像一个"精装修交付"的公寓。你不用从砌墙开始——一句命令，水电（开发服务器）、墙壁（项目结构）、家具（配置模板）全部到位。你只需要搬进去写代码。
:::

:::explain{title="问题：手动搭建一个前端项目有多痛苦？"}
如果没有 Vite 这样的脚手架工具，从零搭建一个 Vue 项目需要你手动完成以下所有步骤：

1. 创建文件夹结构（`src/`、`components/`、`assets/` 等）
2. 创建 `package.json` 并手动填写所有依赖
3. 安装 Vue、Vite、Vue 插件（一个一个 `npm install`）
4. 创建 `vite.config.js`（配置构建规则）
5. 创建 `index.html`（入口页面，但写法很特殊——要用 `<script type="module">`）
6. 创建 `src/main.js`（应用启动入口，要写 `createApp` 逻辑）
7. 创建 `src/App.vue`（根组件）
8. 配置开发服务器端口、热更新、路径别名等

一个有经验的前端开发者手动完成这些需要 **30-60 分钟**。一个新手可能因为某个配置写错而卡住半天。这还是"什么都还没开始写"的阶段——你连项目的第一个功能都还没写，时间全花在搭架子上。

**这不是你的问题，是整个前端行业曾经的问题。** 所以在 Vite 出现之前，有一个叫 "webpack 配置工程师" 的梗——开发者 80% 的时间在配工具，20% 的时间在写业务代码。
:::

:::explain{title="解决方案：Vite 一行命令搞定一切"}
Vite（法语"快"的意思，读作 /vi:t/，类似"维特"）是一个前端构建工具。它最强大的功能是**项目脚手架**：

```bash
npm create vite@latest my-project -- --template vue
```

这一行命令 30 秒内完成的事：
- 创建项目文件夹和完整的文件结构
- 写入配置好的 `package.json`（包含所有必要依赖）
- 写入 `vite.config.js`（已经配好 Vue 插件）
- 写入 `index.html`（模块入口配置完毕）
- 写入 `src/main.js`（Vue 应用创建逻辑写好）
- 写入 `src/App.vue`（一个带样式的示例组件）

你接下来只需要：
```bash
cd my-project       # 进入项目
npm install         # 安装依赖（首次创建后需要这一步）
npm run dev         # 启动开发服务器
```

浏览器自动打开 `http://localhost:5173`，一个可以立刻开始改代码的 Vue 项目就在眼前。
:::

:::example{title="逐行拆解：Vite 生成的每个文件是干什么的"}
用 Vite 创建项目后，你得到这个结构。下面逐文件解释每个文件的职责：

```
my-project/                        ← 项目根目录
├── index.html                     ← 入口 HTML（浏览器最先加载它）
├── package.json                   ← 项目配置 + 依赖清单
├── vite.config.js                 ← Vite 的行为配置
├── public/                        ← 不需要处理的静态文件
│   └── favicon.ico                ← 网站图标
├── src/                           ← 所有源代码都在这里
│   ├── main.js                    ← 应用启动入口（第一个执行的 JS）
│   ├── App.vue                    ← 根组件（所有子组件的容器）
│   ├── components/                ← 存放可复用组件
│   │   └── HelloWorld.vue         ← 示例组件
│   ├── assets/                    ← 需要构建处理的资源（CSS、图片）
│   │   └── vue.svg                ← Vue 的 logo
│   └── style.css                  ← 全局样式
└── node_modules/                  ← 所有依赖的安装目录
```

**每个文件的逐行解读：**

`index.html` — 入口页面：
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />       <!-- 浏览器标签页图标 -->
    <meta name="viewport"                         <!-- 移动端视口适配 -->
          content="width=device-width, initial-scale=1.0" />
    <title>my-project</title>                     <!-- 浏览器标签页标题 -->
  </head>
  <body>
    <div id="app"></div>                          <!-- Vue 会挂载到这个 div 上，接管它内部的所有内容 -->
    <script type="module" src="/src/main.js"></script>  <!-- 加载应用入口（模块方式） -->
  </body>
</html>
```

`src/main.js` — 应用启动入口：
```js
import { createApp } from 'vue'         // 从 Vue 包里拿 createApp 函数
import App from './App.vue'             // 拿根组件
import './style.css'                    // 拿全局样式（import CSS 是 Vite 的能力）

createApp(App).mount('#app')            // 创建 Vue 应用实例，挂载到 #app 那个 div 上
//       ↑                ↑
//   传入根组件      挂载目标（就是 index.html 里的 <div id="app">）
```

`src/App.vue` — 根组件（单文件组件 SFC）：
```vue
<script setup>
// <script setup> 是 Vue 3 的语法糖，写在里面的变量和函数自动暴露给模板
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- template 里写 HTML（Vue 的模板语法） -->
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <HelloWorld msg="Vite + Vue" />   <!-- 使用子组件，传 msg 属性 -->
  </div>
</template>

<style scoped>
/* scoped 表示这些样式只作用于当前组件，不影响其他组件 */
.logo {
  height: 6em;
  padding: 1.5em;
}
</style>
```

`vite.config.js` — Vite 配置：
```js
import { defineConfig } from 'vite'         // defineConfig 提供配置智能提示
import vue from '@vitejs/plugin-vue'        // Vue 插件——让 Vite 能处理 .vue 文件

export default defineConfig({
  plugins: [vue()],                         // 启用 Vue SFC 编译支持
})
```

`package.json` — 项目配置（关键字段）：
```json
{
  "scripts": {
    "dev": "vite",                  // npm run dev → 启动开发服务器
    "build": "vite build",          // npm run build → 构建生产版本
    "preview": "vite preview"       // npm run preview → 预览构建结果
  },
  "dependencies": {
    "vue": "^3.4.0"                 // 运行时依赖（用户最终会用到 Vue）
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0", // Vite 的 Vue 插件（开发时编译 .vue 文件）
    "vite": "^5.0.0"                // Vite 本身
  }
}
```
:::

:::hint{title="Vite 新手最常见的 4 个错误"}
**错误 1：`npm create vite` 之后直接 `npm run dev`，但忘了 `npm install`**

Vite 生成项目后不会自动安装依赖。必须先在项目目录里运行 `npm install`，否则终端报 "vite: command not found"。正确顺序：
```bash
npm create vite@latest my-project -- --template vue
cd my-project
npm install     # 这一步不能省！
npm run dev     # 现在可以了
```

**错误 2：终端不在项目目录里就运行 `npm run dev`**

`npm run dev` 必须在包含 `package.json` 的文件夹里运行。如果终端根目录不对，先用 `pwd` 确认位置，用 `cd` 进入项目目录。

**错误 3：把 `localhost:5173` 当成公开网址发给别人**

`localhost` 是你自己电脑上的地址，别人访问不到。想让别人看到你的网站，需要部署（后面课程会讲）。

**错误 4：改代码后页面没自动更新**

检查：文件保存了吗（`Ctrl+S`）？浏览器控制台有没有红色报错？终端里 Vite 是否还正常运行（没有报错退出）？
:::

:::explain{title="现实工作连接：Vite 是现代前端的标准起点"}
- Vite 是 Vue 官方推荐的构建工具（Vue 文档里的所有示例都用 Vite）
- Nuxt（Vue 全栈框架）、SvelteKit、Astro 等流行框架内部使用的也是 Vite
- 公司项目 99% 是用脚手架创建的，不会有人从零手动搭
- `npm create vite@latest` 是每个新项目的起点——你会在职业生涯中重复这个命令成百上千次

Vite 并不是唯一的选择。业界还有 webpack（老牌但配置复杂）、Rollup（库打包）、esbuild（极速但功能少）。但 Vite 是当前的"默认选择"——上手最快，配置最少。
:::

:::task{title="用 Vite 创建你的第一个 Vue 项目"}
::::step{purpose="npm create vite 是最常用的项目创建命令。-- --template vue 指定使用 Vue 模板。项目生成后文件夹结构完整，可以直接开始写代码。" expected="终端输出'Scaffolding project in...'，my-music-app 同级出现 music-collection 文件夹。"}
创建 Vue + Vite 项目

1. 在 VS Code 终端中，先 `cd` 到一个你想要放项目的目录（如桌面）：
   ```bash
   cd ~/Desktop
   ```
2. 运行创建命令：
   ```bash
   npm create vite@latest music-collection -- --template vue
   ```
3. 终端会提示 "Scaffolding project in..."，表示项目骨架生成完毕
4. 进入项目并安装依赖：
   ```bash
   cd music-collection
   npm install
   ```
5. 启动开发服务器：
   ```bash
   npm run dev
   ```
6. 终端显示 `http://localhost:5173`，在浏览器中打开这个地址
7. 看到 Vue 欢迎页面——你的第一个 Vite + Vue 项目跑起来了！
::::

::::step{purpose="热更新（HMR）是 Vite 最让人上瘾的特性——保存文件后浏览器几乎瞬间更新，不需要手动刷新。理解了这个你就再也回不去手动刷新页面了。" expected="修改 App.vue 的标题后，浏览器中的文字自动更新，不需要手动刷新。"}
体验热更新（HMR）

1. 保持 `npm run dev` 运行着（终端不要关）
2. 在 VS Code 中打开 `src/App.vue`
3. 在 `<template>` 里找到欢迎文字，改成：
   ```html
   <h1>我的音乐收藏</h1>
   <p>使用 Vite + Vue 构建</p>
   ```
4. 按 `Ctrl+S` 保存
5. **不要刷新浏览器**——直接看浏览器，文字已经自动更新了
6. 这就是热更新（Hot Module Replacement, HMR）：改代码 → 保存 → 浏览器自动更新
::::

::::step{purpose="理解每个文件的作用，以后遇到问题才知道从哪里排查。main.js 是入口，App.vue 是根组件，vite.config.js 是构建配置。" expected="能说出 5 个关键文件的路径和作用：index.html、src/main.js、src/App.vue、vite.config.js、package.json。"}
浏览项目结构，逐个打开关键文件

在 VS Code 文件树中依次打开以下文件，对照上面的逐行注释理解：
1. `index.html` — 找到 `<div id="app">` 和 `<script type="module" src="/src/main.js">`
2. `src/main.js` — 找到 `createApp(App).mount('#app')`，理解挂载过程
3. `src/App.vue` — 观察 `<script setup>`、`<template>`、`<style scoped>` 三段结构
4. `vite.config.js` — 看到 `plugins: [vue()]`，理解插件让 Vite 能处理 .vue 文件
5. `package.json` — 看到 `"dev": "vite"`，理解 `npm run dev` 实际执行的是 `vite`
::::
:::

:::recap
Vite 是一键生成项目骨架的构建工具。`npm create vite@latest` 创建项目，`npm install` 安装依赖，`npm run dev` 启动开发服务器。项目结构：`index.html`（入口）、`src/main.js`（应用启动）、`src/App.vue`（根组件）、`vite.config.js`（构建配置）。热更新（HMR）让你保存代码后浏览器自动刷新——前端开发的核心体验。
:::
