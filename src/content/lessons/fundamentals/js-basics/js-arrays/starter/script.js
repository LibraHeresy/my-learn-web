// 初始数组
let composers = ["巴赫", "莫扎特", "贝多芬"];
let display = document.querySelector("#display");
let input = document.querySelector("#nameInput");
let addBtn = document.querySelector("#addBtn");
// 显示数组内容
function showList() {
  let text = composers.join(" · ");
  display.textContent = text;
}
showList();
// 点击添加
addBtn.addEventListener("click", function() {
  let name = input.value;
  if (name !== "") {
    composers.push(name);
    showList();
    input.value = "";
  }
});