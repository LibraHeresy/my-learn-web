# 命名就像给收纳盒贴标签 — 让代码自己说话

:::analogy
快递单上写"书"而不是"物品001"--收件人一眼就知道里面是什么。好的变量名就是代码的快递单：让读代码的人（包括一个月后的你自己）不用拆开看就知道里面装了什么。
:::

:::prerequisite
**本节你需要知道这些词：**

- `let` 声明变量 -- 创建一个命名的存储容器
- `function` 声明函数 -- 创建一段可重复调用的代码
- CSS class 选择器 -- `.类名` 的方式给 HTML 元素加样式
:::

:::explain{title="先看问题：坏命名引起的真实 bug"}

下面这段代码，功能是"点击按钮，随机显示一个作者名"。

```js
let a = ["张三", "李四", "王五"];
let b = document.querySelector("#c");
let d = document.querySelector("#e");
d.addEventListener("click", function() {
  let f = Math.floor(Math.random() * a.length);
  b.textContent = a[f];
});
```

这段代码**能正常运行**，但请看以下场景：

**场景一：一个月后你要加一个功能"同时显示作者的作品数量"。** 你盯着代码看了三分钟，需要反复上下翻页确认：
- `a` 是什么？-- 哦，是作者数组
- `b` 是什么？-- 哦，是显示区域
- `d` 是什么？-- 哦，是按钮
- `c` 是什么？-- 页面上另一个元素的 ID。但 `c` 出现在 JS 里，HTML 里用 `id="c"`，CSS 里可能也在用 `.c`...一个字母到处出现，改都不敢改。

**场景二：同事 review 你的代码。** 他问："`f` 是什么？" 你也不记得了，得从 `Math.random()` 反推：哦，是随机索引。

**场景三：你给变量起名 isPlaying，但实际存储的是"是否已登录"。** 另一个开发者在后面的代码里写 `if (isPlaying) { /* 播放音乐 */ }` -- 崩了。

**坏命名不会让代码报错，但它会悄悄导致逻辑错误，而且这种错误最难排查--代码"没写错"，只是理解错了。**

:::

:::explain{title="解决方案：命名规范速查表"}

同样的功能，好命名是这样的：

```js
// ✅ 好命名：每个名字都像快递单一样清楚
let authors = ["张三", "李四", "王五"];            // 复数名词：作者数组
let nameDisplay = document.querySelector("#nameDisplay"); // El 后缀：DOM 元素
let shuffleBtn = document.querySelector("#shuffleBtn");   // Btn 后缀：按钮元素

shuffleBtn.addEventListener("click", function() {
  let randomIndex = Math.floor(Math.random() * authors.length); // 描述用途：随机索引
  nameDisplay.textContent = authors[randomIndex];              // 读起来像句子
});
```

现在任何人都能一眼看懂这段代码在做什么。

**CSS 类名：kebab-case（小写字母 + 连字符）**

```css
/* ✅ 正确 */
.card-title { }      /* 卡片的标题 */
.music-list { }      /* 音乐列表 */
.play-btn { }        /* 播放按钮 */
.nav-item-active { } /* 导航项-激活状态 */

/* ❌ 错误 */
.CardTitle { }       /* CSS 不用驼峰 */
.music_list { }      /* CSS 不用下划线 */
.a { }               /* 单字母：完全不知道给谁用的 */
```

**JS 变量名：camelCase（驼峰命名）**

```js
// ✅ 正确
let composerName = "张三";    // 名词：作者名
let totalCount = 5;          // 名词：总数
let musicList = [];          // 名词列表

// ❌ 错误
let composer_name = "张三";  // JS 不用下划线
let totalcount = 5;          // 两个单词应该分界
let x = [];                  // 单字母：不知道存了什么
```

**JS 函数名：动词开头 + 具体对象**

```js
// ✅ 正确：动词开头，一眼知道做什么
function playMusic() {}       // 播放 + 音乐
function addCard() {}         // 添加 + 卡片
function showMessage() {}     // 显示 + 消息
function calculateTotal() {}  // 计算 + 总数
function isValidEmail() {}    // 是否为有效邮箱（布尔值返回）

// ❌ 错误：名词开头，看不出来是"做"什么
function music() {}           // 是播放？是暂停？是获取？
function card() {}            // 是添加？是删除？
function total() {}           // 是计算？是显示？
```

**常用前缀约定：**

