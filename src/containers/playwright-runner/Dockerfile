FROM public.ecr.aws/lambda/nodejs:22 AS builder

# ソースコードのビルド
WORKDIR /usr/app

COPY package.json ./
RUN npm install

COPY src/ ./src/
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:22

ENV NODE_OPTIONS=--enable-source-maps

# ビルド時と実行時でユーザーが異なり、ブラウザのパスが一致しない問題を回避するため、パスを固定
ENV PLAYWRIGHT_BROWSERS_PATH=/opt/playwright

# Playwrightの依存ライブラリをインストール
RUN dnf install -y \
    libX11 libXcomposite libXdamage libXext libXrandr \
    libgbm pango alsa-lib atk cups-libs gtk3 \
    libdrm libxcb libxkbcommon \
    google-noto-sans-cjk-jp-fonts \
    && dnf clean all

# Playwrightのインストール
RUN npx playwright install chromium

# Lambda関数コードをコピー
WORKDIR ${LAMBDA_TASK_ROOT}
COPY docker-package.json ./package.json
COPY --from=builder /usr/app/node_modules/ ./node_modules/
COPY --from=builder /usr/app/dist/ ./

CMD ["index.handler"]
