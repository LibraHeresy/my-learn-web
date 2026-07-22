# "错误处理 — 给代码上\"保险\""

:::analogy
写代码就像开车——你不可能保证永远不出事故。但你可以系安全带、买保险、装安全气囊。try/catch 就是程序的安全气囊：出事了不会车毁人亡，而是弹出保护，让你优雅地处理问题。
:::

:::prerequisite
**本节你需要知道这些词：**

- **函数**：一段可以重复调用的代码块，有输入（参数）和输出（返回值）
- **JSON**：一种数据交换格式，`JSON.parse()` 把 JSON 字符串转为 JS 对象
- **异常/错误**：程序执行中出现的非预期情况，不处理会导致程序崩溃
:::

:::explain{title="先看痛点——没有错误处理的代码有多脆弱？"}
假设你在做一个"用户设置"页面，用户可以在文本框里输入配置然后保存。你拿到用户的输入，试图把它解析成对象：

```js
// 用户输入的配置——但用户可能输错
const userInput = '{ "theme": "dark", "fontSize": 14'; // 注意：少了一个 }，JSON 不合法！

// 没有错误处理的代码——直接解析，赌它不出错
const config = JSON.parse(userInput);                  // 💥 SyntaxError: Unexpected end of JSON
console.log('主题：', config.theme);                   // 这一行永远不会执行

// 更糟的是——整个脚本崩溃了！
// 页面上其他按钮也不响应了，表单提交也挂了，什么都用不了
document.querySelector('#saveBtn').addEventListener('click', function() {
  console.log('保存按钮还能用吗？');                   // 不——这个事件监听也失效了
});
```

**一个没处理的错误，会让整个应用瘫痪**。你觉得用户会怎么想？——"这网站怎么点哪都没反应？"

真实世界远比 `JSON.parse` 复杂：
- 从 `localStorage` 读数据——数据可能被用户手动改坏
- 从后端 API 拉数据——网络可能断开，返回的可能不是 JSON
- 读取文件——文件可能不存在或损坏
- 调用第三方库——它可能抛出一个你意想不到的错误

**错误处理不是"高级技巧"，是代码能用的最低要求。**
:::

:::explain{title="try/catch — 给你的代码包上一层"安全网""}
`try` 块里放可能出错的代码，`catch` 块里放出错后的处理逻辑。语法就是 `try { ... } catch (变量名) { ... }`：

```js
// 用户输入——可能合法，也可能不合法
const userInput = '{ "theme": "dark", "fontSize": 14'; // 还是那个缺了 } 的输入

try {                                                  // "我要试着做这件事——"
  const config = JSON.parse(userInput);                // 解析 JSON——这里会出错
  console.log('配置加载成功：', config);               // 没出错才走到这
} catch (error) {                                      // "——如果出错了，做这件事"
  console.log('配置解析失败，使用默认配置');            // 告诉用户/开发者哪里出错了
  console.log('错误详情：', error.message);            // error.message 是具体的错误描述
  const config = { theme: 'light', fontSize: 14 };     // 出错了就用默认配置兜底
}

// 关键：不管 try 里出没出错，下面的代码照常执行！
console.log('程序继续运行——页面功能都正常');           // 这一行一定会输出
```

**`error` 对象**：`catch` 捕获到的错误对象有这些常用属性：
- `error.message`：人类可读的错误描述（"Unexpected end of JSON input"）
- `error.name`：错误类型名称（"SyntaxError"、"TypeError"等）
- `error.stack`：错误堆栈信息（显示错误发生在哪个文件的哪一行）
:::

:::explain{title="throw — 主动抛出错误，提前拦截非法输入"}
除了等待 JS 引擎报错，你还可以用 `throw new Error('描述')` **主动抛出错误**。这让你在问题进入更深的代码之前就拦住它：

