# 包管理器 — 你的代码应用商店

:::analogy
npm 就是代码界的应用商店。你需要日期格式化？应用商店搜"日期"，安装。需要图表？搜"图表"，安装。全球 200 万开发者把自己写好的功能打包上传，你一句 `npm install` 就能用到。不再从零造轮子，你站在 200 万人的肩膀上写代码。
:::

:::explain{title="问题：什么都要自己写，效率在哪？"}
假设你的音乐应用需要以下功能：
- 格式化日期（"2024-01-15" → "2024年1月15日"）
- 处理相对时间（"3分钟前"、"昨天"）
- 生成唯一 ID（给每条数据一个不会重复的 ID）
- 防抖函数（用户快速输入时不发 10 次请求）
- HTTP 请求（不用裸 `fetch`，需要自动处理超时和重试）

如果你从零写这些功能，每个都要几十到几百行代码，测试、修 bug、维护——你的音乐应用还没开始写，辅助代码就占了一半时间。

**问题不是"你能不能写出来"，而是"你的时间花得值不值"。** 这些功能全球无数人写过，每一个都经过了成千上万次测试和迭代。你为什么要重写一遍？
:::

:::explain{title="解决方案：npm 的三件事"}
npm（Node Package Manager，Node 包管理器）随 Node.js 自动安装。它做三件事：

**1. 下载别人的代码**
```bash
npm install dayjs
```
一行命令，`dayjs`（一个 2KB 的日期库）就下载到你的项目里了。之后在你的代码里 `import dayjs from 'dayjs'` 就能用。

**2. 记录你用了哪些包**
所有安装的包都记录在 `package.json` 文件里。别人拿到你的项目，看到 `package.json` 就知道需要哪些依赖，跑一句 `npm install` 全自动安装。

**3. 运行项目脚本**
```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run test     # 运行测试
```
这些"脚本"本质是终端命令的快捷方式，定义在 `package.json` 的 `scripts` 字段里。
:::

:::example{title="从零开始：逐行理解 npm init 和 npm install"}
在终端中操作，跟着逐行理解：

```bash
mkdir npm-demo && cd npm-demo
```
创建并进入一个临时练习文件夹。

```bash
npm init -y
```
这行命令做了什么？逐部分拆解：
- `npm` — 调用 npm 程序
- `init` — 初始化（initialize）一个新项目
- `-y` — yes 的缩写，对所有问题回答"是"。不用 `-y` 的话，npm 会问你项目名、版本、描述等一堆问题——现在先用默认值。

这条命令生成的文件 `package.json`：
```json
{
  "name": "npm-demo",          // 项目名称（取自文件夹名）
  "version": "1.0.0",          // 版本号（语义化版本：主版本.次版本.修订号）
  "description": "",            // 项目描述（空，可以自己填）
  "main": "index.js",           // 入口文件（Node.js 旧习惯，前端项目可以不关心）
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    // scripts 是你可以用 npm run xxx 执行的命令
  },
  "keywords": [],               // 关键词（发布到 npm 时用于搜索）
  "author": "",                 // 作者名
  "license": "ISC"              // 开源许可证类型
}
```

接下来安装一个包试试：

```bash
npm install dayjs
```
输出类似：
```
added 1 package, and audited 2 packages in 1s
```

现在看 `package.json` 多了什么：
```json
"dependencies": {
  "dayjs": "^1.11.0"    // ^ 表示"兼容 1.11.0 及以上的 1.x.x 版本"
}
```

同时项目里多了一个 `node_modules/` 文件夹，里面是 `dayjs` 的源代码。运行 `ls node_modules` 能看到 `dayjs` 文件夹。

试试用刚才装的 dayjs：
```bash
node -e "const dayjs = require('dayjs'); console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))"
```
输出当前时间，如 `2024-07-20 14:30:00`。你刚刚用别人写好的代码，一行 format 就完成了日期格式化。
:::

:::explain{title="dependencies vs devDependencies：吃菜的人和厨师的工具"}
npm 把依赖分成两类，这是初学者最容易困惑的概念：

| 类型 | 字段 | 给谁用的 | 举例 |
|------|------|----------|------|
| **dependencies** | `"dependencies"` | 项目**运行时**需要的包 | Vue、dayjs、axios（代码里 import 的） |
| **devDependencies** | `"devDependencies"` | **只在开发时**需要的包 | Vite、ESLint、Prettier（构建和检查用的） |

类比：你做菜需要食材（dependencies，用户最终会吃到），也需要锅和菜刀（devDependencies，厨房工具，用户不需要知道）。

安装时指定类型：
```bash
npm install dayjs           # 默认装到 dependencies
npm install -D vite         # -D 表示装到 devDependencies（-D 是 --save-dev 的缩写）
npm install -g npm-check    # -g 表示全局安装（不推荐，除非必要）
```

**为什么需要区分？** 当你运行 `npm run build` 构建生产版本时，`devDependencies` 里的包不会被包含进最终产物——减少用户下载的文件大小。
:::

:::hint{title="npm 新手最常踩的 3 个坑"}
**坑 1：把 node_modules 上传到 Git**

