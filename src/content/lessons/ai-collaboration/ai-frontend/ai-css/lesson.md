# 用 AI 写样式和布局

:::analogy
AI 是颜料店——它能准确调出任何你描述的颜色。但只有你的眼睛才知道这个颜色放画布上好不好看。AI 管精准，你管审美。
:::

:::prerequisite
你已经学过 CSS 基础：盒模型、Flexbox、Grid、响应式（`@media`）、CSS 变量、过渡与动画。
:::

## 一、你的问题

你让 AI 写一个卡片的 CSS。它给了你 80 行代码——能渲染，但就是感觉不对劲。阴影太重、间距太大、hover 效果生硬。你说不清楚"哪里不对"，但就是不好看。而且 `width: 320px` 这种硬编码——在手机上会撑破屏幕。你需要的不只是"AI 写样式"，而是"AI 写出你能审查、能调整、能维护的样式"。

## 二、解决方案：CSS 四维审查法

拿到 AI 生成的 CSS 后，按这四个维度逐一检查。每个维度只问一个问题。

### 维度 1：可维护性——这段 CSS 别人看得懂吗？

检查项：
- **硬编码数值。** `width: 320px; height: 240px;`——换一个屏幕尺寸就崩。该用 `rem`、`%`、`vw`、`max-width` 的地方有没有用魔法数字？
- **缺少 CSS 变量。** 同一个颜色 `#1A73E8` 出现在 8 个选择器里。品牌色一变，你要改 8 处。应该定义一个 `--color-primary`。
- **选择器过于具体。** `.card > div > div > span`——DOM 结构一变 CSS 就失效。该用 class 选择器的地方有没有用层级选择器？

### 维度 2：响应式——手机上能看吗？

AI 默认生成桌面端样式。移动端适配不会自动出现，除非你明确提出。

检查项：
- 有没有 `@media` 查询？至少应该有 1-2 个断点（比如 768px 和 480px）。
- 小屏幕上，元素的宽度是 `100%` 还是固定的 `320px`？
- 字体大小在手机上会不会太小（小于 14px）或太大？
- 按钮/链接的点击区域在手机上够大吗（至少 44x44px，符合 iOS/Android 的人机交互规范）？

### 维度 3：设计感受——"舒服"还是"不对"？

这是 AI 完全没有能力判断的维度。只有你的眼睛能判断。

检查项：
- **间距。** 元素之间是挤在一起的还是有呼吸感？padding/margin 的值是 8 的倍数吗（视觉节奏感）？
- **色彩。** 颜色搭配和谐吗？对比度够吗（文字和背景的对比度至少 4.5:1）？
- **动画。** 过渡的时长自然吗？AI 喜欢用 0.3s——试试 0.15s 或 0.2s 是否更干脆。AI 喜欢用 `ease`——在具体场景下 `ease-in-out` 或 `cubic-bezier` 可能更合适。
- **阴影。** AI 的阴影常用 `0 2px 8px rgba(0,0,0,0.15)`——这是"统计上最常用的阴影"，但不一定是你页面上最好看的。调一调偏移量和模糊半径。

### 维度 4：代码质量——这 CSS 生产环境能用吗？

检查项：
- **冗余。** `margin: 0; padding: 0;` 在 8 个选择器里重复？
- **!important。** 任何 `!important` 都是技术债务——现在用着爽，未来 debug 火葬场。
- **浏览器兼容。** 用了 `gap` 在 flex 布局里？Safari 老版本不支持。用了 `aspect-ratio`？检查 caniuse.com。
- **关键 CSS。** 首屏渲染需要的样式有没有内联？非首屏的样式是否可以异步加载？

:::example{title="审查示例：AI 生成的卡片 CSS"}
AI 生成了如下 CSS：
```css
.card {
  width: 320px;
  height: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: all 0.3s;
}
.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transform: translateY(-2px);
}
.card .title {
  color: #1A73E8;
  font-size: 18px;
  margin: 16px;
}
.card .desc {
  color: #666;
  font-size: 14px;
  margin: 8px 16px;
}
```

**四维审查：**

维度 1（可维护性）：`width: 320px; height: 400px;` 硬编码 → 改成 `max-width: 320px; min-height: 400px;`。颜色裸值没有变量 → 抽成 `--color-primary: #1A73E8; --color-text-secondary: #666`。`.card .title` 层级选择器 → 可用但可接受，但如果组件在 slot 里可能失效。

维度 2（响应式）：完全没有 `@media` → 加上小屏适配（宽度 100%，padding 减小）。

