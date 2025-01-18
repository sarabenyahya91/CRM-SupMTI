const express = require("express");
const authRoutes = require("./src/routes/auth.routes");
const sequelize = require("./src/config/database");



console.log(process.env.DB_NAME);
// Initialisation de l'application
const app = express();

// Middleware pour analyser les données JSON
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Configuration du port
const PORT = process.env.PORT || 4000;

// Route par défaut
app.get('/', (req, res) => {
    res.send('Bienvenue dans le backend du CRM !');
});

// Lancement du serveur avec la base de données
const startServer = async () => {
    try {

        console.log('Tentative de connexion à la base de données...');
        await sequelize.authenticate();
        console.log(`\x1b[32mConnexion à la base de données réussie  ${process.env.DB_NAME}.\x1b[0m`);

        // Vérifier si l'environnement est de test
        if (process.env.NODE_ENV === 'test') {
            console.log('\x1b[33mEnvironnement de test : Réinitialisation des tables...\x1b[0m');
            // Utiliser force: true en mode test
            await sequelize.sync({ force: true });
            console.log('\x1b[34mTables synchronisées pour les tests.\x1b[0m');
        } else {
            // Utiliser alter: true en mode développement ou production
            await sequelize.sync({ alter: true });
            console.log('\x1b[34mSynchronisation des modèles réussie.\x1b[0m');
        }


        app.listen(PORT, () => {
            console.log(`\nServer is running on: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données :', error.message);
        process.exit(1);
    }
};

startServer();
module.exports = app;
