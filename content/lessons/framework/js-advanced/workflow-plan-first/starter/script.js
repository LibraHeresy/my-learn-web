// ===== 1. 获取所有需要的 DOM 元素 =====
let titleEl = document.querySelector("h1");
// 提示：还需要获取统计区的 <p> 元素，用来显示收藏数量
// ===== 2. 点击标题时切换随机口号 =====
// 1) 先创建一个口号数组：
//    let slogans = ["每一段旋律都值得被收藏", "音乐是心灵的笔记", "收藏美好，从一首曲子开始"];
// 2) 在 click 函数中：
//    - 用 Math.random() 生成随机索引
//    - 用 Math.floor() 取整
//    - 用 titleEl.textContent = slogans[随机索引] 替换标题文字
titleEl.addEventListener("click", function() {
  // 在这里写你的代码：随机选一句口号替换 h1 的 textContent
});
// ===== 3. 计算并显示统计数据 =====
// 提示：用 querySelectorAll("要选择的元素") 获取所有卡片
// 然后 .length 得到数量，显示在统计区的 <p> 中
