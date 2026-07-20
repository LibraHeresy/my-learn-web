# {{term:闭包}} — 函数"记住"了它的出生地

:::analogy
闭包就像一个孩子记得他家的地址——即使搬到了另一个城市，他仍然知道老房子在哪。函数被创建时，会"记住"它所在作用域的所有变量，即使离开了那个作用域，它仍然能访问那些变量。
:::

:::prerequisite
**本节你需要知道这些词：**

- **作用域**：变量在哪个花括号 {} 范围内有效
- **函数**：一段可以重复调用的代码块，有输入（参数）和输出（返回值）
- **回调函数**：作为参数传给另一个函数、在某个操作完成后被调用的函数
:::

:::explain{title="从一个神奇的现象开始"}
先看一段代码，猜猜输出什么：

```js
function createGreeting() {
  const name = '小明';
  return function() {
    console.log('你好，' + name);
  };
}

const greet = createGreeting();
greet(); // 你好，小明
```

等一下——`createGreeting()` 已经执行完了，按理说它的局部变量 `name` 应该被销毁了。但 `greet()` 调用时竟然还能访问到 `name`！

这就是**闭包**：内部函数"记住"了它被创建时所在作用域的变量，即使外部函数已经执行完毕。
:::

:::explain{title="经典示例——计数器"}
闭包最经典的演示是创建私有计数器：

```js
function createCounter() {
  let count = 0;           // 这个变量"被封闭"在内部
  return function() {
    count++;               // 每次都操作同一个 count
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

const anotherCounter = createCounter(); // 新计数器，独立的 count
console.log(anotherCounter()); // 1 —— 从头开始
```

关键点：

- `count` 不在全局作用域，外部无法直接修改——它变成了**私有变量**
- 每次调用 `createCounter()` 都会创建一个**独立的作用域**，互不影响
- 返回的函数"记住"了属于它的那个 `count`
:::

:::explain{title="为什么闭包重要？三大实际应用"}
**1. 私有变量——保护数据不被外部随意修改**

```js
function createWallet(initialAmount) {
  let balance = initialAmount;
  return {
    deposit: function(amount) { balance += amount; },
    withdraw: function(amount) { balance -= amount; },
    getBalance: function() { return balance; }
  };
}

const myWallet = createWallet(100);
myWallet.deposit(50);
console.log(myWallet.getBalance()); // 150
// myWallet.balance = 100000;  ❌ 访问不到——balance 是私有的
```

**2. 工厂函数——批量创建具有相同结构但独立状态的对象**

```js
function createStudent(name) {
  let scores = [];
  return {
    addScore: function(score) { scores.push(score); },
    getAverage: function() {
      if (scores.length === 0) return 0;
      const sum = scores.reduce(function(a, b) { return a + b; }, 0);
      return sum / scores.length;
    }
  };
}

const zhangSan = createStudent('张三');
zhangSan.addScore(85);
zhangSan.addScore(92);
console.log(zhangSan.getAverage()); // 88.5
```

**3. 事件处理器——回调中的闭包**

```js
function setupButton(btnId, initialCount) {
  const button = document.querySelector(btnId);
  let count = initialCount;
  button.addEventListener('click', function() {
    count++;
    button.textContent = '点击了 ' + count + ' 次';
  });
}

setupButton('#btn1', 0);
setupButton('#btn2', 10); // 两个按钮各自维护独立的 count
```

每次点击按钮，回调函数都在访问它"记住"的 `count` 变量——这就是闭包在事件处理中的实际运用。
:::

:::explain{title="闭包不是你刻意写的——而是自然发生的"}
很多人在不知道"闭包"这个概念时就已经在用了。只要：

- 你在一个函数内部定义了另一个函数
- 内部函数引用了外部函数的变量
- 内部函数被保存到了某个地方（返回、赋值、传给 addEventListener……）

闭包就自动形成了。它不是一种需要"创建"的语法，而是 JavaScript 作用域机制的自然结果。

```js
// 这就有闭包了：
function outer() {
  const message = 'hello';
  setTimeout(function() {
    console.log(message); // 引用外部变量 → 闭包
  }, 1000);
}
outer();
```
:::

:::hint{title="闭包与前端的未来"}
如果你以后学 React 或 Vue，会发现它们的核心机制大量依赖闭包：

- **React Hooks**（`useState`、`useEffect`）——每次渲染都通过闭包"记住"状态
- **Vue Composables**（组合式函数）——用闭包封装和复用有状态的逻辑

现在把闭包理解透，等于提前为这些框架打好了地基。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="createCounter 是理解闭包的最小示例——在函数内部用 let 声明私有变量 count，返回的内部函数'记住'了这个 count。每次点击「计数+1」按钮，页面上的数字都会增加，因为闭包让你始终操作同一个私有变量。" expected="点击「计数+1」按钮，计数器卡片上的数字从 0 开始依次递增。页面默认已有一个计数器，验证它能正常计数。"}
实现 `createCounter()` 函数，让页面上的计数器可以点击计数

打开 `script.js`，在 `createCounter()` 函数体内完成实现：
1. 用 `let count = 0` 声明私有计数变量
2. `return function() { count++; return count; }` 返回内部函数

完成后刷新页面，点击计数器卡片上的「计数+1」按钮，观察数字是否从 0 开始递增。

```js
function createCounter() {
  let count = 0;            // 私有变量，外部无法访问
  return function() {
    count++;                // 闭包"记住"了 count
    return count;
  };
}
```
::::

::::step{purpose="每次调用 createCounter() 都会创建一个全新的闭包{{term:作用域}}——就像每次都生成了一个独立的'小房间'。点击「创建新计数器」按钮会新增卡片，两张卡片的计数互不影响，这正是闭包的核心价值。" expected="两个计数器各自独立计数——卡片 A 点到 5 后，卡片 B 仍然从 0 开始计数，互不干扰。"}
创建多个独立的计数器，验证闭包的作用域隔离

点击页面底部的「+ 创建新计数器」按钮，生成全新的计数器卡片。分别点击两个计数器的按钮，你会发现：
- 每个计数器维护自己独立的数字
- 计数器 A 点到 10，完全不影响计数器 B

这就是闭包的核心价值：**每次调用 `createCounter()` 都创建一个独立的作用域**。
::::

:::

:::recap
你学会了闭包——内部函数"记住"了它被创建时所在作用域的变量。闭包让你能创建私有变量、工厂函数和有状态的工具函数。它不是你刻意"写"的语法，而是 JavaScript 作用域机制的自然结果。每次你在函数内部定义函数并引用外部变量，闭包就自动形成了。
:::
