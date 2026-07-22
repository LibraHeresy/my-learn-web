# 背景与边框 — 为卡片增添层次

:::analogy
背景颜色就像舞台的幕布，边框就像画框的边框。一个素色的 HTML 元素就像一张白纸上的印刷字——没有底色就没有氛围，没有边框就没有边界。加上背景和边框之后，它变成了一个立体的"组件"。
:::

:::prerequisite
**本节你需要知道这些词：**

- **CSS 选择器**：知道 `.card` 选中 `class="card"` 的元素
- **CSS 属性与值**：理解 `属性: 值;` 的基本句式，比如 `color: #8B2E2E;`
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 用 `background-color` 给元素设置背景色
- 用 `border` 的三值简写画出各种边框
- 用 `border-radius` 把直角变成圆角
- 把一个普通的 `div` 从空白矩形改造成有层次感的卡片
:::

:::explain{title="一、没有背景和边框的时候，卡片长什么样？"}
下面是一个很常见的"卡片"结构——图片、标题、描述文字，用 `div` 包在一起：

```html
<div class="card">
  <h2>牡丹亭</h2>
  <p>汤显祖的经典作品，讲述了一段跨越生死的爱情故事。</p>
</div>
```

不加任何 CSS 时，浏览器渲染出来的效果是：`h2` 是默认的加粗大字，`p` 是默认的黑色小字，整个 `div` 是透明的——你看不到卡片的边界，它和周围的文字混在一起，像是随意堆放的几行字。

**问题很明显：** 缺少视觉边界、缺少层次感、缺少"这是一张独立卡片"的暗示。
:::

:::explain{title="二、加上背景和边框之后"}
用 `background-color` 铺上底色，用 `border` 画出边界，用 `border-radius` 柔化四角。同一段 HTML，加上这些 CSS 后：

```css
.card {
  background-color: #FFFAF2;   /* 暖白底色，像旧纸张 */
  border: 2px solid #D4C5A9;   /* 2px 宽的实线边框，米色 */
  border-radius: 12px;         /* 12px 圆角，柔和不尖锐 */
  padding: 24px;               /* 内边距：内容不要贴到边框上 */
}
```

现在这个 `div` 有了明确的边界——暖白色矩形带米色边框和圆角，文字浮在底色之上。读者扫一眼就知道"这是一个独立的卡片组件"。

**这就是背景和边框的价值：把一组 HTML 内容包装成视觉上独立的单元。**
:::

:::explain{title="三、逐句拆解每条属性"}
把上面的 CSS 规则拆开来看，每一条都有明确的职责：

```css
.card {
  /* background-color：给元素铺底色，像给房间刷墙 */
  background-color: #FFFAF2;
  /* 值可以是颜色名(red)、十六进制(#FFFAF2)、rgb(255,250,242) */

  /* border：三值简写——粗细 样式 颜色，像画框的材质描述 */
  border: 2px solid #D4C5A9;
  /*      ↑    ↑     ↑
   *    粗细  样式  颜色
   *    2px=2像素宽  solid=实线  #D4C5A9=米色 */

  /* border-radius：圆角半径，值越大角越圆 */
  border-radius: 12px;
  /* 0 = 纯直角，50% = 正圆形（如果元素是正方形的话） */

  /* padding：内边距，内容到边框的距离，防止文字贴边 */
  padding: 24px;
}
```

**关于边框样式：** `solid` 是实线，除此之外还有 `dashed`（虚线）、`dotted`（点线）、`double`（双线）、`none`（无边框）。`solid` 和 `dashed` 最常用。
:::

:::explain{title="四、background — 不止是纯色"}
除了 `background-color`，CSS 还有一组更强大的背景属性：

```css
.card {
  /* 背景图片 */
  background-image: url("pattern.png");
  /* 背景重复方式：no-repeat(不重复) / repeat-x(水平重复) / repeat(默认平铺) */
  background-repeat: no-repeat;
  /* 背景位置：center(居中) / top left(左上) / 50% 50%(百分比定位) */
  background-position: center;
  /* 背景尺寸：cover(覆盖整个元素) / contain(完整显示图片) / 200px 100px(指定宽高) */
  background-size: cover;
}
```

也可以用一条 `background` 简写属性把上面的值合并：

```css
.card {
  background: #FFFAF2 url("pattern.png") no-repeat center / cover;
  /*         ↑底色      ↑图片         ↑不重复   ↑居中   ↑铺满  */
}
```

**在实际项目中，** 纯色背景（`background-color`）最常见，渐变背景次之，图片背景用在 Hero 区域（页面顶部大图）。你不需要现在就记住所有写法——先用熟 `background-color`，后面按需查文档。
:::

:::example{title="看例子"}
下面的代码创建了一张"书籍卡片"，有暖色背景、细边框和圆角。把鼠标移到卡片上看看边框的微妙变化：

