const pauseBtn = document.getElementById('pauseBtn');
const stage = document.querySelector('.stage');
pauseBtn.addEventListener('click', () => {
  const isPaused = stage.classList.toggle('paused');
  pauseBtn.textContent = isPaused ? '▶ 恢复动画' : '⏯ 暂停动画';
});