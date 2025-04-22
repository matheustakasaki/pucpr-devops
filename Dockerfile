# Etapa 1: Build da aplicação
FROM node:20-alpine AS build

WORKDIR /app

# Copia os arquivos
COPY package*.json ./
COPY vite.config.js ./
COPY index.html ./
COPY public ./public
COPY src ./src


# Instala as dependências
RUN npm install

# Gera o build da aplicação
RUN npm run build

# Servir com NGINX
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

