# 综合项目 — 设计一场活动的宣传页

:::analogy
一场活动的海报需要精心布局：标题在顶端引人注目，主推内容在中央清晰呈现，活动信息在底部收尾。用 CSS 把这些元素安排在合适的位置，让浏览体验流畅自然。

这个项目就像一场演出——Grid 是舞台结构（划分区域），Flexbox 是演员站位（区域内排列），Position 是聚光灯（特殊定位），响应式是巡演适配（不同场地调整布局）。所有技术协同工作，才能呈现一场精彩的演出。
:::

:::prerequisite
**本节你需要掌握以下技能：**

- **Flexbox**：`display: flex`、`justify-content`、`align-items`、`gap`、`flex-wrap`
- **Grid**：`display: grid`、`grid-template-columns`、`fr` 单位、`grid-column: span N`
- **Position**：`relative`、`absolute`、`fixed`、`sticky`
- **居中**：Flexbox 居中、`text-align`、`margin: 0 auto`
- **响应式**：`@media` 查询、移动端优先、`viewport` meta 标签
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 规划一个完整页面的布局结构，把"设计稿"转化为 Grid 网格区域
- 在正确的位置使用 Flexbox、Grid、Position，而不是滥用其中一种
- 写出一套移动端优先的响应式 CSS，覆盖手机、平板、桌面
- 独立从零搭建一个专业的落地页布局
:::

:::explain{title="一、从设计稿到 CSS——先规划，再写代码"}
拿到一个落地页设计后，不要急着写 CSS。先做三件事：

**第一步：识别页面结构（用 Grid 划分区域）**

一个典型的落地页通常包含：
```
+----------------------------------+
|           导航栏 (nav)            |  ← Flexbox 横排 + sticky
+----------------------------------+
|                                   |
|          英雄区 (hero)            |  ← Flexbox 居中 + 大背景
|                                   |
+----------------------------------+
|   特色1   |   特色2   |   特色3   |  ← Grid 或 Flexbox 卡片组
+----------------------------------+
|                                   |
|         内容区 (content)          |  ← Grid 两栏（文字+图片）
|                                   |
+----------------------------------+
|         底部 (footer)             |  ← Grid 多列
+----------------------------------+
|         [回到顶部按钮]            |  ← Position: fixed
+----------------------------------+
```

**第二步：选择每块区域的布局工具**

| 区域 | 布局工具 | 理由 |
|------|----------|------|
| 导航栏 | Flexbox | 一维横排，Logo + 链接 + 按钮 |
| 英雄区 | Flexbox/Grid 居中 | 内容需要在视口中央垂直+水平居中 |
| 特色卡片组 | Flexbox（wrap）或 Grid | 看卡片是否需要严格行列对齐 |
| 内容区 | Grid（两栏） | 文字在左、图片在右，需要列对齐 |
| 底部 | Grid（多列） | 链接列表、联系方式、版权各占一列 |
| 浮动按钮 | Position: fixed | 始终在屏幕右下角 |

**第三步：确定响应式策略**

每个区域在三个断点上的布局变化：
- 手机（< 640px）：全部单列堆叠
- 平板（640-1023px）：部分两列
- 桌面（>= 1024px）：完整多列布局

**这个"先规划再写"的步骤，是专业前端工程师的日常工作方式。** 你不需要在脑子里想好全部——写在纸上或注释里，然后一块一块实现。
:::

:::explain{title="二、导航栏区域——Flexbox + Sticky"}
导航栏是 Flexbox 最经典的应用场景：横排的 Logo 和链接组，用 `position: sticky` 在滚动时固定在顶部：

