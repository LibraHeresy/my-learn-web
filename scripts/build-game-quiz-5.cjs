const fs = require('fs');let src = fs.readFileSync('src/configs/quiz-questions.ts','utf-8');
const ids=[...src.matchAll(/id: (\d+)/g)].map(m=>parseInt(m[1]));let id=Math.max(...ids)+1;
function q(g,l,t,d,question,options,answer,explanation){return `  { id: ${id++}, gem: '${g}', level: ${l}, type: '${t}', difficulty: ${d}, question: '${question.replace(/'/g,"\\'")}', options: ['${options[0].replace(/'/g,"\\'")}','${options[1].replace(/'/g,"\\'")}','${options[2].replace(/'/g,"\\'")}','${options[3].replace(/'/g,"\\'")}'], answer: ${answer}, explanation: '${explanation.replace(/'/g,"\\'")}' }`;}const Q=[];

// ====== Vue 基础宝石 (25) ======
const G10='vue-basic';
// normal 5
Q.push(q(G10,1,'normal',1,'.vue 文件三段式结构？',['HTML/CSS/JS','template(模板)/script(逻辑)/style(样式)','header/body/footer','一个区域'],1,'SFC 单文件组件=template+script setup+style scoped。'));
Q.push(q(G10,1,'normal',1,'{{ }}在 Vue 模板中做什么？',['注释','文本插值——显示 JS 表达式的值','属性绑定','条件判断'],1,'{{ message }}将变量值渲染到页面。可写简单 JS 表达式如{{count+1}}。'));
Q.push(q(G10,1,'normal',1,'v-bind 的作用和简写？',['条件渲染','动态绑定 HTML 属性简写为 :','循环渲染','事件监听'],1,'v-bind:src="url"等价于 :src="url"。把 JS 表达式的值绑定到 HTML 属性上。'));
Q.push(q(G10,1,'normal',1,'v-on 的作用和简写？',['属性绑定','事件监听简写为 @','条件渲染','循环'],1,'v-on:click="fn"等价于 @click="fn"。监听 DOM 事件执行对应方法。'));
Q.push(q(G10,1,'normal',1,'ref() 作用？',['创建普通变量','创建响应式数据。JS 中读写用.value，template 中自动解包不用.value','定义 CSS','定义路由'],1,'ref()创建响应式引用。script中用.value读写，template中Vue自动解包直接用变量名。'));
// elite 8
Q.push(q(G10,2,'elite',2,'v-if 和 v-show 区别？DOM层面？',['完全相同','v-if 移除/创建 DOM；v-show 始终存在只是 display:none','v-show 更强','v-if 已废弃'],1,'v-if=false元素从DOM移除(切换开销大)。v-show=false仍存于DOM只切CSS(切换快)。频繁切用v-show条件少变用v-if。'));
Q.push(q(G10,2,'elite',2,'v-for 为什么需要 :key？用 index 做 key的问题？',['性能优化','key 帮助 Vue 识别每个节点做高效 diff。用 index 做 key 在列表重排时导致错误复用和状态错乱','key 是装饰','不需要 key'],1,'key 是虚拟 DOM diff 的标识。列表增删重排时 index 会变→Vue 错误复用节点→组件状态错乱。始终用稳定唯一 id 做 key。'));
Q.push(q(G10,2,'elite',2,'v-model 实质是什么？',['魔法','v-bind:value + v-on:input 的语法糖','v-if+v-show','v-for+v-bind'],1,'v-model="name"等价于:value="name" @input="name=$event.target.value"。双向绑定=数据→视图+视图→数据。'));
Q.push(q(G10,2,'elite',2,'computed 和 method 区别？',['完全相同','computed 有缓存依赖不变不重新计算；method 每次调用都执行','method 更快','computed 已废弃'],1,'computed 自动追踪依赖缓存结果。依赖不变时直接返回缓存值。method 每次都执行不缓存。'));
Q.push(q(G10,2,'elite',2,'computed 和 watch 区别？',['相同','computed=派生数据(有缓存)；watch=监听变化执行副作用(如发请求存localStorage)','watch 更快','computed 已废弃'],1,'computed：基于已有数据计算新值(自动追踪依赖缓存)。watch：值变化时执行回调(无返回值用于副作用)。'));
Q.push(q(G10,2,'elite',2,'Props 的作用和数据流向？',['子传父','父组件向子组件传递数据。单向数据流：父→子','双向','兄弟互传'],1,'父组件通过 props 向子组件传递数据。数据单向从父流向子。子不能直接修改 props(只读)。'));
Q.push(q(G10,2,'elite',2,'Emits 的作用？',['父传子','子组件向父组件发送事件通知(如"我完成了")','双向绑定','定义样式'],1,'子组件通过 emit 向父组件发送事件。父组件监听事件执行处理函数。数据流：props 向下 emits 向上。'));
Q.push(q(G10,2,'elite',2,'scoped 样式作用？不加会怎样？',['无区别','scoped 让 CSS 只作用于当前组件。不加 scoped 样式泄漏到全局影响其他组件','更快','已废弃'],1,'<style scoped>通过属性选择器(data-v-xxx)将CSS作用域限制在当前组件内不污染全局。'));
// boss 12
Q.push(q(G10,3,'boss',3,'ref 和 reactive 区别？什么时候用哪个？',['完全相同','ref 包装基本类型需.value；reactive 包装对象直接访问属性。ref 更通用推荐','reactive 已废弃','ref 已废弃'],1,'ref 可包装任何类型(基本类型/对象)需.value访问。reactive 只包装对象直接访问。推荐用 ref(统一写法)。'));
Q.push(q(G10,3,'boss',3,'以下 Vue 代码问题在哪？`<div v-for="item in list">{{item}}</div>`',['语法错','缺少 :key 属性','v-for 不能用','没问题'],1,'v-for 应始终加 :key="唯一标识"。Vue 用 key 追踪每个节点的身份以高效更新。'));
Q.push(q(G10,3,'boss',3,'v-model 修饰符 .lazy .number .trim 各做什么？',['无作用','lazy=change 事件而非 input；number=转数字；trim=去空白','只用于 input','已废弃'],1,'.lazy 在 change 时更新(失焦后)而非每次输入。.number 自动转数字。.trim 自动去首尾空白。'));
Q.push(q(G10,3,'boss',3,'以下关于 Props 的说法哪个正确？',['子组件可修改 props','Props 只读，子组件不能直接修改。想改通过 emit 通知父组件改','Props 是双向的','Props 是可选的'],1,'Props 从父流向子只读。子组件不能直接修改 props。需要修改时 emit 事件让父组件更新。'));
Q.push(q(G10,3,'boss',3,'`<div :class="{active:isActive}">` 中 active 什么时候生效？',['总是生效','isActive 为 true 时','isActive 为 false 时','永不生效'],1,'对象语法：{className:条件}。isActive=true 时 active 类生效。可同时用数组语法:class="[base,dynamic]"。'));
Q.push(q(G10,3,'boss',3,'Vue 模板中 {{}} 和 v-text 的区别？',['完全相同','{{}}可能闪烁(未编译前显示花括号)；v-text 不会。功能等价','v-text 更快','{{}} 已废弃'],1,'功能相同都设置文本内容。{{}}在Vue未加载完时可能闪现(用v-cloak解决)。v-text不闪现。'));
Q.push(q(G10,3,'boss',3,'computed 的缓存何时失效？',['永不失效','当它依赖的响应式数据发生变化时','每次 render 都失效','手动刷新'],1,'computed 自动追踪依赖数据。依赖不变→返回缓存值→不重新计算。依赖变了→自动重新计算→更新缓存。'));
Q.push(q(G10,3,'boss',3,'`watch(x,(newVal,oldVal)=>{...})` 参数是什么？',['无参数','newVal=变化后的值 oldVal=变化前的值','只有 newVal','只有 oldVal'],1,'watch 回调接收(newValue,oldValue)可对比新旧值做处理如保存到 localStorage。'));
Q.push(q(G10,3,'boss',3,'以下哪项是 Vue 的单向数据流？',['数据在父子间自由流动','父→子(props)向下传数据；子→父(emits)向上发事件。数据始终从父流向子','子可随意改父数据','没有数据流'],1,'数据流：父通过 props 传数据给子(向下)。子不能直接改 props，通过 emits 通知父(向上发事件)。父收到事件自行更新数据。'));
Q.push(q(G10,3,'boss',3,'v-if/v-else-if/v-else 链必须紧邻吗？',['不一定','必须紧邻不能插入其他元素','随意排列','不需要 else'],1,'v-if/v-else-if/v-else 必须作为相邻的兄弟元素不能有其他元素插入其间否则链断裂。'));
Q.push(q(G10,3,'boss',3,'<script setup> 和普通 <script> 区别？',['完全相同','setup 中顶层变量/函数自动暴露给模板无需 return。更简洁','普通 script 更快','setup 已废弃'],1,'<script setup>是 Composition API 的语法糖。定义的变量和函数自动可在模板中使用。代码更少更清晰。'));
Q.push(q(G10,3,'boss',3,'`<div v-once>{{message}}</div>`中修改 message 会更新显示吗？',['会','不会——v-once 只渲染一次后续不再响应数据变化','部分更新','报错'],1,'v-once 让元素/组件只渲染一次后续数据变化时不重新渲染。用于静态内容优化性能。'));

