# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and other AI coding tools when working with this repository. Keep it in sync with the actual code when architecture changes.

## 项目概述

代码乐章（Code Score）是一个用音乐类比讲解 Web 前端开发的互动式学习网站。

- 技术栈：Vue 3 + TypeScript + Vite
- UI：纯 CSS，自定义设计变量，无 UI 框架
- 编辑器：CodeMirror 6（sandbox 课程内动态加载）
- 状态管理：Pinia（progress / quiz / projectProgress / plan）
- 路由：Vue Router，基础路径固定为 `/my-learn-web/`
- 测试：Vitest + jsdom
- 构建部署：GitHub Pages（`.github/workflows/deploy.yml`）
- PWA：vite-plugin-pwa，可安装、离线缓存

## 常用命令

```bash
npm run dev            # 先执行内容编译，再启动 Vite 开发服务器
npm run build:content  # 编译 src/content/** 为 src/generated/** JSON
npm run build          # 生产构建（含 vue-tsc 类型检查）
npm run preview        # 预览构建产物
npm run test           # 运行全部单测
npm run test:watch     # Vitest 监听模式
npm run typecheck      # 仅类型检查
npm run lint           # ESLint
```

## 当前架构

```text
src/
├── main.ts
├── App.vue                 # 布局 + 路由出口
├── router/index.ts         # 路由：/ /lesson/:id /project/:id /quiz /plan
├── views/
│   ├── HomePage.vue        # 首页（轨道 / 项目 / 序章分区）
│   ├── LessonPlayer.vue    # 课程播放器（正文 + 编辑器 + 预览）
│   ├── ProjectPlayer.vue   # 分步项目流程
│   ├── QuizPage.vue        # 测验
│   └── PlanPage.vue        # 学习计划
├── components/
│   ├── AppHeader.vue / GlobalSearch.vue（Fuse.js 全局搜索）
│   ├── CodeEditor.vue      # CodeMirror 6 编辑器（defineAsyncComponent 按需加载）
│   ├── LivePreview.vue     # iframe 实时预览（sandbox 模式）
│   ├── LessonSidebar.vue / LessonTerms.vue / PlayerFooter.vue / Resizer.vue
│   └── home/               # HomeJourneySection / HomeProjectsSection / HomePrologueSection
├── composables/
│   ├── useAsyncComputed.ts / useCodePreview.ts / useLessonNavigation.ts
│   └── useFocusTrap.ts / useScrollLock.ts / usePanelResize.ts
├── stores/
│   ├── progress.ts         # 课程完成 + userCode 持久化（DATA_VERSION 版本号）
│   ├── quiz.ts             # 测验状态
│   ├── projectProgress.ts  # 项目步骤进度
│   └── plan.ts             # 学习计划状态
├── features/plan/          # studyPlan.ts（计划数据生成）/ types.ts / validators.ts
├── types/                  # index.ts（UI 层类型）
├── content/                # 内容源（见下）
├── generated/              # build-content.ts 生成，勿手改
├── content-loaders/        # lessons / projects / prologues / glossary / quiz / taxonomy
├── content-runtime/
│   ├── types.ts            # 编译产物类型（ContentBodyNode / BlockNode ...）
│   ├── block-registry.ts   # block 名 → 渲染组件映射
│   └── renderers/          # DocumentRenderer / DocumentBodyRenderer / 各 Block 渲染器 / InlineText / text.ts
├── styles/                 # variables.css（设计 token）/ global.css
├── utils/                  # storage.ts / shareCode.ts / text.ts / errorGuard.ts
└── __tests__/
```

## 内容系统

### 内容源（唯一来源 `src/content/**`）

- `src/content/lessons/**`：常规课程（`meta.yaml` + `lesson.md` + 可选 `starter/`）
- `src/content/prologue/**`：序章 / Web 历史课（同 lesson 结构）
- `src/content/projects/**`：项目式内容
- `src/content/glossary/terms.yaml`：术语表
- `src/content/quiz/*.yaml`：题库
- `src/content/taxonomy.yaml`：轨道（track）与章节（chapter）定义
- `src/content/templates/lesson/`：新课程模板

### 构建产物（`scripts/build-content.ts` 生成到 `src/generated/**`）

- `lessons-meta.json` + `lessons/*.json`
- `projects-meta.json` + `projects/*.json`
- `glossary.json` / `taxonomy.json` / `quiz.json` / `search-index.json` / `.build-cache.json`

编译为增量模式：`.build-cache.json` 记录文件 hash 与 `compiler` hash（改编译脚本本身也会全量重编译）。产物勿手改。

### Markdown / Block 体系

课程正文用 Markdown + directive block 语法，由 `build-content.ts` 编译成结构化节点，运行时由 `content-runtime/renderers/*` 渲染。

当前支持的块（`scripts/build-content.ts` 的 `allowedBlockNames` 为准）：

- `:::analogy` — 音乐类比（`AnalogyBlock.vue`）
- `:::prerequisite` — 前置知识（`PrerequisiteBlock.vue`）
- `:::explain` — 讲解（`ExplainBlock.vue`）
- `:::example` — 例子（`ExampleBlock.vue`）
- `:::task` — 动手任务，内部支持 `::::step`（`TaskBlock.vue`）
- `:::hint` — 提示（`HintBlock.vue`）
- `:::recap` — 回顾（`RecapBlock.vue`）

要点：

