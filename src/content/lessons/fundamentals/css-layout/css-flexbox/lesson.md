# Flexbox 入门 — 灵活排列你的内容

:::analogy
Flexbox 就像整理书架——书可以横着排、竖着排、自动换行、均匀分布。不管书多书少，书架总能摆得整整齐齐。

更重要的是，Flexbox 让你用**一句话**就解决了以前需要 float + clearfix + 手动算宽度的一大堆 hack。你告诉浏览器"这些元素排在一行，间距均匀"，剩下的它帮你搞定。
:::

:::prerequisite
**本节你需要知道这些词：**

- **CSS 选择器**：能用 `.class` 或 `#id` 选中页面上的元素
- **盒模型基础**：知道 `width`、`padding`、`margin` 是什么
- **HTML 父子关系**：理解"父元素包裹子元素"的嵌套结构
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 用 `display: flex` 让子元素横向或纵向排列
- 用 `justify-content` 控制主轴上的对齐分布
- 用 `align-items` 控制交叉轴上的对齐
- 用 `gap` 统一设置元素间距，用 `flex-wrap` 实现自动换行
- 独立完成一个导航栏布局和一个卡片网格布局
:::

:::explain{title="一、没有 Flexbox 的时候，布局有多痛苦？"}
假设你要做一个导航栏，里面有三个链接，横向排列，间距均匀。在 Flexbox 出现之前，你只能这样写：

```css
/* 旧时代的布局方式——float + clearfix */
.nav {
  overflow: hidden;  /* clearfix hack：让父元素包住浮动的子元素 */
}
.nav a {
  float: left;             /* 让每个链接向左浮动，实现横向排列 */
  width: 33.333%;          /* 手动计算每个链接的宽度：100% ÷ 3 */
  text-align: center;      /* 链接文字居中 */
  padding: 10px 0;         /* 上下留白 */
}
```

**这段代码的问题是什么？**
1. `float: left` 本意是做"文字环绕图片"，却被滥用来做布局——语义完全不对
2. `width: 33.333%` 是手动算出来的，如果链接数量变成 4 个，你要重新算 `25%`
3. `overflow: hidden` 是一个"副作用 hack"——它本意是隐藏溢出，却被用来触发 BFC 清除浮动
4. 如果链接文字长度不同（比如"首页"和"关于我们的团队"），等宽布局会让短文字周围大片空白、长文字挤在一起

这就是 Flexbox 要解决的问题——用正确的工具做布局，而不是用 hack 凑合。
:::

:::explain{title="二、Flexbox 出场——一行代码，全部搞定"}
Flexbox 让你在**父元素**上设置 `display: flex`，子元素就会自动排列。同样的导航栏，用 Flexbox：

```css
.nav {
  display: flex;              /* ① 开启 Flexbox 布局 */
  justify-content: center;    /* ② 主轴居中：链接整体在导航栏中间 */
  align-items: center;        /* ③ 交叉轴居中：链接垂直方向居中 */
  gap: 24px;                  /* ④ 统一间距：每个链接之间间隔 24px */
}
```

**逐行理解：**

1. `display: flex` — 告诉浏览器"这个容器里的子元素用弹性布局"。一个属性，替代了 `float` + `clearfix` 两个 hack
2. `justify-content: center` — 控制**主轴**（默认横向）上的对齐方式。`center` 表示所有子元素整体居中。不需要手动算宽度了——浏览器自动分配
3. `align-items: center` — 控制**交叉轴**（垂直于主轴的方向）上的对齐方式。导航栏中最实用的值——不管你每个链接高度是否一致，全部垂直居中
4. `gap: 24px` — 子元素之间的间距。一个 `gap` 属性替代了之前在每个元素上设置 `margin-right` 再给最后一个去掉的繁琐操作

**发生了什么变化？** 四个属性，每个都有明确的语义（"间距"就是 `gap`，"居中"就是 `center`），不再靠 hack 凑合。链接数量从 3 个变成 5 个——你一行代码都不用改，浏览器自动重新分配。
:::

