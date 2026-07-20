# 响应式设计 — 适配不同的屏幕

:::analogy
响应式设计就像同一个 App 在手机和电脑上界面不同——内容一样，但布局会根据屏幕大小自动调整。

做一道菜，在家庭厨房做和在大餐厅厨房做，流程不同但菜品一样。响应式就是给同一道菜准备两套烹饪方案——小厨房用精简流程，大厨房用完整流程。用户看到的是同一道菜，但在不同设备上有最合适的呈现方式。
:::

:::prerequisite
**本节你需要知道这些词：**

- **Flexbox**：会用 `display: flex`、`flex-wrap`、`gap` 做一维排列
- **Grid**：会用 `display: grid`、`grid-template-columns` 做二维排列
- **CSS 层叠**：理解"后面的样式覆盖前面的"这个基本规则
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 用 `@media` 查询根据屏幕宽度切换样式
- 采用"移动端优先"策略书写 CSS
- 设置合理的响应式断点（手机、平板、桌面）
- 理解 `viewport` meta 标签的作用
- 独立做出一个在手机、平板、桌面上都能正常显示的页面
:::

:::explain{title="一、没有响应式的时候——桌面布局在手机上会怎样？"}
假设你给桌面写了一版完美的页面：3 列卡片网格，600px 的内容区，左侧 250px 的侧边栏。在 1920px 宽的屏幕上看起来很棒。

现在你拿起手机（375px 宽）看同一个页面：

```css
/* 你在桌面端写的布局——在手机上变成灾难 */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;  /* 侧边栏 + 内容 */
  max-width: 1200px;
  margin: 0 auto;
}

/* 手机屏幕 375px 宽：
   250px 侧边栏占据了 67% 的屏幕宽度！
   内容区只剩下 125px——文字被压成面条
   用户只能不停缩放、平移才能看清内容 */
```

**没有响应式的页面在手机上：**
- 文字小到看不清（因为布局按桌面宽度设计）
- 需要左右滑动才能看到完整内容
- 按钮太小，手指点不到
- 用户 3 秒内就关掉页面

这就是响应式设计要解决的问题：**同一份 HTML，根据屏幕宽度切换不同的 CSS**。
:::

:::explain{title="二、`@media` 查询——给不同屏幕写不同的 CSS"}
`@media` 查询是响应式设计的核心工具。它的语法：

```css
@media (条件) {
  /* 条件满足时才生效的 CSS */
}
```

**最常用的条件是 `min-width` 和 `max-width`：**

```css
/* 基础样式：手机端（默认） */
.card {
  width: 100%;        /* 手机上一张卡片占满屏幕 */
  padding: 16px;
}

/* 当屏幕宽度 >= 640px 时（平板及以上） */
@media (min-width: 640px) {
  .card {
    width: 48%;       /* 平板上一排放两张卡片 */
  }
}

/* 当屏幕宽度 >= 1024px 时（桌面） */
@media (min-width: 1024px) {
  .card {
    width: 30%;       /* 桌面上一排放三张卡片 */
  }
}
```

**逐行理解：**

1. 基础样式（最上面，没有 `@media` 包裹）——这是默认状态，在所有屏幕上都生效
2. `@media (min-width: 640px)` — "当屏幕宽度最小 640px 时"。换句话说：640px 及以上的屏幕才走这里的样式
3. `@media (min-width: 1024px)` — "当屏幕宽度最小 1024px 时"。1024px 及以上屏幕会同时应用基础样式 + 640px 样式 + 1024px 样式

**`min-width` 的思维模型：**
- 基础样式 = 给最小的屏幕写的（手机）
- 每加一个 `@media (min-width: ...)` = 屏幕变大时"增强"样式
- 这叫**移动端优先（mobile-first）**——先保证小屏能用，再为大屏做增强

**`max-width` 的反向思维：**
```css
/* 桌面端优先（旧做法，不推荐）——先写大屏，再为小屏覆盖 */
.desktop-card { width: 300px; }
@media (max-width: 768px) {
  .desktop-card { width: 100%; }  /* 屏幕 768px 以下才用这个 */
}
```

现代开发推荐 `min-width`（移动端优先），因为：
- 手机样式通常是更简单的基础版本
- 逐步增强（progressive enhancement）比逐步削减更可靠
- CSS 文件更小（手机不需要下载大屏样式）
:::

:::explain{title="三、常用的响应式断点"}
断点（breakpoint）就是触发 `@media` 查询的屏幕宽度阈值。以下是实际项目中最常用的三个断点：

