// ============================================================
// 商品数据数组
// ============================================================

const products = [
  { name: '笔记本电脑', category: 'electronics', price: 5999, icon: '💻' },
  { name: '蓝牙音箱', category: 'electronics', price: 399, icon: '🔊' },
  { name: '全麦面包', category: 'food', price: 12, icon: '🍞' },
  { name: '有机牛奶', category: 'food', price: 8, icon: '🥛' },
  { name: '纯棉T恤', category: 'clothing', price: 79, icon: '👕' },
  { name: '运动跑鞋', category: 'clothing', price: 459, icon: '👟' },
  { name: '机械键盘', category: 'electronics', price: 699, icon: '⌨️' },
  { name: '速溶咖啡', category: 'food', price: 45, icon: '☕' }
];

// ============================================================
// 渲染函数：将商品数组渲染到指定容器
// ============================================================

function renderProducts(list, containerId) {
  const container = document.querySelector(containerId);
  container.innerHTML = '';
  list.forEach(function (item) {
    const div = document.createElement('div');
    div.className = 'data-item';
    div.innerHTML = `
      <span class="item-icon">${item.icon}</span>
      <span class="item-name">${item.name}</span>
      <span class="item-category">${item.category}</span>
      <span class="item-price">¥${item.price}</span>
    `;
    container.appendChild(div);
  });
}

// ============================================================
// 初始渲染：全部数据显示在左列
// ============================================================

renderProducts(products, '#all-data');

// ============================================================
// TODO: 实现筛选逻辑
// 用 products.filter() 按 category 筛选，
// 将结果用 renderProducts() 渲染到 #filtered-data
// ============================================================

function applyFilter(category) {
  // TODO:
  // 1. 如果 category === 'all'，显示全部
  // 2. 否则用 products.filter(item => item.category === category) 筛选
  // 3. 调用 renderProducts(filtered, '#filtered-data') 渲染
}

// ============================================================
// 筛选按钮点击事件
// ============================================================

document.querySelectorAll('.filter-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    // 切换激活样式
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const category = this.dataset.filter;
    applyFilter(category);
  });
});

// ============================================================
// 搜索输入
// ============================================================

document.querySelector('#search-input').addEventListener('input', function () {
  const keyword = this.value.trim().toLowerCase();
  // TODO: 用 filter 筛选名称包含 keyword 的商品，
  // 将结果渲染到 #filtered-data
});

// 初始显示全部到筛选列
applyFilter('all');
