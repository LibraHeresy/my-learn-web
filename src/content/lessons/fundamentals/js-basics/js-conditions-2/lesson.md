# 条件判断进阶 — 逻辑运算符与 truthy/falsy

:::analogy
一个条件只够判断"对或错"，现实中的判断往往更复杂——就像乐团录取考试：音准**并且**节奏都合格才能录取，主修钢琴**或者**小提琴任一通过即可进入复试。
:::

:::prerequisite
**本节你需要知道这些词（上一课已学）：**

- **if / else if / else**：用 `if (条件) { ... }` 让代码走不同分支
- **比较运算符**：会用 `===`、`>`、`<` 做比较
- **布尔值**：知道条件最终会变成 `true` 或 `false`
:::

:::explain{title="本节地图 🗺️（约 20 分钟）"}
上一课学了基础判断，这一节学会"组合条件"：

1. **`&&`（并且）** — 所有条件都满足才通过
2. **`||`（或者）** — 任意一个条件满足即可
3. **truthy / falsy** — 条件里可以直接放变量，JS 会自动转 true/false
4. **实际应用** — 表单校验、权限判断、搜索筛选

最后动手练习把 `&&` 条件加进判断链、并扩展新的分支。
:::

:::explain{title="六、逻辑运算符 && 和 || — 组合多个条件"}
现实中，判断往往不是单条件的。"只有用户名和密码都正确才让登录"、"如果余额不足或者信用卡过期就拒绝支付"——这时你需要 `&&`（并且）和 `||`（或者）。

**&&（逻辑与）—— 所有条件都要满足：**

```js
// 登录：用户名 AND 密码都必须填写
let username = document.querySelector("#username").value;
let password = document.querySelector("#password").value;

if (username !== "" && password !== "") {           // && = 两边都要为 true
  console.log("表单填写完整，可以提交");             // 用户名和密码都不为空才进这里
} else {
  console.log("请填写用户名和密码！");               // 任意一个为空就进这里
}
// 如果 username = "小明", password = ""（密码没填）
// username !== "" → true，但 password !== "" → false
// true && false → false → 走进 else 分支
```

**&& 真值表：**
| 左边 | 右边 | 结果 |
|------|------|-----------|
| `true` | `true` | `true` |
| `true` | `false` | `false` |
| `false` | `true` | `false` |
| `false` | `false` | `false` |

记住：**&& 两边都为 true 结果才是 true**。就像安检——每一道门都必须通过。

**||（逻辑或）—— 任意一个条件满足即可：**

```js
// 天气预警：温度太高 OR 太低都要提醒
let temperature = 38;

if (temperature > 35 || temperature < 5) {          // || = 任意一边为 true 就行
  console.log("极端天气预警！请注意防护。");          // 38 > 35 → true，条件成立
}

// 如果 temperature = 20
// 20 > 35 → false，20 < 5 → false
// false || false → false → 不执行 if 分支
```

**|| 真值表：**
| 左边 | 右边 | 结果 |
|------|------|-----------|
| `true` | `true` | `true` |
| `true` | `false` | `true` |
| `false` | `true` | `true` |
| `false` | `false` | `false` |

记住：**|| 只要有一边为 true 结果就是 true**。就像火灾报警——烟雾探测器 OR 温度传感器任意一个触发就拉警报。

**组合使用 && 和 ||：**

```js
// 购物车结算条件：必须有收货地址，并且（余额充足 OR 有优惠券）
let hasAddress = true;                             // 有收货地址
let balanceEnough = false;                         // 余额不足
let hasCoupon = true;                              // 但有优惠券

if (hasAddress && (balanceEnough || hasCoupon)) {  // 用小括号控制优先级
  console.log("可以下单！");                        // true && (false || true) = true && true = true
} else {
  console.log("不满足下单条件");
}
```

**小括号控制运算顺序**，就像数学里的 `2 * (3 + 4)`——括号里的先算。
:::

