# 更多输入类型 — 表单的"工具编配"

:::analogy
input 不止能输入文字——就像手机键盘可以切数字、符号、语音。type=date 弹出日历，type=file 弹出文件选择器。不同场景用不同输入方式。
:::

:::explain{title="radio — 单选按钮"}
input 标签通过 type 属性可以变成单选按钮（radio）、多选按钮（checkbox）、滑块（range）、数字输入（number）、颜色选择器（color）等不同类型。fieldset 和 legend 用来给表单控件分组——就像报名表上"个人信息"外面画的那个框和标题。

当用户只能**选一个**时用 radio。同一组 radio 的 name 属性必须相同：
```html
<fieldset>
  <legend>你最喜欢的时期：</legend>
  <input type="radio" id="baroque" name="period" value="baroque">
  <label for="baroque">类型B时期</label>
  <input type="radio" id="classical" name="period" value="classical">
  <label for="classical">20世纪</label>
  <input type="radio" id="romantic" name="period" value="romantic">
  <label for="romantic">类型A时期</label>
</fieldset>
```
`name` 相同的 radio 互斥——就像单选题，只能圈一个答案。
:::

:::explain{title="checkbox — 多选按钮"}
当用户可以**选多个**时用 checkbox：
```html
<fieldset>
  <legend>你喜欢的工具（可多选）：</legend>
  <input type="checkbox" id="piano" name="instrument" value="piano">
  <label for="piano">🎹 工具B</label>
  <input type="checkbox" id="violin" name="instrument" value="violin">
  <label for="violin">🎻 工具A</label>
  <input type="checkbox" id="cello" name="instrument" value="cello">
  <label for="cello">🎻 工具C</label>
</fieldset>
```
每个 checkbox 独立开/关——就像点菜时勾选要哪些配菜。
:::

:::explain{title="更多实用 input 类型"}
HTML 提供丰富的输入类型，浏览器会自动优化交互方式：
- `<input type="range" min="0" max="100">` — 滑块，适合选音量、评分
- `<input type="number" min="1" max="10">` — 数字输入，带增减箭头
- `<input type="color">` — 颜色选择器
- `<input type="date">` — 日期选择器
- `<input type="time">` — 时间选择器
- `<input type="file">` — 文件上传
- `<input type="search">` — 搜索框（带清除按钮）
`<fieldset>` + `<legend>` 用来分组：
```html
<fieldset>
  <legend>个人信息</legend>
  <!-- 相关字段放一起 -->
</fieldset>
```
:::

:::example{title="看例子"}
下面的表单综合使用了 radio、checkbox 和 range：
```html
<form>
  <fieldset>
    <legend>基础信息</legend>
    <label>姓名：<input type="text" name="name"></label>
    <label>阅读时长：<input type="range" min="0" max="120" value="30"> 分钟/天</label>
  </fieldset>
  <fieldset>
    <legend>偏好设置</legend>
    <p>执行水平：</p>
    <label><input type="radio" name="level" value="beginner"> 入门</label>
    <label><input type="radio" name="level" value="intermediate"> 进阶</label>
    <label><input type="radio" name="level" value="advanced"> 专业</label>
  </fieldset>
  <fieldset>
    <legend>擅长工具</legend>
    <label><input type="checkbox" name="inst" value="piano"> 工具B</label>
    <label><input type="checkbox" name="inst" value="violin"> 工具A</label>
    <label><input type="checkbox" name="inst" value="voice"> 声乐</label>
  </fieldset>
</form>
```
:::

:::task{title="动手试试 ✨"}
::::step{purpose="radio 的核心规则：同一组 radio，`name` 属性必须相同才能互斥（只能选一个）。" expected="多了一个「大师级」选项，点击它时其他选项自动取消。"}
给「执行水平」增加第 4 个选项「大师级」
::::

::::step{purpose="checkbox 与 radio 的区别：checkbox 是**独立开关**，选几个互不影响。" expected="新增的两个工具可以独立勾选/取消，不影响已有的选项。"}
给「擅长工具」增加两个选项（如绘画、摄影）
::::

::::step{purpose="了解 `type=\"color\"`——浏览器会自动弹出取色器，提供完整的颜色选择体验。" expected="表单中出现了一个颜色选择器，点击会弹出取色面板。"}
添加一个 `<input type="color">` 选择你喜欢的颜色
::::

::::step{purpose="从零创建一个 `<fieldset>`——包含 `<legend>` 标题 + 一组 radio 选项。这是表单组件化的基本模式。" expected="表单中多了一个「阅读频率」分组，里面的三个选项互斥。"}
挑战：再添加一个 `<fieldset>`，用 radio 给「阅读频率」设置 3 个选项
::::

:::

:::recap
这一节你学会了更多输入类型——单选按钮（`radio`）让用户只能选一个，多选按钮（`checkbox`）让用户随便勾选，滑块（`range`）可以拖动调节数值。你还学会了用 `<fieldset>` 和 `<legend>` 把相关的表单项分组，就像报名表上一个一个的填写区域。现在你可以做出一张功能丰富、分工清晰的表单了。
:::


