现在用 fetch 和 async/await 实现基础搜索。

创建一个 `music-searcher` 项目（用 Vite 或简单的 HTML 文件都可以），核心代码：

```js
async function searchMusic(term) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&limit=10&country=cn`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`搜索失败：${response.status}`)
  }
  const data = await response.json()
  return data.results
}
```

注意 `encodeURIComponent(term)` ——中文关键词必须编码才能放在 URL 中。比如"贝多芬"会变成 "%E8%B4%9D%E5%A4%9A%E8%8A%AC"。

然后在页面上：
1. 一个输入框
2. 一个搜索按钮
3. 一个显示结果的列表

点击按钮时调用 `searchMusic`，把返回的结果渲染到页面上——每首歌显示歌名、歌手和封面图。
