import type { Lesson } from "../types";

export const prologueLessons: Lesson[] = [

  // ===== 0.1 诞生：1990-1993 =====
  {
    id: "dawn-era",
    chapterId: "web-history",
    order: 1,
    title: "诞生——从 0 到 1",
    musicAnalogy: "「最早的网页没有颜色，就像最早的歌没有和声——但一切伟大的事物，都始于简单。」",
    listenTo: "Gregorian Chant《Veni Creator Spiritus》— 公元 9 世纪的素歌，简单到只有一条旋律线。",
    mode: "local",
    starterCode: { html: "", css: "", js: "" },
    sections: [
      {
        type: "explain",
        title: "一、1989，一个人的提案",
        content: "1989 年，瑞士日内瓦。CERN（欧洲核子研究中心）的一间办公室里，Tim Berners-Lee 面对着三台互不兼容的电脑。他是牛津物理系毕业的软件顾问，不是科班的计算机科学家——这个背景很重要，因为他思考问题的方式更像物理学家：找到最简模型，解释最大范围的现象。\n\n当时 CERN 有一万多名科学家，来自几十个国家。每个人用不同的电脑、不同的软件、不同的数据格式。一篇论文存在这台机器上，另一篇在隔壁办公室的磁盘里。信息散落在孤岛中，互相看不见。\n\n这不是 Tim 第一次想解决这个问题。1980 年他刚来 CERN 时，就写了一个叫 Enquire 的私人工具，用超文本链接把文档串在一起。但他离开 CERN 时，存在 8 英寸软盘里的代码被遗忘了。九年后，他重新拾起这个想法。\n\n他拿起笔记本，写了一份提案：《Information Management: A Proposal》。上司 Mike Sendall 说不够具体，让他再写一版。第二版加了更多技术细节。Sendall 终于批了，在封面上写了五个字：\n\n\"Vague but exciting.\"\n\n模糊，但令人兴奋。这五个字，是万维网的第一张准生证。Sendall 后来承认，他当时完全没意识到自己在批准什么。CERN 的文化就是：雇聪明人，让他们自由探索。",
      },
      {
        type: "explain",
        title: "二、Hypertext 之前：那些走不通的路",
        content: "Tim 没有发明\"超文本\"这个概念。在他之前，有三个人已经点燃了火花——只是他们的火把太大，没人举得动。\n\n**Vannevar Bush，1945 年。** 二战刚结束，这位罗斯福总统的科学顾问写了一篇文章《As We May Think》。他构想了一个叫 Memex 的桌面设备——用微缩胶片存储文档，可以在文档之间建立\"联想路径\"。这是人类第一次用文字描述超文本。但他描述的是一台硬件机器，成本高到不可能量产。\n\n**Ted Nelson，1960 年。** 他创造了\"hypertext\"这个词。他的项目叫 Xanadu——一个全球性超文本系统，支持双向链接、版本追踪、微支付。这个构想宏大、完美、优雅，也正因为太完美，开发了三十年没做出来。Xanadu 成了一个传奇，但它从未真正运行过。\n\n**Douglas Engelbart，1968 年。** 在旧金山的一场计算机会议上，他坐在舞台中央，面前是他发明的鼠标。接下来的一小时，他演示了：窗口、超文本、视频会议、协同编辑、图形界面。这场后来被称为\"所有 Demo 之母\"的演示，一次性展示了未来三十年的计算机概念。大多数人觉得\"太超前了\"。\n\n这三个人给了 Tim 灵感，但 Tim 做了一件他们都没做到的事：**把概念简化到极致。** Xanadu 追求完美，结果做不出来。Tim 追求\"足够好\"——HTML 只需要十几个标签，HTTP 只有几个命令，URL 就是一行字符串。够粗糙，所以能跑。能跑，所以能传播。能传播，所以能改变世界。",
      },
      {
        type: "explain",
        title: "三、HTML、HTTP、URL——三根支柱",
        content: "1990 年底，Tim 一个人写出了三样东西。注意：不是一堆互不相关的功能，而是一个精心设计的三层体系。\n\n**HTML** 管结构。页面里有什么——标题、段落、链接、列表。它故意设计得很简单。Tim 说：\"HTML 应该能被任何人看懂，能用任何文本编辑器写出来。\"\n\n**HTTP** 管传输。浏览器怎么向服务器要数据。它故意设计成**无状态**——每次请求都是独立的，服务器不记得你上次来过。这个设计在当时争议很大，但它让 Web 可以无限扩展。如果每个用户都要服务器记住状态，Google 不可能同时服务十亿人。\n\n**URL** 管寻址。每个页面在全球有唯一的地址。`http://info.cern.ch`——这个字符串里包含了协议、主机名、路径。任何人都能构造 URL，不需要申请、不需要审批、不需要付费。\n\n他还写了第一个浏览器 **WorldWideWeb**——注意，它既是浏览器，也是编辑器。Tim 认为每个人都会既读网页又写网页。这个\"可读写 Web\"的理想，在他提出的那一刻就注定了失落——15 年后，wiki 和博客才让普通人也能发布内容。\n\n1991 年 8 月 6 日，第一个网站上线。`info.cern.ch`。页面上只有几行文字和几个蓝色链接。你今天用手机打开的每一个页面——短视频、外卖、地图、支付——它们的根，都扎在这个只有几行蓝字的页面上。",
      },
      {
        type: "explain",
        title: "四、为什么是 Web 赢了？",
        content: "1993 年，Web 不是唯一的选项。事实上，它根本不是最火的选项。\n\n**Gopher，1991 年问世。** 明尼苏达大学开发，和 Web 同年出生。到 1993 年初，Gopher 的流量远超 Web。它比 Web 更结构化——菜单式的层级导航，看起来更\"专业\"。全世界的大学都在搭 Gopher 服务器。\n\n然后明尼苏达大学做了一件改变历史的事。1993 年春天，校方宣布：Gopher 的商用授权要收费。不是很多钱，但\"收费\"两个字就够了。\n\n一夜之间，全网管理员做了一个集体选择：关掉 Gopher，换 Web。为什么？因为 1993 年 4 月 30 日，CERN 发布了一份文件，宣布 Web 的所有技术——HTML、HTTP、URL——永久免费开放，不收专利费。\n\n**Tim 在这个决定上顶住了巨大的压力。** CERN 内部很多人主张申请专利、收授权费。Tim 的回答是：\"如果我们要靠这个赚钱，那就不是在建设基础设施。基础设施应该是免费的。\"这不是技术的胜利，这是价值观的胜利。\n\n还有另一批对手：CompuServe、AOL、Prodigy。这些\"围墙花园\"有数百万付费用户，有内容、有用户、有钱。但它们是封闭的——AOL 的用户只能看 AOL 的内容。Web 对它们做的事，是\"开放协议\"对\"封闭产品\"的降维打击。产品可以比协议更好用，但协议的生态优势是指数级的——每一个新网站都在为整个 Web 增加价值。没有 CEO，没有总部，没有用户协议，Web 成了人类历史上最成功的无中心系统之一。",
      },
      {
        type: "explain",
        title: "五、图片来了，群众来了",
        content: "到 1993 年初，Web 还是学术圈的玩具。为什么普通人不用？因为没有图。打开网页只有文字和蓝色链接——这是学术论文的格式，不是大众会主动使用的东西。\n\n**Marc Andreessen 改变了这一切。** 他是伊利诺伊大学的学生，在 NCSA 打工，时薪 6.85 美元。他和 Eric Bina 用了三个月，写出了 Mosaic 浏览器。\n\nMosaic 做了第一件革命性的事：能显示图片。更准确地说，它支持了 `<img>` 标签——让图片**内嵌在文字之中**，而不是作为单独的附件打开。这个在今天看起来微不足道的功能，在当时是颠覆性的。Mosaic 从 12 个用户增长到几百万，用了不到一年。\n\n1994 年，Marc 联合硅谷传奇人物 Jim Clark 创办了 Netscape。1995 年 8 月，Netscape 上市——估值 29 亿美元，当时还没盈利。这是历史上第一声\"互联网有商业价值\"的巨响。\n\n但 `<img>` 标签也埋下了问题。HTML 没有布局能力。图片一来，人们想把图放左边、文字绕右边——HTML 做不到。于是开发者想出了歪招：用 `<table>` 做布局。`<table>` 套 `<tr>` 套 `<td>` 套另一个 `<table>`，层层嵌套。改一处崩一页，是 90 年代末的日常。这个痛苦最终催生了 CSS——但那是后面的故事了。\n\n工具不完美，但开发者从来不会因此停下。这也许是从那之后至今，前端开发最恒久的规律：**工具永远落后于想象力，所以先用能用的工具做出来，再等着更好的工具来收拾残局。**",
      },
      {
        type: "explain",
        title: "六、1990-1993：这三年播种了什么",
        content: "回头看 1990 到 1993 这三年，Tim 和他的同事们只做了一个选择：**免费、开放、简单。** 但这个选择像一颗种子，三十年后长出了整个数字世界：\n\n**HTML 太简单** → 任何人都能写网页 → 内容爆炸式增长 → 需要更好的样式控制 → CSS（1996）→ Flexbox、Grid（2010s）\n\n**HTTP 无状态** → 服务器不记得上一次请求 → 需要\"记住你是谁\" → Cookie 被发明（1994）→ 追踪、推荐、广告 → 隐私危机、GDPR、今天每一次点击\"接受 Cookie\"的瞬间\n\n**开放标准、无专利** → 任何人都能建站 → 商业化浪潮涌来 → 浏览器战争（下一课）→ 前端开发这个职业的诞生\n\n**没有中央控制** → 任何人都能发布内容 → 博客、论坛、社交网络 → 言论自由的新时代 → 同时也意味着虚假信息、网络暴力——这些问题我们至今还在回答\n\nTim 后来在一次采访中说：\"如果我当时知道 Web 会变成今天这样——假新闻、网络霸凌、数据泄露——我会犹豫。但我还是会做。因为连接的可能性，大于连接带来的风险。\"\n\n1990 年，一个人，一间办公室，几页纸。不是因为比别人聪明，是因为他问了一个所有人都没问的问题，然后没有停在\"想想\"，他去做了。筚路蓝缕，以启山林。",
      },
    ],
  },

  // ===== 0.2 混战：1994-2001 =====
  {
    id: "browser-war",
    chapterId: "web-history",
    order: 2,
    title: "混战——浏览器战争",
    musicAnalogy: "「十天生出 JavaScript，就像即兴哼出的旋律成了传世经典。」",
    listenTo: "维瓦尔第《四季》— 巴洛克时代的「爆款」，就像 JavaScript 在 1995 年横空出世。",
    mode: "local",
    starterCode: { html: "", css: "", js: "" },
    sections: [
      {
        type: "explain",
        title: "一、十天生出的语言",
        content: "1995 年 4 月，Netscape 的程序员 Brendan Eich 接到一个任务：给浏览器做一门脚本语言。上司 Marc Andreessen 告诉他：\"给你十天。\"\n\n不是比喻，是字面意义的十天。Netscape 要在五月底发布新版本，他们需要一门语言让网页能\"动\"起来——表单验证、弹出窗口、响应点击。当时有两个选择：直接用 Java（太重了，适合写应用，不适合写\"检查邮箱是不是空的\"这种小脚本），或者自己做一门。\n\n做 Java 的是 Sun Microsystems，当时硅谷最炙手可热的公司。Netscape 和 Sun 达成合作：Netscape 浏览器内置 Java 支持，同时自己开发一门轻量脚本语言，名字蹭 Java 的热度——叫 JavaScript。\n\nBrendan Eich 在 1995 年 5 月的十天里几乎没怎么睡觉。最初叫 Mocha，发布前改成 LiveScript，最后改成 JavaScript。这门语言跟他被给的时间一样粗糙——没有真正的类（用原型链冒充）、类型转换诡异（`[] + {}` 和 `{} + []` 结果不一样）、全局变量满天飞。但它有一个致命的优势：**它在那里。** 每一个 Netscape 用户打开浏览器，JavaScript 就在那里等着。不需要安装、不需要配置、甚至不需要知道它的名字，它就已经在跑了。\n\nDouglas Crockford 后来说：\"JavaScript 是唯一一门人们不需要先学会就在使用的语言。\"十天造出的语言，后来成了地球上使用人数最多的编程语言。这不是 Brendan Eich 的天才（他自己承认很多设计是赶工），这是**平台的力量。** 谁控制了浏览器，谁就控制了开发者能用的语言。",
      },
      {
        type: "explain",
        title: "二、微软出手：免费的杀伤力",
        content: "1995 年 5 月，比尔·盖茨向全公司发了一封内部备忘录：《互联网浪潮》。标题下面有一句话：**\"互联网是我们自 IBM PC 以来遇到的最重要的事情——我把它的优先级定为最高。\"**\n\n这封信是微软历史上最重要的战略文件之一。盖茨看到了两件事：(1) Netscape 正在成为互联网的中心；(2) 如果浏览器变成了操作系统的替代品，Windows 就完蛋了。Netscape 的愿景是：未来，你用浏览器就能做一切，不需要 Windows。这对微软是生死威胁。\n\n微软的回应简单粗暴：免费捆绑。\n\n同一时期，Netscape Navigator 卖 49 美元一套（对学生免费，对商业用户收费）。微软把 Internet Explorer 捆绑进 Windows 95——免费送，而且不是可选的：你买 Windows，IE 已经在桌面上。\n\n这不是技术竞争，这是平台垄断者对挑战者的绞杀。IE3 在功能上全面落后于 Netscape Navigator 3——它的 CSS 实现烂到连盒子模型都算错了（IE 的盒模型 bug 坑了前端开发者整整十年），JavaScript 实现又慢又奇怪。但免费就是最狠的武器。当 Netscape 在收费、IE 在说\"我不要钱\"时，大多数人不会在乎谁的技术更好。\n\n到 1998 年，Netscape 市场份额从 90% 跌到个位数，被 AOL 以 42 亿美元收购。但临终前它做了一件事，这件事改变了日后二十年的软件行业：**把源代码公开了。** 1998 年 1 月，Netscape 宣布 Navigator 代码全部开源，成立 Mozilla 组织。这堆代码最终变成了 Firefox 的祖先。一战打输了，但这支军队没有解散，而是转入了地下。",
      },
      {
        type: "explain",
        title: "三、功能混战与标准诞生",
        content: "1995 年到 1999 年是\"功能军备竞赛\"的四年。Netscape 发明了 JavaScript、Cookie、插件、框架（frameset）、层（layer）。微软跟进，每样功能都做一个自己的版本，略有不同。写一个网站，在 Navigator 上完美显示，在 IE 上完全崩坏——这是 90 年代末的前端日常。\n\n这场混战催生了两个重要后果。\n\n**第一，W3C 被赋予了实际权力。** Tim Berners-Lee 1994 年就建立了 W3C，但一开始没人把它当回事。浏览器厂商各搞各的，标准写在纸上没人遵守。随着开发者痛苦指数飙升，行业终于认识到：必须有人来当裁判。CSS、DOM、HTML4 的标准规范在 1996-1999 年相继发布。\n\n**第二，跨浏览器兼容从\"好人好事\"变成了\"必修技能\"。** 前端的工程化思维，最早就是被浏览器差异逼出来的——你不能信任任何一个浏览器，所以你必须在所有浏览器上测试。这个意识一直延续到今天。\n\n1999 年，微软在 IE5 中实现了一个叫 **XMLHttpRequest** 的 API。它最初是为 Outlook Web Access 设计的——让网页版 Outlook 能不刷新页面和服务器通信。这个 API 在浏览器里躺了整整五年，几乎没人用它。微软自己都忘了它的存在。\n\n有时候，革命性的技术不是被\"发明\"出来的，是**被遗忘在角落里，等着有人发现它。**",
      },
      {
        type: "explain",
        title: "四、IE6 与漫长的冬天",
        content: "2001 年，IE6 随 Windows XP 发布。到 2002 年，IE6 占据了全球浏览器市场的 95%——这是有史以来单个浏览器达到的最高市场份额，至今未被超越。\n\n然后微软做了一件在今天看来匪夷所思的事：**解散了 IE 开发团队。**\n\n逻辑很直白：战争已经赢了。95% 市场份额，还要开发什么？浏览器的任务完成了。此后的五年——2001 年到 2006 年——IE6 没有任何实质性更新。\n\n这五年是前端开发的\"冰河期\"。没有新特性，没有标准推进，所有人都在为一个五年前的浏览器写代码。但开发者群体在这个时期做了一件最重要的事：**他们不再等待浏览器厂商的施舍，开始自己创造工具。** JavaScript 库、CSS hack、polyfill——\"工程化\"的种子正是在 IE6 的冻土中发芽的。困境倒逼出了最早的工程化实践。",
      },
      {
        type: "explain",
        title: "五、火狐的逆袭与这场战争的遗产",
        content: "2004 年，从 Netscape 灰烬中重生的 Mozilla 发布了 Firefox 1.0。第一个月下载量超过一千万。到 2008 年，Firefox 拿下了全球 30% 的份额，用三年时间从微软嘴里撬走了近三成用户。\n\nFirefox 没有靠免费赢（IE 也免费），它靠的是两样东西：\n\n**标签页浏览。** 今天看来理所当然，但在 2004 年，打开十个网页意味着十个独立窗口。Firefox 把它们放在同一个窗口的标签页里——这个设计现在每一个浏览器都在用。\n\n**扩展生态。** Firebug 这个扩展，是第一个能让开发者在浏览器里实时查看 DOM、调试 JavaScript、分析网络请求的工具。没有 Firebug，就没有今天 Chrome DevTools 的灵感来源。它打开了\"浏览器不只是浏览器，也是开发工具\"这扇门。\n\n浏览器的第一次战争从 1995 打到 2001，以微软的全面胜利告终。但在胜利的那一刻，微软犯了一个统治者在巅峰时常犯的错误：**以为胜利是永久的。** 解散 IE 团队的那一刻，已经埋下了 2008 年 Chrome 横空出世时微软毫无还手之力的种子。\n\n下一个颠覆者，永远不是在和你的产品竞争。它在和你的骄傲竞争。",
      },
    ],
  },
  // ===== 0.3 破冰：2002-2007 =====
  {
    id: "ajax-web20",
    chapterId: "web-history",
    order: 3,
    title: "破冰——从停滞到 Ajax",
    musicAnalogy: "「Ajax 让网页学会了呼吸——不需要刷新就能和世界对话。」",
    listenTo: "Miles Davis《Kind of Blue》— 现代爵士乐的开山之作，即兴与结构的完美平衡。",
    mode: "local",
    starterCode: { html: "", css: "", js: "" },
    sections: [
      {
        type: "explain",
        title: "一、Gmail：愚人节不是玩笑",
        content: "2004 年 4 月 1 日，Google 发布了一款新产品。所有人都以为是愚人节玩笑。1GB 免费邮箱？当时 Hotmail 给你 2MB。Yahoo Mail 给你 4MB。Google 说：1GB。500 倍。而且免费。\n\n但真正让开发者世界炸锅的，不是容量。\n\n是你点开一封邮件。页面顶部不变，侧边栏不变，只有中间的内容区域——刷新了。没有白屏，没有浏览器转圈，没有从头加载整个页面。**这是开发者第一次看到\"一个网页应用可以像桌面软件一样丝滑\"。**\n\n背后的技术，就是微软五年前在 IE5 里实现的 XMLHttpRequest。这个 API 在浏览器里沉睡了五年，几乎没有人碰过它。Google 的工程师不是发明了它——他们是第一个想清楚\"这个东西到底能用来做什么\"的人。\n\nGmail 团队做了一件在当时是架构突破的事：把整个应用拆成\"需要刷新的部分\"和\"不需要刷新的部分\"。导航栏、侧边栏不刷新，只有邮件列表和正文区域在后台悄悄更新。这个拆分的思路——**前后端分离**——后来成了所有 Web 应用的标准架构。\n\n同一年，Google Maps 上线。你可以拖拽地图，周边自动加载——不刷新。这在 2004 年是一种近乎魔法的体验。人们第一次感觉到：网页不是一个\"页面\"了，它是一个\"应用\"。",
      },
      {
        type: "explain",
        title: "二、\"Ajax\" 这个名字为什么重要",
        content: "2005 年 2 月，一位叫 Jesse James Garrett 的设计师写了一篇博客：《Ajax: A New Approach to Web Applications》。他给这套技术方案起了一个名字——**Ajax**（Asynchronous JavaScript And XML）。\n\n这篇文章最妙的地方在于：Ajax 不是新技术。异步请求（XMLHttpRequest）是微软 1999 年做的，JavaScript 是 Netscape 1995 年做的，DOM 操作是 W3C 的规范。Garrett 没有发明任何一行新代码。他只是**把已经存在的东西重新组合，给它起了一个名字。**\n\n有时候，命名本身就是力量。没有名字之前，大家都在用这个技术，但没人意识到在做同一件事。有了名字，就有了旗帜。有了旗帜，就能聚集。聚集之后，就变成了运动。运动之后，就改变了行业。\n\n**这也是第一个由设计师而不是程序员命名的技术范式。** Garrett 的背景是信息架构和用户体验，不是后端系统。Ajax 的诞生本身就说明了一件事：前端的地位在变化。它不再是\"后端扔过来的 HTML 模板\"，而是一个有自己方法论和话语权的独立领域。前端开发的身份认同，从这一刻开始裂变。",
      },
      {
        type: "explain",
        title: "三、jQuery：一个美元符号改变一切",
        content: "在 Ajax 带来的兴奋之外，还有一个根本痛苦：跨浏览器兼容。\n\n2006 年，IE6 仍然统治市场，Firefox 刚刚冒头，两个浏览器对 DOM 的实现天差地别。`document.getElementById` 一个名字就够了。但在 IE6 里获取元素样式要用 `currentStyle`，在其他浏览器里要用 `getComputedStyle`。同一个效果要在不同浏览器上写不同的代码——这是 2006 年最消耗开发者生命力的事。\n\n2006 年 1 月，一个叫 John Resig 的年轻人发布了 jQuery。一个美元符号，一行顶十行。`$('#menu').show().addClass('active')`——链式调用、CSS 选择器、跨浏览器统一 API。它解决的不是\"怎么做新东西\"，而是\"怎么做老东西不用写两遍\"。\n\njQuery 的成功还有一个关键：插件生态。任何人都能给 jQuery 写插件，任何人都能从网上下载别人写好的插件。轮播图、日期选择器、表单验证——copy-paste 一个 `<script>` 标签，十分钟搞定。**这是开源社区力量的第一次大规模爆发。**\n\n到 2008 年，jQuery 已经是前端标配。它解决的问题在今天已经不那么重要了——浏览器标准化之后，jQuery 的大部分功能能被原生 API 替代。但它确立的设计思想——用简洁的 API 封装复杂的底层、用插件机制撬动社区力量——影响了之后所有的框架。一个库的使命会结束，但它的遗产不会。",
      },
      {
        type: "explain",
        title: "四、Web 2.0：\"用户生成内容\"的革命",
        content: "Ajax 不只改变了技术，它改变了整个互联网的参与模式。\n\n在 Web 1.0 时代，网站是\"读\"的。你去一个网站，看它提供的内容，然后离开。你是一个消费者。\n\nAjax 让\"写\"变得和\"读\"一样流畅。你可以在页面上直接操作——拖拽、评分、评论、上传——而不用跳转到另一个页面。这个交互能力的飞跃，直接催生了一整代产品：\n\n- YouTube（2005）：上传视频，几秒钟后全世界都能看。每个普通人都成了潜在的电视台。\n- Flickr（2004）：在线照片分享，标签（tag）体系让海量图片能被自由组织。\n- Facebook（2004）：从哈佛宿舍出发，把\"社交\"这个古老的人类行为搬到了网页上。\n- Wikipedia：虽然 2001 年就创立了，但 Ajax 让它的编辑体验从\"痛苦\"变成了\"还行\"。\n\n这些产品的共同特点：**用户既是消费者也是生产者。** 普通人第一次拥有了和机构对等的发布能力。一个中学生拍的视频，可能比 CNN 的新闻获得更多观看。这不是技术的进步，这是权力的重新分配。\n\n当然，Web 2.0 也埋下了后来所有问题的种子：谁来决定你看到什么？算法推荐取代了编辑推荐的后果是什么？用户生成的内容，版权属于谁？这些问题，后来的社交媒体时代一个都没回答好。",
      },
      {
        type: "explain",
        title: "五、Firebug 与开发者工具的诞生",
        content: "2006 年，一个叫 Joe Hewitt 的开发者（也是 Firefox 的早期贡献者）为 Firefox 写了一个扩展：Firebug。\n\n在今天，打开浏览器按 F12 就能看到 HTML 结构、CSS 样式、JavaScript 控制台、网络请求——你甚至意识不到\"开发者工具\"是一个独立的东西。但在 2006 年，这些全都不可见。你写一段 JS 代码，如果出错了，只能靠 `alert()` 弹窗来调试。CSS 为什么不对？你靠猜。哪个请求慢了？你不知道。\n\nFirebug 是第一个把所有调试能力集中在一起的工具。它让前端调试从\"盲人摸象\"变成了\"看到一切\"。**这个工具对生产力的提升，可能比任何框架都大。**\n\n几年后，Chrome 内置了类似的功能（Chrome DevTools），Firebug 的使命结束，但它的遗产已经融入每一个浏览器的 DNA。Joe Hewitt 后来加入了 Facebook，领导了 Facebook 的 iOS 应用开发——又是一个\"一个人做对了一件事\"的故事。\n\n这五年的故事有一条暗线：从 Gmail 到 Ajax 到 jQuery 到 Firebug——**每一项关键突破都不是大公司的战略布局，而是少数几个人看到了别人没看到的东西。** 在 IE6 的寒冬里，他们没有等待春天，他们在冰面上生火。",
      },
    ],
  },

  // ===== 0.4 爆发：2008-2015 =====
  {
    id: "framework-spring",
    chapterId: "web-history",
    order: 4,
    title: "爆发——JavaScript 成为平台",
    musicAnalogy: "「V8 引擎如同管弦乐团的指挥——让每一个音符都在正确的时间响起。」",
    listenTo: "贝多芬《第五交响曲》— 从一个动机发展出整个交响世界，就像 JavaScript 从浏览器脚本变成了全平台语言。",
    mode: "local",
    starterCode: { html: "", css: "", js: "" },
    sections: [
      {
        type: "explain",
        title: "一、Chrome 与 V8：Google 为什么要做浏览器？",
        content: "2008 年 9 月，Google 发布了一本漫画书。38 页，没有代码，全是插画。这本漫画书宣布了一件事：Google 要做自己的浏览器——Chrome。\n\n当时所有人都觉得 Google 疯了。IE 占 70%，Firefox 占 25%，浏览器市场已经\"满\"了。而且微软 2001 年就停止了浏览器创新——整整七年，这个领域没有任何值得关注的竞争。为什么 Google 要跳进来？\n\n答案在那本漫画书的第 2 页：**\"我们需要一个更快的平台来运行 Web 应用。\"** Google 的核心收入来自搜索广告，而搜索广告的前提是用户花大量时间在 Web 上。如果 Web 太慢、太难用，用户就会回到桌面软件。Google 做浏览器不是为了和微软打架，是为了**让 Web 成为真正的应用平台**——Gmail、Google Docs、Google Maps 需要浏览器跑得和桌面软件一样快。\n\n为此，Google 在丹麦买下了一个小团队，他们的产品叫 V8——一个全新的 JavaScript 引擎。V8 不像之前的引擎那样逐行解释执行 JS，而是**直接编译成机器码再执行**。结果：JS 的执行速度提升了一个数量级。之前 JS 慢是共识，之后 JS 快成了可能。\n\n更重要的是，Google 把 V8 开源了。任何一个浏览器都可以用 V8，任何一个人都可以把 V8 嵌到自己的项目里。这个决定直接催生了下一件事。",
      },
      {
        type: "explain",
        title: "二、Node.js：JavaScript 逃出浏览器",
        content: "2009 年，一个叫 Ryan Dahl 的年轻程序员在柏林的一个 JS 会议上做了一个演示。他把 V8 引擎从 Chrome 里提取出来，包了一层 C++，加上了文件系统、网络、进程管理的能力，然后——用 JavaScript 启动了一个 HTTP 服务器。\n\n全场安静了几秒钟，然后炸了。\n\n在此之前，JavaScript 是\"浏览器的语言\"——你只能在网页里用 JS，不能碰文件、不能开服务器、不能读写数据库。服务器端编程是 Java、Python、PHP、Ruby 的地盘。Node.js 打破了这个边界。\n\nRyan Dahl 的动机很简单：\"我受够了 Apache 和 Nginx 的事件模型。我想做一个从底层就是非阻塞、事件驱动的服务器。\"而 JavaScript 天生就是事件驱动的——`onclick`、`onload`、回调函数——这种编程模型在浏览器里打磨了十几年，移植到服务器上意外地好用。\n\n**2010 年，npm 诞生。** Isaac Schlueter 写了这个包管理工具，它的核心思想简单到只有两个字：共享。你写了一个模块，`npm publish`，全世界都能 `npm install`。2010 年到 2015 年，npm 上的包从一千个涨到了二十万个。JavaScript 有了自己的 CPAN、自己的 pip、自己的 gem。前端终于有了生态。\n\nNode.js 不是\"更好用的服务器框架\"，它是**一次概念突破：JavaScript 不再是\"浏览器脚本语言\"，它是一门真正的通用编程语言。**",
      },
      {
        type: "explain",
        title: "三、框架觉醒：从面条代码到结构化",
        content: "jQuery 解决了 DOM 操作，但没有解决代码组织。一个典型的 2010 年 Web 应用：几百行 JS 写在一个文件里，全局变量互相覆盖，`$('#app').append(html)` 到处飞。当应用越来越复杂，代码像面条一样缠在一起。这种代码叫\"意大利面条代码\"，每个前端开发者都写过，没人能维护。\n\n2010 年，Backbone.js 诞生——把 MVC 架构引入前端，第一次给了数据以正式的地位（Model）。同年，Google 发布了 AngularJS——双向数据绑定：你改 JS 变量，HTML 自动更新；你在 input 框输入，JS 变量自动同步。这在当时像魔法。2011 年，Ember.js 推崇\"约定优于配置\"，把 Rails 的那套哲学搬到了前端。\n\n框架各自为政，选型成了信仰之争。Angular 用户和 Backbone 用户在论坛上吵架。但有一件事所有人都同意了：**\"需要框架\"这件事本身，已经没有争议。** 前端开发者的身份也从\"写页面的\"变成了\"前端工程师\"。\n\n但这个时期的框架有一个共同的困境：它们都在用\"手动同步\"的方式管理 UI——数据变了，你要自己决定更新哪个 DOM 元素。当数据流越来越复杂，这个模式在大型应用里会爆炸。还差一个范式突破。",
      },
      {
        type: "explain",
        title: "四、React 和 Vue：两种哲学的碰撞",
        content: "2013 年，Facebook 开源了 React。社区的初始反应是惊恐和愤怒——\"把 HTML 写在 JavaScript 里？！\"JSX 这种语法被群嘲，大家说 Facebook 把关注点分离的原则彻底搞反了。\n\n但 React 真正带来的不是 JSX，是两个概念：\n\n**Virtual DOM：** 你描述 UI 应该是什么样子，React 在内存里算出最小变更，再更新真实 DOM。你不用再手动操作 DOM——这在之前是前端开发最痛苦的部分。\n\n**单向数据流：** 数据从父组件流向子组件，状态变化可预测。和 Angular 的双向绑定相比，单向流在大型应用里更容易调试和维护。\n\n两年后，社区从群嘲变成了拥抱。React 证明了它的方式在真实大型应用（Facebook、Instagram）中是可行的。\n\n2014 年，一个叫尤雨溪的华人开发者在业余时间发布了 Vue.js。他是 Google 的前员工，之前在 Angular 团队工作。他看到了 Angular 太重的缺点，也看到了 React 太激进的障碍。Vue 的定位极其精准：**\"渐进式框架\"。** 你可以只在一个 `<div>` 上用 Vue，也可以用它构建整个 SPA。你不需要学 JSX（Vue 支持模板语法），不需要配 webpack（一开始可以直接 `<script src=\"vue.js\">`）。\n\nReact 和 Vue 不是技术之争，是两种哲学：React 相信 JavaScript 的力量，Vue 相信渐进式的友好。两条路都赢了。",
      },
      {
        type: "explain",
        title: "五、ES6 与 Babel：语言的进化",
        content: "2015 年 6 月，TC39 委员会发布了 ECMAScript 2015（ES6）。这是 JavaScript 自 1999 年以来最大的一次更新。\n\n箭头函数 `() => {}` 让 `this` 不再令人困惑。`class` 关键字让面向对象写法不再需要手动操作原型链。`Promise` 解决了回调地狱——嵌套十几层的 `function(err, data)` 终于有了尽头。模板字符串让拼接 HTML 不再需要满屏的 `+` 号。模块系统 `import/export` 让代码可以真正被组织和复用。\n\n但 ES6 有一个问题：绝大多数浏览器不支持它。IE 当然不支持，连当时的 Chrome 和 Firefox 也只实现了部分特性。\n\n**Babel 解决了这个矛盾。** 它做的事情听起来很简单：把 ES6 代码\"转译\"成 ES5 代码（所有浏览器都支持的版本）。`const` 变成 `var`，箭头函数变成普通 function，`class` 变成原型链操作。你在源码里写现代 JS，Babel 生成的是十年前的老 JS——浏览器不需要知道区别。\n\n**webpack** 在同一时期崛起，它做的事情是把 JS、CSS、图片、字体全部当成\"模块\"打包到一起。在此之前，你要手动管理 `<script>` 标签的加载顺序。在此之后，一个 `import` 就够了。\n\nBabel + webpack + npm 这三样东西，构成了前端工程化的基础设施。它们让前端从\"手工作坊\"变成了\"工厂\"。你不再手写浏览器能跑的老式代码，而是在一个现代开发环境里写代码，然后由工具链把它加工成浏览器能消化的东西。**开发体验和生产环境的分离**——这个概念改变了整个行业。",
      },
    ],
  },
  // ===== 0.5 工程化：2016-2020 =====
  {
    id: "component-revolution",
    chapterId: "web-history",
    order: 5,
    title: "工程化——从手艺到工业",
    musicAnalogy: "「工程化是把乐谱交给每个乐手，让他们各自精彩。」",
    listenTo: "斯特拉文斯基《春之祭》— 颠覆性的节奏和结构，就像前端构建工具对传统开发方式的彻底革新。",
    mode: "local",
    starterCode: { html: "", css: "", js: "" },
    sections: [
      {
        type: "explain",
        title: "一、TypeScript：给 JavaScript 装上刹车",
        content: "2012 年，微软的一个小团队发布了一个叫 TypeScript 的语言。领头人是 Anders Hejlsberg——Turbo Pascal、Delphi、C# 之父，世界上最好的编程语言设计师之一。\n\nTypeScript 做的事情说起来很简单：给 JavaScript 加上类型系统。你在写 `function add(a, b)` 时，可以写 `function add(a: number, b: number): number`。这在 2012 年被很多人嘲笑：\"JavaScript 的优点就是灵活，加类型是在开倒车。\"\n\n但 Anders Hejlsberg 看到了别人看不到的东西：**随着应用规模变大，灵活不再是优点，而是债务。** 一个不加类型的 JS 项目，三个月后你自己写的代码你自己都不知道参数该传什么。类型系统不是给机器看的（编译后类型全被擦除了），是给你看的——它是活的文档，是不可违反的契约。\n\n到 2016-2018 年，TypeScript 开始被大规模采用。Angular 2 用 TypeScript 重写，React 社区开始大量迁移，Vue 3 用 TypeScript 重写了内核。类型检查能在编译阶段发现大量 bug——那些在运行时才暴露的 `undefined is not a function` 错误，在写代码的时候就红线警告了。\n\nTypeScript 的成功有一个深刻的原因：**它没有创造新语言，它只是在 JavaScript 上\"加了一层\"。** 任何合法的 JS 都是合法的 TS，你可以渐进地加类型，一个文件一个文件来。这不是语言革命，这是语言进化。",
      },
      {
        type: "explain",
        title: "二、webpack：前端构建工具的黄金与枷锁",
        content: "到 2016 年，webpack 成了前端打包工具的事实标准。这不是因为它好用，而是因为没有别的选择。\n\nwebpack 的理念是\"一切皆模块\"——JS 是模块，CSS 是模块，图片、字体、JSON 文件全是模块。它用一个配置文件 `webpack.config.js` 描述如何把所有这些\"模块\"打包成浏览器能加载的几个文件。这个文件通常有上百行。\n\n\"webpack 配置工程师\"成了一个半开玩笑的职位名称。因为真的有人——大公司里的前端开发者——他们大部分时间不是在写业务代码，而是在配 webpack。加一个 loader，改一个 plugin，调 chunk 分割策略，优化 tree-shaking。这不是开发，这是当编译器。\n\n但 webpack 确实解决了一个真问题：2016 年的前端应用已经复杂到一个人无法管理所有依赖。几百个 npm 包，几十种文件格式，不同的加载策略、缓存策略、分包策略——必须有一台\"编译器\"来把这些变成能上线的东西。\n\n**webpack 的痛苦不是它的错，是\"浏览器不能直接跑现代 JS 代码\"这个事实的错。** 只要浏览器和开发者的代码之间有差距，就要有工具来填。但这个差距意味着任何改进构建工具的努力都能收获巨大的生产力提升。下一个工具，就是从这种痛苦中诞生的。",
      },
      {
        type: "explain",
        title: "三、Vite 与\"秒级\"开发体验",
        content: "2018 年，尤雨溪发布了一个小工具的早期原型。当时没人注意。2021 年，Vite 2.0 正式发布，整个前端社区炸了。\n\nVite 的核心理念：**利用浏览器原生支持的 ES Modules。** 传统构建工具（webpack）在启动开发服务器时，要先把整个项目的所有文件打包一遍，再启动服务器。项目越大，等得越久。一个中型项目启动 30-60 秒，大型项目 2-3 分钟。\n\nVite 不打包。它直接利用 `<script type=\"module\">` 让浏览器按需加载——当浏览器看到 `import { foo } from './bar.js'` 时，它直接向开发服务器发一个 HTTP 请求要这个文件。Vite 只在浏览器请求时才编译用到的文件，而且用 esbuild（用 Go 写的超快编译器）预编译依赖。\n\n结果：开发服务器启动从分钟级降到**秒级**。热更新几乎瞬间完成。\"改一行代码，喝口水，等 webpack 重新编译\"的日常消失了。\n\nVite 不是第一个做\"不打包\"的（Snowpack 更早），但它是第一个把它做到生产可用的。2021 年后，几乎所有新项目都开始用 Vite。一个工具的成功不取决于它有多先进，取决于它是否在**正确的时间出现**——到 2021 年，99% 的浏览器都支持 ES Modules 了。",
      },
      {
        type: "explain",
        title: "四、组件化的全面胜利",
        content: "2016 年到 2020 年，React、Vue、Angular 三足鼎立的格局基本定型。Angular 在企业级占据优势，React 在硅谷科技公司是标准，Vue 在中型项目和开源社区里最强。看起来在打架，实际上在做同一件事：**推广组件化思维。**\n\n组件化的核心思想：把 UI 拆成可复用的独立单元——按钮、卡片、表单、导航栏——每一个组件有自己的模板、逻辑和样式。然后像搭积木一样把组件拼成页面。\n\nVue 的单文件组件（`.vue`）把这个理念做到了极致：一个 `.vue` 文件里，`<template>` 写 HTML、`<script>` 写逻辑、`<style scoped>` 写样式——三样东西在一个文件里，但职责清晰。\"关注点分离\"不再是\"按技术类型分离\"（HTML、CSS、JS 各放一个文件），而是\"按功能分离\"（一个按钮的所有代码在一起）。\n\n到 2020 年，组件化思维已经不是选型问题，是默认假设。你不可能让一个前端开发者回到 jQuery 的 `$('#app').append(html)` 时代。这不是怀旧，是 PTSD。\n\n前端开发者在 2016 年从\"写页面的\"变成了\"前端工程师\"，到了 2020 年进一步变成了\"UI 架构师\"。你设计的不再是页面，是组件树、数据流、状态管理策略。**质变已经完成了。**",
      },
      {
        type: "explain",
        title: "五、\"前端疲劳\"与永不停止的进化",
        content: "2016 年到 2020 年，社区出现了一个热词：**前端疲劳症。**\n\n每个月都有新工具出来。今天 Grunt 是标配，明天 Gulp 更好；今天 Bower 管前端依赖，明天 npm 一把梭；今天 React 是未来，明天 Vue 更简单，后天 Svelte 是真正的未来。你刚学会一个框架，它的替代品就已经在 HN 首页了。\n\n但\"疲劳\"的另一面是\"活力\"。前端工具生态之所以变化这么快，是因为**这个领域太年轻了。** 后端开发有 50 年的沉淀积累，前端真正的工程化也就 10 年。它在快速试错——一百个工具里九十九个会死，但活下来的那一个会让所有人的效率提升一个台阶。\n\n到 2020 年，前端开发的基本范式已经确定：**组件化架构 + 声明式 UI + 构建工具链。** 这三点和 2010 年相比是质的飞跃。CSS 也有了 CSS Variables、Flexbox、CSS Grid——你不再需要用 `<table>` 做布局了，这件事等了 25 年终于实现了。\n\n回头看这十年，每一次进步都在解决上一个方案带来的问题：jQuery 解决了原生 DOM 操作，React 解决了 jQuery 面条代码，Vite 解决了 webpack 配置地狱。每一个解决方案又引入新的问题，等着下一个方案来解决。\n\n**这就是前端永远有趣的原因。**",
      },
    ],
  },

  // ===== 0.6 AI 时代：2016-2026 =====
  {
    id: "ai-era",
    chapterId: "web-history",
    order: 6,
    title: "AI 时代——从写代码到写 Prompt",
    musicAnalogy: "「最快的工具不是跑得最快，而是知道什么时候该跑。」",
    listenTo: "John Cage《4分33秒》— 有时候沉默本身就是音乐，就像有时最好的代码是不写代码。",
    mode: "local",
    starterCode: { html: "", css: "", js: "" },
    sections: [
      {
        type: "explain",
        title: "一、AI 的序曲：从围棋到 Transformer",
        content: "2016 年 3 月，韩国首尔。AlphaGo 对阵李世石九段。五局三胜制，AI 赢了四局。全世界在看这场比赛——不是围棋爱好者，是普通人。因为这是第一次，一个\"会思考的机器\"打败了人类顶尖智力选手。AI 这个词第一次从学术论文走进了大众视野。\n\n但真正改变编程世界的，是另一件事。\n\n2017 年，Google 的一个研究团队发表了一篇论文：《Attention is All You Need》。标题像摇滚专辑名，内容是提出了一个叫 **Transformer** 的神经网络架构。它用了一种叫\"自注意力机制\"的方法，让机器第一次能\"理解上下文\"——不是看一个词前面的几个词，而是同时看整个段落的所有词。\n\n这篇论文的八位作者，后来全部离开了 Google。他们各自创办或加入了不同的 AI 公司，有些互相竞争，有些后来合并。一篇论文，八个人，像种子一样散到整个行业，长成了今天你能看到的几乎所有大语言模型。\n\n2018 年，OpenAI 发布 GPT-1。1.17 亿参数——在今天的标准下是玩具，但它是\"用 Transformer 预测下一个词\"这个思路的第一次验证。2019 年，GPT-2 发布，15 亿参数，能写连贯的段落。OpenAI 一度拒绝开源，理由是\"太危险了\"——这在当时被群嘲，但回头看，他们只是比大多数人早了三年看到这条路的尽头。\n\n2020 年，GPT-3 发布，1750 亿参数。它能写文章、写代码、做翻译、写诗、模仿任何人的语气。同年，微软宣布收购 GitHub——这个组合在后来看，意味深长。",
      },
      {
        type: "explain",
        title: "二、Copilot：AI 第一次进入编辑器",
        content: "2021 年 6 月，GitHub Copilot 发布技术预览版。它基于 OpenAI Codex——一个专门在代码上训练的 GPT 模型。\n\n三个月后，Twitter 上全是 Copilot 的视频。开发者写一行注释 `// sort an array of objects by date`，然后按 Tab。Copilot 补全了整整 20 行代码，包括边界情况处理。\n\n社区的反应经历了一个经典的五个阶段：\n\n**否认：** \"这不可能有用。AI 生成的代码一定有 bug。\"\n\n**愤怒：** \"这是在消灭程序员的工作！这是对编程艺术的侮辱！\"\n\n**讨价还价：** \"好吧，它生成样板代码还行……但核心逻辑还是要人写。\"\n\n**沮丧：** \"Copilot 写 SQL 查询比我快十倍。我学了十年，AI 学了几亿个 GitHub 仓库。这公平吗？\"\n\n**接受：** \"我做代码审查，AI 做初稿。这不是取代，是分工。\"\n\n到 2022 年，Copilot 已经有了超过 100 万付费用户。\"AI 帮你写代码\"从一个概念变成了日常。它没有消灭程序员，但它改变了\"写代码\"这个动作在开发者工作中的比重。",
      },
      {
        type: "explain",
        title: "三、ChatGPT：两个月，一亿用户",
        content: "2022 年 11 月 30 日，OpenAI 发布了一个\"研究预览\"。产品叫 ChatGPT。团队预计会有几万用户来测试，他们提前准备了扩容方案。\n\n两个月后，ChatGPT 的用户数超过一亿。**人类历史上增速最快的应用。** 推特花了五年才达到一亿用户，TikTok 花了九个月，ChatGPT 花了两个月。\n\n这不止是技术突破，这是文化现象。所有人——程序员、老师、律师、医生、学生、作家、公务员——所有人都在同一周里意识到：\"它能听懂我说话。它说的话像人会说的。我让它干啥它就干啥。\"\n\n2023 年 3 月，GPT-4 发布。它不仅能聊天，还能看图片、分析图表、解释笑话。同月，Anthropic 发布 Claude——由 GPT-3 论文的核心作者们创建的公司带来的产品，在安全性和长文本处理上有独特优势。\n\n到 2023 年底，AI 编程助手从\"酷炫工具\"变成了\"标配\"。Cursor、Windsurf 等 AI-native IDE 涌现，它们不是在传统编辑器上加 AI 功能，而是围绕 AI 重新设计了编辑器的交互方式。开发者不再从零写每一行代码。工作重心从\"怎么写\"变成了\"写什么\"和\"对不对\"。\n\n**编程的本质从来没有变过：把你的意图转化为机器能理解的指令。** 变了的是转化方式——从手写汇编，到手写高级语言，到对着 AI 描述意图。每一次变化，都让\"意图\"离\"实现\"更近了一步。",
      },
      {
        type: "explain",
        title: "四、AI Coding Agent：从辅助到协作",
        content: "2024 年到 2025 年，AI 编程工具发生了质的变化：从\"补全代码\"变成了\"独立完成任务\"。\n\nv0、Claude Artifacts 等工具可以：你描述一个界面——\"一个带有搜索框和过滤器的产品列表页面\"——AI 直接生成可交互的完整前端代码。你可以在浏览器里看到它，点击按钮有反应，样式是完整的。这在一个使用 `<table>` 做布局的年代是不可想象的。\n\n2025 年，AI Coding Agent 出现。Claude Code、Gemini Code Assist、Copilot Agent 模式——它们不只是补全代码，它们能**理解整个项目结构、运行终端命令、查看报错信息、同时修改多个文件。**\n\n一个典型的 2025 年开发场景：你打开项目，对 Agent 说\"帮我加一个用户登录功能，用 JWT\"。Agent 读了你的项目结构，发现你用的是 Vue + Express，然后它创建了登录页面组件、写了路由守卫、在 Express 上加了一个 `/api/login` 接口、更新了数据库模型。它做了五步操作，你只需要在产品做好之后检查每一步是否合理。\n\n你的角色变了。从\"写代码的人\"变成了\"审查代码的人\"。从\"实现者\"变成了\"决策者\"。你不需要知道 JWT 的具体实现细节，但你必须知道 JWT 和 Session 的区别、什么时候该用哪个、安全风险在哪。\n\n**AI 把\"怎么做\"自动化了，但\"做什么\"和\"为什么这样做\"——这两个问题，仍然需要人来回答。**",
      },
      {
        type: "explain",
        title: "五、AI 时代，什么不会变？",
        content: "2026 年，前端开发的工作流已经彻底变了。但这不意味着开发者被取代。恰恰相反，**理解代码的能力、系统思维的能力、判断 AI 产出是否正确的能力——这些比以前更值钱了。**\n\n为什么？因为 AI 的核心能力是\"生成\"，不是\"判断\"。它能写出一百行代码，但它不知道这一百行代码在你的系统里会不会引发连锁崩溃。它能实现一个功能，但它不知道这个功能会不会让你的用户体验更糟。它能给你十种方案，但它不知道哪一种符合你团队的价值观和技术战略。\n\n这些判断，需要：\n- 理解系统的边界和约束\n- 理解用户真正需要什么（而不是他们说了什么）\n- 理解什么值得做、什么不该做\n- 理解代码写完之后谁来维护、怎么维护\n\nAI 没有消除编程中的困难问题——它只是把时间从\"怎么写\"腾出来，让你有更多时间思考\"该写什么\"。\n\n1990 年，一个人在日内瓦写下几页纸，创造了万维网。他当时不知道这会把人类引向哪里。三十六年后，一个人对着 AI 描述需求，几分钟能搭出一个完整的 Web 应用。**工具在变，但工具的尽头始终站着那个知道自己要做什么的人。**\n\n从 CERN 办公室里的第一行 HTML，到你正在读的这一页，这条路走了三十六年。筚路蓝缕，以启山林。\n\n这条路还在继续。",
      },
    ],
  },


];

