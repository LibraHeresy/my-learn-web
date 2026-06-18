const BASE_URL = 'https://jsonplaceholder.typicode.com'

// TODO: 封装 api 对象
const api = {
  get: async (path) => {
    // 在这里实现
  }
}

// 测试你的 api
async function test() {
  const posts = await api.get('/posts')
  console.log('前2条数据：', posts?.slice(0, 2))
}
test()