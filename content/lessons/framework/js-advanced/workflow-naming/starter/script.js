// 这个页面功能正确，但命名非常糟糕
// 你的任务：把所有单字母变量和函数名改成有意义的名字
// 提示：用"重命名清单"来对照修改——
//   a → composers（作曲家数组）
//   b → nameDisplay（显示区元素）
//   c → shuffleBtn（换一首按钮）
//   d → msgEl（消息区元素）
//   e → addBtn（添加按钮）
//   f → randomIndex（随机索引）
//   x() → showRandom()（随机显示一位作曲家）
//   y() → addComposer()（添加一位作曲家）
let a = ["巴赫", "莫扎特", "贝多芬", "肖邦", "舒曼"];
let b = document.querySelector("#nameDisplay");
let c = document.querySelector("#shuffleBtn");
let d = document.querySelector("#msg");
let e = document.querySelector("#addBtn");
function x() {
  let f = Math.floor(Math.random() * a.length);
  b.textContent = a[f];
  d.textContent = "当前显示：" + a[f];
}
function y() {
  a.push("德彪西");
  d.textContent = "已添加：德彪西（共" + a.length + "位作曲家）";
}
c.addEventListener("click", x);
e.addEventListener("click", y);