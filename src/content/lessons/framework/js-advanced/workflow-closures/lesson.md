# 闭包 — 函数"记住"了它的出生地

:::analogy
闭包就像一个孩子记得他家的地址——即使搬到另一个城市，他仍然知道老房子在哪。在 JS 里，一个函数被创建时，会"记住"它所在作用域的所有变量。即使离开了那个作用域，它仍然能访问那些变量——就像你离开了家，但仍然记得家门钥匙放在哪。
:::

:::prerequisite
**本节你需要知道这些词：**

- **作用域**：变量在哪个 `{}` 范围内有效——函数外部无法访问函数内部的 `let`/`const` 变量
- **函数**：一段可以重复调用的代码块，有输入（参数）和输出（返回值）
- **回调函数**：作为参数传给另一个函数、在某个操作完成后被调用的函数
:::

:::explain{title="先看痛点——为什么函数执行完了还能'记住'变量？"}
先看一段"违反直觉"的代码。正常来说，函数执行完，它的局部变量就应该被销毁了——但看看这个：

```js
function createGreeting() {                            // 普通函数，执行完就该销毁所有变量
  const name = '小明';                                 // 局部变量——按理说函数执行完它就不存在了
  return function() {                                  // 但这里返回了一个内部函数
    console.log('你好，' + name);                     // 内部函数引用了外部的 name！
  };                                                   // createGreeting 执行完返回这个函数
}

const greet = createGreeting();                        // createGreeting() 执行完毕——按理说 name 已销毁
greet();                                               // 但调用返回的函数，竟然还能输出 "你好，小明"！
// 输出：你好，小明
// 等一下——createGreeting 不是已经执行完了吗？name 不早就应该被销毁了吗？
```

这就是**闭包**：内部函数返回后，它"记住"了被创建时所在作用域的变量。即使外部函数执行完毕了，只要内部函数还存在，那些被引用的变量就**不会被销毁**。这不是 bug——这是 JS 设计上的特性，也是最强大的特性之一。
:::

:::explain{title="经典示例：计数器 — 闭包最直观的用法"}
想做一个计数器，但要保护计数变量不被外部直接修改——不能暴露 `count`，但又要提供操作 `count` 的方法：

```js
function createCounter() {                             // 闭包工厂——调用一次就创建一个独立计数器
  let count = 0;                                       // 私有变量！外部无法直接访问或修改

  return function() {                                  // 返回的内部函数"记住"了 count
    count++;                                           // 每次调用都操作同一个 count（不是新建）
    return count;                                      // 返回当前值
  };                                                   // 这就是闭包——内部函数 + 它记住的外部变量
}

// 使用——count 被完全保护起来，只能通过返回的函数来操作
const counter = createCounter();                       // 创建一个新计数器
console.log(counter());                                // 1 —— 第一次调用
console.log(counter());                                // 2 —— 同一个 count 继续加
console.log(counter());                                // 3 —— 一直累加
// 关键：你无法直接写 counter.count = 999 来篡改数据——count 不存在于外面

// 每次调用 createCounter() 都创建一个全新的、独立的作用域
const anotherCounter = createCounter();                // 创建第二个计数器
console.log(anotherCounter());                         // 1 —— 从头开始！有自己的独立 count
console.log(counter());                                // 4 —— 原来的计数器不受影响
// 两个计数器各自维护自己的 count，互不干扰——就像两个独立运行的秒表
```

**闭包的两个关键能力**：
1. **私有变量**：`count` 不暴露在全局，只能通过返回的函数来操作——天然的数据封装
2. **作用域隔离**：每次调用 `createCounter()` 都创建一个独立的作用域——互不干扰
:::

:::predict{title="预测输出：两个计数器会互相影响吗？" answer="输出：A 是 1，B 是 1，A 再点变成 2。解析：每次调用 createCounter() 都会创建一个全新的闭包作用域——countA 和 countB 是两个独立的私有变量，互不干扰。"}
看代码预测输出，再点开答案验证：

```js
const counterA = createCounter()
const counterB = createCounter()
console.log(counterA())   // 输出 ？
console.log(counterB())   // 输出 ？
console.log(counterA())   // 输出 ？
```
:::