// ====== Vue 进阶宝石 (20) ======
const G11='vue-advanced';
Q.push(q(G11,1,'normal',1,'Vue Router 作用？',['管理 CSS','前端路由——切换"页面"不刷新浏览器','状态管理','构建工具'],1,'Vue Router 实现 SPA 页面切换不刷新浏览器。不同 URL 路径显示不同组件。'));
Q.push(q(G11,1,'normal',1,'<router-link> 和 <a> 区别？',['完全相同','router-link 无刷新跳转；a 标签会整页刷新','a 更快','router-link 已废弃'],1,'router-link 是 Vue Router 提供的组件点击时无刷新切换路由。普通 a 标签会刷新整页。'));
Q.push(q(G11,1,'normal',1,'动态路由 /user/:id 怎么获取 id？',['从 URL 手动解析','useRoute().params.id','从 props 获取','无法获取'],1,'const route=useRoute();route.params.id。在 setup 中用 useRoute 访问当前路由信息。'));
Q.push(q(G11,1,'normal',1,'Pinia 解决什么问题？',['路由','组件间共享状态(全局数据)替代 Vuex','样式','构建'],1,'Pinia=Vue 的状态管理库。在组件间共享响应式数据(用户信息/购物车等)不通过 props 逐层传递。'));
// elite 7
Q.push(q(G11,2,'elite',2,'onMounted 何时执行？能访问 DOM 吗？',['组件创建前','组件挂载到 DOM 后执行。可安全访问 DOM 和 ref 元素','任何时候','销毁时'],1,'onMounted 在组件首次渲染挂载到 DOM 后调用。可安全操作 DOM/ref 绑定的元素。常在此发初始数据请求。'));
Q.push(q(G11,2,'elite',2,'Slot(插槽)的作用？默认vs具名？',['定义 props','让父组件向子组件传递模板内容。默认插槽=一个；具名插槽=多个指定位置插入','定义事件','样式隔离'],1,'slot 让组件接收"模板内容"而非数据。子组件留"空位"，父组件填充内容。具名插槽有多个名称不同的空位。'));
Q.push(q(G11,2,'elite',2,'composable(组合函数)是什么？举例',['CSS 函数','复用逻辑的 JS 函数通常以 use 开头如 useMouse()。将响应式逻辑从组件中提取','Vue 插件','指令'],1,'composable=将组件逻辑提取到可复用函数中(useXxx)。类似 React Hooks。遵循组合优于继承。'));
Q.push(q(G11,2,'elite',2,'Pinia store 的基本结构？',['只有 state','state(数据)+getters(计算属性)+actions(方法)','只有 actions','只有 getters'],1,'store=defineStore("name",()=>{const s=ref();function a(){};return{s,a}})。setup 风格 store 和组件写法一致。'));
Q.push(q(G11,2,'elite',2,'ref 和 reactive 的区别？解构 reactive 会怎样？',['相同','ref 包装值需.value；reactive 包装对象。解构 reactive 会丢失响应性→需 toRefs()','ref 更快','reactive 已废弃'],1,'const state=reactive({a:1});let{a}=state→a 不是响应式的！解构打断响应性。用 toRefs()将属性转 ref 保留响应性。'));
Q.push(q(G11,2,'elite',2,'onBeforeUnmount 用途？',['初始化','清理资源：清除定时器/取消事件监听/取消请求。防止内存泄漏','创建组件','无用途'],1,'组件销毁前清理：clearInterval(timer)取消 addEventListener 取消未完成的 fetch 请求。'));
Q.push(q(G11,2,'elite',2,'router.push 和 router.replace 区别？',['相同','push 新增一条历史记录可返回；replace 替换当前记录不可返回','replace 更快','push 已废弃'],1,'push=添加新历史记录(用户可点后退)。replace=替换当前记录(后退不会回到这一页)。登录后常用 replace 防止回退到登录页。'));
// boss 9
Q.push(q(G11,3,'boss',3,'provide/inject 作用和使用场景？',['替代 props','跨层级传递数据不经过中间组件。适合深层嵌套组件共享数据(如主题/语言)','替代 emit','替代 store'],1,'provide 在祖先提供数据 inject 在任意后代注入。避免 props 逐层传递(prop drilling)。但不如 Pinia 功能强。'));
Q.push(q(G11,3,'boss',3,'路由导航守卫 beforeEach 做什么？',['定义路由','全局前置守卫——每次路由跳转前执行。可用于权限检查、登录验证','渲染页面','存储状态'],1,'router.beforeEach((to,from,next)=>{})在每次路由切换前执行。可判断用户是否登录未登录重定向到登录页。'));
Q.push(q(G11,3,'boss',3,'`<style scoped>` 的原理？',['随机数','Vue 给组件元素加唯一属性(data-v-xxx)CSS 选择器追加该属性选择器','CSS in JS','PostCSS'],1,'Vue 编译时给每个 scoped 样式追加[data-v-xxx]属性选择器并给组件模板元素加对应属性使样式只匹配当前组件。'));
Q.push(q(G11,3,'boss',3,'`<script setup>` 中如何声明 props 和 emits？',['无法声明','defineProps({...})和 defineEmits([...])','用 this.$props','在 template 中声明'],1,'编译器宏：defineProps 和 defineEmits 在 script setup 中直接使用无需导入。自动暴露给模板。'));
Q.push(q(G11,3,'boss',3,'Composition API 和 Options API 区别？为什么推荐前者？',['Options 更好','Composition 逻辑按功能聚合更易复用；Options 按选项分散(data/methods/computed)','无区别','Composition 已废弃'],1,'Options API 把逻辑分散在 data/methods/computed 不同选项中不易维护。Composition API 把相关逻辑写在一起更清晰更易抽取 composable。'));
Q.push(q(G11,3,'boss',3,'Pinia 和 Vuex 的区别？',['完全相同','Pinia 更简洁(无 mutations)+TS 友好+模块化更好。Vuex 是上一代','Vuex 更快','Pinia 已废弃'],1,'Pinia=Vue 官方推荐的状态管理(替代 Vuex)。setup 风格 store 和组件写法一致。无 mutations 概念更简单。'));
Q.push(q(G11,3,'boss',3,'Vue Router 的懒加载怎么做？',['无法实现','component:()=>import("./View.vue")——路由被访问时才加载组件代码','手动加载','自动加载'],1,'动态 import()返回 Promise。Vue Router 在路由被访问时才下载对应组件代码→减少首屏加载体积。'));
Q.push(q(G11,3,'boss',3,'toRefs() 的作用？',['创建新 ref','将 reactive 对象的每个属性转成独立的 ref 保持响应性。用于解构 reactive','替代 ref','已废弃'],1,'const{a,b}=toRefs(reactive({a:1,b:2}))→a 和 b 都是 ref 保持响应性。不解构响应性丢失。'));
Q.push(q(G11,3,'boss',3,'`<KeepAlive>` 组件做什么？',['缓存路由','缓存被切换走的组件实例不销毁保留其状态。切回来时恢复之前的状态','加速渲染','存储数据'],1,'KeepAlive 包裹动态组件/路由视图缓存被切走的组件。用户回到该组件时之前的状态(滚动位置/输入内容/数据)仍在。'));

