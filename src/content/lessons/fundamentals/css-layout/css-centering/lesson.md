# 居中与对齐 — 让页面更专业

:::analogy
居中就像拍照时把人放在画面正中间——视觉焦点集中、平衡舒服。

CSS 里的居中可不是只有一种方法。就像你可以坐地铁去公司，也可以开车、骑车、步行——每种方式有自己的适用场景。你的目标是知道手里有哪些"交通工具"，以及什么时候该用哪个。
:::

:::prerequisite
**本节你需要知道这些词：**

- **Flexbox 基础**：知道 `display: flex`、`justify-content`、`align-items` 是干什么的
- **盒模型**：理解 `width`、`margin`、`padding` 的概念
- **块级元素 vs 行内元素**：知道 `<div>` 默认占一整行，`<span>` 不换行
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 用 5 种以上方式实现元素居中
- 知道每种居中方式的适用场景和限制条件
- 理解"为什么给一个元素 `text-align: center` 它没反应"
- 独立实现水平居中、垂直居中、水平+垂直同时居中
:::

:::explain{title="一、CSS 居中的本质——你首先要理解"容器和内容""}
在讨论"怎么居中"之前，先搞清楚一个最容易搞混的问题：**谁居中谁？**

```css
/* 这两行的效果完全不同，但很多人分不清楚 */
.parent { text-align: center; }   /* 让 parent 里面的文字和行内元素居中 */
.parent { margin: 0 auto; }       /* 让 parent 自己在它的父容器中居中 */
```

**核心区分：**
- `text-align: center` 是作用在**容器**上的，让容器里的**文字和行内元素**居中
- `margin: 0 auto` 是作用在**元素自己**上的，让这个元素在它的**父容器**中水平居中
- Flexbox/Grid 的居中也是作用在**容器**上的，让容器的**子元素**居中

把这个"谁居中谁"的问题搞清楚，CSS 居中的 80% 的困惑就消失了。
:::

:::explain{title="二、没有现代居中方法的时候——每种方法都有缺陷"}
假设你要把一个 300px 宽的登录框在页面里水平和垂直居中。在过去，每种方法都有各自的局限：

```css
/* 方法 A：margin: auto —— 只能水平居中 */
.login-box {
  width: 300px;
  margin: 0 auto;
}
/* 问题：垂直方向无法居中。如果你不知道父容器的高度，完全没办法 */

/* 方法 B：text-align —— 只能居中文字和行内元素 */
.wrapper {
  text-align: center;
}
/* 问题：块级元素（比如 div）不受 text-align 影响 */

/* 方法 C：绝对定位 + 负 margin —— 需要知道元素尺寸 */
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;  /* 宽度的一半，硬编码！ */
  margin-top: -100px;   /* 高度的一半，硬编码！ */
}
/* 问题：元素宽高变了，margin 也要重新算 */
```

**每种方法都有"盲区"**——有的只管水平不管垂直，有的依赖固定尺寸，有的只对行内元素生效。这就是为什么 CSS 居中成为一个"经典难题"。
:::

:::explain{title="三、现代居中方案一：Flexbox 一键居中（推荐首选）"}
Flexbox 是目前最通用的居中方案——三行代码实现水平+垂直居中，不依赖元素尺寸：

```css
.container {
  display: flex;              /* ① 开启 Flexbox */
  justify-content: center;    /* ② 主轴居中 → 默认水平居中 */
  align-items: center;        /* ③ 交叉轴居中 → 默认垂直居中 */
}
```

**逐行拆解：**

1. `display: flex` — 把容器变成弹性容器。容器内的子元素全部变成"弹性项目"
2. `justify-content: center` — 在主轴方向（默认水平）上居中。所有子元素作为一个整体被推到容器中间
3. `align-items: center` — 在交叉轴方向（默认垂直）上居中。所有子元素在垂直方向被拉到中间

