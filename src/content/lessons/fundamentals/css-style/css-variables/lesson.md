# CSS 变量 — 一次定义，全局共鸣

:::music-analogy
CSS 变量就像乐谱开头的**调号（key signature）**——升 fa 升 do 写一次，全曲所有的 fa 和 do 都跟着自动升。用 `--main-color` 定义一种颜色，全站所有用到它的地方一起改变。这个网站本身就在大量使用 CSS 变量！
:::

:::explain{title="定义和使用变量"}
CSS 变量以 `--` 开头，在 `var()` 中引用：
```css
:root {
  --main-color: #8B2E2E;
  --card-bg: #FFFAF2;
  --spacing: 16px;
}
.card {
  color: var(--main-color);
  background: var(--card-bg);
  padding: var(--spacing);
}
```
- `:root` — 全局作用域（相当于 `<html>`），在这里定义的变量全站可用
- 变量名大小写敏感：`--mainColor` ≠ `--maincolor`
- `var(--name, fallback)` — 第二个参数是备用值
想看实际应用？打开 `src/styles/variables.css`——这个网站的每个颜色、间距、字体都定义在那里。
:::

:::explain{title="局部覆盖与主题切换"}
变量可以在任意元素上重新定义，子元素继承新值：
```css
:root {
  --theme: #8B2E2E;
}
.card.dark {
  --theme: #C9A96E;
  /* 这张卡片内的所有子元素都会用金色主题 */
}
```
这就像乐曲中的**转调**——同一段旋律换一个调演奏，感觉完全不同。
**实战优势：**
- 颜色、间距、圆角全部用变量管理
- 更换主题只需改一组变量值
- 修改一个地方，全站自动同步
:::

:::example{title="看例子"}
下面的代码在 `:root` 中定义了色彩变量，第二张卡片通过 `.dark` 类覆盖了局部变量值。两张卡片用了**完全相同的样式规则**，只因变量不同而呈现截然不同的风格：
```css
:root {
  --card-bg: #FFFAF2;
  --card-accent: #8B2E2E;
  --card-sub: #6B5A4E;
}
.card.dark {
  --card-bg: #3D2B1F;
  --card-accent: #C9A96E;
  --card-sub: #B8A898;
}
```
看预览区——白天与黑夜，同一套规则，两组变量。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="CSS 变量的核心优势：在 `:root` 中改一个颜色值，所有用到 `var(--card-accent)` 的地方都会同步变化。这就是「一次定义，全局共鸣」的含义。" expected="两张卡片的强调色（标题颜色、左边框、标签背景）全部变成了你改的新颜色。一处修改，处处生效。"}
修改 `:root` 中的 `--card-accent` 颜色，看两张卡片的变化
::::

::::step{purpose="练习自己定义一个 CSS 变量。以后要统一修改圆角大小，只需要改 `--radius` 一个值——这就是大型网站用变量管理样式的核心原因。" expected="卡片使用了 `var(--radius)` 后，修改 `--radius` 的值，两张卡片的圆角同时变化。"}
在 `:root` 中新增一个 `--radius: 8px` 变量，让两张卡片用 `var(--radius)` 替代固定的 `border-radius` 值
::::

::::step{purpose="理解 CSS 变量的**作用域**——在 `.card.dark` 中重新定义的变量只对这张卡片生效，` :root` 中的全局值不受影响。这就是局部覆盖。" expected="暗色卡片变成了你自定义的颜色方案，但浅色卡片保持原来的 `:root` 配色不变。"}
修改 `.card.dark` 中的变量值，创造你自己的暗色主题色板
::::

::::step{purpose="从零创建一套主题——在 HTML 中加卡片、在 CSS 中定义变量。通过这个练习，你掌握了用 CSS 变量做多主题切换的完整工作流。" expected="页面中出现第三张暖橙色主题的卡片，三张卡片各有不同的配色方案，但共享同一套 CSS 规则。"}
挑战：创建第三张卡片，给它一个 `.warm` 类并定义一套暖橙色调变量
::::

:::

:::recap
这一节你学会了用 CSS 变量统一管理颜色和尺寸——在 `:root` 中定义一次（如 `--main-color`），全站所有地方用 `var()` 引用，改一处就全改。你还可以在某个局部重新定义变量值，实现明暗主题一键切换。现在你的 CSS 代码变得更干净了，再也不用到处复制粘贴同一个颜色值。
:::

:::listen-to
巴赫《十二平均律》— 24 个大小调各写一首前奏曲与赋格，每个调性有不同的色彩和性格，就像 CSS 变量为不同的主题定义不同的色板，一键切换整个氛围。
:::

