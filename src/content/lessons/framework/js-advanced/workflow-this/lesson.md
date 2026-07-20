# this 关键字 — 谁在调用我？

:::analogy
`this` 就像"我"这个词——张三说"我"指的是张三，李四说"我"指的是李四。同一个词，谁说的就指向谁。在代码中，`this` 的值取决于**谁在调用这个函数**——而不是函数定义在哪里。
:::

:::prerequisite
**本节你需要知道这些词：**

- **函数**：一段可以重复调用的代码块
- **对象**：键值对的集合，用 `{}` 表示，对象的方法可以访问 `this`
- **事件**：用户操作——点击、输入、滚动等
- **箭头函数**：ES6 的 `() => {}` 写法，没有自己的 `this`（关键区别）
:::

:::explain{title="先看痛点——this 为什么让人头疼？"}
同一个函数，不同调用方式，`this` 的值完全不同。来看一个实际项目中的 bug：

```js
// 想象你在做一个"点赞"功能，用对象封装了点赞逻辑
const likeController = {
  likeCount: 0,                                        // 点赞数——初始为 0
  message: '点赞成功',                                 // 操作成功时的提示消息

  handleClick: function() {                            // 点击处理函数
    this.likeCount++;                                  // 期望：this 指向 likeController
    console.log(this.message);                         // 期望输出 "点赞成功"
  }
};

// 把方法绑定到按钮上——看起来很合理对吧？
const likeBtn = document.querySelector('#likeBtn');
likeBtn.addEventListener('click', likeController.handleClick);

// 用户点击按钮后：
// this.likeCount++  → 报错或无效！this 不再指向 likeController，而是指向了按钮元素！
// this.message      → undefined！因为按钮元素没有 message 属性

// 这个 bug 的根本原因：addEventListener 把 this 从 likeController "偷"走了
// 实际工作中，这个 bug 表现为：点击按钮无反应、数据没更新、控制台报 undefined
```

这就是 `this` 的核心问题——**`this` 的值不是在函数定义时决定的，而是在函数调用时决定的**。每次看到 `this`，你只需要问一个问题："**这行代码是谁在调用这个函数？**"

下面用四条规则来回答这个问题。
:::

:::explain{title="规则1：方法调用 — obj.fn() → this = obj"}
当函数作为对象的**方法**被调用时，`this` 指向**点号前面的那个对象**。这是最符合直觉的一条。

```js
const user = {
  name: '小明',
  greet: function() {                                  // 普通函数——有自己独立的 this
    console.log('你好，我是' + this.name);            // this 指向 user
  }
};

user.greet();                                          // "你好，我是小明"
// 问：谁在调用 greet？→ user → this = user
// 所以 this.name 就是 user.name = "小明"

// 方法中修改 this 的属性——常见的 setter 模式
const counter = {
  value: 0,
  increment: function() {
    this.value++;                                      // this = counter → counter.value 增加了
  },
  getValue: function() {
    return this.value;                                 // this = counter → 返回当前计数
  }
};
counter.increment();
counter.increment();
console.log(counter.getValue());                       // 2
```
:::

:::explain{title="规则2：独立调用 — fn() → this = window（或 undefined）"}
当函数不作为对象的方法被调用时（即没有点号），`this` 在非严格模式下是 `window`，在严格模式（`'use strict'`）下是 `undefined`。

```js
// 普通函数独立调用
function showThis() {
  console.log(this);                                   // window（浏览器中）
}
showThis();                                            // 独立调用——没有点号，this = window

// 更坑人的场景：把方法赋值给变量后再调用——this 丢失！
const user = {
  name: '小李',
  sayName: function() {
    console.log(this.name);                           // 期望输出 "小李"
  }
};

const fn = user.sayName;                               // 把方法赋值给独立变量
fn();                                                  // undefined —— this = window，window.name 不存在
// 问：谁在调用 fn？→ 没有点号 → 独立调用 → this = window
// 关键区分：user.sayName() vs fn()
// user.sayName() → this = user（方法调用）
// fn() → this = window（独立调用）——虽然 fn 和 user.sayName 是同一个函数！
```

**这就是为什么"把方法传给 addEventListener"会出 bug**——`addEventListener` 接收了方法引用后，事件触发时它是以独立调用的方式执行的（实际上 this 被设为 DOM 元素，见规则3）。
:::

