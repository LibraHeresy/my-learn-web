let count = 0;
let timer = null;
let display = document.querySelector("#display");
let startBtn = document.querySelector("#startBtn");
let stopBtn = document.querySelector("#stopBtn");
let resetBtn = document.querySelector("#resetBtn");
startBtn.addEventListener("click", function() {
  if (timer) return;  // 防止重复启动
  timer = setInterval(function() {
    count++;
    display.textContent = `节拍 ${count}`;
  }, 1000);
});
stopBtn.addEventListener("click", function() {
  clearInterval(timer);
  timer = null;
});
resetBtn.addEventListener("click", function() {
  clearInterval(timer);
  timer = null;
  count = 0;
  display.textContent = "点击开始";
});