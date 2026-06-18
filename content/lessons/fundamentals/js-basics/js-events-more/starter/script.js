// 实时输入事件
let inputEl = document.querySelector("#nameInput");
let liveText = document.querySelector("#liveText");
inputEl.addEventListener("input", function(event) {
  let val = event.target.value;
  liveText.textContent = val || "---";
});
// 鼠标悬停事件
let hoverCard = document.querySelector("#hoverCard");
hoverCard.addEventListener("mouseenter", function() {
  hoverCard.style.borderColor = "#C9A96E";
  hoverCard.style.background = "#FFF8EC";
});
hoverCard.addEventListener("mouseleave", function() {
  hoverCard.style.borderColor = "#D4C5A9";
  hoverCard.style.background = "#FFFAF2";
});
// 键盘事件
let keyHint = document.querySelector("#keyHint");
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    keyHint.textContent = "🎹 你按了回车键！";
    keyHint.style.color = "#8B2E2E";
  } else {
    keyHint.textContent = `你按下了: "${event.key}"`;
    keyHint.style.color = "#C9A96E";
  }
});