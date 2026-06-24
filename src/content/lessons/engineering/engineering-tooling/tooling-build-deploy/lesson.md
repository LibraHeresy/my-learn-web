# 构建与部署 — 让全世界看到你的作品

:::music-analogy
排练结束（开发完成），最后一步是：**正式演出**（部署）。你把排练时的草稿整理成精美的节目单（构建），然后打开音乐厅的大门，让观众进场（部署到服务器）。从此你的作品有了一个公开的网址，任何人都可以访问。
:::

:::explain{title="开发 vs 生产"}
在开发过程中，Vite 的开发服务器做了很多"方便你开发"的事：
- 热更新（修改代码页面自动刷新）
- 不压缩代码（方便调试）
- 源码映射（报错时能看到原始代码位置）
但当你准备发布时，需要"构建"——把代码变成**适合用户访问的最终版本**：
- 代码压缩（去掉空格、缩短变量名）
- 文件合并（减少 HTTP 请求次数）
- 去除开发调试代码
**类比：**
- 开发 = 排练时的笔记，潦草但你能看懂
- 构建 = 正式演出的节目单，印刷精美，观众能看懂
**命令：**
```bash
npm run build
```
运行后，项目根目录会多出一个 `dist/` 文件夹——里面就是最终要部署的文件。
```dist/
├── index.html        # 入口页面
├── assets/
│   ├── index-abc123.js   # 打包后的 JS
│   └── index-def456.css  # 打包后的 CSS
└── ...
```
> 💡 `dist` 是 distribution（分发）的缩写。这个文件夹的内容就是你的"产品"。
:::

:::explain{title="部署到 GitHub Pages"}
GitHub Pages 是 GitHub 提供的免费静态网站托管服务。你可以把 `dist/` 文件夹的内容部署上去，获得一个 `https://你的用户名.github.io/music-collection/` 的网址。
**最简单的部署方式：**
1. 在项目中安装 `gh-pages` 包：
```bash
npm install -D gh-pages
```
2. 在 `package.json` 中添加部署脚本：
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "deploy": "gh-pages -d dist"
  }
}
```
3. 在 `vite.config.js` 中添加 base 配置：
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  base: '/music-collection/'  // 你的仓库名
})
```
4. 构建并部署：
```bash
npm run build
npm run deploy
```
等待几分钟，访问 `https://你的用户名.github.io/music-collection/`，你的项目就上线了！🎉
:::

:::task{title="你的任务 ✨"}
1. 运行 `npm run build`，查看生成的 `dist/` 文件夹
2. 安装 `gh-pages`：`npm install -D gh-pages`
3. 在 `vite.config.js` 中添加 `base` 配置
4. 在 `package.json` 中添加 `deploy` 脚本
5. 运行 `npm run deploy`，把项目部署到 GitHub Pages
6. 访问你的网址，确认一切正常
> 🎉 恭喜！你刚刚完成了从写第一行代码到部署上线的完整流程。你把一个 Vue 项目变成了全世界都能访问的网站。
:::

:::hint{title="部署的其他选择"}
GitHub Pages 是最简单的免费方案。此外还有：
- **Vercel** — 自动从 GitHub 部署，支持自定义域名，速度更快
- **Netlify** — 类似 Vercel，也是拖拽文件夹即可部署
- **Cloudflare Pages** — 速度极快，全球 CDN 加速
对于个人项目，GitHub Pages 完全够用。当你需要更高级的功能时，这些平台的学习成本也很低。
:::

:::listen-to
柴可夫斯基《1812 序曲》— 从教堂的祈祷到战争的炮火再到胜利的钟声——最后的尾声，所有乐器（包括真炮！）一齐奏响。部署就是那最后一刻：你的项目从小小的开发服务器走向全世界。
:::