:::explain{title="三、逐句拆解 Flexbox 的核心属性"}
Flexbox 的魔法主要在**父元素**上。把父元素想象成"书架"，子元素是"书"——书架决定书怎么摆：

```css
.container {
  display: flex;              /* ← 启动 Flexbox */
  flex-direction: row;        /* ← 主轴方向：row = 横向（默认），column = 纵向 */
  justify-content: center;    /* ← 主轴对齐：子元素在主轴上怎么分布 */
  align-items: center;        /* ← 交叉轴对齐：子元素在交叉轴上怎么对齐 */
  gap: 16px;                  /* ← 间距：子元素之间留多少空白 */
  flex-wrap: wrap;            /* ← 换行：一行放不下时是否折行 */
}
```

**每个属性的详细说明：**

**flex-direction — 决定"书是横着排还是竖着放"**
- `row`（默认）— 横向排列，从左到右。就像书架上的一排书
- `column` — 纵向排列，从上到下。就像书摞成一叠
- `row-reverse` — 横向排列，但从右到左
- `column-reverse` — 纵向排列，但从下到上

**justify-content — 决定"书在书架横梁上怎么分布"**
- `flex-start` — 都靠左（或靠上）挤在一起
- `flex-end` — 都靠右（或靠下）
- `center` — 整体居中
- `space-between` — 首尾贴边，中间平均分配。导航栏最常用
- `space-around` — 每个元素左右间距相等（首尾的间距是中间的一半）
- `space-evenly` — 所有间距完全相等（包括首尾到边缘的距离）

**align-items — 决定"书在书架纵梁上怎么对齐"**
- `stretch`（默认）— 拉伸到和最高的元素一样高
- `flex-start` — 顶部对齐
- `flex-end` — 底部对齐
- `center` — 垂直居中（最常用！配合 `justify-content: center` 实现完美居中）

**gap — 统一设置间距**

一个值同时控制行间距和列间距，不再需要 `margin-right` + `:last-child` 的 hack：
```css
.container {
  display: flex;
  gap: 20px;        /* 所有方向间距 20px */
}
```

**flex-wrap — 放不下时换行**

默认情况下，Flexbox 会把所有子元素挤在一行。设置 `flex-wrap: wrap` 后，一行放不下就自动折到下一行：
```css
.container {
  display: flex;
  flex-wrap: wrap;   /* 允许换行 */
  gap: 16px;
}
```
:::

:::explain{title="四、`flex` 属性——子元素的弹性分配"}
`flex: 1` 是写在**子元素**上的属性，表示"有剩余空间时，我占 1 份"：

```css
.card {
  flex: 1;  /* 每张卡片平分剩余空间 */
}
```

如果三张卡片都设置 `flex: 1`，它们会等宽排列：
- 容器宽度 900px，三张卡片各 300px
- 容器宽度 600px，三张卡片各 200px
- 容器宽度变化时，卡片宽度自动按比例调整

如果一张卡片设置 `flex: 2`，另两张 `flex: 1`，则第一张的宽度是后两张的两倍：
```css
.card-wide { flex: 2; }   /* 占 2 份 */
.card { flex: 1; }        /* 占 1 份 */
```
:::

:::example{title="完整示例：一个响应式导航栏 + 卡片网格"}
下面是一个贴近实际开发的例子。导航栏用 Flexbox 横向排列链接，卡片区域也用 Flexbox + `flex-wrap` 实现自动换行的网格：

