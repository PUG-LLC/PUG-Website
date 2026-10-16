> コンテンツ移行後は Notion 環境変数を使用しません。CI・本番ともリポジトリ内の同じファイルでビルドします。更新手順は [content.md](content.md) を参照。以下の Notion に関する記述は移行前の運用記録です。

# デプロイと CI の運用

PUG 公式サイト（https://www.pug-cs.com）は、**Vercel 標準の Git 連携**でデプロイする。
GitHub Actions は CI（検証）だけを担当し、Vercel の Token は使わない。

## 構成

| 項目 | 内容 |
| --- | --- |
| リポジトリ | `PUG-LLC/PUG-Website`（**public**） |
| Vercel Team / Project | ZEN LLC / `pug-creative-studio`（Git 連携: `PUG-LLC/PUG-Website`、Production Branch: `main`） |
| 本番ドメイン | `www.pug-cs.com`（`pug-cs.com` は www へリダイレクト） |
| 本番デプロイ | `main` に入ったコミットを Vercel が自動でビルド・公開する |
| Preview | `main` 以外のブランチと PR を Vercel が自動でビルドする（SSO 保護あり） |
| CI | `.github/workflows/ci.yml`（Secrets を使わない） |
| 環境変数 | Vercel 上の Notion 4 件（Sensitive、production のみ）。GitHub 側には置かない |

## 開発から公開までの流れ

1. ブランチを作って push する → Vercel が Preview を作成する。CI が走る。
2. `main` 向けに PR を作る → CI（必須チェック）が通らないとマージできない。
3. PR をマージする → Vercel が本番ビルドする。ビルドに成功したときだけ www.pug-cs.com が切り替わる（失敗したら前のデプロイのまま）。

GitHub で Write 権限を持つメンバーなら、Vercel の Seat がなくても自分で公開できる（下記）。

## Vercel Developer Seat について

