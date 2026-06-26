<script setup lang="ts">
import { nextTick, ref, watch, type ComponentPublicInstance } from 'vue'
import { AI_QUICK_PROMPTS, useAiAssistant } from '../../composables/useAiAssistant'
import AiMarkdownContent from './AiMarkdownContent.vue'

defineProps<{
  mode: 'drawer' | 'overlay'
}>()

const {
  conversations,
  activeConversation,
  activeConversationId,
  loadingInitial,
  sendingFollowUp,
  followUpInput,
  openConversation,
  closeSidebar,
  clearHistory,
  sendFollowUp,
} = useAiAssistant()

const messagesRef = ref<HTMLElement | null>(null)
const lastMessageRef = ref<HTMLElement | null>(null)

const setLastMessageRef: (
  refValue: Element | ComponentPublicInstance | null,
  refs: Record<string, unknown>,
) => void = (refValue) => {
  lastMessageRef.value = refValue instanceof HTMLElement ? refValue : null
}

function scrollToLastMessageStart() {
  const container = messagesRef.value
  const lastMessage = lastMessageRef.value
  if (!container || !lastMessage) return
  container.scrollTop = Math.max(0, lastMessage.offsetTop - 8)
}

function onSubmitFollowUp() {
  void sendFollowUp(followUpInput.value)
}

watch(
  () => [activeConversationId.value, activeConversation.value?.messages.length ?? 0],
  async () => {
    await nextTick()
    scrollToLastMessageStart()
  },
  { immediate: true },
)
</script>

<template>
  <section :class="['ai-assistant-panel', `ai-assistant-panel--${mode}`]">
    <header class="ai-assistant-panel__header">
      <div>
        <p class="ai-assistant-panel__eyebrow">AI 助手</p>
      </div>
      <div class="ai-assistant-panel__actions">
        <button
          class="ai-assistant-panel__ghost"
          type="button"
          :disabled="conversations.length === 0"
          @click="clearHistory"
        >
          清空
        </button>
        <button class="ai-assistant-panel__ghost" type="button" @click="closeSidebar">关闭</button>
      </div>
    </header>

    <section v-if="conversations.length" class="ai-assistant-history">
      <div class="ai-assistant-history__header">
        <span>最近解释</span>
      </div>
      <div class="ai-assistant-history__list">
        <button
          v-for="conversation in conversations"
          :key="conversation.id"
          :class="['ai-assistant-history__item', { active: conversation.id === activeConversationId }]"
          type="button"
          @click="openConversation(conversation.id)"
        >
          <span class="ai-assistant-history__title">{{ conversation.title }}</span>
          <span class="ai-assistant-history__meta">
            {{ conversation.anchor.sectionTitle || conversation.anchor.pageTitle }}
          </span>
        </button>
      </div>
    </section>

    <template v-if="activeConversation">
      <section class="ai-assistant-anchor">
        <p class="ai-assistant-anchor__title">{{ activeConversation.title }}</p>
      </section>

      <section ref="messagesRef" class="ai-assistant-messages">
        <p v-if="loadingInitial && activeConversation.messages.length === 0" class="ai-assistant-status">
          正在生成第一条解释...
        </p>

        <template v-for="(message, index) in activeConversation.messages" :key="message.id">
          <article
            v-if="message.kind === 'structured' && message.structuredResult"
            class="ai-assistant-message ai-assistant-message--structured"
            :ref="index === activeConversation.messages.length - 1 ? setLastMessageRef : undefined"
          >
            <section class="ai-assistant-section">
              <p class="ai-assistant-section__label">一句话总结</p>
              <p class="ai-assistant-section__summary">{{ message.structuredResult.summary }}</p>
            </section>

            <section class="ai-assistant-section">
              <p class="ai-assistant-section__label">人话翻译</p>
              <p class="ai-assistant-section__text">{{ message.structuredResult.explanation }}</p>
            </section>

            <section v-if="message.structuredResult.roleInContext" class="ai-assistant-section">
              <p class="ai-assistant-section__label">本课里它在干嘛</p>
              <p class="ai-assistant-section__text">{{ message.structuredResult.roleInContext }}</p>
            </section>

            <section
              v-if="message.structuredResult.keyPoints.length || message.structuredResult.relatedTerms.length"
              class="ai-assistant-section"
            >
              <p class="ai-assistant-section__label">关键词</p>
              <div class="ai-assistant-tags">
                <span
                  v-for="point in message.structuredResult.keyPoints"
                  :key="`point-${message.id}-${point}`"
                  class="ai-assistant-tag"
                >
                  {{ point }}
                </span>
                <span
                  v-for="term in message.structuredResult.relatedTerms"
                  :key="`term-${message.id}-${term}`"
                  class="ai-assistant-tag subtle"
                >
                  {{ term }}
                </span>
              </div>
            </section>

            <div class="ai-assistant-message__footer">
              <span :class="['ai-assistant-provider', message.structuredResult.provider]">
                {{ message.structuredResult.provider === 'ds' ? 'ds api' : 'mock' }}
              </span>
              <span class="ai-assistant-model">{{ message.structuredResult.model }}</span>
            </div>
            <p v-if="message.structuredResult.note" class="ai-assistant-note">
              {{ message.structuredResult.note }}
            </p>
          </article>

          <article
            v-else
            :class="[
              'ai-assistant-message',
              message.role === 'user'
                ? 'ai-assistant-message--user'
                : 'ai-assistant-message--assistant',
            ]"
            :ref="index === activeConversation.messages.length - 1 ? setLastMessageRef : undefined"
          >
            <p class="ai-assistant-message__role">{{ message.role === 'user' ? '你' : 'AI' }}</p>
            <AiMarkdownContent
              v-if="message.role === 'assistant'"
              class="ai-assistant-message__markdown"
              :text="message.text || ''"
            />
            <p v-else class="ai-assistant-message__text">{{ message.text }}</p>
          </article>
        </template>

        <p v-if="sendingFollowUp" class="ai-assistant-status">AI 正在继续回答...</p>
      </section>

      <section class="ai-assistant-quick-actions">
        <button
          v-for="prompt in AI_QUICK_PROMPTS"
          :key="prompt"
          class="ai-assistant-quick-actions__item"
          type="button"
          @click="sendFollowUp(prompt)"
        >
          {{ prompt }}
        </button>
      </section>

      <form class="ai-assistant-input" @submit.prevent="onSubmitFollowUp">
        <textarea
          v-model="followUpInput"
          class="ai-assistant-input__field"
          rows="3"
          placeholder="继续追问这段内容，比如：再举个例子"
        />
        <button
          class="ai-assistant-input__submit"
          type="submit"
          :disabled="sendingFollowUp || !followUpInput.trim()"
        >
          发送
        </button>
      </form>
    </template>

    <section v-else class="ai-assistant-empty">
      <p class="ai-assistant-empty__title">选中一段正文后开始对话</p>
      <p class="ai-assistant-empty__text">点选区旁边的 `AI 解释`，或先打开这里查看最近历史。</p>
    </section>
  </section>
