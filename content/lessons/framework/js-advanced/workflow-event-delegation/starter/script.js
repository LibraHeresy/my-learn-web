// ❌ 当前方式：用 forEach 逐个绑定事件
// 问题：动态添加的卡片不会自动获得点击事件
// 任务：改成事件委托——只在 #cardList 上绑定一个事件
let likeBtns = document.querySelectorAll(".like-btn");
likeBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    let card = btn.closest(".card");
    card.classList.toggle("liked");
    if (card.classList.contains("liked")) {
      btn.textContent = "❤ 已收藏";
    } else {
      btn.textContent = "❤ 收藏";
    }
  });
});
// 添加随机曲目（新卡片不会有事件！这就是你要修复的问题）
document.querySelector("#addBtn").addEventListener("click", function() {
  let pieces = [
    { name: "G弦上的咏叹调", period: "巴洛克" },
    { name: "第40号交响曲", period: "古典主义" },
    { name: "夜曲 Op.9 No.2", period: "浪漫主义" }
  ];
  let p = pieces[Math.floor(Math.random() * pieces.length)];
  
  let listEl = document.querySelector("#cardList");
  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = '<div class="card-info"><h3>' + p.name + '</h3><span class="tag">' + p.period + '</span></div><button class="like-btn">❤ 收藏</button>';
  listEl.appendChild(card);
});