import type { PlanDay, PlanPhase, PlanTask, PlanWeek } from './types'

function lessonTask(
  id: string,
  title: string,
  estimatedMinutes: number,
  summary: string,
  reward: string,
  helperTips?: string[],
): PlanTask {
  return {
    id: `lesson-${id}`,
    title,
    type: 'lesson',
    targetType: 'lesson',
    targetId: id,
    estimatedMinutes,
    completionMode: 'auto-progress',
    summary,
    reward,
    helperTips,
  }
}

function projectTask(
  id: string,
  title: string,
  estimatedMinutes: number,
  summary: string,
  reward: string,
  helperTips?: string[],
): PlanTask {
  return {
    id: `project-${id}-${title}`,
    title,
    type: 'project',
    targetType: 'project',
    targetId: id,
    estimatedMinutes,
    completionMode: 'auto-progress',
    summary,
    reward,
    helperTips,
  }
}

function reviewTask(
  id: string,
  title: string,
  estimatedMinutes: number,
  summary: string,
  reward: string,
  helperTips?: string[],
): PlanTask {
  return {
    id: `review-${id}`,
    title,
    type: 'review',
    targetType: 'review',
    targetId: null,
    estimatedMinutes,
    completionMode: 'manual',
    summary,
    reward,
    helperTips,
  }
}

function quizTask(
  id: string,
  title: string,
  estimatedMinutes: number,
  summary: string,
  reward: string,
  accuracy: number,
  helperTips?: string[],
): PlanTask {
  return {
    id: `quiz-${id}`,
    title,
    type: 'quiz',
    targetType: 'quiz',
    targetId: 'quiz',
    estimatedMinutes,
    completionMode: 'auto-quiz',
    summary,
    reward,
    quizGoal: { type: 'overall-accuracy', value: accuracy },
    helperTips,
  }
}

function day(
  id: string,
  order: number,
  title: string,
  theme: string,
  estimatedMinutes: number,
  tasks: PlanTask[],
): PlanDay {
  return {
    id,
    order,
    title,
    theme,
    estimatedMinutes,
    canStartFreely: true,
    tasks,
  }
}

export const studyPlanPhases: PlanPhase[] = [
  {
    id: 'phase-foundation',
    title: '基础认知与页面表达',
    startWeek: 1,
    endWeek: 3,
    summary: '先建立前端整体认知，再完成 HTML、CSS 和第一个页面项目。',
    milestone: '完成后，你将做出第一个结构清楚、样式完整的页面项目。',
  },
  {
    id: 'phase-js',
    title: 'JavaScript 基础与原生交互',
    startWeek: 4,
    endWeek: 5,
    summary: '让页面从静态走向可交互，完成原生前端完整链路。',
    milestone: '完成后，你将能用原生 JS 做列表、筛选、添加等交互。',
  },
  {
    id: 'phase-async',
    title: '方法论、异步与数据驱动',
    startWeek: 6,
    endWeek: 7,
    summary: '建立拆解、调试、异步与状态思维，并完成搜索项目。',
    milestone: '完成后，你将能解释请求、渲染、防抖和错误处理的整条链路。',
  },
  {
    id: 'phase-tooling-vue',
    title: '工程化与 Vue 基础',
    startWeek: 8,
    endWeek: 9,
    summary: '理解真实项目开发环境，以及 Vue 的核心组织方式。',
    milestone: '完成后，你将明白现代前端为何要组件化与响应式。',
  },
  {
    id: 'phase-delivery',
    title: 'Vue 重构与上线交付',
    startWeek: 10,
    endWeek: 11,
    summary: '把原生项目重构成 Vue 项目，并完成构建、部署和交付。',
    milestone: '完成后，你将拥有一个可运行、可上线、可展示的主项目。',
  },
  {
    id: 'phase-ai',
    title: 'AI 协作与总复盘',
    startWeek: 12,
    endWeek: 12,
    summary: '在已有基本功的前提下，学习如何正确使用 AI 提效。',
    milestone: '完成后，你将能分清 AI 的适用边界，并完成主线总复盘。',
  },
]

