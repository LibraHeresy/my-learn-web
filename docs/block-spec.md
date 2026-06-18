# Block Spec（内容块协议 V1）

本协议定义课程正文 `lesson.md` 中允许使用的内容块（白名单）与参数规则。第一版目标是：结构稳定、可校验、AI 易于批量编辑。

## 1. 语法约定

使用 directive 风格块语法：

- 块开始：`::block-name{...}`
- 块结束：`::`
- 块内子块：`:::block-name{...}` / `:::`

块参数只允许纯字符串或字符串数组，禁止 JS 表达式。

## 2. 白名单块（V1 冻结）

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

除以上块外必须报错。

## 3. 块定义

### 3.1 music-analogy

用途：音乐类比提示。

- 参数：无
- 内容：Markdown

示例：

```md
::music-analogy
HTML 就像五线谱。
::
```

### 3.2 explain

用途：解释性内容。

- 参数：`title?: string`
- 内容：Markdown

```md
::explain{title="什么是 HTML？"}
HTML 是网页的骨架。
::
```

### 3.3 example

用途：示例展示（通常包含 fenced code）。

- 参数：`title?: string`
- 内容：Markdown

```md
::example{title="示例"}
```html
<h1>Hello</h1>
```
::
```

### 3.4 task

用途：练习任务容器。

- 参数：`title?: string`
- 内容：包含多个 `step`

```md
::task{title="动手试试"}
:::step{purpose="为什么做" expected="应该看到什么"}
把 `<h1>` 改成你自己的名字。
:::
::
```

### 3.5 step

用途：任务步骤。

- 参数：`purpose?: string`, `expected?: string`
- 内容：Markdown

### 3.6 hint

用途：提示与补充。

- 参数：`title?: string`
- 内容：Markdown

### 3.7 listen-to

用途：推荐聆听。

- 参数：无
- 内容：Markdown

### 3.8 callout

用途：提示卡片（注意/警告/成功/危险）。

- 参数：`type: note|warn|danger|success`, `title?: string`
- 内容：Markdown

```md
::callout{type="warn" title="易错点"}
注意大小写。
::
```

### 3.9 tabs

用途：标签页展示。

- 参数：`tabs: string[]`
- 内容：按 tab 顺序提供对应块内容（V1 允许先用约定格式占位，具体编译器实现阶段再锁定）

### 3.10 compare

用途：左右对比展示。

- 参数：`leftTitle?: string`, `rightTitle?: string`
- 内容：左右两块内容（V1 允许先用约定格式占位）

### 3.11 code-group

用途：组织多段相关代码。

- 参数：`title?: string`
- 内容：多个 fenced code

### 3.12 file-tree

用途：展示文件结构。

- 参数：`title?: string`
- 内容：缩进文本或 JSON（V1 先使用缩进文本）

## 4. 禁止项（V1）

- 禁止在正文中 import 或调用 Vue 组件
- 禁止块参数写表达式、对象、函数
- 禁止用裸 HTML 注入交互逻辑

