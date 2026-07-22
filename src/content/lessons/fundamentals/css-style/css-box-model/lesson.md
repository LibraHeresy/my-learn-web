# 盒模型 — 理解元素的空间

:::analogy
每个 HTML 元素都是一个盒子，就像快递包裹——`content` 是你买的商品，`padding` 是包裹里的泡沫填充，`border` 是纸箱，`margin` 是快递包裹堆在一起时的间隔。理解了这四层，你就理解了 CSS 布局的基础。
:::

:::prerequisite
**本节你需要知道这些词：**

- **CSS 基本规则**：`选择器 { 属性: 值; }` 的句式已经熟悉
- **背景和边框**：`background-color`、`border`、`border-radius`——上一节刚学过
- **`<div>` 元素**：块级容器，是用来演示盒模型的最佳材料
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 画出盒模型的四层结构图：content、padding、border、margin
- 区分 `padding`（内边距）和 `margin`（外边距）的用途
- 用 `box-sizing: border-box` 避免宽高计算溢出
- 解释为什么每个元素都是一个"盒子"
:::

:::explain{title="一、盒模型的四层结构"}
从内到外，每个元素都是四层同心矩形：

<div class="box-model-demo">
  <--- margin（外边距，透明，元素和元素之间的距离）--->
  <--- border（边框，可见的边界线）--->
  <--- padding（内边距，有背景色，内容和边框之间的距离）--->
  content（内容，文字/图片的实体区域）
</div>

用代码来理解这个结构：

```css
.card {
  /* 最内层：内容区。width 和 height 默认只控制这里 */
  width: 300px;

  /* 第二层：padding。内容到边框的距离。有背景色 */
  padding: 24px;

  /* 第三层：border。边框线。在 padding 的外面 */
  border: 2px solid #D4C5A9;

  /* 最外层：margin。边框到相邻元素的距离。完全透明 */
  margin: 20px;
}
```

**记住一句话：** `padding` 在边框里面（有背景色），`margin` 在边框外面（永远透明）。就像泡沫填充在纸箱里面，包裹间距在纸箱外面。
:::

:::explain{title="二、padding 和 margin —— 什么时候用哪个？"}
两个属性看起来都能"推开距离"，但它们的用途完全不同：

| | padding（内边距） | margin（外边距） |
|---|---|---|
| **位置** | 边框里面 | 边框外面 |
| **有背景色吗** | 有 | 没有（透明） |
| **用途** | 让内容不和边框贴在一起 | 让元素之间不挤在一起 |
| **类比** | 书页的页边距（白边） | 两本书之间的距离 |

**一个简单的判断方法：** 如果你想在元素内部增加空白——用 `padding`。如果你想在两个元素之间增加空白——用 `margin`。

```css
.card {
  padding: 24px;        /* 内容（文字）到边框的距离。在"盒子里面"留白 */
  margin-bottom: 20px;  /* 这张卡片和下一张卡片之间的距离。在"盒子外面"留白 */
}
```

打开浏览器的 DevTools（F12），鼠标移动到元素上，你会看到不同颜色标示的四层空间——这是理解盒模型最直观的方式。
:::

:::explain{title="三、box-sizing — 最难理解也最重要的属性"}
默认情况下（`box-sizing: content-box`），`width` 只控制**内容区**的宽度。`padding` 和 `border` 会另外加上去，导致元素实际占用的空间超过你设的 `width`：

```css
/* 默认 box-sizing: content-box 的陷阱 */
.card {
  width: 100%;          /* 内容区 = 父容器宽度的 100% */
  padding: 24px;        /* 左右共增加 48px！ */
  border: 2px solid;    /* 左右边框又增加 4px！ */
  /* 实际占用宽度 = 100% + 48px + 4px = 溢出了！出现水平滚动条 */
}
```

**这就是 `box-sizing: border-box` 要解决的问题：**

```css
.card {
  box-sizing: border-box;  /* width 现在包含 content + padding + border */
  width: 100%;             /* 实际占用宽度 = 100%，不会溢出 */
  padding: 24px;           /* padding 和 border 向内挤压 content */
  border: 2px solid;
  /* 完美！没有水平滚动条 */
}
```

**类比：** `content-box` 像只算房间内面积，不算墙壁厚度，加墙就超红线。`border-box` 像算整套房子的建筑面积，墙壁厚度算在总面积里，永远不会超红线。

**推荐在所有项目中加上这段 CSS reset：**
```css
*, *::before, *::after {
  box-sizing: border-box;
}
```
这一行代码让所有元素都使用 `border-box`，避免 90% 的宽高溢出 bug。本项目已经在全局样式中加上了这一行。
:::

:::example{title="看例子"}
下面的代码是编辑器中你看到的。两张卡片各有自己的 padding 和 margin：

```css
.card {
  background-color: #FFFAF2;
  border: 2px solid #D4C5A9;
  border-radius: 8px;
  padding: 24px;          /* 内边距：内容到边框的距离，在盒子里 */
  margin-bottom: 20px;    /* 外边距：卡片之间的间隔，在盒子外 */
}
```

