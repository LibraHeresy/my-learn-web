// ============================================================
// searchUser(userId): 从 JSONPlaceholder API 获取用户数据
// 参数: userId — 用户 ID（数字 1-10）
// 返回: Promise，resolve 时得到用户对象
// API: https://jsonplaceholder.typicode.com/users/{userId}
// ============================================================

function searchUser(userId) {
  // TODO: 用 fetch() 请求 JSONPlaceholder API
  // 1. fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  // 2. .then(response => response.json())  将响应转为 JSON 对象
  // 3. 返回这个 Promise
}

// ============================================================
// 渲染用户卡片到页面
// ============================================================

function renderCard(user) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <h3>${user.name}</h3>
    <p><span class="label">邮箱</span> ${user.email}</p>
    <p><span class="label">电话</span> ${user.phone}</p>
    <p><span class="label">公司</span> ${user.company ? user.company.name : '-'}</p>
  `;
  return card;
}

// ============================================================
// DOM 元素
// ============================================================

const inputEl = document.querySelector('#search-input');
const btnEl = document.querySelector('#search-btn');
const resultsEl = document.querySelector('#results');
const loadingEl = document.querySelector('#loading');
const errorEl = document.querySelector('#error-msg');

function showLoading() {
  loadingEl.classList.remove('hidden');
  errorEl.classList.add('hidden');
  resultsEl.innerHTML = '';
}

function hideLoading() {
  loadingEl.classList.add('hidden');
}

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.remove('hidden');
  hideLoading();
}

// ============================================================
// 搜索按钮点击
// ============================================================

btnEl.addEventListener('click', function () {
  const userId = inputEl.value.trim();
  showLoading();

  // TODO: 在这里用 searchUser(userId)
  //   .then(user => { ... 将 user 渲染到 resultsEl ... })
  //   .catch(err => { ... 显示错误信息 ... })
});
