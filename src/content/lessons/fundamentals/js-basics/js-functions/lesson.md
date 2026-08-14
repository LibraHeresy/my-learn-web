# 函数 — 封装你的代码逻辑

:::analogy
函数就像菜谱——把做一道菜的步骤写下来，取个名字。下次做同样的菜，喊"照这个菜谱做"就行，不需要每次重新写一遍步骤。

更重要的是，菜谱可以传给任何人——你把"红烧肉的菜谱"给朋友，他也能做出红烧肉。函数也一样：写好一次，到处使用。
:::

:::prerequisite
**本节你需要知道这些词：**

- **变量**：用 `let`/`const` 声明和存储数据，比如 `let name = "小明"`
- **数据类型**：知道 `"文字"` 是字符串、`123` 是数字、`true/false` 是布尔值
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 用 `function` 关键字定义自己的函数
- 给函数传入参数并获得 `return` 的返回值
- 理解什么时候该把一段代码封装成函数
- 独立写一个能生成 HTML 卡片的函数，并复用它创建多张卡片
:::

:::explain{title="一、没有函数的时候，代码长什么样？"}
假设你在做一个用户管理页面，需要把用户的姓和名拼接成全名，显示在三个不同的地方：

```js
// 用户A的全名
let firstNameA = "小明";
let lastNameA = "王";
let fullNameA = lastNameA + firstNameA;
console.log("用户A：" + fullNameA);  // 输出：用户A：王小明

// 用户B的全名——跟上面几乎一模一样，只是换了名字！
let firstNameB = "小红";
let lastNameB = "李";
let fullNameB = lastNameB + firstNameB;
console.log("用户B：" + fullNameB);  // 输出：用户B：李小红

// 用户C——又要复制粘贴一遍！
let firstNameC = "小刚";
let lastNameC = "张";
let fullNameC = lastNameC + firstNameC;
console.log("用户C：" + fullNameC);  // 输出：用户C：张小刚
```

**这段代码的问题是什么？** 拼接全名的逻辑（姓 + 名）重复了三次。如果有一天你想改成"名 + 空格 + 姓"的格式，你需要改三个地方。漏掉一个就出 bug。这就是函数要解决的问题。
:::

:::explain{title="二、用函数消除重复"}
函数让你把"姓+名=全名"这个**操作**封装起来，给它起个名字叫 `getFullName`。以后每次需要拼接全名，直接"调用"这个名字就行：

```js
// 第一步：定义函数——相当于"写好菜谱"
function getFullName(lastName, firstName) {  // function 关键字 + 函数名 + (参数列表)
  let fullName = lastName + firstName;       // 函数体：真正干活的代码
  return fullName;                           // return：把计算结果"送出去"
}

// 第二步：调用函数——相当于"照菜谱做菜"
let nameA = getFullName("王", "小明");    // 传入参数 "王" 和 "小明"
console.log("用户A：" + nameA);            // 输出：用户A：王小明

let nameB = getFullName("李", "小红");    // 同样的函数，换两个参数
console.log("用户B：" + nameB);            // 输出：用户B：李小红

let nameC = getFullName("张", "小刚");    // 一行代码替代之前的四行！
console.log("用户C：" + nameC);            // 输出：用户C：张小刚
```

**发生了什么变化？** 拼接逻辑只写了一处（`getFullName` 函数里），调用只需一行。如果格式要改（比如加空格），你只改函数定义那一处，所有调用的地方自动生效。这就是函数的第一个核心价值——**避免重复**。
:::

:::explain{title="三、逐句拆解函数的结构"}
把上面那个函数拆开来看，每一部分都有明确的含义：

```js
function getFullName(lastName, firstName) {  // ← 函数签名：名字 + 参数
  // ↑       ↑          ↑          ↑
  // 关键字  函数名      参数1      参数2
  //         （你自己起的名字） （调用时传进来的值）

  let fullName = lastName + firstName;  // ← 函数体：真正执行的代码
  return fullName;                      // ← 返回值：把结果交出去
  //    ↑
  //    return 后面的值会"变成"函数调用的结果
}
```

**逐段理解：**

1. `function` — JavaScript 的关键字，告诉浏览器"我要定义一个函数了"
2. `getFullName` — 函数名，你自己起的。"get"开头表示"获取某物"，"FullName"表示"全名"。命名规则和变量一样
3. `(lastName, firstName)` — 参数列表。它们是"占位符"，调用时会被具体的值替换。比如 `getFullName("王", "小明")` 时，`lastName` 变成 `"王"`，`firstName` 变成 `"小明"`
4. `{ ... }` — 函数体。花括号里的代码就是函数真正执行的内容
5. `return` — 返回值语句。`return` 后面的表达式的值会成为函数调用的结果。也就是说，`let result = getFullName("王", "小明")` 这行代码执行后，`result` 的值就是 `return` 后面那个 `fullName` 的值

