const fs = require('fs');
const path = 'd:/MyWorkspace/my-learn-web/src/configs/glossary.ts';
let content = fs.readFileSync(path, 'utf-8');

const newTerms = [
  // Web 历史
  ['Information Management: A Proposal', '1945年 Vannevar Bush 发表的文章，首次提出 Memex 概念——一个可以存储、检索个人信息的设备雏形，被视为超文本思想的源头。', '就像一份畅想未来的提案——很多伟大的技术都始于一篇看似遥不可及的论文。'],
  ['Vague but exciting.', '1989年 Tim Berners-Lee 提交万维网提案时，上司在封面写的批注——意思是「模糊但令人兴奋」。这句轻描淡写的话开启了整个 Web 时代。', '就像导师在学生的创新课题申报书上批的"想法天马行空，但万一成了呢"——历史上最重要的创新往往始于模糊的兴奋。'],
  ['Asynchronous JavaScript And XML', 'Ajax 的全称——异步 JavaScript 和 XML。核心技术：用 XMLHttpRequest 在不刷新页面的情况下向服务器请求数据并局部更新页面。'],
  ['Attention is All You Need', '2017年 Google 研究团队发表的里程碑论文——提出了 Transformer 架构。论文标题的意思是「注意力机制就是你需要的全部」，这句话改写了 AI 的历史。'],
  ['Memex', '1945年 Vannevar Bush 构想的个人信息管理设备——用索引和关联链在不同文档间快速跳转，是超文本和 Web 的思想原型。'],
  ['hypertext', '超文本——通过链接把不同文档关联在一起的文本系统。HTML 中的 HT 就是 HyperText。点击一个词就跳到相关页面。'],
  ['WorldWideWeb', '1990年 Tim Berners-Lee 开发的世界上第一个浏览器——同时也是编辑器。万维网由此诞生。'],
  ['Douglas Crockford', 'JavaScript 领域的重量级人物——JSON 格式的发明者，著有《JavaScript: The Good Parts》，是 JS 社区最具影响力的布道者之一。'],
  ['XMLHttpRequest', '浏览器提供的 API 对象——在不刷新页面的情况下与服务器交换数据。它是 Ajax 技术的核心，2005年被 Google 在 Gmail 和 Google Maps 中大量使用后成为 Web 2.0 的基石。'],
  ['polyfill', '一段代码用来在旧浏览器中模拟现代 Web API——让新特性在老环境中也能工作。就像补牙材料填平坑洞。'],
  ['Windows XP', '微软 2001 年发布的操作系统——预装 IE6 浏览器，由于 XP 的世纪性普及，IE6 成了前端开发者长达十年的兼容噩梦。'],
  ['Web 2.0', '2004年前后兴起的第二代互联网模式——用户从单纯的内容消费者变成内容创造者（YouTube、Flickr、Facebook、Wikipedia）。强调互动、分享、协作。'],

  // 公司/产品
  ['Google', '1998年创立的互联网公司——搜索引擎起家，通过 Gmail 和 Google Maps 展示了 Ajax 的威力，直接催生了 Web 2.0 时代。'],
  ['Firefox', 'Mozilla 基金会的开源浏览器——2004年发布后打破了 IE 的垄断地位，拥有优秀的开发者工具和标准兼容性。'],
  ['Chrome', 'Google 2008年发布的开源浏览器——内置强大的 DevTools、超快的 V8 JS 引擎，彻底改变了前端开发。目前全球份额第一。'],
  ['Twitter', '2006年上线的微博客平台——140字短消息改变了信息传播的速度和方式。'],
  ['Wikipedia', '2001年上线的自由百科全书——任何人都可以编辑，是 Web 2.0 用户协作模式的标志性代表。'],
  ['Facebook', '2004年成立的社交网络平台——改变了互联网信息传播方式，催生了前端框架（React 就是 Facebook 开发的）。'],
  ['YouTube', '2005年上线的视频分享平台——Web 2.0 典范，后被 Google 收购。'],
  ['Flickr', '2004年上线的照片分享网站——Web 2.0 时代的标志性产品之一。'],
  ['IE', 'Internet Explorer——微软的老牌浏览器，曾占 95% 份额。长期不遵守 Web 标准导致前端开发者需要大量 hack 和 polyfill。2022年正式退役。'],

  // 编程语言/后端
  ['Sun Microsystems', '1982年创立的计算机公司——Java 语言的创造者，SPARC 工作站和 Solaris 系统在早期 Web 服务器中广泛使用。2009年被 Oracle 收购。'],
  ['Java', 'Sun Microsystems 1995年发布的编程语言——「一次编写，到处运行」。和 JavaScript 除了名字前四个字母外没有关系。'],
  ['PHP', '1995年诞生的服务器端脚本语言——曾驱动了 Facebook、Wikipedia 等早期 Web 巨头，至今仍运行着互联网大量的网站。'],
  ['Ruby', '1995年发布的开源编程语言——以简洁优雅著称。配合 Rails 框架（2005年）掀起了「约定优于配置」的 Web 开发革命。'],
  ['Apache', '全球使用最广泛的 Web 服务器软件——1995年发布，开源免费。LAMP 曾是 Web 开发的标准架构。'],
  ['Nginx', '2004年发布的高性能 Web 服务器和反向代理——俄罗斯工程师 Igor Sysoev 为解决高并发问题而开发。英文读音 engine x。'],

  // 包管理器
  ['gem', 'Ruby 语言的包管理器——gem install xxx 从 RubyGems 仓库下载包。'],
  ['pip', 'Python 语言的包管理器——pip install xxx 从 PyPI 仓库下载第三方库。全称 Pip Installs Packages（递归缩写）。'],
  ['CPAN', 'Comprehensive Perl Archive Network——Perl 语言的全能档案网络。编程世界最早的集中式包管理系统之一，启发了后来的 npm、pip 等。'],

  // Cookie / Session
  ['Cookie', '浏览器存储在用户电脑上的小块数据——用于记住登录状态、购物车、偏好设置等。每次请求自动发送给服务器。英文原意是「小甜饼」。'],
  ['Session', '服务端维护的用户会话状态——用户登录后，服务器记住你是谁，直到你退出或超时。通常配合 Cookie 使用。'],

  // 前端框架/工具
  ['jQuery', '2006年发布的 JS 库——用简洁的 $() 语法解决了 DOM 操作和浏览器兼容问题。write less, do more 是其核心理念。'],
  ['React', 'Facebook 2013年发布的前端 UI 库——用 JSX 语法和组件化思维构建界面，引入虚拟 DOM 概念。目前全球最流行的前端库。'],
  ['Angular', 'Google 2010年发布的前端框架——2016年用 TypeScript 完全重写，提供了完整的前端开发解决方案。'],
  ['Svelte', '2016年发布的前端框架——核心理念是「消失的框架」：编译阶段把代码转为纯 JS，运行时没有框架开销。'],
  ['JSX', 'JavaScript XML——React 引入的语法扩展，让你在 JS 中写类似 HTML 的标记。JSX 会被 Babel 编译为标准的 JavaScript 函数调用。'],
  ['模板语法', 'Vue 等框架中在 HTML 中嵌入动态表达式的语法——如 {{ message }}、v-if、v-for。用声明式的方式描述页面和数据的关系。'],
  ['渐进式框架', 'Vue 的核心设计理念——可以只用部分功能，也可以逐步加入组件、路由、状态管理等全家桶。英文原名 Progressive Framework。'],
  ['webpack', '2012年发布的前端模块打包工具——将 JS、CSS、图片等资源视为模块，用 loader 和 plugin 统一处理和打包。'],
  ['Babel', 'JavaScript 编译器——将新版 JS（ES6+）转换为旧浏览器也能运行的版本。以传说中通向天堂的巴别塔命名。'],
  ['TypeScript', '微软 2012年发布的开源语言——JavaScript 的超集，添加了静态类型检查。大型项目中能提前发现大量错误，已成为前端主流。'],
  ['tree-shaking', '打包工具的优化技术——自动移除代码中未被引用的「死代码」，就像摇树把枯叶摇掉。webpack 和 Rollup 都支持。'],
  ['chunk', '构建工具将代码拆分成多个独立的文件块——实现按需加载，减少首屏下载量。英文原意是「一大块」。'],
  ['plugin', '构建工具的插件——扩展打包器的功能，如压缩代码、注入环境变量。webpack 和 Vite 都有丰富的插件生态。'],
  ['loader', 'webpack 的概念——将非 JS 文件（CSS、图片、字体等）转换为可被 JS 模块引用的格式。每种文件类型需要对应的 loader。'],

  // 工程工具
  ['Grunt', '2012年发布的 JS 任务运行器——用配置文件定义构建任务，是前端工程化早期的标志性工具。后来被 Gulp 和 webpack 取代。'],
  ['Gulp', '2013年发布的流式构建工具——用 JS 代码定义构建流程，比 Grunt 更快更灵活。'],
  ['Bower', '2012年发布的前端包管理器——在 npm 支持前端之前是下载前端库的主要工具。2015年后被 npm/Yarn 取代。'],

  // AI / ML
  ['AI', 'Artificial Intelligence（人工智能）——让机器模拟人类智能行为的技术。从1956年达特茅斯会议正式确立，近期以深度学习和大语言模型为核心突破。'],
  ['SQL', 'Structured Query Language（结构化查询语言）——操作数据库的标准语言。前端开发者虽不直接写大量 SQL，但 ORM、GraphQL 等工具都是对 SQL 的封装。'],
  ['AlphaGo', 'DeepMind 2016年开发的围棋 AI——击败了世界冠军李世石，标志着 AI 在复杂策略游戏中超越了人类。核心是深度强化学习。'],
  ['Transformer', 'Google 2017年提出的神经网络架构——用自注意力机制替代传统的循环和卷积。它是 ChatGPT、Claude 等所有大语言模型的底层架构基础。'],
  ['OpenAI', '2015年成立的人工智能研究公司——开发了 GPT 系列、DALL-E、Codex 等重量级 AI 模型。'],
  ['GPT', 'Generative Pre-trained Transformer——OpenAI 开发的大语言模型系列。GPT-3 在 2020 年引起巨大轰动，ChatGPT 在 2022 年底引爆了 AI 革命。'],
  ['ChatGPT', 'OpenAI 2022年11月发布的对话式 AI 产品——两个月内用户突破 1 亿，是史上增长最快的消费级应用，彻底改变了普通人使用 AI 的方式。'],
  ['Copilot', 'GitHub 和 OpenAI 2021年联合推出的 AI 编程助手——在编辑器中根据上下文自动补全代码，相当于一个实时协作的 AI 编程伙伴。'],
  ['OpenAI Codex', 'OpenAI 2021年发布的代码生成模型——能把自然语言描述转成代码，是 GitHub Copilot 背后的引擎。'],
  ['Anthropic', '2021年由前 OpenAI 研究员创立的 AI 公司——以 AI 安全为核心使命，开发了 Claude 系列模型。'],
  ['Claude', 'Anthropic 开发的 AI 助手——强调安全性、可靠性和长上下文能力。Claude 3.5/4 系列在编程和推理方面表现突出。'],
  ['Claude Code', 'Anthropic 2025年发布的 AI 编程工具——运行在终端中，能读写文件、执行命令、管理 Git，像一个全能的 AI 工程师。'],
  ['Cursor', '2023年发布的 AI 编程编辑器——基于 VS Code，内嵌 AI 代码补全和对话功能。AI Coding 时代的标志性工具之一。'],
  ['Windsurf', 'Codeium 公司 2024年发布的 AI 编程 IDE——以「流式 AI 编程」为特色，AI 能自动理解项目上下文并提供流畅的编码体验。'],
  ['AI Coding Agent', 'AI 编程智能体——能自主完成复杂编程任务的 AI，包括读代码、写代码、运行测试、调试修复。区别于简单补全，Agent 能独立规划和执行多步骤的开发任务。'],
  ['Gemini Code Assist', 'Google 2024年发布的 AI 编程助手——基于 Gemini 模型，集成在 VS Code 和 IntelliJ 等 IDE 中。'],
  ['Copilot Agent', 'GitHub 2024年发布的 AI 编程代理模式——Copilot 从代码补全升级为能自主读取项目、规划任务、修改多个文件的智能代理。'],

  // Backend / Auth
  ['Express', 'Node.js 最流行的 Web 后端框架——轻量、灵活，是 MEAN/MERN 技术栈的核心。用 get()、post() 等简洁方法定义路由。'],
  ['JWT', 'JSON Web Token——一种紧凑的令牌格式，用于在客户端和服务端之间安全传输认证信息。登录后服务端签发 JWT，后续请求携带它证明身份。'],

  // Chinese terms
  ['插件', 'Plugin——可插拔的扩展模块，为已有软件增加新功能。VS Code 的插件生态让它可以变成任何语言的 IDE。'],
  ['框架', 'Framework——一套预定义好的代码结构和规范。你用框架就按它的规则来写，框架负责调用你的代码（控制反转）。'],
  ['层', 'Layer——编程中把不同职责的代码分层，如表现层（UI）、业务逻辑层、数据层。分层是软件架构的基本思想。'],
  ['分包', '把应用代码拆成多个独立的小包——用户访问时只下载当前需要的部分，加快首屏加载。Vite 和 webpack 都支持自动分包。'],
  ['异步', 'Asynchronous——代码不会阻塞等待结果，而是注册一个回调，结果来了再处理。JS 是单线程语言，异步是其处理网络请求的核心机制。'],
  ['加载', 'Load——浏览器从服务器获取资源（HTML、CSS、JS、图片）并展示给用户。加载性能直接影响用户体验，是现代前端开发的核心关注点。'],
];

// Sort by key length descending
newTerms.sort((a, b) => b[0].length - a[0].length);

// Build entry strings
const entries = newTerms.map(t => {
  const [key, expl, analogy] = t;
  let entry = "  ['" + key + "', {\n    explanation: '" + expl.replace(/'/g, "\\'") + "'";
  if (analogy) {
    entry += ",\n    analogy: '" + analogy.replace(/'/g, "\\'") + "'";
  }
  entry += "\n  }],";
  return entry;
}).join('\n');

// Insert after opening bracket of glossary array
const marker = "export const glossary: [string, TermDef][] = [";
const insertPos = content.indexOf(marker);
if (insertPos >= 0) {
  // Find the newline after the opening bracket
  const newlinePos = content.indexOf('\n', insertPos);
  if (newlinePos >= 0) {
    const before = content.slice(0, newlinePos + 1);
    const after = content.slice(newlinePos + 1);
    const newContent = before + entries + '\n' + after;
    fs.writeFileSync(path, newContent, 'utf-8');
    console.log('Added ' + newTerms.length + ' terms.');
  }
} else {
  console.log('Marker not found');
}
