// 题目索引：题号 → { folder, file }
// 用于生成"下一题"链接
// 阶段顺序：1 JS基础 → 2 JS进阶 → 3 算法 → 4 DOM → 5 异步 → 6 Vue → 7 项目

const questions = [
  // 阶段1 JS基础
  { num: 1, folder: 'stage1-js基础', file: '01-两数之和.html' },
  { num: 2, folder: 'stage1-js基础', file: '02-判断奇偶.html' },
  { num: 3, folder: 'stage1-js基础', file: '03-数组最大值.html' },
  { num: 4, folder: 'stage1-js基础', file: '04-统计字符出现次数.html' },
  { num: 5, folder: 'stage1-js基础', file: '05-过滤偶数.html' },
  { num: 6, folder: 'stage1-js基础', file: '06-反转字符串.html' },
  { num: 7, folder: 'stage1-js基础', file: '07-判断回文.html' },
  { num: 8, folder: 'stage1-js基础', file: '08-数组去重.html' },
  { num: 9, folder: 'stage1-js基础', file: '09-累加求和.html' },
  { num: 10, folder: 'stage1-js基础', file: '10-遍历打印对象.html' },
  // 阶段2 JS进阶
  { num: 11, folder: 'stage2-js进阶', file: '11-reduce 累加求和.html' },
  { num: 12, folder: 'stage2-js进阶', file: '12-reduce 统计词频.html' },
  { num: 13, folder: 'stage2-js进阶', file: '13-sort 对象数组排序.html' },
  { num: 14, folder: 'stage2-js进阶', file: '14-find-some-every 运用.html' },
  { num: 15, folder: 'stage2-js进阶', file: '15-对象 keys-values-entries.html' },
  { num: 16, folder: 'stage2-js进阶', file: '16-字符串处理实战.html' },
  { num: 17, folder: 'stage2-js进阶', file: '17-模拟微任务宏任务.html' },
  { num: 18, folder: 'stage2-js进阶', file: '18-深拷贝进阶.html' },
  { num: 19, folder: 'stage2-js进阶', file: '19-正则提取数字.html' },
  { num: 20, folder: 'stage2-js进阶', file: '20-对象数组按字段去重.html' },
  // 阶段3 算法
  { num: 21, folder: 'stage3-算法', file: '21-斐波那契数列.html' },
  { num: 22, folder: 'stage3-算法', file: '22-判断质数.html' },
  { num: 23, folder: 'stage3-算法', file: '23-冒泡排序.html' },
  { num: 24, folder: 'stage3-算法', file: '24-二分查找.html' },
  { num: 25, folder: 'stage3-算法', file: '25-找出重复数字.html' },
  { num: 26, folder: 'stage3-算法', file: '26-两个数组交集.html' },
  { num: 27, folder: 'stage3-算法', file: '27-判断异位词.html' },
  { num: 28, folder: 'stage3-算法', file: '28-统计元素频次.html' },
  { num: 29, folder: 'stage3-算法', file: '29-扁平化嵌套数组.html' },
  { num: 30, folder: 'stage3-算法', file: '30-深拷贝.html' },
  // 阶段4 DOM
  { num: 31, folder: 'stage4-dom', file: '31-点击显示文字.html' },
  { num: 32, folder: 'stage4-dom', file: '32-切换显示-隐藏.html' },
  { num: 33, folder: 'stage4-dom', file: '33-实时显示输入.html' },
  { num: 34, folder: 'stage4-dom', file: '34-添加列表项.html' },
  { num: 35, folder: 'stage4-dom', file: '35-标记完成.html' },
  { num: 36, folder: 'stage4-dom', file: '36-计数器.html' },
  { num: 37, folder: 'stage4-dom', file: '37-随机背景色.html' },
  { num: 38, folder: 'stage4-dom', file: '38-表单验证.html' },
  { num: 39, folder: 'stage4-dom', file: '39-延时提示.html' },
  { num: 40, folder: 'stage4-dom', file: '40-倒计时.html' },
  // 阶段5 异步
  { num: 41, folder: 'stage5-异步', file: '41-Promise 延时.html' },
  { num: 42, folder: 'stage5-异步', file: '42-async-await 延时.html' },
  { num: 43, folder: 'stage5-异步', file: '43-fetch 请求.html' },
  { num: 44, folder: 'stage5-异步', file: '44-防抖 debounce.html' },
  { num: 45, folder: 'stage5-异步', file: '45-节流 throttle.html' },
  { num: 46, folder: 'stage5-异步', file: '46-发布订阅.html' },
  { num: 47, folder: 'stage5-异步', file: '47-闭包计数器.html' },
  { num: 48, folder: 'stage5-异步', file: '48-手写 bind.html' },
  { num: 49, folder: 'stage5-异步', file: '49-Promise.all.html' },
  { num: 50, folder: 'stage5-异步', file: '50-手写 Promise.html' },
  // 阶段6 Vue
  { num: 51, folder: 'stage6-vue', file: '51-计数器.html' },
  { num: 52, folder: 'stage6-vue', file: '52-渲染列表.html' },
  { num: 53, folder: 'stage6-vue', file: '53-条件渲染.html' },
  { num: 54, folder: 'stage6-vue', file: '54-双向绑定.html' },
  { num: 55, folder: 'stage6-vue', file: '55-Todo List.html' },
  { num: 56, folder: 'stage6-vue', file: '56-父传子 props.html' },
  { num: 57, folder: 'stage6-vue', file: '57-子传父 emit.html' },
  { num: 58, folder: 'stage6-vue', file: '58-搜索过滤 computed.html' },
  { num: 59, folder: 'stage6-vue', file: '59-监听 watch.html' },
  { num: 60, folder: 'stage6-vue', file: '60-待办统计.html' },
  // 阶段7 项目
  { num: 61, folder: 'stage7-项目', file: '61-天气查询.html' },
  { num: 62, folder: 'stage7-项目', file: '62-购物车.html' },
  { num: 63, folder: 'stage7-项目', file: '63-记账本.html' },
  { num: 64, folder: 'stage7-项目', file: '64-待办完整版.html' },
  { num: 65, folder: 'stage7-项目', file: '65-随机名言.html' },
  { num: 66, folder: 'stage7-项目', file: '66-个人简历页.html' },
  { num: 67, folder: 'stage7-项目', file: '67-组件库按钮弹窗.html' },
  { num: 68, folder: 'stage7-项目', file: '68-多页面应用.html' },
  { num: 69, folder: 'stage7-项目', file: '69-GitHub 用户搜索.html' },
  { num: 70, folder: 'stage7-项目', file: '70-毕业项目.html' },
];

// 获取下一题（相对当前 HTML 文件的路径）。若为最后一题返回 null
function getNext(num) {
  const next = questions.find(q => q.num === num + 1);
  if (!next) return null;
  const current = questions.find(q => q.num === num);
  if (current && current.folder === next.folder) {
    return next.file;
  }
  return `../${next.folder}/${next.file}`;
}

module.exports = { questions, getNext };
