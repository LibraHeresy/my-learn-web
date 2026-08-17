// 题目数据：阶段1（04-10）、阶段2、阶段4（纯函数题）
// 每道题：stage, stageName, num, title, fnName, desc, examples, hint, testCases

const stage1 = [
  {
    num: 1, title: '两数之和', fnName: 'sum', params: 'a, b',
    desc: '<p>编写一个函数 <code>sum(a, b)</code>，接收两个数字参数，返回它们的和。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>a = 1, b = 2</code><br />输出：<code>3</code>' },
      { title: '示例 2', body: '输入：<code>a = -1, b = 5</code><br />输出：<code>4</code>' },
    ],
    hint: '',
    testCases: [
      { args: [1, 2], expected: 3 },
      { args: [-1, 5], expected: 4 },
      { args: [100, -50], expected: 50 },
      { args: [0, 0], expected: 0 },
    ],
  },
  {
    num: 2, title: '判断奇偶', fnName: 'isEven', params: 'n',
    desc: '<p>编写一个函数 <code>isEven(n)</code>，接收一个数字参数，判断它是否为偶数。是偶数返回 <code>true</code>，是奇数返回 <code>false</code>。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>n = 4</code><br />输出：<code>true</code>' },
      { title: '示例 2', body: '输入：<code>n = 3</code><br />输出：<code>false</code>' },
    ],
    hint: '想想负数怎么办，比如 isEven(-4)？',
    testCases: [
      { args: [4], expected: true },
      { args: [3], expected: false },
      { args: [0], expected: true },
      { args: [-4], expected: true },
      { args: [-7], expected: false },
    ],
  },
  {
    num: 3, title: '数组最大值', fnName: 'findMax', params: 'arr',
    desc: '<p>编写一个函数 <code>findMax(arr)</code>，接收一个数字数组，返回其中最大的数。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = [1, 5, 3]</code><br />输出：<code>5</code>' },
      { title: '示例 2', body: '输入：<code>arr = [-3, -1, -7]</code><br />输出：<code>-1</code>' },
    ],
    hint: '如果数组全是负数，初始值设 0 会出错，想想怎么处理。',
    testCases: [
      { args: [[1, 5, 3]], expected: 5 },
      { args: [[-3, -1, -7]], expected: -1 },
      { args: [[100]], expected: 100 },
      { args: [[0, 0, 0]], expected: 0 },
      { args: [[9, 8, 7, 10]], expected: 10 },
    ],
  },
  {
    num: 4, title: '统计字符出现次数', fnName: 'countChar', params: 'str, char',
    desc: '<p>编写一个函数 <code>countChar(str, char)</code>，接收一个字符串和一个字符，返回该字符在字符串中出现的次数。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>str = "hello", char = "l"</code><br />输出：<code>2</code>' },
      { title: '示例 2', body: '输入：<code>str = "banana", char = "a"</code><br />输出：<code>3</code>' },
    ],
    hint: '遍历字符串，逐个字符比较。',
    testCases: [
      { args: ["hello", "l"], expected: 2 },
      { args: ["banana", "a"], expected: 3 },
      { args: ["abc", "z"], expected: 0 },
      { args: ["aaa", "a"], expected: 3 },
      { args: ["Hello World", "o"], expected: 2 },
    ],
  },
  {
    num: 5, title: '过滤偶数', fnName: 'filterEven', params: 'arr',
    desc: '<p>编写一个函数 <code>filterEven(arr)</code>，接收一个数字数组，返回只包含偶数的新数组。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = [1, 2, 3, 4]</code><br />输出：<code>[2, 4]</code>' },
      { title: '示例 2', body: '输入：<code>arr = [1, 3, 5]</code><br />输出：<code>[]</code>' },
    ],
    hint: '试试用 filter 方法。',
    testCases: [
      { args: [[1, 2, 3, 4]], expected: [2, 4] },
      { args: [[1, 3, 5]], expected: [] },
      { args: [[0, 2, 4]], expected: [0, 2, 4] },
      { args: [[-2, -1, 0, 1]], expected: [-2, 0] },
    ],
  },
  {
    num: 6, title: '反转字符串', fnName: 'reverseStr', params: 'str',
    desc: '<p>编写一个函数 <code>reverseStr(str)</code>，接收一个字符串，返回反转后的字符串。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>str = "abc"</code><br />输出：<code>"cba"</code>' },
      { title: '示例 2', body: '输入：<code>str = "hello"</code><br />输出：<code>"olleh"</code>' },
    ],
    hint: '字符串没有 reverse 方法，先 split 成数组。',
    testCases: [
      { args: ["abc"], expected: "cba" },
      { args: ["hello"], expected: "olleh" },
      { args: [""], expected: "" },
      { args: ["a"], expected: "a" },
    ],
  },
  {
    num: 7, title: '判断回文', fnName: 'isPalindrome', params: 'str',
    desc: '<p>编写一个函数 <code>isPalindrome(str)</code>，判断一个字符串是否为回文（正着读和反着读一样）。是返回 <code>true</code>，否则返回 <code>false</code>。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>str = "level"</code><br />输出：<code>true</code>' },
      { title: '示例 2', body: '输入：<code>str = "hello"</code><br />输出：<code>false</code>' },
    ],
    hint: '可以复用反转字符串的思路。',
    testCases: [
      { args: ["level"], expected: true },
      { args: ["hello"], expected: false },
      { args: ["a"], expected: true },
      { args: ["ab"], expected: false },
    ],
  },
  {
    num: 8, title: '数组去重', fnName: 'unique', params: 'arr',
    desc: '<p>编写一个函数 <code>unique(arr)</code>，接收一个数组，返回去除重复元素后的新数组。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = [1, 2, 2, 3]</code><br />输出：<code>[1, 2, 3]</code>' },
    ],
    hint: '试试 Set，它天生不存重复值。',
    testCases: [
      { args: [[1, 2, 2, 3]], expected: [1, 2, 3] },
      { args: [["a", "b", "a"]], expected: ["a", "b"] },
      { args: [[1, 1, 1, 1]], expected: [1] },
      { args: [[]], expected: [] },
    ],
  },
  {
    num: 9, title: '累加求和', fnName: 'sumTo', params: 'n',
    desc: '<p>编写一个函数 <code>sumTo(n)</code>，接收一个正整数 n，返回 1 到 n 所有整数的累加和。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>n = 5</code><br />输出：<code>15</code>（1+2+3+4+5）' },
      { title: '示例 2', body: '输入：<code>n = 1</code><br />输出：<code>1</code>' },
    ],
    hint: '',
    testCases: [
      { args: [5], expected: 15 },
      { args: [1], expected: 1 },
      { args: [10], expected: 55 },
      { args: [0], expected: 0 },
      { args: [100], expected: 5050 },
    ],
  },
  {
    num: 10, title: '遍历打印对象', fnName: 'printObj', params: 'obj',
    desc: '<p>编写一个函数 <code>printObj(obj)</code>，接收一个对象，遍历它的所有键值对，返回一个字符串数组，每个元素格式为 <code>"key: value"</code>。</p>',
    examples: [
      { title: '示例', body: '输入：<code>obj = { name: "Tom", age: 20 }</code><br />输出：<code>["name: Tom", "age: 20"]</code>' },
    ],
    hint: '访问对象属性用 obj[key]，而不是 obj.key。',
    testCases: [
      { args: [{ name: "Tom", age: 20 }], expected: ["name: Tom", "age: 20"] },
      { args: [{ a: 1, b: 2 }], expected: ["a: 1", "b: 2"] },
      { args: [{}], expected: [] },
    ],
  },
];

