# GoogleスプレッドシートからGit管理ファイルを更新する

ニュース、制作実績、メンバー情報をGoogleスプレッドシートで編集し、必要なタイミングで手動同期できます。

スプレッドシートを編集しただけでは、本番サイトは変わりません。同期すると文章は `src/config`、写真は `public/images/cms` に保存され、通常のGit差分として確認できます。本番反映は、変更をコミット・プッシュした後の既存デプロイ手順で行います。

## 初期設定

1. 新しいGoogleスプレッドシートを作り、`news`、`works`、`members` の3シートを作成します。
2. `spreadsheet-templates` 内の各CSVを対応するシートへ読み込み、サンプル行を現在のサイト内容に合わせて編集します。
3. Googleスプレッドシート右上の「共有」を開き、一般的なアクセスを「リンクを知っている全員・閲覧者」にします。
4. `content-sync.config.example.json` を `content-sync.config.json` として複製します。

```json
{
  "news": "https://docs.google.com/spreadsheets/d/16Yl-DGsHw2FfpWHZtWWhQRTg_fGgZRWri19bauEleqI/export?format=csv&gid=1001",
  "works": "https://docs.google.com/spreadsheets/d/16Yl-DGsHw2FfpWHZtWWhQRTg_fGgZRWri19bauEleqI/export?format=csv&gid=1002",
  "members": "https://docs.google.com/spreadsheets/d/16Yl-DGsHw2FfpWHZtWWhQRTg_fGgZRWri19bauEleqI/export?format=csv&gid=1003"
}
```

`content-sync.config.json` はGitに保存されません。シートの列名は変更しないでください。

## 更新手順

### GitHub上で更新する方法

GitHubの Actions → Sync website content → Run workflow を押すと、接続済みのスプレッドシートから文章と写真を同期した確認用Pull Requestが作成されます。Secretsの登録は不要です。スプレッドシートの編集やワークフロー実行だけでは本番サイトは変わりません。Pull Requestを確認してマージすると、GitHub内の確定ファイルが更新されます。

### 手元のPCで更新する方法

1. スプレッドシートで文章や写真URLを編集します。
2. 入力内容だけ確認します。

```bash
npm run content:check
```

3. 問題がなければGit管理ファイルへ同期します。

```bash
npm run content:sync
```

4. `git diff` やローカルサイトで変更内容を確認します。
5. 問題がなければ、通常どおりコミット・プッシュして本番へ反映します。

同期時にエラーが発生した場合、`src/config` の3ファイルは書き換えられません。

## 入力ルール

- `visible`: `false`、`0`、`no`、`非表示` のいずれかで行を非表示にできます。
- 画像: ログイン不要で表示できる画像URL、Google Driveの公開共有URL、または既存の `/images/...` パスを入力します。
- 外部画像は同期時に `public/images/cms` へダウンロードされ、サイトはGit内の画像だけを参照します。
- 複数項目: `categories`、`tags`、`relatedIds`、`gallerySub` は `|` で区切ります。
- 改行: セル内改行をそのまま使えます。
- `works` の `deliverables` と `members`: JSON形式で入力します。テンプレートのサンプルを複製して編集してください。

## 必須項目

- `news`: `id`, `date`, `category`, `title`, `content`
- `works`: `id`, `client`, `title`, `mainImage`, `deliverables`, `members`
- `members`: `id`, `name`, `role`, `image`

`id` はURLにも使われるため、公開後は変更しないことをおすすめします。

## Gitで更新される場所

- ニュース文章: `src/config/news.ts`
- 制作実績文章: `src/config/works.ts`
- メンバー文章: `src/config/members.ts`
- 差し替え写真: `public/images/cms`