:::explain{title="七、truthy 和 falsy — 条件里不只有 true/false"}
在条件判断的小括号里，你不仅可以写 `score >= 60` 这种比较表达式，还可以直接放变量。JavaScript 会把任何值自动转换成 `true` 或 `false`：

**falsy 值（这 6 个值在条件中会被当成 false）：**
```js
if (false)      { ... }  // false —— 布尔 false
if (0)          { ... }  // false —— 数字 0
if (-0)         { ... }  // false —— 负零
if ("")         { ... }  // false —— 空字符串
if (null)       { ... }  // false —— null
if (undefined)  { ... }  // false —— undefined
if (NaN)        { ... }  // false —— NaN（非数字）
```

**truthy 值（除以上 7 个之外，都是 truthy，在条件中被当成 true）：**
```js
if (true)       { ... }  // true
if (42)         { ... }  // true —— 非零数字
if (-42)        { ... }  // true —— 非零负数也是 truthy！
if ("hello")   { ... }  // true —— 非空字符串
if (" ")        { ... }  // true —— 空格也是非空字符串！
if ("0")        { ... }  // true —— 字符串 "0" 不是数字 0！
if ("false")    { ... }  // true —— 字符串 "false" 是非空字符串！
if ([])         { ... }  // true —— 空数组
if ({})         { ... }  // true —— 空对象
```

**实用场景：检查用户是否输入了内容**
```js
let answer = document.querySelector("#answer").value;

// 不需要写 answer !== ""，直接利用 falsy 特性：
if (answer) {                                      // 如果 answer 不是空字符串（truthy）
  console.log("用户输入了：" + answer);
} else {                                           // 如果 answer 是空字符串（falsy）
  console.log("用户什么都没输入");
}
```

**常见陷阱提醒：**
```js
// 注意：字符串 "0" 是 truthy！（它是非空字符串）
if ("0") {
  console.log("执行了！");  // ← 会执行！因为 "0" 是 truthy
}

// 数组和对象即使是空的，也是 truthy
if ([]) {
  console.log("执行了！");  // ← 会执行！
}
// 如果要检查数组是否为空，应该用：if (arr.length > 0) { ... }
```
> 这是对 js-types 中学过的 truthy/falsy 概念的复习和应用。如果你忘了这些，可以回去翻一翻。
:::

:::example{title="看例子：作曲家竞猜"}
打开 `script.js`，你会看到下面的完整代码。每一行都有注释——注意看 if/else if/else 的分支结构是如何工作的：

```js
// ===== 第一步：获取页面元素 =====
let btn = document.querySelector("#submitBtn");    // 提交按钮
let result = document.querySelector("#result");    // 结果显示区域

// ===== 第二步：绑定点击事件 =====
btn.addEventListener("click", function() {
  // 获取用户输入的文字（在点击时才获取，不是在页面加载时）
  let answer = document.querySelector("#answer").value;

  // ===== 第三步：条件判断 —— 三个分支 =====
  if (answer === "肖邦") {                          // 分支 1：回答正确
    // 条件成立：用户输入了 "肖邦"
    result.style.color = "#5B8C5A";                // 文字变绿色
    result.textContent = "答对了！肖邦确实是钢琴诗人。";
  } else if (answer === "") {                      // 分支 2：什么都没输入
    // 条件成立：输入框是空的（answer 是空字符串，falsy）
    result.style.color = "#C9A96E";                // 文字变金色
    result.textContent = "请先输入一个名字哦 ~";     // 友好提示
  } else {                                         // 分支 3：回答了但不对
    // 前两个条件都不成立 → 输入了但答案不对
    result.style.color = "#8B2E2E";                // 文字变红色
    result.textContent = "再想想？提示：他是波兰人";  // 错误提示 + 线索
  }
});

// ===== 执行流程演示 =====
// 情况 A：用户在输入框输入 "肖邦" → 点击提交
//   → answer = "肖邦"
//   → if (answer === "肖邦") → true
//   → 执行分支 1：绿色文字 "答对了！"
//   → 跳过 else if 和 else（不再检查）

// 情况 B：用户什么也没输入 → 点击提交
//   → answer = ""
//   → if (answer === "肖邦") → false（跳过）
//   → else if (answer === "") → true
//   → 执行分支 2：金色文字 "请先输入一个名字哦 ~"
//   → 跳过 else

// 情况 C：用户输入 "李白" → 点击提交
//   → answer = "李白"
//   → if (answer === "肖邦") → false（跳过）
//   → else if (answer === "") → false（"李白" 不是空字符串，跳过）
//   → 执行 else 分支 3：红色文字 "再想想？"
```

