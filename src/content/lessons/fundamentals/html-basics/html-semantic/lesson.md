# 语义化标签 — 给页面一个清晰的结构

::music-analogy
语义化标签就像**总谱上的声部标注**——第一小提琴、第二小提琴、中提琴、大提琴……每个乐器组有自己的位置和身份。同样，`<header>`、`<main>`、`<footer>` 等标签告诉浏览器和搜索引擎"这是什么部分"。
::

::explain{title="为什么需要语义化？"}
之前我们一直用 div 来分组内容。但 div 本身没有"含义"——浏览器不知道一个 div 是导航栏还是文章正文。

语义化标签用有名字的标签来标记不同区域：header 是页头，nav 是导航菜单，main 是页面主体，section 是内容区块，article 是独立文章，footer 是页脚——看名字就知道它是什么。就像你的扬琴每根弦都有固定音名（C3、D3、E3），而不是全部叫"弦1、弦2"。

具体写法：
- `<header>` — 页头（Logo + 导航）
- `<nav>` — 导航菜单
- `<main>` — 页面主要内容
- `<section>` — 一个内容区块
- `<article>` — 一篇独立的文章
- `<footer>` — 页脚（版权、链接）
就像总谱中每个声部都有明确的名字，而不是全部标"乐器1、乐器2"。
::

::explain{title="一个典型的页面结构"}
```html
<body>
  <header>
    <h1>网站标题</h1>
    <nav>导航链接</nav>
  </header>
  <main>
    <section>
      <h2>第一块内容</h2>
      <article>一篇文章</article>
    </section>
  </main>
  <footer>
    <p>版权信息</p>
  </footer>
</body>
```浏览器和搜索引擎看到这个结构，就像指挥看到总谱——一眼就知道每个部分的作用。
::

::example{title="看例子"}
下面的代码用语义化标签构建了一个音乐网站页面。注意看 `<header>`、`<main>`、`<section>`、`<footer>` 是如何组织的：
```html
<header>
  <h1>古典音乐鉴赏</h1>
  <nav>首页 | 作曲家 | 曲目</nav>
</header>
<main>
  <section>今日推荐</section>
  <section>本周精选</section>
</main>
<footer>© 2026 代码乐章</footer>
```虽然看起来和用 `<div>` 差不多，但这些标签自带"身份信息"。
::

::task{title="动手试试 ✨"}
:::step{purpose="练习添加语义化区块——`<section>` 表示一个**独立的内容区块**，浏览器和搜索引擎能识别它的含义。" expected="页面中多了一个名为「最新评论」的区块。注意 `<section>` 默认是块级元素，独占一行。"}
在 `<main>` 中再添加一个 `<section>`，里面写「最新评论」
:::

:::step{purpose="复习 `<a>` 标签，同时理解 `<nav>` 的语义——**nav 专门用来放导航链接**。" expected="导航栏里多了一个可点击的链接。"}
在 `<nav>` 中添加一个链接（用 `<a>` 标签）
:::

:::step{purpose="理解 `<section>` 和 `<article>` 的区别：`section` 是页面的一个区块，`article` 是可以**独立分发**的完整内容（如一篇文章、一条评论）。" expected="换成 `<article>` 后视觉上看不出区别，但这改变了元素的语义身份——搜索引擎会把它当作一篇独立文章来索引。"}
试着把某个 `<section>` 换成 `<article>`，思考：什么情况下用 article 更合适？
:::

::

::listen-to
拉威尔《波莱罗》配器总谱 — 每一行谱表标注了乐器名称，清晰的声部结构就像语义化的 HTML。
::

