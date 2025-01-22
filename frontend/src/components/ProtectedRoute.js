import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Fonction pour valider un token
const isValidToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Temps actuel en secondes
        return decoded.exp > currentTime; // Retourne true si le token n'a pas expiré
    } catch (error) {
        return false; // Token invalide ou erreur de décodage
    }
};

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token || !isValidToken(token)) {
        // Si aucun token ou token invalide, redirige vers /login
        return <Navigate to="/login" replace />;
    }

    return children; // Si le token est valide, affiche la route protégée
};

export default ProtectedRoute;