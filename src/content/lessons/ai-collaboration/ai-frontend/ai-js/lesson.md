# 用 AI 写逻辑

:::analogy
AI 能写出一段排序算法，但只有你知道这段排序该在用户点击"价格排序"按钮时触发、触发前先显示 loading、排序结果还要同步更新到 URL 参数里。AI 写动作，你设计时机和上下文。

:::

:::prerequisite
你已经学过 JavaScript 基础：变量、函数、数组方法、对象、异步（Promise/async-await）、事件处理、DOM 操作。

:::

:::explain{title="一、你的问题"}
你让 AI 写一个"过滤并排序列表"的函数，它给你一段代码——语法正确、逻辑看起来合理。但你不确定：它处理了空数组吗？参数是 `null` 时会炸吗？用户如果连续快速点击，会出竞态问题吗？你需要的不只是"能跑的函数"，而是"在各种边界条件下都不出 bug 的函数"。
:::

:::explain{title="二、解决方案：JS 四步审查法"}
拿到 AI 生成的 JavaScript 后，按这四个步骤逐一检查。每一步只做一件事，不要跳过。

### 第 1 步：读逻辑——这段代码在做什么？

逐行读，每一行都问自己："为什么这一行在这里？"如果有一行你说不出原因——标记它，问 AI 解释，或者删掉。**任何你不理解的代码，不要让它留在你的项目里。**

```js
// AI 生成的代码——你能讲清楚每一行吗？
function sortProducts(products, key, order = 'asc') {
  const sorted = [...products].sort((a, b) => {
    const valA = a[key]
    const valB = b[key]
    if (typeof valA === 'string') {
      return order === 'asc' 
        ? valA.localeCompare(valB) 
        : valB.localeCompare(valA)
    }
    return order === 'asc' ? valA - valB : valB - valA
  })
  return sorted
}
```

逐行注解：第 1 行——用展开运算符 `[...products]` 创建副本，不修改原数组（好习惯）。第 2-3 行——取出比较值。第 4-7 行——字符串用 `localeCompare` 比较（支持中文排序），数字用减法。第 5-6 行——根据 `order` 决定排序方向。

如果代码里有 `reduce` 嵌套 `filter` 再嵌套 `map`，而你看着头晕——这是红灯信号。让 AI 把它拆成 3 个独立的步骤，分别解释。

### 第 2 步：找边界——输入不正常时会怎样？

这是 AI 最容易翻车的地方。AI 擅长写"正常输入 → 正常输出"的代码。但你项目里的输入不总是正常的。

对这个排序函数，边界测试清单：
- `products` 是空数组 `[]` → 返回 `[]`。通过。
- `products` 是 `null` 或 `undefined` → 第一行 `[...products]` 会报错。未处理。
- `key` 对应的属性在某些对象里不存在 → `valA` 是 `undefined`，`typeof undefined === 'undefined'`，走数字分支，`undefined - undefined = NaN`，排序结果错乱。未处理。
- `order` 是 `'random'` 或其他无效值 → 走默认行为（降序），不会报错但行为不可预期。边界模糊。

**边界测试的思维方式：对于每个参数，问自己——如果是空值、极端值、错误类型，代码会怎样？**

### 第 3 步：看副作用——这个函数在偷偷做什么？

- **是否修改了传入的参数？** `sort()` 会修改原数组——AI 用了 `[...products]` 创建副本，这点做对了。但很多 AI 生成的代码不会这么小心——直接 `products.sort(...)`，导致原始数据被改了，其他地方莫名其妙出 bug。
- **是否依赖了全局变量？** 函数体内有没有引用外部变量？如果有，它就不可复用、不可测试。
- **是否有异步但没有处理竞态？** 假设这是一个带 API 调用的函数，用户连续点了 3 次排序，3 次请求都发出去了。最早发出的第 1 次请求最慢——3 秒后它的结果才返回，并覆盖了后两次请求的结果，而页面此刻显示的是第 3 次点排序的结果，数据却是第 1 次的。这个 bug 叫"竞态条件"（Race Condition）。AI 生成的异步代码几乎从来不处理它。

### 第 4 步：跑测试——动手执行，不要只看

在浏览器控制台或 Node.js 里手动调几次：
```js
// 正常情况
sortProducts([{name:'C'},{name:'A'},{name:'B'}], 'name', 'asc')
// 预期：[{name:'A'},{name:'B'},{name:'C'}]

// 空数组
sortProducts([], 'name')

// 参数为 null
sortProducts(null, 'name')  // 应该优雅处理，而不是报错

// 中文排序
sortProducts([{name:'苹果'},{name:'香蕉'},{name:'橙子'}], 'name')
// 预期：['橙子','苹果','香蕉']（按拼音）

// 缺失 key
sortProducts([{name:'A'},{title:'B'},{name:'C'}], 'name')
// 预期：有 name 的放到前面，没有的放后面，而不是返回 NaN 乱序
```

:::

:::hint{title="不要只测正常输入"}
AI 生成的代码在正常输入下正确率有 90%+。所以你手动测试时，应该 80% 的精力测异常输入（空值、边界值、并发操作），20% 的精力确认正常输入没问题。
:::


**实战：AI 生成的异步函数审查**

让 AI 写一个搜索函数：
```
写一个 searchUsers 函数，接收搜索关键词，调用 /api/users?q=keyword，返回用户列表。
```

