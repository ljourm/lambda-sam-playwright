# Lambda Playwright

## 概要

AWS Lambda上でPlaywrightを実行するためのTypeScriptプロジェクトです。

## 利用技術

- Node.js（Voltaでバージョン管理）
- Playwright
- TypeScript
- AWS Lambda
- AWS SAM (Serverless Application Model)
- pnpm

## 想定利用者

- Node.jsの基本知識がある方
- AWS Lambda/SAMのローカル開発をしたい方

## セットアップ手順

1. Voltaをインストールし、Node.js v24.10.0を有効化
2. pnpmをインストール
3. 依存パッケージのインストール
   ```sh
   pnpm install
   ```
4. TypeScriptビルド
   ```sh
   pnpm exec tsc
   ```
5. SAMプロジェクトのビルド
   ```sh
   sam build
   ```

## ディレクトリ構成

```
├── src/                # TypeScriptソース
│   └── handlers/       # Lambdaハンドラー
├── dest/               # tscビルド成果物
├── template.yaml       # SAM テンプレート
├── package.json        # Volta/pnpm/依存管理
├── .gitignore
├── .npmrc
└── ...
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

## 注意点

- TypeScriptのビルド成果物は `dest/` 配下に出力されます。
- LambdaハンドラーのHandlerパスは `dest/handlers/xxx.handler` となるようtemplate.yamlを設定してください。
- Playwrightや他の依存はpnpmで管理しています。

## TODO

- PlaywrightのLambda対応サンプル追加
- デプロイ手順の記載
- CI/CD例の追加
