# 工程篇结业 -- 你的第一个工程化作品

:::analogy
这一课是你的"毕业答辩" -- 从认识工具开始，你学会了 Vite 脚手架、Vue 组件化、响应式数据、路由导航、版本管理、部署上线。现在把所有技能串在一起，做一个完整的、能真正部署到互联网上的作品。这就是从"会写代码"到"能做产品"的跨越。
:::

:::explain{title="回顾你的成长路径"}
| 阶段 | 你学会了 | 核心工具 |
|---|---|---|
| 基础篇 | HTML 结构、CSS 样式、JS 交互 | 浏览器、在线编辑器 |
| 协作篇 | 工作流、调试、命名、数据驱动 | 浏览器、在线编辑器 |
| **工程篇** | **Node.js、npm、Vite、Vue SFC、组件通信、Git、部署** | **VS Code、终端、GitHub** |

几个月前你还在写 `<h1>你好世界</h1>`。现在你可以在终端里敲 `npm run dev` 启动开发服务器，用 Vue 组件搭建页面，用 `git push` 上传代码，用 GitHub Pages 让全世界看到你的作品。

**这就是工程化** -- 不是学更多语法，而是掌握让代码从"能跑"变成"能交付"的完整流程。
:::

:::explain{title="问题：碎片化的知识 vs 完整的产品"}
在前面的课程中，你分别学会了：

- 第 1 课：`<template>` + `<script setup>` + `<style scoped>` 三段式
- 第 2 课：`v-if`、`v-show`、`v-for`、`v-bind` 指令
- 第 3 课：`onMounted`、`onBeforeUnmount` 生命周期
- 第 4 课：`ref()`、`computed()` 响应式数据
- 第 5 课：`defineProps`、`defineEmits` 组件通信
- 第 6 课：声明式 vs 命令式编程思维
- 第 7 课：`computed` vs `watch` 的选择和用法
- 第 8 课：`v-model` 双向绑定和修饰符
- 第 9 课：`<slot>` 插槽和组件灵活设计
- 第 10 课：Vue Router 路由和页面导航

但如果把这些技能放在一起做一个完整的应用，你知道从哪里开始吗？这一课就是把所有碎片拼接成完整的图景。
:::

:::explain{title="方案：从想法到部署的完整工作流"}
一个真实的 Vue 项目从 0 到上线，标准流程是这样的：

```
1. 初始化项目
   npm create vite@latest my-app -- --template vue
   ↓
2. 规划组件结构
   画草图，决定有几个页面、几个组件
   ↓
3. 写代码
   组件 → 页面 → 路由 → 数据流
   ↓
4. 版本管理
   git init → git add → git commit（反复循环）
   ↓
5. 构建
   npm run build（生成生产环境的 dist/ 文件夹）
   ↓
6. 部署
   推送到 GitHub Pages / Vercel / Netlify
   ↓
7. 迭代
   用户反馈 → 修改代码 → 提交 → 构建 → 重新部署
```

每个环节你都学过了，现在把它们串在一起。
:::

:::explain{title="项目结构：一个完整的 Vue 应用长什么样"}
```
music-collection/              # 项目根目录
├── index.html                 # Vite 入口 HTML
├── package.json               # 项目配置和依赖
├── vite.config.js             # Vite 构建配置
├── src/
│   ├── main.js                # 应用入口：创建 App，注册 Router
│   ├── App.vue                # 根组件：导航 + router-view
│   ├── router/
│   │   └── index.js           # 路由配置
│   ├── views/                 # 页面级组件（每个路由对应一个）
│   │   ├── Home.vue           # 首页：曲目列表 + 筛选 + 添加表单
│   │   ├── Detail.vue         # 详情页：单个曲目的完整信息
│   │   ├── About.vue          # 关于页
│   │   └── NotFound.vue       # 404 页面
│   ├── components/            # 可复用的 UI 组件
│   │   ├── MusicCard.vue      # 曲目卡片（Props 接收数据，Emits 发出事件）
│   │   ├── AddForm.vue        # 添加曲目的表单（v-model + 表单验证）
│   │   └── FilterBar.vue      # 筛选栏（v-model + computed 联动）
│   └── assets/                # 静态资源
│       └── styles/
│           └── main.css       # 全局样式
└── dist/                      # 构建产物（npm run build 生成的）
    ├── index.html
    ├── assets/
    │   ├── index-abc123.js    # 编译后的 JS
    │   └── index-def456.css   # 编译后的 CSS
    └── ...
```
:::

