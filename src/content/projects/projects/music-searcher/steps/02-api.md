Apple 提供了一个免费、无需注册的搜索 API：

```
https://itunes.apple.com/search?term=贝多芬&limit=10&country=cn
```

在浏览器地址栏直接打开这个链接，你会看到一串 JSON 数据——这就是 API 返回的搜索结果。

返回的 JSON 结构：

```json
{
  "resultCount": 10,
  "results": [
    {
      "trackName": "月光奏鸣曲",
      "artistName": "贝多芬",
      "artworkUrl100": "封面图片URL（100px）",
      "previewUrl": "30秒试听URL",
      "collectionName": "专辑名",
      "primaryGenreName": "古典"
    }
  ]
}
```

`term` 参数是搜索关键词，`limit` 是结果数量（最大 200），`country` 是国家代码。

> 💡 尝试修改 URL 中的 `term=贝多芬` 为 `term=mozart` 或 `term=肖邦`，看看返回的数据有什么不同。
