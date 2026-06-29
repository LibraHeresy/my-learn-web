export interface AiExplainRequest {
  selectedText: string
  pageTitle: string
  sectionTitle?: string
  sectionKind?: string
  surroundingText?: string
  selectionMode?: 'text' | 'code'
}

export interface AiExplainResult {
  summary: string
  explanation: string
  roleInContext?: string
  keyPoints: string[]
  relatedTerms: string[]
  provider: 'ds' | 'mock'
  model: string
  note?: string
}

export interface AiChatMessage {
  id: string
  role: 'user' | 'assistant'
  kind: 'structured' | 'text'
  text?: string
  structuredResult?: AiExplainResult
  createdAt: number
}

export interface AiConversation {
  id: string
  anchor: AiExplainRequest
  title: string
  createdAt: number
  updatedAt: number
  messages: AiChatMessage[]
}
