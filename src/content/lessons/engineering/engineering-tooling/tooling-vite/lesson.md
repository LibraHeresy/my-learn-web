# 创建第一个 Vue 项目 — Vite 登场

:::analogy
Vite 就像一个精装修交付的公寓——一条命令，给你搭好整个项目框架：文件夹、配置、开发服务器，全部就位。你不用从砌墙开始，直接搬进去写代码。
:::

:::explain{title="Vite 是什么？"}
Vite（法语"快"的意思，读作 /viːt/）是一个**前端构建工具**。它做了三件关键的事：
1. **开发服务器** — 运行 `npm run dev`，自动在浏览器打开你的页面，修改代码后页面**瞬时更新**（热更新 HMR）
2. **构建打包** — 运行 `npm run build`，把你的代码压缩优化成可以部署到服务器上的文件
3. **项目脚手架** — 运行 `npm create vite@latest`，自动生成项目文件夹结构
> 💡 "构建"这个词可能陌生。想象你把散落的食材做成一道端上桌的菜——构建就是把你的源代码变成最终产品。
:::

:::explain{title="创建项目"}
在终端中运行：
```bash
npm create vite@latest music-collection -- --template vue
```
这条命令做了什么？
- `npm create` — npm 的"创建项目"功能
- `vite@latest` — 使用最新版 Vite 脚手架
- `music-collection` — 项目名称（也是文件夹名）
- `-- --template vue` — 使用 Vue 模板
运行后：
```bash
cd music-collection   # 进入项目文件夹
npm install           # 安装依赖（Vue、Vite 等）
npm run dev           # 启动开发服务器
```
浏览器会自动打开 `http://localhost:5173`，你会看到一个 Vue 的欢迎页面！
**项目结构一览：**
```
music-collection/
├── index.html          # 入口 HTML
├── package.json        # 项目配置
├── vite.config.js      # Vite 配置
├── src/
│   ├── main.js         # 应用入口
│   ├── App.vue         # 根组件
│   ├── components/     # 放组件的地方
│   └── assets/         # 放图片、CSS 等
└── node_modules/       # 依赖包
```
:::

:::task{title="你的任务 ✨"}
1. 在终端中运行创建命令（在自己选的位置，比如桌面）：
   ```bash
   npm create vite@latest music-collection -- --template vue
   ```
2. `cd music-collection` 进入项目
3. `npm install` 安装依赖
4. `npm run dev` 启动开发服务器
5. 在浏览器中访问 `http://localhost:5173`，看到 Vue 欢迎页
6. 打开 `src/App.vue`，把 `<template>` 里的内容改成 `<h1>🎵 我的音乐收藏</h1>`，保存，看浏览器自动更新！
> 🎉 你刚刚完成了第一个工程化的 Vue 项目！不再是 CDN 引入，而是真正的 npm + Vite + Vue 项目结构。
:::

:::hint{title="常见问题"}
- **端口被占用？** Vite 会自动换一个端口（如 5174），看终端提示。
- **npm run dev 报错？** 确认你已经 `cd` 到了 `music-collection` 目录里。
- **浏览器没有自动打开？** 手动访问终端中显示的地址（通常是 `http://localhost:5173`）。
- **修改代码没反应？** 确认你保存了文件（`Ctrl+S`），或者开启自动保存。
:::

:::recap
你学会了用 Vite 一行命令创建完整的 Vue 项目——npm create vite@latest 生成项目结构，npm run dev 启动开发服务器，修改代码后页面瞬时刷新。你的项目从 CDN 引入升级为真正的工程化结构。
:::


