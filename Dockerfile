# Etapa 1: Build da aplicação
FROM node:20-alpine AS build

# Cria diretório de trabalho no container
WORKDIR /app

# Copia arquivos para o container
COPY package*.json ./
COPY vite.config.js ./
COPY public ./public
COPY src ./src

# Instala dependências e gera build
RUN npm ci && npm run build

# Etapa 2: Servir app com um servidor leve (nginx)
FROM nginx:alpine

# Copia o build da etapa anterior para o nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia config customizada (opcional, senão usa default
