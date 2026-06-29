现在改进体验：用户不需要点击按钮——只需输入文字，自动触发搜索。

但直接监听 `input` 事件会导致每次按键都发请求（太频繁了）。用你学过的**防抖**来解决：

```js
function debounce(fn, delay = 400) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
// 防抖版搜索：用户停止输入 400ms 后才真正请求
const debouncedSearch = debounce(async (term) => {
  if (!term.trim()) {
    results.innerHTML = ''
    return
  }
  results.innerHTML = '<p>搜索中...</p>'
  const data = await searchMusic(term)
  renderResults(data)
}, 400)
// 监听输入
input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value)
})
```

现在删除搜索按钮，改为实时搜索。输入"贝多芬"——你会发现停止打字后只发了一次请求，而不是三次。
