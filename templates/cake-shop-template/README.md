# Pâtisserie Lumière — ケーキ屋LP

ユーザー提供の「ケーキ屋.png」をもとにした、白・クリーム・ブラウンのケーキ店テンプレートです。写真と文字を分離し、文章・価格・ボタンを編集できるReactサイトにしました。

## 確認する

```sh
npm ci
npm run dev -- --host :: --port 4183
```

ブラウザで http://localhost:4183/ を開きます。`index.html` を直接開かないでください。

## できること

- 商品一覧のカテゴリー切り替え・商品名検索
- 商品の詳細表示、数量・ホールケーキのサイズ選択
- 受け取り希望日とデモ用の名前・メールアドレスの入力
- 入力内容の確認・修正・デモ完了
- FAQの開閉、店舗・お知らせの詳細表示、スマートフォン用メニュー

**注文は届きません。予約・在庫確保・決済・メール送信・入力内容の保存は行いません。** 実際の個人情報を入力せず、デモ用の値で確認してください。

## ファイル

- `src/App.jsx`：ページの文章と各セクション
- `src/content.js`：商品、価格、説明、FAQ、お知らせ
- `src/Dialogs.jsx`：商品選択・注文内容確認のデモ
- `src/cake.css`：色・文字・余白・スマートフォン表示
- `public/assets/`：個別の写真・ロゴ（16点）
- `asset-prompts/`：画像生成のプロンプトと生成元パス
- `TEMPLATE-GUIDE.md`：編集・公開前の確認方法
- `ASSETS.md`：元画像との対応表

## 公開用ファイルを作る

```sh
npm run build
npm test
```

公開ファイルは `dist/client/` に作られます。`LICENSE` と `THIRD-PARTY-NOTICES.txt` を含めて配布してください。Vercel用の設定は `vercel.json` にあります。

公開デモ: https://cake-shop-template-two.vercel.app/

Vercelはこのリポジトリの `templates/cake-shop-template` に接続されています。

## 利用条件

本体・生成素材は同梱の `LICENSE` を参照してください。MITライセンスではありません。外部ライブラリとフォントには、それぞれの利用条件が適用されます。

表示される店舗・商品・価格・原材料・所在地・実績は架空のサンプルです。写真はbuilt-in Image Genで生成したイメージで、実在する商品の写真ではありません。
