# GitHub — 把你的作品发布到公共图书馆

:::analogy
Git 是你的私人书房（本地版本管理）。GitHub 是公共图书馆（云端代码托管）。你把书房里的作品（代码）发布到图书馆，别人就能看到、借阅（clone）、甚至投稿（pull request）。GitHub 也是程序员界的 LinkedIn——你的个人主页就是你的技术名片。
:::

:::explain{title="问题：代码只在你的电脑上，风险有多大？"}
没有 GitHub（或类似的云端托管），你的代码面临三种致命风险：

**风险 1：硬件灾难**
电脑硬盘坏了、被偷了、泼了咖啡——本地所有代码瞬间消失。Git 的历史记录也在本地 `.git` 文件夹里，一起没了。你花了 200 个小时写的项目，因为一杯咖啡清零。

**风险 2：无法分享**
你做了一个炫酷的音乐搜索应用，想让朋友试试。怎么办？把整个文件夹压缩成 zip 发给对方？对方还得自己装环境、配依赖、`npm run dev`——99% 的人不会操作。你想分享你的项目给面试官看？截图说服力有限，他们想看代码。

**风险 3：无法协作**
你和同事小明一起做一个项目。你改了 `api.js`，他改了 `App.vue`。怎么合并？你俩用 U 盘互传文件？用微信发 `最新版.zip`？一天传 10 次？没有人能记住哪个文件是谁的最新版本。

GitHub 一次性解决了这三个问题：云端备份、公开分享、协作工作流。
:::

:::explain{title="解决方案：GitHub = 远程 Git 仓库 + 协作平台"}
GitHub 是 Git 的**远程仓库**（remote repository）。你的代码在本地有一个 Git 仓库（`.git` 文件夹），在 GitHub 上也有一个 Git 仓库——两者通过 `git push`（上传）和 `git pull`（下载）同步。

**核心概念：本地仓库 vs 远程仓库**

```
你的电脑（本地）                     GitHub（远程 / 云端）
┌─────────────────┐                 ┌─────────────────────┐
│ music-collection│  git push →     │ github.com/你的名字/ │
│  ├── src/       │                 │ music-collection    │
│  ├── .git/      │  ← git pull    │  ├── src/           │
│  └── ...        │                 │  ├── 完整的 Git 历史 │
└─────────────────┘                 │  └── ...            │
                                    └─────────────────────┘
```

**三个新命令对应三个新操作：**

| 命令 | 方向 | 做什么 |
|------|------|--------|
| `git remote add` | — | 告诉本地 Git："我的远程仓库地址是这个 URL"，给它起名叫 `origin` |
| `git push` | 本地 → 远程 | 把本地的新 commit 上传到 GitHub |
| `git clone` | 远程 → 本地 | 把 GitHub 上的整个项目下载到本地（首次获取） |
:::

:::example{title="逐行实操：把本地项目推到 GitHub"}
**第一步：在 GitHub 网站上创建远程仓库**

1. 打开 `https://github.com`，注册/登录
2. 点击右上角头像旁边的 `+` 号 → `New repository`
3. 仓库名填写 `music-collection`
4. 选择 **Public**（公开——别人可以看到你的代码）
5. **不要勾选** "Add a README file"（本地已经有项目了，勾选会导致冲突）
6. 点击 "Create repository"

GitHub 会跳转到一个页面，显示一组命令。复制这些命令（第二组："push an existing repository"）。

**第二步：在终端中关联并推送**

```bash
# 确保在项目目录里
cd music-collection
```
```bash
git remote add origin https://github.com/你的用户名/music-collection.git
```
逐词拆解这行命令：
- `git remote add` — 添加一个远程仓库的"快捷方式"
- `origin` — 给这个远程仓库起的名字（习惯叫 origin，你可以理解为"老家"）
- `https://github.com/...` — 远程仓库的 URL 地址

`origin` 是一个**别名**——以后你不用每次敲完整的 URL，只需 `git push origin main` 就行。

```bash
git branch -M main
```
- `git branch` — 管理分支
- `-M` — move（移动）+ force（强制），合起来是"强制重命名"
- `main` — 把当前分支命名为 main（GitHub 的默认主分支名）

```bash
git push -u origin main
```
逐词拆解：
- `git push` — 把本地的 commit 推送到远程
- `-u` — `--set-upstream` 的缩写，"建立上游关联"。加了 `-u` 之后，以后只需要 `git push` 就行了，不用再写 `origin main`
- `origin` — 推到哪个远程仓库（就是刚才添加的 origin）
- `main` — 推哪个分支

运行后终端提示输入用户名和密码（或 token）。输入后等待上传完成。

**第三步：验证**

刷新 GitHub 网页——你的代码出现在上面了！点击 `src/` 文件夹，能看到 `App.vue`、`main.js` 等文件。

**后续工作流（每天重复）：**
```bash
# 改代码 → 存档 → 上传
git add .
git commit -m "新增音乐播放功能"
git push         # 不需要再写 origin main，因为 -u 建立了关联
```
:::

:::hint{title="GitHub 新手最常见的 4 个坑"}
**坑 1：创建仓库时勾选了 "Add a README"，导致 push 冲突**

GitHub 上的 README 你本地没有，本地的代码 GitHub 上没有——历史不兼容。push 时被拒绝。

解决：
```bash
git pull origin main --allow-unrelated-histories
```
- `git pull` — 先把远程的内容拉到本地
- `--allow-unrelated-histories` — 告诉 Git"这两个仓库没有共同祖先，强行合并"
- 解决冲突后 `git push` 即可