| 设备类型 | 屏幕宽度 | 推荐断点 | 典型布局变化 |
|----------|----------|----------|-------------|
| 手机 | < 640px | 基础样式（默认） | 单列布局，导航折叠 |
| 平板 | 640px ~ 1024px | `min-width: 640px` | 两列布局，导航展开 |
| 桌面 | > 1024px | `min-width: 1024px` | 三列/多列布局，侧边栏可见 |

**一套完整的移动端优先的网格示例：**

```css
/* 默认：手机——单列 */
.grid {
  display: grid;
  grid-template-columns: 1fr;         /* 一列，占满屏幕 */
  gap: 16px;
  padding: 16px;
}

/* 平板：640px 及以上——两列 */
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);  /* 两列等宽 */
    gap: 20px;
    padding: 24px;
  }
}

/* 桌面：1024px 及以上——三列 + 居中容器 */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);  /* 三列等宽 */
    max-width: 1200px;                      /* 限制最大宽度 */
    margin: 0 auto;                         /* 居中 */
  }
}
```

**为什么不用精确匹配某个设备宽度？** 因为新设备不断出现（折叠屏、超宽屏）。用 640px、1024px 这种"整数"断点，比精确匹配 iPhone 15 的 390px 或 iPad 的 810px 更灵活。
:::

:::explain{title="四、`viewport` meta 标签——响应式的基石"}
在 HTML 的 `<head>` 中，必须加上这一行，否则你的响应式 CSS 在手机上不会生效：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**这是什么意思？**

- `width=device-width` — 告诉手机浏览器"页面宽度等于设备宽度"。如果不写这行，手机浏览器会假装自己是一个 980px 宽的桌面屏幕，然后把页面缩小到手机屏幕上——你的 `@media (min-width: 640px)` 永远不会在手机上触发
- `initial-scale=1.0` — 初始缩放比例为 1（不缩放）。防止浏览器自作主张缩放页面

**如果不加这个标签：**
- 手机浏览器用 980px 的虚拟视口渲染页面
- 你的 `@media (max-width: 640px)` 样式永远不会生效
- 页面在手机上看起来像桌面版被缩小——文字小到看不清

这是响应式设计的第一步——没加这个标签，后面所有 `@media` 查询都是白费。
:::

:::explain{title="五、响应式导航——从横排到汉堡菜单"}
导航栏是响应式设计中最典型的挑战：桌面上横向排列，手机上转为纵向或折叠成汉堡菜单：

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}

.nav-links {
  display: flex;          /* 桌面端：链接横向排列 */
  gap: 24px;
  list-style: none;
}

/* 手机端：链接改为纵向 */
@media (max-width: 639px) {
  .nav {
    flex-direction: column;   /* 导航栏本身纵向排列 */
    align-items: flex-start;
  }
  .nav-links {
    flex-direction: column;   /* 链接纵向排列 */
    width: 100%;              /* 占满宽度 */
    gap: 12px;
    padding-top: 16px;
  }
}

/* 汉堡菜单图标（只在手机端显示） */
.hamburger {
  display: none;            /* 默认隐藏 */
}
@media (max-width: 639px) {
  .hamburger {
    display: block;         /* 手机端显示汉堡图标 */
  }
  .nav-links {
    display: none;          /* 手机端默认隐藏链接 */
  }
  .nav-links.open {
    display: flex;          /* 点了汉堡图标后展开 */
  }
}
```

**核心模式：**
1. 基础样式给桌面（横向导航）
2. `@media (max-width: 639px)` 覆盖为手机样式（纵向+折叠）
3. 汉堡图标用 `display: none` / `display: block` 控制显示
:::

:::example{title="完整示例：一个响应式页面——从手机到桌面"}
下面的代码展示了一个完整的响应式页面，包含导航、文章列表和侧边栏：

```css
/* ===== 基础样式（手机端） ===== */
html {
  font-size: 16px;          /* 基准字号 */
}

.page {
  display: grid;
  grid-template-columns: 1fr;       /* 单列 */
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
  gap: 16px;
  padding: 16px;
}

/* ===== 导航栏——手机端纵向 ===== */
.nav {
  display: flex;
  flex-direction: column;           /* 纵向排列 */
  gap: 12px;
}

/* ===== 文章卡片——手机端单列 ===== */
.post-list {
  display: grid;
  grid-template-columns: 1fr;       /* 单列 */
  gap: 16px;
}

/* ===== 侧边栏——手机端在主内容下方 ===== */
.sidebar {
  background: #f5f5f5;
  padding: 16px;
}

/* ===== 平板：640px 及以上 ===== */
@media (min-width: 640px) {
  .nav {
    flex-direction: row;            /* 横排导航 */
    justify-content: space-between;
    align-items: center;
  }

  .post-list {
    grid-template-columns: repeat(2, 1fr);  /* 两列文章 */
    gap: 20px;
  }

  .page {
    padding: 24px;
  }
}

