# 本番デプロイ運用（GitHub Actions → Vercel）

PUG 公式サイト（https://www.pug-cs.com）は、GitHub Actions から Vercel CLI で既存 Project
`zen-llc/pug-creative-studio` にデプロイする。開発者に Vercel の Developer Seat・Token・本番環境変数を
配布せずに本番更新できるようにするための構成。

## 構成

| 項目 | 値 |
| --- | --- |
| Workflow | `.github/workflows/deploy-production.yml`（本番）／`.github/workflows/ci.yml`（PR 検証・Secrets なし） |
| Vercel Team / Project | ZEN LLC (`zen-llc`) / `pug-creative-studio` (`prj_hZKfDPQ5h35bByyJ1ljZEnkylkmw`) |
| 本番ドメイン | `www.pug-cs.com`（`pug-cs.com` は www へリダイレクト） |
| ビルド場所 | **Vercel 上**（`vercel deploy --prod`）。既存の Git 連携ビルドと同じビルド環境 |
| Vercel CLI | `61.1.0` 固定（GitHub ランナー上ではアップロードと promote にだけ使う） |

### Repository Secrets / Variables

GitHub Free の private リポジトリでは Environment Secrets を前提にできないため、すべて Repository レベルで管理する。

| 名前 | 種別 | 内容 |
| --- | --- | --- |
| `VERCEL_TOKEN` | Repository secret | デプロイ用の Vercel Token |
| `VERCEL_ORG_ID` | Repository variable | ZEN LLC の Team ID（`team_...`） |
| `VERCEL_PROJECT_ID` | Repository variable | `prj_hZKfDPQ5h35bByyJ1ljZEnkylkmw` |
| `PRODUCTION_AUTO_DEPLOY` | Repository variable | `false`（初期値）。`true` で push 時に自動反映 |
| `DEPLOY_ALLOWED_ACTORS` | Repository variable | デプロイを許可する GitHub ユーザー（カンマ区切り、空白なし。例: `shouhi,tchsw`）。未設定ならジョブは動かない |

### なぜ CI で `vercel build --prebuilt` しないか

本番の Notion 環境変数（`NOTION_TOKEN` ほか 3 つ）は Vercel の **Sensitive（Secret）型** で、保存後は書き込み専用になる。
`vercel pull` では値を取得できないため、GitHub ランナー上で `vercel build` すると Notion 未設定と判定され、
`src/config/*.ts` の静的データで本番ページがプリレンダリングされてしまう（ISR で再取得されるまでの間、古い内容が出る）。

`vercel deploy --prod` でソースをアップロードし Vercel 上でビルドすれば、Sensitive 変数・Node 22.x・yarn 1.22.19・ビルドキャッシュがすべて既存ビルドと同じになる。
Developer Seat が必要になるのは Git 連携でのデプロイ（コミット作者の確認）なので、Token による CLI デプロイでは Seat は増えない。

`--prebuilt` 方式に戻すなら、Notion 変数を Config 型で作り直すなどして `vercel pull` で値を取れるようにする必要がある（本番環境変数の変更になるので、オーナーの判断が必要）。

## 処理の流れ

1. デプロイ先の検証（`VERCEL_PROJECT_ID` が固定値と一致し、Vercel API 上の Project 名と Team が一致すること）
2. `vercel deploy --prod --skip-domain`: 本番環境変数で Vercel 上でビルドする。**この時点では本番ドメインは切り替わらない**
3. （promote 時のみ）`vercel promote <url>`: 本番ドメインを新しいデプロイに切り替える
4. （promote 時のみ）スモークテスト（`/`, `/news`, `/work`, `/members`, `/contact` が 200）

ビルドが失敗した場合は 2 で止まり、公開中のサイトには影響しない。

## 起動条件

すべての実行に次の条件がある: ref が `main` であること、実行者（`github.actor` と再実行者 `github.triggering_actor`）が `DEPLOY_ALLOWED_ACTORS` に含まれること。

