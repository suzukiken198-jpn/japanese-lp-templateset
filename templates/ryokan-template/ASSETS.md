# 素材・出典

デザインの基準はユーザー提供の `ryokan.png`（1024×1536）です。写真・ロゴ・地図・和紙は、この画像を参照して組み込み画像生成機能で作った個別の素材です。原画の切り出し写真や、実在する旅館・観光地の記録写真ではありません。

| ファイル（public/assets/） | 用途 |
| --- | --- |
| hero.png | 夕暮れの露天風呂・メイン写真 |
| logo.png | 月の湯のロゴ（文字を含む黒背景画像。画面ではスクリーン合成） |
| paper.png | 控えめな和紙の背景 |
| rooms.png | 客室 |
| cuisine.png | 会席料理 |
| onsen.png | 温泉・宿泊プラン欄の背景 |
| lounge.png | 館内ラウンジ |
| spring.png | 春のプラン |
| standard.png | 通年プラン |
| autumn.png | 秋のプラン |
| shrine.png / waterfall.png / town.png / lake.png | 周辺観光4点 |
| map.png | 実在しない所在地のアクセス図 |
| footer.png | 最下部の山並み |

生成時のプロンプトは `asset-prompts/` に保存しています。本テンプレート用のコードと素材には同梱の独自ライセンスが適用されます。第三者素材の権利は各権利者に帰属します。

## 外部の書体・アイコン

- [Noto Serif JP（Google Fonts）](https://fonts.google.com/noto/specimen/Noto+Serif+JP)：ページでオンライン読み込み。書体はSIL Open Font License。接続できない場合は端末の明朝体へ切り替わります。
- [Phosphor Icons](https://phosphoricons.com/)：Reactパッケージ（MIT）の標準アイコン。独自ライセンスで上書きしません。
- React・React DOM等のライセンスはビルド時に `THIRD-PARTY-NOTICES.txt` に出力し、`LICENSE` とともに公開用ファイルへ同梱します。
