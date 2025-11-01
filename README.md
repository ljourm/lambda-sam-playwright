# Lambda SAM Playwright

## 概要

AWS Lambda上でPlaywrightを実行するためのTypeScriptプロジェクト。デプロイはAWS SAMを使用。

## 利用技術

- Node.js
  - Volta
  - TypeScript
  - pnpm
- AWS
  - AWS Lambda
  - AWS SAM
- Playwright
- Docker

## ドキュメント

- [開発環境の構築](./docs/setup.md)
- (TODO) 開発ルール
- (TODO) デプロイ手順
- (TODO) TIPS

## Lambda関数

|関数名|ランタイム|概要|README|
|--|--|--|--|
|playwright-runner|コンテナ|Web画面のキャプチャ撮影|[README](./src/containers/playwright-runner/README.md)|
|health|nodejs:22|ヘルスチェック用||
|slack-notification|nodejs:22|Slack通知||