const stage2 = [
  {
    num: 11, title: '斐波那契数列', fnName: 'fib', params: 'n',
    desc: '<p>编写一个函数 <code>fib(n)</code>，接收一个非负整数 n，返回斐波那契数列的第 n 项（从 0 开始：fib(0)=0, fib(1)=1）。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>n = 5</code><br />输出：<code>5</code>' },
      { title: '示例 2', body: '输入：<code>n = 10</code><br />输出：<code>55</code>' },
    ],
    hint: '用循环迭代，不要用递归（递归会超时）。',
    testCases: [
      { args: [0], expected: 0 },
      { args: [1], expected: 1 },
      { args: [5], expected: 5 },
      { args: [10], expected: 55 },
      { args: [20], expected: 6765 },
    ],
  },
  {
    num: 12, title: '判断质数', fnName: 'isPrime', params: 'n',
    desc: '<p>编写一个函数 <code>isPrime(n)</code>，判断一个整数是否为质数。是质数返回 <code>true</code>，否则返回 <code>false</code>。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>n = 7</code><br />输出：<code>true</code>' },
      { title: '示例 2', body: '输入：<code>n = 4</code><br />输出：<code>false</code>' },
    ],
    hint: '注意 0 和 1 不是质数；循环到 Math.sqrt(n) 即可。',
    testCases: [
      { args: [2], expected: true },
      { args: [7], expected: true },
      { args: [4], expected: false },
      { args: [1], expected: false },
      { args: [97], expected: true },
    ],
  },
  {
    num: 13, title: '冒泡排序', fnName: 'bubbleSort', params: 'arr',
    desc: '<p>编写一个函数 <code>bubbleSort(arr)</code>，接收一个数字数组，返回升序排序后的新数组（不修改原数组）。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = [5, 2, 8, 1]</code><br />输出：<code>[1, 2, 5, 8]</code>' },
    ],
    hint: '外层循环控制轮数，内层循环两两比较交换；内层边界是 len-1-i。',
    testCases: [
      { args: [[5, 2, 8, 1]], expected: [1, 2, 5, 8] },
      { args: [[3, 3, 1]], expected: [1, 3, 3] },
      { args: [[1]], expected: [1] },
      { args: [[9, 8, 7, 6]], expected: [6, 7, 8, 9] },
      { args: [[]], expected: [] },
    ],
  },
  {
    num: 14, title: '二分查找', fnName: 'binarySearch', params: 'arr, target',
    desc: '<p>编写一个函数 <code>binarySearch(arr, target)</code>，在已升序排序的数组中查找目标值，返回其下标；找不到返回 <code>-1</code>。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = [1,3,5,7,9], target = 5</code><br />输出：<code>2</code>' },
      { title: '示例 2', body: '输入：<code>arr = [1,3,5,7,9], target = 4</code><br />输出：<code>-1</code>' },
    ],
    hint: '用 left/right 双指针，mid = Math.floor((left+right)/2)。',
    testCases: [
      { args: [[1, 3, 5, 7, 9], 5], expected: 2 },
      { args: [[1, 3, 5, 7, 9], 4], expected: -1 },
      { args: [[1], 1], expected: 0 },
      { args: [[2, 4, 6, 8, 10], 10], expected: 4 },
      { args: [[1, 2, 3, 4, 5], 1], expected: 0 },
    ],
  },
  {
    num: 15, title: '找出重复数字', fnName: 'findDuplicate', params: 'arr',
    desc: '<p>编写一个函数 <code>findDuplicate(arr)</code>，找出数组中第一个重复出现的数字并返回；如果没有重复，返回 <code>-1</code>。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = [1, 2, 3, 2]</code><br />输出：<code>2</code>' },
      { title: '示例 2', body: '输入：<code>arr = [1, 2, 3]</code><br />输出：<code>-1</code>' },
    ],
    hint: '用 Set 记录已见过的数字。',
    testCases: [
      { args: [[1, 2, 3, 2]], expected: 2 },
      { args: [[1, 2, 3]], expected: -1 },
      { args: [[5, 5]], expected: 5 },
      { args: [[1, 1, 2, 2]], expected: 1 },
    ],
  },
  {
    num: 16, title: '两个数组交集', fnName: 'intersection', params: 'arr1, arr2',
    desc: '<p>编写一个函数 <code>intersection(arr1, arr2)</code>，返回两个数组的交集（去重后）。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr1 = [1,2,3], arr2 = [2,3,4]</code><br />输出：<code>[2, 3]</code>' },
    ],
    hint: '把一个数组转成 Set，过滤另一个数组。',
    testCases: [
      { args: [[1, 2, 3], [2, 3, 4]], expected: [2, 3] },
      { args: [[1, 2], [3, 4]], expected: [] },
      { args: [[1, 1, 2], [1, 2, 2]], expected: [1, 2] },
    ],
  },
  {
    num: 17, title: '判断异位词', fnName: 'isAnagram', params: 's1, s2',
    desc: '<p>编写一个函数 <code>isAnagram(s1, s2)</code>，判断两个字符串是否为异位词（由相同字符重排而成）。是返回 <code>true</code>，否则返回 <code>false</code>。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>s1 = "listen", s2 = "silent"</code><br />输出：<code>true</code>' },
      { title: '示例 2', body: '输入：<code>s1 = "hello", s2 = "world"</code><br />输出：<code>false</code>' },
    ],
    hint: '先比较长度；排序后比较，或用字符计数。',
    testCases: [
      { args: ["listen", "silent"], expected: true },
      { args: ["hello", "world"], expected: false },
      { args: ["abc", "ab"], expected: false },
      { args: ["aabb", "bbaa"], expected: true },
    ],
  },
  {
    num: 18, title: '统计元素频次', fnName: 'countFreq', params: 'arr',
    desc: '<p>编写一个函数 <code>countFreq(arr)</code>，统计数组中每个元素出现的次数，返回一个对象，键为元素、值为次数。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = ["a", "b", "a"]</code><br />输出：<code>{ a: 2, b: 1 }</code>' },
    ],
    hint: '用对象记录：map[x] = (map[x] || 0) + 1。',
    testCases: [
      { args: [["a", "b", "a"]], expected: { a: 2, b: 1 } },
      { args: [[1, 1, 1]], expected: { 1: 3 } },
      { args: [[]], expected: {} },
    ],
  },
  {
    num: 19, title: '扁平化嵌套数组', fnName: 'flatten', params: 'arr',
    desc: '<p>编写一个函数 <code>flatten(arr)</code>，将多层嵌套的数组扁平化为一维数组。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = [1, [2, [3]]]</code><br />输出：<code>[1, 2, 3]</code>' },
    ],
    hint: '用递归：判断 Array.isArray(item)。',
    testCases: [
      { args: [[1, [2, [3]]]], expected: [1, 2, 3] },
      { args: [[1, 2, 3]], expected: [1, 2, 3] },
      { args: [[[1], [2, [3, [4]]]]], expected: [1, 2, 3, 4] },
      { args: [[]], expected: [] },
    ],
  },
  {
    num: 20, title: '深拷贝', fnName: 'deepClone', params: 'obj',
    desc: '<p>编写一个函数 <code>deepClone(obj)</code>，对一个对象/数组进行深拷贝，返回新的对象，修改副本不影响原对象。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>obj = { a: 1, b: { c: 2 } }</code><br />输出：<code>{ a: 1, b: { c: 2 } }</code>（独立副本）</p>' },
    ],
    hint: '递归处理；注意 null 和数组。',
    testCases: [
      { args: [{ a: 1, b: { c: 2 } }], expected: { a: 1, b: { c: 2 } } },
      { args: [[1, [2, 3]]], expected: [1, [2, 3]] },
      { args: [5], expected: 5 },
      { args: [null], expected: null },
    ],
  },
];