```js
function setVolume(level) {                            // 设置音量的函数
  if (level < 0 || level > 100) {                     // 检查输入是否合法
    throw new Error('音量必须在 0-100 之间，收到：' + level); // 主动抛出错误 + 清晰的描述
  }                                                    // throw 之后的代码不会执行——和 return 一样
  console.log('音量已设置为：' + level);               // 只有 level 合法才走到这里
}

// 调用方用 try/catch 包裹
try {
  setVolume(150);                                      // 传入非法值
} catch (e) {
  console.log('设置失败：' + e.message);               // "设置失败：音量必须在 0-100 之间，收到：150"
}
```

**`throw` 的意义**：不是所有的错误都是 JS 引擎能自动发现的。比如参数超出范围、数据格式不对、业务逻辑矛盾——这些需要你主动检查并抛出。`throw` 就像安检员："这个行李超重了，过不去！"

**返回错误对象 vs 抛出错误**：你可以选择不 `throw`，而是 `return { error: true, message: '...' }`。两种方式各有适用场景——`throw` 适合"不应该发生"的严重问题，`return` 错误对象适合"可预期的"业务异常。
:::

:::example{title="实战：localStorage 安全读取——防御性编程的标准写法"}
`localStorage` 是浏览器存储，可以存字符串。但用户可能手动删改数据、浏览器可能清空存储、数据可能过期——任何一步都可能出错。下面的 `loadCollection` 展示了**防御性编程**的全貌：

```js
function loadCollection() {                            // 从 localStorage 安全读取收藏数据
  try {
    const raw = localStorage.getItem('my-collection'); // 第一步：尝试读取
    if (!raw) {                                        // 如果 localStorage 里根本没有这个 key
      console.log('localStorage 中没有数据，返回空数组');
      return [];                                       // 返回空数组而不是 null —— 让调用方省心
    }

    const data = JSON.parse(raw);                      // 第二步：尝试解析 JSON——可能报错
    if (!Array.isArray(data)) {                        // 第三步：验证数据结构——可能存了不是数组的东西
      throw new Error('localStorage 中存储的不是数组格式'); // 主动抛出，描述清晰
    }

    console.log('收藏数据加载成功，共 ' + data.length + ' 条');
    return data;                                       // 一切正常，返回解析后的数据
  } catch (e) {
    // 任何一步出错都会走到这里
    console.warn('读取收藏失败：' + e.message + '，已重置为空数组'); // warn 级别——不是致命错误
    return [];                                         // 出错了返回空数组——调用方不用判断 null
  }
}

// 调用方可以放心使用——永远拿到数组，永远不会崩溃
const collection = loadCollection();                    // 永远是数组（要么是真实数据，要么是 []）
collection.forEach(function(item) {                    // forEach 安全调用——空数组不会报错
  console.log(item.name);
});
```

**防御性编程的核心思维**：**假设任何可能出错的地方都会出错**，提前写好应对方案。你能想到的失败场景越多，你的代码就越健壮。
:::

:::explain{title="常见错误"}
**错误1：try 块太"胖"——把不该放的东西也放进去了**
```js
// ❌ 错误：把整段业务逻辑全塞进 try，出错了不知道是 JSON 解析的问题还是 DOM 操作的问题
try {
  const data = JSON.parse(userInput);                  // 可能出错
  const list = document.querySelector('#list');        // 基本不会出错——不该在 try 里
  data.forEach(item => {                               // 基本不会出错——不该在 try 里
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
} catch (e) {
  console.log('出错了');                               // 到底哪里出错了？说不清楚
}

// ✅ 正确：try 只包裹真正可能出错的 JSON.parse，其他代码在外面
let data;
try {
  data = JSON.parse(userInput);                        // try 只包裹会出错的 JSON 解析
} catch (e) {
  console.log('JSON 解析失败：' + e.message);          // 错误信息具体
  data = [];                                           // 使用默认值
}
// 下面的渲染逻辑在 try 外面，更清晰
const list = document.querySelector('#list');
data.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  list.appendChild(li);
});
```