:::explain{title="逐层解读：代码是怎么组织的"}
**第 1 层：main.js -- 应用入口**
```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'       // 导入路由

const app = createApp(App)           // 创建应用实例
app.use(router)                      // 安装路由插件
app.mount('#app')                    // 挂载到 index.html 的 <div id="app">
```
三行核心代码，把 Vue 应用启动起来。每一行的作用：
- `createApp(App)` -- 创建一个 Vue 应用，以 App.vue 为根组件
- `app.use(router)` -- 注册路由插件，让 `<router-link>` 和 `<router-view>` 生效
- `app.mount('#app')` -- 把应用挂载到页面上，开始渲染

**第 2 层：App.vue -- 页面骨架**
```vue
<template>
  <nav>
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
  </nav>
  <main>
    <router-view />     <!-- 所有页面在这里切换 -->
  </main>
</template>
```
App.vue 只做一件事：提供导航和路由出口。具体的页面内容（列表、详情、关于）都由 `<router-view />` 接管。

**第 3 层：router/index.js -- URL 到页面的映射**
```js
const routes = [
  { path: '/',            component: () => import('../views/Home.vue') },
  { path: '/piece/:id',   component: () => import('../views/Detail.vue') },
  { path: '/about',       component: () => import('../views/About.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('../views/NotFound.vue') },
]
```
路由表就是一张"路径 → 组件"的对照表。`() => import(...)` 是懒加载，只在第一次访问时下载组件代码。

**第 4 层：views/ -- 页面组件**
每个页面是一个 `.vue` 文件，有自己的 `<script setup>`、`<template>`、`<style scoped>`。页面组件组装来自 `components/` 的子组件。

**第 5 层：components/ -- 可复用组件**
这些是页面的"零件"。MusicCard 被 Home 使用，也可能被 Detail 使用。每个组件通过 Props 接收数据，通过 Emits 发出事件。
:::

:::explain{title="数据流全景：一条数据从输入到显示的完整路径"}
以"添加一首新曲目并显示在列表"为例：

```
用户在 AddForm 中输入曲名 "月光"
  │
  │ v-model 双向绑定
  │
  v
AddForm 组件的 name ref 值变为 "月光"
  │
  │ 用户点击"添加"按钮
  │ emit('add', { name: '月光', ... })
  │
  v
Home.vue 接收 add 事件
  │ pieces.value.push(newPiece)
  │
  ├──→ watch 检测到 pieces 变化 → localStorage.setItem(...)  自动保存！
  │
  ├──→ computed 检测到 pieces 变化 → filteredPieces 自动重算
  │         │
  │         │ Props 传递
  │         v
  │    MusicCard 组件接收新数据 → 模板自动渲染 → 页面上出现新卡片
  │
  └──→ computed 检测到 filteredPieces 变化 → stats 自动更新
            │
            v
         模板中 {{ stats }} 自动更新 → "共 5 首" 变成 "共 6 首"
```

整个过程，你写的代码只是在三个地方声明了规则：
1. `pieces.value.push(newPiece)` -- 改数据
2. `computed(() => pieces.filter(...))` -- 声明筛选规则
3. `watch(pieces, save)` -- 声明保存规则

**所有 DOM 更新、localStorage 写入、筛选重算、统计更新，全部自动完成。** 这就是 Vue 声明式编程的威力 -- 你描述关系和规则，框架负责执行。
:::

:::task{title="结业项目：音乐收藏管理器"}
下面 9 个步骤覆盖了你学过的所有核心技能。每一步都是一个独立的能力验证。

::::step{purpose="v-for 是列表渲染的基础。将数据数组中的每一项映射为可视化的卡片，是整个应用的骨架。验证你对响应式数据和列表渲染的掌握。" expected="页面上整齐排列着多张曲目卡片，每张显示曲名、作曲家和时期。"}
【基础 1】用 v-for 展示曲目列表（每个包含曲名、作曲家、时期）
::::

::::step{purpose="computed 从数据自动派生筛选结果。选择不同时期，列表自动更新。这是声明式数据处理的核心模式。" expected="点击不同时期按钮，列表自动过滤，筛选计数同步更新。"}
【基础 2】用 computed 实现按时期筛选
::::

::::step{purpose="v-model 双向绑定让表单开发极其简洁。输入框的值自动同步到数据，提交后新曲目出现在列表中。整个过程不需要一个 addEventListener。" expected="填写曲名、作曲家、时期后点击添加，新曲目出现在列表中。"}
【基础 3】用 v-model + 表单实现添加新曲目
::::

