# DOM 渲染进阶 -- innerHTML vs createElement

:::analogy
innerHTML 像复印机--复制一整页文档，快但改不了细节。createElement 像活字印刷--一个字一个字排，慢但每个字都能独立修改、删除或替换。
:::

:::prerequisite
**本节你需要知道这些词：**

- DOM（文档对象模型）-- 浏览器把 HTML 解析成可操作的"节点树"
- `innerHTML` -- 元素的属性，可以直接读写标签内的 HTML 字符串
- `createElement` + `appendChild` -- 创建新元素节点并挂载到页面上
- `classList` -- 元素的 class 列表 API，可以 add / remove / toggle / contains
:::

:::explain{title="先看问题：innerHTML 的坑"}

你正在做一个音乐收藏列表。用户可以点击"喜欢"按钮收藏一首歌：

```js
// 用 innerHTML 渲染列表 -- 看起来很方便
function renderList(songs) {
  let html = "";
  for (let i = 0; i < songs.length; i++) {
    html += '<div class="song-card">';
    html += '<h3>' + songs[i].title + '</h3>';
    html += '<button class="like-btn">喜欢</button>';
    html += '</div>';
  }
  document.querySelector("#songList").innerHTML = html;
}

// 渲染完后给"喜欢"按钮绑定事件
let likeBtns = document.querySelectorAll(".like-btn");
for (let i = 0; i < likeBtns.length; i++) {
  likeBtns[i].addEventListener("click", function() {
    this.classList.toggle("liked");  // 切换"已喜欢"样式
  });
}
```

看起来没问题？但后来产品加了一个需求："用户可以动态添加新歌曲"。你在列表顶部加了一个"添加"按钮：

```js
document.querySelector("#addBtn").addEventListener("click", function() {
  songs.push({ title: "新歌曲" });
  renderList(songs);  // 重新渲染整个列表！
  // 问题来了：你需要在 renderList 之后重新绑定所有按钮的事件！
  // 但你没绑...所以新渲染出来的"喜欢"按钮点击无效。
});
```

更糟的是，`innerHTML` 还有一些你不知道的问题：

- **事件丢失**：重新设置 innerHTML 后，旧 DOM 元素被销毁，上面绑定的事件全没了
- **安全风险**：如果 song.title 里包含 `<script>alert('XSS')</script>`，它会被执行
- **性能浪费**：为了加一个元素，销毁并重建整个列表

:::

:::explain{title="解决方案：createElement + appendChild 精确控制"}

```js
// 用 createElement 逐个创建元素
function renderList(songs) {
  let container = document.querySelector("#songList");
  container.innerHTML = "";  // 清空（这里用 innerHTML 清空是最快的）

  for (let i = 0; i < songs.length; i++) {
    // 1. 创建卡片 div
    let card = document.createElement("div");
    card.className = "song-card";  // 设置类名

    // 2. 创建标题
    let title = document.createElement("h3");
    title.textContent = songs[i].title;  // ✅ textContent 天然安全，不会执行 HTML

    // 3. 创建"喜欢"按钮
    let likeBtn = document.createElement("button");
    likeBtn.className = "like-btn";
    likeBtn.textContent = "喜欢";
    
    // 4. 在创建时就绑定事件 -- 永不会丢失！
    likeBtn.addEventListener("click", function() {
      this.classList.toggle("liked");  // 切换收藏样式
    });

    // 5. 组装：标题和按钮放入卡片
    card.appendChild(title);       // 先加标题
    card.appendChild(likeBtn);     // 再加按钮

    // 6. 卡片挂到页面上
    container.appendChild(card);   // 最后挂到容器
  }
}
```

现在无论你调用多少次 `renderList`，每个元素的点击事件都在创建时就绑好了，永远不用担心丢失。

**innerHTML vs createElement 对比表：**

| 特性 | innerHTML | createElement |
|------|-----------|---------------|
| 速度（批量创建） | 快（一次性操作） | 慢一些（逐个创建） |
| 速度（局部更新） | 慢（要重建全部） | 快（只改一个） |
| 事件绑定 | 容易丢失 | 创建时绑定，永不丢失 |
| 安全性 | 有 XSS 风险 | textContent 天然安全 |
| 精细控制 | 只能整体替换 | 可单独修改任一元素 |
| 代码量 | 少 | 多 |

