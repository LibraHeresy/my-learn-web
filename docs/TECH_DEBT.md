# 技术债清单与解决方案（TECH DEBT）

本文件记录代码乐章（my-learn-web）项目已知的技术债、已完成的清理，以及每个待办项的**具体解决方案**。供开发者与 AI 编码工具在后续迭代中参考；解决某项后请同步更新本文件。

> 维护约定：新增技术债时按优先级（P0 安全 / P1 数据正确性 / P2 性能 / P3 质量）登记，附上解决方案。

## 一、已解决（存档）

| 类别 | 内容 | 解决方式 |
|---|---|---|
| P0 安全 | `.env` 含真实 DeepSeek API key 并被 git 跟踪、内联进前端 bundle | 撤销 key、`.gitignore` 忽略 `.env`、删除 `.env`/`.env.example`、`git rm --cached` |
| P1 数据 | `glossary/terms.yaml` 18 处 YAML 特殊字符未引号化，导致术语表编译为 `[]`、术语注入失效 | 补引号（含 `: `、`!`、`@`、布尔/null 字面量），恢复 518 个术语 |
| P1 数据 | 术语表 10 个重复 key（作用域/Promise/CORS/DOM 等） | 行级去重，保留字段更完整条目 |
| P1 数据 | `estimatedMinutes` 全部为 0，学习计划显示 0 分钟 | 按内容复杂度批量估算（阅读块/步骤/代码围栏加权），118 个课程补齐 |
| P1 数据 | 旧项目格式死内容 `projects/fundamentals/music-showcase`（GBK 乱码、从未编译） | 删除目录，构建管线本就是单轨 |
| P2 性能 | quiz 题库 947KB 全量进 bundle（quiz chunk 693KB） | 按 gem 拆分 `quiz-gems.json` + `quiz-questions/{gemId}.json`，store 改异步按需加载；chunk 降至 15KB |
| P2 性能 | 搜索索引 156KB 静态 import 进首屏主 bundle | `GlobalSearch` 改为打开搜索框时动态 `import()` |
| P2 性能 | 构建 chunk 超 500KB 警告 | `chunkSizeWarningLimit: 550`（CodeEditor/CodeMirror 合理体积） |
| P3 架构 | 死代码：`useNotes`、`vocabulary` store、`listen-to` block 兼容层、5 个一次性脚本、`MusicAnalogyBlock` | 全部删除（-2000+ 行） |
| P3 架构 | git 垃圾：56 个失效 worktree 元数据、59 个旧分支、双锁文件 | 清理 worktree/分支；锁定 yarn classic 为唯一包管理器（删 `package-lock.json`） |
| P3 架构 | 站内 AI 助手（选中解释/追问）已弃用 | 整体移除（组件/composable/service/types/.env/文档） |
| P3 质量 | `docs/CLAUDE.md` 过时（错误 block 名、缺失模块、错误测试清单） | 重写并同步最新架构；Wave 迭代注释清理 |
| P3 质量 | `index.html` 缺 SEO 元信息 | 补 `description` / `og:*` / `theme-color` |
| P3 质量 | `usePanelResize` 无测试 | 新增 8 个单测（默认值/恢复/版本/非法数据/拖拽/边界） |
| P3 质量 | `deploy.yml`：`npm ci` 重复 build:content、无缓存、单 job、无测试 | `yarn install --frozen-lockfile` + 缓存 `src/generated` + 拆分 build/deploy + lint/test + `workflow_dispatch` |

## 二、待解决（按优先级）

### P2-1 依赖 major 升级（风险：破坏性变更，需单独评估）
当前版本落后于最新 major，**不建议直接升级**，升级需逐个进行并在升级后跑全量测试 + 手动回归：

| 依赖 | 当前 | 最新 | 升级要点 |
|---|---|---|---|
| `pinia` | 3.0.4 | 4.x | 检查 setup store 写法是否兼容；4.x 要求 Vue 3.5+（已满足） |
| `vue-router` | 4.6.4 | 5.x | 检查路由守卫/懒加载 API 变化；history 创建方式 |
| `typescript` | 6.0.x | 7.x | 严格性新检查项可能暴露类型错误；先跑 `vue-tsc -b` |
| `@types/node` | 24.x | 26.x | 低风险，随 Node 24 CI 环境同步 |

**建议步骤**：逐依赖升级（每次一个）→ `yarn install --frozen-lockfile` → `yarn typecheck` → `yarn test` → `yarn build` → 手动回归首页/课程/测验/计划页。

### P3-1 iOS PWA 图标缺失
`vite-plugin-pwa` manifest 仅提供 SVG 图标，iOS 主屏添加需要 180×180 PNG（`apple-touch-icon`）。

**解决方案**：生成 `public/apple-touch-icon.png`（180×180，使用当前 favicon 风格），并在 `index.html` 添加：
```html
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```
同时可在 manifest `icons` 中补充 `192x192`/`512x512` PNG（PWA 安装要求）。

### P3-2 课程页面大数据量渲染（观察项）
首页一次性渲染 112 门课程卡片（`HomeJourneySection` 等），当前量级性能无碍；若课程数持续增长（>300），再考虑 `v-for` + `v-memo` 或虚拟滚动。**暂不处理**。

### P3-3 构建产物体积（已大幅优化，剩余观察项）
- 主 bundle `index` 约 295KB（gzip ~117KB）：Vue 核心 + AppHeader + 路由；搜索索引移出后已显著减小
- `CodeEditor` chunk 约 522KB（gzip ~182KB）：CodeMirror 6 本体，已按需加载；如需再降可评估按 tab 动态加载语言包，收益有限
- prettier 格式化相关 4 个 chunk（babel/estree/html/postcss）共约 820KB：仅在点击格式化时加载，接受

### P3-4 测试覆盖缺口（低优先）
- `useCodePreview`（previewSrc 构建/错误注入）无直接单测
- `useAiAssistant` 已删除；`useFocusTrap`/`useScrollLock` 为 DOM 辅助，jsdom 下收益低
- 计划中的新增：`useCodePreview` 核心逻辑（srcdoc 组装）值得补测

## 三、约定提醒（与 CLAUDE.md 一致）

- **包管理器**：Yarn 1（classic，`packageManager: yarn@1.22.22`），锁文件 `yarn.lock`，勿混用 npm
- **内容编译**：`src/generated/**` 是构建产物，勿手改；改内容/编译脚本后跑 `yarn build:content`
- **密钥**：`.env` 禁止提交；`VITE_` 前缀变量会内联进 bundle，勿放生产凭据
- **Node 版本**：`.nvmrc` = 24（CI 用 `node-version-file`），本地满足 `engines.node >=22` 即可
- **提交规范**：遵循 `fix:` / `feat:` / `perf:` / `chore:` / `docs:` / `content:` 前缀 + 中文描述
