# Lesson Authoring（写课规范 V1）

本规范用于指导编写 `content/lessons/...` 下的课程内容，使其具备以下特性：

- 一节课一个目录，AI 修改时只需要读取该目录
- 正文结构稳定、可校验、可批量修改
- starter code 文件化，避免字符串转义与 diff 困难

## 1. 课程目录结构

推荐结构：

```text
content/lessons/<track>/<chapter>/<lessonId>/
  meta.yaml
  lesson.md
  starter/
    index.html
    style.css
    script.js
  assets/
```

约束：

- `<lessonId>` 必须为 `kebab-case`，且与 `meta.yaml` 的 `id` 完全一致
- `mode: sandbox` 必须存在三份 starter 文件

## 2. meta.yaml 填写规范

必填字段：

- `id`
- `title`
- `track`
- `chapter`
- `order`
- `mode`（`sandbox | local`）
- `musicAnalogy`

可选字段：

- `listenTo`
- `tags`
- `estimatedMinutes`

示例：

```yaml
id: html-intro
title: 认识 HTML - 你的第一行代码
track: fundamentals
chapter: html-basics
order: 1
mode: sandbox
musicAnalogy: HTML 就像五线谱，它决定页面上有什么内容。
listenTo: 巴赫《C大调前奏曲》BWV 846
tags:
  - html
estimatedMinutes: 12
```

## 3. lesson.md 写法规范

### 3.1 只使用白名单内容块

课程正文必须遵守 [block-spec.md](file:///d:/MyWorkspace/my-learn-web/docs/block-spec.md) 的白名单块集合与参数规则。

### 3.2 推荐组织顺序

建议每节课正文按以下顺序组织：

1. `music-analogy`
2. 1-3 个 `explain`
3. `example`（可选）
4. `task`（建议每节至少一个）
5. `hint`（可选）
6. `listen-to`（可选）

### 3.3 示例骨架

```md
# 课程标题

::music-analogy
一句音乐类比。
::

::explain{title="目标"}
说明本课学什么。
::

::task{title="动手试试"}
:::step{purpose="为什么做" expected="应该看到什么"}
描述一步要做的动作。
:::
::
```

## 4. starter/ 写法规范

### 4.1 规则

- `index.html` 只写 body 内内容片段（与现有在线编辑器一致）
- `style.css` 写课程起始样式（允许为空）
- `script.js` 写课程起始脚本（允许为空）

### 4.2 sandbox 与 local

- `sandbox`：starter 必须齐全，且 lesson.md 的任务应能在站内完成
- `local`：starter 可为空或省略，但 lesson.md 必须明确本地操作步骤

## 5. AI 修改规范（对 AI 的约束）

AI 修改一节课时默认只允许读取与修改：

- `meta.yaml`
- `lesson.md`
- `starter/*`
- `assets/*`

除非明确要求，否则不读取全站其他课程、渲染器实现、解析器实现。

