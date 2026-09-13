import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { products, categories, faqs, nav, news, yen } from "../src/content.js";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("catalog has eight unique products with valid positive prices and categories", () => {
  assert.equal(products.length, 8);
  assert.equal(new Set(products.map((p) => p.id)).size, products.length);
  for (const p of products) {
    assert.ok(Number.isInteger(p.price) && p.price > 0);
    assert.ok(categories.some((c) => c.name === p.category));
    assert.ok(p.name && p.description && p.detail && p.allergens);
  }
  assert.deepEqual(
    products.slice(0, 4).map((p) => p.price),
    [520, 580, 560, 540],
  );
  assert.equal(yen(4500 * 2), "¥9,000");
});

test("all sixteen image assets and their prompt records are included", () => {
  const names = [
    "hero",
    "chef",
    "strawberry",
    "montblanc",
    "fruit-tart",
    "chocolate",
    "birthday",
    "fresh-cake",
    "baked",
    "gift-set",
    "macarons",
    "spring",
    "shop",
    "gift-banner",
    "closing",
    "logo",
  ];
  for (const name of names) {
    const path = new URL(`public/assets/${name}.png`, root);
    assert.ok(existsSync(path), `Missing image: ${name}`);
    const bytes = readFileSync(path);
    assert.equal(bytes.subarray(1, 4).toString(), "PNG");
    assert.ok(bytes.length > 1000, `Empty image: ${name}`);
    assert.ok(
      existsSync(new URL(`asset-prompts/${name}.md`, root)),
      `Missing prompt: ${name}`,
    );
  }
});

test("page navigation points to real sections and content remains HTML", () => {
  const app = read("src/App.jsx");
  for (const [, id] of nav)
    assert.ok(app.includes(`id="${id}"`), `Missing section: ${id}`);
  for (const copy of [
    "甘い幸せで、",
    "日常をちょっと特別に。",
    "私たちの想い",
    "季節のおすすめ",
    "商品ラインナップ",
  ])
    assert.ok(app.includes(copy));
  assert.equal(faqs.length, 6);
  assert.equal(news.length, 5);
});

test("demo collects no persisted data and performs no network submission", () => {
  const source = read("src/App.jsx") + read("src/Dialogs.jsx");
  assert.doesNotMatch(
    source,
    /\bfetch\s*\(|XMLHttpRequest|localStorage|sessionStorage|sendBeacon|document\.cookie/,
  );
  assert.match(source, /注文は送信されていません/);
  assert.match(source, /送信・保存・注文確定・決済は行いません/);
  assert.match(source, /実際の個人情報は入力しないでください/);
});

test("order flow keeps required validation, bounded quantity and edit path", () => {
  const source = read("src/Dialogs.jsx");
  assert.match(source, /quantity\s*<=\s*1/);
  assert.match(source, /quantity\s*>=\s*10/);
  assert.match(source, /min=\{minDate\}/);
  assert.match(source, /type="email"/);
  assert.match(source, /入力を修正する/);
  assert.match(source, /onCancel=\{onClose\}/);
  assert.match(source, /showModal\(\)/);
});

test("custom license and deployment output are preserved", () => {
  assert.match(read("LICENSE"), /MITライセンスではありません/);
  assert.match(read("LICENSE"), /月額2,500円/);
  assert.equal(JSON.parse(read("vercel.json")).outputDirectory, "dist/client");
  assert.ok(existsSync(new URL("dist/client/LICENSE", root)));
  assert.ok(existsSync(new URL("dist/client/THIRD-PARTY-NOTICES.txt", root)));
});
