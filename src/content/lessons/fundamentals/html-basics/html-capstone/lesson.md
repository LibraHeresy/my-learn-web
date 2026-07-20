# 综合项目 — 制作你的个人主页

:::analogy
这节综合课把前面学的所有 HTML 元素组合起来——列表、图片、表单、表格，搭出一个完整的个人主页。就像用积木零件拼出一个完整的作品。每一块你都会。
:::


:::prerequisite
**本节你需要知道这些词：**

**这是 HTML 章节的最后一课。** 你已经学过从 `<h1>` 到 `<input type="file">` 的全部内容。下面会先回顾所有标签，再动手搭建。

如果你有任何一节没有完成，建议先回去做完再来——这一节会把所有知识点串起来。
:::

:::explain{title="项目目标：从零搭建一张个人主页"}
你要做的是一张完整的个人主页，包含以下区域：

1. **页头**（`<header>`）— 你的名字 + 导航
2. **关于我**（`<section>`）— 一段自我介绍 + 一张照片
3. **我的技能**（`<section>`）— 一个列表或表格展示你会什么
4. **联系我**（`<section>`）— 一个简单表单让别人留言
5. **页脚**（`<footer>`）— 版权信息

你需要从编辑器中已有的模板出发，把所有内容替换成你自己的，并添加新区域。
:::

:::explain{title="标签速查 — 文字与标题"}
| 标签 | 说明 | 用法提示 |
|------|------|----------|
| `h1` ~ `h6` | 标题，数字越小字越大 | `h1` 一个页面一般只用一个 |
| `p` | 段落 | 放正文文字 |
| `strong` | 加粗强调（语义：重要） | 给关键词用，不要整段加粗 |
| `em` | 斜体强调（语义：语气） | 给语气变化用 |
| `br` | 换行（单标签） | 文字中换行用 |
| `hr` | 水平分割线（单标签） | 话题转换时用 |
:::

:::explain{title="标签速查 — 清单与链接"}
| 标签 | 说明 | 用法提示 |
|------|------|----------|
| `ul` | 无序列表（圆点） | 项目间无先后顺序 |
| `ol` | 有序列表（数字） | 项目间有先后顺序 |
| `li` | 列表项 | 必须放在 `ul` 或 `ol` 里面 |
| `img` | 图片（单标签） | `src` 指定地址，`alt` 写替代文字 |
| `a` | 超链接 | `href` 指定跳转地址（写完整 `https://`），`target="_blank"` 新标签页打开 |
:::

:::explain{title="标签速查 — 布局与语义化"}
| 标签 | 说明 | 用法提示 |
|------|------|----------|
| `div` | 块级容器，独占一行 | 给大块内容分组 |
| `span` | 内联容器，不换行 | 给行内文字做标记 |
| `header` | 页头 | 放 Logo、标题、导航 |
| `nav` | 导航菜单 | 放跳转链接组 |
| `main` | 主体内容 | 每页只能有一个 |
| `section` | 内容区块 | 通常带标题，页面布局的一部分 |
| `article` | 独立文章 | 可以单独分发的内容 |
| `footer` | 页脚 | 放版权、联系信息 |
:::

:::explain{title="标签速查 — 多媒体与表格"}
| 标签 | 说明 | 用法提示 |
|------|------|----------|
| `audio` | 嵌入音频 | `controls` 显示播放按钮，`loop` 循环，`muted` 静音 |
| `video` | 嵌入视频 | 和 `audio` 用法一样，加 `width`/`height` |
| `source` | 备选格式 | 放在 `audio`/`video` 里，提供不同格式 |
| `table` | 表格容器 | 只用来展示表格数据 |
| `tr` | 表格行 | 放在 `thead` 或 `tbody` 里 |
| `th` | 表头格（加粗居中） | 放在 `tr` 里 |
| `td` | 数据格 | 放在 `tr` 里 |
| `colspan` | 水平合并列 | 写在 `td`/`th` 上 |
:::

:::explain{title="标签速查 — 表单"}
| 标签 | 说明 | 用法提示 |
|------|------|----------|
| `form` | 表单容器 | 包裹所有输入控件 |
| `input` | 输入框（单标签） | `type` 切换类型 |
| `label` | 标签文字 | `for` 绑定 `input` 的 `id` |
| `textarea` | 多行文本输入 | `rows` 控制行数 |
| `select` | 下拉框 | 里面放 `<option>` |
| `option` | 下拉选项 | 放在 `<select>` 里 |
| `button` | 按钮 | `type="submit"` 提交表单 |
| `fieldset` | 表单分组 | 包裹相关控件 |
| `legend` | 分组标题 | 放在 `<fieldset>` 里 |

