# 点击事件 — 让按钮响应用户

:::analogy
事件就像门铃——门铃装好了，但只有客人按下去的那一刻，铃声才响。

- 没按门铃的时候：屋里安安静静，什么都不会发生
- 按下门铃的瞬间：铃声响起，屋里的人起身开门

JavaScript 的事件完全一样：你写好一段代码（比如"显示一条消息"），但它不会自己跑——它静静地等着，直到用户点击按钮的那一刻，代码才被触发执行。

**为什么这个很重要？** 在这节课之前，你写的所有 JS 代码都是"页面加载完就跑一遍，然后就结束了"。但从这节课开始，你的代码会**等**用户——用户点什么，代码就做什么。这就是"交互"的起点。
:::


:::prerequisite
**本节你需要知道这些词：**

- **函数**：用 `function` 封装一段可重复执行的代码。如果你写过 `function sayHi() { alert("你好"); }`，你就知道函数是什么
- **变量**：用 `let` 或 `const` 存储数据，比如 `let count = 0`
- **DOM 基础**：会使用 `document.querySelector("#id")` 找到页面上的 HTML 元素，并用 `.textContent` 修改它的文字内容
:::

:::explain{title="一、没有事件的时候——代码只会跑一次"}
打开页面，JS 代码从上到下执行一遍，然后就结束了。之后不管你做什么（点按钮、敲键盘、晃鼠标），都不会有任何反应。

```js
// 这段代码在页面加载时执行一次，然后就"死了"
let count = 0;                                   // 变量初始化
let btn = document.querySelector("#countBtn");   // 找到按钮
let display = document.querySelector("#display"); // 找到显示区

count = count + 1;                                // 加 1
display.textContent = `你点击了 ${count} 次`;     // 更新文字

// 问题：上面的代码只跑了一次。
// 用户反复点击按钮 → 什么都不会发生！
// 用户刷新页面 → 代码从头再跑一次（但这不是"交互"，这是"重启"）
```

**问题的本质：** `count = count + 1` 只在页面加载时执行了一次。你需要的是一段代码，它不是"打开页面就执行"，而是"每当用户点击按钮时才执行"。你需要的，就是**事件**。
:::

:::explain{title="二、事件出场——让代码"等"着用户"}
`addEventListener` 就是 JavaScript 提供的"门铃安装工具"。它告诉浏览器："当这个元素上发生这个事件时，请执行这个函数。"

```js
let count = 0;
let btn = document.querySelector("#countBtn");
let display = document.querySelector("#display");

// addEventListener：给按钮装上门铃
//     ↓ 事件类型（"click" = 点击）
//              ↓ 回调函数（点击后要执行的代码）
btn.addEventListener("click", function() {
  count = count + 1;                              // 只有点击时才执行这一行！
  display.textContent = `你点击了 ${count} 次`;   // 点击时才更新页面！
});

// 关键区别：页面加载时，addEventListener 只做了一件事——
// 把回调函数"寄存"在按钮上。函数体里的代码（count + 1, 更新文字）
// 一行都不执行。只有用户真正点击按钮时，寄存的函数才被调用。
```

**用事件之前 vs 之后：**
| 场景 | 没有事件 | 有了事件 |
|------|----------|----------|
| 页面加载时 | 代码跑一遍 | 只注册监听器，不执行回调 |
| 用户点击按钮 | 毫无反应 | 回调函数执行！count + 1 |
| 用户再点一次 | 还是毫无反应 | 回调函数再执行一次！ |
| 用户点 100 次 | 始终没反应 | 回调函数执行 100 次！ |

这就是从"静态页面"到"可交互应用"的质变。
:::

:::explain{title="三、逐句拆解 addEventListener——每一部分在说什么"}
把这行代码像拆零件一样拆开来看：

```js
btn.addEventListener("click", function() { /* ... */ });
// ① ②         ③ ④       ⑤         ⑥
```

**① `btn`** — **在谁身上监听？**
这是你用 `querySelector` 找到的那个按钮元素。事件是绑定在具体元素上的——不同的按钮可以绑不同的事件。

**② `.addEventListener(`** — **干什么？**
JavaScript 的内置方法，意思是"添加事件监听器"。你可以把它理解成"装一个感应器"。

**③ `"click"`** — **监听什么？**
事件类型，必须用**字符串**表示。常用事件类型：
- `"click"` — 鼠标点击
- `"dblclick"` — 鼠标双击
- `"input"` — 输入框内容变化
- `"mouseenter"` — 鼠标移入
- `"mouseleave"` — 鼠标移出
- `"keydown"` — 键盘按下
- `"submit"` — 表单提交

