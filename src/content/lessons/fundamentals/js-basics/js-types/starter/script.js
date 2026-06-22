// 数据定义
let composer = "巴赫";
let birthYear = 1685;
let currentYear = 2026;
let isBaroque = birthYear >= 1600 && birthYear <= 1750;
// 计算周年
let anniversary = currentYear - birthYear;
// 判断是否能被 4 整除
let divBy4 = birthYear % 4 === 0;
// 显示到页面
document.querySelector("#name").textContent = composer;
document.querySelector("#year").textContent = birthYear;
document.querySelector("#anniversary").textContent = anniversary + " 年";
document.querySelector("#baroque").textContent = isBaroque ? "是" : "否";
document.querySelector("#divBy4").textContent = divBy4 ? "是 (" + birthYear + " ÷ 4 = " + (birthYear/4) + ")" : "否";