| トリガー | 動作 |
| --- | --- |
| `main` への push | `PRODUCTION_AUTO_DEPLOY == 'true'` のときだけ、ビルドして本番に反映。`false` ならジョブはスキップ |
| 手動実行（Actions → Deploy Production → Run workflow） | `promote` 未チェック（既定）: ビルドのみ／チェック: ビルドして本番に反映 |

本番デプロイは `concurrency: vercel-production` で直列化される。`pull_request` / `pull_request_target` では本番 Workflow は起動しない。
PR では `ci.yml`（Secrets なし）が typecheck・lint・build を行う。

## セキュリティ評価（GitHub Free を維持する前提）

### できないこと

`main` のブランチ保護・Rulesets（API が 403 を返すことを確認済み）、必須レビュー、Code Owners の強制、Environment の承認者やブランチ制限は使えない前提で設計している。

### Write 権限を持つ人ができてしまうこと

| 脅威 | 可否 | 理由 |
| --- | --- | --- |
| `VERCEL_TOKEN` の窃取 | **できる** | 任意のブランチに `on: push` の Workflow を書けば、Repository secret はそのジョブに渡る。マスクは base64 化などで回避できる。Workflow 内の `if` 条件や許可リストは、Workflow 自体を書き換えられるので防御にならない |
| `main` に未レビューのコードを入れる | **できる** | ブランチ保護がないため直接 push できる |
| 本番へのデプロイ | 自動デプロイ有効時は間接的にできる | 本人が許可リストにいなくても、`main` に入れたコードは、次に許可されたユーザーがデプロイしたときに一緒に出る |
| フォークからの PR で Secrets を使う | できない | フォーク PR のジョブには Secrets が渡らない。`pull_request_target` は使っていない |

**Token が漏れたときの影響範囲**: Vercel Token は Team 単位のスコープなので、`pug-creative-studio` に限らず ZEN LLC Team の全 Project（現在 14 件）に対して、デプロイ、設定・ドメイン・Config 型環境変数の変更、削除ができる。Sensitive 型の値は読めない。

結論: **GitHub Free では「本番にデプロイできる」と「Vercel Token を読める」を分けられない**。Write 権限は、ZEN LLC の Vercel Token を預けてよい人にだけ付与する。

### 手動デプロイと自動デプロイの比較

| 観点 | 手動（`PRODUCTION_AUTO_DEPLOY=false`） | 自動（`true`） |
| --- | --- | --- |
| Token 窃取リスク | 同じ（Write 権限で決まる） | 同じ |
| 未レビューのコードが本番に出る | 許可されたユーザーが「何を出すか」を確認してから実行する。`promote=false` でビルドだけ先に確認できる | `main` に入った時点で出る。ブランチ保護がないので、レビューを経たかどうかを保証できない |
| 誤操作・事故 | 起きにくい | 直接 push・誤マージがそのまま本番に出る |
| 運用負荷 | リリースごとに 1 回の手動実行 | なし |

**推奨: GitHub Free の間は手動デプロイ**（自動デプロイは無効のまま）。

## 追加料金なしで最も安全な運用案

1. **権限**: Write（以上）は、Vercel Token を預けてよい人（現在の admin 2 名）に限定する。外部の開発者や新しいメンバーには Read（または Triage）を付与し、フォークから PR を出してもらう（Organization 設定で private リポジトリのフォークを許可する必要がある）。フォーク PR には Secrets が渡らないので、`ci.yml` による検証だけが走る。
2. **リリース**: 許可リストのメンバーが PR をレビューしてマージし、Run workflow を `promote` 未チェックで実行してビルドを確認し、続けて `promote` にチェックを入れて実行する。開発者は Vercel の Seat も Token も持たない。
3. **Token**: 個人の常用 Token ではなく、デプロイ専用・ZEN LLC スコープ・有効期限付き（例: 90 日）の Token を使い、期限ごとにローテーションする。Token を作ったユーザーが Team から外れると Token も無効になるので、作成者を記録しておく。
4. **GitHub Actions の Organization 設定**（無料で使える）: 利用できる Action を「GitHub 製 + 指定したもの」に限定し、SHA 固定の強制（`sha_pinning_required`）を有効にする。フォーク PR の Workflow 実行には承認を必須にする。
5. **監視**: Vercel の Deployment 通知（メール/Slack）を有効にし、意図しないデプロイがすぐ分かるようにする。Repository Secrets の更新日時を定期的に確認する。
6. **将来**: Write 権限を持つ開発者を増やす必要が出たら、GitHub Team（有料）で `main` のブランチ保護、Code Owners 必須、Environment のブランチ制限（`main` のみ）と承認者を設定し、Secret を Environment に移す。

