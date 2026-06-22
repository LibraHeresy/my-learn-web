// 对象数组：每个对象是一条记录
let composers = [
  { name: "巴赫", period: "巴洛克", piece: "赋格的艺术" },
  { name: "莫扎特", period: "古典主义", piece: "魔笛" },
  { name: "贝多芬", period: "古典到浪漫", piece: "命运交响曲" },
  { name: "肖邦", period: "浪漫主义", piece: "夜曲" }
];
// 遍历对象数组，生成卡片
let html = "";
composers.forEach(function(c) {
  html += `
    <div class="card">
      <h2>${c.name}</h2>
      <p>时期：${c.period}</p>
      <p>代表作：《${c.piece}》</p>
    </div>
  `;
});
document.querySelector("#gallery").innerHTML = html;