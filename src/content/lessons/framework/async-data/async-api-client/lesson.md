# 封装 API 客户端 — 打造你的"专属乐务"

:::music-analogy
专业乐团有乐务（stage manager），负责处理所有后勤——联系场地、安排排练、协调乐器。你不会让指挥跑去订盒饭。同样，把所有的 fetch 逻辑封装到专门的 API 模块中，让代码各司其职。
:::

:::explain{title="为什么需要封装？"}
之前我们把 fetch 直接写在业务逻辑里。随着项目变大，问题来了：
- 每个接口都要重复写 `fetch(BASE_URL + '/...')`
- 每个请求都要重复检查 `response.ok`
- 基础 URL 改了要改几十处
- 没有统一的错误处理
**解决方式：** 创建一个 `apiClient` 模块，统一管理所有请求。
:::

:::example{title="基础 API 客户端"}
```js
// api.js — 你的"乐务"
const BASE_URL = 'https://api.example.com'
async function request(path, options = {}) {
  const url = BASE_URL + path
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers  // 合并自定义 headers
    },
    ...options
  })
  if (!response.ok) {
    throw new Error(\`请求失败：\${response.status}\`)
  }
  return response.json()
}
// 语义化方法
export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, {
    method: 'POST',
    body: JSON.stringify(body)
  }),
  delete: (path) => request(path, { method: 'DELETE' })
}
```
:::

:::example{title="使用封装后的 API"}
对比前后的代码：
```js
// ❌ 未封装：每个地方都要写完整 fetch
const res = await fetch(BASE_URL + '/pieces', {
  headers: { 'Content-Type': 'application/json' }
})
if (!res.ok) throw new Error('请求失败')
const data = await res.json()
// ✅ 封装后：一行搞定
const data = await api.get('/pieces')
```
封装的好处：
- 代码量减少 80%
- 修改 BASE_URL 只改一处
- 错误处理统一，不会遗漏
- 可以方便地添加日志、token 等功能
:::

:::task{title="动手试试 ✨"}
::::step{purpose="封装的核心价值是\"写一次，到处用\"——所有请求共用一个 BASE_URL、一个错误处理逻辑、一个响应解析流程。就像乐务统一负责所有演出的场地和设备，指挥不需要每次联系不同的人。" expected="api.get(\"/posts\") 返回一个 Promise，解析后得到帖子数组。"}
实现 api.get(path)：内部用 fetch(BASE_URL + path) 发送请求，检查 response.ok，返回 response.json()
::::

::::step{purpose="封装后的调用只一行代码——对比未封装时需要写 fetch+检查 ok+解析 json 三步，代码量减少 80%。修改 BASE_URL 也只需改一处，所有 api.get() 调用自动生效。" expected="控制台输出前 2 条帖子数据，与直接用 fetch 的结果完全一致，但代码简洁得多。"}
用封装好的 api.get("/posts") 获取数据，调用 .slice(0, 2) 取前 2 条显示
::::

:::

:::hint{title="提示"}
```js
const BASE_URL = 'https://jsonplaceholder.typicode.com'
const api = {
  get: async (path) => {
    const res = await fetch(BASE_URL + path)
    if (!res.ok) throw new Error('请求失败')
    return res.json()
  }
}
```
:::

:::recap
你学会了把 fetch 请求逻辑封装到一个 API 模块里，统一管理 BASE_URL、错误处理和 JSON 解析。封装后，调用接口只需要一行代码，修改基础地址也只改一处，代码量少 80%。
:::

:::listen-to
柴可夫斯基《胡桃夹子》— 每个角色（糖梅仙子、花之圆舞曲、俄罗斯舞曲）都有明确的"职责"，合在一起却有统一的风格。好的 API 模块设计也是如此。
:::

