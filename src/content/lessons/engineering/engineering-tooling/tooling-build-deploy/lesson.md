# 构建与部署 — 让全世界看到你的作品

:::analogy
开发时你用的是"工作台模式"——Vite 开发服务器像你的工作台，工具散落一地但随手可用。部署是把做好的产品从工作台搬到橱窗里——代码压缩（迷你化）、图片优化（减重）、文件合并（整理），变成最终用户可以访问的正式版本。步骤：`npm run build`（打包）→ 上传到服务器（上架）。
:::

:::explain{title="问题：为什么 `npm run dev` 打开的页面不能直接给别人用？"}
你运行 `npm run dev` 时，Vite 启动了**开发服务器**。这个服务器特意为"你写代码时"做了很多方便事：

- **热更新（HMR）** — 改一行代码，浏览器自动刷新。为此 Vite 在后台维护了一个 WebSocket 连接。
- **不压缩代码** — 你的 `console.log`、变量名 `mySuperLongVariableName` 全部原样保留。因为压缩了你就没法调试了。
- **源码映射（Source Map）** — 报错时浏览器精确告诉你"出错的代码在 `App.vue` 第 42 行"。但别人也能看到你的完整源代码。
- **按需编译** — 打开哪个页面才编译哪个文件，所以第一次打开可能卡 1-2 秒。

这套模式**只适合自己开发**。如果直接把这个开发服务器暴露给用户：
- 加载速度慢（文件没压缩，大小是生产版的 5-10 倍）
- 首次打开卡顿（按需编译）
- 你的源代码完全暴露（source map）
- 占用你电脑的资源（CPU 和内存）
- 你关掉终端，网站就没了

**生产环境需要完全不同的东西：速度快、体积小、不暴露源码、托管在服务器上 24 小时在线。**
:::

:::explain{title="解决方案：构建 (build) → 部署 (deploy) 两步走"}
**第一步：构建 (`npm run build`)**

把开发代码变成用户可以访问的生产文件：

```bash
npm run build
```

Vite 执行以下操作：
1. **压缩 JS** — 去掉所有空格和注释，变量名从 `mySuperLongVariableName` 缩短为 `a`，文件从 200KB 变成 30KB
2. **压缩 CSS** — 去掉多余空格和注释
3. **Tree-shaking**（摇树优化）— 删除你 import 了但从未使用的代码。你 `npm install` 了一个 500KB 的库但只用了其中 1 个函数？构建后只保留那 1 个函数
4. **代码分割** — 把代码拆成多个小块，用户访问首页时只加载首页需要的代码，打开播放器页面时再加载播放器相关的代码
5. **哈希文件名** — 生成 `index-a1b2c3d.js` 这种带随机字符串的文件名。文件内容变了，文件名就变——浏览器知道该重新下载，而不是用旧的缓存

构建结果全部输出到 `dist/` 文件夹（dist = distribution，分发）。

**第二步：部署 (`npm run deploy`)**

把 `dist/` 文件夹上传到服务器。最简单的免费方案：GitHub Pages。
:::

:::example{title="逐行实操：从构建到上线，全程详解"}
以下在 `music-collection` 项目中操作。

**第一步：配置 vite.config.js 的 base 路径**

打开 `vite.config.js`，添加 `base` 配置：

```js
import { defineConfig } from 'vite'       // 导入 Vite 的配置助手函数
import vue from '@vitejs/plugin-vue'      // 导入 Vue 插件

export default defineConfig({
  plugins: [vue()],                       // 启用 Vue SFC 编译
  base: '/music-collection/'              // 部署的基础路径（GitHub Pages 的仓库名）
  //     ↑ 注意：前后都有斜杠！
})
```

`base` 为什么重要？
- 部署到 `https://你的用户名.github.io/music-collection/`，路径不是根 `/`，而是 `/music-collection/`
- 如果 `base` 设置错误，页面的 CSS、JS、图片路径全都会 404
- 这条配置告诉 Vite："构建时，所有资源路径前面都加上 `/music-collection/`"

