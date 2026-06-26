import type { AiChatMessage, AiExplainRequest, AiExplainResult } from '../types/ai'

const DEFAULT_DS_BASE_URL = 'https://api.deepseek.com'
const DEFAULT_DS_MODEL = 'deepseek-chat'

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

function buildSystemPrompt() {
  return [
    '你是一个面向 Web 前端初学者的学习助手。',
    '请只解释用户选中的内容，不要发散，不要编造原文里没有的事实。',
    '语气要简洁、友好、教学化。',
    '如果合适，可以补一个很短的类比，但不要喧宾夺主。',
    '你必须输出严格 JSON，不要输出 Markdown，不要输出代码块。',
    'JSON 结构固定为：{"summary":"","explanation":"","roleInContext":"","keyPoints":[""],"relatedTerms":[""]}',
    'summary 必须是一句话总结。',
    'explanation 必须是更直白的人话翻译，长度控制在 2 到 4 句。',
    'roleInContext 必须说明这段话在当前课程或项目里的作用。',
    'keyPoints 返回 2 到 4 条，每条不超过 16 个字。',
    'relatedTerms 返回 0 到 4 个相关术语，没有就返回空数组。',
  ].join('\n')
}

function buildChatSystemPrompt() {
  return [
    '你是一个面向 Web 前端初学者的学习助手。',
    '你正在基于一段已选中的课程内容继续追问答疑。',
    '回答要简洁、友好、教学化，不要脱离原始选区和上下文发散。',
    '如果用户要求举例，可以给非常短的小例子。',
    '输出纯文本，不要输出 Markdown 标题。',
  ].join('\n')
}

function buildUserPrompt(request: AiExplainRequest) {
  const contextLines = [
    `页面标题：${request.pageTitle || '未提供'}`,
    `所在区域：${request.sectionTitle || '正文'}`,
    `区域类型：${request.sectionKind || 'lesson'}`,
    `选中文本：${request.selectedText}`,
  ]

  if (request.surroundingText) {
    contextLines.push(`附近上下文：${request.surroundingText}`)
  }

  contextLines.push(
    '请按约定的 JSON 结构返回结果。',
    '首屏重点要给出：一句话总结、人话翻译、本课作用、关键词。',
  )

  return contextLines.join('\n')
}

function buildChatUserPrompt(anchor: AiExplainRequest, history: AiChatMessage[], userInput: string) {
  const historyText = history
    .slice(-6)
    .map((message) => `${message.role === 'user' ? '用户' : '助手'}：${extractMessageText(message)}`)
    .filter(Boolean)
    .join('\n')

  return [
    `页面标题：${anchor.pageTitle || '未提供'}`,
    `所在区域：${anchor.sectionTitle || '正文'}`,
    `区域类型：${anchor.sectionKind || 'lesson'}`,
    `原始选中文本：${anchor.selectedText}`,
    anchor.surroundingText ? `附近上下文：${anchor.surroundingText}` : '',
    historyText ? `最近对话：\n${historyText}` : '',
    `用户追问：${userInput}`,
    '请直接回答这次追问，控制在 3 到 6 句。',
  ]
    .filter(Boolean)
    .join('\n')
}

function createMockExplanation(request: AiExplainRequest): AiExplainResult {
  const selection = normalizeWhitespace(request.selectedText)
  const sectionTitle = request.sectionTitle ? `${request.sectionTitle}` : '正文'
  const surrounding = request.surroundingText
    ? request.surroundingText.slice(0, 120) + (request.surroundingText.length > 120 ? '...' : '')
    : ''

  return {
    summary: `这段话的重点是：${selection}`,
    explanation: '如果把它翻成人话，可以理解成作者正在说明一个概念、它的作用，或者为什么你现在要关注它。',
    roleInContext: `它出现在“${sectionTitle}”里，作用通常是帮助你建立当前知识点的理解框架。${surrounding ? `结合前后文，它还在说明：${surrounding}` : ''}`,
    keyPoints: ['一句话抓重点', '快速人话翻译', '说明当前作用'],
    relatedTerms: [],
    provider: 'mock',
    model: 'mock-selection-explainer',
    note: '未配置 ds api key，当前展示的是本地 mock 结果。',
  }
}

function createMockFollowUp(anchor: AiExplainRequest, userInput: string): string {
  return [
    `围绕“${normalizeWhitespace(anchor.selectedText).slice(0, 24)}${anchor.selectedText.length > 24 ? '...' : ''}”这段内容，`,
    `你刚刚问的是：${normalizeWhitespace(userInput)}`,
    '如果用更口语的话说，这通常是在继续追问它的含义、用法，或者它在当前知识点里为什么重要。',
    '当前还是本地 mock 兜底回复，用来先跑通对话交互。',
  ].join('')
}

