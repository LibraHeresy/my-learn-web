# AI 友好的课程内容架构方案与重构路线图

## 1. 背景与目标

当前项目已经具备较完整的课程、项目、测验、在线编辑器和实时预览能力，但在内容生产与维护层面，逐渐暴露出以下问题：

- 课程内容集中在大型 `TypeScript` 配置文件中，单次修改上下文过大。
- AI 修改课程时，需要读取大量无关代码，容易突破上下文限制。
- 自写 Markdown 解析链路越来越复杂，边界场景频繁出错。
- 批量添加教学组件或统一调整课程结构不方便。
- 起始代码以字符串形式内嵌在配置中，不利于维护、对比和 AI 编辑。

本方案的目标不是继续修补现有内容体系，而是将项目重构为一套 **AI 友好、局部可编辑、可校验、可扩展** 的课程内容架构。

本方案基于以下已确认前提：

- 保持 `纯 Vue + Vite`
- `在线编辑器 / 实时预览` 继续作为核心能力
- 课程内容优先采用 `Markdown`
- 未来 AI 的主要工作方式是 `改单个课程文件`
- 可接受 `一次较大重构`
- 共享内容策略为 `问题三 A`：只复用小块，不复用整段正文
- 演进策略为 `问题四 A`：只做中文版单路径，不为多语言/多版本承担额外复杂度

---

## 2. 总体结论

推荐将现有内容系统从：

- `大 TS 配置文件 + 自写 Markdown 运行时解析 + 内容与实现耦合`

重构为：

- `单课目录化内容仓库 + Markdown 正文 + YAML 元数据 + starter 文件 + 构建期编译 + Vue 运行时渲染`

一句话概括：

> 一节课就是一个独立目录，正文用 Markdown 写，结构用固定内容块表达，starter code 用真实文件保存，构建时编译为标准 JSON，运行时由 Vue 白名单组件渲染。

---

## 3. 核心设计原则

### 3.1 单课即边界

一节课的内容、元数据、起始代码、资源文件必须集中放在同一个目录中，AI 修改一节课时原则上不需要读取其他课程文件。

### 3.2 内容与实现分离

- 课程正文只描述教学内容与结构
- Vue 组件只负责视觉呈现与交互
- 不允许课程作者在正文中任意写业务组件实现细节

### 3.3 构建期处理优先

Markdown、术语、高亮、教学块等内容增强都应在构建期完成，浏览器运行时不再承担复杂解析责任。

### 3.4 固定块协议优先于任意组件嵌入

不开放任意 Vue 组件直接嵌入课程正文，而是定义少量稳定的“内容块协议”，让 AI 和作者只需要掌握固定语法。

### 3.5 局部可编辑、全局可校验

虽然每节课是局部编辑单元，但整站仍应具备统一的自动检查能力，例如：

- 元数据完整性
- 课程顺序与索引合法性
- 块语法合法性
- 资源文件存在性
- glossary 引用合法性

---

## 4. 推荐目录结构

```text
content/
  lessons/
    fundamentals/
      html-basics/
        html-intro/
          meta.yaml
          lesson.md
          starter/
            index.html
            style.css
            script.js
          assets/
            hero.png

  projects/
    music-showcase/
      meta.yaml
      project.md
      starter/
        index.html
        style.css
        script.js
      assets/
        cover.png

  glossary/
    terms.yaml

  templates/
    lesson/
      meta.yaml
      lesson.md
      starter/
        index.html
        style.css
        script.js

src/
  content-runtime/
    renderers/
    block-registry.ts
    types.ts

  generated/
    lessons-index.json
    projects-index.json
    glossary.json

scripts/
  build-content.ts
  migrate-lessons-to-content.ts

docs/
  lesson-authoring.md
  block-spec.md
```

---

## 5. 内容模型设计

### 5.1 一节课的组成

每节课由四部分构成：

1. `meta.yaml`
2. `lesson.md`
3. `starter/`
4. `assets/`

#### 5.1.1 `meta.yaml`

只存结构化元数据，不存长正文。

建议字段：

```yaml
id: html-intro
title: 认识 HTML - 你的第一行代码
track: fundamentals
chapter: html-basics
order: 1
mode: sandbox
listenTo: 巴赫《C大调前奏曲》BWV 846
musicAnalogy: HTML 就像五线谱，它决定页面上有什么内容。
tags:
  - html
  - beginner
estimatedMinutes: 12
```

字段说明：

- `id`: 全站唯一课程 ID
- `title`: 课程标题
- `track`: 所属学习轨道
- `chapter`: 所属章节
- `order`: 在章节内的顺序
- `mode`: `sandbox | local`
- `listenTo`: 推荐聆听
- `musicAnalogy`: 音乐类比
- `tags`: 课程标签
- `estimatedMinutes`: 预计学习时长

#### 5.1.2 `lesson.md`

只存课程正文，正文使用 Markdown 与自定义教学块指令。

