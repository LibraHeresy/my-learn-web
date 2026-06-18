let target = Math.floor(Math.random() * 100);
let score = 100;
let attempts = 0;
console.log('🎯 答案在这里（调试时你可以在 Scope 面板中看到 target）：', target);
const input = document.getElementById('guessInput');
const btn = document.getElementById('guessBtn');
const msg = document.getElementById('message');
const scoreDisplay = document.getElementById('scoreDisplay');
const attemptsDisplay = document.getElementById('attemptsDisplay');
const resetBtn = document.getElementById('resetBtn');
function guess(num) {
  attempts++;
  attemptsDisplay.textContent = attempts;
  if (num > target) {
    score -= 10;
    scoreDisplay.textContent = score;
    return '📈 太大了！往下猜';
  } else if (num < target) {
    score -= 10;
    scoreDisplay.textContent = score;
    return '📉 太小了！往上猜';
  } else {
    return { text: '🎉 恭喜！答案就是 ' + target + '。得分：' + score, isWin: true };
  }
}
btn.addEventListener('click', () => {
  const val = parseInt(input.value);
  if (isNaN(val) || val < 0 || val > 99) {
    msg.textContent = '请输入 0~99 之间的数字';
    msg.className = 'message';
    return;
  }
  const result = guess(val);
  if (typeof result === 'string') {
    msg.textContent = result;
    msg.className = 'message hint';
  } else {
    msg.textContent = result.text;
    msg.className = result.isWin ? 'message win' : 'message';
    btn.disabled = result.isWin;
  }
  input.value = '';
  input.focus();
});
resetBtn.addEventListener('click', () => {
  target = Math.floor(Math.random() * 100);
  score = 100;
  attempts = 0;
  scoreDisplay.textContent = score;
  attemptsDisplay.textContent = attempts;
  msg.textContent = '';
  msg.className = 'message';
  btn.disabled = false;
  console.log('🎯 新答案是：', target);
  input.focus();
});