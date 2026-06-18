// 模拟搜索函数（不要修改）
function searchMusic(keyword) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (keyword.length > 0) {
        resolve({ keyword, results: ['曲目A', '曲目B', '曲目C'] })
      } else {
        reject(new Error('搜索关键词不能为空'))
      }
    }, 800)
  })
}

// TODO: 用 .then() 和 .catch() 调用 searchMusic
