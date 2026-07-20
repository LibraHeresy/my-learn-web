# 表单 — 收集用户信息

:::analogy
表单就像一张纸质问卷——`<input>` 是填空格，`<label>` 是问题，`<button>` 是提交按钮。用户填什么、选什么，数据就按设计好的格式发出去。你在网上填过的所有东西——注册、搜索、留言——都是表单。
:::


:::prerequisite
**本节你需要知道这些词：**

- **标签（tag）**：用尖括号包裹的标记，成对出现——第一节"认识 HTML"中学过。
- **单标签**：`<br>`、`<img>` 不需要结束标签——第三节、第五节中学过。`<input>` 也是单标签。
- **属性（attribute）**：写在开始标签内的配置项，如 `src="地址"`、`href="网址"`。
- **表格**：`<table>`、`<tr>`、`<td>`——第九节"表格"中学过（表格是做布局的错误用法，表单才是正确的数据收集方式）。
:::

:::explain{title="问题：网页只能'展示'信息，能不能'收集'信息？"}
目前为止你做的网页都是"展示型"的——你写什么，用户看到什么。但真正的网页是双向的：用户注册账号要填信息，搜索商品要输关键词，写评论要打字。

这些都是"表单"（form）——用户输入数据，网页收集数据。

就像快递寄件单：收件人、地址、电话——一张纸上填完所有信息，然后"提交"出去。HTML 表单就是电子版的快递单。
:::

:::explain{title="表单的核心标签 — 一张'问卷'的零件"}
表单由六个主要标签组成，各司其职：

| 标签 | 角色 | 类比 |
|------|------|------|
| `<form>` | 整张表单的容器 | 整张问卷纸 |
| `<input>` | 输入框（单标签），最常用 | 填空线 |
| `<label>` | 输入框前面的标题文字 | "姓名："两个提示字 |
| `<textarea>` | 多行文本输入框 | "备注栏" |
| `<select>` + `<option>` | 下拉选择框 + 选项 | "请选择城市："后面的下拉菜单 |
| `<button>` | 提交按钮 | "提交"按钮 |

```html
<form>
  <label for="name">你的名字：</label>
  <input type="text" id="name" placeholder="请输入你的名字">

  <label for="reason">选择你学习编程的原因：</label>
  <select id="reason">
    <option>请选择...</option>
    <option>转行找工作</option>
    <option>兴趣爱好</option>
    <option>工作需要</option>
  </select>

  <label for="comment">想说的话：</label>
  <textarea id="comment" rows="3" placeholder="请写下你的感想..."></textarea>

  <button type="submit">提交</button>
</form>
```
:::

:::explain{title="label + input 的配对机制"}
`<label>` 的 `for` 属性值必须等于 `<input>` 的 `id` 值——两者配对后，点击 label 文字时光标自动跳进对应的输入框：

```html
<!-- for 和 id 配对：点击"你的名字："三个字，光标自动进入输入框 -->
<label for="name">你的名字：</label>
<input type="text" id="name" placeholder="请输入你的名字">
```

**常见错误：** `for` 写成 `name`，`id` 写成别的——`for` 和 `id` 必须一模一样，就像锁和钥匙必须配对。如果写错了，用户点击标签文字没反应，会以为你的表单是坏的。

这和快递单上"姓名："后面跟着一条填空线是同一个道理——视觉上标签和输入框要对应，代码上 `for` 和 `id` 也要对应。
:::

:::explain{title="表单四个最容易搞混的属性"}
用一张报名表来理解这些属性：

- **id** — 给输入框一个唯一编号。就像老师给每道题编序号：第1题、第2题。`<label for="id">` 靠它找到配对的输入框。
- **for** — label 的属性，指向某个 input 的 `id`。配对后点击文字就能聚焦输入框。
- **name** — 提交表单时数据的"键名"。就像报名表上每道题的题目——"姓名""级别""项目"。服务器通过 `name` 知道用户填的是什么字段。同一组 radio 的 `name` 相同则互斥。
- **value** — 你实际填上去的答案。就像在报名表上写的"张三""中级""打篮球"。`<input>` 的默认值、`<option>` 的选项值都用 `value`。

| 属性 | 问题 | 写在哪个标签 |
|------|------|-------------|
| `id` | "这个输入框叫什么名字？" | `<input>` |
| `for` | "这个标签描述的是哪个输入框？" | `<label>` |
| `name` | "提交数据时这个字段叫什么？" | `<input>`、`<select>`、`<textarea>` |
| `value` | "用户填了什么？或默认值是什么？" | `<input>`、`<option>` |
:::

:::explain{title="GET vs POST — 表单怎么发送数据"}
`<form>` 的 `method` 属性决定数据怎么发送：

