const fs = require('fs'), yaml = require('js-yaml'), glob = require('glob');

const glossary = yaml.load(fs.readFileSync('src/content/glossary/terms.yaml', 'utf8'));
const keys = glossary.map(g => g.key).filter(k => k.length >= 2).sort((a, b) => b.length - a.length);
const files = glob.sync('src/content/lessons/{fundamentals/js-basics,framework/js-advanced,framework/async-data}/**/lesson.md');
const skip = new Set(['方法', 'API', 'DOM', 'CRUD', 'JSON', '同步/异步']);
let total = 0;

files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  let pr = [];

  // Protect inline code
  let re1 = /`[^`\n]+`/g, m;
  while ((m = re1.exec(c)) !== null) pr.push({ s: m.index, e: m.index + m[0].length });
  // Protect fenced code blocks
  let re2 = /```[\s\S]*?```/g;
  while ((m = re2.exec(c)) !== null) pr.push({ s: m.index, e: m.index + m[0].length });
  // Protect existing term refs
  let re3 = /\{\{term:[^}]+\}\}/g;
  while ((m = re3.exec(c)) !== null) pr.push({ s: m.index, e: m.index + m[0].length });

  pr.sort((a, b) => a.s - b.s);
  function ip(p) { return pr.some(r => p >= r.s && p < r.e); }

  let used = new Set();
  keys.forEach(key => {
    if (skip.has(key) || key.length < 2) return;
    // Escape regex special chars properly
    let esc = '';
    for (let i = 0; i < key.length; i++) {
      let ch = key[i];
      if ('.*+?^${}()|[]\\'.includes(ch)) esc += '\\' + ch;
      else esc += ch;
    }
    let rg = new RegExp(esc, 'g'), m2;
    while ((m2 = rg.exec(c)) !== null) {
      if (!ip(m2.index)) {
        let before = c.substring(Math.max(0, m2.index - 7), m2.index);
        if (before.includes('{{term:')) continue;
        if (used.has(key)) continue;
        let rep = '{{term:' + key + '}}';
        c = c.substring(0, m2.index) + rep + c.substring(m2.index + key.length);
        let shift = rep.length - key.length;
        pr.forEach(r => { if (r.s > m2.index) { r.s += shift; r.e += shift; } });
        used.add(key); total++; break;
      }
    }
  });

  fs.writeFileSync(file, c, 'utf8');
});

console.log('Marked:', total, 'terms across', files.length, 'files');
