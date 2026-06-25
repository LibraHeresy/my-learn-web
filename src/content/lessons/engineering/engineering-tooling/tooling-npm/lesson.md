# 包管理器 — 你的"乐谱图书馆"

:::music-analogy
作曲家不需要从零发明每一个和弦——他们在已有的音乐体系上创作。**npm 就是编程世界的音乐图书馆**：全球开发者共享了超过 200 万个"包"，你只需要 `npm install`，就能把别人写好的功能直接拿来用。
:::

:::explain{title="npm 做了什么？"}
npm（Node Package Manager）是 Node.js 自带的包管理器。它做三件事：
1. **下载别人的代码** — `npm install 包名`
2. **管理依赖关系** — 记录你的项目用了哪些包（`package.json`）
3. **运行脚本** — `npm run 脚本名`
**npm 和 pip/brew 类比：**
- 如果你学过 Python：npm = pip
- 如果你用 Mac：npm = Homebrew
- 如果你用手机：npm = 应用商店
> 💡 每次你 `npm install` 一个包，代码被下载到 `node_modules/` 文件夹。这个文件夹通常很大——所以一般不上传到 Git。
:::

:::explain{title="package.json — 项目的\"身份证\""}
每个前端项目都有一个 `package.json` 文件，它记录了：
```json
{
  "name": "my-music-app",
  "version": "1.0.0",
  "description": "我的音乐收藏应用",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```
- **name** — 项目名称
- **scripts** — 你可以运行的命令（`npm run dev` 就是运行这里定义的 `dev` 脚本）
- **dependencies** — 项目运行需要的包（用户最终也会用到）
- **devDependencies** — 只在开发时需要用的包（如 Vite、测试工具）
创建 `package.json` 的命令：
```bash
npm init -y
```
`-y` 表示跳过所有问题，使用默认值。
:::

:::task{title="你的任务 ✨"}
1. 在 VS Code 终端中，确保你在 `my-music-app` 目录下（`pwd` 确认）
2. 运行 `npm init -y`，你会看到生成了 `package.json`
3. 打开 `package.json` 看看里面的内容
4. 试试安装一个包：`npm install dayjs`（dayjs 是一个日期处理库，很小的包）
5. 观察变化：`package.json` 多了一个 `dependencies` 字段，还生成了 `node_modules` 文件夹
> 你刚刚完成了人生中第一次 `npm install`！以后你会做很多很多次。
:::

:::hint{title="node_modules 很重"}
`node_modules` 文件夹可能会变得非常大（几百 MB）。**永远不要把它上传到 GitHub 或发给别人**——别人拿到你的 `package.json` 之后，只需要运行 `npm install`，就能自动下载所有依赖。
就像你只需要告诉乐团"贝多芬第五交响曲"，不需要给每个人抄一份总谱。
:::

:::recap
你学会了用 npm 管理项目依赖——npm init -y 创建 package.json，npm install 下载别人写好的包。项目的依赖记录在 package.json 里，别人拿到后只需 npm install 就能自动安装一切。
:::

:::listen-to
莫扎特《安魂曲》K.626 — 莫扎特在这部作品中引用了亨德尔、海顿等前辈的音乐元素。好的作曲家善于"复用"前人的精华。npm 让你站在全球开发者的肩膀上——不需要重新发明轮子。
:::

