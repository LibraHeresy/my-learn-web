# 字符串方法 — 处理文本的利器

:::analogy
字符串方法就像文本编辑器的查找替换功能——split 是"按逗号分列"、trim 是"去掉首尾空格"、replace 是"查找并替换"。用这些工具，处理用户输入变得简单高效。
:::


:::prerequisite
**本节你需要知道这些词：**

- **变量**：用 `let`/`const` 声明容器来存储数据
- **字符串**：用引号包裹的文本数据
- **函数**：封装一段可重复使用的代码逻辑
:::

:::explain{title=".split() — 把字符串拆成数组"}
`.split()` 按指定的**分隔符**把字符串拆成数组，原字符串不变。最常见的场景是解析 CSV 数据——每一行用逗号分隔：

```js
let csvLine = "张三,25,北京,工程师";
let parts = csvLine.split(",");
// parts 是 ["张三", "25", "北京", "工程师"]

let sentence = "今天 天气 真好";
let words = sentence.split(" ");
// words 是 ["今天", "天气", "真好"]
```

分隔符不限于逗号——可以是空格、换行符、任意字符。就像把一串珠子按某种颜色的珠子剪开，每一段变成一个独立的珠子。
:::

:::explain{title=".join() — 回顾：把数组拼回字符串"}
`.join()` 你已经学过了——它是 `.split()` 的逆操作，把数组元素用**连接符**拼接成一个字符串：

```js
let parts = ["2024", "01", "15"];
let date = parts.join("-");
// date 是 "2024-01-15"

let tags = ["JavaScript", "HTML", "CSS"];
let tagStr = tags.join(", ");
// tagStr 是 "JavaScript, HTML, CSS"
```

split 拆开，join 拼回去——这两个方法一正一反，是文本处理的黄金搭档。
:::

:::explain{title=".replace() — 查找并替换文本"}
`.replace()` 把字符串中**第一个**匹配（或**全部**匹配）的内容替换成新内容：

```js
let template = "你好，{姓名}，欢迎来到{城市}";
let result = template.replace("{姓名}", "张三");
// result 是 "你好，张三，欢迎来到{城市}"（只替换了第一个）

result = result.replace("{城市}", "上海");
// result 是 "你好，张三，欢迎来到上海"

// 替换全部匹配（用正则表达式 /g）
let text = "苹果3元，香蕉5元，苹果很甜";
let replaced = text.replace(/苹果/g, "西瓜");
// replaced 是 "西瓜3元，香蕉5元，西瓜很甜"
```

就像 Word 里的"查找并替换"——把文档里某个词换成另一个词。注意：普通字符串只替换第一个匹配，想替换全部需要正则表达式带 `/g` 标志。
:::

:::explain{title=".trim() — 去除首尾空格"}
`.trim()` 去掉字符串**开头和结尾**的空白字符（空格、制表符、换行等），中间的不动。这在处理表单输入时非常实用：

```js
let name = "   张三   ";
let cleaned = name.trim();
// cleaned 是 "张三"

let email = "  zhangsan@example.com  \n";
let fixed = email.trim();
// fixed 是 "zhangsan@example.com"
```

用户经常在输入框前后多打空格——`.trim()` 帮你自动清理这些"手误"，让数据干净整洁。它和 `.split()` 配合使用效果更好：先 split 拆分，再对每一项 trim。
:::

:::explain{title=".slice() — 提取子字符串"}
`.slice(start, end)` 提取从 `start` 到 `end`（不含 `end`）之间的子字符串。索引从 0 开始，负数表示从末尾往前数：

```js
let phone = "13812345678";
let prefix = phone.slice(0, 3);   // "138"（前三位）
let suffix = phone.slice(-4);      // "5678"（后四位）

let date = "2024-03-15";
let year = date.slice(0, 4);      // "2024"
let month = date.slice(5, 7);     // "03"
```

就像用剪刀从纸条上剪下一段——你指定从哪儿开始、到哪儿结束，剪下来的就是你要的部分。`.slice()` 常用于提取手机号段、截取日期字段、获取文件名后缀等。
:::

:::explain{title=".indexOf() — 查找子串的位置"}
`.indexOf()` 返回子串**第一次出现**的位置索引，找不到返回 `-1`。常用于判断字符串中是否包含某内容：

```js
let email = "zhangsan@example.com";
let atPos = email.indexOf("@");
// atPos 是 8（从 0 开始数）

let domain = email.slice(atPos + 1);
// domain 是 "example.com"（@ 之后的内容）

let hasQQ = email.indexOf("qq.com") !== -1;
// hasQQ 是 false（不是 QQ 邮箱）
```

`.indexOf()` 就像在一页书中找某个关键词出现在第几个字——告诉你位置，你可以据此继续操作（比如从那个位置往后截取）。
:::

