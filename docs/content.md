# コンテンツの更新

サイトの文章・写真はこのリポジトリで管理します。Notion API・Notion の環境変数は使いません。
GitHub の raw URL を閲覧時に取得するのではなく、Git の内容を Vercel がビルドして同じサイトから配信します。

- 実績: `content/work/<slug>.json`
- ニュース: `content/news/<slug>.json`
- メンバー: `content/members/<slug>.json`
- 写真: `public/images/content/`（JSON には `/images/content/ファイル名` と記入）

既存記事の変更は JSON の文章・画像パスを編集します。改行は `\n`。デザインのファイルは変更不要です。
新規記事は同じ種類の JSON をコピーし、一意の `id` と `slug` を設定して、ファイル名を `<slug>.json` にします。
`src/lib/content/data.ts` に import と対応する配列への追加も行ってください。未登録ファイルは検証でエラーになります。
画像は先にリポジトリに保存し、そのパスを JSON に記入してください。Notion の期限付き URL は使えません。

`sortOrder` は小さい順（実績・メンバー）。ニュースは `publishedAt` の新しい順、同日の場合 `sortOrder` 順。
ニュースの表示日付 `date` も合わせて編集します。`featured` はトップ掲載を優先する指定です。
実績の `members` はメンバーの `slug` を指定します。公開済みの `slug` を変更すると URL が変わるので維持してください。

全 JSON は公開対象です。非公開の下書き・個人情報・認証情報を置かないでください。

## 確認と公開

CI と同じ Yarn 1.22.19 と対応する Node（22.13 以降の22系、または24系）を使用します。

```sh
yarn install --frozen-lockfile
yarn check:content
yarn tsc --noEmit
yarn lint
yarn build
yarn start
```

PR で内容と Preview を確認して main に反映します。Vercel の Git 自動デプロイが有効であれば再ビルド・公開されます。
`vercel.json` による自動デプロイ停止など、既存の公開設定は本変更では変更していません。
Notion への更新はサイトに反映されなくなります。Notion の元データは削除していません。

## 初回移行

2026-10-16 に公開サイトの配信データ・全詳細ページから、実績4件、ニュース2件、メンバー6名と元画像33点を保存しました。
Notion DB の直接エクスポートではないため、下書き・非公開データは含みません。
本文、改行、公開 URL、表示順、参加メンバー、関連実績の表示ロジックを維持しています。
元画像は加工せず保存し、既存の next/image が配信時に最適化します。
既存のレイアウト・スタイル・アニメーションには変更を加えていません。