#### 5.1.3 `starter/`

存在线编辑器与实时预览所需的起始文件。

建议第一版固定三文件：

- `index.html`
- `style.css`
- `script.js`

后续如需支持多文件 playground，可再扩展。

#### 5.1.4 `assets/`

存课程相关图片、插图、示意图等资源。

---

## 6. 内容格式策略

### 6.1 主体格式

推荐：

- 主体采用 `Markdown`
- 结构增强采用 `remark-directive` 风格的块语法
- 不建议第一版直接重度采用 `MDX`

### 6.2 不推荐重度 MDX 的原因

MDX 虽然强大，但对于本项目这种“内容优先、AI 频繁修改”的场景，有几个明显缺点：

- 容易把正文写成“半组件代码”
- 课程文件中混入过多实现细节
- AI 修改时更容易破坏 JSX/组件语法
- 作者写作门槛明显提高

### 6.3 推荐块语法示例

```md
# 认识 HTML

::music-analogy
HTML 就像五线谱，它决定页面上有什么内容。
::

::explain{title="什么是 HTML？"}
HTML 是网页的骨架。
::

::example{title="看一个例子"}
```html
<h1>你好，音乐世界！</h1>
<p>我开始了我的编程之旅。</p>
```
::

::task{title="动手试试"}
:::step{purpose="体验修改即反馈" expected="标题立即变化"}
把 `<h1>` 改成你自己的名字。
:::

:::step{purpose="练习新增元素" expected="页面多出一段文字"}
再添加一个 `<p>` 标签。
:::
::

::listen-to
巴赫《C大调前奏曲》
::
```

这种语法具备以下优势：

- 结构稳定
- 局部块边界清晰
- AI 易于生成与修改
- 不需要理解 Vue 组件内部实现

---

## 7. 白名单内容块设计

第一版建议只开放白名单块，不开放任意组件。

### 7.1 推荐支持的内容块

- `music-analogy`
- `explain`
- `example`
- `task`
- `step`
- `hint`
- `listen-to`
- `callout`
- `tabs`
- `compare`
- `code-group`
- `file-tree`

### 7.2 块职责说明

#### `music-analogy`

用于课程开头或重要段落的音乐类比提示。

#### `explain`

标准解释性正文块，可带标题。

#### `example`

用于展示示例代码或例子说明。

#### `task`

用于承载练习任务，一般内部包含多个 `step`。

#### `step`

任务中的单步骤，支持：

- `purpose`
- `expected`

#### `hint`

用于提示、启发或补充说明。

#### `listen-to`

统一推荐聆听信息的视觉呈现。

#### `callout`

用于注意事项、警告、总结等卡片块。

#### `tabs`

用于同一主题下多视角展示，例如：

- HTML / CSS / JS
- 错误写法 / 正确写法

#### `compare`

用于并排对比两个概念或版本。

#### `code-group`

用于组织多段相关代码。

#### `file-tree`

用于展示课程中的文件结构或项目结构。

### 7.3 关键约束

- 作者和 AI 只写块语法，不直接 import Vue 组件
- Vue 运行时通过 `block-registry.ts` 映射块名到渲染器
- 视觉和交互以后变更，只改渲染层，不改所有课程正文

---

## 8. 在线编辑器与实时预览如何融入新架构

由于在线编辑器和实时预览是项目核心能力，因此内容架构必须围绕这一点设计，而不是绕开它。

### 8.1 当前痛点

现有起始代码内嵌在 TS 配置对象中，带来以下问题：

- 字符串转义复杂
- diff 不清晰
- AI 不擅长稳定修改长字符串
- 代码与课程正文耦合在一起

### 8.2 新方案

将起始代码拆为真实文件：

```text
starter/
  index.html
  style.css
  script.js
```

### 8.3 好处

- AI 改代码时更自然
- Git diff 更清晰
- 支持未来多文件 playground
- 课程正文与起始代码职责分离

### 8.4 运行时消费方式

构建期读取 `starter/*`，将其编译为可供编辑器使用的标准结构：

```json
{
  "starter": {
    "html": "<h1>...</h1>",
    "css": "body { ... }",
    "js": "console.log(...)"
  }
}
```

Vue 课程页保持现有编辑器与预览机制，但数据来源不再是 `lessons.ts` 中的大字符串。

---

## 9. 术语系统重构方案

### 9.1 现状问题

当前术语增强与 Markdown 解析混合在一起，逻辑耦合严重，边界场景容易出错。

### 9.2 建议方案

术语表独立文件化：

```yaml
- key: HTML
  explanation: HTML 是网页的结构语言
  analogy: 就像五线谱决定有哪些音符
```

路径建议：

```text
content/glossary/terms.yaml
```

### 9.3 处理方式

术语识别在构建期完成，不在浏览器里做运行时字符串替换。

构建时跳过：

- 围栏代码块
- 行内代码
- 链接
- 手动排除区域

