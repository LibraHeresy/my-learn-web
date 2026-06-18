// 作曲家数组
let composers = ["巴赫", "莫扎特", "贝多芬", "肖邦", "德彪西"];
// 用 forEach 循环生成 HTML
let html = "";
composers.forEach(function(name, index) {
  html += `
    <div class="card">
      <span class="num">${index + 1}</span>
      ${name}
    </div>
  `;
});
// 显示到页面上
document.querySelector("#list").innerHTML = html;