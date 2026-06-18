// 初始化计数器
let count = 0;
// 获取页面元素
let btn = document.querySelector("#countBtn");
let display = document.querySelector("#display");
// 监听点击事件
btn.addEventListener("click", function() {
  count = count + 1;
  display.textContent = `你点击了 ${count} 次`;
});