切换到预览区，分别用"肖邦"、空输入、以及一个错误的人名测试，观察三种不同的反馈。同一段代码，根据输入走出了三条不同的路——这就是条件判断的力量。
:::

:::example{title="常见错误——看看你踩过几个坑？"}

**错误 1：把 =（赋值）当成 ===（比较）来用**

```js
let score = 85;

// ❌ 错误：if 条件里写了 =（一个等号），这是赋值，不是比较！
if (score = 100) {                                 // 这行不是"score 等于 100 吗"，
  console.log("满分！");                            // 而是"把 100 赋给 score，然后判断 100 是 truthy 还是 falsy"
}                                                  // 100 是 truthy → 条件永远成立！而且 score 的值被意外改成了 100！

console.log(score);  // 输出：100（被意外修改了！）

// ✅ 正确：用 === 比较
if (score === 100) {                               // "score 等于 100 吗？"
  console.log("满分！");
}
```

**为什么会犯这个错？** 在数学里 `=` 就是"等于"的意思。但在 JavaScript 里，`=` 是赋值，`===` 才是比较。刚开始写代码时大脑还没切换过来。解决办法：心里默念"一个等号是赋值，三个等号是比较"。

**= vs === 速查：**
```js
let x = 5;          // 一个 =：赋值——把 5 放进 x
x === 5;            // 三个 ===：比较——x 等于 5 吗？（返回 true）
```

**错误 2：忘记写花括号 {}**

```js
// ❌ 错误：if 后面只有一行代码时可以省略花括号，但很容易忘记加第二行
if (score >= 60)
  console.log("及格");                             // 这行受 if 控制
  console.log("继续加油");                         // ⚠️ 这行不受 if 控制！缩进是骗人的！
// 不管 score 是多少，"继续加油" 都会打印！

// ✅ 正确：始终写花括号，即使只有一行
if (score >= 60) {
  console.log("及格");
  console.log("继续加油");                          // 明确在花括号里，受 if 控制
}
```

**JavaScript 不会看缩进——它只看花括号。** 没有花括号时，`if` 只管紧随其后的第一行代码。第二行就跟 `if` 无关了。

**错误 3：else if 条件顺序写反了**

```js
let age = 25;

// ❌ 错误：宽泛条件写前面
if (age > 0) {                                     // 25 > 0 → true，走进这里！
  console.log("人类");                              // 输出：人类
} else if (age > 18) {                             // ⚠️ 这个条件永远不会被检查
  console.log("成年人");
} else if (age > 60) {                             // ⚠️ 同样永远不会被检查
  console.log("老年人");
}

// ✅ 正确：严格条件在前，宽泛条件在后
if (age > 60) {                                    // 先判断最严格的
  console.log("老年人");
} else if (age > 18) {                             // 再判断次严格的
  console.log("成年人");
} else if (age > 0) {                              // 最后判断最宽泛的
  console.log("少年儿童");
}
```

**错误 4：字符串 vs 数字的 === 比较失败**

