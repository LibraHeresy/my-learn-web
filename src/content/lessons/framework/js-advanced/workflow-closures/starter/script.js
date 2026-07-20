// ============================================================
// TODO: 实现 createCounter() 闭包工厂函数
// 要求：
//   1. 内部用 let count = 0 声明私有变量
//   2. 返回一个函数，每次调用让 count++ 并返回新值
//   3. 每次调用 createCounter() 都产生独立的计数作用域
// ============================================================

function createCounter() {
  // 在这里用 let 声明私有变量 count，初始值为 0
  // 返回一个函数，让 count 自增 1 后返回
}

// ============================================================
// 页面渲染逻辑 —— 无需修改
// ============================================================

let counterId = 0;

function createCounterCard() {
  counterId++;
  const id = counterId;

  const card = document.createElement('div');
  card.className = 'counter-card';
  card.innerHTML = `
    <p class="counter-title">计数器 #${id}</p>
    <p class="counter-value">0</p>
    <button class="counter-btn">计数+1</button>
  `;

  const valueEl = card.querySelector('.counter-value');
  const btnEl = card.querySelector('.counter-btn');
  const counter = createCounter();

  if (counter) {
    btnEl.addEventListener('click', function () {
      const newVal = counter();
      valueEl.textContent = newVal;
    });
  }

  document.querySelector('#counter-container').appendChild(card);
}

// 默认创建第一个计数器
createCounterCard();

// "创建新计数器"按钮
document.querySelector('#add-counter-btn').addEventListener('click', createCounterCard);