维度 3（设计感受）：`transition: all 0.3s`——`all` 会让动画不够精准。改成 `transition: box-shadow 0.2s, transform 0.2s;`。阴影偏重，调成 `0 1px 4px rgba(0,0,0,0.08)`。

维度 4（代码质量）：没有 `!important`，没有明显冗余。但 `.title` 和 `.desc` 共用 16px 左右边距——可以用 `.card > * { margin-left: 16px; margin-right: 16px; }` 或一个 wrapper div 来复用。

**审查后改进版：**
```css
:root {
  --color-primary: #1A73E8;
  --color-text-secondary: #666;
  --card-shadow: 0 1px 4px rgba(0,0,0,0.08);
  --card-shadow-hover: 0 2px 8px rgba(0,0,0,0.12);
  --card-radius: 8px;
}

.card {
  max-width: 320px;
  min-height: 400px;
  background: white;
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  box-shadow: var(--card-shadow-hover);
  transform: translateY(-4px);
}

.card__title {
  color: var(--color-primary);
  font-size: 1.125rem;
  margin: 1rem 1rem 0;
}

.card__desc {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  margin: 0.5rem 1rem 1rem;
}

@media (max-width: 768px) {
  .card {
    max-width: 100%;
  }
}
```
:::

## 三、常见错误

**错误 1：AI 给了 CSS 直接全部复制，不做任何审查。**
> AI 生成了 200 行 CSS，一股脑贴进项目。后期发现 50 行是没用的、20 行有 `!important`、30 行可以合并。
AI 生成的 CSS 体积通常可以减掉 30%-50%。审查不是可选的——是必须的。

**错误 2：改 AI 的 CSS 数值时凭感觉，不对比实际渲染。**
> "这个阴影太深了" → 改了 `opacity` → 页面刷新 → 感觉还是不对 → 又改。
用浏览器的 DevTools，在 Elements 面板里直接调 CSS 值，实时看效果。调好了再把最终值写回代码。别在编辑器里猜。

**错误 3：让 AI 做设计决策。**
> "帮我设计一套配色方案" → AI 给了你一套蓝灰配色，你觉得"还行"就用了。
AI 的配色是统计平均——它不知道你的品牌调性、目标用户、产品气质。配色应该是你和设计师讨论的结果。AI 最多帮你"把设计稿里的颜色写成 CSS 变量"。

## 四、实际工作中的场景

- **响应式改版：** 老板说"我们的网站在手机上太难看了"。你把每个页面的 CSS 贴给 AI："用移动优先（Mobile First）策略改写这段 CSS，添加 768px 和 1024px 两个断点。"AI 出初版，你微调断点数值和布局细节。
- **设计系统搭建：** 设计师给了一套 Design Token（颜色、间距、字体、阴影）。你把 Token 贴给 AI："把这些 Design Token 转成 CSS 变量，按类别分组。文件命名：variables.css。"AI 生成变量文件，你审查命名是否合理、是否有遗漏。
- **批量样式优化：** 项目里 15 个组件的 CSS 都有一些共同的冗余（比如每个都自己定义了字体）。你让 AI 扫描 15 个 CSS 文件，提取公共样式到全局样式表。AI 做机械提取，你来判断哪些"看起来重复但实际有细微差异"的样式不能合并。

:::task{title="CSS 审查与优化实战"}
::::step{id="1"}
用 AI 生成一个"用户设置页面"的完整 CSS——包含头像区域、个人信息表单、主题切换开关、底部操作按钮。要求 AI 用 CSS 变量管理颜色和间距。
::::
::::step{id="2"}
对 AI 生成的 CSS 进行四维审查。在代码旁边用注释标注每个审查维度发现的问题（可维护性、响应式、设计感受、代码质量）。至少找到 5 处可以改进的地方。
::::
::::step{id="3"}
在浏览器 DevTools 里打开你审查的页面，逐项调整你标注的问题。把 DevTools 里调好的值写回代码文件。
::::
::::step{id="4"}
用手机模拟器（Chrome DevTools 的 Device Toolbar）检查响应式效果。确认在 iPhone SE（375px 宽）、iPad（768px 宽）、桌面端（1440px 宽）三个尺寸下都显示正常。
::::
:::

:::recap
AI 写 CSS 强在属性值的准确性（渐变、阴影、动画），弱在设计判断（好看不好看、舒服不舒服）。四维审查法：可维护性（硬编码、变量、选择器）、响应式（@media、相对单位、点击区域）、设计感受（间距、色彩、动画、阴影）、代码质量（冗余、!important、兼容性）。AI 负责把颜料调到准确色号，你决定画布上该用什么颜色。
:::
