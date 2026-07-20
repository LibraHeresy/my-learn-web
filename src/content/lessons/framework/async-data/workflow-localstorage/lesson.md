# {{term:localStorage}} — 给数据一个"永久的家"

:::analogy
localStorage 就像浏览器的抽屉——你把数据存进去，关掉网页甚至重启电脑后，数据还在里面等你。适合保存用户设置、草稿、登录状态等。
:::

:::prerequisite
**本节你需要知道这些词：**

- **JSON 对象**：一种轻量级的数据交换格式，使用键值对表示结构化数据
- **DOM 基础**：用 JavaScript 操作 HTML 页面元素和内容的能力
:::

:::explain{title="为什么需要 localStorage？"}
目前你写的所有页面都有一个共同的问题：**刷新页面后，所有数据都丢失了**。
收藏的项目？没了。输入的列表？清空了。计数器？归零了。
这是因为 JavaScript 变量只存在于**当前页面会话**中。刷新页面等于重新开始——所有变量重新初始化。
`localStorage` 解决的就是这个问题：它把数据存在浏览器里，和页面会话无关。
```js
// 存数据
localStorage.setItem("userName", "小雅");
// 取数据（刷新页面后依然能读到！）
let name = localStorage.getItem("userName");  // "小雅"
// 删数据
localStorage.removeItem("userName");
// 清空全部
localStorage.clear();
```
:::

:::explain{title="存储复杂数据：JSON.stringify 和 JSON.parse"}
localStorage 只能存储**字符串**。如果你要存数组或对象，需要用 JSON 转换：
```js
// 存对象/数组：先用 JSON.stringify 转成字符串
let pieces = [
  { name: "项目A", period: "类型B" },
  { name: "文档C", period: "类型A" }
];
localStorage.setItem("myPieces", JSON.stringify(pieces));
// 取对象/数组：先用 JSON.parse 转回对象
let saved = JSON.parse(localStorage.getItem("myPieces"));
// saved 现在是真正的数组，可以正常使用！
console.log(saved[0].name);  // "项目A"
```
**常用模式：加载 + 保存**
```js
// 页面启动时：尝试从 localStorage 加载数据
let pieces = JSON.parse(localStorage.getItem("myPieces")) || [];
function saveData() {
  localStorage.setItem("myPieces", JSON.stringify(pieces));
}
// 每次修改数据后调用 saveData()
pieces.push(newPiece);
saveData();
render(pieces);
```
> 💡 提示：`localStorage.getItem` 返回 `null` 如果 key 不存在，所以用 `|| []` 给一个默认值。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="localStorage 让页面数据跨越会话存活——就像把设计图归档保存，下次准备翻出来就能继续。{{term:JSON.parse}} 把字符串还原为真正的数组对象，|| [] 提供了数据不存在时的安全默认值。" expected="首次打开页面显示默认的 2 个项目，刷新后数据依然存在（目前还是默认数据，因为还没写保存逻辑）。"}
页面启动时从 localStorage 加载数据：用 JSON.parse(localStorage.getItem("myPieces"))，如果为空则用默认数组
::::

::::step{purpose="localStorage 只能存字符串，所以需要用 {{term:JSON.stringify}} 把对象\"打包\"成 JSON 格式。这就像把设计图装进文件夹再放进档案柜——需要使用时再 JSON.parse 取出来拆包。" expected="saveData() 调用后，在浏览器 DevTools → Application → Local Storage 中能看到 myPieces 键和对应的 JSON 字符串。"}
写一个 saveData() 函数：用 JSON.stringify 把 pieces 数组转成字符串，存入 localStorage
::::

::::step{purpose="关键是\"在数据变化的每个地方都调用 saveData()\"——添加后、删除后、清空后。漏掉任何一处，数据就会丢失。这就像每次准备修改设计图后都要归档，不然下次来说明书还是旧的。" expected="添加几个项目后刷新浏览器，数据原封不动地显示——你的页面第一次真正\"拥有了记忆\"。"}
在每次添加和删除项目后调用 saveData()，刷新页面验证数据不丢
::::

:::

:::recap
你学会了用 localStorage 让数据"活过"页面刷新——存进去的数据即使关闭浏览器再打开也还在。因为 localStorage 只能存字符串，存对象或数组时需要先用 JSON.stringify 转换，读出来时再用 JSON.parse 还原。

> 💡 **重要限制：** localStorage 每个域名只有约 **5MB** 的存储空间，超出会抛出 `QuotaExceededError`。它是**同步**的——大量数据读写会阻塞页面。如果存储需要超过 5MB 或需要索引查询，应使用 IndexedDB。另外，`sessionStorage` 和 localStorage 用法一样，但关闭浏览器标签页后数据就没了——适合存临时状态。
:::


