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
  generated/           # build-content.ts 编译产物（勿手改）
  content-loaders/     # 运行时内容加载（含按需加载）
  content-runtime/     # 结构化正文渲染器与类型
  views/               # Home / Lesson / Project / Quiz / Plan
  components/          # UI 组件（含 home/ 分区）
  composables/         # 组合式逻辑
  features/plan/       # 学习计划数据生成
  stores/              # Pinia stores（progress / quiz / projectProgress / plan）
  styles/              # 全局样式与设计变量
  utils/               # storage / shareCode / text / errorGuard
  __tests__/           # Vitest 测试
scripts/
  build-content.ts     # 内容编译脚本（增量编译）
```

## 常用命令

```bash
yarn install          # 安装依赖（必须用 yarn，锁文件为 yarn.lock）
yarn dev              # 开发（先编译内容，再启动 Vite）
yarn build:content    # 编译 src/content/** 为 src/generated/** JSON
yarn build            # 生产构建（含类型检查）
yarn preview          # 预览构建产物
yarn test             # 运行单测
yarn lint             # ESLint
```

> 包管理器固定为 Yarn 1（classic），见 `package.json` 的 `packageManager` 字段；请勿混用 npm，避免产生重复锁文件。

## 内容系统

- 内容源位于 `src/content/**`
- 构建脚本 `scripts/build-content.ts` 会把内容编译到 `src/generated/**`
- 课程正文使用 Markdown + directive block 语法
- 运行时由 `src/content-runtime/renderers/*` 渲染

## 开发说明

- `yarn dev` 会先执行一次内容编译，再启动 Vite
- 内容热更新由 `vite.config.ts` 中的自定义 `contentWatchPlugin()` 负责
- `src/generated/**` 是构建产物，不要手动修改
- 路由基础路径固定为 `/my-learn-web/`

## 测试

```bash
yarn test
```

当前测试覆盖核心逻辑、内容完整性、导航、测验 store 与内容热更新辅助逻辑。
