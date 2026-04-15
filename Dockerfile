# Etapa 1: Build con Node
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Serve con Nginx
FROM nginx:alpine

# Usamos /* para copiar el CONTENIDO de la subcarpeta que genere Angular
COPY --from=build /app/dist/*/ /usr/share/nginx/html/

# Tu configuración de Nginx (está perfecta)
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