`node_modules` 文件夹通常会膨胀到 200-500 MB（一个包依赖另一个包，层层嵌套）。**永远不要把 node_modules 提交到 Git。** 正确做法：
1. 创建 `.gitignore` 文件，写入一行 `node_modules/`
2. 别人拿到你的项目后，运行 `npm install`，npm 会根据 `package.json` 自动下载所有依赖

**坑 2：npm install 报错"EACCES"或权限不足**

Mac/Linux 上如果用 `sudo npm install` 会导致后续权限问题。解决方案：不要用 `sudo`。如果已经出了问题，搜索"npm fix permissions"重置权限。

**坑 3：package.json 和 package-lock.json 傻傻分不清**
- `package.json` — 你手动编写的"依赖清单"（"我需要 dayjs，大概 ^1.11.0"）
- `package-lock.json` — npm 自动生成的"精确锁定文件"（"dayjs 的具体版本是 1.11.13，它的依赖 A 是 1.3.2..."）
- 两个文件都要提交到 Git。`package-lock.json` 确保团队所有人安装的依赖版本完全一致。
:::

:::explain{title="现实工作连接：一个真实项目的依赖数量"}
```
$ npm install
added 847 packages in 45s
```
是的，一个用 Vite + Vue 创建的空项目，安装后 `node_modules` 里有 800+ 个包。这是因为每个包都有自己的依赖（依赖的依赖的依赖……）。你不用理解这 800 个包都是什么——你只需要理解：npm 帮你管理了所有这些，你一句 `npm install` 它们就全部就位。

在公司里，新人入职第一天的标准操作就是：
```bash
git clone https://github.com/公司/项目.git
cd 项目
npm install     # 自动装上所有依赖
npm run dev     # 项目跑起来
```
三行命令，整个项目环境搭建完毕。这就是 `package.json` + npm 的力量。
:::

:::task{title="在你自己的项目里完成第一次 npm 操作"}
::::step{purpose="npm init -y 是每个项目的起点。package.json 是你项目的'身份证'——记录了项目名、依赖、脚本，一切后续工具都依赖它。" expected="my-music-app 目录下生成了 package.json 文件，内容可以在 VS Code 中打开查看。"}
初始化 package.json

1. 在 VS Code 终端中，确保你在 `my-music-app` 目录下（`pwd` 确认）
2. 运行：
   ```bash
   npm init -y
   ```
3. 终端输出 "Wrote to .../package.json" 表示成功
4. 在 VS Code 文件树中点击 `package.json`，查看内容
5. 把 `"description"` 改成 `"我的音乐收藏应用"`
6. 保存文件（`Ctrl+S`）
::::

::::step{purpose="npm install 的实际效果：下载代码到 node_modules/，在 package.json 中记录包名和版本。这是你以后每天都会做的操作。" expected="package.json 中 dependencies 字段出现 dayjs，node_modules 文件夹出现，import 后能成功调用 dayjs().format()。"}
安装第一个依赖包

1. 在终端中运行：
   ```bash
   npm install dayjs
   ```
2. 观察终端输出：`added 1 package`
3. 查看 `package.json`，现在有了 `"dependencies": { "dayjs": "^1.11.x" }`
4. 查看项目文件夹，多了一个 `node_modules/` 文件夹
5. 在 `src/js/utils/helpers.js` 中添加：
   ```js
   import dayjs from 'dayjs'

   export function getCurrentTime() {
     return dayjs().format('YYYY-MM-DD HH:mm:ss')
   }
   ```
6. 保存文件
::::

::::step{purpose="区分两类依赖是理解工程化的关键。dependencies 跟着产品走，devDependencies 只在你的电脑上用。" expected="package.json 中 dependencies 有 dayjs，devDependencies 有 prettier。"}
安装一个开发依赖

```bash
npm install -D prettier
```
- `-D` 是 `--save-dev` 的缩写
- 查看 `package.json`，`prettier` 出现在 `devDependencies` 里，而不是 `dependencies`
- Prettier 是代码格式化工具——用户不需要它，只有开发者需要
::::

::::step{purpose=".gitignore 是版本管理的第一道防线。node_modules 体积巨大且可自动生成，上传它只会污染仓库。" expected="项目根目录下存在 .gitignore 文件，内容包含 node_modules/。"}
创建 .gitignore 排除 node_modules

在项目根目录 `my-music-app/` 下新建文件 `.gitignore`（注意文件名以点开头），写入：

```
node_modules/
dist/
.DS_Store
```

- `node_modules/` — 依赖文件夹，别人用 `npm install` 可自动生成
- `dist/` — 构建输出文件夹（后面课程会用到）
- `.DS_Store` — Mac 系统自动生成的隐藏文件，和项目无关
::::
:::

:::recap
npm 是代码界的应用商店。`npm init -y` 创建 `package.json`（项目身份证）。`npm install 包名` 下载包到 `node_modules/`，在 `package.json` 中记录依赖。`-D` 表示开发依赖（只在开发时用）。`package.json` + `package-lock.json` 提交到 Git 后，任何人一句 `npm install` 就能原地重建你的项目环境。
:::
