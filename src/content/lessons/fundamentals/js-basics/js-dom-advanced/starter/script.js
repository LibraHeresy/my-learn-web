let input = document.querySelector("#itemInput");
let addBtn = document.querySelector("#addBtn");
let removeBtn = document.querySelector("#removeBtn");
let list = document.querySelector("#list");
// 添加
addBtn.addEventListener("click", function() {
  let text = input.value.trim();
  if (text === "") return;
  let item = document.createElement("div");
  item.className = "plan-item";
  item.textContent = text;
  list.appendChild(item);
  input.value = "";
});
// 删除最后一个
removeBtn.addEventListener("click", function() {
  let items = document.querySelectorAll(".plan-item");
  let last = items[items.length - 1];
  if (last) last.remove();
});