编译结果可生成稳定节点，例如：

```json
{
  "type": "term",
  "key": "HTML",
  "text": "HTML"
}
```

运行时 Vue 只负责把 `term` 节点渲染为 tooltip 组件。

### 9.4 效果

- 术语增强更稳定
- 测试更容易写
- 不会再继续扩大 Markdown 运行时解析复杂度

---

## 10. 构建期编译链设计

### 10.1 原则

不要继续维护“整套私有 Markdown 解析器”，而是基于成熟生态搭建小插件体系。

### 10.2 推荐基础库

- `remark-parse`
- `remark-gfm`
- `remark-frontmatter`
- `remark-directive`
- `rehype-*`

### 10.3 项目自定义插件

只保留项目特有的小插件：

- `remarkLessonBlocks`
- `remarkGlossary`
- `remarkCodeTeaching`

### 10.4 编译产物

不直接输出 HTML 字符串，建议输出标准化 JSON 文档树。

示例：

```json
{
  "id": "html-intro",
  "meta": {
    "title": "认识 HTML - 你的第一行代码",
    "track": "fundamentals"
  },
  "body": [
    {
      "type": "heading",
      "depth": 1,
      "text": "认识 HTML"
    },
    {
      "type": "music-analogy",
      "children": [
        { "type": "text", "value": "HTML 就像五线谱..." }
      ]
    }
  ],
  "starter": {
    "html": "<h1>...</h1>",
    "css": "body {...}",
    "js": "..."
  }
}
```

### 10.5 为什么推荐 JSON 中间层

- 比 `v-html` 更安全更可控
- 比运行时 Markdown 解析更轻
- 更适合 schema 校验
- 更适合测试快照
- 更适合 AI 理解结构

---

## 11. Vue 运行时职责重构

### 11.1 运行时应做什么

- 根据课程 ID 加载已生成的课程 JSON
- 根据块类型调用对应 Vue 渲染器
- 管理在线编辑器、预览、导航、进度、交互逻辑

### 11.2 运行时不应再做什么

- 不直接解析 Markdown 原文
- 不做复杂术语替换
- 不通过字符串猜测结构
- 不承担内容修复逻辑

### 11.3 推荐模块

#### `src/content-runtime/types.ts`

定义标准文档树类型。

#### `src/content-runtime/block-registry.ts`

维护块名到 Vue 组件的映射关系。

#### `src/content-runtime/renderers/`

每种白名单块一个独立 Vue 渲染器。

---

## 12. AI 工作流设计

### 12.1 新建课程

AI 基于 `content/templates/lesson/` 生成一节新课目录。

### 12.2 修改课程

AI 默认只读取：

- `meta.yaml`
- `lesson.md`
- `starter/*`

除非明确要求，否则不读取整站其他课程与解析器代码。

### 12.3 修改教学块

AI 只允许在固定 directive 语法内编辑，不直接写实现组件。

### 12.4 修改 starter code

AI 只修改 `starter/` 中真实文件。

### 12.5 修改视觉或交互

AI 修改 `src/content-runtime/renderers/` 或 block registry，而不是修改课程正文。

### 12.6 收益

- 内容修改上下文大幅缩小
- 失败范围局限于单课目录
- AI 更容易遵守格式
- 编辑路径明确，不容易误伤全局逻辑

---

## 13. 内容复用策略

由于已确认采用 `问题三 A`，因此第一版内容复用应刻意保持克制。

### 13.1 推荐复用对象

- 注意事项卡片
- 总结卡片
- 易错点卡片
- 文件树展示块
- 短提示片段

### 13.2 不建议第一版做的复用

- 引用整段正文
- 课程正文 include
- 跨课共享完整讲解段落

### 13.3 原因

大段正文复用会显著增加：

- 编辑边界复杂度
- 引用关系复杂度
- AI 误改共享源的风险

当前最优策略是：

> 共享小块，共享样式，共享渲染器，不共享大段正文。

---

## 14. 第一版明确不做的内容

为了保证重构聚焦，以下能力建议明确不进入第一版：

- 多语言
- 多版本课程
- 多学习路径复用
- 数据库 CMS
- 任意 Vue 组件嵌入 Markdown
- 运行时 Markdown 主解析链
- 继续扩展现有自写 parser

---

## 15. 重构路线图

下面这份路线图会作为后续“严格执行”的阶段划分依据。阶段数的设计目标是：

- 单阶段改动范围足够小，避免 AI 需要同时理解过多文件与上下文
- 单阶段可以独立验收与回滚，避免一次性大爆炸迁移
- 单阶段产出可持续集成验证，保证每步都能稳定前进

### 15.1 严格执行规则（所有阶段通用）

