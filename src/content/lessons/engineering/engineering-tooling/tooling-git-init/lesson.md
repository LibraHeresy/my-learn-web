# Git — 你的版本管理器

:::analogy
Git 就像玩 RPG 游戏时的存档点。打 Boss 前存个档——打输了可以读档重来。Git 也一样：每完成一个小功能就 `git commit`（存档），改坏了随时回退到上一个存档点。你再也不需要把文件命名为 `最终版_v3_真的不改了_备份.html`。
:::

:::explain{title="问题：没有版本管理，你的文件命名说明了一切"}
如果你见过这样的文件名，你就知道版本管理到底在解决什么问题：

```
音乐收藏.html
音乐收藏_v1.html
音乐收藏_v2.html
音乐收藏_v2_最终版.html
音乐收藏_v2_真的最终版.html
音乐收藏_v3.html
音乐收藏_v3_备份.html
音乐收藏_v3_备份_改坏了不要用.html
```

这个问题叫"文件命名版本管理"——你在用文件名手工做存档。它的缺点：
1. **找版本靠猜** — "v2 最终版"和"v2 真的最终版"有什么区别？不打开看不知道
2. **存储浪费** — 10 个版本 = 10 份完整文件，即使每个版本之间只改了 5 行
3. **回退困难** — 改坏了想回退到"v2 最终版"，你需要手动对比两个文件找差异
4. **协作不可能** — 你和同事各存了各自的"v3"，合并谁的？

Git 用一个 `.git` 文件夹（隐藏的）记录**所有版本的差异**，而不是保存 10 份完整文件。一个 50 次提交的项目，Git 仓库可能只比源代码大 20-30%。
:::

:::explain{title="解决方案：Git 的三个核心动作"}
Git 的工作流可以用三个动作概括。你每天会重复这个循环几十次：

```bash
git add .                    # 第 1 步：把修改加入"暂存区"（购物车）
git commit -m "修改说明"      # 第 2 步：创建一次存档（结账）
# 继续写代码...
git add .
git commit -m "又一次修改"
```

**"暂存区"是什么？为什么不能直接 commit？**

Git 的设计允许你**选择性地**把修改放进一次存档。假设你同时改了 3 个文件：
- `api.js` — 新增了搜索功能（已完成，可以存档）
- `render.js` — 修复了一个排版 bug（已完成，可以存档）
- `App.vue` — 正在尝试一个新功能（写到一半，不想存档，因为代码还是半成品）

用 `git add api.js render.js` 只把前两个文件加入暂存区，然后 `git commit`——存档只包含已完成的两个修改。`App.vue` 的修改留在工作区，下次再提交。

这就是暂存区的价值：**你不是把"所有修改"打包存档，而是把"一组相关的修改"打包存档。**
:::

:::example{title="逐行实操：从零到第一次 commit"}
在 `music-collection` 项目中操作（确保项目在上一课用 Vite 创建好了）。

```bash
cd music-collection       # 进入项目
git init                  # 初始化 Git 仓库
```
输出：`Initialized empty Git repository in .../music-collection/.git/`

这行命令做了什么？
- `git init` — 在当前文件夹创建一个隐藏的 `.git` 文件夹
- `.git` 文件夹里存储所有版本历史、分支、配置——Git 的全部数据
- 这条命令只在项目创建时运行一次，以后永远不需要再 `git init`

```bash
git status                # 查看当前状态
```
输出类似：
```
On branch main
No commits yet
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        README.md
        index.html
        package.json
        src/
        vite.config.js
```

解读 `git status` 的输出：
- `On branch main` — 你在 main 分支上（分支后面课会讲）
- `No commits yet` — 还没有任何存档
- `Untracked files` — 这些文件 Git 还没开始追踪（它们是"新来的"）

在提交之前，先创建 `.gitignore` 排除不需要追踪的文件。

在项目根目录新建 `.gitignore`，写入：
```
node_modules/
dist/
.DS_Store
```

现在 `git status` 输出变了：`.gitignore` 生效，`node_modules/` 不再出现在未追踪列表中。

```bash
git add .                 # 把当前文件夹所有修改加入暂存区
```
`.` 表示"当前目录"。这条命令执行后没有输出——Git 只在出错时说话。

```bash
git status                # 再次查看状态
```
输出变为：
```
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   README.md
        new file:   index.html
        ...
```
所有文件从红色的 "Untracked" 变成了绿色的 "Changes to be committed"——它们现在在暂存区里。

```bash
git commit -m "初始化音乐收藏项目"
```
逐部分拆解：
- `git commit` — 创建存档
- `-m` — message 的缩写，后面跟存档说明
- `"初始化音乐收藏项目"` — 存档消息，描述这次改了什么

输出：
```
[main (root-commit) a1b2c3d] 初始化音乐收藏项目
 8 files changed, 150 insertions(+)
```
- `a1b2c3d` — 这次 commit 的唯一 ID（前 7 位）
- `8 files changed` — 这次存档包含 8 个文件
- `150 insertions(+)` — 总共新增了 150 行代码

```bash
git log                   # 查看所有存档记录
```
输出：
```
commit a1b2c3d4e5f6g7h8i9j0k...
Author: 你的名字 <你的邮箱>
Date:   Sat Jul 20 14:30:00 2026 +0800
    初始化音乐收藏项目
```
这是你的第一个 commit！按 `q` 退出 git log。
:::

