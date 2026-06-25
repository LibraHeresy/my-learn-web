# 表单 — 收集你的音乐信息

:::music-analogy
表单就像**报名表**或**节目征集单**——听众填写他们的音乐偏好，就像演奏者在报名表上写下自己的声部。`<input>` 是填空格，`<label>` 是问题，`<button>` 是"提交"按钮。
:::

:::explain{title="什么是表单？"}
你在网上填过的所有东西——考级报名、搜索曲谱、写留言——都是表单（form）。form 是整张表单的容器，input 是填空线（单标签），label 是填空线前面的标题，select 是下拉选择框（内含 option 选项），textarea 是多行文本框，button 是提交按钮。

就像快递寄件单——一张纸上填完收件人、地址、电话所有信息。

表单的核心标签：
- `<form>` — 整个表单的容器
- `<input>` — 输入框，最常用的表单元素
- `<label>` — 标签，描述输入框的用途
- `<textarea>` — 多行文本输入框
- `<select>` + `<option>` — 下拉选择框
- `<button>` — 提交按钮
:::

:::explain{title="各种输入类型"}
`<input>` 标签通过 `type` 属性可以变成不同类型的输入框：
- `type="text"` — 普通文本输入
- `type="email"` — 邮箱地址输入
- `type="password"` — 密码输入（显示为圆点）
- `type="date"` — 日期选择器
- `placeholder="..."` — 输入框中的提示文字
```html
<input type="text" placeholder="请输入你的名字">
<input type="email" placeholder="请输入邮箱">
<input type="date">
```
不同的 type 就像不同的乐器，各有各的用途！
:::

:::explain{title="下拉框与多行文本"}
`<select>` 创建下拉选择框，`<option>` 是其中的选项：
```html
<select>
  <option>巴赫</option>
  <option>莫扎特</option>
  <option>肖邦</option>
</select>
```
`<textarea>` 创建多行文本输入框，用 `rows` 设置行数：
```html
<textarea rows="3" placeholder="请写下你的感想..."></textarea>
```
`<label>` 的 `for` 属性对应 `<input>` 的 `id`，点击标签文字时输入框会自动获得焦点——就像节目单上"独奏者："后面跟着一条填空线。
:::

:::example{title="看例子"}
下面的代码创建了一张音乐偏好调查表。包含了文本输入、下拉选择和多行文本框：
```html
<!-- form：表单容器，包裹所有输入项 -->
<form>
  <!-- label：输入框前面的标签文字，for 绑定 input 的 id -->
<label for="name">你的名字：</label>
  <input type="text" id="name" placeholder="请输入你的名字">
  <label for="composer">最喜欢的作曲家：</label>
  <select id="composer">
    <option>请选择...</option>
    <option>巴赫</option>
    <option>肖邦</option>
  </select>
  <label for="comment">想说的话：</label>
  <textarea id="comment" rows="3"></textarea>
  <button type="submit">提交</button>
</form>
```
切换到预览区，可以和这个表单互动！

---

**表单四个最容易搞混的属性**（用一张考级报名表来理解）：

id — 给输入框一个唯一编号（就像老师给每道题编序号：第1题、第2题）
for — label 通过 for 指向某个 input 的 id，配对后点击文字就能聚焦输入框（就像"姓名："后面的填空线）
name — 提交表单时数据标签的名称，radio 同名的互斥（就像报名表上每道题的题目——"姓名""级别""曲目"）
value — 你实际填上去的答案（就像在报名表上写的"张三""中级""春到清江"）

错误示范：label 的 for 和 input 的 id 写得不一样 → 点击"姓名："两个字，输入框没反应！for 和 id 必须一模一样，就像锁和钥匙必须配对。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="练习 `<select>` + `<option>` 的组合——每个 `<option>` 是一个可选项。" expected="下拉框中多了你添加的选项，点击即可选择。"}
在 `<select>` 中添加两个你喜欢的作曲家选项
::::

::::step{purpose="理解 `type` 属性的力量——同样是 `<input>`，`type=\"date\"` 会变成日期选择器，浏览器提供日历控件。" expected="表单中多了一个日期输入框，点击会弹出日历。"}
给表单增加一个 `<input type="date">`，让用户选择最早接触音乐的日期
::::

::::step{purpose="`type=\"email\"` 会触发浏览器的邮箱验证——输入的不是邮箱格式时，提交会报错。" expected="多了一个邮箱输入框。在移动端，键盘会自动切换到邮箱输入模式。"}
增加一个 `<input type="email">`，让用户填写邮箱
::::

::::step{purpose="`rows` 控制多行文本框的可见行数，但不限制用户输入更多行。" expected="文本框变高了。`rows=\"5\"` 显示 5 行高度。"}
试试修改 `<textarea>` 的 `rows` 从 `3` 改成 `5`，看输入框变大
::::

::::step{purpose="表单的意义在于交互——不只是看代码，更重要的是体验用户如何使用你创建的表单。" expected="你能在预览区中点击、输入、选择、下拉，就像一个真实的网页表单。"}
在预览区中实际填写表单，感受交互体验
::::

:::

:::recap
这一节你学会了在网页上做表单——`<input>` 是输入框，`<select>` 是下拉菜单，`<textarea>` 是多行文本框，`<button>` 是提交按钮。用 `type` 属性可以切换输入框的类型（文字、邮箱、密码、日期）。现在你可以创建一张让别人填写的网页表格了。
:::

:::listen-to
小约翰·施特劳斯《蓝色多瑙河》— 圆舞曲的互动性就像表单与用户的对话，你来我往，优雅流畅。
:::

