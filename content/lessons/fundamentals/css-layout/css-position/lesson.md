# Position 定位 — 控制元素的舞台位置

::music-analogy
定位属性就像**舞台上不同角色的站位规则**：`relative` 像乐团成员，在自己的座位范围内微调；`absolute` 像**独奏者**站在舞台的特定坐标上；`fixed` 像**舞台灯光**，无论观众视角如何都锁定在固定位置；`sticky` 像**指挥台**，滚动到一定位置就固定住。
::

::explain{title="static 与 relative"}
所有元素默认都是 `position: static`（正常文档流，位置由 HTML 顺序决定）。
`position: relative` 让元素可以**相对于自己原来的位置**偏移：
```css
.box {
  position: relative;
  top: 10px;    /* 下移 10px */
  left: 20px;   /* 右移 20px */
}
```- 元素仍然占据原来的空间（别人不会顶上来）
- 就像乐团成员在自己的座位上微微调整姿势，不影响旁边的乐手
::

::explain{title="absolute — 脱离文档流"}
`position: absolute` 让元素脱离正常文档流，相对于**最近的已定位祖先**定位：
```css
.stage {
  position: relative;  /* 祖先必须有定位 */
}
.soloist {
  position: absolute;
  top: 20px;
  right: 30px;
}
```- 元素完全脱离文档流（不占据原来的空间）
- 用 `top`、`right`、`bottom`、`left` 控制位置
- 就像**独奏者走出乐团，站在舞台前方的精确位置**
::

::explain{title="fixed 与 sticky"}
`position: fixed` — 相对于**浏览器窗口**定位，滚动也不动：
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
````position: sticky` — 滚动到一定阈值后"粘"住：
```css
.header {
  position: sticky;
  top: 0;
}
```- `fixed` 像**舞台追光灯**——永远锁定在视野中
- `sticky` 像**指挥台**——正常流动，但一旦到达顶部就固定
- `z-index` 控制层叠顺序（数值越大越靠前）
::

::example{title="看例子"}
下面的代码模拟了一个舞台布局：指挥台（sticky 顶部）、独奏者（absolute 在卡片中央）、乐手（relative 偏移）：
```css
.stage {
  position: relative;
  height: 300px;
}
.soloist {
  position: absolute;
  top: 10px;
  right: 10px;
}
.player {
  position: relative;
  left: 20px;
}
```看预览区中元素的位置关系。独奏者始终在卡片右上角！
::

::task{title="动手试试 ✨"}
:::step{purpose="`top`、`right`、`bottom`、`left` 是绝对定位的核心——精确控制元素相对于已定位祖先的位置。数值越大，离该边缘越远。" expected="独奏者卡片从右上角移到了更靠中间的位置。改变 `top` 和 `right` 的值就改变了它的坐标。"}
把 `.soloist` 的 `top` 改成 `50px`，`right` 改成 `50px`，看它移动到哪里
:::

:::step{purpose="`relative` 偏移不影响其他元素的位置——乐手向右移了，但旁边的乐手不会跟过来。" expected="带有 `relative` 的乐手卡片大幅右移，但其他卡片保持在原位。"}
把 `.player-shift` 的 `left` 从 `20px` 改成 `60px`
:::

:::step{purpose="`absolute` 的徽章可以溢出父元素边界——负值让元素向外突出。" expected="徽章移到了卡片外面。`absolute` + 负值让元素可以超出容器边界。"}
试试在 `.badge` 中使用 `position: absolute` 和 `top: -8px; right: -8px`
:::

:::step{purpose="`sticky` 在到达阈值前正常流动，到达后固定不动——就像指挥台，滚到顶部就粘住。" expected="(本示例中内容较短，可能看不到 sticky 效果) 理解概念即可：sticky 是 relative 和 fixed 的混合。"}
在预览区滚动（如果内容够多），观察 `sticky` 的行为
:::

::

::listen-to
穆索尔斯基《图画展览会》— "漫步"主题在每一段之间出现，画面切换时它始终在那里，就像 `sticky` 元素在滚动中时隐时现。
::