```css
/* ===== 导航栏 ===== */
.nav {
  display: flex;                    /* 开启 Flexbox */
  justify-content: space-between;   /* Logo 靠左，链接组靠右 */
  align-items: center;              /* 所有导航项垂直居中 */
  padding: 16px 24px;               /* 导航栏内边距 */
  background: #1a1a2e;              /* 深色背景 */
  color: #fff;                      /* 白色文字 */
}

.nav-links {
  display: flex;                    /* 链接组内部也用 Flexbox */
  gap: 24px;                        /* 链接之间间距 */
  list-style: none;                 /* 去掉列表圆点 */
  margin: 0;                        /* 去掉默认外边距 */
  padding: 0;                       /* 去掉默认内边距 */
}

/* ===== 卡片网格 ===== */
.card-grid {
  display: flex;                    /* 开启 Flexbox */
  flex-wrap: wrap;                  /* 一行放不下就换行 */
  gap: 20px;                        /* 卡片间距 */
  padding: 20px;                    /* 容器内边距 */
}

.card {
  flex: 1 1 280px;                  /* 最小 280px，有空间就拉伸 */
  /*  ↑ ↑  ↑
  /*  flex-grow: 有剩余空间时拉伸比例
  /*  flex-shrink: 空间不足时收缩比例
  /*  flex-basis: 基础宽度 */
  padding: 20px;                    /* 卡片内边距 */
  background: #fff;                 /* 卡片背景 */
  border-radius: 8px;               /* 圆角 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); /* 阴影 */
}
```

**运行结果：** 导航栏的 Logo 在最左边，链接组在右边均匀排列。卡片区域中，屏幕宽时一排显示 3 张，屏幕窄时自动减少列数。你一行 `@media` 查询都没写——全靠 `flex-wrap` 和 `flex-basis` 自动适配。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：给子元素设置 display: flex 而不是父元素**

```css
/* ❌ 错误：给子元素设置 flex，它们各自成为弹性容器，但不会横向排列 */
.card { display: flex; }

/* ✅ 正确：给包裹子元素的父容器设置 flex */
.card-grid { display: flex; }
```

Flexbox 是**父元素控制子元素排列**的机制。`display: flex` 必须设置在你想让它"管理排列"的那个容器上。

**错误 2：混淆 justify-content 和 align-items**

记住这个口诀：**justify 跟着主轴走，align 跟着交叉轴走**。
- 主轴默认是横向（`flex-direction: row`），所以 `justify-content` 默认控制水平位置
- 交叉轴垂直于主轴，所以 `align-items` 默认控制垂直位置
- 如果把 `flex-direction` 改成 `column`，主轴和交叉轴会互换——`justify-content` 变成控制垂直，`align-items` 变成控制水平

**错误 3：忘记 flex-wrap，导致元素被挤扁**

```css
/* ❌ 没有 flex-wrap：10 张卡片全部挤在一行，每张被压得很窄 */
.card-grid {
  display: flex;
  gap: 16px;
}

/* ✅ 加上 flex-wrap：一行放不下就自动换行 */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
```

**错误 4：用 margin 代替 gap**

```css
/* ❌ 旧时代写法：每个子元素加 margin，最后一个去掉 */
.card { margin-right: 20px; }
.card:last-child { margin-right: 0; }

/* ✅ Flexbox 写法：父元素上一行 gap */
.card-grid { gap: 20px; }
```
:::

:::explain{title="五、实际工作中你会用 Flexbox 做什么？"}
Flexbox 不是你学完就忘的练习题——它是每天都会用到的布局工具。以下是真实项目中最常见的场景：

**场景 1：导航栏**
```css
nav {
  display: flex;
  justify-content: space-between;  /* Logo 左，菜单右 */
  align-items: center;             /* 垂直居中 */
  padding: 0 24px;
  height: 60px;
}
```

**场景 2：卡片列表（自动换行）**
```css
.card-list {
  display: flex;
  flex-wrap: wrap;    /* 一行放不下自动折行 */
  gap: 20px;           /* 统一间距 */
}
.card {
  flex: 1 1 300px;     /* 最小 300px，多了平分 */
}
```

**场景 3：垂直+水平居中**
```css
.center-box {
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;      /* 垂直居中 */
  min-height: 100vh;        /* 至少一个屏幕高 */
}
```
一个三行代码的"万能居中"方案——比之前所有居中 hack 都简洁。

**场景 4：页脚多列布局**
```css
footer {
  display: flex;
  justify-content: space-between;  /* 三个区域均匀分布 */
  gap: 40px;                       /* 区域间距 */
}
footer > div {
  flex: 1;  /* 每个区域平分宽度 */
}
```

这些场景的共同模式：**找到父容器 → 加 display: flex → 用 justify-content / align-items / gap 控制排列**。
:::

:::task{title="动手试试 ✨"}

