export interface StorageResult {
  success: boolean
  error?: string
}

export function safeSetItem(key: string, value: string): StorageResult {
  try {
    localStorage.setItem(key, value)
    return { success: true }
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e))
    const isQuota = /quota|QuotaExceeded/i.test(err.message) || err.name === 'QuotaExceededError'
    return {
      success: false,
      error: isQuota
        ? '浏览器存储空间已满，请清理缓存后重试。'
        : '无法保存学习进度，请检查浏览器是否处于隐私模式。',
    }
  }
}

export function safeGetItem(key: string): { success: boolean; value?: string; error?: string } {
  try {
    const value = localStorage.getItem(key)
    return { success: true, value: value ?? undefined }
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e))
    return { success: false, error: err.message }
  }
}
