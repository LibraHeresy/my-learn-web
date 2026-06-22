// === 练习区 ===
const instrument = {
  name: '小提琴',
  family: '弦乐',
  range: 'G3-E6'
}

// 原始 describe 函数（你需要用箭头函数重写它）
	function describe(instrument) {
	  return instrument.name + ' 是' + instrument.family + '乐器，音域' + instrument.range
	}

	// 1. 用解构赋值取出三个属性
// TODO: 在这里写代码

// 2. 用箭头函数重写 describe（用模板字符串）
// TODO: 在这里写代码

// 3. 用展开运算符添加 players 属性
// TODO: 在这里写代码

console.log('乐器信息：', describe(instrument))