**input 的 type 全清单：** `text`（文字）、`password`（密码）、`email`（邮箱）、`number`（数字）、`date`（日期）、`time`（时间）、`radio`（单选）、`checkbox`（多选）、`range`（滑块）、`color`（颜色）、`file`（文件上传）、`search`（搜索框）
:::

:::explain{title="属性速查表"}
**全局属性**（任何标签都能用）：
- `class` — 分类名，可重复（CSS 用 `.class名` 选中）
- `id` — 唯一编号，不重复（CSS 用 `#id名` 选中，label 的 `for` 用它配对）
- `style` — 内联样式
- `hidden` — 隐藏元素（布尔属性）
- `lang` — 语言

**元素特有属性：**
| 标签 | 特有属性 |
|------|---------|
| `img` | `src`, `alt`, `width`, `height` |
| `a` | `href`, `target` |
| `audio` / `video` | `src`, `controls`, `autoplay`, `loop`, `muted` |
| `input` | `type`, `placeholder`, `name`, `value`, `min`, `max`, `required`, `checked` |
| `label` | `for` |
| `textarea` | `rows`, `placeholder` |
| `td` / `th` | `colspan`, `rowspan` |

**布尔属性：** `controls` | `autoplay` | `loop` | `muted` | `checked` | `disabled` | `required` | `hidden` ——写上就有，不写就没有，不需要赋值。
:::

:::hint{title="构建前检查清单"}
开始搭建个人主页之前，确认你已理解：
- [ ] 标签要**成对**使用，`<h1>` 后面一定有 `</h1>`（`<img>`、`<br>`、`<hr>`、`<input>` 除外）
- [ ] `<li>` 要放在 `<ul>` 或 `<ol>` 里面，不能单独出现
- [ ] `<tr>` 要放在 `<table>` → `<thead>`/`<tbody>` 里面
- [ ] `<option>` 要放在 `<select>` 里面
- [ ] `href` 写完整 `https://` 地址
- [ ] `src` 写完整的图片/音频/视频地址
- [ ] `<label for="xxx">` 的 `for` 和 `<input id="xxx">` 的 `id` 必须一致
- [ ] 同组 `radio` 的 `name` 必须相同才能互斥
- [ ] `<main>` 一页最多用一次
:::

:::example{title="看例子 — 你的起点"}
编辑器中已经有一份个人主页模板。它包含了 `<header>`（标题 + 导航）、一个"关于我"的 `<section>`（文字 + 图片 + 链接）、一个"我的收藏"的 `<section>`（列表 + 表格）、以及一个"联系我"的表单。

你的任务不是从头写——而是把模板**变成你自己的页面**。

```html
<!-- header：页头区域 —— 你的名字和导航 -->
<header>
  <h1>我的个人主页</h1>
  <nav>
    <a href="#">关于我</a> |
    <a href="#">技能</a> |
    <a href="#">联系</a>
  </nav>
</header>

<main>
  <!-- section：关于我 —— 介绍你自己 -->
  <section>
    <h2>关于我</h2>
    <img src="你的照片链接" alt="我的照片" width="200">
    <p>一段自我介绍...</p>
  </section>

  <!-- section：技能与收藏 —— 列表 + 表格 -->
  <section>
    <h2>我的技能</h2>
    <ul>
      <li>HTML</li>
      <li>CSS（即将学习）</li>
    </ul>
  </section>

  <!-- section：联系我 —— 表单 -->
  <section>
    <h2>联系我</h2>
    <form>
      <label for="msg">留言：</label>
      <textarea id="msg" rows="3"></textarea>
      <button type="submit">发送</button>
    </form>
  </section>
</main>

<!-- footer：页脚 -->
<footer>
  <p>&copy; 2026 我的名字</p>
</footer>
```

这就是你的起点模板。下面开始动手，把它变成你自己的！
:::

:::task{title="逐步构建你的个人主页 ✨"}
::::step{purpose="页面第一印象来自 `<header>`。标题是你的名字，导航告诉访问者页面有什么板块。文件：编辑区中的 HTML 代码 —— `<header>` 部分。" expected="顶部标题变成了你的名字。导航栏的项目也改成了你想展示的内容分类。"}
**修改标题和导航**——把 `<header>` 中的 `<h1>` 标题改成「XXX的个人主页」（XXX 是你的名字），把 `<nav>` 中的导航项目改成你要展示的板块名
::::