**④ `,`** — **分隔符**
第一个参数（事件类型）和第二个参数（回调函数）之间用逗号隔开。

**⑤ `function() {`** — **做什么？**
这是**回调函数**的定义。回调函数 = "事件发生时要执行的代码"。注意这里写的是 `function()`，不是 `function`——这里定义了一个**匿名函数**（没有名字的函数），直接作为参数传入。

**⑥ `{ ... }`** — **回调函数体**
花括号里就是你真正想执行的代码。这些代码**不会在页面加载时运行**，只在事件触发时才运行。

**为什么第二个参数是函数？** 因为你需要告诉浏览器"点击后做什么"，而代码不能直接写在外面——直接写的话它会在加载时就执行。把代码包在函数里，就相当于写了一张"指令纸条"塞给按钮，按钮会等到被点击时才打开纸条执行。
:::

:::explain{title="四、回调函数——你把一段代码\"寄存\"给了浏览器"}
回调函数（callback function）是 JavaScript 中最重要的概念之一。它不是事件的专属概念，但在事件中你第一次接触它。

```js
// 你"寄存"给浏览器的是整个函数——不是函数调用的结果
btn.addEventListener("click", function() {   // ← 这是一个"匿名函数"定义
  console.log("按钮被点击了！");              //     浏览器会在合适的时候调用它
});

// 上面的代码等价于——先把函数定义好，再传进去：
function handleClick() {                      // 一个有名字的函数
  console.log("按钮被点击了！");
}
btn.addEventListener("click", handleClick);   // 传函数名，不加 ()！
```

**核心理解：**
- 你写的回调函数**现在不执行**，而是"寄存"在按钮上
- 浏览器记下了它，然后继续做别的事
- 当用户真的点击按钮时，浏览器翻出这张"指令纸条"来执行
- 每点击一次，回调函数就执行一次

**这和你之前写的代码有什么本质不同？**

```js
// 你以前这样写（直接执行）：
let name = "小明";
console.log("你好，" + name);  // ← 立即执行！页面加载时就会打印

// 现在这样写（事件驱动）：
btn.addEventListener("click", function() {
  console.log("你好，小明");    // ← 不会立即执行！只有点击时才打印
});
```

在 `addEventListener` 的回调函数里，你可以做任何事——修改变量、更新 DOM、调用其他函数、甚至再绑定新的事件。这门铃一旦装上，整个世界就活了。
:::

:::example{title="看例子：节拍计数器"}
打开 `script.js`，你会看到下面的代码。每一行都有注释解释它在做什么：

```js
// ===== 第一步：准备数据 =====
let count = 0;                                    // 计数器，从 0 开始

// ===== 第二步：找到页面元素 =====
let btn = document.querySelector("#countBtn");    // 找到 <button id="countBtn">
let display = document.querySelector("#display"); // 找到 <p id="display">

// ===== 第三步：绑定事件 =====
// btn.addEventListener("事件类型", 回调函数)
// 回调函数 → 事件发生时执行的代码
btn.addEventListener("click", function() {
  // 下面两行代码只有用户点击按钮时才会执行
  count = count + 1;                              // 计数器 +1
  display.textContent = `你点击了 ${count} 次`;   // 用模板字符串更新页面文字
});

// ===== 页面加载完成 =====
// 此时 count = 0，页面上显示"你还没有点击"
// addEventListener 已经把回调函数"寄存"好了，就等用户来点
```

切换到预览区，点几下按钮试试。每一次点击，浏览器都执行一次 `function() { ... }` 里的代码——你点击 10 次，它就跑 10 遍。这就是事件驱动编程的核心。
:::

:::example{title="常见错误——看看你踩过几个坑？"}

**错误 1：把函数调用结果传给 addEventListener（而不是函数本身）**

```js
// ❌ 错误：fn() 会立即执行函数，把返回值（undefined）传给了 addEventListener
btn.addEventListener("click", handleClick());  // 页面加载时 handleClick 就执行了！
                                               // 点击按钮时什么都不会发生

// ✅ 正确：传函数名，不加 ()。浏览器会在点击时才调用它
btn.addEventListener("click", handleClick);     // handleClick 被寄存，等点击才执行

// ✅ 也可以：直接用匿名函数
btn.addEventListener("click", function() {
  handleClick();  // 在匿名函数里调用
});
```