```js
// 用户输入始终是字符串！即使用户在输入框里打了数字
let userInput = document.querySelector("#age").value;  // 用户输入 "25"
console.log(typeof userInput);  // 输出："string"（是字符串，不是数字！）

// ❌ 错误：用数字去和字符串比较
if (userInput === 25) {                            // "25" === 25 → false！
  console.log("年龄是 25");                         // 永远不会执行！
}

// ✅ 正确方案 1：用字符串比较
if (userInput === "25") {                          // "25" === "25" → true
  console.log("年龄是 25");
}

// ✅ 正确方案 2：先转成数字再比较
if (Number(userInput) === 25) {                    // Number("25") 变成 25 → 25 === 25 → true
  console.log("年龄是 25");
}
```

**错误 5：混淆 && 和 || 的逻辑**

```js
// 检查年龄是否是青少年（13~19 岁）
let age = 15;

// ❌ 错误：用 && 但条件写反了
if (age >= 13 && age >= 20) { ... }                // 不可能同时 >= 13 又 >= 20 除非 >= 20

// ❌ 错误：用 || 而不是 &&
if (age >= 13 || age <= 19) { ... }                // 每个人都会满足！（比如 5 <= 19 是 true）
// || 表示"或者"，5 >= 13 是 false，但 5 <= 19 是 true，false || true = true

// ✅ 正确：用 &&，正确设置边界
if (age >= 13 && age <= 19) {                      // 13 到 19 之间
  console.log("青少年");
}
```

:::

:::explain{title="八、实际工作中你会用条件判断来做什么？"}
条件判断是业务逻辑的骨架。来看看你每天会写的真实代码模式：

**场景 1：表单验证**
```js
// 注册表单——每个字段都要检查
let username = document.querySelector("#username").value;
let email = document.querySelector("#email").value;
let password = document.querySelector("#password").value;

if (username === "") {                             // 用户名为空
  showError("请输入用户名");
} else if (username.length < 3) {                  // 用户名太短
  showError("用户名至少需要 3 个字符");
} else if (email === "") {                         // 邮箱为空
  showError("请输入邮箱");
} else if (!email.includes("@")) {                 // 邮箱不含 @
  showError("请输入有效的邮箱地址");
} else if (password.length < 6) {                  // 密码太短
  showError("密码至少需要 6 位");
} else {
  submitForm();                                    // 全部通过，提交表单
}
```

**场景 2：权限控制**
```js
// 根据用户角色显示不同的界面
let userRole = "editor";                           // 从后端获取的用户角色

if (userRole === "admin") {                        // 管理员
  document.querySelector("#admin-panel").style.display = "block";  // 显示管理面板
  document.querySelector("#delete-btn").style.display = "block";   // 显示删除按钮
} else if (userRole === "editor") {                // 编辑者
  document.querySelector("#admin-panel").style.display = "none";   // 隐藏管理面板
  document.querySelector("#delete-btn").style.display = "none";    // 隐藏删除按钮
  document.querySelector("#edit-btn").style.display = "block";     // 显示编辑按钮
} else {                                           // 普通访客
  document.querySelector("#edit-btn").style.display = "none";      // 隐藏编辑按钮
  // 访客只能看，不能编辑
}
```

**场景 3：价格展示**
```js
// 根据是否是会员、是否有折扣活动来显示不同价格
let isVip = true;                                  // 是否 VIP 会员
let hasPromotion = true;                           // 是否有促销活动
let originalPrice = 199;                           // 原价
let finalPrice;                                    // 最终价格

if (isVip && hasPromotion) {                       // VIP 且赶上促销 → 最大折扣
  finalPrice = originalPrice * 0.6;                // 6 折
  document.querySelector("#badge").textContent = "VIP 专享价";
} else if (isVip) {                                // VIP 但没促销 → 常规 VIP 折扣
  finalPrice = originalPrice * 0.8;                // 8 折
  document.querySelector("#badge").textContent = "VIP 价";
} else if (hasPromotion) {                         // 非 VIP 但赶上促销 → 普通折扣
  finalPrice = originalPrice * 0.9;                // 9 折
  document.querySelector("#badge").textContent = "促销价";
} else {                                           // 啥也不是 → 原价
  finalPrice = originalPrice;
  document.querySelector("#badge").textContent = "";
}
```