- 不进入下一阶段，除非当前阶段的验收标准全部通过
- 每个阶段结束都必须跑一遍最小验证：类型检查 + 单测（或至少不增加诊断）
- 每个阶段变更必须可回滚：功能开关或并行新旧链路
- 每个阶段只允许引入“必要依赖”，禁止为了未来可能性提前引入复杂系统
- 每个阶段结束都要更新本文件对应阶段为“已完成”，并记录实际偏差

### 15.2 阶段划分（P0 - P9）

为便于严格执行，后续以 P0..P9 作为阶段编号。

#### P0：基线与开关（不动内容）

状态：已完成

目标：

- 增加新内容链路的 Feature Flag，保证新旧系统可并行
- 明确构建脚本挂载点，但不实现编译器、不迁移任何课程

交付物：

- Feature flag 约定（默认启用；可通过 `VITE_CONTENT_V2=0` 禁用）
- 运行时内容加载入口的空实现（返回“未启用”）

实际交付物清单：

- `src/router/index.ts` 增加占位页路由 `/_content-v2`
- `src/views/ContentV2Placeholder.vue` 新内容占位页
- `src/content-v2/feature.ts` Feature Flag 读取
- `src/content-v2/lessons.ts` 新内容加载入口空实现（返回 null）

验收标准：

- 默认不启用时，行为与现状完全一致
- 启用开关时，至少能进入一个“新内容占位页”，不影响旧页面

验收方式（可重复执行）：

- 关闭开关：
  - 设置环境变量 `VITE_CONTENT_V2=0`
  - 正常启动后访问首页、课程、项目、测验，行为应回到旧链路
- 开启/启用开关（如需显式启用）：
  - 设置环境变量 `VITE_CONTENT_V2=1`（默认也会启用）
  - 启动开发服务器
  - 访问路径 `/my-learn-web/_content-v2`，应看到 “V2 已启用” 的占位提示

回滚方式：

- 删除环境变量或设为 `0/false` 即可关闭新链路

实际偏差与原因：

- 为保证阶段最小验证（单测）通过，本阶段额外修复了 Markdown 工具函数中“URL 自动链接被术语包裹打断”的问题（调整内联管道顺序）。该修复不改变课程结构与内容源，仅修正既有行为与测试期望的偏差。

#### P1：内容目录骨架 + 模板（不接入运行时）

状态：已完成

目标：

- 创建 `content/` 目录体系与 `templates/lesson/` 模板
- 明确 `meta.yaml` 字段集合（第一版锁定字段，不扩展）

交付物：

- `content/templates/lesson/*`
- `content/glossary/terms.yaml` 空骨架
- `docs/lesson-authoring.md` 与 `docs/block-spec.md`（第一版最小块集合）

实际交付物清单：

- `content/templates/lesson/meta.yaml`
- `content/templates/lesson/lesson.md`
- `content/templates/lesson/starter/index.html`
- `content/templates/lesson/starter/style.css`
- `content/templates/lesson/starter/script.js`
- `content/glossary/terms.yaml`
- `docs/lesson-authoring.md`
- `docs/block-spec.md`

验收标准：

- 目录与模板可复制生成一节新课（人工复制也可）
- 文档描述的字段与块语法能够自洽，不出现“实现还没定”的悬空点

验收方式（可重复执行）：

- 复制 `content/templates/lesson/` 为 `content/lessons/fundamentals/html-basics/<lessonId>/`
- 修改 `meta.yaml` 的 `id/title/chapter/order`
- 确认 `lesson.md` 只使用白名单块语法（见 `docs/block-spec.md`）

回滚方式：

- 直接删除新增的 `content/` 与 `docs/` 文件，不影响现有运行时代码

#### P2：构建期编译器 MVP（只编译 1 节课）

状态：已完成

目标：

- 实现 `scripts/build-content.ts` 的最小可行版本
- 只支持：读取 `meta.yaml` + `lesson.md` + `starter/*`，输出单课 JSON
- 此阶段不做术语注入，不做复杂块，仅把块识别为结构节点

交付物：

- `scripts/build-content.ts`
- `src/generated/lessons-index.json`（可先只包含 1 节课）
- `src/content-runtime/types.ts`
- `content/lessons/fundamentals/html-basics/html-intro/*`（首个样板课）

实际交付物清单：

- `scripts/build-content.ts`
- `src/generated/lessons-index.json`
- `src/content-runtime/types.ts`
- `content/lessons/fundamentals/html-basics/html-intro/meta.yaml`
- `content/lessons/fundamentals/html-basics/html-intro/lesson.md`
- `content/lessons/fundamentals/html-basics/html-intro/starter/index.html`
- `content/lessons/fundamentals/html-basics/html-intro/starter/style.css`
- `content/lessons/fundamentals/html-basics/html-intro/starter/script.js`
- `package.json` 新增 `build:content` 脚本

验收标准：

- 本地执行构建脚本可稳定产出 JSON（结果一致、可重复）
- JSON 结构满足 `src/content-runtime/types.ts` 的类型定义（下一阶段会加入）

验收方式（可重复执行）：