**为什么这是首选方案？**
- 不依赖子元素的宽高——300px 还是 500px 都能居中
- 不依赖父容器的高度——100vh 还是 400px 都能算
- 同时解决水平和垂直——一个容器上设三个属性，子元素全部居中
- 多个子元素也能处理——不只一个，三个子元素也能整体居中

**但 Flexbox 不是万能的：** 如果子元素自己内部还需要复杂的多行文字居中，Flexbox 只负责把子元素放到容器中央，不管子元素里面的事。
:::

:::explain{title="四、现代居中方案二：Grid 居中（另一个选择）"}
Grid 也能居中，而且代码更短：

```css
.container {
  display: grid;
  place-items: center;  /* ① place-items 是 align-items + justify-items 的简写 */
}
```

**逐行拆解：**

1. `display: grid` — 开启 Grid 布局
2. `place-items: center` — 等于同时设置了 `align-items: center` 和 `justify-items: center`。Grid 里 `justify-items` 控制水平位置，`align-items` 控制垂直位置，和 Flexbox 的方向概念略有不同

**Flexbox vs Grid 居中怎么选？**

| 场景 | 推荐方案 | 原因 |
|------|----------|------|
| 容器内只有一个元素要居中 | Grid `place-items` | 代码最短 |
| 容器内有多个元素，要整体居中 | Flexbox | Flexbox 对"一组元素整体居中"更直观 |
| 容器内有多个元素，要各自居中在网格中 | Grid | Grid 天然支持按格子对齐 |

**两者都能做到水平+垂直居中**——选哪个主要是个人偏好和上下文（如果你其他地方已经用了 Grid，居中也用 Grid 保持一致）。
:::

:::explain{title="五、文字和行内元素的居中——`text-align` 和 `line-height`"}
如果只是让文字居中，不需要 Flexbox 和 Grid：

**水平居中文字：**
```css
.text-center {
  text-align: center;  /* 让容器内的文字、行内元素、inline-block 元素居中 */
}
```

**垂直居中单行文字（传统 trick）：**
```css
.single-line {
  height: 50px;           /* 固定高度 */
  line-height: 50px;      /* 行高 = 高度 → 单行文字垂直居中 */
}
```
原理：`line-height` 是文字行的总高度（包括文字本身和上下空白）。当 `line-height` 等于容器 `height` 时，浏览器会把文字放在行的正中间。

**局限：** 只对单行文字有效，多行文字会溢出。多行文字垂直居中请用 Flexbox。

**`text-align` 的常见误区：**
```css
/* ❌ 很多人以为这样能让 div 居中——不行！ */
.my-div { text-align: center; }
/* text-align 只影响文字和行内元素，对块级 div 本身无效 */

/* ✅ 让 div 本身居中要用 margin: auto */
.my-div {
  width: 300px;      /* 必须有宽度 */
  margin: 0 auto;    /* 水平居中 */
}
```
:::

:::explain{title="六、`margin: auto` 的思路——块级元素水平居中"}
`margin: 0 auto` 是最传统的块级元素居中方式，今天仍然有效：

```css
.box {
  width: 300px;       /* ① 必须有宽度，否则 auto 无空间可分配 */
  margin: 0 auto;     /* ② 上下 0，左右 auto → 浏览器自动平分左右空白 */
}
```

**`margin: auto` 生效的三个条件，缺一不可：**
1. 元素必须是**块级元素**（`display: block`）
2. 元素必须有**明确的宽度**（`width` 不能是 `auto`）
3. 元素不能是 `position: absolute` 或 `fixed`

在现代 Flexbox 布局中，`margin: auto` 还有一个神奇用法——在弹性容器中"推开"相邻元素：
```css
.nav {
  display: flex;
}
.nav .logo {
  margin-right: auto;  /* logo 靠左，后面的链接被推到右边 */
}
```
:::

:::example{title="完整示例：一个登录框——五种居中方法对比"}
下面用五种不同方式实现同一个效果——一个 320px 宽的登录框在页面中央水平+垂直居中：

