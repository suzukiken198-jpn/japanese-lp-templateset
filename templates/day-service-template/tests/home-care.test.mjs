import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";
const app = await readFile("src/App.jsx", "utf8");
const dialogs = await readFile("src/Dialogs.jsx", "utf8");
const content = await readFile("src/content.js", "utf8");
const css = await readFile("src/home-care.css", "utf8");
test("all fifteen individual assets and generation records exist", async () => {
  const names = [
    "logo",
    "hero",
    "day-service-hero",
    "body-care",
    "housekeeping",
    "outing",
    "watching",
    "family-support",
    "care-story",
    "living-room",
    "voice-woman",
    "voice-man",
    "voice-family",
    "staff",
    "map",
    "hands",
  ];
  for (const name of names) {
    const image = await readFile(`public/assets/${name}.png`);
    assert.equal(image.subarray(1, 4).toString(), "PNG", name);
    await access(`asset-prompts/${name}.md`);
  }
  assert.equal(
    (await readdir("public/assets")).filter((x) => x.endsWith(".png")).length,
    16,
  );
});
test("single editable heading and all navigation destinations", () => {
  assert.equal((app.match(/<h1 /g) || []).length, 1);
  for (const id of [
    "home",
    "main",
    "services",
    "features",
    "flow",
    "price",
    "staff",
    "faq",
    "access",
  ])
    assert.ok(app.includes(`id="${id}"`), id);
  assert.ok(app.includes("ここに来ると、"));
});
test("consultation has validation, review, editing and honest finish", () => {
  assert.ok(dialogs.includes('type="email"'));
  assert.match(dialogs, /required\s+maxLength=\{80\}/);
  assert.match(dialogs, /required\s+maxLength=\{160\}/);
  assert.match(dialogs, /onChange=\{update\}\s+required/);
  for (const text of [
    "入力内容を確認する",
    "入力を修正する",
    "デモの確認を終える",
    "お問い合わせは送信されていません",
  ])
    assert.ok(dialogs.includes(text));
});
test("no network submission, persistence or real phone call", () => {
  const code = app + dialogs + content;
  for (const pattern of [
    /fetch\s*\(/,
    /XMLHttpRequest/,
    /localStorage/,
    /sessionStorage/,
    /indexedDB/,
    /mailto:/,
    /tel:/,
  ])
    assert.ok(!pattern.test(code));
  assert.ok(dialogs.includes("送信・保存・予約確定は行いません"));
});
test("sample identity and information are explicit", () => {
  for (const text of [
    "架空のデイサービス事業所",
    "利用者の声・実績・料金・住所・電話番号は表示例",
    "地図は架空の表示例",
    "実際のイベントは開催されません",
  ])
    assert.ok(app.includes(text));
  assert.ok(content.includes("季節のイベント"));
});
test("accessible dialogs, menu, carousel and responsive behavior", () => {
  assert.ok(dialogs.includes(".showModal()"));
  assert.ok(dialogs.includes("onCancel={onClose}"));
  assert.ok(dialogs.includes("previous?.focus?.()"));
  assert.ok(app.includes("aria-expanded={menuOpen}"));
  assert.ok(app.includes('role="status"'));
  assert.ok(app.includes("aria-expanded={moreFaq}"));
  assert.ok(css.includes("prefers-reduced-motion"));
  assert.ok(css.includes(":focus-visible"));
  assert.match(css, /@media\s*\(max-width:\s*680px\)/);
  assert.ok(!app.includes("<svg"));
  assert.ok(!css.includes("linear-gradient"));
});
test("production output and custom license are configured", async () => {
  const vercel = JSON.parse(await readFile("vercel.json", "utf8"));
  assert.equal(vercel.outputDirectory, "dist/client");
  const pkg = JSON.parse(await readFile("package.json", "utf8"));
  assert.equal(pkg.license, "SEE LICENSE IN LICENSE");
  assert.ok(pkg.scripts.build.includes("write-license-notices"));
  await access("LICENSE");
});
