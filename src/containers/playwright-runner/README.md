# Playwright Runner

- コマンドは本READMEが配置されているディレクトリ内で実行する。
- Docker内で実行する必要があるためnpmで構築している (pnpmの使用は不可)

## 公式ドキュメント

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

```sh
IMAGE_NAME=docker-image:test

# イメージのビルド
docker buildx build --platform linux/arm64 --provenance=false -t ${IMAGE_NAME} .

# イメージの実行
docker run --platform linux/arm64 -p 9000:8080 ${IMAGE_NAME}

# 別のターミナルからコール
curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```