::::step{purpose="让你直观感受 Flexbox 的核心威力：一行 `display: flex` 就把竖排的 HTML 元素变成了横排。之前用 float 需要 5+ 行 hack 的事情，现在一行搞定。这就是 Flexbox 存在的意义。" expected="原本竖着堆叠的卡片变成了一行横排。父容器加了 flex，所有子元素自动横向排列。"}
1. 打开右侧编辑器的 `style.css` 文件
2. 找到 `.card-grid` 选择器
3. 添加 `display: flex;`
4. 切换到预览区，观察卡片从竖排变成横排
::::

::::step{purpose="`flex-direction` 是 Flexbox 的'方向盘'——决定主轴走向。`row` = 横向（默认），`column` = 纵向。改变它，整个布局的方向就变了。" expected="卡片从横排变成竖排。虽然效果和没加 flex 之前一样，但区别在于它们现在可以用 `justify-content` 和 `align-items` 精确控制了。"}
1. 在 `.card-grid` 中添加 `flex-direction: column;`
2. 观察卡片变成纵向排列
3. 改回 `row`，再试试 `row-reverse`——卡片顺序反转了！
::::

::::step{purpose="`justify-content` 控制的是主轴上的分布方式。`space-between`、`space-around`、`space-evenly` 三种'均匀分布'有什么区别？这一步让你亲自感受。" expected="卡片分布方式发生了变化。对比三种 space-* 值，首尾到边缘的距离不同。"}
1. 在 `.card-grid` 中分别尝试下面三个值，对比区别：
   - `justify-content: space-between;`（首尾贴边）
   - `justify-content: space-around;`（每个元素周围间距相等）
   - `justify-content: space-evenly;`（所有间距完全相等，包括边缘）
2. 每次修改后切换到预览区观察变化
::::

::::step{purpose="`gap` 是 Flexbox 中最简单也最实用的属性——一个值控制所有方向间距。你不再需要 `margin-right` + `:last-child` 的 hack。间距越大，元素越疏远；越小，越紧凑。" expected="卡片之间的间距明显变大或变小。`gap` 同时控制水平和垂直方向的间距。"}
1. 把 `.card-grid` 的 `gap` 改成 `40px`
2. 观察卡片间距变化——是不是比之前疏远了很多？
3. 再改成 `4px`，看看卡片几乎贴在一起的效果
::::

::::step{purpose="`flex-wrap: wrap` 是 Flexbox 实现'自适应列数'的秘诀。不设媒体查询，不用算宽度——卡片最小宽度保证了，剩下的让浏览器自动换行。这是响应式布局最简单的实现方式。" expected="在预览区缩小窗口宽度，卡片自动从三列变成两列再变成一列。没有写任何 @media 查询！"}
1. 确保 `.card-grid` 有以下设置：
   ```css
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
   ```
2. 给每个 `.card` 添加：`flex: 1 1 280px;`
3. 切换到预览区，拖动浏览器窗口宽度，观察卡片自动换行
4. 这就是"不需要 @media 查询的响应式布局"
::::

:::

:::recap
这一节你学会了 Flexbox——给父元素加上 `display: flex`，子元素就能灵活排列。

**核心属性回顾：**
- `display: flex` — 启动弹性布局（写在父元素上）
- `flex-direction` — 决定主轴方向：`row`（横向）/ `column`（纵向）
- `justify-content` — 主轴上的分布：`center` / `space-between` / `space-around` / `space-evenly`
- `align-items` — 交叉轴上的对齐：`center` / `flex-start` / `flex-end` / `stretch`
- `gap` — 统一设置子元素间距，替代 `margin` hack
- `flex-wrap: wrap` — 一行放不下时自动换行
- `flex: 1` — 子元素平分剩余空间

**判断标准：** 如果你还在用 `float` 和 `clearfix` 做横向排列，停下来，换上 Flexbox。一行 `display: flex` 替代你三行 hack。

下一节你将学习**居中**——用 Flexbox、Grid、`text-align`、`margin: auto` 等多种方式实现水平和垂直居中，以及每种方式的最佳使用场景。
:::