// ====== AI 协作宝石 (20) ======
const G12='ai-collab';
Q.push(q(G12,1,'normal',1,'AI(LLM)本质是什么？它能思考吗？',['像人思考','预测下一个最可能 token 的统计模型。不是真正思考是概率计算','有自我意识','能创造知识'],1,'大语言模型本质"下一个词预测器"。根据训练数据和上下文计算每个可能 token 的概率。'));
Q.push(q(G12,1,'normal',1,'什么是 AI 幻觉(Hallucination)？',['AI 看到幻觉','AI 自信给出看似合理但实际错误的答案(编造不存在的 API/库)','AI 创意模式','新功能'],1,'幻觉：AI 编造不存在的事实、函数、库但语气非常自信。应对：质疑、验证、查官方文档。'));
Q.push(q(G12,1,'normal',1,'AI 训练数据有截止日期→这对问技术问题意味什么？',['没关系','AI 不知道训练截止后的新技术/新版本 API。问前沿技术时需注意时效性','AI 会自动更新','AI 总能查到最新资料'],1,'AI 知识截止于训练日期。问最近发布的新框架或 API 变更时可能给出过时答案。'));
Q.push(q(G12,1,'normal',1,'好 Prompt 应该包含哪些要素？',['随便一句话','角色+上下文+任务描述+格式要求(+示例)','只写关键词','越长越好'],1,'角色("你是前端专家")+上下文("我在做音乐教学网站")+任务("写一个 CSS 动画")+格式约束("输出完整代码")。'));
Q.push(q(G12,1,'normal',1,'AI 写的代码能直接复制粘贴用吗？',['完全可以','需要审查和测试——AI 可能有 bug、用旧 API、或不安全的写法','绝对不能','简单代码可以直接用'],1,'AI 生成的代码像"初稿"需人工审核测试理解。AI 可能产生幻觉(编造 API)/过时语法/安全问题。'));
// elite 7
Q.push(q(G12,2,'elite',2,'为什么第一次 Prompt 不完美不能放弃？',['AI 能力有限','迭代对话——第一次 Prompt 不完美很正常通过对话逐步澄清和细化需求','AI 不会改进','重新开始更好'],1,'AI 对话是迭代过程。第一次结果不理想→补充说明→限制范围→给示例→逐步接近目标。好结果来自多轮对话。'));
Q.push(q(G12,2,'elite',2,'给 AI 看报错信息时应包含什么？',['只贴报错','报错全文+相关代码片段+你的意图(你想做什么)','只贴代码','不需要贴报错'],1,'三要素：1.报错全文(不要截断)2.相关代码(不要整个项目)3.你的意图("我想让按钮点击后变色")。'));
Q.push(q(G12,2,'elite',2,'AI 擅长什么前端任务？不擅长什么？',['样样精通','擅长CSS属性/标准算法/正则；不擅长复杂业务逻辑/大项目架构/安全审查','不擅长 CSS','只擅长 JS'],1,'AI 强项：标准实现(CSS 属性值/简单函数/正则)。弱项：复杂业务逻辑(多步骤状态管理)/大项目架构设计/安全相关判断。'));
Q.push(q(G12,2,'elite',2,'用 AI 调试的流程是什么？',['直接让 AI 修好','描述问题→贴代码和报错→AI 分析可能原因→验证方案→不行的迭代','放弃重写','查 Google'],1,'1.描述症状 2.贴代码+报错 3.AI 给分析→尝试修复 4.还不行→贴新报错继续对话。AI 调试是对话不是一锤子买卖。'));
Q.push(q(G12,2,'elite',2,'让 AI 解释代码 vs 让 AI 写代码→Prompt 有什么不同？',['完全相同','解释代码：给代码+问"这段代码在做什么"。写代码：给需求+约束+示例','解释代码不能用 AI','写代码不能用 AI'],1,'解释：喂代码+问含义(如教学生)。生成：描述需求+约束(语言/框架/格式)+示例。方向不同 Prompt 侧重点不同。'));
Q.push(q(G12,2,'elite',2,'AI 对话中为什么不能一次塞太多无关内容？',['AI 记性好','上下文窗口有限→无关内容挤占空间→AI"忘记"前面的重要信息。保持对话聚焦','AI 能处理任意长度','多给 AI 数据更好'],1,'AI 上下文窗口有限。无关信息占用宝贵空间导致 AI 忽略重要约束。一个对话聚焦一个主题效果最好。'));
Q.push(q(G12,2,'elite',2,'如何判断 AI 给的技术方案是否合理？',['AI 说的都对','用自己知识验证+查阅官方文档+小范围测试','AI 不可信','问另一个 AI'],1,'AI 可能给出看似合理但实际不可行的方案。用已有知识判断查阅文档确认在小范围测试代码。'));
// boss 8
Q.push(q(G12,3,'boss',3,'从需求到产品的 AI 协作完整流程？',['一步让 AI 生成全部','需求分析→方案设计→AI 辅助搭脚手架→分组件实现→AI 辅助写每个组件→测试→部署。人做决策 AI 做执行','不需要人参与','AI 只写代码'],1,'AI 辅助全流程但人始终做决策和审查。AI 做执行(写代码/查文档/解释错误)。人是导演 AI 是演员。'));
Q.push(q(G12,3,'boss',3,'AI 说了一个听起来对但实际错的答案→你该怎么做？',['接受','保持质疑→用自己知识判断→查阅官方文档验证→指出 AI 的错误让它修正','忽略','换一个 AI'],1,'不盲信 AI。用已有知识质疑查阅权威来源(官方文档/MDN)验证。告诉 AI"你错了因为..."可能让它修正。'));
Q.push(q(G12,3,'boss',3,'AI 辅助项目规划→Prompt 应包含什么？',['"帮我做一个项目"','功能列表+目标用户+技术栈偏好+时间约束+期望输出格式','只写项目名','越长越好'],1,'详细描述需求：功能清单/用户群体/技术栈偏好/时间预算/期望输出(需求文档/技术方案/任务拆解)。'));
Q.push(q(G12,3,'boss',3,'AI 生成 5 个组件→如何控制质量和一致性？',['一次全部生成','逐个组件生成→每个组件审查通过后再下一个。保持统一的 Prompt 模板定义共享规范','AI 会自动保持一致','不需要审查'],1,'不要一次让 AI 生成所有组件。逐个生成每个审查通过后再下一个。用统一 Prompt 模板(设计规范/命名约定)保持一致性。'));
Q.push(q(G12,3,'boss',3,'以下关于 AI 辅助开发的说法哪个最正确？',['AI 可替代程序员','AI 是强力助手但人始终是决策者：定义需求/审查代码/保证质量/承担最终责任','AI 只适用于初学者','AI 只在写 CSS 时有帮助'],1,'AI 加速执行(写代码/查文档)但人负责决策(架构/安全/取舍)。AI 是工具不是替代品。最终代码质量和责任在人。'));
Q.push(q(G12,3,'boss',3,'用 AI 学习前端 vs 用传统教程学习→各自的优势？',['AI 完胜','AI 可即时问答个性化解释；传统教程结构完整体系化。最佳：两者结合——教程打基础 AI 做答疑和实践辅助','传统方式更好','AI 不适合学习'],1,'教程提供系统知识结构 AI 提供即时答疑和个性化解释。用教程学框架用 AI 理解具体代码和排错。'));
Q.push(q(G12,3,'boss',3,'AI 时代前端工程师的核心竞争力是什么？',['会用 AI 写 Prompt','理解原理+架构设计+安全审查+性能优化+需求沟通+AI 输出质量把关','会写代码','会用工具'],1,'AI 能写代码但不能替代判断。核心竞争力：理解技术原理(知道AI给的方案对不对)、需求分析、架构设计、质量把关。'));
Q.push(q(G12,3,'boss',3,'一个合格的前端用 AI 和一个不合格的用 AI→产出的区别在于？',['无区别 AI 抹平差距','审查能力——合格者能发现 AI 的错误和不合理之处修正后产出高质量代码；不合格者直接复制低质量代码','只是速度不同','只是代码量不同'],1,'AI 输出质量取决于使用者的审查能力。合格者能发现幻觉/安全问题/不合理设计修正后提升质量。不合格者盲从 AI 产出有隐患的代码。'));