::::step{purpose="watch 监听数据变化自动保存到 localStorage，onMounted 时从 localStorage 恢复数据。数据持久化是真实应用的基本需求。" expected="添加/删除曲目后刷新页面，数据完整保留。"}
【基础 4】用 localStorage 持久化数据（watch 监听数组 + deep:true，onMounted 恢复）
::::

::::step{purpose="组件化是 Vue 工程化的核心。将卡片从 App.vue 提取为独立组件，通过 Props 传入数据，通过 Emits 回传事件。" expected="MusicCard.vue 组件可复用，通过 Props 接收数据，通过 Emits 发送事件。"}
【进阶 5】把卡片提取成 MusicCard.vue 组件（defineProps + defineEmits）
::::

::::step{purpose="emit 事件让子组件通知父组件。收藏功能是典型的子组件触发、父组件处理的模式。" expected="点击卡片上的收藏按钮，收藏状态切换（❤️/🤍），数据持久化到 localStorage。"}
【进阶 6】添加收藏/取消收藏功能
::::

::::step{purpose="删除功能验证你对响应式数组操作的理解。用 filter 创建新数组而非直接修改原数组。" expected="点击删除按钮，对应曲目从列表中消失，localStorage 同步更新。"}
【进阶 7】添加删除曲目功能
::::

::::step{purpose="版本管理是专业开发者的基本功。将项目拆分为有意义的提交，每个 commit 有清晰的描述。" expected="git log 显示至少 3 个有意义的 commit。"}
【进阶 8】用 Git 管理版本（至少 3 次 commit，每次有清晰的 commit message）
::::

::::step{purpose="部署是让代码变成在线应用的最后一步。npm run build 构建生产版本，推送到 gh-pages 分支。你的作品不再只是本地文件。" expected="在浏览器中能通过 GitHub Pages URL 访问你完整的音乐收藏管理器。"}
【进阶 9】部署到 GitHub Pages（npm run build → 配置 base → 推送到 gh-pages 分支）
::::
:::

:::hint{title="如果卡住了，回去看对应的课"}
- **ref / computed 怎么用来着？** -- 回顾第 4 课
- **props / emits 怎么写？** -- 回顾第 5 课
- **v-if vs v-show 用哪个？** -- 回顾第 2 课
- **v-model 怎么用？** -- 回顾第 8 课
- **onMounted / onBeforeUnmount 什么时候用？** -- 回顾第 3 课
- **localStorage 读写：** `localStorage.setItem("key", JSON.stringify(data))` / `JSON.parse(localStorage.getItem("key"))`
- **tailwind 怎么部署？** -- 回顾工程化第 8 课

最重要的是：你已经具备了所有需要的技能。一步步来，相信自己。
:::

:::explain{title="完成这个项目后，你已经掌握的技能清单"}
- [x] 用 Vite 创建 Vue 项目
- [x] 编写 `.vue` 单文件组件（template + script setup + style scoped）
- [x] 使用 `ref()`、`computed()` 创建响应式数据
- [x] 使用 `v-if`、`v-show`、`v-for`、`v-bind`、`v-model` 指令
- [x] 使用 `onMounted`、`onBeforeUnmount`、`watch` 管理生命周期
- [x] 通过 `defineProps` 和 `defineEmits` 实现组件通信
- [x] 使用 `<slot>` 设计灵活的组件
- [x] 使用 Vue Router 实现多页面导航
- [x] 用 `localStorage` 持久化数据
- [x] 用 Git 管理版本
- [x] 用 `npm run build` 构建生产版本
- [x] 部署到 GitHub Pages
:::

:::explain{title="下一步：学完工程篇后怎么走"}
完成这个结业项目后，你已经走完了"会写页面 → 会做 Vue 项目 → 会把作品交付上线"的第一条完整链路。

当前只需要记住两条最直接的分支：

- **想把 Vue 组件化和数据流练扎实：** 继续 `music-collection-v2`
- **想把构建、仓库、部署和自动化串成真正的交付闭环：** 继续 `music-collection-v3`

如果做项目时卡在某个具体技能（ref、props/emits、部署命令等），直接回来看本课对应的小节，不用把整课从头重复看一遍。
:::

:::recap
这是工程篇的结业项目 -- 你亲手做了一个完整的音乐收藏管理器。综合运用了：Vite 项目初始化、Vue SFC 三段式、ref/computed/watch 响应式数据、v-if/v-show/v-for/v-model 指令、defineProps/defineEmits 组件通信、onMounted/onBeforeUnmount 生命周期、Slot 插槽、Vue Router 路由、localStorage 数据持久化、Git 版本管理和 GitHub Pages 部署。你从"会写代码"走到了"能交付产品"。
:::
