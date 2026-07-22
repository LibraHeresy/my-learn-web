# 用 AI 实现组件

:::analogy
AI 是零件供应商——每个零件单独看都质量不错。但你是组装工——只有你知道零件 A 的接口和零件 B 的接口是否匹配，以及组装完成后的机器该怎么运转。

:::

:::prerequisite
你已经学过 Vue 3 的组件化开发（props、emits、slot、组合式函数），知道组件之间如何通信。

:::

:::explain{title="一、你的问题"}
你用 AI 在不同对话中生成了 TimerDisplay、TimerControls、TaskList、SettingsPanel 四个组件。每个组件单独看都没问题——props 定义清晰、样式合理、逻辑通顺。但当你把它们放到 App.vue 里组合时，问题出现了：TimerDisplay 期望的 prop 叫 `seconds`，但 TimerControls emit 的事件里传的是 `timeLeft`；TaskList 的数据结构是嵌套对象，但 SettingsPanel 读写的是扁平数组。组件之间的接口对不上——你陷入了"每个零件都完美、但拼起来就不工作"的困境。
:::

:::explain{title="二、解决方案：接口先行 + 逐个对话"}
### 原则 1：先写接口契约，再让 AI 生成组件

在让 AI 写任何一个组件之前，先用 2 分钟在纸上（或注释里）写下所有组件之间的接口：

```
=== 接口契约 ===

App.vue（父组件）持有：
  - timerSeconds: ref(1500)  // 当前剩余秒数
  - isRunning: ref(false)    // 是否计时中
  - tasks: ref([{id, title, duration, completed}])

TimerDisplay 组件：
  - Props: seconds: Number（必填）
  - 不 emit 事件（纯展示组件）

TimerControls 组件：
  - Props: isRunning: Boolean（必填）
  - Emits: 'start', 'pause', 'reset'（无 payload）

TaskList 组件：
  - Props: tasks: Array（必填）
  - Emits: 'select-task', payload: { id, duration }
```

**这份契约是你输入给 AI 的"统一接口文档"。** 在每次对话的开头附上它，AI 就不会在不同对话中用不同的 prop 名。

**如何把接口写进 Prompt**

```
【接口契约 - 本次对话的组件必须遵守以下接口】

TimerControls 组件：
  Props: { isRunning: Boolean }
  Emits: { start: [], pause: [], reset: [] }

【需求】
根据上述接口，实现 TimerControls 组件：
- 当 isRunning 为 true，显示"暂停"按钮，点击 emit('pause')
- 当 isRunning 为 false，显示"开始"按钮，点击 emit('start')
- 始终显示"重置"按钮，点击 emit('reset')
- 使用 Vue 3 Composition API，原生 CSS
```
AI 看到接口契约后，生成的组件 props 和 emits 就一定和你定义的一致。你再也不用担心"这个对话里它叫 `timeRemaining`，那个对话里叫 `remainingSeconds`"。

### 原则 2：一个组件一个对话（或 2-3 个密切相关的组件合并）

不要在一个对话里让 AI 生成所有组件。原因有两个：

1. **AI 的上下文是有限的。** 生成的组件越多，后面的组件越容易忘记前面组件的设计决策。第 5 个组件的 prop 命名风格可能和第 1 个完全不同。
2. **你无法逐个审查。** 一次性收到 4 个组件共 300 行代码，你不看直接粘贴，等于闭着眼睛开飞机。

**正确节奏：**
```
对话 1：生成 TimerDisplay → 你审查（props 类型对吗？样式对吗？）→ 修改 → 确认无误 → 保存
对话 2：生成 TimerControls → 你审查 → 修改 → 确认无误 → 保存
对话 3：生成 TaskList → 你审查 → 修改 → 确认无误 → 保存
对话 4：在 App.vue 中组合三个组件 → 你审查（数据流对吗？事件监听对吗？）→ 跑起来 → 调试
```

每个对话结束后，你拿到的是一个"经过你审查和修改、你确认可以用的组件"。4 个对话后，你有 4 个质量可控的组件，而不是 1 个质量不明的代码堆。

### 原则 3：App.vue 的整合由你主导，AI 辅助

组件都有了，最后一步是把它们拼起来。这一步不能完全交给 AI——因为只有你知道数据流该怎么设计。

**你来做的事：**
- 哪些数据放在 App.vue（全局状态）
- 哪些数据放在组件内部（局部状态）
- 组件之间的事件流（A emit → App.vue 处理 → 传递给 B）

**AI 来做的事：**
- 根据你定义的数据流和接口契约，写出 App.vue 的整合代码
- 写出 composable（组合式函数）中的逻辑实现

