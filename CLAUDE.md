# CLAUDE.md

このファイルは、このリポジトリのコードを扱う際に Claude Code (claude.ai/code) にガイダンスを提供します。

# 重要な指示の注意点

求められたことを実行する。それ以上でもそれ以下でもない。
目標達成に絶対に必要でない限り、ファイルを作成しないこと。
新しいファイルを作成するよりも、既存のファイルを編集することを常に優先すること。
積極的にドキュメントファイル（\*.md）や README ファイルを作成しないこと。ユーザーから明示的に要求された場合にのみドキュメントファイルを作成すること。

## Conversation Guidelines

- 常に日本語で会話する

## 開発コマンド

### コア開発

- `yarn web start` - Next.js Web アプリケーションを開始
- `yarn web build` - Web アプリケーションをビルド
- `yarn start-storybook` - Storybook を開始（複数ポートで実行：Web は 3001、UI は 4001）
- `yarn test` - 全パッケージでテストを実行
- `yarn test-ci` - CI 用テストを実行（ウォッチモードなし）

### コード品質

- `yarn lint` - ESLint と Stylelint を実行
- `yarn lintfix` - リンティングの問題を自動修正
- `yarn format` - Prettier でコードをフォーマット
- `yarn formatcheck` - コードのフォーマットをチェック
- `yarn typecheck` - 全パッケージで TypeScript 型チェックを実行

### ビジュアル回帰テスト

- `yarn web vrtest-snapshot` - ビジュアル回帰スナップショットを更新（web パッケージ）
- `yarn web vrtest-regression` - reg-suit を使用してビジュアル回帰テストを実行
- `yarn ui vrtest-snapshot` - ビジュアル回帰スナップショットを更新（ui パッケージ）
- `yarn ui vrtest-regression` - UI コンポーネントのビジュアル回帰テストを実行

### API 生成

- `yarn generate-api` - Orval を使用して OpenAPI 仕様から API クライアントコードを生成

## アーキテクチャ概要

これは Lerna と Yarn workspaces を使用するモノレポで、以下の構造を持ちます：

### コアパッケージ

- **`packages/web`** - React ページとプレゼンテーションレイヤーを持つ Next.js アプリケーション
- **`packages/ui`** - Storybook ストーリーを持つ共有 UI コンポーネントライブラリ
- **`packages/api`** - OpenAPI 仕様から生成された API クライアントコード

### 共有ライブラリ（`libs/`）

- **`libs/storybook`** - 共有 Storybook 設定
- **`libs/vitest`** - 共有 Vitest テスト設定
- **`libs/playwright`** - Playwright テストユーティリティ
- **`libs/tailwind`** - Tailwind CSS 設定
- **`libs/types`** - 共有 TypeScript 型定義

### プレゼンテーションレイヤーパターン

web パッケージは`src/presentation/`でフィーチャーベースアーキテクチャに従います：

- 各フィーチャーは独自のディレクトリを持ちます（例：`home/`、`detail/`、`edit/`、`register/`）
- コンポーネントには`.stories.tsx`、`.test.tsx`、スナップショットテストが含まれます
- 状態管理は`src/atoms/`で Jotai アトムを使用

### VRT セットアップ

- ビジュアル回帰テストに reg-suit を使用
- スナップショットは`snapshot/__snapshots__/`ディレクトリに保存
- web と UI パッケージで個別の設定（`regconfig.json`）
- 回帰テスト結果の保存に S3 との統合
- ビジュアル差分コメント用の GitHub PR 統合

### API クライアント生成

- `document/api/services/`の OpenAPI 仕様
- Orval が React Query フックと TypeScript 型を生成
- `packages/api/lib/demoHttpClient.ts`のカスタム HTTP クライアント設定
- API クライアントコードと一緒に生成される MSW モック

## 主要技術

- **フロントエンド**: React 18、Next.js 14、TypeScript 5
- **状態管理**: アトミック状態管理用 Jotai
- **スタイリング**: PostCSS を使用する Tailwind CSS
- **テスト**: ユニットテスト用 Vitest、E2E 用 Playwright、コンポーネントテスト用 Storybook
- **API**: Orval 生成クライアントを使用する React Query
- **ビジュアルテスト**: 回帰テスト用 reg-suit、コンポーネント分離用 Storybook

## テスト戦略

- Vitest とスナップショットテストによるユニットテスト
- reg-suit によるビジュアル回帰テスト
- Playwright によるアクセシビリティテスト
- Storybook ストーリーはコンポーネントドキュメントとビジュアルテストとして機能
- Storybook テストと統合されたカバレッジレポート