// ====== 高级宝石: 原理+性能+安全+测试+架构+无障碍 (115 题) ======
// 简写——每领域精选核心题
// Principles (20)
const G13='principles';
Q.push(q(G13,1,'normal',1,'浏览器渲染流水线五步骤？',['JS→CSS→HTML→图片→文字','解析HTML→样式计算→布局→绘制→合成','加载→执行→渲染','网络→解析→显示'],1,'DOM树+CSSOM树→渲染树→布局(计算位置)→绘制(填像素)→合成(分层合并)。'));
Q.push(q(G13,1,'normal',1,'重排(reflow)和重绘(repaint)哪个更贵？',['重绘','重排——改变了布局需重新计算所有元素位置。重绘只重新填色','同样昂贵','都不贵'],1,'重排(改几何属性)触发→重新布局→重新绘制→重新合成。重绘(改颜色)只触发绘制和合成。动画优先用 transform 只触发合成。'));
Q.push(q(G13,1,'normal',1,'transform 和 left/top 做动画→性能差异原因？',['无差异','transform 只触发合成(GPU处理)；left/top 触发重排→布局→绘制→合成(CPU密集)','left 更快','transform 慢'],1,'left/top 改变元素位置→浏览器重新布局。transform 不改变文档流只在合成层做矩阵变换→GPU 处理极快。'));
Q.push(q(G13,1,'normal',1,'事件循环：宏任务和微任务的执行顺序？',['宏任务优先','每轮：1个宏任务→清空所有微任务→渲染→下一轮宏任务','同时执行','随机'],1,'宏任务：setTimeout/setInterval/事件。微任务：Promise.then/MutationObserver。微任务在当前宏任务后立即全部执行。'));
// elite 7
Q.push(q(G13,2,'elite',2,'哪些操作会触发重排？',['只改颜色','改 width/height/left/top/display；增删 DOM；改字体；获取 offsetWidth 等几何属性','只改 transform','只改 opacity'],1,'修改几何属性/增删DOM元素/改变字体/读取offsetWidth等都会触发重排。批量修改用 documentFragment 或离屏操作。'));
Q.push(q(G13,2,'elite',2,'GPU 加速的原理？什么属性触发？',['所有 CSS 都加速','transform/opacity/filter 创建独立合成层由 GPU 处理不经过 CPU 重排重绘','只有 3D transform','opacity 不加速'],1,'创建合成层(GraphicsLayer)的元素由 GPU 独立处理。transform:translateZ(0)或 will-change 可手动提升到合成层。'));
Q.push(q(G13,2,'elite',2,'Vue 响应式原理(简化)？',['轮询检测变化','通过 Proxy 拦截对象读写(set/get)实现依赖追踪。数据变化时自动通知视图更新','Object.defineProperty','手动更新'],1,'Vue3 用 Proxy 代理对象拦截 get(收集依赖)和 set(触发更新)。修改数据时 Vue 知道哪些组件依赖该数据→精准更新。'));
Q.push(q(G13,2,'elite',2,'宏任务和微任务各举两个例子',['宏=console.log 微=alert','宏=setTimeout/setInterval/事件。微=Promise.then/MutationObserver','宏=Promise 微=setTimeout','宏=微都一样'],1,'每轮事件循环：执行一个宏任务→清空微任务队列。微任务可以插队在下一个宏任务之前执行。'));
Q.push(q(G13,2,'elite',2,'will-change 属性做什么？有什么风险？',['无作用','提前告知浏览器该元素将变化以便预先优化(创建合成层)。滥用→内存暴增','加速所有动画','已废弃'],1,'will-change:transform 提前创建合成层。但每个合成层消耗 GPU 内存→滥用导致页面卡顿。动画结束后应移除。'));
Q.push(q(G13,2,'elite',2,'CSS 解析会阻塞 JS 执行吗？渲染呢？',['不阻塞','JS 执行会阻塞 CSS 解析和渲染。所以 script 放底部或用 async/defer','CSS 阻塞 JS','CSS 和 JS 互不影响'],1,'JS 执行是单线程的会阻塞 DOM 构建和渲染。CSS 不阻塞 DOM 构建但阻塞渲染(等 CSS 加载完再渲染防闪烁)。'));
// boss 9
Q.push(q(G13,3,'boss',3,'为什么 getComputedStyle() 或 offsetWidth 会触发重排？',['不会','浏览器为返回准确的几何值必须立即重新布局计算→触发强制同步重排。应避免在循环中读取几何属性','这是 bug','只 Chrome 有'],1,'读取布局相关属性时若布局已标记为 dirty 浏览器必须同步重排才能返回正确值。批量修改时先读后写避免反复重排。'));
Q.push(q(G13,3,'boss',3,'Proxy 和 Object.defineProperty 做响应式的区别？',['完全相同','Proxy 可拦截新增属性/删除/数组操作；defineProperty 只能拦截已有属性的读写','defineProperty 更好','Proxy 已废弃'],1,'Vue2 用 defineProperty(无法检测新增属性需 Vue.set)。Vue3 用 Proxy 可拦截所有操作包括新增/删除/数组索引。'));
Q.push(q(G13,3,'boss',3,'以下代码输出顺序？`Promise.resolve().then(()=>console.log(1));setTimeout(()=>console.log(2));console.log(3)`',['1,2,3','3,1,2','1,3,2','2,3,1'],1,'同步 3→微任务 1→宏任务 2。同：同步→微任务→宏任务。'));
Q.push(q(G13,3,'boss',3,'requestAnimationFrame 在事件循环的什么位置执行？',['宏任务之后','每帧渲染之前执行。适合做视觉动画保证 60fps 同步','微任务之后','任意位置'],1,'rAF 在每帧渲染之前执行。和显示器刷新率同步(通常 60Hz)。适合更新动画。'));
Q.push(q(G13,3,'boss',3,'以下关于浏览器渲染的说法哪个错误？',['display:none 不生成渲染树','visibility:hidden 的元素仍占据布局空间','opacity:0 的元素仍响应点击事件','transform 平移后的元素不占原文档流空间'],2,'opacity:0 元素只是视觉透明仍可接收点击事件。pointer-events:none 才能让元素不响应点击。'));
Q.push(q(G13,3,'boss',3,'Vue 的 nextTick 原理？什么时候用？',['立即执行','将回调推迟到下次 DOM 更新之后执行。等 Vue 完成 DOM 更新后操作 DOM','延迟 1 秒','废弃了'],1,'修改数据后 DOM 更新是异步的。nextTick(()=>{})确保在 Vue 更新完 DOM 后再操作 DOM(如聚焦输入框)。'));
Q.push(q(G13,3,'boss',3,'CSS 动画 vs JS 动画→各自的优势和适用场景？',['CSS 全部更好','CSS 简单动画(过渡/关键帧)GPU 加速性能好。JS 复杂动画(物理/时序控制/暂停/反向)更灵活','JS 全部更好','没区别'],1,'简单 UI 动效用 CSS(transition/animation)性能好代码少。复杂交互(拖拽/物理模拟/暂停控制)用 JS requestAnimationFrame。'));
Q.push(q(G13,3,'boss',3,'Vue 组件更新是同步还是异步的？为什么？',['同步','异步——Vue 将同一事件循环中的多次数据变更合并为一次 DOM 更新减少不必要的渲染','两者都有','没有更新机制'],1,'Vue 异步更新 DOM：同 tick 内多次修改数据→合并为一次组件更新。nextTick 获取更新后 DOM。'));
Q.push(q(G13,3,'boss',3,'合成层(Composite Layer)过多有什么问题？',['渲染更快','每个合成层占用 GPU 显存→过多导致内存暴增页面卡顿。避免滥用 will-change 和 translateZ(0)','无影响','层越多越好'],1,'合成层=独立的 GPU 纹理。每层消耗显存。大量合成层→显存耗尽→页面崩溃。动画结束后应移除不必要的合成层。'));

