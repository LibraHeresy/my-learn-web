// 作曲家数据（对象数组）
let composers = [
  { name: "巴赫", period: "巴洛克", piece: "赋格的艺术" },
  { name: "莫扎特", period: "古典主义", piece: "魔笛" },
  { name: "贝多芬", period: "古典主义", piece: "命运交响曲" },
  { name: "肖邦", period: "浪漫主义", piece: "夜曲" },
  { name: "舒曼", period: "浪漫主义", piece: "童年情景" },
  { name: "德彪西", period: "印象派", piece: "月光" }
];
let gallery = document.querySelector("#gallery");
// 渲染画廊（接收数组参数）
function showGallery(list) {
  let html = "";
  list.forEach(function(c) {
    html += `
      <div class="card">
        <h2>${c.name}</h2>
        <div class="period">${c.period}</div>
        <p>《${c.piece}》</p>
      </div>
    `;
  });
  gallery.innerHTML = html;
}
// 初始显示全部
showGallery(composers);
// 切换激活按钮样式
function setActive(btn) {
  document.querySelectorAll(".toolbar button").forEach(function(b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");
}
// 筛选按钮
document.querySelector("#showAllBtn").addEventListener("click", function() {
  setActive(this);
  showGallery(composers);
});
document.querySelector("#showRomanticBtn").addEventListener("click", function() {
  setActive(this);
  let filtered = composers.filter(function(c) {
    return c.period === "浪漫主义";
  });
  showGallery(filtered);
});
document.querySelector("#showClassicalBtn").addEventListener("click", function() {
  setActive(this);
  let filtered = composers.filter(function(c) {
    return c.period === "古典主义";
  });
  showGallery(filtered);
});
// 随机添加（预设数据池）
let pool = [
  { name: "柴可夫斯基", period: "浪漫主义", piece: "天鹅湖" },
  { name: "海顿", period: "古典主义", piece: "惊愕交响曲" },
  { name: "拉威尔", period: "印象派", piece: "波莱罗" }
];
let added = 0;
document.querySelector("#addBtn").addEventListener("click", function() {
  if (added < pool.length) {
    composers.push(pool[added]);
    added++;
    showGallery(composers);
  }
});