- 术语在构建期自动注入 `{{term:xxx}}` 标记（`injectTerms`，自动跳过代码块/行内代码/链接等保护区）
- 行内渲染由 `InlineText.vue` + `renderers/text.ts` 负责
- block 名 → 组件映射在 `block-registry.ts`；未知 block 走 `UnsupportedBlock.vue`
- `remark-directive` 对复杂嵌套不完全可靠，`:::task` / `::::step` 在 `build-content.ts` 中做了手工预处理

### 项目内容格式（已知双轨遗留）

- `src/content/projects/projects/*`：`project.json` + `steps/*.md`（当前主要格式）
- `src/content/projects/fundamentals/music-showcase`：`project.md` + `meta.yaml`（旧格式）

`build-content.ts` 的 `hashProjectDir` 需同时兼容两种格式。统一格式是计划中的重构项，改前先确认两份解析路径都覆盖。

## 运行时数据加载

- `content-loaders/lessons.ts`：`lessons-meta.json` 列表 + `import.meta.glob` 懒加载 `lessons/*.json`
- `content-loaders/projects.ts`：同上，projects
- `content-loaders/prologues.ts` / `glossary.ts` / `taxonomy.ts` / `quiz.ts`：序章卡片、术语、轨道章节、题库

课程详情页与项目页都依赖 `src/generated/**`，内容问题排查顺序：

1. `src/content/**` 原始文件
2. `scripts/build-content.ts` 编译逻辑
3. `src/generated/**` 产物
4. `src/content-runtime/**` 渲染器

## 页面与交互

### 首页
- `HomePage.vue` + `components/home/*`，`.home` 是自滚动容器（非 window 滚动）

### 课程页（LessonPlayer.vue）
- `sandbox` / `local` 两种模式（`meta.yaml` 的 `mode`）
- sandbox：编辑器（CodeMirror，按需加载）+ 实时预览（LivePreview，iframe sandbox + 错误行号上报）
- local：本地 IDE 操作型课程，无编辑器
- 正文渲染 `DocumentRenderer.vue`；侧栏 / 术语面板 / 底部导航为独立组件
- 支持全屏面板、分享代码（`utils/shareCode.ts`，URL 编码）、错误行高亮

### 项目页（ProjectPlayer.vue）
- 分步项目流程，复用编辑器 / 预览 / 底部导航能力，进度存 `stores/projectProgress.ts`

### Quiz
- `QuizPage.vue` + `stores/quiz.ts`，题目来自 `generated/quiz.json`

### Plan（学习计划）
- `features/plan/studyPlan.ts` 从 taxonomy + lessons + projects 生成按周/天的任务计划
- `stores/plan.ts` 管理计划状态（localStorage），`PlanPage.vue` 展示

## 状态管理

### progress store（`stores/progress.ts`）
- 持久化：课程完成状态、最近访问、sandbox 用户代码（localStorage key `code-score-progress`）
- `DATA_VERSION`：修改课程 starter code 或数据结构后递增，自动清空旧代码但保留完成状态

### 其他 store
- `quiz.ts`：测验状态（答题、结果）
- `projectProgress.ts`：项目步骤完成度（key 含 DATA_VERSION 同 progress）
- `plan.ts`：学习计划（生成、重置、localStorage）

## 开发服务器与热更新

`vite.config.ts` 自定义 `contentWatchPlugin()`：

1. 监听 `src/content/**`
2. 触发 `scripts/build-content.ts`（子进程，防抖 200ms，队列去重）
3. 递归收集 `src/generated/**/*.json`
4. 显式失效 generated 模块 + `content-loaders/lessons.ts` / `projects.ts`
5. 合并为一次 `full-reload`（80ms 合并窗口）

注意：`server.watch.ignored` 刻意忽略 `src/generated/**`，避免一次构建写多个 JSON 触发多次刷新。热更新失效时优先检查模块失效逻辑。

## 样式系统

- `styles/variables.css`：设计 token（颜色/间距/字体）
- `styles/global.css`：reset、共享动画、代码块、表格、blockquote
- 组件基本使用 `<style scoped>`；页面切换 `slide-fade`，编辑器切换 `editor-swap`

## 测试

- `core-logic.test.ts`：核心逻辑与工具函数（含 composables）
- `data-integrity.test.ts`：内容数据完整性（字段、引用、术语）
- `page-smoke.test.ts`：各页面渲染冒烟
- `plan-data.test.ts`：学习计划数据
- `project-player-navigation.test.ts`：项目页导航（prev/next）
- `project-progress-store.test.ts`：项目进度 store
- `quiz-store.test.ts`：测验 store
- `vite-config.test.ts`：内容热更新辅助逻辑

修改以下内容后建议补测：`vite.config.ts` 监听/HMR、`scripts/build-content.ts`、`content-runtime/types.ts`、`content-runtime/renderers/*`、`content-loaders/*`、`features/plan/*`。

## 安全

- `.env` 已被 `.gitignore` 忽略，**禁止提交**；提交前可用 `git check-ignore .env` 确认
- `VITE_` 前缀变量会在构建时内联进前端 bundle，**任何访问者都能看到**——不要把密钥/凭据放在 `VITE_` 变量中供生产使用

## 注意事项

- 路由基础路径固定为 `/my-learn-web/`（`createWebHistory('/my-learn-web/')` + `vite.config.ts` 的 `base`）
- `src/generated/**` 为构建产物，不要手改；改内容语法优先改内容源或构建脚本
- 新增课程可复制 `src/content/templates/lesson/`
- 如果 directive 渲染异常，依次检查：原始 Markdown、术语注入保护、generated JSON 是否退化成 paragraph
