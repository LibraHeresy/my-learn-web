# Position 定位 — 控制元素的舞台位置

:::analogy
定位属性就像不同角色的站位——`static` 是正常排队的人，`relative` 是可以微调站姿但队伍位置不变的人，`absolute` 是站到指定坐标的 VIP，`fixed` 是钉在屏幕上的水印，`sticky` 是滚到一定位置就粘住的便利贴。

把"定位"理解成"谁相对于谁来定位"——这是理解 position 的核心钥匙。
:::

:::prerequisite
**本节你需要知道这些词：**

- **CSS 盒模型**：理解元素的 `width`、`height`、`margin`、`padding`
- **HTML 嵌套结构**：理解"父元素包裹子元素"的层级关系
- **Flexbox 基础**：知道 `display: flex`（因为定位常和 Flexbox 搭配使用）
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 区分 `static`、`relative`、`absolute`、`fixed`、`sticky` 五种定位模式
- 用 `top`、`right`、`bottom`、`left` 精确控制元素位置
- 理解"定位参考系"——`absolute` 相对于最近的已定位祖先，`fixed` 相对于视口
- 独立实现固定导航栏、右下角浮动按钮、卡片角标、粘性标题
:::

:::explain{title="一、没有定位属性的时候——所有元素都按顺序排队"}
默认情况下，所有元素都是 `position: static`。这意味着它们按照 HTML 中的顺序从上到下排列，谁也不能脱离队伍：

```html
<div class="box red">红色方块</div>
<div class="box blue">蓝色方块</div>
<div class="box green">绿色方块</div>
```

```css
/* 默认行为：三个方块从上到下依次排列 */
.box {
  width: 100px;
  height: 100px;
}
/* 每个方块占据文档流中的位置，后面的方块不会跑到前面来 */
```

**问题：** 如果你想让蓝色的方块叠在红色方块上面呢？或者想让一个"回到顶部"按钮始终固定在右下角？或者想做卡片右上角的"热销"角标？

**默认的 static 定位做不到这些事情。** 所有元素像排队一样一个接一个——你需要"定位"来打破这个秩序。
:::

:::explain{title="二、`position: relative` — 在自己的座位上挪一下"}
`relative` 让元素**相对于自己原来的位置**偏移，但**原来的位置仍然保留**——别人不会顶上来：

```css
.box {
  position: relative;  /* ① 声明"我要偏移" */
  top: 20px;           /* ② 向下偏移 20px（从原来的位置上往下移） */
  left: 30px;          /* ③ 向右偏移 30px */
}
```

**逐行理解：**

1. `position: relative` — 告诉浏览器"这个元素可以偏移了"。元素仍然在文档流中。如果不设置 `top`/`left`/`right`/`bottom`，它看起来和 `static` 一样
2. `top: 20px` — 从元素的**原始位置顶部**向下移动 20px。注意：`top` 的意思是"离原始顶部边缘 20px"，所以是向下移
3. `left: 30px` — 从元素的**原始位置左侧**向右移动 30px

**关键认知：**
- `relative` 偏移后，**原始空间仍然保留**。其他元素不知道它移走了——它们还站在原来的位置上
- 就像你在电影院里从座位 A 挪到座位 B，但你的"座位号"还是 A
- `relative` 最常见的用途不是偏移本身——而是**给 absolute 子元素做定位参考系**

**top/right/bottom/left 的方向记忆法：**
- `top: 20px` = "离上边缘 20px" = 元素往下移 20px
- `left: 20px` = "离左边缘 20px" = 元素往右移 20px
- `right: 20px` = "离右边缘 20px" = 元素往左移 20px
- `bottom: 20px` = "离下边缘 20px" = 元素往上移 20px

方向是相对于**边缘推**的——top 是从上边往下推，left 是从左边往右推。
:::

:::explain{title="三、`position: absolute` — 脱离队伍，站在精确坐标上"}
`absolute` 让元素完全脱离文档流，相对于**最近的已定位祖先**（`position` 不是 `static` 的祖先元素）来定位：

```css
.stage {
  position: relative;      /* ① 父元素设为 relative——创建"定位参考系" */
  width: 400px;
  height: 300px;
}

.badge {
  position: absolute;      /* ② 脱离文档流 */
  top: 10px;               /* ③ 离参考系顶部 10px */
  right: 10px;             /* ④ 离参考系右侧 10px */
  background: #ff4444;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}
```

**逐行理解：**

1. `.stage { position: relative; }` — 这是关键！父元素设为 `relative` 但没有设置 `top`/`left`——它看起来纹丝不动，但实际上变成了"定位参考系"
2. `.badge { position: absolute; }` — 徽章脱离文档流。它原来占据的空间消失了，后面的元素会顶上来
3. `top: 10px; right: 10px;` — 相对于 `.stage` 的右上角各偏移 10px。结果是徽章出现在卡片的右上角内侧

