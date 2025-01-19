// models/client.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^[0-9\-\+]{9,15}$/,
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    tableName: 'clients',
    timestamps: true,
});

// Define the relationships
Client.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Client, { foreignKey: 'userId', as: 'clients' });

module.exports = Client;