:::explain{title=".toUpperCase() 和 .toLowerCase() — 大小写转换"}
这两个方法简单直白：`.toUpperCase()` 全部转大写，`.toLowerCase()` 全部转小写。常用于**忽略大小写比较**：

```js
let code = "AbCd1234";
let upper = code.toUpperCase();   // "ABCD1234"
let lower = code.toLowerCase();   // "abcd1234"

// 忽略大小写比较用户输入
let userInput = "YES";
if (userInput.toLowerCase() === "yes") {
  // 不论用户输入 YES / Yes / yes 都能匹配
}
```
:::

:::example{title="看例子：综合运用"}
下面的代码展示了一个完整的"用户地址清洗"流程——用 split 拆分行，用 trim 清理空格，用 replace 统一称呼，用 join 拼回显示：

```js
let rawInput = "北京市 朝阳区   建国路88号  ;   张三  先生";

// 1. 用分号拆分多段信息
let segments = rawInput.split(";");
// ["北京市 朝阳区   建国路88号  ", "   张三  先生"]

// 2. 去掉每段首尾空格
let cleaned = segments.map(function(seg) {
  return seg.trim();
});
// ["北京市 朝阳区   建国路88号", "张三  先生"]

// 3. 把"先生"统一替换为"收"
let standardized = cleaned.map(function(seg) {
  return seg.replace("先生", "收");
});
// ["北京市 朝阳区   建国路88号", "张三  收"]

// 4. 用顿号拼回去显示
document.querySelector("#output").textContent = standardized.join("、");
// "北京市 朝阳区   建国路88号、张三  收"
```
:::

:::task{title="动手试试 ✨"}
::::step{purpose="`.split()` 是最常用的字符串工具——场景：从 CSV 文件导入数据、从 URL 中提取参数、从日志文件中解析字段。理解了 split，你就掌握了「结构化文本 → 数据数组」的转换。" expected="输出区域显示四个字段被拆成了独立的项，用逗号分隔的原始数据变成了结构化数组。"}
页面加载后，把 `rawCSV` 变量中的 CSV 数据用 `.split(",")` 拆分，结果显示在输出区域。提示：`rawCSV.split(",")` 返回数组，再 `.join(" | ")` 显示
::::

::::step{purpose="`.trim()` 清理用户输入的脏数据——在实际项目中，用户提交的表单数据几乎总是带有意外空格。每处理一个用户输入字段，第一件事就是 trim，这已经成为开发者的肌肉记忆。" expected="清理后的数据不再包含首尾空格，每个字段都是干净的文本。即使原始数据有多余空格，最终显示时也整齐划一。"}
CSV 的每个字段前后可能有多余空格。先 split 拆分，再用 `.map()` 对每个字段 `.trim()`，然后显示。提示：`rawCSV.split(",").map(function(item) { return item.trim(); })`
::::

::::step{purpose="`.replace()` 让你批量修改文本内容——场景：替换模板中的占位符、格式化电话号码、屏蔽敏感信息（如手机号中间四位）等。replace 是文本处理的「修改器」。" expected="显示结果中，「待确认」都被替换成了「已确认」。一次调用 replace，整段文本中所有找到的匹配都被替换。"}
`rawCSV` 中可能包含"待确认"字样。用 `.replace()` 把"待确认"替换成"已确认"，然后再拆分显示。提示：在 split 之前先 replace
::::

::::step{purpose="`.slice()` 让你精确截取字符串的片段——场景：从身份证号提取出生日期、从文件路径提取扩展名、截取新闻标题前 20 个字作为摘要。把 indexOf 和 slice 组合使用，可以实现「查找 + 截取」的联动操作。" expected="输入邮箱地址后，输出区域分别显示用户名和域名。程序自动定位 @ 符号位置，然后准确截取前后两部分。"}
挑战：在输入框中输入一个邮箱地址（如 `zhangsan@example.com`），点击按钮后，用 `.indexOf("@")` 找到 @ 的位置，再用 `.slice()` 分别提取"用户名"和"域名"，分别显示在页面上。
::::

:::

:::recap
这一节你学会了七个常用的字符串方法：`.split()` 按分隔符拆成数组（CSV 解析利器），`.join()` 把数组拼回字符串，`.replace()` 查找并替换文本，`.trim()` 去掉首尾多余空格（表单输入必备），`.slice()` 按索引截取子串，`.indexOf()` 查找子串位置，`toUpperCase()/toLowerCase()` 转换大小写。它们覆盖了日常开发 90% 的字符串处理需求——从清洗用户输入、解析数据格式到格式化输出，一套组合拳下来，文本处理游刃有余。
:::