```css
/* ===== 导航栏（Flexbox + Sticky） ===== */
.navbar {
  position: sticky;                /* ① 滚动到顶部时粘住 */
  top: 0;                          /* ② 离视口顶部 0px 时触发 */
  z-index: 100;                    /* ③ 确保不被内容遮挡 */

  display: flex;                   /* ④ 开启 Flexbox 排列 */
  justify-content: space-between;  /* ⑤ Logo 靠左，链接组靠右 */
  align-items: center;             /* ⑥ 所有导航项垂直居中 */

  padding: 16px 24px;              /* ⑦ 上下 16px，左右 24px */
  background: #fff;                /* ⑧ 白色背景，防止粘住时透明 */
  box-shadow: 0 1px 4px rgba(0,0,0,0.1); /* ⑨ 底部阴影 */
}

.navbar .logo {
  font-size: 1.25rem;
  font-weight: 700;
}

.navbar .nav-links {
  display: flex;                   /* 链接组内部也用 Flexbox */
  gap: 24px;                       /* 链接之间统一间距 */
  list-style: none;                /* 去掉列表默认样式 */
  margin: 0;
  padding: 0;
}

/* 手机端：导航纵向排列 */
@media (max-width: 639px) {
  .navbar {
    flex-direction: column;        /* 竖向排列 */
    align-items: flex-start;       /* Logo 和链接左对齐 */
    gap: 12px;                     /* Logo 和链接组之间的间距 */
  }
  .navbar .nav-links {
    flex-direction: column;        /* 链接纵向排列 */
    gap: 8px;
    width: 100%;
  }
}
```
:::

:::explain{title="三、英雄区——Flexbox 居中 + 大背景"}
英雄区是整个页面最引人注目的第一屏，需要将标题和按钮在视口中央垂直+水平居中：

```css
/* ===== 英雄区（Flexbox 居中） ===== */
.hero {
  display: flex;                    /* ① Flexbox 居中模式 */
  flex-direction: column;           /* ② 标题在上、描述在中、按钮在下 */
  justify-content: center;          /* ③ 垂直居中 */
  align-items: center;              /* ④ 水平居中 */
  text-align: center;               /* ⑤ 文字本身也居中 */

  min-height: 80vh;                 /* ⑥ 至少占屏幕 80% 高度 */
  padding: 40px 20px;               /* ⑦ 四周留白 */

  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* ⑧ 渐变背景——让英雄区视觉上突出 */
  color: #fff;
}

.hero h1 {
  font-size: 2.5rem;                /* 手机端：适中的标题 */
  margin-bottom: 16px;
  max-width: 600px;                 /* 限制标题宽度，太长不好读 */
}

.hero p {
  font-size: 1.125rem;
  margin-bottom: 32px;
  max-width: 500px;
  opacity: 0.9;                     /* 描述文字稍淡 */
}

/* 桌面端：标题和描述更大 */
@media (min-width: 1024px) {
  .hero h1 { font-size: 3.5rem; }
  .hero p { font-size: 1.25rem; }
}
```
:::

:::explain{title="四、特色卡片组——Flexbox 自动换行 vs Grid 严格对齐"}
卡片组有两种方案，取决于你需要的精确度：

**方案 A：Flexbox（灵活）——推荐用于卡片高度不一致的场景**
```css
.features {
  display: flex;
  flex-wrap: wrap;          /* 一行放不下就换行 */
  gap: 24px;
  padding: 60px 24px;
  max-width: 1200px;
  margin: 0 auto;           /* 容器居中 */
}

.feature-card {
  flex: 1 1 280px;          /* 最小 280px，剩余空间平分 */
  /* 即使三张卡片内容高度不同，每行内它们会等高（align-items: stretch 默认） */
}

/* 如果你想保证每行恰好 3 列——换用 Grid */
```

**方案 B：Grid（精确）——推荐用于需要列对齐或特殊跨列的场景**
```css
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 精确 3 列 */
  gap: 24px;
  padding: 60px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 响应式：手机 1 列，平板 2 列 */
@media (max-width: 639px) {
  .features { grid-template-columns: 1fr; }
}
@media (min-width: 640px) and (max-width: 1023px) {
  .features { grid-template-columns: repeat(2, 1fr); }
}
```
:::

