# {{term:this 关键字}} — 谁在调用我？

:::analogy
this 就像"我"这个词在不同人口中有不同含义——张三说"我"指的是张三，李四说"我"指的是李四。在代码中，this 的值取决于"谁在调用这个函数"。理解 this 是理解 JavaScript 行为的关键一步。
:::

:::prerequisite
**本节你需要知道这些词：**

- **函数**：一段可以重复调用的代码块，有输入（参数）和输出（返回值）
- **对象**：键值对的集合，用 `{}` 表示，用来组织相关数据
- **事件**：用户在页面上做的操作——点击、输入、滚动等，浏览器能捕获到
- **箭头函数**：ES6 的一种更简洁的函数写法，`() => {}`，但它没有自己的 `this`
- **this**：一个特殊关键字，指向"当前是谁在调用这个函数"，它的值取决于调用方式
:::

:::explain{title="this 是什么？——一个随着调用方式变化的值"}
`this` 是 JavaScript 中的一个特殊关键字，它指向**当前函数的调用者**。但关键是：同一个函数，**不同的调用方式，`this` 的值就不同**。

```js
// 同一个函数
function showThis() {
  console.log(this);
}

// 方式一：直接调用
showThis(); // window（浏览器环境）

// 方式二：作为对象的方法调用
const obj = { show: showThis };
obj.show(); // obj 对象

// 方式三：用 .call() 指定
const another = { name: '另一个对象' };
showThis.call(another); // { name: '另一个对象' }
```

所以 `this` 不是定义时决定的，而是**调用时决定的**。每当看到 `this`，你只需要问一个问题：**"谁在调用这个函数？"**
:::

:::explain{title="规则一：方法中的 this → 调用它的对象"}
当一个函数作为对象的**方法**被调用时，`this` 指向**点号前面的那个对象**。

```js
const user = {
  name: '小明',
  greet: function() {
    console.log('你好，我是' + this.name);
  }
};

user.greet(); // 你好，我是小明 —— this 指向 user
```

这是最常见也最符合直觉的情况。谁调用我，`this` 就是谁。
:::

:::explain{title="规则二：普通函数中的 this → window（或 undefined）"}
当一个函数**不作为对象的方法**被调用时，`this` 在非严格模式下指向全局对象 `window`，在严格模式下是 `undefined`。

```js
function standalone() {
  console.log(this);
}
standalone(); // window（浏览器中）

// 即使函数在对象内部定义，但如果被"独立"调用，this 也不是那个对象
const obj = {
  name: '小李',
  sayName: function() {
    console.log(this.name);
  }
};

const fn = obj.sayName;  // 把方法赋值给变量
fn(); // undefined —— 此时没有对象在调用它，this 是 window
```

关键区分：`obj.sayName()` 和 `fn()` 是不同的——前者有点号，`this` 是 `obj`；后者没有，`this` 是 `window`。
:::

:::explain{title="规则三：事件处理器中的 this → 触发事件的 DOM 元素"}
在 `addEventListener` 的回调中，`this` 指向**触发事件的那个元素**。

```js
const button = document.querySelector('#myBtn');
button.addEventListener('click', function() {
  console.log(this);              // <button id="myBtn">点击我</button>
  console.log(this.textContent);  // "点击我"
});
```

这很方便——你可以在事件处理函数内部用 `this` 直接拿到被点击的元素，不需要再用 `event.target`。
:::

:::explain{title="规则四：箭头函数没有自己的 this"}
箭头函数（`=>`）**不会创建自己的 `this`**，而是从它所在的**外层作用域**继承。

```js
const user = {
  name: '小王',
  // 普通函数——this 指向调用者 user
  greetNormal: function() {
    console.log('普通函数：' + this.name);
  },
  // 箭头函数——this 从外层继承（这里是 window）
  greetArrow: () => {
    console.log('箭头函数：' + this.name);
  }
};

user.greetNormal(); // 普通函数：小王
user.greetArrow();  // 箭头函数：undefined（因为外层 this 是 window）
```

就是因为箭头函数没有自己的 `this`，它在回调场景中特别有用——它能"穿透"到外层，拿到你真正想要的 `this`。
:::

:::explain{title="常见陷阱：回调中丢失 this"}
这是新手最容易遇到的实际 bug。假设你有一个对象方法作为事件处理器：

```js
const app = {
  message: '点击确认',
  handleClick: function() {
    console.log(this.message); // 期望输出 '点击确认'
  }
};

// ❌ 这样会出问题！
button.addEventListener('click', app.handleClick);
// 输出：undefined
// 因为点击时 handleClick 是被 button 调用的，this 变成了 button
```

**三种修复方式：**

```js
// 方案一：箭头函数（推荐 —— 最简洁）
button.addEventListener('click', () => {
  app.handleClick(); // this 从外层继承，此处箭头函数保持外层的 this
});

// 方案二：bind() ——锁定 this
button.addEventListener('click', app.handleClick.bind(app));

// 方案三：匿名函数包装
button.addEventListener('click', function() {
  app.handleClick();
});
```

**`.bind()` 简介：** `bind()` 返回一个新函数，其中 `this` 被永久锁定为指定值。它不会调用原函数，只是"绑定"。

```js
const boundFn = app.handleClick.bind(app);
boundFn(); // this 永远是 app，不管你怎么调用
```
:::

:::task{title="动手试试 ✨"}
::::step{purpose="通过对比对象方法调用和独立调用，你能直观地看到 this 值随调用方式变化。这帮你建立对 this 的直觉——'谁在调用我？'是最核心的问题。" expected="作为方法调用时 this 指向对象并正确输出 name；独立调用时 this 指向 window，输出 undefined。"}
观察 this 在不同调用方式下的变化

```js
const person = {
  name: '张三',
  showThis: function() {
    console.log('this.name =', this.name);
  }
};
// 1. 作为方法调用 person.showThis()
// 2. 把方法赋值给变量后独立调用
```
::::

::::step{purpose="{{term:箭头函数}}和普通函数在 this 上的区别是最容易踩的坑之一。通过对比，你能清楚地看到箭头函数'穿透'到外层的作用。" expected="普通函数输出正确的 name，箭头函数因 this 指向外层而输出 undefined 或错误的值。"}
对比普通函数和箭头函数中 this 的区别

```js
const team = {
  name: '前端开发组',
  showNormal: function() {
    console.log('普通函数 this.name =', this.name);
  },
  showArrow: () => {
    console.log('箭头函数 this.name =', this.name);
  }
};
// 分别调用上面两个方法，观察输出
```
::::

::::step{purpose="这是实际项目中最常见的 this 丢失场景——把对象方法直接传给 addEventListener。修复它意味着你掌握了处理 this 的实用技能。" expected="点击按钮后能正确输出 message 的值，而不是 undefined。"}
修复 this 丢失问题——对象方法作为事件处理器

```js
const controller = {
  message: '操作成功',
  handleClick: function() {
    console.log(this.message);
  }
};
document.querySelector('#actionBtn').addEventListener('click', controller.handleClick);
// 上面这行有 bug——this 会丢失，修复它！
```
::::

:::

:::recap
你学会了 this 关键字——它的值取决于"谁在调用函数"。作为方法调用时 this 指向对象，独立调用时指向 window，事件处理器中指向 DOM 元素，箭头函数没有自己的 this 而是从外层继承。常见的坑是把对象方法直接传给 addEventListener 导致 this 丢失——用箭头函数包装或 bind() 可以修复。
:::
