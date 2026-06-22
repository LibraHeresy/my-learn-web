// 一个简单的计数器——但它有一个逻辑 bug
// 你的任务：用 console.log 观察，然后修复它
let count = 0;
let display = document.querySelector("#display");
let msg = document.querySelector("#msg");
function addOne() {
  // 第一步：在 bug 行之前加 console.log
  // 提示：console.log("点击前 count =", count);
  count = count ++;  // ← 这里有个 bug！观察控制台输出想想为什么
  // 第二步：在 bug 行之后加 console.log
  // 提示：console.log("点击后 count =", count);
  // 对比前后——count 的值真的 +1 了吗？
  display.textContent = count;
  if (count === 10) {
    msg.textContent = "🎉 你已经点击了 10 次！";
  }
}
function reset() {
  count = 0;
  display.textContent = count;
  msg.textContent = "";
  console.log("计数器已归零，count =", count);
}
// 提示：count = count ++ 和 count = count + 1 有什么区别？
// 用 console.log 分别在 bug 前后打印 count 的值，你就能看出来
// 正确的写法是：count = count + 1 或者 count++
document.querySelector("#addBtn").addEventListener("click", addOne);
document.querySelector("#resetBtn").addEventListener("click", reset);