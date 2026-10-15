# 本番デプロイ運用（GitHub Actions → Vercel）

PUG 公式サイト（https://www.pug-cs.com）は、GitHub Actions から Vercel CLI で既存 Project
`zen-llc/pug-creative-studio` にデプロイする。開発者に Vercel の Developer Seat・Token・本番環境変数を
配布せずに、GitHub の権限だけで本番更新できるようにするための構成。

## 構成

| 項目 | 値 |
| --- | --- |
| Workflow | `.github/workflows/deploy-production.yml` |
| Vercel Team / Project | ZEN LLC (`zen-llc`) / `pug-creative-studio` (`prj_hZKfDPQ5h35bByyJ1ljZEnkylkmw`) |
| 本番ドメイン | `www.pug-cs.com`（`pug-cs.com` は www へリダイレクト） |
| Framework / Node.js | Next.js / 22.x（Vercel Project 設定に合わせる） |
| Install / Build | Vercel の自動判定（`yarn install` → `yarn run build`）。`vercel build` が同じ判定を行う |
| GitHub Environment | `Production`（`secrets.VERCEL_TOKEN`, `vars.VERCEL_ORG_ID`, `vars.VERCEL_PROJECT_ID`） |
| Vercel CLI | `61.1.0` 固定 |

処理の流れ:

1. デプロイ先の検証（変数が想定の Project ID と一致し、Vercel API 上の Project 名・Team が一致すること）
2. `vercel pull --yes --environment=production`（本番の Project 設定と環境変数をランナー内にのみ取得）
3. `vercel build --prod`
4. `vercel deploy --prebuilt --prod`
5. スモークテスト（`/`, `/news`, `/work`, `/members`, `/contact` が 200）

## 起動条件

| トリガー | 動作 |
| --- | --- |
| `main` への push | リポジトリ変数 `PRODUCTION_AUTO_DEPLOY` が `true` のときだけ本番デプロイ。未設定ならスキップ |
| 手動実行（Actions → Deploy Production → Run workflow, ref=`main`） | `deploy` 未チェック: ビルド検証のみ（ドライラン）／チェック: 本番デプロイ |

- `main` 以外の ref では実行されない。
- 本番デプロイは `concurrency: vercel-production` で直列化される（実行中は中断せず、後続は待機）。
- `pull_request` / `pull_request_target` では起動しない（PR から Secrets に触れる経路を作らない）。

## セキュリティ上の注意

- `VERCEL_TOKEN` は `Production` Environment の Secret のみ。値はログに出さない（`run:` 内で `${{ secrets.* }}` を直接展開せず、環境変数経由で渡している）。
- `GITHUB_TOKEN` は `contents: read` のみ。checkout は `persist-credentials: false`。
- 外部 Action はコミット SHA で固定。
- `vercel pull` で取得した本番環境変数はランナーの作業ディレクトリ内にのみ存在し、成果物としてアップロードしない。
- **制約（GitHub Free / private リポジトリ）**: 現在の Organization プランでは `main` のブランチ保護・Rulesets が使えない（API が 403 を返すことを確認済み）。GitHub のドキュメント上、private リポジトリで Environment の承認者（Required reviewers）やデプロイブランチ制限を使うには有料プランが必要。そのため現状は次の状態にある:
  - `main` への直接 push を技術的に禁止できない。
  - CODEOWNERS はレビュー依頼の自動化だけで、強制はできない。
  - Write 権限を持つ人は、別ブランチに Workflow を書いて `Production` Environment の Secret を読める。**Write 権限は信頼できるメンバーにだけ付与すること。**
  - GitHub Team にすると、`main` のブランチ保護（PR 必須・Code Owners レビュー必須）と `Production` Environment のデプロイブランチ制限（`main` のみ）を設定でき、この経路を塞げる。
- Vercel Token は ZEN LLC Team にスコープを限定し、有効期限を設定したデプロイ専用 Token にする。漏洩が疑われる場合は Vercel で即座に失効させ、GitHub の Secret を更新する。

## Vercel Git 連携との関係

### 現状

- Vercel Project は `PUG-LLC/PUG-Website` と Git 連携したまま（Production Branch: `main`）。
- `main` には `vercel.json` の `git.deploymentEnabled: false`（コミット 8c265f2）が入っており、**`main` への push で Vercel が自動デプロイしない状態**になっている。現在の本番は 38c8354（2026-07-29 デプロイ）。
- そのため、この Workflow を有効にするまで `main` の更新は本番に反映されない。二重デプロイは起きない。

### `git.deploymentEnabled: false` と Dashboard の Disconnect の違い

