# デプロイ手順

## 事前準備

ローカル上にAWSのプロファイル設定が揃っていること

## 手順

### 環境変数の整備

```sh
# STG環境のパラメータを編集
cp .env.sample .env.stg
# -> .env.stgを修正

# PRD環境のパラメータを編集
cp .env.sample .env.prd
# -> .env.prdを修正
```

### デプロイ

```sh
PROFILE_NAME=your-profile-name

# STG環境にデプロイ
sam deploy --profile ${PROFILE_NAME} --config-env stg --parameter-overrides $(cat .env.stg)

# PRD環境にデプロイ
sam deploy --profile ${PROFILE_NAME} --config-env prd --parameter-overrides $(cat .env.prd)
```
