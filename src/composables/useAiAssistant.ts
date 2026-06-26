import { computed, ref } from 'vue'
import { continueSelectionConversation, explainSelection } from '../services/ai-explain'
import type { AiChatMessage, AiConversation, AiExplainRequest } from '../types/ai'
import { safeGetItem, safeSetItem } from '../utils/storage'

const MIN_SELECTION_LENGTH = 6
const MAX_SELECTION_LENGTH = 500
const MOBILE_BREAKPOINT = 900
const VIEWPORT_PADDING = 12
const TRIGGER_HEIGHT = 32
const TRIGGER_HALF_WIDTH = 44
const STORAGE_KEY = 'ai-selection-conversations'
const MAX_CONVERSATIONS = 12
export const AI_QUICK_PROMPTS = ['再通俗一点', '举个例子', '这段话为什么重要', '和相关概念有什么区别']

const buttonVisible = ref(false)
const sidebarOpen = ref(false)
const buttonTop = ref(0)
const buttonLeft = ref(0)
const viewportWidth = ref(window.innerWidth)
const viewportHeight = ref(window.innerHeight)
const currentRequest = ref<AiExplainRequest | null>(null)
const conversations = ref<AiConversation[]>([])
const activeConversationId = ref<string | null>(null)
const loadingInitial = ref(false)
const sendingFollowUp = ref(false)
const followUpInput = ref('')

const isMobileSidebar = computed(() => viewportWidth.value < MOBILE_BREAKPOINT)
const activeConversation = computed(() =>
  conversations.value.find((conversation) => conversation.id === activeConversationId.value) ?? null,
)

let loaded = false

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function normalizeWhitespace(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function createConversationTitle(request: AiExplainRequest) {
  const text = normalizeWhitespace(request.selectedText)
  return text.length > 24 ? `${text.slice(0, 24)}...` : text
}

function createTextMessage(role: 'user' | 'assistant', text: string): AiChatMessage {
  return {
    id: createId(),
    role,
    kind: 'text',
    text,
    createdAt: Date.now(),
  }
}

function createStructuredMessage(structuredResult: NonNullable<AiChatMessage['structuredResult']>): AiChatMessage {
  return {
    id: createId(),
    role: 'assistant',
    kind: 'structured',
    structuredResult,
    createdAt: Date.now(),
  }
}

function findSelectableRoot(node: Node | null): HTMLElement | null {
  const element = node instanceof HTMLElement ? node : node?.parentElement
  if (!element) return null
  return element.closest('[data-ai-selectable="true"]')
}

function clearSelectionAnchor() {
  buttonVisible.value = false
  currentRequest.value = null
}

function closeSidebar() {
  sidebarOpen.value = false
}

function openSidebar() {
  sidebarOpen.value = true
}

function toggleAiSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function positionButton(rect: DOMRect) {
  buttonTop.value = clamp(
    rect.bottom + 8,
    VIEWPORT_PADDING,
    viewportHeight.value - VIEWPORT_PADDING - TRIGGER_HEIGHT,
  )
  buttonLeft.value = clamp(
    rect.left + rect.width / 2,
    VIEWPORT_PADDING + TRIGGER_HALF_WIDTH,
    viewportWidth.value - VIEWPORT_PADDING - TRIGGER_HALF_WIDTH,
  )
}

function extractSurroundingText(root: HTMLElement, selectedText: string) {
  const source = normalizeWhitespace(root.innerText || root.textContent || '')
  if (!source) return ''

  const start = source.indexOf(selectedText)
  if (start === -1) {
    return source.slice(0, 260)
  }

  const contextStart = Math.max(0, start - 140)
  const contextEnd = Math.min(source.length, start + selectedText.length + 140)
  return source.slice(contextStart, contextEnd)
}

function readSelectionRequest(): AiExplainRequest | null {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    return null
  }

  const rawText = normalizeWhitespace(selection.toString())
  if (rawText.length < MIN_SELECTION_LENGTH || rawText.length > MAX_SELECTION_LENGTH) {
    return null
  }

  const anchorRoot = findSelectableRoot(selection.anchorNode)
  const focusRoot = findSelectableRoot(selection.focusNode)
  if (!anchorRoot || !focusRoot || anchorRoot !== focusRoot) {
    return null
  }

  const rect = selection.getRangeAt(0).getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) {
    return null
  }

  positionButton(rect)

  return {
    selectedText: rawText,
    pageTitle: anchorRoot.dataset.aiContextTitle || document.title,
    sectionTitle: anchorRoot.dataset.aiContextDetail || '',
    sectionKind: anchorRoot.dataset.aiContextKind || 'lesson',
    surroundingText: extractSurroundingText(anchorRoot, rawText),
  }
}

function refreshSelectionState() {
  const request = readSelectionRequest()
  if (!request) {
    clearSelectionAnchor()
    return
  }

  currentRequest.value = request
  buttonVisible.value = true
}

