# Vue 指令 — 模板的演奏记号

:::music-analogy
乐谱上有各种演奏记号——f 代表强奏、p 代表弱奏、tr 是颤音、反复记号指定哪些小节要重复。Vue 指令就是模板中的演奏记号：v-if 是此处休止（这个声部不奏）、v-show 是加弱音器（还在但静默）、v-for 是反复记号（同一乐句重复多次）、v-bind 是连音线（把数据和 DOM 属性连起来）、v-html 是即兴华彩段（直接插入内容，但需谨慎）。
:::

:::explain{title="v-bind — 动态绑定属性"}
Vue 指令是以 v- 开头的特殊属性——v-bind（简写 :）把数据绑定到属性，v-if/v-show 控制显示隐藏，v-for 循环渲染列表，v-on（简写 @）监听事件，v-model 双向绑定表单。就像遥控器上的各种按钮——每个按钮控制一种功能：音量键控制大小、频道键切换节目。v-bind 把 JS 表达式的值绑定到 HTML 属性上，简写是 :：
```html
<!-- 完整写法 -->
<img v-bind:src="imageUrl">
<a v-bind:href="'/user/' + userId">用户</a>
<div v-bind:class="{ active: isActive }">...</div>
<!-- 简写（最常用） -->
<img :src="imageUrl">
<a :href="'/user/' + userId">用户</a>
<div :class="{ active: isActive }">...</div>
<div :style="{ color: textColor, fontSize: size + 'px' }">...</div>
```
**和 {{ }} 文本插值的区别：**
- `{{ expression }}` — 把值插入到**文本内容**中
- `v-bind:attr="expression"` — 把值绑定到**HTML 属性**上
```html
<!-- 文本插值：显示在标签内容中 -->
<p>{{ message }}</p>
<!-- 属性绑定：绑定到 HTML 属性 -->
<img :src="imageUrl" :alt="imageDesc">
<button :disabled="isLoading">提交</button>
```
就像连音线把两个音符连起来——v-bind 把 JS 数据和 DOM 属性连起来。
:::

:::explain{title="v-if / v-show — 条件渲染"}
**v-if / v-else-if / v-else：** 根据条件决定是否**创建/销毁** DOM 元素
```html
<div v-if="status === 'loading'">加载中...</div>
<div v-else-if="status === 'error'">出错了！</div>
<div v-else-if="status === 'empty'">没有数据</div>
<div v-else>
  <p>{{ result }}</p>
</div>
```
**v-show：** 根据条件决定是否**显示**元素（元素始终存在，只是切换 display:none）
```html
<div v-show="isVisible">这段文字可以快速切换显示/隐藏</div>
```
**v-if vs v-show 的选择：**
| | v-if | v-show |
|------|------|--------|
| 机制 | 移除/创建 DOM | display: none 切换 |
| 初始渲染 | 条件为 false 时不渲染 | 始终渲染 |
| 切换开销 | 大（销毁+重建） | 小（只改 CSS） |
| 适用场景 | 条件很少改变 | 频繁切换 |
> 🎼 v-if 是这个乐手这场不参加（人根本不在舞台上），v-show 是这个乐手在场但保持沉默（人在但不出声）。
:::

:::explain{title="v-for — 列表渲染"}
`v-for` 遍历数组或对象，为每个元素渲染一段模板：
```html
<!-- 遍历数组：item in items -->
<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }} — {{ item.price }} 元
  </li>
</ul>
<!-- 带索引： (item, index) in items -->
<li v-for="(item, index) in items" :key="item.id">
  {{ index + 1 }}. {{ item.name }}
</li>
<!-- 遍历对象： (value, key, index) in obj -->
<li v-for="(value, key) in composer" :key="key">
  {{ key }}: {{ value }}
</li>
<!-- 遍历数字范围 -->
<span v-for="n in 5" :key="n">{{ n }}</span>
```
`:key` 为什么重要：
key 是 Vue 识别每个节点的唯一标识。没有 key 或 key 不唯一会导致：
- 列表更新时出现错误的 DOM 复用
- 组件状态错乱
- 过渡动画失效
始终给 v-for 一个唯一且稳定的 key（通常是 id，**永远不要用 index 作为 key** ——除非列表是静态的且不会重新排序）。
:::

:::explain{title="v-html / v-text 与其他常用指令"}
**v-html：** 把字符串当作 HTML 渲染（⚠️ 有 XSS 安全风险！）
```html
<div v-html="rawHtml"></div>
<!-- 仅在信任内容来源时使用！用户输入绝不能直接用 v-html -->
```
**v-text：** 等价于 {{ }}，设置元素的文本内容
```html
<span v-text="message"></span>
<!-- 等价于 <span>{{ message }}</span> -->
```
**v-once：** 只渲染一次，后续不再响应数据变化（静态内容优化）
```html
<div v-once>这个标题永远不会变：{{ title }}</div>
```
**v-pre：** 跳过这个元素及其子元素的编译（显示原始 Mustache 语法）
```html
<pre v-pre>{{ 这里不会编译，直接显示 {{ message }} 原文 }}</pre>
```
:::

