let highlightBtn = document.querySelector("#highlightBtn");
let clearBtn = document.querySelector("#clearBtn");
let filterBtn = document.querySelector("#filterBtn");
let showAllBtn = document.querySelector("#showAllBtn");
let cards = document.querySelectorAll(".card");
// 高亮全部
highlightBtn.addEventListener("click", function() {
  cards.forEach(function(card) {
    card.classList.add("highlighted");
  });
});
// 取消高亮
clearBtn.addEventListener("click", function() {
  cards.forEach(function(card) {
    card.classList.remove("highlighted");
  });
});
// 只看弦乐（隐藏非弦乐）
filterBtn.addEventListener("click", function() {
  cards.forEach(function(card) {
    if (!card.classList.contains("strings")) {
      card.classList.add("hidden");
    }
  });
});
// 显示全部
showAllBtn.addEventListener("click", function() {
  cards.forEach(function(card) {
    card.classList.remove("hidden");
  });
});