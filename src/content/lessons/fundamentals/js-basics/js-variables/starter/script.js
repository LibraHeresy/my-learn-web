// 用变量存储音乐信息
let composer = "弗雷德里克·肖邦";
let piece = "降E大调夜曲 Op.9 No.2";
// 用模板字符串拼接一句话
let description = `${composer}的代表作之一是《${piece}》。`;
// 把变量的值显示到页面上
document.querySelector("#composer").textContent = composer;
document.querySelector("#piece").textContent = piece;
document.querySelector("#description").textContent = description;