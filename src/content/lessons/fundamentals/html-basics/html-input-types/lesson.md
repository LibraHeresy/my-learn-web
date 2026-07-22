# 更多输入类型 — 表单的"乐器编配"

:::analogy
`<input>` 不止能输入文字——就像手机键盘可以切数字、符号、语音。`type="date"` 弹出日历，`type="file"` 弹出文件选择器，`type="color"` 弹出取色器。不同场景用不同输入方式——把合适的工具用在合适的地方。
:::


:::prerequisite
**本节你需要知道这些词：**

- **表单基础**：`<form>` 是表单容器，`<input>` 是输入框（单标签），`<label>` 是标签文字——第十节"表单"中学过。
- **label + input 配对**：`<label for="id">` 和 `<input id="...">` 必须一致——第十节中学过。
- **属性家族**：`id`（唯一编号）、`name`（提交字段名）、`value`（填写值）——第十节中学过。
- **布尔属性**：`controls`、`loop` 写上就有、不写就没有——第八节"音频与视频"中学过。`checked`、`required` 也是布尔属性。
:::

:::explain{title="问题：只有 text 输入框，表单太单调了"}
上一节你学会了 `<input type="text">` 输入文字、`<select>` 下拉选择、`<textarea>` 多行输入。但真实世界的表单远不止这些：

- 注册页面要你选"男/女"（只能选一个）
- 兴趣标签要你勾"运动/音乐/阅读"（可以选多个）
- 音量调节要你拖一个滑块
- 上传头像要你选本地文件
- 筛选商品要你输价格范围

每一个场景都有对应的 `type` 值。你不需要装任何插件——浏览器已经为每种类型准备好了专属控件。
:::

:::explain{title="radio — 单选按钮（只能选一个）"}
当用户在几个选项中**只能选一个**时，用 `radio`。同一组 radio 的 `name` 属性必须相同——这样浏览器才知道它们是一组的：

```html
<fieldset>
  <legend>你最喜欢的时期：</legend>

  <input type="radio" id="baroque" name="period" value="baroque">
  <label for="baroque">巴洛克时期</label>

  <input type="radio" id="classical" name="period" value="classical">
  <label for="classical">古典主义</label>

  <input type="radio" id="romantic" name="period" value="romantic">
  <label for="romantic">浪漫主义</label>
</fieldset>
```

关键点：三个 radio 的 `name` 都是 `"period"`——所以它们互斥。就像单选题，圈了一个其他自动取消。

**常见错误：** 给同一组的 radio 写了不同的 `name`——结果每个都能单独选中，互斥失效。或者忘了写 `value`——提交时服务器收到 `period=on` 而不是 `period=baroque`，不知道用户具体选了哪个。
:::

:::explain{title="checkbox — 多选按钮（可以选多个）"}
当用户可以**选多个**时，用 `checkbox`。每个 checkbox 是独立的开关：

```html
<fieldset>
  <legend>你喜欢的乐器（可多选）：</legend>

  <input type="checkbox" id="piano" name="instrument" value="piano">
  <label for="piano">钢琴</label>

  <input type="checkbox" id="violin" name="instrument" value="violin">
  <label for="violin">小提琴</label>

  <input type="checkbox" id="cello" name="instrument" value="cello">
  <label for="cello">大提琴</label>
</fieldset>
```

每个 checkbox 独立开/关——就像点菜时勾选要哪些配菜，选第一个不影响选第二个。`name` 相同但互不影响——和 radio 不同。
:::

:::explain{title="更多实用的 input 类型"}
HTML 提供了丰富的输入类型，浏览器会自动优化交互方式和虚拟键盘：

```html
<!-- 滑块：拖动调节数值，适合音量、评分 -->
<input type="range" min="0" max="100" value="50">

<!-- 数字输入：带增减箭头，适合数量、年龄 -->
<input type="number" min="1" max="100" step="1">

<!-- 颜色选择器：点击弹出取色面板 -->
<input type="color">

<!-- 文件上传：弹出文件选择对话框 -->
<input type="file" accept="image/*">

<!-- 搜索框：带清除按钮 x -->
<input type="search" placeholder="搜索...">

<!-- 密码：输入内容显示为圆点 -->
<input type="password" placeholder="请输入密码">

<!-- 日期和时间选择器 -->
<input type="date">
<input type="time">
<input type="datetime-local">
```

每一种 `type` 对应一种输入场景。在手机上，`type="email"` 会弹出带 `@` 的键盘，`type="number"` 会弹出数字键盘——这些都是浏览器免费给你的。
:::

:::explain{title="fieldset 和 legend — 表单分组"}
`<fieldset>` 把相关的表单项包在一起，`<legend>` 是这个分组的标题：

```html
<fieldset>
  <legend>个人信息</legend>
  <label>姓名：<input type="text" name="name"></label>
  <label>年龄：<input type="number" name="age"></label>
</fieldset>

<fieldset>
  <legend>偏好设置</legend>
  <!-- 相关选项放一起 -->
</fieldset>
```

