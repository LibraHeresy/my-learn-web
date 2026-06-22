# 更多输入类型 — 表单的"乐器编配"

::music-analogy
`<input>` 不止能输入文字——就像乐团不只是弦乐。`type="radio"` 像**单选问答**（只有一个正确答案），`type="checkbox"` 像**多选编配**（可以同时选弦乐和管乐），`type="range"` 像**滑音控制**（连续变化的数值）。每个 input 类型都是乐队中的一种"声部"，组合使用才能构成完整的音乐表单。
::

::explain{title="radio — 单选按钮"}
input 标签通过 type 属性可以变成单选按钮（radio）、多选按钮（checkbox）、滑块（range）、数字输入（number）、颜色选择器（color）等不同类型。fieldset 和 legend 用来给表单控件分组——就像报名表上"个人信息"外面画的那个框和标题。

当用户只能**选一个**时用 radio。同一组 radio 的 name 属性必须相同：
```html
<fieldset>
  <legend>你最喜欢的时期：</legend>
  <input type="radio" id="baroque" name="period" value="baroque">
  <label for="baroque">巴洛克时期</label>
  <input type="radio" id="classical" name="period" value="classical">
  <label for="classical">古典主义时期</label>
  <input type="radio" id="romantic" name="period" value="romantic">
  <label for="romantic">浪漫主义时期</label>
</fieldset>
````name` 相同的 radio 互斥——就像单选题，只能圈一个答案。
::

::explain{title="checkbox — 多选按钮"}
当用户可以**选多个**时用 checkbox：
```html
<fieldset>
  <legend>你喜欢的乐器（可多选）：</legend>
  <input type="checkbox" id="piano" name="instrument" value="piano">
  <label for="piano">🎹 钢琴</label>
  <input type="checkbox" id="violin" name="instrument" value="violin">
  <label for="violin">🎻 小提琴</label>
  <input type="checkbox" id="cello" name="instrument" value="cello">
  <label for="cello">🎻 大提琴</label>
</fieldset>
```每个 checkbox 独立开/关——就像配器时选择用哪些乐器。
::

::explain{title="更多实用 input 类型"}
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
::

::example{title="看例子"}
下面的表单综合使用了 radio、checkbox 和 range：
```html
<form>
  <fieldset>
    <legend>基础信息</legend>
    <label>姓名：<input type="text" name="name"></label>
    <label>练琴时长：<input type="range" min="0" max="120" value="30"> 分钟/天</label>
  </fieldset>
  <fieldset>
    <legend>偏好设置</legend>
    <p>演奏水平：</p>
    <label><input type="radio" name="level" value="beginner"> 入门</label>
    <label><input type="radio" name="level" value="intermediate"> 进阶</label>
    <label><input type="radio" name="level" value="advanced"> 专业</label>
  </fieldset>
  <fieldset>
    <legend>擅长乐器</legend>
    <label><input type="checkbox" name="inst" value="piano"> 钢琴</label>
    <label><input type="checkbox" name="inst" value="violin"> 小提琴</label>
    <label><input type="checkbox" name="inst" value="voice"> 声乐</label>
  </fieldset>
</form>
```
::

::task{title="动手试试 ✨"}
:::step{purpose="radio 的核心规则：同一组 radio，**`name` 属性必须相同**才能互斥（只能选一个）。" expected="多了一个「大师级」选项，点击它时其他选项自动取消。"}
给「演奏水平」增加第 4 个选项「大师级」
:::

:::step{purpose="checkbox 与 radio 的区别：checkbox 是**独立开关**，选几个互不影响。" expected="新增的两个乐器可以独立勾选/取消，不影响已有的选项。"}
给「擅长乐器」增加两个选项（如中提琴、长笛）
:::

:::step{purpose="了解 `type=\"color\"`——浏览器会自动弹出取色器，提供完整的颜色选择体验。" expected="表单中出现了一个颜色选择器，点击会弹出取色面板。"}
添加一个 `<input type="color">` 选择「最喜欢的音乐色彩」
:::

:::step{purpose="从零创建一个 `<fieldset>`——包含 `<legend>` 标题 + 一组 radio 选项。这是表单组件化的基本模式。" expected="表单中多了一个「练琴频率」分组，里面的三个选项互斥。"}
挑战：再添加一个 `<fieldset>`，用 radio 给「练琴频率」设置 3 个选项
:::

::

::listen-to
拉威尔《波莱罗》配器分析 — 整部作品用不同乐器依次演奏同一旋律（每种乐器就是一种 input 类型），从长笛到单簧管到巴松管到萨克斯，每一种"输入方式"都给主题带来新的色彩。
::

