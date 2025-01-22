
const { Sequelize } = require('sequelize');

const dotenv = require("dotenv");

// Charger le fichier `.env` en fonction de l'environnement
const env = process.env.NODE_ENV || "dev";

dotenv.config({ path: `.env.${env}` });

const sequelize = new Sequelize(
    process.env.DB_NAME,       // Nom de la base
    process.env.DB_USER,
    process.env.DB_PASSWORD,// Mot de passe
    {
        host: process.env.DB_HOST, // Hôte (nom du service Docker)
        port: process.env.DB_PORT || 3306, // Port MySQL
        dialect: 'mysql', // Type de base de données
        logging: false,    // Désactiver les logs SQL
    }
);



module.exports = sequelize;
