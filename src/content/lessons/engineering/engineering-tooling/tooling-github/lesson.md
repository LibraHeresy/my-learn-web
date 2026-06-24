# GitHub — 把你的作品"发布到音乐厅"

:::music-analogy
到目前为止，你的乐谱（代码）只存在于自己的电脑上。**GitHub 就像是把乐谱出版发行**——你的作品有了一个公开的地址，别人可以看到、使用、甚至贡献。它也是程序员界的"LinkedIn"——你的 GitHub 主页就是你的技术名片。
:::

:::explain{title="Git 和 GitHub 的区别"}
这是初学者最容易混淆的概念：
| | Git | GitHub |
|------|-----|--------|
| 是什么 | 版本管理工具 | 代码托管网站 |
| 装在哪里 | 你的电脑 | 互联网上的服务器 |
| 能做什么 | 记录版本、回退历史 | 存储代码、协作、展示作品 |
| 类比 | 你书房里的乐谱档案柜 | 公开图书馆的乐谱收藏室 |
**Git 不需要 GitHub 也能用**——但 GitHub 让你的代码有了"线上备份"和"公开展示"的能力。
:::

:::explain{title="关联本地项目到 GitHub"}
**第一步：在 GitHub 上创建仓库**
1. 打开 [github.com](https://github.com)，注册/登录账号
2. 点击右上角的 ➕ → "New repository"
3. 仓库名填写 `music-collection`
4. 设置为 **Public**（公开）
5. **不要勾选** "Add a README file"（因为本地已有项目）
6. 点击 "Create repository"
**第二步：关联本地项目**
GitHub 会显示一段命令，复制并在 VS Code 终端中运行：
```bash
git remote add origin https://github.com/你的用户名/music-collection.git
git branch -M main
git push -u origin main
```
逐行解释：
- `git remote add origin <URL>` — 告诉 Git"远程仓库的地址在这里"，给它起个名叫 `origin`
- `git branch -M main` — 把当前分支命名为 `main`
- `git push -u origin main` — 把本地的 `main` 分支推送到远程的 `origin`
之后每次有新的 commit，只需要：
```bash
git push
```
刷新 GitHub 页面，你的代码就出现在网上了！🎉
:::

:::task{title="你的任务 ✨"}
1. 在 GitHub 上注册账号（如果还没有）
2. 创建一个名为 `music-collection` 的公开仓库
3. 按照 GitHub 提供的命令，把本地项目推送到远程
4. 刷新 GitHub 页面，确认代码已经上传
5. 在本地修改 `App.vue`，commit，然后 `git push`，刷新 GitHub 看更新
> 🎉 你刚刚完成了第一次 git push！从现在开始，你的代码有了"云端备份"，再也不用担心电脑坏了代码丢失。
:::

:::hint{title="常见问题"}
- **"Permission denied"** → 需要配置 SSH Key 或使用 Personal Access Token。初学者推荐用 HTTPS + Token（GitHub 登录后会自动生成）。
- **首次 push 时提示登录** → 在弹出的窗口中用 GitHub 账号登录即可。
- **push 被拒绝？** → 如果创建仓库时勾选了 README，需要先 `git pull origin main --allow-unrelated-histories`。
- **仓库名和文件夹名不一致没关系** — Git 只看 remote URL，不关心文件夹叫什么。
:::

:::listen-to
马勒《第八交响曲"千人"》— 这部作品需要超过一千名表演者。没有任何一个乐团能独自完成——它需要多个合唱团、独唱家、乐团的**协作**。GitHub 让全球开发者以同样的方式协作：每个人贡献自己的一部分。
:::

