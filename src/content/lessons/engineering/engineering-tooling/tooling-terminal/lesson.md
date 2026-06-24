# 用命令行"指挥"电脑

:::music-analogy
指挥家用一个手势让整个乐团起奏——这是**效率**。命令行也是如此：敲几个字母，电脑就完成一项任务。不需要鼠标点来点去，不需要在文件夹里翻找。几个命令，一切就绪。
:::

:::explain{title="为什么要学命令行？"}
前端工程化的几乎每一步都在命令行里完成：
- 创建项目：`npm create vite@latest`
- 安装依赖：`npm install`
- 启动开发服务器：`npm run dev`
- 构建生产版本：`npm run build`
- Git 版本管理：`git add` / `git commit`
你不需要成为命令行专家，只需要掌握 6 个最常用的命令。
:::

:::explain{title="6 个必学命令"}
**1. `pwd` — 我在哪里？**（Print Working Directory）
```bash
pwd
# 输出：/Users/xiaomei/my-music-app
```
就像 GPS 告诉你当前位置。
**2. `ls` — 这里有什么？**（List）
```bash
ls
# 输出：readme.md
```
列出当前文件夹中的所有文件。
**3. `cd` — 去别的地方**（Change Directory）
```bash
cd my-music-app    # 进入文件夹
cd ..              # 回到上一级
cd ~               # 回到家目录
```
**4. `mkdir` — 创建文件夹**（Make Directory）
```bash
mkdir src          # 创建名为 src 的文件夹
mkdir -p src/components  # 创建嵌套文件夹
```
**5. `echo` / `type nul` — 创建文件**
```bash
echo "" > index.html     # Mac/Linux：创建空文件
type nul > index.html    # Windows：创建空文件
```
**6. `code .` — 用 VS Code 打开当前文件夹**
```bash
code .
# VS Code 会打开当前文件夹
```
:::

:::task{title="你的任务 ✨"}
在 VS Code 的终端中完成以下操作（不要用鼠标在文件管理器中操作！）：
1. `pwd` — 确认你在 `my-music-app` 文件夹中
2. `mkdir src` — 创建 src 文件夹
3. `cd src` — 进入 src 文件夹
4. 在 src 中创建 `index.html`（用上面的命令）
5. `cd ..` — 回到上级目录
6. `ls` — 确认看到 `src` 文件夹
> 💡 如果你在 Windows 上使用 PowerShell，命令完全一样。如果用 CMD，`ls` 需要换成 `dir`。建议使用 PowerShell（VS Code 终端默认就是它）。
:::

:::hint{title="Tab 键自动补全"}
命令行最实用的技巧：**按 Tab 键自动补全**。
比如输入 `cd my` 然后按 Tab，系统会自动补全为 `cd my-music-app`（如果当前目录只有一个以 my 开头的文件夹）。
这就像你哼两句旋律，别人就知道是哪首曲子。
:::

:::listen-to
贝多芬《第五交响曲》第一乐章 — 指挥的一个下拍，整个乐团爆发。命令行就是你的指挥棒——`npm run dev` 一行命令，开发服务器立刻启动。
:::

