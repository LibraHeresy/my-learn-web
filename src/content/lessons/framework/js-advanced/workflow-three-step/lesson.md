# 三段工作流 -- HTML, CSS, JS 的正确顺序

:::analogy
盖房子如果先贴墙纸再砌墙，墙纸会被砸烂。写页面也一样：HTML 是承重墙，CSS 是墙纸，JS 是电线。顺序错了，返工的就是你。
:::

:::prerequisite
**本节你需要知道这些词：**

- `querySelector` -- 用 CSS 选择器获取页面元素
- `addEventListener` -- 给元素绑定事件（click、input 等）
- `textContent` -- 读写元素的文字内容
- `Math.random()` -- 生成 0~1 之间的随机小数
- `Math.floor()` -- 向下取整（砍掉小数部分）
:::

:::explain{title="先看问题：顺序错了会怎样？"}

假设你要做一个"名言卡片"：点击按钮，随机换一句名言。

新手常见的做法是一上来就写 JS：

```js
// 新手做法：先写 JS，发现元素取不到
let btn = document.querySelector("#shuffleBtn"); // 返回 null！
let text = document.querySelector("#quoteText");  // 也是 null！

btn.addEventListener("click", function() {  // 报错！btn 是 null
  // ...换名言的逻辑
});
```

为什么取不到？因为 HTML 还没写，页面上根本没有 `#shuffleBtn` 这个元素。

然后你赶紧补 HTML：

```html
<div>
  <p id="quoteText">学如逆水行舟</p>
  <button id="shuffleBtn">换一句</button>
</div>
```

接着发现页面很丑，又加 CSS。但 CSS 写了一半发现 HTML 结构不合理--卡片没有外层容器，背景色不知道该加给谁。于是改 HTML 结构，然后之前写的 CSS 选择器全废了，JS 的 querySelector 也得跟着改。

**这就是顺序错乱的结果：每一步都在推翻上一步，白写一堆代码。**

:::

:::explain{title="解决方案：三段工作流"}

正确顺序是 **HTML -> CSS -> JS**，每一步完成并确认后再进入下一步。

**第一步：HTML（结构）-- 把所有内容摆上去**

```html
<!-- 先搭骨架：卡片容器、文字、按钮，一个都不少 -->
<div class="quote-card">           <!-- 外层容器，后面 CSS 要对它加背景 -->
  <h2 class="quote-card__title">每日名言</h2>   <!-- 卡片标题 -->
  <p class="quote-card__text" id="quoteText">学如逆水行舟</p>  <!-- 名言文字 -->
  <button class="quote-card__btn" id="shuffleBtn">换一句</button>  <!-- 操作按钮 -->
</div>
```

确认：所有需要的元素都在页面上能看到文字。

**第二步：CSS（样式）-- 给骨架穿衣服**

```css
/* 从外到内、从大到小：先卡片容器，再内部元素 */
.quote-card {
  background: #FFFAF2;      /* 米白背景，像一张真正的卡片 */
  border-radius: 12px;      /* 圆角让卡片更柔和 */
  padding: 30px;            /* 内边距让文字不贴边 */
  text-align: center;       /* 内容居中 */
  max-width: 400px;         /* 限制宽度，太宽不好看 */
}
.quote-card__btn {
  background: #8B0000;      /* 暗红色，沉稳不刺眼 */
  color: #fff;              /* 白色文字，对比清晰 */
  border: none;             /* 去掉默认边框 */
  padding: 10px 24px;       /* 上下10px，左右24px */
  border-radius: 6px;       /* 按钮圆角 */
  cursor: pointer;          /* 鼠标变手型，暗示可点击 */
}
.quote-card__btn:hover {
  background: #A52A2A;      /* 悬停时变亮，给用户反馈 */
}
```

确认：卡片有背景、圆角、按钮好看，页面看起来像一个完整的卡片。

**第三步：JS（交互）-- 接通电路**

