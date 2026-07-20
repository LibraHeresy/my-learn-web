import fs from 'fs';
import { globSync } from 'glob';

const keys = [
  '作用域', '块级作用域', '全局作用域', '闭包', '回调函数', '回调地狱', '高阶函数',
  'Promise', 'async/await', 'Event Loop', '调用栈', '任务队列', '宏任务', '微任务',
  '同步代码', '异步代码', 'Web API', 'this 关键字', '严格模式', '箭头函数',
  '解构赋值', '展开运算符', '可选链', '空值合并', 'CORS', 'REST API', 'CRUD',
  'localStorage', 'JSON.stringify', 'JSON.parse', '防抖', '节流',
  'AbortController', 'try/catch', 'truthy', 'falsy', '提升',
].sort((a, b) => b.length - a.length);

const files = globSync('src/content/lessons/{fundamentals/js-basics,framework/js-advanced,framework/async-data}/**/lesson.md');
const skip = new Set(['DOM', '方法', 'API', 'CRUD', 'JSON']);

let total = 0;
files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  let pr = [];
  let re, m;
  re = /`[^`\n]+`/g; while ((m = re.exec(c)) !== null) pr.push({ s: m.index, e: m.index + m[0].length });
  re = /```[\s\S]*?```/g; while ((m = re.exec(c)) !== null) pr.push({ s: m.index, e: m.index + m[0].length });
  re = /\{\{term:[^}]+\}\}/g; while ((m = re.exec(c)) !== null) pr.push({ s: m.index, e: m.index + m[0].length });
  re = /:::[\s\S]*?:::/g; while ((m = re.exec(c)) !== null) pr.push({ s: m.index, e: m.index + m[0].length });
  pr.sort((a, b) => a.s - b.s);
  const ip = (p) => pr.some(r => p >= r.s && p < r.e);
  let used = new Set();
  keys.forEach(key => {
    if (skip.has(key) || key.length < 2) return;
    let esc = key.replace(/[.*+?^${}()|[\]\]/g, '\$&');
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