**经验法则：**
- 初始化静态页面内容 -> 用 `innerHTML`（快）
- 需要绑定事件、动态增删、接受用户输入 -> 用 `createElement`（安全、精确）

:::

:::explain{title="classList API：精确操控样式类"}

`classList` 比直接改 `className` 好用得多：

```js
let card = document.querySelector(".song-card");

// className 的问题是会覆盖所有已有 class
card.className = "liked";     // ❌ 之前可能有的 "song-card"、"-highlight" 全丢了

// classList 只添加，不影响已有的
card.classList.add("liked");  // ✅ 在原有 class 基础上追加 "liked"

// 四个核心方法
card.classList.add("highlight");     // 添加一个 class
card.classList.remove("highlight");  // 移除一个 class
card.classList.toggle("active");     // 有则删，无则加 -- 开关效果一行搞定
card.classList.contains("liked");    // 检查是否包含 -- 返回 true/false
```

```js
// 实际案例：点击切换收藏，一行代码
likeBtn.addEventListener("click", function() {
  card.classList.toggle("liked");  // 点一下加样式，再点一下去样式
});
```

:::

:::explain{title="常见错误"}

**错误 1：用 innerHTML 渲染用户输入的内容**

```js
// ❌ 危险：用户输入包含 <script> 标签会被执行
let userInput = "<script>alert('被攻击了!')</script>";
card.innerHTML = userInput;  // XSS 攻击！
```

```js
// ✅ 安全：textContent 会把 HTML 标签当普通文字显示
let userInput = "<script>alert('被攻击了!')</script>";
card.textContent = userInput;  // 页面显示文字本身，不会执行脚本
```

**错误 2：用 createElement 创建后忘记 appendChild**

```js
// ❌ 错误：创建了元素但没挂到页面上
let card = document.createElement("div");
card.textContent = "新卡片";
// 创建了，但页面上看不到！因为没 appendChild
```

```js
// ✅ 正确：必须 appendChild 才能出现在页面上
let card = document.createElement("div");
card.textContent = "新卡片";
document.querySelector("#container").appendChild(card);  // 挂上去了
```

**错误 3：用 className 设置 class 覆盖了已有样式**

```js
// ❌ 错误：className 直接覆盖
card.className = "liked";  // card 本来的 "song-card" 和 "highlight" 全没了
```

```js
// ✅ 正确：classList.add 追加
card.classList.add("liked");  // 现在是 "song-card highlight liked"
```

:::

:::explain{title="实际工作中你会用这个来..."}

- **动态表单**：用户点"加一行"，你用 createElement 创建新的 input，同时给它绑定验证事件。
- **聊天消息列表**：每条新消息用 createElement 创建，消息里可能有"撤回"按钮，事件在创建时就绑定好。
- **任何需要局部更新的场景**：你只想换掉列表中第三项的文字，用 createElement 找到它直接改 textContent，而不用重建整个列表。

:::

:::task{title="动手试试"}

打开 `script.js`，把 innerHTML 渲染方式改为 createElement，同时实现收藏切换功能。

::::step{purpose="createElement 创建的每个元素都是独立对象，可以单独修改、绑定事件。" expected="页面显示 3 张卡片，外观与 before 一致，但底层用 createElement 逐个创建。"}
把 render() 函数中的 innerHTML 方式改为 createElement + appendChild。为每张卡片创建 div、h3、button，用 appendChild 组装后挂载到容器。
::::

::::step{purpose="在创建元素时立即绑定事件，事件永不丢失--这是 createElement 相比 innerHTML 的最大优势。" expected="点击卡片的喜欢按钮后，按钮文字变为'已喜欢'，样式切换。"}
给每张卡片的 likeBtn 在创建时绑定 click 事件，调用 classList.toggle("liked") 切换收藏状态。
::::

::::step{purpose="证明事件不会丢失：动态添加的卡片和初始卡片行为完全一致。" expected="新增的卡片点击后同样能切换收藏状态，不需要额外绑定事件。"}
确认"添加随机条目"按钮新增的卡片也能正常切换收藏状态（因为在 createElement 时就绑好了事件）。
::::

:::

:::recap
innerHTML 适合一次性渲染静态内容（快、代码少），createElement 适合需要绑定事件、动态增删的场景（安全、精确）。classList.add/remove/toggle 精确操控样式类，不会覆盖已有 class。textContent 比 innerHTML 更安全。
:::
