FROM node:20-bullseye

# Evita prompts
ENV DEBIAN_FRONTEND=noninteractive

# Instala LaTeX
RUN apt-get update && apt-get install -y \
  texlive-latex-base \
  texlive-fonts-recommended \
  texlive-latex-recommended \
  texlive-latex-extra \
  ghostscript \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia arquivos para build
COPY package.json pnpm-lock.yaml ./
RUN npm install

COPY . .

# Compila e move model.txt
RUN npm run build

# Inicia a aplicação
CMD ["npm", "start"]