:::hint{title="Git 新手最常犯的 4 个错误"}
**错误 1：`git add .` 之后忘记 `git commit`，以为已经存档了**

`git add .` 只是把修改放进"购物车"（暂存区），还没结账。"结账"是 `git commit`。两个步骤缺一个，修改就没有真正存档。

**错误 2：commit 消息写得太随意**

```bash
git commit -m "修改"          # 一个月后你不知道这次改了什么
git commit -m "asdf"           # 毫无意义
git commit -m "根据需求改了"    # 还是不知道改了哪里
```
好的 commit 消息：
```bash
git commit -m "新增搜索功能：支持按曲名和艺术家搜索"
git commit -m "修复收藏按钮在手机端点击无效的 bug"
git commit -m "优化首页加载速度：图片懒加载 + 代码分割"
```
写 commit 消息就像写日记给未来的自己看——说清楚"做了什么"和"为什么"。

**错误 3：commit 了 node_modules**

50 MB 的 `node_modules` 不小心 commit 了，Git 仓库瞬间膨胀，push 到 GitHub 要等 10 分钟。**解决方案：项目开始前就创建 `.gitignore`，写入 `node_modules/`。** 如果已经 commit 了，搜索"git remove node_modules from history"处理。

**错误 4：在错误的目录运行 `git init`**

在桌面或用户目录跑了 `git init`，导致整个桌面变成了一个 Git 仓库。解决方案：删除那个目录下的 `.git` 文件夹即可"撤销" git init。
:::

:::explain{title="现实工作连接：Git 是程序员的'基本生存技能'"}
- **面试必问**：你用过 Git 吗？常用的命令有哪些？merge 和 rebase 的区别？
- **入职第一天**：`git clone` 公司的项目仓库，开始干活
- **日常开发**：每个功能开发在一个分支上 → 提交 PR → Code Review → 合并到主分支。每天 `git add` + `git commit` 至少 5-10 次
- **代码丢了？** `git reflog` 可以找回几乎所有你"以为丢了"的提交

Git 的命令行有几百条命令，但日常 90% 只需要 6 条：`status`、`add`、`commit`、`pull`、`push`、`log`。
:::

:::task{title="为你的项目建立 Git 版本管理"}
::::step{purpose="git init 只在项目创建时运行一次。它在项目根目录创建 .git 隐藏文件夹，这个文件夹就是 Git 的全部数据存储。" expected="终端输出 'Initialized empty Git repository'，git status 列出所有未追踪文件。"}
初始化 Git 仓库

1. 在 VS Code 终端中，确保在 `music-collection` 目录：
   ```bash
   cd music-collection
   git init
   ```
2. 运行 `git status`，看到所有文件都是 "Untracked"（未追踪）
3. 注意 `.git` 隐藏文件夹已被创建（在文件树中可能看不到——VS Code 默认隐藏 `.git` 文件夹）
::::

::::step{purpose=".gitignore 告诉 Git 哪些文件不需要追踪。node_modules 体积大且可自动生成；dist 是构建产物不是源码。" expected="git status 输出中不再出现 node_modules/" .="" gitignore="" 文件在项目根目录存在。}
创建 `.gitignore` 文件

在项目根目录 `music-collection/` 下新建 `.gitignore`，写入：
```
node_modules/
dist/
.DS_Store
*.log
```

- `node_modules/` — 依赖文件夹，`npm install` 可重新生成
- `dist/` — 构建输出（暂不存在，预留以防万一）
- `.DS_Store` — Mac 系统文件
- `*.log` — 日志文件

保存后运行 `git status`，确认 `node_modules/` 不再出现。
::::

::::step{purpose="commit 是 Git 的核心操作。add 选文件进暂存区，commit 打包存档并加说明。形成肌肉记忆：改代码 → add → commit，循环往复。" expected="git log 显示至少 2 个 commit，每个都有清晰的 commit 消息。"}
创建首次提交并练习第二次提交

```bash
# 第一次存档——初始化项目
git add .
git commit -m "初始化音乐收藏项目：Vite + Vue 项目骨架"
```

确认存档成功：
```bash
git log --oneline
```
输出类似：
```
a1b2c3d 初始化音乐收藏项目：Vite + Vue 项目骨架
```

练习第二次存档：
1. 打开 `src/App.vue`，改一下标题（如改成 `音乐收藏`）
2. 保存文件（`Ctrl+S`）
3. 运行 `git status`——看到 `App.vue` 被标记为 "modified"
4. 运行 `git diff`——看到具体改了什么（`-` 是删掉的行，`+` 是新增的行）
5. 运行：
   ```bash
   git add .
   git commit -m "更新首页标题为'音乐收藏'"
   ```
6. 运行 `git log --oneline`——看到有两条记录了
::::
:::

:::recap
Git 是你的代码时间机器。`git init` 初始化仓库（只做一次），`git status` 查看状态，`git add .` 加入暂存区，`git commit -m "说明"` 创建存档。`.gitignore` 排除 `node_modules/` 等不需要追踪的文件。好的 commit 消息说明"做了什么"和"为什么"。`git log` 查看所有存档历史。
:::
