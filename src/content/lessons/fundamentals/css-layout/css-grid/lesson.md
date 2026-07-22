# Grid 布局 — 二维排布你的元素

:::analogy
Grid 就像课程表——横是星期、竖是节次，每个格子放一节课。你可以精确控制每行每列的宽度，也能让一个元素跨越多行多列。

Flexbox 是"一条线"上的排列（要么横排、要么竖排），Grid 是"一个面"上的排列（行和列同时控制）。当你的布局需要在**两个方向**上都对齐时，Grid 就是不二之选。
:::

:::prerequisite
**本节你需要知道这些词：**

- **Flexbox 基础**：用过 `display: flex`、`justify-content`、`align-items`、`gap`
- **CSS 选择器**：能用 `:first-child`、`:last-child`、`:nth-child()` 选择特定子元素
- **盒模型**：理解 `width`、`padding`、`margin` 的概念
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 用 `display: grid` 和 `grid-template-columns` 创建任意列数的网格
- 用 `fr` 单位实现弹性列宽分配
- 用 `grid-column` 和 `grid-row` 让元素跨越多列多行
- 理解 Flexbox（一维）和 Grid（二维）的选择标准
- 独立完成页面整体布局、照片墙、仪表盘等二维排版
:::

:::explain{title="一、没有 Grid 的时候——Flexbox 做二维布局有多别扭？"}
假设你要做一个 3 列 x 2 行的照片墙。用 Flexbox 只能做到这样：

```css
/* Flexbox 做照片墙——只能控制"每一行"内部的排列 */
.photo-wall {
  display: flex;
  flex-wrap: wrap;       /* 允许换行 */
  gap: 16px;
}
.photo {
  flex: 1 1 200px;       /* 最小 200px，有空间就拉伸 */
}

/* 问题 1：无法保证每行恰好 3 列
   如果容器宽度是 700px，一行只能放 3 张（3 x 200 + 2 x 16 = 632）
   但如果图片大小不完全一致，第二行的图片无法和第一行的列对齐！

   问题 2：某个图片想跨两列？
   用 flex 做不到——只能让它在自己的"份数"里更大，但无法真正跨越列边界

   问题 3：想让第二行第一列是空白？
   用 flex 做不了"空位"——要么把一个元素插进去，要么用 margin 硬推 */
```

**Flexbox 的本质局限：它是一维的。** 你只能控制"这一行里元素怎么排"，当一行换到下一行后，下一行的元素和上一行完全独立——列无法对齐，元素无法跨行。

这就是 Grid 要解决的问题：**同时控制行和列**。
:::

:::explain{title="二、Grid 出场——二维布局一步到位"}
同样的照片墙，用 Grid：

```css
.photo-wall {
  display: grid;                          /* ① 开启 Grid */
  grid-template-columns: repeat(3, 1fr);  /* ② 3 列，每列等宽 */
  gap: 16px;                              /* ③ 行列间距统一 */
}

/* 想让某张照片跨两列？ */
.photo:first-child {
  grid-column: span 2;  /* ④ 第一张照片跨 2 列 */
}

/* 效果：
   第一行：[大图（跨2列）] [小图]
   第二行：[小图] [小图] [小图]
   第三行：……每行都是精确的 3 列网格，列与列对齐 */
```

**发生了什么变化？**
- Grid 先画好了一个 3 列的"网格线"，所有子元素被自动分配到网格中
- `grid-column: span 2` 让元素从当前位置开始跨越 2 列——这是真正的"跨越列边界"，不是放大
- 不管内容高度是否一致，每一列的网格线始终保持对齐——行与行之间的列边界对齐
:::

:::explain{title="三、逐句拆解 Grid 的核心属性"}
Grid 的核心思路是"先画网格，再放元素"：

```css
.container {
  display: grid;                            /* ① 启动 Grid 布局 */
  grid-template-columns: 200px 1fr 1fr;     /* ② 定义列：第1列 200px，后两列各占 1 份 */
  grid-template-rows: auto 300px;           /* ③ 定义行：第1行自适应内容，第2行 300px */
  gap: 20px 16px;                           /* ④ 行间距 20px，列间距 16px */
}
```

**逐行拆解：**

**① display: grid** — 开启 Grid 布局。父元素变成网格容器，子元素自动变成网格项目

**② grid-template-columns — 定义列的数量和宽度**
这是 Grid 最重要的属性。它决定了"这个网格有几列，每列多宽"：

