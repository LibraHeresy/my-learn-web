# Position 定位 — 控制元素的位置

:::analogy
定位属性就像不同角色的站位——relative 是正常排队的人，absolute 是站到指定坐标的VIP，fixed 是钉在屏幕上的水印，sticky 是滚到一定位置就粘住的便签。
:::

:::explain{title="static 与 relative"}
所有元素默认都是 `position: static`（正常文档流，位置由 HTML 顺序决定）。
`position: relative` 让元素可以**相对于自己原来的位置**偏移：
```css
.box {
  position: relative;
  top: 10px;    /* 下移 10px */
  left: 20px;   /* 右移 20px */
}
```
- 元素仍然占据原来的空间（别人不会顶上来）
- 就像团队成员在自己的座位上微微调整姿势，不影响旁边的团队成员
:::

:::explain{title="absolute — 脱离文档流"}
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
```
- 元素完全脱离文档流（不占据原来的空间）
- 用 `top`、`right`、`bottom`、`left` 控制位置
- 就像**一个人走出队伍，站到指定坐标的精确位置**
:::

:::explain{title="fixed 与 sticky"}
`position: fixed` — 相对于**浏览器窗口**定位，滚动也不动：
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
```
position: sticky` — 滚动到一定阈值后"粘"住：
```css
.header {
  position: sticky;
  top: 0;
}
```
- `fixed` 像**贴在车窗上的年检标志**——不管车怎么动，它始终在同一个位置
- `sticky` 像**吸顶灯**——正常挂在天花板上，但滚动时始终可见
- `z-index` 控制层叠顺序（数值越大越靠前）
:::

:::example{title="看例子"}
下面的代码展示了三种定位方式：粘性导航（sticky 顶部）、浮动标签（absolute）、微调元素（relative）：
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
```
看预览区中元素的位置关系。浮动弹窗始终在卡片右上角！
:::

:::task{title="动手试试 ✨"}
::::step{purpose="`top`、`right`、`bottom`、`left` 是绝对定位的核心——精确控制元素相对于已定位祖先的位置。数值越大，离该边缘越远。" expected="浮动元素从右上角移到了更靠中间的位置。改变 `top` 和 `right` 的值就改变了它的坐标。"}
把 `.soloist` 的 `top` 改成 `50px`，`right` 改成 `50px`，看它移动到哪里
::::

::::step{purpose="`relative` 偏移不影响其他元素的位置——偏移元素向右移了，但旁边的元素不会跟过来。" expected="带有 `relative` 的偏移卡片大幅右移，但其他卡片保持在原位。"}
把 `.player-shift` 的 `left` 从 `20px` 改成 `60px`
::::

::::step{purpose="`absolute` 的徽章可以溢出父元素边界——负值让元素向外突出。" expected="徽章移到了卡片外面。`absolute` + 负值让元素可以超出容器边界。"}
试试在 `.badge` 中使用 `position: absolute` 和 `top: -8px; right: -8px`
::::

::::step{purpose="`sticky` 在到达阈值前正常流动，到达后固定不动——就像便利贴，滚到顶部就粘住。" expected="(本示例中内容较短，可能看不到 sticky 效果) 理解概念即可：sticky 是 relative 和 fixed 的混合。"}
在预览区滚动（如果内容够多），观察 `sticky` 的行为
::::

:::

:::recap
这一节你学会了用 `position` 控制元素的定位方式——`relative` 让元素在自己的位置上微调，`absolute` 让元素脱离文档流放在指定坐标，`fixed` 让元素固定在屏幕某个位置滚动也不走，`sticky` 让元素在滚到一定位置时"粘"住。用 `top`、`right`、`bottom`、`left` 精确控制位置。现在你可以让任何一个元素出现在页面的任何位置了。
:::


