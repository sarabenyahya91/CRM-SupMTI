# CRM Project

## Description

Un projet CRM complet et professionnel, construit en utilisant React (Frontend), TailwindCSS (UI), Node.js (Backend), Sequelize (ORM) et MySQL (Base de données).

## Structure du projet

📦crm-project
┣ 📂backend
┃ ┣ 📂src
┃ ┃ ┗ 📜(Code backend)
┃ ┣ 📜.env
┃ ┣ 📜package.json
┃ ┗ 📜server.js
┣ 📂frontend
┃ ┣ 📂src
┃ ┃ ┗ 📜(Code frontend)
┃ ┣ 📜package.json
┃ ┗ 📜tailwind.config.js
┗ 📜README.md

## Technologies

- **Frontend** : React, TailwindCSS  
- **Backend** : Node.js, Express.js  
- **Base de données** : MySQL, Sequelize  
- **Outils** : ESLint, Prettier, Docker  

## Configuration initiale

1. **Installation des dépendances** :
   - `cd backend && npm install`
   - `cd frontend && npm install`
2. **Lancer le serveur backend** :

   ```bash
   cd backend
   npm start


### Étape 6 : Vérification des dépendances et tests rapides

Avant de clore la configuration initiale, teste les serveurs :

1. **Backend** :
   - Exécute `npm start` dans le dossier `backend` pour vérifier que le serveur Express fonctionne correctement.
   - Teste l'API en visitant `http://localhost:4000` (ou le port que tu as configuré).

2. **Frontend** :
   - Exécute `npm start` dans le dossier `frontend`.
   - Vérifie que React démarre correctement et affiche la page d'accueil par défaut.

### Étape 7 : Linting et Préttification

- Assure-toi que ESLint et Prettier fonctionnent bien sur les deux parties du projet.
- Ajoute un script de linting dans les deux `package.json` :

  ```json
  "scripts": {
    "lint": "eslint . --ext .js,.jsx",
    "format": "prettier --write ."
  }