**return 特别重要——它是函数的"出口"：**
```js
function add(a, b) {
  return a + b;        // 计算 a+b，然后把结果送出去
  console.log("done"); // ⚠️ 这行永远不会执行！return 后面的代码被跳过
}

let sum = add(3, 5);   // sum 的值是 8
console.log(sum);       // 输出：8
```

**函数和变量的区别：**
- 变量是**存数据的容器**——`let name = "小明"` 存了一个字符串
- 函数是**存操作的容器**——`function getName() { ... }` 存了一段可以被重复执行的代码
:::

:::diagram{title="调用栈：函数像盘子一样叠起来，最上面的先执行完、先拿走"}
<svg viewBox="0 0 440 220" xmlns="http://www.w3.org/2000/svg" role="img">
  <rect x="150" y="120" width="140" height="36" rx="6" fill="#fdf6e3" stroke="#8B2E2E" stroke-width="2"/>
  <text x="220" y="143" font-size="12" fill="#8B2E2E" text-anchor="middle" font-weight="bold">getFullName()</text>
  <rect x="150" y="78" width="140" height="36" rx="6" fill="#ffffff" stroke="#6B5A4E"/>
  <text x="220" y="101" font-size="12" fill="#333" text-anchor="middle">greet()</text>
  <rect x="150" y="36" width="140" height="36" rx="6" fill="#ffffff" stroke="#6B5A4E"/>
  <text x="220" y="59" font-size="12" fill="#333" text-anchor="middle">主程序</text>
  <text x="320" y="60" font-size="11" fill="#6B5A4E">先执行主程序</text>
  <text x="320" y="100" font-size="11" fill="#6B5A4E">greet() 调用 getFullName()</text>
  <text x="320" y="143" font-size="11" fill="#8B2E2E">最上层先执行完、先返回</text>
  <line x1="120" y1="54" x2="140" y2="54" stroke="#c9a96e" stroke-width="2" marker-end="url(#sa)"/>
  <text x="112" y="48" font-size="11" fill="#c9a96e">入栈 ↑</text>
  <line x1="60" y1="154" x2="130" y2="154" stroke="#c9a96e" stroke-width="2"/>
  <text x="60" y="150" font-size="11" fill="#c9a96e">执行完出栈 ↓</text>
  <defs>
    <marker id="sa" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#c9a96e"/>
    </marker>
  </defs>
</svg>
:::

:::explain{title="四、参数 vs 实参——容易混淆的两个词"}
看书和上课时你会遇到两个词：**参数（parameter）**和**实参（argument）**。它们指的是同一个东西的不同侧重点：

```js
//          这两个是"参数"（定义时的占位符）
//                 ↓        ↓
function greet(firstName, greeting) {
  return greeting + "，" + firstName + "！";
}

//                        这两个是"实参"（调用时实际传进去的值）
//                              ↓        ↓
let result = greet("小明", "你好");
console.log(result);  // 输出：你好，小明！
```

- **参数（parameter）**：函数定义时括号里的变量名，是"占位符"。就像菜谱上写的"盐适量"——"适量"就是参数
- **实参（argument）**：调用函数时实际传进去的值。就像你做菜时实际放的那一勺盐——具体的一勺就是实参

日常交流中很多人混用这两个词，但你要知道：函数**定义**时写的是参数，函数**调用**时传的是实参。
:::

:::example{title="完整示例：一个生成 HTML 卡片的函数"}
下面是一个更贴近实际开发的例子。`createCard` 函数接收作曲家信息，返回一段 HTML 代码。调用一次就生成一张卡片：

```js
// 定义函数：接收三个参数，返回一段 HTML 字符串
function createCard(composer, period, piece) {
  //  参数 composer → 作曲家姓名
  //  参数 period   → 所属时期
  //  参数 piece    → 代表作

  return `
    <div class="card">
      <h2>${composer}</h2>
      <p>时期：${period}</p>
      <p>代表作：《${piece}》</p>
    </div>
  `;
}

// 调用函数：传入不同的参数，得到不同的卡片
let html = "";
html += createCard("巴赫", "巴洛克", "赋格的艺术");
html += createCard("莫扎特", "古典主义", "魔笛");
html += createCard("德彪西", "印象派", "月光");

// 把三张卡片拼在一起，显示到页面上
document.querySelector("#gallery").innerHTML = html;
```

**运行结果：** 页面上会显示三张卡片，每张卡片有不同的作曲家、时期、代表作——但结构完全一样。你只写了一次 HTML 结构（函数定义里），用了三次（三次调用）。

**这个例子展示了函数的复用能力：** 如果要给每张卡片加一个"创作年份"行，你只需在函数定义里加一行 `<p>年份：${year}</p>`，然后在函数签名里加一个 `year` 参数。三张卡片都会自动多出一行。这就是"改一处，全局生效"。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：忘记 () 调用函数**
```js
function sayHi() {
  console.log("你好！");
}

sayHi;    // ❌ 什么都没发生！只写了函数名，没有加 ()，就不会执行
sayHi();  // ✅ 输出：你好！() 才是"执行"的意思
```
函数名不加 `()` 时，它只是一个"指向函数的变量"，不会被调用。加了 `()` 才会执行。