**第二步：运行构建命令**

```bash
npm run build
```

逐部分拆解：
- `npm run` — npm 的"运行脚本"功能
- `build` — 对应 `package.json` 中 `"build": "vite build"` 这个脚本

输出类似：
```
vite v5.x.x building for production...
✓ 42 modules transformed.
dist/index.html                   0.45 kB │ gzip: 0.30 kB
dist/assets/index-a1b2c3d.css    1.23 kB │ gzip: 0.56 kB
dist/assets/index-d4e5f6g.js    52.18 kB │ gzip: 18.74 kB
✓ built in 2.3s
```

解读输出：
- `42 modules transformed` — Vite 处理了 42 个模块（你写的代码 + Vue 等依赖）
- 每个文件两列数字：原始大小 | gzip 压缩后的大小（服务器实际传输的大小）
- `index-d4e5f6g.js` 52KB 原始 → 压缩后仅 19KB——用户下载的实际体积
- `built in 2.3s` — 整个构建只用了 2.3 秒

构建完成后，查看 `dist/` 文件夹的结构：
```
dist/
├── index.html              ← 入口页面（和源码里的 index.html 不同——已注入压缩后的 JS/CSS）
├── assets/
│   ├── index-a1b2c3d.css   ← 压缩后的 CSS（所有样式合并为一个文件）
│   └── index-d4e5f6g.js    ← 压缩后的 JS（所有逻辑合并、压缩、摇树优化）
└── favicon.ico             ← 图标原样保留
```

**第三步：安装 gh-pages 并配置部署脚本**

```bash
npm install -D gh-pages
```
- `gh-pages` — 一个 npm 包，一键把 `dist/` 文件夹发布到 GitHub Pages

在 `package.json` 的 `"scripts"` 中添加：
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "gh-pages -d dist"
}
```
- `"deploy"` — 脚本名，你想叫什么都可以
- `"gh-pages -d dist"` — 运行 gh-pages 命令，`-d dist` 指定要部署的文件夹
- 以后只需要运行 `npm run deploy`

**第四步：构建并部署**

```bash
npm run build && npm run deploy
```
或者分两步：
```bash
npm run build       # 先构建
npm run deploy      # 再部署
```

`gh-pages` 会自动：
1. 创建一个 `gh-pages` 分支
2. 把 `dist/` 的内容推送到这个分支
3. GitHub 检测到 `gh-pages` 分支更新，自动部署

**第五步：设置 GitHub Pages 源**

在 GitHub 仓库页面：
1. 点击 `Settings`
2. 左侧菜单找到 `Pages`
3. `Branch` 选择 `gh-pages`，点击 `Save`
4. 等待 1-2 分钟，页面顶部会显示你的网址：`https://你的用户名.github.io/music-collection/`

访问这个网址——你的项目上线了！全世界都能访问。
:::

:::hint{title="构建部署最常见的 3 个错误"}
**错误 1：部署后页面空白，控制台全是 404**

原因：`vite.config.js` 中的 `base` 配置错误。

症状：浏览器加载 `index.html` 成功，但 CSS 和 JS 文件 404——路径不对。

解决：
```js
// 如果部署到 https://用户名.github.io/music-collection/
base: '/music-collection/'   // 正确（前后斜杠）

// 常见错误写法：
base: 'music-collection'     // 错误：缺少斜杠
base: './'                   // 错误：相对路径在 GitHub Pages 上行为不确定
```

**错误 2：构建报错，但 `npm run dev` 一切正常**

开发服务器宽松（容忍小错误），构建过程严格（所有检查都会执行）。构建报错时仔细看终端输出的错误信息——TypeScript 类型错误、未使用的导入等都会被构建拦截。

**错误 3：`npm run deploy` 后 GitHub Pages 没有更新**

