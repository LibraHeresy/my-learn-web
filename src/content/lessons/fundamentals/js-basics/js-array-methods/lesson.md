# 数组方法进阶 — 像筛选乐谱一样处理数据

:::music-analogy
`.map()` 就像**移调**——把整首曲子每个音都升高一度，返回一个新的版本；`.filter()` 就像从总谱中**挑出所有弦乐声部**——只保留符合条件的部分。两者都不破坏原谱（原数组），而是生成一份新的。
:::

:::explain{title=".map() — 把每个元素\"转换\"成新值"}
数组方法让你像整理乐谱一样操作数据——map 对每项做同样处理返回新数组，filter 筛选符合条件的项，reduce 将所有项累积为一个值。.map() 遍历数组中的每一项执行函数后**返回新数组**，原数组不变：
```js
let names = ["bach", "mozart", "beethoven"];
let upper = names.map(function(name) {
  return name.toUpperCase();
});
// upper 是 ["BACH", "MOZART", "BEETHOVEN"]
// names 没变！
```就像把 C 大调移调到 D 大调——原曲还在，只是多了一个新版本。
:::

:::explain{title=".filter() — 筛选符合条件的元素"}
`.filter()` 遍历数组，**只保留**让条件函数返回 `true` 的项：
```js
let years = [1685, 1756, 1770, 1810, 1862];
let after1800 = years.filter(function(year) {
  return year > 1800;
});
// after1800 是 [1810, 1862]
```就像在管弦乐团中只挑出木管声部——其他声部还在，但你只需要木管。
:::

:::explain{title="链式调用 — map 和 filter 组合"}
`.map()` 和 `.filter()` 都返回数组，所以可以**链式调用**：
```js
let composers = [
  { name: "巴赫", year: 1720 },
  { name: "莫扎特", year: 1785 },
  { name: "贝多芬", year: 1805 },
  { name: "肖邦", year: 1835 }
];
// 先筛选 1800 年后的，再只取名字
let names = composers
  .filter(function(c) { return c.year > 1800; })
  .map(function(c) { return c.name; });
// names 是 ["贝多芬", "肖邦"]
```就像先筛选出 19 世纪的作品，再把它们的标题提取出来——流水线操作！
:::

:::example{title="看例子"}
下面的代码用 `.filter()` 筛选出含有"A"的作曲家名字，再用 `.map()` 转为大写：
```js
let composers = ["Bach", "Mozart", "Beethoven", "Chopin", "Debussy", "Vivaldi"];
// 筛选名字里含 "a"（不区分大小写）的
let filtered = composers.filter(function(name) {
  return name.toLowerCase().includes("a");
});
// 转为大写
let result = filtered.map(function(name) {
  return name.toUpperCase();
});
document.querySelector("#output").innerHTML =
  result.join(" | ");
```
:::

:::task{title="动手试试 ✨"}
::::step{purpose="让你理解 `.filter()` 的灵活性——筛选条件完全由你定义，任何返回 true/false 的判断都可以作为过滤规则。就像指挥可以根据「声部类型」「音高范围」「演奏难度」任意筛选乐手。" expected="处理结果区域只显示名字长度 6 个及以上的作曲家（如 Beethoven、Debussy），短名字被过滤掉了。修改一个条件，输出结果完全不同。"}
修改 `.filter()` 的筛选条件，把「筛选含 a 字母的」改成「只显示名字长度 >= 6 的作曲家」。提示：用 `name.length >= 6` 替换原来的条件
::::

::::step{purpose="`.map()` 对数组中每项做「同一种加工」——就像给乐谱每一行加上相同的演奏标记。它是数据转换的核心工具，实际开发中 map 和 filter 经常搭配使用。" expected="输出区域每个名字前都加上了「作曲家：」前缀，就像给每张卡片统一盖了一个印章。原数组仍然没变——只是生成了新的加工版本。"}
用 `.map()` 给每个名字加上「作曲家：」前缀，比如 "Bach" 变成 "作曲家：Bach"。先做完 map 再做 join 拼接显示
::::

::::step{purpose="链式调用是 JavaScript 最优雅的编程风格之一——就像音乐中的「连奏」（legato），一个操作紧接下一个，形成流畅的数据处理流水线。不产生中间变量，代码更简洁清晰。" expected="一行代码链完成了筛选和转换两个操作，输出效果和分步写完全一样。你体验到了「流水线式」数据处理的优雅。"}
用链式调用把 `.filter()` 和 `.map()` 串联起来，不用中间变量一步完成「筛选 + 转换」。直接在筛选结果后面 `.map()`
::::

::::step{purpose="综合运用 `.filter()` + 事件监听 + DOM 更新——这是一套完整的「搜索过滤」交互模式。理解了这套模式，你就掌握了电商搜索、通讯录查找等常见功能的底层原理。" expected="输入不同字母，结果实时变化；清空输入框显示全部。数据过滤响应用户操作，实现了真正的交互式数据探索体验。"}
挑战：在输入框中输入字母，实现实时筛选效果。输入「a」，只显示名字中含 a 的作曲家；输入「ch」，只显示含 ch 的。输入框清空时显示全部
::::

:::

:::recap
这一节你学会了两个强大的数组方法——`.map()` 把数组中每项都"加工"一遍生成新数组（像移调），`.filter()` 根据条件筛选出部分项生成新数组（像只挑弦乐声部）。它们都不改变原数组，还可以用链式调用串联起来：先筛选再转换，一气呵成。现在你处理数据的速度快了 10 倍——筛选、转换、显示，几行代码就搞定。
:::

:::listen-to
巴赫《勃兰登堡协奏曲》No.3 — 各声部轮流演奏同一主题（map），然后只留下弦乐组对话（filter），现代 Web 开发中用 map/filter 处理数据就像听巴赫一样行云流水。
:::

