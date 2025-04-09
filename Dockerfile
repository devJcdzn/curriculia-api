FROM debian:bullseye-slim

ENV DEBIAN_FRONTEND=noninteractive

# Instala LaTeX + Node.js + dependências do projeto
RUN apt-get update && apt-get install -y \
  texlive-latex-base \
  texlive-fonts-recommended \
  texlive-latex-recommended \
  texlive-latex-extra \
  ghostscript \
  curl \
  ca-certificates \
  && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