**absolute 的定位参考系查找规则：**
- 从当前元素开始往上看父元素 → 祖父元素 → 曾祖父元素……
- 找到第一个 `position` 不是 `static` 的祖先，就以它为参考系
- 如果一路找到 `<html>` 都没找到，就以浏览器窗口（视口）为参考系

**最常见的模式：父元素 position: relative（不动）+ 子元素 position: absolute（精准定位）**

这种模式实现了"父元素划定范围，子元素在范围内自由放置"。就像在一个画板（relative）上贴便利贴（absolute）——便利贴可以贴在画板的任何位置。

**absolute 元素脱离文档流后会发生什么？**
- 它不占据原来的空间——就像这个人走出了排队队伍，他原来的位置被后面的人填上了
- 它的宽高默认由内容撑开（不再是 `width: 100%`）
- 它可以和其他元素重叠——`z-index` 控制谁在上面
:::

:::explain{title="四、`position: fixed` — 钉在屏幕上，滚动也不动"}
`fixed` 让元素相对于**浏览器窗口（视口）**定位，无论页面怎么滚动，它都固定在同一个位置：

```css
.back-to-top {
  position: fixed;     /* ① 相对于浏览器窗口定位 */
  bottom: 20px;        /* ② 离窗口底部 20px */
  right: 20px;         /* ③ 离窗口右侧 20px */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #333;
  color: white;
  z-index: 999;        /* ④ 确保在其它内容之上 */
}
```

**逐行理解：**

1. `position: fixed` — 脱离文档流，相对于视口定位。滚动页面不会改变它的位置
2. `bottom: 20px` — 离浏览器窗口底部边缘 20px
3. `right: 20px` — 离浏览器窗口右侧边缘 20px
4. `z-index: 999` — 控制层叠顺序。数值越大越靠前。`fixed` 元素常需要较高的 `z-index` 来确保不被其他内容遮挡

**fixed vs absolute 的本质区别：**
- `absolute`：跟着页面内容走，页面滚动时它会跟着滚走
- `fixed`：跟着屏幕走，无论怎么滚它都在同一个位置

就像贴在车窗上的年检标志（`fixed`）vs 放在座位上的包（`absolute`）——车开了，标志还在窗上，包跟着座位走。
:::

:::explain{title="五、`position: sticky` — 滚到一定位置就粘住"}
`sticky` 是 `relative` 和 `fixed` 的混合体——在到达阈值之前正常流动（像 `relative`），到达阈值后固定不动（像 `fixed`）：

```css
.section-header {
  position: sticky;    /* ① 粘性定位 */
  top: 0;              /* ② 滚动到离视口顶部 0px 时粘住 */
  background: white;
  padding: 12px;
  z-index: 10;         /* ③ 确保粘住时不被内容遮挡 */
}
```

**逐行理解：**

1. `position: sticky` — 启用粘性定位。元素在文档流中保留位置
2. `top: 0` — 阈值。当元素距离视口顶部 0px 时，触发"粘住"效果。你可以设 `top: 20px` 表示离顶部 20px 时粘住
3. `z-index: 10` — 粘住时可能被后续内容覆盖，需要提高层级

**sticky 生效的两个必要条件（缺一不可）：**
- 必须设置至少一个阈值（`top`、`right`、`bottom`、`left` 中至少一个）
- 父元素不能设置 `overflow: hidden`（否则粘性失效）

**sticky 的典型行为：**
1. 页面刚加载时：标题在正常位置，随页面滚动
2. 标题滚到离视口顶部 0px 时：标题"粘"在顶部不动了
3. 继续向下滚：标题始终固定在顶部
4. 往回滚过阈值：标题"松开"，回到正常位置

就像便利贴——贴在本子上时翻页它会跟着翻，但如果你把它贴在桌子上，它就粘在桌上不动了。
:::

:::example{title="完整示例：一个产品卡片——三种定位同时工作"}
下面这个例子展示了 `relative`（父容器参考系）、`absolute`（角标）、`sticky`（导航栏）和 `fixed`（客服按钮）如何在实际页面中共存：

