# ES6 新语法 — 让代码更优雅的"新乐器"

:::analogy
ES6 就像把散落一地的工具装进了一个工具箱——以前你需要 5 行代码才能从对象里取 3 个属性，现在 1 行就够了。你写的代码越少，出 bug 的机会就越少。
:::

:::prerequisite
**本节你需要知道这些词：**

- **变量**：用来存储数据的容器，用 `let` 或 `const` 声明
- **函数**：一段可以重复调用的代码块，有输入（参数）和输出（返回值）
- **数组**：一组有序数据的集合，用 `[]` 表示
- **对象**：键值对的集合，用 `{}` 表示
:::

:::explain{title="本节地图 🗺️（约 25 分钟，六件现代武器）"}
这一节一次介绍 ES6 最常用的六种语法，每种都很短，逐个击破即可：

1. **解构赋值** — 从对象/数组里"批发"取值
2. **箭头函数** — 更短的函数（注意 this 不同）
3. **展开运算符 `...`** — 合并与复制
4. **模板字符串** — 告别 `+` 号拼接
5. **可选链 `?.`** — 安全访问深层属性
6. **空值合并 `??`** — 只在 null/undefined 时用默认值

最后有一个"实战串联"示例把所有语法串起来，动手任务就在它后面。
:::

:::explain{title="先看痛点——旧写法有多啰嗦？"}
假设后端 API 返回了一段用户数据，你要从中提取几个字段并组装成新的显示对象：

```js
// 后端返回的数据（实际可能嵌套更深）
const apiResponse = {                                // 整个 API 响应
  data: {                                            // 数据都在 data 里
    user: {                                          // 用户对象
      name: '张三',                                   // 用户姓名
      age: 28,                                       // 用户年龄
      email: 'zhangsan@example.com',                  // 用户邮箱
      address: {                                     // 地址是嵌套对象
        city: '上海',                                 // 城市
        district: '浦东新区'                           // 区域
      }
    }
  }
};

// 旧写法：一行一行手动取，繁琐且容易写错
const userName = apiResponse.data.user.name;          // 取姓名——点号链太长
const userAge = apiResponse.data.user.age;            // 取年龄——重复写前缀
const userEmail = apiResponse.data.user.email;        // 取邮箱——又写了一遍前缀
const userCity = apiResponse.data.user.address.city;  // 更深一层，更头疼

// 旧写法：字符串拼接——加号和引号满天飞
const info = '用户 ' + userName + '，' + userAge + ' 岁，住在 ' + userCity;
console.log(info);                                    // "用户 张三，28 岁，住在 上海"
```

这就是日常工作中的真实痛点：**数据提取啰嗦、字符串拼接眼花、一不小心就写错属性名**。ES6 的新语法就是为这些问题设计的。
:::

:::explain{title="解构赋值 — 从对象/数组中"批发"取值"}
解构赋值的本质：**一次性声明多个变量，同时从对象（或数组）中取出对应的值**。以前是零售，现在走批发。

```js
const apiResponse = {                                // 同上：后端返回的数据
  data: {
    user: {
      name: '张三',
      age: 28,
      email: 'zhangsan@example.com',
      address: { city: '上海', district: '浦东新区' }
    }
  }
};

// 对象解构：一行取出 name 和 age —— 比旧写法少写多少重复前缀？
const { name, age, email } = apiResponse.data.user;   // name='张三', age=28, email='zhangsan@...'
console.log(name, age);                               // "张三 28"

// 数组解构：从数组里按位置取
const scores = [92, 85, 78, 60];                      // 考试成绩数组
const [math, chinese, english] = scores;               // math=92, chinese=85, english=78 —— 只取前三个
console.log('数学：' + math);                          // "数学：92"

// 嵌套解构：直接深入嵌套结构
const { address: { city } } = apiResponse.data.user;  // 冒号表示"取 address 里的 city"
console.log(city);                                    // "上海"

// 解构时给默认值：属性不存在就用默认值
const { phone = '未填写' } = apiResponse.data.user;   // user 里没有 phone 字段
console.log(phone);                                   // "未填写" —— 不会报错
```