```css
/* 方式一：Flexbox（推荐） */
.wrapper-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;       /* 至少占满整个屏幕高度 */
}

/* 方式二：Grid（最短代码） */
.wrapper-grid {
  display: grid;
  place-items: center;      /* 一行搞定水平+垂直居中 */
  min-height: 100vh;
}

/* 方式三：margin auto（仅水平） */
.login-horizontal {
  width: 320px;
  margin: 0 auto;           /* 只能水平居中 */
}

/* 方式四：绝对定位 + transform（不依赖元素尺寸） */
.login-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  /* 往回挪自身宽高的一半 */
}

/* 方式五：text-align + line-height（仅文字） */
.text-only-center {
  text-align: center;       /* 水平居中文字 */
  line-height: 100px;       /* 垂直居中单行文字（容器高度 100px 时） */
}

/* 实际用到的登录框样式 */
.login-box {
  width: 320px;
  padding: 32px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;       /* 登录框内部文字居中 */
}
```

**运行结果：** 方式一和方式二效果完全相同（水平+垂直居中）。方式三只水平居中。方式四也能水平+垂直居中，但代码多。方式五只管文字。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：给块级元素设置 `text-align: center`，期望它自己居中**

```css
/* ❌ 错误：text-align 只影响容器内的文字和行内元素，不影响容器自身位置 */
.login-box { text-align: center; }

/* ✅ 正确：让 login-box 居中要用 margin: auto 或放在 flex 容器里 */
.wrapper { display: flex; justify-content: center; }
```

**错误 2：`margin: 0 auto` 没有设宽度**

```css
/* ❌ 错误：div 默认宽度是 100%，auto 没有剩余空间可以分配 */
div { margin: 0 auto; }

/* ✅ 正确：必须先给一个小于父容器的宽度 */
div {
  width: 600px;
  margin: 0 auto;
}
```

**错误 3：忘了给父容器设置高度就尝试垂直居中**

```css
/* ❌ 错误：父容器高度由内容撑开，和内容一样高，"居中"没有意义 */
.wrapper {
  display: flex;
  align-items: center;  /* 垂直居中——但父容器和子元素一样高，看不出效果！ */
}

/* ✅ 正确：给父容器一个明确的高度（或 min-height） */
.wrapper {
  display: flex;
  align-items: center;
  min-height: 400px;    /* 或者 height: 100vh */
}
```

**错误 4：用 `line-height` 做多行文字垂直居中**

```css
/* ❌ 错误：line-height = 容器高度时，多行文字会溢出 */
.card {
  height: 120px;
  line-height: 120px;  /* 只有一行文字能居中，两行就溢出 */
}

/* ✅ 正确：多行文字用 Flexbox */
.card {
  height: 120px;
  display: flex;
  align-items: center;  /* 不管几行都能垂直居中 */
}
```
:::

:::explain{title="七、实际工作中你会在哪些场景用到居中？"}
居中无处不在——以下是你每天都会遇到的场景和对应的最佳方案：

**场景 1：登录/注册页面（页面中央的卡片）**
```css
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;        /* 占满整个视口高度 */
  background: #f0f2f5;      /* 背景色 */
}
```
**推荐方案：Flexbox。** 不依赖登录框的尺寸，比绝对定位方案更稳健。

**场景 2：弹窗/模态框（在遮罩层中居中）**
```css
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;           /* 覆盖整个屏幕 */
  inset: 0;                  /* top/right/bottom/left 都是 0 */
  background: rgba(0,0,0,0.5); /* 半透明遮罩 */
}
```
**推荐方案：Flexbox。** `position: fixed` 负责覆盖屏幕，Flexbox 负责居中弹窗。

**场景 3：导航栏链接垂直居中**
```css
nav {
  display: flex;
  align-items: center;       /* 不管 Logo 多高、链接多高，全部垂直居中 */
  height: 60px;
}
```

**场景 4：表格单元格文字居中**
```css
td {
  text-align: center;        /* 水平居中 */
  vertical-align: middle;    /* 垂直居中（表格专用属性） */
}
```
表格里 `vertical-align: middle` 比 Flexbox 更合适，因为表格有自己的一套对齐模型。

