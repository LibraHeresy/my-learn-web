const fs = require('fs');

async function main() {
  const { glossary } = await import('../src/configs/glossary.ts');
  const filtered = glossary.filter(e => e[0] !== 'http' && e[0] !== 'https');
  console.log('Removed:', glossary.length - filtered.length);
  filtered.sort((a, b) => b[0].length - a[0].length || a[0].localeCompare(b[0]));

  function esc(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n'); }
  const src = fs.readFileSync('src/configs/glossary.ts', 'utf-8');
  const marker = 'export const glossary: [string, TermDef][] = [';
  const header = src.substring(0, src.indexOf(marker) + marker.length);
  const lines = [header];
  for (let i = 0; i < filtered.length; i++) {
    const [key, def] = filtered[i];
    const comma = i < filtered.length - 1 ? ',' : '';
    lines.push("  ['" + esc(key) + "', {");
    lines.push("    explanation: '" + esc(def.explanation) + "',");
    if (def.analogy) lines.push("    analogy: '" + esc(def.analogy) + "'");
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
    lines.push("  }]" + comma);
  }
  lines.push(']\n');
  fs.writeFileSync('src/configs/glossary.ts', lines.join('\n'), 'utf-8');
  console.log('Total:', filtered.length, '| Longest:', filtered[0][0]);
}

main().catch(e => console.error(e));