:::explain{title="规则3：事件处理器 — addEventListener 回调中 this = 触发事件的 DOM 元素"}
在 `addEventListener` 的回调（普通函数）中，`this` 指向**触发事件的那个 DOM 元素**。

```js
const button = document.querySelector('#myBtn');
button.addEventListener('click', function() {          // 普通函数——this 由浏览器设置
  console.log(this);                                   // <button id="myBtn">点击我</button>
  console.log(this.textContent);                       // "点击我"——可以直接用 this 拿元素内容
  this.style.background = 'red';                       // 直接修改被点击的元素样式
});

// 这很方便——事件处理函数里可以直接用 this 拿到被点击的元素
// 但这也造成了前面 likeController 的 bug：
// 当你传 likeController.handleClick 给 addEventListener 时，
// 浏览器点击时会把 this 设为按钮元素，而不是 likeController！
```
:::

:::explain{title="规则4：箭头函数 — 没有自己的 this，从外层继承"}
箭头函数 `() => {}` **不会创建自己的 `this`**，而是从它所在的**外层作用域**继承 `this`。理解这一点是理解箭头函数和普通函数区别的关键。

```js
const user = {
  name: '小王',

  greetNormal: function() {                            // 普通函数——有自己的 this
    console.log('普通函数：' + this.name);            // this = user → "小王"
  },

  greetArrow: () => {                                  // 箭头函数——没有自己的 this
    console.log('箭头函数：' + this.name);            // this 从外层（全局/模块）继承 → undefined
  }
};

user.greetNormal();                                    // "普通函数：小王"
user.greetArrow();                                     // "箭头函数：undefined"——外层 this 是 window

// ⚠️ 所以：对象的方法不建议用箭头函数定义
// 但箭头函数在回调场景中特别有用——它能"穿透"到外层的 this！
```
:::

:::example{title="实战：修复 this 丢失的三种方案"}
回到开头的 `likeController` bug。三种修复方式，推荐第一种（箭头函数包装）：

```js
const likeController = {
  likeCount: 0,
  message: '点赞成功',

  handleClick: function() {                            // 普通函数——this 取决于调用方式
    this.likeCount++;
    console.log(this.message);
  }
};

const likeBtn = document.querySelector('#likeBtn');

// ❌ 错误写法：this 会被 addEventListener 改为按钮元素
// likeBtn.addEventListener('click', likeController.handleClick);

// ✅ 方案1：箭头函数包装（推荐——最简洁）
likeBtn.addEventListener('click', () => {              // 箭头函数没有自己的 this
  likeController.handleClick();                        // 明确通过对象调用——this = likeController ✅
});

// ✅ 方案2：bind()——永久锁定 this
// bind() 返回一个新函数，其中的 this 被锁定为指定值
likeBtn.addEventListener('click', likeController.handleClick.bind(likeController));

// ✅ 方案3：匿名函数包装（传统写法）
likeBtn.addEventListener('click', function() {         // 普通匿名函数
  likeController.handleClick();                        // 通过对象调用——this 正确
});
```

**实际工作场景**：React 类组件中 `this.handleClick = this.handleClick.bind(this)` 是经典写法（Hook 出现前）。Vue 的 `methods` 中无需担心 this 丢失——Vue 自动帮你绑定了。
:::

:::explain{title="常见错误"}
**错误1：对象方法用了箭头函数**
```js
// ❌ 错误：箭头函数从外层继承 this——外层是 window，拿不到对象的 name
const person = {
  name: '张三',
  sayName: () => {
    console.log(this.name);                            // undefined —— this 是 window
  }
};
person.sayName();                                      // undefined

// ✅ 正确：对象方法用普通函数（或方法简写）
const person = {
  name: '张三',
  sayName() {                                          // 方法简写——等价于 sayName: function()
    console.log(this.name);                            // "张三" —— this = person
  }
};
person.sayName();                                      // "张三"
```

**错误2：回调中直接传 this.method——最常见的实际 bug**
```js
const app = {
  data: '重要数据',
  process: function() {
    console.log('处理：' + this.data);                // 期望 this = app
  }
};

// ❌ 错误：setTimeout 中独立调用——this 变成 window
setTimeout(app.process, 1000);                         // "处理：undefined" —— this.data 找不到

// ✅ 方案1：箭头函数包装
setTimeout(() => { app.process(); }, 1000);            // "处理：重要数据"

// ✅ 方案2：bind
setTimeout(app.process.bind(app), 1000);               // "处理：重要数据"
```

