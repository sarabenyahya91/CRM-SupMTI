# Utiliser une image officielle de Node.js
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers dans le conteneur
COPY . .

# Exécuter les tests après le build
#RUN npm test

# Exposer le port sur lequel le serveur écoute
EXPOSE 4000

# Commande pour démarrer l'application
CMD ["npm", "start"]