```css
/* 三种写法，效果完全相同——三个等宽列 */
grid-template-columns: 1fr 1fr 1fr;        /* 显式写三次 */
grid-template-columns: repeat(3, 1fr);      /* repeat(次数, 宽度) 简写 */
grid-template-columns: repeat(3, minmax(0, 1fr)); /* 加强版：最小 0，最大 1fr */
```

`fr` 是 Grid 独有的单位——**fraction（份数）**：
- `1fr 2fr` — 第一列占 1 份，第二列占 2 份，第二列是第一列的两倍宽
- `repeat(4, 1fr)` — 4 列等宽
- `200px 1fr` — 第一列固定 200px，第二列占满剩余空间（侧边栏布局！）

**③ grid-template-rows — 定义行的高度**
通常不需要显式定义每一行——Grid 会自动创建行来容纳内容。但当你需要特定行有固定高度时：

```css
grid-template-rows: auto 200px;     /* 第一行高度自适应内容，第二行 200px */
grid-template-rows: repeat(3, 150px); /* 三行，每行 150px */
```

**④ gap — 行列间距**

Grid 的 `gap` 支持两个值：第一个是行间距，第二个是列间距：
```css
gap: 20px;         /* 行和列间距都是 20px */
gap: 24px 16px;    /* 行间距 24px，列间距 16px */
```
:::

:::explain{title="四、Grid 的核心能力——跨列和跨行"}
Grid 最强大的特性就是让元素跨越多个网格单元。用网格线（grid lines）的概念来理解：

```css
/* 3 列网格有 4 条垂直线：| 1 | 2 | 3 | 4 |
   元素可以指定从第几条线开始，到第几条线结束 */

.featured {
  grid-column: 1 / 3;    /* 从第 1 条线到第 3 条线 = 跨越 2 列 */
}

/* 等价写法：span 表示"跨几列/几行" */
.featured {
  grid-column: span 2;    /* 从当前位置开始，跨 2 列 */
}
```

**网格线的编号规则：**
- 3 列 = 4 条列网格线（编号 1 ~ 4）
- 3 行 = 4 条行网格线（编号 1 ~ 4）
- 元素的 `grid-column: 1 / 3` 表示"从列线 1 开始，到列线 3 结束"

**更复杂的跨越：**
```css
/* 占据整个第一行 */
.hero {
  grid-column: 1 / -1;    /* -1 表示最后一条网格线 */
}
/* 1 / -1 = 从第一条线到最后一条线 = 占满整行 */

/* 同时跨列和跨行 */
.big-card {
  grid-column: span 2;    /* 跨 2 列 */
  grid-row: span 2;       /* 跨 2 行 */
}
```
:::

:::explain{title="五、Flexbox vs Grid——该怎么选？"}
这是一个每天都会遇到的问题。以下决策流程帮你快速判断：

**用 Flexbox 当：**
- 元素需要在**一个方向**上排列（横向或纵向）
- 元素数量不固定，需要自动换行
- 你是做导航栏、工具栏、标签列表、卡片组
- 居中对齐是你的主要需求

**用 Grid 当：**
- 布局需要**行和列同时对齐**
- 你需要"先画好网格，再往里面放元素"
- 某些元素需要跨越多个列或多行
- 你做的是页面整体结构、仪表盘、照片墙、表格类布局

**一个简单判断：**
- 只需要"排一排" → Flexbox
- 需要"行和列都对上" → Grid

**实际项目中，两者经常一起用：**
```css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;    /* 侧边栏 + 主内容区 */
  grid-template-rows: 60px 1fr 80px;   /* 头部 + 内容 + 底部 */
  min-height: 100vh;
}

/* 导航栏内部用 Flexbox 排列链接 */
nav {
  display: flex;
  gap: 20px;
}

/* 主内容区的卡片组用 Flexbox 自动换行 */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
```

Grid 负责**页面大骨架**（行和列的结构），Flexbox 负责**局部排列**（骨架内部的元素排列）。
:::

:::example{title="完整示例：一个仪表盘布局——Grid 的经典场景"}
下面是一个管理后台仪表盘，用 Grid 搭建整体结构：

