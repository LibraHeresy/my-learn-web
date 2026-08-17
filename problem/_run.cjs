// 执行入口：生成纯函数题（阶段1 JS基础、阶段2 JS进阶、阶段3 算法）
const fs = require('fs');
const path = require('path');
const { buildHtml } = require('./_generate.cjs');
const { stage1, stageAdvance, stage2 } = require('./_data.cjs');

function generate(list, stage, stageName, dirName, numOffset) {
  const dir = path.join(__dirname, dirName);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  list.forEach(q => {
    const meta = { stage, stageName, ...q, num: q.num + (numOffset || 0) };
    const html = buildHtml(meta);
    const num = String(meta.num).padStart(2, '0');
    const safeTitle = q.title.replace(/[\\/:*?"<>|]/g, '-');
    const filename = `${num}-${safeTitle}.html`;
    fs.writeFileSync(path.join(dir, filename), html, 'utf8');
    console.log('生成:', filename);
  });
  console.log(`${stageName} 完成，共 ${list.length} 题\n`);
}

generate(stage1, 1, 'JS 基本功', 'stage1-js基础', 0);
generate(stageAdvance, 2, 'JS 进阶', 'stage2-js进阶', 0);
generate(stage2, 3, '数据结构与算法', 'stage3-算法', 10);