export const studyPlanWeeks: PlanWeek[] = [
  {
    id: 'week-1',
    weekNumber: 1,
    phaseId: 'phase-foundation',
    phaseTitle: '基础认知与页面表达',
    title: '建立认知，进入 HTML',
    summary: '先知道前端在做什么，再开始搭页面结构。',
    milestone: '完成后，你将能搭出结构清楚的基础 HTML 页面。',
    days: [
      day('week-1-day-1', 1, 'Web 演化', '理解网页最初为什么只是文档', 300, [
        lessonTask('dawn-era', 'Web 早期', 80, '知道网页为什么最初更像电子文档。', '建立 Web 历史感'),
        lessonTask('browser-war', '浏览器战争', 80, '理解浏览器标准化为什么重要。', '理解今天前端生态的背景'),
        reviewTask('week1-day1', '一句话复盘：网页为什么会演化', 15, '把今天的历史线索压缩成自己的表达。', '建立清晰的第一层认知'),
      ]),
      day('week-1-day-2', 2, '动态网页', '理解页面为什么开始能局部更新', 300, [
        lessonTask('ajax-web20', 'AJAX 与 Web 2.0', 85, '理解动态请求为什么改变了网页体验。', '知道“局部刷新”从哪里开始'),
        lessonTask('framework-spring', '框架兴起', 75, '理解为什么前端开始需要更强的组织方式。', '为后续 Vue 做铺垫'),
        reviewTask('week1-day2', '复盘：为什么动态网页让前端更复杂了', 15, '用一句话说清 AJAX 带来的变化。', '把概念从看懂变成说清'),
      ]),
      day('week-1-day-3', 3, '前端角色', '理解组件化与 AI 时代带来的变化', 300, [
        lessonTask('component-revolution', '组件化革命', 75, '理解页面为什么会从整页开发转向组件开发。', '建立组件化心智'),
        lessonTask('ai-era', 'AI 时代', 60, '理解 AI 对学习和开发流程的影响。', '知道 AI 在课程里的位置'),
        lessonTask('music-to-frontend-map', '音乐生到前端的能力映射', 60, '把你熟悉的音乐经验映射到学习前端。', '降低陌生感，增强代入感'),
      ]),
      day('week-1-day-4', 4, 'HTML 起步', '开始搭页面骨架', 300, [
        lessonTask('html-intro', 'HTML 入门', 80, '知道标签和元素在页面里的角色。', '开始真正写页面'),
        lessonTask('html-doc-structure', 'HTML 文档结构', 75, '理解 head、body 和基本文档骨架。', '建立完整页面骨架'),
        reviewTask('week1-day4', '复盘：页面最基本的骨架是什么', 10, '把文档结构说成自己的话。', '巩固页面整体感'),
      ]),
      day('week-1-day-5', 5, '语义结构', '让页面更有结构感', 300, [
        lessonTask('html-semantic', '语义化标签', 75, '理解为什么标签不只是长得不一样。', '建立结构表达意识'),
        lessonTask('html-div-span', 'div 与 span', 60, '理解通用容器与语义标签的差别。', '减少“全靠 div 堆页面”的倾向'),
        reviewTask('week1-day5', '练习：列出一个页面的语义结构', 20, '先想结构，再动手写。', '建立先设计后编码的习惯'),
      ]),
      day('week-1-day-6', 6, '文本表达', '掌握文本与列表的表达方式', 300, [
        lessonTask('html-emphasis', '文本强调', 60, '学会让重点内容更清晰。', '提升信息层级感'),
        lessonTask('html-lists', '列表', 70, '理解列表在页面表达中的高频用途。', '能更自然地组织信息'),
        reviewTask('week1-day6', '复盘：结构和表现的区别', 15, '区分内容结构与视觉样式。', '为进入 CSS 做准备'),
      ]),
    ],
  },
  {
    id: 'week-2',
    weekNumber: 2,
    phaseId: 'phase-foundation',
    phaseTitle: '基础认知与页面表达',
    title: '完成 HTML，进入 CSS',
    summary: '把页面内容和基础样式能力建立起来。',
    milestone: '完成后，你将能独立搭出内容完整的页面结构，并知道 CSS 如何接管外观。',
    days: [
      day('week-2-day-1', 1, '媒体与链接', '补全页面常见内容类型', 300, [
        lessonTask('html-images-links', '图片与链接', 75, '学会让页面承载图片与跳转。', '让页面开始更像真实网页'),
        lessonTask('html-tables', '表格', 65, '知道什么时候该用表格组织信息。', '补齐结构化信息展示能力'),
        reviewTask('week2-day1', '练习：给页面加一张图和一个链接', 20, '把内容展示做得更完整。', '开始接近真实页面'),
      ]),
      day('week-2-day-2', 2, '表单输入', '理解用户如何把信息给页面', 300, [
        lessonTask('html-audio-video', '音视频标签', 55, '知道页面如何承载多媒体。', '建立媒体表达能力'),
        lessonTask('html-forms', '表单', 80, '理解输入、提交与交互的基础。', '开始接近真正“可用”的页面'),
        lessonTask('html-input-types', '输入类型', 60, '知道不同输入控件的职责。', '补齐输入层面的常见能力'),
      ]),
      day('week-2-day-3', 3, 'HTML 收束', '用小关卡收口 HTML', 300, [
        lessonTask('html-capstone', 'HTML 阶段关卡', 90, '用一次综合练习检查 HTML 是否串起来了。', '让基础更稳，而不是散点记忆'),
        reviewTask('week2-day3', '复盘：现在你能独立搭出什么页面', 20, '盘点自己已经具备的页面结构能力。', '让进步变得可见'),
      ]),
      day('week-2-day-4', 4, 'CSS 起步', '开始接管页面外观', 300, [
        lessonTask('css-intro', 'CSS 入门', 80, '理解样式表如何和 HTML 配合。', '开始拥有页面外观控制权'),
        lessonTask('css-selectors', '选择器', 80, '知道样式为什么会作用到某个元素。', '建立 CSS 命中元素的直觉'),
        reviewTask('week2-day4', '复盘：HTML 与 CSS 分别负责什么', 10, '把结构层和表现层分清。', '避免以后逻辑混乱'),
      ]),
      day('week-2-day-5', 5, '样式基础', '掌握最常见的视觉控制手段', 300, [
        lessonTask('css-box-model', '盒模型', 80, '理解宽高、边距、内边距为什么总会影响布局。', '减少布局玄学感'),
        lessonTask('css-bg-border', '背景与边框', 70, '学会给元素建立视觉边界。', '页面开始更像作品而不是练习'),
        reviewTask('week2-day5', '练习：把一个普通块改成卡片', 20, '把样式知识转成手感。', '强化样式控制能力'),
      ]),
      day('week-2-day-6', 6, 'CSS 规则感', '理解层叠与覆盖', 300, [
        lessonTask('css-cascade', '层叠与优先级', 80, '理解为什么样式会覆盖或失效。', '减少 CSS 排错焦虑'),
        reviewTask('week2-day6', '复盘：为什么同一个元素会有多条样式规则', 15, '把层叠讲清楚。', '为第三周布局和项目做准备'),
      ]),
    ],
  },
  {
    id: 'week-3',
    weekNumber: 3,
    phaseId: 'phase-foundation',
    phaseTitle: '基础认知与页面表达',
    title: 'CSS 收束，完成第一个页面项目',
    summary: '把样式、布局和表达能力落到第一个项目里。',
    milestone: '完成后，你将做出一个结构清楚、样式完整、可展示的静态页面。',
    days: [
      day('week-3-day-1', 1, '样式细节', '让页面更有审美控制感', 300, [
        lessonTask('css-font-spacing', '字体与间距', 70, '让页面的阅读体验更舒服。', '建立基本排版感'),
        lessonTask('css-variables', 'CSS 变量', 60, '理解如何让样式更统一、好维护。', '开始接近真实项目写法'),
        reviewTask('week3-day1', '练习：整理一组自己的主题色', 20, '把样式控制变得更有系统。', '为项目风格统一做准备'),
      ]),
      day('week-3-day-2', 2, '动态样式', '让页面有轻微反馈与层次', 300, [
        lessonTask('css-transitions', '过渡', 70, '学会让交互变化更自然。', '页面开始有反馈感'),
        lessonTask('css-animations', '动画', 65, '理解动画和过渡的区别。', '增加页面表现力'),
        reviewTask('week3-day2', '练习：给按钮加一个轻微悬浮反馈', 20, '把动态样式用在真实元素上。', '建立“可感知交互”意识'),
      ]),
      day('week-3-day-3', 3, '基础布局', '理解位置关系和居中', 300, [
        lessonTask('css-position', '定位', 75, '理解相对定位、绝对定位等概念。', '为复杂布局打底'),
        lessonTask('css-centering', '居中', 60, '掌握页面中最常见的布局需求。', '减少反复试错'),
        reviewTask('week3-day3', '复盘：什么时候该用定位，什么时候不该', 15, '把定位思路梳理清楚。', '避免布局一乱就全靠 position'),
      ]),
      day('week-3-day-4', 4, '现代布局', '进入 Flex 与 Grid', 300, [
        lessonTask('css-flexbox', 'Flex 布局', 80, '理解一维布局的高频用法。', '大幅降低常见对齐难度'),
        lessonTask('css-grid', 'Grid 布局', 70, '理解二维布局的组织方式。', '布局能力进入现代 CSS'),
        reviewTask('week3-day4', '练习：区分什么时候该用 Flex、什么时候该用 Grid', 20, '建立布局选择感。', '减少工具误用'),
      ]),
      day('week-3-day-5', 5, '响应式收束', '让页面适配不同尺寸', 300, [
        lessonTask('css-responsive', '响应式布局', 75, '理解页面为什么要适应屏幕变化。', '页面开始具备真实使用感'),
        lessonTask('css-layout-capstone', '布局阶段关卡', 85, '用一次综合练习收口布局能力。', '为项目打下稳定底子'),
        reviewTask('week3-day5', '复盘：现在你最常用的布局方式是什么', 15, '把布局技能转成自己的方法。', '项目前再做一次总结'),
      ]),
      day('week-3-day-6', 6, '页面项目', '完成第一个可展示项目', 300, [
        projectTask('music-showcase', 'music-showcase：开始前先定目标', 40, '先决定完成线，再进入项目。', '减少一上来就做大的压力'),
        projectTask('music-showcase', 'music-showcase：搭结构与样式', 160, '把 HTML/CSS 的基础能力落到一个完整页面里。', '完成第一个可展示项目'),
        projectTask('music-showcase', 'music-showcase：验收与收尾', 45, '做最小验收、修掉一个问题并收尾。', '建立“做完一个项目”的感觉'),
      ]),
    ],
  },
  {
    id: 'week-4',
    weekNumber: 4,
    phaseId: 'phase-js',
    phaseTitle: 'JavaScript 基础与原生交互',
    title: 'JavaScript 基础起步',
    summary: '开始让页面真正活起来。',
    milestone: '完成后，你将理解 JS 基础语法，并能让页面响应用户操作。',
    days: [
      day('week-4-day-1', 1, 'JS 入门', '知道 JavaScript 在页面里做什么', 300, [
        lessonTask('js-intro', 'JavaScript 入门', 80, '知道 JS 为什么能让页面变活。', '理解 JS 在前端里的角色'),
        lessonTask('js-variables', '变量', 70, '学会存储和更新信息。', '开始真正操作数据'),
        reviewTask('week4-day1', '复盘：JS 和 HTML/CSS 的分工', 15, '把三层职责分清。', '建立前端三件套整体认知'),
      ]),
      day('week-4-day-2', 2, '判断与类型', '让代码开始有条件分支', 300, [
        lessonTask('js-types', '数据类型', 70, '知道字符串、数字、布尔值的差别。', '减少类型混乱'),
        lessonTask('js-conditions', '条件判断', 75, '让程序开始根据情况变化。', '建立基本逻辑控制能力'),
        reviewTask('week4-day2', '练习：用条件判断控制一句提示文案', 20, '让逻辑和页面开始碰面。', '增强“写代码有反馈”的感觉'),
      ]),
      day('week-4-day-3', 3, '循环与函数', '进入真正可复用的代码组织', 300, [
        lessonTask('js-loops', '循环', 75, '让代码能批量处理重复任务。', '减少手写重复代码'),
        lessonTask('js-functions', '函数', 85, '理解函数为什么是代码组织的核心。', '开始建立模块感'),
        reviewTask('week4-day3', '复盘：函数为什么比一坨顺序代码更好', 15, '把函数的价值讲清楚。', '为后续项目做准备'),
      ]),
      day('week-4-day-4', 4, '数组与方法', '处理一组数据', 300, [
        lessonTask('js-arrays', '数组', 70, '理解为什么页面常常要处理“很多条数据”。', '为列表类页面打底'),
        lessonTask('js-array-methods', '数组方法', 80, '初步掌握 map、filter 等思维方式。', '开始靠数据驱动页面'),
        reviewTask('week4-day4', '练习：用数组装 3 首音乐数据', 20, '把抽象数据和真实内容结合起来。', '为项目数据结构做准备'),
      ]),
      day('week-4-day-5', 5, '对象与元素选择', '从数据走向页面元素', 300, [
        lessonTask('js-objects', '对象', 75, '学会描述一条结构化信息。', '更贴近真实业务数据'),
        lessonTask('js-querySelectorAll', 'querySelectorAll', 60, '学会批量找到页面元素。', '开始真正操控页面'),
        reviewTask('week4-day5', '复盘：数组和对象分别适合装什么', 15, '把常见数据结构分清。', '降低后面项目认知负担'),
      ]),
      day('week-4-day-6', 6, '事件入门', '让页面响应用户动作', 300, [
        lessonTask('js-events', '事件', 75, '理解点击、输入等交互是怎么接进代码的。', '页面终于开始真正“活”起来'),
        lessonTask('js-events-more', '更多事件', 70, '补齐常见交互触发方式。', '提升基础交互覆盖度'),
        reviewTask('week4-day6', '练习：做一个按钮点击反馈', 20, '把事件和视觉反馈连起来。', '巩固 JS 入门阶段'),
      ]),
    ],
  },
  {
    id: 'week-5',
    weekNumber: 5,
    phaseId: 'phase-js',
    phaseTitle: 'JavaScript 基础与原生交互',
    title: 'JS 收束，完成原生交互项目',
    summary: '把 JS 基础和 DOM 操作落到原生项目里。',
    milestone: '完成后，你将能用原生 JS 做列表、筛选、添加等交互。',
    days: [
      day('week-5-day-1', 1, '时间与 DOM', '补齐页面动态控制能力', 300, [
        lessonTask('js-timers', '定时器', 60, '理解延时和周期执行的常见模式。', '补齐动态节奏控制能力'),
        lessonTask('js-dom-advanced', 'DOM 进阶', 90, '学会更完整地读写和组织页面元素。', '为原生项目做最后准备'),
        reviewTask('week5-day1', '复盘：现在你已经会让页面做哪些事', 15, '盘点自己的 JS 能力。', '进入项目前完成一次收束'),
      ]),
      day('week-5-day-2', 2, 'JS 阶段关卡', '用综合练习收口基础能力', 300, [
        lessonTask('js-capstone', 'JS 阶段关卡', 100, '把前面的基础语法和 DOM 串起来。', '让原生项目不至于完全陌生'),
        reviewTask('week5-day2', '复盘：你在哪个环节最容易卡住', 15, '定位自己的薄弱点。', '项目中更有意识地练习'),
      ]),
      day('week-5-day-3', 3, '原生项目启动', '开始搭第一个完整应用', 300, [
        projectTask('music-collection-v1', 'music-collection-v1：路线确认与环境准备', 45, '明确这次做的是完整原生链路，而不是静态页。', '进入应用思维'),
        projectTask('music-collection-v1', 'music-collection-v1：搭建收藏卡片', 120, '把数据、结构、样式先落到卡片上。', '让项目有第一个看得见的成果'),
        reviewTask('week5-day3', '复盘：v1 和 music-showcase 最大差别是什么', 10, '从静态页过渡到应用页。', '建立项目层面的理解'),
      ]),
      day('week-5-day-4', 4, '列表与筛选', '让页面开始按数据变化', 300, [
        projectTask('music-collection-v1', 'music-collection-v1：卡片列表与网格布局', 100, '把单卡变成有组织的列表。', '让页面进入“应用”形态'),
        projectTask('music-collection-v1', 'music-collection-v1：加上分类筛选', 110, '用 JS 控制卡片显示与隐藏。', '第一次把用户交互和数据筛选连起来'),
        reviewTask('week5-day4', '复盘：筛选功能背后用了哪条 JS 链路', 15, '开始能讲清自己的实现。', '提升可解释性'),
      ]),
      day('week-5-day-5', 5, '添加内容', '让用户能够向页面输入新数据', 300, [
        projectTask('music-collection-v1', 'music-collection-v1：添加收藏表单', 135, '用表单、事件和 DOM 操作动态创建新卡片。', '让页面具备真实输入能力'),
        projectTask('music-collection-v1', 'music-collection-v1：收尾与回顾', 60, '回头看列表、筛选、添加三条链路。', '把零散功能串成整体理解'),
        reviewTask('week5-day5', '复盘：现在这个页面为什么已经算一个小应用', 10, '从功能角度评价自己的项目。', '建立完成感'),
      ]),
      day('week-5-day-6', 6, '项目验收', '做手测、修问题、完成项目', 300, [
        projectTask('music-collection-v1', 'music-collection-v1：验收与手测', 120, '完整走一遍列表、筛选、添加三件事。', '建立“会验收”的意识'),
        quizTask('week5-day6-js', '原生交互巩固测验', 30, '进测验页做一轮基础巩固，确认核心概念没有空心化。', '用一次测验给 JS 基础收口', 50),
        reviewTask('week5-day6', '记录 2 个你自己修掉的小问题', 20, '把项目问题处理经验留下来。', '增强自我排错信心'),
      ]),
    ],
  },
  {
    id: 'week-6',
    weekNumber: 6,
    phaseId: 'phase-async',
    phaseTitle: '方法论、异步与数据驱动',
    title: '方法论与异步基础',
    summary: '从会写走到会拆、会调、会处理数据。',
    milestone: '完成后，你将理解 Promise、fetch、await 这条基础异步链，并具备更稳的排错能力。',
    days: [
      day('week-6-day-1', 1, '观察代码', '先学会看运行过程', 300, [
        lessonTask('workflow-console-intro', '控制台入门', 60, '学会把运行过程输出出来。', '建立可观察性'),
        lessonTask('workflow-console-log', 'console.log', 55, '把“猜代码在干嘛”变成“看代码在干嘛”。', '减少盲写盲改'),
        reviewTask('week6-day1', '练习：给一段逻辑加上日志', 20, '让排错动作开始标准化。', '为 debugger 做准备'),
      ]),
      day('week-6-day-2', 2, '调试与三步法', '开始用更稳定的方法排错', 300, [
        lessonTask('workflow-debugger', 'Debugger', 70, '学会暂停程序、看变量、看流程。', '从猜错到查错'),
        lessonTask('workflow-three-step', '三步排错法', 60, '把排错过程拆成可复用步骤。', '降低混乱感'),
        reviewTask('week6-day2', '复盘：你平时最容易跳过哪一步排错', 15, '让排错真正进入习惯层。', '提升问题定位效率'),
      ]),
      day('week-6-day-3', 3, '先计划再写', '让写代码更有结构', 300, [
        lessonTask('workflow-plan-first', '先计划再写', 60, '理解为什么先拆思路会更稳。', '减少上来就乱写'),
        lessonTask('workflow-naming', '命名', 55, '理解命名为什么会影响代码可读性。', '提升长期维护能力'),
        lessonTask('workflow-decompose', '拆解问题', 70, '把大功能拆成可执行小块。', '为后面的项目设计做准备'),
      ]),
      day('week-6-day-4', 4, '从 DOM 到数据驱动', '开始更现代地思考页面', 300, [
        lessonTask('workflow-create-element', 'createElement', 60, '学会用 JS 生成元素。', '开始摆脱纯静态 DOM'),
        lessonTask('workflow-data-driven', '数据驱动', 75, '理解页面为什么应该从数据出发。', '为 Vue 和异步做关键铺垫'),
        lessonTask('workflow-event-delegation', '事件委托', 60, '理解为什么有些事件不必绑到每个元素上。', '提升交互组织能力'),
      ]),
      day('week-6-day-5', 5, '现代语法与错误处理', '补齐异步前的语言基础', 300, [
        lessonTask('js-es6-syntax', 'ES6 语法', 70, '补齐箭头函数、解构等高频写法。', '读写现代 JS 更顺畅'),
        lessonTask('js-error-handling', '错误处理', 65, '理解 try/catch 和失败分支的重要性。', '为真实网络请求做准备'),
        reviewTask('week6-day5', '复盘：为什么错误处理不能省', 10, '建立边界意识。', '减少“正常流程能跑就算完”的心态'),
      ]),
      day('week-6-day-6', 6, '异步入门', '进入 Promise 与 await 的世界', 300, [
        lessonTask('async-event-loop', '事件循环', 70, '理解 JS 为什么不是简单一行一行跑。', '建立异步底层直觉'),
        lessonTask('async-promise', 'Promise', 75, '理解异步结果为什么要包在 Promise 里。', '掌握异步思维第一步'),
        lessonTask('async-fetch', 'fetch', 70, '知道浏览器如何请求远端数据。', '真正接近互联网数据'),
      ]),
    ],
  },
  {
    id: 'week-7',
    weekNumber: 7,
    phaseId: 'phase-async',
    phaseTitle: '方法论、异步与数据驱动',
    title: '完成异步与搜索项目',
    summary: '把异步、状态和 API 请求落到真实项目。',
    milestone: '完成后，你将能解释请求、渲染、错误处理和防抖的整条链路。',
    days: [
      day('week-7-day-1', 1, 'await 与 API', '把异步链路接到真实接口上', 300, [
        lessonTask('async-await', 'async / await', 70, '理解为什么 await 能让异步代码更易读。', '把 Promise 链读成顺序流程'),
        lessonTask('async-api-client', 'API Client', 70, '知道请求地址、参数和响应是如何组织的。', '为搜索项目摸清接口层'),
        reviewTask('week7-day1', '复盘：fetch 和 await 分别负责什么', 15, '把“发请求”和“等结果”区分开。', '异步概念更清晰'),
      ]),
      day('week-7-day-2', 2, '防抖与本地状态', '提升交互体验和数据记忆', 300, [
        lessonTask('async-search-debounce', '搜索防抖', 75, '理解为什么不是每打一字都立刻请求。', '建立性能和体验意识'),
        lessonTask('workflow-localstorage', 'localStorage', 60, '知道页面如何保存本地状态。', '让应用有“记忆”'),
        reviewTask('week7-day2', '练习：说清楚防抖到底在帮谁省力', 15, '把性能优化讲成自己的话。', '提升理解质量'),
      ]),
      day('week-7-day-3', 3, '异步阶段关卡', '做一次异步综合练习', 300, [
        lessonTask('async-capstone', '异步阶段关卡', 90, '把 Promise、await、fetch 等技能串起来。', '让搜索项目更稳'),
        reviewTask('week7-day3', '复盘：现在你最怕的异步点是什么', 15, '提前定位项目风险。', '项目时更有针对性'),
      ]),
      day('week-7-day-4', 4, '搜索项目启动', '从 API 理解开始进入项目', 300, [
        projectTask('music-searcher', 'music-searcher：前置能力对齐', 35, '确认自己知道这个项目在练什么。', '降低开工时的迷路感'),
        projectTask('music-searcher', 'music-searcher：认识 iTunes API', 90, '先理解接口返回的数据，再开始写代码。', '养成先看数据再写界面的习惯'),
        projectTask('music-searcher', 'music-searcher：实现基础搜索', 120, '把请求、等待、渲染第一次完整串起来。', '建立异步项目的核心主线'),
      ]),
      day('week-7-day-5', 5, '搜索交互完善', '把搜索项目做成完整体验', 300, [
        projectTask('music-searcher', 'music-searcher：实时搜索 + 防抖', 90, '让输入体验更流畅，也避免无意义请求。', '把优化落到真实场景'),
        projectTask('music-searcher', 'music-searcher：处理五种状态', 100, '补齐 idle、loading、success、empty、error。', '建立边界和状态意识'),
        reviewTask('week7-day5', '复盘：为什么“能跑”不等于“完整”', 10, '把状态思维说清楚。', '开始更像工程师而非练习者'),
      ]),
      day('week-7-day-6', 6, '项目验收与巩固', '完整验收搜索项目并用测验收口', 300, [
        projectTask('music-searcher', 'music-searcher：收尾、回顾与验收', 100, '走完手测，确认请求链和状态链都成立。', '完成一个真正完整的数据驱动项目'),
        quizTask('week7-day6-async', '异步链路巩固测验', 30, '去测验页做一次异步专题巩固。', '用测验检查概念是否真正串起来', 60),
        reviewTask('week7-day6', '录一句口述：请求是怎么从输入走到页面的', 15, '把链路真正讲清楚。', '把“会做”转成“会讲”'),
      ]),
    ],
  },
  {
    id: 'week-8',
    weekNumber: 8,
    phaseId: 'phase-tooling-vue',
    phaseTitle: '工程化与 Vue 基础',
    title: '工程化基础',
    summary: '从写页面进入做项目，理解真实开发环境。',
    milestone: '完成后，你将知道 Node、npm、Vite、Git、构建、部署分别在解决什么问题。',
    days: [
      day('week-8-day-1', 1, '开发环境', '从在线沙盒走向本地开发', 300, [
        lessonTask('tooling-transition', '过渡到工程化', 60, '知道为什么要从在线环境过渡到本地项目。', '完成学习方式升级'),
        lessonTask('tooling-vscode', 'VS Code', 55, '熟悉真实开发工具。', '建立本地 IDE 工作感'),
        reviewTask('week8-day1', '复盘：为什么项目不再适合只在在线沙盒里做', 15, '理解工程化的必要性。', '降低对工具的排斥感'),
      ]),
      day('week-8-day-2', 2, '命令行与 Node', '理解项目背后的运行环境', 300, [
        lessonTask('tooling-terminal', '终端', 60, '知道命令行为什么是前端工程的一部分。', '补齐开发入口'),
        lessonTask('tooling-nodejs', 'Node.js', 65, '理解 Node 在工具链中的角色。', '知道前端为什么也离不开运行环境'),
        reviewTask('week8-day2', '练习：用自己的话解释 Node 不是浏览器 JS', 15, '把概念真正分开。', '减少环境混淆'),
      ]),
      day('week-8-day-3', 3, '包管理与脚手架', '让项目开始成型', 300, [
        lessonTask('tooling-npm', 'npm', 65, '知道依赖、脚本和包管理在做什么。', '理解项目“怎么装起来”'),
        lessonTask('tooling-vite', 'Vite', 70, '理解现代前端脚手架带来了什么。', '为 Vue 项目做准备'),
        reviewTask('week8-day3', '复盘：npm scripts 为什么是项目入口之一', 15, '把命令和项目动作对应起来。', '增强工程感'),
      ]),
      day('week-8-day-4', 4, '模块与环境变量', '理解代码如何被组织', 300, [
        lessonTask('tooling-modules', '模块化', 70, '理解 import/export 在项目组织中的意义。', '不再把所有代码塞进一个文件'),
        lessonTask('tooling-env', '环境变量', 60, '理解配置与源码为什么要分开。', '建立配置边界意识'),
        reviewTask('week8-day4', '复盘：模块化在解决什么问题', 15, '把代码组织问题说清楚。', '为 Vue 组件化打底'),
      ]),
      day('week-8-day-5', 5, '规范与构建', '开始接近可交付项目', 300, [
        lessonTask('tooling-eslint', 'ESLint', 60, '理解代码规范为何是团队协作基础。', '提升代码可维护性'),
        lessonTask('tooling-build-deploy', '构建与部署', 80, '知道开发版和生产版的差别。', '为上线阶段铺路'),
        reviewTask('week8-day5', '复盘：为什么“能跑”还不等于“能交付”', 15, '理解构建的价值。', '开始进入交付视角'),
      ]),
      day('week-8-day-6', 6, '版本管理', '让项目进入真实开发流程', 300, [
        lessonTask('tooling-git-init', 'Git 初始化', 65, '理解 commit 和快照的意义。', '建立版本意识'),
        lessonTask('tooling-github', 'GitHub', 60, '理解远程仓库和公开代码的作用。', '把项目带到真实世界'),
        reviewTask('week8-day6', '练习：写 3 条你自己的提交信息模板', 15, '把 Git 用成稳定习惯。', '为后面 v3 做准备'),
      ]),
    ],
  },
  {
    id: 'week-9',
    weekNumber: 9,
    phaseId: 'phase-tooling-vue',
    phaseTitle: '工程化与 Vue 基础',
    title: 'Vue 基础',
    summary: '理解现代前端为什么要组件化和响应式。',
    milestone: '完成后，你将理解 Props、Emits、Computed、Watch、Router 的职责分工。',
    days: [
      day('week-9-day-1', 1, 'Vue 视角', '理解框架为什么存在', 300, [
        lessonTask('vue-philosophy', 'Vue 哲学', 70, '理解框架不是为了炫技，而是为了降低复杂度。', '建立学习 Vue 的正确动机'),
        lessonTask('tooling-sfc', '单文件组件', 70, '理解模板、脚本、样式为什么可以放在一个组件里。', '开始真正进入 Vue 项目写法'),
        reviewTask('week9-day1', '复盘：为什么 v1 写法在复杂应用里会越来越累', 15, '为重构建立动机。', '更容易理解 v2 的价值'),
      ]),
      day('week-9-day-2', 2, '响应式基础', '让数据驱动页面更新', 300, [
        lessonTask('tooling-ref-reactive', 'ref / reactive', 70, '理解 Vue 是怎么跟踪数据变化的。', '进入响应式思维'),
        lessonTask('vue-directives', '指令', 65, '理解模板里如何表达条件、循环和绑定。', '减少手写 DOM 的负担'),
        reviewTask('week9-day2', '练习：把“数据变了，界面自动变”讲成一句话', 15, '把响应式概念内化。', '为后面 computed 打底'),
      ]),
      day('week-9-day-3', 3, '派生状态与生命周期', '理解组件的动态过程', 300, [
        lessonTask('vue-computed-watch', 'computed / watch', 75, '理解派生值和监听的区别。', '减少无意义重复逻辑'),
        lessonTask('vue-lifecycle', '生命周期', 60, '理解组件在什么时候初始化和更新。', '帮助后面调试和接数据'),
        reviewTask('week9-day3', '复盘：computed 和 watch 分别该什么时候用', 15, '减少以后的误用。', '增强响应式判断力'),
      ]),
      day('week-9-day-4', 4, '组件通信', '让组件协作起来', 300, [
        lessonTask('tooling-props-emits', 'Props / Emits', 75, '理解数据为什么要单向往下流，事件往上抛。', '建立组件通信基础'),
        lessonTask('vue-slots', '插槽', 60, '理解组件如何保留灵活内容区域。', '提升组件抽象能力'),
        reviewTask('week9-day4', '复盘：为什么子组件不该自己改父组件数据', 15, '把单向数据流说清楚。', '为 v2 重构打稳地基'),
      ]),
      day('week-9-day-5', 5, '表单与路由', '补齐高频应用能力', 300, [
        lessonTask('vue-vmodel-deep', 'v-model 深入', 75, '理解表单双向绑定在 Vue 中怎么运作。', '简化输入场景'),
        lessonTask('vue-router-intro', 'Vue Router', 60, '理解多页面应用如何在前端组织。', '补齐应用导航能力'),
        reviewTask('week9-day5', '复盘：Vue 到底帮你省掉了哪些原生 DOM 操作', 15, '形成重构期待。', '准备进入 v2 项目'),
      ]),
      day('week-9-day-6', 6, 'Vue 阶段关卡', '做一次综合收口', 300, [
        lessonTask('tooling-capstone', 'Vue 阶段关卡', 90, '用一次综合练习收口 Vue 核心概念。', '让 v2 开工更稳'),
        reviewTask('week9-day6', '列出 3 个你最想在 v2 中感受到的“省力点”', 15, '带着目标进入重构项目。', '更容易看见 Vue 的价值'),
      ]),
    ],
  },
  {
    id: 'week-10',
    weekNumber: 10,
    phaseId: 'phase-delivery',
    phaseTitle: 'Vue 重构与上线交付',
    title: '完成 Vue 重构项目',
    summary: '把原生项目重构成 Vue 项目。',
    milestone: '完成后，你将能讲清 v1 -> v2 的重构收益和组件化价值。',
    days: [
      day('week-10-day-1', 1, '重构启动', '明确重构目标并创建项目', 300, [
        projectTask('music-collection-v2', 'music-collection-v2：确认重构目标', 35, '带着“Vue 会帮我省掉什么”进入项目。', '重构目标更清晰'),
        projectTask('music-collection-v2', 'music-collection-v2：创建 Vue 项目', 100, '用 Vite 创建真正的 Vue 开发环境。', '进入现代项目结构'),
        projectTask('music-collection-v2', 'music-collection-v2：设计组件树', 90, '先想清楚组件关系，再开始写。', '减少后面边写边乱改'),
      ]),
      day('week-10-day-2', 2, '卡片组件', '先做最核心的展示单元', 300, [
        projectTask('music-collection-v2', 'music-collection-v2：构建 MusicCard 组件', 150, '把原生卡片重构成接收 props、抛出事件的组件。', '真正体会组件职责划分'),
        reviewTask('week10-day2', '复盘：为什么组件越单一越好维护', 10, '用自己的话讲清单一职责。', '巩固组件心智'),
      ]),
      day('week-10-day-3', 3, '筛选与表单组件', '让多个组件开始配合', 300, [
        projectTask('music-collection-v2', 'music-collection-v2：构建 FilterBar 组件', 95, '把筛选逻辑封装成独立组件。', '建立可复用交互单元'),
        projectTask('music-collection-v2', 'music-collection-v2：构建 AddForm 组件', 110, '把表单输入组织成清晰组件。', '开始感受 v-model 的优势'),
        reviewTask('week10-day3', '复盘：Props / Emits 在这个项目里分别在哪里用', 15, '把通信规则对应到真实代码。', '增强实战理解'),
      ]),
      day('week-10-day-4', 4, '组装 App', '让所有组件合奏起来', 300, [
        projectTask('music-collection-v2', 'music-collection-v2：组装 App.vue', 150, '统一管理数据、筛选和事件。', '真正感受“总谱式”组件组织'),
        reviewTask('week10-day4', '复盘：为什么 App.vue 像指挥', 10, '把组件树与数据流讲清楚。', '形成整体视角'),
      ]),
      day('week-10-day-5', 5, '持久化与对比', '补齐记忆能力并回看重构收益', 300, [
        projectTask('music-collection-v2', 'music-collection-v2：localStorage + watch', 110, '让数据在刷新后仍保留。', '应用开始更完整'),
        projectTask('music-collection-v2', 'music-collection-v2：回顾与对比 v1 vs v2', 90, '比较命令式和声明式开发。', '真正理解框架价值'),
        reviewTask('week10-day5', '录一句口述：Vue 在这个项目里解决了什么问题', 10, '用自己的语言完成重构总结。', '项目表达能力提升'),
      ]),
      day('week-10-day-6', 6, '项目验收', '完成 v2 并整理重构收获', 300, [
        projectTask('music-collection-v2', 'music-collection-v2：收尾、验收与下一步', 120, '完整测试筛选、添加、收藏、删除、持久化。', '完成一个结构清楚的 Vue 应用'),
        reviewTask('week10-day6', '列出 3 条 v2 比 v1 更清晰的地方', 15, '把重构收益沉淀下来。', '为 v3 的工程化升级做准备'),
      ]),
    ],
  },
  {
    id: 'week-11',
    weekNumber: 11,
    phaseId: 'phase-delivery',
    phaseTitle: 'Vue 重构与上线交付',
    title: '完成交付与上线',
    summary: '把项目从本地完成推进到可上线、可分享。',
    milestone: '完成后，你将打通开发、构建、部署、自动发布的交付闭环。',
    days: [
      day('week-11-day-1', 1, '交付准备', '先明确上线目标', 300, [
        projectTask('music-collection-v3', 'music-collection-v3：确认发布目标', 35, '先想清楚这次要交付什么版本。', '让上线目标不模糊'),
        projectTask('music-collection-v3', 'music-collection-v3：Git 初始化与首次提交', 110, '把项目放进版本管理系统。', '建立真正的工程快照'),
        reviewTask('week11-day1', '复盘：为什么上线前先做 Git 归档', 10, '理解版本管理的交付价值。', '工程意识更稳'),
      ]),
      day('week-11-day-2', 2, '分支与远程仓库', '进入团队化工作流的最小模型', 300, [
        projectTask('music-collection-v3', 'music-collection-v3：分支开发工作流', 100, '用 feature 分支做一次小功能合并。', '建立更专业的开发习惯'),
        projectTask('music-collection-v3', 'music-collection-v3：推送到 GitHub', 90, '把代码真正放到远端。', '项目第一次变成公开资产'),
        reviewTask('week11-day2', '复盘：main 和 feature 分支各自扮演什么角色', 15, '把分支语义讲清楚。', '增强版本管理理解'),
      ]),
      day('week-11-day-3', 3, '构建产物', '区分开发版和生产版', 300, [
        projectTask('music-collection-v3', 'music-collection-v3：构建生产版本', 120, '运行 build，观察 dist 产物。', '建立“编译后再上线”的意识'),
        reviewTask('week11-day3', '复盘：为什么浏览器最终看到的不是 .vue 文件', 10, '把构建说清楚。', '帮助理解工程链路'),
      ]),
      day('week-11-day-4', 4, '部署到线上', '让别人真的能访问你的项目', 300, [
        projectTask('music-collection-v3', 'music-collection-v3：部署到 GitHub Pages', 140, '完成 base 配置、构建和上线。', '实现第一次真实公网发布'),
        reviewTask('week11-day4', '记录你的线上地址和仓库地址', 10, '让项目真正具备“可分享性”。', '形成交付成果'),
      ]),
      day('week-11-day-5', 5, '自动部署', '把重复部署动作自动化', 300, [
        projectTask('music-collection-v3', 'music-collection-v3：GitHub Actions 自动部署', 140, '让 push 后自动完成发布。', '体验现代 CI/CD'),
        reviewTask('week11-day5', '复盘：自动部署到底替你省掉了什么', 10, '理解 CI/CD 的现实价值。', '进入更职业化的开发视角'),
      ]),
      day('week-11-day-6', 6, '最终验收', '完成上线版项目收束', 300, [
        projectTask('music-collection-v3', 'music-collection-v3：最终验收、上线检查与继续升级', 120, '确认线上地址、仓库地址、README 都可访问。', '完成主项目交付闭环'),
        reviewTask('week11-day6', '写下你准备继续升级的 1 个方向', 10, '把项目从“结束”转成“可继续演进”。', '增强长期项目意识'),
      ]),
    ],
  },
  {
    id: 'week-12',
    weekNumber: 12,
    phaseId: 'phase-ai',
    phaseTitle: 'AI 协作与总复盘',
    title: 'AI 协作与总复盘',
    summary: '在已有基本功上，学习如何正确使用 AI 提效，并做总复盘。',
    milestone: '完成后，你将能分清 AI 的适用边界，并把整个主线能力链讲清楚。',
    days: [
      day('week-12-day-1', 1, 'AI 认知', '理解 AI 在这套课程中的位置', 300, [
        lessonTask('ai-what-is', 'AI 是什么', 60, '理解 AI 不是魔法，而是一种协作工具。', '建立正确预期'),
        lessonTask('ai-mindset', 'AI 使用心态', 60, '理解何时求助、何时自己判断。', '避免把 AI 当替代品'),
        reviewTask('week12-day1', '复盘：AI 在你的学习流程里应该扮演什么角色', 15, '先想边界，再谈提效。', '避免工具喧宾夺主'),
      ]),
      day('week-12-day-2', 2, '提问方式', '学会让 AI 更好地帮你', 300, [
        lessonTask('ai-prompt-basics', 'Prompt 基础', 60, '理解清晰输入为什么重要。', '提升与 AI 协作的稳定性'),
        lessonTask('ai-prompt-iterate', 'Prompt 迭代', 55, '理解如何逐步把问题问清楚。', '减少“问了但没用”的挫败感'),
        reviewTask('week12-day2', '练习：把一个模糊问题改写成可执行问题', 20, '把提问能力变成可练习的技能。', '增强协作质量'),
      ]),
      day('week-12-day-3', 3, '前端辅助', '把 AI 用在 HTML/CSS 上', 300, [
        lessonTask('ai-html', 'AI 辅助 HTML', 55, '用 AI 帮你梳理结构、检查标签。', '降低结构层的小卡点'),
        lessonTask('ai-css', 'AI 辅助 CSS', 55, '用 AI 帮你解释样式和布局问题。', '提升样式排错效率'),
        reviewTask('week12-day3', '复盘：哪些样式问题适合问 AI，哪些必须自己试', 15, '建立可控的使用边界。', '避免一切都丢给 AI'),
      ]),
      day('week-12-day-4', 4, '代码与排错', '把 AI 用在 JS 和 Debug 上', 300, [
        lessonTask('ai-js', 'AI 辅助 JS', 55, '用 AI 帮你解释代码逻辑和改法。', '提升理解速度'),
        lessonTask('ai-debug', 'AI 辅助排错', 60, '让 AI 参与定位 bug，但保留你的判断。', '形成更高效的问题处理流程'),
        reviewTask('week12-day4', '复盘：AI 帮过你什么，没帮到什么', 15, '建立现实、克制的工具观。', '减少神化和依赖'),
      ]),
      day('week-12-day-5', 5, 'AI 参与项目流程', '让 AI 进入计划和脚手架阶段', 300, [
        lessonTask('ai-plan', 'AI 辅助规划', 55, '让 AI 帮你拆解功能和安排步骤。', '提升开工前的清晰度'),
        lessonTask('ai-scaffold', 'AI 辅助脚手架', 55, '让 AI 帮你更快建立初始结构。', '减少重复搭建时间'),
        lessonTask('ai-component', 'AI 辅助组件设计', 55, '让 AI 在组件边界和职责上给建议。', '提高组件抽象效率'),
      ]),
      day('week-12-day-6', 6, 'AI 收束与总复盘', '用 AI 视角回看主线学习', 300, [
        lessonTask('ai-capstone', 'AI 协作关卡', 75, '把前面的 AI 协作能力做一次综合收口。', '让 AI 真正变成辅助能力'),
        quizTask('week12-day6-final', '最终巩固测验', 30, '去测验页做一轮总巩固，检查整体正确率。', '用一次测验为 12 周主线收口', 70),
        reviewTask('week12-day6', '总复盘：写下 12 周里最重要的 10 个知识点', 25, '把整条主线能力链压缩成可复述的清单。', '让“学过”变成“讲得出”'),
      ]),
    ],
  },
]
