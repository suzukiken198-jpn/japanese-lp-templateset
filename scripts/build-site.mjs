import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entries = JSON.parse(await readFile(resolve(root, 'templates.json'), 'utf8'));
const out = resolve(root, 'site/dist');
await rm(out, { recursive: true, force: true });
await mkdir(resolve(out, 'assets'), { recursive: true });
const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const previewDefaults = { 'ikeoji-live': 'public/assets/separated/hero.jpg', daikanyama: 'public/assets/relie-background.png' };
const repo = 'https://github.com/suzukiken198-jpn/japanese-lp-templateset';
const cards = [];
for (const [i, entry] of entries.entries()) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id) || entry.path !== `templates/${entry.id}`) throw new Error('Invalid template entry');
  const guide = `${repo}/blob/main/${entry.path}/TEMPLATE-GUIDE.md`;
  const source = `${repo}/tree/main/${entry.path}`;
  const input = entry.previewImage || previewDefaults[entry.id];
  let image = '';
  if (input) {
    if (!/^public\/assets\/[a-zA-Z0-9_./-]+$/.test(input) || input.includes('..')) throw new Error('Invalid preview path');
    image = `/assets/${entry.id}${extname(input)}`;
    await cp(resolve(root, entry.path, input), resolve(out, image.slice(1)));
  }
  const demo = entry.demoUrl && /^https:\/\//.test(entry.demoUrl) ? entry.demoUrl : null;
  cards.push(`<article class="catalog-card"><a class="catalog-cover ${entry.id === 'daikanyama' ? 'collage' : ''}" href="${esc(demo || source)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(entry.name)} ${demo ? '公開デモを見る' : 'ソースを見る'}">${image ? `<img src="${image}" alt="${esc(entry.name)}のデザインイメージ" loading="lazy">` : ''}<span class="cover-label">${esc(entry.category)}</span><span class="cover-name">${esc(entry.name)}</span></a><div class="catalog-info"><div class="catalog-title"><h3>${esc(entry.name)}</h3><span class="catalog-number">No. ${String(i + 1).padStart(2, '0')}</span></div><p>${esc(entry.description)}</p><div class="card-links">${demo ? `<a href="${esc(demo)}" target="_blank" rel="noopener noreferrer">公開デモを見る ↗</a>` : ''}<a href="${source}" target="_blank" rel="noopener noreferrer">ソースを見る ↗</a><a href="${guide}" target="_blank" rel="noopener noreferrer">編集ガイド ↗</a></div></div></article>`);
}
const template = await readFile(resolve(root, 'site/index.html'), 'utf8');
const html = template.replaceAll('{{count}}', String(entries.length)).replace('{{catalog}}', cards.join('\n')).replace('{{updates}}', entries.map((entry, i) => `<div class="tree-line"><span>${String(i + 1).padStart(2, '0')}</span> ${esc(entry.category)}</div>`).join(''));
if (/\{\{\w+\}\}/.test(html)) throw new Error('Unresolved site placeholder');
await writeFile(resolve(out, 'index.html'), html);
for (const file of ['styles.css', 'script.js', 'favicon.svg']) await cp(resolve(root, 'site', file), resolve(out, file));
await cp(resolve(root, 'LICENSE'), resolve(out, 'LICENSE'));
console.log(`Built guide LP with ${entries.length} template cards: ${out}`);
