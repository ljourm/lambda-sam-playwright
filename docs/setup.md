# 開発環境の構築

## 概要

本リポジトリの開発環境を構築する手順を記載します。

## 推奨環境

- MacOS / Windows
- VSCode

## 使用ツールの導入

| ツール                                                                                                               | 導入方法                                                                                                                | 備考                                          |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [Volta](https://volta.sh/)                                                                                           | [公式を参照](https://docs.volta.sh/guide/getting-started)                                                               |                                               |
| [Node](https://nodejs.org/ja)                                                                                        | `volta install node@22.21.0`                                                                                            |                                               |
| [pnpm](https://pnpm.io/ja/)                                                                                          | `volta install pnpm`                                                                                                    |                                               |
| [esbuild](https://esbuild.github.io/)                                                                                | `pnpm install -g esbuild`                                                                                               | sam buildのためにグローバルインストールが必要 |
| [AWS SAM CLI](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/what-is-sam.html) | [公式を参照](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/install-sam-cli.html) |                                               |

## セットアップ手順

1. 使用ツールを全て導入する
2. 依存パッケージをインストールする
   ```sh
   pnpm install
   ```

## ビルド

### SAMプロジェクトのビルド

```sh
sam build
```

## ローカルテスト

### 単体関数のローカル実行

```sh
sam local invoke simpleHandlerFunction
```

### API Gatewayエミュレーション

```sh
sam local start-api
```
