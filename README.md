# 代码乐章

一个用音乐类比讲解 Web 前端开发的互动式学习网站。

## 技术栈

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- CodeMirror 6
- Vitest

## 项目结构

```text
src/
  content/             # 课程 / 项目 / 术语 / quiz 内容源
  generated/           # build-content.ts 编译产物
  content-loaders/     # 运行时内容加载
  content-runtime/     # 结构化正文渲染器与类型
  views/               # Home / Lesson / Project / Quiz
  components/          # UI 组件
  composables/         # 组合式逻辑
  stores/              # Pinia stores
  styles/              # 全局样式与设计变量
scripts/
  build-content.ts     # 内容编译脚本
```

## 常用命令

```bash
npm run dev
npm run build:content
npm run build
npm run preview
npm run test
```

## 内容系统

- 内容源位于 `src/content/**`
- 构建脚本 `scripts/build-content.ts` 会把内容编译到 `src/generated/**`
- 课程正文使用 Markdown + directive block 语法
- 运行时由 `src/content-runtime/renderers/*` 渲染

## 开发说明

- `npm run dev` 会先执行一次内容编译，再启动 Vite
- 内容热更新由 `vite.config.ts` 中的自定义 `contentWatchPlugin()` 负责
- `src/generated/**` 是构建产物，不要手动修改
- 路由基础路径固定为 `/my-learn-web/`

## 测试

```bash
npm run test
```

当前测试覆盖核心逻辑、内容完整性、导航、测验 store 与内容热更新辅助逻辑。