**场景 5：图片在容器中居中**
```css
.img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  overflow: hidden;
}
.img-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;  /* 保持比例裁剪 */
}
```
:::

:::task{title="动手试试 ✨"}

::::step{purpose="让你亲身验证 Flexbox 居中方案——三行代码实现水平+垂直居中。这是目前最简单、最可靠的居中方案，应该成为你的默认选择。" expected="卡片出现在页面中央（水平+垂直都居中）。改变浏览器窗口大小，卡片始终保持在中央。"}
1. 打开右侧编辑器的 `style.css` 文件
2. 找到 `.wrapper` 选择器，确保有以下设置：
   ```css
   .wrapper {
     display: flex;
     justify-content: center;
     align-items: center;
     min-height: 100vh;
   }
   ```
3. 切换到预览区，观察卡片是否在页面正中央
4. 拖动浏览器窗口大小，卡片是否始终保持居中？
::::

::::step{purpose="`margin: 0 auto` 只能水平居中——把 Flexbox 去掉后，你会看到卡片回到左上角。再加回 `margin: auto`，卡片水平居中但垂直方向还在顶部。这个对比让你深刻理解两种方案的能力边界。" expected="卡片水平居中但垂直方向靠在顶部。margin auto 只解决了水平方向。"}
1. 把 `.wrapper` 的 `display: flex` 注释掉（或删除）
2. 给 `.card` 添加：
   ```css
   width: 320px;
   margin: 0 auto;
   ```
3. 观察效果——卡片水平居中了，但垂直方向没有
4. 理解：`margin: auto` 只管水平，不管垂直
::::

::::step{purpose="Grid 的 `place-items: center` 是目前最短的居中代码——一行替代 Flexbox 三行。让你知道除了 Flexbox 还有另一种选择。" expected="效果和 Flexbox 完全一样——卡片水平+垂直居中。但代码从三行变成一行。"}
1. 恢复 `.wrapper` 的样式，这次用 Grid 方案：
   ```css
   .wrapper {
     display: grid;
     place-items: center;
     min-height: 100vh;
   }
   ```
2. 对比 Flexbox 方案——效果是否一样？
3. 思考：两者都能居中，只是写法不同
::::

::::step{purpose="`text-align: center` 和 `margin: 0 auto` 的区别是初学者最容易搞混的。这个对比让你亲眼看到：前者让内部文字居中，后者让盒子自己居中。" expected="第一个卡片：盒子不动，内部文字居中。第二个卡片：盒子居中，文字靠左。两个效果完全不同。"}
1. 创建两个对比场景：
   - 卡片 A：设置 `text-align: center;`（文字居中，盒子不动）
   - 卡片 B：设置 `width: 300px; margin: 0 auto;`（盒子居中，文字靠左）
2. 观察两者的差异——你之前有没有搞混过这两个？
::::

:::

:::recap
这一节你彻底搞懂了 CSS 居中——不再是"碰运气试哪个属性能居中"，而是根据场景选择正确的方案。

**居中方案速查表：**
| 你想居中的是 | 推荐方案 | 代码 |
|-------------|----------|------|
| 任意元素，水平+垂直 | Flexbox | `display: flex; justify-content: center; align-items: center;` |
| 任意元素，水平+垂直 | Grid | `display: grid; place-items: center;` |
| 块级元素，仅水平 | `margin: auto` | `width: 300px; margin: 0 auto;` |
| 文字/行内元素，水平 | `text-align` | `text-align: center;` |
| 单行文字，垂直 | `line-height` | `height: 50px; line-height: 50px;` |
| 不依赖尺寸，水平+垂直 | 绝对定位+transform | `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);` |

**核心心法：先搞清楚"谁居中谁"**——容器居中还是内容居中？装文字的还是装元素的？搞清楚这个问题，你就不会再试错了。

下一节你将学习 **Position 定位**——让元素脱离正常文档流，固定在屏幕任意位置。这是弹出层、固定导航、粘性标题的基础。
:::
