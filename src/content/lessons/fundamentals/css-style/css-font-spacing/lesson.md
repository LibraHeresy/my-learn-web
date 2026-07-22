# 字体与间距 — 让文字更优雅

:::analogy
字体选择就像穿衣风格——正装体面庄重（衬线体），便装轻松现代（无衬线体）。字间距和行间距就像说话的节奏——太快听不清，太慢让人走神，合适的间距让眼睛自然地"读进去"。
:::

:::prerequisite
**本节你需要知道这些词：**

- **CSS 选择器**：`.card` 选中元素，`.card h2` 选中卡片内的标题
- **CSS 属性与值**：`color: #8B2E2E;` 这样的基本句式你已经会写了
- **背景和边框**：`background-color`、`border`、`border-radius`——上一节刚学过
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 用 `font-family` 选择合适的字体（衬线体 vs 无衬线体）
- 用 `font-size`、`font-weight` 建立标题和正文的字号层级
- 用 `line-height`、`letter-spacing` 控制文字的呼吸感
- 用 `text-align` 控制文字的水平对齐
- 区分 CSS 中的各种长度单位：`px`、`rem`、`em`、`vw`、`vh`、`%`
:::

:::explain{title="一、没有字体和间距设置时，文字是什么体验？"}
假设你有一张卡片，内容是一段引人入胜的介绍文字。但 CSS 只设置了背景和边框，没有碰字体：

```html
<div class="card">
  <h2>茶道的精神</h2>
  <p>茶道是一种以茶为媒的生活礼仪，也被认为是修身养性的一种方式。它通过沏茶、赏茶、闻茶、饮茶，增进友谊，美心修德，学习礼法。</p>
  <p class="note">——摘自《茶经》</p>
</div>
```

不加字体设置时，浏览器使用默认字体（通常是 Times New Roman 或系统默认），行间距是默认的约 1.2 倍行高，字间距为 0。效果是：**文字挤在一起，行与行之间几乎没有空隙，标题和正文字号差距很小，整段文字像一堵密不透风的字墙。**

读者面对这样的文字墙，眼睛很难找到"下一行"——这就是为什么要控制字体和间距。
:::

:::explain{title="二、用字体和间距让文字"透气""}
加上字体和排版属性后，同一段 HTML 变得完全不同：

```css
.card {
  font-family: "Noto Serif SC", serif;   /* 衬线体，典雅庄重 */
  line-height: 1.8;                       /* 行高1.8倍，行间呼吸自如 */
  letter-spacing: 0.05em;                /* 字间距微增，不挤不散 */
}

.card h2 {
  font-size: 28px;          /* 标题大字 */
  font-weight: 700;         /* 粗体，加强分量 */
  text-align: center;       /* 标题居中，有仪式感 */
}

.card p {
  font-size: 16px;          /* 正文适中 */
  font-weight: 400;         /* 常规粗细 */
  text-align: left;         /* 正文左对齐，符合阅读习惯 */
}
```

现在这段文字看起来完全不同了——标题居中显眼，行间距让每行文字之间有足够的"留白通道"，字间距让汉字不再挤成一团。
:::

:::explain{title="三、逐句拆解每个字体属性"}
把上面的属性逐个拆开：

```css
/* font-family：字体家族。可以写多个，浏览器按顺序找，哪个有就用哪个 */
font-family: "Noto Serif SC", Georgia, serif;
/*            ↑ 首选字体          ↑ 备选     ↑ 通用字体族 */
/* 通用字体族包括：
   serif（衬线体）：笔画末端有装饰，典雅古典，适合标题和长文阅读
   sans-serif（无衬线体）：笔画均匀无装饰，简洁现代，适合正文和UI
   monospace（等宽体）：每个字一样宽，适合展示代码 */

/* font-size：字号。标题通常 24-48px，正文通常 14-18px */
font-size: 28px;

/* font-weight：字重（粗细）。100-900，400=正常，700=粗体 */
font-weight: 700;  /* 也可以写 bold，等于 700 */

/* line-height：行高。数字是无单位的倍数，1.8 = 字号×1.8 */
line-height: 1.8;  /* 1.0 太挤，1.6-1.8 适合正文阅读，2.0+ 太散 */

/* letter-spacing：字间距。正值增间距，负值减间距 */
letter-spacing: 0.05em;  /* em = 相对于当前字号，0.05em 是微调 */

/* text-align：水平对齐方式 */
text-align: center;  /* left(左对齐) / center(居中) / right(右对齐) / justify(两端对齐) */
```
:::