:::explain{title="五、内容区——Grid 两栏布局"}
内容区（文字 + 图片）是 Grid 的经典用例——两栏精确对齐：

```css
/* ===== 内容区（Grid 两栏） ===== */
.content-section {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* ① 两栏等宽：文字 | 图片 */
  gap: 48px;                       /* ② 文字和图片间距 */
  align-items: center;             /* ③ 两栏内容垂直居中 */
  padding: 60px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.content-section.reverse {
  /* 交替布局：让图片在左、文字在右 */
}

.content-section.reverse .content-image {
  order: -1;                       /* ④ 图片排到文字前面（左边） */
}

.content-text h2 {
  font-size: 2rem;
  margin-bottom: 16px;
}

.content-text p {
  line-height: 1.8;                /* 文字行高，提升可读性 */
  color: #555;
}

.content-image img {
  width: 100%;                     /* 图片占满列宽 */
  height: auto;                    /* 保持比例 */
  border-radius: 8px;
}

/* 手机端：单列堆叠——图片在文字上方 */
@media (max-width: 639px) {
  .content-section {
    grid-template-columns: 1fr;    /* 改为单列 */
    gap: 24px;
  }
  .content-section .content-image {
    order: -1;                     /* 图片放到文字上面 */
  }
}
```
:::

:::explain{title="六、底部区域——Grid 多列 + Flexbox 内排列"}
底部通常包含多列信息（链接、联系方式、社交媒体），Grid 做整体结构，Flexbox 做每列内部排列：

```css
/* ===== 底部（Grid 多列） ===== */
.footer {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;  /* ① 四栏：品牌描述宽一些 */
  gap: 40px;
  padding: 60px 24px 32px;                 /* ② 上边距大，下边距小 */
  background: #1a1a2e;
  color: #ccc;                             /* ③ 浅灰文字 */
  max-width: 1200px;
  margin: 0 auto;
}

.footer h4 {
  color: #fff;                             /* ④ 标题白色，和正文区分 */
  margin-bottom: 16px;
  font-size: 1rem;
}

.footer ul {
  display: flex;                           /* ⑤ Flexbox 纵排链接 */
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer a {
  color: #888;                             /* ⑥ 链接灰色 */
  text-decoration: none;                   /* ⑦ 去掉下划线 */
}

.footer a:hover {
  color: #fff;                             /* ⑧ 悬停变白——交互反馈 */
}

/* 手机端：单列堆叠 */
@media (max-width: 639px) {
  .footer {
    grid-template-columns: 1fr;            /* 改为单列 */
    gap: 32px;
    text-align: center;
  }
}

/* 平板端：两列 */
@media (min-width: 640px) and (max-width: 1023px) {
  .footer {
    grid-template-columns: 1fr 1fr;        /* 两列 */
  }
}
```
:::

:::explain{title="七、浮动按钮和角标——Position 的点缀"}
落地页上常见的 Position 应用：

```css
/* ===== 回到顶部按钮（fixed） ===== */
.back-to-top {
  position: fixed;             /* ① 相对于视口，滚动也不动 */
  bottom: 24px;                /* ② 离底部 24px */
  right: 24px;                 /* ③ 离右侧 24px */
  width: 48px;
  height: 48px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 50%;          /* ④ 圆形按钮 */
  cursor: pointer;
  z-index: 999;                /* ⑤ 最高层级 */

  display: flex;               /* ⑥ Flexbox 居中按钮内的箭头图标 */
  justify-content: center;
  align-items: center;

  opacity: 0;                  /* ⑦ 默认隐藏 */
  visibility: hidden;
  transition: opacity 0.3s;    /* ⑧ 淡入淡出过渡 */
}

.back-to-top.visible {
  opacity: 1;                  /* ⑨ 滚动一定距离后显示 */
  visibility: visible;
}

/* ===== 特色卡片角标（absolute） ===== */
.feature-card {
  position: relative;          /* ① 给角标提供定位参考系 */
  padding: 32px 24px;
  background: #fff;
  border-radius: 8px;
}

.feature-card .new-badge {
  position: absolute;          /* ② 角标脱离文档流 */
  top: 12px;                   /* ③ 离卡片顶部 12px */
  right: 12px;                 /* ④ 离卡片右侧 12px */
  background: #ff4444;
  color: #fff;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;   /* ⑤ 大写字母：NEW */
}
```
:::