:::diagram{title="闭包的结构：返回的函数带着它出生时的变量环境一起走"}
<svg viewBox="0 0 440 220" xmlns="http://www.w3.org/2000/svg" role="img">
  <rect x="30" y="30" width="180" height="150" rx="10" fill="#fdf6e3" stroke="#8B2E2E" stroke-width="2"/>
  <text x="120" y="56" font-size="13" fill="#8B2E2E" text-anchor="middle" font-weight="bold">createCounter() 的作用域</text>
  <rect x="52" y="72" width="136" height="34" rx="6" fill="#ffffff" stroke="#6B5A4E"/>
  <text x="120" y="94" font-size="12" fill="#333" text-anchor="middle">let count = 0（私有）</text>
  <rect x="52" y="118" width="136" height="46" rx="6" fill="#f7edd8" stroke="#c9a96e"/>
  <text x="120" y="136" font-size="12" fill="#8B2E2E" text-anchor="middle">return function() {</text>
  <text x="120" y="153" font-size="12" fill="#8B2E2E" text-anchor="middle">count++ }</text>
  <rect x="270" y="80" width="140" height="56" rx="10" fill="#ffffff" stroke="#c9a96e" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="340" y="102" font-size="12" fill="#333" text-anchor="middle">counter（外部变量）</text>
  <text x="340" y="122" font-size="11" fill="#6B5A4E" text-anchor="middle">调用它 → 操作同一个 count</text>
  <path d="M188 141 C 230 141 230 108 266 108" fill="none" stroke="#c9a96e" stroke-width="2" marker-end="url(#ca)"/>
  <text x="230" y="130" font-size="11" fill="#8B2E2E">返回的函数"记住"了 count</text>
  <defs>
    <marker id="ca" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#c9a96e"/>
    </marker>
  </defs>
</svg>
:::

:::explain{title="闭包的三大实际应用"}
闭包不是抽象概念——你每天都在用，只是没注意到。

**1. 私有变量——保护数据不被外部随意修改**

浏览器里做不了真正的"私有属性"（除非用最新的 `#privateField`），但闭包能：
```js
function createWallet(initialAmount) {                 // 创建钱包——闭包工厂
  let balance = initialAmount;                         // 余额——私有变量，外面摸不到

  return {                                             // 返回三个公开方法
    deposit: function(amount) {                        // 存钱
      if (amount <= 0) return;                         // 校验——不能存负数
      balance += amount;                               // 操作私有的 balance
    },
    withdraw: function(amount) {                       // 取钱
      if (amount > balance) return;                    // 校验——不能透支
      balance -= amount;                               // 操作私有的 balance
    },
    getBalance: function() {                           // 查余额——唯一能看 balance 的方式
      return balance;
    }
  };
}

const wallet = createWallet(100);                      // 创建钱包，初始 100 元
wallet.deposit(50);                                    // 存 50
console.log(wallet.getBalance());                      // 150 —— 查余额正常
console.log(wallet.balance);                           // undefined —— balance 根本不在对象上！
// wallet.balance = 100000;                            // 这一行写不进——不受影响
```

**2. 工厂函数——批量创建具有独立状态的对象**

```js
function createStudent(name) {                         // 学生工厂——闭包
  let scores = [];                                     // 成绩数组——私有的，每个学生有自己的

  return {
    addScore: function(score) {                        // 添加成绩
      scores.push(score);
    },
    getAverage: function() {                           // 计算平均分
      if (scores.length === 0) return 0;               // 没成绩则返回 0
      let sum = 0;
      for (let i = 0; i < scores.length; i++) {        // 手动求和
        sum += scores[i];
      }
      return sum / scores.length;                      // 平均值
    },
    getName: function() {                              // 获取名字
      return name;                                     // name 也是闭包变量
    }
  };
}

const zs = createStudent('张三');                      // 创建学生张三
zs.addScore(85);
zs.addScore(92);
console.log(zs.getName() + ' 平均分：' + zs.getAverage()); // "张三 平均分：88.5"

const ls = createStudent('李四');                      // 创建学生李四——独立的 scores
ls.addScore(75);
console.log(ls.getName() + ' 平均分：' + ls.getAverage()); // "李四 平均分：75"
// zs 和 ls 各自有独立的 scores——互不影响
```

**3. 事件处理器——每个处理器维护自己的状态**

```js
function setupClickCounter(btnId, startFrom) {         // 给按钮装上计数器——闭包
  const button = document.querySelector(btnId);        // 获取按钮元素
  let count = startFrom;                               // 私有计数——闭包变量

  button.addEventListener('click', function() {        // 点击时触发——这个回调是闭包
    count++;                                           // 操作闭包里的 count
    button.textContent = '点击了 ' + count + ' 次';    // 更新按钮文字
  });
}

// 每个按钮有自己独立的计数——互不影响
setupClickCounter('#btn1', 0);                         // 按钮1，从0开始
setupClickCounter('#btn2', 10);                        // 按钮2，从10开始
// 点击 btn1 3次：btn1 显示"3次"，btn2 仍然是"10"（没被点过）
// 点击 btn2 1次：btn2 显示"11次"
```
:::

:::explain{title="闭包不是你刻意写的——而是自然发生的"}
你很可能已经在不知道"闭包"这个名字的情况下用了它。只要满足三个条件，闭包就自动形成了：

1. 你在一个函数内部定义了另一个函数
2. 内部函数引用了外部函数的变量
3. 内部函数被保存到了某个地方（返回、赋值、传给 `addEventListener`、传给 `setTimeout`……）

```js
// 这就有闭包了——你可能写过但没意识到
function setupDelayedMessage() {
  const msg = '这条消息会在 1 秒后显示';               // 外部变量
  setTimeout(function() {                              // 内部函数被传给 setTimeout
    console.log(msg);                                  // 引用外部变量 → 闭包自动形成
  }, 1000);
}
setupDelayedMessage();
// setTimeout 的回调在 1 秒后才执行——但 setupDelayedMessage 早执行完了
// msg 还能被访问到，就是因为闭包把它"记住"了
```