```js
// 存储 DOM 元素的变量：加 El 后缀
let titleEl = document.querySelector("#title");   // 标题元素
let cardEl = document.querySelector(".card");     // 卡片元素
let msgEl = document.querySelector("#msg");       // 消息元素

// 存储按钮的变量：加 Btn 后缀
let likeBtn = document.querySelector("#likeBtn");        // 收藏按钮
let submitBtn = document.querySelector("#submitBtn");    // 提交按钮
let closeBtn = document.querySelector("#closeBtn");      // 关闭按钮

// 布尔值：is / has / can 前缀
let isPlaying = true;      // 是否正在播放
let hasLiked = false;      // 是否已收藏
let canEdit = true;        // 是否可以编辑
```

:::

:::explain{title="常见错误"}

**错误 1：变量名太泛，看不出内容**

```js
// ❌ 错误：data 什么都可以是，完全没信息量
let data = ["张三", "李四", "王五"];
let result = document.querySelector("#output");
let temp = 0;

// ✅ 正确：名称精确描述内容
let authorNames = ["张三", "李四", "王五"];
let outputEl = document.querySelector("#output");
let currentIndex = 0;
```

**错误 2：CSS 用了驼峰，JS 用了 kebab-case**

```css
/* ❌ 错误：CSS 类名不要用驼峰 */
.mainTitle { color: red; }
.cardList { display: flex; }
```

```css
/* ✅ 正确：CSS 用 kebab-case */
.main-title { color: red; }
.card-list { display: flex; }
```

```js
// ❌ 错误：JS 变量名不要用 kebab-case
let user-name = "张三";     // JS 会把 - 当成减号！user-name 等于 user 减 name = NaN
```

```js
// ✅ 正确：JS 用 camelCase
let userName = "张三";
```

**错误 3：函数名和做的事不匹配**

```js
// ❌ 错误：saveData 名字暗示"保存"，实际连渲染都做了
function saveData() {
  localStorage.setItem("data", JSON.stringify(list));
  renderCards(list);          // 渲染？这不是"保存"该做的事
  updateStats(list.length);   // 统计？也不是"保存"
}
```

```js
// ✅ 正确：拆成三个，函数名精确匹配做的事
function saveData(list) {                       // 只保存数据
  localStorage.setItem("data", JSON.stringify(list));
}
function renderCards(list) { /* ... */ }        // 只渲染
function updateStats(count) { /* ... */ }       // 只更新统计
```

:::

:::explain{title="实际工作中你会用这个来..."}

- **接手别人的代码**：好的函数名让你不需要读函数体就知道它是做什么的。`sortByDate(list)` 比 `sort(list)` 多了关键信息--按日期排序。
- **Code Review 中**：看到 `let x = getData()`，你会要求同事改名为 `let userList = getUserList()`。命名是 Code Review 最常讨论的问题之一。
- **搜索代码时**：想找到"计算总价"的代码，搜索 `calculateTotal` 一秒定位。如果叫 `calc` 或 `doThing`，你根本搜不到。

:::

:::task{title="动手试试"}

打开 `script.js`，里面有一段功能正常但命名极差的代码。你的任务是重命名所有变量和函数，让代码"自己说话"。

::::step{purpose="DOM 元素变量加 El/Btn 后缀，读代码时一眼知道它的身份。" expected="代码中不再有 b、c、d、e 这样的单字母变量。"}
把 DOM 元素变量重命名：持有显示区域的变量加 El 后缀，持有按钮的变量加 Btn 后缀。例如 b -> nameDisplay, c -> shuffleBtn。
::::

::::step{purpose="数据变量名精确描述内容--复数表示数组，randomIndex 清楚表达它的用途。" expected="数据变量都有了有意义的名字，不再需要注释解释。"}
把数据变量重命名：数组用复数名词（如 composers），临时变量描述其用途（如 randomIndex）。
::::

::::step{purpose="函数名用动词开头，函数的用途从名字就能判断，不需要读函数体。" expected="函数名从无意义的字母变成有意义的动词短语。"}
把函数重命名：函数名以动词开头，清晰描述它做什么（如 showRandom, addComposer）。
::::

:::

:::recap
CSS 类名用 kebab-case (card-title)，JS 变量用 camelCase (composerName)，函数名用动词开头 (playMusic)。DOM 元素加 El/Btn 后缀，布尔值用 is/has 开头。好命名让代码自己说话，坏命名悄悄生产 bug。
:::