**实际工作场景**：React 组件里 `const { username, avatar } = props;`，Vue 里 `const { ref, reactive } = Vue;`，Node.js 里 `const { readFile, writeFile } = require('fs');`——解构无处不在。
:::

:::explain{title="箭头函数 — 更短的函数，但 this 不同"}
箭头函数有两个核心价值：**代码更短**，以及 **this 从外层继承**（在处理回调时极其有用）。

```js
// 旧写法：function 关键字占据很多视觉空间
const double = function(x) {                          // function 关键字 + 花括号 + return
  return x * 2;                                      // 只有一行逻辑却占了 3 行
};

// 箭头函数：单行表达式直接省略 return 和花括号
const double = (x) => x * 2;                          // 读作"接收 x，返回 x * 2"
console.log(double(5));                               // 10

// 多行逻辑：花括号里写，需要显式 return
const formatUser = (name, age) => {                   // 多参数需要括号
  const greeting = '你好，' + name;                   // 多行逻辑
  return greeting + '，你' + age + ' 岁了';            // 需要显式 return
};

// 只有一个参数时，参数括号可以省略
const greet = name => '你好，' + name;                // 等价于 (name) => '你好，' + name
```

**this 区别**：普通函数有自己的 `this`（指向调用者），箭头函数没有自己的 `this`（从定义时的外层继承）。这在你学到事件处理和 Promise 时会非常重要——先记住有区别就行。

```js
const team = {
  name: '前端开发组',
  showNormal: function() { console.log(this.name); }, // 普通函数：this=team → "前端开发组"
  showArrow: () => { console.log(this.name); }        // 箭头函数：this=window → undefined
};
team.showNormal();  // "前端开发组"
team.showArrow();   // undefined —— 箭头函数从外层（window）继承 this
```
:::

:::explain{title="展开运算符 ... — 合并与复制的利器"}
`...` 在"取值"位置就是**展开**：把数组或对象的每个元素/属性拆出来，放进新的容器。

```js
// 合并数组——旧写法：concat，要记住方法名
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];                    // [1, 2, 3, 4, 5, 6] —— 像把两盒积木倒在一起

// 复制数组（浅拷贝）
const copy = [...arr1];                               // [1, 2, 3] —— 新数组，修改 copy 不影响 arr1

// 合并对象——后写的属性覆盖先写的
const defaults = { theme: 'light', fontSize: 14 };    // 默认配置
const userPrefs = { theme: 'dark' };                  // 用户偏好（只改了 theme）
const final = { ...defaults, ...userPrefs };          // { theme: 'dark', fontSize: 14 } —— 用户覆盖了 theme
console.log(final.fontSize);                          // 14 —— fontSize 来自 defaults

// 复制对象并添加/覆盖属性——实战中最常用的模式
const oldState = { count: 0, name: 'counter' };       // 原始状态
const newState = { ...oldState, count: 1 };           // 只改 count，name 保持不变
console.log(oldState.count);                          // 0 —— 原对象没变！
console.log(newState.count);                          // 1 —— 新对象是新值
```

**实际工作场景**：React 中更新 state 必须用展开运算符创建新对象（不可变数据）、Redux reducer 中合并 action 数据、组合多个配置对象——你几乎每个项目都会用到 `...`。
:::

:::explain{title="模板字符串 — 告别 + 号拼接的痛苦"}
反引号 `` ` `` 包裹的字符串可以**直接嵌入变量和表达式**，写法是 `${表达式}`。

```js
const name = '张三';
const age = 28;
const city = '上海';

// 旧写法：加号和引号让人眼花——漏一个加号就报错
const old = '用户 ' + name + '，' + age + ' 岁，住在 ' + city;

// 模板字符串：变量直接嵌入 ${}，可读性天差地别
const modern = `用户 ${name}，${age} 岁，住在 ${city}`;  // 反引号包裹，${} 嵌入变量

// ${} 内部可以是任意 JS 表达式
const price = 99;
const count = 3;
const total = `总价：¥${price * count} 元`;           // ${}里写乘法——"总价：¥297 元"

// 多行字符串——旧写法要 \n，模板字符串直接换行
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>${age} 岁</p>
  </div>
