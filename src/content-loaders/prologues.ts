export interface PrologueCard {
  id: string
  lessonId: string
  title: string
  subtitle: string
  tagline: string
  thumbnailSrc: string
}

export const prologueCards: PrologueCard[] = [
  {
    id: 'dawn-era',
    lessonId: 'dawn-era',
    title: '诞生',
    subtitle: '从 0 到 1',
    tagline: '1989 年，日内瓦。一个人，五字批语，万维网的命运就此改变。',
    thumbnailSrc: `${import.meta.env.BASE_URL}images/prologue-dawn-era.svg`,
  },
  {
    id: 'browser-war',
    lessonId: 'browser-war',
    title: '混战',
    subtitle: '浏览器战争与脚本革命',
    tagline: '十天创造的语言，免费的浏览器——赢家通吃的时代。',
    thumbnailSrc: `${import.meta.env.BASE_URL}images/prologue-browser-war.svg`,
  },
  {
    id: 'ajax-web20',
    lessonId: 'ajax-web20',
    title: '破冰',
    subtitle: '从停滞到 Ajax',
    tagline: '一个沉睡五年的 API，让网页从静态文档变成了动态应用。',
    thumbnailSrc: `${import.meta.env.BASE_URL}images/prologue-ajax-web20.svg`,
  },
  {
    id: 'framework-spring',
    lessonId: 'framework-spring',
    title: '爆发',
    subtitle: 'JavaScript 成为平台',
    tagline: 'V8 引擎、Node.js、React——十年间，JavaScript 统治了世界。',
    thumbnailSrc: `${import.meta.env.BASE_URL}images/prologue-framework-spring.svg`,
  },
  {
    id: 'component-revolution',
    lessonId: 'component-revolution',
    title: '工程化',
    subtitle: '从手艺到工业',
    tagline: 'TypeScript、webpack、Vite——前端从手工作坊变成了流水线。',
    thumbnailSrc: `${import.meta.env.BASE_URL}images/prologue-component-revolution.svg`,
  },
  {
    id: 'ai-era',
    lessonId: 'ai-era',
    title: 'AI 时代',
    subtitle: '从写代码到写 Prompt',
    tagline: '从 AlphaGo 到 Claude Code——AI 改变了写代码的方式，但没有改变写代码的本质。',
    thumbnailSrc: `${import.meta.env.BASE_URL}images/prologue-ai-era.svg`,
  },
  {
    id: 'music-to-frontend-map',
    lessonId: 'music-to-frontend-map',
    title: '迁移',
    subtitle: '从音乐训练到前端能力',
    tagline: '结构感、层次感、排练习惯与协作经验，不会消失，只会换一种作品形式继续发挥。',
    thumbnailSrc: `${import.meta.env.BASE_URL}images/prologue-music-to-frontend-map.svg`,
  },
]
