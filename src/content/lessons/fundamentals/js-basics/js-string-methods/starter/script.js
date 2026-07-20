// 模拟 CSV 数据：姓名, 年龄, 城市, 状态
let rawCSV = "张三, 25, 北京, 待确认";

// 显示原始数据
let originalEl = document.querySelector("#original");
let outputEl = document.querySelector("#output");

function updateDisplay(text) {
  originalEl.textContent = rawCSV;
  outputEl.textContent = text;
}

// 初始显示：用 split 拆分
function showSplit() {
  let parts = rawCSV.split(",");
  updateDisplay(parts.join(" | "));
}
showSplit();

// 处理按钮：对输入框的文本进行处理
document.querySelector("#processBtn").addEventListener("click", function() {
  let inputVal = document.querySelector("#textInput").value;
  if (inputVal.trim() === "") {
    outputEl.textContent = "（请输入文本）";
    return;
  }
  // TODO: 在这里对 inputVal 进行处理并显示结果
  // 例如：邮箱拆分（indexOf + slice）、替换操作等
  let atPos = inputVal.indexOf("@");
  if (atPos !== -1) {
    let username = inputVal.slice(0, atPos);
    let domain = inputVal.slice(atPos + 1);
    outputEl.textContent = "用户名：" + username + " | 域名：" + domain;
  } else {
    outputEl.textContent = inputVal.replace("待确认", "已确认");
  }
});

// 重置按钮
document.querySelector("#resetBtn").addEventListener("click", function() {
  document.querySelector("#textInput").value = "";
  showSplit();
});