// Performance (20)
const G14='performance';
Q.push(q(G14,1,'normal',1,'Core Web Vitals 三个核心指标？',['加载速度','LCP(最大内容绘制)/FID(首次输入延迟)/CLS(累计布局偏移)','代码行数','请求数'],1,'LCP=最大可见元素加载时间<2.5s。FID=首次交互响应时间<100ms。CLS=视觉稳定性分数<0.1。'));
Q.push(q(G14,1,'normal',1,'首屏优化最有效的手段？',['加更多 JS','代码分割+懒加载+压缩资源+CDN。用户只下载当前需要的代码','更大服务器','多写 CSS'],1,'关键：减少首屏需要下载和执行的代码量。代码分割按路由拆分组件懒加载非首屏内容。'));
Q.push(q(G14,1,'normal',1,'图片优化方法？',['更大尺寸','WebP/AVIF 格式+响应式图片(srcset)+懒加载(loading=lazy)+合适尺寸','只用 PNG','不优化也行'],1,'WebP/AVIF 比 JPEG/PNG 小 30-50%。srcset 根据屏幕选合适尺寸。loading=lazy 延迟加载屏幕外图片。'));
Q.push(q(G14,1,'normal',1,'代码分割(Code Splitting)是什么？',['删除代码','将 JS 拆成多个小块按需加载而非一次性加载全部','压缩代码','格式化代码'],1,'动态 import()将代码按路由/功能拆成多个 chunk。用户访问时只加载需要的部分减少首屏体积。'));
// elite 7
Q.push(q(G14,2,'elite',2,'防抖(debounce)和节流(throttle)区别？',['相同','防抖=连续触发只执行最后一次；节流=固定时间间隔执行一次','节流更强','防抖已废弃'],1,'搜索框用防抖(用户停止输入后再发请求)。滚动事件用节流(每 200ms 最多执行一次)。'));
Q.push(q(G14,2,'elite',2,'懒加载(Lazy Loading)实现方式？',['JavaScript 异步','图片：loading=lazy 或 Intersection Observer。组件：动态 import()。列表：虚拟滚动','CSS 动画','服务器配置'],1,'图片：原生 loading="lazy"属性或 IntersectionObserver 监听进入视口。路由组件：()=>import("./X.vue")。大列表：虚拟列表只渲染可见行。'));
Q.push(q(G14,2,'elite',2,'浏览器缓存的常见策略？',['不缓存','强缓存(Cache-Control)+协商缓存(ETag)。静态资源文件名哈希实现长效缓存','只缓存图片','缓存让页面变慢'],1,'强缓存：Cache-Control:max-age=31536000。文件内容变化→改文件名(hash)→新 URL 无缓存→下载。协商缓存：ETag/Last-Modified 向服务器确认是否变化。'));
Q.push(q(G14,2,'elite',2,'CLS(累计布局偏移)是什么？怎么避免？',['代码错误','页面加载时元素位置意外移动。避免：给图片/广告预留尺寸；不在已有内容上方插入内容','JS 错误','不需要关心'],1,'CLS 测量视觉不稳定性。图片不设宽高→加载后撑开页面→内容下移→CLS 差。始终给图片/嵌入式内容预留尺寸。'));
Q.push(q(G14,2,'elite',2,'虚拟列表(Virtual List)原理？',['全部渲染','只渲染视口内可见的少量 DOM 节点。滚动时动态替换渲染节点。大幅减少 DOM 数量提升性能','服务器渲染','分页'],1,'只渲染可见区域的元素(约 10-20 个)而非全部(可能数万个)。滚动时计算新可见区域替换渲染。DOM 节点数大幅减少→性能提升。'));
Q.push(q(G14,2,'elite',2,'WebP/AVIF 格式的优势？兼容性怎么处理？',['和 JPEG 一样','体积比 JPEG 小 30-50%质量相当。用 <picture>+<source> 提供多种格式回退','不支持','不用考虑兼容'],1,'<picture><source srcset="x.webp" type="image/webp"><img src="x.jpg"></picture>。浏览器选第一个支持的格式。'));
Q.push(q(G14,2,'elite',2,'什么情况下需要手动取消防抖/节流？',['不需要','组件销毁时仍在等待的定时器→内存泄漏。onBeforeUnmount 中 clearTimeout','只在 Vue 中','只在 React 中'],1,'组件已销毁但 setTimeout 还在等待→回调访问已销毁的组件状态→报错。onBeforeUnmount 清除所有定时器。'));
// boss 9
Q.push(q(G14,3,'boss',3,'首屏时间 5 秒→从哪些方面排查和优化？',['不管','Network 面板看资源加载→Coverage 看未使用代码→Lighthouse 审计→针对性优化','重写全部','换服务器'],1,'1.Chrome DevTools→Network 看加载瀑布图找瓶颈。2.Coverage 面板找未使用的 JS/CSS。3.Lighthouse 生成优化建议。逐步优化。'));
Q.push(q(G14,3,'boss',3,'打包体积过大→分析和优化手段？',['删代码','分析工具(rollup-plugin-visualizer)→看哪个包大→tree-shaking→按需引入→拆分 chunk','不管','加服务器'],1,'用打包分析工具可视化各模块体积。大库改为按需引入。重复依赖去重。大型库考虑更轻替代品。'));
Q.push(q(G14,3,'boss',3,'骨架屏(Skeleton Screen)的作用？',['装饰','在内容加载前显示灰色占位图形。让用户感知"正在加载"比空白或转圈更好','加速加载','SEO'],1,'骨架屏=页面结构的灰色占位。给用户"内容马上就来"的感觉减少跳出。比空白页面或 spinner 体验更好。'));
Q.push(q(G14,3,'boss',3,'SSR(服务端渲染)的优势和代价？',['没有代价','优势：更快首屏+SEO 友好。代价：服务器压力大+开发复杂度高+需要 Node.js 服务器','SEO 无用','SSR 已废弃'],1,'SSR 在服务器生成 HTML 返回浏览器→首屏快利于 SEO。需要 Node.js 服务器增加运维成本。静态网站可用 SSG。'));
Q.push(q(G14,3,'boss',3,'以下哪项是正确的性能监控方式？',['只看 Lighthouse 一次','Lighthouse+Core Web Vitals+真实用户监控(RUM)=多方面持续监控','不管性能','只看首屏'],1,'Lighthouse 模拟测试→发现问题。CrUX 真实用户数据→看实际表现。自定义 RUM→持续监控线上性能。'));
Q.push(q(G14,3,'boss',3,'为什么 3G 网络下页面加载慢但 WiFi 下正常？',['手机差','资源总体积过大→慢网络下载时间长。优化：缩小资源体积+代码分割+压缩+CDN','3G 不支持','浏览器不同'],1,'慢网络下大文件下载时间长。用代码分割减少首屏体积懒加载非关键资源。CDN 让资源离用户更近。'));
Q.push(q(G14,3,'boss',3,'CSS 阻塞渲染但 JS 阻塞解析→如何利用这个顺序优化加载？',['没办法','关键 CSS 内联在 head 中快速渲染；非关键 CSS 异步加载。JS 用 async/defer 不阻塞解析','不管顺序','CSS 放底部'],1,'内联关键 CSS(首屏需要的样式)在 head 优先渲染。非关键 CSS 用 media="print" onload 异步加载。JS 用 defer 延迟执行不阻塞 HTML 解析。'));
Q.push(q(G14,3,'boss',3,'HTTP/2 多路复用对前端性能的影响？',['无影响','同一连接可并行传输多个资源→无需合并雪碧图/拼接 JS→可保留模块化结构','服务器配置','前端不用管'],1,'HTTP/1.1 每连接一个请求(有并发限制)。HTTP/2 多路复用→同一连接可同时传输多个文件→减少连接开销。'));
Q.push(q(G14,3,'boss',3,'前端性能优化黄金法则？',['多写代码','减少需要下载和执行的代码量：压缩/分割/懒加载/缓存/CDN','用更多 JS','更快服务器'],1,'核心原则：让用户尽可能少下载和执行代码。压缩体积+按需加载+缓存复用+就近分发(CDN)。'));