**实际工作场景**：React 的 `useState`、`useEffect` 等 Hooks 本质上都是闭包——每次组件渲染，Hooks 通过闭包"记住"上一次的状态。Vue 的 `composable` 函数也用闭包来封装响应式状态。
:::

:::explain{title="常见错误"}
**错误1：在循环中用 var 创建闭包——经典面试题**
```js
// ❌ 错误：var 没有块级作用域，所有回调引用的是同一个 i
for (var i = 1; i <= 3; i++) {                         // var 声明的 i 是整个函数范围的同一个变量
  setTimeout(function() {                              // 闭包"记住"的是变量 i 的引用
    console.log(i);                                    // 等 setTimeout 执行时，i 已经是 4 了
  }, i * 1000);
}
// 输出：4, 4, 4 —— 不是你期望的 1, 2, 3！

// ✅ 修复方案1：用 let（推荐）——let 每次循环创建独立作用域
for (let i = 1; i <= 3; i++) {                         // let 每次迭代创建新的绑定
  setTimeout(function() {
    console.log(i);                                    // 每个回调记住自己那次迭代的 i
  }, i * 1000);
}
// 输出：1, 2, 3 —— 正确！

// ✅ 修复方案2：用闭包手动创建独立作用域（let 出现之前的写法）
for (var i = 1; i <= 3; i++) {
  (function(j) {                                       // 立即执行函数——把当前 i 的值复制给 j
    setTimeout(function() {
      console.log(j);                                  // 每个回调引用自己的 j
    }, j * 1000);
  })(i);                                               // 把 i 的值传进去
}
```

**错误2：以为每次调用工厂函数会共享变量**
```js
function createCounter() {
  let count = 0;
  return function() { count++; return count; };
}
const c1 = createCounter();
const c2 = createCounter();
c1(); c1();                                            // c1 的 count 是 2
console.log(c2());                                     // 1 —— c2 是独立的！不是 3
// 每次调用 createCounter() 都创建一个新的作用域，互不影响
```

**错误3：忘记声明变量，导致闭包引用全局变量**
```js
// ❌ 错误：内部函数里直接写 count = 0 没加 let——count 变成全局变量！
function createCounter() {
  let count = 0;                                       // ✅ 必须有 let/const/var
  return function() { return ++count; };
}
```
:::

:::task{title="动手试试 — 在 script.js 中实现 createCounter"}
本练习在 **script.js** 中完成。打开 `index.html`（用 Live Server 或直接拖入浏览器），你会看到一个计数器卡片。

::::step{purpose="createCounter 是理解闭包的最小示例——在函数内部用 let 声明私有变量 count，返回的内部函数'记住'了这个 count。每次点击「计数+1」按钮，页面上的数字都会增加，因为闭包让你始终操作同一个私有变量。" expected="点击「计数+1」按钮，计数器卡片上的数字从 0 开始依次递增。页面默认已有第一个计数器，验证它能正常计数。"}
打开 **script.js**，在 `createCounter()` 函数体内完成实现：
1. 用 `let count = 0` 声明私有计数变量
2. `return function() { count++; return count; }` 返回内部函数（闭包）
完成后刷新页面，点击「计数+1」按钮，观察数字是否从 0 开始递增。
::::

::::step{purpose="每次调用 createCounter() 都会创建一个全新的闭包作用域——就像每次都生成了一个独立的'小房间'。点击「创建新计数器」按钮会新增卡片，两张卡片的计数互不影响，这正是闭包的核心价值。" expected="两个计数器各自独立计数——卡片 A 点到 5 后，卡片 B 仍然从 0 开始计数，互不干扰。"}
验证作用域隔离：点击页面底部的「+ 创建新计数器」按钮，生成全新的计数器卡片。分别点击两个计数器的按钮：
- 计数器 A 点到 10 后，切到计数器 B——B 的数字是 0，不受 A 影响
- 这说明每次调用 `createCounter()` 都创建了一个**独立的作用域**
::::

:::

:::hint{title="闭包与前端的未来"}
如果你以后学 React 或 Vue，会发现它们的核心机制大量依赖闭包：
- React Hooks（`useState`、`useEffect`）——每次渲染通过闭包"记住"状态
- Vue Composables（组合式函数）——用闭包封装和复用有状态的逻辑
现在把闭包理解透，等于提前为这些框架打好了地基。
:::

:::recap
你学会了闭包——内部函数"记住"了它被创建时所在作用域的变量。闭包让你能创建**私有变量**（`balance` 对外部隐藏）、**工厂函数**（批量生成独立状态的对象）、**有状态的事件处理器**（每个按钮维护自己的计数）。闭包不是你刻意"写"的语法——只要内部函数引用了外部变量并被保存到某处，闭包就自动形成了。这个能力是 JavaScript 作用域机制的自然结果，也是 React/Vue 等框架的核心底层机制。
:::
