# 回调模式 — 把函数当参数传递

:::analogy
回调就像你给餐厅留了手机号——"有位子了给我打电话"。你把"通知我"这个动作（函数）交给餐厅（另一个函数），等条件满足时餐厅调用它。这就是 JavaScript 处理异步操作最底层的模式。
:::

:::prerequisite
**本节你需要知道这些词：**

- **函数**：一段可以重复调用的代码块，有输入（参数）和输出（返回值）
- **事件**：用户在页面上做的操作——点击、输入、滚动等
- **高阶函数**：接收函数作为参数、或返回一个函数的函数——`forEach`、`addEventListener` 都是
:::

:::explain{title="先看痛点——为什么要传函数当参数？"}
假设你要对数组的每个元素做同样的事——打印、转换、过滤。不用回调，你能怎么做？

```js
const scores = [92, 85, 78, 60];                       // 成绩数组

// 不用回调的写法——你需要手动写循环，每次都要重复 for 循环结构
console.log('--- 打印所有成绩 ---');
for (let i = 0; i < scores.length; i++) {              // 又要写 for 循环
  console.log('成绩：' + scores[i]);                   // 这次是打印
}

console.log('--- 打印所有及格成绩 ---');
for (let i = 0; i < scores.length; i++) {              // 又写了一遍相同的 for 循环！
  if (scores[i] >= 60) {                               // 这次加了过滤条件
    console.log('及格：' + scores[i]);
  }
}

console.log('--- 把成绩换算成百分制再打印 ---');
for (let i = 0; i < scores.length; i++) {              // 第三遍完全相同的循环结构！
  const percent = (scores[i] / 100) * 100;             // 这次是转换
  console.log('百分制：' + percent);
}
// 三遍 for 循环，结构一模一样，只有中间的操作不同
// 你能看出这是"同一个模式"吗？——"遍历数组，对每个元素做某件事"
```

问题很明确：**"对每个元素做某件事"是一个通用模式，但"某件事"每次都不一样**。有没有办法把"某件事"作为参数传进去，复用遍历逻辑？有——**回调函数**。
:::

:::explain{title="回调的本质 — 把"要做的事"当参数传入"}
回调（Callback）就是**一个函数，被当作参数传给另一个函数，在合适的时机由后者调用**。JS 里函数是"一等公民"——可以像数字、字符串一样传来传去。

```js
// 第一步：定义"要做的事"——只是一个普通函数
function printScore(score) {                           // 这个函数负责"打印成绩"
  console.log('成绩：' + score);
}

// 第二步：把"要做的事"传给 forEach——就像"请用这个方法处理每个元素"
const scores = [92, 85, 78, 60];
scores.forEach(printScore);                            // 传函数名，不加括号！
// 输出：
// 成绩：92
// 成绩：85
// 成绩：78
// 成绩：60

// 第三步：换一件事——传一个不同的函数就行，不用重写 for 循环
function printPassed(score) {                          // 新的"要做的事"
  if (score >= 60) {
    console.log('及格：' + score);
  }
}
scores.forEach(printPassed);                           // 同样的 forEach，不同的行为！
```

**核心思维转变**：以前你写循环——你控制"怎么遍历"和"遍历时做什么"。现在你把"遍历时做什么"写成一个函数，交给 `forEach` 去执行。**你只关心做什么，不关心怎么遍历。**
:::

:::explain{title="同步回调 — 立刻执行，不等任何人"}
`forEach`、`map`、`filter`、`sort` 这些数组方法接收的都是**同步回调**——回调在当前代码执行过程中被立刻调用，不会延迟。

```js
const products = [                                     // 商品列表——你在电商项目中经常见到
  { name: '笔记本电脑', price: 5999 },
  { name: '机械键盘', price: 399 },
  { name: '鼠标', price: 149 }
];

// forEach — 对每个元素执行回调，没有返回值
products.forEach(function(item) {                      // item 是当前遍历到的商品
  console.log(item.name + '：¥' + item.price);         // 打印每个商品的名字和价格
});

// map — 回调的返回值组成新数组（一对一映射）
const names = products.map(function(item) {            // 每次返回一个 name
  return item.name;                                    // 返回的值会成为新数组的元素
});
console.log(names);                                    // ['笔记本电脑', '机械键盘', '鼠标']

// filter — 回调返回 true 的元素保留（筛选）
const cheap = products.filter(function(item) {         // 每次返回 true/false
  return item.price < 500;                             // true 就保留，false 就丢弃
});
console.log(cheap);                                     // [{ name: '机械键盘', price: 399 }, { name: '鼠标', price: 149 }]

// sort — 回调定义排序规则（返回负数：a 在前，正数：b 在前）
const sorted = products.sort(function(a, b) {          // a 和 b 是相邻的两个元素
  return a.price - b.price;                            // 按价格升序排列
});
```