`;                                                    // 保留了换行和缩进
```

**实际工作场景**：动态拼接 HTML 片段、生成 API 请求 URL、组装日志信息——任何需要"把变量插进文字"的地方，模板字符串都是首选。
:::

:::explain{title="可选链 ?. — 安全访问深层属性，不怕 null/undefined"}
当你访问的属性链中某个环节是 `null` 或 `undefined` 时，可选链自动返回 `undefined` 而不报错。

```js
const user = { name: '张三' };                         // 没有 address 属性

// 旧写法：必须逐层判断，否则报错
let cityOld;
if (user && user.address && user.address.city) {      // 三个 && —— 只要漏一层就崩
  cityOld = user.address.city;
} else {
  cityOld = '未知';                                   // 旧写法要写完整的 if/else
}
console.log(cityOld);                                 // "未知"

// 新写法：?. 一链到底，遇到 undefined 自动停
const city = user?.address?.city ?? '未知';            // user.address 是 undefined，返回 '未知'
console.log(city);                                    // "未知"

// 也适用于函数调用和数组索引
const fn = null;
fn?.();                                               // fn 是 null，不调用，返回 undefined，不报错
const arr = null;
const first = arr?.[0];                               // arr 是 null，返回 undefined，不报错
```

**实际工作场景**：处理 API 返回的不完整数据——后端可能漏字段、用户可能没填某些信息。`?.` 让你自信地写深层访问而不怕崩溃。
:::

:::explain{title="空值合并 ?? — 只在 null/undefined 时使用默认值"}
`||` 的问题是：`0`、`''`（空字符串）、`false` 全是 falsy，都会被当作"空"——但有时 `0` 和 `''` 是合法值。`??` 只认 `null` 和 `undefined`。

```js
// 问题：|| 把 0 和 '' 当成了"无效值"
const count1 = 0 || 10;                               // 10 —— 错误！0 是合法数值
const name1 = '' || '匿名';                            // '匿名' —— 错误！'' 是用户有意留空

// 解决：?? 只在"确实没有值"时回退
const count2 = 0 ?? 10;                               // 0 —— 正确！0 被当作合法值保留
const name2 = '' ?? '匿名';                            // '' —— 正确！空字符串被保留
const city2 = null ?? '上海';                          // '上海' —— null 才触发默认值
const age2 = undefined ?? 18;                         // 18 —— undefined 也触发默认值
```

**选择口诀**：如果你要区分"用户留空"和"用户没填"，用 `??`。如果任何"假值"你都希望回退（比如空字符串你确实想替换成默认值），用 `||`。
:::

:::example{title="实战串联：处理 API 返回的复杂数据"}
后端返回了一段"可能不完整"的用户列表，你需要安全提取并格式化显示。这就是日常工作中 `?.` + `??` + 解构 + 模板字符串的组合使用：

```js
// 模拟后端返回——第二个用户缺了很多字段
const apiData = [                                       // 用户列表数组
  { name: '张三', age: 28, address: { city: '上海' } }, // 完整用户
  { name: '李四' }                                      // 不完整用户：缺 age 和 address
];

// 安全处理每条数据
const displayList = apiData.map(user => {               // 遍历每个用户
  const age = user?.age ?? '未填写';                    // 没 age 就显示"未填写"
  const city = user?.address?.city ?? '未知城市';       // 深层安全访问
  return `${user?.name ?? '未知'}，${age} 岁，${city}`;  // 模板字符串组装
});

console.log(displayList);
// ["张三，28 岁，上海", "李四，未填写 岁，未知城市"]
// 没有报错，没有崩溃，数据不完整也能优雅处理
```
:::

:::explain{title="常见错误"}
**错误1：解构变量名和对象属性名不一致**
```js
const user = { name: '张三', age: 28 };
// ❌ 错误：想取 user.name 但写成了 userName——变量名必须和属性名完全一致
const { userName } = user;
console.log(userName); // undefined

// ✅ 正确：变量名等于属性名
const { name } = user;
console.log(name); // "张三"

// ✅ 如果想改名：用 属性名:新变量名 语法
const { name: userName } = user; // 取 name 属性，赋值给变量 userName
console.log(userName); // "张三"
```

