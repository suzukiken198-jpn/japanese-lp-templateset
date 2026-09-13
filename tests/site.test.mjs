import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

test('guide uses current catalog and honest commercial terms', async () => {
  const html = await readFile('site/dist/index.html', 'utf8');
  const entries = JSON.parse(await readFile('templates.json', 'utf8'));
  assert.equal((html.match(/class="catalog-card"/g) || []).length, entries.length);
  assert.ok(html.includes(`${entries.length}サイト収録中`));
  assert.ok(html.includes('2,500'));
  assert.ok(html.includes('noteでのお申し込みは、準備中'));
  assert.ok(html.includes('新しい商用サイト'));
  assert.ok(!html.includes('{{'));
  assert.ok(!html.includes('2,000'));
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#]*)"/g)) await access(`site/dist${match[1]}`);
  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(match[1]), `Broken anchor: ${match[1]}`);
});