**为什么会犯这个错？** 你习惯了 `handleClick()` 这种写法来"执行函数"。但在 `addEventListener` 里，你不是要"执行函数"——你是要"把函数传给浏览器让它以后执行"。加了 `()` 就等于当场执行了。

**错误 2：选错了元素——querySelector 没找到**

```js
// ❌ 错误：HTML 里是 <button id="countBtn">，但写错了选择器
let btn = document.querySelector("#countbtn");   // id 大小写不对！返回 null
btn.addEventListener("click", function() {       // ❌ 报错：btn 是 null！
  // ...
});

// ❌ 错误：忘记写 #，querySelector 以为你在找 <countBtn> 标签
let btn = document.querySelector("countBtn");    // 返回 null

// ✅ 正确：id 用 #，class 用 .，标签名不加前缀
let btn = document.querySelector("#countBtn");   // 找到 id="countBtn" 的按钮
```

**错误 3：把 addEventListener 放在获取元素之前**

```js
// ❌ 错误：还没找到按钮就想绑定事件
btn.addEventListener("click", function() { ... }); // js 从上往下执行，此时 btn 还没定义！
let btn = document.querySelector("#countBtn");

// ✅ 正确：先获取元素，再绑定事件
let btn = document.querySelector("#countBtn");      // 先拿到元素
btn.addEventListener("click", function() { ... });  // 再绑定事件
```

**错误 4：以为点击会自动触发多次回调**

```js
// 这段代码在页面加载时执行：
let count = 0;
btn.addEventListener("click", function() {
  count = count + 1;
  console.log(count);
});
// 加载完，count 是 0，没有打印任何东西

// 用户点击第一次：回调执行 → count 变成 1 → 打印 1
// 用户点击第二次：回调执行 → count 变成 2 → 打印 2
// 用户点击第三次：回调执行 → count 变成 3 → 打印 3
// ...

// count 的值为什么没有被重置？因为 count 定义在回调函数外面！
// 回调函数每次执行时访问的是同一个 count 变量。
// 这就是"闭包"的工作原理——后面你会深入学习。
```

:::

:::explain{title="五、实际工作中你会用事件来做什么？"}
事件不是练习题里的玩具——它是每一行生产代码的骨架。以下是你将来每天都会写的模式：

**场景 1：登录按钮 → 验证表单**
```js
// 用户点了"登录"按钮 → 检查用户名和密码是否填写了
let loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", function() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

  if (username === "" || password === "") {        // 如果有字段为空
    alert("请填写用户名和密码！");                  // 提示用户
    return;                                        // 停止，不继续提交
  }
  // 验证通过，跳转到主页（后面会用 fetch 发请求到后端）
  console.log("登录成功，欢迎 " + username);
});
```

**场景 2："点赞"按钮 → 增加计数**
```js
// 用户每次点"赞" → 数字 +1
let likeCount = 0;                                 // 初始点赞数
let likeBtn = document.querySelector("#likeBtn");
let likeDisplay = document.querySelector("#likeCount");

likeBtn.addEventListener("click", function() {
  likeCount = likeCount + 1;                      // 点赞数 +1
  likeDisplay.textContent = likeCount;             // 更新显示
});
```

**场景 3：汉堡菜单 → 展开/收起导航**
```js
// 手机上点三条横线图标 → 显示或隐藏菜单
let menuBtn = document.querySelector("#hamburger");
let nav = document.querySelector("#nav-menu");

menuBtn.addEventListener("click", function() {
  // classList.toggle：如果元素有 "open" 类就移除，没有就添加
  nav.classList.toggle("open");                   // 切换菜单的显示/隐藏
});
```

**场景 4：搜索框 → 实时过滤**
```js
// 用户在搜索框里打字 → 实时过滤列表
let searchInput = document.querySelector("#search");
searchInput.addEventListener("input", function() {  // "input" 事件：每次输入都触发
  let keyword = searchInput.value;                  // 获取当前输入的文字
  console.log("正在搜索：" + keyword);              // 后面你会学到用这个关键词过滤数据
});
```

这些模式的共同结构：**找到元素 → 监听事件 → 在回调里操作 DOM**。掌握这三步，你就掌握了前端交互开发的 80%。
:::

:::task{title="动手试试 ✨"}

