import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';

const app=readFileSync(new URL('../src/App.jsx',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/clinic.css',import.meta.url),'utf8');
const root=new URL('../',import.meta.url);
const assets=['logo','hero','facade','internal','lifestyle','digestive','respiratory','vaccine','doctor','reception','waiting','examination','treatment','equipment','map','family'];

test('16 distinct local PNG assets and their generation prompts exist',()=>{
  assert.equal(new Set(assets).size,16);
  for(const name of assets){
    const data=readFileSync(new URL(`public/assets/${name}.png`,root));
    assert.equal(data.subarray(0,8).toString('hex'),'89504e470d0a1a0a',name);
    assert.ok(existsSync(new URL(`asset-prompts/${name}.md`,root)),name);
  }
});
test('each navigation section exists and there is one real HTML main heading',()=>{
  for(const id of ['home','about','medical','doctor','facility','schedule','access','faq']) assert.ok(app.includes(`id="${id}"`),id);
  assert.equal((app.match(/<h1\b/g)||[]).length,1);
});
test('booking includes native validation, review, and explicit demo warning',()=>{
  for(const value of ['type="date"','min={localDate()}','type="email"','required','type="checkbox"','setReview(true)','入力内容を修正する','予約は確定していません。']) assert.ok(app.includes(value),value);
  assert.match(app,/送信・保存・診療予約・空き枠の確保は行いません/);
});
test('the UI has no network submission or persistent storage',()=>{
  for(const name of readdirSync(new URL('src/',root)).filter(n=>/\.(js|jsx)$/.test(n))){
    const source=readFileSync(new URL(`src/${name}`,root),'utf8');
    assert.doesNotMatch(source,/\b(fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|indexedDB)\b/);
  }
});
test('dialogs, keyboard focus, motion settings and mobile menu are implemented',()=>{
  for(const value of ['<dialog','aria-labelledby="dialog-title"','onCancel={close}','trigger.current?.focus','aria-expanded={menu}','<details']) assert.ok(app.includes(value),value);
  assert.match(css,/focus-visible/);assert.match(css,/prefers-reduced-motion/);assert.match(css,/@media\(max-width:600px\)/);
});
test('fictional clinic, map and physician are identified as samples',()=>{
  for(const value of ['架空のクリニックのLPテンプレート','医師名・経歴は紹介用のサンプル','住所・地図・駅からの所要時間はサンプル','実際の症状や医療情報は入力しないでください']) assert.ok(app.includes(value),value);
});
test('production output and license notices are included',()=>{
  for(const path of ['dist/client/index.html','dist/client/LICENSE','dist/client/THIRD-PARTY-NOTICES.txt','dist/server/index.js','dist/.openai/hosting.json']) assert.ok(existsSync(new URL(path,root)),path);
  assert.match(readFileSync(new URL('LICENSE',root),'utf8'),/2,500|2500|２５００/);
});
