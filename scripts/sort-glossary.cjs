const fs = require('fs');

async function main() {
  // Import the current glossary
  const { glossary } = await import('../src/configs/glossary.ts');

  // Sort by key length desc
  glossary.sort((a, b) => b[0].length - a[0].length || a[0].localeCompare(b[0]));

  // Remove duplicates (keep first occurrence)
  const seen = new Set();
  const deduped = [];
  for (const entry of glossary) {
    if (!seen.has(entry[0])) {
      seen.add(entry[0]);
      deduped.push(entry);
    }
  }
  if (deduped.length < glossary.length) {
    console.log('Removed ' + (glossary.length - deduped.length) + ' duplicate keys');
    glossary.length = 0;
    glossary.push(...deduped);
  }

  // Check prefix conflicts
  let bugs = 0;
  for (let i = 0; i < glossary.length; i++) {
    for (let j = i + 1; j < glossary.length; j++) {
      if (glossary[j][0].startsWith(glossary[i][0]) && glossary[j][0].length > glossary[i][0].length) {
        console.error('PREFIX:', glossary[i][0], 'before', glossary[j][0]);
        bugs++;
      }
    }
  }
  console.log('Sorted', glossary.length, 'entries. Prefix bugs:', bugs);
  console.log('Longest:', glossary[0][0], '(' + glossary[0][0].length + ')');
  console.log('Shortest:', glossary[glossary.length - 1][0], '(' + glossary[glossary.length - 1][0].length + ')');

  // Escape a string for single-quoted JS/TS
  function esc(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n');
  }

  // Read original file header
  const src = fs.readFileSync('src/configs/glossary.ts', 'utf-8');
  const marker = 'export const glossary: [string, TermDef][] = [';
  const header = src.substring(0, src.indexOf(marker) + marker.length);

  // Build sorted entries
  const lines = [header];
  for (let i = 0; i < glossary.length; i++) {
    const [key, def] = glossary[i];
    const comma = i < glossary.length - 1 ? ',' : '';
    lines.push("  ['" + esc(key) + "', {");
    lines.push("    explanation: '" + esc(def.explanation) + "',");
    if (def.analogy) {
      lines.push("    analogy: '" + esc(def.analogy) + "',");
    }
    // Remove trailing comma from last property
    const lastLine = lines[lines.length - 1];
    lines[lines.length - 1] = lastLine.replace(/,$/, '');
    lines.push("  }]" + comma);
  }
  lines.push(']\n');

  fs.writeFileSync('src/configs/glossary.ts', lines.join('\n'), 'utf-8');
  console.log('Written successfully.');
}

main().catch(e => console.error(e));
