# 用命令行操控电脑

:::analogy
终端就像语音助手——你说"打开客厅的灯"，它帮你开了。你不需要走到开关前，不需要在一堆菜单里翻找。终端也是这样：敲 `cd my-project`，比在文件资源管理器里双击 5 层文件夹快得多。几个字母，一步到位。
:::

:::explain{title="问题：为什么不能只用鼠标？"}
你可能会想：我在 Windows 文件管理器里创建文件夹、复制文件，用鼠标点点不就行了？为什么要学命令行？

因为前端工程化的**所有工具都是命令行程序**。没有人给它们做图形界面。你接下来要用的每一条命令，都只能在终端里敲：

```bash
npm create vite@latest    # 创建项目——没有"新建Vite项目"按钮
npm install                # 安装依赖——没有"下载依赖"进度条窗口
npm run dev                # 启动开发服务器——没有"运行"图标
git add . && git commit    # 保存版本——没有"另存为版本"对话框
```

这不是微软或苹果的错——命令行是工程师之间最通用的"通用语言"。你学会 6 个命令，就能在任何系统（Windows、Mac、Linux、服务器）上自如操作。这些命令 40 年来几乎没有变过——一次学会，终身使用。
:::

:::explain{title="解决方案：6 个必学命令"}
这 6 个命令覆盖了你日常 90% 的终端操作。每个命令都有且只有一个职责：

| 命令 | 全称 | 作用 | 类比 |
|------|------|------|------|
| `pwd` | Print Working Directory | 显示"我现在在哪个文件夹" | GPS 定位 |
| `ls` | List | 列出当前文件夹里有什么 | 打开抽屉看一眼 |
| `cd` | Change Directory | 进入或退出某个文件夹 | 走进/走出一个房间 |
| `mkdir` | Make Directory | 创建新文件夹 | 在抽屉里加一个隔板 |
| `touch` / `echo` | (创建文件) | 创建空文件 | 放一张白纸进抽屉 |
| `code .` | (VS Code 命令) | 用 VS Code 打开当前文件夹 | "把这间房交给 VS Code" |

Windows 注意：`ls` 在 CMD 中要换成 `dir`，但 VS Code 终端默认是 PowerShell，PowerShell 支持 `ls`。建议全程使用 VS Code 内置终端——它默认就是 PowerShell，这些命令都能用。
:::

:::example{title="逐行演示：从桌面走到项目文件夹"}
打开 VS Code 终端（`Ctrl+``），逐行输入以下命令，理解每一步在做什么：

```bash
pwd
```
输出类似 `/c/Users/你的名字`。这告诉你：你现在站在用户主目录。`pwd` 不会改变任何东西，只是告诉你"你在哪"——迷茫时敲这个。

```bash
ls
```
列出当前文件夹里的所有文件和子文件夹。你可能会看到 `Desktop`、`Documents`、`Downloads` 等。这是你电脑上的"顶层抽屉"。

```bash
cd Desktop
```
进入 Desktop（桌面）文件夹。没有输出就是好消息——终端只在出错时才说话。

```bash
pwd
```
确认现在位置变成了 `/c/Users/你的名字/Desktop`。你已经在桌面上了。

```bash
ls
```
看看桌面上有什么文件和文件夹。应该能看到你的 `my-music-app` 文件夹。

```bash
cd my-music-app
```
进入你的项目文件夹。

```bash
ls
```
确认能看到 `src/` 和 `readme.md`。你的终端现在"站在"项目根目录里。

```bash
mkdir components
```
在项目根目录下创建一个名为 `components` 的新文件夹。

```bash
cd components
```
进入 components 文件夹。

```bash
echo "" > Button.js
```
创建一个空的 `Button.js` 文件。（Windows CMD 用户：`type nul > Button.js`）

```bash
cd ..
```
回到上一级目录（`..` 表示"父目录"）。

```bash
code .
```
用 VS Code 打开当前文件夹（`.` 表示"当前目录"）。如果 VS Code 已经开着，这个命令会让它聚焦到当前文件夹。
:::

:::hint{title="新手最常犯的 4 个错误"}
**错误 1：在错误的目录里运行命令**

你敲了 `npm run dev`，终端报错"找不到 package.json"。为什么？因为你忘了先 `cd` 到项目文件夹。出发前先 `pwd`——像开车前看导航定位。

**错误 2：路径里有空格但没用引号**

```bash
cd my music app        # 错误：终端理解为 cd my，然后看不懂 music
cd "my music app"      # 正确：引号告诉终端"这是一个整体"
cd my\ music\ app      # 也行：反斜杠转义空格（Mac/Linux）
```
**这就是为什么项目文件夹建议用连字符命名（my-music-app）而不是空格（my music app）。**

**错误 3：终端很安静，以为卡住了**

大多数命令成功时不输出任何东西。`cd Desktop` 执行后终端只是换了一行空白等你输下一条命令——这不代表卡住了，而是代表"已处理完毕，请指示下一步"。`pwd` 看看位置变了没。

**错误 4：Tab 键自动补全没用起来**

输入前几个字母，按 Tab，终端自动补全。比如当前目录只有一个以 `my-` 开头的文件夹，你输入 `cd my` 再按 Tab，自动变成 `cd my-music-app`。这比手打全名快 3 倍，还不会拼错。
:::

:::explain{title="现实工作连接：终端是每个开发者的'第二桌面'"}
- 每天早上打开电脑后的标准操作：打开 VS Code → `Ctrl+`` 打开终端 → `cd project-folder` → `npm run dev`
- 服务器没有图形界面——你连上远程服务器后，只有一个黑窗口和一个闪烁的光标。除了敲命令，你什么都做不了。
- 自动化脚本（比如部署脚本、测试脚本）本质就是一连串终端命令。
- 团队文档里的操作说明几乎永远是命令行格式——因为它不依赖操作系统和 UI 版本。

