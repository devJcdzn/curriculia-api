FROM node:20-bullseye

WORKDIR /app

COPY . .

# Instala dependências básicas do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
  curl \
  ca-certificates \
  gnupg \
  lsb-release \
  && rm -rf /var/lib/apt/lists/*

# Node já vem na imagem base, essa etapa pode ser removida
# Mas se quiser travar versão, garanta que seja coerente
# RUN curl -fsSL https://deb.nodesource.com/setup_20.19.0 | bash - && \
#   apt-get install -y nodejs

# Instala LaTeX e utilitários para conversão de PDF
RUN apt-get update && apt-get install -y --no-install-recommends \
  texlive-latex-base \
  texlive-fonts-recommended \
  texlive-latex-recommended \
  texlive-latex-extra \
  poppler-utils \
  ghostscript \
  && apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Instala dependências e compila
RUN npm install && npm run build

# Define comando de inicialização
CMD ["node", "dist/server.js"]
