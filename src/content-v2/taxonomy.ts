export type TrackV2 = {
  id: string
  title: string
  subtitle: string
  icon: string
  order: number
}

export type ChapterV2 = {
  id: string
  title: string
  subtitle: string
  icon: string
  order: number
}

export const tracksV2: TrackV2[] = [
  {
    id: 'prologue',
    title: '筚路蓝缕',
    subtitle: '回望 Web 的三十六年 — 从 0 到 1，从浏览器战争到 AI 时代',
    icon: '🏮',
    order: 0,
  },
  {
    id: 'fundamentals',
    title: '乐理篇',
    subtitle: 'HTML/CSS/JS 基础——从识谱到演奏，写出你的第一段旋律',
    icon: '🎼',
    order: 1,
  },
  {
    id: 'framework',
    title: '合奏篇',
    subtitle: 'JS 进阶与异步编程——从独奏到协奏，从回调到 Promise',
    icon: '🎻',
    order: 2,
  },
  {
    id: 'engineering',
    title: '登台篇',
    subtitle: '工程化工具与 Vue 框架——让你的作品登上舞台，像交响乐团一样组织代码',
    icon: '🎤',
    order: 3,
  },
  {
    id: 'ai-collaboration',
    title: '指挥篇',
    subtitle: 'AI 协作——从演奏者到指挥家，一个人就是一支乐团',
    icon: '🤖',
    order: 4,
  },
  {
    id: 'projects',
    title: '作品集',
    subtitle: '每个阶段结束，你都会完成一个音乐收藏库的新版本',
    icon: '🎁',
    order: 5,
  },
]

export const chaptersV2: ChapterV2[] = [
  {
    id: 'web-history',
    title: 'Web 历史序章',
    subtitle: '筚路蓝缕，以启山林',
    icon: '🏮',
    order: 0,
  },
  {
    id: 'html-basics',
    title: '第一章 HTML 基础',
    subtitle: '用代码乐章写你的第一页乐谱',
    icon: '🎼',
    order: 1,
  },
  {
    id: 'css-style',
    title: '第二章：CSS 样式',
    subtitle: '为音乐增添色彩与层次',
    icon: '🎨',
    order: 2,
  },
  {
    id: 'css-layout',
    title: '第三章：CSS 布局',
    subtitle: '排列你的音乐元素',
    icon: '📐',
    order: 3,
  },
  {
    id: 'js-basics',
    title: '第四章：JavaScript 入门',
    subtitle: '让页面动起来，像音乐一样流动',
    icon: '🎹',
    order: 4,
  },
  {
    id: 'js-advanced',
    title: '第五章：JavaScript 进阶',
    subtitle: '工作流与进阶——从写好代码到写出好代码',
    icon: '🎻',
    order: 5,
  },
  {
    id: 'async-data',
    title: '第六章：异步与数据',
    subtitle: '与服务器对话，让数据流动起来',
    icon: '🌐',
    order: 6,
  },
  {
    id: 'engineering-tooling',
    title: '第七章：工程入门',
    subtitle: '走出琴房——用专业工具打造项目',
    icon: '🔧',
    order: 7,
  },
  {
    id: 'vue-framework',
    title: '第八章：Vue 实战',
    subtitle: '像交响乐团一样组织你的代码',
    icon: '🎤',
    order: 8,
  },
  {
    id: 'ai-basics',
    title: '第九章：AI 协作基础',
    subtitle: '先理解它是什么、边界在哪，再用它',
    icon: '🧠',
    order: 9,
  },
  {
    id: 'ai-frontend',
    title: '第十章：AI 辅助前端开发',
    subtitle: '在熟悉领域里练习与 AI 对话',
    icon: '⚡',
    order: 10,
  },
  {
    id: 'ai-project',
    title: '第十一章：AI 项目实战',
    subtitle: '从 Prompt 到产品——完整的 AI 协作项目',
    icon: '🚀',
    order: 11,
  },
]

export function getTrackV2(trackId: string): TrackV2 | null {
  return tracksV2.find((t) => t.id === trackId) ?? null
}

export function getChapterV2(chapterId: string | null | undefined): ChapterV2 | null {
  if (!chapterId) return null
  return chaptersV2.find((c) => c.id === chapterId) ?? null
}

export function getChapterOrder(chapterId: string): number {
  return chaptersV2.find((c) => c.id === chapterId)?.order ?? Number.MAX_SAFE_INTEGER
}
