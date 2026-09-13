# MOVE FIT GYMの編集ガイド

- 文章・見出し・料金・リンク：`src/index.html`
- 色・余白・スマホ表示：`src/styles.css`
- 予約画面・プログラム詳細・メニュー：`src/app.js`
- 写真・アイコン：`public/assets/`

同じファイル名で画像を置き換えるか、HTMLの画像の場所を書き換えます。
料金・スタッフ名・体験談・住所・営業時間はすべて見本です。実際の内容に変更してください。

## 予約フォーム

ボタンから入力画面が開き、選んだプランやプログラムが引き継がれます。
入力内容の確認、修正、終了まで操作できます。送信・保存はしません。
外部の予約サービスにリンクするか、自分の予約受付機能を接続してください。
個人情報の説明や販売条件も実際の運用に合わせて準備してください。

## 公開

`npm run build` で作成される `dist/` を公開します。
VercelにこのパックのGitHubを接続する場合、Root Directoryは `templates/move-fit-gym`、
Build Commandは `npm run build`、Output Directoryは `dist` です。
元のSitesの設定や接続情報を使う必要はありません。

利用条件は[LICENSE](LICENSE)を確認してください。
