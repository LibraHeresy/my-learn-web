// 数据
let pieces = [
  { name: "布兰登堡协奏曲", period: "巴洛克", composer: "巴赫" },
  { name: "G弦上的咏叹调", period: "巴洛克", composer: "巴赫" },
  { name: "费加罗的婚礼序曲", period: "古典主义", composer: "莫扎特" },
  { name: "第40号交响曲", period: "古典主义", composer: "莫扎特" },
  { name: "月光奏鸣曲", period: "古典主义", composer: "贝多芬" }
];
let listEl = document.querySelector("#programList");
let countEl = document.querySelector("#countDisplay");
// ===== 拆分指南 =====
// 目标：把下面的大函数拆成 4 个小函数，按这个结构组织：
//
// function renderProgram(list) { ... }     ← 接收数组，渲染卡片 HTML
// function updateCount(n) { ... }           ← 更新底部统计文字
// function bindFilterButtons() { ... }      ← 给三个筛选按钮绑定事件
// function initPage() {
//   renderProgram(pieces);
//   bindFilterButtons();
//   updateCount(pieces.length);
// }
//
// 关键技巧：renderProgram(list) 接收参数 list，所以筛选后可以
// 直接调用 renderProgram(filtered)——不用再复制粘贴渲染代码！
// TODO: 把下面这个"大函数"拆成 4 个小函数
function setupPage() {
  // ===== 渲染节目单 =====
  // 这部分应该变成 renderProgram(list) 函数
  let html = "";
  for (let i = 0; i < pieces.length; i++) {
    let p = pieces[i];
    html += '<div class="card"><h3>' + p.name + '</h3><span class="period">' + p.composer + ' · ' + p.period + '</span></div>';
  }
  listEl.innerHTML = html;
  // ===== 更新统计 =====
  // 这部分应该变成 updateCount(n) 函数
  countEl.textContent = "共 " + pieces.length + " 首曲目";
  // ===== 绑定筛选按钮 =====
  // 这部分应该变成 bindFilterButtons() 函数
  function setActive(btn) {
    document.querySelectorAll(".toolbar button").forEach(function(b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
  }
  document.querySelector("#allBtn").addEventListener("click", function() {
    setActive(this);
    // 重新渲染全部 — 拆成函数后就可以直接调用 renderProgram(pieces)！
    let html = "";
    for (let i = 0; i < pieces.length; i++) {
      let p = pieces[i];
      html += '<div class="card"><h3>' + p.name + '</h3><span class="period">' + p.composer + ' · ' + p.period + '</span></div>';
    }
    listEl.innerHTML = html;
    countEl.textContent = "共 " + pieces.length + " 首曲目";
  });
  document.querySelector("#baroqueBtn").addEventListener("click", function() {
    setActive(this);
    let filtered = pieces.filter(function(p) { return p.period === "巴洛克"; });
    let html = "";
    for (let i = 0; i < filtered.length; i++) {
      let p = filtered[i];
      html += '<div class="card"><h3>' + p.name + '</h3><span class="period">' + p.composer + ' · ' + p.period + '</span></div>';
    }
    listEl.innerHTML = html;
    countEl.textContent = "共 " + filtered.length + " 首曲目";
  });
  document.querySelector("#classicalBtn").addEventListener("click", function() {
    setActive(this);
    let filtered = pieces.filter(function(p) { return p.period === "古典主义"; });
    let html = "";
    for (let i = 0; i < filtered.length; i++) {
      let p = filtered[i];
      html += '<div class="card"><h3>' + p.name + '</h3><span class="period">' + p.composer + ' · ' + p.period + '</span></div>';
    }
    listEl.innerHTML = html;
    countEl.textContent = "共 " + filtered.length + " 首曲目";
  });
}
setupPage();