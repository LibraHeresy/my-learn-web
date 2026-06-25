# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

代码乐章（Code Score）是一个用音乐类比讲解 Web 前端开发的互动式学习网站。

- 技术栈：Vue 3 + TypeScript + Vite
- UI：纯 CSS，自定义设计变量，无 UI 框架
- 编辑器：CodeMirror 6
- 状态管理：Pinia
- 路由：Vue Router
- 测试：Vitest + jsdom
- 构建部署：GitHub Pages，基础路径固定为 `/my-learn-web/`

## 常用命令

```bash
npm run dev            # 先执行内容编译，再启动 Vite 开发服务器
npm run build:content  # 编译 src/content/** 为 src/generated/** JSON
npm run build          # 生产构建（含 vue-tsc 类型检查）
npm run preview        # 预览构建产物
npm run test           # 运行全部单测
npm run test:watch     # Vitest 监听模式
```

## 当前架构

```text
src/
├── main.ts
├── App.vue
├── router/index.ts
├── views/
│   ├── HomePage.vue
│   ├── LessonPlayer.vue
│   ├── ProjectPlayer.vue
│   └── QuizPage.vue
├── components/
│   ├── AppHeader.vue
│   ├── GlobalSearch.vue
│   ├── LessonSidebar.vue
│   ├── LessonTerms.vue
│   ├── CodeEditor.vue
│   ├── LivePreview.vue
│   ├── PlayerFooter.vue
│   ├── Resizer.vue
│   └── home/
├── composables/
│   ├── useAsyncComputed.ts
│   ├── useCodePreview.ts
│   ├── useLessonNavigation.ts
│   ├── useNotes.ts
│   └── usePanelResize.ts
├── stores/
│   ├── progress.ts
│   ├── quiz.ts
│   └── vocabulary.ts
├── content/
│   ├── lessons/
│   ├── prologue/
│   ├── projects/
│   ├── glossary/
│   ├── quiz/
│   └── taxonomy.yaml
├── generated/                # build-content.ts 生成，勿手改
├── content-loaders/
│   ├── lessons.ts
│   ├── projects.ts
│   ├── prologues.ts
│   ├── glossary.ts
│   ├── quiz.ts
│   └── taxonomy.ts
├── content-runtime/
│   ├── types.ts
│   ├── block-registry.ts
│   └── renderers/
├── styles/
│   ├── variables.css
│   └── global.css
├── utils/
│   ├── markdown.ts
│   ├── shareCode.ts
│   ├── storage.ts
│   └── errorGuard.ts
└── __tests__/
```

## 内容系统

### 内容源

内容不再维护在 `src/configs/*` 里，当前唯一内容源是 `src/content/**`：

- `src/content/lessons/**`：常规课程
- `src/content/prologue/**`：序章 / Web 历史课
- `src/content/projects/**`：项目式内容
- `src/content/glossary/terms.yaml`：术语表
- `src/content/quiz/*.yaml`：题库
- `src/content/taxonomy.yaml`：轨道与章节定义

### 构建产物

`scripts/build-content.ts` 会把内容编译到 `src/generated/**`：

- `lessons-meta.json`
- `lessons/*.json`
- `projects-meta.json`
- `projects/*.json`
- `glossary.json`
- `taxonomy.json`
- `quiz.json`
- `search-index.json`
- `.build-cache.json`

这些文件是运行时数据源，不要手动编辑。

### Markdown / Block 体系

课程正文由 `build-content.ts` 编译成结构化节点，运行时由 `content-runtime/renderers/*` 渲染。

当前支持的块包括：

- `:::music-analogy`
- `:::explain`
- `:::example`
- `:::task`
- `:::hint`
- `:::listen-to`
- `:::recap`

其中：

- `:::task` 内部支持 `::::step`
- 术语会在构建期注入 `{{term:xxx}}`
- 行内渲染由 `InlineText.vue` + `text.ts` 负责
- 代码块、列表、表格、引用块的显示逻辑分散在 `text.ts` 与各 block renderer 中

## 运行时数据加载

- `src/content-loaders/lessons.ts`：读取 `lessons-meta.json` 与 `lessons/*.json`
- `src/content-loaders/projects.ts`：读取 `projects-meta.json` 与 `projects/*.json`
- `src/content-loaders/glossary.ts`：术语数据
- `src/content-loaders/taxonomy.ts`：轨道/章节元数据
- `src/content-loaders/quiz.ts`：题库数据

