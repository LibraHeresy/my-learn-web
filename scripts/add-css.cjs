const fs = require('fs');

async function main() {
  const { glossary } = await import('../src/configs/glossary.ts');
  const add = [
    ['animation-duration', `CSS 动画属性——设置动画完成一个周期所需的时间。如 1s 表示1秒，0.5s 表示0.5秒。值越小动画越快。`],
    ['translateY', `CSS transform 函数——沿 Y 轴（垂直方向）移动元素。如 translateY(30px) 向下30像素，负数向上。英文原意是「沿Y轴平移」。`],
  ];
  const existing = new Set(glossary.map(e => e[0]));
  let added = 0;
  for (const [k, exp] of add) { if (!existing.has(k)) { glossary.push([k, { explanation: exp }]); existing.add(k); added++; } }
  console.log('Added:', added);
  glossary.sort((a, b) => b[0].length - a[0].length || a[0].localeCompare(b[0]));

  function esc(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n'); }
  const src = fs.readFileSync('src/configs/glossary.ts', 'utf-8');
  const marker = 'export const glossary: [string, TermDef][] = [';
  const header = src.substring(0, src.indexOf(marker) + marker.length);
  const lines = [header];
  for (let i = 0; i < glossary.length; i++) {
    const [key, def] = glossary[i];
    const comma = i < glossary.length - 1 ? ',' : '';
    lines.push("  ['" + esc(key) + "', {");
    lines.push("    explanation: '" + esc(def.explanation) + "',");
    if (def.analogy) lines.push("    analogy: '" + esc(def.analogy) + "'");
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
    lines.push("  }]" + comma);
  }
  lines.push(']\n');
  fs.writeFileSync('src/configs/glossary.ts', lines.join('\n'), 'utf-8');
  console.log('Total:', glossary.length);
}

main().catch(e => console.error(e));