**实际工作场景**：后端返回一个订单列表——你用 `map` 提取订单号，`filter` 筛出未付款的，`sort` 按时间排序，全是用回调完成的。这些数组方法是你每天都会用的工具箱。
:::

:::explain{title="异步回调 — 等事情发生了再执行"}
**异步回调**是你把函数传过去，但它不会立刻执行，而是等某个事件发生时才被调用。这才是回调最强大的用途。

```js
// 1. 事件监听 — 等用户操作
const button = document.querySelector('#submitBtn');
button.addEventListener('click', function(event) {     // 点击发生时才调用这个回调
  console.log('按钮被点击了！');
  console.log('点击坐标：', event.clientX, event.clientY); // event 参数包含事件信息
});

// 2. 定时器 — 等时间到了
console.log('定时器设置了');                            // 这行先输出
setTimeout(function() {                                // 把这个回调交给定时器
  console.log('2 秒后我才出现');                       // 这行 2 秒后才输出
}, 2000);
console.log('定时器下面的代码');                        // 这行紧接着"定时器设置了"输出

// 执行顺序：
// "定时器设置了"
// "定时器下面的代码"
// （等 2 秒）
// "2 秒后我才出现"
// 注意："定时器下面的代码"比"2 秒后我才出现"更早输出！
// 这就是异步——setTimeout 不会阻塞后面的代码
```

**同步 vs 异步的核心区别**：
- 同步回调：`forEach` 里的回调——`forEach` 不执行完，下一行代码不会运行
- 异步回调：`setTimeout` 里的回调——`setTimeout` 注册完回调就立刻返回，真正执行是未来的事

这就是为什么你点击按钮时 JS 能响应——事件监听的回调是异步的，主线程不用傻等用户点击。
:::

:::explain{title="命名函数 vs 匿名函数 — 什么时候该提取？"}
```js
// 匿名函数：直接在参数位置写——如果只在一个地方用，可以
button1.addEventListener('click', function() {         // 匿名函数，写完即弃
  console.log('按钮被点击了！');
});

// ❌ 问题：同一个逻辑要在两个按钮上用——匿名函数写了两遍
button1.addEventListener('click', function() {
  console.log('按钮被点击了！');                       // 和下面一模一样的代码
});
button2.addEventListener('click', function() {
  console.log('按钮被点击了！');                       // 重复！改逻辑要改两处
});

// ✅ 解决：提取成命名函数——逻辑只有一份，改一处就全局生效
function handleClick(event) {                          // 命名函数，见名知义
  console.log('按钮被点击了！');
  console.log('被点击的元素：', event.currentTarget);  // 如果要加新逻辑，只改这一处
}
button1.addEventListener('click', handleClick);        // 传函数名，不加括号！
button2.addEventListener('click', handleClick);        // 同一个函数，第二个按钮也用
// 注意：传的是 handleClick，不是 handleClick() —— 加括号表示"立刻调用并传返回值"
```

**提取时机**：一个回调在三处以上使用、逻辑超过 5 行、需要单独测试——提取成命名函数。否则匿名函数足够。
:::

:::explain{title="回调地狱 — 为什么需要 Promise（预览）"}
当多个异步操作需要按顺序执行时，回调就会层层嵌套：

```js
// 需求：获取用户 → 获取用户的订单 → 获取第一个订单的详情 → 发送邮件
// 每一步都依赖上一步的结果，必须按顺序执行

getUserInfo(userId, function(user) {                   // 第一步：获取用户——回调1
  console.log('用户：', user.name);
  getOrderList(user.id, function(orders) {             // 第二步：获取订单——回调2（嵌套在回调1里）
    console.log('订单数：', orders.length);
    getOrderDetail(orders[0].id, function(detail) {    // 第三步：获取详情——回调3（嵌套在回调2里）
      console.log('第一个订单详情：', detail);
      sendEmail(user.email, detail, function() {       // 第四步：发邮件——回调4（嵌套在回调3里）
        console.log('邮件已发送！');
        // 还想加第五步？再缩进一层……
      }, function(err) {                               // 每一步还要处理错误
        console.log('邮件发送失败');
      });
    }, function(err) {
      console.log('获取订单详情失败');
    });
  }, function(err) {
    console.log('获取订单列表失败');
  });
}, function(err) {
  console.log('获取用户失败');
});
```

这种层层嵌套的结构就是**回调地狱（Callback Hell）**——也叫"末日金字塔"。问题：可读性差、错误处理散落各处、想调换步骤顺序等于重写。

