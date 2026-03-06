# Demo web

## 主な使用ライブラリ

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://ja.reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TanStack Query](https://tanstack.com/query)
- [Orval](https://orval.dev/)
- [Jotai](https://jotai.org/)
- [Playwright](https://playwright.dev/)
- [Storybook](https://storybook.js.org/)
- [jest](https://jestjs.io/ja/)

## ディレクトリ構成

```
.demo
├── libs                                # 共通ライブラリ
├── tools                               # ツール
└── packages
    ├── web
    │   └── src
    │        ├── atoms                  # 状態管理
    │        ├── features               # 機能ごとにディレクトリを分割
    │        │   └── feature1
    │        │   └── feature2
    │        ├── pages
    │        └── schemas      　　　　　　# バリデーション
    ├── ui                              # UIコンポーネント
    │   └── components
    └── api                             # OpenAPIの書き出し先
        └── lib
            └── demo
```

## 起動

```shell script
$ pnpm web start
```

## ビルド

```shell script
$ pnpm web build
```

## Storybook

```shell script
$ pnpm start-storybook
```

## Test

```shell script
$ pnpm test
```

## Lint

```shell script
$ pnpm lint
```

## Format

```shell script
$ pnpm format
```