</template>

<style scoped>
.ai-assistant-panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background: rgba(255, 250, 242, 0.98);
}

.ai-assistant-panel__header,
.ai-assistant-history__header,
.ai-assistant-anchor {
  flex-shrink: 0;
}

.ai-assistant-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--sp-3);
}

.ai-assistant-panel__eyebrow {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  font-weight: bold;
}

.ai-assistant-panel__title {
  margin-top: 2px;
  font-size: var(--fs-lg);
  color: var(--color-text);
}

.ai-assistant-panel__actions {
  display: flex;
  gap: var(--sp-2);
}

.ai-assistant-panel__ghost {
  padding: 4px 8px;
  background: transparent;
  color: var(--color-text-light);
  border-radius: var(--radius-sm);
  font-size: var(--fs-xs);
}

.ai-assistant-panel__ghost:hover {
  background: var(--color-bg-warm);
  color: var(--color-accent);
}

.ai-assistant-history {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.ai-assistant-history__header {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-light);
}

.ai-assistant-history__list {
  display: flex;
  gap: var(--sp-2);
  overflow-x: auto;
  padding-bottom: 2px;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.ai-assistant-history__item {
  width: 160px;
  flex: 0 0 160px;
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-light);
  background: rgba(255, 255, 255, 0.55);
  text-align: left;
}

.ai-assistant-history__item.active {
  border-color: var(--color-accent-border);
  background: var(--color-accent-bg);
}

.ai-assistant-history__title,
.ai-assistant-history__meta,
.ai-assistant-anchor__title,
.ai-assistant-anchor__meta,
.ai-assistant-message__role,
.ai-assistant-message__text,
.ai-assistant-status,
.ai-assistant-empty__title,
.ai-assistant-empty__text,
.ai-assistant-note,
.ai-assistant-section__summary,
.ai-assistant-section__text {
  word-break: break-word;
}

