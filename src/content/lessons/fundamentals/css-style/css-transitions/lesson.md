# 过渡与动画 — 让页面流动起来

:::analogy
`transition` 让 CSS 属性的变化平滑过渡——就像灯光从亮到暗慢慢调，而不是啪地一下关掉。从一个状态到另一个状态，中间有一个渐变过程才符合直觉。没有过渡的页面像幻灯片切换，有过渡的页面像电影淡入淡出。
:::

:::prerequisite
**本节你需要知道这些词：**

- **CSS 基本规则**：`选择器 { 属性: 值; }` 已经熟练
- **伪类选择器**：`:hover` 表示鼠标悬停时的状态——上一节刚学过
- **盒模型和边框**：`background-color`、`border`、`border-radius` 等属性
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 区分"瞬时切换"和"平滑过渡"的视觉差异
- 用 `transition` 属性让某个 CSS 属性的变化变得平滑
- 理解 `duration`（时长）和 `timing-function`（缓动函数）的作用
- 用 `transform` 配合 `transition` 创造常见的 hover 交互效果
:::

:::explain{title="一、没有过渡的时候，交互是什么体验？"}
假设你给卡片写了一个 hover 效果——鼠标移到卡片上时变换背景色和大小：

```css
.card {
  background: #FFFAF2;
  transform: scale(1);
}
.card:hover {
  background: #8B2E2E;
  color: #fff;
  transform: scale(1.05);
}
```

**不加 transition 时：** 鼠标移上去，卡片啪地一下变红、变大——像按下电灯开关一样瞬间跳变。移走鼠标，啪地一下又跳回去。用"粗暴"来形容这种体验毫不夸张。

**这就是 transition 要解决的问题：把"啪"变成"滑"。**
:::

:::explain{title="二、加上 transition 之后——从"跳变"到"渐变""}
只需要一行代码，交互体验完全不同：

```css
.card {
  background: #FFFAF2;
  transform: scale(1);
  transition: all 0.3s ease;  /* ← 就这一行 */
}
.card:hover {
  background: #8B2E2E;
  color: #fff;
  transform: scale(1.05);
}
```

现在鼠标移上去，背景色在 0.3 秒内从暖白渐变到暗红，卡片在 0.3 秒内平滑放大。移走鼠标，又用 0.3 秒渐变回去。

**0.3 秒是一个微妙的数字——快到用户不会觉得"卡"，慢到用户能感知到"发生了点什么"。** 这就是过渡的魔力：它在不引人注目的前提下，让交互变得优雅。
:::

:::explain{title="三、逐句拆解 transition 属性"}
`transition` 是四个子属性的简写。把上面那行拆开看：

```css
.card {
  /*
   * transition 的四个子属性：
   * transition-property: 哪些属性要过渡
   * transition-duration:  过渡耗时多久
   * transition-timing-function: 变化的速度曲线
   * transition-delay:   等多久再开始（默认 0s）
   */
  transition-property: all;      /* 所有可过渡的属性都参与 */
  transition-duration: 0.3s;     /* 0.3 秒完成过渡 */
  transition-timing-function: ease; /* 缓动函数：慢→快→慢 */

  /* 简写形式：property duration timing-function delay */
  transition: all 0.3s ease;
}
```

**可以给不同的属性设置不同的过渡：**
```css
.card {
  transition:
    background 0.3s ease,      /* 背景色用 0.3s */
    transform 0.2s ease-out;   /* 变形更快，用 0.2s 和 ease-out 曲线 */
}
```
:::

:::explain{title="四、缓动函数（timing-function）——速度的节奏"}
缓动函数决定了过渡过程中速度的变化曲线：

```css
/* ease（默认）：慢→快→慢。最自然，模拟现实物体的加速和减速 */
transition: all 0.3s ease;

/* linear：匀速。机械感，适合"旋转"之类的无限动画 */
transition: all 0.3s linear;

/* ease-in：慢→快。适合"飞出屏幕"的元素 */
transition: all 0.3s ease-in;

/* ease-out：快→慢。适合"飞入屏幕"的元素 */
transition: all 0.3s ease-out;

/* ease-in-out：慢→快→慢。比 ease 的加速阶段更明显 */
transition: all 0.3s ease-in-out;
```

**什么时候用哪个？** 绝大多数 hover 效果用默认的 `ease` 就够了。当你要做很讲究的设计时，可以参考这个原则——进入屏幕的元素用 `ease-out`（快→慢，像踩刹车停下），离开屏幕的元素用 `ease-in`（慢→快，像踩油门冲出去）。
:::

:::explain{title="五、transform — 让过渡更丰富"}
`transform` 本身不产生动画，但它和 `transition` 搭配时效果最佳。常用的变换：

```css
.card:hover {
  /* translate：位移。translateY 上下，translateX 左右 */
  transform: translateY(-4px);      /* 向上移 4px */

  /* scale：缩放。1 = 原始大小，1.05 = 放大 5% */
  transform: scale(1.05);           /* 放大到 105% */

  /* rotate：旋转。正值顺时针，负值逆时针 */
  transform: rotate(3deg);          /* 顺时针旋转 3 度 */

  /* 组合多个变换——空格分隔，顺序很重要 */
  transform: translateY(-4px) scale(1.02);
}
```

**变换的"顺序很重要"是什么意思？** `translateX(100px) rotate(45deg)` 和 `rotate(45deg) translateX(100px)` 的结果不同——因为旋转会改变坐标轴的方向。先移动再旋转：沿原水平轴移动，再转。先旋转再移动：坐标轴跟着转了，移动方向也变了。
:::

