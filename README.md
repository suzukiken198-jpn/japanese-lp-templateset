# Japanese LP Template Set

写真と編集できるHTML文字を分離した、日本語の業種別LPテンプレート集です。制作者が新作を順次追加します。利用者の方は、好きなテンプレートを選んでお使いください。

**公開ソース / 月額2,500円の独自商用ライセンス。noteの申込受付は準備中です。** 閲覧・学習・評価は無料。自社・顧客向けの商用サイト制作には有効な契約が必要です。コピー・納品物には著作権表示とライセンス本文を残してください。依存ライブラリや外部フォントは、それぞれのライセンスが適用されます。

テンプレートの制作・追加・更新は **制作者 suzukiken198-jpn のみ**が行います。利用者との共同制作や、新作の持ち寄りは行いません。契約に応じて、自分用・顧客用サイトの文章や写真を編集できます。

## 収録テンプレート

現在 **7サイト** を収録。制作者が新作を順次追加します。

| テンプレート | 用途 | プレビュー | 編集・起動 |
| --- | --- | --- | --- |
| relie DAIKANYAMA | ライフスタイル・カフェ | [デモ](https://daikanyama.vercel.app/) | [ガイド](templates/daikanyama/TEMPLATE-GUIDE.md) |
| SAWAYAKA LP | 相談サービス・コーチング | [デモ](https://sawayaka-lp.vercel.app/) | [ガイド](templates/sawayaka-lp/TEMPLATE-GUIDE.md) |
| 月の湯 RYOKAN | 旅館・宿泊施設 | [デモ](https://ryokan-template.vercel.app/) | [ガイド](templates/ryokan-template/TEMPLATE-GUIDE.md) |
| そら内科クリニック | クリニック・医療 | [デモ](https://clinic-template-hazel.vercel.app/) | [ガイド](templates/clinic-template/TEMPLATE-GUIDE.md) |
| あすの訪問介護 | 訪問介護・福祉 | [デモ](https://home-care-template-psi.vercel.app/) | [ガイド](templates/home-care-template/TEMPLATE-GUIDE.md) |
| MOVE FIT GYM | ジム・フィットネス | [デモ](https://move-fit-gym-pi.vercel.app/) | [ガイド](templates/move-fit-gym/TEMPLATE-GUIDE.md) |
| IKEOJI LIVE | ライブ・イベント | [デモ](https://ikeozi-live.vercel.app/) | [ガイド](templates/ikeoji-live/TEMPLATE-GUIDE.md) |

機械処理用の一覧と取り込み元は [templates.json](templates.json) に記録しています。未完成のサイトを収録済みとして数えません。

## 1サイトだけ使う

Node.js 22.12以上の22系を使用してください。リポジトリを取得し、使いたいサイトのフォルダへ移動します。

```sh
cd templates/ikeoji-live
npm ci
npm run dev
```

代官山LPは `templates/daikanyama`、GYMは `templates/move-fit-gym`、SAWAYAKAは `templates/sawayaka-lp` を選びます。いずれも `npm run build` で公開用ファイルを作れます。各サイトは独立しており、必要なフォルダだけコピーして利用できます。

## すべてのサイトを確認・配布する

ルートフォルダで実行します。

```sh
npm run validate
npm run setup
npm run build:all
npm run package:all
```

`releases/` に、収録サイトのソース・公開用ファイル・素材・ガイド・ライセンスをまとめたZIPとSHA-256チェックサムを作成します。ZIP作成には `zip` コマンドが必要です。


## 商用ライセンスと申込

月額2,500円で商用サイトを制作できるシリーズです。申込・決済はnoteを予定し、URLは後日 [申込案内](docs/SUBSCRIPTION.md) に追加します。現在は受付準備中で、このリポジトリには決済・会員管理機能はありません。税の扱い等の販売条件は受付開始前に明示します。

契約中はサイト数の制限なく、自社サイト・顧客案件で改変・利用できます。契約中に制作済みのサイトは解約後も運用・保守できますが、新しい商用サイトの制作には再契約が必要です。素材単体・テンプレート集の再販売は許諾に含みません。公開GitHubからの取得と、商用利用権の取得は別です。MITではありません。詳しくは [LICENSE](LICENSE)、企画は [SERIES-PLAN](docs/SERIES-PLAN.md) を参照してください。

本文・店舗情報はサンプルです。フォーム・予約・決済はテンプレートごとに接続状態が異なります。各利用ガイドを確認してください。

[ライセンス](LICENSE) · [素材の条件](ASSETS.md) · [追加予定](ROADMAP.md)
