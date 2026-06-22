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
    id: 'dawn-era',
    lessonId: 'dawn-era',
    title: '诞生',
    subtitle: '从 0 到 1',
    tagline: '1989 年，日内瓦。一个人，五字批语，万维网的命运就此改变。',
    thumbnailSvg: `<svg viewBox="0 0 320 180" width="100%" style="display:block;background:#FFF8F0;border-radius:4px;" role="img">
      <title>洪荒时代</title>
      <line x1="30" y1="115" x2="290" y2="115" stroke="#D4C5A9" stroke-width="1.5"/>
      <circle cx="70" cy="115" r="4" fill="#C9A96E"/>
      <circle cx="190" cy="115" r="4" fill="#C9A96E"/>
      <text x="70" y="135" font-family="monospace" font-size="6" fill="#8B5E3C" text-anchor="middle">1989</text>
      <text x="190" y="135" font-family="monospace" font-size="6" fill="#8B5E3C" text-anchor="middle">1991</text>
      <rect x="30" y="30" width="80" height="55" rx="4" fill="#FFFAF2" stroke="#D4C5A9" stroke-width="1"/>
      <rect x="36" y="36" width="68" height="8" rx="2" fill="#8B2E2E" opacity="0.15"/>
      <text x="40" y="43" font-family="sans-serif" font-size="5" fill="#8B2E2E" font-weight="bold">CERN 提案</text>
      <text x="40" y="56" font-family="Georgia,serif" font-size="4" fill="#6B5A4E" font-style="italic">Information</text>
      <text x="40" y="64" font-family="Georgia,serif" font-size="4" fill="#6B5A4E" font-style="italic">Management:</text>
      <text x="40" y="72" font-family="Georgia,serif" font-size="4" fill="#6B5A4E" font-style="italic">A Proposal</text>
      <text x="40" y="82" font-family="sans-serif" font-size="4" fill="#8B5E3C">Tim Berners-Lee</text>
      <line x1="110" y1="58" x2="142" y2="58" stroke="#C9A96E" stroke-width="1" stroke-dasharray="3,2"/>
      <polygon points="142,55 142,61 147,58" fill="#C9A96E"/>
      <rect x="150" y="22" width="90" height="70" rx="6" fill="#3D2B1F"/>
      <rect x="156" y="28" width="78" height="12" rx="2" fill="#5B8C5A" opacity="0.3"/>
      <text x="160" y="36" font-family="monospace" font-size="5" fill="#5B8C5A">http://info.cern.ch</text>
      <text x="160" y="54" font-family="sans-serif" font-size="7" fill="#FFF8F0" font-weight="bold">World Wide Web</text>
      <text x="160" y="66" font-family="monospace" font-size="4" fill="#C9A96E">&lt;html&gt;&lt;head&gt;&lt;/head&gt;</text>
      <text x="160" y="76" font-family="monospace" font-size="4" fill="#C9A96E">&lt;body&gt;Hello World&lt;/body&gt;</text>
      <text x="160" y="88" font-family="monospace" font-size="4" fill="#C9A96E">&lt;/html&gt;</text>
      <text x="160" y="165" font-family="sans-serif" font-size="10" fill="#6B5A4E" text-anchor="middle">「那一年，日内瓦」</text>
    </svg>`,
  },
  {
    id: 'browser-war',
    lessonId: 'browser-war',
    title: '混战',
    subtitle: '浏览器战争与脚本革命',
    tagline: '十天创造的语言，免费的浏览器——赢家通吃的时代。',
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
    id: 'ajax-web20',
    lessonId: 'ajax-web20',
    title: '破冰',
    subtitle: '从停滞到 Ajax',
    tagline: '一个沉睡五年的 API，让网页从静态文档变成了动态应用。',
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
    id: 'framework-spring',
    lessonId: 'framework-spring',
    title: '爆发',
    subtitle: 'JavaScript 成为平台',
    tagline: 'V8 引擎、Node.js、React——十年间，JavaScript 统治了世界。',
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
    id: 'component-revolution',
    lessonId: 'component-revolution',
    title: '工程化',
    subtitle: '从手艺到工业',
    tagline: 'TypeScript、webpack、Vite——前端从手工作坊变成了流水线。',
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
    id: 'ai-era',
    lessonId: 'ai-era',
    title: 'AI 时代',
    subtitle: '从写代码到写 Prompt',
    tagline: '从 AlphaGo 到 Claude Code——AI 改变了写代码的方式，但没有改变写代码的本质。',
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
]
