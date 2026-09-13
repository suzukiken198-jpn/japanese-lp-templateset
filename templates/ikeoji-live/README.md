# IKEOJI LIVE

業種別LPテンプレートシリーズの第1弾。公開ソース・独自商用ライセンスです。月額2,500円の有効契約中は、自社・顧客サイトを制作できます。noteでの申込受付は準備中です。

シリーズ共通の追加・共同編集先: [japanese-lp-templateset](https://github.com/suzukiken198-jpn/japanese-lp-templateset)。このリポジトリはライブLP単体版です。

初めて利用する方は [TEMPLATE-GUIDE.md](TEMPLATE-GUIDE.md)、素材の条件は [ASSETS.md](ASSETS.md)、ライセンス原文は [LICENSE](LICENSE) を参照してください。

下北沢の大人向けライブイベントのランディングページ。写真と文字を分離し、見出し・本文・比較表・FAQをHTMLとして表示します。

公開サイト: https://ikeozi-live.vercel.app/

## ローカルで確認

Node.js 22.12以上（22系）を使用します。

```sh
npm ci
npm run dev
```

## 公開用ファイルを作る

```sh
npm run build
npm run preview
```

`dist/` にHTML・CSS・JavaScript・画像を出力します。本文は事前にHTMLへ書き出すため、JavaScriptの読み込み前から表示されます。

## 編集する場所

- `src/Landing.jsx`: 本文、予約リンク、FAQ、フォーム
- `src/landing.css`: PC・スマホの配置と配色
- `public/assets/separated/`: 文字を除去した背景写真（JPEG）
- `public/assets/`: 元ページの画像素材
- `scripts/prerender.mjs`: 本文をHTMLへ書き出す処理

## 現在の動作

予約ボタンはお問い合わせ欄へ移動し、FAQは開閉できます。フォームは入力チェック・確認・修正まで実装しています。実際のメール送信、予約確定、決済は未接続です。

写真の文字消し部分はAIで補完しています。元画像とは細部に差異があります。

## Vercel

Vercelのプロジェクト名と公開URLは `ikeozi-live`、このGitHubリポジトリ名は `ikeoji-live` です。
現在の公開はVercel CLIから行っています。GitHubへのアップロードだけでは自動デプロイ連携は設定されません。

既存プロジェクトをGitHubに接続する場合のビルドコマンドは `npm run build`、出力ディレクトリは `dist` です。

詳細は [IMPLEMENTATION.md](IMPLEMENTATION.md)、確認記録は [verification.md](verification.md) を参照してください。

## 配布用ZIP

```sh
npm run package:template
```

`releases/` にソース・写真・公開用ファイル・ガイド・ライセンスを含むZIPを生成します。ZIP作成には `zip` コマンドが必要です。契約中に制作済みのサイトは解約後も運用・保守できます。新しい商用サイトの制作には再契約が必要です。詳しくは [LICENSE](LICENSE) を確認してください。