打开 DevTools（F12），选中一张卡片，看浏览器用不同颜色标示的四层空间。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：`padding` 和 `margin` 傻傻分不清**
```css
/* 想给卡片内部增加留白 */
.card {
  margin: 30px;  /* ❌ 用错了！margin 是盒子外的距离，盒子里面还是挤 */
  padding: 30px; /* ✅ 这才是盒子内部的留白 */
}
```
你修改 `padding` 和 `margin` 后，在 DevTools 里看看元素的颜色标记——`padding` 区域有背景色，`margin` 区域是透明的。这是最直观的区分方式。

**错误 2：`margin-top` 和 `margin-bottom` 都写了，以为会叠加**
```css
.card-1 { margin-bottom: 20px; }
.card-2 { margin-top: 30px; }
/* 实际间距是 30px，不是 50px！上下 margin 会"合并"（取最大值） */
```
这是 margin collapsing（外边距合并）——相邻的上下 margin 不会累加，而是取其中更大的值。这是 CSS 的设计行为，不是 bug。

**错误 3：给行内元素（如 `span`、`a`）设置上下 margin**
```css
a {
  margin-top: 20px;    /* ❌ 行内元素的上下 margin 无效 */
  margin-bottom: 20px; /* ❌ 同样无效 */
}
```
行内元素（`span`、`a`、`em` 等）的上下 `margin` 和上下 `padding` 不会影响外部布局。如果需要上下间距，先把元素改成 `display: inline-block` 或 `display: block`。

**错误 4：忘记浏览器的默认 margin**
```css
h2 {
  /* 你以为 h2 没有间距，但浏览器默认给了上下 margin */
  /* 这就是为什么标题和上文之间总有你不想要的空隙 */
}
```
浏览器会给 `h1`-`h6`、`p`、`body` 等元素设置默认的 `margin`。很多 CSS reset 的第一步就是把这些默认值清零。如果你发现元素之间有"莫名"的空白，打开 DevTools 看看——很可能是浏览器默认的 margin。
:::

:::explain{title="四、实际工作中你会怎么用？"}
盒模型是你每天都会面对的概念。在真实项目中：

- **调试布局时**，打开 DevTools 的 Computed 面板，看每个元素的盒模型图示——它会用不同颜色标出 content、padding、border、margin，一目了然
- **写组件 CSS 时**，`padding` 决定组件内部的"呼吸空间"，`margin` 决定组件之间的"社交距离"
- **响应式布局时**，在小屏幕上减小 `padding` 和 `margin` 来节省空间，在大屏幕上增大它们来利用空间

**布局的本质就是两个字：间距。** 你后面学习的 flexbox、grid 布局，本质上都是在更高效地管理元素的盒子空间。
:::

:::task{title="动手试试 ✨"}

::::step{purpose="`padding` 是内容到边框的内部空间。减小 padding，内容和边框贴得很紧——像字写到纸边缘一样挤。" expected="卡片里的文字紧贴边框，看起来很局促。这就是 padding 不够的后果——内容没有呼吸空间。"}
把 `.card` 的 `padding` 从 `24px` 改成 `4px`，感受内容挤在边框边缘的不适感
::::

::::step{purpose="增大 padding 给内容更多呼吸空间。padding 越大，内容区和边框之间的距离越远。" expected="卡片里的文字四周有大量留白。合适的 padding 让内容看起来从容不迫。"}
把 `padding` 改成 `48px`，感受宽松的内部空间
::::

::::step{purpose="`margin` 是元素之间的外部距离。加大 margin-bottom 让卡片之间离得更远。" expected="两张卡片之间的间隔明显变大了。这就是 margin 的作用——控制元素之间的社交距离。"}
把 `margin-bottom` 从 `20px` 改成 `60px`，看卡片间距拉大
::::

::::step{purpose="浏览器会给某些元素默认的 margin。`h2` 默认有上下 margin，有时会显得多余。给 `h2` 加 `margin-top: 0` 可以消除顶部多余间距。" expected="h2 标题的顶部间距消失了，文字紧贴卡片顶部。这就是为什么很多 CSS 框架会先重置默认样式。"}
给 `h2` 添加 `margin-top: 0`，消除浏览器默认的顶部间距
::::

:::

:::recap
回顾本节你学会的内容：
- **盒模型四层结构**：content（内容）→ padding（内边距）→ border（边框）→ margin（外边距）
- **padding vs margin**：padding 在边框内（有背景色），margin 在边框外（透明）
- **padding 用途**：让内容和边框之间有空隙，像书页的页边距
- **margin 用途**：让元素和元素之间有空隙，像两本书之间的距离
- `box-sizing: border-box`：让 `width` 包含 content + padding + border，避免溢出
- **调试技巧**：F12 打开 DevTools，看元素用不同颜色标示的盒模型图示

下一节你将学习选择器——如何精确地"指到"你想要装饰的元素，而不会误伤其他。
:::
