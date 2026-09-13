# Japanese LP Template Set

写真と編集できるHTML文字を分離した、日本語の業種別LPテンプレート集です。新作を順次追加し、共同で改善していきます。

**公開ソース / 月額2,500円の独自商用ライセンス。noteの申込受付は準備中です。** 閲覧・学習・評価・改善提案は無料。自社・顧客向けの商用サイト制作には有効な契約が必要です。コピー・納品物には著作権表示とライセンス本文を残してください。依存ライブラリや外部フォントは、それぞれのライセンスが適用されます。

## 収録テンプレート

現在 **2サイト** を収録。約10サイトを最初の目標とし、その後も追加予定です。

| テンプレート | 用途 | プレビュー | 編集・起動 |
| --- | --- | --- | --- |
| IKEOJI LIVE | ライブ・イベント | [デモ](https://ikeozi-live.vercel.app/) | [ガイド](templates/ikeoji-live/TEMPLATE-GUIDE.md) |
| relie DAIKANYAMA | ライフスタイル・カフェ | ローカルで確認 | [ガイド](templates/daikanyama/TEMPLATE-GUIDE.md) |

機械処理用の一覧と取り込み元は [templates.json](templates.json) に記録しています。未完成のサイトを収録済みとして数えません。

## 1サイトだけ使う

Node.js 22.12以上の22系を使用してください。リポジトリを取得し、使いたいサイトのフォルダへ移動します。

```sh
cd templates/ikeoji-live
npm ci
npm run dev
```

代官山LPは `templates/daikanyama` を選びます。どちらも `npm run build` で公開用ファイルを作れます。各サイトは独立しており、必要なフォルダだけコピーして利用できます。

## すべてのサイトを確認・配布する

ルートフォルダで実行します。

```sh
npm run validate
npm run setup
npm run build:all
npm run package:all
```

`releases/` に、収録サイトのソース・公開用ファイル・素材・ガイド・ライセンスをまとめたZIPとSHA-256チェックサムを作成します。ZIP作成には `zip` コマンドが必要です。

## 新作を追加する・共同編集する

- [追加手順](docs/ADDING-A-TEMPLATE.md)に従い、`templates/<名前>/` と一覧を追加します。
- 変更はブランチを作ってPull Requestで提案してください。[CONTRIBUTING.md](CONTRIBUTING.md)に手順があります。
- 不具合や新作の相談はIssueへ。共同制作者への直接書き込み権限は、管理者が個別に付与します。
- 元リポジトリからは初回にソースをコピーしています。元リポジトリの更新が自動で同期される仕組みではありません。

## Vercelへ公開する

### パッケージの案内LP

案内ページのソースは `site/` です。リポジトリのルートをVercelへ接続すると、ルートの `vercel.json` に従い `npm run build:site` で `site/dist` を公開します。テンプレートの収録件数・紹介カードは `templates.json` から生成します。ローカル確認は `npm run dev:site`。[案内LPの編集方法](site/README.md)も参照してください。

### 個別テンプレート

各テンプレートは案内LPとは別のVercelプロジェクトとして作成します。新しいサイトのRoot Directoryには `templates/<サイト名>` を指定してください。

このリポジトリをインポートし、公開したいテンプレートをRoot Directoryに設定します。

| Root Directory | Build Command | Output Directory |
| --- | --- | --- |
| `templates/ikeoji-live` | `npm run build` | `dist` |
| `templates/daikanyama` | `npm run build` | `dist/client` |

各テンプレートは別々のVercelプロジェクトへ公開できます。リポジトリ作成だけで既存の本番サイトやその自動デプロイ設定を変更することはありません。

## 商用ライセンスと申込

月額2,500円で商用サイトを制作できるシリーズです。申込・決済はnoteを予定し、URLは後日 [申込案内](docs/SUBSCRIPTION.md) に追加します。現在は受付準備中で、このリポジトリには決済・会員管理機能はありません。税の扱い等の販売条件は受付開始前に明示します。

契約中はサイト数の制限なく、自社サイト・顧客案件で改変・利用できます。契約中に制作済みのサイトは解約後も運用・保守できますが、新しい商用サイトの制作には再契約が必要です。素材単体・テンプレート集の再販売は許諾に含みません。公開GitHubからの取得と、商用利用権の取得は別です。MITではありません。詳しくは [LICENSE](LICENSE)、企画は [SERIES-PLAN](docs/SERIES-PLAN.md) を参照してください。

本文・店舗情報はサンプルです。フォーム・予約・決済はテンプレートごとに接続状態が異なります。各利用ガイドを確認してください。

[ライセンス](LICENSE) · [素材の条件](ASSETS.md) · [追加予定](ROADMAP.md)