**错误2：箭头函数返回对象时忘了加括号**
```js
// ❌ 错误：花括号被当成函数体，而不是对象字面量
const getUser = () => { name: '张三', age: 28 }; // 返回 undefined！
console.log(getUser()); // undefined

// ✅ 正确：用括号包裹对象字面量——({ ... })
const getUser = () => ({ name: '张三', age: 28 });
console.log(getUser()); // { name: '张三', age: 28 }
```

**错误3：展开运算符写错了位置**
```js
// ❌ 错误：把 ... 写成了赋值——... 只能出现在"取值"位置
const arr = [1, 2];
const copy = arr; // 这不是复制！这是引用同一个数组
copy[0] = 999;
console.log(arr[0]); // 999 —— 原数组也被改了！

// ✅ 正确：... 展开创建新数组
const arr = [1, 2];
const copy = [...arr];
copy[0] = 999;
console.log(arr[0]); // 1 —— 原数组不变
```

**错误4：模板字符串用了单引号而不是反引号**
```js
const name = '张三';
// ❌ 错误：用了单引号——${} 不会被解析，原样输出
const s1 = '你好，${name}'; // "你好，${name}" —— 不是想要的！
// ✅ 正确：用反引号（键盘上 Tab 上面那个键）
const s2 = `你好，${name}`; // "你好，张三"
```
:::

:::task{title="动手试试 — 在 script.js 中完成"}
本练习的所有代码都在 **script.js** 中。`index.html` 用来在浏览器中预览结果（用 Live Server 或直接打开），`style.css` 是页面样式，不需要修改。

::::step{purpose="解构赋值让你一行代码取出多个属性，避免重复写 instrument.name、instrument.family。就像从文件柜里一次抽出三份文件，而不是一份一份拿。" expected="控制台输出 name、family、range 三个变量的正确值（小提琴、弦乐、G3-E6）。"}
在 `script.js` 中，用 **解构赋值** `const { name, family, range } = instrument` 从 `instrument` 对象中取出三个属性，打印到控制台
::::

::::step{purpose="箭头函数省略了 function 关键字，代码更短；模板字符串使用反引号和 ${} 插值，告别了繁琐的 + 号拼接。这是现代 JavaScript 最常用的两种语法。" expected="describe(instrument) 返回\"小提琴 是弦乐乐器，音域G3-E6\"，功能与原 function 版本一致但代码更简洁。"}
在 `script.js` 中，用 **箭头函数** 重写 `describe` 函数，并用 **模板字符串**（反引号）返回格式化的描述文字
::::

::::step{purpose="展开运算符创建新对象而不修改原对象——这是不可变数据编程的重要理念：不改变原始数据，而是创建新的副本并修改。" expected="新对象包含原 instrument 的所有属性（name, family, range）加上 players 属性，而原 instrument 对象保持不变。"}
在 `script.js` 中，用 **展开运算符** `{ ...instrument, players: '40人' }` 给 `instrument` 对象添加 `players` 属性，创建新对象并打印
::::

:::

:::hint{title="语法速查"}
- 对象解构：`const { name, family } = instrument`
- 数组解构：`const [first, second] = arr`
- 箭头函数：`const fn = (x) => x * 2`
- 展开数组：`const merged = [...arr1, ...arr2]`
- 展开对象：`const copy = { ...obj, newKey: value }`
- 模板字符串：`` `用户：${name}` ``（注意是反引号，不是单引号）
- 可选链：`obj?.nested?.property`
- 空值合并：`value ?? '默认值'`
:::

:::recap
你学会了 ES6 的核心新语法：解构赋值让你一行代码从对象/数组中取出多个属性；箭头函数让回调更短（但注意 it 不绑定自己的 this）；展开运算符 `...` 让你轻松合并和复制数组/对象；模板字符串用反引号 + `${}` 彻底告别 + 号拼接；可选链 `?.` 让你安全访问深层属性不怕 undefined；空值合并 `??` 让你只在 null/undefined 时使用默认值。这些不是"高级技巧"——它们是现代 JavaScript 的日常写法，每个项目都在用。
:::