export interface PrologueCard {
  id: string
  lessonId: string
  title: string
  subtitle: string
  tagline: string
  thumbnailSvg: string
}

export const prologueCards: PrologueCard[] = [
  {
    id: "dawn-era",
    lessonId: "dawn-era",
    title: "诞生",
    subtitle: "从 0 到 1",
    tagline: "1989 年，日内瓦。一个人，五字批语，万维网的命运就此改变。",
    thumbnailSvg: `<svg viewBox="0 0 320 180" width="100%" style="display:block;background:#FFF8F0;border-radius:4px;" role="img">
      <title>洪荒时代</title>
      <!-- 时间轴线 -->
      <line x1="30" y1="115" x2="290" y2="115" stroke="#D4C5A9" stroke-width="1.5"/>
      <circle cx="70" cy="115" r="4" fill="#C9A96E"/>
      <circle cx="190" cy="115" r="4" fill="#C9A96E"/>
      <text x="70" y="135" font-family="monospace" font-size="6" fill="#8B5E3C" text-anchor="middle">1989</text>
      <text x="190" y="135" font-family="monospace" font-size="6" fill="#8B5E3C" text-anchor="middle">1991</text>
      <!-- 1989: 提案文档 -->
      <rect x="30" y="30" width="80" height="55" rx="4" fill="#FFFAF2" stroke="#D4C5A9" stroke-width="1"/>
      <rect x="36" y="36" width="68" height="8" rx="2" fill="#8B2E2E" opacity="0.15"/>
      <text x="40" y="43" font-family="sans-serif" font-size="5" fill="#8B2E2E" font-weight="bold">CERN 提案</text>
      <text x="40" y="56" font-family="Georgia,serif" font-size="4" fill="#6B5A4E" font-style="italic">Information</text>
      <text x="40" y="64" font-family="Georgia,serif" font-size="4" fill="#6B5A4E" font-style="italic">Management:</text>
      <text x="40" y="72" font-family="Georgia,serif" font-size="4" fill="#6B5A4E" font-style="italic">A Proposal</text>
      <text x="40" y="82" font-family="sans-serif" font-size="4" fill="#8B5E3C">Tim Berners-Lee</text>
      <!-- 连线 -->
      <line x1="110" y1="58" x2="142" y2="58" stroke="#C9A96E" stroke-width="1" stroke-dasharray="3,2"/>
      <polygon points="142,55 142,61 147,58" fill="#C9A96E"/>
      <!-- 1991: 第一个网页 -->
      <rect x="150" y="22" width="90" height="70" rx="6" fill="#3D2B1F"/>
      <rect x="156" y="28" width="78" height="12" rx="2" fill="#5B8C5A" opacity="0.3"/>
      <text x="160" y="36" font-family="monospace" font-size="5" fill="#5B8C5A">http://info.cern.ch</text>
      <text x="160" y="54" font-family="sans-serif" font-size="7" fill="#FFF8F0" font-weight="bold">World Wide Web</text>
      <text x="160" y="66" font-family="monospace" font-size="4" fill="#C9A96E">&lt;html&gt;&lt;head&gt;&lt;/head&gt;</text>
      <text x="160" y="76" font-family="monospace" font-size="4" fill="#C9A96E">&lt;body&gt;Hello World&lt;/body&gt;</text>
      <text x="160" y="88" font-family="monospace" font-size="4" fill="#C9A96E">&lt;/html&gt;</text>
      <!-- 底部 -->
      <text x="160" y="165" font-family="sans-serif" font-size="10" fill="#6B5A4E" text-anchor="middle">「那一年，日内瓦」</text>
    </svg>`,
  },
  {
    id: "browser-war",
    lessonId: "browser-war",
    title: "混战",
    subtitle: "浏览器战争与脚本革命",
    tagline: "十天创造的语言，免费的浏览器——赢家通吃的时代。",
    thumbnailSvg: `<svg viewBox="0 0 320 180" width="100%" style="display:block;background:#FFFAF2;border-radius:4px;" role="img">
      <title>浏览器战争</title>
      <rect x="15" y="35" width="125" height="96" rx="6" fill="#F0F4FF" stroke="#3B7DD8" stroke-width="2"/>
      <rect x="15" y="35" width="125" height="22" rx="6" fill="#3B7DD8"/>
      <rect x="15" y="49" width="125" height="8" fill="#3B7DD8"/>
      <text x="78" y="51" font-family="sans-serif" font-size="10" fill="#FFF8F0" text-anchor="middle" font-weight="bold">NETSCAPE</text>
      <text x="78" y="76" font-family="sans-serif" font-size="8" fill="#3B7DD8" text-anchor="middle">90% 市占率</text>
      <text x="78" y="93" font-family="sans-serif" font-size="7" fill="#6B5A4E" text-anchor="middle">JavaScript</text>
      <text x="78" y="106" font-family="sans-serif" font-size="7" fill="#6B5A4E" text-anchor="middle">插件、Cookie</text>
      <text x="160" y="80" font-family="sans-serif" font-size="20" text-anchor="middle">⚔️</text>
      <rect x="180" y="35" width="125" height="96" rx="6" fill="#F0F8F0" stroke="#107C10" stroke-width="2"/>
      <rect x="180" y="35" width="125" height="22" rx="6" fill="#107C10"/>
      <rect x="180" y="49" width="125" height="8" fill="#107C10"/>
      <text x="243" y="51" font-family="sans-serif" font-size="10" fill="#FFF8F0" text-anchor="middle" font-weight="bold">INTERNET EXPLORER</text>
      <text x="243" y="76" font-family="sans-serif" font-size="8" fill="#107C10" text-anchor="middle">95% 最终份额</text>
      <text x="243" y="93" font-family="sans-serif" font-size="7" fill="#6B5A4E" text-anchor="middle">免费捆绑</text>
      <text x="243" y="106" font-family="sans-serif" font-size="7" fill="#6B5A4E" text-anchor="middle">Windows 集成</text>
      <text x="160" y="165" font-family="sans-serif" font-size="10" fill="#6B5A4E" text-anchor="middle">「赢家不是技术更好的那个」</text>
    </svg>`,
  },
  {
    id: "ajax-web20",
    lessonId: "ajax-web20",
    title: "破冰",
    subtitle: "从停滞到 Ajax",
    tagline: "一个沉睡五年的 API，让网页从静态文档变成了动态应用。",
    thumbnailSvg: `<svg viewBox="0 0 320 180" width="100%" style="display:block;background:#FFF8F0;border-radius:4px;" role="img">
      <title>Ajax 时代</title>
      <rect x="30" y="20" width="260" height="18" rx="3" fill="#E8DDCC"/>
      <text x="40" y="33" font-family="sans-serif" font-size="10" fill="#3D2B1F" font-weight="bold">Gmail</text>
      <text x="80" y="33" font-family="sans-serif" font-size="8" fill="#8B2E2E">搜索邮件</text>
      <text x="200" y="33" font-family="sans-serif" font-size="6" fill="#8B5E3C" opacity="0.7">1GB · 邀请制</text>
      <rect x="30" y="42" width="70" height="100" rx="3" fill="#FFFAF2" stroke="#D4C5A9" stroke-width="1"/>
      <rect x="36" y="48" width="58" height="14" rx="3" fill="#C94545"/>
      <text x="65" y="58" font-family="sans-serif" font-size="6" fill="#FFF8F0" text-anchor="middle">写邮件</text>
      <text x="36" y="80" font-family="sans-serif" font-size="6" fill="#8B2E2E" font-weight="bold">收件箱</text>
      <text x="36" y="96" font-family="sans-serif" font-size="6" fill="#6B5A4E">星标</text>
      <rect x="108" y="42" width="182" height="100" rx="3" fill="#FFFAF2" stroke="#D4C5A9" stroke-width="1"/>
      <rect x="114" y="52" width="170" height="18" rx="2" fill="#F5EDDD"/>
      <text x="120" y="64" font-family="sans-serif" font-size="6" fill="#3D2B1F" font-weight="bold">Google</text>
      <text x="150" y="64" font-family="sans-serif" font-size="6" fill="#6B5A4E">欢迎使用 Gmail！</text>
      <rect x="114" y="76" width="170" height="18" rx="2" fill="#FFF8F0"/>
      <text x="120" y="88" font-family="sans-serif" font-size="6" fill="#3D2B1F">张三</text>
      <text x="150" y="88" font-family="sans-serif" font-size="6" fill="#6B5A4E">周末聚会</text>
      <rect x="114" y="100" width="170" height="18" rx="2" fill="#FFF8F0"/>
      <text x="120" y="112" font-family="sans-serif" font-size="6" fill="#3D2B1F">李四</text>
      <text x="150" y="112" font-family="sans-serif" font-size="6" fill="#6B5A4E">推荐一个链接</text>
      <line x1="108" y1="120" x2="290" y2="120" stroke="#D4C5A9" stroke-width="1"/>
      <text x="210" y="136" font-family="sans-serif" font-size="6" fill="#5B8C5A" text-anchor="middle">✓ 页面不会刷新</text>
      <text x="160" y="170" font-family="sans-serif" font-size="10" fill="#6B5A4E" text-anchor="middle">「2004 年 4 月 1 日」</text>
    </svg>`,
  },
  {
    id: "framework-spring",
    lessonId: "framework-spring",
    title: "爆发",
    subtitle: "JavaScript 成为平台",
    tagline: "V8 引擎、Node.js、React——十年间，JavaScript 统治了世界。",
    thumbnailSvg: `<svg viewBox="0 0 320 180" width="100%" style="display:block;background:#FFFAF2;border-radius:4px;" role="img">
      <title>框架春秋</title>
      <rect x="15" y="30" width="130" height="100" rx="4" fill="#F5EDDD" stroke="#D4C5A9" stroke-width="1"/>
      <text x="80" y="50" font-family="sans-serif" font-size="9" fill="#8B2E2E" text-anchor="middle" font-weight="bold">原生 JS</text>
      <text x="35" y="66" font-family="monospace" font-size="6" fill="#3D2B1F">var el = document.</text>
      <text x="35" y="76" font-family="monospace" font-size="6" fill="#3D2B1F">  getElementById('x');</text>
      <text x="35" y="90" font-family="monospace" font-size="6" fill="#3D2B1F">el.style.display = 'b';</text>
      <text x="35" y="104" font-family="monospace" font-size="6" fill="#3D2B1F">el.className = 'active';</text>
      <text x="160" y="90" font-family="sans-serif" font-size="16" text-anchor="middle">🚀</text>
      <rect x="175" y="30" width="130" height="100" rx="4" fill="#FFF8F0" stroke="#C9A96E" stroke-width="1.5"/>
      <text x="240" y="50" font-family="sans-serif" font-size="9" fill="#8B5E3C" text-anchor="middle" font-weight="bold">jQuery</text>
      <text x="189" y="68" font-family="monospace" font-size="9" fill="#5B8C5A">$('#menu')</text>
      <text x="189" y="82" font-family="monospace" font-size="9" fill="#5B8C5A">  .show()</text>
      <text x="189" y="96" font-family="monospace" font-size="9" fill="#5B8C5A">  .addClass('a');</text>
      <text x="160" y="170" font-family="sans-serif" font-size="10" fill="#6B5A4E" text-anchor="middle">「jq.com — 两个字母改变一切」</text>
    </svg>`,
  },
  {
    id: "component-revolution",
    lessonId: "component-revolution",
    title: "工程化",
    subtitle: "从手艺到工业",
    tagline: "TypeScript、webpack、Vite——前端从手工作坊变成了流水线。",
    thumbnailSvg: `<svg viewBox="0 0 320 180" width="100%" style="display:block;background:#FFF8F0;border-radius:4px;" role="img">
      <title>组件化革命</title>
      <rect x="100" y="18" width="120" height="22" rx="5" fill="#8B2E2E"/>
      <text x="160" y="33" font-family="sans-serif" font-size="10" fill="#FFF8F0" text-anchor="middle" font-weight="bold">&lt;App /&gt;</text>
      <line x1="160" y1="40" x2="70" y2="56" stroke="#8B5E3C" stroke-width="1.5"/>
      <line x1="160" y1="40" x2="160" y2="56" stroke="#8B5E3C" stroke-width="1.5"/>
      <line x1="160" y1="40" x2="250" y2="56" stroke="#8B5E3C" stroke-width="1.5"/>
      <rect x="30" y="56" width="80" height="20" rx="4" fill="#8B5E3C"/>
      <text x="70" y="70" font-family="sans-serif" font-size="8" fill="#FFF8F0" text-anchor="middle">&lt;Header /&gt;</text>
      <rect x="120" y="56" width="80" height="20" rx="4" fill="#8B5E3C"/>
      <text x="160" y="70" font-family="sans-serif" font-size="8" fill="#FFF8F0" text-anchor="middle">&lt;Main /&gt;</text>
      <rect x="210" y="56" width="80" height="20" rx="4" fill="#8B5E3C"/>
      <text x="250" y="70" font-family="sans-serif" font-size="8" fill="#FFF8F0" text-anchor="middle">&lt;Footer /&gt;</text>
      <line x1="160" y1="76" x2="127" y2="90" stroke="#8B5E3C" stroke-width="1"/>
      <line x1="160" y1="76" x2="192" y2="90" stroke="#8B5E3C" stroke-width="1"/>
      <rect x="100" y="90" width="55" height="16" rx="3" fill="#D4C5A9"/>
      <text x="127" y="101" font-family="sans-serif" font-size="6" fill="#3D2B1F" text-anchor="middle">&lt;Card /&gt;</text>
      <rect x="165" y="90" width="55" height="16" rx="3" fill="#D4C5A9"/>
      <text x="192" y="101" font-family="sans-serif" font-size="6" fill="#3D2B1F" text-anchor="middle">&lt;List /&gt;</text>
      <rect x="60" y="122" width="200" height="24" rx="4" fill="#5B8C5A"/>
      <text x="160" y="137" font-family="sans-serif" font-size="8" fill="#FFF8F0" text-anchor="middle">State → Virtual DOM → Patch</text>
      <text x="160" y="170" font-family="sans-serif" font-size="10" fill="#6B5A4E" text-anchor="middle">「2013 年，一个被群嘲的 idea」</text>
    </svg>`,
  },
  {
    id: "ai-era",
    lessonId: "ai-era",
    title: "AI 时代",
    subtitle: "从写代码到写 Prompt",
    tagline: "从 AlphaGo 到 Claude Code——AI 改变了写代码的方式，但没有改变写代码的本质。",
    thumbnailSvg: `<svg viewBox="0 0 320 180" width="100%" style="display:block;background:#FFFAF2;border-radius:4px;" role="img">
      <title>智能时代</title>
      <rect x="15" y="30" width="130" height="100" rx="4" fill="#F5EDDD" stroke="#D4C5A9" stroke-width="1"/>
      <text x="80" y="47" font-family="sans-serif" font-size="9" fill="#8B2E2E" text-anchor="middle" font-weight="bold">2021 之前</text>
      <text x="25" y="65" font-family="monospace" font-size="6" fill="#3D2B1F">function fib(n) {</text>
      <text x="25" y="79" font-family="monospace" font-size="6" fill="#3D2B1F">  if (n &lt;= 1)</text>
      <text x="25" y="93" font-family="monospace" font-size="6" fill="#3D2B1F">    return n</text>
      <text x="25" y="107" font-family="monospace" font-size="6" fill="#3D2B1F">  return fib(n-1)</text>
      <text x="25" y="121" font-family="monospace" font-size="6" fill="#3D2B1F">    + fib(n-2)</text>
      <text x="160" y="80" font-family="sans-serif" font-size="16" text-anchor="middle">👉</text>
      <rect x="175" y="30" width="130" height="100" rx="4" fill="#F0F0FF" stroke="#6B6BBF" stroke-width="1.5"/>
      <text x="240" y="47" font-family="sans-serif" font-size="9" fill="#6B6BBF" text-anchor="middle" font-weight="bold">2026 · AI 协作</text>
      <text x="185" y="63" font-family="monospace" font-size="6" fill="#5B8C5A">// 写一个斐波那契</text>
      <text x="185" y="75" font-family="monospace" font-size="6" fill="#5B8C5A">// 函数，带缓存</text>
      <rect x="180" y="82" width="120" height="18" rx="3" fill="#E8E8FF"/>
      <text x="190" y="95" font-family="monospace" font-size="6" fill="#6B6BBF">🤖 AI 生成完成 ✓</text>
      <text x="160" y="165" font-family="sans-serif" font-size="10" fill="#6B5A4E" text-anchor="middle">「从写代码到写 Prompt」</text>
    </svg>`,
  },
];
