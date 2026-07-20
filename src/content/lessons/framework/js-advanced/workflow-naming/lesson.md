# 命名就像给收纳盒贴标签 — 让代码自己说话

:::analogy
好的变量名就像快递单上写"书"而不是"物品001"——让读代码的人（包括一个月后的你自己）一眼就知道这是什么。命名不改变功能，但能让你写代码快十倍。
:::

:::prerequisite
**本节你需要知道这些词：**

- **JS基础**：JavaScript 的基本用法——变量、数据类型、最基本的操作
- **变量**：用来存储数据的容器，用 `let` 或 `const` 声明
:::

:::explain{title="好名字 vs 坏名字"}
来看一组对比：
**❌ 坏命名（你一个月后根本看不懂）：**
```js
let a = ["", "", "春天"];
let b = document.querySelector("#c");
let d = document.querySelector("#e");
d.addEventListener("click", function() {
  let f = Math.floor(Math.random() * a.length);
  b.textContent = a[f];
});
```
**✅ 好命名（任何人都看得懂）：**
```js
let composers = ["", "", "春天"];
let displayEl = document.querySelector("#composerDisplay");
let shuffleBtn = document.querySelector("#shuffleBtn");
shuffleBtn.addEventListener("click", function() {
  let randomIndex = Math.floor(Math.random() * composers.length);
  displayEl.textContent = composers[randomIndex];
});
```
两者功能完全一样，但可读性天差地别。**好名字让代码自己说话，不需要额外解释。**
:::

:::explain{title="命名规则速查表"}
**CSS 类名：** 用小写字母 + 连字符（kebab-case）
- ✅ `card-title` `music-list` `play-btn`
- ❌ `CardTitle` `music_list` `a` `b` `c`
**JS 变量名：** 用驼峰命名（camelCase）
- ✅ `composerName` `totalCount` `likeBtn` `musicList`
- ❌ `composer_name` `totalcount` `btn` `x`
**JS 函数名：** 用动词开头，描述做什么
- ✅ `playMusic()` `addCard()` `showMessage()` `calculateTotal()`
- ❌ `music()` `card()` `message()` `total()`
**常用前缀约定：**
- 存储 DOM 元素的变量后加 `El`：`titleEl`、`cardEl`、`msgEl`
- 存储按钮的变量后加 `Btn`：`likeBtn`、`closeBtn`、`submitBtn`
- 布尔值用 `is` / `has` 开头：`isPlaying`、`hasLiked`
:::

:::task{title="动手试试 ✨"}
::::step{purpose="给存储 DOM 元素的变量加上 El/Btn 后缀是团队通用的命名约定。好名字让代码自解释——shuffleBtn 一眼就知道是\"随机播放\"按钮，而 c 需要你来回翻看才知道是什么。" expected="代码中不再有 b、c、d、e 这样的单字母变量，取而代之的是有意义的名字，阅读时不需要额外注释。"}
把 DOM 元素变量重命名：b → nameDisplay、c → shuffleBtn、d → msgEl、e → addBtn
::::

::::step{purpose="数据变量的命名直接反映其内容——composers 明确是设计师数组，randomIndex 清楚表达它是随机索引。就像快递单上写\"书\"比\"物品001\"更好——精确、简短、无歧义。" expected="a 变成 composers，f 变成 randomIndex，变量名准确地描述了它们存储的内容。"}
把数据变量重命名：a → composers、f → randomIndex
::::

::::step{purpose="函数名应该用动词开头来描述它做什么。showRandom() 明确是\"随机显示\"，addComposer() 明确是\"添加设计师\"。好的函数名就是最好的注释——你甚至不需要读函数体就知道它的职责。" expected="函数名从 x 和 y 变成 showRandom 和 addComposer，读代码时逻辑一目了然，功能完全不变。"}
把函数重命名：x() → showRandom()、y() → addComposer()
::::

:::

:::recap
你学会了好的命名规范——CSS 类名用 kebab-case（如 card-title），JS 变量用 camelCase（如 composerName），函数名用动词开头（如 playMusic）。好的命名让代码自己说话，不需要额外解释。
:::


