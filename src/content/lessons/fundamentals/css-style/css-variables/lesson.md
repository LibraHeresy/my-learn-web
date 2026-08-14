# CSS 变量 — 一次定义，全局共鸣

:::analogy
CSS 变量就像公司的品牌色卡——主色调定义一次，全站所有页面、所有按钮、所有标题统一引用。品牌要换主色？改色卡上那一格，全站自动同步。如果没有品牌色卡，你需要去每一个按钮、每一个标题、每一个卡片里手动改——漏掉一个就出 bug。
:::

:::prerequisite
**本节你需要知道这些词：**

- **CSS 基本规则**：`选择器 { 属性: 值; }` 已经熟练
- **选择器**：知道类选择器（`.card`）和后代选择器（`.card h2`）
- **层叠与优先级**：理解"后写覆盖先写"的基本规则
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 用 `--变量名` 定义 CSS 自定义属性，用 `var()` 引用它们
- 理解 CSS 变量的作用域：在 `:root` 定义全局，在局部覆盖
- 解释为什么要用变量——"改一处，全局生效"
- 用变量实现简单的明暗主题切换
:::

:::explain{title="一、没有变量的时候，改一整套配色有多痛苦？"}
假设你做了一个页面，有卡片、按钮、标题、链接——都用到了品牌的暗红色 `#8B2E2E`：

```css
.card h2           { color: #8B2E2E; }
.card-left         { border-color: #8B2E2E; }
.btn-primary       { background: #8B2E2E; }
.nav-link.active   { color: #8B2E2E; }
.footer a:hover    { color: #8B2E2E; }
.tag               { background: #8B2E2E; }
/* ... 还有 15 处用到了 #8B2E2E ... */
```

有一天设计师说："品牌色换了，暗红改成深蓝 `#2E5B8B`。"

你需要在这 20+ 个地方逐一找到 `#8B2E2E` 并替换成 `#2E5B8B`。用 Ctrl+F 查找替换？但 `#8B2E2E` 可能也出现在注释里，或者某个元素的阴影颜色恰好也是这个值——全局替换可能误伤。最怕的是：改漏了一处，那个地方仍然是旧颜色，而且测试时可能没发现。

**这就是 CSS 变量要解决的问题：把一个值定义在一个地方，所有用到它的地方自动同步。**
:::

:::explain{title="二、用变量消除重复——改一处，全站更新"}
用 CSS 变量重写上面的代码，暗红色只出现在一个地方：

```css
/* 第一步：在 :root 中定义变量（全局作用域） */
:root {
  --brand-color: #8B2E2E;      /* 品牌主色，只定义这一处 */
  --card-bg: #FFFAF2;           /* 卡片底色 */
  --spacing-md: 16px;           /* 常用间距 */
  --radius: 8px;                /* 通用圆角 */
}

/* 第二步：在需要的地方用 var() 引用变量 */
.card h2           { color: var(--brand-color); }
.card-left         { border-color: var(--brand-color); }
.btn-primary       { background: var(--brand-color); }
.nav-link.active   { color: var(--brand-color); }
.footer a:hover    { color: var(--brand-color); }
.tag               { background: var(--brand-color); }
```

现在品牌色要改成深蓝 `#2E5B8B`？只改 `:root` 里的 `--brand-color` 一行，全站 20+ 处自动同步。

**这就是 CSS 变量的核心价值：单一真相来源（Single Source of Truth）。** 一个值只定义一次，所有引用点跟着走。
:::

:::explain{title="三、逐句拆解——变量的定义和使用"}
CSS 变量的语法很简单，只有两个部分：

```css
/* 定义变量：两根短横线开头，后面跟变量名 */
:root {
  --main-color: #8B2E2E;    /* 定义 --main-color，值是 #8B2E2E */
  --spacing: 16px;           /* 定义 --spacing，值是 16px */
  --font-stack: "Noto Serif SC", serif;  /* 变量可以存储复合值 */
}

/* 使用变量：var(变量名) */
.card {
  color: var(--main-color);           /* 引用 --main-color */
  padding: var(--spacing);            /* 引用 --spacing */
  font-family: var(--font-stack);     /* 引用 --font-stack */

  /* var() 的第二个参数是备用值（fallback） */
  color: var(--undefined-var, #333);  /* 变量不存在时，用 #333 */
}
```

