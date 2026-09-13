# relie DAIKANYAMA

提供されたLP画像をもとにした、日本語のレスポンシブWebサイトです。

公開ソース・独自商用ライセンスです。月額2,500円の有効契約中に制作した商用サイトは、解約後も運用・保守できます。新規商用制作には再契約が必要です。noteの申込受付は準備中です。[LICENSE](LICENSE) と [利用ガイド](TEMPLATE-GUIDE.md) を確認してください。

## 内容

- PCでは参考画像の構図に合わせた4セクション、スマホでは縦並びに対応。
- 見出し、本文、ナビゲーションはHTML要素として編集可能。
- 商品・カフェ・読みものの詳細ダイアログ、モバイルメニュー、来店案内。
- キーボード操作、フォーカス表示、動きを減らす設定に対応。
- 住所・営業時間は未提供のため「ご案内準備中」。公開後は実際の店舗情報へ差し替えてください。

## 編集と実行

本文と案内: `src/App.jsx`。見た目: `src/styles.css`。写真素材: `public/assets/relie-background.png`。

```sh
npm ci
npm run dev
npm run build
```

Vercel用の出力先は `dist/client`。`vercel.json` に設定済みです。

## 素材

ユーザー提供画像をもとに、内蔵画像生成ツールで重なっているUI文字を除去した背景を制作。写真上の自然な看板・ボトル・本の文字は保持しています。背景から各セクションの該当領域をCSSで表示しています。

画像編集指示: 元の1024×1536の構図、写真、被写体、光、色、セクションの位置を維持し、ナビ・見出し・本文・アイコン・ボタンを除去して背景を補完する。画像元の生成文字の誤りは、HTML化にあたり自然な日本語・地名へ修正。

Fonts: [Noto Serif JP](https://fonts.google.com/noto/specimen/Noto+Serif+JP), [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)。外部フォントが読み込めない場合は端末の明朝体へフォールバック。

Icons: [Phosphor Icons](https://phosphoricons.com/), thin weight。

使用スキル: Product Design image-to-code / design-qa、imagegen、Vercel deployments-cicd / vercel-cli。
