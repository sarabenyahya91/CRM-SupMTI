require('dotenv').config();
const express = require('express');

// Initialisation de l'application
const app = express();

// Middleware pour analyser les données JSON
app.use(express.json());

// Configuration du port
const PORT = process.env.PORT || 4000;

// Route par défaut
app.get('/', (req, res) => {
    res.send('Bienvenue dans le backend du CRM !');
});

// Lancement du serveur
const startServer = async () => {
    try {
        //await seedDb(); // Ensure seeding completes before starting the server
        app.listen(process.env.PORT, () => {
            console.log(`\n\nServer is running on: \x1b[35m\x1b[1m http://localhost:${process.env.PORT} \x1b[0m`);
        });
    } catch (error) {
        console.error('Error starting server:', error.message);
    }
};

startServer();
