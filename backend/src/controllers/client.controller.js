const Client = require('../models/client.model');
const User = require('../models/user.model'); // Assure-toi que ce modèle existe

// Créer un nouveau client
const createClient = async (req, res) => {
    try {
        const { name, email, phone, address, userId } = req.body;

        const newClient = await Client.create({ name, email, phone, address, userId });

        return res.status(201).json({
            message: 'Client créé avec succès',
            data: newClient,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la création du client', error: error.message });
    }
};

// Lire tous les clients avec les données de l'utilisateur associé
const getAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll({
            include: {
                model: User,  // Associer le modèle `User`
                as: 'user',   // Utiliser l'alias ici
                attributes: ['id', 'name', 'phone'], // Champs que tu souhaites afficher de l'utilisateur
            }
        });

        return res.status(200).json({
            message: 'Clients récupérés avec succès',
            data: clients,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des clients', error: error.message });
    }
};

// Lire un client par ID avec les données de l'utilisateur associé
const getClientById = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id, {
            include: {
                model: User, // Associer le modèle `User`
                as: 'user',  // Utiliser l'alias ici aussi
                attributes: ['id', 'name', 'phone'], // Champs à afficher de l'utilisateur
            }
        });

        if (!client) {
            return res.status(404).json({ message: 'Client non trouvé' });
        }

        return res.status(200).json({
            message: 'Client récupéré avec succès',
            data: client,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération du client', error: error.message });
    }
};

// Mettre à jour un client
const updateClient = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        const client = await Client.findByPk(req.params.id);

        if (!client) {
            return res.status(404).json({ message: 'Client non trouvé' });
        }

        client.name = name || client.name;
        client.email = email || client.email;
        client.phone = phone || client.phone;
        client.address = address || client.address;

        await client.save();

        return res.status(200).json({
            message: 'Client mis à jour avec succès',
            data: client,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du client', error: error.message });
    }
};

// Supprimer un client
const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);

        if (!client) {
            return res.status(404).json({ message: 'Client non trouvé' });
        }

        await client.destroy();

        return res.status(200).json({ message: 'Client supprimé avec succès' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression du client', error: error.message });
    }
};

const getClientsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Récupérer les clients associés à l'utilisateur
        const clients = await Client.findAll({
            where: { userId },
        });

        if (clients.length === 0) {
            return res.status(404).json({ message: 'Aucun client trouvé pour cet utilisateur' });
        }

        return res.status(200).json({
            message: 'Clients récupérés avec succès',
            data: clients,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des clients', error: error.message });
    }
};

module.exports = { createClient, getAllClients, getClientById, updateClient, deleteClient, getClientsByUser };
