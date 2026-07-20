# CSS 选择器 — 精确指向你的元素

:::analogy
选择器就像快递员按地址找人——`.card` 像"送到XX小区"（一类收件人），`#title` 像"送给张三本人"（唯一收件人），`:hover` 像"当我把包裹递过去的时候"（特定时刻）。选择器越精确，越能把样式送到正确的元素上。
:::

:::prerequisite
**本节你需要知道这些词：**

- **CSS 基本规则**：`选择器 { 属性: 值; }` 的句式已经熟练
- **HTML 的 `class` 和 `id` 属性**：`class="card"` 是给元素贴标签，`id="title"` 是给元素唯一的身份证号
- **盒模型**：知道每个元素有四层空间——上一节刚学过
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 用元素选择器、类选择器、ID 选择器选中目标
- 用后代选择器和子代选择器表达层级关系
- 用伪类选择器（`:hover`、`:nth-child`）根据状态和位置选中元素
- 理解选择器优先级（权重）的基本概念——为下一节的"层叠"做准备
:::

:::explain{title="一、没有选择器，CSS 就是无头苍蝇"}
选择器告诉 CSS "对谁生效"。如果没有好的选择器，你会遇到这些麻烦：

```html
<div class="card">
  <h2>第一章</h2>
  <p>这是第一个段落的文字。</p>
</div>
<div class="card">
  <h2>第二章</h2>
  <p>这是第二个段落的文字。</p>
</div>
<div class="card">
  <h2>第三章</h2>
  <p>这是第三个段落的文字。</p>
</div>
```

问题：你只想给第二章的卡片换一个背景色。如果不会用选择器，你可能要给每个 `div` 分别写 `<div class="card card-1">`、`<div class="card card-2">`——手工给每个元素起名，既麻烦又难维护。如果 CSS 里全是这种写法，50 个元素就要写 50 行 CSS。

**这就是选择器的核心价值：用最少的规则，覆盖最多的元素，而且能精确到你想覆盖的那一个。**
:::

:::explain{title="二、基础选择器——三种最常用的"}
三种选择器覆盖了你在日常开发中 80% 的需求：

```css
/* 元素选择器：选中所有同类标签 */
h1 { color: #8B2E2E; }        /* 所有 <h1> 都变暗红色 */
p  { font-size: 16px; }        /* 所有 <p> 都是 16px */
/* 适合：全局默认样式，如"所有段落用这个字号" */

/* 类选择器：选中所有带该 class 的元素，以 . 开头 */
.card { background: #FFFAF2; }  /* 所有 class="card" 的元素 */
/* 适合：组件样式，如"所有卡片用这个背景"。最常用！ */

/* ID 选择器：选中唯一带该 id 的元素，以 # 开头 */
#main-title { font-size: 2rem; } /* 只有 id="main-title" 那个元素 */
/* 适合：页面中只出现一次的元素，如主导航、主标题 */
```

**一个元素可以有多个 class（空格分隔），一个 class 也可以给多个元素。** `class` 是 CSS 中最常用的选择器——灵活、可复用、权重适中。
:::

:::explain{title="三、组合选择器——表达层级关系"}
选择器可以组合，精确指定"谁的内部"、"谁的直接子元素"、"同时具备两个 class"：

```css
/* 后代选择器：空格连接——"A 内部的所有 B" */
.card h2 { color: #8B2E2E; }
/* 选中 .card 内部的所有 <h2>，不管嵌套多深 */

/* 子代选择器：> 连接——"A 的直接子元素 B" */
.card > h2 { margin-top: 0; }
/* 只选中 .card 的直接子 <h2>，更深层的 <h2> 不受影响 */

/* 分组选择器：逗号连接——"同时给 A 和 B 设置样式" */
h2, h3 { font-family: "Noto Serif SC", serif; }
/* h2 和 h3 共享同样的字体 */

/* 交集选择器：紧贴——"同时具备 classA 和 classB 的元素" */
.card.featured { border-color: gold; }
/* 只有 <div class="card featured"> 才会匹配 */
```