你不需要成为命令行高手，但你需要能在终端里完成"走到项目 → 安装依赖 → 启动开发服务器"这个日常循环。6 个命令就够了。
:::

:::task{title="在终端中管理你的项目文件"}
::::step{purpose="cd 和 pwd 是最基础也最重要的两个命令——进入项目和使用工具前，必须先'站在'正确的目录里。" expected="pwd 输出以 my-music-app 结尾，ls 显示 src 和 readme.md（或更多文件）。"}
导航到你的项目文件夹

1. 在 VS Code 中按 `Ctrl+`` 打开终端
2. 输入 `pwd`，看看自己现在在哪
3. 如果你不在 `my-music-app` 中，用 `cd` 走到它：
   ```bash
   cd Desktop/my-music-app
   ```
   （如果项目放在其他位置，用对应的路径）
4. 输入 `pwd`，确认路径以 `my-music-app` 结尾
5. 输入 `ls`，查看项目里有什么文件
::::

::::step{purpose="用终端创建文件和文件夹，而不是鼠标右键→新建。这不是为了耍酷——以后你会在终端里一口气创建嵌套目录结构，比鼠标快得多。" expected="ls 输出中能看到 assets/css 目录结构，且 css 文件夹内有一个空文件 style.css。"}
用终端创建项目目录结构

在 `my-music-app` 目录下，逐行执行：

```bash
mkdir -p assets/css
```
创建 `assets` 文件夹，并在里面创建 `css` 子文件夹（`-p` 表示"如果父文件夹不存在，先创建它"）。

```bash
mkdir -p assets/js
```
同样方式创建 `assets/js`。

```bash
echo "" > assets/css/style.css
```
在 `assets/css/` 里创建一个空的 CSS 文件。（Windows CMD：`type nul > assets/css/style.css`）

```bash
echo "" > assets/js/main.js
```
在 `assets/js/` 里创建一个空的 JS 文件。

```bash
ls assets
```
确认能看到 `css` 和 `js` 两个子文件夹。

用 VS Code 左侧文件树展开 `assets`，确认文件夹结构如预期。
::::

::::step{purpose="code . 是从终端跳回 VS Code 编辑器的快捷方式。以后你在终端里 cd 到任何项目，一个 code . 就能在编辑器中打开它。" expected="VS Code 窗口聚焦到 my-music-app 项目，文件树中能看到所有刚创建的文件和文件夹。"}
用 code . 打开项目

```bash
code .
```
如果 VS Code 已经打开了这个项目，这个命令会让 VS Code 窗口聚焦。如果 VS Code 还没打开，它会启动并加载当前文件夹。
::::
:::

:::recap
6 个命令覆盖日常 90% 的终端操作：`pwd`（我在哪）、`ls`（这里有什么）、`cd`（去那里）、`mkdir`（创建文件夹）、`exit`（退出终端）、`code .`（用 VS Code 打开当前目录）。Tab 键自动补全是提速的关键。在终端里操作不是"额外的负担"，而是使用一切前端工具的必经之路。
:::
