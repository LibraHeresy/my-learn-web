# CSS 动画深入 — 让页面充满律动

:::analogy
`@keyframes` 让你像导演一样精确控制动画的每一步——就像翻页动画书，你画出第 1 页、第 10 页、第 20 页的画面，浏览器自动补全中间的所有页。`transition` 只能从 A 到 B，`@keyframes` 可以从 A 到 B 到 C 到 D——想有多少步就有多少步。
:::

:::prerequisite
**本节你需要知道这些词：**

- `transition`：知道 `transition` 让属性变化平滑过渡（上一节内容）
- `transform`：知道 `translateY()`、`scale()`、`rotate()` 这些变换函数
- **伪类 `:hover`**：知道鼠标悬停时触发样式变化
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 用 `@keyframes` 定义多步骤的关键帧动画
- 用 `animation` 属性控制动画的播放方式
- 区分什么时候用 `transition`，什么时候用 `@keyframes`
- 理解 `animation-fill-mode` 的作用（动画结束后停在哪儿）
:::

:::explain{title="一、transition 的极限——当两个状态不够用时"}
回忆上一节：`transition` 在两个状态之间平滑过渡——"默认状态"和"hover 状态"。这个模型覆盖了大多数交互场景。

但有些效果需要**多于两个状态**，或者需要**自动播放**（不依赖鼠标悬停）：

- 一个脉动的心跳效果：正常大小 → 放大 → 正常 → 放大 → 正常...
- 一个加载转圈：旋转 0° → 360° → 继续转，永不停止
- 一个弹跳进入：从屏幕下方弹上来 → 超过目标位置 → 回弹 → 停在目标位置

**这些效果用 `transition` 做不到——或者做起来非常笨拙。这就是 `@keyframes` 要解决的问题。**
:::

:::explain{title="二、@keyframes — 定义动画的"分解动作""}
用 `@keyframes` 定义一个名为 `pulse`（脉动）的动画，包含 3 个关键帧：

```css
/* 第一步：定义关键帧——写出每个节点的状态 */
@keyframes pulse {
  0%   {                     /* 动画开始时：原始状态 */
    opacity: 1;
    transform: scale(1);
  }
  50%  {                     /* 动画进行到一半时：半透明 + 放大 */
    opacity: 0.6;
    transform: scale(1.05);
  }
  100% {                     /* 动画结束时：回到原始状态 */
    opacity: 1;
    transform: scale(1);
  }
}

/* 第二步：用 animation 属性把关键帧应用到元素上 */
.card {
  animation: pulse 2s ease-in-out infinite;
  /*        ↑      ↑   ↑           ↑
   *      名称   周期  缓动      循环次数(infinite=无限) */
}
```

**效果：** 卡片持续脉动——从完整不透明放大到 1.05 倍半透明，再缩回原始状态。2 秒一个周期，无限循环。

**`@keyframes` 的本质：** 你定义几个"关键帧"（关键时间点的状态），浏览器自动计算并填充中间的所有过渡帧。百分比代表时间进度——0% 是开始，100% 是结束，50% 是中间。`from` = 0%，`to` = 100%。
:::

:::explain{title="三、逐句拆解 animation 属性"}
`animation` 是 8 个子属性的简写。把它拆开来看：

```css
.card {
  /*
   * animation 的 8 个子属性（按顺序）：
   * 1. animation-name             用哪个 @keyframes
   * 2. animation-duration         一个周期多长时间
   * 3. animation-timing-function  缓动函数
   * 4. animation-delay           等多久再开始
   * 5. animation-iteration-count  重复几次（infinite = 无限）
   * 6. animation-direction       正放还是倒放
   * 7. animation-fill-mode       结束后保持哪个状态
   * 8. animation-play-state      运行还是暂停（running / paused）
   */

  animation-name: pulse;           /* 对应 @keyframes pulse */
  animation-duration: 2s;          /* 2 秒一个周期 */
  animation-timing-function: ease-in-out; /* 缓入缓出 */
  animation-delay: 0s;             /* 立即开始，不等 */
  animation-iteration-count: infinite; /* 无限循环。3 = 播 3 次 */
  animation-direction: normal;     /* normal = 正向，alternate = 来回 */
  animation-fill-mode: none;       /* 结束后回到初始状态 */
  animation-play-state: running;   /* running = 播放，paused = 暂停 */
}
```

**最常用的子属性是你已经用到的三个：** name + duration + iteration-count。其他子属性按需使用——不需要每次都写全。
:::

