// ============================================================
// 商品数据数组
// ============================================================

const products = [
  { name: '蓝牙耳机', price: 299 },
  { name: '机械键盘', price: 459 },
  { name: '显示器支架', price: 189 },
  { name: '无线鼠标', price: 129 },
  { name: 'USB-C 扩展坞', price: 349 }
];

// ============================================================
// TODO: 用 forEach 循环遍历 products 数组，
// 为每个商品创建列表项 DOM 元素并插入 #list-container
// ============================================================

function renderList() {
  const container = document.querySelector('#list-container');
  container.innerHTML = ''; // 清空容器

  // TODO: 使用 products.forEach((product, index) => { ... })
  // 为每个商品创建一个 .list-item 的 div，包含：
  //   - .item-index 显示序号
  //   - .item-name 显示商品名
  //   - .item-price 显示价格（带 ¥ 符号）
  // 最后将元素 appendChild 到 container
}

// ============================================================
// 按钮点击生成列表
// ============================================================

document.querySelector('#generate-btn').addEventListener('click', renderList);
