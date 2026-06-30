import { computed, ref } from 'vue'
import { continueSelectionConversation, explainSelection } from '../services/ai-explain'
import type { AiChatMessage, AiConversation, AiExplainRequest } from '../types/ai'
import { safeGetItem, safeSetItem } from '../utils/storage'
import { safeSlice } from '../utils/text'

const MOBILE_BREAKPOINT = 900
const VIEWPORT_PADDING = 12
const TRIGGER_HEIGHT = 32
const TRIGGER_HALF_WIDTH = 44
const STORAGE_KEY = 'ai-selection-conversations'
const OVERLAY_POSITION_KEY = 'ai-overlay-position-v1'
const MAX_CONVERSATIONS = 12
export const AI_QUICK_PROMPTS = ['再通俗一点', '举个例子', '这段话为什么重要', '和相关概念有什么区别']

const buttonVisible = ref(false)
const sidebarOpen = ref(false)
const buttonTop = ref(0)
const buttonLeft = ref(0)
const viewportWidth = ref(window.innerWidth)
const viewportHeight = ref(window.innerHeight)
const currentRequest = ref<AiExplainRequest | null>(null)
const externalSelectionActive = ref(false)
const overlayDragX = ref(0)
const overlayDragY = ref(32)
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
let overlayPositionLoaded = false

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function normalizeWhitespace(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

function normalizeCodeSelection(text: string) {
  const normalizedNewlines = text.replace(/\r\n/g, '\n')
  return normalizedNewlines.trimEnd()
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function createConversationTitle(request: AiExplainRequest) {
  const text = normalizeWhitespace(request.selectedText)
  return text.length > 24 ? `${safeSlice(text, 0, 24)}...` : text
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
  externalSelectionActive.value = false
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

function extractSurroundingText(root: HTMLElement, selectedText: string, mode: 'text' | 'code') {
  if (mode === 'code') {
    const source = (root.innerText || root.textContent || '').replace(/\r\n/g, '\n')
    if (!source) return ''

    const start = source.indexOf(selectedText)
    if (start === -1) {
      return safeSlice(source, 0, 420)
    }

    const contextStart = Math.max(0, start - 240)
    const contextEnd = Math.min(source.length, start + selectedText.length + 240)
    return safeSlice(source, contextStart, contextEnd)
  }

  const source = normalizeWhitespace(root.innerText || root.textContent || '')
  if (!source) return ''

  const start = source.indexOf(selectedText)
  if (start === -1) {
    return safeSlice(source, 0, 260)
  }

  const contextStart = Math.max(0, start - 140)
  const contextEnd = Math.min(source.length, start + selectedText.length + 140)
  return safeSlice(source, contextStart, contextEnd)
}

function readSelectionText(selection: Selection, mode: 'text' | 'code') {
  const rawText = selection.toString()
  if (mode === 'code') return normalizeCodeSelection(rawText)
  return normalizeWhitespace(rawText)
}

function readSelectionRequest(): AiExplainRequest | null {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    return null
  }

  const anchorRoot = findSelectableRoot(selection.anchorNode)
  const focusRoot = findSelectableRoot(selection.focusNode)
  if (!anchorRoot || !focusRoot || anchorRoot !== focusRoot) {
    return null
  }

  const selectionMode: 'text' | 'code' =
    anchorRoot.dataset.aiSelectionMode === 'code' ? 'code' : 'text'

  const rawText = readSelectionText(selection, selectionMode)
  if (!rawText) {
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
    surroundingText: extractSurroundingText(anchorRoot, rawText, selectionMode),
    selectionMode,
  }
}

function refreshSelectionState() {
  const request = readSelectionRequest()
  if (!request) {
    if (!externalSelectionActive.value) {
      clearSelectionAnchor()
    }
    return
  }

  externalSelectionActive.value = false
  currentRequest.value = request
  buttonVisible.value = true
}

function setExternalSelection(request: AiExplainRequest, rect: DOMRect) {
  positionButton(rect)
  externalSelectionActive.value = true
  currentRequest.value = request
  buttonVisible.value = true
}

function clearExternalSelection() {
  if (!externalSelectionActive.value) return
  externalSelectionActive.value = false
  buttonVisible.value = false
  currentRequest.value = null
}

function persistConversations() {
  safeSetItem(STORAGE_KEY, JSON.stringify(conversations.value.slice(0, MAX_CONVERSATIONS)))
}

function persistOverlayPosition() {
  safeSetItem(
    OVERLAY_POSITION_KEY,
    JSON.stringify({
      x: overlayDragX.value,
      y: overlayDragY.value,
    }),
  )
}

function loadOverlayPosition() {
  if (overlayPositionLoaded) return
  overlayPositionLoaded = true
  const result = safeGetItem(OVERLAY_POSITION_KEY)
  if (!result.success || !result.value) return

  try {
    const parsed = JSON.parse(result.value) as { x?: unknown; y?: unknown }
    const x = parsed?.x
    const y = parsed?.y
    if (typeof x === 'number' && Number.isFinite(x)) overlayDragX.value = x
    if (typeof y === 'number' && Number.isFinite(y)) overlayDragY.value = y
  } catch {
    overlayDragX.value = 0
    overlayDragY.value = 0
  }
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
  externalSelectionActive.value = false
}

function handleGlobalPointerDown(target: Node | null, insideAssistant: boolean) {
  if (!target || insideAssistant) return
  if (isMobileSidebar.value && sidebarOpen.value) closeSidebar()
}

function setViewportSize(width: number, height: number) {
  viewportWidth.value = width
  viewportHeight.value = height
}

function setOverlayPosition(x: number, y: number) {
  overlayDragX.value = x
  overlayDragY.value = y
}

function resetOverlayPosition() {
  overlayDragX.value = 0
  overlayDragY.value = 70
  persistOverlayPosition()
}

function formatAiTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function useAiAssistant() {
  loadConversations()
  loadOverlayPosition()

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
    overlayDragX,
    overlayDragY,
    refreshSelectionState,
    handleRouteChange,
    handleGlobalPointerDown,
    setViewportSize,
    setExternalSelection,
    clearExternalSelection,
    setOverlayPosition,
    resetOverlayPosition,
    persistOverlayPosition,
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