```css
/* ===== 1. sticky 导航栏 ===== */
.navbar {
  position: sticky;          /* 滚到顶部时粘住 */
  top: 0;                    /* 离视口顶部 0px 时触发 */
  background: #1a1a2e;
  color: white;
  padding: 16px 24px;
  z-index: 100;              /* 确保在所有内容之上 */
}

/* ===== 2. 产品卡片（relative 参考系） ===== */
.product-card {
  position: relative;        /* 创建定位参考系——自己不移动 */
  width: 300px;
  height: 200px;
  background: #fff;
  border-radius: 8px;
}

/* ===== 3. 热销角标（absolute） ===== */
.product-card .hot-badge {
  position: absolute;        /* 相对于 .product-card 定位 */
  top: -8px;                 /* 超出卡片顶部 8px */
  right: -8px;               /* 超出卡片右侧 8px */
  background: #ff4444;
  color: white;
  padding: 4px 12px;
  font-size: 12px;
  border-radius: 4px;
  /* 负值让角标突出卡片边缘——absolute 允许溢出父元素（父元素不能设 overflow:hidden） */
}

/* ===== 4. 右下角客服按钮（fixed） ===== */
.support-btn {
  position: fixed;           /* 始终在屏幕右下角 */
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: #0066ff;
  color: white;
  border-radius: 50%;        /* 圆形按钮 */
  border: none;
  cursor: pointer;
  z-index: 999;              /* 最高层级 */
  box-shadow: 0 4px 12px rgba(0,102,255,0.4);
}
/* 不管你滚到页面哪里，这个按钮始终在右下角等你 */
```

**运行结果：** 导航栏在滚动到页面顶部时粘住不动。每张产品卡片的右上角有一个微微突出的红色"热销"角标。右下角的蓝色客服按钮无论怎么滚都固定在屏幕右下角。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：absolute 子元素忘了给父元素设 position: relative**

```css
/* ❌ 错误：.parent 没有定位，.child 的 absolute 会相对于谁定位？ */
.parent {
  /* position 默认是 static */
}
.child {
  position: absolute;
  top: 20px;
  right: 20px;
  /* 结果：相对于 <body> 或 <html> 定位，跑到页面角落去了！ */
}

/* ✅ 正确：父元素加上 position: relative */
.parent {
  position: relative;  /* 创建定位参考系 */
}
.child {
  position: absolute;
  top: 20px;
  right: 20px;
  /* 现在 child 在 .parent 的右上角内侧 */
}
```

这是最常见的错误——以为 `absolute` 天然相对于父元素定位。实际上它是相对于最近的**已定位**祖先。如果父元素是 `static`（默认），它会跳过父元素继续往上找。

**错误 2：sticky 不生效——父元素设了 overflow: hidden**

```css
/* ❌ 错误：overflow: hidden 会破坏 sticky 的效果 */
.section {
  overflow: hidden;     /* 这个属性让 sticky 失效！ */
}
.section h2 {
  position: sticky;
  top: 0;
}

/* ✅ 正确：去掉 overflow: hidden */
.section {
  /* 不设 overflow */
}
```

**错误 3：z-index 没生效——忘了元素必须已定位**

```css
/* ❌ 错误：z-index 对 static 元素无效 */
.modal {
  z-index: 999;         /* 无效！position 默认是 static */
}

/* ✅ 正确：z-index 只对已定位元素（relative/absolute/fixed/sticky）生效 */
.modal {
  position: fixed;      /* 先定位 */
  z-index: 999;         /* 再设层级 */
}
```

**错误 4：fixed 元素被 transform 祖先破坏了**

```css
/* ❌ 错误：祖先元素有 transform，fixed 元素不再相对于视口 */
.container {
  transform: translateY(0);  /* 这个看似无害的属性改变了 fixed 的参考系 */
}
.container .toolbar {
  position: fixed;           /* 现在相对于 .container，而不是视口！ */
  top: 0;
}

/* ✅ 正确：需要 fixed 的元素不要放在有 transform 的容器里，或者去掉 transform */
```
:::

:::explain{title="六、实际工作中你会用定位做什么？"}
定位不是"会做就行"的知识点——它是你每天写 CSS 都会用到的基础工具：

**场景 1：固定导航栏（sticky 或 fixed）**
```css
/* 方案 A：导航栏始终固定（fixed） */
.navbar {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  z-index: 100;
}
/* 注意：用 fixed 时页面内容会被导航栏遮挡，需要给 body 加 padding-top */

/* 方案 B：导航栏滚到顶部才固定（sticky） */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

**场景 2：卡片角标/未读消息数（absolute + 父 relative）**
```css
.card {
  position: relative;  /* 创建参考系 */
}
.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: red;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**场景 3：弹窗遮罩层（fixed + 全屏覆盖）**
```css
.overlay {
  position: fixed;
  inset: 0;                    /* top/right/bottom/left 全是 0 = 覆盖整个屏幕 */
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;         /* 配合 Flexbox 居中弹窗内容 */
}
```

**场景 4：下拉菜单（absolute 相对于导航项）**
```css
.nav-item {
  position: relative;          /* 下拉菜单的锚点 */
}
.dropdown {
  position: absolute;
  top: 100%;                   /* 紧贴导航项下方 */
  left: 0;
  display: none;               /* 默认隐藏 */
}
.nav-item:hover .dropdown {
  display: block;              /* 悬停时显示 */
}
```
:::

