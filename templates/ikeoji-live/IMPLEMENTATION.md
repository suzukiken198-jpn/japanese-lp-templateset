# IKEOZI LIVE — 写真・文字を分離したHTML版

元ページの写真配置・縦書き・濃紺と金色、赤い予約ボタンを基準に再構成。左右の余白と問い合わせ背景は黒。

## 編集と出力

- `src/Landing.jsx`: 見出し、本文、比較表、FAQ、リンク、フォーム。
- `src/landing.css`: PC・スマホの配置と配色。
- `public/assets/separated/`: 文字のない背景・写真17枚（JPEG）。
- `dist/index.html`: ビルド時に全本文を直接埋め込む公開用HTML。本文・FAQ・リンクはJavaScript読込前から存在する。
- `backups/image-version/`: 変更前の画像版ソース。
- `experiment-images/`: 元の画像書き出し（変更なし）。

`npm run dev -- --port 4197` で確認、`npm run build` でHTMLと関連ファイルを書き出す。公開には dist 全体を使用する。

## 操作と未設定事項

予約ボタン2か所と追従リンクは問い合わせセクションへ移動。FAQ4項目はクリックとキーボードで開閉。フォームは必須項目・メール形式を検証し、確認と修正ができる。実際のメール送信、予約確定、決済は接続されていないため、受付準備中であることを画面に表示する。

## 画像について

組み込みの画像編集ツールを使用して元のPC画像3枚・スマホ画像1枚から文字とUIを消した背景を作成し、セクションごとに書き出した。写真や隠れた背景の補完により、画素単位では元と一致しない。元画像の配置、色、被写体を可能な限り保持。スマホ下部はPC用素材をレスポンシブに再配置。

使用した編集指示の共通内容: "Create a clean background plate. Remove all Japanese and Latin typography, numerals, buttons, UI icons, table and FAQ cards. Preserve every photograph, face, pose, lighting, palette, panel position and aspect ratio. Inpaint removed regions seamlessly. Do not crop, rearrange or add subjects. No text anywhere."

スマホ用はギター演奏・カフェ・赤いライブ会場・夕景の4領域を維持する指示を追加。元の写真単体がある場合は、生成補完したJPEGをその素材に差し替えるとさらに忠実にできる。