/* ===== 桌面：1024px 及以上 ===== */
@media (min-width: 1024px) {
  .page {
    grid-template-columns: 1fr 300px;     /* 主内容 + 侧边栏 */
    grid-template-areas:
      "header  header"
      "main    sidebar"
      "footer  footer";
    max-width: 1200px;
    margin: 0 auto;
  }

  .post-list {
    grid-template-columns: repeat(3, 1fr); /* 三列文章 */
    gap: 24px;
  }
}
```

**运行结果：**
- 手机（< 640px）：单列布局，导航纵向，文章单列堆叠，侧边栏在底部
- 平板（640-1023px）：导航横向，文章两列，侧边栏仍在底部
- 桌面（>= 1024px）：经典两栏布局（文章三列 + 右侧 300px 侧边栏），内容居中且最大宽 1200px
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：忘记 `viewport` meta 标签**

```html
<!-- ❌ 错误：没加这行，手机上的 @media 查询全废 -->
<head>
  <link rel="stylesheet" href="style.css">
</head>

<!-- ✅ 正确：加上 viewport 标签 -->
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
</head>
```

每次新建 HTML 文件时，第一件事就是复制这行 `viewport` meta 标签。

**错误 2：`min-width` 和 `max-width` 搞混**

```css
/* ❌ 错误：想在大屏上放大字体，却用了 max-width */
@media (max-width: 1024px) {
  h1 { font-size: 2rem; }
}
/* 含义：屏幕 <= 1024px 时字体 2rem——小屏大字体，反了！ */

/* ✅ 正确：用 min-width */
@media (min-width: 1024px) {
  h1 { font-size: 2rem; }
}
/* 含义：屏幕 >= 1024px 时字体 2rem——大屏大字体，正确 */
```

**错误 3：断点顺序写反——后面的覆盖了前面的**

```css
/* ❌ 错误：1024px 的样式写在了 640px 前面 */
@media (min-width: 1024px) {
  .card { width: 30%; }    /* 这个先执行 */
}
@media (min-width: 640px) {
  .card { width: 48%; }    /* 屏幕 >= 1024px 时，这个会覆盖上面的！ */
}
/* 结果：桌面端也是 48%——1024px 的断点被后面的覆盖了 */

/* ✅ 正确：min-width 从小到大排列 */
@media (min-width: 640px)  { .card { width: 48%; } }  /* 先写小断点 */
@media (min-width: 1024px) { .card { width: 30%; } }  /* 再写大断点 */
```

**错误 4：只隐藏元素但不调整布局**

```css
/* ❌ 错误：隐藏了侧边栏，但主内容区仍然只占 70% */
@media (max-width: 640px) {
  .sidebar { display: none; }
  /* .main 还是 70% 宽——剩下 30% 是空白！ */
}

/* ✅ 正确：隐藏侧边栏的同时让主内容占满 */
@media (max-width: 640px) {
  .sidebar { display: none; }
  .main { width: 100%; }  /* 补上侧边栏空出的空间 */
}
```
:::

:::explain{title="六、实际工作中的响应式设计模式"}
以下是你每天会遇到的真实响应式场景和对应方案：

**场景 1：响应式字体大小**
```css
html { font-size: 16px; }

@media (min-width: 640px) {
  html { font-size: 17px; }
}

@media (min-width: 1024px) {
  html { font-size: 18px; }  /* 大屏字体稍大，阅读更舒适 */
}

/* 使用 rem 单位让所有元素自动跟随 html 字号缩放 */
h1 { font-size: 2rem; }    /* 32px → 手机，34px → 平板，36px → 桌面 */
p  { font-size: 1rem; }    /* 16px → 手机，17px → 平板，18px → 桌面 */
```

**场景 2：响应式图片**
```css
img {
  max-width: 100%;     /* 图片不会超出容器——响应式图片的第一步 */
  height: auto;        /* 保持比例 */
}
```
配合 `<picture>` 标签可以根据屏幕加载不同尺寸的图片，但 `max-width: 100%` 是所有的起点。

**场景 3：隐藏/显示不同设备的元素**
```css
/* 只在桌面端显示 */
.desktop-only { display: none; }
@media (min-width: 1024px) {
  .desktop-only { display: block; }
}

/* 只在手机端显示 */
.mobile-only { display: block; }
@media (min-width: 640px) {
  .mobile-only { display: none; }
}
```

**场景 4：响应式间距**
```css
.section {
  padding: 32px 16px;       /* 手机端：上下 32px，左右 16px */
}