**好消息**：后面你会学到 `Promise` 和 `async/await`，把上面这段变成扁平的、像同步代码一样的结构。但理解回调是理解它们的前提——`Promise` 本质上就是"包装了回调"。
:::

:::explain{title="常见错误"}
**错误1：传的是函数调用而不是函数本身**
```js
function handleClick() {
  console.log('点击了！');
}

// ❌ 错误：加了括号——handleClick() 会立刻调用，返回值（undefined）被传给 addEventListener
button.addEventListener('click', handleClick());       // 页面加载时就执行了，点击没反应

// ✅ 正确：传函数引用，不加括号——"等点击时再调用这个函数"
button.addEventListener('click', handleClick);
```

**错误2：以为异步回调会"等"**
```js
let result;
setTimeout(function() {
  result = '异步结果';                                 // 2 秒后才赋值
}, 2000);
console.log(result);                                   // undefined —— 还没等到赋值就已经输出了

// ✅ 正确：所有依赖异步结果的代码都必须在回调里面
setTimeout(function() {
  result = '异步结果';
  console.log(result);                                 // "异步结果"——在回调里才能拿到值
}, 2000);
```

**错误3：在 forEach 里用 return 想跳出循环**
```js
const nums = [1, 2, 3, 4, 5];
// ❌ 错误：forEach 里的 return 只会结束当前回调，不会跳出循环
nums.forEach(function(n) {
  if (n === 3) return;                                 // 以为能跳出？——只是结束当前回调，继续下一个
  console.log(n);                                      // 照样输出 4 和 5
});

// ✅ 正确：forEach 无法中途跳出——用 for...of 或 some/every
for (const n of nums) {
  if (n === 3) break;                                  // break 真正跳出循环
  console.log(n);                                      // 1, 2 —— 到 3 就停了
}
```
:::

:::task{title="动手试试"}
本练习无需 starter 项目，在浏览器的控制台（F12 → Console）中逐段运行即可。

::::step{purpose="forEach 是同步回调最典型的例子——你传给它的函数会被立刻、按顺序执行。理解它就是在理解回调的核心模式：把逻辑作为参数传递。" expected="控制台输出 4 个任务名称，每个前面有序号。你体会到 forEach 接收一个函数作为参数的模式。"}
用 `forEach` 遍历任务数组，打印每个任务
```js
const tasks = ['写 HTML 结构', '写 CSS 样式', '写 JS 交互', '测试页面'];
// 在这里写你的 forEach 回调——用匿名函数或命名函数都行
// 输出格式：第1步：写 HTML 结构
```
::::

::::step{purpose="setTimeout 让你体验异步回调的核心特征——代码不是'立刻执行'，而是'等一段时间再执行'。控制台输出的先后顺序会清楚地展示同步和异步的区别。" expected="控制台先输出'开始'，再输出'结束'，2 秒后才输出'我在 2 秒后执行'。"}
用 `setTimeout` 延迟执行一段代码，观察同步和异步的执行顺序
```js
console.log('开始');
// 在这里写一个 2 秒延迟的 setTimeout，回调里输出"我在 2 秒后执行"
console.log('结束');
// 运行后观察输出顺序——哪个最先？哪个最后？这说明了什么？
```
::::

::::step{purpose="从匿名函数到命名函数是代码质量的跃升——就像把乱堆的杂物装进贴了标签的收纳盒。命名函数让回调逻辑可以被复用、测试和独立理解。" expected="两个按钮点击后都能正常执行，但事件处理逻辑只定义了一次。"}
把事件处理逻辑从匿名函数提取成命名函数，复用到多个按钮
```js
// 假设 HTML 中有 <button id="likeBtn">点赞</button> 和 <button id="shareBtn">分享</button>
const likeBtn = document.querySelector('#likeBtn');
const shareBtn = document.querySelector('#shareBtn');
// 第一步：定义命名函数 handleInteraction(e)，用 e.currentTarget.textContent 获取按钮文字
// 第二步：用 addEventListener 分别绑定到两个按钮——确保传的是函数名，不是 handleInteraction()
```
::::

:::

:::recap
你学会了回调——把函数当作参数传给另一个函数。同步回调（`forEach`、`map`、`filter`）立刻执行，异步回调（`addEventListener`、`setTimeout`）等到事件发生才执行。关键细节：传回调时只传函数名不传括号（`handleClick` 不是 `handleClick()`）。回调地狱是层层嵌套的异步回调，但你不用害怕——下一阶段的 Promise 和 async/await 就是为解决这个问题而生的。理解"传函数当参数"的思维模式，是通向所有异步知识的第一道门。
:::