```css
/* ===== 仪表盘整体布局 ===== */
.dashboard {
  display: grid;
  /* 4 列：侧边栏固定宽度，内容区三列等分 */
  grid-template-columns: 220px repeat(3, 1fr);
  /* 3 行：头部、主体、底部 */
  grid-template-rows: auto 1fr auto;
  /* 用 grid-template-areas 给每个区域命名（可选但推荐） */
  grid-template-areas:
    "sidebar header  header  header"
    "sidebar main    main    main"
    "sidebar footer  footer  footer";
  gap: 0;               /* 区域之间可以加间距 */
  min-height: 100vh;     /* 至少占满屏幕 */
}

.sidebar  { grid-area: sidebar; background: #1a1a2e; color: #fff; }
.header   { grid-area: header;  background: #fff; padding: 20px; }
.main     { grid-area: main;    background: #f5f5f5; padding: 20px; }
.footer   { grid-area: footer;  background: #fff; padding: 16px; }

/* ===== 主区域的统计卡片（Grid 子网格） ===== */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4 列统计卡片 */
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

/* ===== 图表区：两张图表各跨 2 列 ===== */
.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* 两列等宽 */
  gap: 16px;
}

.chart-large {
  grid-column: span 2;   /* 大图表占一整行（跨 2 列） */
  background: #fff;
  padding: 20px;
  min-height: 300px;
}
```

**运行结果：** 页面左侧是固定 220px 的深色侧边栏，右侧依次是头部、主内容区、底部。主内容区里统计卡片 4 列并排。图表区里可以放两张并排的小图表，也可以放一张跨满行的大图表。整个页面的行和列精确对齐——这就是 Grid 的威力。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：repeat(3, 1fr) 写成了 repeat(3, fr)**

```css
/* ❌ 错误：fr 必须有数字 */
grid-template-columns: repeat(3, fr);    /* 无效！浏览器不认识 fr */

/* ✅ 正确 */
grid-template-columns: repeat(3, 1fr);   /* 3 列等宽 */
```

**错误 2：grid-column: span 2 让元素超出列数**

```css
/* 在一个 3 列网格中：*/
grid-template-columns: repeat(3, 1fr);

.card:first-child {
  grid-column: span 2;   /* ✅ 跨 2 列，第一行剩下 1 列 */
}

.card:nth-child(2) {
  grid-column: span 3;   /* ❌ 只有 3 列，但第一列已经被占了！
                             结果：这个元素被挤到下一行 */
}
```

`span` 跨列时，Grid 会尝试在当前行找到足够的空间，找不到就换行——这是符合预期的行为，但容易踩坑。

**错误 3：混淆 grid-template-areas 中的名称和 CSS 类名**

```css
/* grid-template-areas 使用的名称可以任意命名，但必须在子元素上用 grid-area 引用 */
.grid {
  grid-template-areas: "side main";  /* 用 "side" 和 "main" 命名区域 */
}
.sidebar { grid-area: sidebar; }     /* ❌ 名称不匹配！"sidebar" ≠ "side" */
.main   { grid-area: main; }         /* ✅ 匹配 */

/* ✅ 正确：名称必须完全一致 */
.sidebar { grid-area: side; }
```

**错误 4：Grid 子元素中的 margin 可能产生意外空隙**

```css
/* Grid 子元素之间的间距由 gap 控制，不需要 margin */
.grid {
  display: grid;
  gap: 16px;
}
.card {
  margin-bottom: 16px;  /* ❌ 冗余：gap 已经在控制间距了 */
}
```
:::

:::explain{title="六、实际工作中你会用 Grid 做什么？"}
Grid 在真实项目中承担"骨架搭建"的角色——以下是你每天会遇到的场景：

**场景 1：页面整体布局（最经典的 Grid 用例）**
```css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;     /* 侧边栏 + 内容 */
  grid-template-rows: auto 1fr auto;    /* 头 + 体 + 脚 */
  min-height: 100vh;
}
```

**场景 2：仪表盘/数据面板**
```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4 列统计数据 */
  gap: 20px;
}
.stat-card:first-child {
  grid-column: span 2;   /* 最重要的指标占 2 列 */
  grid-row: span 2;      /* 占 2 行——更突出 */
}
```

**场景 3：照片/作品集网格**
```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  /* auto-fill：自动填充尽可能多的列
     minmax(250px, 1fr)：每列最小 250px，最大 1fr */
  gap: 16px;
}
/* 不需要 @media 查询！浏览器窗口变化时自动增减列数 */
```

**场景 4：文章排版（居中内容 + 全宽图片）**
```css
.article {
  display: grid;
  grid-template-columns: 1fr min(65ch, 100%) 1fr;
  /* 中间列：最大 65 字符宽度或 100%（小屏幕时） */
}
.article > * {
  grid-column: 2;           /* 所有内容默认放在中间列 */
}
.article > .full-width {
  grid-column: 1 / -1;      /* 全宽图片跨满三列 */
}
```
:::