const stage4 = [
  {
    num: 31, title: 'Promise 延时', fnName: 'delay',
    desc: '<p>编写一个函数 <code>delay(ms)</code>，返回一个 Promise，在 <code>ms</code> 毫秒后 resolve。</p>',
    examples: [
      { title: '示例', body: '输入：<code>ms = 1000</code><br />行为：1 秒后 resolve' },
    ],
    hint: 'new Promise + setTimeout。',
    testCases: [],
    isAsync: true,
  },
  {
    num: 32, title: 'async/await 延时', fnName: 'wait',
    desc: '<p>编写一个 <code>async</code> 函数 <code>wait(ms)</code>，内部用 <code>await delay(ms)</code> 等待指定时间后返回字符串 <code>"done"</code>。</p>',
    examples: [
      { title: '示例', body: '输入：<code>ms = 500</code><br />输出（Promise）：<code>"done"</code>' },
    ],
    hint: '需要先有 delay 函数（参考上一题），再 async + await。',
    testCases: [],
    isAsync: true,
  },
  {
    num: 37, title: '闭包计数器', fnName: 'createCounter',
    desc: '<p>编写一个函数 <code>createCounter()</code>，返回一个计数器函数，每次调用返回递增的数字（从 1 开始）。</p>',
    examples: [
      { title: '示例', body: '<code>const c = createCounter(); c(); // 1<br />c(); // 2<br />c(); // 3</code>' },
    ],
    hint: '外层变量 + 内层函数（闭包）。',
    testCases: [
      { args: [], expected: 1, mode: 'counter' },
    ],
    isAsync: true,
  },
  {
    num: 34, title: '防抖 debounce', fnName: 'debounce',
    desc: '<p>编写一个函数 <code>debounce(fn, delay)</code>，返回一个新函数，在连续调用时只在停止调用 <code>delay</code> 毫秒后才执行 <code>fn</code>。</p>',
    examples: [
      { title: '示例', body: '连续触发输入事件，只在停止输入 300ms 后执行一次。' },
    ],
    hint: '闭包保存 timer，clearTimeout + setTimeout。',
    testCases: [],
    isAsync: true,
  },
  {
    num: 35, title: '节流 throttle', fnName: 'throttle',
    desc: '<p>编写一个函数 <code>throttle(fn, interval)</code>，返回一个新函数，在 <code>interval</code> 毫秒内最多执行一次 <code>fn</code>。</p>',
    examples: [
      { title: '示例', body: '滚动事件每 200ms 最多执行一次。' },
    ],
    hint: '闭包记录上次执行时间戳。',
    testCases: [],
    isAsync: true,
  },
  {
    num: 36, title: '发布订阅', fnName: 'EventBus',
    desc: '<p>实现一个事件总线类 <code>EventBus</code>，包含 <code>on(name, fn)</code>（订阅）、<code>emit(name, ...args)</code>（触发）、<code>off(name, fn)</code>（取消订阅）三个方法。</p>',
    examples: [
      { title: '示例', body: '<code>const bus = new EventBus();<br />bus.on("hello", msg => console.log(msg));<br />bus.emit("hello", "world"); // 打印 world</code>' },
    ],
    hint: '用一个对象存储 事件名 → 回调数组。',
    testCases: [],
    isAsync: true,
  },
  {
    num: 38, title: '手写 bind', fnName: 'myBind',
    desc: '<p>实现一个 <code>Function.prototype.myBind(ctx, ...args)</code>，功能同原生 <code>bind</code>：返回一个绑定了 this 的新函数。</p>',
    examples: [
      { title: '示例', body: '<code>fn.myBind(obj)(1, 2)</code> 等价于 <code>fn.call(obj, 1, 2)</code>' },
    ],
    hint: '返回闭包，内部用 fn.apply(ctx, ...)。',
    testCases: [],
    isAsync: true,
  },
];