::::step{purpose="`<section>` + `<p>` + `<img>` + `<a>` 组合成内容区块。这是网页中最常见的信息展示模式。文件：编辑区中的 HTML 代码 ——「关于我」`<section>`。" expected="「关于我」区域展示了你的个人介绍和新图片。`src` 链接正确时新图片显示；如果图片不显示，`alt` 文字会出现。"}
**修改「关于我」**——在 `<p>` 中写下你的自我介绍（你是谁、在学什么、目标是什么），换一张你的头像或喜欢的图片（修改 `<img>` 的 `src`），在段落中给"我的GitHub"之类关键词加上链接 `<a>`
::::

::::step{purpose="列表（`<ul>`/`<li>`）和表格（`<table>`）是结构化数据的两种主要方式。本章所有的标签知识都在这一步骤中综合运用。文件：编辑区中的 HTML 代码 —— 收藏/技能 `<section>`。" expected="列表和表格都变成了你的个性化内容。你不再是一个模板的填写者，而是真正的作者——数据来源于你自己的经历。"}
**丰富技能与收藏内容**——在 `<ul>` 列表中替换成你已学过的技能或想学的技能，在 `<table>` 表格中改成你的学习进度（技能名、学习状态、掌握程度），至少 3 行数据
::::

::::step{purpose="表单是用户与你互动的入口。用 `<label for=\"id\">` 配对 `<input id=\"...\">`，用 `required` 做必填验证。文件：编辑区中的 HTML 代码 ——「联系我」`<section>`。" expected="表单有了你的个性化内容——联系方式、留言功能和提交按钮。"}
**完善联系表单**——给表单添加更多字段：姓名（`<input type="text" required>`）、邮箱（`<input type="email" required>`）、一个下拉选择来意（`<select>` + 3 个 `<option>`），确保每个 `<label for="...">` 和 `<input id="...">` 正确配对
::::

::::step{purpose="从零创建 `<section>`+`<fieldset>`+多种 input type——完全由你设计。这是从"模仿"到"创造"的关键一步。文件：编辑区中的 HTML 代码 —— 在 `<main>` 中创建新区块。" expected="页面中多了一个你自己设计的区块，包含至少一个 `<fieldset>` 分组和多种控件。完成后，这不仅是你的第一章毕业作品，更是你给自己做的第一张名片。"}
**挑战：创建你自己的专区**——在 `<main>` 中新增一个 `<section>`（比如"每日目标""我的作品""推荐资源"），内容自定。要求：至少包含 2 种不同的 `input type`、用 `<fieldset>` 分组、用 `<ul>` 或 `<ol>` 列至少 3 项内容
::::

:::

:::hint{title="提交前自查清单"}
在宣布"完成"之前，检查以下每一项：
- [ ] 所有标签都成对闭合了吗？（`<img>`、`<br>`、`<hr>`、`<input>` 除外）
- [ ] 每个 `<li>` 都在 `<ul>` 或 `<ol>` 里面吗？
- [ ] 每个 `<tr>` 都在 `<table>` → `<thead>`/`<tbody>` 里面吗？
- [ ] 每个 `<option>` 都在 `<select>` 里面吗？
- [ ] 所有图片 `<img>` 都有 `alt` 属性吗？
- [ ] 所有链接 `href` 都以 `https://` 开头吗？
- [ ] `<label for="...">` 和 `<input id="...">` 配对的 for/id 一致吗？
- [ ] 同组 radio 的 `name` 相同吗？
- [ ] `<main>` 只出现了一次吗？
- [ ] `<footer>` 里写了你的名字和年份吗？

全部打勾，你的 HTML 第一章就正式毕业了。
:::

:::recap
这一节是 HTML 章节的"毕业作品"——你把之前学到的所有标签组合在一起，做出了一张完整的个人主页。从标题（`h1`）、段落（`p`）、强调（`strong`/`em`），到列表（`ul`/`ol`/`li`）、图片（`img`）、链接（`a`），再到布局（`div`/`span`）和语义化（`header`/`nav`/`main`/`section`/`footer`），还有表格（`table`/`thead`/`tbody`/`tr`/`th`/`td`）、表单（`form`/`input`/`label`/`select`/`textarea`/`button`/`fieldset`/`legend`）以及 12 种 `input type`——这些就是 HTML 的全部基本功。现在你已经能用 HTML 从零搭建一个内容丰富、结构完整、语义清晰的网页了。下一章，CSS 会教你怎么让它变好看。
:::