- **GET** (`method="GET"`) — 数据拼在网址后面（`?name=张三&reason=转行`），用户能看到。适合：搜索框（搜完可以复制链接分享给朋友）。
- **POST** (`method="POST"`) — 数据藏在请求体中，网址不变。适合：注册、登录、留言——数据里有密码或个人信息，不能暴露在网址上。

默认是 GET。大多数情况下，如果数据包含密码或个人隐私，用 POST。
:::

:::explain{title="现实中的表单"}
你在网上见过的每一个注册页面、每一个搜索框、每一个评论区、每一个"联系我们"页面——全都是表单。淘宝的搜索框是 `<input type="text">`，微信网页版的登录是 `<input type="password">`，知乎的回答框是 `<textarea>`。学会表单，你就能做出任何"收集用户输入"的功能。
:::

:::example{title="看例子"}
下面的代码创建了一张偏好调查表，包含了文本输入、下拉选择和多行文本框：

```html
<!-- form：表单容器，包裹所有输入项 -->
<form>
  <!-- label for="name"：输入框前面的标签文字，for 绑定 input 的 id -->
  <label for="name">你的名字：</label>
  <!-- input type="text"：普通文本输入，placeholder 是灰色提示文字 -->
  <input type="text" id="name" placeholder="请输入你的名字">

  <!-- label for="composer"：绑定 select 的 id -->
  <label for="composer">最喜欢的人物：</label>
  <!-- select：下拉选择框，每个 option 是一个选项 -->
  <select id="composer">
    <option>请选择...</option>
    <option>张三</option>
    <option>李四</option>
  </select>

  <!-- label for="comment"：绑定 textarea 的 id -->
  <label for="comment">想说的话：</label>
  <!-- textarea：多行文本输入，rows="3" 显示 3 行高度 -->
  <textarea id="comment" rows="3" placeholder="请写下你的感想..."></textarea>

  <!-- button type="submit"：提交按钮，点击后触发表单提交 -->
  <button type="submit">提交</button>
</form>
```

切换到预览区，你可以和这个表单互动——点击 label 文字、下拉选择、输入内容、点击提交。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="练习 `<select>` + `<option>` 的组合——每个 `<option>` 是一个可选项，用户只能选一个。文件：编辑区中的 HTML 代码。" expected="下拉框中多了你添加的选项，点击下拉即可选择。"}
在 `<select>` 中添加两个你喜欢的人物选项
::::

::::step{purpose="理解 `type` 属性的力量——同样是 `<input>`，`type=\"date\"` 会变成日期选择器，浏览器提供日历控件。文件：编辑区中的 HTML 代码。" expected="表单中多了一个日期输入框，点击会弹出浏览器自带的日历控件。"}
给表单增加一个 `<input type="date">`，配好 `<label>` 和 `id`（`for` 和 `id` 必须一致）
::::

::::step{purpose="`type=\"email\"` 会触发浏览器的邮箱格式验证——输入的不是 `xx@xx.xx` 格式时，提交会弹出提示。文件：编辑区中的 HTML 代码。" expected="多了一个邮箱输入框。在手机端，键盘会自动切换到邮箱输入模式（带 `@` 和 `.` 按钮）。"}
增加一个 `<input type="email">`，配上 `<label>` 和 `id`，让用户填写邮箱
::::

::::step{purpose="`rows` 控制多行文本框的可见行数，但不限制用户输入更多行——超过行数会出现滚动条。文件：编辑区中的 HTML 代码。" expected="文本框变高了。`rows=\"5\"` 默认显示 5 行高度，但用户输入超过 5 行时滚动条会出现。"}
试试修改 `<textarea>` 的 `rows` 从 `3` 改成 `5`，看输入框变大
::::

::::step{purpose="在预览区实际操作你创建的表单——点击、输入、选择、提交。理解你写的代码如何变成用户体验。文件：切换到预览区。" expected="你能在预览区中点击 label 聚焦输入框、下拉选择、输入多行文字、点击提交。就像一个真实的网页表单。"}
在预览区中实际填写你创建的表单，感受交互体验——点击 label 文字，输入框会自动聚焦吗？
::::

:::

:::recap
这一节你学会了在网页上做表单——`<form>` 是整张表单容器，`<input>` 是输入框（单标签），`<label>` 是输入框前面的提示文字，`<select>` 是下拉菜单，`<textarea>` 是多行文本框，`<button>` 是提交按钮。`<label for="id">` 和 `<input id="...">` 必须配对——`for` 和 `id` 一样才能让点击文字聚焦输入框。`id` 给输入框编号，`name` 是提交时的字段名，`value` 是用户填的答案。用 `type` 属性可以切换输入框的类型（文字、邮箱、密码、日期）。现在你可以创建让别人填写和互动的网页了。
:::

