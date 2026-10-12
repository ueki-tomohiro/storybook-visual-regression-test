# CLAUDE.md

## 作業方針

- 会話・コメント・PR 説明は日本語で書く。コード識別子や技術用語は原文のまま。
- 依頼された範囲だけを変更する。リファクタや依存更新など、範囲外で気づいたことは実施せず報告にとどめる（レビュー差分を小さく保つため）。
- 新規ファイルより既存ファイルの編集を優先する。ドキュメント（\*.md / README）は明示的に頼まれた場合のみ作成する。

## コマンド

ルートから `pnpm web <script>` / `pnpm ui <script>` / `pnpm api <script>` で各パッケージのスクリプトを実行できる。

| 目的                                 | コマンド                           |
| ------------------------------------ | ---------------------------------- |
| Web 開発サーバー (Next.js)           | `pnpm web start`                   |
| Storybook (web:3001 / ui:4001)       | `pnpm start-storybook`             |
| ユニットテスト（検証用）             | `pnpm test-ci`                     |
| 型チェック                           | `pnpm typecheck`                   |
| lint (oxlint + stylelint) / 自動修正 | `pnpm lint` / `pnpm lintfix`       |
| format (oxfmt) / チェック            | `pnpm format` / `pnpm formatcheck` |
| API クライアント再生成               | `pnpm generate-api`                |

注意点:

- `pnpm test` は `vitest --update` で、スナップショットを黙って書き換える。変更の検証には `pnpm test-ci` を使い、スナップショット更新が目的のときだけ `pnpm test` を使う。
- CI（`.github/workflows/test.yaml`）は formatcheck → lint → typecheck → test-ci の順に実行する。作業の完了前に同じ順でローカル確認する。
- pre-commit（lefthook）で `oxlint --fix` と `oxfmt --write` が自動で走り、修正分が stage される。

## アーキテクチャ

pnpm workspaces + Lerna のモノレポ。

- `packages/web`: Next.js 16（**pages router**）。画面は `src/presentation/<feature>/`（home, detail, edit, register）に置き、各コンポーネントの横に `.stories.tsx`・`.test.tsx`・`__snapshots__/` を置く。MSW サーバーは `src/mocks/`。
- `packages/ui`: 共有 UI コンポーネント（`components/`、`src/` は無い）。
- `packages/api`: orval が生成する React Query フック・型・MSW モック。
- `libs/*`: storybook / vitest / playwright / tailwind / types / dayjs の共有設定。
- `tools/*`: api-client-generator（orval 設定）、reg-local-publisher-plugin、vrt-selector（VRT 対象ストーリーの選定）。

主要バージョン: React 19 / Next 16 / TypeScript 5.9 / Storybook 10 / Vitest 5 / Playwright / Tailwind 4 / Jotai 3 / Node 22 / pnpm 10。

## API クライアント生成

- 仕様: `document/api/services/demo/openapi.yaml`
- 設定: `tools/api-client-generator/orval.config.js`
- 出力: `packages/api/lib/demo/`。`clean: true` で毎回作り直されるため手で編集しない。HTTP クライアントのカスタマイズは `packages/api/lib/demoHttpClient.ts`（mutator）で行う。

## ビジュアル回帰テスト (VRT)

- 撮影の流れ: `pnpm <web|ui> vrtest-setup`（storybook build）→ `pnpm <web|ui> vrtest-snapshot`（Playwright で撮影し、`snapshot/__snapshots__/` を更新）。撮影されるのは名前が "Default" のストーリーだけ。
- 比較は reg-suit で行う。`regconfig.json` はルート・web・ui にある。PR 上の比較と公開は CI（`visual-regression-test.yaml`）が担い、レポートは gh-pages の `pr-{番号}/` に置かれる。
- web の a11y チェック: `pnpm web vrtest-a11y`。
