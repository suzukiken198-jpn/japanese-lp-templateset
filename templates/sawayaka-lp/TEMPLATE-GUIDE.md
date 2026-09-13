# SAWAYAKA LPの編集方法

- 文章・写真の場所・料金・FAQ：`src/App.jsx`
- 色・余白・スマホレイアウト：`src/landing.css`
- 写真素材：`public/assets/`
- サイト名・説明・フォント：`index.html`

## 公開前に変更すること

BRANDを自分のサービス名に変更し、料金、スタッフ情報、体験談、満足度、住所、地図、営業時間、SNSを実際の情報に差し替えます。
「92%」などの実績表示はサンプルです。根拠のある数値に変更するか削除してください。

無料相談ボタンはデモ画面を開きます。入力・確認はできますが、送信・保存はしません。
外部の予約サービスへリンクするか、受付機能を別途接続してください。
会社概要、個人情報の取り扱い、販売条件なども実際のサービスに合わせて設定します。

## 公開先の設定

Vercelで本パックのGitHubリポジトリを選び、Root Directoryを `templates/sawayaka-lp`、
Build Commandを `npm run build`、Output Directoryを `dist/client` に設定します。
動作確認は `npm run test:sites`、公開ファイルの生成は `npm run build` です。
Sites用の補助ファイルも保持していますが、Vercel公開にSitesアカウントは不要です。