.ai-assistant-history__title {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--fs-xs);
  color: var(--color-text);
  line-height: 1.6;
}

.ai-assistant-history__meta {
  display: block;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  color: var(--color-text-light);
  line-height: 1.4;
}

.ai-assistant-anchor {
  padding: var(--sp-2) var(--sp-3);
  background: rgba(255, 255, 255, 0.52);
  border: 1px solid rgba(139, 46, 46, 0.08);
  border-radius: var(--radius-sm);
}

.ai-assistant-anchor__title {
  font-size: var(--fs-sm);
  color: var(--color-text);
  line-height: 1.6;
  font-weight: 600;
}

.ai-assistant-anchor__meta {
  margin-top: 4px;
  font-size: 11px;
  color: var(--color-text-light);
}

.ai-assistant-messages {
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  padding: var(--sp-3);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(139, 46, 46, 0.1);
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.ai-assistant-message {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--radius-sm);
}

.ai-assistant-message--structured {
  padding: 0;
  background: transparent;
}

.ai-assistant-message--assistant {
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(139, 46, 46, 0.08);
}

.ai-assistant-message--user {
  align-self: flex-end;
  max-width: 88%;
  background: var(--color-accent-bg);
  border: 1px solid var(--color-accent-border);
}

.ai-assistant-message__role {
  font-size: 11px;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.ai-assistant-message__text,
.ai-assistant-status,
.ai-assistant-empty__text {
  white-space: pre-wrap;
  font-size: var(--fs-xs);
  line-height: 1.8;
  color: var(--color-text);
}

.ai-assistant-message__footer {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-top: var(--sp-3);
}

.ai-assistant-quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ai-assistant-quick-actions__item {
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid var(--color-border-light);
  border-radius: 999px;
  color: var(--color-text-light);
  font-size: 11px;
  line-height: 1.4;
}

.ai-assistant-quick-actions__item:hover {
  color: var(--color-accent);
  border-color: var(--color-accent-border);
}

.ai-assistant-input {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  flex-shrink: 0;
}

.ai-assistant-input__field {
  width: 100%;
  resize: vertical;
  min-height: 72px;
  padding: var(--sp-2) var(--sp-3);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.8);
  color: var(--color-text);
  font: inherit;
  line-height: 1.7;
  font-size: var(--fs-xs);
}

.ai-assistant-input__field:focus {
  outline: 2px solid rgba(201, 169, 110, 0.25);
  border-color: var(--color-accent-border);
}

.ai-assistant-input__submit {
  align-self: flex-end;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  background: var(--color-accent);
  color: #fff;
  font-size: var(--fs-xs);
}

.ai-assistant-empty {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--sp-2);
  padding: var(--sp-4);
  border: 1px dashed var(--color-border-light);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.45);
}

.ai-assistant-empty__title {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--color-text);
}

.ai-assistant-section {
  padding: var(--sp-2) var(--sp-3);
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(139, 46, 46, 0.08);
  border-radius: var(--radius-sm);
}

.ai-assistant-section__label {
  font-size: 11px;
  line-height: 1.4;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.ai-assistant-section__summary {
  margin-top: 6px;
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text);
  font-weight: 600;
}

.ai-assistant-section__text {
  margin-top: 6px;
  white-space: pre-wrap;
  font-size: var(--fs-xs);
  line-height: 1.8;
  color: var(--color-text);
}

.ai-assistant-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.ai-assistant-tag {
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--color-accent-bg);
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent);
  font-size: 11px;
  line-height: 1.4;
}

.ai-assistant-tag.subtle {
  background: var(--color-bg-warm);
  border-color: var(--color-border-light);
  color: var(--color-text-light);
}

.ai-assistant-provider,
.ai-assistant-model {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  line-height: 1.4;
}

.ai-assistant-provider {
  background: var(--color-bg-warm);
  color: var(--color-text-light);
}

.ai-assistant-provider.ds {
  background: var(--color-accent-bg);
  color: var(--color-accent);
}

.ai-assistant-provider.mock {
  background: #eef4ff;
  color: #4661a8;
}

.ai-assistant-model {
  background: transparent;
  border: 1px solid var(--color-border-light);
  color: var(--color-text-light);
}

.ai-assistant-note {
  margin-top: var(--sp-2);
  color: var(--color-text-light);
  font-size: var(--fs-xs);
  line-height: 1.7;
}

@media (max-width: 900px) {
  .ai-assistant-history {
    display: none;
  }

  .ai-assistant-messages {
    padding: var(--sp-2);
  }
}
</style>