**一个重要的区别——后代 vs 子代：** 后代选择器（空格）会穿透多层嵌套，子代选择器（`>`）只在直接父子之间生效。大多数时候用后代选择器就够了，只有在需要严格限定层级时才用子代选择器。
:::

:::explain{title="四、伪类选择器——状态和位置触发的魔法"}
伪类以 `:` 开头，根据元素的**状态**或**位置**来应用样式，不需要修改 HTML：

```css
/* :hover —— 鼠标悬停时触发。交互感的来源 */
.card:hover {
  border-color: #C9A96E;
  transform: translateY(-2px);  /* 卡片微微上浮 */
}

/* :first-child —— 父元素的第一个子元素 */
.card:first-child { border-left: 4px solid #8B2E2E; }

/* :last-child —— 父元素的最后一个子元素 */
.card:last-child { border-left: 4px solid #5B8C5A; }

/* :nth-child(n) —— 父元素的第 n 个子元素。n 从 1 开始 */
.card:nth-child(1) { border-left-color: #8B2E2E; }  /* 第1张 */
.card:nth-child(2) { border-left-color: #C9A96E; }  /* 第2张 */
.card:nth-child(3) { border-left-color: #5B8C5A; }  /* 第3张 */
```

**`:nth-child` 的威力：** 不需要给每张卡片单独加 `class`，CSS 自动按位置给它们不同的样式。卡片从 3 张增加到 10 张时，你只需要复制 HTML（不改 CSS），前 3 张自动有颜色。
:::

:::explain{title="五、选择器权重（特异性）基础"}
当一个元素同时被多条规则选中时，谁的权重高谁胜出。权重的计算规则（为下一节"层叠"做准备）：

```css
/* 权重的计算单位：(ID数, 类数, 元素数) */

h1                  /* (0, 0, 1) — 权重最低 */
.card h1            /* (0, 1, 1) — 比上面高 */
#main h1            /* (1, 0, 1) — 比上面都高 */
.card.featured h1   /* (0, 2, 1) — 两个类，比一个类高 */

/* 行内样式权重最高 */
<div style="color: red;">  /* (1, 0, 0, 0) — 直接写在标签上的样式 */
```

**记住一个规律：** ID > 类 > 元素。后写的覆盖先写的（权重相同时）。如果你发现一条 CSS 被划掉了（DevTools 里显示删除线），一定是被更高权重的规则覆盖了。

下一节会深入讲层叠和优先级——这里先记住"权重"这个概念就够了。
:::

:::example{title="看例子"}
下面的代码有三张卡片，用不同的选择器给它们设置了左侧的强调色。注意 CSS 没有给每张卡片单独加 class——`:nth-child` 按位置自动分配颜色：

```css
/* 所有卡片共享的样式——用类选择器 */
.card {
  background-color: #FFFAF2;
  border: 1px solid #D4C5A9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

/* 鼠标悬停——用伪类选择器 */
.card:hover {
  border-color: #C9A96E;
  transform: translateY(-2px);
}

/* 按位置分配不同颜色——用 nth-child 伪类 */
.card:nth-child(1) { border-left: 4px solid #8B2E2E; }  /* 第1张: 暗红 */
.card:nth-child(2) { border-left: 4px solid #C9A96E; }  /* 第2张: 金色 */
.card:nth-child(3) { border-left: 4px solid #5B8C5A; }  /* 第3张: 深绿 */
```

把鼠标移到卡片上，看 `:hover` 触发的上浮效果。如果再加第 4 张卡片，前 3 张的颜色不受影响。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：类选择器忘记写 `.`**
```css
card { color: red; }   /* ❌ 浏览器以为 card 是一个 HTML 标签 */
.card { color: red; }  /* ✅ 这样才选中 class="card" */
```

**错误 2：ID 选择器忘记写 `#`**
```css
title { font-size: 2rem; }  /* ❌ 浏览器以为 title 是标签名 */
#title { font-size: 2rem; } /* ✅ 选中 id="title" 的元素 */
```