**正确的整合 Prompt：**
```
在 App.vue 中组合以下三个组件，按照接口契约：
- TimerDisplay（:seconds="timerSeconds"）
- TimerControls（:is-running="isRunning" @start="startTimer" @pause="pauseTimer" @reset="resetTimer"）
- TaskList（:tasks="tasks" @select-task="onSelectTask"）

计时逻辑写在一个 useTimer.js composable 中：
- startTimer(): 开始倒计时，每秒减 1
- pauseTimer(): 暂停倒计时
- resetTimer(): 重置为 1500 秒
- 倒计时到 0 时，播放提示音并自动停止

请生成 App.vue 和 useTimer.js 的代码。
```

:::

:::hint{title="整合阶段的节奏"}
生成 App.vue → `npm run dev` → 看页面 → 按钮能点吗？计时器在倒计时吗？数据在组件之间正确传递吗？→ 有问题 → 把具体现象告诉 AI（"点击开始按钮后 TimerDisplay 没有变化"）→ AI 修正 → 再验证。不要一次性把 App.vue + 3 个 composable 全部生成，先跑通最简单的整合（比如只接一个组件），确认通了再逐步加。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：不先定接口就开始生成组件。**
> 让 AI 生成 TimerDisplay → 审查通过 → 生成 TimerControls → 审查通过 → 组合时发现 props 名不对。
这是可以避免的痛苦。花 2 分钟写接口契约，省掉 2 小时改 props 名和 debug 数据流。

**错误 2：一次性让 AI 生成全部组件和一个完整的 App.vue。**
> "给我生成番茄钟的全部组件和主页面" → 一次性 400 行代码 → 复制粘贴 → 跑了，但逻辑一团乱麻。
你失去了逐个审查的机会。400 行里有一个 bug，你要从 400 行里找，而不是 4 个 50 行的组件里找。

**错误 3：整合由 AI 全权负责，你不定义数据流。**
> "帮我把这些组件拼起来" → AI 用自己的逻辑拼 → 数据结构是它设计的 → 你要改一个功能时看不懂它的逻辑。
AI 整合的代码通常能跑但不好维护——因为它是"统计上最可能的整合方式"，而不是"最符合你项目约束的整合方式"。数据流设计永远是你的职责。
:::

:::explain{title="四、实际工作中你会怎么用？"}
- **页面开发：** 设计师给了你一个页面设计稿，上面有 6 个 UI 区域。你先把这 6 个区域定义成 6 个组件的接口契约（每个组件的 props、emits、职责），然后让 AI 逐个生成。6 个组件生成完，你在主页面里按接口契约组合——每个组件的 props 名和事件名都对得上，一分钟都不用花在"这个 prop 到底叫什么"的猜测上。
- **多人协作：** 你和另一个前端分工——你写组件 A，ta 写组件 B。你们先对齐接口（A 需要什么 props、B 会 emit 什么事件），然后各自用 AI 生成自己的组件。最后合并时，只要接口没变，组件内部怎么实现的互不影响。接口契约就是你们之间的合同。
- **组件库维护：** 项目里有 20 个通用组件。每次新增组件时，你先写出接口文档（参考现有组件的命名规范），然后让 AI 按照接口文档 + 命名规范生成组件骨架。这样新组件和旧组件的接口风格完全一致，后续维护者不需要在 20 种不同的命名方式之间跳转。

:::

:::task{title="组件生成与整合实战"}
::::step{id="1"}
基于你在之前课程中的项目规划，写出至少 3 个组件的接口契约（每个组件的 props、emits、职责）。这份契约不要超过一页纸。
::::
::::step{id="2"}
开启一个新 AI 对话，把接口契约 + 第 1 个组件的需求贴给 AI，生成组件代码。审查代码（是否符合接口？边界处理了吗？），确认无误后保存。
::::
::::step{id="3"}
用新对话分别生成剩余组件。每个对话都附完整的接口契约。
::::
::::step{id="4"}
所有组件生成完毕后，自己写 App.vue 的整合框架（或用 AI 辅助但由你指定每个组件的 props 绑定和事件监听）。`npm run dev` 跑起来，验证组件之间的数据流是否符合你的接口契约设计。
::::
:::


:::recap
AI 在不同对话中生成组件，它会忘记别的对话里做了什么——这是组件接口不一致的根本原因。解决方案是接口先行：在让 AI 写任何代码之前，先用 2 分钟写下所有组件的接口契约（props、emits、职责），作为每个对话的输入。一个组件一个对话（或 2-3 个密切相关的合并），逐个审查、逐个验收。最后的整合由你主导——你定义数据流，AI 辅助写实现。你的角色不是代码审查员，而是接口协调者和系统集成者。

:::
