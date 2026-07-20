# 工程篇结业 — 你的第一个工程化作品

:::analogy
工程篇最后一课——你已经从认识工具、学会 Vue，到能用 Vite+Git+GitHub Pages 完成一个完整的工程化项目。这一课把前面的所有技能整合在一起，做出一个拿得出手的作品。
:::

:::explain{title="回顾你学会了什么"}
从一开始到现在，你的成长路径：
| 阶段 | 技能 | 工具 |
|------|------|------|
| 基础篇 | HTML/CSS/JS 基础 | 浏览器、在线编辑器 |
| 协作篇 | 工作流、调试、命名、数据驱动 | 浏览器、在线编辑器 |
| 工程篇 | Node.js、npm、Vite、Vue SFC、组件通信、Git、部署 | **VS Code、终端、GitHub** |
在你写第一个 `<h1>你好世界</h1>` 时，你可能想不到：几个月后，你会在终端里敲 `npm run build`，把一个完整的 Vue 应用部署到互联网上。
**这就是工程化**——不是学更多语法，而是掌握让代码从"能跑"到"专业"的完整流程。
:::

:::task{title="结业项目：项目收藏管理器"}
::::step{purpose="v-for 是列表渲染的核心指令。将数据数组中的每一项映射为可视化的卡片，是整个应用的基础骨架。这一步验证你对响应式数据绑定和列表渲染的掌握。" expected="页面上整齐排列着多张项目卡片，每张显示曲名、设计师和时期。"}
【基础1】用 v-for 展示项目列表（每个包含名称、设计师、时期）
::::

::::step{purpose="computed 自动从数据派生新值。根据用户选择的时期筛选项目列表，切换时期时列表自动更新。这是声明式数据处理的核心模式——你描述筛选规则，Vue 自动执行。" expected="点击不同时期按钮，列表自动过滤，筛选计数同步更新。"}
【基础2】用 computed 实现按时期筛选
::::

::::step{purpose="v-model 双向绑定让表单开发变得极其简洁。输入框的值自动同步到数据，提交后新项目出现在列表中。整个过程不需要一个 addEventListener。" expected="填写曲名、设计师、时期后点击添加，新项目出现在列表中。"}
【基础3】用 v-model + 表单实现添加新项目
::::

::::step{purpose="watch 监听数据变化自动保存到 localStorage，onMounted 时从 localStorage 恢复数据。数据持久化是真实应用的基本需求，watch + localStorage 是最简洁的实现方案。" expected="添加/删除项目后刷新页面，数据完整保留。"}
【基础4】用 localStorage 持久化数据（刷新不丢失）
::::

::::step{purpose="组件化是 Vue 工程化的核心实践。将卡片逻辑从 App.vue 中提取为独立组件，通过 props 传入数据，通过 emits 回传事件。这验证你对组件通信模式的掌握。" expected="MusicCard.vue 组件可复用，通过 props 接收项目数据，通过 emits 发送事件。"}
【进阶5】把卡片提取成 MusicCard.vue 组件（props + emits）
::::

::::step{purpose="emit 事件让子组件通知父组件执行数据变更。收藏功能是一个典型的子组件触发、父组件处理的场景，综合运用了 props（传入收藏状态）和 emits（传出切换事件）。" expected="点击卡片上的收藏按钮，收藏状态切换（❤️/🤍），数据持久化到 localStorage。"}
【进阶6】添加收藏/取消收藏功能
::::

::::step{purpose="删除功能验证了你对 Vue 响应式数组操作的理解。使用 filter 返回新数组（而非直接修改原数组），确保响应式系统能正确检测变化并更新 DOM。" expected="点击删除按钮，对应的项目从列表中消失，localStorage 同步更新。"}
【进阶7】添加删除项目功能
::::

::::step{purpose="版本管理是专业开发者的基本素养。将项目拆分为有意义的提交（如初始化 Vue 项目、实现项目列表和筛选、添加持久化功能），每个 commit 都有清晰的描述。这不仅是项目管理的需要，也是展示你工程化思维的窗口。" expected="git log 显示至少 3 个有意义的 commit，每个都有清晰的 commit message。"}
【进阶8】用 Git 管理版本（至少 3 次 commit）
::::

::::step{purpose="部署是将代码变成真正的在线应用的最后一步。用 npm run build 构建生产版本，配置 vite.config.js 的 base 路径，推送到 gh-pages 分支。你的作品不再只是本地文件——而是互联网上任何人都能访问的网址。" expected="在浏览器中访问 GitHub Pages URL，能看到你完整的项目收藏管理器在线运行。"}
【进阶9】部署到 GitHub Pages
::::

:::

:::hint{title="如果卡住了"}
- **忘了 ref 怎么用？** → 回顾第 2 课
- **忘了 props/emits？** → 回顾第 3 课
- **忘了怎么部署？** → 回顾第 8 课
- **localStorage 读写：** `localStorage.setItem("key", JSON.stringify(data))` / `JSON.parse(localStorage.getItem("key"))`
- **最重要的是：** 你已经具备了所有需要的技能。相信自己，一步步来。
:::

:::explain{title="接下来怎么走"}
完成这个结业项目后，你已经走完了“会写页面 → 会做 Vue 项目 → 会把作品交付上线”的第一条完整链路。

后面不用在每一课里反复找路线，直接按首页的“成长路径”继续推进就行。当前只需要记住两条最直接的分支：

- **想把 Vue 组件化和数据流练扎实：** 去 `music-collection-v2`
- **想把构建、仓库、部署和自动化串成真正的交付闭环：** 去 `music-collection-v3`

如果做项目时卡在 `ref`、props/emits、部署命令或本地持久化，再回来看本课对应的小节，不用把整课从头重复看一遍。
:::

:::explain{title="作品集和下一阶段，只先记住三件事"}
整理作品集时，先抓住最有用的骨架，不要一开始就给每个项目都配一整套模板。

1. **先保住一个主项目：** 通常是 `music-collection-v3`
2. **再保留 1 到 2 个补充项目：** 比如 `music-collection-v2`、`music-searcher` 或 `music-collection-v1`
3. **下一阶段只选 1 条主线：**
   - 想补前端体系：继续学 Router、Pinia、TypeScript、测试
   - 想做更真实产品：继续学 API、数据库、鉴权和部署链路
   - 想准备投递：先把主项目的 README、截图和线上地址整理好

少量代表作 + 清楚排序，比堆很多半成品更有说服力。更细的 README、口述和投递清单，后面可以按项目需要再逐个整理。
:::

:::recap
这是工程篇的结业项目——你亲手做了一个完整的项目收藏管理器。综合运用了 v-for、v-model、computed、watch、组件通信、localStorage 持久化、Git 版本管理和 GitHub Pages 部署等全部技能。
:::