:::task{title="动手试试 ✨"}

::::step{purpose="让你直观感受 Grid 的核心威力：`grid-template-columns` 定义了网格的列结构。从 3 列变成 4 列，所有子元素自动重新排列——你一行额外代码都不用写。" expected="卡片从 3 列网格变成 4 列网格。所有卡片自动重新排列，行高按内容自适应。"}
1. 打开右侧编辑器的 `style.css` 文件
2. 找到 `.grid` 选择器，设置：
   ```css
   .grid {
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     gap: 16px;
   }
   ```
3. 切换到预览区，观察 3 列网格布局
4. 把 `repeat(3, 1fr)` 改成 `repeat(4, 1fr)`——从 3 列变 4 列，所有卡片自动重新排列！
::::

::::step{purpose="`fr` 单位是 Grid 的弹性分配核心。`1fr 2fr` 表示一列占 1 份、另一列占 2 份——后者是前者的两倍宽。精确控制比例是 Grid 的强项。" expected="卡片变成左窄右宽的两列布局。左侧列宽度是右侧列的一半。"}
1. 修改 `grid-template-columns`：
   ```css
   grid-template-columns: 1fr 2fr;
   ```
2. 观察：两列的宽度比例是否约 1:2？
3. 改成 `200px 1fr 1fr`——第一列固定 200px，后两列平分剩余空间
::::

::::step{purpose="`grid-column: span 2` 让元素跨越两列。和 Flexbox 的 `flex: 2` 不同——Grid 是真正的'跨越列边界'，而不是在弹性比例上放大。这是 Grid 独有的能力。" expected="第一张卡片占据了前两列的宽度，其他卡片正常排列。网格线仍然保持对齐。"}
1. 确保网格是 3 列布局：`grid-template-columns: repeat(3, 1fr);`
2. 给第一张卡片添加：
   ```css
   .card:first-child {
     grid-column: span 2;
   }
   ```
3. 观察：第一张卡片是否跨了 2 列？其他卡片是否自动填补剩余位置？
4. 试试 `grid-column: 1 / -1;`（从第一条线到最后一条线 = 占满整行）
::::

::::step{purpose="`auto-fill` + `minmax()` 组合让 Grid 自动计算列数——不需要 `@media` 查询就能实现响应式网格。这是 Grid 响应式布局的标准模式。" expected="拖动浏览器窗口时，列数自动变化。窗口宽时列多，窗口窄时列少。每列最小 200px。"}
1. 修改 `grid-template-columns`：
   ```css
   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
   ```
2. 切换到预览区，拖动浏览器窗口宽度
3. 观察列数的自动变化——窗口 > 800px 时 4 列，600-800px 时 3 列，400-600px 时 2 列……
4. 你一行 `@media` 查询都没写，但实现了完美的响应式网格！
::::

:::

:::recap
这一节你学会了 CSS Grid——二维布局的终极方案，同时控制行和列。

**核心属性速查表：**
| 属性 | 作用 | 示例 |
|------|------|------|
| `display: grid` | 启动 Grid 布局 | `display: grid;` |
| `grid-template-columns` | 定义列的宽度和数量 | `repeat(3, 1fr)` / `200px 1fr 1fr` |
| `grid-template-rows` | 定义行的高度 | `auto 200px` / `repeat(3, 150px)` |
| `gap` | 行列间距 | `gap: 16px;` / `gap: 20px 12px;` |
| `grid-column: span N` | 跨 N 列 | `grid-column: span 2;` |
| `grid-row: span N` | 跨 N 行 | `grid-row: span 2;` |
| `repeat()` | 重复定义 | `repeat(4, 1fr)` = 4 列等宽 |
| `auto-fill` + `minmax()` | 自动填充列数 | `repeat(auto-fill, minmax(250px, 1fr))` |

**Flexbox vs Grid 决策口诀：**
- 只需要"排一排" → Flexbox
- 需要"行和列都对上" → Grid
- 页面大骨架用 Grid，骨架内部的局部排列用 Flexbox——两者分工合作

下一节你将学习**响应式设计**——用 `@media` 查询让同一个页面在手机、平板、桌面上自动切换布局。配合 Grid 和 Flexbox，你将做出适配所有屏幕的专业页面。
:::
