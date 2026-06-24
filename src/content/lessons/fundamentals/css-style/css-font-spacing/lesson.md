# 字体与间距 — 让文字更优雅

:::music-analogy
字体选择像**不同乐器的音色**——衬线体如小提琴般优雅，无衬线体如长笛般清晰。而 `letter-spacing` 和 `line-height` 则像音符间的**时值与呼吸**，决定了阅读的节奏。
:::

:::explain{title="字体系列"}
font-family 属性设置字体，font-size 设置字号，font-weight 设置粗细，line-height 设置行高，text-align 设置对齐方式。就像扬琴演奏中不同竹法带来不同音色——字体选择决定了文字的「气质」。
```css
h1 {
  font-family: "Noto Serif SC", serif;
}
p {
  font-family: "Noto Sans SC", sans-serif;
}
```
两种主要的字体类型：
- **衬线体（serif）**：笔划末端有装饰，典雅庄重，适合标题
- **无衬线体（sans-serif）**：笔划均匀，简洁现代，适合正文
像选乐器一样——你不会用小提琴的音色去吹进行曲。
:::

:::explain{title="间距控制"}
三个重要的间距属性：
- `letter-spacing` — 字母/汉字间距，像音符间的疏密
- `line-height` — 行高，像乐谱中行与行的距离
- `text-align` — 文字对齐（`left` / `center` / `right`），像乐团的队列
合理的间距让文字"透气"，就像休止符让音乐有呼吸的空间。
:::

:::example{title="看例子"}
下面这段 CSS 展示了字体和间距的综合运用。切换到 CSS 标签页查看：
```css
.card {
  font-family: "Noto Serif SC", serif;
  line-height: 1.8;
  letter-spacing: 0.05em;
  text-align: center;
}
```
注意预览区中文字的字体风格、行间距和字间距的变化。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="`font-family` 决定字体风格。`serif`（衬线体）典雅有装饰，`sans-serif`（无衬线体）简洁现代。像选乐器音色——不同的字体传达不同的气质。" expected="卡片文字从有装饰线的衬线体变成平滑的无衬线体。注意笔画末端的差异。"}
把 `.card` 的 `font-family` 改成 `sans-serif`，感受字体变化
::::

::::step{purpose="`line-height` 控制行与行之间的距离。值越大行越疏朗，越小行越紧密。合理的行高让文字透气，就像休止符让音乐有呼吸空间。" expected="`1.3` 时行间距紧凑，`2.5` 时行间距非常疏朗。`1.6~1.8` 通常是正文最舒适的阅读间距。"}
把 `line-height` 从 `1.8` 改成 `1.3` 和 `2.5`，看行间距疏密变化
::::

::::step{purpose="`letter-spacing` 控制字符间距。`em` 是相对单位，相对于当前字体大小。" expected="字与字之间的距离明显变大了。适当加大字间距可以让标题更有气势。"}
把 `letter-spacing` 加大到 `0.15em`，感受字间距
::::

::::step{purpose="`text-align` 控制文字水平对齐。`center` 居中、`left` 左对齐、`right` 右对齐。" expected="文字从居中变成左对齐或右对齐。左对齐是最自然的阅读方式。"}
把 `text-align` 改成 `left` 和 `right`，看对齐变化
::::

:::

:::explain{title="CSS 中的长度单位 — px / em / rem / vh / vw"}
CSS 中有多种长度单位，理解它们的区别很重要：
**绝对单位**
- `px`（像素）— 屏幕上的固定点数，最直观。"给我 16 个像素的字体。"
**字体相对单位**
- `em` — 相对于**父元素**的字体大小。`2em` 表示当前父元素字体 2 倍
- `rem`（root em）— 相对于**根元素**（`<html>`）的字体大小，不受嵌套影响
```css
html { font-size: 16px; }        /* 根字体 16px */
h1 { font-size: 2rem; }           /* 32px */
p { font-size: 1rem; }            /* 16px */
.card { padding: 1.5rem; }        /* 24px */
```
**视口相对单位**
- `vw` — 视口宽度的 1%（50vw = 屏幕一半宽）
- `vh` — 视口高度的 1%（100vh = 满屏高度）
- `%` — 相对于**父元素**对应属性的百分比
**用什么？**
- 字体大小、间距 → `rem`（统一缩放，不受嵌套影响）
- 边框粗细 → `px`（精确控制）
- 全屏布局 → `vw` / `vh`
- 容器内比例 → `%`
> 🎵 类比：`px` 像调音器上的刻度（精确但死板），`rem` 像移调后的音高（跟着基准音变），`vw` 像音乐厅的声场大小（跟着空间变）。
:::

:::listen-to
圣桑《动物狂欢节》— 每种乐器代表一种动物，音色各具特色，就像不同字体传达不同的气质。
:::