@media (min-width: 640px) {
  .section {
    padding: 48px 32px;     /* 平板端：间距加大 */
  }
}

@media (min-width: 1024px) {
  .section {
    padding: 64px 48px;     /* 桌面端：更宽松的间距 */
  }
}
```
:::

:::task{title="动手试试 ✨"}

::::step{purpose="让你直观感受响应式设计的核心机制：同一个页面，在不同屏幕宽度下自动切换布局。`@media` 查询让 CSS 拥有了'判断屏幕尺寸'的能力。" expected="拖动浏览器窗口时，卡片从 1 列 → 2 列 → 3 列自动切换。观察断点切换的瞬间——640px 和 1024px。"}
1. 打开右侧编辑器的 `style.css` 文件
2. 确认代码中包含三个层级的网格定义：
   - 基础：`grid-template-columns: 1fr;`
   - `@media (min-width: 640px)`：`grid-template-columns: repeat(2, 1fr);`
   - `@media (min-width: 1024px)`：`grid-template-columns: repeat(3, 1fr);`
3. 切换到预览区，**实际拖拽浏览器窗口宽度**
4. 观察从手机宽度（< 640px）拖到桌面宽度（> 1024px）的完整变化过程
::::

::::step{purpose="断点值决定了布局切换的时机。值越小，越早进入更大屏的布局。用真实的数值实验让你理解断点的工作原理。" expected="窗口宽度达到 500px 时就已经切换成两列布局（之前需要 640px）。断点越低，手机用户越早看到大屏布局。"}
1. 把 `@media (min-width: 640px)` 改成 `@media (min-width: 500px)`
2. 拖拽窗口宽度到 500px 左右——两列布局比以前更早出现了
3. 思考：断点设得太低（比如 300px），手机横屏时就会看到两列——这合理吗？
::::

::::step{purpose="`@media` 查询不只是改布局——你可以修改任意 CSS 属性。字体大小、间距、颜色……都可以随屏幕宽度变化。这让你的设计在各个屏幕上都'刚刚好'。" expected="桌面宽度（>= 1024px）时，卡片标题字体变大到 24px，正文行高增加。缩小窗口到手机尺寸后恢复默认字号。"}
1. 在 `@media (min-width: 1024px)` 的大括号内添加：
   ```css
   .card h2 { font-size: 24px; }
   .card p { line-height: 1.8; }
   ```
2. 拖拽窗口到 1024px 以上——卡片文字变大、行高增加
3. 缩小窗口到 640px 以下——恢复默认字号
::::

::::step{purpose="`display: none` + `@media` = 按设备控制元素可见性。这是实际项目中最常用的模式——桌面侧边栏在手机上变成折叠菜单，桌面大图在手机上隐藏。" expected="手机上看到一张提示卡片（'查看桌面版获取更多功能'），拉宽窗口到桌面尺寸后提示消失，侧边栏出现。"}
1. 在 HTML 中添加一个元素：`<div class="mobile-hint">查看桌面版获取更多功能</div>`
2. 在 CSS 中：
   ```css
   .mobile-hint { display: block; }
   @media (min-width: 1024px) {
     .mobile-hint { display: none; }
   }
   ```
3. 拖拽窗口，观察提示文字的显示/隐藏
4. 思考：你的页面在手机上会不会有不必要的元素可以隐藏？
::::

:::

:::recap
这一节你学会了让网页适配不同的屏幕——核心工具是 `@media` 查询。

**核心知识点回顾：**
- `@media (min-width: 640px)` — 移动端优先模式：从小屏写到大屏
- 三个最常用的断点：640px（平板）、1024px（桌面），基础样式给手机
- `viewport` meta 标签 — `<meta name="viewport" content="width=device-width, initial-scale=1.0">`，不加这行，手机上的响应式全废
- 断点顺序 — `min-width` 必须从小到大排列，否则后面的会错误覆盖前面的

**响应式设计的标准工作流程：**
1. 先写好手机版的基本样式（单列，100% 宽度）
2. 在 `@media (min-width: 640px)` 中做平板增强（两列，稍大字号）
3. 在 `@media (min-width: 1024px)` 中做桌面增强（多列，更大间距）
4. 在每个断点用浏览器 DevTools 实测，确保切换平滑

**一个关键心态：** 你不是在写"三个版本的页面"，而是在写一个页面，它根据屏幕宽度灵活调整自己。

下一章是**CSS 布局的综合项目**——你将用 Flexbox + Grid + Position + 响应式，从零搭建一个完整的落地页。这是你 CSS 布局能力的"毕业作品"。
:::
