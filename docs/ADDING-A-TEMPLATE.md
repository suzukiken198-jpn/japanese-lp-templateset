# 新作を追加する

作成する場所は、リポジトリ直下の **`templates/` の中**です。

```text
japanese-lp-templateset/
├── templates.json
└── templates/
    ├── ikeoji-live/
    ├── daikanyama/
    └── move-fit-gym/   ← ジムLPを追加する場合の場所（現在は未収録）
```

フォルダには公開ページのスクリーンショットだけでなく、編集用の `src/`、画像入りの `public/`、`package.json` 等を入れます。公開URLやChatGPTの共有リンクを置くだけでは、編集可能なテンプレートとしては収録できません。

1. `templates/<短い英数字の名前>/` を作ります。
2. ソース・画像・ビルド設定・ロックファイルを配置します。`.git`、`.vercel`、`.env`、依存インストール先、ビルド結果はコピーしません。
3. ルートと同じ独自ライセンスの `LICENSE`、`README.md`、`TEMPLATE-GUIDE.md`、`ASSETS.md` を追加します。単独でフォルダを配っても条件が伝わるようにします。
4. `npm ci` と `npm run build` で動く状態にします。公開ファイルにもLICENSEと依存ライブラリの著作権表示を含めます。
5. ルートの `templates.json` に1項目を追加します。`id` とフォルダ名は同じにしてください。
6. READMEの一覧と現在の収録数、ROADMAPを更新します。
7. `npm run validate` を実行します。新作のPC・スマホで表示と主要操作を確認してPull Requestを作成します。

登録例（説明用であり、収録済みサイトではありません）:

```json
{
  "id": "new-template",
  "name": "新作の表示名",
  "category": "業種",
  "description": "特徴を1文で説明",
  "path": "templates/new-template",
  "buildOutput": "dist",
  "sourceUrl": null,
  "sourceCommit": null,
  "demoUrl": null,
  "license": "SEE LICENSE IN LICENSE",
  "integrationStatus": "フォーム・予約等の接続状態"
}
```

`buildOutput` はテンプレートフォルダからの相対パスにします。公開サンプルURLがない場合は推測せず `null` にします。

元リポジトリから取り込むときは、その時点のコミットを記録します。後日同期する場合は、このテンプレート集側の変更を確認し、差分をレビューして取り込みます。

一覧に登録されたテンプレートは、まとめビルド・まとめZIP・GitHub Actionsの検証対象に自動で加わります。