**错误 2：return 之后写代码**
```js
function calc(x) {
  return x * 2;            // return 执行后，函数立即结束
  console.log("计算完成");  // ❌ 这行永远不会被执行！
}
```
`return` 语句会让函数直接返回，后面的代码全部跳过。

**错误 3：搞错参数顺序**
```js
function introduce(firstName, lastName) {
  return "我是" + firstName + lastName;
}

// 调用时参数顺序必须和定义时一致！
console.log(introduce("小明", "王"));   // ✅ 输出：我是小明王
console.log(introduce("王", "小明"));   // ❌ 输出：我是王小明（顺序反了！）
```

**错误 4：以为参数能改变外面的变量**
```js
let count = 10;

function addOne(num) {
  num = num + 1;     // 只改变了参数 num 的值
  return num;
}

let newCount = addOne(count);  // newCount 是 11
console.log(count);             // count 仍然是 10！没有被改变
```
函数的参数是一个**副本**——函数内部修改参数不会影响外面的变量。
:::

:::explain{title="五、什么时候该把代码封装成函数？"}
不需要等到代码重复三次才写函数。出现以下信号时就该封装了：

1. **同一段逻辑出现两次以上**——不用想，直接提取成函数
2. **一段代码有明显的"输入→处理→输出"结构**——比如"接收用户ID，查询数据库，返回用户信息"，这就是天然的函数
3. **一段代码太长（超过 20 行）且内部有清晰的分段**——拆成几个小函数，每个做一件事
4. **你想给一段复杂的逻辑起个容易理解的名字**——比如把 10 行日期格式化代码封装成 `formatDate(date)`，调用时一看就懂

**在实际工作中，你会用函数来做这些事情：**
- **事件处理**：用户点击按钮 → 执行 `handleSubmit()` 函数提交表单
- **数据处理**：拿到 API 返回的 100 条数据 → 用 `filterActiveUsers()` 筛选出活跃用户
- **页面渲染**：根据数据数组 → 用 `renderCardList()` 循环生成卡片
- **工具函数**：`formatPrice(99.9)` → 输出 `"¥99.90"`，全站统一使用
:::

:::task{title="动手试试 ✨"}

::::step{purpose="理解函数的核心机制：同一个函数，传入不同的参数，产生不同的输出。就像同一个菜谱，用鸡肉和牛肉做出的口味不同，但做法步骤完全一样。" expected="页面第一张卡片的作曲家、时期、代表作变成了你输入的内容，另外两张卡片不变。函数本身一行没改。"}
1. 打开右侧编辑器的 `script.js` 文件
2. 找到第一个 `createCard()` 调用（巴赫那张）
3. 把第一个参数 `"巴赫"` 改成你自己的名字
4. 把第二个参数 `"巴洛克"` 改成你想写的时期
5. 把第三个参数 `"赋格的艺术"` 改成你想写的作品
6. 切换到预览区，确认第一张卡片的内容变了
::::

::::step{purpose="体验函数的复用能力：一行函数调用就生成一张完整的卡片。你不需要重新写一遍 HTML 结构。" expected="页面上出现了第四张卡片，样式和其他三张完全一样。你用一行代码创造了一张新卡片！"}
1. 在 `script.js` 中找到三次 `html += createCard(...)` 调用的位置
2. 在第三次调用后面，再加一行 `html += createCard("舒伯特", "浪漫主义", "冬之旅");`
3. 切换到预览区，确认第四张卡片出现
::::

::::step{purpose="练习修改函数定义：增加参数意味着函数的能力增强了。改一处定义，所有调用点都受益——这正是函数'单一真相来源'的价值。" expected="所有卡片都多出了一行创作年份信息，而你只改了函数定义和调用参数。"}
1. 打开 `script.js`
2. 给 `createCard` 函数增加第四个参数 `year`
3. 在函数体内的 HTML 模板中添加一行 `<p>创作年份：${year}</p>`
4. 给每个 `createCard()` 调用都传入年份参数（巴赫 1749、莫扎特 1791、德彪西 1890、舒伯特 1827）
5. 切换到预览区，确认所有卡片都显示了年份
::::

:::

:::recap
回顾本节你学会的内容：
- **函数是什么**：一个有名字的代码块，封装了一段操作，可以被重复调用
- **函数的结构**：`function 名字(参数) { 函数体; return 返回值; }`
- **参数**：函数定义时的占位符，调用时被实际的值替换
- `return`：把计算结果送出去，`return` 之后的代码不会执行
- **函数的价值**：消除重复代码，改一处生效全局，给复杂逻辑起个好名字
- **常见错误**：忘记 `()` 调用、`return` 后写代码、搞错参数顺序、误以为参数能改变外部变量

下一节你将学习**事件**——把函数绑定到按钮上，用户点一下按钮，函数就执行一次。这是页面从"静态展示"变成"可交互应用"的第一步。
:::
