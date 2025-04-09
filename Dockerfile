FROM node:20-bullseye

WORKDIR /app

COPY . .

# Instala dependências básicas
RUN apt-get update && apt-get install -y \
  curl \
  ca-certificates \
  gnupg \
  lsb-release

# Instala Node.js 20 (se não for incluído pela imagem base)
RUN curl -fsSL https://deb.nodesource.com/setup_20.19.0 | bash - && \
  apt-get install -y nodejs

# Instala LaTeX + poppler-utils
RUN apt-get update && apt-get install -y \
  poppler-utils \
  texlive-latex-base \
  texlive-fonts-recommended \
  texlive-latex-recommended \
  texlive-latex-extra \
  ghostscript \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Instala dependências Node
RUN npm install && npm run build

CMD ["node", "dist/server.js"]
