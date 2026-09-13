# 素材とデザインの記録

参照：ユーザー提供 `/Users/suzukikenichi/Desktop/デイサービス.png`。既存の介護向け個別写真をデイサービスの用途に再配置し、見出し・本文・料金・ボタンをHTMLに分離する。

## 画像一覧

すべて `public/assets/` の個別PNG。built-in Image Genで参照画像に合わせて生成。個別プロンプトと生成元は `asset-prompts/` に記録する。実在の事業所・スタッフ・利用者を示すものではない。

| ファイル | 使用箇所・参照領域 | 意図する比率 |
| --- | --- | --- |
| logo.png | ヘッダーとフッターの家・ハートのマーク | 1:1 |
| hero.png | ヒーロー、y46–403、介護士と高齢女性、左に余白 | 2.4:1 |
| body-care.png | 健康体操カード | 3:2 |
| housekeeping.png | 生活援助カード | 3:2 |
| outing.png | 季節のイベントカード | 3:2 |
| watching.png | 見守り・安否確認カード | 3:2 |
| family-support.png | レクリエーションカード | 3:2 |
| care-story.png | 理念セクション左写真、y786–985 | 3:2 |
| living-room.png | 理念セクション右写真、y786–985 | 3:2 |
| voice-woman.png | 利用者の声・女性 | 1:1 |
| voice-man.png | 利用者の声・男性 | 1:1 |
| voice-family.png | ご家族の声・女性 | 1:1 |
| staff.png | スタッフ紹介（3人） | 2:1 |
| map.png | 架空の事業所周辺地図 | 4:3 |
| hands.png | 最下部相談CTA、支え合う手、右は明るい余白 | 3:1 |

## レイアウトの計測

デスクトップでは大きな写真、白い余白、紺の明朝見出し、緑の線画アイコン、オレンジの丸いCTAを基準とする。PCは最大1440pxまで拡大、モバイルは読みやすさ優先で縦配置。

## フォントとアイコン

見出しはNoto Serif JP、本文はNoto Sans JP（Google Fonts、SIL Open Font License）。UIアイコンはPhosphor Icons（MIT）。独自SVGやCSSによるイラストは使用しない。

画像とテンプレート自体の条件は同梱のLICENSE。フォント・依存ライブラリはそれぞれのライセンスが適用される。