课程详情页与项目页都依赖 `src/generated/**`，因此任何内容问题都需要同时检查：

1. `src/content/**` 原始文件
2. `scripts/build-content.ts` 编译逻辑
3. `src/generated/**` 产物
4. `src/content-runtime/**` 渲染器

## 页面与交互

### 首页

- `HomePage.vue` 是首页入口
- 首页由 `HomeJourneySection`、`HomeProjectsSection`、`HomePrologueSection` 组成
- `.home` 是自滚动容器，不是 `window` 滚动
- 首页存在一个既有问题：模板里使用了 `HomeVocabSection`，但当前文件未显式引入，开发环境会有 Vue warning

### 课程页

- `LessonPlayer.vue` 是核心页面
- 支持 `sandbox` / `local` 两种模式
- `sandbox` 模式显示编辑器与预览
- `local` 模式用于本地 IDE 操作型课程
- 正文渲染使用 `DocumentRenderer.vue`
- 侧栏、术语面板、底部导航都是独立组件

### 项目页

- `ProjectPlayer.vue` 负责分步项目流程
- 项目步骤依赖 `ProjectStep` 结构
- 与课程页共用编辑器 / 预览 / 底部导航能力

### Quiz

- `QuizPage.vue` + `stores/quiz.ts` 构成测验系统
- 题目来源于 `src/content/quiz/*.yaml` 编译后的 `generated/quiz.json`

## 状态管理

### progress store

`src/stores/progress.ts` 当前会持久化以下内容：

- 课程完成状态
- 最近访问时间
- 用户在 sandbox 课程中的代码

注意：`CLAUDE.md` 旧版本里“用户代码不持久化”的描述已经过时，当前实现是会持久化 `userCode` 的。

另外：

- `DATA_VERSION` 位于 `progress.ts`
- 修改课程 starter code 或相关数据结构后，如果需要清空旧缓存，应递增 `DATA_VERSION`

### 其他 store

- `stores/quiz.ts`：测验状态
- `stores/vocabulary.ts`：仍存在，但术语 tooltip 中“加入复习”按钮已移除，不应再把它当作 tooltip 的运行时依赖

## 开发服务器与热更新

`vite.config.ts` 中有一个自定义 `contentWatchPlugin()`，当前机制是：

1. 监听 `src/content/**`
2. 触发 `scripts/build-content.ts`
3. 递归收集 `src/generated/**/*.json`
4. 显式失效相关 generated 模块与 loader 模块
5. 合并为一次 `full-reload`

注意事项：

- `server.watch.ignored` 仍忽略 `src/generated/**`
- 这是刻意设计，用来避免一次内容构建写出多个 JSON 时触发多次刷新
- 如果内容热更新失效，优先检查 `vite.config.ts` 中的模块失效逻辑，而不是只看 `build-content.ts` 有没有执行

## 样式系统

- `styles/variables.css`：设计 token
- `styles/global.css`：reset、共享动画、代码块、表格、blockquote 等全局样式
- 组件基本都使用 `<style scoped>`
- 页面切换主要依赖 `slide-fade`
- 编辑器切换主要依赖 `editor-swap`

## 测试

当前测试主要包括：

- `core-logic.test.ts`：核心逻辑与工具函数
- `data-integrity.test.ts`：内容数据完整性
- `nav-integration.test.ts`：导航相关逻辑
- `page-smoke.test.ts`：页面冒烟测试
- `quiz-store.test.ts`：测验 store
- `vite-config.test.ts`：内容热更新辅助逻辑

修改以下内容后建议补测：

- `vite.config.ts` 的内容监听 / HMR 行为
- `scripts/build-content.ts`
- `content-runtime/types.ts`
- `content-runtime/renderers/*`
- `content-loaders/*`

## 注意事项

- 路由基础路径固定为 `/my-learn-web/`，见 `createWebHistory('/my-learn-web/')`
- `npm run dev` 会先执行一次 `npm run build:content`
- `src/generated/**` 为构建产物，不要手改
- 修改内容语法时，优先修内容源或构建脚本，不要直接改 generated 文件
- `build-content.ts` 使用 `.build-cache.json` 做增量编译，并额外包含 `compiler` hash；修改编译脚本本身也会触发重编译
- `remark-directive` 对复杂嵌套不完全可靠，`:::task` / `::::step` 已在 `build-content.ts` 中做了手工预处理
- 如果 directive 渲染异常，要优先检查：原始 Markdown、术语注入保护、generated JSON 是否退化成 paragraph
