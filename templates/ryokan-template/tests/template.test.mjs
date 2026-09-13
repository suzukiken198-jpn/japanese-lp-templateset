import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat,readdir} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
test('all sixteen image assets are present and substantial',async()=>{
  const assets=['hero','logo','paper','rooms','cuisine','onsen','lounge','spring','standard','autumn','shrine','waterfall','town','lake','map','footer'];
  for(const name of assets)assert.ok((await stat(new URL(`public/assets/${name}.png`,root))).size>1000,name);
  assert.equal((await readdir(new URL('public/assets/',root))).filter(n=>n.endsWith('.png')).length,16);
});
test('booking is explicitly a local-only demo with required fields',async()=>{
  const app=await readFile(new URL('src/App.jsx',root),'utf8');
  assert.match(app,/予約はまだ送信されていません/);
  assert.match(app,/入力内容を修正する/);
  assert.match(app,/type="email"/);
  assert.match(app,/type="date"/);
  assert.match(app,/min=\{booking.checkin\?nextDay/);
  assert.doesNotMatch(app,/\bfetch\s*\(|localStorage|sessionStorage|XMLHttpRequest|sendBeacon/);
});
test('published build contains correct language and license notices',async()=>{
  const html=await readFile(new URL('dist/client/index.html',root),'utf8');
  assert.match(html,/lang="ja"/);
  for(const file of ['LICENSE','THIRD-PARTY-NOTICES.txt'])assert.ok((await stat(new URL(`dist/client/${file}`,root))).size>100);
});
