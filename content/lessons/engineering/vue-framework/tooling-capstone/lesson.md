# 登台篇结业 — 你的第一个工程化作品

::music-analogy
独奏会的时间到了。你已经从认识乐器（乐理篇）、学会合奏（合奏篇）、掌握了演出流程（登台篇）——现在，**在真正的音乐厅里，用专业的方式，演奏你自己的作品。**
::

::explain{title="回顾你学会了什么"}
从乐理篇到现在，你的成长路径：
| 阶段 | 技能 | 工具 |
|------|------|------|
| 乐理篇 | HTML/CSS/JS 基础 | 浏览器、在线编辑器 |
| 合奏篇 | 工作流、调试、命名、数据驱动 | 浏览器、在线编辑器 |
| 登台篇 | Node.js、npm、Vite、Vue SFC、组件通信、Git、部署 | **VS Code、终端、GitHub** |
在乐理篇你写第一个 `<h1>你好世界</h1>` 时，你可能想不到：几个月后，你会在终端里敲 `npm run build`，把一个完整的 Vue 应用部署到互联网上。
**这就是工程化**——不是学更多语法，而是掌握让代码从"能跑"到"专业"的完整流程。
::

::task{title="结业项目：音乐收藏管理器 🎵"}
:::step{purpose="v-for 是列表渲染的核心指令。将数据数组中的每一项映射为可视化的卡片，是整个应用的基础骨架。这一步验证你对响应式数据绑定和列表渲染的掌握。" expected="页面上整齐排列着多张曲目卡片，每张显示曲名、作曲家和时期。"}
【基础1】用 v-for 展示曲目列表（每首包含曲名、作曲家、时期）
:::

:::step{purpose="computed 自动从数据派生新值。根据用户选择的时期筛选曲目列表，切换时期时列表自动更新。这是声明式数据处理的核心模式——你描述筛选规则，Vue 自动执行。" expected="点击不同时期按钮，列表自动过滤，筛选计数同步更新。"}
【基础2】用 computed 实现按时期筛选
:::

:::step{purpose="v-model 双向绑定让表单开发变得极其简洁。输入框的值自动同步到数据，提交后新曲目出现在列表中。整个过程不需要一个 addEventListener。" expected="填写曲名、作曲家、时期后点击添加，新曲目出现在列表中。"}
【基础3】用 v-model + 表单实现添加新曲目
:::

:::step{purpose="watch 监听数据变化自动保存到 localStorage，onMounted 时从 localStorage 恢复数据。数据持久化是真实应用的基本需求，watch + localStorage 是最简洁的实现方案。" expected="添加/删除曲目后刷新页面，数据完整保留。"}
【基础4】用 localStorage 持久化数据（刷新不丢失）
:::

:::step{purpose="组件化是 Vue 工程化的核心实践。将卡片逻辑从 App.vue 中提取为独立组件，通过 props 传入数据，通过 emits 回传事件。这验证你对组件通信模式的掌握。" expected="MusicCard.vue 组件可复用，通过 props 接收曲目数据，通过 emits 发送事件。"}
【进阶5】把卡片提取成 MusicCard.vue 组件（props + emits）
:::

:::step{purpose="emit 事件让子组件通知父组件执行数据变更。收藏功能是一个典型的子组件触发、父组件处理的场景，综合运用了 props（传入收藏状态）和 emits（传出切换事件）。" expected="点击卡片上的收藏按钮，收藏状态切换（❤️/🤍），数据持久化到 localStorage。"}
【进阶6】添加收藏/取消收藏功能
:::

:::step{purpose="删除功能验证了你对 Vue 响应式数组操作的理解。使用 filter 返回新数组（而非直接修改原数组），确保响应式系统能正确检测变化并更新 DOM。" expected="点击删除按钮，对应的曲目从列表中消失，localStorage 同步更新。"}
【进阶7】添加删除曲目功能
:::

:::step{purpose="版本管理是专业开发者的基本素养。将项目拆分为有意义的提交（如初始化 Vue 项目、实现曲目列表和筛选、添加持久化功能），每个 commit 都有清晰的描述。这不仅是项目管理的需要，也是展示你工程化思维的窗口。" expected="git log 显示至少 3 个有意义的 commit，每个都有清晰的 commit message。"}
【进阶8】用 Git 管理版本（至少 3 次 commit）
:::

:::step{purpose="部署是将代码变成真正的在线应用的最后一步。用 npm run build 构建生产版本，配置 vite.config.js 的 base 路径，推送到 gh-pages 分支。你的作品不再只是本地文件——而是互联网上任何人都能访问的网址。" expected="在浏览器中访问 GitHub Pages URL，能看到你完整的音乐收藏管理器在线运行。"}
【进阶9】部署到 GitHub Pages
:::

::

::hint{title="如果卡住了"}
- **忘了 ref 怎么用？** → 回顾第 2 课
- **忘了 props/emits？** → 回顾第 3 课
- **忘了怎么部署？** → 回顾第 8 课
- **localStorage 读写：** `localStorage.setItem("key", JSON.stringify(data))` / `JSON.parse(localStorage.getItem("key"))`
- **最重要的是：** 你已经具备了所有需要的技能。相信自己，一步步来。
::

::explain{title="下一步是什么？"}
完成这个结业项目后，你已经是一个**入门级前端开发者**了。你学会了：
✅ 用 HTML/CSS/JS 构建页面
✅ 用 Vue 组件化思维组织代码
✅ 用 npm + Vite 搭建工程化项目
✅ 用 Git 管理代码版本
✅ 用 GitHub Pages 部署上线
接下来的方向：
- **作品集 v2：** 用 Vue 重构你的音乐收藏库（component、router、store）
- **作品集 v3：** 学习后端 API，做一个完整的全栈应用
- **持续学习：** Vue Router、Pinia 状态管理、TypeScript、测试……
> 🎵 编程的世界就像音乐——你永远有新的曲目可以学，新的技巧可以练。但你已经有了最重要的东西：**基本功和信心**。
::

::listen-to
贝多芬《第九交响曲》第四乐章 — 这不仅是音乐的巅峰，也是工程化的杰作：独唱、合唱、管弦乐队在精确的指挥下协作。你的结业项目也是如此：Vue 组件（声部）+ Vite 构建（指挥）+ Git 版本管理（排练记录）+ GitHub Pages 部署（音乐厅公演）。
::

