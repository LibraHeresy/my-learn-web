let composers = ["Bach", "Mozart", "Beethoven", "Chopin", "Debussy", "Vivaldi"];
// 显示原始列表
let originalEl = document.querySelector("#original");
let outputEl = document.querySelector("#output");
originalEl.textContent = composers.join(" · ");
// 筛选+转换函数
function updateList(letter) {
  let result = composers
    .filter(function(name) {
      return name.toLowerCase().includes(letter.toLowerCase());
    })
    .map(function(name) {
      return name.toUpperCase();
    });
  outputEl.textContent = result.length > 0 ? result.join(" | ") : "（无匹配）";
}
// 初始显示全部
updateList("");
// 输入筛选
document.querySelector("#filterInput").addEventListener("input", function() {
  updateList(this.value);
});
// 重置
document.querySelector("#resetBtn").addEventListener("click", function() {
  document.querySelector("#filterInput").value = "";
  updateList("");
});