// JS 进阶阶段（新阶段2，编号 11-20）
const stageAdvance = [
  {
    num: 11, title: 'reduce 累加求和', fnName: 'sumWithReduce', params: 'arr',
    desc: '<p>用 <code>reduce</code> 编写函数 <code>sumWithReduce(arr)</code>，返回数组所有数字之和。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = [1, 2, 3, 4]</code><br />输出：<code>10</code>' },
    ],
    hint: 'arr.reduce((acc, cur) => acc + cur, 0)。',
    testCases: [
      { args: [[1, 2, 3, 4]], expected: 10 },
      { args: [[]], expected: 0 },
      { args: [[5, -3, 2]], expected: 4 },
      { args: [[100]], expected: 100 },
    ],
  },
  {
    num: 12, title: 'reduce 统计词频', fnName: 'countWords', params: 'arr',
    desc: '<p>用 <code>reduce</code> 编写函数 <code>countWords(arr)</code>，统计字符串数组中每个词出现的次数，返回对象。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = ["a", "b", "a"]</code><br />输出：<code>{ a: 2, b: 1 }</code>' },
    ],
    hint: 'reduce 的初始值设为空对象，累加器里 map[cur] = (map[cur] || 0) + 1。',
    testCases: [
      { args: [["a", "b", "a"]], expected: { a: 2, b: 1 } },
      { args: [["x"]], expected: { x: 1 } },
      { args: [[]], expected: {} },
    ],
  },
  {
    num: 13, title: 'sort 对象数组排序', fnName: 'sortByAge', params: 'arr',
    desc: '<p>编写函数 <code>sortByAge(arr)</code>，接收对象数组（每项含 <code>name</code> 和 <code>age</code>），按年龄升序排序并返回新数组（不修改原数组）。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = [{name:"Tom",age:30},{name:"Jerry",age:20}]</code><br />输出：<code>[{name:"Jerry",age:20},{name:"Tom",age:30}]</code>' },
    ],
    hint: '先拷贝 [...arr]，再 sort((a, b) => a.age - b.age)。',
    testCases: [
      { args: [[{ name: "Tom", age: 30 }, { name: "Jerry", age: 20 }]], expected: [{ name: "Jerry", age: 20 }, { name: "Tom", age: 30 }] },
      { args: [[{ name: "A", age: 25 }]], expected: [{ name: "A", age: 25 }] },
      { args: [[{ name: "A", age: 5 }, { name: "B", age: 5 }]], expected: [{ name: "A", age: 5 }, { name: "B", age: 5 }] },
    ],
  },
  {
    num: 14, title: 'find/some/every 运用', fnName: 'analyze', params: 'arr',
    desc: '<p>编写函数 <code>analyze(arr)</code>，接收数字数组，返回一个对象，包含：<code>hasEven</code>（是否有偶数，用 some）、<code>allPositive</code>（是否全正数，用 every）、<code>firstNegative</code>（第一个负数，用 find，没有则 undefined）。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = [1, -2, 3]</code><br />输出：<code>{ hasEven: false, allPositive: false, firstNegative: -2 }</code>' },
    ],
    hint: '分别用 some、every、find 实现。',
    testCases: [
      { args: [[1, -2, 3]], expected: { hasEven: false, allPositive: false, firstNegative: -2 } },
      { args: [[2, 4, 6]], expected: { hasEven: true, allPositive: true, firstNegative: undefined } },
      { args: [[-1, -3]], expected: { hasEven: false, allPositive: false, firstNegative: -1 } },
    ],
  },
  {
    num: 15, title: '对象 keys/values/entries', fnName: 'objectSummary', params: 'obj',
    desc: '<p>编写函数 <code>objectSummary(obj)</code>，接收一个对象，返回一个对象，包含：<code>keys</code>（所有键数组）、<code>values</code>（所有值数组）、<code>count</code>（键的数量）。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>obj = { a: 1, b: 2 }</code><br />输出：<code>{ keys: ["a","b"], values: [1,2], count: 2 }</code>' },
    ],
    hint: 'Object.keys / Object.values。',
    testCases: [
      { args: [{ a: 1, b: 2 }], expected: { keys: ["a", "b"], values: [1, 2], count: 2 } },
      { args: [{}], expected: { keys: [], values: [], count: 0 } },
    ],
  },
  {
    num: 16, title: '字符串处理实战', fnName: 'formatName', params: 'firstName, lastName',
    desc: '<p>编写函数 <code>formatName(firstName, lastName)</code>，返回格式化全名，规则：首字母大写、其余小写，用空格连接。例如 <code>formatName("john", "DOE")</code> 返回 <code>"John Doe"</code>。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>firstName="john", lastName="DOE"</code><br />输出：<code>"John Doe"</code>' },
    ],
    hint: '用 slice 或 charAt 取首字母，toUpperCase/toLowerCase 转换。',
    testCases: [
      { args: ["john", "DOE"], expected: "John Doe" },
      { args: ["ALICE", "smith"], expected: "Alice Smith" },
      { args: ["bob", "lee"], expected: "Bob Lee" },
    ],
  },
  {
    num: 17, title: '模拟微任务宏任务', fnName: 'taskOrder', params: 'tasks',
    desc: '<p>编写函数 <code>taskOrder(tasks)</code>，接收一个任务数组，每个任务对象为 <code>{ name, type }</code>，其中 <code>type</code> 是 <code>"sync"</code>（同步）或 <code>"micro"</code>（微任务）或 <code>"macro"</code>（宏任务）。返回按执行顺序排列的名字数组（同步先执行，然后微任务，最后宏任务，同类型按原顺序）。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>tasks = [{name:"A",type:"sync"},{name:"B",type:"macro"},{name:"C",type:"micro"},{name:"D",type:"sync"}]</code><br />输出：<code>["A","D","C","B"]</code>' },
    ],
    hint: '按 sync → micro → macro 的顺序分组，同组保持原顺序。',
    testCases: [
      { args: [[{ name: "A", type: "sync" }, { name: "B", type: "macro" }, { name: "C", type: "micro" }, { name: "D", type: "sync" }]], expected: ["A", "D", "C", "B"] },
      { args: [[{ name: "x", type: "micro" }, { name: "y", type: "sync" }]], expected: ["y", "x"] },
      { args: [[]], expected: [] },
    ],
  },
  {
    num: 18, title: '深拷贝进阶', fnName: 'deepClone2', params: 'obj',
    desc: '<p>编写函数 <code>deepClone2(obj)</code>，实现深拷贝，能处理循环引用（对象引用自身）的情况。修改副本不影响原对象。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>obj = { a: 1 }; obj.self = obj;</code><br />输出：副本也有 self 指向自身，且与原件独立' },
    ],
    hint: '用 WeakMap 记录已拷贝过的对象，遇到重复引用直接返回已拷贝的副本。',
    testCases: [
      { args: [{ a: 1, b: { c: 2 } }], expected: { a: 1, b: { c: 2 } } },
      { args: [[1, [2, 3]]], expected: [1, [2, 3]] },
    ],
  },
  {
    num: 19, title: '正则提取数字', fnName: 'extractNumbers', params: 'str',
    desc: '<p>编写函数 <code>extractNumbers(str)</code>，用正则提取字符串中所有的连续数字，返回数字数组（转为 Number）。例如 <code>extractNumbers("a1b22c333")</code> 返回 <code>[1, 22, 333]</code>。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>str = "a1b22c333"</code><br />输出：<code>[1, 22, 333]</code>' },
    ],
    hint: '用 match(/\d+/g)，再 map(Number)。',
    testCases: [
      { args: ["a1b22c333"], expected: [1, 22, 333] },
      { args: ["abc"], expected: [] },
      { args: ["1"], expected: [1] },
      { args: ["price: 100, qty: 5"], expected: [100, 5] },
    ],
  },
  {
    num: 20, title: '对象数组按字段去重', fnName: 'uniqueByKey', params: 'arr, key',
    desc: '<p>编写函数 <code>uniqueByKey(arr, key)</code>，接收对象数组和字段名，按该字段去重（保留第一个出现的），返回新数组。</p>',
    examples: [
      { title: '示例 1', body: '输入：<code>arr = [{id:1},{id:2},{id:1}], key="id"</code><br />输出：<code>[{id:1},{id:2}]</code>' },
    ],
    hint: '用 Set 或 Map 记录已出现的 key 值。',
    testCases: [
      { args: [[{ id: 1 }, { id: 2 }, { id: 1 }], "id"], expected: [{ id: 1 }, { id: 2 }] },
      { args: [[{ name: "a" }, { name: "b" }], "name"], expected: [{ name: "a" }, { name: "b" }] },
    ],
  },
];

module.exports = { stage1, stageAdvance, stage2, stage4 };
