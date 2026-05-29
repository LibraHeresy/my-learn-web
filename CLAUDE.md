# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

代码乐章（Code Score）— 用音乐类比教 Web 前端开发的交互式教学网站。Vue 3 + TypeScript + Vite，纯 CSS（无框架），CodeMirror 6 在线编辑器，部署在 GitHub Pages（base: `/my-learn-web/`）。

## 常用命令

```bash
npm run dev          # 开发服务器 (localhost:5173/my-learn-web/)
npm run build        # 生产构建（含 vue-tsc 类型检查）
npm run preview      # 预览构建产物
npm run test         # 运行全部单测
npm run test:watch   # 监听模式
```

## 架构概览

```
src/
├── main.ts                  # createApp → Pinia → Router → mount
├── App.vue                  # AppHeader + RouterView（含 Transition）
├── router/index.ts          # 3 条路由：/ | /lesson/:id | /project/:id
├── types/index.ts           # Lesson, Project, Chapter, Track, UserCode 等接口
├── stores/progress.ts       # Pinia — 学习进度（completed 状态持久化到 localStorage）
├── configs/                 # 全部教学内容数据
│   ├── lessons.ts           # ~80 节课，11 个章节（4289 行）
│   ├── projects.ts          # 5 个实践项目（分步指导）
│   ├── prologues.ts         # 6 节"筚路蓝缕"Web 历史课
│   ├── tracks.ts            # 4 条学习轨道定义
│   └── glossary.ts          # 术语表（音乐类比解释）
├── views/                   # 3 个页面
│   ├── HomePage.vue         # 首页：Hero + 轨道卡片 + 项目卡片 + 历史卡片 + 粘性导航
│   ├── LessonPlayer.vue     # 三栏布局（教学内容 | 编辑器 | 预览），含侧边栏目录
│   └── ProjectPlayer.vue    # 分步项目播放器，顶部步骤圆点指示器
├── components/              # 7 个组件
│   ├── AppHeader.vue, LessonContent.vue, LessonSidebar.vue
│   ├── CodeEditor.vue, LivePreview.vue, PlayerFooter.vue, Resizer.vue
├── composables/
│   ├── useCodePreview.ts    # 组合 HTML/CSS/JS → iframe srcdoc
│   ├── useKeyboardNav.ts    # 左右箭头键导航
│   └── usePanelResize.ts    # 三栏拖动缩放（localStorage 持久化宽度）
├── utils/markdown.ts        # 轻量 Markdown 解析器（行内 + 块级 + 术语提示包装）
└── styles/
    ├── variables.css        # CSS 自定义属性（色彩、字体、间距、动画变量）
    └── global.css           # 全局样式、reset、keyframes、Vue Transition 类
```

## 关键设计

### 学习模式

`Lesson.mode` / `Project.mode` 支持两种模式：
- **`sandbox`**（默认）：显示在线编辑器 + 实时预览，用户在浏览器中写代码
- **`local`**：隐藏编辑器/预览，引导学习者在本地 IDE 操作（"登台篇"课程使用）

### 用户代码不持久化

每次切换课程/项目步骤时，`userCode` 从 `starterCode` 重新初始化。仅学习完成状态（`completed`）存入 localStorage。

### CSS 系统

- `variables.css` 定义 `:root` 色板（古典乐谱风格：米白 `#FBF7F0`、深棕 `#3D2B1F`、暗红 `#8B2E2E`、金色 `#C9A96E`）
- `global.css` 提供 reset、Vue Transition 类（`slide-fade`、`editor-swap`）、共享 keyframes（`reveal-up`、`pulse-glow`）、`.reveal-target` 动画
- 所有组件使用 `<style scoped>` 纯 CSS
- 动画变量：`--dur-fast/normal/slow`、`--ease-out/in/in-out/spring`，`@media (prefers-reduced-motion)` 下归零

### 首页动画

- 轨道卡片 / 项目卡片：`reveal-up` + 错落 `animation-delay`（`backwards` fill）
- 筚路蓝缕卡片：无入场动画，`:hover` 提升 + `:active scale(0.96)` 按压
- 轨道卡片展开/收起：CSS `max-height` + `opacity` 过渡

### 详情页内容揭示

`.reveal-target` 类在 `LessonContent.vue` 的教学段落上使用纯 CSS `reveal-up` animation + 错落 `animation-delay`，进入页面自动依次播放，无需 JS。

## 注意事项

- 部署基础路径 `/my-learn-web/`，创建路由时无需额外处理（`createWebHistory('/my-learn-web/')`）
- 课程数据版本号 `DATA_VERSION` 在 `stores/progress.ts`，修改课程数据后递增可自动清空旧缓存
- CodeMirror 编辑器通过销毁+重建方式切换语言标签（非动态扩展），配合 `editor-swap` Transition
- 首页 `.home` 是自滚动容器（`overflow-y: auto; height: 100%`），非 window 滚动
- `<Transition>` 与 `<keep-alive>` 组合时需去掉 `mode="out-in"`，否则 keep-alive 不生效