- 运行 `npm run build:content`
- 预期输出：`Compiled 1 lesson(s) to src\generated\lessons-index.json`
- 打开生成文件，确认包含：
  - `contentSchemaVersion: 1`
  - `meta`
  - `body`
  - `starter`
  - `assets`

回滚方式：

- 删除 `content/lessons/fundamentals/html-basics/html-intro/`
- 删除 `src/generated/lessons-index.json`
- 删除 `scripts/build-content.ts`
- 删除 `src/content-runtime/types.ts`
- 删除 `package.json` 中 `build:content` 脚本

已知边界（P2 刻意不做）：

- 不做术语注入
- 不做完整 Markdown AST
- 不做复杂块编译，仅识别标题、段落、白名单块，以及 `task -> step` 最小结构

#### P3：运行时渲染 MVP（只渲染 3-5 种块）

状态：已完成

目标：

- 定义运行时文档树类型
- 实现最小块渲染器集合，先覆盖最核心阅读体验

第一版块范围（建议锁定 5 个）：

- `music-analogy`
- `explain`
- `example`
- `task`（含 `step`）
- `listen-to`

交付物：

- `src/content-runtime/types.ts`
- `src/content-runtime/block-registry.ts`
- `src/content-runtime/renderers/*`（只实现上述块）

实际交付物清单：

- `src/content-runtime/block-registry.ts`
- `src/content-runtime/renderers/DocumentRenderer.vue`
- `src/content-runtime/renderers/InlineText.vue`
- `src/content-runtime/renderers/text.ts`
- `src/content-runtime/renderers/MusicAnalogyBlock.vue`
- `src/content-runtime/renderers/ExplainBlock.vue`
- `src/content-runtime/renderers/ExampleBlock.vue`
- `src/content-runtime/renderers/TaskBlock.vue`
- `src/content-runtime/renderers/ListenToBlock.vue`
- `src/content-runtime/renderers/UnsupportedBlock.vue`
- `src/content-v2/lessons.ts`（从生成 JSON 读取样板课）
- `src/views/ContentV2Placeholder.vue`（接入第一节样板课渲染）

验收标准：

- 能把编译产物 JSON 渲染成可读页面（不追求最终样式）
- 不使用运行时 Markdown 解析主链（禁止回到字符串拼 HTML）

验收方式（可重复执行）：

- 运行 `npm run build`
- 设置环境变量 `VITE_CONTENT_V2=1`（默认也会启用）
- 启动开发服务器并访问 `/my-learn-web/_content-v2`
- 预期结果：
  - 页面展示样板课标题、音乐类比、解释块、示例代码块、任务步骤、推荐聆听
  - 页面内容来自 `src/generated/lessons-index.json`
  - 运行时不依赖旧 `markdown.ts` 的字符串拼 HTML 主链

回滚方式：

- 删除 `src/content-runtime/block-registry.ts`
- 删除 `src/content-runtime/renderers/*`
- 将 `src/content-v2/lessons.ts` 恢复为空实现
- 将 `src/views/ContentV2Placeholder.vue` 恢复为纯占位页

实际偏差与原因：

- 为完成阶段构建验收，额外清理了 `src/views/QuizPage.vue` 中两处未使用代码（`goLesson` 与 `router`），这是已有构建阻塞项，不改变业务行为。

已知边界（P3 刻意不做）：

- 只支持 5 个核心块，其他白名单块会走 `UnsupportedBlock`
- 不做术语 Tooltip
- 不做编辑器 / 预览接入
- 不做旧课程页切换到新内容源

#### P4：新内容链路接入页面（仍只支持 1 节课）

状态：已完成

目标：

- 在路由层或课程页入口处接入“新内容来源”
- 通过 Feature Flag 决定是否走新链路

交付物：

- 新内容课程页（可与旧课程页并存，或同页分支渲染）
- ID 路由到新 JSON 的映射逻辑

实际交付物清单：

- `src/views/LessonV2Player.vue` 新内容课程页（最小版）
- `src/router/index.ts` 增加 `lesson-v2` 路由与 `beforeEach` 分流逻辑
- `src/content-v2/lessons.ts` 增加 `hasLessonV2` 用于路由分流判断

验收标准：

- 关闭开关：100% 走旧链路
- 开启开关：指定 1 节课走新链路，其他仍走旧链路

验收方式（可重复执行）：

- 运行 `npm run build` 确认构建通过
- 关闭开关：
  - 不设置 `VITE_CONTENT_V2`
  - 访问 `/my-learn-web/lesson/html-intro` 应走旧课程页（若旧链路存在该课则正常显示）
- 开启/启用开关（如需显式启用）：
  - 设置 `VITE_CONTENT_V2=1`（默认也会启用）
  - 访问 `/my-learn-web/lesson/html-intro` 应自动跳转到 `/my-learn-web/lesson-v2/html-intro`
  - 访问任意旧课 ID（不在 V2 生成 JSON 中）仍走旧课程页

