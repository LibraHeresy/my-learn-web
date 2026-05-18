import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'music-collection-v1',
    trackId: 'projects',
    order: 1,
    title: '音乐收藏库 · 纯手工版',
    subtitle: '用 HTML、CSS、JS 打造你的第一个音乐作品',
    icon: '🎵',
    musicAnalogy: '就像亲手抄写一份乐谱——每一个音符（标签）、每一个表情记号（样式）、每一个演奏指令（脚本）都由你亲手写下。完成后，你就拥有了一份独一无二的手稿。',
    prerequisiteTrackIds: ['fundamentals'],
    listenTo: '巴赫《无伴奏大提琴组曲》— 单一乐器展现完整世界，正如纯 HTML/CSS/JS 不依赖任何框架',
    steps: [
      {
        title: '搭建收藏卡片',
        content: '万事开头难——但别担心，第一张卡片就像在五线谱上画出第一个音符。\n\n先用 HTML 写出**一张**音乐收藏卡片，包含：\n- 一首曲子的名称（用 `<h2>` 标题）\n- 作曲家的名字（用 `<p>` 段落）\n- 一张封面图片（用 `<img>` 标签）\n- 音乐时期/风格分类（用 `<span>` 标签，如"巴洛克"）\n\n把卡片包在一个 `<div>` 里，给它一个 class 名称，后面我们会用到。',
        task: '在 HTML 编辑区写一张音乐卡片，包含曲名、作曲家、封面图和风格标签。',
        hint: '如果图片不显示，检查 src 地址是否正确。建议使用维基百科或 Unsplash 上的音乐家图片链接。',
        starterCode: {
          html: '<div class="music-card">\n  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg" alt="巴赫">\n  <h2>G 大调第一无伴奏大提琴组曲</h2>\n  <p>约翰·塞巴斯蒂安·巴赫</p>\n  <span class="tag">巴洛克</span>\n</div>',
          css: '',
          js: ''
        }
      },
      {
        title: '给卡片穿上衣服',
        content: '现在你的卡片有了内容，但看起来还有点"朴素"。CSS 就是卡片的服装设计师——给它圆角、阴影、颜色和字体，让它变得优雅。\n\n试着给 `.music-card` 添加：\n- `border-radius` — 圆角让卡片更柔和\n- `box-shadow` — 阴影让卡片"浮"起来\n- `padding` — 内边距让内容不贴边\n- `background` — 背景色营造温暖感\n- `max-width` — 限制卡片宽度，更好看\n\n也别忘了给 `.tag` 样式化——小标签可以加背景色和圆角。',
        task: '在 CSS 编辑区美化你的卡片，使用圆角、阴影、内边距和背景色。给标签也加上样式。',
        hint: '试试 `box-shadow: 0 4px 12px rgba(0,0,0,0.1)` —— 这是一组经典的卡片阴影参数。',
        starterCode: {
          html: '<div class="music-card">\n  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg" alt="巴赫">\n  <h2>G 大调第一无伴奏大提琴组曲</h2>\n  <p>约翰·塞巴斯蒂安·巴赫</p>\n  <span class="tag">巴洛克</span>\n</div>',
          css: '.music-card {\n  max-width: 320px;\n  padding: 20px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  background: #FFFDF7;\n  text-align: center;\n}\n\n.music-card img {\n  width: 100%;\n  border-radius: 8px;\n}\n\n.music-card h2 {\n  font-size: 1.1rem;\n  margin: 12px 0 4px 0;\n  color: #3D2B1F;\n}\n\n.music-card p {\n  color: #6B5A4E;\n  margin: 0 0 8px 0;\n}\n\n.tag {\n  display: inline-block;\n  padding: 2px 12px;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  background: #F5EEE0;\n  color: #8B2E2E;\n}',
          js: ''
        }
      },
      {
        title: '变成收藏列表',
        content: '一张卡片是独奏，三张卡片就是室内乐。\n\n现在复制你的卡片 HTML，改成 3 张不同曲目的卡片（可以是你喜欢的任意曲子）。然后用 CSS Grid 把它们排列成响应式网格：\n\n```css\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n}\n```\n\n把所有卡片包在一个 `<div class="card-grid">` 容器里，Grid 会自动帮你排列——屏幕宽时放多列，窄时变成一列。',
        task: '创建 3 张不同的音乐卡片，用 CSS Grid 排列成响应式网格。',
        hint: '`minmax(280px, 1fr)` 的意思是：每列最小 280px，如果空间够就平分剩余空间。这是响应式的关键。',
        starterCode: {
          html: '<h1 style="text-align:center;color:#3D2B1F;">🎵 我的音乐收藏</h1>\n\n<div class="card-grid">\n  <div class="music-card">\n    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg" alt="巴赫">\n    <h2>G 大调第一无伴奏大提琴组曲</h2>\n    <p>约翰·塞巴斯蒂安·巴赫</p>\n    <span class="tag">巴洛克</span>\n  </div>\n\n  <div class="music-card">\n    <img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Wolfgang-amadeus-mozart_1.jpg" alt="莫扎特">\n    <h2>g 小调第 40 号交响曲</h2>\n    <p>沃尔夫冈·阿马德乌斯·莫扎特</p>\n    <span class="tag">古典</span>\n  </div>\n\n  <div class="music-card">\n    <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Claude_Debussy_1905.png" alt="德彪西">\n    <h2>月光</h2>\n    <p>克劳德·德彪西</p>\n    <span class="tag">印象派</span>\n  </div>\n</div>',
          css: '.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.music-card {\n  padding: 20px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  background: #FFFDF7;\n  text-align: center;\n  transition: transform 0.2s;\n}\n\n.music-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n\n.music-card img {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n  border-radius: 8px;\n}\n\n.music-card h2 {\n  font-size: 1.1rem;\n  margin: 12px 0 4px 0;\n  color: #3D2B1F;\n}\n\n.music-card p {\n  color: #6B5A4E;\n  margin: 0 0 8px 0;\n}\n\n.tag {\n  display: inline-block;\n  padding: 2px 12px;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  background: #F5EEE0;\n  color: #8B2E2E;\n}',
          js: ''
        }
      },
      {
        title: '加上分类筛选',
        content: '收藏多了就需要分类——就像整理乐谱按时期分册。\n\n现在用 JavaScript 来实现：点击页面上方的筛选按钮（"全部"、"巴洛克"、"古典"、"浪漫"等），只显示对应风格的卡片。\n\n核心思路：\n1. 给每个卡片的 `.tag` 或卡片容器添加表示风格的信息\n2. 点击按钮时，遍历所有卡片，匹配的显示，不匹配的隐藏\n3. 利用 `.tag` 的文本内容来判断卡片属于哪个时期\n\n你会用到 `querySelectorAll`、`addEventListener` 和 `element.style.display`。',
        task: '添加分类筛选按钮，点击按钮时只显示对应风格的卡片。',
        hint: '可以给卡片容器加 `data-period` 属性来标记时期（如 `<div class="music-card" data-period="巴洛克">`），然后 JS 中读取这个属性来判断。隐藏元素用 `card.style.display = "none"`，显示用 `card.style.display = ""`。',
        starterCode: {
          html: '<h1 style="text-align:center;color:#3D2B1F;">🎵 我的音乐收藏</h1>\n\n<div class="filter-bar">\n  <button class="filter-btn active" data-filter="all">全部</button>\n  <button class="filter-btn" data-filter="巴洛克">巴洛克</button>\n  <button class="filter-btn" data-filter="古典">古典</button>\n  <button class="filter-btn" data-filter="印象派">印象派</button>\n</div>\n\n<div class="card-grid">\n  <div class="music-card" data-period="巴洛克">\n    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg" alt="巴赫">\n    <h2>G 大调第一无伴奏大提琴组曲</h2>\n    <p>约翰·塞巴斯蒂安·巴赫</p>\n    <span class="tag">巴洛克</span>\n  </div>\n\n  <div class="music-card" data-period="古典">\n    <img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Wolfgang-amadeus-mozart_1.jpg" alt="莫扎特">\n    <h2>g 小调第 40 号交响曲</h2>\n    <p>沃尔夫冈·阿马德乌斯·莫扎特</p>\n    <span class="tag">古典</span>\n  </div>\n\n  <div class="music-card" data-period="印象派">\n    <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Claude_Debussy_1905.png" alt="德彪西">\n    <h2>月光</h2>\n    <p>克劳德·德彪西</p>\n    <span class="tag">印象派</span>\n  </div>\n\n  <div class="music-card" data-period="巴洛克">\n    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Vivaldi.jpg" alt="维瓦尔第">\n    <h2>四季 · 春</h2>\n    <p>安东尼奥·维瓦尔第</p>\n    <span class="tag">巴洛克</span>\n  </div>\n</div>',
          css: '.filter-bar {\n  text-align: center;\n  margin: 16px 0 24px 0;\n}\n\n.filter-btn {\n  padding: 6px 18px;\n  margin: 0 4px;\n  border: 1.5px solid #C9A96E;\n  border-radius: 20px;\n  background: #fff;\n  color: #6B5A4E;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.filter-btn.active,\n.filter-btn:hover {\n  background: #C9A96E;\n  color: #fff;\n}\n\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.music-card {\n  padding: 20px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  background: #FFFDF7;\n  text-align: center;\n  transition: transform 0.2s;\n}\n\n.music-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n\n.music-card img {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n  border-radius: 8px;\n}\n\n.music-card h2 {\n  font-size: 1.1rem;\n  margin: 12px 0 4px 0;\n  color: #3D2B1F;\n}\n\n.music-card p {\n  color: #6B5A4E;\n  margin: 0 0 8px 0;\n}\n\n.tag {\n  display: inline-block;\n  padding: 2px 12px;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  background: #F5EEE0;\n  color: #8B2E2E;\n}',
          js: ''
        }
      },
      {
        title: '添加收藏表单',
        content: '收藏不应该只有预设的三首——就像你的乐谱架，随时可以加入新的乐谱。\n\n现在添加一个表单，让你可以**输入新的曲目信息**并动态添加到卡片列表中。\n\n你需要：\n1. 一个表单（`<form>`），包含输入框：曲名、作曲家、图片 URL、风格\n2. 点击"添加"按钮时，用 JS 读取输入框的值\n3. 用 `document.createElement` 或模板字符串创建一张新卡片\n4. 把新卡片插入 `.card-grid` 容器中\n5. 添加后清空表单\n\n这是最有成就感的一步——你写的代码真的能"创建"东西了！',
        task: '添加一个表单，让用户可以输入新曲目信息并动态生成卡片。',
        hint: '使用 `document.createElement("div")` 创建卡片容器，然后用 `classList.add("music-card")` 添加 class，用 `innerHTML` 设置内容，最后用 `appendChild` 加入 Grid 容器。别忘了给表单加 `type="button"` 或使用 `e.preventDefault()` 防止页面刷新。',
        starterCode: {
          html: '<h1 style="text-align:center;color:#3D2B1F;">🎵 我的音乐收藏</h1>\n\n<div class="filter-bar">\n  <button class="filter-btn active" data-filter="all">全部</button>\n  <button class="filter-btn" data-filter="巴洛克">巴洛克</button>\n  <button class="filter-btn" data-filter="古典">古典</button>\n  <button class="filter-btn" data-filter="印象派">印象派</button>\n</div>\n\n<div class="add-form">\n  <h3>➕ 添加新收藏</h3>\n  <input type="text" id="titleInput" placeholder="曲名">\n  <input type="text" id="composerInput" placeholder="作曲家">\n  <input type="text" id="imageInput" placeholder="图片链接">\n  <select id="periodInput">\n    <option value="">选择时期</option>\n    <option value="巴洛克">巴洛克</option>\n    <option value="古典">古典</option>\n    <option value="浪漫">浪漫</option>\n    <option value="印象派">印象派</option>\n    <option value="现代">现代</option>\n  </select>\n  <button id="addBtn" type="button">添加到收藏</button>\n</div>\n\n<div class="card-grid" id="cardGrid">\n  <div class="music-card" data-period="巴洛克">\n    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg" alt="巴赫">\n    <h2>G 大调第一无伴奏大提琴组曲</h2>\n    <p>约翰·塞巴斯蒂安·巴赫</p>\n    <span class="tag">巴洛克</span>\n  </div>\n\n  <div class="music-card" data-period="古典">\n    <img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Wolfgang-amadeus-mozart_1.jpg" alt="莫扎特">\n    <h2>g 小调第 40 号交响曲</h2>\n    <p>沃尔夫冈·阿马德乌斯·莫扎特</p>\n    <span class="tag">古典</span>\n  </div>\n\n  <div class="music-card" data-period="印象派">\n    <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Claude_Debussy_1905.png" alt="德彪西">\n    <h2>月光</h2>\n    <p>克劳德·德彪西</p>\n    <span class="tag">印象派</span>\n  </div>\n</div>',
          css: '.filter-bar {\n  text-align: center;\n  margin: 16px 0;\n}\n\n.filter-btn {\n  padding: 6px 18px;\n  margin: 0 4px;\n  border: 1.5px solid #C9A96E;\n  border-radius: 20px;\n  background: #fff;\n  color: #6B5A4E;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.filter-btn.active,\n.filter-btn:hover {\n  background: #C9A96E;\n  color: #fff;\n}\n\n.add-form {\n  max-width: 600px;\n  margin: 0 auto 24px auto;\n  padding: 20px;\n  background: #FFFDF7;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.06);\n}\n\n.add-form h3 {\n  margin: 0 0 12px 0;\n  color: #3D2B1F;\n  font-size: 1rem;\n}\n\n.add-form input,\n.add-form select {\n  display: block;\n  width: 100%;\n  margin-bottom: 8px;\n  padding: 8px 12px;\n  border: 1px solid #DDD;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  box-sizing: border-box;\n}\n\n.add-form button {\n  padding: 8px 24px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n\n.add-form button:hover {\n  background: #A04545;\n}\n\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.music-card {\n  padding: 20px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  background: #FFFDF7;\n  text-align: center;\n  transition: transform 0.2s;\n}\n\n.music-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n\n.music-card img {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n  border-radius: 8px;\n}\n\n.music-card h2 {\n  font-size: 1.1rem;\n  margin: 12px 0 4px 0;\n  color: #3D2B1F;\n}\n\n.music-card p {\n  color: #6B5A4E;\n  margin: 0 0 8px 0;\n}\n\n.tag {\n  display: inline-block;\n  padding: 2px 12px;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  background: #F5EEE0;\n  color: #8B2E2E;\n}',
          js: ''
        }
      },
      {
        title: '保存你的收藏',
        content: '现在有一个问题：刷新页面后，你辛苦添加的收藏会全部消失——因为数据只存在于内存中。\n\n最后一步：用 `localStorage` 把收藏列表**保存到浏览器**中。这样每次打开页面时，你的收藏都还在。\n\n核心思路：\n1. 每次添加或删除卡片后，收集所有卡片的 HTML 内容，保存到一个数组中\n2. 用 `localStorage.setItem("collections", JSON.stringify(数组))` 保存\n3. 页面加载时，用 `localStorage.getItem("collections")` 读取并还原\n\n做完这一步，你的音乐收藏库就是一个可以**真正使用**的应用了！',
        task: '用 localStorage 保存用户的收藏列表，确保刷新后数据不丢失。',
        hint: '不必保存完整的 HTML，只需要保存每张卡片的数据（曲名、作曲家、图片URL、时期），然后用 JS 重新生成卡片 HTML。这样更简洁。数据结构可以是一个数组，每项是 `{title, composer, image, period}`。',
        starterCode: {
          html: '<h1 style="text-align:center;color:#3D2B1F;">🎵 我的音乐收藏</h1>\n\n<div class="filter-bar">\n  <button class="filter-btn active" data-filter="all">全部</button>\n  <button class="filter-btn" data-filter="巴洛克">巴洛克</button>\n  <button class="filter-btn" data-filter="古典">古典</button>\n  <button class="filter-btn" data-filter="浪漫">浪漫</button>\n  <button class="filter-btn" data-filter="印象派">印象派</button>\n  <button class="filter-btn" data-filter="现代">现代</button>\n</div>\n\n<div class="add-form">\n  <h3>➕ 添加新收藏</h3>\n  <input type="text" id="titleInput" placeholder="曲名">\n  <input type="text" id="composerInput" placeholder="作曲家">\n  <input type="text" id="imageInput" placeholder="图片链接（粘贴 URL 或留空使用默认图）">\n  <select id="periodInput">\n    <option value="">选择时期</option>\n    <option value="巴洛克">巴洛克</option>\n    <option value="古典">古典</option>\n    <option value="浪漫">浪漫</option>\n    <option value="印象派">印象派</option>\n    <option value="现代">现代</option>\n  </select>\n  <button id="addBtn" type="button">添加到收藏</button>\n</div>\n\n<div class="card-grid" id="cardGrid">\n  <!-- 卡片将由 JS 动态生成 -->\n</div>',
          css: '.filter-bar {\n  text-align: center;\n  margin: 16px 0;\n}\n\n.filter-btn {\n  padding: 6px 18px;\n  margin: 0 4px;\n  border: 1.5px solid #C9A96E;\n  border-radius: 20px;\n  background: #fff;\n  color: #6B5A4E;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.filter-btn.active,\n.filter-btn:hover {\n  background: #C9A96E;\n  color: #fff;\n}\n\n.add-form {\n  max-width: 600px;\n  margin: 0 auto 24px auto;\n  padding: 20px;\n  background: #FFFDF7;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.06);\n}\n\n.add-form h3 {\n  margin: 0 0 12px 0;\n  color: #3D2B1F;\n  font-size: 1rem;\n}\n\n.add-form input,\n.add-form select {\n  display: block;\n  width: 100%;\n  margin-bottom: 8px;\n  padding: 8px 12px;\n  border: 1px solid #DDD;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  box-sizing: border-box;\n}\n\n.add-form button {\n  padding: 8px 24px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n\n.add-form button:hover {\n  background: #A04545;\n}\n\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.music-card {\n  padding: 20px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  background: #FFFDF7;\n  text-align: center;\n  transition: transform 0.2s;\n  position: relative;\n}\n\n.music-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n\n.music-card img {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n  border-radius: 8px;\n}\n\n.music-card h2 {\n  font-size: 1.1rem;\n  margin: 12px 0 4px 0;\n  color: #3D2B1F;\n}\n\n.music-card p {\n  color: #6B5A4E;\n  margin: 0 0 8px 0;\n}\n\n.music-card .delete-btn {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  border: none;\n  background: rgba(0,0,0,0.3);\n  color: #fff;\n  font-size: 14px;\n  cursor: pointer;\n  line-height: 1;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n\n.music-card:hover .delete-btn {\n  opacity: 1;\n}\n\n.tag {\n  display: inline-block;\n  padding: 2px 12px;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  background: #F5EEE0;\n  color: #8B2E2E;\n}',
          js: ''
        }
      }
    ]
  },
  {
    id: 'music-searcher',
    trackId: 'projects',
    order: 2,
    title: '音乐搜索器 · API 实战',
    subtitle: '调用 iTunes API，实现实时音乐搜索',
    icon: '🔍',
    musicAnalogy: '打开窗户，聆听世界的声音——你的应用第一次与互联网上的真实数据对话。就像从独奏练习室走到音乐图书馆，你可以搜索任何一位作曲家、任何一首曲子。',
    prerequisiteTrackIds: ['fundamentals', 'framework'],
    listenTo: '雷斯庇基《罗马的松树》— 作曲家通过音乐描绘远方的风景，正如你通过 API 获取远方的数据。一个请求，带回整个世界的音乐。',
    steps: [
      {
        title: '了解 iTunes Search API',
        content: 'Apple 提供了一个免费、无需注册的搜索 API：\n\n```\nhttps://itunes.apple.com/search?term=贝多芬&limit=10&country=cn\n```\n\n在浏览器地址栏直接打开这个链接，你会看到一串 JSON 数据——这就是 API 返回的搜索结果。\n\n返回的 JSON 结构：\n```json\n{\n  "resultCount": 10,\n  "results": [\n    {\n      "trackName": "月光奏鸣曲",\n      "artistName": "贝多芬",\n      "artworkUrl100": "封面图片URL（100px）",\n      "previewUrl": "30秒试听URL",\n      "collectionName": "专辑名",\n      "primaryGenreName": "古典"\\n    }\n  ]\n}\n```\n\n`term` 参数是搜索关键词，`limit` 是结果数量（最大 200），`country` 是国家代码。\n\n> 💡 尝试修改 URL 中的 `term=贝多芬` 为 `term=mozart` 或 `term=肖邦`，看看返回的数据有什么不同。',
        task: '在浏览器中访问 iTunes Search API 的 URL，观察返回的 JSON 数据。理解每个字段的含义。',
        hint: 'JSON 看起来像 JS 对象，但它是字符串格式。`JSON.parse()` 可以将 JSON 字符串转为 JS 对象。字段名用英文是因为 API 是国际化的。',
        starterCode: { html: '', css: '', js: '' }
      },
      {
        title: '实现基础搜索功能',
        content: '现在用 fetch 和 async/await 实现基础搜索。\n\n创建一个 `music-searcher` 项目（用 Vite 或简单的 HTML 文件都可以），核心代码：\n\n```js\nasync function searchMusic(term) {\n  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&limit=10&country=cn`\n  const response = await fetch(url)\n  if (!response.ok) {\n    throw new Error(`搜索失败：${response.status}`)\n  }\n  const data = await response.json()\n  return data.results\n}\n```\n\n注意 `encodeURIComponent(term)` ——中文关键词必须编码才能放在 URL 中。比如"贝多芬"会变成 "%E8%B4%9D%E5%A4%9A%E8%8A%AC"。\n\n然后在页面上：\n1. 一个输入框\n2. 一个搜索按钮\n3. 一个显示结果的列表\n\n点击按钮时调用 `searchMusic`，把返回的结果渲染到页面上——每首歌显示歌名、歌手和封面图。',
        task: '创建一个 HTML 页面，包含输入框和搜索按钮。用 fetch 调用 iTunes API，将搜索结果渲染到页面上。',
        hint: '用 `document.createElement` 或模板字符串生成结果列表的 HTML。每首结果显示：封面图（`artworkUrl100`）、歌名（`trackName`）、歌手（`artistName`）。',
        starterCode: {
          html: '<h1>🔍 音乐搜索器</h1>\n<div class="search-box">\n  <input type="text" id="searchInput" placeholder="输入作曲家或曲名...">\n  <button id="searchBtn">搜索</button>\n</div>\n<div id="results"></div>',
          css: 'body {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n  background: #FDF8F0;\n  max-width: 600px;\n  margin: 40px auto;\n  padding: 20px;\n}\nh1 {\n  text-align: center;\n  color: #3D2B1F;\n}\n.search-box {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 24px;\n}\n#searchInput {\n  flex: 1;\n  padding: 10px 16px;\n  border: 2px solid #D4C5A9;\n  border-radius: 8px;\n  font-size: 16px;\n  outline: none;\n}\n#searchInput:focus {\n  border-color: #C9A96E;\n}\n#searchBtn {\n  padding: 10px 24px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 16px;\n  cursor: pointer;\n}\n#searchBtn:hover {\n  background: #C94545;\n}\n#results {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.result-item {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  background: #FFFDF7;\n  border: 1px solid #E8DDCC;\n  border-radius: 12px;\n  padding: 16px;\n}\n.result-item img {\n  width: 80px;\n  height: 80px;\n  border-radius: 8px;\n  object-fit: cover;\n}\n.result-info h3 {\n  margin: 0 0 4px 0;\n  color: #3D2B1F;\n  font-size: 16px;\n}\n.result-info p {\n  margin: 0;\n  color: #6B5A4E;\n  font-size: 14px;\n}',
          js: '// TODO: 实现搜索功能\nconst input = document.getElementById(\'searchInput\')\nconst btn = document.getElementById(\'searchBtn\')\nconst results = document.getElementById(\'results\')\n\nbtn.addEventListener(\'click\', async () => {\n  const term = input.value.trim()\n  if (!term) return\n  \n  results.innerHTML = \'<p style="text-align:center;color:#9B8579;">搜索中...</p>\'\n  \n  // TODO: 在这里调用 API 并渲染结果\n})'
        }
      },
      {
        title: '实时搜索 + 防抖优化',
        content: '现在改进体验：用户不需要点击按钮——只需输入文字，自动触发搜索。\n\n但直接监听 `input` 事件会导致每次按键都发请求（太频繁了）。用你学过的**防抖**来解决：\n\n```js\nfunction debounce(fn, delay = 400) {\n  let timer\n  return function(...args) {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn.apply(this, args), delay)\n  }\n}\n\n// 防抖版搜索：用户停止输入 400ms 后才真正请求\nconst debouncedSearch = debounce(async (term) => {\n  if (!term.trim()) {\n    results.innerHTML = \'\'\n    return\n  }\n  results.innerHTML = \'<p>搜索中...</p>\'\n  const data = await searchMusic(term)\n  renderResults(data)\n}, 400)\n\n// 监听输入\ninput.addEventListener(\'input\', (e) => {\n  debouncedSearch(e.target.value)\n})\n```\n\n现在删除搜索按钮，改为实时搜索。输入"贝多芬"——你会发现停止打字后只发了一次请求，而不是三次。',
        task: '实现实时搜索：移除搜索按钮，监听 input 事件 + 防抖（400ms），自动触发搜索。验证快速输入时只发一次请求。',
        hint: '在 Network 面板（F12 → Network）中可以直观地看到请求次数。快速输入一串文字，应该只看到一次 API 请求，而不是每次按键都有一行。',
        starterCode: {
          html: '<h1>🔍 音乐搜索器</h1>\n<div class="search-box">\n  <input type="text" id="searchInput" placeholder="输入关键词，自动搜索...">\n</div>\n<div id="results">\n  <p class="placeholder">试试搜索"贝多芬"或"Mozart" 🎵</p>\n</div>',
          css: 'body {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n  background: #FDF8F0;\n  max-width: 600px;\n  margin: 40px auto;\n  padding: 20px;\n}\nh1 {\n  text-align: center;\n  color: #3D2B1F;\n}\n.search-box {\n  margin-bottom: 24px;\n}\n#searchInput {\n  width: 100%;\n  padding: 12px 16px;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  font-size: 16px;\n  outline: none;\n  box-sizing: border-box;\n  transition: border-color 0.2s;\n}\n#searchInput:focus {\n  border-color: #C9A96E;\n}\n#results {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.placeholder {\n  text-align: center;\n  color: #9B8579;\n  padding: 40px 0;\n}\n.result-item {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  background: #FFFDF7;\n  border: 1px solid #E8DDCC;\n  border-radius: 12px;\n  padding: 16px;\n  transition: all 0.2s;\n}\n.result-item:hover {\n  box-shadow: 0 4px 12px rgba(0,0,0,0.08);\n}\n.result-item img {\n  width: 80px;\n  height: 80px;\n  border-radius: 8px;\n  object-fit: cover;\n}\n.result-info h3 {\n  margin: 0 0 4px 0;\n  color: #3D2B1F;\n  font-size: 16px;\n}\n.result-info p {\n  margin: 0;\n  color: #6B5A4E;\n  font-size: 14px;\n}\n.result-info audio {\n  margin-top: 8px;\n  width: 100%;\n  height: 24px;\n}',
          js: '// TODO: 实现防抖实时搜索\nconst input = document.getElementById(\'searchInput\')\nconst results = document.getElementById(\'results\')\n\nfunction debounce(fn, delay) {\n  // TODO: 实现防抖\n}\n\nasync function searchMusic(term) {\n  // TODO: 调用iTunes API\n}\n\nfunction renderResults(items) {\n  // TODO: 渲染搜索结果\n}'
        }
      },
      {
        title: '处理各种状态',
        content: '一个专业的搜索功能需要处理多种状态：\n\n1. **空状态** — 页面刚打开，还没搜索任何东西\n2. **加载中** — 正在请求 API（显示 loading 动画）\n3. **有结果** — 正常展示搜索结果\n4. **无结果** — API 返回了，但没有匹配项\n5. **错误** — 网络故障、API 挂了、请求超时\n\n用代码表示：\n\n```js\nconst state = {\n  idle: \'idle\',        // 空状态\n  loading: \'loading\',  // 加载中\n  success: \'success\',  // 有结果\n  empty: \'empty\',      // 无结果\n  error: \'error\'        // 出错了\n}\n\nlet currentState = \'idle\'\n\nfunction renderByState() {\n  switch (currentState) {\n    case \'idle\':\n      results.innerHTML = \'<p class="placeholder">输入关键词开始搜索 🎵</p>\'\n      break\n    case \'loading\':\n      results.innerHTML = \'<div class="loading">搜索中...</div>\'\n      break\n    case \'empty\':\n      results.innerHTML = \'<p class="placeholder">没有找到相关音乐 😔</p>\'\n      break\n    case \'error\':\n      results.innerHTML = \'<p class="error">网络出问题了，请重试 🔌</p>\'\n      break\n    case \'success\':\n      // 正常渲染结果\n      break\n  }\n}\n```\n\n**这五种状态覆盖了用户会遇到的每一种情况。** 一个专业的应用永远不会让用户面对"什么都不发生"的困惑。',
        task: '在你的搜索器中实现五种状态的展示：idle（空状态）、loading（加载中）、success（有结果）、empty（无结果）、error（错误）。',
        hint: '可以用一个 `currentState` 变量追踪状态。每次状态变化时调用统一的 `render()` 函数。loading 状态可以在发请求前设置，成功/失败后在 try/catch 中设置。',
        starterCode: { html: '', css: '', js: '' }
      },
      {
        title: '收尾与回顾',
        content: '恭喜！你的音乐搜索器完成了。回顾一下你在这个小项目中用到的技能：\n\n| 技能 | 应用 |\n|------|------|\n| async/await | 异步请求 API |\n| fetch | 发送 HTTP 请求 |\n| try/catch | 处理网络错误 |\n| 防抖（debounce） | 优化搜索频率 |\n| DOM 操作 | 渲染搜索结果 |\n| 状态管理 | idle/loading/success/empty/error |\n| JSON | 解析 API 返回的数据 |\n\n**这个项目的意义：**\n\n这是你第一次让应用"走出琴房"——它不再只是本地数据，而是通过网络获取真实的、来自世界各地的音乐信息。\n\n接下来，在 Vue 重构版（下一个项目）中，你会把这些技能迁移到 Vue 框架中——用 computed 筛选、用 watch 监听、用组件组织代码。但核心的异步思维——Promise、async/await、fetch——都是一样的。\n\n> 🎵 你已经不只是在"学代码"了——你在用代码**连接世界**。',
        task: '确认搜索器的五种状态都能正常工作。尝试搜索中文（贝多芬）、英文（Mozart）、空字符串、故意断网——每种情况都应该有对应的提示。',
        hint: '要测试错误状态，可以在 DevTools → Network 面板中切换到 Offline 模式，然后搜索。或者临时把 API URL 改成一个不存在的地址。'
      }
    ]
  },
  {
    id: 'music-collection-v2',
    trackId: 'projects',
    order: 3,
    title: '音乐收藏库 · Vue 重构版',
    subtitle: '用组件化思维重新组织你的代码',
    icon: '🎻',
    musicAnalogy: '独奏者已经熟练了曲子——现在是时候加入乐团了。Vue 的组件就像乐团中的不同声部，各司其职又和谐统一。',
    prerequisiteTrackIds: ['fundamentals', 'framework'],
    listenTo: '拉威尔《波莱罗舞曲》— 同一段旋律在不同乐器组之间传递、叠加、变奏。Vue 的组件就像乐团中的不同声部，各司其职又和谐统一。',
    steps: [
      {
        title: '创建 Vue 项目',
        content: '从零开始，用 Vite 脚手架创建一个 Vue 3 项目。\n\n打开终端，运行：\n```bash\nnpm create vite@latest music-collection-vue -- --template vue\ncd music-collection-vue\nnpm install\nnpm run dev\n```\n\n你会看到一个熟悉的浏览器页面——和之前课程中 `tooling-vite` 一节讲的完全一样。\n\n现在打开 VS Code，看看 Vite 给你生成了什么：\n\n```\nmusic-collection-vue/\n├── index.html          # 入口 HTML\n├── package.json        # 项目配置和依赖\n├── vite.config.js      # Vite 构建配置\n├── src/\n│   ├── App.vue         # 根组件（你从这里开始改）\n│   ├── main.js         # 应用入口\n│   ├── components/     # 放组件的文件夹\n│   └── assets/         # 放图片等静态资源\n```\n\n> 🎻 这个脚手架就像一个"空白总谱"——纸张和五线谱已经准备好了，等你来谱写乐章。',
        task: '用 Vite 创建 Vue 3 项目，启动开发服务器，确认能在浏览器中看到默认页面。',
        hint: '如果 `npm create vite@latest` 命令不工作，确保你的 Node.js 版本是 18 或以上。用 `node -v` 查看版本。',
      },
      {
        title: '设计组件树',
        content: '在写任何代码之前，先做最重要的一步：**设计组件树**。\n\n回顾你在 v1 手工版中做的功能：\n1. 展示音乐收藏卡片列表\n2. 按时期筛选卡片\n3. 添加新的收藏\n\n用 Vue 的组件化思维，可以这样拆分：\n\n```\nApp.vue（根组件 — 管理全部数据和状态）\n├── FilterBar.vue（筛选栏 — 接收当前筛选、发出切换事件）\n├── MusicCard.vue × N（单张卡片 — 接收曲目数据、发出收藏/删除事件）\n└── AddForm.vue（添加表单 — 接收输入、发出添加事件）\n```\n\n**拆分原则：**\n- 每个组件只做一件事\n- 数据放在最顶层的 App.vue（"单一数据源"）\n- 子组件通过 Props 接收数据，通过 Emits 通知父组件\n\n这就像乐团的分谱：\n- 指挥（App.vue）掌握总谱\n- 弦乐组（FilterBar）负责节奏的切换\n- 管乐组（MusicCard）各奏各的旋律\n- 打击乐组（AddForm）在关键时刻加入新的声部',
        task: '在纸上画出你的组件树，标注每个组件的 Props（输入）和 Emits（输出）。然后创建 `src/components/` 文件夹，新建三个空的 `.vue` 文件。',
        hint: '组件文件用 PascalCase 命名：`MusicCard.vue`、`FilterBar.vue`、`AddForm.vue`。这是 Vue 社区的约定，就像音乐术语用意大利语标记。',
        starterCode: {
          html: '<!-- App.vue — 组件树的"指挥" -->\n<template>\n  <div class="app">\n    <h1>🎵 我的音乐收藏</h1>\n    <!-- FilterBar 放在这里 -->\n    <!-- MusicCard 列表放在这里 -->\n    <!-- AddForm 放在这里 -->\n  </div>\n</template>',
          css: '.app {\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 24px;\n}',
          js: '// App.vue — 根组件\n// 这里将管理所有数据（pieces 数组）\n// 和所有状态（selectedPeriod）'
        }
      },
      {
        title: '构建 MusicCard 组件',
        content: '现在开始写第一个组件——音乐收藏卡片。\n\n一张卡片需要从父组件接收这些数据（Props）：\n- `name` — 曲名\n- `composer` — 作曲家\n- `image` — 封面图片 URL\n- `period` — 时期/风格\n- `liked` — 是否已收藏（布尔值）\n\n同时，卡片会发出这些事件（Emits）：\n- `toggle-like` — 用户点击收藏按钮\n- `delete` — 用户点击删除按钮\n\n**规则不变：子组件不能直接修改 Props！** 它只能通过 emit 通知父组件。\n\n下面是一个 MusicCard 的完整实现：',
        task: '创建 `src/components/MusicCard.vue`，实现带 Props 和 Emits 的音乐卡片组件。在卡片右上角放一个收藏按钮（♡/❤）和一个删除按钮（✕）。',
        hint: 'Props 用对象形式定义（带类型）：`defineProps({ name: String, composer: String, ... })`。模板中不需要 `.value`，直接 `{{ name }}` 即可。鼠标悬停时显示删除按钮，可以用 CSS 的 `:hover` 和 `opacity` 实现。',
        starterCode: {
          html: '<!-- MusicCard.vue — 模板 -->\n<template>\n  <div class="music-card">\n    <img :src="image" :alt="name" />\n    <button class="delete-btn" @click="$emit(\'delete\')">✕</button>\n    <h2>{{ name }}</h2>\n    <p>{{ composer }}</p>\n    <span class="period-tag">{{ period }}</span>\n    <button\n      class="like-btn"\n      @click="$emit(\'toggle-like\')\"\n    >\n      {{ liked ? \'❤\' : \'🤍\' }}\n    </button>\n  </div>\n</template>',
          css: '/* MusicCard.vue — scoped 样式 */\n.music-card {\n  position: relative;\n  padding: 20px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n  background: #FFFDF7;\n  text-align: center;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.music-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0,0,0,0.15);\n}\n.music-card img {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n  border-radius: 8px;\n}\n.music-card h2 {\n  font-size: 1.1rem;\n  margin: 12px 0 4px 0;\n  color: #3D2B1F;\n}\n.music-card p {\n  color: #6B5A4E;\n  margin: 0 0 8px 0;\n}\n.period-tag {\n  display: inline-block;\n  padding: 2px 12px;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  background: #F5EEE0;\n  color: #8B2E2E;\n  margin-bottom: 10px;\n}\n.like-btn {\n  display: block;\n  margin: 0 auto;\n  background: none;\n  border: none;\n  font-size: 1.5rem;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.like-btn:hover {\n  transform: scale(1.2);\n}\n.delete-btn {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  border: none;\n  background: rgba(0,0,0,0.35);\n  color: #fff;\n  font-size: 14px;\n  cursor: pointer;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.music-card:hover .delete-btn {\n  opacity: 1;\n}',
          js: '// MusicCard.vue — 逻辑\nimport { defineProps, defineEmits } from \'vue\'\n\ndefineProps({\n  name: String,\n  composer: String,\n  image: String,\n  period: String,\n  liked: Boolean\n})\n\ndefineEmits([\'toggle-like\', \'delete\'])'
        }
      },
      {
        title: '构建 FilterBar 组件',
        content: '筛选栏组件比卡片组件更"内向"——它不需要从父组件接收很多数据，但需要向父组件发出事件。\n\n**Props：**\n- `periods` — 所有可选的时期列表（数组）\n- `active` — 当前选中的时期（字符串）\n\n**Emits：**\n- `update:active` — 用户点击某个时期按钮时，告诉父组件"我选了这个"\n\n这样设计的好处是：FilterBar **不关心**外面怎么用——它只管展示按钮和响应用户点击。更换筛选逻辑、改变按钮样式，都不用改外面的 App.vue。这就是组件化的精髓：**封装变化**。\n\n实现时，用 `v-for` 循环渲染按钮，用动态 class 高亮当前选中的按钮：\n```vue\n<button\n  v-for="period in periods"\n  :key="period"\n  :class="{ active: active === period }"\n  @click="$emit(\'update:active\', period)"\n>\n  {{ period }}\n</button>\n```',
        task: '创建 `src/components/FilterBar.vue`，渲染一排时期筛选按钮。当前选中的按钮高亮显示。点击按钮时发出 `update:active` 事件。',
        hint: '在 App.vue 中使用时，可以用 `v-model:active="selectedPeriod"` 来双向绑定——这是 Vue 3 对 `update:` 前缀事件的语法糖。',
        starterCode: {
          html: '<!-- FilterBar.vue — 模板 -->\n<template>\n  <div class="filter-bar">\n    <button\n      v-for="period in periods"\n      :key="period"\n      :class="{ active: active === period }"\n      @click="$emit(\'update:active\', period)"\n      class="filter-btn"\n    >\n      {{ period }}\n    </button>\n  </div>\n</template>',
          css: '/* FilterBar.vue — scoped 样式 */\n.filter-bar {\n  text-align: center;\n  margin: 16px 0 24px 0;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 8px;\n}\n.filter-btn {\n  padding: 6px 18px;\n  border: 1.5px solid #C9A96E;\n  border-radius: 20px;\n  background: #fff;\n  color: #6B5A4E;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.filter-btn:hover {\n  background: #F5EEE0;\n}\n.filter-btn.active {\n  background: #C9A96E;\n  color: #fff;\n}',
          js: '// FilterBar.vue — 逻辑\nimport { defineProps, defineEmits } from \'vue\'\n\ndefineProps({\n  periods: { type: Array, required: true },\n  active: { type: String, required: true }\n})\n\ndefineEmits([\'update:active\'])'
        }
      },
      {
        title: '构建 AddForm 组件',
        content: '添加表单组件让用户可以输入新的曲目信息。这里会用到 Vue 的 `v-model` 指令——它比原生 JS 的 `querySelector + addEventListener` 简洁太多了。\n\n**组件内部数据（不需要 props）：**\n- `name`、`composer`、`image`、`period` — 四个表单字段，用 `ref` 管理\n\n**Emits：**\n- `add` — 用户提交表单时，把新曲目的数据对象发给父组件\n\n关键点：\n- 表单提交时，组装一个对象 `{ name, composer, image, period }` 发出去\n- 提交后清空所有输入框（把 ref 的值重置为空字符串）\n- 简单的表单验证：曲名和作曲家不能为空\n\n对比一下 v1 中实现添加功能需要写的代码——`document.getElementById`、`createElement`、`appendChild`——现在只需要 `v-model` + `emit`，代码量减少了 70%。',
        task: '创建 `src/components/AddForm.vue`，包含四个输入字段（曲名、作曲家、图片URL、时期下拉框）和一个提交按钮。提交时验证数据、发出 `add` 事件、清空表单。',
        hint: '用 `<select v-model="period">` 绑定下拉框。如果图片 URL 为空，可以给一个默认的占位图：`https://placehold.co/400x200/E8D5B7/8B2E2E?text=No+Image`。',
        starterCode: {
          html: '<!-- AddForm.vue — 模板 -->\n<template>\n  <form class="add-form" @submit.prevent="handleSubmit">\n    <h3>➕ 添加新收藏</h3>\n    <input\n      v-model="name"\n      type="text"\n      placeholder="曲名（必填）"\n    />\n    <input\n      v-model="composer"\n      type="text"\n      placeholder="作曲家（必填）"\n    />\n    <input\n      v-model="image"\n      type="text"\n      placeholder="图片链接（可选）"\n    />\n    <select v-model="period">\n      <option value="">选择时期</option>\n      <option value="巴洛克">巴洛克</option>\n      <option value="古典">古典</option>\n      <option value="浪漫">浪漫</option>\n      <option value="印象派">印象派</option>\n      <option value="现代">现代</option>\n    </select>\n    <button type="submit">添加到收藏</button>\n    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>\n  </form>\n</template>',
          css: '/* AddForm.vue — scoped 样式 */\n.add-form {\n  max-width: 500px;\n  margin: 0 auto 24px auto;\n  padding: 20px;\n  background: #FFFDF7;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.06);\n}\n.add-form h3 {\n  margin: 0 0 12px 0;\n  color: #3D2B1F;\n  font-size: 1rem;\n}\n.add-form input,\n.add-form select {\n  display: block;\n  width: 100%;\n  margin-bottom: 8px;\n  padding: 8px 12px;\n  border: 1px solid #DDD;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  box-sizing: border-box;\n}\n.add-form button {\n  padding: 8px 24px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.add-form button:hover {\n  background: #A04545;\n}\n.error {\n  color: #D32F2F;\n  font-size: 0.85rem;\n  margin-top: 8px;\n}',
          js: '// AddForm.vue — 逻辑\nimport { ref, defineEmits } from \'vue\'\n\nconst emit = defineEmits([\'add\'])\n\nconst name = ref(\'\')\nconst composer = ref(\'\')\nconst image = ref(\'\')\nconst period = ref(\'\')\nconst errorMsg = ref(\'\')\n\nfunction handleSubmit() {\n  errorMsg.value = \'\'\n  if (!name.value.trim() || !composer.value.trim()) {\n    errorMsg.value = \'请至少填写曲名和作曲家\'\n    return\n  }\n  emit(\'add\', {\n    name: name.value.trim(),\n    composer: composer.value.trim(),\n    image: image.value.trim() || \'\',\n    period: period.value || \'未分类\'\n  })\n  // 清空表单\n  name.value = \'\'\n  composer.value = \'\'\n  image.value = \'\'\n  period.value = \'\'\n}'
        }
      },
      {
        title: '组装 App.vue — 把所有组件"合奏"起来',
        content: '现在来到最关键的一步——在 App.vue 中把所有组件组装起来，让它们协同工作。\n\nApp.vue 扮演"指挥"的角色：\n1. **拥有所有数据**——`pieces` 数组（ref）和 `selectedPeriod` 状态（ref）\n2. **用 computed 做筛选**——根据 `selectedPeriod` 从 `pieces` 中筛出要显示的曲目\n3. **用 v-for 渲染卡片**——遍历筛选结果，给每个 MusicCard 传 props\n4. **处理子组件的事件**——`@add`、`@toggle-like`、`@delete`\n\n关键代码结构：\n```vue\n<script setup>\nimport { ref, computed } from \'vue\'\nimport MusicCard from \'./components/MusicCard.vue\'\nimport FilterBar from \'./components/FilterBar.vue\'\nimport AddForm from \'./components/AddForm.vue\'\n\nconst pieces = ref([\n  { id: 1, name: \'G大调第一无伴奏大提琴组曲\', composer: \'巴赫\', ... },\n  // ... 更多初始数据\n])\nconst selectedPeriod = ref(\'全部\')\n\nconst periods = computed(() => {\n  const set = new Set(pieces.value.map(p => p.period))\n  return [\'全部\', ...set]\n})\n\nconst filteredPieces = computed(() => {\n  if (selectedPeriod.value === \'全部\') return pieces.value\n  return pieces.value.filter(p => p.period === selectedPeriod.value)\n})\n\nfunction addPiece(data) { ... }\nfunction toggleLike(id) { ... }\nfunction deletePiece(id) { ... }\n</script>\n```\n\n注意 `periods` 这个 computed：它从 pieces 中**自动提取**所有不重复的时期——以后添加了新时期的曲目，筛选按钮会自动出现。这就是"数据驱动"的威力。',
        task: '在 App.vue 中组装所有组件：引入 MusicCard、FilterBar、AddForm，用 computed 实现筛选，处理子组件发出的所有事件。',
        hint: '给每首曲目一个唯一 ID（可以用自增数字或 `Date.now()`），方便在 `toggleLike` 和 `deletePiece` 中定位要修改的曲目。`v-for` 渲染时记得加 `:key="p.id"`。',
        starterCode: {
          html: '<!-- App.vue — 模板 -->\n<template>\n  <div class="app">\n    <h1 class="app-title">🎵 我的音乐收藏</h1>\n\n    <FilterBar\n      :periods="periods"\n      v-model:active="selectedPeriod"\n    />\n\n    <AddForm @add="addPiece" />\n\n    <div class="stats">\n      筛选出 {{ filteredPieces.length }} 首中的 {{ filteredPieces.length }} 首\n    </div>\n\n    <div class="card-grid">\n      <MusicCard\n        v-for="p in filteredPieces"\n        :key="p.id"\n        :name="p.name"\n        :composer="p.composer"\n        :image="p.image"\n        :period="p.period"\n        :liked="p.liked"\n        @toggle-like="toggleLike(p.id)"\n        @delete="deletePiece(p.id)"\n      />\n    </div>\n\n    <div v-if="filteredPieces.length === 0" class="empty">\n      还没有收藏，用上方的表单添加第一首吧 🎶\n    </div>\n  </div>\n</template>',
          css: '/* App.vue — 全局样式 */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  background: #FDF8F0;\n  color: #3D2B1F;\n}\n.app {\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 24px;\n}\n.app-title {\n  text-align: center;\n  margin-bottom: 8px;\n  font-size: 1.8rem;\n  color: #3D2B1F;\n}\n.stats {\n  text-align: center;\n  color: #9B8579;\n  font-size: 0.85rem;\n  margin-bottom: 16px;\n}\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n}\n.empty {\n  text-align: center;\n  padding: 60px 20px;\n  color: #9B8579;\n  font-size: 1.1rem;\n}',
          js: '// App.vue — 逻辑\nimport { ref, computed } from \'vue\'\nimport MusicCard from \'./components/MusicCard.vue\'\nimport FilterBar from \'./components/FilterBar.vue\'\nimport AddForm from \'./components/AddForm.vue\'\n\nlet nextId = 4\n\nconst pieces = ref([\n  {\n    id: 1,\n    name: \'G大调第一无伴奏大提琴组曲\',\n    composer: \'巴赫\',\n    image: \'https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg\',\n    period: \'巴洛克\',\n    liked: false\n  },\n  {\n    id: 2,\n    name: \'g小调第40号交响曲\',\n    composer: \'莫扎特\',\n    image: \'https://upload.wikimedia.org/wikipedia/commons/1/1e/Wolfgang-amadeus-mozart_1.jpg\',\n    period: \'古典\',\n    liked: true\n  },\n  {\n    id: 3,\n    name: \'月光\',\n    composer: \'德彪西\',\n    image: \'https://upload.wikimedia.org/wikipedia/commons/8/87/Claude_Debussy_1905.png\',\n    period: \'印象派\',\n    liked: false\n  }\n])\n\nconst selectedPeriod = ref(\'全部\')\n\nconst periods = computed(() => {\n  const set = new Set(pieces.value.map(p => p.period))\n  return [\'全部\', ...set]\n})\n\nconst filteredPieces = computed(() => {\n  if (selectedPeriod.value === \'全部\') return pieces.value\n  return pieces.value.filter(p => p.period === selectedPeriod.value)\n})\n\nfunction addPiece(data: { name: string; composer: string; image: string; period: string }) {\n  pieces.value.push({\n    id: nextId++,\n    ...data,\n    liked: false\n  })\n}\n\nfunction toggleLike(id: number) {\n  const p = pieces.value.find(p => p.id === id)\n  if (p) p.liked = !p.liked\n}\n\nfunction deletePiece(id: number) {\n  pieces.value = pieces.value.filter(p => p.id !== id)\n}'
        }
      },
      {
        title: '数据持久化 — localStorage + watch',
        content: '最后一个关键功能：让数据在刷新后不丢失。\n\n在 v1 中，你手动调用 `localStorage.setItem` 来保存。Vue 有更好的方式——**watch**。\n\n`watch` 会自动"监视"一个响应式数据的变化，并在变化时执行你指定的函数。这就好比请了一个助手，时刻帮你盯着数据，一有变化就自动存档。\n\n```vue\n<script setup>\nimport { ref, watch } from \'vue\'\n\nconst pieces = ref(loadFromStorage())\n\n// 从 localStorage 读取初始数据\nfunction loadFromStorage() {\n  const saved = localStorage.getItem(\'music-collection\')\n  return saved ? JSON.parse(saved) : [/* 默认数据 */]\n}\n\n// 每当 pieces 变化，自动保存\nwatch(pieces, (newVal) => {\n  localStorage.setItem(\'music-collection\', JSON.stringify(newVal))\n}, { deep: true })\n</script>\n```\n\n注意 `{ deep: true }` ——因为 `pieces` 是一个数组（引用类型），deep 模式让 watch 能检测到数组**内部**的变化（添加、删除、修改元素）。\n\n**对比 v1：**\n- v1：每次操作后手动调用保存函数 → 容易忘记\n- v2：watch 自动监听 → 永远不会漏掉\n\n> 🎉 到这里，你的 Vue 版音乐收藏库就完成了！它和 v1 手工版功能一样，但代码结构更清晰、更容易扩展。接下来可以把它推送到 GitHub 了。',
        task: '用 watch 监听 pieces 的变化，自动保存到 localStorage。同时实现页面初始化时从 localStorage 读取数据。',
        hint: '如果 `localStorage.getItem` 返回 `null`（第一次使用），就用默认的初始数据。`JSON.parse` 的参数需要判空，否则会报错。',
        starterCode: {
          html: '<!-- 在 App.vue 中，模板不变 -->\n<!-- localStorage 的读写全部在 <script setup> 中完成 -->',
          css: '/* 样式不变 */',
          js: '// App.vue — 添加 localStorage + watch\nimport { ref, computed, watch } from \'vue\'\n\nconst STORAGE_KEY = \'music-collection-vue\'\n\nfunction loadFromStorage() {\n  try {\n    const saved = localStorage.getItem(STORAGE_KEY)\n    if (saved) return JSON.parse(saved)\n  } catch (e) {\n    console.warn(\'读取收藏数据失败，使用默认数据\', e)\n  }\n  return [\n    { id: 1, name: \'G大调第一无伴奏大提琴组曲\', composer: \'巴赫\', image: \'...\', period: \'巴洛克\', liked: false },\n    // ... 其他默认数据\n  ]\n}\n\nconst pieces = ref(loadFromStorage())\n\n// 自动保存 — deep 模式检测数组内部变化\nwatch(pieces, (newVal) => {\n  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))\n}, { deep: true })'
        }
      },
      {
        title: '回顾与对比 — v1 vs v2',
        content: '恭喜你完成了 Vue 重构版！让我们来对比一下 v1 和 v2：\n\n| | v1 手工版 | v2 Vue 重构版 |\n|---|---|---|\n| 代码组织 | 一个 HTML 文件，HTML/CSS/JS 混在一起 | 三个 `.vue` 组件，各司其职 |\n| 数据管理 | 手动操作 DOM（`querySelector`、`createElement`） | 响应式数据（`ref`、`computed`），自动更新 DOM |\n| 筛选 | 手动遍历 DOM、设置 `display` | `computed` 自动计算，模板自动更新 |\n| 添加 | `createElement` + `appendChild` 拼接 HTML | `v-model` + `emit`，数据驱动 |\n| 持久化 | 每次操作后手动调用保存函数 | `watch` 自动监听，一劳永逸 |\n| 可维护性 | 功能多了容易混乱 | 组件独立，修改不影响其他部分 |\n| 可复用性 | 代码无法跨项目复用 | 组件可以在任何 Vue 项目中使用 |\n\n**关键转变：**\n你从"告诉浏览器怎么做"（命令式），转向了"描述页面应该是什么样"（声明式）。\n\n这就是 Vue 框架的核心价值：**你只需要关心数据，DOM 更新交给框架。**\n\n接下来，在 v3 中，你将学会如何把项目推送到 GitHub、部署到云端，让全世界都能看到你的作品。',
        task: '回顾你的 v1 和 v2 代码，感受两种开发方式的差异。确认所有功能正常：添加、筛选、收藏切换、删除、刷新后数据保留。',
        hint: '如果筛选栏中的时期列表没有更新，检查 `periods` computed 是否正确提取了所有不重复的时期。',
        starterCode: {
          html: '<!-- 这是回顾步骤，无需新代码 -->\n<!-- 检查 App.vue 确保所有功能正常 -->',
          css: '',
          js: ''
        }
      }
    ]
  },
  {
    id: 'music-collection-v3',
    trackId: 'projects',
    order: 4,
    title: '音乐收藏库 · 全栈协作版',
    subtitle: '让你的作品登上舞台，被世界看见',
    icon: '🎤',
    musicAnalogy: '从排练厅走上音乐厅的舞台——Git 版本控制是你的排练记录，CI/CD 是你的演出流程，云端部署就是座无虚席的音乐厅。',
    prerequisiteTrackIds: ['fundamentals', 'framework', 'engineering'],
    listenTo: '贝多芬《第九交响曲"合唱"》第四乐章 — 从器乐到人声，从个体到群体，所有力量汇聚成《欢乐颂》的洪流。Git、GitHub、CI/CD 就是你的乐团、音乐厅和全球巡演。',
    steps: [
      {
        title: 'Git 初始化与首次提交',
        content: '在继续开发之前，先把 v2 的代码用 Git 管理起来。\n\n打开 VS Code 终端（在项目根目录）：\n\n```bash\n# 初始化 Git 仓库\ngit init\n\n# 查看哪些文件会被追踪\ngit status\n```\n\n你会看到一列红色的文件——这些是"未追踪"的文件。\n\n在暂存之前，先创建 `.gitignore` 文件，告诉 Git 哪些不需要管理：\n\n```\n# .gitignore\nnode_modules/\ndist/\n.DS_Store\n*.local\n```\n\n`node_modules/` 有几万个文件，绝对不能提交到 Git——别人可以通过 `npm install` 重新下载。\n\n现在做第一次提交：\n```bash\ngit add .\ngit commit -m "初始化音乐收藏 Vue 项目"\ngit log --oneline\n```\n\n你会看到一条 commit 记录，前面有一个哈希值（如 `a1b2c3d`）。这是这次快照的"身份证号"。\n\n> 🎯 每一次 commit 都是一次"存档"。好的 commit 消息就像乐章标题，让你知道这一段写了什么。',
        task: '在项目中初始化 Git，创建 `.gitignore`，把所有源码文件添加到第一次提交中。运行 `git log` 确认提交成功。',
        hint: '如果误把 node_modules 提交了，可以这样移除：`git rm -r --cached node_modules`，然后 commit。`.gitignore` 只对未追踪的文件生效。',
      },
      {
        title: '功能增强 — 搜索与排序',
        content: '现在你的音乐收藏库基本功能都有了，但还可以再加两个实用功能：搜索和排序。\n\n**搜索功能：**\n添加一个搜索框，用户可以输入关键词，实时筛选包含该关键词的曲目（匹配曲名或作曲家）。\n\n用 computed 实现非常简单：\n```js\nconst searchQuery = ref(\'\')\n\nconst searchedPieces = computed(() => {\n  if (!searchQuery.value.trim()) return filteredPieces.value\n  const q = searchQuery.value.trim().toLowerCase()\n  return filteredPieces.value.filter(p =>\n    p.name.toLowerCase().includes(q) ||\n    p.composer.toLowerCase().includes(q)\n  )\n})\n```\n\n然后在模板中渲染 `searchedPieces` 而不是 `filteredPieces`。\n\n**排序功能：**\n添加一个下拉框，可以选择按"曲名"或"作曲家"排序：\n\n```js\nconst sortBy = ref(\'name\')\n\nconst sortedPieces = computed(() => {\n  return [...searchedPieces.value].sort((a, b) => {\n    return a[sortBy.value].localeCompare(b[sortBy.value], \'zh\')\n  })\n})\n```\n\n现在把两个 computed 串起来：`pieces → filtered(筛选) → searched(搜索) → sorted(排序)`，每一步只做一件事，清晰明了。这就是"computed 链"——每个 computed 只关心自己的那一步。',
        task: '添加搜索框和排序下拉框。用 computed 实现搜索和排序功能。最终的渲染数据链为：筛选 → 搜索 → 排序。',
        hint: '搜索时建议用 `toLowerCase()` 做大小写不敏感匹配。排序时 `localeCompare` 的第二个参数 `\'zh\'` 让中文排序更准确。搜索和排序的 computed 需要同时依赖前面的 computed 结果。',
        starterCode: {
          html: '<!-- 搜索框和排序下拉框 -->\n<div class="toolbar">\n  <input\n    v-model="searchQuery"\n    type="text"\n    class="search-input"\n    placeholder="🔍 搜索曲名或作曲家..."\n  />\n  <select v-model="sortBy" class="sort-select">\n    <option value="name">按曲名排序</option>\n    <option value="composer">按作曲家排序</option>\n    <option value="period">按时期排序</option>\n  </select>\n</div>\n\n<!-- 渲染时用 sortedPieces 替换 filteredPieces -->\n<div class="card-grid">\n  <MusicCard\n    v-for="p in sortedPieces"\n    :key="p.id"\n    ...\n  />\n</div>',
          css: '/* 工具栏样式 */\n.toolbar {\n  display: flex;\n  gap: 12px;\n  max-width: 500px;\n  margin: 0 auto 20px auto;\n}\n.search-input {\n  flex: 1;\n  padding: 8px 14px;\n  border: 1px solid #DDD;\n  border-radius: 20px;\n  font-size: 0.9rem;\n  outline: none;\n  transition: border-color 0.2s;\n}\n.search-input:focus {\n  border-color: #C9A96E;\n}\n.sort-select {\n  padding: 8px 12px;\n  border: 1px solid #DDD;\n  border-radius: 20px;\n  font-size: 0.9rem;\n  background: #fff;\n  cursor: pointer;\n}',
          js: '// 搜索与排序逻辑\nimport { ref, computed } from \'vue\'\n\nconst searchQuery = ref(\'\')\nconst sortBy = ref(\'name\')\n\n// computed 链：筛选 → 搜索 → 排序\nconst filteredPieces = computed(() => {\n  if (selectedPeriod.value === \'全部\') return pieces.value\n  return pieces.value.filter(p => p.period === selectedPeriod.value)\n})\n\nconst searchedPieces = computed(() => {\n  if (!searchQuery.value.trim()) return filteredPieces.value\n  const q = searchQuery.value.trim().toLowerCase()\n  return filteredPieces.value.filter(p =>\n    p.name.toLowerCase().includes(q) ||\n    p.composer.toLowerCase().includes(q)\n  )\n})\n\nconst sortedPieces = computed(() => {\n  return [...searchedPieces.value].sort((a, b) => {\n    return String(a[sortBy.value]).localeCompare(String(b[sortBy.value]), \'zh\')\n  })\n})'
        }
      },
      {
        title: '分支开发工作流',
        content: '现在你的项目已经有了几个 commit，接下来的新功能应该在**分支**上开发——这是工程实践的核心习惯。\n\n**为什么需要分支？**\n\n想象你在改写一首交响曲的第三乐章——你不想在改的过程中搞坏原本已经能正常演出的版本。分支就是你的"草稿本"：在分支上随便折腾，搞砸了删掉重来，搞好了再合并回主分支。\n\n**实际操作：**\n\n```bash\n# 查看所有分支（当前是 main）\ngit branch\n\n# 创建并切换到新分支\ngit checkout -b feature/favorites\n\n# 确认在 feature/favorites 分支上\ngit branch\n```\n\n在 `feature/favorites` 分支上添加一个新功能：**收藏夹**——把标记为 ❤ 的曲目集中展示。\n\n这个功能需要：\n1. 一个"显示收藏"的切换按钮\n2. 一个 computed 来筛选 `liked === true` 的曲目\n3. 在筛选栏中集成这个切换\n\n在分支上开发完成后：\n```bash\ngit add .\ngit commit -m "添加收藏夹功能：可以筛选已收藏的曲目"\n\n# 切回 main 分支\ngit checkout main\n\n# 合并 feature/favorites 分支\ngit merge feature/favorites\n\n# 删除已合并的分支\ngit branch -d feature/favorites\n```\n\n> 🌿 分支是 Git 最强大的功能之一。大项目每天可能有几十个分支同时活跃——就像交响乐团的排练室里，弦乐组、管乐组、打击乐组可能同时在不同的房间排练。',
        task: '创建 `feature/favorites` 分支，实现收藏夹切换功能（只显示已收藏曲目），commit 后合并回 main 分支。',
        hint: '`git checkout -b <分支名>` 创建并切换分支。合并前确保你在目标分支上（`git checkout main`）。合并后用 `git log --oneline --graph` 可以看到分支历史。',
        starterCode: {
          html: '<!-- 在 FilterBar 中添加"我的收藏"切换 -->\n<div class="favorites-toggle">\n  <button\n    :class="{ active: showFavoritesOnly }"\n    @click="$emit(\'update:showFavorites\', !showFavoritesOnly)"\n  >\n    {{ showFavoritesOnly ? \'❤ 我的收藏\' : \'🤍 显示全部\' }}\n  </button>\n</div>',
          css: '/* 收藏切换按钮样式 */\n.favorites-toggle {\n  margin-top: 8px;\n}\n.favorites-toggle button {\n  padding: 5px 16px;\n  border: 1.5px solid #E8C9C9;\n  border-radius: 20px;\n  background: #fff;\n  color: #8B2E2E;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.favorites-toggle button.active {\n  background: #8B2E2E;\n  color: #fff;\n}',
          js: '// 在 App.vue 中添加\nconst showFavoritesOnly = ref(false)\n\nconst displayPieces = computed(() => {\n  const base = sortedPieces.value\n  if (showFavoritesOnly.value) {\n    return base.filter(p => p.liked)\n  }\n  return base\n})'
        }
      },
      {
        title: '推送到 GitHub',
        content: '你的项目在本地已经管理得很好了——现在是时候把它发表到 GitHub 上，让世界看到你的作品。\n\n**第一步：在 GitHub 创建远程仓库**\n\n1. 打开 [github.com](https://github.com)，登录你的账号\n2. 点击右上角 ➕ → "New repository"\n3. 仓库名：`music-collection`\n4. 描述：🎵 我的音乐收藏 — 从 HTML/CSS/JS 到 Vue 组件化的学习之旅\n5. 设置为 **Public**\n6. **不要勾选** "Add a README file"（因为本地已有项目）\n7. 点击 "Create repository"\n\n**第二步：关联并推送**\n\nGitHub 会显示一段命令，复制并在终端中运行：\n\n```bash\ngit remote add origin https://github.com/你的用户名/music-collection.git\ngit branch -M main\ngit push -u origin main\n```\n\n解释：\n- `git remote add origin <URL>` — 告诉 Git"远程仓库的地址"，起名 `origin`\n- `git branch -M main` — 确保分支名是 `main`\n- `git push -u origin main` — 把本地的所有 commit 推送到 GitHub\n\n刷新 GitHub 页面——你的代码出现了！README 会自动渲染，目录结构清晰可见。\n\n之后每次 commit 后，只需 `git push` 即可同步。\n\n> 🌐 你的代码现在有了一个公开的"家"。GitHub 主页就是程序员的技术名片。',
        task: '在 GitHub 创建公开仓库，将本地项目推送到远程。确认所有文件都已上传，README 能正常渲染。',
        hint: '如果首次 push 时提示需要登录，在弹出的窗口中用 GitHub 账号授权。如果遇到 "Permission denied"，说明需要配置凭据——用 `gh auth login`（如果装了 GitHub CLI）或在 GitHub 设置中创建 Personal Access Token。',
      },
      {
        title: '构建生产版本',
        content: '开发时我们用的是 Vite 的开发服务器（`npm run dev`），它有热更新和源码映射，很方便——但这些便利是以文件体积和性能为代价的。\n\n现在要构建给用户访问的"生产版本"：\n\n```bash\nnpm run build\n```\n\n运行后，项目根目录会多出一个 `dist/` 文件夹：\n\n```\ndist/\n├── index.html        # 入口页面（压缩后）\n├── assets/\n│   ├── index-abc123.js   # 打包后的 JS（变量名缩短、空格删除）\n│   └── index-def456.css  # 打包后的 CSS（选择器简化、注释移除）\n└── favicon.ico\n```\n\n对比一下：\n\n| | 开发版本（dev） | 生产版本（dist） |\n|---|---|---|\n| 文件大小 | 几百 KB（未压缩） | 几十 KB（压缩后） |\n| 加载速度 | 慢（多文件请求） | 快（合并后少量文件） |\n| 错误提示 | 详细的源码位置 | 压缩后的位置（难读） |\n| 热更新 | ✅ 有 | ❌ 无（已经是最终品） |\n\n**类比：**\n- 开发版本 = 排练时的笔记，潦草但你能看懂\n- 生产版本 = 正式演出的节目单，印刷精美，观众能看懂\n\n你可以用 `npx serve dist` 临时预览构建结果——这是你"上线前最后的彩排"。',
        task: '运行 `npm run build`，查看 `dist/` 文件夹的内容。用 `npx serve dist` 预览构建后的版本，确认功能正常。',
        hint: '构建后如果在本地预览发现路径问题（404），检查 `vite.config.js` 中的 `base` 配置。本地预览可以用 `npx vite preview`（Vite 内置的命令）。',
      },
      {
        title: '部署到 GitHub Pages',
        content: '构建完成，最后一个步骤——部署上线！\n\nGitHub Pages 是 GitHub 提供的免费静态网站托管服务。你把 `dist/` 的内容推上去，就能获得一个公开网址。\n\n**最简单的方式：使用 `gh-pages`**\n\n1. 安装 `gh-pages`：\n```bash\nnpm install -D gh-pages\n```\n\n2. 在 `vite.config.js` 中添加 base 配置：\n```js\nimport { defineConfig } from \'vite\'\nimport vue from \'@vitejs/plugin-vue\'\n\nexport default defineConfig({\n  plugins: [vue()],\n  base: \'/music-collection/\'  // 你的仓库名\n})\n```\n\n3. 在 `package.json` 中添加部署脚本：\n```json\n{\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "deploy": "gh-pages -d dist"\n  }\n}\n```\n\n4. 构建并部署：\n```bash\nnpm run build\nnpm run deploy\n```\n\n等待 1-2 分钟，访问：\n`https://你的用户名.github.io/music-collection/`\n\n**你的项目上线了！** 任何人都可以通过这个网址访问你的音乐收藏库。把链接发给朋友和家人，让他们看看你从零开始做出的东西。\n\n> 🎭 从"Hello World"到"上线部署"，你完成了前端开发中最完整的闭环。正如指挥家从第一次挥棒到谢幕——所有的练习，都是为了这一刻的演出。',
        task: '配置 `vite.config.js` 的 base 路径，安装 `gh-pages`，构建并部署到 GitHub Pages。访问你的网址确认部署成功。',
        hint: '如果页面打开是空白，按 F12 打开开发者工具看 Console 报错——通常是 base 路径配置有误。确保 `vite.config.js` 中的 `base` 和 GitHub 仓库名一致。部署后可能需要等 1-2 分钟才能看到更新。',
      },
      {
        title: 'CI/CD — 用 GitHub Actions 自动部署',
        content: '现在每次修改代码后，都要手动运行 `npm run build && npm run deploy`。能不能让这个过程自动化？\n\n这就是 CI/CD（持续集成/持续部署）——每次 `git push`，GitHub 自动帮你构建和部署。\n\n创建一个 `.github/workflows/deploy.yml` 文件：\n\n```yaml\nname: Deploy to GitHub Pages\n\non:\n  push:\n    branches: [main]\n\njobs:\n  build-and-deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n\n      - name: Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: 18\n\n      - name: Install dependencies\n        run: npm ci\n\n      - name: Build\n        run: npm run build\n\n      - name: Deploy\n        uses: peaceiris/actions-gh-pages@v3\n        with:\n          github_token: ${{ secrets.GITHUB_TOKEN }}\n          publish_dir: ./dist\n```\n\n逐行解释：\n- `on.push.branches: [main]` — 当 main 分支有新 push 时触发\n- `runs-on: ubuntu-latest` — 在 GitHub 的 Ubuntu 虚拟机上运行\n- `actions/checkout@v4` — 把代码下载到虚拟机\n- `actions/setup-node@v4` — 安装 Node.js\n- `npm ci` — 安装依赖（比 `npm install` 更快，适合 CI 环境）\n- `npm run build` — 构建\n- `peaceiris/actions-gh-pages@v3` — 把 `dist/` 部署到 GitHub Pages\n\n创建这个文件后，提交并推送：\n```bash\ngit add .github/\ngit commit -m "添加 GitHub Actions 自动部署"\ngit push\n```\n\n然后打开 GitHub 仓库的 Settings → Pages，把 Source 改为 "GitHub Actions"。\n\n从此以后，你只需要 `git push`，GitHub 会自动：构建 → 部署 → 上线。这就是真正的工程化开发流程！',
        task: '创建 `.github/workflows/deploy.yml`，配置 GitHub Actions 自动部署。修改一点代码，push 到 GitHub，观察 Actions 自动运行的过程。',
        hint: '如果 Actions 运行失败，点击失败的 job 查看日志。常见错误：Node.js 版本不匹配（检查 `node-version`）、`npm ci` 失败（检查 `package-lock.json` 是否已提交）。别忘了在 Settings → Pages 中把 Source 切到 GitHub Actions。',
      },
      {
        title: '作品展示与总结 — 你的"毕业音乐会"',
        content: '恭喜你来到了最后一站！🎉\n\n回顾你走过的路程：\n\n| 阶段 | 你做了什么 | 掌握的能力 |\n|---|---|---|\n| 乐理篇 | 写了第一行 HTML、CSS、JS | 前端三件套的基础 |\n| 合奏篇 | 学会了数据驱动、事件委托、localStorage | JS 操控 DOM 的核心技能 |\n| 登台篇 | 安装了 Node.js、Vite、Vue，学会了单文件组件 | 现代前端工程化工具链 |\n| v1 手工版 | 用 HTML/CSS/JS 从零搭建了音乐收藏库 | 基础技术的综合实战 |\n| v2 重构版 | 用 Vue 组件化思维重构了同一个应用 | 组件化、Props/Emits、Computed |\n| v3 协作版 | 加了 Git、GitHub、CI/CD | 版本管理、协作部署、自动化 |\n\n**你现在的能力：**\n- ✅ 能独立搭建一个完整的前端项目\n- ✅ 能用 Vue 3 进行组件化开发\n- ✅ 能用 Git 管理代码版本\n- ✅ 能部署项目到线上，让全世界看到\n\n**接下来你可以：**\n- 给音乐收藏库加更多功能（播放音乐片段、数据可视化、用户登录）\n- 学习 React 或 Angular（换个"乐器"试试）\n- 学习后端开发（Node.js、数据库）——让收藏库变成一个真正的全栈应用\n- 参与开源项目——你现在的 Git/GitHub 知识完全够用了\n\n> 🎼 每个音乐家都是从第一个音符开始的。你从 `<h1>Hello World</h1>` 走到了自动化部署——这不是终点，而是序曲的结束、第一乐章的起点。\n>\n> 继续写下去。你的"代码谱"才刚刚翻开。',
        task: '回顾你的整个学习旅程。检查 GitHub 上的项目是否正常运行。如果可以，把链接分享给至少一个人——这是你的"毕业演出"。',
        hint: '如果想要一个更专业的项目 README，包含：项目名称和描述、功能列表、技术栈、如何运行（npm install && npm run dev）、在线演示链接。一个好的 README 是开源世界的"节目单"。',
      }
    ]
  }
]