**错误3：嵌套函数中 this 丢失**
```js
const obj = {
  name: '外层',
  outer: function() {
    console.log('外层 this.name =', this.name);        // "外层"——this = obj
    function inner() {
      console.log('内层 this.name =', this.name);     // undefined！——独立调用，this = window
    }
    inner();                                           // 嵌套的普通函数独立调用
  }
};
obj.outer();
// 输出：
// "外层 this.name = 外层"
// "内层 this.name = undefined"

// ✅ 修复：用箭头函数——从 outer 继承 this
const obj2 = {
  name: '外层',
  outer: function() {
    console.log('外层 this.name =', this.name);        // "外层"
    const inner = () => {                              // 箭头函数！
      console.log('内层 this.name =', this.name);     // "外层"——从 outer 继承了 this
    };
    inner();
  }
};
```
:::

:::task{title="动手试试 — 在控制台中验证 this 的行为"}
本练习在浏览器控制台（F12 → Console）中逐段运行即可。

::::step{purpose="通过对比对象方法调用和独立调用，你能直观地看到 this 值随调用方式变化。这帮你建立对 this 的直觉——'谁在调用我？'是最核心的问题。" expected="作为方法调用时 this 指向对象并正确输出 name；独立调用时 this 指向 window，输出 undefined。"}
观察 this 在不同调用方式下的变化：
```js
const person = {
  name: '张三',
  showThis: function() {
    console.log('this.name =', this.name);             // this 取决于调用方式
  }
};
// 任务1：作为方法调用——person.showThis()，观察输出
// 任务2：把方法赋值给变量后独立调用——const fn = person.showThis; fn();，观察输出差异
```
::::

::::step{purpose="箭头函数和普通函数在 this 上的区别是最容易踩的坑之一。通过对比，你能清楚地看到箭头函数'穿透'到外层的作用——在对象方法中该用普通函数还是箭头函数？" expected="普通函数输出正确的 name，箭头函数因 this 指向外层而输出 undefined 或错误的值。"}
对比普通函数和箭头函数中 this 的区别：
```js
const team = {
  name: '前端开发组',
  showNormal: function() {                             // 普通函数——有自己的 this
    console.log('普通函数 this.name =', this.name);
  },
  showArrow: () => {                                   // 箭头函数——this 从外层继承
    console.log('箭头函数 this.name =', this.name);
  }
};
// 分别调用 team.showNormal() 和 team.showArrow()，观察输出差异
// 思考：为什么一个正确一个错误？箭头函数的 this 到底从哪来的？
```
::::

::::step{purpose="这是实际项目中最常见的 this 丢失场景——把对象方法直接传给 addEventListener。修复它意味着你掌握了处理 this 的实用技能。" expected="点击按钮后能正确输出 message 的值，而不是 undefined。"}
修复 this 丢失问题——对象方法作为事件处理器：
```js
// 假设 HTML 中有 <button id="actionBtn">操作</button>
const controller = {
  message: '操作成功',
  handleClick: function() {
    console.log(this.message);                         // 期望输出 '操作成功'
  }
};
const btn = document.querySelector('#actionBtn');

// ❌ 这行有 bug——this 会丢失，修复它！
// btn.addEventListener('click', controller.handleClick);

// 任务：用箭头函数包装的方式修复——让点击后控制台输出 "操作成功"
// 任务：再用 .bind() 的方式实现一次——对比两种修复方式
```
::::

:::

:::recap
你学会了 `this` 关键字——它的值取决于**谁在调用函数**，而不是函数定义在哪里。四条规则：方法调用（`obj.fn()`）→ `this = obj`；独立调用（`fn()`）→ `this = window`；事件处理器→ `this = DOM元素`；箭头函数→ `this` 从外层继承（没有自己的 `this`）。最常见的实际 bug 是把对象方法直接传给 `addEventListener` 或 `setTimeout` 导致 this 丢失——用箭头函数包装（`() => obj.method()`）或 `.bind(obj)` 是标准修复方案。
:::