回滚方式：

- 移除 `router.beforeEach` 分流逻辑与 `lesson-v2` 路由
- 删除 `src/views/LessonV2Player.vue`

#### P5：在线编辑器/预览接入新 starter 文件（只支持 1 节 sandbox 课）

状态：已完成

目标：

- 将新课的 `starter/index.html|style.css|script.js` 接入现有 CodeEditor + LivePreview
- 不改变现有编辑器交互与预览机制，只替换数据来源

交付物：

- 新链路下的 `starter` 加载与注入（与旧版 `starterCode` 并行）

验收标准：

- 新链路 sandbox 课可以编辑/运行/预览，错误提示链路不退化
- 旧链路课程不受影响

实际交付物清单：

- `src/views/LessonV2Player.vue` 增加 CodeEditor + LivePreview 面板（仅 sandbox）

验收方式（可重复执行）：

- 执行 `npm run build:content`
- 设置 `VITE_CONTENT_V2=1`
- 启动开发服务器并访问 `/my-learn-web/lesson/html-intro`（应自动分流到 V2）
- 在编辑器中修改 HTML/CSS/JS，点击运行，预览应更新

#### P6：术语系统迁移为构建期（只对新链路生效）

状态：已完成

目标：

- 将术语注入从运行时处理迁移到构建期
- 新链路渲染时只消费结构化 `term` 节点

交付物：

- `content/glossary/terms.yaml` 具备最小可用术语集（可先迁移少量）
- 编译器增加 glossary 注入插件（跳过代码块/行内代码/链接）

实际交付物清单：

- `scripts/build-content.ts` 增加 glossary 读取、生成与 term 标记注入
- `src/generated/glossary.json` 生成产物
- `src/content-v2/glossary.ts` 新链路 glossary 读取接口
- `src/content-runtime/renderers/TermTip.vue` 新链路 tooltip 组件
- `src/content-runtime/renderers/InlineText.vue` 支持 `{{term:<key>}}` 标记渲染 tooltip

验收标准：

- 新链路页面术语 tooltip 可用且稳定
- 代码块与行内代码不被误注入

验收方式（可重复执行）：

- 执行 `npm run build:content`
- 访问 `/my-learn-web/lesson/html-intro`（默认会走 V2；如需显式启用可设置 `VITE_CONTENT_V2=1`）
- 在正文中悬停术语（例如 HTML），应显示解释与类比
- 检查生成文件 `src/generated/lessons-index.json` 中存在 `{{term:HTML}}`

#### P7：样板迁移扩展（3 节普通课 + 1 节 sandbox 课 + 1 个项目）

状态：已完成

目标：

- 扩展编译与运行时覆盖范围
- 用小样本验证“课程结构多样性”和“项目步骤渲染”

交付物：

- 新链路下的 3 节普通课目录
- 新链路下的 1 节 sandbox 课目录
- 新链路下的 1 个项目目录

实际交付物清单：

- 课程样板：
  - `content/lessons/fundamentals/html-basics/html-intro`（sandbox）
  - `content/lessons/fundamentals/html-basics/html-elements`（local）
  - `content/lessons/fundamentals/html-basics/html-links`（local）
- 项目样板：
  - `content/projects/fundamentals/music-showcase`（local）
- 编译产物：
  - `src/generated/lessons-index.json`（包含 3 节课）
  - `src/generated/projects-index.json`（包含 1 个项目）
- 编译器增强：
  - `scripts/build-content.ts` 支持 local 模式无 starter 文件，并新增 projects 扫描与编译

验收标准：

- 这 5 个样本在新链路下渲染稳定、交互不退化
- 测试与校验能捕获明显结构错误（至少覆盖：meta 缺字段、starter 缺文件、块语法非法）

验收方式（可重复执行）：

- 运行 `npm run build:content`，预期输出 `Compiled 3 lesson(s), 1 project(s) to src\generated`
- 运行 `npm run build` 与 `npm test`，均通过

#### P8：批量迁移工具（半自动拆分旧 lessons.ts）

状态：已完成

目标：

- 实现迁移脚本把旧内容拆成新目录结构
- 迁移脚本只负责“拆结构”，不要求 100% 文案完美

交付物：

- `scripts/migrate-lessons-to-content.ts`
- 迁移脚本输出的内容目录（可先只跑一章）

验收标准：

- 脚本对同一输入重复运行结果一致
- 迁移产物能被编译器消费（即使需要人工修边角）

实际交付物清单：

- `scripts/migrate-lessons-to-content.ts`（支持按 chapter / track / lesson 过滤，默认不覆盖已有文件）
- `package.json` 新增 `migrate:lessons` 脚本
- `content/lessons/**` 已批量生成迁移产物（当前共 98 节课可被编译器消费）

验收方式（可重复执行）：

