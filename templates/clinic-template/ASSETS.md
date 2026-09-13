# 画像素材の記録

参照画像：ユーザー提供 `クリニック.jpg`（640×1773）。内蔵 Image Gen を使い、参照画像の各写真枠に合う**個別画像**を生成しました。ページ全体を1枚の画像として表示する作りではありません。

| ファイル（public/assets/） | 用途 |
| --- | --- |
| logo.png | ヘッダー・フッターの院名ロゴ |
| hero.png | 女性医師のメイン写真 |
| facade.png | クリニック外観・看板 |
| internal.png | 一般内科・聴診器 |
| lifestyle.png | 生活習慣病の診療イメージ |
| digestive.png | 消化器内科の診療イメージ |
| respiratory.png | 呼吸器内科の診療イメージ |
| vaccine.png | 予防接種の器具イメージ |
| doctor.png | 院長紹介用の男性医師 |
| reception.png | 受付 |
| waiting.png | 待合室 |
| examination.png | 診察室 |
| treatment.png | 処置室 |
| equipment.png | 医療機器 |
| map.png | 架空のアクセス地図 |
| family.png | 家族のフッター写真 |

正確な生成プロンプトは `asset-prompts/` に保存しています。写真・医師・地図・施設はいずれも架空です。実在の医師や医療機関の実績を示す素材として使用しないでください。

通常のUIアイコンは `@phosphor-icons/react`、文字は Noto Serif JP / Noto Sans JP（読み込めない場合は端末のフォント）を使っています。アイコンや依存パッケージのライセンス表示はビルド時に `dist/client/THIRD-PARTY-NOTICES.txt` に出力します。
