# Usar la imagen oficial de Node.js
FROM node:18-alpine 

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de tu proyecto al contenedor
COPY package*.json ./
RUN npm install
COPY . .

# Exponer el puerto que usa tu aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
