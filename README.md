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
- [Vitest](https://vitest.dev/)
- [reg-suit](https://reg-viz.github.io/reg-suit/)

## ディレクトリ構成

```
.demo
├── libs                                # 共通ライブラリ
├── tools                               # ツール
└── packages
    ├── web
    │   └── src
    │        ├── mocks                  # MSWサーバー
    │        ├── pages                  # Next.js pages router
    │        └── presentation           # 機能ごとにディレクトリを分割
    │            ├── home
    │            ├── detail
    │            ├── edit
    │            └── register
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