:::example{title="看例子"}
下面的代码展示了基础 hover 过渡效果。把鼠标移到第一张卡片上试试（页面里的跳动动画、自动脉动属于下一节「CSS 动画」的 @keyframes 范畴）：

```css
/* 基础过渡：颜色和大小渐变 */
.fade-card {
  background: #FFFAF2;
  transition: all 0.3s ease;     /* 所有属性变化都用 0.3s ease 过渡 */
}
.fade-card:hover {
  background: #8B2E2E;            /* 背景色渐变 */
  color: #fff;                    /* 文字色渐变 */
  transform: scale(1.05);         /* 大小渐变 */
}
```

切换到预览区，用鼠标在卡片上划过，感受"渐变"和"跳变"的区别。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：transition 写在 :hover 里**
```css
.card {
  background: #FFFAF2;
}
.card:hover {
  background: #8B2E2E;
  transition: all 0.3s ease;  /* ❌ 移入有过渡，移出没有——跳回去！ */
}
```
`transition` 应该写在**默认状态**（不加 `:hover` 的那个规则）里。这样移入和移出都有过渡。写在 `:hover` 里会导致只有移入有过渡，移出瞬间跳回。

**错误 2：过渡不可过渡的属性**
```css
.card {
  transition: display 0.3s ease;  /* ❌ display 不支持过渡！ */
}
```
不是所有 CSS 属性都能平滑过渡——`display`、`background-image`、`font-family` 等离散属性不能过渡。能过渡的属性包括：数字类（`width`、`opacity`、`margin`）、颜色类（`color`、`background-color`）、变换类（`transform`）。

**错误 3：过渡时间太长或太短**
```css
.button { transition: all 0.05s ease; }  /* ❌ 太快，用户感觉不到 */
.hero   { transition: all 3s ease; }     /* ❌ 太慢，用户会觉得卡 */
```
Hover 交互推荐 0.15s-0.3s。更大的动画（如模态框弹出）可以用 0.3s-0.5s。超过 1 秒的过渡会让用户觉得"这个页面是不是有问题"。

**错误 4：对性能敏感属性使用 transition: all**
```css
.card {
  transition: all 0.3s ease;  /* ⚠️ 浏览器可以处理，但不够精准 */
}
```
`all` 会让浏览器监控元素上的每一个属性变化，虽然大多数情况下没问题，但如果你只想要 `transform` 和 `opacity` 过渡，精准指定它们性能更好：`transition: transform 0.3s ease, opacity 0.3s ease;`
:::

:::explain{title="六、实际工作中你会怎么用？"}
在真实项目中，过渡无处不在：

- **按钮**：`transition: background 0.2s ease;` ——鼠标移到按钮上，背景色平滑变深
- **链接**：`transition: color 0.2s ease;` ——鼠标移到链接上，颜色渐变而不是跳变
- **卡片**：`transition: transform 0.25s ease, box-shadow 0.25s ease;` ——悬浮时微微上浮并增加阴影
- **模态框**：`transition: opacity 0.3s ease, transform 0.3s ease;` ——弹出时淡入 + 上滑

**过渡是"润物细无声"的细节。** 用户不会注意到过渡本身，但他们能感觉到这个页面"手感好"还是"手感硬"。这就是优秀产品和平庸产品之间的差距——藏在每一个 0.2s 的细节里。
:::

:::task{title="动手试试 ✨"}

::::step{purpose="`transition-duration` 决定变化的快慢。0.15s 很快，0.5s 中等，1s 很慢。不同的时长传达不同的节奏感。" expected="hover 时卡片颜色和大小变化明显变慢了。duration 是最直接的调节参数。"}
把 `.fade-card` 的 `transition` 时间从 `0.3s` 改成 `1s`，感受慢动作过渡。再改成 `0.1s`，感受快速过渡
::::

::::step{purpose="`transition-timing-function` 控制速度曲线。`linear` 匀速（机械），`ease` 慢快慢（自然）。在代码中切换，用肉眼感受差异。" expected="`linear` 时放大像机器人，`ease-out` 时放大像踩刹车。"}
把 `timing-function` 依次改成 `linear`、`ease-in`、`ease-out`，对比速度曲线差异
::::

::::step{purpose="不同的属性可以用不同的过渡参数。颜色变化可以慢一点（0.4s），位移可以快一点（0.2s），分开控制比 `all` 更精致。" expected="hover 时位移先完成，颜色还在渐变中——两个属性以不同的速度过渡。"}
把 `.fade-card` 的 `transition` 拆成两个：`background 0.4s ease` 和 `transform 0.2s ease`
::::

::::step{purpose="尝试从零写一个 hover 过渡效果。按钮的 hover 变色是最常见、最简单的过渡实践。" expected="鼠标移到按钮上时背景色平滑变深。你独立完成了过渡的完整书写。"}
挑战：给页面中的按钮添加 `transition: background 0.2s ease`，在 hover 时改变背景色
::::

:::

:::recap
回顾本节你学会的内容：
- **transition 的作用**：让 CSS 属性变化从"瞬间跳变"变成"平滑渐变"
- **四个子属性**：`property`（哪些属性）、`duration`（多久）、`timing-function`（速度曲线）、`delay`（等待）
- **缓动函数**：`ease`（默认，最自然）、`linear`（匀速）、`ease-in`（加速）、`ease-out`（减速）
- **transition 写在默认状态，不是 :hover 里**——否则移出时没有过渡
- **推荐时长**：hover 交互 0.15s-0.3s，大动画 0.3s-0.5s
- **transform + transition 是黄金搭档**：位移、缩放、旋转配合平滑过渡，创造优雅的交互

下一节你将学习 CSS 动画——用 `@keyframes` 创建自动播放、多步骤、循环往复的动画效果。
:::
