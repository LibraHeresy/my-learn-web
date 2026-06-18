console.log('A: 序曲')

setTimeout(() => console.log('C: 第二乐章'), 500)
setTimeout(() => console.log('D: 第三乐章'), 0)

console.log('B: 第一乐章')

// 你的预测顺序：_______
// 实际运行后，理解为什么是这个顺序