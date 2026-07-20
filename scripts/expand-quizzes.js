const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const QUIZ_DIR = path.join(__dirname, '..', 'src', 'content', 'quiz');

function readQuiz(filename) {
  const filePath = path.join(QUIZ_DIR, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  return yaml.load(content);
}

function writeQuiz(filename, data) {
  const filePath = path.join(QUIZ_DIR, filename);
  const yamlStr = yaml.dump(data, {
    lineWidth: -1,
    noRefs: true,
    quotingType: "'",
    forceQuotes: false,
    indent: 2,
  });
  // Fix: js-yaml adds quotes unnecessarily for strings with special chars
  // We'll do a simple pass to write it
  fs.writeFileSync(filePath, yamlStr, 'utf8');
}

// ======================================================================
// 1. vue-basic.yaml (25 → 49 questions)
// ======================================================================
function expandVueBasic() {
  const data = readQuiz('vue-basic.yaml');

  // Add to Level 1: SFC 与模板 (5 → 10)
  const l1 = [
    { id: 380, difficulty: 1, question: '<template> 标签中可以有多个根元素吗？', options: ['可以，Vue 3 支持多个根元素（Fragment）', '不可以，始终只能有一个根元素', '只有在 setup 中才可以', '需要特殊配置'], answer: 0, explanation: 'Vue 3 支持 Fragment，template 中可以有多个根元素。Vue 2 只能有一个根元素。多根元素时自动用 Fragment 包裹。' },
    { id: 381, difficulty: 1, question: '<style scoped> 中 scoped 是必须写的吗？', options: ['必须写', '不必须——但不写 scoped 样式会污染全局，影响其他组件', 'Vue 3 自动添加', '在 setup 中才需要'], answer: 1, explanation: 'scoped 不是强制语法，但不加的话该组件的 CSS 会变成全局样式，可能意外覆盖其他组件的样式。' },
    { id: 382, difficulty: 1, question: '以下哪个是正确的 v-bind 简写写法？', options: [':href="url"', 'v-href="url"', '@href="url"', '#href="url"'], answer: 0, explanation: 'v-bind:href="url" 简写为 :href="url"。冒号是 v-bind 的语法糖。注意：v-on 的简写才是 @。' },
    { id: 383, difficulty: 1, question: 'v-html 和 {{}} 的区别是什么？', options: ['完全相同', 'v-html 渲染 HTML 字符串；{{}} 将内容作为纯文本转义输出', 'v-html 更快', '{{}} 已废弃'], answer: 1, explanation: 'v-html 直接插入 HTML（有 XSS 风险慎用）。{{}} 自动转义 HTML 标签为文本。永远不要对用户输入使用 v-html。' },
    { id: 384, difficulty: 1, question: '<script setup> 中定义的变量能在 <template> 中直接使用吗？', options: ['不能，需要 return', '能——<script setup> 中顶层变量自动暴露给模板', '需要手动注册', '只有在 data() 中才可以'], answer: 1, explanation: '<script setup> 是编译时的语法糖，编译器会自动将顶层绑定（变量、函数、import）暴露给模板，无需 return。' },
  ];
  data.levels[0].questions.push(...l1);

  // Add to Level 2: 指令 (8 → 12)
  const l2 = [
    { id: 385, difficulty: 2, question: 'v-for 可以遍历对象吗？语法是什么？', options: ['不能', '可以——v-for="(value, key, index) in obj"，遍历对象的属性值、键和索引', '只能遍历数组', '需要转成数组'], answer: 1, explanation: 'v-for 可遍历数组、对象、数字范围、字符串。对象遍历：(value, key, index) in obj。注意 value 在前 key 在后。' },
    { id: 386, difficulty: 2, question: 'v-if 和 v-for 能用在同一个元素上吗？为什么？', options: ['可以，没限制', '不建议——v-if 和 v-for 同时使用时 v-if 优先级更高，可能导致 v-for 变量访问不到。应先用 computed 过滤', '不能，会报错', 'Vue 3 已解决'], answer: 1, explanation: 'Vue 3 中 v-if 优先级高于 v-for，v-if 中无法访问 v-for 的变量。最佳实践：用 computed 先过滤数据再用 v-for 渲染。' },
    { id: 387, difficulty: 2, question: 'v-model 可以用在自定义组件上吗？', options: ['不能', '可以——需要组件定义 modelValue prop 并 emit update:modelValue 事件', '只能用在原生 input 上', '需要插件'], answer: 1, explanation: 'v-model 在组件上默认绑定 modelValue prop 和 update:modelValue 事件。也可用 v-model:title 绑定指定 prop。' },
    { id: 388, difficulty: 2, question: 'watchEffect 和 watch 的区别是什么？', options: ['完全相同', 'watchEffect 自动追踪回调中的依赖立即执行；watch 需要明确指定监听源且默认懒执行', 'watchEffect 已废弃', 'watch 更快'], answer: 1, explanation: 'watchEffect 不需要指定依赖，自动追踪回调内使用的响应式数据。立即执行一次。watch 明确指定监听谁，知道旧值新值。' },
  ];
  data.levels[1].questions.push(...l2);

  // Add to Level 3: 响应式实战 (12 → 15)
  const l3 = [
    { id: 389, difficulty: 3, question: 'shallowRef 和 ref 的区别？何时用 shallowRef？', options: ['完全相同', 'shallowRef 只有 .value 本身是响应式的，深层属性变化不触发更新。适合大型对象只需整体替换的场景', 'shallowRef 更快', 'shallowRef 已废弃'], answer: 1, explanation: 'ref 对值做深层响应式处理（reactive 包裹）。shallowRef 只对 .value 的访问是响应式的。适合：不需要深度监听的大对象、第三方类实例。' },
    { id: 390, difficulty: 3, question: 'toRef 和 toRefs 的区别？', options: ['完全相同', 'toRef 将 reactive 对象的一个属性转成 ref；toRefs 将所有属性一次性转成 ref', 'toRef 更强', 'toRefs 已废弃'], answer: 1, explanation: 'toRef(obj, "key") 返回单个 ref 保持与原对象的响应式连接。toRefs(obj) 返回 {key: ref, ...} 适合解构。' },
    { id: 391, difficulty: 3, question: 'Vue 中如何实现防抖（debounce）？以下哪个方案最好？', options: ['直接在模板中写 setTimeout', '用自定义 ref（customRef）封装防抖逻辑，模板中使用该 ref', '用 v-debounce 指令', '在 computed 中做防抖'], answer: 1, explanation: 'customRef 可以拦截 get/set，适合封装防抖逻辑：track 在 set 中延迟调用 trigger。比第三方指令更可控。搜索框常用此模式。' },
  ];
  data.levels[2].questions.push(...l3);

  // Add Level 4: 组件通信实战
  const l4 = {
    level: 4,
    type: 'boss',
    threshold: 60,
    name: '组件通信实战',
    questions: [
      { id: 392, difficulty: 3, question: 'Vue 组件通信方式有哪些？按场景推荐？', options: ['只有 props 和 emits', '父→子：props；子→父：emits；跨层级：provide/inject；全局：Pinia；兄弟：共享父状态或事件总线', '只有 Pinia', '只有 provide/inject'], answer: 1, explanation: '逐级传递用 props/emits。深层嵌套用 provide/inject（如主题）。全局共享状态用 Pinia。没有万能方案，根据组件关系选择。' },
      { id: 393, difficulty: 2, question: 'Props 校验怎么做？以下哪个是正确的校验写法？', options: ['props: ["title"]', 'defineProps({ title: { type: String, required: true, default: "未命名", validator: (v) => v.length > 0 } })', 'props: String', 'defineProps(String)'], answer: 1, explanation: '对象语法可以定义 type、required、default、validator。validator 返回 false 时 Vue 在开发模式会警告。运行时不做校验。' },
      { id: 394, difficulty: 2, question: 'defineEmits 中声明事件有什么好处？', options: ['没有实际好处', '便于文档化、IDE 自动补全，且在 TS 中可做类型检查。还能用 validates 校验 payload', '只为了好看', 'Vue 强制要求'], answer: 1, explanation: 'defineEmits 声明事件列表让组件接口更清晰。在 TS 中可做类型约束。对象语法 defineEmits({ submit: (payload) => true }) 可校验事件参数。' },
      { id: 395, difficulty: 2, question: '组件 v-model 支持多个绑定吗？语法是什么？', options: ['不支持', '支持——v-model:title="title" v-model:content="content" 可绑定多个 prop', '只能一个', '需要特殊组件'], answer: 1, explanation: 'Vue 3 支持多个 v-model 绑定。v-model:propName 绑定指定 prop。默认为 v-model（等价于 v-model:modelValue）。子组件 emit("update:propName", val)。' },
      { id: 396, difficulty: 3, question: 'provide/inject 的响应式问题：provide 一个 ref 后子组件 inject 到的值会自动解包吗？', options: ['不会响应', 'provide ref 时子组件 inject 到的也是 ref，保持响应式连接。但如果 provide reactive 对象属性，需要用 toRef 或函数包裹', '自动解包所有', '只有 Pinia 能解决'], answer: 1, explanation: 'provide("key", refValue) → inject 得到的是 ref，.value 可读写且保持响应式。provide("key", readonly(ref)) 可防止子组件修改。' },
      { id: 397, difficulty: 3, question: '依赖注入 vs Props 逐级传递：什么时候用 provide/inject 而不是 props？', options: ['始终用 provide', '深层嵌套（3层以上）且中间组件不需要知道该数据时用 provide/inject。否则用 props 更明确', '只看性能', 'provide 总是更好'], answer: 1, explanation: 'props 逐级传递让数据流清晰但穿多层很繁琐（prop drilling）。provide/inject 跳过中间层但让数据来源不透明。权衡：浅层用 props，深层用 provide/inject。' },
      { id: 398, difficulty: 2, question: '.sync 修饰符在 Vue 3 中还存在吗？替代方案是什么？', options: ['还存在', 'Vue 3 移除了 .sync，取而代之的是 v-model 的多个绑定（v-model:propName）', '用 .once', '用 v-bind.sync'], answer: 1, explanation: 'Vue 2 的 :title.sync="val" 等价于 :title="val" @update:title="val=$event"。Vue 3 统一为 v-model:title="val"，语法更一致。' },
      { id: 399, difficulty: 3, question: '父组件如何调用子组件的方法？这在 Vue 中是好模式吗？', options: ['用 $refs 直接调用，推荐', '用 defineExpose + template ref 可以调用但一般不建议——破坏了单向数据流。优先用 props/emits 通信', '无法实现', '用 $parent'], answer: 1, explanation: 'defineExpose 暴露方法，父组件通过 ref 调用。但这是命令式、隐含的耦合。优先声明式（props/emits）。只在必要时用（如聚焦输入框）。' },
      { id: 400, difficulty: 3, question: '插槽（slot）有哪些类型？作用域插槽解决了什么问题？', options: ['只有默认插槽', '默认插槽、具名插槽、作用域插槽。作用域插槽让父组件在填充内容时能访问子组件的数据', '只有具名插槽', '插槽和 props 一样'], answer: 1, explanation: '<slot name="header">具名插槽。作用域插槽：<slot :item="item"> → 父组件 <template #default="{item}">{{item}}</template>。子传数据给父的模板。' },
      { id: 401, difficulty: 2, question: '动态组件 <component :is="xxx"> 和 v-if 切换的区别？', options: ['完全相同', '<component :is> 根据数据动态切换组件，组件会被销毁重建（除非用 KeepAlive）。v-if 只能做条件选择', 'component 更快', 'v-if 更强'], answer: 1, explanation: '<component :is="currentTab"> 配合 KeepAlive 实现 Tab 切换缓存。v-if/v-else 写死多个分支。动态组件更灵活适合运行时决定的场景。' },
      { id: 402, difficulty: 3, question: '组件通信中事件总线的替代方案？Vue 3 为什么移除了 $on/$off？', options: ['Vue 3 保留了', '推荐使用 mitt 等第三方库或 Pinia。移除是为了减少隐式的数据流，让组件关系更清晰', '事件总线是最好的', '不需要替代'], answer: 1, explanation: 'Vue 2 的 $on/$off/$once 事件总线让任何组件间可以通信但数据流难以追踪。Vue 3 移除后推荐 Pinia（可追踪）或小型库 mitt。' },
    ],
  };
  data.levels.push(l4);

  writeQuiz('vue-basic.yaml', data);
  console.log('vue-basic.yaml: 新增 ' + (l1.length + l2.length + l3.length + l4.questions.length) + ' 题，总计 ' + data.levels.reduce((s, l) => s + l.questions.length, 0) + ' 题');
}

// ======================================================================
// 2. vue-advanced.yaml (20 → 44 questions)
// ======================================================================
function expandVueAdvanced() {
  const data = readQuiz('vue-advanced.yaml');

  // Add to Level 1: 路由基础 (4 → 8)
  const l1 = [
    { id: 430, difficulty: 1, question: 'Vue Router 中如何实现编程式导航？', options: ['只能点击链接', 'router.push("/path") 或 router.replace("/path") 在 JS 中切换路由', '修改 URL 栏', '用 a 标签'], answer: 1, explanation: 'useRouter() 返回 router 实例。router.push("/home") 跳转并添加历史记录。router.replace 替换当前记录。适合表单提交后跳转。' },
    { id: 431, difficulty: 1, question: '<router-view> 的作用是什么？', options: ['显示链接', '路由匹配的组件渲染的出口——匹配到的组件会渲染在 <router-view> 的位置', '定义路由表', '导航菜单'], answer: 1, explanation: '<router-view> 是 Vue Router 的占位组件。URL 变化时匹配到的页面组件替换该位置渲染。类似一个动态组件的容器。' },
    { id: 432, difficulty: 1, question: '嵌套路由怎么定义？', options: ['无法嵌套', '在路由配置中使用 children 数组，父组件中放 <router-view> 渲染子路由', '用多个 Router', '自动嵌套'], answer: 1, explanation: '{ path: "/user", component: User, children: [{ path: "profile", component: Profile }] }。User 组件中需要 <router-view> 来渲染子路由。' },
    { id: 433, difficulty: 1, question: 'Pinia 和 localStorage 的区别？什么时候用哪个？', options: ['完全相同', 'Pinia 是运行时响应式状态（刷新丢失）；localStorage 持久化存储。状态管理用 Pinia，需要持久化的数据额外存 localStorage', 'Pinia 自动持久化', 'localStorage 更快'], answer: 1, explanation: 'Pinia store 在内存中响应式共享。页面刷新后重置。结合 pinia-plugin-persistedstate 可自动同步到 localStorage。' },
  ];
  data.levels[0].questions.push(...l1);

  // Add to Level 2: 状态管理 (7 → 11)
  const l2 = [
    { id: 434, difficulty: 2, question: 'Pinia 的 setup store 和 options store 哪种更好？', options: ['Options store 更好', 'Setup store 更灵活——用 Composition API 语法，可自由使用 composables。写法与组件一致', '完全相同', 'Setup store 已废弃'], answer: 1, explanation: 'Setup store（函数式）用 ref/computed/函数 定义。Options store（对象式）用 state/getters/actions。Setup 风格更灵活、更接近组件写法。两者功能等价。' },
    { id: 435, difficulty: 2, question: 'Pinia store 之间可以互相引用吗？', options: ['不能', '可以——在 setup store 中直接 useOtherStore()。注意避免循环依赖', '需要特殊配置', '只能单向'], answer: 1, explanation: 'Pinia store 可以互相引用（如用户 store 引用购物车 store 在退出登录时清空购物车）。但要避免 A→B 同时 B→A 的循环依赖。' },
    { id: 436, difficulty: 2, question: 'composable 函数命名约定是什么？为什么？', options: ['任意命名', '以 use 开头（如 useMouse、useFetch）。便于识别且符合 ESLint 规则（可检测未正确使用 composable）', '以 _ 开头', '以 $ 开头'], answer: 1, explanation: 'use 前缀是 Vue 社区约定。IDE 和 ESLint 插件可以校验：composable 只能在 setup/生命周期钩子/其他 composable 中调用。' },
    { id: 437, difficulty: 2, question: '在 composable 中返回 readonly 包装的数据有什么好处？', options: ['没有好处', '防止外部代码意外修改内部状态。暴露只读引用同时保留内部修改能力', '性能更好', 'Vue 强制要求'], answer: 1, explanation: 'composable 内部可修改 ref，但暴露 readonly(ref) 让使用者只能读取。遵循最小权限原则，让数据流更可控。' },
  ];
  data.levels[1].questions.push(...l2);

  // Add to Level 3: 组合式实战 (9 → 12)
  const l3 = [
    { id: 438, difficulty: 3, question: '路由独享守卫 beforeEnter 和全局 beforeEach 的执行顺序？', options: ['随机', '全局 beforeEach → 路由配置 beforeEnter → 组件内 beforeRouteEnter。按从外到内的顺序执行', 'beforeEnter 优先', '只执行一个'], answer: 1, explanation: '导航守卫执行顺序：1.全局 beforeEach 2.路由配置 beforeEnter 3.组件 beforeRouteEnter。每层都可以调用 next(false) 或 return false 取消导航。' },
    { id: 439, difficulty: 3, question: 'Teleport 组件的用途是什么？举例使用场景', options: ['加速渲染', '将组件内容渲染到 DOM 树的任意位置（如 body 下）。典型场景：Modal 弹窗、Toast 通知等需要脱离父组件层叠上下文的 UI', '替代 router-view', 'CSS 辅助'], answer: 1, explanation: '<Teleport to="body"><Modal /></Teleport> 将 Modal 渲染到 body 下，避免被父容器的 overflow:hidden 或 z-index 限制。DOM 位置变了但组件逻辑关系不变。' },
    { id: 440, difficulty: 3, question: '<Suspense> 组件的基本用法？依赖于什么？', options: ['直接使用', '<Suspense> 包裹异步组件，用 #default 和 #fallback 两个插槽。依赖异步 setup（top-level await）或 defineAsyncComponent', '用 v-if 代替', '已废弃'], answer: 1, explanation: '<Suspense><template #default><AsyncComp /></template><template #fallback>Loading...</template></Suspense>。当异步组件未就绪时显示 fallback。仍是实验性功能。' },
  ];
  data.levels[2].questions.push(...l3);

  // Add Level 4: Vue 工程化
  const l4 = {
    level: 4,
    type: 'boss',
    threshold: 60,
    name: 'Vue 工程化',
    questions: [
      { id: 441, difficulty: 3, question: '大型 Vue 项目中如何管理 Pinia store？按什么维度拆分？', options: ['全放一个 store', '按业务领域拆分（userStore、cartStore、productStore）。每个 store 独立管理自己的状态，避免一个超大 store', '按页面拆分', '不拆分'], answer: 1, explanation: '按领域边界拆分 store 让每个 store 职责单一。用户、购物车、商品各自独立。Store 之间可通过调用其他 store 协作但保持松耦合。' },
      { id: 442, difficulty: 3, question: '路由懒加载对构建产物的影响？', options: ['只有性能影响', '每个懒加载路由的组件打包成独立 chunk。首屏只加载当前路由的 chunk，其他路由访问时才加载。减少首屏体积但增加 HTTP 请求数', '无影响', '让构建更慢'], answer: 1, explanation: '动态 import() 让 Vite/Webpack 对每个懒加载路由生成独立 JS 文件。首屏快但跳转时可能短暂空白（配合 prefetch 或 loading 优化）。' },
      { id: 443, difficulty: 2, question: 'defineAsyncComponent 和普通 import 的区别？', options: ['完全相同', 'defineAsyncComponent 按需异步加载组件，返回一个只在被渲染时才加载的组件包装器。普通 import 同步打包', 'async 更快', 'defineAsyncComponent 已废弃'], answer: 1, explanation: 'defineAsyncComponent(() => import("./Heavy.vue")) 延迟加载重型组件。可配置加载中/加载失败状态。适合不常用的重型组件。' },
      { id: 444, difficulty: 3, question: '环境变量 .env 文件在 Vite 项目中如何使用？注意什么？', options: ['直接放在代码中', 'VITE_ 前缀的变量可通过 import.meta.env.VITE_XXX 访问。不要存储敏感信息（会打包进客户端代码）。非 VITE_ 前缀的变量只在 Node 端可用', '任意变量都可用', '不需要前缀'], answer: 1, explanation: '只有 VITE_ 前缀的变量暴露给客户端。密钥等敏感信息只放服务端。.env.development / .env.production 按模式加载。' },
      { id: 445, difficulty: 2, question: 'Vite 中的 glob import 有什么用？', options: ['装饰代码', 'import.meta.glob("./modules/*.js") 批量导入文件。适合自动注册路由、组件、store 等模块', '替代 import', '已废弃'], answer: 1, explanation: 'glob import 返回 {路径: () => import(路径)} 的对象。路由自动注册：遍历 pages 目录生成路由表。减少手动维护路由配置的代码。' },
      { id: 446, difficulty: 3, question: 'Vue 项目的 ESLint + Prettier 配置冲突怎么办？', options: ['只用一个', '用 eslint-config-prettier 关闭 ESLint 中与 Prettier 冲突的规则。让 ESLint 管代码质量 Prettier 管格式', '手动调整', '放弃格式化'], answer: 1, explanation: 'ESLint 既有代码质量规则也有格式规则。Prettier 只管格式。两者冲突时 eslint-config-prettier 关闭 ESLint 的格式规则。搭配 eslint-plugin-prettier 可将 Prettier 作为 ESLint 规则运行。' },
      { id: 447, difficulty: 3, question: '如何为 Vue 项目设置路径别名（@/）？', options: ['自动支持', 'Vite 中在 vite.config.js 的 resolve.alias 配置 {"@": fileURLToPath(new URL("./src", import.meta.url))}。同时配置 jsconfig/tsconfig 的 paths', '修改 package.json', '不需要配置'], answer: 1, explanation: '路径别名让 import 不用写 ../../../。Vite 配置 resolve.alias，tsconfig 配置 paths，两者需要同步。Vite 负责构建时解析，tsconfig 负责 IDE 智能提示。' },
      { id: 448, difficulty: 2, question: 'Vue 项目中哪些文件应该放在 src 目录下？', options: ['所有文件', 'src 放源代码（组件、页面、路由、store、工具函数等）。public 放不需要处理的静态资源（favicon、robots.txt）。根目录放配置文件', '随便放', '全放根目录'], answer: 1, explanation: 'src/ 是源代码目录（会被 Vite 处理编译）。public/ 是静态资源目录（直接复制到构建产物）。分离让项目结构清晰。' },
      { id: 449, difficulty: 3, question: 'Husky + lint-staged 在 Vue 项目中做什么？', options: ['加速构建', 'Git hooks 工具——commit 前自动对暂存文件运行 ESLint/Prettier。确保提交的代码符合规范', '替代 Git', '自动部署'], answer: 1, explanation: 'Husky 管理 Git hooks（pre-commit）。lint-staged 只对 git add 的文件运行检查（快）。组合：commit 前自动格式化+检查 → 不合格的代码无法提交。' },
      { id: 450, difficulty: 2, question: 'Vue Router 的滚动行为如何控制？', options: ['无法控制', '创建 Router 时配置 scrollBehavior(to, from, savedPosition) 返回滚动目标位置', '用 JS 操作', '只支持顶部'], answer: 1, explanation: 'scrollBehavior 可返回 { top: 0 }（回到顶部）、savedPosition（回到之前位置）、或 selector 的 { el: "#anchor" }。也可返回 Promise 做异步滚动。' },
      { id: 451, difficulty: 3, question: 'Vue 应用如何做权限控制（路由级别）？', options: ['无法做', '路由 meta 定义权限角色 → beforeEach 守卫检查 → 无权限跳转 403 或登录页。配合后端接口做双重验证', '只在页面内判断', '用 CSS 隐藏'], answer: 1, explanation: '路由 meta: { requiresAuth: true, roles: ["admin"] }。beforeEach 中检查用户角色是否在允许列表中。前端权限是 UX 优化——真正的权限校验必须在后端。' },
      { id: 452, difficulty: 2, question: 'Vue 项目中 Unocss/Tailwind CSS 和 <style scoped> 如何选择？', options: ['只用一个', '两者可共存：原子 CSS（Tailwind）处理布局和通用样式，<style scoped> 处理复杂组件特定样式。按场景选择', '互斥', '随机选择'], answer: 1, explanation: '原子 CSS 适合快速布局和一致的设计系统。<style scoped> 适合复杂动画、嵌套选择器、CSS 变量等原子 CSS 难以表达的样式。组合使用最佳。' },
    ],
  };
  data.levels.push(l4);

  writeQuiz('vue-advanced.yaml', data);
  console.log('vue-advanced.yaml: 新增 ' + (l1.length + l2.length + l3.length + l4.questions.length) + ' 题，总计 ' + data.levels.reduce((s, l) => s + l.questions.length, 0) + ' 题');
}

// ======================================================================
// 3. engineering.yaml (20 → 43 questions)
// ======================================================================
function expandEngineering() {
  const data = readQuiz('engineering.yaml');

  // Add to Level 1: 工具认知 (5 → 10)
  const l1 = [
    { id: 350, difficulty: 1, question: 'npm run build 产出的 dist 目录做什么用？', options: ['开发调试', 'dist 是构建产物——压缩优化后的 HTML/CSS/JS 文件。这个目录部署到服务器上', '用于版本控制', '给 AI 看的'], answer: 1, explanation: 'dist（distribution）= 生产构建产物。代码被压缩、tree-shaking、hash 命名后放到此目录。部署时把 dist 内容上传到 CDN/服务器。' },
    { id: 351, difficulty: 1, question: '为什么 Node.js 项目有 package.json 文件？', options: ['只是说明文件', 'package.json 是项目核心配置——记录项目名称、依赖列表、脚本命令、版本号等元信息', '是锁文件', '不需要'], answer: 1, explanation: 'package.json = 项目身份证。记录 name/version/scripts/dependencies 等。npm install 根据它下载依赖。npm run 根据它执行脚本。' },
    { id: 352, difficulty: 1, question: 'ESLint 和 Prettier 分别做什么？为什么两者搭配用？', options: ['完全相同', 'ESLint 检查代码质量和潜在错误（如未使用的变量）；Prettier 格式化代码风格（缩进、引号）。一个管质量一个管格式', '只用 ESLint', '只用 Prettier'], answer: 1, explanation: 'ESLint：代码逻辑问题（未使用变量、可能为 null 的访问）。Prettier：纯粹格式（单引号/双引号/缩进/换行）。两者互补不冲突。' },
    { id: 353, difficulty: 1, question: '终端（Terminal）和图形界面（GUI）的区别？为什么前端要会用终端？', options: ['终端已过时', '终端更精确高效可自动化（脚本）。大量前端工具（npm/vite/git）核心操作都通过终端完成', 'GUI 更好', '终端只用于后端'], answer: 1, explanation: 'npm 安装、Vite 启动、Git 操作、构建部署——这些命令行的效率远超 GUI。终端还可以组合命令和写脚本自动化重复工作。' },
    { id: 354, difficulty: 1, question: 'git clone 和直接下载 ZIP 的区别？', options: ['完全相同', 'clone 保留完整的 Git 历史记录和分支信息。下载 ZIP 只有最新代码快照，没有 .git 目录', 'ZIP 更好', 'clone 只用于 GitHub'], answer: 1, explanation: 'git clone 获取完整仓库（所有历史提交+分支）。可以 git log、切换分支、提交。下载 ZIP 只是代码快照，无法使用 Git 版本管理功能。' },
  ];
  data.levels[0].questions.push(...l1);

  // Add to Level 2: 模块与包 (7 → 12)
  const l2 = [
    { id: 355, difficulty: 2, question: 'package-lock.json 的作用是什么？应该提交到 Git 吗？', options: ['不需要', '锁定依赖的精确版本——确保团队成员和 CI 安装完全相同的依赖版本。必须提交到 Git', '只是缓存', '自动生成不用管'], answer: 1, explanation: 'package-lock.json 记录 node_modules 中每个包的精确版本和下载地址。确保所有人都安装相同版本防止"在我电脑上能跑"。必须提交！' },
    { id: 356, difficulty: 2, question: '动态 import() 和静态 import 语句的区别？', options: ['完全相同', '静态 import 在文件顶部编译时加载；动态 import() 返回 Promise 可在运行时按需加载实现代码分割', '动态更快', '静态已废弃'], answer: 1, explanation: '静态：import { fn } from "./mod"。动态：const mod = await import("./mod")。动态用于路由懒加载和条件加载。' },
    { id: 357, difficulty: 2, question: 'npm ci 和 npm install 的区别？什么时候用 ci？', options: ['完全相同', 'ci=clean install——删除 node_modules 后严格按 lock 文件安装。CI/CD 环境用 ci 确保可复现。install 可能更新 lock 文件', 'ci 更快', 'ci 已废弃'], answer: 1, explanation: 'npm ci 跳过依赖解析直接按 lock 文件安装。比 npm install 更快更严格。lock 文件不匹配时会报错（保证一致性）。CI 环境的首选。' },
    { id: 358, difficulty: 2, question: 'npm update 和 npm install package@latest 的区别？', options: ['完全相同', 'update 根据 package.json 的版本范围（^ ~）更新到允许的最新版本。install@latest 无视版本范围直接装最新', 'update 更强', 'install 已废弃'], answer: 1, explanation: '"lodash":"^1.0.0" → npm update 可能升级到 1.9.9（不超过 1.x）。npm install lodash@latest 可能升级到 4.x（可能不兼容）。' },
    { id: 359, difficulty: 2, question: 'Monorepo 是什么？Turborepo/Nx 解决了什么问题？', options: ['单一仓库', '在同一个 Git 仓库中管理多个相关项目/包。Turborepo 提供并行执行、缓存、依赖图优化。解决多项目协作效率问题', '新语言', 'Git 分支策略'], answer: 1, explanation: 'Monorepo 将前端、后端、工具库放一个仓库统一管理。Turborepo/Nx 智能缓存构建结果、并行执行任务、按依赖顺序构建。适合大型团队。' },
  ];
  data.levels[1].questions.push(...l2);

  // Add to Level 3: 工作流实战 (9 → 12)
  const l3 = [
    { id: 360, difficulty: 3, question: 'Git 冲突的完整解决流程？', options: ['删除重来', 'git pull 发现冲突→编辑冲突文件保留正确内容→git add→git commit。或 git merge --abort 取消重来', '直接 push force', '不管冲突'], answer: 1, explanation: '发现 CONFLICT→打开文件找到 <<<<HEAD / ===== / >>>>branch 标记→手动决定保留哪边→删掉标记→保存→git add 标记已解决→git commit。' },
    { id: 361, difficulty: 3, question: 'npm audit 报告了高危漏洞但该包是构建工具（devDependency），如何处理？', options: ['无视', '分析：构建工具只在开发时本地运行不暴露给用户→风险较低但仍应更新。运行 npm audit fix 尝试自动修复。无法修复则评估是否可接受', '立即删除项目', '换语言重写'], answer: 1, explanation: 'devDependency 的漏洞影响开发环境不直接影响用户。但仍建议更新（npm audit fix）。生产依赖漏洞优先级更高需立即处理。' },
    { id: 362, difficulty: 3, question: '为什么 Vite 开发时用 ES Module 但构建时用 Rollup 打包？', options: ['随意选择', 'ES Module 在开发时浏览器原生支持（快速 HMR）。构建时需要打包（减少请求数+tree-shaking+压缩），Rollup 更适合库/应用打包', 'Rollup 更快', 'ESM 已废弃'], answer: 1, explanation: '开发：浏览器原生 ESM → 按需编译 → 极快启动。构建：Rollup → tree-shaking 更干净 → 产物更小。两者各取长处。' },
  ];
  data.levels[2].questions.push(...l3);

  // Add Level 4: CI/CD与部署
  const l4 = {
    level: 4,
    type: 'boss',
    threshold: 60,
    name: 'CI/CD与部署',
    questions: [
      { id: 363, difficulty: 2, question: 'CI/CD 是什么？解决了什么问题？', options: ['代码编辑器', '持续集成（CI）自动测试合并代码；持续部署（CD）自动构建部署到服务器。减少手动操作、早发现集成问题', '新语言', 'Git 替代品'], answer: 1, explanation: 'CI：每次 push → 自动跑测试/lint/build → 失败立即通知。CD：通过 CI → 自动部署到测试/生产环境。核心价值：自动化解放人力、早发现问题。' },
      { id: 364, difficulty: 3, question: 'GitHub Actions 的核心概念？workflow/job/step 的关系？', options: ['没有层级', 'Workflow（.github/workflows/*.yml）包含多个 Job；Job 并行/串行包含多个 Step；Step 执行具体命令或 Action', '只有一个级别', '不需要配置'], answer: 1, explanation: 'Workflow = 完整自动化流程（如"部署到 Pages"）。Job = 一组在同一个 runner 上执行的步骤。Step = 最小执行单元（run 命令或 uses Action）。' },
      { id: 365, difficulty: 2, question: 'GitHub Actions 中 secrets 的作用？', options: ['公开配置', 'secrets 存储敏感信息（API 密钥、部署 Token）。在 workflow 中通过 ${{ secrets.XXX }} 引用，日志中自动隐藏', '环境变量', '不常用'], answer: 1, explanation: 'GITHUB_TOKEN、部署密钥等敏感信息放在 Settings → Secrets。运行时注入到环境变量且在日志输出中打码（***）。不能硬编码在 yml 中。' },
      { id: 366, difficulty: 2, question: 'Vite 项目的 base 配置和部署路径的关系？', options: ['无关', 'base 配置决定资源引用的根路径。部署到 GitHub Pages（如 /my-app/）需设 base: "/my-app/" 否则资源 404', '自动配置', '只影响开发'], answer: 1, explanation: 'base="/my-app/" → 构建时所有资源路径前加 /my-app/。部署到域名子路径时必须配置。部署到根域名则 base: "/"。' },
      { id: 367, difficulty: 3, question: '生产部署前应该做哪些检查？（构建产物检查清单）', options: ['直接部署', '1) npm run build 成功 2) 预览构建产物（npm run preview）3) 检查资源路径 4) 检查文件大小 5) Lighthouse 审计 6) 检查环境变量', '只检查代码', '不用检查'], answer: 1, explanation: '本地预览 dist 目录（npx serve dist）验证资源路径、API 请求地址、环境变量是否都正确。小问题本地发现比部署后修更快。' },
      { id: 368, difficulty: 3, question: 'tree-shaking 具体如何工作的？为什么 CommonJS 不支持？', options: ['随机删除', '静态分析 import/export 构建依赖图→标记未被引用的导出→Rollup/Webpack 删除这些未使用代码。CommonJS 的 require 是动态的不确定性让它无法静态分析', '压缩代码', '只有 Webpack 支持'], answer: 1, explanation: 'ES Module 的 import/export 在编译时就能确定依赖关系（静态）。Tree-shaking = 将未使用的导出"摇掉"。require() 可以在 if 中调用（动态）→打包工具无法确定是否真的不需要。' },
      { id: 369, difficulty: 2, question: '打包时 vendor chunk 和 app chunk 的区别？为什么拆分？', options: ['完全相同', 'vendor = 第三方库（Vue/Router/Pinia）独立成 chunk 利用浏览器缓存（库不常更新）。app = 业务代码频繁更新。分开后用户只需下载变化的 app chunk', '不需要拆分', 'vendor 更快'], answer: 1, explanation: '第三方库更新频率低 → 浏览器缓存 vendor chunk 长期有效。业务代码每次部署都变 → 用户只需下载变化的 app chunk。显著减少二次访问加载时间。' },
      { id: 370, difficulty: 3, question: '多环境（开发/测试/生产）下如何管理不同的 API 地址？', options: ['硬编码', '.env.development 设 VITE_API_URL=http://localhost:3000；.env.production 设 VITE_API_URL=https://api.example.com。代码中用 import.meta.env.VITE_API_URL', '每次手动改', '用 if/else'], answer: 1, explanation: 'Vite 按模式加载 .env 文件（development/production）。代码中统一用环境变量引用 API 地址。不同环境自动切换正确地址。' },
      { id: 371, difficulty: 3, question: '自动化部署到 GitHub Pages 的 workflow 关键步骤？', options: ['只有 push 代码', '1) checkout 代码 2) setup Node 3) npm ci 4) npm run build 5) 部署 dist 到 gh-pages 分支（用 peaceiris/actions-gh-pages）', '手动 FTP 上传', '用 Jenkins'], answer: 1, explanation: 'GitHub Actions workflow：checkout → 安装 Node → 安装依赖 → 构建 → 将构建产物推送到 gh-pages 分支。GitHub Pages 自动读取该分支的内容。' },
      { id: 372, difficulty: 2, question: 'npm run build 产出的 JS 文件名带 hash（如 index-a1b2c3.js）的目的是？', options: ['好看', '文件内容变化 → hash 变化 → 新文件名 → 浏览器强制重新下载。内容不变 → hash 不变 → 浏览器使用缓存。完美利用浏览器缓存策略', '安全', '随机字符串'], answer: 1, explanation: '内容哈希 = 长效缓存策略。文件名随内容变化：改了 → 新 hash → 浏览器下载新文件。没改 → 旧 hash → 浏览器用缓存（304 Not Modified）。' },
    ],
  };
  data.levels.push(l4);

  writeQuiz('engineering.yaml', data);
  console.log('engineering.yaml: 新增 ' + (l1.length + l2.length + l3.length + l4.questions.length) + ' 题，总计 ' + data.levels.reduce((s, l) => s + l.questions.length, 0) + ' 题');
}

// ======================================================================
// 4. ai-collab.yaml (20 → 41 questions)
// ======================================================================
function expandAiCollab() {
  const data = readQuiz('ai-collab.yaml');

  // Add to Level 1: AI 认知 (5 → 9)
  const l1 = [
    { id: 470, difficulty: 1, question: 'AI 编程助手（如 GitHub Copilot）和通用 AI（如 ChatGPT）在使用场景上有什么区别？', options: ['完全相同', 'Copilot 嵌入 IDE 实时补全代码（行级/函数级）。ChatGPT 适合对话式问答、解释、架构讨论。两者互补', 'Copilot 更强', 'ChatGPT 替代 Copilot'], answer: 1, explanation: 'Copilot 在编辑器内实时补全→适合写代码时快速完成。ChatGPT 对话→适合问为什么、怎么设计。结合使用：Copilot 写代码 ChatGPT 做代码审查和方案讨论。' },
    { id: 471, difficulty: 1, question: 'AI 的上下文窗口（Context Window）是什么？对对话有什么影响？', options: ['不知道', '上下文窗口 = AI 能"记住"的对话量上限（按 token 计）。超出后前面的内容会被"忘记"，可能导致 AI 丢失重要约束', '无限', '影响很小'], answer: 1, explanation: '每次对话有一定 token 上限（如 128K）。对话越长 AI 越可能忘记开头的内容。控制对话聚焦一个主题、不塞无关信息、必要时开新对话。' },
    { id: 472, difficulty: 1, question: '应该让 AI 直接操作你的代码仓库吗？', options: ['完全可以', '谨慎——AI 可能误解意图做出错误修改。更安全：让 AI 给出修改建议，人审查后再手动应用。或使用版本控制随时可回退', 'AI 不会犯错', 'AI 不支持'], answer: 1, explanation: 'AI 不了解你的全部项目上下文→可能改错文件、引入 bug、破坏已有功能。让 AI 建议修改方案，人审查后再应用。Git 版本控制是安全网。' },
    { id: 473, difficulty: 1, question: '为什么给 AI 设定角色（"你是一个前端专家"）有效？', options: ['只是客套', '角色设定影响 AI 的输出风格和知识范围。"前端专家"会让 AI 使用更专业的术语、更准确的技术细节、更合适的代码风格', 'AI 真的有角色', '不影响'], answer: 1, explanation: '系统提示词中的角色设定引导 AI 的"人格"。设置合适的角色 → AI 更倾向于使用该领域的知识库和表达方式 → 回答更相关更专业。' },
  ];
  data.levels[0].questions.push(...l1);

  // Add to Level 2: Prompt 工程 (7 → 11)
  const l2 = [
    { id: 474, difficulty: 2, question: '什么是 Few-shot Prompting？什么时候用？', options: ['很少用 AI', '在 Prompt 中给 AI 几个输入→输出的示例（2-5 个）让 AI 理解期望格式。适合需要特定输出格式或风格的场景', '单次对话', '随机'], answer: 1, explanation: 'Few-shot = 给示例：输入A→输出A，输入B→输出B，现在请处理输入C。AI 从示例中学习格式和规则。适合：分类、特定格式输出、代码风格统一。' },
    { id: 475, difficulty: 2, question: 'Chain of Thought（思维链）Prompting 是什么？什么时候有效？', options: ['长对话', '让 AI "一步步思考"再给答案。如"先分析需求→再列出方案→最后选最佳实现"。适合需要推理的复杂问题', '短 prompt', '只用于数学'], answer: 1, explanation: 'CoT：引导 AI 展示推理过程而非直接给答案。推理过程让 AI 更准确（减少跳跃错误）。复杂调试、架构设计、多步骤问题时特别有效。' },
    { id: 476, difficulty: 2, question: 'Prompt 中给 AI 正例和反例哪个更有效？', options: ['只给正例', '正例（"我要这样的"）明确目标格式。反例（"不要这样的"）防止常见错误。两者结合最有效', '只给反例', '都不需要'], answer: 1, explanation: '正例 = 目标。反例 = 常见陷阱。组合："用这种格式（正例），不要用那种（反例），注意别犯 XX 错误"。让 AI 同时知道做什么和不做什么。' },
    { id: 477, difficulty: 2, question: 'AI 写出明显有 bug 的代码→第一反应应该是什么？', options: ['放弃用 AI', '不立即否定——先指出具体问题→让 AI 修复→看 AI 能否理解并改正。如果反复出错考虑换思路或拆解问题', '直接不用', '自己重写'], answer: 1, explanation: 'AI 写错很正常——可能理解有偏差或训练数据有缺陷。明确描述错误（"第 X 行这里应该是 Y 不是 Z"）让 AI 修正。迭代比一次否定效果好。' },
  ];
  data.levels[1].questions.push(...l2);

  // Add to Level 3: 全流程协作 (9 → 12)
  const l3 = [
    { id: 478, difficulty: 3, question: '用 AI 做 Code Review 的流程？AI 擅长/不擅长发现什么问题？', options: ['让 AI 全权审查', '流程：贴 diff → AI 分析→人审查 AI 的发现。AI 擅长：代码风格、明显逻辑错误、潜在 null/undefined、遗漏的边界条件。不擅长：业务逻辑正确性、架构合理性', 'AI 审查就够了', '不需要审查'], answer: 1, explanation: 'AI 能快速发现语法错误、未处理的异常、常见反模式。但业务逻辑是否正确、架构是否合理仍需人判断。AI 做初筛人做终审。' },
    { id: 479, difficulty: 3, question: '什么时候不应该用 AI 写代码？', options: ['任何时候都应该用', '1)安全关键代码（加密/认证）2)需要深度业务理解 3)高度创新的算法 4)你完全看不懂 AI 输出的代码。AI 辅助不是 AI 代劳', '从不限制', '只有教学场景'], answer: 1, explanation: '安全相关（密码学/权限）AI 可能引入漏洞。核心业务逻辑 AI 不理解上下文。看不懂的代码 = 你无法维护。原则：你必须能理解和承担后果的代码才让 AI 帮忙写。' },
    { id: 480, difficulty: 3, question: '用 AI 重构代码 vs 用 AI 写新代码→策略有什么不同？', options: ['完全相同', '重构：先让 AI 理解现有代码→明确重构目标（"提取这个逻辑到独立函数但保持行为不变"）→更需要验证（行为不应改变）。写新代码：定义接口和约束即可', '重构更难', '新代码更难'], answer: 1, explanation: '重构的关键挑战是保持行为不变。给 AI 现有代码→说明改什么→强调"不要改变行为"→最好有测试验证。新代码只需描述需求+约束。' },
  ];
  data.levels[2].questions.push(...l3);

  // Add Level 4: Prompt 工程进阶
  const l4 = {
    level: 4,
    type: 'boss',
    threshold: 60,
    name: 'Prompt 工程进阶',
    questions: [
      { id: 481, difficulty: 3, question: 'Prompt 模板化（Prompt Template）的作用？如何复用？', options: ['没有用', '将常用 Prompt 结构设计成模板：角色+上下文+任务+格式+示例。变量部分用 {项目名} 替换。积累后形成个人 Prompt 库提升效率', '太麻烦', 'AI 自动生成'], answer: 1, explanation: '重复任务（代码审查、测试生成）设计固定 Prompt 模板。每次只需填入具体项目名和文件路径。效率提升明显且输出质量一致。' },
      { id: 482, difficulty: 3, question: 'AI 输出的代码太长→如何引导 AI 给出更精简的结果？', options: ['只能接受', '明确约束："只需给出核心实现不包含 import/样板代码"或"只改写 XX 函数其余省略"。用"..."或//existing code...标记省略部分', 'AI 不会精简', '重开对话'], answer: 1, explanation: 'Prompt 中加格式约束："输出只有改动的代码块""不要写完整的组件只给改动部分"。引导 AI 聚焦变化而非啰嗦整体。' },
      { id: 483, difficulty: 2, question: 'System Prompt 和 User Prompt 的区别？在 AI 工具中怎么体现？', options: ['完全相同', 'System 设定 AI 的行为规则（"你是前端专家"）全局生效。User 是每次具体问题。通常工具在后台设 System，你每次输入的是 User', '只有 User', '只有 System'], answer: 1, explanation: 'System Prompt 定义角色和基础规则（工具/平台预先设置）。User Prompt 是你每次的具体请求。你可以在 User Prompt 中追加角色设定覆盖或增强。' },
      { id: 484, difficulty: 2, question: '逆向 Prompt（Reverse Prompting）是什么技术？', options: ['反向提问', '让 AI 根据输出反推需要什么样的 Prompt。如给一段好代码→让 AI"写出能生成这段代码的 Prompt"。用于学习和改进自己的 Prompt 技能', 'AI 问用户', '反向工程'], answer: 1, explanation: '看到好输出→让 AI 分析"什么样的输入能得到这个输出"。通过 AI 的自我分析学习 Prompt 技巧。积累经验后自己也能写出好 Prompt。' },
      { id: 485, difficulty: 3, question: '多轮对话中如何防止 AI "漂移"（逐渐偏离原始需求）？', options: ['无法防止', '在每轮对话开头重申核心约束；发现漂移时用"回到正题"拉回；必要时重开对话并总结前半段的关键信息', 'AI 不会漂移', '接受漂移'], answer: 1, explanation: '长对话中 AI 容易逐渐忘记/弱化初始约束。应对：关键约束重复提醒、COT 让 AI 自检是否符合要求、适时总结"我们进行到 X，接下来做 Y"。' },
      { id: 486, difficulty: 3, question: '何时该开新对话而不是在同一个对话中继续？', options: ['从不', '1)话题完全不同 2)当前对话已很长 AI 开始遗忘 3)之前的约束不再需要并会干扰新任务 4)AI 反复犯同样错误进入僵局', '总是开新'], answer: 1, explanation: '新对话 = 清空上下文 = AI 丢掉所有之前的约束和错误。适合：切换到不相关的任务、对话太长导致质量下降、需要全新视角重新审视问题。' },
      { id: 487, difficulty: 3, question: '用 AI 学习新技术栈的最佳策略？', options: ['让 AI 全教', '三步：1)让 AI 给学习路线和核心概念 2)照着写代码遇到问题问 AI 3)让 AI 出题检验理解。AI 加速理解但不能替代动手实践', '只看 AI 就够了', '传统教程最好'], answer: 1, explanation: 'AI 提供个性化讲解和即时答疑比静态教程灵活。但动手写代码是核心——AI 帮你理解但无法替你的大脑建立神经连接。' },
      { id: 488, difficulty: 2, question: '结构化 Prompt（XML/JSON tag 分隔）有什么好处？', options: ['只是装饰', '用 <context></context><task></task><format></format> 等标签分隔 Prompt 的不同部分→AI 理解更准确→输出更可控', 'AI 不需要', '太复杂'], answer: 1, explanation: '结构化标签让 AI 清晰区分"背景信息"和"任务要求"。减少 AI 混淆。尤其适合需要多种不同类型输入的复杂 Prompt。' },
      { id: 489, difficulty: 3, question: 'AI 协作的核心原则（3 条）？', options: ['AI 可以做一切', '1)人是决策者 AI 是执行者 2)永远审查 AI 的输出（代码/方案）3)迭代而非一次完成——好结果来自多轮对话', 'AI 全自动', 'AI 只是玩具'], answer: 1, explanation: '铁三角原则：人决策（需求/架构/验收）→ AI 执行（写代码/查资料/解释）→ 人审查（测试/检查/优化）。多轮迭代让结果越来越好。' },
      { id: 490, difficulty: 2, question: 'AI "承认不知道" vs "自信地瞎编"——如何识别和应对？', options: ['AI 不会瞎编', 'AI 几乎不会说不知道——它会编造看似可信的错误答案。识别：答案太绝对、API/函数名你没见过、和官方文档不同。验证：查官方文档、实际测试代码', 'AI 总是正确', '太复杂无法识别'], answer: 1, explanation: 'AI 的核心弱点：如果事实不在训练数据中→AI 不会说"我不知道"→而是"填补空白"编造看似合理的内容。健康怀疑 + 官方文档验证 = 唯一防线。' },
    ],
  };
  data.levels.push(l4);

  writeQuiz('ai-collab.yaml', data);
  console.log('ai-collab.yaml: 新增 ' + (l1.length + l2.length + l3.length + l4.questions.length) + ' 题，总计 ' + data.levels.reduce((s, l) => s + l.questions.length, 0) + ' 题');
}

// ======================================================================
// 5. performance.yaml (21 → 41 questions)
// ======================================================================
function expandPerformance() {
  const data = readQuiz('performance.yaml');

  // Add to Level 1: 性能概念 (4 → 8)
  const l1 = [
    { id: 530, difficulty: 1, question: 'TTFB（Time to First Byte）是什么？由什么因素影响？', options: ['首屏时间', '浏览器收到服务器第一个字节的时间。受服务器处理速度、网络延迟、DNS 解析影响', 'JS 执行时间', 'CSS 加载时间'], answer: 1, explanation: 'TTFB = 发起请求到收到第一个响应字节。慢的原因：服务器处理慢、CDN 远、数据库查询慢、未启用缓存。好的 TTFB < 800ms。' },
    { id: 531, difficulty: 1, question: 'FCP（First Contentful Paint）和 LCP 的区别？', options: ['完全相同', 'FCP = 页面首次渲染任何内容（可能是不重要的元素）。LCP = 最大可见元素（主要内容）渲染完成。LCP 更能体现用户感知的加载速度', 'FCP 更重要', 'LCP 不重要'], answer: 1, explanation: 'FCP 是"看到东西了"——可能只是个加载图标。LCP 是"主要内容可见了"——如文章标题、产品大图。LCP 对用户体验影响更大。' },
    { id: 532, difficulty: 1, question: 'TBT（Total Blocking Time）衡量什么？', options: ['下载时间', 'FCP 和 TTI 之间主线程被长任务（>50ms）阻塞的总时间。反映页面交互响应的延迟', '渲染时间', '网络速度'], answer: 1, explanation: 'TBT = 页面看起来可交互了但 JS 还在执行长任务→用户点击没反应。长任务越多 TBT 越大→用户感知的"卡顿"越严重。' },
    { id: 533, difficulty: 1, question: '什么是关键渲染路径（Critical Rendering Path）？', options: ['不重要', '浏览器从收到 HTML 到首次渲染屏幕的步骤链：HTML→DOM→CSSOM→渲染树→布局→绘制。优化它=优化首屏速度', '服务器路径', 'JS 执行'], answer: 1, explanation: '关键渲染路径 = 首屏必经的浏览器处理步骤。优化策略：减少关键资源数、压缩关键资源体积、减少关键字节往返次数。' },
  ];
  data.levels[0].questions.push(...l1);

  // Add to Level 2: 加载优化 (7 → 11)
  const l2 = [
    { id: 534, difficulty: 2, question: 'link rel="preload" 和 rel="prefetch" 的区别？', options: ['完全相同', 'preload = 当前页面立即需要的资源（优先级高）如关键字体。prefetch = 未来导航可能需要的资源（低优先级）如下一页的 JS', 'prefetch 更快', 'preload 已废弃'], answer: 1, explanation: 'preload 告诉浏览器"这个资源现在就需要"→尽早下载。prefetch 告诉浏览器"空闲时下载这个可能以后用到的资源"。两者分开避免抢占带宽。' },
    { id: 535, difficulty: 2, question: '资源提示（Resource Hints）有哪些？各自用途？', options: ['只有 preload', 'preload（立即加载）/prefetch（未来加载）/preconnect（提前建立连接）/dns-prefetch（提前 DNS 解析）。组合使用优化加载时序', '不需要', '已废弃'], answer: 1, explanation: 'preconnect：提前 TCP+TLS 握手（如连接第三方 API）。dns-prefetch：提前 DNS 解析。preload：立即下载。prefetch：空闲下载。合理组合大幅缩短加载时间。' },
    { id: 536, difficulty: 2, question: 'Webpack/Vite 的 Magic Comments 对代码分割有什么作用？', options: ['只是注释', '动态 import 中用 /* webpackChunkName: "my-chunk" */ 给分割的 chunk 命名。方便调试和分析打包产物', '没有作用', '自动命名'], answer: 1, explanation: 'import(/* webpackChunkName: "dashboard" */ "./Dashboard.vue")。没有 Magic Comment chunk 文件名是随机数字 ID。有名字后在 Network 面板中方便识别。' },
    { id: 537, difficulty: 2, question: 'CDN 加速的原理？为什么静态资源适合 CDN？', options: ['压缩文件', 'CDN 将文件缓存到全球各地边缘节点→用户从最近的节点下载→减少物理距离带来的延迟。静态资源（图片/JS/CSS）内容不常变更最适合 CDN', '修改内容', '只加速动态内容'], answer: 1, explanation: 'CDN = 内容分发网络。用户在中国→从上海节点下载而非美国服务器。静态资源内容稳定→可以长时间缓存到边缘节点。动态 API 数据不适合（每个用户不同）。' },
  ];
  data.levels[1].questions.push(...l2);

  // Add to Level 3: 运行时优化 (10 → 12)
  const l3 = [
    { id: 538, difficulty: 3, question: 'Lighthouse Performance 评分高但用户说卡→可能是什么原因？', options: ['用户说谎', 'Lighthouse 是模拟环境（特定网络/CPU）。真实用户的设备/网络差异大。需要结合 RUM（真实用户监控）数据看 P75/P95 分位值', 'Lighthouse 不准', '不需要管用户反馈'], answer: 1, explanation: 'Lighthouse 在高性能电脑+快速网络下测试 → 分数高。真实用户在低端手机+3G 网络下体验完全不同。RUM 收集真实用户 Core Web Vitals 数据补充分析。' },
    { id: 539, difficulty: 3, question: 'React/Vue 的列表渲染为什么需要稳定的 key？（性能视角）', options: ['只是规范', '稳定 key 让框架在列表变化时通过 key 匹配新旧节点→判断哪些节点可复用/移动/删除。避免不必要的 DOM 重建→性能提升', '不影响性能', 'key 只是装饰'], answer: 1, explanation: '有稳定 key：列表重排时 Vue 通过 key 识别"这个 li 只是换了位置"→移动 DOM 节点。没有 key（或用 index）：Vue 认为每个节点都变了→逐个重新创建→消耗性能。' },
  ];
  data.levels[2].questions.push(...l3);

  // Add Level 4: 加载优化实战
  const l4 = {
    level: 4,
    type: 'boss',
    threshold: 60,
    name: '加载优化实战',
    questions: [
      { id: 540, difficulty: 3, question: '首屏优化：CSS 如何避免阻塞渲染？', options: ['CSS 放底部', '关键 CSS 内联在 <head> 的 <style> 中（首屏内容需要的样式）；非关键 CSS 用 media="print" onload="this.media=\'all\'" 异步加载', '删除所有 CSS', '用 JS 加载CSS'], answer: 1, explanation: 'CSS 会阻塞渲染（浏览器等 CSS 下载完才渲染）。策略：提取首屏需要的最小 CSS 内联（秒开），其余异步加载。工具：critical CSS 提取器。' },
      { id: 541, difficulty: 2, question: '图片懒加载的最佳实践是什么？', options: ['只用 loading="lazy"', '1) <img loading="lazy"> 原生支持 2) 设置 width/height 避免 CLS 3) 用低质量占位图（LQIP）4) 配合 srcset 响应式尺寸', '全部用 JS', '不加载图片'], answer: 1, explanation: 'loading=lazy 让浏览器自动判断何时加载（进入视口前）。同时设宽高→预留占位空间→防布局偏移。BlurHash/LQIP 做加载前的模糊占位提升体验。' },
      { id: 542, difficulty: 3, question: '前端缓存策略：如何设计一个不缓存的 HTML 但强缓存静态资源的方案？', options: ['全不缓存', 'HTML：Cache-Control: no-cache（每次都验证）；JS/CSS/图片：文件名带内容哈希 + Cache-Control: max-age=31536000（永不过期）。HTML 内容变了→引用新 hash 文件名→自动更新', '全强缓存', '看情况'], answer: 1, explanation: 'HTML 作为"清单"文件需要及时更新。静态资源通过 hash 实现"一次发布永不改变"→可以无限期缓存。新版本发布→HTML 引用新 hash→浏览器自动下载新资源。' },
      { id: 543, difficulty: 2, question: 'Brotli vs Gzip 压缩→前端需要关心吗？', options: ['不需要', '需要——Brotli 比 Gzip 压缩率高约 20%。配置服务器/CDN 启用 Brotli 压缩静态资源。前端代码无感知但用户下载更小文件', '只在后端用', 'Gzip 更好'], answer: 1, explanation: 'Brotli 对文本资源（JS/CSS/HTML）压缩效果更好。前端无需改代码→服务器/CDN 自动压缩→浏览器自动解压。现代 CDN 默认支持 Brotli。' },
      { id: 544, difficulty: 2, question: 'SVG 和图标字体（Icon Font）哪个更适合图标系统？性能对比？', options: ['字体更好', 'SVG：矢量无损、多色、无障碍更好、可按需加载。Icon Font：单色、整包加载（即使只用几个图标也要加载全部）。现代推荐 SVG sprite 或组件化 SVG', '完全相同', '都不好'], answer: 1, explanation: 'SVG 按需加载（tree-shaking 掉不用的图标）、支持多色、无障碍友好。Icon Font 下载整包字体文件（包含所有图标）→浪费带宽。SVG 是现代推荐。' },
      { id: 545, difficulty: 3, question: 'Virtual Scrolling（虚拟滚动）和分页（Pagination）各自的适用场景？', options: ['虚拟滚动更好', '虚拟滚动：社交媒体/聊天/日志→需要无限平滑滚动浏览。分页：搜索引擎结果/表格数据→用户需要跳到特定页或知道总数', '分页更好', '完全相同'], answer: 1, explanation: '虚拟滚动适合浏览模式（抖音/微博），用户体验无缝滚动。分页适合检索模式（Google/数据表格），用户需要翻页控制和总数感知。' },
      { id: 546, difficulty: 2, question: 'Web Worker 在前端的性能优化场景？限制是什么？', options: ['没用', '将 CPU 密集任务（大量计算、数据处理）移到 Worker 线程执行不阻塞主线程 UI。限制：无法访问 DOM、无法直接操作 ref/响应式数据', '已废弃', '替代所有 JS'], answer: 1, explanation: 'Worker 在独立线程运行→主线程保持响应。适合：CSV 解析、图片处理、加密计算。不适合：操作 DOM（根本做不到）。通过 postMessage 和主线程通信。' },
      { id: 547, difficulty: 3, question: '内存泄漏（Memory Leak）在前端的常见原因和排查方法？', options: ['不会泄漏', '原因：未清理的定时器/事件监听、全局变量持续增长、闭包引用未释放、DOM 引用残留。排查：Chrome Memory 面板→Heap Snapshot 对比→找持续增长的对象', 'JS 自动回收', '太复杂'], answer: 1, explanation: 'SPA 页面不刷新→内存累积→越来越卡。Heap Snapshot：拍两张快照（操作前/后）→对比看哪些对象增加了→定位泄漏源。常见：setInterval 未清除、addEventListener 未 remove。' },
      { id: 548, difficulty: 2, question: '性能预算（Performance Budget）是什么？为什么要有？', options: ['预算花钱', '为项目设定性能指标上限（如总 JS < 200KB、首屏 < 3s）。每次改动时检查是否超预算。防止性能随功能增长而不知不觉退化', '项目管理', '不重要'], answer: 1, explanation: '设预算 = 量化性能目标："首页 JS 不超过 150KB""LCP < 2.5s"。CI 中自动检查→超预算构建失败→迫使团队优化而非堆积。类比：花钱有预算写代码也该有性能预算。' },
      { id: 549, difficulty: 3, question: 'SSR/SSG/CSR 各适合什么场景？性能角度如何选择？', options: ['SSR 总是最好', 'SSR（服务端渲染）= 内容动态+SEO 重要（电商）。SSG（静态生成）= 内容不变+极致性能（博客/文档）。CSR（客户端渲染）= 重交互应用无需 SEO（后台管理）。按需求选一个', 'CSR 最好', '三选一即可'], answer: 1, explanation: 'SSR：每次请求服务端生成 HTML → 费服务器但首屏快。SSG：构建时生成 HTML → 速度最快但内容不实时。CSR：浏览器渲染 → 服务器简单但首屏可能慢。混合：SSG + ISR（增量静态生成）。' },
    ],
  };
  data.levels.push(l4);

  writeQuiz('performance.yaml', data);
  console.log('performance.yaml: 新增 ' + (l1.length + l2.length + l3.length + l4.questions.length) + ' 题，总计 ' + data.levels.reduce((s, l) => s + l.questions.length, 0) + ' 题');
}

// ======================================================================
// 6. security.yaml (15 → 36 questions)
// ======================================================================
function expandSecurity() {
  const data = readQuiz('security.yaml');

  // Add to Level 1: 安全概念 (3 → 7)
  const l1 = [
    { id: 560, difficulty: 1, question: '什么是中间人攻击（MITM）？HTTPS 如何防御？', options: ['服务器攻击', 'MITM = 攻击者在用户和服务器之间窃听/篡改通信。HTTPS 用 TLS 加密→即使被截获也无法解密内容', '浏览器漏洞', '无法防御'], answer: 1, explanation: 'HTTP 明文传输→咖啡厅 WiFi 下所有请求可被窃听。HTTPS 加密后即使截获数据包看到的也是密文。TLS 证书验证确保你在和真正的服务器通信。' },
    { id: 561, difficulty: 1, question: 'SQL 注入是什么？前端需要关心吗？', options: ['只后端管', 'SQL 注入是攻击者在输入中注入 SQL 代码篡改数据库查询。前端作用：输入校验+不使用拼接查询字符串。真正的防线在后端（参数化查询）', '前端不管', '自动防御'], answer: 1, explanation: '前端校验是第一道防线（如限制输入格式）。但真正的 SQL 注入防御在后端：参数化查询（Prepared Statements）把用户输入和数据查询分离。' },
    { id: 562, difficulty: 1, question: '为什么开发时也可能需要 HTTPS？', options: ['不需要', '1)某些浏览器 API 只在安全上下文可用（如 Service Worker、Geolocation）2)和线上环境一致避免部署时差异 3)一些第三方登录回调要求 HTTPS', '只在生产用', '开发用 HTTP'], answer: 1, explanation: 'Vite 可通过 server.https 或 mkcert 生成本地证书启用 HTTPS 开发。避免部署到 HTTPS 环境后才发现混合内容或 API 不可用的问题。' },
    { id: 563, difficulty: 1, question: '前端安全最基础的防御意识是什么？', options: ['不管安全', '不信任任何用户输入——所有输入都可能被恶意构造。前端过滤是 UX，后端校验是真正的安全防线', '只信正则', '完全阻止输入'], answer: 1, explanation: '安全第一原则：用户输入是不可信的。XSS、CSRF、SQL 注入都源自信任了"看起来正常"的输入。前端过滤（即时反馈），后端验证（安全底线）。' },
  ];
  data.levels[0].questions.push(...l1);

  // Add to Level 2: 常见攻击 (5 → 9)
  const l2 = [
    { id: 564, difficulty: 2, question: 'CORS（跨域资源共享）是安全机制还是绕过同源策略？', options: ['安全漏洞', 'CORS 是浏览器同源策略的"受控放宽"——服务器通过 Access-Control-Allow-Origin 头告诉浏览器哪些源可以访问。是安全机制的一部分', '绕过机制', '已废弃'], answer: 1, explanation: '同源策略默认禁止跨域请求。CORS 是服务器主动声明"允许 XX 来源访问"。浏览器执行 CORS 检查。不是绕过而是授权机制。注意：CORS 是浏览器行为服务器端无限制。' },
    { id: 565, difficulty: 2, question: 'Preflight 请求是什么？什么时候触发？', options: ['所有请求', '复杂跨域请求（PUT/DELETE/自定义头/非简单 Content-Type）浏览器先发送 OPTIONS 预检请求确认服务器允许后再发正式请求', '简单请求', 'GET 请求'], answer: 1, explanation: '简单请求（GET/POST/简单头）直接发送。复杂请求先发 OPTIONS 预检→服务器返回允许的方法和头→浏览器确认后发正式请求。预检会缓存一段时间。' },
    { id: 566, difficulty: 2, question: 'DOMPurify 这类库解决什么安全问题？', options: ['CSS 安全', '清理（sanitize）HTML 字符串——移除 <script>、onerror 等危险标签和属性。安全地使用 innerHTML 或富文本编辑器', 'JS 压缩', '替代原生'], answer: 1, explanation: '用户提交的富文本可能含 <script>alert(1)</script>。DOMPurify 只保留安全的 HTML 标签和属性移除所有 XSS 攻击向量。富文本编辑器必备。' },
    { id: 567, difficulty: 2, question: 'iframe 安全：sandbox 属性的作用？', options: ['加速加载', 'sandbox 属性限制 iframe 的行为：禁止脚本执行、禁止表单提交、禁止弹窗、禁止访问父页面等。按需添加允许项（allow-scripts allow-same-origin）', '只是样式', '已废弃'], answer: 1, explanation: '嵌入不可信内容（如用户生成的 HTML、第三方广告）时 sandbox 提供隔离。默认最严格（禁止一切），逐个放开需要的权限。最小权限原则。' },
  ];
  data.levels[1].questions.push(...l2);

  // Add to Level 3: 防御实战 (7 → 10)
  const l3 = [
    { id: 568, difficulty: 3, question: 'Cookie 属性 Secure、HttpOnly、SameSite 各自的作用？', options: ['都是装饰', 'Secure=仅 HTTPS 传输；HttpOnly=JS 无法读取防 XSS 窃取；SameSite=控制跨站请求是否附带 Cookie 防 CSRF。三者组合最强防护', '只需要 Secure', '不需要设置'], answer: 1, explanation: 'Secure → 防 MITM 窃听。HttpOnly → XSS 拿到 Cookie 也无法读取。SameSite=Strict → CSRF 攻击无法附带 Cookie。一个 Cookie 最好三个属性都设。' },
    { id: 569, difficulty: 3, question: '前端加密有意义吗？比如密码在前端哈希后再发送？', options: ['很有意义', 'HTTPS 已经加密传输→前端哈希意义不大（JS 中的哈希算法对攻击者可见）。正确做法：HTTPS 传输 + 服务端用 bcrypt/argon2 哈希存储。前端加密不能替代后端安全', '必须前端加密', '不需要 HTTPS'], answer: 1, explanation: 'HTTPS 保证传输加密（中间人看不到明文）。前端哈希：攻击者可看到哈希算法→离线破解。服务端 bcrypt：加盐 + 慢哈希 → 暴力破解成本极高。' },
    { id: 570, difficulty: 3, question: 'Content-Security-Policy 的基本语法和常见策略？', options: ['太复杂不需要', 'default-src "self"; script-src "self"; style-src "self" "unsafe-inline"; img-src *。定义各资源类型允许的来源。逐步收紧比不设好', '只用默认', 'CSP 过时了'], answer: 1, explanation: 'CSP 头定义资源白名单。default-src "self"=只加载同源资源。script-src 控制 JS 来源（配合 nonce/hash 允许内联脚本）。从 Report-Only 模式开始逐步收紧。' },
  ];
  data.levels[2].questions.push(...l3);

  // Add Level 4: 前端安全实战
  const l4 = {
    level: 4,
    type: 'boss',
    threshold: 60,
    name: '前端安全实战',
    questions: [
      { id: 571, difficulty: 3, question: 'CORS 配置错误：Access-Control-Allow-Origin: * 有什么风险？', options: ['无风险', '允许任何网站跨域访问你的 API→恶意网站可通过 JS 以用户身份请求你的 API→CSRF 风险。生产环境应指定具体的允许源而非通配符', '最安全', '必须用 *'], answer: 1, explanation: 'CORS *=任何网站都可以从浏览器访问你的 API。结合用户已登录的 Cookie→攻击者可以伪造请求。生产环境限制具体域名。通配符只在公开 API（不需认证）时使用。' },
      { id: 572, difficulty: 2, question: '前端重定向（window.location.href）的安全注意事项？', options: ['直接设置', '1)不要从 URL 参数中直接取 redirect URL（开放重定向漏洞）2)验证目标 URL 是否在白名单内 3)或只用相对路径重定向到本站页面', '只在本站', '用 a 标签'], answer: 1, explanation: '// 危险：location.href = getParam("redirect")→攻击者构造 redirect=https://evil.com→钓鱼。必须验证 redirect URL 的域名是否在允许列表中。' },
      { id: 573, difficulty: 3, question: 'JWT Token 存储方案对比：localStorage vs Cookie vs 内存？', options: ['localStorage 最好', 'localStorage→XSS 可窃取。httpOnly Cookie→XSS 无法读取但 CSRF 风险（配合 SameSite）。内存→最安全但刷新丢失。权衡：短期 Token 放内存+Refresh Token 用 httpOnly Cookie', 'Cookie 最好', '不需要 Token'], answer: 1, explanation: '安全三角形：localStorage（方便但不安全）、httpOnly Cookie（安全但有 CSRF 风险需 SameSite）、内存（最安全但 UX 差）。常见方案：access token 在内存 + refresh token 在 httpOnly Cookie。' },
      { id: 574, difficulty: 2, question: 'target="_blank" 的安全风险？如何修复？', options: ['无风险', '新打开的页面可通过 window.opener 访问原页面的 window 对象（tabnabbing）。修复：rel="noopener noreferrer" 切断连接', '已过时', '不用 _blank'], answer: 1, explanation: '不加 rel="noopener"→新页面可执行 window.opener.location = "https://phishing.com" 将原页面重定向到钓鱼网站。现代浏览器建议默认加 rel="noopener"。' },
      { id: 575, difficulty: 3, question: '第三方脚本（广告/分析/聊天插件）的安全风险？如何缓解？', options: ['无风险', '第三方脚本可访问页面的 DOM/Cookie/用户输入→数据泄漏。缓解：1)尽量用子资源完整性(SRI)2)最小权限3)用 iframe 沙箱隔离 4)评估必要性和替代方案', '不需要第三方', '完全信任'], answer: 1, explanation: '加载的第三方 <script> 有和你的 JS 一样的权限。Google Analytics 能看到所有 DOM。缓解：SRI 验证脚本完整性、iframe 隔离（如通过 postMessage 通信）、定期审查第三方。' },
      { id: 576, difficulty: 3, question: '正则表达式 ReDoS（正则拒绝服务）攻击是什么？如何防范？', options: ['不存在', '恶意构造的输入让正则表达式回溯爆炸→CPU 100% 页面卡死。防范：避免嵌套量词（如 (a+)+）、对用户输入用简单正则、设置超时、用安全的正则库', '无需防范', '只用简单正则'], answer: 1, explanation: "/(a+)+b/.test('aaaaaaaaaaaaaaaaaaaaaaaaaaaaac') → 指数级回溯 → 页面冻结。用户输入永远不能用复杂正则验证。邮箱/URL 验证用标准库而非手写复杂正则。" },
      { id: 577, difficulty: 2, question: 'HTTPS 页面中加载 HTTP 资源（混合内容）会发生什么？', options: ['正常加载', '浏览器阻止主动混合内容（HTTP 的 JS/CSS/iframe）→页面功能可能异常。被动混合内容（HTTP 图片/视频/音频）可能显示但地址栏不显示锁图标', '自动升级', '没区别'], answer: 1, explanation: 'HTTPS 页面引用 HTTP 脚本→浏览器阻止加载（控制台报 Mixed Content 错误）。HTTP 图片可以显示但浏览器标记"不安全"。解决方案：所有资源用 HTTPS 或用协议相对 URL（//）。' },
      { id: 578, difficulty: 2, question: '依赖安全性：npm 包的供应链攻击防范措施？', options: ['不管', '1) npm audit 定期检查 2) 审核包的维护状态（最近更新/star/issue）3) 锁定版本（lock 文件）4) 减少依赖数 5) 用 Snyk/Dependabot 自动监控', '只看下载量', '不用第三方'], answer: 1, explanation: '供应链攻击：恶意包伪装成流行包、篡改包更新、依赖的依赖被植入恶意代码。多层防御：定期审计 + 自动监控 + 减少依赖 + 代码审查。' },
      { id: 579, difficulty: 3, question: '前端安全的"纵深防御"（Defense in Depth）是什么意思？', options: ['只用一层防护', '多层安全防线：CSP 头 + XSS 过滤 + httpOnly Cookie + 输入校验 + 输出转义 + HTTPS。单层被突破仍有其他层保护', '太复杂', '只依赖后端'], answer: 1, explanation: '不依赖单一防线。CSP 可能被绕过→内容过滤兜底。XSS 过滤可能有遗漏→httpOnly Cookie 保护。输入校验可能不完整→输出转义是最后防线。层层设防更安全。' },
      { id: 580, difficulty: 2, question: '敏感信息（API Key/Token）为什么不能出现在前端代码中？', options: ['可以放', '前端代码是公开的——任何人打开 DevTools/Sources 面板就能看到。即使用环境变量只是构建时替换最终仍在打包产物中。敏感信息必须放在服务端', '加密就行', '混淆就行'], answer: 1, explanation: '浏览器中的所有代码都是公开的。webpack 的 DefinePlugin/Vite 的 import.meta.env 在构建时将环境变量值直接内联进代码。任何人都能查看。敏感 Key 只放服务端由服务端 API 代理调用。' },
    ],
  };
  data.levels.push(l4);

  writeQuiz('security.yaml', data);
  console.log('security.yaml: 新增 ' + (l1.length + l2.length + l3.length + l4.questions.length) + ' 题，总计 ' + data.levels.reduce((s, l) => s + l.questions.length, 0) + ' 题');
}

// ======================================================================
// 7. testing.yaml (15 → 36 questions)
// ======================================================================
function expandTesting() {
  const data = readQuiz('testing.yaml');

  // Add to Level 1: 测试概念 (3 → 7)
  const l1 = [
    { id: 590, difficulty: 1, question: '什么是测试用例？一个好的测试用例包含什么？', options: ['只有一段代码', '测试用例 = 给定输入（Arrange）→ 执行操作（Act）→ 断言输出（Assert）。AAA 模式：准备数据→调用被测函数→验证结果是否符合预期', '只断言', '只准备数据'], answer: 1, explanation: 'AAA 模式：Arrange（准备测试数据和环境）→ Act（执行被测代码）→ Assert（验证结果）。清晰的测试遵循这个结构可读性高。' },
    { id: 591, difficulty: 1, question: '什么是回归测试（Regression Test）？', options: ['新功能测试', '确保代码改动没有破坏已有功能的测试。每次改动后跑全部已有测试→所有测试仍通过→没引入新 bug', '性能测试', '安全测试'], answer: 1, explanation: '改了 A 功能→不小心破坏了 B 功能 = 回归 bug。完整的测试套件在每次改动后自动运行→立即发现回归问题。CI 中自动跑测试是防止回归的关键机制。' },
    { id: 592, difficulty: 1, question: '前端测试中 shallow mount 和 full mount 的区别？', options: ['完全相同', 'shallow：只渲染被测组件本身，子组件不渲染（用 stub 代替）。full mount：渲染组件及其所有子组件。shallow 更快的隔离测试', 'full 更快', 'shallow 已废弃'], answer: 1, explanation: 'shallow mount 只关心被测组件本身的行为不受子组件影响（单元测试）。full mount 测试组件之间的交互（集成测试）。按测试目的选择。' },
    { id: 593, difficulty: 1, question: '测试环境（jsdom）和真实浏览器的区别？', options: ['完全相同', 'jsdom 模拟浏览器 DOM API（无渲染/布局/触摸事件）。适合组件逻辑测试。E2E 测试需要真实浏览器（Playwright/Cypress）验证渲染和用户交互', 'jsdom 更好', '不需要浏览器'], answer: 1, explanation: 'jsdom：纯 JS 实现 DOM API→快但无法测试视觉/布局。适合：组件逻辑、点击事件模拟。不适合：CSS 动画、响应式布局、真实用户交互→需要真实浏览器。' },
  ];
  data.levels[0].questions.push(...l1);

  // Add to Level 2: 测试类型 (5 → 9)
  const l2 = [
    { id: 594, difficulty: 2, question: '集成测试和单元测试的边界在哪？具体例子？', options: ['无边界', '单元测试：测试一个纯函数（如 sum(a,b)）。集成测试：测试多个模块协作（如点击按钮→调用 API mock→渲染结果）。边界是"是否涉及多个模块交互"', '完全相同', '集成已废弃'], answer: 1, explanation: '单元 = 最小可测单元独立验证。集成 = 模块之间的接口和交互验证。例子：单元测试"API 响应解析函数"，集成测试"从点击到数据渲染的完整流程（mock API）"。' },
    { id: 595, difficulty: 2, question: '什么是测试替身（Test Double）？Dummy/Stub/Mock/Spy/Fake 的区别？', options: ['没有分类', 'Dummy=只填充参数不用；Stub=预设返回值不验证调用；Mock=预设期望并验证是否被调用；Spy=记录调用但不改变行为；Fake=简化实现（如内存数据库）', '只有 Mock', '都相同'], answer: 1, explanation: 'Stub：简单替代（"问你要数据返回固定值"）。Mock：有期望的替代（"必须被调用一次且参数为 X"）。Fake：真实替代但简化（"内存数据库代替真实数据库"）。按场景选择。' },
    { id: 596, difficulty: 2, question: '测试的可读性为什么比代码的可读性更重要？', options: ['可读性不重要', '测试是"活文档"——描述系统应该做什么。比代码有更长的生命周期。不可读的测试=死代码（没人敢改也没人理解）。代码写一次读百次，测试同样', '代码更重要', '都不重要'], answer: 1, explanation: '失败时先看测试名和断言理解"什么应该发生"。清晰测试=即时理解。模糊测试=花时间破译意图。测试的读者比代码的读者更频繁（每次 CI 失败都要看）。' },
    { id: 597, difficulty: 2, question: '为什么测试也应该是 DRY 的但不要过度抽象？', options: ['不 DRY 更好', '适度 DRY：抽取重复的 setup 代码到 beforeEach/工厂函数。但不要过度抽象→测试太抽象变得不可读。测试中的"重复"有时是必要的信息清晰度', '完全 DRY', '无原则'], answer: 1, explanation: 'beforeEach 抽取共同 setup（好）。把"点击按钮"封装成 clickSubmitAndWait()（可能过度）→抽象泄漏时加参数→越来越复杂。测试中适度的"湿"代码比过度的"干"代码更可读。' },
  ];
  data.levels[1].questions.push(...l2);

  // Add to Level 3: 测试策略 (7 → 10)
  const l3 = [
    { id: 598, difficulty: 3, question: 'TDD 的实践难点是什么？什么时候不适合 TDD？', options: ['TDD 总是适用', '难点：先写测试要求对设计有清晰预期（探索性开发时不确定）。不适合：UI 原型/快速试错阶段/需求频繁变化时。TDD 适合核心逻辑和有明确规格的功能', '总是适合', '从不适合'], answer: 1, explanation: 'TDD 在需求明确时强（API 接口/工具函数/核心算法）。UI 试错阶段不适合（设计还在变→测试和代码一起废）。实践中灵活：核心逻辑 TDD + UI 层手工测试。' },
    { id: 599, difficulty: 3, question: '如何测试异步错误处理（catch 分支）？', options: ['不测错误', '用 mockRejectedValue 或 await expect(promise).rejects.toThrow()。确保 reject 路径的错误处理逻辑也被测试覆盖', '只测成功', '错误不测'], answer: 1, explanation: '成功路径 + 错误路径 = 完整测试。模拟 API 失败→断言错误提示是否正确展示。很多人只测成功不测失败→错误处理逻辑是盲区。' },
    { id: 600, difficulty: 3, question: '测试和类型系统（TypeScript）的关系：有 TS 还需要测试吗？', options: ['TS 代替测试', 'TS 防止类型错误（实参类型不对等）但不能替代测试。测试验证业务逻辑正确性（计算结果对不对）。两者互补：TS 消除一类 bug，测试验证行为', '有 TS 就够了', '互斥'], answer: 1, explanation: 'TS 告诉你"函数接受 number 但传了 string"（编译时）。测试告诉你"计算结果和预期一致"（运行时）。TS 不能验证"1+1=2"只能验证"1+1 返回 number"。' },
  ];
  data.levels[2].questions.push(...l3);

  // Add Level 4: 实战测试
  const l4 = {
    level: 4,
    type: 'boss',
    threshold: 60,
    name: '实战测试',
    questions: [
      { id: 601, difficulty: 3, question: 'Vue 组件测试：如何测试用户交互触发的 emit 事件？', options: ['无法测试', 'mount 组件→trigger 点击/输入→断言 emitted() 包含预期事件和参数。如 wrapper.find("button").trigger("click")→expect(wrapper.emitted("submit")).toBeTruthy()', '只在 E2E 测', '手动测试'], answer: 1, explanation: 'Vue Test Utils 提供 emitted() 方法：trigger 事件→检查发出的事件名和 payload。不依赖真实浏览器事件系统→快速验证组件接口。' },
      { id: 602, difficulty: 2, question: 'Vitest 的 describe/it/expect 结构最佳实践？', options: ['随意写', 'describe("模块名")→it("场景：当 XX 时应该 YY")→expect(actual).toBe(expected)。describe 嵌套表示层级关系。it 名读起来像句子', '只有 it', '不用 describe'], answer: 1, explanation: 'describe 组织测试片段（"Calculator"）。it 描述单一场景（"当 a 和 b 为正数时应该返回和"）。嵌套 describe 表示子场景（"加法"→"正常数"/"0"/"负数"）。' },
      { id: 603, difficulty: 3, question: '端到端测试（E2E）中如何处理异步操作和等待？', options: ['用 setTimeout', '用 Playwright 的 waitFor/waitForSelector/waitForResponse 或 Cypress 的 cy.wait("@alias")。确定性等待而非固定时间等待更稳定', '靠运气', '不处理'], answer: 1, explanation: 'await page.waitForSelector(".result") 等元素出现。固定 setTimeout(3000) 脆弱（有时快有时慢）。条件等待：等网络请求完成、等元素可见、等文本出现。' },
      { id: 604, difficulty: 2, question: '测试覆盖率报告的误用：覆盖率 100% 但质量差的例子？', options: ['不可能', '覆盖率只测量"代码被执行了"不是"行为被验证了"。可能：执行了代码但没有断言输出（空测试）；断言了但没有覆盖边界条件。覆盖率指标有用但不能作为唯一质量指标', '覆盖率没用', '100% 就是完美'], answer: 1, explanation: '覆盖率高但没断言（it("test", ()=> { fn(); })）→覆盖率 100% 但质量 0。覆盖率+code review（检查测试质量）= 有效指标。' },
      { id: 605, difficulty: 3, question: '测试数据（Fixture）管理：硬编码 vs 工厂函数 vs 快照？', options: ['硬编码最好', '工厂函数：createUser({name:"test"}) 可定制生成测试数据→减少重复且灵活。硬编码简单但大量重复。快照数据适合固定结构但不可定制', '全用快照', '无区别'], answer: 1, explanation: '工厂函数 = 默认值 + 可覆盖参数：createUser({ overrides })。单个文件管理测试数据生成→修改一处影响所有测试。相比硬编码在每个测试中重复少得多。' },
      { id: 606, difficulty: 2, question: '为什么要在 CI 中运行测试而不是只在本地跑？', options: ['本地够了', 'CI 确保：1)所有人提交的代码都通过测试 2)环境一致性（不是"在我电脑上能跑"）3)自动阻止不通过测试的代码合并。本地测试是自检 CI 是强制门禁', 'CI 没用', '本地跑就行'], answer: 1, explanation: '人可能忘记跑测试→CI 不会忘。环境差异（Node 版本/操作系统）→CI 用一致环境。强制流程：push→跑测试→失败则通知→成功才能合并。团队协作的必须品。' },
      { id: 607, difficulty: 3, question: '测试脆弱（Flaky Test）的原因和解决方案？', options: ['随它去', '原因：依赖执行顺序、时间依赖、网络波动、共享状态未清理。方案：每个测试独立（隔离状态）、确定性等待、mock 外部依赖、重试机制做最后兜底', '不存在脆弱', '删除脆弱测试'], answer: 1, explanation: 'Flaky = 有时过有时挂同一份代码。最大破坏：失去对测试的信任→忽略失败。解决：从根本上消除不确定性（清理全局状态/确定性时间/mock 外部）。' },
      { id: 608, difficulty: 2, question: '测试文件应该和源文件放在一起还是单独的 __tests__ 目录？', options: ['没有标准', '两者都可以：colocation（Button.vue 旁放 Button.spec.ts）方便找；__tests__ 目录集中管理。团队统一即可。Vite 生态倾向 colocation', '__tests__ 更好', 'colocation 更好'], answer: 1, explanation: 'Colocation：*.spec.ts 和源文件同目录→一眼看到"这个文件有没有测试"。__tests__：集中目录→源文件目录更干净。Vue/Vite 社区倾向 colocation。关键是统一。' },
      { id: 609, difficulty: 3, question: '测试驱动设计改善代码质量的原理？具体什么代码特征说明"难测试"？', options: ['测试无法改善设计', '难测试的代码特征：1)函数做太多事（需拆解）2)硬编码依赖（需依赖注入）3)依赖全局状态。强迫写测试→被迫改善设计→可测试=设计好', '只能找 bug', '和设计无关'], answer: 1, explanation: '如果很难写测试→代码设计大概率有问题（耦合高/职责不清/依赖全局状态）。TDD 倒逼你从使用者角度设计接口→天然产生低耦合高内聚的代码。测试即设计反馈。' },
      { id: 610, difficulty: 2, question: '组件测试中真的要测试 CSS 样式吗？', options: ['必须测试所有样式', '一般不直接测试 CSS 值（太脆弱且意义不大）。应测试：CSS class 是否正确应用（如 .active 在 active 状态下存在）。视觉回归测试（截图对比）适合设计系统', '完全不测样式', '只测颜色'], answer: 1, explanation: '测试"按钮 active 时是否有 .active class"（行为验证）有意义。测试"按钮颜色是 #333"（视觉验证）脆弱且意义不大（改颜色不应让测试挂）。视觉回归测试用 Percy/Chromatic 等专门工具。' },
    ],
  };
  data.levels.push(l4);

  writeQuiz('testing.yaml', data);
  console.log('testing.yaml: 新增 ' + (l1.length + l2.length + l3.length + l4.questions.length) + ' 题，总计 ' + data.levels.reduce((s, l) => s + l.questions.length, 0) + ' 题');
}

// ======================================================================
// 8. principles.yaml (20 → 40 questions)
// ======================================================================
function expandPrinciples() {
  const data = readQuiz('principles.yaml');

  // Add to Level 1: 浏览器原理 (4 → 8)
  const l1 = [
    { id: 500, difficulty: 1, question: '浏览器是多进程还是多线程？每个 Tab 是独立进程吗？', options: ['单进程', 'Chrome 是多进程架构：每个 Tab 独立进程（崩溃不互相影响）。每个进程内有多个线程（主线程/合成线程/光栅化线程等）', '单线程', '不固定'], answer: 1, explanation: '多进程架构 = 隔离性好。一个 Tab 崩溃不影响其他。主线程负责 JS 执行+样式+布局。合成线程负责 GPU 合成。理解这个帮助理解"为什么 JS 阻塞渲染"。' },
    { id: 501, difficulty: 1, question: '浏览器如何解析 HTML？是逐行解析还是等下载完？', options: ['等下载完', '流式解析——边下载边解析。遇到 <script> 暂停解析等 JS 下载执行完。遇到 <link> 异步下载不暂停。这也是 script 放底部的原因', '逐行解析', '先执行 JS'], answer: 1, explanation: '浏览器流式解析 HTML。Script 阻塞解析（需执行 JS 后再继续解析→JS 可能 document.write 改变内容）。CSS 不阻塞解析但阻塞渲染。理解这一点才能合理放置资源。' },
    { id: 502, difficulty: 1, question: '什么是渲染阻塞（Render Blocking）？', options: ['CSS 动画阻塞', '浏览器必须等某些资源加载完才能首次渲染页面。CSS 是渲染阻塞资源（等 CSSOM 构建完才能渲染）。JS 可能阻塞解析但不一定阻塞渲染（取决于放置位置）', '图片加载', 'JS 渲染'], answer: 1, explanation: '没有 CSS → 浏览器可以先渲染无样式的内容（FOUC 闪烁）→ 但有 CSS 时浏览器等 CSS 加载完才渲染。内联关键 CSS 消除阻塞→首屏更快可见。' },
    { id: 503, difficulty: 1, question: 'DOM 和 CSSOM 是什么？它们怎么变成渲染树？', options: ['不相关', 'DOM 树（HTML 结构）+ CSSOM 树（CSS 规则）= 渲染树（只包含可见元素的视觉信息）。display:none 不在渲染树上。构建渲染树后才是布局和绘制', '同时构建', 'CSSOM 先'], answer: 1, explanation: 'DOM：HTML 文档的树结构。CSSOM：CSS 规则的树结构。合并 → 渲染树（每个可见节点附带其样式）。display:none 不进入渲染树（visibility:hidden 会进入只是不显示）。' },
  ];
  data.levels[0].questions.push(...l1);

  // Add to Level 2: 渲染与重排 (6 → 10)
  const l2 = [
    { id: 504, difficulty: 2, question: '为什么要避免在循环中读取 offsetWidth 等几何属性？', options: ['性能足够', '每次读取几何属性时若布局已标记为 dirty→触发强制同步重排（Forced Synchronous Layout）。循环中多次读取→多次重排→严重性能问题', '读取没关系', '只读一次就行'], answer: 1, explanation: '布局惰性计算：修改样式后布局标记为 dirty 但不立即计算。读取 offsetWidth 时浏览器被迫立即计算布局。循环中：每个循环"写→读→重排→写→读→重排"循环 N 次。' },
    { id: 505, difficulty: 2, question: 'requestAnimationFrame 和 setTimeout 做动画的区别？', options: ['完全相同', 'rAF 在每帧渲染前执行与屏幕刷新同步→流畅 60fps 且自动暂停（Tab 不可见时）。setTimeout 不保证时机→可能丢帧或过度绘制', 'setTimeout 更好', 'rAF 更慢'], answer: 1, explanation: 'rAF：浏览器在准备好渲染下一帧前调用你的回调→"你这时更新动画我来渲染"完美同步。setTimeout：可能在两帧之间执行→做了无用功或跳过帧。动画永远用 rAF。' },
    { id: 506, difficulty: 2, question: 'CSS contain 属性做什么？对性能有什么用？', options: ['无作用', 'contain 告诉浏览器该元素的子树独立于页面其余部分。contain:layout 限制布局影响范围→重排只在该元素内计算不波及整个页面', '只是样式', '已废弃'], answer: 1, explanation: 'contain: layout → 元素内部布局变化不影响外部→浏览器可跳过外部重排。contain: paint → 元素外的内容不在该元素内绘制。contain: strict → 完全隔离。适合大型组件优化。' },
    { id: 507, difficulty: 2, question: '为什么说"CSS 选择器从右向左匹配"？这对性能有啥启示？', options: ['不会影响', '浏览器匹配：先找到最右选择器（如 .button）的所有元素→再检查它们是否在 .container 中。启示：最右选择器应尽量具体（类名而非标签名），减少初始匹配范围', '从左匹配', '无所谓'], answer: 1, explanation: '".container .list .item" → 浏览器先找到所有 .item → 再检查是否在 .list 中 → 再检查是否在 .container 中。关键：最右选择器决定初始候选集大小。避免使用过于宽泛的最右选择器（如 div .item）。' },
  ];
  data.levels[1].questions.push(...l2);

  // Add to Level 3: 事件循环深入 (10 → 12)
  const l3 = [
    { id: 508, difficulty: 3, question: 'async/await 在事件循环中是什么行为？', options: ['等同于同步', 'await 后的代码相当于 Promise.then() 中的回调→进入微任务队列。async 函数遇到 await→暂停执行→等 Promise resolve→将后续代码作为微任务入队', '宏任务', '同步执行'], answer: 1, explanation: 'async function 中的 await 后续代码 = 微任务。await Promise.resolve() 后面的代码不会立即执行而是等到当前同步代码执行完后在微任务阶段执行。' },
    { id: 509, difficulty: 3, question: 'MutationObserver 和 IntersectionObserver 各自用途和原理？', options: ['DOM API', 'MutationObserver：监听 DOM 变化（增删改属性）异步批量回调。IntersectionObserver：监听元素是否进入视口（懒加载/曝光统计）。两者都是异步微任务', '已废弃', '同类 API'], answer: 1, explanation: 'MutationObserver 在 DOM 变化时将变化记录在队列中→微任务阶段批量通知。IntersectionObserver 在帧之间检查元素与视口的交叉状态→异步通知。都是现代性能优化的基础 API。' },
  ];
  data.levels[2].questions.push(...l3);

  // Add Level 4: 设计模式
  const l4 = {
    level: 4,
    type: 'boss',
    threshold: 60,
    name: '设计模式',
    questions: [
      { id: 510, difficulty: 2, question: 'MVC 和 MVVM 的区别？Vue 是哪种？', options: ['MVC', 'MVC：Controller 处理输入更新 Model 和 View（手动）。MVVM：ViewModel 通过数据绑定自动同步 Model 和 View。Vue 是 MVVM（ref/reactive = Model，template = View，组件逻辑 = ViewModel）', '两者相同', 'Vue 是 MVC'], answer: 1, explanation: 'MVVM 的核心是数据绑定：Model 变 → View 自动更新（Vue 的响应式）。View 输入 → Model 自动更新（v-model）。ViewModel 是桥梁（Vue 组件实例）。开发者不手动操作 DOM。' },
      { id: 511, difficulty: 2, question: '观察者模式（Observer Pattern）在前端中的应用？', options: ['Vue 不用', 'Vue 响应式系统核心就是观察者模式：数据是被观察者（Subject），组件渲染函数是观察者（Observer）。数据变化→通知所有依赖该数据的组件更新', '已过时', '只在后端用'], answer: 1, explanation: '观察者模式 = 一对多依赖关系：一个对象变化时通知所有依赖它的对象。Vue 的依赖追踪系统：track（收集依赖/观察者）→ trigger（通知更新）。EventEmitter 也是观察者模式。' },
      { id: 512, difficulty: 1, question: '模块模式（Module Pattern）解决什么问题？前端如何实现？', options: ['不需要模块化', '解决命名冲突和封装问题——通过闭包创建私有变量和暴露公共 API。前端实现：ES6 模块（import/export）天然支持。IIFE 是旧方式', '只用于 Node', '模块模式没用'], answer: 1, explanation: 'ES6 模块 = 每个文件有独立作用域。不 export 的变量外部不可访问（私有）。export 的变量是公共 API。这是语言级别的模块化支持。' },
      { id: 513, difficulty: 3, question: 'SOLID 原则在前端项目中如何体现？举 3 个例子', options: ['SOLID 只用于后端', 'S（单一职责）：每个组件只做一件事。O（开闭原则）：组件通过 props/slots 扩展行为不改源码。I（接口隔离）：不强迫组件接收不需要的 props。L/D 同样适用', '前端不需要', '过于学术'], answer: 1, explanation: '单一职责：UserAvatar 只显示头像不管数据获取。开闭：<Button variant="primary"> 通过 prop 变种不修改 Button 源码。接口隔离：不要一个巨型 props 对象拆分多个小组件。' },
      { id: 514, difficulty: 2, question: '策略模式（Strategy Pattern）在前端中的实际应用？', options: ['不实用', '表单校验：不同的校验规则（必填/正则/自定义）封装成策略函数。根据字段类型动态选择校验策略。比 if-else 更易扩展——新增规则=新增策略函数不改原有代码', '已过时', '只用于算法'], answer: 1, explanation: '策略模式 = 定义一组可互换的算法。表单校验场景：{ required: fn, email: fn, minLength: fn }。校验时根据规则名调用对应函数。新规则只需加函数不改原有逻辑。' },
      { id: 515, difficulty: 2, question: '发布-订阅模式和观察者模式的区别？', options: ['完全相同', '观察者：Subject 和 Observer 直接依赖（耦合）。发布-订阅：通过事件通道（Event Bus）解耦双方不知道对方存在。Vue 的 emit/on 和 mitt 库是发布-订阅', '发布-订阅已废弃', '观察者更好'], answer: 1, explanation: '观察者 = 被观察者维护观察者列表（直接关系）。发布-订阅 = 中间有事件通道（"报社"），发布者和订阅者互不知道。现代前端多用发布-订阅（EventBus/Pinia actions）。' },
      { id: 516, difficulty: 3, question: '依赖注入（Dependency Injection）在前端的好处？不用 DI 有什么问题？', options: ['没用', 'DI 让组件不直接创建依赖而是接收依赖。好处：1)可测试（注入 mock）2)松耦合（改依赖不影响组件）。provide/inject 本质就是轻量 DI', '太复杂', '和依赖注入相反'], answer: 1, explanation: '不 DI：组件内 import axios 直接发请求→测试时难 mock。DI：通过 props/provide 注入 API 客户端→测试时注入 mock 实现。代码依赖抽象不依赖具体实现。' },
      { id: 517, difficulty: 1, question: '工厂模式（Factory Pattern）在创建组件实例时的应用？', options: ['不适用于组件', '工厂函数动态创建不同配置的组件或对象。如 createButton({variant,size,label}) 返回不同样式的按钮组件。隐藏创建细节只暴露简洁接口', '已过时', '太简单不用学'], answer: 1, explanation: '工厂函数：function createUser(type) { if(type==="admin") return new AdminUser(); ... }。前端：封装复杂的组件创建逻辑对外提供简洁 API。和 Vue 的 h() 渲染函数本质类似。' },
      { id: 518, difficulty: 3, question: '装饰器模式（Decorator Pattern）和高阶组件（HOC）/Composable 的关系？', options: ['没有关系', '装饰器 = 不改变原对象基础上动态添加功能。HOC（React）= 包裹组件增加功能。Composable（Vue）= 在 setup 中组合添加功能。两者都体现装饰器思想', 'HOC 不是装饰器', 'Composable 不是'], answer: 1, explanation: '装饰器思想：不改原有代码但扩展功能。HOC：withAuth(Component) 给组件加认证逻辑。Composable：useAuth() 给 setup 加认证能力。都是"包装/组合"而非"修改/继承"。' },
      { id: 519, difficulty: 2, question: '为什么说"组合优于继承"在前端中特别适用？', options: ['继承更好', '组合（Composition）更灵活：组件通过组合多个 composable 获得多种能力。继承固定层级→"组件是 X 就不能同时是 Y"。Vue Composition API 和 React Hooks 都拥抱组合', '两者相同', '不需要组合'], answer: 1, explanation: '继承：Button extends BaseComponent → 单继承层级固定→"我既要 Tooltip 又要 Loading"无法实现。组合：组件同时 useTooltip() + useLoading() 自由组合能力。灵活且可测试。' },
    ],
  };
  data.levels.push(l4);

  writeQuiz('principles.yaml', data);
  console.log('principles.yaml: 新增 ' + (l1.length + l2.length + l3.length + l4.questions.length) + ' 题，总计 ' + data.levels.reduce((s, l) => s + l.questions.length, 0) + ' 题');
}

// ======================================================================
// Execute all expansions
// ======================================================================
console.log('=== 开始扩展所有 Quiz 文件 ===\n');

expandEngineering();
expandVueBasic();
expandVueAdvanced();
expandAiCollab();
expandPrinciples();
expandPerformance();
expandSecurity();
expandTesting();

console.log('\n=== 全部完成 ===');