function extractMessageText(message: AiChatMessage): string {
  if (message.kind === 'structured' && message.structuredResult) {
    return [
      message.structuredResult.summary,
      message.structuredResult.explanation,
      message.structuredResult.roleInContext,
      message.structuredResult.keyPoints.join('；'),
    ]
      .filter(Boolean)
      .join('\n')
  }

  return normalizeWhitespace(message.text || '')
}

function extractContentText(content: unknown): string {
  if (typeof content === 'string') return content.trim()

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') return item
        if (item && typeof item === 'object' && 'text' in item && typeof item.text === 'string') {
          return item.text
        }
        return ''
      })
      .join('\n')
      .trim()
  }

  return ''
}

function extractJsonCandidate(text: string): string {
  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fencedMatch?.[1]) return fencedMatch[1].trim()

  const firstBrace = text.indexOf('{')
  const lastBrace = text.lastIndexOf('}')
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1)
  }

  return text
}

function toStringArray(value: unknown, maxLength: number): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => normalizeWhitespace(item))
    .filter(Boolean)
    .slice(0, maxLength)
}

function sentenceSummary(text: string): string {
  const normalized = normalizeWhitespace(text)
  const match = normalized.match(/^(.+?[。！？.!?])/)
  if (match) return match[1]
  return normalized.slice(0, 48) + (normalized.length > 48 ? '...' : '')
}

function normalizeResult(input: Partial<AiExplainResult>, fallbackText: string): AiExplainResult {
  const normalizedFallback = normalizeWhitespace(fallbackText)
  const keyPoints = toStringArray(input.keyPoints, 4)
  const relatedTerms = toStringArray(input.relatedTerms, 4)

  return {
    summary: normalizeWhitespace(input.summary || '') || sentenceSummary(normalizedFallback),
    explanation:
      normalizeWhitespace(input.explanation || '') ||
      normalizedFallback ||
      '这段内容的解释暂时为空，请重新选择文本后再试。',
    roleInContext: normalizeWhitespace(input.roleInContext || ''),
    keyPoints: keyPoints.length ? keyPoints : ['抓住核心概念', '理解当前作用'],
    relatedTerms,
    provider: input.provider === 'ds' ? 'ds' : 'mock',
    model: input.model || 'unknown',
    note: input.note,
  }
}

function parseModelResult(rawText: string, model: string): AiExplainResult {
  const candidate = extractJsonCandidate(rawText)

  try {
    const parsed = JSON.parse(candidate) as Partial<AiExplainResult>
    return normalizeResult({ ...parsed, provider: 'ds', model }, rawText)
  } catch {
    return normalizeResult(
      {
        summary: sentenceSummary(rawText),
        explanation: rawText,
        roleInContext: '模型未返回结构化 JSON，当前使用文本兜底展示。',
        provider: 'ds',
        model,
        note: '本次返回未完全遵循结构化格式，已自动兜底解析。',
      },
      rawText,
    )
  }
}

export async function explainSelection(request: AiExplainRequest): Promise<AiExplainResult> {
  const apiKey = import.meta.env.VITE_DS_API_KEY?.trim()
  if (!apiKey) {
    return createMockExplanation(request)
  }

  const baseUrl = (import.meta.env.VITE_DS_API_BASE_URL || DEFAULT_DS_BASE_URL).replace(/\/$/, '')
  const model = import.meta.env.VITE_DS_MODEL || DEFAULT_DS_MODEL

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: buildUserPrompt(request) },
      ],
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`ds api 请求失败（${response.status}）：${errorText || '未知错误'}`)
  }

  const payload = await response.json() as {
    choices?: Array<{
      message?: {
        content?: unknown
      }
    }>
  }

  const rawText = extractContentText(payload.choices?.[0]?.message?.content)
  if (!rawText) {
    throw new Error('ds api 返回为空，无法生成解释结果。')
  }

  return {
    ...parseModelResult(rawText, model),
    provider: 'ds',
    model,
    note: '',
  }
}

export async function continueSelectionConversation(
  anchor: AiExplainRequest,
  history: AiChatMessage[],
  userInput: string,
): Promise<string> {
  const apiKey = import.meta.env.VITE_DS_API_KEY?.trim()
  if (!apiKey) {
    return createMockFollowUp(anchor, userInput)
  }

  const baseUrl = (import.meta.env.VITE_DS_API_BASE_URL || DEFAULT_DS_BASE_URL).replace(/\/$/, '')
  const model = import.meta.env.VITE_DS_MODEL || DEFAULT_DS_MODEL

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.5,
      messages: [
        { role: 'system', content: buildChatSystemPrompt() },
        { role: 'user', content: buildChatUserPrompt(anchor, history, userInput) },
      ],
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`ds 对话请求失败（${response.status}）：${errorText || '未知错误'}`)
  }

  const payload = await response.json() as {
    choices?: Array<{
      message?: {
        content?: unknown
      }
    }>
  }

  const answer = extractContentText(payload.choices?.[0]?.message?.content)
  if (!answer) {
    throw new Error('ds 对话返回为空，无法继续追问。')
  }

  return answer
}
