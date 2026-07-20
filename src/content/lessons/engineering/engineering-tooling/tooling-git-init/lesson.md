# Git — 你的"设计图版本管理器"

:::analogy
Git 就像文档的"另存为"历史记录——每完成一步就存档一次，随时可以回看之前的任何版本。再也不用担心改坏了回不去。
:::

:::explain{title="为什么需要 Git？"}
你可能经历过这种情况：
```
音乐收藏_v1.html
音乐收藏_v2.html
音乐收藏_v2_最终版.html
音乐收藏_v2_真的最终版.html
音乐收藏_v3_备份.html
```
Git 解决了这个混乱。有了 Git：
- 不需要"v1""v2""最终版"这种命名
- 每次修改后 `git commit`，自动记录快照
- 任何时候可以回到之前的版本
- 清楚地看到每次改了什么（`git diff`）
程序员用 Git，就像设计师保留每一版草稿——只是更优雅。
:::

:::explain{title="三个基本操作"}
**1. git init** — 初始化仓库
```bash
cd music-collection
git init
```
这会在项目中创建一个隐藏的 `.git` 文件夹——Git 的所有历史记录都存在这里。
**2. git add + git commit** — 保存快照
```bash
git add .                    # 把所有修改加入"暂存区"
git commit -m "初始化项目"    # 创建一次提交（存档）
```
每次 commit 需要一条消息（`-m "..."`），说明这次改了什么。
- `-m` = message（消息）
**3. .gitignore** — 告诉 Git 忽略什么
创建 `.gitignore` 文件（注意文件名前面有个点）：
```
node_modules/
dist/
.DS_Store
```
这些文件和文件夹不会被 Git 追踪：
- `node_modules/` — 太大了，而且别人可以通过 `npm install` 重新下载
- `dist/` — 构建产物，不是源码
- `.DS_Store` — Mac 系统文件，和项目无关
**完整工作流：**
```bash
git add .
git commit -m "添加了音乐卡片组件"
# 继续写代码...
git add .
git commit -m "添加了筛选功能"
# 继续写代码...
git add .
git commit -m "修复了收藏按钮的样式"
```
:::

:::task{title="你的任务 ✨"}
1. 在 `music-collection` 项目中初始化 Git：`git init`
2. 创建 `.gitignore` 文件，内容为 `node_modules/` 和 `dist/`
3. 运行 `git add .` 把所有文件加入暂存区
4. 运行 `git commit -m "初始化音乐收藏项目"` 创建第一次提交
5. 修改 `App.vue`（比如改个标题），然后 `git add .` + `git commit -m "更新标题"`
6. 运行 `git log` 查看提交历史（按 `q` 退出）
> 🎉 你刚刚完成了人生中第一次 Git commit！从此你的代码有了"时间机器"。
:::

:::hint{title="Commit 消息怎么写？"}
好的 commit 消息让人一眼知道改了什么：
- ✅ `添加音乐卡片组件`
- ✅ `修复收藏按钮点击无效的bug`
- ✅ `优化筛选功能，支持多个时期同时选中`
- ❌ `修改`（太模糊）
- ❌ `asdf`（无意义）
- ❌ `根据需求修改了一些文件`（等于没说）
写 commit 消息就像写日记——未来的你会感谢现在认真写消息的你。
:::

:::recap
你学会了用 Git 管理代码版本——git init 初始化仓库，git add 加入暂存区，git commit 创建提交。每次都写清 commit 消息，随时可以回退到任何历史版本，告别"v1、v2、最终版"的混乱。
:::


