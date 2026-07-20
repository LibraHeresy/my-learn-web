# 过渡与动画 — 让页面流动起来

:::analogy
transition 让变化平滑过渡——就像灯光从亮到暗慢慢调，而不是啪地一下关掉。从一个状态到另一个状态，中间有个过程才自然。
:::

:::explain{title="transition — 平滑过渡"}
transition 属性让 CSS 变化变得平滑——比如鼠标悬停时颜色渐变而不是瞬间跳变。ease 是默认的时间曲线（慢→快→慢），linear 是匀速。就像汽车慢慢踩油门加速——不是突然从 0 飙到 100，而是平顺地变快。
```css
.card {
  background: #FFFAF2;
  transition: all 0.3s ease;
}
.card:hover {
  background: #8B2E2E;
  color: #fff;
  transform: scale(1.05);
}
```
- `all` — 所有属性都过渡
- `0.3s` — 过渡耗时 0.3 秒
- `ease` — 缓动函数（开始快，结束慢）
就像水龙头慢慢拧开，水流从小到大很自然。
:::

:::explain{title="transform — 变换形态"}
`transform` 可以改变元素的形状和位置，配合 `transition` 效果最佳：
- `translateY(-4px)` — 向上移动 4px
- `scale(1.1)` — 放大到 1.1 倍
- `rotate(5deg)` — 旋转 5 度
```css
.card:hover {
  transform: translateY(-4px) scale(1.02);
}
```
多个变换用空格分隔即可。就像举手打招呼——手抬起来（位移）+ 手掌张开（缩放）才完整！
:::

:::explain{title="@keyframes — 关键帧动画"}
`@keyframes` 可以定义更复杂的、自动播放的动画：
```css
@keyframes pulse {
  0%   { opacity: 1; transform: scale(1); }
  50%  { opacity: 0.6; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}
.card {
  animation: pulse 2s ease-in-out infinite;
}
```
- `pulse` — 动画名称（自己命名）
- `2s` — 一个周期 2 秒
- `ease-in-out` — 缓入缓出
- `infinite` — 无限循环
就像一个持续闪烁的指示灯——有规律地一亮一暗！
:::

:::example{title="看例子"}
下面的代码展示了三种动画效果。鼠标悬停在前两张卡片上看过渡效果，第三张是自动播放的脉动动画：
```css
.fade-card { transition: all 0.3s ease; }
.fade-card:hover {
  background: #8B2E2E;
  color: #fff;
  transform: scale(1.05);
}
.bounce-card:hover {
  animation: bounce 0.6s ease;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```
切换到预览区，把鼠标移到卡片上试试！
:::

:::task{title="动手试试 ✨"}
::::step{purpose="`transition` 的 `duration`（时长）决定变化快慢。数字越大越慢，越小越快。就像水龙头的开关——可以慢慢拧，也可以一下开到底。" expected="鼠标悬停时，卡片颜色和大小变化明显变慢了。这就是 transition 的 duration 参数在起作用。"}
把 `.fade-card` 的 `transition` 时间改成 `1s`，看过渡变慢
::::

::::step{purpose="`@keyframes` 中每个百分比定义了该时刻元素的状态。修改关键帧的值，动画效果也会改变。" expected="卡片跳动幅度变大了一倍。你直接修改了关键帧的 `translateY` 值。"}
修改 `@keyframes bounce` 中的 `-10px` 改成 `-20px`，让跳动更大
::::

::::step{purpose="`animation-duration` 控制一个动画周期的时间。改成 `0.5s`（半秒），脉动会快 4 倍。" expected="第三张卡片的脉动变得非常快。duration 越小，动画越快。"}
调整 `.auto-pulse` 的 `animation` 中 `2s` 改成 `0.5s`，让脉动更快
::::

::::step{purpose="从零创建一个 `@keyframes` 动画——`from { rotate(0deg) }` 到 `to { rotate(360deg) }`，然后应用到新卡片上。" expected="鼠标悬停时，新卡片会旋转一圈。你已经能独立创建 CSS 动画了！"}
挑战：新建一个 `@keyframes spin`，用 `rotate` 做一个旋转动画
::::

:::

:::recap
这一节你学会了让页面的变化变得平滑自然——`transition` 让颜色、大小等属性的切换不再瞬间跳变，而是像天亮的过程一样慢慢过渡。`transform` 可以移动（`translateY`）、缩放（`scale`）、旋转（`rotate`）元素。你还初步认识了 `@keyframes`，它能让动画自动循环播放，不需要鼠标悬停触发。现在你的网页元素可以优雅地流动起来了。
:::