**错误 3：`:nth-child` 从 1 开始计数，不是从 0**
```css
.card:nth-child(0) { ... }   /* ❌ 不会选中任何元素 */
.card:nth-child(1) { ... }   /* ✅ 选中第一个子元素 */
```
这与 JavaScript 的数组索引（从 0 开始）不同，`:nth-child` 从 1 开始。

**错误 4：用后代选择器（空格）时范围太大**
```css
.card p { margin: 0; }
/* 这会选中 .card 内所有层级的 <p>，包括嵌套很深的 */
/* 如果你只想选直接子段落，用 .card > p */
```
后代选择器很方便，但也会"穿透"多层嵌套。如果发现样式影响到了不该影响的元素，考虑换成子代选择器（`>`）。
:::

:::explain{title="六、实际工作中你会怎么用？"}
在真实项目中，选择器的使用有清晰的格局：

- **全局默认样式**：用元素选择器——`body`、`h1`、`p`、`a`
- **组件样式**：用类选择器——`.card`、`.btn`、`.nav-item`。这是主力
- **页面唯一元素**：用 ID 选择器——`#main-nav`、`#hero-section`
- **交互状态**：用伪类——`:hover`、`:focus`、`:active`
- **列表差异化**：用 `:nth-child`——斑马纹表格、多色标签

**一个被低估的原则：** 尽量用类选择器，少用 ID 选择器。ID 的权重太高（100），后面想用类选择器覆盖它非常困难。除非元素真的是页面唯一的（如主导航），否则用 class 就好。
:::

:::task{title="动手试试 ✨"}

::::step{purpose="`:nth-child(n)` 根据元素在父容器中的位置选中它。`nth-child(1)` = 第一个。不需要给每张卡片单独加 class，CSS 自动按位置分配样式。" expected="第一张卡片的左边框颜色变了。注意：改一处 CSS，只有第一张卡片变色，其他不变。"}
把 `.card:nth-child(1)` 的 `border-left` 颜色换一个你喜欢的颜色
::::

::::step{purpose="`:hover` 创建交互反馈——鼠标悬停时激活样式。结合 `box-shadow` 让卡片看起来浮起来了，这是网页最常见的交互模式之一。" expected="鼠标悬停时不仅有上浮动效，还多了阴影。交互感明显增强。"}
给 `.card:hover` 增加一行 `box-shadow: 0 4px 12px rgba(0,0,0,0.1);`，让悬浮效果更立体
::::

::::step{purpose="`:last-child` 自动选中最后一个子元素。不管以后加多少张卡片，最后一张永远自动命中——这是伪类的核心优势。" expected="最后一张卡片有了你设定的特殊样式。`:last-child` 的优势：新加卡片后仍自动命中最后一张。"}
用 `.card:last-child` 给最后一张卡片设置特殊的样式（比如不同的背景色）
::::

::::step{purpose="综合练习：在 HTML 中添加新卡片 + 在 CSS 中用 `:nth-child(4)` 给它样式。`n` 从 1 开始计数。" expected="页面出现第四张卡片，带有你设定的不同颜色强调边框。你独立完成了位置选择器的应用。"}
挑战：在 HTML 中添加第四张卡片，用 `.card:nth-child(4)` 给它设置不同颜色
::::

:::

:::recap
回顾本节你学会的内容：
- **元素选择器**（`h1`）：全局默认样式，选中所有同类标签
- **类选择器**（`.card`）：最常用的选择器，灵活可复用，权重适中
- **ID 选择器**（`#title`）：唯一元素专用，权重高，少用
- **后代选择器**（`.card h2`）：空格连接，穿透所有嵌套层级
- **子代选择器**（`.card > h2`）：`>` 连接，只作用于直接子元素
- **伪类选择器**（`:hover`、`:nth-child`）：根据状态和位置动态选中
- **权重规律**：ID（100）> 类（10）> 元素（1），后写覆盖先写

下一节你将学习层叠与优先级——当多条规则"打架"时，浏览器到底听谁的。
:::
