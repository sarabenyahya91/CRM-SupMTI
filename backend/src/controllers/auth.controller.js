const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Inscription d'un utilisateur
exports.register = async (req, res) => {
    const { email, password, name, phone } = req.body;

    // Validation de l'email, mot de passe et nom
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, mot de passe et nom sont requis' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Email invalide' });
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const newUser = await User.create({ email, password: hashedPassword, name, phone });

        // Retourner la réponse de succès
        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: {
                email: newUser.email,
                name: newUser.name,
                phone: newUser.telephone
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validation de l'email et du mot de passe
    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis' });
    }

    try {
        // Trouver l'utilisateur par email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Comparaison du mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Génération du token JWT
        const token = jwt.sign({ userId: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '2h' });

        // Retourner la réponse de succès avec le token
        res.status(200).json({
            message: 'Connexion réussie',
            token,
            user: {
                email: user.email,
                name: user.name,
                phone: user.telephone
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