### 代替案（要検証）: Vercel Deploy Hook

GitHub Actions に置く秘密を Token ではなく Deploy Hook の URL にすると、漏洩したときの影響は「`main` の再ビルドを起こせる」だけになる（コードの差し替えや他 Project の操作はできない）。
ただし Git 連携を前提とした仕組みなので、次の点を確認してから採用を判断する: `git.deploymentEnabled: false` の状態で Hook が動くか、Pro プランでコミット作者のチェックがかかるか、Disconnect できなくなること。

## Vercel Git 連携との関係

### 現状

- Vercel Project は `PUG-LLC/PUG-Website` と Git 連携したまま（Production Branch: `main`）。
- `main` に `vercel.json` の `git.deploymentEnabled: false`（コミット 8c265f2）があり、**`main` への push で Vercel が自動デプロイしない状態**。この設定は維持する。現在の本番は 38c8354（2026-07-29）。
- そのため、Workflow を実行するまで `main` の更新は本番に反映されない。二重デプロイは起きない。

### `git.deploymentEnabled: false` と Dashboard の Disconnect の違い

| | `vercel.json` の `git.deploymentEnabled: false` | Dashboard で Disconnect |
| --- | --- | --- |
| 効果の範囲 | デプロイ対象コミットの `vercel.json` に従う。この設定を含まないブランチ（例: `codex/spreadsheet-cms`）の push では Preview デプロイが作られる | Project 全体。どのブランチからも自動デプロイされない |
| Git 連携 | 維持（リポジトリとのリンク、Production Branch 設定、Vercel GitHub App のアクセスは残る） | リンクが外れる。Vercel GitHub App のこのリポジトリへのアクセスは別途 GitHub 側で外す |
| 戻し方 | PR で設定を戻すだけ（レビュー可能・履歴が残る） | Dashboard から再接続（Team の Owner 権限と GitHub 側の App 許可が必要） |
| ドメイン・環境変数・設定 | 影響なし | 影響なし |
| CLI デプロイ | 影響なし | 影響なし |

### 推奨する切り替え方針

1. 当面は `git.deploymentEnabled: false` を一次スイッチにし、Git 連携は残しておく。
2. GitHub Actions 経由の本番デプロイが安定したら（目安: 2 週間、または 3 回以上のリリース）、Dashboard で Disconnect する。そうすれば、古いブランチ由来の Preview デプロイや、`vercel.json` が戻されたことによる二重デプロイを完全に止められる（Deploy Hook 案を採る場合は Disconnect しない）。

## 移行手順

1. オーナーが Repository secret `VERCEL_TOKEN` を登録する（Settings → Secrets and variables → Actions → Secrets → New repository secret）。デプロイ専用 Token の新規発行を推奨。
2. Repository variables の `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` / `PRODUCTION_AUTO_DEPLOY=false` / `DEPLOY_ALLOWED_ACTORS` を確認する。
3. PR をレビューしてマージする。`PRODUCTION_AUTO_DEPLOY=false` なので、**マージしても本番デプロイは走らない**。
4. **ビルド確認**: Run workflow（`promote` 未チェック）。Vercel 上に本番設定でビルドされるが、公開中のサイトは変わらない。Vercel Dashboard でビルドログを確認する（Notion からの取得、`yarn install`、Next.js 16.1.1）。
5. **初回本番反映（オーナー承認）**: Run workflow を `promote` にチェックを入れて実行する。
6. 確認: スモークテスト、https://www.pug-cs.com の News / Work / Members（Notion の内容）と Contact フォーム、Vercel Dashboard の Production デプロイ。
7. 移行が終わったら、使わなくなった `Production` Environment の `VERCEL_TOKEN` を削除し、Token の置き場所を 1 か所にする。