**变量命名规则：**
- 必须以 `--` 开头（两根短横线）
- 大小写敏感：`--mainColor` 和 `--maincolor` 是两个不同的变量
- 命名惯例：`--类别-属性`，如 `--color-primary`、`--spacing-lg`、`--font-heading`
- 不能用数字开头：`--1color` 非法，`--color1` 合法
:::

:::explain{title="四、变量的作用域——全局 vs 局部"}
CSS 变量遵循 CSS 的层叠规则——子元素继承父元素的变量值，局部覆盖全局：

```css
/* :root = 全局作用域。在这里定义的变量全页面可用 */
:root {
  --card-bg: #FFFAF2;        /* 全局：暖白 */
  --card-accent: #8B2E2E;    /* 全局：暗红 */
}

/* 在 .card.dark 中重新定义变量的值——只影响这张卡片 */
.card.dark {
  --card-bg: #3D2B1F;        /* 局部覆盖：深棕 */
  --card-accent: #C9A96E;    /* 局部覆盖：金色 */
}

/* 所有卡片使用完全相同的 CSS 规则 */
.card {
  background: var(--card-bg);
  border-left: 4px solid var(--card-accent);
}
.card h2 { color: var(--card-accent); }
```

**效果：** `.card`（普通卡片）用 `:root` 的全局值（暖白底 + 暗红边），`.card.dark` 用自己覆盖后的局部值（深棕底 + 金边）。两套配色，一组 CSS 规则——这就是**主题切换**的原理。
:::

:::explain{title="五、实际场景——主题切换的完整演示"}
把这个思路扩展成完整的明暗主题：

```css
/* === 全局：浅色主题（默认）=== */
:root {
  --bg: #FFFFFF;
  --text: #333333;
  --accent: #8B2E2E;
  --card-bg: #FFFAF2;
  --border: #D4C5A9;
}

/* === 深色主题：覆盖变量值 === */
[data-theme="dark"] {
  --bg: #1A1A2E;
  --text: #E0E0E0;
  --accent: #C9A96E;
  --card-bg: #2D2D44;
  --border: #444466;
}

/* === 组件样式：全部用 var() 引用，不碰具体颜色值 === */
body           { background: var(--bg); color: var(--text); }
.card          { background: var(--card-bg); border: 1px solid var(--border); }
.card h2       { color: var(--accent); }
.btn-primary   { background: var(--accent); }
```

切换主题只需要一行 JavaScript：`document.documentElement.setAttribute('data-theme', 'dark');`。所有颜色瞬间切换，CSS 一行不动。

**这是现代网站做主题切换的标准方式。** 从博客到 SaaS 后台，从个人主页到电商平台，都靠这套机制。
:::

:::example{title="看例子"}
下面的代码在 `:root` 中定义了色彩变量，其中一张卡片通过 `.dark` 类覆盖了局部变量值。两张卡片用**完全相同的 CSS 规则**，只因变量值不同而呈现截然不同的风格：

```css
/* === 全局变量：浅色配色 === */
:root {
  --card-bg: #FFFAF2;
  --card-accent: #8B2E2E;       /* 暗红强调色 */
  --card-text: #6B5A4E;          /* 深棕正文 */
}

/* === 局部覆盖：暗色配色 === */
.card.dark {
  --card-bg: #3D2B1F;
  --card-accent: #C9A96E;       /* 金色强调 */
  --card-text: #B8A898;          /* 浅褐正文 */
}

/* === 通用的卡片规则——不硬编码颜色，全部用变量引用 === */
.card {
  background: var(--card-bg);
  border-left: 4px solid var(--card-accent);
}
.card h2 { color: var(--card-accent); }
.card p  { color: var(--card-text); }
```

看预览区——白天与黑夜，同一套规则，两组变量。这就是 CSS 变量的威力。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：变量名忘记 -- 前缀**
```css
:root {
  main-color: #8B2E2E;          /* ❌ 没有 -- 前缀，这不是 CSS 变量 */
  --main-color: #8B2E2E;        /* ✅ 这才对 */
}
```
CSS 变量必须以 `--` 开头。没有 `--` 的只是无效的属性名。

**错误 2：var() 中的变量不存在且没有 fallback**
```css
.card {
  color: var(--typo-color);     /* ❌ 变量不存在，color 会继承父元素的值 */
  color: var(--typo-color, red); /* ✅ 变量不存在时用 red 作为 fallback */
}
```
如果引用的变量不存在，且没有提供 fallback，浏览器会当这个属性没写过——回退到继承或默认值。

