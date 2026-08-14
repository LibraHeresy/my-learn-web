import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LivePreview from '../components/LivePreview.vue'

// 模拟 errorGuard hook 发来的消息
function sendConsoleMessage(level: string, text: string) {
  window.dispatchEvent(
    new MessageEvent('message', {
      data: { type: 'console-output', level, text },
    }),
  )
}

describe('LivePreview 控制台桥', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('收到 console-output 消息后记录日志', async () => {
    const wrapper = mount(LivePreview, { props: { srcdoc: '<p>test</p>' } })
    sendConsoleMessage('log', '你好，控制台')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.console-panel').exists()).toBe(false) // 默认收起
    // 按钮上有计数徽标
    expect(wrapper.find('.console-count').exists()).toBe(true)
    expect(wrapper.find('.console-count').text()).toBe('1')
    wrapper.unmount()
  })

  it('展开控制台后显示日志内容与级别样式', async () => {
    const wrapper = mount(LivePreview, { props: { srcdoc: '<p>test</p>' } })
    sendConsoleMessage('log', '普通输出')
    sendConsoleMessage('warn', '警告输出')
    sendConsoleMessage('error', '错误输出')
    await wrapper.vm.$nextTick()
    // 点击 🖥 按钮展开
    const consoleBtn = wrapper.findAll('button').find((b) => b.text().includes('🖥'))
    expect(consoleBtn).toBeTruthy()
    await consoleBtn!.trigger('click')
    const panel = wrapper.find('.console-panel')
    expect(panel.exists()).toBe(true)
    const lines = wrapper.findAll('.console-line')
    expect(lines).toHaveLength(3)
    expect(lines[0].text()).toContain('普通输出')
    expect(lines[1].classes()).toContain('console-line--warn')
    expect(lines[2].classes()).toContain('console-line--error')
    wrapper.unmount()
  })

  it('清空按钮清除日志', async () => {
    const wrapper = mount(LivePreview, { props: { srcdoc: '<p>test</p>' } })
    sendConsoleMessage('log', '要清掉的输出')
    await wrapper.vm.$nextTick()
    const consoleBtn = wrapper.findAll('button').find((b) => b.text().includes('🖥'))
    await consoleBtn!.trigger('click')
    await wrapper.find('.console-clear').trigger('click')
    expect(wrapper.find('.console-empty').exists()).toBe(true)
    wrapper.unmount()
  })
})