这不仅让表单视觉上更有条理，屏幕阅读器读到 `<legend>` 时会提示用户进入了哪个分组——对无障碍访问很重要。
:::

:::explain{title="表单验证基础 — required 属性"}
`required` 是布尔属性——写在 `<input>` 上，提交时如果该字段为空，浏览器会自动阻止提交并提示用户：

```html
<!-- 用户名必填，不填就不能提交 -->
<input type="text" name="username" required placeholder="请输入用户名">

<!-- 邮箱必填，且浏览器会检查格式是否为 xx@xx.xx -->
<input type="email" name="email" required placeholder="请输入邮箱">
```

`required` 是 HTML 自带的第一道防线——不需要写 JavaScript，浏览器就已经帮你做了基础验证。
:::

:::example{title="看例子"}
下面的表单综合使用了 radio、checkbox、range 和更多输入类型：

```html
<form>
  <!-- fieldset：表单分组，legend 是分组标题 -->
  <fieldset>
    <legend>基础信息</legend>
    <!-- text：普通文字输入 -->
    <label>姓名：<input type="text" name="name" required></label>
    <!-- number：数字输入，带增减箭头 -->
    <label>年龄：<input type="number" name="age" min="1" max="120"></label>
    <!-- range：滑块，适合连续数值 -->
    <label>学习时长：<input type="range" name="hours" min="0" max="120" value="30"> 分钟/天</label>
  </fieldset>

  <fieldset>
    <legend>偏好设置</legend>
    <p>编程水平：</p>
    <!-- radio：同一 name，互斥单选 -->
    <label><input type="radio" name="level" value="beginner"> 入门</label>
    <label><input type="radio" name="level" value="intermediate"> 进阶</label>
    <label><input type="radio" name="level" value="advanced"> 专业</label>
  </fieldset>

  <fieldset>
    <legend>擅长方向</legend>
    <!-- checkbox：独立开关，可多选 -->
    <label><input type="checkbox" name="skill" value="frontend"> 前端</label>
    <label><input type="checkbox" name="skill" value="backend"> 后端</label>
    <label><input type="checkbox" name="skill" value="design"> 设计</label>
  </fieldset>

  <button type="submit">提交</button>
</form>
```

试试在预览区中操作这个表单——拖动滑块、选择 radio、勾选 checkbox。每一项都是不同的交互方式。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="radio 的核心规则：同一组 radio 的 `name` 属性必须相同才能互斥（只能选一个）。`value` 决定了提交时发送什么值。文件：编辑区中的 HTML 代码。" expected="多了一个「大师级」选项，点击它时其他选项自动取消——因为它们 name 相同。"}
给「编程水平」增加第 4 个选项「大师级」，注意 `name` 和已有的 radio 保持一致
::::

::::step{purpose="checkbox 与 radio 的区别：checkbox 是**独立开关**，每个可以单独勾选/取消，互不影响。文件：编辑区中的 HTML 代码。" expected="新增的两个方向可以独立勾选/取消，不影响已有的选项。"}
给「擅长方向」增加两个选项（如数据分析、运维），用 `checkbox`
::::

::::step{purpose="了解 `type=\"color\"`——浏览器会自动弹出取色器。不同 `type` 触发不同的浏览器控件，这是 HTML 表单最强大的地方。文件：编辑区中的 HTML 代码。" expected="表单中出现了一个颜色选择器，点击会弹出取色面板。选择一个颜色后，按钮或区块的颜色预览会更新。"}
添加一个 `<input type="color">` 选择你喜欢的主题色，配上 `<label>`
::::

::::step{purpose="从零创建一个完整 `<fieldset>`——包含 `<legend>` 标题 + 一组 radio 选项 + 恰当的表单验证。这是表单组件化的基本模式。文件：编辑区中的 HTML 代码。" expected="表单中多了一个「学习频率」分组，里面的三个选项互斥，且所有选项都正确配对了 label 和 input。"}
挑战：再添加一个 `<fieldset>`，用 radio 给「学习频率」设置 3 个选项（每天、每周、偶尔），并在第一个选项加上 `checked` 设为默认选中
::::

:::

:::recap
这一节你解锁了 `<input>` 的全部形态——单选按钮（`radio`，同 `name` 互斥）、多选按钮（`checkbox`，独立开关）、滑块（`range`，拖动调节）、数字（`number`，带增减箭头）、颜色选择器（`color`，弹出取色面板）、文件上传（`file`，弹出文件选择框）。用 `<fieldset>` 和 `<legend>` 把相关的表单项分组，用 `required` 做基础验证（空值不能提交），用 `checked` 设默认选中。不同的 `type` 触发不同浏览器控件——从手机虚拟键盘到桌面日期选择器，全是免费的。现在你的表单不再只有文字框，而是一整套专业的交互工具。
:::

