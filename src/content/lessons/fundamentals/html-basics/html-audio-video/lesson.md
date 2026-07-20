# 音频与视频 — 让网页发出声音

:::analogy
这节课本身就在教 audio 和 video 标签——就像给网页装上了音响和投影仪，让你的页面能播放声音和视频。
:::

:::explain{title="音频标签"}
audio 标签可以在网页中嵌入音频播放器——就像给你的网页装了一个内置音箱——可以直接播放你录好的一段音频。controls 显示播放按钮（布尔属性），src 指定音频文件地址，autoplay 自动播放，loop 循环播放。
```html
<!-- audio：嵌入音频播放器 -->
<audio controls src="音乐文件地址">
  你的浏览器不支持音频播放
</audio>
```
- `controls` — 显示播放/暂停/音量控件
- `src` — 音频文件的地址
- `autoplay` — 自动播放（浏览器通常会阻止）
- `loop` — 循环播放
标签中间的文字只在浏览器不支持时显示。
:::

:::explain{title="音频格式与多音源"}
不同的浏览器支持不同的音频格式（MP3、OGG、WAV 等）。为了保证所有浏览器都能播放，可以用 `<source>` 标签提供多种格式：
```html
<!-- audio：嵌入音频播放器 -->
<audio <!-- controls：显示播放/暂停/音量按钮 -->
controls>
  <source src="music.mp3" type="audio/mpeg">
  <source src="music.ogg" type="audio/ogg">
  你的浏览器不支持音频播放
</audio>
```
浏览器会从上到下尝试，播放第一个支持的格式。就像准备不同格式的视频给不同播放器——总有一款能播！
:::

:::explain{title="视频标签"}
`<video>` 标签的用法和 `<audio>` 非常相似：
```html
<video controls width="400" src="视频地址">
  你的浏览器不支持视频播放
</video>
```
- `controls` — 显示播放控件
- `width` / `height` — 设置播放器尺寸
- 同样支持 `<source>` 提供多种格式
现在你的网页可以像一个音频播放器一样工作了！
:::

:::example{title="看例子"}
下面的代码创建了一个音频播放器和一个视频播放器。注意两个标签的写法几乎一样：
```html
<!-- audio：嵌入音频播放器 -->
<audio <!-- controls：显示播放/暂停/音量按钮 -->
controls>
  <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
</audio>
<video controls width="320" src="视频地址"></video>
```
预览区现在有了一个可以点击播放的音频播放器！
:::

:::hint{title="关于音频链接"}
免费可用的音频链接不太好找。你可以用网上公开的音频链接（如 SoundHelix 提供的免费示例音频），或者搜索其他免费音频资源网站来获取可在线播放的 MP3 链接。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="初次体验 `<audio>` 标签——你的网页现在可以播放音频了。学习编程第一次让网页发出声音，值得纪念！" expected="点击播放按钮后，音频开始播放。`controls` 属性提供了播放/暂停/音量控件。"}
点击预览区中的音频播放器，看看能否播放
::::

::::step{purpose="理解**布尔属性**——`loop` 不需要写值，写上就生效（循环播放），不写就不循环。就像开关：只有开和关两种状态。" expected="音频播放到结尾后自动从头开始。去掉 `loop`，播完就停了。"}
给 `<audio>` 标签加上 `loop` 属性，让音频循环播放
::::

::::step{purpose="理解 `src` 属性的通用性——和 `<img>` 的 `src` 一样，它告诉浏览器资源在哪里。" expected="播放器播放的是你换的新音频。如果没声音，检查链接是否有效。"}
尝试修改音频的 `src` 地址，换成你喜欢的音频链接
::::

::::step{purpose="`<video>` 的用法和 `<audio>` 几乎一样（`controls`、`src`、`source`），学会一个就学会了另一个。" expected="预览区中多了一个视频播放器。点击播放即可观看视频。"}
挑战：在 `<audio>` 下面加一个 `<video>` 标签
::::

:::

:::recap
这一节你学会了让网页发出声音和播放视频——`<audio>` 嵌入音频播放器，`<video>` 嵌入视频播放器。加上 `controls` 属性就能显示播放按钮，加上 `loop` 就能循环播放。这两个标签用法几乎一样，学会一个就学会了另一个。现在你的网页可以像音频播放器一样工作了。
:::