// Security (15)
const G15='security';
Q.push(q(G15,1,'normal',1,'XSS 是什么？',['CSS 框架','跨站脚本攻击——攻击者向网页注入恶意脚本','新 CSS 特性','服务器漏洞'],1,'XSS=Cross-Site Scripting。攻击者将恶意 JS 注入页面→窃取用户数据/cookie/重定向。防御：输入校验+输出转义。'));
Q.push(q(G15,1,'normal',1,'CSRF 是什么？',['新协议','跨站请求伪造——诱导用户点击链接以用户身份执行非预期操作','CSS 框架','JS 库'],1,'CSRF 攻击者诱导用户点击恶意链接→以用户已登录的身份向目标网站发请求(如转账)。防御：CSRF Token+SameSite Cookie。'));
Q.push(q(G15,1,'normal',1,'HTTPS 的作用？',['加速网站','加密浏览器和服务器之间的通信防窃听和篡改','压缩文件','SEO 优化'],1,'HTTPS=TLS 加密的 HTTP。防止中间人攻击(窃听/篡改数据)。现代浏览器标记 HTTP 为"不安全"。'));
// elite 5
Q.push(q(G15,2,'elite',2,'innerHTML 设置用户输入为什么危险？',['不危险','用户输入 <script>alert(1)</script> 会被执行→XSS 攻击。用 textContent 或 DOMPurify 清理','只有 IE 危险','innerHTML 已废弃'],1,'innerHTML 解析 HTML→用户注入的 <script> 会执行→窃取信息/重定向/篡改页面。textContent 安全(自动转义)。'));
Q.push(q(G15,2,'elite',2,'CSP(Content Security Policy)做什么？',['样式框架','声明允许加载的资源来源限制内联脚本防范 XSS。浏览器按策略拦截违规资源','JS 库','协议'],1,'CSP 通过 HTTP 头或 meta 标签限制可执行的脚本来源。默认禁止内联脚本→即使攻击者注入 script 也无法执行。'));
Q.push(q(G15,2,'elite',2,'SameSite Cookie 属性做什么？',['设置样式','控制跨站请求时是否发送 Cookie。SameSite=Strict/Lax/None 防 CSRF','存储数据','加速'],1,'SameSite=Strict 跨站不发送 Cookie。Lax 允许 GET 导航发送。None 总是发送(需 Secure)。防 CSRF。'));
Q.push(q(G15,2,'elite',2,'输入校验应该在哪做？',['只前端','前端(用户体验)+后端(安全防线)。前端校验可绕过必须后端二次验证','只后端','不校验'],1,'前端校验提升用户体验(即时反馈)。后端必须再次校验因为前端校验可绕过(关掉 JS 或用 curl 直接发送)。'));
Q.push(q(G15,2,'elite',2,'用户上传文件→前端需要注意哪些安全问题？',['不管','限制类型(检查 MIME 而非扩展名)+限制大小+不信任文件名+服务端病毒扫描','只检查扩展名','只限制大小'],1,'文件类型检查 MIME type 而非仅扩展名。限制大小防止 DOS。文件名不可信(可能含路径穿越)。服务端扫描病毒。'));
// boss 7
Q.push(q(G15,3,'boss',3,'以下 URL 存在什么安全问题？`https://site.com?name=<script>alert(1)</script>`',['无问题','若服务端将 name 参数直接输出到 HTML→反射型 XSS。应转义 HTML 实体','URL 太长','参数名错误'],1,'反射型 XSS：用户输入被服务端原样输出到页面。防御：输出时转义(<→&lt;等)。或设置 CSP 禁止内联脚本。'));
Q.push(q(G15,3,'boss',3,'JWT Token 存在 localStorage 有什么风险？如何改进？',['无风险','XSS 可读取 localStorage→泄露 Token→攻击者冒充用户。改进：httpOnly Cookie 存储 JS 无法访问','localStorage 安全','JWT 不需存储'],1,'localStorage 可被 XSS 读取。httpOnly Cookie 设置后 JS 无法读取→XSS 无法窃取 Token。配合 Secure(仅HTTPS)+SameSite。'));
Q.push(q(G15,3,'boss',3,'第三方 npm 包有什么安全风险？如何防范？',['无风险','可能含恶意代码/已知漏洞/过度收集数据。防范：审查包质量(下载量/维护频率)+npm audit 检查漏洞+锁定版本','npm 官方审核','不会有事'],1,'npm 供应链攻击：恶意包名伪装/依赖漏洞。定期 npm audit 检查+审查包的维护状况+使用 package-lock.json 锁定版本+避免过多依赖。'));
Q.push(q(G15,3,'boss',3,'点击劫持(Clickjacking)是什么？怎么防御？',['鼠标故障','在透明 iframe 上诱导用户点击实际点击的是下层页面。防御：X-Frame-Options 头禁止被嵌入','CSS 问题','无法防御'],1,'攻击者将目标网站嵌在透明 iframe 中用户以为是点按钮实际是点转账。防御：服务端设 X-Frame-Options:DENY 或 CSP frame-ancestors。'));
Q.push(q(G15,3,'boss',3,'前端密码传输安全？明文 vs 哈希？',['明文 OK','至少 HTTPS 加密传输。前端哈希意义不大(JS 可见哈希算法)。正确做法：HTTPS+服务端哈希(bcrypt)存储','前端哈希即可','不传输密码'],1,'HTTPS 加密传输确保中间人无法窃听。前端哈希不能替代服务端安全存储(攻击者可获取哈希值离线破解)。服务端用 bcrypt/argon2 哈希存储密码。'));
Q.push(q(G15,3,'boss',3,'eval() 为什么不安全？',['eval 没问题','eval 执行任意字符串代码→若含用户输入→代码注入。始终避免 eval 用其他安全替代','eval 更快','eval 已废弃'],1,'eval 将字符串作为 JS 代码执行。若字符串包含用户输入→攻击者注入恶意代码。Function()同理。替代：JSON.parse 解析数据。'));
Q.push(q(G15,3,'boss',3,'前端安全最佳实践速记？',['不管安全','输入校验+输出转义+CSP+HTTPS+httpOnly Cookie+避免 eval/innerHTML+定期审计依赖','只后端管安全','安全不关前端事'],1,'前端安全六要：转义输出防 XSS、校验输入(配合后端)、HTTPS 加密、httpOnly Cookie、CSP 头、避免 eval/innerHTML 直接拼接用户输入。'));

// Testing (15)
const G16='testing';
Q.push(q(G16,1,'normal',1,'测试金字塔的三层？',['前端/后端/数据库','单元测试(多)→集成测试(中)→E2E 测试(少)。底层快稳定上层慢脆弱','快/中/慢','简单/中等/困难'],1,'金字塔：大量单元测试(低成本高速度)→适量集成测试→少量 E2E 测试(高成本易碎)。'));
Q.push(q(G16,1,'normal',1,'单元测试测什么？',['整个应用','测试单个函数/组件的独立行为。输入→函数→断言输出符合预期','用户操作','网络请求'],1,'单元测试=隔离测试最小可测单元(纯函数/组件)。mock 外部依赖(API/数据库)。快且稳定。'));
Q.push(q(G16,1,'normal',1,'E2E 测试测什么？',['单个函数','模拟真实用户操作测试完整的用户流程(如注册→登录→购买)','CSS','npm 包'],1,'E2E=端到端测试。用 Playwright/Cypress 模拟真实用户在浏览器中操作整个应用。最接近真实场景但最慢最脆弱。'));
// elite 5
Q.push(q(G16,2,'elite',2,'TDD(测试驱动开发)的核心循环？',['写代码→测试→部署','红(写失败测试)→绿(写最简代码通过)→重构(优化代码)。先写测试再写代码','测试→通过→上线','写代码→写测试'],1,'TDD=先写测试(红)→写代码让测试通过(绿)→重构代码保持测试通过。强迫从使用者角度思考设计。'));
Q.push(q(G16,2,'elite',2,'什么代码应该测？什么可以不测？',['全部测','应测：核心业务逻辑/边界条件/易出bug处。可不测：第三方库内部/纯样式变化/简单 getter/setter','只测复杂代码','完全不测'],1,'测核心业务逻辑和容易出错的地方。不测第三方库(它们有自己的测试)。不测 trivial 的代码(如简单的属性访问)。'));
Q.push(q(G16,2,'elite',2,'快照测试(Snapshot Testing)做什么？',['拍屏幕照片','对比组件渲染输出和之前保存的快照。不匹配→要么是预期变化(更新快照)要么是 bug','数据库快照','代码备份'],1,'快照=组件渲染输出的序列化版本。下次测试对比快照自动发现 UI 意外变化。不能替代行为测试(只检测变化不判断对错)。'));
Q.push(q(G16,2,'elite',2,'测试覆盖率 100% 是好目标吗？',['是必须','不是——追求覆盖率数字导致写无意义测试。重要的代码都被测试覆盖即可','越高越好','不需要覆盖率'],1,'100% 覆盖率不等于好测试(可能只执行了代码未验证行为)。关注测试质量(边界条件/错误路径)而非数字。'));
Q.push(q(G16,2,'elite',2,'Mock/Stub/Spy 的区别？',['完全相同','Mock=模拟对象记录调用并验证行为；Stub=只提供预设返回值不验证；Spy=包装真实对象记录调用','Stub 更强','Mock 已废弃'],1,'Stub 简单替代(只返回值)。Mock 更强大(预设期望+验证是否按预期调用)。Spy 不改变行为只记录(如是否被调用过)。'));
// boss 7
Q.push(q(G16,3,'boss',3,'测试组件时如何处理 API 调用？',['真实发请求','Mock API 返回预设数据。不要依赖真实网络保持测试快速稳定','跳过测试','用特殊 API'],1,'用 vi.mock/msw 模拟 API 返回。测试关注组件对 API 响应数据的处理而非网络本身。真实请求慢且不稳定。'));
Q.push(q(G16,3,'boss',3,'测试异步代码要注意什么？',['直接测试','等异步操作完成再断言。用 async/await 或 waitFor(测试框架提供)。确保测试覆盖 resolve 和 reject','异步不测','只测同步'],1,'用 async/await 等待 Promise。测试 reject 路径(错误处理是否正常)。用 waitFor 等待 UI 更新(Vue 异步更新)。'));
Q.push(q(G16,3,'boss',3,'何时写 E2E 测试而非单元测试？',['总是 E2E','核心用户流程(登录/购买等关键路径)→E2E。大量交互细节→单元/组件测试','E2E 更好','不写 E2E'],1,'E2E 测试关键用户路径确保整个系统协同工作。成本高易碎→只测最重要流程。大量细节用单元和组件测试覆盖。'));
Q.push(q(G16,3,'boss',3,'测试命名规范为什么重要？',['不重要','好测试名=被测对象+场景+期望结果。"点击提交按钮且表单为空应显示错误信息"','随便命名','命名无所谓'],1,'测试名应描述被测什么、在什么条件下、应该发生什么。让测试成为活文档别人读测试名就能理解系统行为。'));
Q.push(q(G16,3,'boss',3,'测试的好处：除了找 bug 还有什么？',['只有找 bug','代码质量(强迫写可测试的代码)→活文档(测试即规格)→重构信心(改代码不怕破坏功能)→更快 Onboarding','没有其他好处','省时间'],1,'测试驱动好的代码设计(难测的代码通常设计有问题)。测试是活文档。重构时有安全网不担心破坏已有功能。新同事看测试理解系统。'));
Q.push(q(G16,3,'boss',3,'前端测试工具链：Vitest + Vue Test Utils 分别做什么？',['相同','Vitest=测试运行器(执行测试/断言/覆盖率)。Vue Test Utils=Vue 组件测试工具(挂载组件/模拟props/触发事件)','Vitest 替代 Vue','只用一个'],1,'Vitest(类 Jest)负责运行测试和提供断言 API。Vue Test Utils 提供 mount()挂载组件模拟 props 触发事件等 Vue 特定功能。'));
Q.push(q(G16,3,'boss',3,'什么情况下测试维护成本过高→可以考虑减少测试？',['所有情况','频繁变化的不稳定 UI 细节；纯原型/一次性代码；第三方库的内部实现细节','永远不减','测试免费'],1,'快速迭代的原型/UI 细节不稳定时过度测试导致大量时间更新测试。测试稳定接口和核心逻辑减少琐碎测试。'));