::::step{purpose="让你直观感受事件驱动编程的核心模型：用户操作（点击）→ 事件触发 → 执行{{term:回调函数}} → 更新页面。就像按下开关 → 电路连通 → 灯亮了——每一步都是对前一步的响应。" expected="每点击一次按钮，计数器增加 1，页面显示「你点击了 N 次」。这是你第一次写出「能和用户互动」的代码。"}
1. 打开右侧编辑器的 `script.js` 文件，浏览一遍代码结构
2. 切换到**预览区**，找到「🎵 点我打拍子」按钮
3. 反复点击按钮，观察计数器从 0 开始逐次增加
4. 感受：你的每一次点击，都触发了一次 `function() { ... }` 的完整执行
::::

::::step{purpose="让你意识到事件回调函数里的代码和普通 JS 代码完全一样——你可以自由地修改其中的逻辑和显示。事件只是一个触发时机，被触发后执行的代码由你完全掌控。" expected="点击按钮后，页面显示的文字变成了你自定义的表达方式，但计数功能不受影响。你已经学会定制交互反馈了。"}
1. 打开 `script.js`
2. 找到 `display.textContent` 那一行（大约在第 9 行）
3. 把模板字符串里的文字改成你自己的表达方式，比如改为：
   ```js
   display.textContent = `当前计数：第 ${count} 次`;
   ```
   或者：
   ```js
   display.textContent = "你已经点了 " + count + " 下啦！";
   ```
4. 切换到预览区，点击按钮，看看你的新文字效果
::::

::::step{purpose="让你理解核心逻辑的一行改动就能改变整个交互行为。这就是编程的魔力：一个数字的变化，整个计数器的速度就完全不一样了。大胆改，看看会发生什么。" expected="每次点击按钮，计数器跳 5 个数，页面显示「你点击了 5 次」→「你点击了 10 次」→「你点击了 15 次」……节奏明显加快。"}
1. 打开 `script.js`
2. 找到 `count = count + 1` 这一行（大约在第 8 行）
3. 把 `1` 改成 `5`：
   ```js
   count = count + 5;  // 每次点击跳 5 个数！
   ```
4. 切换到预览区，连续点击按钮，感受"加速"的效果
5. 试试改成 `+ 10` 或 `+ 100`，看看极限在哪里
::::

::::step{purpose="从零开始完整走一遍「HTML 加元素 → JS 获取元素 → 绑定事件 → 写回调逻辑」的全流程。这是前端开发中最常见的模式，掌握它就掌握了一大半交互开发的技能。" expected="点击归零按钮后，计数器回到 0，显示内容也同步更新（如「计数器已归零」）。你在一个页面上同时拥有了「增加」和「归零」两个交互功能，就像秒表有了开始和重置两个按钮。"}
挑战：添加一个"归零"按钮。

1. 打开 `index.html`，在 `<div class="counter-box">` 里面，`</button>` 后面，添加：
   ```html
   <button id="resetBtn">🔄 归零</button>
   ```
2. 打开 `script.js`，在文件底部添加以下代码：
   ```js
   // 获取归零按钮
   let resetBtn = document.querySelector("#resetBtn");

   // 绑定归零事件的回调函数
   resetBtn.addEventListener("click", function() {
     count = 0;                                      // 把计数器重置为 0
     display.textContent = "计数器已归零";            // 更新页面显示
   });
   ```
3. 切换到预览区，先点几次「打拍子」按钮让计数涨上去，再点「归零」按钮
4. 确认计数器回到 0，显示文字变为"计数器已归零"
5. 再点「打拍子」——确认计数器从 0 重新开始计数
::::

:::

:::recap
这一节你学会了让页面"活"起来——用 `addEventListener("click", 回调函数)` 给按钮绑定点击事件。

**核心概念回顾：**
- **没有事件时**：代码在页面加载时执行一遍然后就"死"了，用户做什么都没有反应
- **有了事件后**：你把一段代码（回调函数）"寄存"在元素上，浏览器等用户触发事件时才执行它
- **事件的三部曲**：找到元素（`querySelector`）→ 绑定事件（`addEventListener`）→ 写回调函数
- **常见错误**：回调函数加 `()` 导致提前执行、选择器拼错、元素获取顺序反了

**你学到的不仅仅是语法——你学到了一个全新的编程模型：**
之前你的代码是"做完就结束"，现在你的代码是"等着用户来触发"。这个"事件驱动"的模型是前端开发的基础——从此以后，你写的每一行交互代码，都是对这个模型的延伸和深化。

下一节你将学习**条件判断（if/else）**——让回调函数不再是"傻傻地每次做同样的事"，而是根据不同的情况做出不同的反应。
:::
