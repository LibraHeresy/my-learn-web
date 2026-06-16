# HTML 基础章节 — 文科生友好优化方案（扬琴版）

## 学员画像

- 扬琴演奏者，受过专业音乐训练
- 英语零基础（不认得标签/属性/关键字）
- 理工科思维弱（未受过抽象符号系统训练）

## 教学总则

- **用扬琴类比替代所有管弦乐/西洋乐类比**——扬琴术语是她的母语
- **每个概念解释顺序**：练琴场景 → 对应前端的什么问题 → 代码怎么写 → 写错了会怎样
- **每课新术语 ≤ 5 个**
- **先感性再理性**：先看效果、再学写法、最后记规则

---

## 改动概览

| 文件 | 改动内容 | 改动量 |
|------|---------|--------|
| `src/configs/glossary.ts` | 新增 ~77 条词条 | ~300 行 |
| `src/configs/lessons.ts` | 12 课教育学优化 | ~500 行 |
| 其他文件 | 不改 | 0 |

### 不改的部分
- markdown.ts（渲染管线已修好）
- LessonContent.vue（term-tip 机制完善）
- CodeEditor.vue / LivePreview.vue
- CSS 文件 / 类型定义

---

## 一、Glossary 扩充

新增约 77 条词条，每条术语的 `analogy` 字段优先用扬琴术语：

### 概念术语（6 条）
- 全局属性、特有属性、布尔属性、单标签、块级元素、内联元素

### HTML 标签（~45 条）
DOCTYPE/html/head/body/meta/title/link/h1/p/strong/em/br/ul/ol/li/img/a/div/span/header/nav/main/section/article/footer/audio/video/source/table/tr/td/th/thead/tbody/form/input/label/textarea/select/option/button/fieldset/legend

### HTML 属性（~26 条，每条标注 🌐全局/📍特有/🔘布尔）
src/href/alt/class/id/style/lang/hidden/controls/autoplay/loop/type/placeholder/for/name/value/colspan/rowspan/rows/min/max/checked/disabled/rel/width/height/charset/content

---

## 二、12 课教育学优化

### 原则
1. 首个 explain 确保新术语以**纯文本**出现（触发浮标）
2. 示例拆成 2-3 步渐进
3. 加入"写错会怎样"错误示范
4. 易混淆概念加入对比

### 逐课要点

| 课 | 主要改动 |
|----|---------|
| 1（入门） | 首段去反引号 + 扬琴类比 + 示例拆步 + 代码翻译 |
| 2（文档结构） | 拆成两个 explain（骨架 + head），减少术语密度 |
| 3（文本强调） | strong/b、em/i 对比 + 忘闭合标签错误示范 |
| 4（列表） | 优化类比 + 嵌套列表示例 |
| 5（图片链接） | 渐进 3 步示例 + src/alt/href 3 个错误示范 |
| 6（div/span） | class vs id 对比（琴竹分类 vs 琴弦编号） |
| 7（语义化） | 强调"你看不到但机器看得到" + 简谱vs五线谱类比 |
| 8（音视频） | 布尔属性集中解释 |
| 9（表格） | 层级图 + 练琴记录本类比 |
| 10（表单） | for/id/name/value 四属性对照表 + label 配对错误示范 |
| 11（输入类型） | 属性归属速查表 |
| 12（综合） | 属性大盘点 + 标签家族树 |

---

## 三、实施批次

1. **Glossary**（`glossary.ts`）— 新增 77 条
2. **首段去反引号**（`lessons.ts`）— 12 课
3. **教学加强**（`lessons.ts`）— 渐进示例、错误示范、对比教学、专题总结
4. **验证** — `npm run test` + `npm run dev` 手动检查
