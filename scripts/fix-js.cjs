const fs = require('fs');
let src = fs.readFileSync('src/configs/lessons.ts', 'utf-8');
let changed = 0;
const N = '\\n';

const fixes = [
  // JS events-more
  [`addEventListener 的第一个参数是事件**类型**，`,
   `除了 click 点击事件外，还有很多常用事件类型：input（输入框内容变化）、keydown（键盘按下）、mouseenter（鼠标移入）、mouseleave（鼠标移出）、submit（表单提交）。addEventListener 的第一个参数是事件类型，`],

  // JS conditions
  [`if 后面跟一个**条件**（真或假），`,
   `if/else 条件判断让代码在不同情况下执行不同操作——就像练琴时"如果音准不对就停下来调整，否则继续往下弹"。if 后面跟一个条件（真或假），`],

  // JS loops
  [`for 循环由三部分组成：初始化、条件、步进：`,
   `for 循环让代码重复执行——就像节拍器每拍敲一下，直到曲子弹完。循环由三部分组成：初始化（从哪里开始）、条件（什么时候停）、步进（每次怎么变）。`],

  // JS array-methods
  [`.map() 遍历数组中的每一项，执行一个函数，**返回一个新数组**：`,
   `数组方法让你像处理乐谱列表一样操作数据——map 对每项做同样操作返回新数组，filter 筛选符合条件的项，reduce 将所有项累积为一个值。.map() 遍历数组中的每一项，执行一个函数，返回一个新数组：`],

  // JS querySelectorAll
  [`querySelectorAll 返回所有匹配的元素列表（NodeList）：`,
   `querySelectorAll 选中所有匹配选择器的元素，返回一个列表（NodeList）。可以用 forEach 遍历每个元素——就像指挥同时命令整个弦乐声部做同一个动作。`],

  // JS dom-advanced
  [`document.createElement() 可以凭空创建一个新元素：`,
   `createElement 动态创建 HTML 元素，appendChild 把它添加到页面上，remove 移除元素。就像在演奏中临时增加一件乐器、或让某个声部退出。document.createElement() 可以凭空创建一个新元素：`],

  // JS timers
  [`setInterval 每隔指定毫秒执行一次回调函数：`,
   `setInterval 每隔指定时间重复执行（像节拍器持续打拍子），setTimeout 只执行一次（像指挥给出延后进入的提示）。时间单位是毫秒，1000 毫秒 = 1 秒。`],

  // workflow console-log
  [`console.log() 是 JavaScript 中最常用的调试工具。`,
   `console.log() 是 JavaScript 最常用的调试工具——在控制台中打印出你想要检查的值。就像练琴时录下来回听，看哪个音不对。`],

  // async-await
  [`async/await 是 Promise 的"语法糖"——底层还是 Promise，但写起来像同步代码。`,
   `async/await 让异步代码看起来像同步代码——async 声明异步函数，await 等待 Promise 完成再继续。就像指挥等待独奏家完成华彩乐段再继续指挥——表面是同步的等待，实际是异步的完成。`],

  // vue-directives
  [`v-bind 把 JS 表达式的值绑定到 HTML 属性上。简写是 \x60:\x60 ：`,
   `Vue 指令是以 v- 开头的特殊属性：v-bind（简写 :）把数据绑定到属性，v-if/v-show 控制显示隐藏，v-for 循环渲染列表，v-on（简写 @）监听事件，v-model 双向绑定表单。v-bind 把 JS 表达式的值绑定到 HTML 属性上：`],

  // vue-vmodel-deep
  [`v-model 是 Vue 中最常用的指令之一。它实际是 \x60v-bind:value\x60 + \x60v-on:input\x60 的语法糖：`,
   `v-model 是 Vue 最常用的双向绑定指令——它同时做了两件事：把数据绑定到表单元素的值（v-bind:value），并在用户输入时更新数据（v-on:input）。`],
];

for (const [oldStr, newStr] of fixes) {
  if (src.includes(oldStr)) {
    src = src.replace(oldStr, newStr);
    changed++;
    console.log('OK');
  } else {
    console.log('SKIP:', oldStr.substring(0, 50));
  }
}

fs.writeFileSync('src/configs/lessons.ts', src, 'utf-8');
console.log('Changed:', changed, '/', fixes.length);