:::example{title="完整落地页 HTML 结构——所有区域的容器"}
下面是一个落地页的 HTML 骨架。注意每个区域都有一个明确的 class 名称，对应上面每一节讲解的 CSS：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>产品落地页</title>
</head>
<body>

  <!-- 1. 导航栏 -->
  <nav class="navbar">
    <div class="logo">MyProduct</div>
    <ul class="nav-links">
      <li><a href="#features">特色</a></li>
      <li><a href="#about">关于</a></li>
      <li><a href="#pricing">定价</a></li>
      <li><a href="#contact">联系</a></li>
    </ul>
  </nav>

  <!-- 2. 英雄区 -->
  <section class="hero">
    <h1>让你的工作更高效的解决方案</h1>
    <p>专注你擅长的事，剩下的交给我们。</p>
    <button class="cta-btn">立即开始</button>
  </section>

  <!-- 3. 特色卡片组 -->
  <section class="features" id="features">
    <div class="feature-card">
      <span class="new-badge">NEW</span>
      <h3>智能分析</h3>
      <p>自动识别数据中的模式和趋势。</p>
    </div>
    <div class="feature-card">
      <h3>团队协作</h3>
      <p>实时同步，多人同时编辑。</p>
    </div>
    <div class="feature-card">
      <h3>安全可靠</h3>
      <p>银行级别的加密保护你的数据。</p>
    </div>
  </section>

  <!-- 4. 内容区 -->
  <section class="content-section" id="about">
    <div class="content-text">
      <h2>重新定义你的工作流程</h2>
      <p>从繁琐的重复劳动中解放出来……</p>
    </div>
    <div class="content-image">
      <img src="workflow.jpg" alt="工作流程示意图">
    </div>
  </section>

  <!-- 5. 底部 -->
  <footer class="footer">
    <div class="footer-brand">
      <h4>MyProduct</h4>
      <p>让工作更简单，让生活更美好。</p>
    </div>
    <div class="footer-links">
      <h4>产品</h4>
      <ul>
        <li><a href="#">功能</a></li>
        <li><a href="#">定价</a></li>
        <li><a href="#">更新日志</a></li>
      </ul>
    </div>
    <!-- 更多底部列... -->
  </footer>

  <!-- 6. 浮动按钮 -->
  <button class="back-to-top" aria-label="回到顶部">↑</button>

</body>
</html>
```
:::

:::example{title="常见错误——综合项目中的典型踩坑"}
**错误 1：整个页面只用一个布局工具——Grid 的用 Flexbox 硬做，或反之**

```css
/* ❌ 错误：用 Grid 做导航栏——杀鸡用牛刀 */
.navbar {
  display: grid;
  grid-template-columns: auto 1fr;
}
/* 导航栏只需要一维排列，Grid 反而多了不必要的列定义 */

/* ✅ 正确：导航栏用 Flexbox，简单直接 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

**错误 2：响应式断点写在了 CSS 文件的不同位置，导致优先级混乱**

```css
/* ❌ 错误：响应式样式散落在文件各处，很难维护 */
/* 第 50 行 */
@media (max-width: 640px) { .hero { ... } }
/* 第 200 行 */
@media (max-width: 640px) { .footer { ... } }
/* ... 谁知道还有哪些 640px 的样式？ */

