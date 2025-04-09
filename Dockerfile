FROM debian:bullseye-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
  texlive-latex-base \
  texlive-latex-recommended \
  texlive-fonts-recommended \
  texlive-latex-extra \
  ghostscript \
  curl \
  ca-certificate \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.19.0 | bash - && \
  apt-get install -y nodejs

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]