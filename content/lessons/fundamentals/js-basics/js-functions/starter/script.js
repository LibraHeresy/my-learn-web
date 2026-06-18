// 定义一个函数，创建作曲家卡片
function createCard(composer, period, piece) {
  return `
    <div class="card">
      <h2>${composer}</h2>
      <p>时期：${period}</p>
      <p>代表作：《${piece}》</p>
    </div>
  `;
}
// 调用函数生成三张卡片
let html = "";
html += createCard("巴赫", "巴洛克", "赋格的艺术");
html += createCard("莫扎特", "古典主义", "魔笛");
html += createCard("德彪西", "印象派", "月光");
// 显示到页面上
document.querySelector("#gallery").innerHTML = html;