## 初回デプロイで本番に反映される差分（2026-07-29 / 38c8354 以降）

| 種類 | 内容 | 影響 |
| --- | --- | --- |
| コード | `vercel.json`（`git.deploymentEnabled: false`）、`.github/`、`docs/` のみ | アプリのコード・依存・設定（`next.config.ts`, `package.json`, lockfile）に変更はない |
| 環境変数 | Notion 4 件の最終更新は 2026-06-13 | 7/29 のデプロイと同じ値が使われる |
| Project 設定 | Framework=nextjs、Node 22.x、Build/Install はデフォルト、Fluid、iad1 | 変更なし |
| Notion CMS | ビルド時に最新データを取得する（ISR 5 分で、本番は既に最新データを表示中） | 見た目の変化はない想定。ただし Notion 側のデータ不備があるとビルドが失敗しうる → 手順 4 で検出される（公開中のサイトには影響しない） |
| 依存関係 | `yarn.lock` で解決されるバージョンは同一（下記） | なし |

## lockfile 混在について（調査結果、今回は変更しない）

- `package-lock.json` / `pnpm-lock.yaml` / `yarn.lock` が混在している。Vercel は `yarn.lock` を採用している（ビルドログ: `yarn install v1.22.19`、package-lock があるという警告付き）。
- `yarn install --frozen-lockfile` は成功する（`yarn.lock` は `package.json` を満たしている）。
- Vercel のビルドログに出る `success Saved lockfile.` は、yarn がプラットフォーム別の optional バイナリ（sharp / @next/swc / tailwind oxide など 73 件）を追記し、peer 依存の指定エントリを整理しているだけ。**解決されるパッケージのバージョンは 1 件も変わらない**（38c8354 で検証済み）。
- `pnpm-lock.yaml` は 2026-03-12 から更新されておらず古い。`package-lock.json` は `yarn.lock` と同時に更新されている。ローカルで `npm install` を使うと解決結果が Vercel と異なる可能性がある。
- 推奨（別 PR）: yarn に統一し、`package.json` に `"packageManager": "yarn@1.22.19"` を追加、他の lockfile を削除する。

## ロールバック

- **即時（推奨）**: Vercel Dashboard → Deployments → 直前の正常な Production デプロイ → Instant Rollback。Run workflow でも、前のデプロイの URL を `vercel promote` すれば同じことができる。
- **コード起点**: 問題のコミットを revert して `main` に入れ、Run workflow を実行する。
- **自動デプロイの停止**: `PRODUCTION_AUTO_DEPLOY=false` にする、または Actions で Workflow を Disable する。
- **Vercel Git 連携に戻す**: `vercel.json` の `git` ブロックを削除する PR をマージする（Disconnect 前に限る）。その場合は先に `PRODUCTION_AUTO_DEPLOY=false` にしておく。

## 今後: Preview デプロイ（別 PR）

- `pull_request` で `vercel deploy`（Preview）を行い、URL を PR にコメントする。ただし GitHub Free では、Write 権限を持つ人が Secret を読める問題は同じ。フォーク PR には Secrets が渡らないため、Preview は作られない。
- Vercel の Preview 環境には現在環境変数がない（Notion は production のみ）。Preview は静的データで表示される。
- Preview は SSO 保護（`all_except_custom_domains`）がかかっているので、Seat を持たないレビュアー向けには共有リンクなどの運用を検討する。

## 既知の事項

- Contact フォーム（Web3Forms）のアクセスキーは `ContactForm.tsx` にハードコードされており、`NEXT_PUBLIC_FORM_KEY` の参照はコメントアウトされている。ビルドには影響しない。
