# 回调模式 — 把函数当参数传递

:::analogy
回调就像你给朋友留了你的电话号码——"做好了给我打电话"。你把一个函数（电话号码）传给另一个函数（朋友），等对方完成后执行。这就是 JavaScript 处理异步操作的基础模式。
:::

:::explain{title="回调是什么？"}
回调（Callback）就是一个**被当作参数传给另一个函数的函数**。听起来绕，但其实就是：

```js
// greet 是一个普通函数
function greet(name) {
  console.log('你好，' + name);
}

// sayHello 接收一个函数作为参数，并在内部调用它
function sayHello(callback) {
  callback('小明');
}

// 把 greet 当作参数传进去——greet 就是一个回调函数
sayHello(greet);  // 输出：你好，小明
```

关键认知：**函数在 JavaScript 里是"一等公民"**——它可以像数字、字符串一样被传递。你把一段逻辑（函数）交给另一段逻辑，说"等你准备好了就执行它"。
:::

:::explain{title="你早就在用回调了——同步回调"}
`forEach`、`map`、`filter` 这些数组方法你已经在用，它们接收的都是回调函数：

```js
const products = [
  { name: '笔记本电脑', price: 5999 },
  { name: '机械键盘', price: 399 },
  { name: '鼠标', price: 149 }
];

// forEach — 对每个元素执行回调
products.forEach(function(item) {
  console.log(item.name + '：¥' + item.price);
});

// map — 回调的返回值组成新数组
const names = products.map(function(item) {
  return item.name;
});
console.log(names); // ['笔记本电脑', '机械键盘', '鼠标']

// filter — 回调返回 true 的元素保留
const cheap = products.filter(function(item) {
  return item.price < 500;
});
console.log(cheap); // [{ name: '机械键盘', ... }, { name: '鼠标', ... }]
```

这些都是**同步回调**——回调在当前代码执行过程中被立即调用，不会等待。
:::

:::explain{title="异步回调——等事情发生了再执行"}
更有用的是**异步回调**：你把函数传过去，但它不会立刻执行，而是等某个事件发生时才被调用。

```js
// 1. 事件监听——等用户点击了才执行
const button = document.querySelector('#submitBtn');
button.addEventListener('click', function() {
  console.log('按钮被点击了！');
});

// 2. 定时器——等时间到了才执行
setTimeout(function() {
  console.log('2 秒后我才出现');
}, 2000);

// 3. 定时重复——每隔一段时间执行一次
let count = 0;
const timer = setInterval(function() {
  count++;
  console.log('第 ' + count + ' 次执行');
  if (count >= 5) {
    clearInterval(timer); // 停止定时器
  }
}, 1000);
```

这就是回调和同步代码最大的区别：**同步是"立刻做"，异步是"到时候再做"**。
:::

:::explain{title="提取匿名函数——让回调可复用"}
上面的例子用的都是匿名函数（直接在参数位置写的 function），但如果同一个逻辑要在多处使用，就应该提取成命名函数：

```js
// ❌ 每次都写一遍匿名函数——重复且不好维护
button1.addEventListener('click', function() {
  console.log('按钮被点击了！');
});
button2.addEventListener('click', function() {
  console.log('按钮被点击了！');
});

// ✅ 提取成命名函数——一次定义，多处使用
function handleClick() {
  console.log('按钮被点击了！');
}
button1.addEventListener('click', handleClick);
button2.addEventListener('click', handleClick);
```

注意：传的是 `handleClick`，不是 `handleClick()`。加了括号就变成"立刻调用并把返回值传进去"了。
:::

:::explain{title="回调地狱——嵌套太多会怎样？"}
当异步操作需要按顺序执行时，就要把下一个操作写在上一个的回调里。层层嵌套后，代码会变成这样：

```js
// 模拟：获取用户 → 获取订单 → 获取订单详情 → 发送邮件
getUser(userId, function(user) {
  getOrders(user.id, function(orders) {
    getOrderDetail(orders[0].id, function(detail) {
      sendEmail(user.email, detail, function() {
        console.log('全部完成！');
        // 还想加一步？再往右缩进一层……
      });
    });
  });
});
```

这种层层嵌套的结构被称为**"回调地狱"（Callback Hell）**，也叫"末日金字塔"。它的问题：

- **可读性差**：代码向右越缩越深，就像金字塔倒过来
- **错误处理难**：每一层都可能出错，处理逻辑散落各处
- **维护困难**：想调整步骤顺序？几乎等于重写

这就是为什么后面你会学到 **Promise** 和 **async/await**——它们用扁平的结构解决嵌套问题。但理解回调是理解它们的前提。
:::

:::hint{title="给你一颗定心丸"}
看到"回调地狱"不用害怕。你现在遇到的最多嵌套一两次，在实际入门项目中完全可控。Promise 是回调的进化版，不是替代品——理解回调的"传函数当参数"思维，Promise 学起来会丝滑很多。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="forEach 是同步回调最典型的例子——你传给它的函数会被立刻、按顺序执行。理解它就是在理解回调的核心模式：把逻辑作为参数传递。" expected="控制台输出 4 个任务名称，每个前面有序号。你体会到了 forEach 接收一个函数作为参数的模式。"}
用 forEach 遍历任务数组，打印每个任务

```js
const tasks = ['写 HTML 结构', '写 CSS 样式', '写 JS 交互', '测试页面'];
// 在这里写你的 forEach 回调
```
::::

::::step{purpose="setTimeout 让你体验异步回调的核心特征——代码不是'立刻执行'，而是'等一段时间再执行'。控制台输出的先后顺序会清楚地展示同步和异步的区别。" expected="控制台先输出'开始'，再输出'结束'，2 秒后才输出'我在 2 秒后执行'。"}
用 setTimeout 延迟执行一段代码，观察同步和异步的执行顺序

```js
console.log('开始');
// 在这里写一个 2 秒延迟的 setTimeout
console.log('结束');
```
::::

::::step{purpose="从匿名函数到命名函数是代码质量的跃升——就像把乱堆的杂物装进贴了标签的收纳盒。命名函数让回调逻辑可以被复用、测试和独立理解。" expected="两个按钮点击后都能正常执行，但事件处理逻辑只定义了一次。"}
把事件处理逻辑从匿名函数提取成命名函数

```js
const likeBtn = document.querySelector('#likeBtn');
const shareBtn = document.querySelector('#shareBtn');
// 定义 handleInteraction 函数，接收事件对象 e，打印被点击按钮的文字
// 用 addEventListener 分别绑定到两个按钮
```
::::

:::

:::recap
你学会了回调——把函数当作参数传给另一个函数。同步回调（forEach、map、filter）立即执行，异步回调（addEventListener、setTimeout）等待事件发生才执行。把匿名回调提取成命名函数能提高代码的复用性。回调地狱是层层嵌套的回调，但不用害怕——后面你会学到 Promise 来解决它。
:::
