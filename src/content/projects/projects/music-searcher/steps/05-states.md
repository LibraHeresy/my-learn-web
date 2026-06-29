一个专业的搜索功能需要处理多种状态：
1. **空状态** — 页面刚打开，还没搜索任何东西
2. **加载中** — 正在请求 API（显示 loading 动画）
3. **有结果** — 正常展示搜索结果
4. **无结果** — API 返回了，但没有匹配项
5. **错误** — 网络故障、API 挂了、请求超时

用代码表示：

```js
const state = {
  idle: 'idle',        // 空状态
  loading: 'loading',  // 加载中
  success: 'success',  // 有结果
  empty: 'empty',      // 无结果
  error: 'error'        // 出错了
}
let currentState = 'idle'
function renderByState() {
  switch (currentState) {
    case 'idle':
      results.innerHTML = '<p class="placeholder">输入关键词开始搜索 🎵</p>'
      break
    case 'loading':
      results.innerHTML = '<div class="loading">搜索中...</div>'
      break
    case 'empty':
      results.innerHTML = '<p class="placeholder">没有找到相关音乐 😔</p>'
      break
    case 'error':
      results.innerHTML = '<p class="error">网络出问题了，请重试 🔌</p>'
      break
    case 'success':
      // 正常渲染结果
      break
  }
}
```

**这五种状态覆盖了用户会遇到的每一种情况。** 一个专业的应用永远不会让用户面对"什么都不发生"的困惑。