```css
.card {
  background-color: #FFFAF2;      /* 暖白底色：像旧设计稿的纸张 */
  border: 2px solid #D4C5A9;      /* 边框：粗细2px 实线 米色 */
  border-radius: 12px;            /* 圆角：让卡片四角变圆润 */
  padding: 24px;                  /* 内边距：文字和边框之间的呼吸空间 */
}

.card h2 {
  color: #8B2E2E;                 /* 标题颜色：暗红色，和背景形成对比 */
}

.card p {
  color: #6B5A4E;                 /* 正文颜色：深棕色，比纯黑柔和 */
}
```

打开 CSS 选项卡查看完整代码，预览区能看到卡片效果。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：border 三个值顺序写错**
```css
.card {
  border: #D4C5A9 solid 2px;  /* ❌ 虽然也能工作，但惯例是 粗细 样式 颜色 */
}
```
虽然浏览器有时能容错，但按"粗细 → 样式 → 颜色"的顺序写，别人（和未来的你）一眼就能读懂。

**错误 2：把 background-color 写成 background**
```css
.card {
  background: #FFFAF2;  /* ✅ 这是简写，能工作 */
  background: url(...);  /* ⚠️ 这会覆盖掉上面的颜色！ */
}
```
`background` 是简写属性，会重置所有背景相关属性。如果你在一个地方设 `background-color`，另一个地方设 `background-image`，**不要**用 `background` 简写——用单独的 `background-color` 和 `background-image`。

**错误 3：border-radius 给太大值看不出效果**
```css
.card {
  border-radius: 500px;  /* 如果元素宽200px，500px的圆角和100px没区别 */
}
```
当 `border-radius` 的值超过元素尺寸的一半时，浏览器会自动截断。不必写天文数字。

**错误 4：忘记 padding，文字紧贴边框**
```css
.card {
  border: 2px solid #D4C5A9;
  /* ❌ 没有 padding！文字会紧紧挨着边框，看起来非常拥挤 */
}
```
背景和边框定义了"盒子"的外观，但 `padding` 定义了"盒子里面的呼吸空间"。加了边框就一定要加 `padding`，否则文字贴边很难看。
:::

:::explain{title="五、实际工作中你会怎么用？"}
卡片是网页上最常见的组件模式。商品列表页的一个个商品是卡片、博客首页的一篇篇文章是卡片、个人资料页的信息区块也是卡片。

你给卡片加背景和边框，本质上是告诉用户：**"这些内容属于一个整体"**。这在视觉设计里叫"分组原则"——人类天生会把有共同背景或边框的东西视为一组。

**实际项目中的常见套路：**
- 白色卡片 + 浅灰边框 + 小圆角（4-8px）→ 极简干净的现代风格
- 暖色卡片 + 无边框 + 大圆角（12-16px）+ 阴影 → 柔和亲切的产品风格
- 透明背景 + 彩色左边框 + 无圆角 → 信息提示条风格

你现在写的 `#FFFAF2` 暖白 + `#D4C5A9` 米色边框 + `12px` 圆角，属于**古典典雅风格**——适合文化类、书籍类的页面。
:::

:::task{title="动手试试 ✨"}

::::step{purpose="`background-color` 决定卡片的底色。不同的底色传达不同的氛围——暖色温暖，冷色冷静，白色干净。改一个颜色值，整个卡片的风格就变了。" expected="卡片背景色变了。暖橙带来温暖感，浅蓝带来冷静感。颜色是氛围的最直接传达者。"}
把 `.card` 的 `background-color` 换一个颜色（试试 `#FFF8F0` 暖橙，或 `#F0F8FF` 浅蓝）
::::

::::step{purpose="`border` 的三个值（粗细 样式 颜色）各司其职。更粗的边框让卡片边界更明确，但也更"重"。" expected="卡片边框变粗了。粗边框强调边界，细边框含蓄优雅——看你要什么效果。"}
把 `border` 的粗细从 `2px` 改成 `4px`，感受边框变粗后的视觉重量
::::

::::step{purpose="`border-style` 除了 `solid`（实线）还有 `dashed`（虚线）、`dotted`（点线）。不同的线型适合不同的设计语境。" expected="卡片边框从实线变成虚线。虚线更轻量，适合不那么正式的内容区块。"}
把 `border` 的 `solid` 改成 `dashed`，看虚线边框的效果
::::

::::step{purpose="`border-radius` 控制圆角半径。`0` = 纯直角（严肃），`12px` = 大圆角（柔和），`50%` = 正圆形。" expected="卡片四角越来越圆。圆角和直角传达的视觉感受完全不同：圆角更柔和更现代。"}
把 `border-radius` 依次改成 `0`、`24px`，对比直角和圆角的差异
::::

:::

:::recap
回顾本节你学会的内容：
- `background-color`：给元素铺底色，让"卡片"从透明容器变成可视的色块
- `border`：三值简写（粗细 样式 颜色），像画框一样画出元素的边界
- `border-radius`：圆角半径，让尖锐的直角变柔和，值越大越圆
- **边框样式**：`solid`（实线）、`dashed`（虚线）、`dotted`（点线）——根据设计语境选择
- **核心原则**：有边框就一定要有 `padding`，否则文字贴边很难看

下一节你将学习字体和间距——让卡片里的文字不再拥挤，像书本排版一样舒服好读。
:::