**错误 3：变量值中有空格导致问题**
```css
:root {
  --size: 16 px;                 /* ❌ 16 和 px 之间有空格，var() 不会当作 16px */
  --size: 16px;                  /* ✅ 值中间不能有空格 */
}
```
CSS 变量把整个值当作字符串存储。`16 px` 在变量中是合法的，但当你写 `padding: var(--size)` 时，浏览器不会把它当成 `16px`。

**错误 4：在媒体查询中企图修改变量值来响应式**
```css
:root { --spacing: 40px; }
@media (max-width: 768px) {
  :root { --spacing: 20px; }    /* ✅ 这其实是合法的！可以在媒体查询中改 */
}
```
这其实**不是**错误——CSS 变量的一个重要优势就是可以在媒体查询中修改。很多学习资料会告诉你"CSS 变量不能在媒体查询中改"，那是过时的说法了。
:::

:::explain{title="六、实际工作中你会怎么用？"}
在真实项目中，CSS 变量通常用来管理：

- **色彩系统**：`--color-primary`、`--color-secondary`、`--color-bg`、`--color-text`——10-20 个颜色变量覆盖全站
- **间距系统**：`--spacing-xs`（4px）、`--spacing-sm`（8px）、`--spacing-md`（16px）、`--spacing-lg`（24px）——统一全站间距节奏
- **排版系统**：`--font-heading`、`--font-body`、`--font-size-sm`、`--font-size-lg`
- **圆角系统**：`--radius-sm`（4px）、`--radius-md`（8px）、`--radius-lg`（16px）
- **阴影系统**：`--shadow-card`、`--shadow-button`

**这个项目就在用这套模式。** 打开 `src/styles/variables.css`，看看这个网站是如何把颜色、间距、字体全部用变量管理的。你会看到真实的工程设计是什么样子。
:::

:::task{title="动手试试 ✨"}

::::step{purpose="CSS 变量的核心优势：在 `:root` 中改 `--card-accent` 一个值，所有用到 `var(--card-accent)` 的地方（标题颜色、左边框、标签背景）全部同步变化。这就是'改一处，全局生效'。" expected="浅色卡片的强调色（标题、左边框）变成了你改的新颜色；暗色卡片因为在自己身上覆盖了 `--card-accent`（局部作用域），仍然保持金色——这恰好演示了变量的作用域规则。"}
修改 `:root` 中的 `--card-accent` 颜色（试试 `#2E5B8B` 深蓝），看两张卡片的变化
::::

::::step{purpose="练习自己定义和使用 CSS 变量。以后要统一修改圆角大小，只需要改 `--radius` 一个值。" expected="修改 `--radius` 的值，两张卡片的圆角同时变化。"}
在 `:root` 中新增一个 `--radius: 8px` 变量，把两张卡片的 `border-radius` 改成 `var(--radius)`
::::

::::step{purpose="理解 CSS 变量的作用域规则。在 `.card.dark` 中重新定义的变量只会影响这张卡片，`:root` 中的全局值保持不变。" expected="暗色卡片变成了你自定义的配色方案，但浅色卡片保持原来的 `:root` 配色不变。"}
修改 `.card.dark` 中的变量值，创造你自己的暗色主题色板
::::

::::step{purpose="从零创建一套主题。在 HTML 中加卡片、在 CSS 中定义变量——这就是用 CSS 变量做多主题切换的完整工作流。" expected="页面中出现第三张暖橙色主题的卡片，三张卡片各有不同的配色方案，但共享同一套 CSS 规则。"}
挑战：创建第三张卡片，给它一个 `.warm` 类，定义一套暖橙色调的变量（如 `--card-bg: #FFF8F0`、`--card-accent: #E8943A`）
::::

:::

:::recap
回顾本节你学会的内容：
- **CSS 变量（自定义属性）**：以 `--` 开头，在 `var()` 中引用
- **定义变量**：`--brand-color: #8B2E2E;`
- **引用变量**：`color: var(--brand-color);`
- **fallback**：`var(--brand-color, #333)` ——变量不存在时用备用值
- **:root 全局作用域**：这里定义的变量全页面可用
- **局部覆盖**：在任意元素上重新定义变量值，只有这个元素和它的子元素受影响
- **核心价值**：改一处全局生效、主题切换只需改变量值、代码更干净（不用到处复制粘贴颜色值）

恭喜你完成了 CSS 样式基础的全部 9 节！你已经掌握了从"给文字上色"到"用变量管主题"的完整 CSS 基础技能。接下来你可以进入 CSS 布局章节，学习 flexbox、grid 和响应式设计。
:::