:::explain{title="四、衬线体 vs 无衬线体——什么时候用哪个？"}
两种字体类型的视觉差异很大，用法也不同：

| | 衬线体 (serif) | 无衬线体 (sans-serif) |
|---|---|---|
| **特征** | 笔画末端有小装饰（衬线） | 笔画均匀，无多余装饰 |
| **感觉** | 典雅、正式、有书卷气 | 现代、简洁、干练 |
| **适合** | 标题、长文阅读、文化类页面 | UI 界面、正文、科技类页面 |
| **例子** | Georgia, Noto Serif SC | Arial, Noto Sans SC, Helvetica |

**一个简单的决策规则：** 如果你的页面内容是文化类、书籍类、古典类的——用衬线体做标题，无衬线体做正文。如果你的页面是 SaaS 后台、技术文档、科技类——全部用无衬线体。

**Web 安全字体 vs 自定义字体：** Web 安全字体（如 Arial、Georgia、Times New Roman）在所有操作系统上都预装了，不需要额外加载。自定义字体（如 Google Fonts 的 Noto Serif SC）需要从网络加载，但选择更多。本项目使用 Noto 系列字体，它们已经配置好了。
:::

:::explain{title="五、CSS 长度单位 — px、rem、em、vw、vh、%"}
CSS 里有多种长度单位，它们在不同的场景下各有用处：

```css
/* 绝对单位——最直观 */
font-size: 16px;     /* px(像素)：屏幕上的固定点数。说多少就是多少 */

/* 字体相对单位——跟着字体大小走 */
html { font-size: 16px; }          /* 根字体 = 16px */
h1 { font-size: 2rem; }            /* 2rem = 2 × 16px = 32px */
.card { padding: 1.5rem; }         /* 1.5rem = 1.5 × 16px = 24px */
p { letter-spacing: 0.05em; }      /* 0.05em = 当前元素的字号 × 0.05 */

/* 视口相对单位——跟着屏幕大小走 */
.hero { height: 100vh; }           /* 100vh = 屏幕高度的 100% */
.half-width { width: 50vw; }       /* 50vw = 屏幕宽度的 50% */

/* 百分比——跟着父元素走 */
.child { width: 80%; }             /* 父元素宽度的 80% */
```

**用什么的决策表：**
- 字体大小、间距 → `rem`（统一缩放，不受嵌套影响）
- 边框粗细 → `px`（精确控制，不需要缩放）
- 字间距 → `em`（跟当前字号成比例）
- 全屏布局 → `vw` / `vh`
- 容器内比例 → `%`

类比记忆：`px` 像尺子上的刻度（精确死板），`rem` 像衣服的尺码（跟着基准变），`vw` 像窗户大小（跟着空间变）。
:::

:::example{title="看例子"}
下面的代码是编辑器中你看到的。一张卡片，字体和间距都被精心调整过：

```css
.card {
  font-family: "Noto Serif SC", Georgia, serif;  /* 衬线体，典雅庄重 */
  line-height: 1.8;          /* 行高：1.8倍，行间距舒适 */
  letter-spacing: 0.05em;   /* 字间距：稍加一点空气感 */
  text-align: center;        /* 对齐：标题和引用居中 */
}

.card p {
  font-size: 16px;           /* 正文：16px 是舒适的阅读字号 */
  font-weight: 400;          /* 字重：400 是常规粗细 */
}
```

切换到预览区，感受字体风格、行间距和字间距带来的阅读体验变化。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：字体名有空格但不加引号**
```css
h1 {
  font-family: Noto Serif SC, serif;  /* ❌ 失败了！空格导致解析错误 */
  font-family: "Noto Serif SC", serif; /* ✅ 字体名有空格必须加引号 */
}
```

