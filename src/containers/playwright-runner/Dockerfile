FROM public.ecr.aws/lambda/nodejs:22
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY tsconfig.json ./
COPY src/ ./src/

# 必要なツールをインストール
# RUN yum install -y \
#   libXcomposite \
#   libXcursor \
#   libXdamage \
#   libXext \
#   libXi \
#   libXtst \
#   cups-libs \
#   libXScrnSaver \
#   libXrandr \
#   alsa-lib \
#   atk \
#   gtk3 \
#   pango \
#   cairo \
#   gdk-pixbuf2 \
#   xorg-x11-server-Xvfb \
#   nss \
#   && yum clean all

# Lambdaのエントリポイント
CMD ["app.handler"]
