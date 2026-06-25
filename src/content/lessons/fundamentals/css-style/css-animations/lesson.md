# CSS 动画深入 — 让页面充满律动

:::music-analogy
如果说 transition 是渐强记号（从 pp 平滑到 ff），那么 @keyframes 就是一段完整的节奏型——精确控制每个时间点的状态。animation 属性像乐谱上的演奏法标记：duration 是速度、delay 是休止符的长短、iteration-count 是反复次数、direction 是顺奏还是逆行。把多种动画组合起来，就像配器——让不同乐器的声部同时进行。
:::

:::explain{title="@keyframes — 定义动画的\"节奏型\""}
还记得 transition 吗？它只能在两个状态之间平滑过渡（比如 hover 前 → hover 后）。@keyframes 让你定义**任意多个关键帧**，创建更复杂的动画：
```css
@keyframes swing {
  0%   { transform: rotate(0deg); }
  25%  { transform: rotate(5deg); }
  50%  { transform: rotate(0deg); }
  75%  { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}
```
百分比代表动画的进度（0% = 开始，100% = 结束）
- 也可以用 from（= 0%）和 to（= 100%）
- 每个关键帧可以定义任意多个 CSS 属性
就像乐谱中精确标注了每个小节的力度和表情记号——你掌控着动画的每一帧。
:::

:::explain{title="animation 属性 — 演奏法标记全解"}
定义好 @keyframes 后，用 animation 属性把它应用到元素上。它是 8 个子属性的简写：
```css
.card {
  animation:
    swing          /* animation-name: 用哪个关键帧 */
    2s             /* animation-duration: 一个周期多长时间 */
    ease-in-out    /* animation-timing-function: 缓动函数 */
    1s             /* animation-delay: 等多久再开始 */
    3              /* animation-iteration-count: 重复几次，infinite = 无限 */
    alternate      /* animation-direction: 正放还是倒放 */
    forwards       /* animation-fill-mode: 结束后保持哪个状态 */
    running;       /* animation-play-state: running 或 paused */
}
```
**常用 timing-function：**
- ease — 慢→快→慢（默认）
- linear — 匀速
- ease-in — 慢→快
- ease-out — 快→慢
- cubic-bezier(n,n,n,n) — 自定义曲线
**fill-mode 关键值：**
- none — 结束后回到初始状态
- forwards — 结束后保持在最后一帧
- backwards — 开始前就取第一帧状态
- both — 同时应用 forwards + backwards
:::

:::explain{title="transform 进阶 — 变形、旋转与 3D"}
transform 不止能用在 transition 中，配合 @keyframes 效果更丰富：
```css
/* 2D 变换 */
transform: translateX(100px);    /* 水平移动 */
transform: translateY(-20px);    /* 垂直移动 */
transform: scale(1.2);           /* 放大到 1.2 倍 */
transform: rotate(45deg);        /* 顺时针旋转 45° */
transform: skewX(10deg);         /* 水平倾斜 */
/* 组合变换（空格分隔，顺序很重要！） */
transform: translateX(100px) rotate(45deg) scale(1.1);
/* 设置旋转中心点 */
transform-origin: center center;  /* 默认是元素中心 */
transform-origin: top left;       /* 改为左上角 */
```
3D 变换（需要 perspective 才能看到深度效果）：
```css
.container {
  perspective: 600px;  /* 透视距离——越小越夸张 */
}
.card {
  transform: rotateY(30deg);   /* 绕 Y 轴旋转 */
  transform: rotateX(15deg);   /* 绕 X 轴翻转 */
}
```
就像指挥要求小提琴组不只拉动琴弓（translate），还要微微转动琴身（rotate）来控制音色。
:::

:::example{title="看例子"}
下面的代码展示了三种经典动画效果：
```css
/* 摇摆——像节拍器 */
@keyframes swing {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
/* 淡入上浮——像幕布升起 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* 心跳——缩放+透明度脉动 */
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.15); }
  30% { transform: scale(1); }
  45% { transform: scale(1.1); }
  60% { transform: scale(1); }
}
```
看预览区——三张卡片各自执行不同的动画，播放/暂停按钮可以控制动画状态。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="修改 `@keyframes` 中关键帧的 `rotate` 值直接改变动画幅度。值越大，摇摆越猛。" expected="第一张卡片的摇摆幅度明显更大了。动画的幅度由关键帧中的属性值决定。"}
把 `swing` 动画的 `rotate` 角度从 `3deg` 改成 `8deg`，看摇摆幅度变大
::::

::::step{purpose="增加位移距离让动画的轨迹更长。`translateY` 的正值表示向下移动。" expected="第二张卡片的淡入上浮动画从更远的地方飘过来。修改值让动画效果发生了明显变化。"}
修改 `fadeInUp` 的 `translateY` 从 `30px` 改成 `60px`
::::

::::step{purpose="`animation-duration` 控制完整周期的时间。改小后心跳更快更急促。" expected="心跳动画明显加速了。duration 是控制动画节奏最直接的参数。"}
给 `heartbeat` 的 `animation-duration` 从 `1.5s` 改成 `0.8s`
::::

::::step{purpose="三个关键参数组合：`rotate` 旋转、`linear` 匀速（不是默认的 ease）、`infinite` 无限循环——这就是黑胶唱片的视觉效果。" expected="元素持续匀速旋转，不会停下。你创造了第一个真正独立的 CSS 动画。"}
挑战：写一个唱片旋转动画（`rotate` + `infinite` + `linear`）
::::

::::step{purpose="`animation-fill-mode: forwards` 让动画结束后停在最后一帧；`none` 则回到初始状态。先改 `infinite` 为 `1`（只播一次）才能看出区别。" expected="`forwards` 时动画结束后元素停在终点位置不闪回；`none` 时播完后会闪回起点。"}
挑战：把 `fadeInUp` 的 `fill-mode` 改成 `forwards` 和 `none`，对比差异
::::

:::

:::recap
这一节你学会了用 `@keyframes` 创建复杂的动画——你可以定义任意多个关键帧，精确控制动画在 0%、25%、50%... 每一刻的状态。配合 `transform` 的旋转、缩放、位移，以及 `animation` 的各种参数（速度、循环次数、方向），你能让元素摇摆、淡入、心跳、甚至像黑胶唱片一样不停旋转。现在你的页面可以真正"动"起来了。
:::

:::listen-to
斯特拉文斯基《春之祭》— 复杂的节奏型、不规则的拍号、多个声部的交错进行，就像页面中同时运行的多个 @keyframes 动画。每一个拍点都精确计算，却产生了震撼人心的效果。
:::

