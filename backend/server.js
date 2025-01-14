require('dotenv').config();
const express = require('express');

// Initialisation de l'application
const app = express();

// Middleware pour analyser les données JSON
app.use(express.json());

// Configuration du port
const PORT = process.env.PORT || 5000;

// Route par défaut
app.get('/', (req, res) => {
    res.send('Bienvenue dans le backend du CRM !');
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`);
});