**场景 4：数据过滤**
```js
// 根据用户选择的筛选条件过滤列表
let filterType = "completed";                      // 用户选了 "已完成"
let tasks = [                                      // 待办事项列表
  { title: "写周报", status: "completed" },
  { title: "修 bug", status: "in-progress" },
  { title: "开会", status: "completed" },
];

tasks.forEach(function(task) {                     // 遍历每个任务
  if (filterType === "all") {                      // 显示全部
    console.log(task.title);
  } else if (task.status === filterType) {         // 状态匹配的才显示
    console.log(task.title);                       // 输出：写周报、开会
  }
});
```
:::


:::task{title="动手试试 ✨"}

::::step{purpose="`&&`（逻辑与）让你把多个条件绑在一起——全部满足才通过。就像'只有既是20世纪、又是波兰作曲家'才归入某个分类。`&&` 和 `||` 是构建复杂判断的核心工具。" expected="只有当两个条件都满足时，才执行该分支的代码。如果只满足一个，则跳过这个分支走到下一个判断。"}
1. 打开 `script.js`
2. 在 `if (answer === "肖邦")` 这一行后面，添加一个额外的条件：答案等于"肖邦"**并且**长度大于 1：
   ```js
   if (answer === "肖邦" && answer.length > 1) {
   ```
3. 切换到预览区，输入「肖邦」，点击提交
4. 确认仍然显示绿色正确提示（两个条件都满足）
5. 把 `>` 改成 `<`：
   ```js
   if (answer === "肖邦" && answer.length < 1) {
   ```
6. 再次输入「肖邦」提交——观察发生了什么变化？
7. 思考：为什么条件不成立了？（因为 `"肖邦".length` 是 2，不小于 1）
::::

::::step{purpose="练习扩展条件分支——不是简单地加一个 if，而是在 `if → else if → else if → else` 链中找到合适的位置插入。每个分支处理一种特定情况，分支之间互斥。" expected="输入「李四」→ 显示特殊提示（既不是「正确」的绿色，也不是「错误」的红色，而是第三种独特反馈）；输入其他名字 → 显示通用的错误提示。你的判断逻辑更精细了。"}
挑战：在已有的 if-else if-else 链中增加一个新分支。

1. 打开 `script.js`
2. 在 `if (answer === "肖邦") { ... }` 这个分支和 `else if (answer === "") { ... }` 之间，插入一个新的 `else if` 分支：
   ```js
   } else if (answer === "李四") {
     result.style.color = "#4A90D9";              // 蓝色文字
     result.textContent = "李四也是一位伟大的作曲家，但标准答案是肖邦哦~";
   ```
3. 注意：新分支要放在 `answer === ""` 的判断**之前**（因为"李四"不是空字符串，如果放在空字符串判断后面，空字符串会先被检查）
4. 切换到预览区，输入「李四」，点击提交——确认看到蓝色的特殊提示
5. 再输入「肖邦」和空值，确认原有的两个分支仍然正常工作
6. 你刚刚成功扩展了一个三层判断为四层判断！
::::

:::

:::recap
这一节你学会了组合条件——让判断逻辑更精细。

**核心语法回顾：**
- `&&`（并且） — 两边都为 `true` 结果才是 `true`
- `||`（或者） — 任意一边为 `true` 结果就是 `true`
- 小括号 `()` 控制运算顺序——`hasAddress && (balanceEnough || hasCoupon)`
- **falsy 值**：`false`、`0`、`""`、`null`、`undefined`、`NaN`——其余都是 truthy
- 常见陷阱：字符串 `"0"` 和空数组 `[]` 都是 truthy！

**下一课**你将学习**数组**——把大量数据组织起来，用循环批量处理。
:::
