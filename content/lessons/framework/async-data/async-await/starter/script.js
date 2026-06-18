// 模拟 API（不要修改）
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchConcert() {
  await delay(500)
  return { id: 'c001', title: '维也纳新年音乐会', place: '金色大厅' }
}

async function fetchProgram(concertId) {
  await delay(500)
  return { concertId, pieces: ['蓝色多瑙河', '拉德茨基进行曲'] }
}

// TODO: 实现 loadConcert 函数
async function loadConcert() {
  // 在这里写代码
}

// 测试
loadConcert().then(data => console.log('结果：', data))