**错误2：catch 块什么都不做——"吞掉"错误**
```js
// ❌ 错误：catch 里空的——错误被悄悄吞掉，你永远不知道出过问题
try {
  const data = JSON.parse(userInput);
} catch (e) {
  // 什么都不做——silent failure，最糟糕的错误处理方式
}

// ✅ 正确：至少要记录日志，让开发者知道发生了什么
try {
  const data = JSON.parse(userInput);
} catch (e) {
  console.warn('解析失败：' + e.message);              // 至少留个日志
  // 根据场景决定：是返回默认值？还是提醒用户？还是重试？
}
```

**错误3：catch 之后再 throw 但忘了处理**
```js
// ❌ 错误：catch 里又 throw——上层没有 try/catch，程序照样崩溃
function parseConfig(input) {
  try {
    return JSON.parse(input);
  } catch (e) {
    throw new Error('配置解析失败');                   // 又扔出去了！上层没人接
  }
}
parseConfig(badInput);                                 // 💥 程序崩溃

// ✅ 正确：要么在 catch 里彻底处理掉，要么确保上层有 try/catch
function parseConfig(input) {
  try {
    return JSON.parse(input);
  } catch (e) {
    console.warn('配置解析失败，使用默认值');
    return { theme: 'light' };                         // 彻底处理——返回默认值
  }
}
```
:::

:::task{title="动手试试 — 在 script.js 中实现 safeParse"}
本练习的所有代码都在 **`script.js`** 中。你需要在 `safeParse` 函数中用 `try/catch` 实现安全的 JSON 解析。

::::step{purpose="JSON.parse 是常见的'炸弹'——传入非法字符串就直接报错崩溃。try/catch 就是防爆服：把可能爆炸的代码放在 try 里，一旦炸了，catch 会接住它而不是让整个程序崩溃。" expected="传入合法 JSON 字符串时，返回解析后的 JS 对象——与直接调用 JSON.parse 的行为一致。"}
在 `script.js` 的 `safeParse` 函数中，用 `try` 包裹 `JSON.parse(str)` 的调用，将解析结果赋值给一个变量并返回
::::

::::step{purpose="catch 不只是'吞掉'错误，还可以把错误信息包装成友好的格式返回给调用者。这样调用者不需要 try/catch，直接检查返回值的 error 属性就知道是否出错了。这是防御性编程的核心思想。" expected="传入非法 JSON 字符串时，返回 { error: true, message: 'Unexpected token...' } 而不是报错崩溃。"}
在 `catch` 块中返回 `{ error: true, message: error.message }`——描述发生了什么错误
::::

::::step{purpose="测试两条分支（成功路径和失败路径）是确保 try/catch 正确实现的关键。就像消防演习既演练正常疏散，也演练电梯坏了怎么办——两条路径都验证过，你的代码才算可靠。" expected="控制台分别输出解析成功的对象和包含 error: true 的错误对象，程序没有崩溃。"}
分别传入合法 JSON（`{"name": "月光", "composer": "贝多芬"}`）和非法 JSON（`"这不是JSON"`），观察两种路径的输出
::::

:::

:::hint{title="实现提示"}
```js
function safeParse(str) {
  try {
    const result = JSON.parse(str);                    // 尝试解析 —— 可能报错
    return result;                                     // 成功则返回解析结果
  } catch (e) {                                        // e 是错误对象
    return { error: true, message: e.message };        // 失败返回错误对象而不是崩溃
  }
}
```
:::

:::recap
你学会了用 `try/catch` 给代码上保险——把可能出错的操作放在 `try` 里执行，出错时 `catch` 会接住它，程序不会崩溃。`throw new Error()` 让你主动抛出错误，提前拦截非法输入。核心思维是**防御性编程**：假设任何可能出错的地方都会出错，提前写好应对方案。这让你写出的代码能优雅降级——数据坏了就用默认值，网络断了就提示用户，而不是直接白屏或卡死。
:::
