import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
test('program cards top-align photos independently of description length', async()=>{
 const css=await readFile('dist/styles.css','utf8');
 assert.match(css,/\.photo-card\{display:flex;flex-direction:column;justify-content:flex-start\}/);
 assert.match(css,/\.photo-card img\{flex-shrink:0\}/);
});
test('static template has working local resources and a demo-only form', async()=>{
 const html=await readFile('dist/index.html','utf8');
 const js=await readFile('dist/app.js','utf8');
 for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
   if(!/^(?:https?:|data:)/.test(match[1])) await access('dist/'+match[1]);
 }
 const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]));
 for(const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(match[1]));
 assert.ok(html.includes('入力内容は送信・保存されません'));
 assert.ok(html.includes('店舗・人物・体験談・料金はサンプル'));
 assert.ok(!/fetch\s*\(|localStorage|sessionStorage|XMLHttpRequest/.test(js));
 assert.ok(!html.includes('</option>ライト'));
 assert.ok(!html.includes('</option>筋力'));
 assert.equal((await readdir('dist/assets')).length,26);
 await access('dist/LICENSE');
 await access('dist/THIRD-PARTY-NOTICES.txt');
});
