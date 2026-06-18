// 收藏列表 —— 刷新后会丢失数据
// 你的任务：用 localStorage 让它持久化
let pieces = [
  { name: "布兰登堡协奏曲", period: "巴洛克" },
  { name: "费加罗的婚礼序曲", period: "古典主义" }
];
let listEl = document.querySelector("#pieceList");
let nameInput = document.querySelector("#nameInput");
let periodInput = document.querySelector("#periodInput");
let countEl = document.querySelector("#count");
// 提示：先写 saveData() 和 loadData() 函数
// function saveData() { localStorage.setItem("myPieces", JSON.stringify(pieces)); }
// function loadData() { ... pieces = JSON.parse(localStorage.getItem("myPieces")) || defaultPieces; }
function render() {
  listEl.innerHTML = "";
  pieces.forEach(function(p) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = '<div class="card-info"><h3>' + p.name + '</h3><span class="tag">' + p.period + '</span></div><button class="del-btn">✕</button>';
    card.querySelector(".del-btn").addEventListener("click", function() {
      pieces = pieces.filter(function(item) { return item !== p; });
      render();
      updateCount();
      // 提示：删了数据记得 saveData()！
    });
    listEl.appendChild(card);
  });
  updateCount();
}
function updateCount() {
  countEl.textContent = "共 " + pieces.length + " 首曲目";
}
// 添加
document.querySelector("#addBtn").addEventListener("click", function() {
  let name = nameInput.value.trim();
  let period = periodInput.value.trim() || "未知";
  if (!name) return;
  pieces.push({ name: name, period: period });
  render();
  // 提示：加了数据记得 saveData()！
  nameInput.value = "";
  periodInput.value = "";
});
// 清空
document.querySelector("#clearBtn").addEventListener("click", function() {
  pieces = [];
  render();
  // 提示：清空了记得 saveData()！
});
render();