- 检查仓库 Settings → Pages → Branch 是否选中 `gh-pages`
- 等 1-5 分钟——GitHub Pages 部署不是即时的
- 在仓库首页点击 `Environments` → `github-pages` 查看部署进度
- 如果有绿 ✓ = 部署成功，红 ✗ = 部署失败（点击查看日志）
:::

:::explain{title="现实工作连接：CI/CD 自动化流水线"}
在公司项目中，你不会手动执行 `npm run build && npm run deploy`。而是使用 CI/CD（持续集成/持续部署）自动化：

```
你 push 代码到 GitHub
        ↓
GitHub Actions 自动触发
        ↓
npm install（安装依赖）
        ↓
npm run build（构建生产版本）
        ↓
npm run test（运行测试）
        ↓
部署到服务器（自动上传 dist/）
```

这个流程在你 `git push` 的一瞬间全自动完成。你不需要手动部署任何东西——但你必须理解 `build` 做了什么，因为当 CI/CD 流水线失败时，你需要看日志排查问题。

**你学到的是基本功。自动化只是把基本功串起来。**
:::

:::task{title="构建并部署你的项目到 GitHub Pages"}
::::step{purpose="构建是把开发代码变成生产版本的过程。你看到 dist/ 文件夹后，就能直观理解'用户实际下载的是什么'。" expected="终端显示构建成功，项目根目录出现 dist/ 文件夹，内含 index.html 和 assets/。"}
运行第一次构建

1. 在 VS Code 终端中，确保在 `music-collection` 目录：
   ```bash
   cd music-collection
   npm run build
   ```
2. 观察终端输出：摸块数量、文件大小、构建时间
3. 在 VS Code 文件树中展开 `dist/` 文件夹，逐个查看文件：
   - `dist/index.html` — 对比 `index.html`（源码），看 `<script>` 标签引用的路径有何不同
   - `dist/assets/index-xxxxx.js` — 打开后看到压缩格式（所有代码挤在一起）
4. 在本地预览构建结果：
   ```bash
   npm run preview
   ```
   这会启动一个本地服务器，加载 `dist/` 的内容。访问终端显示的地址（通常 `http://localhost:4173`），确认页面正常显示。
::::

::::step{purpose="gh-pages 包帮你自动化了创建分支、推送、配置 GitHub Pages 的繁琐步骤。一条命令完成所有部署操作。" expected="npm install 成功，package.json 的 scripts 中有 deploy 命令。"}
安装 gh-pages 并配置部署脚本

```bash
npm install -D gh-pages
```

打开 `package.json`，在 `"scripts"` 中添加：
```json
"deploy": "gh-pages -d dist"
```

确认 `vite.config.js` 中有 `base` 配置：
```js
export default defineConfig({
  plugins: [vue()],
  base: '/music-collection/'
})
```
::::

::::step{purpose="在一个浏览器标签页中看到你自己的项目在互联网上运行——这是前端开发中最有成就感的时刻之一。从此你可以把这个 URL 分享给任何人。" expected="在浏览器中访问 GitHub Pages URL，能看到音乐收藏页面正常显示。"}
构建并部署到 GitHub Pages

```bash
npm run build && npm run deploy
```

部署完成后：
1. 打开 GitHub 仓库页面
2. 点击 `Settings` → 左侧 `Pages`
3. 确认 `Branch` 选择的是 `gh-pages`，点 `Save`
4. 等待 1-2 分钟，刷新页面
5. 页面顶部出现 "Your site is live at https://你的用户名.github.io/music-collection/"
6. 点击链接——你的项目在互联网上运行了！
7. 把这个 URL 发给朋友或家人——他们也能看到你的作品
::::
:::

:::recap
`npm run build` 把开发代码构建为生产版本：压缩、摇树优化、哈希文件名，输出到 `dist/` 文件夹。`gh-pages -d dist` 把 `dist/` 部署到 GitHub Pages，得到公开网址。`vite.config.js` 的 `base` 配置决定了资源路径，设错会导致 404。CI/CD 自动化了这个流程，但你必须先理解手动构建部署的每一步。
:::
