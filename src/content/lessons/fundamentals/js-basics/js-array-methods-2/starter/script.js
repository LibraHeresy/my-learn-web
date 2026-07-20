// 商品列表数据
let products = [
  { name: "无线鼠标", price: 89, stock: 45, category: "电脑配件" },
  { name: "机械键盘", price: 299, stock: 12, category: "电脑配件" },
  { name: "充电器", price: 45, stock: 30, category: "手机配件" },
  { name: "数据线", price: 25, stock: 80, category: "手机配件" },
  { name: "USB 集线器", price: 35, stock: 0, category: "电脑配件" },
  { name: "显示器支架", price: 159, stock: 23, category: "办公家具" }
];

// 显示商品列表
let originalEl = document.querySelector("#original");
let outputEl = document.querySelector("#output");

function showProductList() {
  originalEl.innerHTML = products.map(function(p) {
    return '<li>' + p.name + ' — ¥' + p.price + '（库存：' + p.stock + '）</li>';
  }).join("");
}
showProductList();

// 计算总价
document.querySelector("#totalBtn").addEventListener("click", function() {
  let total = products.reduce(function(acc, p) {
    return acc + p.price;
  }, 0);
  outputEl.innerHTML = "商品总价值：<strong>¥" + total + "</strong>";
});

// 找低价商品（find）
document.querySelector("#findBtn").addEventListener("click", function() {
  let cheap = products.find(function(p) {
    return p.price < 50;
  });
  if (cheap) {
    outputEl.innerHTML = "第一个低于 50 元的商品：<strong>" + cheap.name + "</strong>（¥" + cheap.price + "）";
  } else {
    outputEl.innerHTML = "没有低于 50 元的商品";
  }
});

// 按价格排序
document.querySelector("#sortBtn").addEventListener("click", function() {
  let sorted = products.slice().sort(function(a, b) {
    return a.price - b.price;
  });
  outputEl.innerHTML = "按价格排序：<br>" + sorted.map(function(p, i) {
    return (i + 1) + ". " + p.name + " — ¥" + p.price;
  }).join("<br>");
});

// 重置
document.querySelector("#resetBtn").addEventListener("click", function() {
  outputEl.innerHTML = "（点击上方按钮进行操作）";
});