:::explain{title="四、animation-direction 和 animation-fill-mode —— 控制播放方向和停留位置"}
这两个子属性比较特别，值得单独解释：

**animation-direction —— 正放还是倒放？**
```css
/* normal：每次都是从 0% 到 100%（默认） */
animation-direction: normal;

/* reverse：每次都是从 100% 到 0%（倒着放） */
animation-direction: reverse;

/* alternate：第一次正放，第二次倒放，来回交替 */
animation-direction: alternate;
/* 适合：摇摆效果——摇过去再摇回来，而不是每次都从左边"跳"回左边再摇 */
```

**animation-fill-mode —— 动画结束后停在哪？**
```css
/* none：结束后回到动画前的原始状态（默认） */
animation-fill-mode: none;

/* forwards：结束后保持在最后一帧（100% 的状态） */
animation-fill-mode: forwards;
/* 适合：淡入进入——元素先透明，动画播完停在完全不透明的状态 */

/* backwards：开始前就取第一帧（0%）的状态 */
animation-fill-mode: backwards;

/* both：同时应用 forwards 和 backwards */
animation-fill-mode: both;
```

**fill-mode 的实战场景：** 一个"淡入上浮"的入场动画——`forwards` 确保动画结束后元素停留在最终位置（不闪回原地），`backwards` 确保在 `animation-delay` 延迟期间元素已经取到了起始状态（不会先闪一下）。
:::

:::explain{title="五、transition vs @keyframes —— 什么时候用哪个？"}
| | transition | @keyframes |
|---|---|---|
| **触发方式** | 需要触发器（hover、focus、class 切换） | 可自动播放，页面加载即开始 |
| **状态数量** | 两个（从 A 到 B） | 任意多个（从 A→B→C→D...） |
| **循环** | 不支持自动循环 | 支持 `infinite` 无限循环 |
| **典型场景** | hover 变色、按钮反馈、卡片悬浮 | 加载动画、心跳脉动、入场动画 |

**一个简单的决策规则：**
- 用户交互触发 + 两个状态 → **用 `transition`**（更简单，性能更好）
- 需要自动播放 + 多于两个状态 + 需要循环 → **用 `@keyframes`**
- 页面加载时的入场动画 → **用 `@keyframes`**（配合 `animation-fill-mode: forwards`）
:::

:::example{title="看例子"}
下面的代码展示了三种经典动画效果。切换到预览区看看：

```css
/* 1. 摇摆——像庙里的钟摆 */
@keyframes swing {
  0%, 100% { transform: rotate(-3deg); }  /* 开始和结束都在最左边 */
  50%      { transform: rotate(3deg); }   /* 中间摆到最右边 */
}
.swing-card {
  animation: swing 2s ease-in-out infinite alternate;
  /*                 ↑    ↑           ↑        ↑
   *               名称  周期       无限循环   来回摆动 */
}

/* 2. 淡入上浮——像幕布升起，元素从下方飘进来 */
@keyframes fadeInUp {
  from {                              /* from = 0% */
    opacity: 0;                       /* 开始时完全透明 */
    transform: translateY(30px);      /* 开始位置比目标低 30px */
  }
  to {                                /* to = 100% */
    opacity: 1;                       /* 结束时完全不透明 */
    transform: translateY(0);         /* 到达目标位置 */
  }
}
.fade-card {
  animation: fadeInUp 0.6s ease-out forwards;
  /*                          ↑        ↑
   *                      快→慢缓动   停在最后一帧（不闪回） */
}

/* 3. 心跳——缩放 + 透明度脉动 */
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  15%      { transform: scale(1.15); }  /* 15% 时放大到 1.15 */
  30%      { transform: scale(1); }     /* 30% 时回到正常 */
  45%      { transform: scale(1.1); }   /* 45% 时再小幅度放大 */
  60%      { transform: scale(1); }     /* 60% 时再回到正常 */
}
.heart-card {
  animation: heartbeat 1.5s ease-in-out infinite;
}
```

注意：摇摆动画用了 `alternate`（来回），淡入动画用了 `forwards`（停在最后一帧），心跳用了 `infinite`（无限循环）。每个参数的选择都是为效果服务的。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：`@keyframes` 名字写错或者不匹配**
```css
@keyframes pulse { ... }
.card {
  animation: pulsee 2s infinite;  /* ❌ pulsee ≠ pulse，动画不生效 */
}
```
`animation-name` 必须和 `@keyframes` 后面的名字完全一致（大小写敏感）。

