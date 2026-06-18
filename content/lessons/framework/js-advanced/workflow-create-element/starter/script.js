// 曲目数据
let pieces = [
  { name: "布兰登堡协奏曲", period: "巴洛克" },
  { name: "费加罗的婚礼序曲", period: "古典主义" },
  { name: "月光奏鸣曲", period: "古典主义" }
];
let listEl = document.querySelector("#cardList");
// 当前用 innerHTML 渲染——你的任务：改成 createElement + appendChild
function render() {
  let html = "";
  for (let i = 0; i < pieces.length; i++) {
    html += '<div class="card"><h3>' + pieces[i].name + '</h3><span class="tag">' + pieces[i].period + '</span></div>';
  }
  listEl.innerHTML = html;
}
render();
// 添加随机曲目
document.querySelector("#addBtn").addEventListener("click", function() {
  let randomPieces = [
    { name: "G弦上的咏叹调", period: "巴洛克" },
    { name: "第40号交响曲", period: "古典主义" },
    { name: "夜曲 Op.9 No.2", period: "浪漫主义" }
  ];
  let pick = randomPieces[Math.floor(Math.random() * randomPieces.length)];
  pieces.push(pick);
  render();
});