/* ✅ 正确：每个组件的响应式样式紧跟在基础样式后面 */
.hero { /* 基础样式 */ }
@media (max-width: 639px) { .hero { /* 手机 */ } }
@media (min-width: 1024px) { .hero { /* 桌面 */ } }
/* —— 一个组件写完，再写下一个 —— */
.features { /* 基础样式 */ }
@media (max-width: 639px) { .features { /* 手机 */ } }
```

**错误 3：position: sticky 的导航栏挡住了后面的内容**

```css
/* ❌ 错误：sticky 导航栏覆盖了 hero 区域的顶部 */
.navbar {
  position: sticky;
  top: 0;
  height: 60px;
}
/* hero 区域的顶部 60px 被导航栏遮住了 */

/* ✅ 正确：给 hero 或 body 加 padding-top */
.navbar ~ * {
  /* 或者在 body 上加 scroll-padding-top */
}

/* 最简单的方式：给 hero 第一个元素加 margin-top */
.hero {
  padding-top: calc(40px + 60px); /* 加上导航栏高度 */
}
```

或者用 `scroll-padding-top`（更优雅）：
```css
html {
  scroll-padding-top: 60px;  /* 等于导航栏高度 */
}
```
:::

:::hint{title="布局工具选择速查——什么时候用什么"}
在做这个项目时，遇到"该用 Flexbox 还是 Grid"的疑问，按这个流程判断：

1. **这个区域需要行和列同时对齐吗？** → 是 → Grid。否 → 下一步
2. **内容是横向排列还是纵向排列？** → 横向（一排导航链接）→ Flexbox。纵向（列表）→ Flexbox 也可以，但考虑是否有列对齐需求
3. **元素需要跨列/跨行吗？** → 是 → 只能用 Grid
4. **元素需要脱离文档流吗？** → 是（角标、浮窗、固定按钮）→ Position

**一个实用的经验法则：** 页面的大骨架（整体分区）用 Grid，骨架内部的小排列用 Flexbox，特殊元素用 Position。
:::

:::task{title="逐步构建你的落地页 ✨"}

::::step{purpose="从整体结构开始——先用 Grid 把页面划分出区域，用背景色区分每个区域。这是'先画格，再填内容'的思路，和建筑师先画框架再砌墙一样。" expected="页面上出现了导航栏、英雄区、特色区、内容区、底部五个区域，每个区域有不同的背景色。代码只有 Grid 容器定义和区域背景色。"}
1. 打开右侧编辑器的 `style.css` 和 `index.html`
2. `index.html` 中已经提供了完整骨架（与第六节示例一致），先通读一遍，理解五个区域的结构
3. 在 `style.css` 中先写整体结构，给每个区域加不同的临时背景色用来调试：
   ```css
   .navbar { background: #f0f0f0; }
   .hero { background: #e8f4fd; }
   .features { background: #fef9e7; }
   .content-section { background: #e8f8e8; }
   .footer { background: #333; }
   ```
4. 切换到预览区，确认五个区域按顺序排列，颜色不同
::::

::::step{purpose="导航栏是 Flexbox 最经典的应用——Logo 靠左，链接靠右，所有项垂直居中。`space-between` 是导航栏的灵魂：它自动把多余空间放在 Logo 和链接之间。" expected="导航栏中 Logo 在最左侧，四个链接在右侧均匀排列。所有元素在 60px 高的导航栏中垂直居中。"}
1. 实现 `.navbar` 的 Flexbox 布局：
   ```css
   .navbar {
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 0 24px;
     height: 60px;
   }
   .nav-links {
     display: flex;
     gap: 24px;
     list-style: none;
   }
   ```
2. 加上 `position: sticky; top: 0;` 让导航栏滚动时固定在顶部
3. 在 `@media (max-width: 639px)` 中把导航改为纵向排列
::::

::::step{purpose="英雄区是 Flexbox 居中的典型应用——内容需要在区域中央水平+垂直居中。`flex-direction: column` 确保标题、描述、按钮从上到下排列。" expected="渐变背景区域中，标题、描述和 CTA 按钮在可视区域中央垂直+水平居中。"}
1. 实现 `.hero` 的居中布局：
   ```css
   .hero {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     text-align: center;
     min-height: 80vh;
   }
   ```
2. 添加渐变背景，调整标题字号
3. 在平板和桌面断点中放大标题：`h1 { font-size: 3.5rem; }`
::::

::::step{purpose="特色卡片组可以选 Flexbox 或 Grid——两种方案都实现一遍，亲手感受它们的区别。Flexbox 更灵活，Grid 更精确。选择哪个取决于你希望卡片是否严格对齐列线。" expected="三张特色卡片横向排列，每张卡片有图标、标题和描述。拖动窗口宽度时卡片自动换行（Flexbox）或保持列数（Grid）。"}
1. 先用 Flexbox 实现：
   ```css
   .features {
     display: flex;
     flex-wrap: wrap;
     gap: 24px;
   }
   .feature-card { flex: 1 1 280px; }
   ```
2. 对比 Grid 实现：
   ```css
   .features {
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     gap: 24px;
   }
   ```
3. 两种方案都试一遍，感受差异
4. 在响应式断点中将列数从 3 改为 2 改为 1
::::

::::step{purpose="内容区用 Grid 两栏——文字在左、图片在右。`align-items: center` 让文字和图片在垂直方向对齐，即使它们高度不同。" expected="内容区呈现左右两栏布局——左侧文字描述，右侧图片。在手机上自动切换为图片在上、文字在下。"}
1. 实现 `.content-section` 的两栏 Grid：
   ```css
   .content-section {
     display: grid;
     grid-template-columns: 1fr 1fr;
     gap: 48px;
     align-items: center;
   }
   ```
2. 添加 `.reverse` 变体实现交替布局（图片在左）
3. 在手机断点中改为单列：`grid-template-columns: 1fr;`
::::

::::step{purpose="底部区域用 Grid 多列划分区域，每列内部用 Flexbox 纵排链接。这是 Grid + Flexbox 混合使用的经典示范。" expected="底部呈现四列布局——品牌介绍宽一些，后面三列是产品链接、公司信息、社交媒体。"}
1. 实现 `.footer` 的四列 Grid：
   ```css
   .footer {
     display: grid;
     grid-template-columns: 2fr 1fr 1fr 1fr;
     gap: 40px;
   }
   ```
2. 每列的链接列表用 Flexbox 纵排
3. 在平板断点中改为两列，手机断点中改为单列
::::

:::

:::recap
这是 CSS 布局的"毕业作品"——你将 Flexbox、Grid、Position、居中和响应式全部组合在一起，从零搭建了一个专业的落地页。

**你在本项目中使用到的技术清单：**

| 技术 | 用在哪个区域 | 关键属性 |
|------|-------------|----------|
| Flexbox | 导航栏、英雄区、卡片组（方案A） | `display: flex`, `justify-content: space-between`, `align-items: center` |
| Grid | 内容区、底部、卡片组（方案B） | `grid-template-columns`, `fr`, `gap`, `align-items: center` |
| Position | 导航栏（sticky）、浮动按钮（fixed）、角标（absolute） | `position: sticky/fixed/absolute`, `top/right` |
| 居中 | 英雄区、卡片内容 | `justify-content: center`, `align-items: center`, `text-align: center` |
| 响应式 | 所有区域 | `@media (min-width: 640px)`, `@media (min-width: 1024px)` |

**从零搭建落地页的标准工作流程：**
1. 规划结构（纸上/注释中画出各区域）
2. 写 HTML 骨架（给每个区域一个 class）
3. 用背景色调试——确保区域顺序和占位正确
4. 逐个区域实现 CSS（导航 → 英雄 → 特色 → 内容 → 底部）
5. 每个区域的基础样式写完就写响应式
6. 最后加 Position 点缀（浮动按钮、角标等）
7. 在所有断点上实测（手机、平板、桌面）

**你已经具备了用 CSS 从零搭建专业页面的能力。** 从下一章开始，你将学习 JavaScript——让这些页面"活"起来，响应用户的点击、输入和交互。
:::