| | `vercel.json` の `git.deploymentEnabled: false` | Dashboard で Disconnect |
| --- | --- | --- |
| 効果の範囲 | デプロイ対象コミットの `vercel.json` に従う。この設定を含まないブランチ（例: `codex/spreadsheet-cms`）の push では Preview デプロイが作られる | Project 全体。どのブランチからも自動デプロイされない |
| Git 連携 | 維持（リポジトリとのリンク、Production Branch 設定、Vercel GitHub App のアクセスは残る） | リンクが外れる。Vercel GitHub App のこのリポジトリへのアクセスは別途 GitHub 側で外す |
| 戻し方 | PR で設定を戻すだけ（レビュー可能・履歴が残る） | Dashboard から再接続（Team の Owner 権限と GitHub 側の App 許可が必要） |
| ドメイン・環境変数・設定 | 影響なし | 影響なし |
| CLI デプロイ | 影響なし | 影響なし |

### 推奨する切り替え方針

1. 当面は現状の `git.deploymentEnabled: false` を一次スイッチとして使い、Git 連携は残しておく（すぐに戻せるようにするため）。
2. GitHub Actions 経由の本番デプロイが安定したら（目安: 2 週間、または 3 回以上のリリース）、Dashboard で Disconnect する。そうすれば、古いブランチ由来の Preview デプロイや、誰かが `vercel.json` を戻したことによる二重デプロイを完全に止められる。
3. Disconnect 後も `vercel.json` の設定は残してよい（無害で、再接続したときの保険になる）。

## 移行手順

1. この PR をレビューしてマージする。`PRODUCTION_AUTO_DEPLOY` が未設定なので、**マージしても本番デプロイは走らない**。
2. **ドライラン**: Actions → Deploy Production → Run workflow（ref=`main`、`deploy` は未チェック）。Secrets の受け渡し・デプロイ先検証・`vercel pull`・`vercel build` が通ることを確認する。
   - 「Verify deploy target」で「設定されていません」と出て失敗した場合は、Environment Secret が現プランのジョブに渡っていない。Repository secrets/variables に同名で登録し直せば、Workflow を変更せずに動く。
3. **初回本番デプロイ（オーナー承認）**: オーナーが Run workflow で `deploy` をチェックして実行する。
4. 確認: Step Summary のデプロイ URL、スモークテストの結果、Vercel Dashboard 上で Production が新しいデプロイに切り替わったこと、https://www.pug-cs.com の表示（News / Work / Members の Notion 連携、Contact フォーム）。
5. **自動デプロイの有効化**: Settings → Secrets and variables → Actions → **Variables（Repository）** に `PRODUCTION_AUTO_DEPLOY=true` を追加する。以降は `main` への push で自動デプロイされる。※ Environment 変数ではなく Repository 変数にすること（ジョブの `if` で評価されるため）。
6. 安定稼働後、上記の方針に沿って Vercel の Git 連携を Disconnect する。

## ロールバック

- **即時（推奨）**: Vercel Dashboard → Deployments → 直前の正常な Production デプロイ → Instant Rollback（または `vercel rollback` / `vercel promote <url>`）。Vercel Team メンバーが操作する。
- **コード起点**: 問題のコミットを revert して `main` に入れる（自動デプロイ有効時は push で、無効時は手動実行で反映される）。
- **自動デプロイの停止**: `PRODUCTION_AUTO_DEPLOY` を削除するか、Actions で Workflow を Disable する。
- **Vercel Git 連携に戻す**: `vercel.json` の `git` ブロックを削除する PR をマージする（Disconnect 前なら、`main` への push で再び Vercel が自動デプロイする）。そのときは二重デプロイを避けるため、先に `PRODUCTION_AUTO_DEPLOY` を外す。

## 今後: Preview デプロイ（別 PR）

Developer Seat を追加せずに PR ごとの Preview を作る案:

- `pull_request` トリガーで `vercel pull --environment=preview` → `vercel build` → `vercel deploy --prebuilt`。`Preview` Environment に、本番とは別の Token（または同じ Token）と Preview 用の環境変数を置く。
- Preview URL は `pull-requests: write` 権限で PR にコメントする。
- フォークからの PR には Secrets が渡らないので Preview は作られない（この挙動は維持する）。`pull_request_target` は使わない。
- Vercel の Preview 環境には現在環境変数がない（Notion 関連は production のみ）。Preview は静的データへのフォールバックで表示されるか、Preview 用の Notion 環境変数を別途用意する。
- Preview は SSO 保護（`all_except_custom_domains`）がかかっているので、閲覧には Vercel ログインが必要。Seat を持たないレビュアー向けには、Protection Bypass や共有リンクの運用を検討する。

## 既知の事項（今回の移行とは独立）

- Contact フォーム（Web3Forms）のアクセスキーは `ContactForm.tsx` にハードコードされており、`NEXT_PUBLIC_FORM_KEY` の参照はコメントアウトされている。Vercel の環境変数には登録されていないが、ビルドには影響しない。
- リポジトリには `package-lock.json` / `pnpm-lock.yaml` / `yarn.lock` が混在しており、Vercel は `yarn.lock` を採用している（ビルドログで確認済み）。整理する場合は別 PR で行う。