Vercel の「コミット作者が Team メンバーでないとデプロイしない」という確認は **private リポジトリだけに適用される**（[Vercel docs: Deploying private Git repositories](https://vercel.com/docs/git#deploying-private-git-repositories)）。public リポジトリでは、フォークからの PR のときにだけ承認が必要になる。

実測（2026-10-16、Preview のみ）:

| リポジトリ | Vercel 非メンバー（tchsw）が作者のコミット 7a953d2 |
| --- | --- |
| private の時点 | Git 連携 / Deploy Hook / CLI のいずれも **BLOCKED** |
| public に変更後 | Git ソースからの Preview デプロイが **READY** |

- 補足: 同じコミットを新しいブランチ名で push し直しても、Vercel は新しいデプロイを作らなかった（処理済みのコミットだからと推測。**UNVERIFIED**）。そのため「非メンバーが新しく push したコミットが、Git 連携の自動デプロイで READY になるか」は **UNVERIFIED**。メンバー以外の開発者が実際にテストブランチへ push して確認する（下記「オーナーの次の操作」）。

## CI（`.github/workflows/ci.yml`）

| ジョブ | 内容 | 実行タイミング |
| --- | --- | --- |
| `Typecheck / Lint / Build` | Node 22 / yarn 1.22.19 / `yarn install --frozen-lockfile` / `tsc --noEmit` / `eslint` / `next build` | PR・main への push |
| `Secret scan` | gitleaks 8.30.1（チェックサムを検証）で全 Git 履歴を検査 | PR・main への push |
| `Dependency review` | PR で追加・変更される依存関係の既知脆弱性（high 以上で失敗） | PR |

- 権限は `contents: read` のみ。Secrets は使わない。`pull_request_target` は使わない。
- フォークからの PR でも安全に実行できる（Secrets がなく、トークンも読み取り専用）。初めてのコントリビューターの Workflow 実行には承認が必要（リポジトリ設定）。
- Notion の環境変数は CI に渡さないので、CI のビルドは静的データで行われる。Notion 側のデータ不備は CI では検出できない（本番ビルドが失敗し、公開中のサイトはそのまま残る）。

## main の保護（Ruleset）

GitHub Free でも public リポジトリなら Rulesets が使える。`main` に次のルールを設定している:

- PR 経由でのみ変更できる（直接 push 禁止）
- 必須チェック: `Typecheck / Lint / Build`、`Secret scan`、`Dependency review`
- force push 禁止・ブランチ削除禁止

承認（レビュー）は必須にしていない（メンバーが自分で公開できるようにするため）。人数が増えたら 1 approval 必須にすることを推奨する。

## セキュリティ

### 秘密情報スキャンの結果（2026-10-16、全履歴 33 コミット・全ブランチ）

| 対象 | 結果 |
| --- | --- |
| Notion API Token（`secret_` / `ntn_`）、`NOTION_TOKEN=値` | 検出なし |
| `.env` / `.vercel/` / 鍵ファイル | 一度もコミットされていない（`.gitignore` の `.env*` が有効） |
| Vercel / GitHub / AWS Token、秘密鍵 | 検出なし |
| DB 接続文字列 | 検出なし（DB は使っていない） |
| Web3Forms アクセスキー（`ContactForm.tsx`） | 検出あり。ブラウザから送信するための公開前提キーで、本番サイトの JS にも含まれている。漏洩扱いにはしないが、スパム対策として Web3Forms 側でドメイン制限や hCaptcha を検討する |
| 電話番号 `080-9939-8383`（Contact フォームの placeholder） | 本番サイトにも表示されている。実在の個人の番号ならダミーに差し替えることを推奨（別 PR） |
| コミット作者のメールアドレス（個人の Gmail 2 件） | public 化で公開された。履歴の書き換えは推奨しない。今後は GitHub の "Keep my email addresses private" と noreply アドレスを使う |
| Google スプレッドシート ID（`codex/spreadsheet-cms` ブランチ） | 匿名で CSV として読める状態（HTTP 200 を確認）。サイト掲載用データなら問題ないが、下書きや非公開の行があれば共有設定を見直す |

GitHub の Secret scanning / Push protection / Dependabot alerts を有効化済み。

### public 化で増えたリスク

- 履歴を含むソースコード全体が公開された（上記のメールアドレス、電話番号、スプレッドシート ID を含む）。
- フォークからの PR: Vercel は Git Fork Protection（有効を確認済み）によって、承認されるまで Preview をビルドしない。CI は Secrets なしで動く。
- 外部の人が Issue や PR を作れるようになった（スパム対策は GitHub の設定で行う）。
- `codex/spreadsheet-cms` の Workflow（`contents: write`）は手動実行のみで、外部の人は実行できない。

### 不要になったもの

- GitHub Actions からの Vercel CLI デプロイ（`deploy-production.yml`）は削除した。
- `Production` Environment の `VERCEL_TOKEN`（Secret）は使われていない。**オーナーが Vercel でその Token を失効させ、GitHub の Secret も削除する**ことを推奨する。
- Repository variables（`VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` / `PRODUCTION_AUTO_DEPLOY` / `DEPLOY_ALLOWED_ACTORS`）は削除した。

## 自動デプロイの再開

`main` の `vercel.json` には `git.deploymentEnabled: false`（8c265f2）があり、自動デプロイが止まっている。これを外す変更は**別の PR**にしている。マージすると、その時点の `main` の本番デプロイがすぐに始まるため、オーナーの承認が必要。

再開時に本番へ出る差分（2026-07-29 / 38c8354 との比較）:

| 種類 | 内容 |
| --- | --- |
| アプリのコード・依存・Next.js 設定 | 変更なし |
| 追加・変更されるファイル | `vercel.json`、`.github/`（CI・CODEOWNERS）、`.gitleaksignore`、`docs/` |
| 環境変数 | Notion 4 件（Sensitive、最終更新 2026-06-13）。7/29 と同じ |
| Project 設定 | Next.js / Node 22.x / Build・Install はデフォルト / Production Branch `main`（変更なし） |
| Notion CMS | 本番は ISR で Notion から取得できている（Work の slug が静的データと異なることを確認）。ビルド時にも同じデータを取得する |

## ロールバック

- **即時**: Vercel Dashboard → Deployments → 直前の Production デプロイ → Instant Rollback。
- **コード起点**: 問題のコミットを revert する PR をマージする。
- **自動デプロイの停止**: `vercel.json` に `"git": { "deploymentEnabled": false }` を戻す PR をマージする。Disconnect はしない。

## 今後

- Contact フォームの電話番号 placeholder をダミーに差し替える（別 PR）。
- lockfile の整理: yarn に統一し、`"packageManager": "yarn@1.22.19"` を追加、`package-lock.json` / `pnpm-lock.yaml` を削除（別 PR）。現状でも `yarn.lock` の解決結果は Vercel のビルドと同じであることを確認済み。