// Architecture (20)
const G17='architecture';
Q.push(q(G17,1,'normal',1,'SOLID 的 S(单一职责)在前端指什么？',['一个函数做所有事','一个组件/函数只负责一件事。做多件事→拆分','写更少代码','复杂化'],1,'单一职责=每个模块/组件/函数只做一件事做好。一个组件既管状态又管样式又管请求→拆分。'));
Q.push(q(G17,1,'normal',1,'组件拆分的原则？',['越大越好','一个组件做一件事；可复用提取；变化频率不同的部分分开；层级不超过 3-4 层','全部拆成小组件','不拆分'],1,'按职责拆分。复用的提取为独立组件。经常变化的部分和稳定的部分分离。避免过度拆分(组件碎片化)。'));
Q.push(q(G17,1,'normal',1,'什么是技术债？怎么管理？',['借钱买服务器','为快速交付做的妥协(复制代码/跳过测试/硬编码)积累后降低开发速度。定期偿还重构','新技术','不需要管'],1,'技术债=短期妥协积累的代码质量问题。像金融债：越拖利息越高。定期安排重构时间偿还。'));
Q.push(q(G17,1,'normal',1,'MVC/MVVM 是什么？在前端怎么体现？',['数据库概念','MVC=Model-View-Controller。MVVM=Model-View-ViewModel(Vue/React 是 MVVM 变体)','CSS 框架','构建工具'],1,'Model(数据)→View(界面)→ViewModel(连接层处理逻辑)。Vue 中：data/model=Model，template=View，组件逻辑=ViewModel。'));
// elite 7
Q.push(q(G17,2,'elite',2,'状态管理方案怎么选？ref/reactive vs Pinia vs provide/inject？',['全用 Pinia','组件内部状态→ref/reactive；跨组件共享→Pinia；深层嵌套传递→provide/inject(轻量场景)','全用 ref','全用 provide'],1,'ref/reactive 适合组件内状态。Pinia 适合跨组件共享的全局状态。provide/inject 适合祖先传后代(如主题/语言)。'));
Q.push(q(G17,2,'elite',2,'项目目录结构原则？',['随便放','按功能/领域分(而非按文件类型)：features/user/ components/ stores/。相关文件放一起','全放 src','按类型分(components/pages/stores)'],1,'推荐按功能领域组织：features/user/(components+stores+api)。小型项目可按类型分。关键是相关文件靠近。'));
Q.push(q(G17,2,'elite',2,'什么时候该重构？重构的安全网是什么？',['随时改','代码异味(重复/过长/难理解)→重构。安全网=测试(确保重构不破坏功能)。没测试先补测试再重构','永远不重构','重构=重写'],1,'识别代码异味(复制代码/函数过长/命名混乱)→小步重构。有测试覆盖才能安全重构。每步改完跑测试→绿色→继续。'));
Q.push(q(G17,2,'elite',2,'观察者模式(Observer)在前端的体现？',['没用','事件监听(addEventListener)和响应式系统(Vue 的 watch/computed)都是观察者模式。主题变化→通知所有观察者','后端模式','已废弃'],1,'发布-订阅变体。Subject(主题)维护观察者列表状态变化时通知所有观察者。addEventListener 和 Vue 响应式都是此模式的实例。'));
Q.push(q(G17,2,'elite',2,'DRY vs WET vs AHA 原则？',['一样','DRY=Don\'t Repeat Yourself 别复制代码。WET=Write Everything Twice 可接受两次。AHA=Avoid Hasty Abstractions 别过早抽象','WET 最好','DRY 已废弃'],1,'不要过早抽象(AHA)：等到确实有共同模式再提取。两处相似不一定同一抽象(可能只是巧合)。过度 DRY 导致紧耦合。'));
Q.push(q(G17,2,'elite',2,'单例模式(Singleton)在前端的应用？',['没用','全局唯一实例：Pinia store、EventBus、全局配置对象。确保整个应用共享同一个实例','只有后端用','已废弃'],1,'单例=全局唯一实例。Pinia store 创建后整个应用共享一个实例。避免重复创建(如多个 Axios 实例配置不一致)。'));
Q.push(q(G17,2,'elite',2,'前端项目从单体到微前端的演进？',['一开始就微前端','小项目→单体(一个 Vite 应用)。大到多团队协作→微前端(Module Federation/iframe/Web Components)。不早优化','微前端总更好','单体已废弃'],1,'小项目单体架构最简。多团队独立开发部署→微前端独立子应用。大多数项目不需要微前端从单体开始够用。'));
// boss 9
Q.push(q(G17,3,'boss',3,'技术选型的考量因素？',['哪个流行用哪个','团队熟悉度+社区生态+包大小+维护频率+许可协议+和现有技术栈匹配度','只看性能','只看知名度'],1,'选技术栈综合考量：团队学习成本、社区活跃度(问题好解决)、包大小(影响性能)、维护状况(是否持续更新)、许可协议。'));
Q.push(q(G17,3,'boss',3,'组件通信方案选择：props/emits vs provide/inject vs Pinia vs EventBus？',['全 props','父子→props+emits；深层传递→provide/inject；全局状态→Pinia；EventBus 不推荐(难追踪)','全 Pinia','全 EventBus'],1,'默认用 props/emits 传递。隔多代→provide/inject。跨组件共享→Pinia。避免 EventBus(事件满天飞难以调试)。'));
Q.push(q(G17,3,'boss',3,'前端错误监控方案？',['不管错误','全局错误捕获(window.onerror)+Promise 未捕获+框架错误边界+上报到 Sentry/LogRocket 等平台','前端不处理错误','console.log'],1,'window.onerror 捕获运行时错误。unhandledrejection 捕获未处理 Promise。Sentry 等平台收集分析线上错误。'));
Q.push(q(G17,3,'boss',3,'YAGNI(You Aren\'t Gonna Need It)原则？',['不要写代码','不要实现当前不需要的功能。为未来需求写代码=浪费。需要时再实现','所有功能都要提前做','只写一半'],1,'YAGNI=不要提前实现"将来可能需要"的功能。需求会变→提前做的可能用不上。等需求明确时再实现更高效。'));
Q.push(q(G17,3,'boss',3,'KISS(Keep It Simple, Stupid)在前端的体现？',['简单就是简陋','优先最简单的解决方案。能用 CSS 不用 JS；能用标准库不引入第三方包；能用纯函数不用复杂模式','越复杂越好','KISS 已过时'],1,'简单方案 > 炫技。能用 HTML/CSS 解决不用 JS。能用浏览器 API 不引入库。复杂度随需求增长而非提前设计。'));
Q.push(q(G17,3,'boss',3,'前端项目从 0 到 1 的架构决策清单？',['直接写代码','技术栈选型→目录结构→路由设计→状态管理方案→API 层封装→错误处理→权限→测试→部署','只要写代码','架构不重要'],1,'1.框架/工具选型 2.目录结构 3.路由设计 4.状态管理 5.API 封装 6.错误处理 7.权限 8.测试策略 9.CI/CD。不贪大从关键决策开始。'));
Q.push(q(G17,3,'boss',3,'多页面应用 vs 单页面应用(SPA)→如何选择？',['SPA 总更好','内容为主(博客/文档)→多页面/SSG；交互为主(后台/工具)→SPA；电商/社交→根据场景混合','多页面过时','多页面更快'],1,'内容型网站(SEO 重要)→多页面或 SSG(如博客)。强交互应用(后台/工具)→SPA(Vue/React)。混合：首屏 SSR+后续 SPA。'));
Q.push(q(G17,3,'boss',3,'前端代码审查(Code Review)重点看什么？',['格式','逻辑正确性>安全(XSS/注入)>性能(不必要的重渲染)>可维护性(命名/结构)>可访问性>测试','只检查格式','不需要审查'],1,'审查优先级：逻辑错误和安全问题最严重。其次性能陷阱和不必要的复杂度。代码可读性和测试也是重要维度。'));
Q.push(q(G17,3,'boss',3,'Feature Flag(功能开关)在前端的应用？',['没用','通过配置开关控制新功能是否对用户可见。灰度发布→小范围测试→全量。出问题可迅速关闭','后端概念','已废弃'],1,'Feature Flag=用配置控制功能可见性。新功能先对 5%用户开放→观察→逐步放量。任何用户反馈可立即关闭回滚。'));