**更好的做法：创建仓库时不要勾选任何东西。**

**坑 2：把 git clone 和 git init 两个操作搞混**

```bash
# 场景 A：先有本地项目，想上传到 GitHub
git init                    # 本地初始化
git remote add origin URL   # 关联远程
git push                    # 推送

# 场景 B：GitHub 上已经有一个项目，你想下载到本地
git clone URL               # 一条命令搞定（不需要 init，不需要 remote add）
```
`git clone` = `git init` + `git remote add` + `git pull`，一条命令包含了三个操作。

**坑 3：GitHub 账号和 Git 账号是两回事**

GitHub 是网站（需要注册账号），Git 是本地软件（需要配置用户名和邮箱，用于标识 commit 作者）。它们是不同的人/组织开发的——只是名字相似。

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```
这两个配置决定了 commit 记录里显示的作者名。和 GitHub 登录用的邮箱最好一致——这样 GitHub 能识别 commit 是你的。

**坑 4：push 时反复要求输入密码**

每次 push 都要输密码很烦。解决方案（选一个）：
- 使用 GitHub CLI（`gh auth login`，推荐）
- 配置 SSH Key（`ssh-keygen` 生成密钥，公钥添加到 GitHub 设置里）
:::

:::explain{title="现实工作连接：GitHub 是你最重要的技术名片"}
- **面试官看你的 GitHub**：有没有持续更新的项目？代码写得怎么样？commit 消息规范吗？
- **开源贡献**：你可以在别人的项目上提 Issue（反馈 bug）、发 Pull Request（贡献代码）、Fork（复制到自己名下修改）
- **团队协作**：公司项目托管在 GitHub（或 GitLab）上。每天上班第一件事就是 `git pull` 拉取同事的最新代码
- **简历加分**：一个有持续 commit 的 GitHub 主页，比"熟练使用 Git"一行描述有说服力 100 倍

GitHub 不只是一个存代码的地方。它是你作为开发者在互联网上的"家"。
:::

:::task{title="把你的项目推送到 GitHub"}
::::step{purpose="创建 GitHub 仓库是第一步。仓库名建议和本地文件夹名一致——不强制，但约定俗成，方便识别。" expected="GitHub 页面上出现一个空的 music-collection 仓库，显示推送命令提示。"}
在 GitHub 上创建远程仓库

1. 打开 `https://github.com`，登录（没有账号的话注册一个）
2. 点击右上角 `+` → `New repository`
3. Repository name 填写 `music-collection`
4. 选择 **Public**（公开仓库，私有仓库需要付费——但个人开发者免费）
5. **不要勾选** "Add a README file"
6. **不要勾选** ".gitignore" 和 "license"（本地已经有了）
7. 点击 "Create repository"
::::

::::step{purpose="`git remote add origin` 建立本地和远程的关联。`git push -u` 首次推送并建立上游关联——之后只用 `git push` 就够了。" expected="push 成功后，刷新 GitHub 页面能看到 music-collection 项目的所有文件。"}
关联本地仓库并推送

在 VS Code 终端中（确保在 `music-collection` 目录）：

```bash
git remote add origin https://github.com/你的用户名/music-collection.git
git branch -M main
git push -u origin main
```

如果提示登录，在弹出的窗口用 GitHub 账号登录即可。

推送完成后：
1. 刷新 GitHub 页面
2. 看到 `src/`、`package.json`、`vite.config.js` 等文件都出现在网页上
3. 你的代码现在有了云端备份——电脑坏了也不怕
::::

::::step{purpose="push 是日常操作中频率最高的 Git 命令之一。每次完成一个小功能后执行 push，本地和云端保持同步。" expected="GitHub 上 App.vue 的内容和本地一致，commit 记录同步显示。"}
练习"修改 → commit → push"完整流程

1. 在 VS Code 中修改 `src/App.vue`，在标题旁边加个版本号：
   ```html
   <h1>我的音乐收藏 v1.0</h1>
   ```
2. 保存文件（`Ctrl+S`）
3. 完整三件套：
   ```bash
   git add .
   git commit -m "添加版本号显示到首页标题"
   git push
   ```
4. 刷新 GitHub 页面，点击 `src/App.vue`——看到更新后的代码
5. 点击 GitHub 页面上方的 "commits"（提交记录）——看到你的 commit 历史
::::

::::step{purpose="git clone 是'把别人的项目下载到自己电脑'的标准方式。一条命令 = init + remote add + pull，拿到完整项目。" expected="你的电脑上出现一个新的 music-collection-test 文件夹，内容和 GitHub 上一模一样。"}
练习 git clone（模拟别人下载你的项目）

回到桌面（或其他目录）：
```bash
cd ~/Desktop
```
用 clone 命令获取你的项目：
```bash
git clone https://github.com/你的用户名/music-collection.git music-collection-test
```
- `clone` — 克隆整个仓库（包括所有历史记录）
- `URL` — GitHub 仓库地址
- `music-collection-test` — 本地文件夹名（不写的话默认用仓库名）

进入克隆的文件夹：
```bash
cd music-collection-test
ls
```
看到的文件和你的原始项目一模一样。这就是别人获取你项目的方式。
::::
:::

:::recap
GitHub 是云端代码托管平台 = 远程 Git 仓库 + 协作功能。`git remote add origin URL` 关联远程，`git push` 上传代码，`git clone URL` 下载整个项目。Git (本地) 和 GitHub (云端) 是两个东西——Git 管理版本，GitHub 存储和分享。你的 GitHub 主页就是你的技术名片。
:::