- 运行 `npm run migrate:lessons`
- 运行 `npm run build:content`，预期输出 `Compiled 98 lesson(s), 1 project(s) to src\generated`
- 运行 `npm run build` 与 `npm test` 均通过

#### P9：全量迁移与旧系统收口（最后阶段）

状态：进行中

目标：

- 将所有课程/项目切换到新链路
- 旧系统进入只读维护或移除

交付物：

- 新链路覆盖全部课程与项目
- 旧 `lessons.ts/projects.ts` 从“内容源”降级为“索引/兼容壳”或彻底移除
- 旧运行时 Markdown 主解析职责清理（保留必要的 UI 渲染工具即可）

验收标准：

- 默认启用新链路时，核心路径（首页/课程/项目/测验）可用
- CI 通过（构建 + 单测）
- 文档与实际实现一致（避免“文档说一套，代码做一套”）

当前进展：

- 新链路已覆盖绝大多数课程（`build:content` 当前可编译 98 节课）
- 默认已启用 V2（可用 `VITE_CONTENT_V2=0` 临时禁用回退到旧链路）

---

## 16. 实施优先级建议

### 最高优先级

- 定义内容 schema
- 定义块协议
- 将 starter code 文件化
- 做最小编译器

### 中优先级

- glossary 构建期注入
- Vue block renderer
- 样板课程迁移

### 后续优先级

- 迁移脚本完善
- 批量 lint 与校验
- 编辑器辅助模板

---

## 17. 推荐先产出的关键文件

如果要启动这个重构，建议优先产出以下文件或模块：

- `AI-friendly-content-architecture.md`
- `docs/lesson-authoring.md`
- `docs/block-spec.md`
- `content/templates/lesson/meta.yaml`
- `content/templates/lesson/lesson.md`
- `content/templates/lesson/starter/index.html`
- `scripts/build-content.ts`
- `src/content-runtime/block-registry.ts`

---

## 18. 风险点与应对

### 风险 1：一开始块设计过多

问题：

- 白名单块过多会让第一版复杂度失控

建议：

- 第一版先只实现最常用的 6 到 8 种块

### 风险 2：试图完全自动迁移

问题：

- 旧内容格式不统一，100% 自动迁移很难

建议：

- 迁移脚本负责“拆结构”，人工负责“修边角”

### 风险 3：运行时又偷偷加解析逻辑

问题：

- 如果新功能继续加到运行时，系统会再次复杂化

建议：

- 明确规定：内容增强只能进构建期插件链

### 风险 4：过早支持复杂内容复用

问题：

- 会重新放大 AI 编辑边界

建议：

- 第一版严格限制为“小块复用”

---

## 19. 最终建议

对这个项目而言，真正需要重构的不是 Vue 页面，而是内容架构。

在保持 `Vue + Vite + 在线编辑器 + 实时预览` 不变的前提下，最适合的方向是：

1. 课程目录化
2. Markdown 正文化
3. starter 文件化
4. 块协议标准化
5. 构建期编译 JSON 化
6. Vue 渲染白名单化

这套方案能够同时解决你当前最核心的几个问题：

- AI 改课要读大量代码
- Markdown 解析频繁出错
- 批量插入组件不方便
- starter code 难维护
- 课程结构难以局部编辑

最终形态应该是：

> 改一节课，只改一个目录；改一类块，只改一个渲染器；改一套规则，只改一个编译插件。

---

## 20. 下一步建议

如果准备正式开始实施，建议下一阶段的工作顺序是：

1. 先写 `block-spec` 和 `lesson-authoring` 文档
2. 先做一版最小内容编译器
3. 先迁移 3 到 5 节课做样板
4. 验证编辑器 / 预览 / 术语 / 任务块全链路
5. 再决定批量迁移策略

在没有进入实施阶段前，不建议继续追加旧 parser 和旧大配置的新能力。

---

# 附录 A：严格执行细则（DoD + 约束 + 契约）

本附录用于保证后续按阶段“严格执行”，避免阶段推进过程中反复变更目标、扩大范围或引入隐性复杂度。

## A1. 阶段 DoD（Definition of Done）统一清单

每个阶段在合并/提交前，必须同时满足以下 DoD：

- 交付物清单：明确列出本阶段新增/修改/删除的文件清单，并写入本文件对应阶段下
- 验收标准可执行：验收标准必须能通过一组可重复的检查项验证，禁止“主观感觉差不多”
- 回滚策略明确：说明如何关闭/回滚本阶段改动（Feature Flag、并行链路或可撤销提交）
- 不变量声明：明确本阶段“禁止触碰”的模块/目录，防止范围外扩
- 最小验证必过：必须至少通过“类型检查 + 单测（或不增加任何诊断）”
- 文档同步：如果实现与文档出现偏差，必须先更新文档再提交实现

建议记录格式（每阶段末尾追加）：

- 状态：未开始 | 进行中 | 已完成
- 实际交付物清单
- 实际验收结果
- 实际偏差与原因（如有）

