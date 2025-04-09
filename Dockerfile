# Imagem base com Node.js 20 e Debian (ótimo para pacotes via apt)
FROM node:20-bullseye

# Evita prompts interativos do apt
ENV DEBIAN_FRONTEND=noninteractive

# Instala LaTeX e ferramentas necessárias
RUN apt-get update && apt-get install -y \
  texlive-latex-base \
  texlive-fonts-recommended \
  texlive-latex-recommended \
  texlive-latex-extra \
  ghostscript \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Define o diretório do app
WORKDIR /app

# Copia os arquivos do projeto
COPY . .

# Instala dependências e compila TypeScript
RUN npm install && npm run build

# Comando para iniciar a aplicação
CMD ["node", "dist/server.js"]
