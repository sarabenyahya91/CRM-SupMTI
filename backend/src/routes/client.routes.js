// src/routes/client.routes.js
const express = require('express');
const { createClient, getAllClients, getClientById, updateClient, deleteClient, getClientsByUser } = require('../controllers/client.controller');

const router = express.Router();

// Routes CRUD pour les clients
router.post('/', createClient);
router.get('/', getAllClients);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
// Récupérer tous les clients d'un utilisateur spécifique
router.get('/user/:userId', getClientsByUser);


module.exports = router;
