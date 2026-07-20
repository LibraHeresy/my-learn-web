# 盒模型 — 理解元素的空间

:::analogy
每个元素都是一个盒子，就像快递包裹——content 是商品，padding 是泡沫填充，border 是纸箱，margin 是包裹之间的间距。
:::

:::explain{title="盒模型的四层结构"}
从内到外，每个元素有四层空间：
```html
<div class="box-model-demo">
  <div class="bm-margin"><span class="bm-label">margin 外边距</span>
    <div class="bm-border"><span class="bm-label">border 边框</span>
      <div class="bm-padding"><span class="bm-label">padding 内边距</span>
        <div class="bm-content">content（内容）</div>
      </div>
    </div>
  </div>
</div>
```
最外层 `margin`（外边距），往里一层 `border`（边框），再往里 `padding`（内边距），最里面是 `content`（内容）。理解这个层次关系就掌握了 CSS 布局的基础！
:::

:::explain{title="padding 和 margin 的区别"}
- `padding`（内边距）：内容与边框之间的距离，在边框**里面**
- `margin`（外边距）：边框与相邻元素之间的距离，在边框**外面**
一个常用的记忆方式：
- padding 有背景色（在盒子里）
- margin 透明（盒子之外）
就像舞台上的地毯（padding）和舞台之间的过道（margin）！
:::

:::explain{title="box-sizing — 盒子大小的计算方式"}
一个容易困惑的地方：默认情况下，`width` 只控制**内容区**的宽度。如果你设置 `width: 100%` 再加上 `padding`，盒子就会溢出：
```css
/* 默认 box-sizing: content-box */
.card {
  width: 100%;          /* 内容区占满父容器 */
  padding: 24px;        /* 额外增加 48px 宽度（左右各 24px） */
  border: 2px solid;    /* 又额外增加 4px */
  /* 实际占用宽度 = 100% + 48px + 4px → 溢出了！ */
}
```
解决方案是使用 `box-sizing: border-box`：
```css
.card {
  box-sizing: border-box;  /* width 包含 content + padding + border */
  width: 100%;             /* 现在不会溢出了 */
  padding: 24px;
  border: 2px solid;
}
```
推荐在所有项目中加上这段 CSS reset，让所有元素都使用 `border-box`：
```css
*, *::before, *::after {
  box-sizing: border-box;
}
```
> 💡 类比：`content-box` 像只算房间内面积，不算墙壁厚度；`border-box` 像算整套房子的建筑面积——一次性算清。
:::

:::example{title="看例子"}
下面的代码展示了盒模型的实际应用。两张卡片，每张都有自己的padding和margin：
```css
.card {
  background-color: #FFFAF2;
  border: 2px solid #D4C5A9;
  border-radius: 8px;
  padding: 24px;       /* 内容到边框的距离 */
  margin-bottom: 20px;  /* 卡片之间的间隔 */
}
```
:::

:::task{title="动手试试 ✨"}
::::step{purpose="`padding` 是内容到边框的内部空间。减小 padding，内容和边框贴得很紧——像字写到纸边缘一样挤。" expected="卡片文字紧贴边框，看起来很局促。这就是 padding 不够的后果。"}
把 `.card` 的 `padding` 从 `24px` 改成 `8px`，感受内容变得拥挤
::::

::::step{purpose="增大 padding 给内容更多呼吸空间。padding 越大，内容区和边框之间的距离越远。" expected="卡片变得非常宽敞。文字四周有大量留白。合适的 padding 让内容看起来更舒服。"}
把 `padding` 改成 `48px`，感受宽松的空间
::::

::::step{purpose="`margin` 是元素外部的距离。加大 margin-bottom 会让两张卡片离得更远。记住：padding 有背景色（在盒子里），margin 透明（盒子之外）。" expected="两张卡片之间的间隔明显变大了。这就是 margin 的作用——控制元素之间的距离。"}
把 `margin-bottom` 从 `20px` 改成 `60px`，卡片间距变大
::::

::::step{purpose="浏览器会给某些元素默认的 margin。`h2` 默认有上下 margin，有时会显得多余。理解默认样式的存在，才知道为什么要重置它们。" expected="`h2` 顶部的间距消失了，文字紧贴卡片顶部。这就是为什么很多 CSS 框架会先重置默认样式。"}
试试给 `h2` 加一个 `margin-top: 0` 消除顶部多余间距
::::

:::

:::recap
这一节你学会了一个非常重要的概念——盒模型。每个元素从内到外有四层：内容（`content`）、内边距（`padding`，内容到边框的距离）、边框（`border`）、外边距（`margin`，元素之间的距离）。记住一个窍门：`padding` 有背景色（在盒子里），`margin` 是透明的（盒子之外）。你还学会了用 `box-sizing: border-box` 避免宽度计算溢出。现在你理解网页里的每个元素都是一个"盒子"了。
:::


