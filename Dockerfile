FROM debian:bullseye-slim

# Evita prompts do apt
ENV DEBIAN_FRONTEND=noninteractive

# Atualiza pacotes e instala LaTeX + dependências básicas
RUN apt-get update && apt-get install -y \
  texlive-latex-base \
  texlive-fonts-recommended \
  texlive-latex-recommended \
  texlive-latex-extra \
  ghostscript \
  curl \
  gnupg \
  ca-certificates \
  && curl -fsSL https://deb.nodesource.com/setup_20.19.0 | bash - \
  && apt-get install -y nodejs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Cria diretório do app
WORKDIR /app

# Copia arquivos
COPY . .

# Instala dependências e compila
RUN npm install && npm run build

# Define comando de start
CMD ["node", "dist/index.js"]