AI 生成了：
```js
async function searchUsers(keyword) {
  const res = await fetch(`/api/users?q=${keyword}`)
  const data = await res.json()
  return data
}
```

四步审查：
- **第 1 步（读逻辑）：** 看起来很简单——发请求、解析 JSON、返回。但 URL 参数没有编码（`encodeURIComponent`）。如果 keyword 是 "张&李"，URL 就断了。
- **第 2 步（找边界）：** keyword 为空字符串？→ API 收到 `q=`，可能返回全部用户（非预期）。res 不是 200？→ `res.json()` 可能解析到错误响应，调用方不知道出错了。网络断开？→ fetch 抛异常，没人 catch。
- **第 3 步（看副作用）：** 用户快速输入 "z" "zh" "zha" "zhan" "zhang" ——发 5 次请求。第 5 次可能最先返回，但第 1 次最后返回并覆盖了第 5 次的结果。典型竞态条件。
- **第 4 步（跑测试）：** 在 Console 里用 DevTools 的 Network throttling 模拟慢网速，快速调用 5 次——观察最终显示的到底是哪个关键词的结果。

**要求 AI 修复后：**
```js
let abortController = null

async function searchUsers(keyword) {
  // 取消上一次未完成的请求——解决竞态
  if (abortController) abortController.abort()
  abortController = new AbortController()

  const encoded = encodeURIComponent(keyword)
  try {
    const res = await fetch(`/api/users?q=${encoded}`, {
      signal: abortController.signal
    })
    if (!res.ok) throw new Error(`请求失败: ${res.status}`)
    return await res.json()
  } catch (err) {
    if (err.name === 'AbortError') return []  // 被取消的请求，正常忽略
    throw err  // 真正的错误，抛给调用方
  }
}
```

修复了三件事：URL 编码、错误处理、竞态控制。加了多少行？15 行。但如果没有这 15 行，搜索功能在慢网速下就是个 bug 制造机。
:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：只看正常流程，不测异常。**
> "代码能跑，没问题" → 上线后用户输入一个特殊字符 → 页面白屏。
AI 的"能跑"不等于你的"能上线"。你必须在异常输入下亲手跑一遍。

**错误 2：AI 用了高级语法你看不懂，但硬着头皮用了。**
> `const result = data?.items?.reduce((acc, { id, ...rest }) => ({...acc, [id]: rest }), {})` → "虽然看不懂但好像能用。"
这是定时炸弹。一周后这个数据结构要改，你改不动，因为你看不懂。让 AI 用更直白的方式重写，或者让 AI 逐行解释到你能给同事讲清楚为止。

**错误 3：忽略异步代码的时序问题。**
> AI 写了一个 setInterval 做倒计时 → 组件卸载后定时器还在跑 → 内存泄漏 + 控制台报错。
任何异步操作（setTimeout、setInterval、fetch、addEventListener），你都要问：它什么时候开始、什么时候结束、什么情况下不会被清理？
:::

:::explain{title="四、实际工作中你会怎么用？"}
- **写工具函数：** 项目里需要日期格式化、金额格式化、深拷贝这些通用工具。让 AI 生成函数框架 → 你审查边界（null 值、特殊日期、超大金额）→ 补充测试用例 → 放进项目的 utils 目录。这比从零写快 3 倍，质量还更高（因为 AI 会考虑到你漏掉的 ISO 日期格式）。
- **重构老代码：** 同事留下一个 200 行的函数，逻辑混乱。你把代码贴给 AI："在不改变功能的前提下，把这段代码拆成 4-5 个小函数，每个不超过 30 行。"AI 拆分 → 你验证功能是否等价 → 写注释说明每个小函数的职责。
- **API 对接：** 后端给了你文档，里面 12 个接口。你把文档贴给 AI："生成 12 个对应的 API 请求函数，统一错误处理、请求超时 10 秒、返回类型标注。"AI 生成 12 个函数模板 → 你检查 URL 路径、参数名、返回字段是否和文档一致。

:::

:::task{title="JS 审查与边界测试实战"}
::::step{id="1"}
让 AI 写一个"表单验证函数"：校验用户名（2-20 字符）、邮箱（含 @）、密码（至少 8 位、含数字和字母）、手机号（中国大陆格式）。返回所有错误的数组。
::::
::::step{id="2"}
用四步审查法审查 AI 生成的代码。第 1 步：逐行写出每行代码的作用。第 2 步：列出至少 8 种边界输入（空字符串、纯空格、超长字符串、null、undefined、特殊字符如 <script>、emoji 如 🎉、中文邮箱）。第 3 步：检查参数是否被修改、是否有全局依赖。第 4 步：在浏览器控制台里跑你的 8 个边界测试用例。
::::
::::step{id="3"}
让 AI 修复你在边界测试中发现的问题。每轮只提 2 个问题。迭代 2-3 轮，直到所有边界用例通过。
::::
::::step{id="4"}
对比第一版和最终版的代码：最终版多了哪些处理？哪些处理是 AI 主动加的、哪些是你要求加的？写下你的发现。
::::
:::


:::recap
AI 写 JavaScript 在正常路径上正确率 90%+，但在边界条件上极易翻车。四步审查法：读逻辑（逐行能讲清楚）、找边界（空值、极端值、错误类型时怎样）、看副作用（是否修改入参、是否有全局依赖、是否有竞态）、跑测试（80% 精力测异常输入）。任何你不理解的代码不要留在项目里——要么问 AI 解释到懂，要么删掉重写。

:::
