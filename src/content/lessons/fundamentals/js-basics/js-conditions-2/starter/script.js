let btn = document.querySelector("#submitBtn");
let result = document.querySelector("#result");
btn.addEventListener("click", function() {
  let answer = document.querySelector("#answer").value;
  if (answer === "肖邦") {
    result.style.color = "#5B8C5A";
    result.textContent = "✓ 回答正确！肖邦确实是钢琴诗人。";
  } else if (answer === "") {
    result.style.color = "#C9A96E";
    result.textContent = "请先输入一个名字哦 ~";
  } else {
    result.style.color = "#8B2E2E";
    result.textContent = "✗ 再想想？提示：他是波兰人，写了很多夜曲。";
  }
});