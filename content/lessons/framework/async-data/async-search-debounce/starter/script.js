// TODO: 实现 debounce 函数
function debounce(fn, delay = 300) {
  // 在这里写代码
}

// 模拟搜索 API
async function searchAPI(keyword) {
  console.log('🔍 发送搜索请求：' + keyword)
}

// 用 debounce 包装
const debouncedSearch = debounce(searchAPI, 500)

// 模拟快速连续输入
console.log('模拟用户输入"贝多芬"...')
debouncedSearch('贝')
debouncedSearch('贝多')
debouncedSearch('贝多芬')

// 你应该只看到一次 "🔍 发送搜索请求：贝多芬"
// （500ms 后）