```js
// 此时 HTML 和 CSS 已经稳定，querySelector 保证能取到元素
let quoteText = document.querySelector("#quoteText");     // 获取文字元素
let shuffleBtn = document.querySelector("#shuffleBtn");   // 获取按钮元素

// 准备数据：名言的数组
let quotes = [
  "学如逆水行舟，不进则退",
  "千里之行，始于足下",
  "温故而知新，可以为师矣",
  "三人行，必有我师焉"
];

// 给按钮接通"电路"：点击触发换名言
shuffleBtn.addEventListener("click", function() {
  // 1. 生成随机索引
  let randomIndex = Math.floor(Math.random() * quotes.length);
  // Math.random()  -> 例如 0.6234
  // * 4            -> 2.4936
  // Math.floor()   -> 2（整数索引）
  
  // 2. 取出对应名言
  let newQuote = quotes[randomIndex];  // quotes[2] = "温故而知新，可以为师矣"
  
  // 3. 更新页面文字
  quoteText.textContent = newQuote;    // 页面显示新名言
});
```

确认：点击按钮，名言随机切换。

:::

:::explain{title="常见错误"}

**错误 1：HTML 里没写元素就开始写 JS**

```js
// ❌ 错误：页面上根本没有 #result 这个元素
let result = document.querySelector("#result");
result.textContent = "hello";  // TypeError: Cannot set property of null
```

```js
// ✅ 正确：先在 HTML 里写好 <p id="result"></p>，再写 JS
// 确认元素存在后
let result = document.querySelector("#result");
result.textContent = "hello";  // 正常工作
```

**错误 2：CSS 里用了一个 HTML 里不存在的 class**

```css
/* ❌ 错误：HTML 里根本没有 .card-wrapper 这个类 */
.card-wrapper { background: #fff; }  /* 这段 CSS 永远不会生效 */
```

```css
/* ✅ 正确：先确认 HTML 里有对应的 class */
.quote-card { background: #fff; }  /* 对应 HTML 里的 class="quote-card" */
```

**错误 3：JS 里 querySelector 选择器写错**

```js
// ❌ 错误：HTML 里是 class="quote-card"，但用了 ID 选择器
let card = document.querySelector("#quote-card");  // 返回 null
```

```js
// ✅ 正确：class 用 . 前缀，ID 用 # 前缀
let card = document.querySelector(".quote-card");  // 正确取到元素
```

:::

:::explain{title="实际工作中你会用这个来..."}

- **接到一个新页面需求时**：先写 HTML 把内容全部摆出来，产品经理确认内容无误后，再写 CSS 美化，最后写 JS 交互。每一步都不会因为前一步的修改而返工。
- **和设计师协作时**：你先把 HTML 结构搭好给设计师看，设计师在浏览器里调整 CSS，确认后再给你。你不会因为"结构要改"而把辛苦写的 JS 全部推翻。
- **排查 bug 时**：如果点击按钮没反应，你不会同时怀疑 HTML、CSS、JS 三个层面--因为你知道 HTML 和 CSS 在之前已经验证过没问题，问题只可能出在 JS 里。

:::

:::task{title="动手试试"}

打开 `script.js`，按照三段工作流逐步完成名言卡片。

::::step{purpose="先搭骨架：把所有元素部署到位。这一步确认内容和结构无误，不关心样式。" expected="预览区能看到标题、名言文字和一个按钮，样式还很朴素--这很正常。"}
在 HTML 中创建卡片结构：一个 div 容器包含 h2 标题、p 名言文字、button 按钮。给需要被 JS 操作的元素加上 id。
::::

::::step{purpose="CSS 是给骨架穿衣服。先确认内容可见，再美化外观，这样能清楚分辨结构问题和样式问题。" expected="卡片有了温暖的米白背景和圆角边框，按钮为暗红色，鼠标悬停时变亮。"}
在 CSS 中给卡片加背景色 #FFFAF2、圆角、内边距；给按钮加暗红背景、白色文字、圆角和 hover 变色效果。
::::

::::step{purpose="JS 让卡片活起来。此时 HTML 和 CSS 已经稳定，querySelector 不会返回 null。" expected="点击按钮后，名言文字随机变换成数组中的另一句。"}
在 JS 中：准备名言数组，用 querySelector 获取元素，给按钮绑定 click 事件，用 Math.random() 和 Math.floor() 随机选取名言并更新 textContent。
::::

:::

:::recap
前端开发的标准顺序：先 HTML 结构（把所有内容摆上去），再 CSS 样式（美化外观），最后 JS 交互（让页面动起来）。顺序对了，每一步都不返工。顺序错了，改一步毁三步。
:::
