// 当前是命令式——直接操作 DOM。你的任务：改成数据驱动模式
let listEl = document.querySelector("#pieceList");
let nameInput = document.querySelector("#nameInput");
let countEl = document.querySelector("#count");
// 添加曲目（命令式——直接创建元素）
document.querySelector("#addBtn").addEventListener("click", function() {
  let name = nameInput.value.trim();
  if (!name) return;
  let item = document.createElement("div");
  item.classList.add("piece-item");
  item.innerHTML = name + ' <button class="del-btn">✕</button>';
  // 给删除按钮绑定事件
  item.querySelector(".del-btn").addEventListener("click", function() {
    item.remove();
    updateCount();
  });
  listEl.appendChild(item);
  nameInput.value = "";
  updateCount();
});
// 清空全部
document.querySelector("#clearBtn").addEventListener("click", function() {
  listEl.innerHTML = "";
  updateCount();
});
function updateCount() {
  countEl.textContent = "共 " + listEl.children.length + " 首曲目";
}
updateCount();