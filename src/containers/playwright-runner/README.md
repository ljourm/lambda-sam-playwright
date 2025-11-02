# Playwright Runner

- コマンドは本READMEが配置されているディレクトリ内で実行する。
- Docker内で実行する必要があるためnpmで構築している (pnpmの使用は不可)

## Lambdaのeventフォーマット

### TypeScriptの型定義

[./src/types.ts](./src/types.ts)

### サンプル

```json
{
  "timestamp": "20250123012345",
  "baseUrl": "https://example.com/",
  "targets": [
    { "path": "/", "width": 1200 },
    { "path": "/", "width": 480 },
    { "path": "/articles/", "width": 1200 },
    { "path": "/articles/", "width": 480 },
  ]
}
```

## AWS SAM 公式ドキュメント

https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/typescript-image.html

## 開発環境の構築

```sh
# 依存モジュールのインストール
npm install
```

## ビルド結果の確認方法

```sh
# ビルドの実行
npm run build

# その後、distディレクトリを確認
```

## SAMを使用せずにテストする方法

以下は[公式ドキュメント](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/typescript-image.html)の`(オプション) イメージをローカルでテストする`をベースに作成。

```sh
IMAGE_NAME=docker-image:test

# イメージのビルド
docker buildx build --platform linux/arm64 --provenance=false -t ${IMAGE_NAME} .

# イメージの実行
#   ローカルデバッグ用にoutputディレクトリを/app/outputにマウント、環境変数 OUTPUT_TYPE=FILE を指定
docker run --rm --platform linux/arm64 -p 9000:8080 -v $(pwd)/output:/app/output -e OUTPUT_TYPE=FILE ${IMAGE_NAME}

# Lambda関数の呼び出し (別のターミナルを立ち上げ、本リポジトリのルート直下で実行)
curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d @event/playwright-runner/base.json
```

### ローカルでテストできないこと

- S3へのアップロード
- 次のLambda関数を呼び出す処理