**错误 2：line-height 给太小**
```css
p {
  font-size: 16px;
  line-height: 1.0;  /* ❌ 行高等于字号，行与行之间没有空隙，阅读很累 */
}
```
正文的舒适行高是 1.5-1.8。低于 1.3 就会感觉拥挤。

**错误 3：中英文混排时用英文字体排中文**
```css
body {
  font-family: Arial, sans-serif;  /* ❌ Arial 的中文渲染质量较差 */
  font-family: "Noto Sans SC", "Microsoft YaHei", sans-serif; /* ✅ 中文优先 */
}
```
如果你的页面同时有中英文，把中文字体写在前面，英文会 fallback 到后面的无衬线体。

**错误 4：text-align: justify 在中文中造成奇怪的字间距**
```css
p {
  text-align: justify;  /* ❌ 两端对齐会让中文字间距变得不均匀 */
}
```
`justify` 对英文（有空格断词）效果好，但中文没有自然断词点，会拉大字间距。中文正文用 `left` 对齐最自然。
:::

:::explain{title="六、实际工作中你会怎么用？"}
在真实项目中，字体和排版设置通常在一个全局样式文件里集中管理：

1. 在 `body` 上设默认的 `font-family`、`font-size`、`line-height`、`color`——这是全站的"排版基调"
2. 专门给 `h1`-`h6` 设字号和字重，建立标题层级（h1 最大，h6 最小）
3. 在组件级别（如 `.card`）只覆盖需要调整的排版属性，其他继承 `body` 的默认值

**这就是 CSS 的"层叠"思想——先设全局默认，再在局部微调。** 你后面学到"层叠与优先级"时会深入理解这个机制。
:::

:::task{title="动手试试 ✨"}

::::step{purpose="`font-family` 决定文字的"气质"。衬线体有装饰线显得典雅，无衬线体没有装饰线显得现代。就像正装 vs 便装——不同的场合穿不同的衣服。" expected="卡片文字从衬线体变成了无衬线体。注意笔画末端：衬线体有小装饰，无衬线体光秃秃的。"}
把 `.card` 的 `font-family` 从 `"Noto Serif SC", serif` 改成 `"Noto Sans SC", sans-serif`，感受衬线和无衬线的区别
::::

::::step{purpose="`line-height` 控制行与行之间的距离。1.3 太挤——上班高峰地铁；2.5 太散——独自走在空旷的广场。1.6-1.8 是正文最舒适的阅读间距。" expected="1.3 时行间距紧凑压抑，2.5 时行间距过于疏朗。找到最舒适的中间值。"}
把 `line-height` 依次改成 `1.3`、`1.8`、`2.5`，感受行间距从拥挤到疏朗的变化
::::

::::step{purpose="`letter-spacing` 控制字与字之间的水平距离。增大它让每个字有独立的存在感，适合标题；正文一般不做大幅调整。" expected="字间距明显变大，每个字之间有独立的空间。适当加大字间距让标题更有气势。"}
把 `letter-spacing` 加大到 `0.15em`，感受字间距的明显变化
::::

::::step{purpose="`text-align` 控制文字在水平方向的对齐方式。`center` 有仪式感适合标题，`left` 最自然适合正文，`right` 很少用。" expected="文字从居中变成左对齐。左对齐最符合阅读习惯——每行起点一致，眼睛不用重新定位。"}
把 `text-align` 依次改成 `left`、`center`、`right`，体验不同对齐方式
::::

:::

:::recap
回顾本节你学会的内容：
- `font-family`：选择字体风格——衬线体典雅，无衬线体现代
- `font-size`：控制字号，标题大（24-48px）正文小（14-18px），建立层级
- `font-weight`：控制粗细，400 正常 700 粗体
- `line-height`：控制行间距，1.6-1.8 是舒适的正文阅读区间
- `letter-spacing`：控制字间距，微调空气感
- `text-align`：控制水平对齐，`left` 适合正文，`center` 适合标题
- **长度单位**：`px` 精确、`rem` 跟着根字体走、`em` 跟着元素字号走、`vw`/`vh` 跟着屏幕走

下一节你将学习盒模型——理解元素的空间结构，搞清楚 padding、border、margin 的区别。
:::
