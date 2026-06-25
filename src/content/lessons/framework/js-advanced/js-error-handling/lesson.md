# 错误处理 — 给代码上"保险"

:::music-analogy
演奏中难免出错（碰错音、进错拍），好乐手知道如何处理——继续演奏而不是停下来。编程也一样：错误一定会发生，关键是优雅地处理它们，而不是让整个程序"戛然而止"。
:::

:::explain{title="什么会出错？"}
在之前的学习中，你可能遇到过这些情况：
- 点击按钮没反应（JS 报错了，后面的代码不执行）
- 页面白屏（一个错误导致整个脚本崩溃）
- 数据加载失败（网络问题、API 挂了）
就像一个乐团的定音鼓手突然缺席，指挥需要有后备方案。程序中，我们用 **try/catch** 来应对。
:::

:::example{title="try/catch — \"排练一下，看看会不会出错\""}
基本结构：
```js
try {
  // 尝试执行可能有风险的代码
  const data = JSON.parse(userInput)
  console.log('解析成功：', data)
} catch (error) {
  // 如果出错，在这里处理
  console.log('解析失败，请输入合法的 JSON')
  console.log('错误详情：', error.message)
}
```**try** 说"试试这段代码"。**catch** 说"如果出错了，执行这段"。
就像排练时你标记出可能出错的地方，想好补救方案。
:::

:::example{title="throw — 主动\"喊停\""}
有时候你需要主动抛出错误：
```js
function setVolume(level) {
  if (level < 0 || level > 100) {
    throw new Error('音量必须在 0-100 之间')
  }
  console.log('音量设置为：' + level)
}
try {
  setVolume(150)  // 这会触发错误
} catch (e) {
  console.log('设置失败：' + e.message)
}
````throw` 就像指挥突然停下乐队："不对，长号声音太大了！"——主动发现并指出问题。
:::

:::example{title="实际场景：localStorage 读取"}
`localStorage` 读取时经常出错（数据损坏、格式不对）：
```js
function loadCollection() {
  try {
    const raw = localStorage.getItem('my-collection')
    if (!raw) return []  // 没有数据，返回空数组
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) throw new Error('数据格式错误')
    return data
  } catch (e) {
    console.log('读取收藏失败，已重置：', e.message)
    return []  // 出错就返回空数组，程序不崩溃
  }
}
```这就是"防御性编程"——假设任何可能出错的地方都会出错，提前做好准备。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="JSON.parse 是常见的\"炸弹\"——传入非法字符串就直接报错崩溃。try/catch 就是防爆服：把可能爆炸的代码放在 try 里，一旦炸了，catch 会接住它而不是让整个程序崩溃。" expected="传入合法 JSON 字符串时，返回解析后的 JS 对象——与直接调用 JSON.parse 的行为一致。"}
用 try 包裹 JSON.parse(str) 的调用，将解析结果赋值给一个变量并返回
::::

::::step{purpose="catch 不只是\"吞掉\"错误，还可以把错误信息包装成友好的格式返回给调用者。这样调用者不需要 try/catch，直接检查返回值的 error 属性就知道是否出错了。这是\"防御性编程\"的核心思想。" expected="传入非法 JSON 字符串时，返回 { error: true, message: \"Unexpected token...\" } 而不是报错崩溃。"}
在 catch 块中返回 { error: true, message: error.message }——描述发生了什么错误
::::

::::step{purpose="测试两条分支（成功路径和失败路径）是确保 try/catch 正确实现的关键。就像排练时既练习正常演奏流程，也演练弦断了怎么办——两条路径都验证过，你的代码才算可靠。" expected="控制台分别输出解析成功的对象和包含 error: true 的错误对象，程序没有崩溃。"}
分别传入合法 JSON（{"name": "月光", "composer": "贝多芬"}）和非法 JSON（"这不是JSON"），测试两种路径
::::

:::

:::hint{title="提示"}
```js
function safeParse(str) {
  try {
    const result = JSON.parse(str)
    return result  // 成功则返回解析结果
  } catch (e) {
    return { error: true, message: e.message }  // 失败返回错误对象
  }
}
```
:::

:::recap
你学会了用 try/catch 给代码上"保险"——把可能出错的操作放在 try 里执行，出错时 catch 会接住它，程序不会崩溃。还可以用 throw 主动抛出错误，提前拦截非法输入。
:::

:::listen-to
爵士乐即兴演奏 — 爵士乐手最擅长的就是在"错误"中找到新的旋律。一个"错音"可以被变成经过音，编程中的错误也可以被优雅地化解。
:::

