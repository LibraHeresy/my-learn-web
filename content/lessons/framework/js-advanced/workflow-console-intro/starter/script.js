// 👋 欢迎来到调试训练！
// 这个页面有 5 个故意埋下的错误。打开控制台（F12），然后逐个修复它们。
// 注意：每次只能看到一个错误——修好一个、刷新页面，下一个才会出现！
console.log("🎻 调试训练开始！打开 F12 控制台，红色错误就是你要修复的 bug");
console.log("提示：每修好一个错误就点‘运行’按钮，看下一个错误是什么");
// 错误1：document 拼写错误 
let title = docuement.querySelector(".card-title");
// 错误2：querySelector 大小写错误（修好上面那个才能看到这个）
let likeBtn = document.queryselector("#likeBtn");
// 错误3：变量名不一致——声明的是 likeBtn，用的却是 fixBtn
let msg = document.querySelector("#msg");
fixBtn.addEventListener("click", function() {
  if (likeBtn.textContent === "❤ 收藏") {
    likeBtn.textContent = "❤ 已收藏";
    likeBtn.style.background = "#C9A96E";
    // 错误4：textContent 拼写错误（这行不会在控制台报错，但消息不会更新！）
    msg.textContet = "已添加到你的收藏！";
  } else {
    likeBtn.textContent = "❤ 收藏";
    likeBtn.style.background = "#8B2E2E";
    // 错误5：innerHTML 大小写错误（同样不会报错，但功能不生效）
    msg.innerhtml = "已取消收藏";
  }
});