// A11y (15)
const G18='a11y';
Q.push(q(G18,1,'normal',1,'WCAG 四原则？',['快/好/省/美','可感知/可操作/可理解/健壮(POUR)','加载/渲染/交互/反馈','设计/开发/测试/部署'],1,'Perceivable 可感知(能被看到听到)。Operable 可操作(键盘可用)。Understandable 可理解。Robust 健壮(兼容各种设备)。'));
Q.push(q(G18,1,'normal',1,'alt 属性对无障碍的重要性？',['不重要','屏幕阅读器读出 alt 文字让视障用户"看到"图片。没有 alt→用户不知道图片内容','只影响 SEO','只装饰图片需要'],1,'alt 让视障用户通过屏幕阅读器理解图片内容。信息性图片必须有描述性 alt。纯装饰图片用 alt=""让阅读器跳过。'));
Q.push(q(G18,1,'normal',1,'键盘导航为什么重要？',['不重要','运动障碍用户无法用鼠标只能键盘操作。所有交互元素应可通过 Tab 访问 Enter/Space 激活','只有高级用户用键盘','键盘太慢'],1,'许多用户依赖键盘(运动障碍/视障/习惯)。确保所有可交互元素可通过 Tab 键到达并可通过键盘操作(Enter/Esc/方向键)。'));
// elite 5
Q.push(q(G18,2,'elite',2,'语义化 HTML 如何帮助无障碍？',['无帮助','原生语义标签(button/input/a)自带键盘交互和 ARIA 角色。用 div 模拟按钮需手动加所有功能','只帮助 SEO','语义化过时'],1,'<button>自动支持键盘 focus 和 Enter/Space 激活。用 <div onclick>="...">需要手动加 tabindex/role/keydown→容易遗漏。优先用原生语义标签。'));
Q.push(q(G18,2,'elite',2,'ARIA 的作用？什么时候需要？',['替代 HTML','当 HTML 原生语义不够用时补充无障碍信息。如 role="tab" aria-selected="true"。能用原生就不用 ARIA','不需要','总需要'],1,'ARIA 补充 HTML 语义不足。但能用原生 HTML 标签就不用 ARIA。错误 ARIA 比没有更差。第一条 ARIA 规则：不用 ARIA 当 HTML 已够用。'));
Q.push(q(G18,2,'elite',2,'颜色对比度标准？',['无所谓','WCAG AA:正文 4.5:1 大文字 3:1。WCAG AAA:7:1。可用 Chrome DevTools 检查对比度','只影响美观','越鲜艳越好'],1,'对比度不够→低视力用户看不清文字。浅灰文字在白色背景上→对比度可能不及格。工具：Chrome DevTools 颜色选择器显示对比度分数。'));
Q.push(q(G18,2,'elite',2,'focus 样式为什么不能去掉？',['可以去掉:focus{outline:none}','键盘用户靠 focus 指示器知道当前位置。去掉→键盘用户不知道该操作哪个元素','focus 不好看','去掉提升美观'],1,'永远不要完全移除 focus 样式。可用 :focus-visible 替代只键盘导航时显示。`:focus{outline:none}` 对键盘用户极度不友好。'));
Q.push(q(G18,2,'elite',2,'aria-label 和 aria-labelledby 区别？',['完全相同','aria-label=直接用字符串提供标签。aria-labelledby=引用其他元素 ID 作为标签','aria-labelledby 更快','aria-label 已废弃'],1,'aria-label="关闭"直接在元素上设标签。aria-labelledby="id1"引用页面已有元素的内容作为标签(避免重复文本)。'));
// boss 7
Q.push(q(G18,3,'boss',3,'以下 tab 顺序有问题吗？`<input><button style="position:absolute;left:-999px">隐藏</button><input>`',['没问题','视觉隐藏但 DOM 顺序不变的按钮仍可被 Tab 到→键盘用户困惑焦点"消失了"。视觉隐藏元素应同时从 tab 顺序移除(tabindex=-1)','隐藏元素自动跳过','position:absolute 自动移除'],1,'视觉隐藏但 DOM 中仍存在的元素依然可被 Tab 键聚焦→键盘用户看不到焦点。隐藏不可交互元素时同步设 tabindex=-1 或使用 display:none。'));
Q.push(q(G18,3,'boss',3,'动态内容更新(如 AJAX 加载)如何让屏幕阅读器知晓？',['自动知晓','用 aria-live 区域(如 aria-live="polite")播报内容变化。重要消息用 assertive','刷新页面','不需要通知'],1,'屏幕阅读器不会自动感知动态内容变化。用 aria-live 属性让浏览器在指定区域内容变化时通知阅读器。polite=等当前操作完成播报。'));
Q.push(q(G18,3,'boss',3,'以下 modal 对话框缺少什么无障碍特性？',['不缺','打开时焦点应移入 modal；关闭时焦点回退到触发按钮；ESC 关闭；点击背景关闭；aria-modal="true"；body 滚动锁定','只需 ESC','只需关闭按钮'],1,'完整 modal 无障碍：1.焦点陷阱(Tab 在 modal 内循环)2.ESC 关闭 3.aria-modal 标识 4.背景不可滚动 5.关闭后焦点回到触发元素。'));
Q.push(q(G18,3,'boss',3,'表单错误信息如何让屏幕阅读器感知？',['只显示红色','错误信息关联到对应输入框(aria-describedby)。提交时聚焦第一个有错误的输入框。错误信息用 role="alert"','不需要','颜色区分即可'],1,'仅靠颜色(红色)不可访问→色盲用户看不出。用 aria-describedby 关联错误文案到输入框。aria-invalid="true"标记无效输入。role="alert"自动播报。'));
Q.push(q(G18,3,'boss',3,'前端无障碍检查清单(简版)？',['不管','1.语义标签 2.图片 alt 3.键盘可操作 4.focus 可见 5.颜色对比度 6.表单标签关联 7.ARIA 正确使用 8.动态内容 aria-live','无障碍不重要','只需测 Chrome'],1,'8 项快速检查：正确的 HTML 标签→图片有 alt→键盘可操作→focus 可见→颜色对比够→表单 label 关联→ARIA 不过度→动态内容可感知。'));
Q.push(q(G18,3,'boss',3,'使用 icon font 图标需要注意什么无障碍问题？',['没问题','纯图标按钮没有文字→屏幕阅读器不知道这是什么。给图标加 aria-label 或放入隐藏文字','图标自动可访问','不需要处理'],1,'<button><i class="icon-close"></i></button>→阅读器读出"按钮"但不知道做什么。加 aria-label="关闭"或用 visually-hidden 文字。'));
Q.push(q(G18,3,'boss',3,'无障碍(ARIA)的第一条规则？',['总用 ARIA','不要使用 ARIA 如果能用原生 HTML 替代。错误 ARIA 比没有更差','ARIA 总是好的','ARIA 已废弃'],1,'ARIA 第一条规则：如果可以用原生 HTML 元素/属性就不要用 ARIA。原生 button 比 div role="button"好一万倍。滥用 ARIA 降低可访问性。'));

// Append
const closing = src.lastIndexOf('\n]');
fs.writeFileSync('src/configs/quiz-questions.ts', src.substring(0,closing)+',\n'+Q.join(',\n')+'\n]','utf-8');
console.log('Added',Q.length,'Total:',id-1);