## A2. 内容 Schema 硬约束（第一版冻结）

第一版只做中文版单路径，因此 schema 要“够用且冻结”，不预留多语言/多版本复杂字段。

### A2.1 命名与路径约束

- `id` 必须为 `kebab-case`，全站唯一
- `track` 与 `chapter` 必须为 `kebab-case`
- 目录名必须与 `id` 一致（避免“目录名/元数据 id 不一致”）
- 禁止在目录名中使用中文、空格或特殊字符

### A2.2 `meta.yaml` 字段约束

必填字段（第一版冻结）：

- `id: string`
- `title: string`
- `track: string`
- `chapter: string`
- `order: number`
- `mode: sandbox | local`
- `musicAnalogy: string`

可选字段：

- `listenTo: string`
- `tags: string[]`
- `estimatedMinutes: number`

默认值约定（如果缺失则构建期补齐）：

- `tags: []`
- `estimatedMinutes: 0`

禁止字段（第一版不允许出现）：

- `locales`
- `version`
- `variants`
- `paths`

### A2.3 starter 文件约束

- `mode: sandbox` 的课程必须存在 `starter/index.html|style.css|script.js`
- `mode: local` 的课程允许 starter 缺失或为空，但必须在正文中明确本地操作指引

## A3. 内容块协议与白名单冻结（第一版）

### A3.1 第一版块白名单（冻结集合）

第一版只允许使用以下块：

- `music-analogy`
- `explain`
- `example`
- `task`
- `step`
- `hint`
- `listen-to`
- `callout`
- `tabs`
- `compare`
- `code-group`
- `file-tree`

除以上块外，构建期校验必须报错（避免内容进入“私有方言扩散”）。

### A3.2 块参数硬约束（第一版冻结）

- `music-analogy`：不允许参数
- `explain{title?: string}`
- `example{title?: string}`
- `task{title?: string}`
- `step{purpose?: string, expected?: string}`
- `hint{title?: string}`
- `listen-to`：不允许参数
- `callout{type: note|warn|danger|success, title?: string}`
- `tabs{tabs: string[]}`（第一版可先简化为固定语法，不必支持复杂嵌套）
- `compare{leftTitle?: string, rightTitle?: string}`
- `code-group{title?: string}`（内容为多个 fenced code）
- `file-tree{title?: string}`（内容为缩进文本或 json）

禁止行为：

- 禁止在块参数中出现任意 JS 表达式
- 禁止在正文中 import 或调用 Vue 组件
- 禁止用裸 HTML 注入实现交互逻辑

## A4. 构建期编译产物契约（JSON 合同）

为了让运行时与编译器解耦，必须冻结编译产物契约，并提供 schema 版本号。

### A4.1 顶层结构（冻结）

```json
{
  "contentSchemaVersion": 1,
  "id": "html-intro",
  "meta": {},
  "body": [],
  "starter": {
    "html": "",
    "css": "",
    "js": ""
  },
  "assets": {}
}
```

约束：

- `contentSchemaVersion` 第一版固定为 `1`
- `meta` 必须等价于 `meta.yaml` 的解析结果（字段一致）
- `body` 为结构化节点数组，禁止输出大段 HTML 字符串作为主表示

### A4.2 `body` 节点类型（第一版冻结）

第一版只允许出现：

- `heading`
- `paragraph`
- `list`
- `code`
- `block:music-analogy`
- `block:explain`
- `block:example`
- `block:task`
- `block:hint`
- `block:listen-to`
- `block:callout`
- `term`

说明：

- `term` 为术语节点，运行时负责 tooltip 展示
- `block:*` 节点由 Vue block renderer 负责渲染

## A5. 内容校验与 CI 最低门槛

从 P2 开始必须引入“内容校验脚本”的最小版本，否则后续迁移会失控。

### A5.1 校验项（第一版最低集合）

- `meta.yaml` 必填字段存在且类型正确
- `id` 全站唯一
- `mode` 枚举值合法
- `sandbox` 课程 starter 文件齐全
- `lesson.md` 块语法合法且块名在白名单
- 术语表 key 唯一（从 P6 起）

### A5.2 CI 门槛

- 构建脚本失败必须阻断合并
- 校验脚本失败必须阻断合并
- 单测失败必须阻断合并

## A6. 样板迁移选取标准（P7 严格执行）

为确保尽早暴露边界场景，P7 的样板必须覆盖：

- 至少 1 节 `task + step(purpose/expected)` 密集课程
- 至少 1 节代码块密集课程（多 fenced code）
- 至少 1 节包含列表/引用/表格的课程（用于验证 markdown 基础结构）
- 至少 1 节术语密集课程（用于验证术语注入与跳过规则）
- 至少 1 节 `sandbox` 课程（验证编辑器/预览接入）
- 至少 1 个项目（验证项目内容结构与步骤渲染）

P7 不允许为了“先跑起来”而挑选结构过于简单的课程样本。