:::task{title="动手试试 ✨"}

::::step{purpose="体验 `absolute` 的定位机制：角标相对于卡片右上角定位。关键是理解父元素 `position: relative` 是子元素 `absolute` 的参考系——去掉 `relative`，角标会飞到页面角落去！" expected="卡片右上角出现一个红色角标。角标可以超出卡片边缘（负值 offset）。"}
1. 打开右侧编辑器的 `style.css`
2. 找到 `.product-card`，确认它有 `position: relative;`
3. 找到 `.hot-badge`，设置：
   ```css
   position: absolute;
   top: -6px;
   right: -6px;
   ```
4. 切换到预览区，观察角标的位置——它超出卡片边缘了吗？
5. 尝试去掉 `.product-card` 的 `position: relative`，看角标飞到哪里去了
::::

::::step{purpose="理解 `fixed` 的定位参考系是浏览器窗口。`bottom` 和 `right` 控制元素和窗口边缘的距离。不管页面滚到哪里，`fixed` 元素永远在同一个位置。" expected="右下角出现一个蓝色圆形按钮。滚动页面（如果内容够长），按钮始终在右下角不动。"}
1. 在 `style.css` 中添加"回到顶部"按钮样式：
   ```css
   .back-to-top {
     position: fixed;
     bottom: 24px;
     right: 24px;
     width: 48px;
     height: 48px;
     background: #333;
     color: #fff;
     border-radius: 50%;
   }
   ```
2. 切换到预览区，尝试滚动页面——按钮是否始终在右下角？
3. 把 `bottom` 改成 `80px`，按钮位置有什么变化？
::::

::::step{purpose="`sticky` 的效果需要页面有足够长的内容才能看到——在滚动到阈值之前它正常流动，到达阈值后固定。这个行为是 `relative` + `fixed` 的混合。" expected="向下滚动时，分类标题在到达页面顶部后粘住不动。后续内容从它下面穿过。"}
1. 给页面中的分类标题添加：
   ```css
   .section-title {
     position: sticky;
     top: 0;
     background: white;
     z-index: 10;
   }
   ```
2. 切换到预览区，向下滚动页面（如果页面内容不够长，可以先缩小窗口）
3. 观察标题是否在到达顶部后"粘"住了
4. 如果没效果，检查父元素是否有 `overflow: hidden`（sticky 的大敌！）
::::

::::step{purpose="`z-index` 控制层叠顺序——数值越大越靠前。这个实验让你亲眼看到谁盖住谁。`z-index` 只对已定位元素（relative/absolute/fixed/sticky）生效。" expected="蓝色方块盖在红色方块上面。改变 z-index 后，红色方块翻到蓝色方块上面。"}
1. 创建两个重叠的方块，用 `absolute` 定位到同一位置：
   ```css
   .box-a {
     position: absolute;
     top: 20px; left: 20px;
     width: 100px; height: 100px;
     background: red;
     z-index: 1;
   }
   .box-b {
     position: absolute;
     top: 40px; left: 40px;
     width: 100px; height: 100px;
     background: blue;
     z-index: 2;
   }
   ```
2. 切换到预览区——蓝色方块是否盖在红色上面？
3. 交换两个 `z-index` 值——红色是否翻到上面了？
::::

:::

:::recap
这一节你学会了 CSS 定位的五种模式，掌握了一个核心问题："这个元素相对于谁定位？"

**五种定位速查表：**
| 定位模式 | 参考系 | 是否脱离文档流 | 典型用途 |
|----------|--------|---------------|----------|
| `static`（默认） | 无 | 否 | 正常文档流 |
| `relative` | 自己的原始位置 | 否（位置保留） | 微调位置 / 给 absolute 做参考系 |
| `absolute` | 最近的已定位祖先 | 是 | 角标、下拉菜单、叠加元素 |
| `fixed` | 浏览器窗口（视口） | 是 | 固定导航、浮动按钮、遮罩层 |
| `sticky` | 视口（到达阈值后） | 否（位置保留） | 粘性导航、分类标题 |

**核心心法：**
- **忘了设 position: relative 给父元素？** 这是 `absolute` 最常见的 bug——角标飞到页面角落去了
- **z-index 不生效？** 检查元素是否已定位（`static` 不支持 `z-index`）
- **sticky 不粘？** 检查父元素是否有 `overflow: hidden`

下一节你将学习 **CSS Grid**——二维布局的终极方案，比 Flexbox 更强大：同时控制行和列，做出像照片墙、仪表盘一样的复杂布局。
:::