**错误 2：忘记写 `animation-duration`**
```css
.card {
  animation: pulse infinite;  /* ❌ 没有 duration！默认是 0s，动画瞬间完成 */
}
```
如果只写名字不给时长，动画时长是 0s——什么也看不到。`animation-duration` 是必填的。

**错误 3：`forwards` 和 `infinite` 同时使用**
```css
.card {
  animation: fadeIn 1s ease both infinite;  /* ❌ 无限循环没有"最后" */
}
```
`forwards` 是"停在最后一帧"，`infinite` 是"永不停止"——这两个参数逻辑上矛盾。`infinite` 动画不需要 `fill-mode`。

**错误 4：在 `@keyframes` 中对不可过渡的属性做动画**
```css
@keyframes bad {
  0%   { display: block; }   /* ❌ display 不支持动画 */
  100% { display: none; }
}
```
`@keyframes` 也只能对可过渡的属性做动画——和 `transition` 的限制相同。
:::

:::explain{title="六、实际工作中你会怎么用？"}
在真实项目中，动画需要克制使用——太多动画会让页面显得花哨，也会影响性能：

- **加载动画**：spinner（转圈）、骨架屏脉动——`@keyframes` + `infinite`
- **入场动画**：列表项逐一淡入上浮——`@keyframes` + `forwards` + 逐个 `animation-delay`
- **交互动画**：按钮 hover、卡片悬浮——用 `transition`，不是 `@keyframes`
- **注意动画**：重要提示的弹性缩放或抖动——`@keyframes` 单次播放

**一个原则：** 用户不关心你的动画有多酷炫，他们在意的是有没有被卡到、有没有被干扰到。保持动画简短（0.3s-0.6s）、克制（一次不要超过 2-3 个同时播放）、性能友好（优先用 `transform` 和 `opacity` 做动画）。
:::

:::task{title="动手试试 ✨"}

::::step{purpose="修改 `@keyframes` 关键帧中 `rotate` 的值直接改变动画幅度。值越大，摇摆越猛。动画的幅度由关键帧中的属性值决定。" expected="第一张卡片的摇摆幅度明显变大。从 3deg 到 8deg，摆动范围肉眼可见。"}
把 `swing` 动画中的 `rotate` 角度从 `3deg` 改成 `8deg`，看摇摆更剧烈
::::

::::step{purpose="`translateY` 控制动画的纵向轨迹。正值向下。增加位移距离让动画的轨迹更长，元素从更远的地方飘进来。" expected="第二张卡片的入场动画从更远的下方飘进来。修改关键帧属性值直接改变动画效果。"}
修改 `fadeInUp` 的 `translateY` 从 `30px` 改成 `60px`，让卡片从更远的地方飘入
::::

::::step{purpose="`animation-duration` 控制一个完整周期的时间。改小后心跳更快更急促，改大后心跳更慢更舒缓。" expected="心跳动画明显加速或减速。duration 是控制动画节奏最直接的参数。"}
把 `heartbeat` 的 `animation-duration` 从 `1.5s` 改成 `0.6s`（快心跳），再改成 `3s`（慢心跳）
::::

::::step{purpose="从零创建一个 `@keyframes` 动画——`from { transform: rotate(0deg); }` 到 `to { transform: rotate(360deg); }`，配合 `linear`（匀速）和 `infinite`（无限）——这就是经典的旋转加载效果。" expected="元素持续匀速旋转，像一个转动的风车或加载指示器。"}
挑战：写一个 `@keyframes spin` 动画，用 `rotate` + `linear` + `infinite` 创建旋转效果
::::

:::

:::recap
回顾本节你学会的内容：
- `@keyframes`：定义多个关键帧（0%、50%、100%...），浏览器自动补全中间帧
- `animation-name` + `animation-duration`：把关键帧应用到元素上，duration 是必填的
- `animation-iteration-count`：`3` = 播 3 次，`infinite` = 无限循环
- `animation-direction`：`normal` 正放，`reverse` 倒放，`alternate` 来回
- `animation-fill-mode`：`forwards` 停在最后一帧，`none` 回到初始状态
- **transition vs @keyframes**：交互用 transition，自动播放/多状态/循环用 @keyframes
- **性能原则**：优先对 `transform` 和 `opacity` 做动画，保持动画简短克制

下一节你将学习 CSS 变量——用 `--` 定义一次值，全站引用。改颜色只改一个地方。
:::