function persistConversations() {
  safeSetItem(STORAGE_KEY, JSON.stringify(conversations.value.slice(0, MAX_CONVERSATIONS)))
}

function loadConversations() {
  if (loaded) return
  loaded = true

  const result = safeGetItem(STORAGE_KEY)
  if (!result.success || !result.value) return

  try {
    const parsed = JSON.parse(result.value) as AiConversation[]
    if (!Array.isArray(parsed)) return
    conversations.value = parsed.slice(0, MAX_CONVERSATIONS)
    activeConversationId.value = conversations.value[0]?.id ?? null
  } catch {
    conversations.value = []
  }
}

function updateConversation(conversationId: string, updater: (conversation: AiConversation) => AiConversation) {
  conversations.value = conversations.value.map((conversation) =>
    conversation.id === conversationId ? updater(conversation) : conversation,
  )
}

function moveConversationToTop(conversationId: string) {
  const target = conversations.value.find((conversation) => conversation.id === conversationId)
  if (!target) return
  conversations.value = [target, ...conversations.value.filter((conversation) => conversation.id !== conversationId)]
}

function openConversation(conversationId: string) {
  activeConversationId.value = conversationId
  sidebarOpen.value = true
}

function clearHistory() {
  conversations.value = []
  activeConversationId.value = null
  persistConversations()
}

async function explainCurrentSelection() {
  if (!currentRequest.value || loadingInitial.value) return

  const anchor = { ...currentRequest.value }
  const conversationId = createId()
  const now = Date.now()

  const conversation: AiConversation = {
    id: conversationId,
    anchor,
    title: createConversationTitle(anchor),
    createdAt: now,
    updatedAt: now,
    messages: [],
  }

  conversations.value = [conversation, ...conversations.value].slice(0, MAX_CONVERSATIONS)
  activeConversationId.value = conversationId
  sidebarOpen.value = true
  loadingInitial.value = true

  try {
    const result = await explainSelection(anchor)
    updateConversation(conversationId, (item) => ({
      ...item,
      updatedAt: Date.now(),
      messages: [createStructuredMessage(result)],
    }))
    moveConversationToTop(conversationId)
  } catch (error) {
    updateConversation(conversationId, (item) => ({
      ...item,
      updatedAt: Date.now(),
      messages: [
        createTextMessage(
          'assistant',
          error instanceof Error ? error.message : '解释失败，请稍后重试。',
        ),
      ],
    }))
    moveConversationToTop(conversationId)
  } finally {
    loadingInitial.value = false
    persistConversations()
  }
}

async function sendFollowUp(question: string) {
  const conversation = activeConversation.value
  const userInput = normalizeWhitespace(question)
  if (!conversation || !userInput || sendingFollowUp.value) return

  const userMessage = createTextMessage('user', userInput)
  updateConversation(conversation.id, (item) => ({
    ...item,
    updatedAt: Date.now(),
    messages: [...item.messages, userMessage],
  }))
  moveConversationToTop(conversation.id)
  followUpInput.value = ''
  sendingFollowUp.value = true

  const updatedConversation =
    conversations.value.find((item) => item.id === conversation.id) ?? conversation

  try {
    const answer = await continueSelectionConversation(
      updatedConversation.anchor,
      updatedConversation.messages,
      userInput,
    )
    updateConversation(conversation.id, (item) => ({
      ...item,
      updatedAt: Date.now(),
      messages: [...item.messages, createTextMessage('assistant', answer)],
    }))
    moveConversationToTop(conversation.id)
  } catch (error) {
    updateConversation(conversation.id, (item) => ({
      ...item,
      updatedAt: Date.now(),
      messages: [
        ...item.messages,
        createTextMessage(
          'assistant',
          error instanceof Error ? error.message : '继续追问失败，请稍后重试。',
        ),
      ],
    }))
    moveConversationToTop(conversation.id)
  } finally {
    sendingFollowUp.value = false
    persistConversations()
  }
}

function handleRouteChange() {
  buttonVisible.value = false
  currentRequest.value = null
  sidebarOpen.value = false
}

function handleGlobalPointerDown(target: Node | null, insideAssistant: boolean) {
  if (!target || insideAssistant) return
  if (isMobileSidebar.value && sidebarOpen.value) closeSidebar()
}

function setViewportSize(width: number, height: number) {
  viewportWidth.value = width
  viewportHeight.value = height
}

function formatAiTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function useAiAssistant() {
  loadConversations()

  return {
    buttonVisible,
    buttonTop,
    buttonLeft,
    sidebarOpen,
    currentRequest,
    conversations,
    activeConversation,
    activeConversationId,
    loadingInitial,
    sendingFollowUp,
    followUpInput,
    isMobileSidebar,
    refreshSelectionState,
    handleRouteChange,
    handleGlobalPointerDown,
    setViewportSize,
    explainCurrentSelection,
    sendFollowUp,
    openSidebar,
    closeSidebar,
    toggleAiSidebar,
    openConversation,
    clearHistory,
    formatAiTime,
  }
}
