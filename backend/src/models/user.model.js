// Modèle User avec les nouveaux champs (nom et téléphone)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^[0-9\-\+]{9,15}$/,
        },
    },
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;
