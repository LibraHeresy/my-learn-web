// ============================================================
// 员工对象数组 —— 每个对象是一条员工记录
// ============================================================

const employees = [
  { name: '张伟', department: '技术部', position: '前端工程师', email: 'zhangwei@example.com' },
  { name: '李娜', department: '设计部', position: 'UI 设计师', email: 'lina@example.com' },
  { name: '王磊', department: '技术部', position: '后端工程师', email: 'wanglei@example.com' },
  { name: '陈静', department: '市场部', position: '市场经理', email: 'chenjing@example.com' }
];

// ============================================================
// TODO: 实现 renderCards() 函数
// 遍历 employees 数组，为每个员工创建一张卡片并插入 #gallery
// ============================================================

function renderCards(dataList) {
  const gallery = document.querySelector('#gallery');
  gallery.innerHTML = '';

  // TODO: 使用 dataList.forEach(employee => { ... })
  // 为每个员工创建 .card 的 div，包含：
  //   - .avatar 显示名字首字
  //   - h2 显示姓名
  //   - p 显示部门、职位、邮箱
  //   - .role-badge 显示职位标签
  // 将卡片 appendChild 到 gallery
}

// ============================================================
// 初始渲染
// ============================================================

renderCards(employees);