:::example{title="看例子：一个完整的指令演示"}
下面的代码综合展示了所有主要指令。切换到预览区，实际操作感受：
```html
<!-- 条件渲染：切换 tab -->
<div :class="['tab', { active: activeTab === 'all' }]" @click="activeTab = 'all'">全部</div>
<!-- 列表渲染：遍历曲目 -->
<div v-for="track in filteredTracks" :key="track.id" class="track-card">
  <img :src="track.cover" :alt="track.title">
  <h3>{{ track.title }}</h3>
  <p v-if="track.artist">{{ track.artist }}</p>
  <span :class="['tag', 'tag-' + track.genre]">{{ track.genre }}</span>
</div>
<!-- v-show 切换 -->
<div v-show="showPlayer" class="player">播放器控件</div>
```
注意：:class 可以接收对象（{ active: isActive }）或数组（['base', dynamicClass]）。:style 同样支持对象语法。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="模板中的数据驱动一切：修改 JS 中的数组，UI 自动变化。这展示了 Vue 的声明式核心——你只需更改数据，Vue 负责 DOM 更新。通过给数组增加元素，你会看到新按钮自动出现在页面上，无需手动操作 DOM。" expected="筛选按钮栏中出现一个新按钮「印象派」，点击后能够筛选出对应时期的曲目。"}
修改 filterButtons 数组——添加一个「印象派」筛选选项
::::

::::step{purpose="数据是 Vue 应用的唯一真相来源。添加数据后，v-for 会自动渲染新条目。这验证了响应式系统的关键特性：列表渲染完全由数据驱动，不需要像以前那样手动调用 createElement 和 appendChild。" expected="曲目列表底部出现你新添加的两首曲目卡片，格式与已有卡片一致。"}
在 tracks 数组中添加两首你自己喜欢的曲目
::::

::::step{purpose="v-if 根据条件决定 DOM 元素是否存在。当筛选结果为空时，显示友好的空状态提示，而不是一片空白——这是用户体验的基本要求。v-if 在条件为 false 时完全移除 DOM 元素，适合状态切换不频繁的场景。" expected="选择某个没有曲目的时期（如印象派）时，筛选区域显示「暂无匹配曲目」的提示文字。"}
用 v-if 添加「暂无匹配曲目」的空状态提示
::::

::::step{purpose="v-show 与 v-if 不同：元素始终存在于 DOM 中，只是通过 CSS display:none 隐藏。适合频繁切换的场景（如播放器控件的显示/隐藏），因为切换开销几乎为零，不会触发重新渲染。" expected="一个播放状态指示器，可以通过按钮控制显示/隐藏，切换流畅即时。"}
用 v-show 实现一个播放状态切换的指示器
::::

::::step{purpose="v-for 的索引语法 (item, index) 让你同时访问元素和位置。index + 1 显示为人类友好的序号。:key 是 Vue 内部识别列表节点的唯一依据——key 不稳定会导致 DOM 复用错误、状态错乱和过渡动画失效。永远用唯一 ID 做 key，不要用 index。" expected="每张曲目卡片前显示带有序号的标签（1. 2. 3. ...），修改筛选条件后序号能正确反映新列表顺序。"}
挑战：用 v-for="(track, index)" 给每张卡片前加上序号（1. 2. 3. ...），并为每个元素指定稳定的 :key
[[html]]<details class=challenge-answer><summary>💡 查看答案</summary><div class=answer-content><p>修改模板中的 <code>v-for</code>：</p><pre><code>&lt;template&gt;
  &lt;ul&gt;
    &lt;li v-for="(track, index) in filteredTracks" :key="track.id"&gt;
      &lt;span class="num"&gt;{{ index + 1 }}.&lt;/span&gt;
      &lt;strong&gt;{{ track.name }}&lt;/strong&gt;
      &lt;span&gt;— {{ track.composer }}&lt;/span&gt;
      &lt;span class="period"&gt;{{ track.period }}&lt;/span&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;</code></pre><p>关键：<code>v-for="(track, index)"</code> 中 index 从 0 开始；<code>{{ index + 1 }}</code> 显示为 1,2,3...；<code>:key="track.id"</code> 始终用唯一 ID，不要用 index 做 key。</p></div></details>[[/html]]
::::

:::

:::recap
你学会了 Vue 的核心指令——v-bind（:）绑定属性，v-if/v-show 控制显示隐藏，v-for 循环渲染列表，v-on（@）监听事件。这些指令就像乐谱上的演奏记号，各司其职，组合起来就能写出完整的页面。
:::

:::listen-to
帕格尼尼《24 首随想曲》— 每一首都是对一种特定演奏技巧（泛音、双音、拨弦、跳弓）的极致发挥。Vue 的每个指令就像一种特定的演奏技巧——各司其职，组合起来就是一场华丽的演出。
:::

