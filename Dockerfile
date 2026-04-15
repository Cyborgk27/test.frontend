# Etapa 1: Build con Node
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Serve con Nginx
FROM nginx:alpine
# Copia el build de Angular (ajusta la ruta si tu proyecto se llama diferente en angular.json)
COPY --from=build /app/dist/test.frontend /usr/share/nginx/html
# Copia una configuración básica de Nginx para manejar rutas de Angular
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
